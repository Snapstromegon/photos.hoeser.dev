---
layout: layouts/main.liquid
---

<section id="grid">
{% for event in collections.event reversed %}
<a class="card" href="{{event.url}}">
{% if event.data.cover and event.data.cover!="" -%}
<img src="{{event.data.cover}}" alt="Thumbnail">
<img src="{{event.data.cover}}" alt="Thumbnail">
{% else %}
{% if event.data.google_photos[0].cover -%}
<img src="{{event.data.google_photos[0].cover}}" alt="Thumbnail">
<img src="{{event.data.google_photos[0].cover}}" alt="Thumbnail">
{%- endif %}
{%- endif %}
<footer>

## {{event.data.title}}

<div class="photographers">
{%- for photographer in event.data.photographers-%}
{% assign headshot = photographer_data[photographer].picture %}
<img src="{{photographer_data[photographer].picture}}" alt="{{photographer}}">
{%- endfor %}
</div>
</footer>
</a>
{% endfor %}
</section>
