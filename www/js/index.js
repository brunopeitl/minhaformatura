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

//Função que baixa as fotos
function obterRespostaServidor(empresa,contrato,album,senha) {
	$.ajax({
		type: "GET",
		url: 'http://www.porcocapitalista.com.br/minhaformatura/teste4.php',
		data: {'empresa': empresa, 'contrato': contrato, 'album': album, 'senha': senha},
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
				//Passa para a próxima tela
				document.getElementById("pagina_login").style.display = "none";
				document.getElementById("pagina_download").style.display = "block";
				
				var qtd_fotos = response[0]; //Lê a resposta do servidor que dá a quantidade de fotos a serem baixadas
				
				var i; // Laço for para Baixar as imagens, uma por uma.
				for (i = 1; i <= qtd_fotos; i++) {
					var caminhocompleto = "http://www.porcocapitalista.com.br"+response[i];
					var nome_arquivo = pega_nome_arquivo(response[i]);
					
					//Aqui vai o comando do download
					var fileTransfer = new FileTransfer();
					var uri = encodeURI(caminhocompleto);
					var fileURL =  cordova.file.dataDirectory+"imagens/"+nome_arquivo;

					fileTransfer.download(
						uri, fileURL, function(entry) {
							console.log("download complete: " + entry.toURL());
							//mostra o link ir para a próxima página somente depois que o download é concluído
							//verificar se é a ultima foto, só mostra se é a última foto que baixou
							document.getElementById("link_proxima").style.display = "block";
							/*if(i == qtd_fotos) {
								alert("chegou até aqui");
							}
							else {
							}*/
						},
										
						function(error) {
							//Aqui vai os comandos a serem executados em caso de erro
							console.log("download error source " + error.source);
							console.log("download error target " + error.target);
							console.log("download error code" + error.code);
							$("#resposta").html("<p>"+response+"</p>");
						},
										
						false, {
							headers: {
								"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
							}
						}
					);
				}//Aqui termina o script do download
				//COMANDO PARA MOSTRAR LINK NO FINAL DO DOWNLOAD ESTAVA AQUI ANTES ----------------------------		
			}//fim do último else
		} //fim do success						
	}); //fim do ajax
} //Fim da função baixarfotos

//Função para validar o formulário
function enviar() {
	//PEGAR VARIÁVEIS
	var empresa = $("#empresa").val();
	var contrato = $("#contrato").val();
	var album = $("#album").val();
	var senha = $("#senha").val();
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
					alert(baixado);
					document.getElementById("fundo_entrada").style.display = "none";
					document.getElementById("pagina_login").style.display = "block";
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
