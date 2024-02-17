import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

import packageJson from "./package.json" assert { type: "json" };
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            terser(), // A Rollup plugin to generate a minified bundle with terser.
            resolve(), // Lets Rollup find 'node_modules' packages when bundling dependencies
            commonjs(), // Converts CommonJS modules to ES6 format so they can be included in a Rollup bundle
            typescript({tsconfig: "./tsconfig.json"}), // Transpiles TypeScript code to JavaScript
            alias({
                entries: [
                    { find: '~/*', replacement: './src' }
                ]
            })
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{file: "dist/index.d.ts", format: "esm"}],
        plugins: [dts()], // Generates a bundled .d.ts file from TypeScript declaration files
    },
];
