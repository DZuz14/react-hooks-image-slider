module.exports = {
  verbose: true,
  roots: [
  "./__tests__"
  ],
  modulePaths: [
    "__stubs__"
  ],
  moduleNameMapper: {
    ".scss$": "scss-stub.js"
  },
}
