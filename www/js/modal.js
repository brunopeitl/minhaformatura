//------------
//TALVEZ O TRANSFORM (PARA ROTACIONAR AS IMAGENS, PRECISE DISSO PARA FUNCIONAR EM ALGUNS DISPOSITIVOS
/*-ms-transform: rotate(20deg); 
-webkit-transform: rotate(20deg);
transform: rotate(20deg);*/
//------------

var conjuntoFotos = document.getElementById("conjuntoFotos");
listaFotos = new Array();
fotoAberta = new Array();
var estadoZoom = [0];
var estadoRotacao = [1];

function baixarFoto() {
	alert("Baixar: "+fotoAberta[0]);
	if (device.platform == "Android") {
		alert("O dispositivo é um Android");
	}
	alert("A pasta externa é: "+cordova.file.externalDataDirectory);
	
	
	
	
	
	//----------------------------------------------
	//COPY FILE
	   var wwwDirEntry;

	   //resolve url for directory entry for putting in copied file
	   window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "imagens/", function success(dirEntry) {
	       wwwDirEntry = dirEntry;
	   });

	   window.resolveLocalFileSystemURL(fotoAberta[0],
	      function onSuccess(fileEntry)
	      {
		  //alert(JSON.stringify(fileEntry));
		  fileEntry.copyTo(wwwDirEntry, 'fotocopiada.jpg',
		  function()
		  {
		      alert('copying was successful');
		  },
		  function()
		  {
		      alert('copying FAILED');
		  });
	     }, function (e) { alert(JSON.stringify(e)); });

	
	
	
	
	//--------------------------------------------------
}

function rotacionarmais() {
	if(estadoRotacao[0] == 0) {
		document.getElementsByClassName("modal-content")[0].style.transform = "rotate(0deg)";
		if(estadoZoom[0] == 0) {
			document.getElementsByClassName("modal-content")[0].style.width = "100%";
			document.getElementsByClassName("modal-content")[0].style.height = "auto";
		}
		estadoRotacao[0] = 1;
	}
	else if(estadoRotacao[0] == 1) {
		document.getElementsByClassName("modal-content")[0].style.transform = "rotate(90deg)";
		if(estadoZoom[0] == 0) {
			document.getElementsByClassName("modal-content")[0].style.width = "100%";
			document.getElementsByClassName("modal-content")[0].style.height = "auto";
		}
		estadoRotacao[0] = 2;
	}
	else {
	}
}

function rotacionarmenos() {
	if(estadoRotacao[0] == 2) {
		document.getElementsByClassName("modal-content")[0].style.transform = "rotate(0deg)";
		if(estadoZoom[0] == 0) {
			document.getElementsByClassName("modal-content")[0].style.width = "100%";
			document.getElementsByClassName("modal-content")[0].style.height = "auto";
		}
		estadoRotacao[0] = 1;
	}
	else if(estadoRotacao[0] == 1) {
		document.getElementsByClassName("modal-content")[0].style.transform = "rotate(-90deg)";
		if(estadoZoom[0] == 0) {
			document.getElementsByClassName("modal-content")[0].style.width = "100%";
			document.getElementsByClassName("modal-content")[0].style.height = "auto";
		}
		estadoRotacao[0] = 0;
	}
	else {
	}
}

function zoomin() {
	if (estadoZoom[0] == 0) {
		document.getElementsByClassName("modal-content")[0].style.width = "150%";
		document.getElementsByClassName("modal-content")[0].style.height = "auto";
		estadoZoom[0] = 1;
	}
	else if (estadoZoom[0] == 1) {
		document.getElementsByClassName("modal-content")[0].style.width = "200%";
		document.getElementsByClassName("modal-content")[0].style.height = "auto";
		estadoZoom[0] = 2;
	}
	else if (estadoZoom[0] == 2) {
		document.getElementsByClassName("modal-content")[0].style.width = "250%";
		document.getElementsByClassName("modal-content")[0].style.height = "auto";
		estadoZoom[0] = 3;
	}
	else {
	}
}
function zoomout() {
	if (estadoZoom[0] == 3) {
		document.getElementsByClassName("modal-content")[0].style.width = "200%";
		document.getElementsByClassName("modal-content")[0].style.height = "auto";
		estadoZoom[0] = 2;
	}
	else if (estadoZoom[0] == 2) {
		document.getElementsByClassName("modal-content")[0].style.width = "150%";
		document.getElementsByClassName("modal-content")[0].style.height = "auto";
		estadoZoom[0] = 1;
	}
	else if (estadoZoom[0] == 1) {
		document.getElementsByClassName("modal-content")[0].style.width = "100%";
		document.getElementsByClassName("modal-content")[0].style.height = "auto";
		estadoZoom[0] = 0;
	}
	else {
	}
}

function teste() {
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
	fotoAberta[0] = numero;
	modal.style.display = "block";
	menuVisual.style.display = "block";
	menuPrincipal.style.display = "block";
	modalImg.src = numero;
}

// Get the modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var menuVisual = document.getElementById("menuVisual");
var menuPrincipal = document.getElementById("menuPrincipal");
var captionText = document.getElementById("caption");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
/*span.onclick = function() { 
	modal.style.display = "none";
	menuVisual.style.display = "none";
}*/
function fecharModal() {
	modal.style.display = "none";
	menuVisual.style.display = "none";
	menuPrincipal.style.display = "none";
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
