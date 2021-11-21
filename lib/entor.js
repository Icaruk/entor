
const fs = require("fs");
const { arch } = require("os");
const {join} = require("path");



const defaultWarningLevel = "message";



function leeJSON(_ruta,) {
	
	let buff;
	
	try {
		
		if (!fs.existsSync(_ruta)) throw false;
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
 * @property {string} env Environment type, it prepends the files like `entor.<env>.json`. Example: `env = "local"` Entor will search the file `entor.local.json` on the defined `path`.
 * @property {string} path Default `./`. The `entor.<env>.json` folder path from the root. 
 * @property {string} sharedEnvPath Default `undefined`. The **absolute path** to the shared environment folder path from the root. With `env = "local"` Entor will search for `local.shared.entor.json`.
 * @property {function} getEnv Function that returns the `<env>`.
 * @property {object} override JSON that will be merged with the `entor.<env>.json` content.
 * @property {"none" | "message" | "throw"} warningLevel Default `message`
 * 	Handles warnings behaviour:
 * 	- `"none"`: Ignores all warnings.
 *  - `"message"`: Prints a warning message.
 *  - `"throw"`: Throws an error.
 * @property {boolean} addToProcessEnv Default `true`. If `true` adds the `entor.<env>.json` content to the `process.env` object.
 * @property {boolean} syncExamples Default `false`. If `true` syncs the `entor.<env>.json` file with the `entorExample.<env>.json` file.
 * 
*/



/**
 * Run your node app with `--env=prod` to set the `env` on startup.
 * @param {props} props
*/
function entor({
	env,
	getEnv = args => args.env,
	path,
	sharedEnvPath,
	override,
	addToProcessEnv = true,
	warningLevel = defaultWarningLevel,
	syncExamples = false,
} = {}) {
	
	
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
	
	
	
	// Si no me viene env directo, uso getEnv
	if (!env) {
		
		const arrArgv = process.argv.slice(2);
		const entorArguments = {};
		
		arrArgv.forEach( _arg => {
			let [key, value] = _arg.split("="); //  '--env=prod' → ['--env', 'prod']
			key = key.replace(/^--/, ""); // '--env' → 'env'
			entorArguments[key] = value;
		});
		
		
		env = getEnv(entorArguments);
		
	};
	
	
	
	let ruta = process.cwd(); // c:\Users\admin\Desktop\entor
	if (path) ruta = join(ruta, path);
	
	
	
	// ***********************************************************
	// Leo shared
	// ***********************************************************
	
	let sharedJson = null;
	
	
	if (sharedEnvPath) {
		
		const sharedFilename =  `entor.${env}.json`;
		const json = leeJSON( join(sharedEnvPath, sharedFilename ));
		
		if (json === "noFile") {
			return showError({warningLevel, message: `Couldn't find '${sharedFilename}' on sharedEnvPath ${sharedEnvPath}.`, errorType: SyntaxError, color: "red"});
		} else if (json === "parsingError") {
			return showError({warningLevel, message: `Error parsing '${sharedFilename}' on sharedEnvPath  ${sharedEnvPath}.`, errorType: SyntaxError, color: "red"});
		} else if (json === "empty") {
			showError({warningLevel, message: `${_archivo} seems empty on sharedEnvPath.`, color: "yellow"});
		} else if (! json) {
			return showError({
				message: `Can't resolve sharedEnvPath ${sharedEnvPath}  ${sharedEnvPath}.`,
				forceWarningLevel: warningLevel === "none" ? "message" : warningLevel,
				color: "red",
				errorType: ReferenceError,
			});
		} else {
			sharedJson = json;
			console.log("\x1b[32m%s\x1b[0m", `[entor] ${sharedFilename} (shared) has been loaded.`);
		};
		
	};
	
	
	if (!env && !sharedJson) return showError({
		message: "No env provided, getEnv failed to provide the env and/or sharedEnvPath was not provided.", 
		forceWarningLevel: warningLevel === "none" ? "message" : warningLevel,
		color: "red"
	});
	
	
	
	// ***********************************************************
	// Leo entor
	// ***********************************************************
	
	let loadedEntor = null;
	let archivo = `entor.${env}.json`;
	
	const resLeeJSON = leeJSON( join(ruta, archivo) );
	
	
	if (!sharedJson) {
		if (resLeeJSON === "noFile") {
			return showError({warningLevel, message: `Couldn't find '${archivo}'.`, errorType: SyntaxError, color: "red"});
		} else if (resLeeJSON === "parsingError") {
			return showError({warningLevel, message: `Error parsing ${archivo}`, errorType: SyntaxError, color: "red"});
		} else if (resLeeJSON === "empty") {
			showError({warningLevel, message: `${archivo} seems empty`, color: "yellow"});
		} else {
			loadedEntor = resLeeJSON;
		};
	} else {
		if (resLeeJSON === "noFile") {
			showError({warningLevel, message: `Couldn't find '${archivo}'.`, errorType: SyntaxError, color: "yellow"});
		} else if (resLeeJSON === "parsingError") {
			showError({warningLevel, message: `Error parsing ${archivo}`, errorType: SyntaxError, color: "yellow"});
		} else if (resLeeJSON === "empty") {
			showError({warningLevel, message: `${archivo} seems empty`, color: "yellow"});
		} else {
			loadedEntor = resLeeJSON;
		};
	};
	
	
	
	if (! loadedEntor && !sharedJson) {
		return showError({
			message: `'entor.${env}.json' couldn't be found.`,
			forceWarningLevel: warningLevel === "none" ? "message" : warningLevel,
			color: "red",
		});
	} else if (loadedEntor) {
		console.log("\x1b[32m%s\x1b[0m", `[entor] ${archivo} has been loaded.`);
	};
	
	
	
	// Merge shared
	if (sharedJson) loadedEntor = {
		...sharedJson,
		...loadedEntor,
	};
	
	
	
	// Merge override
	if (override) {
		
		const isObject = typeof override === "object" && override !== null;
		if (!isObject) throw TypeError(`The override must be an object.`);
		
		loadedEntor = {
			...loadedEntor,
			...override,
		};
		
	};
	
	
	
	// ***********************************************************
	// Sync examples
	// ***********************************************************
	

	if (syncExamples) {

		const arrEntors = [];
		
		fs.readdirSync(ruta).forEach( _archivo => {
			const esEntor = /^entor\.(.*)\.json/.test(_archivo);
			if (esEntor) arrEntors.push(_archivo);
		});
		
		
		arrEntors.forEach( _archivo => {
			
			const resLeeJSON = leeJSON( join(ruta, _archivo) );
			
			if (typeof resLeeJSON === "object" && resLeeJSON !== null) {
				Object.keys(resLeeJSON).forEach( _key => resLeeJSON[_key] = resLeeJSON[_key] = "" ); // quito todos los valores
				
				let nombreArchivoExample = _archivo.replace(/^entor/, "entorExample");
				
				fs.writeFileSync( // escribo el archivo
					join(ruta, nombreArchivoExample),
					JSON.stringify(resLeeJSON, null, 4)
				);
			};
			
		});
	
	}
	
	
	// ***********************************************************
	// process.env
	// ***********************************************************
	
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

