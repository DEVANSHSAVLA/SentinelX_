import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: 'window',
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'expo-status-bar': 'react-native-web',
    },
  },
  server: {
    port: 8082,
    host: true,
    allowedHosts: true,
  },
});
