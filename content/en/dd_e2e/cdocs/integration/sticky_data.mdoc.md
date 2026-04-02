---
title: Sticky data test
content_filters:
  - trait_id: prog_lang
    option_group_id: dd_e2e_mobile_prog_lang_options
---

## Overview

This page tests whether users navigating from the [content filtering test page](/dd_e2e/cdocs/integration/content_filtering) will 

- see their selection on the content filtering test page persist here, when it is available
- see the default selection replace their previous selection, when their previous selection is not available

## Currently selected filters

{% if equals($prog_lang, "swift") %}
The selected programming language is Swift.
{% /if %}

{% if equals($prog_lang, "kotlin") %}
The selected programming language is Kotlin.
{% /if %}

{% if equals($prog_lang, "java") %}
The selected programming language is Java.
{% /if %}