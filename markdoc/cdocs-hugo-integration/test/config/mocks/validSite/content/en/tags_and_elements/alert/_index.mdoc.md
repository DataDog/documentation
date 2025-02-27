---
title: Alert
private: true
---

## Info

{% alert %}
This is an info alert! The `level=info` attribute is optional.
{% /alert %}

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Warning

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
{% alert level="warning" %}
This is a warning alert!
{% /alert %}

- First list item
- Second list item
- Third list item

## Danger

{% alert level="danger" %}
This is a danger alert!
{% /alert %}

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Advanced example

{% alert level="info" %}
The contents of the `alert` tag are written in Markdoc, not HTML. This means that you can use Markdoc syntax within the `alert` tag, such as a reference-style [link][1]. 

Some elements might look odd inside of alerts, because we've never used them in this context before. If needed, we can write additional CSS styles to support those elements.
{% /alert %}

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

[1]: https://www.datadoghq.com