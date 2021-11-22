
# Using entor package to share environment variables

Have you ever used the same environment variables in different projects?
Have you ever 


[Entor](https://www.npmjs.com/package/entor) is a tool for managing environment variables like dotenv, but with a more modern approach.

One of the main features of entor is that it **allows you to share environment variables between multiple projects**.

That's useful when you have multiple projects using the same environment variables like database credentials, secrets, API keys, etc.



<br>

## Main features

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


Launch your file with:
`node index.js --env=local`
or
`node index.js --env=prod`


<br>


That's all, by default entor will set the environment variables from the file `entor.local.json` if the `--env` flag is set to `local` or `prod` respectively.
The `--env` flag can be customizable on the config.


