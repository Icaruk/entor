
<div style="text-align:center">
	<h1> entor </h1>
	<img src="https://i.gyazo.com/0bdbfe268d70a6fc916ef4faa2e6b68d.png">
</div>


[![entor package size](https://packagephobia.com/badge?p=entor)](https://packagephobia.com/result?p=entor)
<!-- [![entor package size minzipped](https://badgen.net/bundlephobia/minzip/entor)](https://badgen.net/bundlephobia/minzip/entor) [![entor dependency count](https://badgen.net/bundlephobia/dependency-count/entor)](https://badgen.net/bundlephobia/dependency-count/entor) -->

<br>

**entor** loads environment variables from a JSON file into process.env.


- 🚀 Easy JSON configuration
- ⚪️ Zero dependencies
- 💪 Flexibility
- 🎎 Shared environment between all your projects
- 🔨 Generates examples automatically



<br>



<!-- TOC ignore:true -->
# Table of contents


<!-- TOC -->

- [Table of contents](#table-of-contents)
- [Example without any config](#example-without-any-config)
- [Config](#config)
- [Override priority](#override-priority)
- [Examples](#examples)
	- [Custom arguments](#custom-arguments)
	- [Override](#override)
	- [Shared env](#shared-env)
- [<a name='table-of-contents'></a>Go to top](#go-to-top)

<!-- /TOC -->



<br>



# Example without any config


```js
// entor.prod.json
{
	"db_url": "prod://url",
	"username": "prod"
}
```

```js
// index.js
require("entor")();
```

🏃‍♂️ Run
```
node ./index.js --env=prod
```

✅ Entor will load `entor.prod.json` into process.env.
```js
// process.env
{
	"db_url": "prod://url",
	"user": "prod"
}
```


<br>



**❗ Note**
Each value in `process.env` is converted to `string` by Node.



<br>



# Config

```js
const env = require("entor")({config});
//     ↑ entor will always return env object
```

<br>

- **getEnv** `function`: 
  - Function that receives as argument the object with process arguments (`--key=value` → `{key: value}`) that must return a string containing the `env`.
  - Default: `args => args.env`.
<br>

- **env** `string`: Defines the environment type. This will take precedence over `getEnv`.
<br>

- **path** `string`: Defines the path where will look for the file `entor.<env>.json`. Default `./`.
<br>

- **sharedEnvPath** `string`: Defines the file path where a `.json` will be loaded.
<br>

- **override** `object`: object that will be merged with the content of `entor.<env>.json`.
<br>

- **warningLevel** `"none" | "message" | "throw"`:
	- `"none"` will **ignore all** non-critical errors.
	- `"message"` will print all errors but will **never throws**.
	- `"throw"` will print all errors, **throws on critical errors**.
<br>

- **addToProcessEnv** `boolean`: Default `true`. If `true` adds the `entor.<env>.json` content to the `process.env` object.
<br>

- **syncExamples** `boolean`: Default `false`. If `true` syncs the `entor.<env>.json` file with the `entorExample.<env>.json` file.



<br>



# Override priority

1. `override` will override ↓
2. `env` will override ↓
3. `sharedEnvPath` (This is the first file that will be loaded)



<br>



# Examples

## Custom arguments

```js
// index.js
require("entor")({
	getEnv: args => args.myCustomEnv,
});
```

🏃‍♂️ Run
```
node ./index.js --myCustomEnv=local
```



## Override


```js
// entor.prod.json
{
	"db_url": "prod://url",
	"username": "prod"
}
```

```js
// index.js
require("entor")({
	override: {
		db_url: "override://url"
	}
});
```

🏃‍♂️ Run
```
node ./index.js --env=prod
```


✅ Entor will load `entor.prod.json` into process.env and apply the override.

```js
// process.env values:
{
	db_url: "override://url",
	username: "prod"
}
```



## Shared env

```js
// entor.prod.json (located at the parent folder)
{
	"db_url": "shared://url",
}
```

```js
// entor.prod.json (located at project folder)
{
	"username": "prod"
}
```

```js
// index.js
require("entor")({
	sharedEnvPath: "C:/parentFolder/",
});
```

🏃‍♂️ Run
```
node ./index.js --env=prod
```


✅ Entor will merge  `entor.prod.json` (shared) with `prod.entor.json` (project) and write into process.env.

```js
// process.env values:
{
	db_url: "shared://url",
	username: "prod"
}
```



<br>



# <a name='table-of-contents'></a>[Go to top](#table-of-contents) 


