const markdownItAttrs = require("markdown-it-attrs");
const markdownItEmoji = require("markdown-it-emoji");
const markdownItContainer = require("markdown-it-container");

const plugins = require("./config/plugins.cjs");
const filters = require("./config/filters.cjs");
const shortcodes = require("./config/shortcodes.cjs");

module.exports = function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib
      .set({
        breaks: true,
        html: true,
        linkify: true,
      })
      .use(markdownItAttrs)
      .use(markdownItEmoji);

    ["infoBox", "warningBox"].forEach((name) =>
      mdLib.use(markdownItContainer, name)
    );
  });
  plugins(eleventyConfig);

  shortcodes(eleventyConfig);
  filters(eleventyConfig);
  
  eleventyConfig.addWatchTarget("src/css/**/*.css");
  eleventyConfig.addWatchTarget("src/ts/**/*.ts");
  eleventyConfig.addPassthroughCopy("assets/imgs");
  eleventyConfig.addPassthroughCopy("assets/videos");
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("src/admin/config.yml", "admin/config.yml");

  // Return your Object options:
  return {
    dir: { input: "src" },
    markdownTemplateEngine: "liquid",
  };
};
