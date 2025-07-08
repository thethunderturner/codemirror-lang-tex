import typescript from '@rollup/plugin-typescript'
import { lezer } from '@lezer/generator/rollup'

export default {
  input: 'src/tex.ts',
  external: (id) => id !== 'tslib' && !/^(\.?\/|\w:)/.test(id),
  output: [
    { file: 'dist/index.cjs', format: 'cjs' },
    { file: 'dist/index.js', format: 'es' },
  ],
  plugins: [
    lezer({
      outputDir: 'generated',
    }),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
      skipLibCheck: true,
    }),
  ],
}
