
//! Esto es index del proyecto


const entor = require("entor/lib/entor");
const {join} = require("path");


entor({
	envType: "local",
	sharedEnvPath: "C:/Users/admin/Desktop",
	// >>> Podríamos hacer un generador de example.entor.json
});


console.log( "process.env.mongo_uri", process.env.mongo_uri );

