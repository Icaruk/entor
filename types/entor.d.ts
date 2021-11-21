export = entor;
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
declare function entor({ env, getEnv, path, sharedEnvPath, override, addToProcessEnv, warningLevel, syncExamples, }: props): any;
declare namespace entor {
    export { props };
}
type props = {
    /**
     * Environment type, it prepends the files like `entor.<env>.json`. Example: `env = "local"` Entor will search the file `entor.local.json` on the defined `path`.
     */
    env: string;
    /**
     * Default `./`. The `entor.<env>.json` folder path from the root.
     */
    path: string;
    /**
     * Default `undefined`. The **absolute path** to the shared environment folder path from the root. With `env = "local"` Entor will search for `local.shared.entor.json`.
     */
    sharedEnvPath: string;
    /**
     * Function that returns the `<env>`.
     */
    getEnv: Function;
    /**
     * JSON that will be merged with the `entor.<env>.json` content.
     */
    override: object;
    /**
     * Default `message`
     * Handles warnings behaviour:
     * - `"none"`: Ignores all warnings.
     * - `"message"`: Prints a warning message.
     * - `"throw"`: Throws an error.
     */
    warningLevel: "none" | "message" | "throw";
    /**
     * Default `true`. If `true` adds the `entor.<env>.json` content to the `process.env` object.
     */
    addToProcessEnv: boolean;
    /**
     * Default `false`. If `true` syncs the `entor.<env>.json` file with the `entorExample.<env>.json` file.
     */
    syncExamples: boolean;
};
