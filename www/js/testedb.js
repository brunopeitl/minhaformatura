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
//------TESTE DO BANCO DE DADOS - PT 1
var db;
//------

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
	db = window.sqlitePlugin.openDatabase({name: "DB"});
	document.getElementById("teste").innerHTML = "<p>ETAPA 01 - OK - OKKK</p>";
	/*db.transaction(function(tx) {
	    alert("ETAPA 02 - OK");
            // Cria a Tabela "tabela_testes"
            tx.executeSql('CREATE TABLE IF NOT EXISTS tabela_teste (id integer primary key, titulo text)');
            // Adiciona um elemento a tabela
            tx.executeSql("INSERT INTO tabela_teste (titulo) VALUES (?)", ["Meu primeiro post."]);
             
            // Faz uma busca na tabela
            tx.executeSql("SELECT * FROM tabela_teste;", [], function(tx, res) {
                alert("Quantidade Resultados: " + res.rows.length);
                for (var i = 0;i<res.rows.length;i++){
                    alert("Linha "+i+": "+res.rows.item(i).titulo);
                }
              });
        });*/
	//---------------------------------------------------------
		
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
