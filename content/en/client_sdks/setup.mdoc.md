---
title: Client SDK Setup
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_options
  - trait_id: client_sdk_product
    option_group_id: client_sdk_product_options
---

{% alert level="info" %}
Change any of the filters for this page to update the 1 lines below.
{% /alert %}

<!-- ============================================== -->
<!-- OVERVIEW -->
<!-- ============================================== -->

## Overview


<!-- Android -->
{% if equals($platform, "android") %}
Android-specific content goes here.
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
iOS-specific content goes here.
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
Flutter-specific content goes here.
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
Kotlin Multiplatform-specific content goes here.
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
React Native-specific content goes here.
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
Roku-specific content goes here.
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
Unity-specific content goes here.
{% /if %}


## Valid traits and their values (option IDs)
  
For reference, here's a list of all the traits available on this page, and the valid values for each trait.

You can use this table to populate the `equals` function in your `if` tags: `equals(<TRAIT>, <VALUE>)`. Example: `equals($platform, "browser")`. For details on using `if` tags, see the [relevant section of the Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)).
  
{% table %}
* Trait
* Valid values
* Equals function to use in `if` tag
---
* `platform` {% rowspan=8 %}
* `browser`
* `equals($platform, "browser")`
---
* `android`
* `equals($platform, "android")`
---
* `ios`
* `equals($platform, "ios")`
---
* `flutter`
* `equals($platform, "flutter")`
---
* `kotlin_multiplatform`
* `equals($platform, "kotlin_multiplatform")`
---
* `react_native`
* `equals($platform, "react_native")`
---
* `roku`
* `equals($platform, "roku")`
---
* `unity`
* `equals($platform, "unity")`
{% /table %}

  
## Guidelines and resources
  
- When possible, keep headers at the top level (outside of any `if` tags), giving each section its own `if` tags.
- If you can't keep headers at the top level, follow the [best practices for avoiding duplicate headers](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#Avoid-duplicate-headers) to make sure your page's right nav works properly.
- Need to add an alert or other element? See the [Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference).
- If you need to link to this page, follow the [best practices for linking to a customizable doc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#When-you-link-to-a-top-level-header,-do-not-include-the-filter-params-in-the-URL).
