require('babel-register')({
  ignore: [/(node_modules)/],
  presets: ['es2015', 'stage-0'],
  plugins: [
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.graphql']
      }
    ]
  ]
});

require('./index');
