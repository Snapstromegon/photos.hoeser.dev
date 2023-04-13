let buildAccessTokenPromise = null;

async function getAccessToken() {
  if (!buildAccessTokenPromise) {
    buildAccessTokenPromise = new Promise(async (resolve) => {
      const resp = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
          client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
          refresh_token: process.env.GOOGLE_PHOTOS_REFRESH_TOKEN,
          grant_type: "refresh_token",
        }),
      });
      const res = await resp.json();
      resolve(res.access_token);
    });
  }
  return buildAccessTokenPromise;
}

let allAlbums = null;

async function loadAlbumsChunk(pageToken, size) {
  const token = await getAccessToken();
  const resp = await fetch(
    `https://photoslibrary.googleapis.com/v1/sharedAlbums?pageToken=${pageToken}&page_size=${size}&access_token=${token}`
  );
  const res = await resp.json();
  for (const album of res.sharedAlbums) {
    album.mediaItemsCount = parseInt(album.mediaItemsCount);
  }
  return res;
}

async function getAlbums() {
  if (!allAlbums) {
    allAlbums = new Promise(async (resolve) => {
      let currentPage = await loadAlbumsChunk("", 50);
      const result = currentPage.sharedAlbums;
      while (currentPage.nextPageToken) {
        currentPage = await loadAlbumsChunk(currentPage.nextPageToken, 50);
        result.push(...currentPage.sharedAlbums);
      }
      console.log(JSON.stringify(result, undefined, 2));

      resolve(result);
    });
  }
  return allAlbums;
}

module.exports = async () => {
  const allAlbums = await getAlbums();
  return {
    allAlbums,
  };
};
