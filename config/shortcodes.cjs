const yaml = require("js-yaml");
const {
  imageShortcode,
  generateFaviconHTML,
} = require("./lib/image-stuff.cjs");

module.exports = (eleventyConfig) => {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addAsyncShortcode("favicon", generateFaviconHTML);
};
