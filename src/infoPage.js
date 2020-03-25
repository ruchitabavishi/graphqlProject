let TableDataArray;

onloadFunction = () => {
    var url = window.location.href
    hashes = url.split("?")[1].split('=')
    let code = hashes[1]
    const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            operationName: null,
        variables: {},
          query: `{continent(code: "${code}") {code name countries {code name phone currency languages {
                   name} emoji emojiU states {name}}}}`
        })
    };
    fetch(`https://countries.trevorblades.com/`, options)
        .then(res => res.json())
        .then(res => {
            TableDataArray = res.data.continent
            document.getElementById('lbltipAddedComment').innerHTML =    res.data.continent.name
            createTable()
      });
}

createTable = () => {
    let keys = Object.keys( TableDataArray.countries[0] )
    var body = document.getElementById( "mydiv");

    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    tbl.className = "gridtable";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    ["code", "Name", "Phone", "Currency", "languages", "Emoji","EmojiU", "States"].forEach(function (el) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(el));
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    tbl.appendChild(thead);
    for (var j = 0; j < TableDataArray.countries.length; j++) {
        var row = document.createElement("tr");


        keys.forEach(element => {
            var cell = document.createElement("td");
            let outputText = TableDataArray.countries[j][element]
            if(element == 'languages' || element == "states"){
                outputText = Array.prototype.map.call(TableDataArray.countries[j][element], function(item) { return item.name; }).join(", ");
                if(!outputText){
                    outputText = "NA"
                }
            }
            var cellText = document.createTextNode(outputText);

            cell.appendChild(cellText);
            row.appendChild(cell);
        });
 

        tblBody.appendChild(row);
    }
  
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
}