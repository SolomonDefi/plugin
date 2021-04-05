
import SlmPlugin from './SlmPlugin.vue';

const components = {
  SlmPlugin,
};

function install(Vue) {
  for(const component in components) {
    Vue.component(components[component].name, components[component])
  }
}

export default { install };

export { default as SlmPlugin } from './SlmPlugin.vue';
