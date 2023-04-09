const {
  imageShortcode,
  generateFaviconHTML,
} = require("./lib/image-stuff.cjs");

module.exports = (eleventyConfig) => {
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  eleventyConfig.addAsyncShortcode("favicon", generateFaviconHTML);
};
