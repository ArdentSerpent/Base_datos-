  // Initialize Firebase
  var config = {
  	apiKey: "AIzaSyB1CzDumzWLOPSzuR7ZIbEed85DZUHj2HU",
  	authDomain: "chat-d1e0b.firebaseapp.com",
  	databaseURL: "https://chat-d1e0b.firebaseio.com",
  	projectId: "chat-d1e0b",
  	storageBucket: "",
  	messagingSenderId: "611240885511"
  };
  firebase.initializeApp(config);
  //instancia de Base de Datos 
  const database = firebase.database();

  $("button").click( function( event ) {
    event.preventDefault();
    console.log( $("#mensaje").val() );

    var data = { usuario: "Andres", mensaje: $("#mensaje").val() };
    database.ref("chat/").push(data, function( err ) {
      if (err) { throw err;}
      else {
        console.info("Guardamos tu informacion");
        poner_mensaje(data);
        $("#mensaje").val("");
      }
    });
  });  

  function poner_mensaje( Andres ){
    $("#caja").append( '<p>' + Andres.usuario + ":" + Andres.mensaje + '</p>');
  }

  function iterar(data){
    for ( var tamomelo in data ) {
      if (data.hasOwnProperty( tamomelo) ) {
        var element = data[tamomelo];
        var gato = {
          usuario: element.usuario,
          mensaje: element.mensaje
        };
        poner_mensaje (gato);
      }
    }
  }

  var traer_mensaje = new Promise (function(res, rej) {
    var mensaje = database.ref("/chat/").once("value").then(function(snapshot){
      return res(snapshot.val());
    });
    if (!mensaje) { return rej();}
  });

  traer_mensaje.then(function(data) {
    console.warn(data);
    iterar(data);
  });