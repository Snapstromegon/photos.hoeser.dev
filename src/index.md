---
layout: layouts/main.liquid
---

<section id="grid">
{% for event in collections.event reversed %}
<a class="card" href="{{event.url}}">
{%image event.data.coverUrl "Thumbnail"%}

<footer>

## {{event.data.title}}

<div class="photos_count">
<span class="count">{{event.data.photosCount}}</span> Foto(s)
</div>
</footer>
</a>
{% endfor %}
</section>
