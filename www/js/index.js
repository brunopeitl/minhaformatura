/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//Array para guardar informações variadas
//Também salva informações: Cod Empresa, Nº Contrato, Album e Senha para usar depois
var variaveisGlobais = {parar_animacao:0, empresa:"", contrato:"", album:"", senha:""};

//Mostrar dados salvos no LocalStorage na página CAPA
function mostrar_dados_capa() {
	$("#curso").html(localStorage.getItem("curso"));
	$("#instituicao").html(localStorage.getItem("instituicao"));
	$("#cor").html(localStorage.getItem("cor"));
}

function deuCerto(response2) {
	alert(response2);
}

//FUNÇÃO COM AJAX PARA ATUALIZAR CADASTRO DO ALBUM NO BANCO DE DADOS E COLOCAR QUE ALBUM JÁ FOI BAIXADO
function alterar_album_banco() {
	var acao = "atualizar";
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
		success: function(response2, status){
			deuCerto(response2);
		} //fim do success						
	}); //fim do ajax
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
	        	if (barra == 6) {
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
function baixarFotos(response) {
	//Só muda de tela caso o retorno do servidor não seja uma mensagem de erro na validação
	if(response == "Álbum não encontrado.") {
		$("#resposta").html("<p>"+response+"</p>");
	}
	else if (response == "Senha incorreta.") {
		$("#resposta").html("<p>"+response+"</p>");
	}
	else {
		//Passa para a próxima tela
		document.getElementById("pagina_login").style.display = "none";
		document.getElementById("pagina_download").style.display = "block";
		animar();
				
		var qtd_fotos = response[0]; //Lê a resposta do servidor que dá a quantidade de fotos a serem baixadas
		//Pega resposta do servidor e grava informações no LocalStorage
		localStorage.setItem("curso", response[1]);
		localStorage.setItem("instituicao", response[2]);
		localStorage.setItem("cor", response[3]);
				
		var i; // Laço for para Baixar as imagens, uma por uma.
		for (i = 4; i <= qtd_fotos+3; i++) { //Da forma como está, ele está baixando só a cada 4 fotos.
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
					//Aqui vai os comandos a serem executados em caso de erro
					console.log("download error source " + error.source);
					console.log("download error target " + error.target);
					console.log("download error code" + error.code);
					$("#fotos_baixadas").html("ERRO NO DOWNLOAD.");
					variaveisGlobais["parar_animacao"] = 1;
					document.getElementById("fazendo_download").style.display = "none";
				},
										
				false, {
					headers: {
						"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
					}
				}
			);//Aqui termina o script do download
		}//Aqui termina o laço for
		
	}//fim do último else
}//Fim da função baixarFotos

//Função que envia dados para o servidor e obtém a resposta dele
function obterRespostaServidor(empresa,contrato,album,senha) {
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
			baixarFotos(response);
		} //fim do success						
	}); //fim do ajax
} //Fim da função baixarfotos

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
			obterRespostaServidor(empresa,contrato,album,senha);
		}
	}
	else {
		obterRespostaServidor(empresa,contrato,album,senha);
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
		//---------------------------Aqui vai tudo o que interessa
		$(document).ready(function(){
			//---ANIMAÇÃO
			$("#logo_entrada").fadeIn(1500, function(){
				$("#logo_entrada").delay(1500).fadeOut(1500, function(){
					//Apaga a tela de animação e verifica se album já foi baixado
					//Se foi baixado, vai direto para a capa, se não, vai para o formulário
					document.getElementById("fundo_entrada").style.display = "none";
					if(baixado == "nao") {
						document.getElementById("pagina_login").style.display = "block";
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
