const path = require('path');
import Vue from '@vitejs/plugin-vue';
import ViteComponents from 'vite-plugin-components';
import ViteImages from 'vite-plugin-vue-images';

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'SolomonPlugin'
    },
    assetsInlineLimit: 0,
    rollupOptions: {
      // Externalize deps that aren't bundled into the library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    Vue(),
    ViteComponents({ dirs: ['lib'] }),
    ViteImages({ dirs: ['lib/assets/img'] }),
  ],
};
