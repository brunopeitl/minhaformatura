var conjuntoFotos = document.getElementById("conjuntoFotos");
//var fotos = ["img/img_5terre.jpg","img/img_forest.jpg","img/img_lights.jpg","img/img_mountains.jpg"];
listaFotos = new Array();

function zoomin() {
	alert("Deu Zoom In");
	document.getElementsByClassName("modal")[0].style.width = "150%";
	document.getElementsByClassName("modal")[0].style.height = "150%";
}
function zoomout() {
	alert("Deu Zoom Out");
	document.getElementsByClassName("modal")[0].style.width = "100%";
	document.getElementsByClassName("modal")[0].style.height = "100%";
}

function teste() {
  alert(listaFotos[0]);
  for (i = 0; i < listaFotos.length; i++) { 
  	conjuntoFotos.innerHTML += "<div class=\"fotoUnitPaisagem\" style=\"background-image: url('" + cordova.file.dataDirectory+"imagens/"+listaFotos[i] + "')\" onclick=\"modalizar('" + cordova.file.dataDirectory+"imagens/"+listaFotos[i] + "')\"></div>";
  }
}

//Ler pasta onde estão as fotos baixadas e listar os arquivos contidos nela, inserindo na Array
function insereFotosArray() {
	function listDir(path){
		window.resolveLocalFileSystemURL(path,
			function (fileSystem) {
      				var reader = fileSystem.createReader();
      				reader.readEntries(
        				function (entries) {
						var i;
						for (i=0; i<entries.length; i++) {
							listaFotos.push(entries[i].name);
							if(i == entries.length - 1) {
								teste();
							}
    						}
        				},
        				function (err) {
          					console.log(err);
        				}
      				);
    				}, function (err) {
      					console.log(err);
    				}
  		);
	}
	//Chama a função passando o caminho da pasta na memória interna do aparelho a ser lida
	listDir(cordova.file.dataDirectory + "imagens/");
}

function modalizar(numero) {
	modal.style.display = "block";
	modalImg.src = numero;
}

// Get the modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
	    
	//Aqui vai a minha programação
	insereFotosArray();
	


//FIM DA MINHA PROGRAMAÇÃO
//----------------------------------------------------
	    
	    
	
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
    }
};
