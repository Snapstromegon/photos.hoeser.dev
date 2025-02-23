const {
  imageShortcode,
  generateFaviconHTML,
} = require("./lib/image-stuff.cjs");

module.exports = (eleventyConfig) => {
  eleventyConfig.addAsyncShortcode("favicon", generateFaviconHTML);
};
