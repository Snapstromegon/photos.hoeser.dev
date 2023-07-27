---
layout: layouts/main.liquid
---

<section id="grid">
{% for event in collections.event reversed %}
<a class="card" href="{{event.url}}">
{% if event.data.coverUrl -%}
{%image event.data.coverUrl "Thumbnail"%}
{%image event.data.coverUrl "Thumbnail"%}
{%- endif %}
<footer>

## {{event.data.title}}

<div class="photos_count">
<span class="count">{{event.data.photosCount}}</span> Fotos
</div>
<div class="photographers">
{%- for photographer in event.data.photographers-%}
{% assign headshot = photographer_data[photographer].picture %}
{%image headshot photographer%}
{%- endfor %}
</div>
</footer>
</a>
{% endfor %}
</section>
