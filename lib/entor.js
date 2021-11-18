
const fs = require("fs");
const { arch } = require("os");
const {join} = require("path");



const defaultWarningLevel = "message";



function showError({warningLevel = defaultWarningLevel, message, errorType = Error}){
	
	switch (warningLevel) {
		case "throw": throw new errorType(message);
		case "message": console.log(message);
	};
	
};

function leeJSON(_ruta,) {
	
	let buff;
	
	try {
		buff = fs.readFileSync(_ruta);
	} catch(err) {
		return "noFile";
	};
	
	const jsonStr = buff.toString();
	
	
	
	let json = null;
	
	try {
		json = JSON.parse(jsonStr);
	} catch(err) {
		return "parsingError";
	};
	
	
	if (!json) return "empty";
	
	
	return json;
	
};



/**
 * @typedef {Object} props
 * @property {string} envType Environment type, it prepends the files like `entor.<envType>.json`. Example: `envType = "local"` Entor will search the file `entor.local.json` on the defined `path`.
 * @property {string} path Default `./`. The `entor.<envType>.json` folder path from the root. 
 * @property {string} sharedEnvPath Default `undefined`. The path to the shared environment folder path from the root. With `envType = "local"` Entor will search for `local.shared.entor.json`.
 * @property {function} getEnvType Function that returns the `<envType>`.
 * @property {object} override JSON that will be merged with the `entor.<envType>.json` content.
 * @property {"none" | "message" | "throw"} warningLevel
 * 	Handles warnings behaviour:
 * 	- `"none"`: Ignores all warnings.
 *  - `"message"`: Prints a warning message.
 *  - `"throw"`: Throws an error.
 * @property {boolean} addToProcessEnv Default `true`. If `true` adds the `entor.<envType>.json` content to the `process.env` object.
 * @property {"never" | "onlyCreate" | "always"} generateExample
 * Default `"never"`. Generates an `entor.example.json` example file, containing keys but not values of your entor files.
 * - `"never"`: Example file will never be generated.
 * - `"onlyCreate"`: Example file is generated only if it doesn't exist.
 * - `"always"`: Example file will be generated always.
*/



