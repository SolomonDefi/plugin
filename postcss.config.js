
module.exports = {
  plugins: [
    require('postcss-import')({
      from: './lib/assets/css/',
    }),
    require('autoprefixer'),
    require('postcss-modules')({
      scopeBehaviour: 'global',
    }),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
  ]
};
