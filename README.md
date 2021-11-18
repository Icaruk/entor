
<div style="text-align:center">
	<font size="6">🌌</font> 
	<h1> entor </h1>
</div>


[![entor package size](https://packagephobia.com/badge?p=entor)](https://packagephobia.com/result?p=entor)
<!-- [![entor package size minzipped](https://badgen.net/bundlephobia/minzip/entor)](https://badgen.net/bundlephobia/minzip/entor) [![entor dependency count](https://badgen.net/bundlephobia/dependency-count/entor)](https://badgen.net/bundlephobia/dependency-count/entor) -->


**entor** loads environment variables from a JSON file into process.env.


- 🚀 Easy JSON configuration
- ⚪️ Zero dependencies
- 💪 Flexibility
- 🎎 Shared environment between all your projects



<br>



<!-- TOC ignore:true -->
# Table of contents


<!-- TOC -->

- [Table of contents](#table-of-contents)
- [Example without any config](#example-without-any-config)
	- [Note ❗](#note-)
- [Config](#config)
- [Override precedence:](#override-precedence)
- [Examples](#examples)
	- [Custom arguments](#custom-arguments)
	- [Override](#override)
	- [Shared env](#shared-env)
- [<a name='table-of-contents'></a>Go to top](#go-to-top)

<!-- /TOC -->



<br>



# Example without any config

Run
```
node ./index.js --entor=prod
```

prod.entor.json
```json
{
	"db_url": "prod://url",
	"username": "prod"
}
```

index.js
```js
require("entor")();
// OR
// const env = require("entor")({ addToProcessEnv: false });
```

✅ Entor will load `local.entor.json` into process.env.
```js
process.env = {
	"db_url": "prod://url",
	"user": "prod"
};
```


<br>



## Note ❗
Each value in `process.env` is converted to `string` by Node.



<br>



# Config

```js
const env = require("entor")({config});
//     ↑ entor will always return env object
```

<br>

- **getEnvType** `function`: 
  - Function that receives as argument the object with process arguments (`--key=value` → `{key: value}`) that must return a string containing the `envType`.
  - Default: `args => args.entor`.
- **envType** `string`: Defines the environment type. This will take precedence over `getEnvType`.
- **path** `string`: Defines the path where will look for the file `<envType>.entor.json`. Default `./`.
- **sharedEnvFilePath** `string`: Defines the file path where a `.json` will be loaded.
- **override** `object`: object that will be merged with the content of `<envType>.entor.json`.
- **warningLevel** `"none" | "message" | "throw"`:
	- `"none"` will **ignore all** non-critical errors.
	- `"message"` will print all errors but will **never throw**.
	- `"throw"` will print all errors, **throw on critical errors**.
- **addToProcessEnv** `boolean`: Default `true`. If `true` adds the `<envType>.entor.json` content to the `process.env` object.


<br>



# Override precedence:

1. `sharedEnvFilePath`
2. `envType`
3. `override`

`sharedEnvFilePath` will overwriteen by `envType`.
`envType`will be overwritten by `override`.



<br>



# Examples

## Custom arguments

Run
```
node ./index.js --myEnv=local
```

index.js
```js
require("entor")({
	getEnvType: args => args.myEnv,
});
```



## Override

Run
```
node ./index.js --entor=prod
```

prod.entor.json
```json
{
	"db_url": "prod://url",
	"username": "prod"
}
```

index.js
```js
require("entor")({
	override: {
		db_url: "override://url"
	}
});
```

✅ Entor will load `prod.entor.json` into process.env and apply the override.

```js
process.env = {
	db_url: "override://url",
	username: "prod"
};
```



## Shared env

Run
```
node ./index.js --entor=prod
```

shared.entor.json
```json
{
	"db_url": "shared://url",
}
```

prod.entor.json
```json
{
	"username": "prod"
}
```

index.js
```js
require("entor")({
	sharedEnvFilePath: "C:/folder/project/shared.entor.json",
});
```

✅ Entor will merge  `shared.entor.json` with `prod.entor.json` and write into process.env.

```js
process.env = {
	db_url: "shared://url",
	username: "prod"
};
```



<br>



# <a name='table-of-contents'></a>[Go to top](#table-of-contents) 


