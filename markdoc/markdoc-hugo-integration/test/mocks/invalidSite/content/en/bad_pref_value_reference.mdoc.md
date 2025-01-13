---
title: Primary Colors
content_filters:
  - label: "Color"
    filter_id: color
    option_group_id: primary_color_options
  - label: "Item"
    filter_id: item
    option_group_id: <COLOR>_item_options
aliases:
  - /primary_colors_alias/
---

{% alert level="warning" %}
Warning: This is just a test page. It's not real.
{% /alert %}

This test page explores everyday items that are blue, yellow, or red -- which also happen to be the primary colors of the color wheel. If this seems contrived and odd, that's only because test pages are often both of those things.

<!-- blue -->
<!-- mistake: impossible value -->
{% if equals($color, "bleu") %}

## Blue {% #blue-header-id-override %}

Blue is a calming and serene color that is often associated with tranquility, stability, and trust.

<!-- blue > ocean --> 
{% if equals($item, "ocean") %}

### Ocean

The ocean is a vast and expansive body of saltwater that covers approximately 70% of the Earth's surface. It plays a crucial role in regulating the planet's climate and weather patterns, as well as supporting a diverse array of marine life. 

The ocean is a source of food, recreation, and transportation for humans, and its depths remain largely unexplored, holding many mysteries and wonders. The sight and sound of the ocean waves can evoke a sense of calm and tranquility, making it a popular destination for relaxation and reflection.
{% /if %}

<!-- blue > sky -->
{% if equals($item, "sky") %}

### Sky

The sky is the expanse of atmosphere that we see when we look up from the Earth's surface. During the day, it appears blue due to the scattering of sunlight by the molecules in the air, a phenomenon known as Rayleigh scattering. 

The sky changes color at sunrise and sunset, displaying beautiful hues of red, orange, and pink. It is home to various weather phenomena, including clouds, rainbows, and storms, and serves as the backdrop for celestial bodies like the sun, moon, and stars. The sky's vastness and ever-changing nature inspire a sense of wonder and curiosity.
{% /if %}

<!-- blue > jeans -->
{% if equals($item, "jeans") %}
### Jeans

Jeans are a type of durable clothing typically made from denim fabric. They are known for their versatility and comfort, making them a staple in wardrobes around the world. 

Originally designed as workwear for miners and laborers in the 19th century, jeans have evolved into a fashion icon, available in various styles, cuts, and colors. They can be dressed up or down, suitable for casual outings or more formal occasions. The durability and timeless appeal of jeans have made them a beloved garment for people of all ages.
{% /if %}

<!-- blue > blueberry -->
{% if equals($item, "blueberry") %}
### Blueberry

Blueberries are small, round fruits that are known for their sweet and slightly tart flavor. They are rich in antioxidants, vitamins, and fiber, making them a nutritious addition to any diet. Blueberries can be eaten fresh, added to cereals and yogurt, or used in baking to make delicious treats like muffins and pies. 

Blueberries are also popular in smoothies and jams. The vibrant blue color of blueberries adds a visual appeal to dishes, and their health benefits make them a favorite among health-conscious individuals.
{% /if %}

{% /if %}

<!-- yellow -->
{% if equals($color, "yellow") %}
## Yellow
{% partial file="yellow.mdoc.md" /%}
{% /if %}

<!-- red -->
{% if equals($color, "red") %}
## Red
{% partial file="red.mdoc.md" /%}
{% /if %}