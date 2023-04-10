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
      coverUrl: (data) => {
        const album = data.albums?.[0];
        console.log("asd", album, album?.coverPhotoBaseUrl);
        return album?.coverPhotoBaseUrl;
      },
      photosCount: (data) => {
        console.log("hi", data.albums, data.albums?.[0]);
        console.log(
          data.albums ? data.albums?.map((album) => album.mediaItemsCount) : 0
        );
        return data.albums
          ? data.albums?.reduce((acc, album) => acc + album.mediaItemsCount, 0)
          : 0;
      },
    },
  };
};
