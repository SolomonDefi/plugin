const path = require('path');
import Vue from '@vitejs/plugin-vue';

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'SolomonPlugin'
    },
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
  ],
};
