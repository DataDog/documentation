---
title: Customizable Docs Build Test
content_filters:
  - trait_id: prog_lang
    option_group_id: prog_lang_options
---

## Simple cdocs test

### Question

What is the programming language set to?

### Answer

{% if equals($prog_lang, "python") %}
It's Python!
{% /if %}

{% if equals($prog_lang, "go") %}
It's Go!
{% /if %}

{% if equals($prog_lang, "javascript") %}
It's JavaScript!
{% /if %}