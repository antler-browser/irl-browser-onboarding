import { defineConfig } from 'tsup'

export default defineConfig([
  // Core package build
  {
    entry: {
      index: 'src/core/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react'],
  },
  // React bindings build
  {
    entry: {
      react: 'src/react/index.tsx',
    },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    external: ['react'],
  },
])
