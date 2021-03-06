var express = require('express');
const apiRouter = express.Router();
var request = require("request");

//exemple URL:  http://localhost:8484/orchestrateur-api/public/propositionPret
               //?nbMois=120&montant=20000
apiRouter.route('/orchestrateur-api/public/propositionPret')
.get( function(req , res  , next ) {
	var nbMois = parseInt(req.query.nbMois);
	var montant = parseInt(req.query.montant);
	var url1 = "http://localhost:8282/taux-api/public/tauxInteretCourant?nbMois="+nbMois;
	request(url1, function(error, response, body) {
		//callback recuperant la reponse numero 1
		console.log("status req1=" + response.statusCode);
		console.log("body req1 au format json=" + body);
		var tauxInteretResponseJs = JSON.parse(body);
		var url2 = "http://localhost:8282/mensualite-api/public/mensualite?nbMois="
		           +nbMois+"&taux=" + tauxInteretResponseJs.tauxInteret+"&montant=" 
				   + montant;
	    request(url2, function(error, response, body) {
			//sous callback recuperant la reponse numero 2
			console.log("status req2=" + response.statusCode);
		    console.log("body req2 au format json=" + body);
			var calculMensualiteResponseJs = JSON.parse(body);
			var jsRes = {
				nbMois : nbMois ,	montant : montant , 
				tauxInteret : tauxInteretResponseJs.tauxInteret,
				mensualite : calculMensualiteResponseJs.mensualite,
				fraisDossier : 100.0
			};
			res.send(jsRes);		
		});
	});
});


exports.apiRouter = apiRouter;