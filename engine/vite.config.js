import fs from 'node:fs'
import path from 'node:path'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: "index.ts",
      name: 'engine',
      // the proper extensions will be added
      fileName: 'engine',
			formats: ["es"]
    },
  },
})
