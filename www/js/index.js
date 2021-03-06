//Array para guardar informações variadas
//Também salva informações: Cod Empresa, Nº Contrato, Album e Senha para usar depois
var variaveisGlobais = {parar_animacao:0, empresa:"", contrato:"", album:"", senha:""};

//Parte da função que está sendo testada para contar quantas fotos tem baixadas na pasta
var fotosBaixadasAteAgora = [0];
var fotosBaixadas2 = [0];
var downloadInterrompido = [0]; //VER SE VAI USAR ISSO MESMO

//Código Hexadecimal das cores da capa
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



//-----//-----//-----//-----//-----// INICIO DO ALGORITMO QUE LIMPA A PASTA DE FOTOS INTERNA DO APP QUANDO ABRE A TELA DO FORMULÁRIO //-----//-----//-----//-----//-----//

//------ OUTRA FUNÇÃO QUE CONTA QUANTAS FOTOS TEM NA PASTA PARA NÃO PRECISAR MEXER NA OUTRA
function deletaFoto(fotoDeletar) {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory+"imagens/", function (dir) {
        dir.getFile(fotoDeletar/*"CAPA.jpg"*/, {create: false}, function (fileEntry) {
            fileEntry.remove(function (file) {
            }, function (error) {
                alert("error occurred: " + error.code);
            }, function () {
                alert("file does not exist");
            });
        });
    });
}

