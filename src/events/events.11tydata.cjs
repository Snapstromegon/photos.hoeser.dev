module.exports = async (configData) => {
  return {
    tags: "event",
    layout: "layouts/event.liquid",
    eleventyComputed: {
      albums: (data) =>
        data.google_photos.map((album) => ({
          shareUrl: album.url,
          ...data.googlePhotos?.allAlbums.find((a) => a.title == album.name),
        })),
      coverUrl: (data) => data.albums?.[0]?.coverPhotoBaseUrl,
      photosCount: (data) =>
        data.albums
          ? data.albums?.reduce((acc, album) => acc + album.mediaItemsCount, 0)
          : 0,
    },
  };
};
