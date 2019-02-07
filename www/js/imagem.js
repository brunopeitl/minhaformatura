//Cria Array onde vão ficar as fotos
listaFotos = new Array();

function programacao() {

	//Define variáveis - Nome do Curso e Instituição e quantidades de caracteres
	var palavra_nome_curso = localStorage.getItem("curso");
	var palavra_instituicao = localStorage.getItem("instituicao");
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
    
    	var area_bt_aparecer = 0;
	var alfa2 = 0;
	var l = 0;
    	
	function myTimer4() {
		setTimeout(function(){ 
        		if(alfa2 < 1) {
				document.getElementById("areaBtComecar").style.opacity = alfa2;
				alfa2 = alfa2 + 0.1;
                		myTimer4();
			}
    		}, 20);
    	}
    
	function myTimer3() {
		setTimeout(function(){ 
    			if(l < tamanha_palavra) {
	  			palavra = palavra+letras[l];
	  			document.getElementById("escrever").innerHTML = palavra;
	  			l++;
            	    		myTimer3();
	  		}
            		else {
            			myTimer4();
            		}
    		}, 100);
    	}
    	myTimer3();

//------------------Fim da função programacao	
}

function animacoes() {
	//Primeiras Animações: Aparece o fundo com a foto e aparece contorno    
	//animação 01
    	$("#abertura_contorno_branco").animate({width: '77%'}, function() {
    		$("#abertura_contorno_branco").animate({height: '90%'}, function() {
        		programacao();
        	});
    	});
	
    	//animação 02
    	$("#abertura_fundo").fadeIn(1500);
}

//Primeiros comandos
function geral() {
	
	//Teste para ordenar elementos do Array
	listaFotos.sort();
	    
	//Colocar primeira imagem de fundo
	var imagemFundo = cordova.file.dataDirectory+"imagens/001.jpg";
	document.getElementById("abertura_fundo").style.backgroundImage = "url('"+imagemFundo+"')";	    
	    
	    
	//Lista Código Hexadecimal das cores da capa
	var hexa_azul_escuro = "#1b2242";
	var hexa_azul_claro = "#4c5996";
	var hexa_vermelho_escuro = "#7a0101";
	var hexa_vermelho_claro = "#ff0000";
	var hexa_verde_escuro = "#0d4a0f";
	var hexa_verde_claro = "#4ba938";
	var hexa_amarelo_escuro = "#726d18";
	var hexa_amarelo_claro = "#e3da39";
	var hexa_rosa_escuro = "#62364f";
	var hexa_rosa_claro = "#db339e";
	
	//Insere código hexadecimal de acordo com informação salva no LocalStorage
	var cor = localStorage.getItem("cor");
	if (cor == "azul") {
		document.getElementById("photo_blur").style.backgroundColor = hexa_azul_escuro;
		document.getElementById("areaBtComecar").style.backgroundColor = hexa_azul_escuro;
		document.getElementById("abertura_contorno_branco").style.borderColor = hexa_azul_claro;
	}
	else if (cor == "vermelho") {
		document.getElementById("photo_blur").style.backgroundColor = hexa_vermelho_escuro;
		document.getElementById("areaBtComecar").style.backgroundColor = hexa_vermelho_escuro;
		document.getElementById("abertura_contorno_branco").style.borderColor = hexa_vermelho_claro;
	}
	else if (cor == "verde") {
		document.getElementById("photo_blur").style.backgroundColor = hexa_verde_escuro;
		document.getElementById("areaBtComecar").style.backgroundColor = hexa_verde_escuro;
		document.getElementById("abertura_contorno_branco").style.borderColor = hexa_verde_claro;
	}
	else if (cor == "amarelo") {
		document.getElementById("photo_blur").style.backgroundColor = hexa_amarelo_escuro;
		document.getElementById("areaBtComecar").style.backgroundColor = hexa_amarelo_escuro;
		document.getElementById("abertura_contorno_branco").style.borderColor = hexa_amarelo_claro;
	}
	else {
		document.getElementById("photo_blur").style.backgroundColor = hexa_rosa_escuro;
		document.getElementById("areaBtComecar").style.backgroundColor = hexa_rosa_escuro;
		document.getElementById("abertura_contorno_branco").style.borderColor = hexa_rosa_claro;
	}
	
	animacoes();
	
//----------------- FIM DA FUNÇÃO GERAL
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
								geral();
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
