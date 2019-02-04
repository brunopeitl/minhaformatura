
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
	/*
	var camImagem1 = cordova.file.dataDirectory+"imagens/CAPA.jpg";
	var camImagem2 = cordova.file.dataDirectory+"imagens/001.jpg";
	var camImagem3 = cordova.file.dataDirectory+"imagens/002.jpg";
	var camImagem4 = cordova.file.dataDirectory+"imagens/003.jpg";
	var camImagem5 = cordova.file.dataDirectory+"imagens/004.jpg";
	var camImagem6 = cordova.file.dataDirectory+"imagens/005.jpg";
	var camImagem7 = cordova.file.dataDirectory+"imagens/006.jpg";
	var camImagem8 = cordova.file.dataDirectory+"imagens/007.jpg";
	var camImagem9 = cordova.file.dataDirectory+"imagens/008.jpg";
	var camImagem10 = cordova.file.dataDirectory+"imagens/009.jpg";
	document.getElementById("imagem").innerHTML = "<img src='"+camImagem1+"' /><br /><img src='"+camImagem2+"' /><br /><img src='"+camImagem3+"' /><br /><img src='"+camImagem4+"' /><br /><img src='"+camImagem5+"' /><br /><img src='"+camImagem6+"' /><br /><img src='"+camImagem7+"' /><br /><img src='"+camImagem8+"' /><br /><img src='"+camImagem9+"' /><br /><img src='"+camImagem10+"' />";
	*/
	
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
    }
};
