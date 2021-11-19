
const entor = require("entor/lib/entor");

const sharedEnvPath = process.cwd();

describe("Default config", () => {

	
	test("envType:local", async () => {
		
		entor({
			envType: "local",
			path: "proyecto_simulacro",
		});
		
		
		expect(process.env.test).toBe("local");
		expect(process.env.email_user).toBe("local");
		
	});
	
	test("envType:local override", async () => {
		
		entor({
			envType: "local",
			path: "proyecto_simulacro",
			override: {
				email_user: "localOverride"
			},
		});
		
		
		expect(process.env.test).toBe("local");
		expect(process.env.email_user).toBe("localOverride");
		
	});
	
	test("envType:prod", async () => {
		
		entor({
			envType: "prod",
			path: "proyecto_simulacro",
		});
		
		
		expect(process.env.test).toBe("prod");
		expect(process.env.email_user).toBe("prod");
		
	});
	
	test("envType:error", async () => {
		
		entor({
			envType: "error",
			path: "proyecto_simulacro",
		});
		
		
		expect(process.env.test).not.toBe("nadaxd");
		
	});
	
	
});



describe("Otros", () => {
	
	test("Juankeo getEnvType:local", async () => {
		
		entor({
			getEnvType: () => "local",
			path: "proyecto_simulacro",
		});
		
		
		expect(process.env.test).toBe("local");
		expect(process.env.email_user).toBe("local");
		
	});
	
	test("getEnvType:local2 path:env", async () => {
		
		entor({
			getEnvType: () => "local2",
			path: "proyecto_simulacro/env",
		});
		
		
		expect(process.env.test).toBe("local2");
		expect(process.env.email_user).toBe("local2");
		
	});
	
});



describe("Shared", () => {
	
	test("Path", async () => {
		
		entor({
			getEnvType: () => "local",
			path: "proyecto_simulacro",
			sharedEnvPath: sharedEnvPath,
		});
		
		
		expect(process.env.test).toBe("local");
		expect(process.env.email_user).toBe("local");
		
	});
	
	test("Path + shared", async () => {
		
		entor({
			getEnvType: () => "local2",
			path: "proyecto_simulacro/env",
			sharedEnvPath: sharedEnvPath,
		});
		
		
		expect(process.env.test).toBe("local2");
		expect(process.env.email_user).toBe("local2");
		
	});
	
	test("Path + shared + override", async () => {
		
		entor({
			getEnvType: () => "local2",
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