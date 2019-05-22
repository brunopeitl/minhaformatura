//Funções dos botões do Menu -- Tela de Foto Única
function ir_galeria() {
	alert("Ir para a Galeria");
}
function favoritar_individual() {
	alert("Favoritar Foto");
}
function compartilhar_individual() {
	alert("Compartilhar Foto");
}
function salvar_individual() {
	alert("Salvar Foto na Memória do Celular ou Cartão de Memória");
}

//Cria Array onde vão ficar as fotos
listaFotos = new Array();

//---------------------------- FUNÇÕES E VARIAVEIS RELACIONADAS À TELA DE FOTO INTEIRA ----------------------------//
//------------------------------------------------------ INICIO ---------------------------------------------------//

//Declarando variáveis e comandos para montar galeria fora da função para que elas funcionem depois que a função foi executada
var qtd_fotos;
var larguraJanela;
var larguraFoto;
var espacamentoFotos;
var areaFoto;
var larguraTotal;
var puxarUL;var fotoColocar;

var alturaFoto;
var lista;

var larguraMenu;
var alturaMenu;
var alturaTotal;
var areaEspacos;
var alturaFoto;
var fotoColocar;

//Variáveis e comandos para fazer a galeria funcionar
var mover_s_n = [0];
var posicao_atual = [0];
var posicao_inicial = [0];
var posicao_final = [0];
var lado_mover = [0];
var numero = [1];
var posicao_que_ficou = [0];
var inicia_animacao;
var finaliza_animacao;

function montarTelaFtUn(qtd_fotos2) {
	//--- DECLARAÇÃO DE VARIÁVEIS
	//Variáveis e comandos para montar galeria
	qtd_fotos = qtd_fotos2;

	//---------- VARIÁVEIS PARA MONTAR O LAYOUT RESPONSÍVEL DA TELA
	larguraJanela = window.innerWidth; //Pega largura da janela
	larguraFoto = (larguraJanela * 90) / 100; //Área onde aparece a foto é 90% da largura da janela
	espacamentoFotos = (larguraJanela * 10) / 100; //Distancia entre uma foto e outra é 10% da largura da janela
	larguraMenu = larguraFoto;
	alturaMenu = (larguraMenu * 25) / 100;

	areaFoto = larguraFoto + espacamentoFotos; //Soma a largura da foto + espaçamento entre elas - Usado para calcular a distancia que as fotos vão andar na animação
	larguraTotal = qtd_fotos * areaFoto; //Largura total de todas as fotos + espaçamentos
	document.getElementById("listaUL").style.width = larguraTotal + "px"; //Coloca essa largura total na UL que contém as fotos 
	puxarUL = espacamentoFotos / 2;
	document.getElementById("listaUL").style.marginLeft = -puxarUL + "px"; //Puxa a UL em 5% para a esquerda para centralizar as fotos
	//alturaFoto = (larguraFoto * 160) / 100; //Define altura da área onde aparecem as fotos
	//***COMENTADA TEMPORARIAMENTE -- TESTAR COM ESSA LINHA COMENTADA POR ENQUANTO
	
	//-------- MONTANDO ELEMENTOS DA TELA
	larguraMenu = larguraFoto;
	alturaMenu = (larguraMenu * 25) / 100;
	document.getElementById("menu_photo_unica").style.width = larguraMenu + "px";
	document.getElementById("menu_photo_unica").style.height = alturaMenu + "px";
	alturaTotal = window.innerHeight;
	areaEspacos = (alturaTotal * 15) / 100;
	alturaFoto = alturaTotal - (areaEspacos + alturaMenu); //--- VAI USAR ISSO MESMO?
	
	//Laço for para criar os elementos LI onde ficarão as fotos, já com a largura e o espaçamento que foi calculado
	lista = "";
	listaFotos.sort();
	for (i = 1; i <= qtd_fotos; i++) {
		fotoColocar = cordova.file.dataDirectory+"imagens/"+listaFotos[i-1];
		lista += "<li style=\"width:"+larguraFoto+"px; height:"+alturaFoto+"px; margin-left:"+espacamentoFotos+"px; background-image: url('"+fotoColocar+"'); \"></li>";
	}
	document.getElementById("listaUL").innerHTML = lista;


	
	//--- FIM DA DECLARAÇÃO DE VARIÁVEIS
}

//Funções que animam as fotos se movendo
function moveFotoEsq(inicia_animacao , finaliza_animacao) {
	setTimeout(function(){
        if(inicia_animacao > finaliza_animacao) {
			document.getElementById("foto").style.left = inicia_animacao + "px";
			inicia_animacao = inicia_animacao - 5;
			moveFotoEsq(inicia_animacao , finaliza_animacao);
		}
    }, 5);
}
function moveFotoDir(inicia_animacao , finaliza_animacao) {
	setTimeout(function(){
        if(inicia_animacao < finaliza_animacao) {
			document.getElementById("foto").style.left = inicia_animacao + "px";
			inicia_animacao = inicia_animacao + 5;
			moveFotoDir(inicia_animacao , finaliza_animacao);
		}
    }, 5);
}
//Pega as coordenadas do cursor na tela para definir para que lado as fotos vão se movimentar
//event.clientX MUDOU PARA touch.pageX E ACRESCENTOU A VARIÁVEL var touch = event.touches[0];
function pegar_coordenada() {
	var touch = event.touches[0]; //PARA PEGAR A COORDENADA DO PONTO ONDE FOI CLICADO
	posicao_atual[0] = touch.pageX;
    if (mover_s_n[0] == 1) {
    	var qtd_mover = posicao_atual[0] - posicao_inicial[0];
		
		if(numero[0] == 1) {
			if (touch.pageX <= posicao_inicial[0]) {
				document.getElementById("foto").style.left = qtd_mover + "px";
			}
        }
		else {
			if(numero[0] < qtd_fotos) {
				document.getElementById("foto").style.left = (qtd_mover - (areaFoto * (numero[0] - 1))) + "px";
			}
			else {
				if (touch.pageX > posicao_inicial[0]) {
					document.getElementById("foto").style.left = (qtd_mover - (areaFoto * (numero[0] - 1))) + "px";
				}
				else {
					document.getElementById("foto").style.left = posicao_que_ficou[0] + "px";
				}
			}
		}
    }
    else {
    }
}
//Função que executa quando clica na tela e começa a puxar as fotos
function comeca_puxar() {
	var touch = event.touches[0]; //PARA PEGAR A COORDENADA DO PONTO ONDE FOI CLICADO
	posicao_inicial[0] = touch.pageX;
    	mover_s_n[0] = 1;
}
	
