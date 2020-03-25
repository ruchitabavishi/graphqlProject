
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

let continents;
myFunction = () => {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
        operationName: null,
    variables: {},
      query: `{continents {code name}}`
    })
};
fetch(`https://countries.trevorblades.com/`, options)
    .then(res => res.json())
    .then(res => {
      continents = res.data.continents
      document.getElementById('lbltipAddedComment').innerHTML =    "Continents List"

      createUI()
  });
}
createUI = () => {
    var mydiv  = document.getElementById("mydiv")
    for(var i=0; i<continents.length; i++)
    {
        var button = document.createElement('button');
        button.type = "button";
        button.name = continents[i].code;
        button.innerHTML = continents[i].name;
        button.id = continents[i].code;
        document.body.appendChild(button);
        button.addEventListener('click', function(event){
            showinfo(event.target.name);   
        });
    }
}

showinfo = (code) => {
    window.location.href = "infoPage.html?code="+code
}

