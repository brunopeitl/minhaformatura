//Ler pasta onde estão as fotos baixadas e listar os arquivos contidos nela, inserindo na tag UL
		function insereFotosArray() {
			function listDir(path){
				window.resolveLocalFileSystemURL(path,
					function (fileSystem) {
						var reader = fileSystem.createReader();
						reader.readEntries(
							function (entries) {
								alert("quantidade: "+entries.length);
								var i;
								for (i=0; i<entries.length; i++) {
									//listaFotos.push(entries[i].name);
									/*if(i == entries.length - 1) {
										geral();
									}*/
									//document.getElementById("pictures").innerHTML += "<li>Teste "+i+"</li>";
									document.getElementById("pictures").innerHTML += "<li><img data-original='"+path+i+".jpg' src='"+path+i+".jpg' alt='Foto'"+i+"></li>"
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

//----------------------------------------------------
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
