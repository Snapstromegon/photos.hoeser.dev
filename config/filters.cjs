const {
  generateFavicon,
  generateImages,
  generateImageFormats,
} = require("./lib/image-stuff.cjs");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("logging", (input, label, passthrough) => {
    console.log(`logging-${label}:`, input);
    if (passthrough) return input;
  });
  eleventyConfig.addFilter("encodeURIComponent", encodeURIComponent);
  eleventyConfig.addNunjucksAsyncFilter("faviconData", (src, callback) =>
    generateFavicon(src).then((data) => callback(null, data))
  );
  eleventyConfig.addNunjucksAsyncFilter("imageData", (src, callback) =>
    generateImages(src).then((data) => callback(null, data))
  );
  eleventyConfig.addNunjucksAsyncFilter("imageFormats", (src, callback) =>
    generateImageFormats(src).then((data) => callback(null, data))
  );
  eleventyConfig.addFilter("niceDate", (date) =>
    new Intl.DateTimeFormat("de", { dateStyle: "medium" }).format(date)
  );
  eleventyConfig.addFilter("minutesToTime", (minutes) => {
    const hours = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    return `${hours}:${mins}`;
  });
};
