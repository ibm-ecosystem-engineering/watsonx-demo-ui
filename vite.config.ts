import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default defineConfig(({mode}) => {

  const env = loadEnv(mode, process.cwd(), '')

  const apiTarget: string = env.API_TARGET1 || 'http://localhost:3000';
  const graphqlTarget: string = env.GRAPHQL_TARGET1 || 'http://localhost:3000';
  const socketTarget: string = env.SOCKET_TARGET1 || 'ws://localhost:3000';

  console.log('Target urls: ', {apiTarget, graphqlTarget, socketTarget, mode})

  return ({
    plugins: [react()],
    server: {
      proxy: {
        // with options: http://localhost:5173/api/bar-> {apiTarget}/bar
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/graphql': {
          target: graphqlTarget,
          changeOrigin: true,
        },
        '/subscription': {
          target: socketTarget,
          ws: true,
        },
      },
    },
  })
})
