module.exports = {
  presets: [
    '@vue/app',
      // ie9+兼容
      [
          '@babel/preset-env',
          {
              'useBuiltIns': 'entry'
          }
      ]
  ],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: 'css' }
    ]
  ]
}
