const Image = require("@11ty/eleventy-img");

function generateImages(src) {
  return Image(src, {
    formats: [
      "avif",
      "webp",
      src.toLowerCase().endsWith(".png") ? "png" : "jpeg",
    ],
    outputDir: "_site/img/",
    widths: [256, 512, 1024, null],
  });
}

function generateImageFormats(src) {
  return Image(src, {
    formats: [
      "avif",
      "webp",
      src.toLowerCase().endsWith(".png") ? "png" : "jpeg",
    ],
    outputDir: "_site/img/",
    widths: [null],
  });
}

async function imageShortcode(src, alt, sizes = []) {
  const metadata = await generateImages(src);

  const imageAttributes = {
    alt,
    decoding: "async",
    loading: "lazy",
    sizes,
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

async function generateFavicon(src) {
  const images = await Image(src, {
    formats: ["svg", "png", "webp", "avif"],
    outputDir: "_site/img/",
    widths: [64, 128, 180, 256, 512, 1024, 2048, null],
  });

  const buf = await pngToIco(
    images.png.slice(0, 1).map((png) => png.outputPath)
  );
  await fs.writeFile("_site/favicon.ico", buf);

  return images;
}

async function generateFaviconHTML(src) {
  const metadata = await generateFavicon(src);
  return `
    <link rel="icon" href="${metadata.svg[0].url}" type="image/svg+xml">
    <link rel="apple-touch-icon" href="${
      metadata.png.find((png) => png.width === 180).url
    }">
  `;
}

module.exports = {
  generateImages,
  generateImageFormats,
  imageShortcode,
  generateFavicon,
  generateFaviconHTML,
};
