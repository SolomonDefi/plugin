import Vue from '@vitejs/plugin-vue';
import ViteComponents from 'vite-plugin-components';
import ViteImages from 'vite-plugin-vue-images';

module.exports = {
  plugins: [
    Vue(),
    ViteComponents({ dirs: ['lib'] }),
    ViteImages({ dirs: ['lib/assets/img'] }),
  ],
};
