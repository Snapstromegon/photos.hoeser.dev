---
layout: layouts/main.liquid
---

<section id="albumGrid">
{% for album in collections.album reversed %}
{% assign googleAlbum = album.data.googlePhotosTitle | googlePhotosAlbum %}
{% if googleAlbum %}
<a class="album" href="{{album.data.googlePhotosUrl}}">
{%image googleAlbum.coverPhotoBaseUrl "Thumbnail"%}

<footer>

## {{album.data.title}}

<div class="photos_count">
<span class="count">{{googleAlbum.mediaItemsCount}}</span> Foto(s)
</div>
</footer>
</a>
{% else %}

{% endif %}
{% endfor %}
</section>
