import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: 'esm',
  target: 'esnext',
  tsconfig: 'tsconfig.json',
})