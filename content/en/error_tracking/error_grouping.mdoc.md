---
title: Error Grouping
description: Understand how errors are grouped into issues.
aliases:
  - /error_tracking/default_grouping
content_filters:
  - trait_id: product
    option_group_id: error_tracking_product_options
  - trait_id: platform
    label: Context
    option_group_id: <PRODUCT>_error_grouping_context_options
---


{% partial file="error_tracking/grouping/overview.mdoc.md" /%}

## Setup

<!-- APM -->
{% if equals($product, "apm") %}
{% partial file="error_tracking/grouping/setup/apm.mdoc.md" /%}
{% /if %}

<!-- Logs -->
{% if equals($product, "logs") %}
{% partial file="error_tracking/grouping/setup/logs.mdoc.md" /%}
{% /if %}

<!-- RUM -->
{% if equals($product, "rum") %}
{% partial file="error_tracking/grouping/setup/rum.mdoc.md" /%}
{% /if %}