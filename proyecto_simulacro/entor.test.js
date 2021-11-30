
const entor = require("entor/lib/entor");

const sharedEnvPath = process.cwd();

describe("Default config", () => {

	
	test("env:local", async () => {
		
		entor({
			env: "local",
			path: "proyecto_simulacro",
		});
		
		
		expect(process.env.test).toBe("local");
		expect(process.env.email_user).toBe("local");
		
	});
	
	test("env:local override", async () => {
		
		entor({
			env: "local",
			path: "proyecto_simulacro",
			override: {
				email_user: "localOverride"
			},
		});
		
		
		expect(process.env.test).toBe("local");
		expect(process.env.email_user).toBe("localOverride");
		
	});
	
	test("env:prod", async () => {
		
		entor({
			env: "prod",
			path: "proyecto_simulacro",
		});
		
		
		expect(process.env.test).toBe("prod");
		expect(process.env.email_user).toBe("prod");
		
	});
	
	test("env:error", async () => {
		
		entor({
			env: "error",
			path: "proyecto_simulacro",
		});
		
		
		expect(process.env.test).not.toBe("nadaxd");
		
	});
	
	
});



describe("Otros", () => {
	
	test("Juankeo getEnv:local", async () => {
		
		entor({
			getEnv: () => "local",
			path: "proyecto_simulacro",
		});
		
		
		expect(process.env.test).toBe("local");
		expect(process.env.email_user).toBe("local");
		
	});
	
	test("getEnv:local2 path:env", async () => {
		
		entor({
			getEnv: () => "local2",
			path: "proyecto_simulacro/env",
		});
		
		
		expect(process.env.test).toBe("local2");
		expect(process.env.email_user).toBe("local2");
		
	});
	
});



describe("Shared", () => {
	
	test("Path", async () => {
		
		entor({
			getEnv: () => "local",
			path: "proyecto_simulacro",
			sharedEnvPath: sharedEnvPath,
		});
		
		
		expect(process.env.test).toBe("local");
		expect(process.env.email_user).toBe("local");
		
	});
	
	test("Path + shared", async () => {
		
		entor({
			getEnv: () => "local2",
			path: "proyecto_simulacro/env",
			sharedEnvPath: sharedEnvPath,
		});
		
		
		expect(process.env.test).toBe("local2");
		expect(process.env.email_user).toBe("local2");
		
	});
	
	test("Path + shared + override", async () => {
		
		entor({
			getEnv: () => "local2",
			path: "proyecto_simulacro/env",
			sharedEnvPath: sharedEnvPath,
			override: {
				shared: "localOverride"
			},
		});
		
		
		expect(process.env.shared).toBe("localOverride");
		expect(process.env.test).toBe("local2");
		
	});
	
});