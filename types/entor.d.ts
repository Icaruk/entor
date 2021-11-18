export = entor;
/**
 * @typedef {Object} props
 * @property {string} envType Environment type, it prepends the files like `<envType>.entor.json`. Example: `envType = "local"` will search the file `local.entor.json` on the defined `path`.
 * @property {string} path The `<envType>.entor.json` folder path from the root. Default `./`.
 * @property {string} sharedEnvFilePath The path to the shared environment file from the root. Default `undefined`.
 * @property {function} getEnvType Function that returns the `<envType>`.
 * @property {object} override JSON that will be merged with the `<envType>.entor.json` content.
 * @property {"none" | "message" | "throw"} warningLevel
 * 	Handles warnings behaviour:
 * 	- `"none"`: Ignores all warnings.
 *  - `"message"`: Prints a warning message.
 *  - `"throw"`: Throws an error.
*/
/**
 * @param {props} props
*/
declare function entor({ envType, getEnvType, path, sharedEnvFilePath, override, addToProcessEnv, warningLevel, }: props): any;
declare namespace entor {
    export { props };
}
type props = {
    /**
     * Environment type, it prepends the files like `<envType>.entor.json`. Example: `envType = "local"` will search the file `local.entor.json` on the defined `path`.
     */
    envType: string;
    /**
     * The `<envType>.entor.json` folder path from the root. Default `./`.
     */
    path: string;
    /**
     * The path to the shared environment file from the root. Default `undefined`.
     */
    sharedEnvFilePath: string;
    /**
     * Function that returns the `<envType>`.
     */
    getEnvType: Function;
    /**
     * JSON that will be merged with the `<envType>.entor.json` content.
     */
    override: object;
    /**
     * 	Handles warnings behaviour:
     * 	- `"none"`: Ignores all warnings.
     *  - `"message"`: Prints a warning message.
     *  - `"throw"`: Throws an error.
     */
    warningLevel: "none" | "message" | "throw";
};
