---
title: Tabs
content_filters:
  - label: "Color"
    filter_id: color
    option_group_id: primary_color_options
---

## Usage

- Tabs can contain other Markdoc tags, such as partials and conditional content. If you can use it on a page, you can use it in a tab.
- Include the URLs for links used in tabs at the bottom of the file along with the other links used on the page, not inside the tab.

## Example

Usually there's a bit of text here to introduce the tabs, so this paragraph is just filler text.

{% tabs %}
{% tab label="Tab 1" %}
{% alert label="info" %}
Here's an info alert.
{% /alert %}

### Customization demo

<!-- blue -->
{% if equals($color, "blue") %}
The selected color is **blue**.
{% /if %}

<!-- yellow -->
{% if equals($color, "yellow") %}
The selected color is **yellow**.
{% /if %}

<!-- red -->
{% if equals($color, "red") %}
The selected color is **red**.
{% /if %}

### Partial demo

Tabs can include partials, such as these two:

{% partial file="datadog_link.mdoc.md" /%}

{% partial file="google_link.mdoc.md" /%}

### Links

Links in Markdoc tabs behave the same as any other link on the page. There's no need to keep separate lists of links inside each tab. Example link: [Markdoc docs][1]. Tab 2 contains the second example link.
{% /tab %}
{% tab label="Tab 2" %}
This is the content for Tab 2.

Example link: [TypeScript docs][2].
{% /tab %}
{% /tabs %}

[1]: https://markdoc.dev/docs
[2]: https://www.typescriptlang.org/docs