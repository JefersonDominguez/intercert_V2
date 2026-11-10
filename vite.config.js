import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const DEV_HOST = env.VITE_DEV_HOST || '0.0.0.0'
  const DEV_PORT = Number(env.VITE_DEV_PORT) || 5175
  const HMR_HOST = env.VITE_HMR_HOST || 'localhost'
  // Sin backend local: en .env.development.local → VITE_DEV_API_TARGET=https://intercertlatam.com
  const API_PROXY_TARGET = env.VITE_DEV_API_TARGET || 'http://127.0.0.1:8000'
  const proxySecure = API_PROXY_TARGET.startsWith('https://')

  return {
  plugins: [
    react(),
    // Compresión deshabilitada a petición del usuario para limpiar dist/assets
  ],
  server: {
    port: DEV_PORT,
    strictPort: false,
    host: DEV_HOST,
    // Configurar HMR dependiendo del entorno (localhost por defecto)
    hmr: {
      host: HMR_HOST,
      port: DEV_PORT,
    },
    proxy: {
      '/api': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: proxySecure,
        ws: true, // Habilitar WebSocket para el proxy
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Mantener /api en la ruta
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('❌ Proxy error:', err.message);
            console.error('❌ Request URL:', req.url);
            console.error('❌ Target:', options.target);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('→ Proxy Request:', req.method, req.url, '→', options.target + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('← Proxy Response:', proxyRes.statusCode, req.url);
          })
        },
      },
      '/int': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/int/, '/int'), // Mantener /int en la ruta
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('❌ Proxy error:', err.message);
            console.error('❌ Request URL:', req.url);
            console.error('❌ Target:', options.target);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('→ Proxy Request:', req.method, req.url, '→', options.target + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('← Proxy Response:', proxyRes.statusCode, req.url);
          })
        },
      },
      '/admin': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/static': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: false
      },
      '/media': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        secure: false
      }
    },
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: 'dist',
    // Deshabilitar source maps en producción para dificultar el análisis
    sourcemap: process.env.NODE_ENV === 'development',
    // Minificar y ofuscar el código (usando esbuild que viene con Vite)
    minify: false, // Deshabilitado para depuración
    // Configuración de esbuild para ofuscación
    // esbuild: {
    //   drop: ['console', 'debugger'], // Eliminar console y debugger en producción
    //   legalComments: 'none', // Eliminar comentarios legales
    // },
    // Límite de advertencia de tamaño de chunk (reducido a 500 KB)
    chunkSizeWarningLimit: 1500,
    // Optimizar build
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Nombres de archivos aleatorios para dificultar el análisis
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Dividir chunks de manera inteligente para reducir tamaño
        manualChunks: (id) => {
          // Agrupar React y sus dependencias relacionadas
          if (id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/react-helmet')) {
            return 'react-vendor';
          }

          // Agrupar Material UI y Emotion
          if (id.includes('node_modules/@mui') ||
            id.includes('node_modules/@emotion')) {
            return 'mui-vendor';
          }

          // Agrupar librerías de mapas juntas
          if (id.includes('node_modules/leaflet') ||
            id.includes('node_modules/react-leaflet')) {
            return 'leaflet-vendor';
          }

          // Agrupar iconos (solo react-icons ahora)
          if (id.includes('node_modules/react-icons')) {
            return 'icons-vendor';
          }

          // Agrupar animaciones juntas
          if (id.includes('node_modules/gsap') ||
            id.includes('node_modules/swiper') ||
            id.includes('node_modules/wowjs') ||
            id.includes('node_modules/@srexi/purecounterjs') ||
            id.includes('node_modules/jarallax')) {
            return 'animations-vendor';
          }

          // Agrupar React Query
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'react-query-vendor';
          }

          // Agrupar utilidades y formularios juntas
          if (id.includes('node_modules/axios') ||
            id.includes('node_modules/qrcode') ||
            id.includes('node_modules/react-hook-form') ||
            id.includes('node_modules/@hookform') ||
            id.includes('node_modules/zod') ||
            id.includes('node_modules/react-toastify') ||
            id.includes('node_modules/sonner') ||
            id.includes('node_modules/zustand') ||
            id.includes('node_modules/jquery') ||
            id.includes('node_modules/bootstrap') ||
            id.includes('node_modules/slick-carousel') ||
            id.includes('node_modules/magnific-popup') ||
            id.includes('node_modules/jquery-nice-select') ||
            id.includes('node_modules/isotope-layout') ||
            id.includes('node_modules/imagesloaded')) {
            return 'utils-vendor';
          }

          // Todas las demás dependencias de node_modules en un solo chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  publicDir: 'public'
  }
})
