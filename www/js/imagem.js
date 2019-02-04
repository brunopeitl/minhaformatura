
function programacao() {
	//Colocar primeira imagem de fundo
	var imagemFundo = cordova.file.dataDirectory+"imagens/001.jpg";
	document.getElementById("abertura_fundo").style.backgroundImage = "url('"+imagemFundo+"')";
	
	var myVar = setInterval(myTimer ,5);
	var w = 0;
	var h = 0;
	var myVar2 = setInterval(myTimer2 ,20);
	var alfa = 0;

	//Define variáveis - Nome do Curso e Instituição e quantidades de caracteres
	var palavra_nome_curso = "Medicina";
	var palavra_instituicao = "UEM";
	var qtd_char_nome_curso = palavra_nome_curso.length;
	var qtd_char_instituicao = palavra_instituicao.length;
	var tamanha_palavra = 15 + qtd_char_nome_curso + qtd_char_instituicao;
	var palavra = "";

	//Cria Array com caracteres que serão animados
	var letras = ["F","o","r","m","a","t","u","r","a","<br/>","d","e","<br />"];
	for (var i = 0; i < qtd_char_nome_curso+1; i++) {
		letras[i+13] = palavra_nome_curso.charAt(i);
	}
	letras[qtd_char_nome_curso+14] = "<br /><span>";
	var posicao_continuar = qtd_char_nome_curso+15;
	for (var i = 0; i < qtd_char_instituicao; i++) {
		letras[i+posicao_continuar] = palavra_instituicao.charAt(i);
	}

	var escrever_s_n = 0; //Só começa a animação para escrever depois que a animação das bordas se abrindo estiver concluída
	var area_bt_aparecer = 0;
	var myVar3 = setInterval(myTimer3 ,100);
	var myVar4 = setInterval(myTimer4 ,20);
	var alfa2 = 0;
	var l = 0;

	function myTimer3() {
		if(escrever_s_n == 1) {
	  		if(l < tamanha_palavra) {
	  			palavra = palavra+letras[l];
	  			document.getElementById("escrever").innerHTML = palavra;
	  			l++;
	  		}
			else {
				//document.getElementById("areaBtComecar").style.display = "block";
				area_bt_aparecer = 1;
			}
		}
	}

	function myTimer4() {
		if(area_bt_aparecer == 1) {
			if(alfa2 < 1) {
				document.getElementById("areaBtComecar").style.opacity = alfa2;
				alfa2 = alfa2 + 0.1;
			}
		}
	}

	function myTimer2() {
		if(alfa < 0.9) {
			document.getElementById("abertura_fundo").style.opacity = alfa;
			alfa = alfa + 0.01;
		}
	}

function myTimer() {
  if(w < 77) {
  	document.getElementById("abertura_contorno_branco").style.width = w+"%";
  	w = w+2.5;
  }
  else {
  	if(h < 90) {
  		document.getElementById("abertura_contorno_branco").style.height = h+"%";
  		h = h+2.5;
    }
    else {
    	document.getElementById("escrever").style.display = "block";
		escrever_s_n = 1;
    }
  }
}
	
//------------------Fim da função principal	
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
	programacao();
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
