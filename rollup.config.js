import copy from 'rollup-plugin-copy'
import serve from 'rollup-plugin-serve'
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/engine/index.ts',
		output: {
			file: "dist/engine.js",
		},
		plugins: [
			resolve(),
			typescript(),
			terser()
		]
	},
	{
		input: 'src/main.ts',
		output: {
			file: "dist/editor.js",
		},
		plugins: [
			resolve(),
			typescript(),
			terser(),
			copy({
				targets: [{ src: 'src/index.html', dest: 'dist' }]
			}),
			serve('dist')    // will be used as contentBase
		]
	},
]
