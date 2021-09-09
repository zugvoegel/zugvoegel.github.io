This is Code for the political [party comparisson](https://zugvoegel.org/parteiencheck-europawahl-2019/) at zugvoegel.org



# Usage with wordpress
* stelle sicher dass das [Code Embed](https://wordpress.org/plugins/simple-embed-code/) plugin installiert ist
* in the desired wordpress site activate "custom fields" 
   * "ansicht anpassen" (oben rechts) -> "individuelle felder" ankreuzen   
* ganz unten zwei neue individuelle felder hinzufügen. Dazu
   * "Ein neues benutzerdefiniertes Feld hinzufügen:" -> "Neu Eingeben". 
   
   Wir brauchen 2 felder:   
   Name = "CODEjQuery"   
   Wert:   
   ```HTML
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   ```
   
   und
   
   Name = "CODEparteichecker"   
   Wert:   
   ```HTML
   <script>
  // jQuery

  let baseUrl = "https://zugvoegel.github.io/PartyCheckerApp/"

    $(window).on('load', function(){
      $.getScript(baseUrl + "partyCheck.js"+"?"+Date.now(), function(){
        console.log("starting setup")
        let target = $("#target_table");
        let json_file_path ="https://zugvoegel.github.io/data.json"+"?"+Date.now();
        // console.log(target)
        setUpPartyCheck(target, json_file_path, baseUrl);
      });
    });

  </script>
<div id="target_table"><p></p></div>
   ```
   
* Im Artikel den Editior auf 'Text' statt 'Visuell' umstellen (oben rechts) und an der gewünschten Stelle 
```
{{CODEjQuery}}{{CODEparteichecker}}
<div id="target_table"></div>
```
einfügen.

# Ändern des inhalts
Die tabelle kommt aus der datei `let json_file_path ="https://zugvoegel.github.io/data.json"` oben.
D.h. entweder [diese datei](https://github.com/zugvoegel/zugvoegel.github.io/blob/master/data.json) in diesem Repo ändern oder eine neue datei erstellen und den namen oben entsprechend ändern. 

# Things to keep in mind  
quotes in the party position text have to be escaped. e.g. `"spd": ["green", "die SPD will \\'sichere Häfen\\' für alle"] `   
\\' changes to \' when reading the json   
\' escapes the quote in the javascript  