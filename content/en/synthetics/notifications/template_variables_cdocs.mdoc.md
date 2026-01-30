---
title: Synthetic Monitoring Template Variables
content_filters:
- trait_id: platform
  option_group_id: synthetics_test_type_options
  label: "Test Type"
- trait_id: synthetics_variables
  option_group_id: synthetics_variables_options
  label: "Variables"
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages.

<!-- Browser -->
{% if equals($platform, "browser") %}
Browser-specific content goes here.
{% /if %}

<!-- Mobile -->
{% if equals($platform, "mobile") %}
Mobile-specific content goes here.
{% /if %}

<!-- Multistep API -->
{% if equals($platform, "multistep") %}
Multistep API-specific content goes here.
{% /if %}

<!-- Test execution variables -->
{% if equals($synthetics_variables, "execution") %}
Test execution variables-specific content goes here.
{% /if %}

<!-- Result variables -->
{% if equals($synthetics_variables, "result") %}
Result variables-specific content goes here.
{% /if %}

<!-- Local variables -->
{% if equals($synthetics_variables, "local") %}
Local variables-specific content goes here.
{% /if %}

<!-- Global variables -->
{% if equals($synthetics_variables, "global") %}
Global variables-specific content goes here.
{% /if %}

<!-- Extracted variables -->
{% if equals($synthetics_variables, "extracted") %}
Extracted variables-specific content goes here.
{% /if %}

<!-- Step variables -->
{% if equals($synthetics_variables, "step") %}
Step variables-specific content goes here.
{% /if %}


## Valid traits and their values (option IDs)
  
For reference, here's a list of all the traits available on this page, and the valid values for each trait.

You can use this table to populate the `equals` function in your `if` tags: `equals(<TRAIT>, <VALUE>)`. Example: `equals($synthetics_variables, "execution")`. For details on using `if` tags, see the [relevant section of the Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)).
  
{% table %}
* Trait
* Valid values
* Equals function to use in `if` tag
---
* `synthetics_variables` {% rowspan=6 %}
* `execution`
* `equals($synthetics_variables, "execution")`
---
* `result`
* `equals($synthetics_variables, "result")`
---
* `local`
* `equals($synthetics_variables, "local")`
---
* `global`
* `equals($synthetics_variables, "global")`
---
* `extracted`
* `equals($synthetics_variables, "extracted")`
---
* `step`
* `equals($synthetics_variables, "step")`
{% /table %}