//Conta quantas fotos baixadas tem na pasta da memória do aparelho
function contaFotosBaixadas2() {
	function listDir2(path){
		window.resolveLocalFileSystemURL(path,
			function (fileSystem) {
      				var reader = fileSystem.createReader();
      				reader.readEntries(
        				function (entries) {
						var d;
						for (d=0; d<entries.length; d++) {
							deletaFoto(entries[d].name);
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
	listDir2(cordova.file.dataDirectory + "imagens/");
}

//Função para limpar pasta interna oculta do aplicativo onde estão as fotos - Se der erro no download das fotos, ao tentar baixar de novo, a pasta precisa estar limpa para não dar erro no algoritmo do download
function limparPasta() {
	//É DESNECESSÁRIO CAIR NUMA FUNÇÃO QUE APENAS CHAMA OUTRA. VER DEPOIS PARA ELIMINAR UMA
	contaFotosBaixadas2();

}

//-----//-----//-----//-----//-----// FIM DO ALGORITMO QUE LIMPA A PASTA DE FOTOS INTERNA DO APP QUANDO ABRE A TELA DO FORMULÁRIO //-----//-----//-----//-----//-----//



//FUNÇÃO COM AJAX PARA ATUALIZAR CADASTRO DO ALBUM NO BANCO DE DADOS E COLOCAR QUE ALBUM JÁ FOI BAIXADO
function alterar_album_banco() {
	$("#resposta_server").load("http://www.porcocapitalista.com.br/minhaformatura/teste4.php?empresa="+variaveisGlobais['empresa']+"&contrato="+variaveisGlobais['contrato']+"&album="+variaveisGlobais['album']+"&acao=atualizar");
}

//Função que anima vídeo de fundo da tela de capa
function animar2() {
	var elenco2 = new Array();
	for (i=0; i<314; i++) {
		seq2 = i+1;
		elenco2 [i] = "img/sequencia/fundo_"+seq2+".jpg";
	}
	var prox2 = 0;
	function poeImagem2() {
		document.getElementById('capa_imagem_fundo_img').src = elenco2[ prox2 ];
		
		prox2++;
		if( prox2 == (elenco2.length) ) { prox2 = 0; }
	}
	window.setInterval( poeImagem2, 40 );
}

//Mostrar dados salvos no LocalStorage na página CAPA
function mostrar_dados_capa() {
	//Coloca nomes do Curso e da Instituição que estão gravados no local storage
	$("#capa_nome_curso").html(localStorage.getItem("curso"));
	$("#capa_nome_instituicao").html(localStorage.getItem("instituicao"));
	
	//Coloca foto de capa no lugar dela
	document.getElementById("foto_capa").style.backgroundImage = "url('"+cordova.file.dataDirectory+"imagens/CAPA.jpg')";
	
	//Colocar cores de acordo com a cor do curso
	if (localStorage.getItem("cor") == "azul") {
		var corClara = hexa_azul_claro;
		var corEscura = hexa_azul_escuro;
	}
	else if (localStorage.getItem("cor") == "vermelho") {
		var corClara = hexa_vermelho_claro;
		var corEscura = hexa_vermelho_escuro;
	}
	else if (localStorage.getItem("cor") == "verde") {
		var corClara = hexa_verde_claro;
		var corEscura = hexa_verde_escuro;
	}
	else if (localStorage.getItem("cor") == "amarelo") {
		var corClara = hexa_amarelo_claro;
		var corEscura = hexa_amarelo_escuro;
	}
	if (localStorage.getItem("cor") == "rosa") {
		var corClara = hexa_rosa_claro;
		var corEscura = hexa_rosa_escuro;
	}
	document.getElementById("capa_contorno").style.borderColor = corClara;
	document.getElementById("conteudo_pagina_capa").style.backgroundColor = corEscura;
	
	//Redimensionar nome do curso de acordo com o número de caracteres
	var capa_nome_curso = document.getElementById("capa_nome_curso").innerHTML;
	var n = capa_nome_curso.length;

	if (n <= 16) {
		document.getElementById("capa_nome_curso").style.fontSize = "57pt"; //48
	}
	if (n > 16 && n <= 36) {
		document.getElementById("capa_nome_curso").style.fontSize = "57pt";
	}
	if (n > 36) {
		document.getElementById("capa_nome_curso").style.fontSize = "36pt";
	}
	
	//Chamar função para animar o vídeo de fundo
	animar2();
}

//FUNÇÃO PARA ANIMAR PRELOADER DA PÁGINA DE DOWNLOAD
function animar() {
	var elenco = new Array();
	for (i=0; i<57; i++) {
		seq = i+1;
		elenco [i] = "img/sequencia02/anima_"+seq+".png";
	}
	var prox = 0;
	function poeImagem()
	{	
		$(function() {
	   		$('#foto').attr('src',  elenco[ prox ]);
		});
		
		if (variaveisGlobais["parar_animacao"] == 0) {
			prox++;
		}
		if( prox == (elenco.length) ) prox = 0;
	}
		window.setInterval( poeImagem, 40 );
}


var fotosBaixadas = 0;
//FUNÇÃO DEPOIS QUE O DOWNLOAD DAS FOTOS É CONCLUÍDO
function download_concluido(qtd_fotos) {
	//ESSE COMANDO PRECISA FICAR AQUI
	contaFotosBaixadas();
	
	fotosBaixadas++;
	if(fotosBaixadas == qtd_fotos) {
		$("#fotos_baixadas").html("<p>Download Concluído.</p>");
		localStorage.setItem("album", 1); //Grava no LocalStorage que album já foi baixado
		document.getElementById("pagina_download").style.display = "none"; //Muda de tela
		document.getElementById("pagina_capa").style.display = "block";
		mostrar_dados_capa(); //Monta a próxima tela
		alterar_album_banco(); //Chama função com Ajax que atualiza cadastro do album no banco
	}
	else if (fotosBaixadas == 1) {
		$("#fotos_baixadas").html("<p style='font-family:tahoma; font-size:9pt; color:#5f5f5f;'>"+fotosBaixadas+" FOTO BAIXADA <span style='font-weight:800'>DE UM TOTAL DE "+qtd_fotos+"</span></p>");
	}
	else {
		$("#fotos_baixadas").html("<p style='font-family:tahoma; font-size:9pt; color:#5f5f5f;'>"+fotosBaixadas+" FOTOS BAIXADAS <span style='font-weight:800'>DE UM TOTAL DE "+qtd_fotos+"</span></p>");
	}
}

//FUNÇÃO QUE EXTRAI O NOME DO ARQUIVO A PARTIR DO CAMINHO
function pega_nome_arquivo(resposta) {
	var barra = 0;
	var posicao_ultima_barra;
	var valor_caminho = resposta;
	for (a = 0; a < valor_caminho.length; a++) {
		var char_teste = valor_caminho.substring(a, a+1);
		if (char_teste == "/") {
	        	barra++;
	        	if (barra == 7) { //Alterado de 6 para 7 - Única coisa alterada aqui para arrumar o erro crítico.
	        		posicao_ultima_barra = a;
	            		break;
	        	}
	        	else {
	        	}
		}
		else {
		}
	}	
	return valor_caminho.substring(posicao_ultima_barra+1, valor_caminho.length);	
}


//Função para baixar as fotos
function baixarFotos(response,i,qtd_fotos) {

				var caminhocompleto = "http://www.porcocapitalista.com.br"+response[i];
				var nome_arquivo = pega_nome_arquivo(response[i]);
			
				//Aqui vai o comando do download
				var fileTransfer = new FileTransfer();
				var uri = encodeURI(caminhocompleto);
				var fileURL =  cordova.file.dataDirectory+"imagens/"+nome_arquivo;

				fileTransfer.download(
					uri, fileURL, function(entry) {
						console.log("download complete: " + entry.toURL());
						//chamar função que executa somente depois que download é concluído					
						download_concluido(qtd_fotos);
					},
										
					function(error) {
						
						console.log("download error source " + error.source);
						console.log("download error target " + error.target);
						console.log("download error code" + error.code);
						
						//TRATAR ESSE ERRO AQUI
						document.getElementById("fazendo_download").innerHTML = "ERRO NO DOWNLOAD";
						document.getElementById("retomarDownload").style.display = "block";
						$("#fotos_baixadas").html(" ");
						variaveisGlobais["parar_animacao"] = 1;
						downloadInterrompido[0] = 1;
					},
										
					false, {
						headers: {
							"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
						}
					}
				);//Aqui termina o script do download				
}//Fim da função baixarFotos



	// VERIFICAÇÃO EM LOOP 
	var primeiraFoto = [0];
	var contagem123 = 0;
	function myFunction123(response) {
		var qtd_fotos = response[0]; //teste preliminar para baixar só uma foto -- Mudei para umas 7 para testar melhor
		var i = 5;
		
		
		setInterval(function(){
			if (contagem123 < 1) {
				if(downloadInterrompido[0] == 0) { //Só manda baixar as fotos se o download não tiver sido interrompido pelo erro
					baixarFotos(response,i,qtd_fotos);
					contagem123++;
				}
			}
			else {
				var tempoEspera = 17 * qtd_fotos; //17 segundos por foto
				if (contagem123 < tempoEspera) { //Durante quantos segundos vai ficar tentando baixar?
					contagem123++;
					var valorTeste = i - 4;
					if (fotosBaixadasAteAgora[0] == valorTeste) {
						if(downloadInterrompido[0] == 0) { //Só manda baixar as fotos se o download não tiver sido interrompido pelo erro
							i++;
							baixarFotos(response,i,qtd_fotos);
						}
					}
				}
			}
			
		}, 1000);
	}




function somaContagem(somarContagem) {
	fotosBaixadasAteAgora[0] = somarContagem;
}

//Conta quantas fotos baixadas tem na pasta da memória do aparelho
function contaFotosBaixadas() {
	function listDir(path){
		window.resolveLocalFileSystemURL(path,
			function (fileSystem) {
      				var reader = fileSystem.createReader();
      				reader.readEntries(
        				function (entries) {
						var c;
						for (c=0; c<entries.length; c++) {
							somaContagem(c + 1);
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


//Função que envia dados para o servidor e obtém a resposta dele
function obterRespostaServidor(empresa,contrato,album,senha,result2) {
	
	var espacoDiscoBytes = result2 * 1000; //Resultado do Espaço disponível em disco vem em Kb, aqui converte para bytes
	
	var acao = "selecionar";
	variaveisGlobais["empresa"] = empresa;
	variaveisGlobais["contrato"] = contrato;
	variaveisGlobais["album"] = album;
	variaveisGlobais["senha"] = senha;
	$.ajax({
		type: "GET",
		url: 'http://www.porcocapitalista.com.br/minhaformatura/teste4.php',
		data: {'empresa': empresa, 'contrato': contrato, 'album': album, 'senha': senha, 'acao':acao},
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(response, status){
			
			//Só muda de tela caso o retorno do servidor não seja uma mensagem de erro na validação
			if(response == "Álbum não encontrado.") {
				$("#resposta").html("<p>"+response+"</p>");
			}
			else if (response == "Senha incorreta.") {
				$("#resposta").html("<p>"+response+"</p>");
			}
			else {
				//Compara espaço disponível com tamanho do álbum
				//response[4] é a string que pega do servidor trazendo o tamanho do álbum em bytes
				if(espacoDiscoBytes > response[4] * 2) { //Vezes dois porque o espaço disponível tem que ser maior que pelo menos o dobro do tamanho das fotos. Apenas por segurança.
					document.getElementById("pagina_login").style.display = "none";
					document.getElementById("pagina_download").style.display = "block";
					animar();

					//Pega resposta do servidor e grava informações no LocalStorage
					localStorage.setItem("curso", response[1]);
					localStorage.setItem("instituicao", response[2]);
					localStorage.setItem("cor", response[3]);

					myFunction123(response);
				}
				else {
					$("#resposta").html("<p>Memória Insuficiente. Tente abrir espaço na memória do aparelho para conseguir baixar as fotos.</p>");
				}
				
			}

		} //fim do success						
	}); //fim do ajax
} //Fim da função baixarfotos

//Função que verifica quanto espaço em disco tem o aparelho
function verEspacoDisco(empresa,contrato,album,senha) {
	cordova.exec(function(result2) {
		obterRespostaServidor(empresa,contrato,album,senha,result2);
	}, function(error) {
		return error;
	}, "File", "getFreeDiskSpace", []);
}


//Colocar função para verificar conexão aqui
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell connection';
    states[Connection.CELL_3G]  = 'Cell connection';
    states[Connection.CELL_4G]  = 'Cell connection';
    states[Connection.CELL]     = 'Cell connection';
    states[Connection.NONE]     = 'No network connection';

    return states[networkState];
}
avisado = 0;
//Função para validar o formulário
function enviar() {
	//PEGAR VARIÁVEIS
	var empresa = $("#empresa").val();
	var contrato = $("#contrato").val();
	var album = $("#album").val();
	var senha = $("#senha").val();
	var conexao = checkConnection();
	var response;
	
	if (empresa == 'COD. DA EMPRESA') {
		$("#resposta").html("");
		$("#resposta").html("<p>Preencha o campo Cod. da Empresa</p>");
	}
	else if (contrato == 'Nº DO CONTRATO') {
		$("#resposta").html("");
		$("#resposta").html("<p>Preencha o campo Nº do Contrato</p>");
	}
	else if (album == 'Nº DO ALBUM') {
		$("#resposta").html("");
		$("#resposta").html("<p>Preencha o campo Nº do Album</p>");
	}
	else if (senha == '') {
		$("#resposta").html("");
		$("#resposta").html("<p>Preencha o campo Senha</p>");
	}
	else if (conexao == 'No network connection') {
		$("#resposta").html("");
		$("#resposta").html("<p>Você não está conectado à internet.</p>");
	}
	else if (conexao == 'Cell connection') {
		if (avisado == 0) {
			$("#resposta").html("");
			$("#resposta").html("<p>Você está conectado através de uma conexão móvel e isso pode consumir muitos dos seus dados móveis. Deseja baixar as fotos mesmo assim?</p>");
			avisado = 1;
		}
		else {
			verEspacoDisco(empresa,contrato,album,senha);
		}
	}
	else {
		verEspacoDisco(empresa,contrato,album,senha);
	}
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
		//--------------------------- INICIO DO SEU ALGORITMO
		$(document).ready(function(){
			//---ANIMAÇÃO
			$("#logo_entrada").fadeIn(1500, function(){
				$("#logo_entrada").delay(1500).fadeOut(1500, function(){
					//Apaga a tela de animação e verifica se album já foi baixado
					//Se foi baixado, vai direto para a capa, se não, vai para o formulário
					document.getElementById("fundo_entrada").style.display = "none";
					if(baixado == "nao") {
						document.getElementById("pagina_login").style.display = "block";
						limparPasta(); // Chama função que limpa a pasta interna do app caso já tenha havido uma tentativa fracassada de baixar as fotos
						downloadInterrompido[0] = 0; //Para ter certeza de que o download vai começar de novo quando cair nesssa tela
					}
					else {
						document.getElementById("pagina_capa").style.display = "block";
						mostrar_dados_capa();
					}
				});
			})
			//---FIM ANIMAÇÃO
		});
	    
		//--- TELA LOGIN
	        document.getElementById("baixarAlbum").addEventListener("click", enviar);
			
		//--- FIM DA TELA LOGIN
		
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