//Função que define as  coordenadas para movimentar as fotos
function passarProxima(ultimaPosicaoX) {
	if (lado_mover[0] == 0) { //MOVE PARA O LADO ESQUERDO
		//Está chegando até aqui
		if(numero[0] < qtd_fotos) {
			//var touch = event.touches[0]; //PARA PEGAR A COORDENADA DO PONTO ONDE FOI CLICADO -- tlvz desnecessário aqui
			//--------------------------------- Aqui vai uma animação
			inicia_animacao = posicao_que_ficou[0] - (posicao_inicial[0] - ultimaPosicaoX/*touch.pageX*/);
			finaliza_animacao = -(areaFoto * numero[0]);
			moveFotoEsq(inicia_animacao , finaliza_animacao);
			//--------------------------------- Aqui vai uma animação
			
			posicao_que_ficou[0] = -(areaFoto * numero[0]);
			posicao_final[0] = 0;
			posicao_inicial[0] = 0;
			numero[0] = numero[0] + 1;
		}
	}
	else { //MOVE PARA O LADO DIREITO
		if (numero[0] == 1) {
		}
		else {
			if (numero[0] == 2) {
				//var touch = event.touches[0]; //PARA PEGAR A COORDENADA DO PONTO ONDE FOI CLICADO
				//--------------------------------- Aqui vai uma animação
				inicia_animacao = posicao_que_ficou[0] + (ultimaPosicaoX - posicao_inicial[0]);
				finaliza_animacao = (posicao_que_ficou[0] + (areaFoto * (numero[0] - 1)));
				moveFotoDir(inicia_animacao , finaliza_animacao);
				//--------------------------------- Aqui vai uma animação
				
				posicao_que_ficou[0] = (posicao_que_ficou[0] + (areaFoto * (numero[0] - 1)));
			}
			else {
				//var touch = event.touches[0]; //PARA PEGAR A COORDENADA DO PONTO ONDE FOI CLICADO
				//--------------------------------- Aqui vai uma animação
				inicia_animacao = posicao_que_ficou[0] + (ultimaPosicaoX - posicao_inicial[0]);
				finaliza_animacao = (posicao_que_ficou[0] + (areaFoto * (numero[0] - (numero[0] - 1))));
				moveFotoDir(inicia_animacao , finaliza_animacao);
				//--------------------------------- Aqui vai uma animação
				
				posicao_que_ficou[0] = (posicao_que_ficou[0] + (areaFoto * (numero[0] - (numero[0] - 1))));
			}
			
			posicao_final[0] = 0;
			posicao_inicial[0] = 0;
			numero[0] = numero[0] - 1;
		}
	}
}
//Função que executa quando solta
function parar_puxar() {
	//var touch2 = event.touches[0];
	posicao_final[0] = posicao_atual[0];//touch2.pageX;
	if(posicao_final[0] < posicao_inicial[0]) {
		lado_mover[0] = 0;
	}
	else {
		lado_mover[0] = 1;
	}
	mover_s_n[0] = 0;
	passarProxima(posicao_final[0]);
}

//---------------------------- FUNÇÕES E VARIAVEIS RELACIONADAS À TELA DE FOTO INTEIRA ----------------------------//
//------------------------------------------------------- FIM -----------------------------------------------------//

//Função depois que aperta botão começar
function btComecar() {
	montarTelaFtUn(listaFotos.length);
	document.getElementById("photo_unica").style.display = "block";
	$("#photo_blur").fadeOut(1500, function(){
		document.getElementById("photo_blur").style.display = "none";
		//Animação para desembaçar o fundo
		/*
		var myVar5 = setInterval(myTimer5 ,3);
		var d5 = 20;
		function myTimer5() {
  			if(d5 >= 0) {
  				document.getElementById("abertura_fundo").style.filter = "blur("+d5+"px)";
  				d5 = d5 - 0.5;
  			}
		}
		*/
	});
}

function programacao() {
	//Mostrar botão para Pular Abertura
	document.getElementById("pularAbertura").style.display = "block";

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
				//Ocultar botão para Pular Abertura
				document.getElementById("pularAbertura").style.display = "none";
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
	
	//Colocar os elementos do Array na ordem correta
	listaFotos.sort();
	    
	//Colocar primeira imagem de fundo
	var imagemFundo = cordova.file.dataDirectory+"imagens/"+listaFotos[0];
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
	    
	//testando rotação da tela
	window.addEventListener('orientationchange', function(){
		alert("virou");
   		//alert(screen.orientation.type);
	});
	


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
