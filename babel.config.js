module.exports = {
  presets: [
    [
      '@vue/app',
      {
        modules: false,
        useBuiltIns: 'entry'
      },
    ]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}