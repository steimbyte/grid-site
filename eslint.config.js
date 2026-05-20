import securityPlugin from "eslint-plugin-security";

export default [
	{
		files: ["src/**/*.{js,ts}"],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "module",
			globals: {
				browser: true,
				console: "readonly",
				document: "readonly",
				localStorage: "readonly",
				fetch: "readonly",
				prompt: "readonly",
				confirm: "readonly",
				alert: "readonly",
				window: "readonly",
			},
		},
		plugins: {
			"@security": securityPlugin,
		},
		rules: {
			"@security/no-empty-catch": "error",
			"@security/detect-innerhtml-use": "error",
			"no-console": ["warn", { allow: ["error", "warn"] }],
		},
	},
];