/**
 * @param {props} props
*/
function entor({
	envType,
	getEnvType = args => args.entor,
	path,
	sharedEnvPath,
	override,
	addToProcessEnv = true,
	warningLevel = defaultWarningLevel,
}) {
	
	
	function showError({forceWarningLevel, message, errorType = Error, color}) {
		
		let _warningLevel = forceWarningLevel || warningLevel;
		
		message = `[entor] ${message}`;
		
		switch (color) {
			case "red": 	color = `\x1b[31m%s\x1b[0m`; break;
			case "green": 	color = `\x1b[32m%s\x1b[0m`; break;
			case "yellow": 	color = `\x1b[33m%s\x1b[0m`; break;
			case "magenta": color = `\x1b[35m%s\x1b[0m`; break;
			case "blue": 	color = `\x1b[34m%s\x1b[0m`; break;
			case "cyan": 	color = `\x1b[36m%s\x1b[0m`; break;
			default: 		color = `\x1b[37m%s\x1b[0m`; break;
		};
		
		switch (_warningLevel) {
			case "throw": throw new errorType(message);
			case "message": console.log(color, message);
		};
		
	};
	
	
	
	// Si no me viene envType directo, uso getEnvType
	if (!envType) {
		
		const arrArgv = process.argv.slice(2);
		const entorArguments = {};
		
		arrArgv.forEach( _arg => {
			let [key, value] = _arg.split("="); //  '--envType=prod' → ['--envType', 'prod']
			key = key.replace(/^--/, ""); // '--envType' → 'envType'
			entorArguments[key] = value;
		});
		
		
		envType = getEnvType(entorArguments);
		
	};
	
	
	
	let ruta = process.cwd(); // c:\Users\admin\Desktop\entor
	if (path) ruta = join(ruta, path);
	
	
	
	// ***********************************************************
	// Leo shared
	// ***********************************************************
	
	let sharedJson = null;
	
	
	if (sharedEnvPath) {
		
		//! Si no tengo envType no pongo nada? Así cargaría entor.<envType>.json sin especificar?
		
		const sharedFilename =  `entor.${envType}.json`;
		const json = leeJSON( join(sharedEnvPath, sharedFilename ));
		
		if (json === "noFile") {
			return showError({warningLevel, message: `Couldn't find '${sharedFilename}' on sharedEnvPath.`, errorType: SyntaxError, color: "red"});
		} else if (json === "parsingError") {
			return showError({warningLevel, message: `Error parsing '${sharedFilename}' on sharedEnvPath.`, errorType: SyntaxError, color: "red"});
		} else if (json === "empty") {
			showError({warningLevel, message: `${_archivo} seems empty on sharedEnvPath.`, color: "yellow"});
		} else if (! json) {
			return showError({
				message: `Can't resolve sharedEnvPath ${sharedEnvPath}.`,
				forceWarningLevel: warningLevel === "none" ? "message" : warningLevel,
				color: "red",
				errorType: ReferenceError,
			});
		} else {
			sharedJson = json;
			console.log("\x1b[32m%s\x1b[0m", `[entor] ${sharedFilename} (shared) has been loaded.`);
		};
		
	};
	
	
	if (!envType && !sharedJson) return showError({
		message: "No envType provided, getEnvType failed to provide the envType and/or sharedEnvPath was not provided.", 
		forceWarningLevel: warningLevel === "none" ? "message" : warningLevel,
		color: "red"
	});
	
	
	
	// Listo todos los archivos de la carpeta
	const arrEntors = [];
	
	fs.readdirSync(ruta).forEach(archivo => {
		const esEntor = /^entor\.(.*)\.json/.test(archivo);
		if (esEntor) arrEntors.push(archivo);
	});
	
	
	
	// ***********************************************************
	// Leo entor.<envType>.json
	// ***********************************************************
	
	let loadedEntor = null;
	let archivo = null;
	
	
	for (const _archivo of arrEntors) {
		
		const [__NOT_USED, _envType, _extension] = _archivo.split("."); // entor.local.json
		
		
		if (envType === _envType) {
			
			const json = leeJSON( join(ruta, _archivo) );
			
			if (json === "noFile") return showError({warningLevel, message: `Error parsing ${_archivo}`, errorType: SyntaxError, color: "red"});
			if (json === "parsingError") return showError({warningLevel, message: `Error parsing ${_archivo}`, errorType: SyntaxError, color: "red"});
			if (json === "empty") showError({warningLevel, message: `${_archivo} seems empty`, color: "yellow"});
			
			if (json) {
				loadedEntor = json;
				archivo = _archivo;
			} else break;
				
		};
		
	};
	
	
	
	if (! loadedEntor && !sharedJson) {
		return showError({
			message: `'entor.${envType}.json' couldn't be found.`,
			forceWarningLevel: warningLevel === "none" ? "message" : warningLevel,
			color: "red",
		});
	} else if (loadedEntor) {
		console.log("\x1b[32m%s\x1b[0m", `[entor] ${archivo} has been loaded.`);
	};
	
	
	
	// Shared
	if (sharedJson) loadedEntor = {
		...sharedJson,
		...loadedEntor,
	};
	
	
	
	// Override
	if (override) {
		
		const isObject = typeof override === "object" && override !== null;
		if (!isObject) throw TypeError(`The override must be an object.`);
		
		loadedEntor = {
			...loadedEntor,
			...override,
		};
		
	};
	
	
	
	// Lo quiero pasar a process.env
	if (addToProcessEnv) {
		
		const currentKeys = Object.keys(process.env);
		const keysWithConflict = []; // lista de keys que hacen conflicto con process.env
		
		Object.keys(loadedEntor).forEach( _key => {
			if (currentKeys.includes(_key)) keysWithConflict.push(_key);
			process.env[_key] = loadedEntor[_key];
		});
		
		
		if (keysWithConflict.length) showError({
			message: `${archivo} has overwritten the following process.env variables: ${keysWithConflict.join(", ")}`,
			color: "yellow",
		});
	};
	
	
	return loadedEntor;
	
};


module.exports = entor;

