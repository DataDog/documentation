---
title: Conditional filter display test
content_filters:
  - trait_id: product
    option_group_id: error_tracking_product_options
  - trait_id: platform
    option_group_id: rum_sdk_platform_options
    show_if:
      - product: ["rum", "logs"]
---

## Overview

When `product` is `rum` or `logs`, two filters should be shown. Otherwise, only one filter should be shown.

## Product filter selection

<!-- APM -->
{% if equals($product, "apm") %}
APM is selected.
{% /if %}

<!-- Logs -->
{% if equals($product, "logs") %}
Logs is selected.
{% /if %}

<!-- RUM -->
{% if equals($product, "rum") %}
RUM is selected.
{% /if %}

## Platform selection

{% if not(includes($platform, ["android", "ios", "react_native"])) %}
The filter is hidden.
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
Android is selected.
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
iOS is selected.
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
React Native is selected.
{% /if %}