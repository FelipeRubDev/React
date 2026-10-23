process.env.CHROME_BIN = "/usr/bin/brave"

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["src/tests/setup.js", "src/tests/**/*.spec.jsx"],
    preprocessors: {
      "src/tests/setup.js": ["webpack"],
      "src/tests/**/*.spec.jsx": ["webpack"],
    },
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { chrome: "120" } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                ],
                plugins: [["babel-plugin-istanbul", { exclude: ["**/src/tests/**"] }]],
              },
            },
          },
        ],
      },
      resolve: { extensions: [".js", ".jsx"] },
    },
    webpackMiddleware: { stats: "errors-only" },
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage/",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    browsers: ["BraveHeadless"],
    customLaunchers: {
      BraveHeadless: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
      },
    },
    singleRun: true,
    client: { jasmine: { random: false } },
  })
}