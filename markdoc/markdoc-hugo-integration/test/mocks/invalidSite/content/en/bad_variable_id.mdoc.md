---
title: The Primary Colors of the Color Wheel
customizations:
  - label: "Color"
    filter_id: color
    option_group_id: primary_color_options
  - label: "Item"
    filter_id: item
    option_group_id: <COLOR>_item_options
---

This test page explores everyday items that are blue, yellow, or red -- which also happen to be the primary colors of the color wheel. If this seems contrived and odd, that's only because test pages are often both of those things.

## {% $item %}: Your {% $color %} item of choice

<!-- blue -->
<!-- mistake: $colour instead of $color -->
{% if equals($colour, "blue") %} 

<!-- blue > ocean --> 
{% if equals($item, "ocean") %}
The ocean is a large body of saltwater. It covers about 70% of the Earth's surface.
{% /if %}

<!-- blue > sky -->
{% if equals($item, "sky") %}
The sky is the atmosphere as seen from the Earth's surface. It appears blue during the day.
{% /if %}

<!-- blue > jeans -->
{% if equals($item, "jeans") %}
Jeans are a type of clothing. They're often made from denim and are known for their durability.
{% /if %}

<!-- blue > blueberry -->
{% if equals($item, "blueberry") %}
Blueberries are a type of fruit. They're often eaten raw or used in baking.
{% /if %}

{% /if %}

<!-- yellow -->
{% if equals($color, "yellow") %}
{% partial file="yellow.mdoc.md" /%}
{% /if %}

<!-- red -->
{% if equals($color, "red") %}
{% partial file="red.mdoc.md" /%}
{% /if %}