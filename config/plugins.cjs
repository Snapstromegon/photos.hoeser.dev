const lightningcss = require("./lib/eleventy-plugin-lightningcss.cjs");
const rollupPluginLitLightningcss = require("./lib/rollup-plugin-lit-lightningcss.cjs");
const browserslist = require("browserslist");
const rollupPlugin = require("eleventy-plugin-rollup");
const { default: resolve } = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(rollupPlugin, {
    rollupOptions: {
      output: {
        dir: "_site/js",
        format: "es",
        sourcemap: process.env.NETLIFY !== "true",
      },
      plugins: [rollupPluginLitLightningcss(), typescript(), resolve()],
    },
    useAbsoluteScriptPaths: true,
  });
  eleventyConfig.addPlugin(lightningcss, {
    lightningcssOptions: {
      drafts: {
        nesting: true,
      },
      minify: true,
      sourceMap: true,
    },
    support: browserslist("last 2 versions, not dead"),
    watch: "assets/css/",
  });
};
