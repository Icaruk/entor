
# Using entor package to share environment variables

Have you ever used the **same environment variables in different projects**?

Most of the times we use the same databases or API keys across different projects and we redefine them on every `.env` on every project.



<br>

## Problem

We usually use the following folder structure:

```
Main folder/
├── Project1/
│	├── .env.local
│	│	{
│	│		MONGO_URI: mongodb://localhost:27017
│	│		API_KEY: localKey
│	│		SPECIFIC_PROJECT_KEY: 1111
│	│	}
│	└── .env
│		{
│			MONGO_URI: mongodb://prod:27017
│			API_KEY: prodKey
│			SPECIFIC_PROJECT_KEY: 8888
│		}
└── Project2/
	├── .env.local
	│	{
	│		MONGO_URI: mongodb://localhost:27017
	│		API_KEY: localKey
	│		SPECIFIC_PROJECT_KEY: 2222
	│	}
	└── .env
		{
			MONGO_URI: mongodb://prod:27017
			API_KEY: prodKey
			SPECIFIC_PROJECT_KEY: 9999
		}
```


There are duplicated variables, in case we change the `MONGO_URI` in a future, we have to change it in all the projects.



<br>

## Solution

```
Main folder/
├── entor.local.json
│	{
│		"MONGO_URI": "mongodb://localhost:27017",
│		"API_KEY": "localKey"
│	}
├── entor.prod.json
│	{
│		"MONGO_URI": "mongodb://localhost:27017",
│		"API_KEY": "localKey"
│	}
├── Project1/
│	├── entor.local.json
│	│	{
│	│		"SPECIFIC_PROJECT_KEY": "1111"
│	│	}
│	└── entor.prod.json
│		{
│			"SPECIFIC_PROJECT_KEY": "8888"
│		}
└── Project2/
	├── entor.local.json
	│	{
	│		"SPECIFIC_PROJECT_KEY": "2222"
	│	}
	└── entor.prod.json
		{
			"SPECIFIC_PROJECT_KEY": "9999"
		}
```

If some day we need to change the `MONGO_URI`, we just need to change it in the file `entor.local.json` located at `Main folder/`.


<br>

## How

[Entor](https://www.npmjs.com/package/entor) is a tool for managing environment variables like dotenv, but with a more modern approach.

One of the main features of entor is that it **allows you to share environment variables between multiple projects**.

That's useful when you have multiple projects using the same environment variables like database credentials, secrets, API keys, etc.



<br>

### Main features

- 🎎 Shared environment variables
- ⚙️ Zero configuration
- ⚪️ Zero dependencies
- 📄 It uses JSON files
- 🔨 Generates environment examples automatically
- 🪶 Only 17 kB



<br>

## Using entor

It's pretty simple to use. First, install the package:

`npm install entor`


<br>

Next create two files in the root of your project:

- entor.local.json
	```json
	{
		"MONGO_URI": "mongdb://localhost:27017",
	}
	```

- entor.prod.json
	```json
	{
		"MONGO_URI": "mongdb://prod:27017",
	}
	```

<br>

Then add the following line to your `index.js` file:

```js
require("entor")();
```


<br>


Now you can launch your file with:
`node index.js --env=local`

And your `process.env.MONGO_URI` will be `mongodb://localhost:27017`.

Or with:
`node index.js --env=prod`

And your `process.env.MONGO_URI` will be `mongdb://prod:27017`.


<br>


That's all, by default entor will set the environment variables from the file `entor.<env>.json` using the `--env` flag value.
The `--env` flag can be customizable on the config.



<br>

## Shared environment variables



