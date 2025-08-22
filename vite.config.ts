import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    build: {
      outDir: env.VITE_OUTDIR.toString()
    },
    server: {
      open: true
    },
    optimizeDeps: {
      exclude: ['js-big-decimal']
    }
  }
})
