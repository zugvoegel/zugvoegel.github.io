function includeStyle(base_url){
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    // let base_url = "https://zugvoegel.github.io/"
    element.setAttribute("href", base_url+"party_check_style.css"+"?"+Date.now());
    document.getElementsByTagName("head")[0].appendChild(element);
}

function makeGlobalUrl(base_url, filename){
  if(filename.startsWith("http")){
    return filename
  }
  else{
    return base_url + "Resources/" + filename
  }
}

function makePositionSymbolCSS(base_url, position_symbol_list){
  var style_rules = [];
  console.log(position_symbol_list)

  $.each(position_symbol_list, function(index, sym){
    console.log(sym)
    var shorthand = sym.shorthand
    var file_url = sym.symbol_url

    var global_url = makeGlobalUrl(base_url, file_url)

    var style = `.${shorthand} {
    background: white url("${global_url}") no-repeat;
    background-size:56px 40px;
    }
    `

    style_rules.push(style);
  });

  /* ... */

  var style_tag = '<style type="text/css">' + style_rules.join("\n") + "</style>";
  console.log(style_tag);
  $("head").append(style_tag);
}

function showModal ( text ) {
  // When the user clicks the button, open the modal
  var modal = document.getElementById('myModal');
  document.getElementById('cite-content').innerHTML = text;
  modal.style.display = "block";
}

function setupModal(target){
  let wrapper = $('<div id="myModal" class="modal"></div>')
  let modal = $('<div class="modal-content"></div>');
  let close = $(' <span class="close">&times;</span>');

  let modal_content =  $('<div id="cite-content">ladida</div>');

  // When the user clicks on <span> (x), close the modal
  close.click( function() {
      wrapper.css('display', 'none');
  })
  wrapper.click( function(){wrapper.css('display', 'none');})

  modal.append(close);
  modal.append('<p></p>')
  modal.append(modal_content);

  wrapper.append(modal)
  target.append(wrapper)

}
function showModal ( text ) {
  // When the user clicks the button, open the modal
  document.getElementById('cite-content').innerHTML = text;
  $("#myModal").css('display', 'block');
}

function setupTable(base_url, target_div, data){
  var party_list = [];

  let table = $('<table border="1" class="parteiencheck"></table>');
  target_div.append(table);
  let parteicheck_header = $("<tr><th>Forderung im Wahlprogramm</th>");
  table.append(parteicheck_header);

  $.each(data.parties, function(index, party){
    let party_pic = makeGlobalUrl(base_url, party.pic);
    party_list.push(party.name)
    parteicheck_header.append(`<th><img height="40px" src="${party_pic}"/></th>`);
  })

  var valid_position_symbols = [];
  $.each(data.position_symbols, function(index, sym){
    valid_position_symbols.push(sym.shorthand);
  })


  $.each(data.topics, function(index, topic){
    let topic_title = topic.title
    let n_parties = party_list.length
    table.append(`<tr><td class="topic_header", colspan="${n_parties+1}">${topic_title}</td></tr>`)

    let items = topic.items
    $.each(items, function(index, item){
      let item_title = item.title
      let positions = item.positions

      let new_row = $("<tr>")
      new_row.append(`<td> ${item_title} </td>`)
      $.each(party_list, function(index, party){
        let party_position = positions[party]

        if(party_position == undefined){
          alert(`No position was given for <<${party}>> for the issue <<${item_title}>>`);
          // party_position = ['yellow', 'n/a']
        }

        let party_color = party_position[0]
        if(!(valid_position_symbols.includes(party_color))){
          alert(`Unkown position color for party <<${party}>> in issue <<${item_title}>>. We need the form {'${party}': ["<color>", "<position>"]}, where color is in ${valid_position_symbols.join(" ")}`);

        }

        let party_explanation = party_position[1]
        new_row.append(`<td class="parteiencheck position_symbol ${party_color}" onclick="showModal('${party_explanation}');"></td>`)
      })
      table.append(new_row)
    })
  })
}

function setUpPartyCheck(target, json_file_path, base_url){
  includeStyle(base_url);
  setupModal(target);
  $.getJSON(json_file_path, function(data){
    makePositionSymbolCSS(base_url, data.position_symbols)
    setupTable(base_url, target, data);
  })
}
