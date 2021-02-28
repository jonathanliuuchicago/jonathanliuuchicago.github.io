var today = new Date();


function displayTimePopup() {
    window.alert(today);
}

function displayTime() {
    if (document.getElementById("time").innerHTML=="Show Current Date and Time Below") {
        document.getElementById("time").innerHTML = "Hide Current Date and Time Below";
        document.getElementById("time_text").innerHTML = today;

    } else {
        document.getElementById("time").innerHTML = "Show Current Date and Time Below";
        document.getElementById("time_text").innerHTML= "";
    };
}

function displayMinutes() {
    if (document.getElementById("minute").innerHTML=="Show Minutes") {
        document.getElementById("minute").innerHTML = "Hide Minutes";
        document.getElementById("minute_text").innerHTML = today.getMinutes();

    } else {
        document.getElementById("minute").innerHTML = "Show Minutes";
        document.getElementById("minute_text").innerHTML= "";
    };
}

function hideVideo() {
    if (document.getElementById("hide").innerHTML=="Hide Video") {
        document.getElementById("video").style.visibility = "hidden";
        document.getElementById("hide").innerHTML= "Show Video";

    } else {
        document.getElementById("video").style.visibility = "visible";
        document.getElementById("hide").innerHTML= "Hide Video";
    };
}

function append() {
    var newWord = document.getElementById("inputWord").value.trim();
    if (newWord==""){
        document.getElementById("inputWord").value = "";
        return;
    };
    document.getElementById("words").innerHTML = document.getElementById("words").innerHTML + " " + newWord;
    document.getElementById("inputWord").value = "";
  }

function parseArray(arr){
    return arr.sort();
}

function sortWords(textId) {
    var text = document.getElementById(textId).innerHTML;
    var wordArray = text.split(" ");
    wordArray.shift();

    var sortedArray = parseArray(wordArray);
    document.getElementById("sorted").innerHTML = sortedArray;
    document.getElementById("last").innerHTML = sortedArray.slice(-1)[0];
  }

function update() {
    var newWord = document.getElementById("newWord").value.trim();
    var currentWordLength = document.getElementById("long-word").innerHTML.length;
    if (newWord.length > currentWordLength){
        document.getElementById("long-word").innerHTML = newWord;
    };
    document.getElementById("newWord").value = "";
  }

function wikiAPI(){
    document.getElementById("wiki").innerHTML = "";
    var searchTerm = document.getElementById("searchTerm").value;
    var connect = new XMLHttpRequest();
    var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=20&gsrsearch=" + searchTerm;
    connect.open('GET', url);
    connect.onload = function() {
        var wikiObject = JSON.parse(this.response);
        var pages = wikiObject.query.pages;
        for (var i in pages) {
            var pageLink = "https://en.wikipedia.org/?curid=" + pages[i].pageid;
            var newElement = document.createElement("a");
            newElement.href = pageLink
            newElement.setAttribute('class', 'row h5');
            newElement.setAttribute('target', '_blank');
            document.getElementById("wiki").appendChild(newElement);
            newElement.innerText = pages[i].title;
        };
    };
    
    connect.send();
    document.getElementById("searchTerm").value = "";


}

function mapLoad(){
    //Define the lat lon coordinate
    var latLng = [41.789649, -87.599702];
  
    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  
    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
  
    var map = L.map('map', {
      center: latLng,
      zoom: 16,
      layers: [streets]
    });
  
    var baseLayers = {
      "Grayscale": grayscale,
      "Streets": streets
    };
  
    L.control.layers(baseLayers).addTo(map);
  
    L.marker(latLng).addTo(map)
    .bindPopup("<b>UChicago<br>Campus</b>").openPopup();
  
  
  
    //Click event
    var popup = L.popup();
  
    function onMapClick(e) {
      popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
    }
    map.on('click', onMapClick);
  }

  function showDropdown() {
    document.getElementById("apis").classList.toggle("show");
  }

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

var parentElement = document.getElementById('ochreTableBody');
var url = "https://ochre.lib.uchicago.edu/ochre?uuid=accd571b-bae3-4d42-93d9-58b65ec79300";

function loadXML(){
    XMLrequest(url);
    console.log('XML -- ok');
}

function XMLrequest(link){
    var connect = new XMLHttpRequest();
    connect.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200) {
            listTexts(this.responseXML);
        };
    };
    connect.open('GET', link, true);
    connect.send();
    console.log('XML request -- ok');
}


function listTexts(sourceXML){
    document.getElementById('projectTitle').innerText = sourceXML.getElementsByTagName('metadata')[0].children[1].innerHTML;
    document.getElementById('setTitle').innerText = sourceXML.getElementsByTagName('set')[0].children[3].children[0].innerHTML;
    document.getElementById('setDescription').innerText = sourceXML.getElementsByTagName('set')[0].children[4].innerHTML;
    var licenseText = document.getElementById('license');
    licenseText.innerText = sourceXML.getElementsByTagName('availability')[0].children[0].innerHTML;
    licenseText.setAttribute('href', sourceXML.getElementsByTagName('availability')[0].children[0].attributes[0].nodeValue);


    console.log("sourceXML");
    var textList = sourceXML.getElementsByTagName('text');
    for (i=0; i<textList.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'ochreTableRows');
        tr.setAttribute('id', 'row_' + i);
        document.getElementById('ochreTableBody').appendChild(tr);

        var td = document.createElement('td');
        td.setAttribute('id', 'td_name_'+i);
        td.textContent = textList[i].children[0].children[0].innerHTML;
        document.getElementById('row_' + i).appendChild(td);
        var td2 = document.createElement('td');
        td2.setAttribute('id', 'td_desc_'+i);
        td2.textContent = textList[i].children[3].innerHTML;
        document.getElementById('row_'+i).appendChild(td2);
    };

}