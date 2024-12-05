---
title: Tabs
private: true
content_filters:
  - display_name: "Color"
    id: color
    options_source: primary_color_options
---

## Usage

- Tabs can contain other Markdoc tags, such as partials and conditional content. If you can use it on a page, you can use it in a tab.
- Include the URLs for links used in tabs at the bottom of the file along with the other links used on the page, not inside the tab.

## Example

Usually there's a bit of text here to introduce the tabs, so this paragraph is just filler text.

{% tabs %}
{% tab label="Tab 1" %}
{% alert level="info" %}
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

{% partial file="markdoc_testing/datadog_link.mdoc" /%}

{% partial file="markdoc_testing/google_link.mdoc" /%}

### Code block

This is a test code block.

```javascript
console.log('The DD site is {% region-param key="dd_site" code=true /%}');
```

Here's a code block in a list:

1. Item 1 includes some code:
    ```python {% filename="example.py" %}
    # Function to compute the product of p1 and p2
    print("The DD site is {% region-param key="dd_site" code=true /%}")
    ```
2. This is Item 2. It has no code.

### Links

Links in Markdoc tabs behave the same as any other link on the page. There's no need to keep separate lists of links inside each tab. Example link: [Markdoc docs][1]. Tab 2 contains the second example link.

{% /tab %}
{% tab label="Tab 2" %}
This is the content for Tab 2.

Here's the second example link: [TypeScript docs][2].

{% /tab %}
{% /tabs %}

[1]: https://markdoc.dev/docs
[2]: https://www.typescriptlang.org/docs