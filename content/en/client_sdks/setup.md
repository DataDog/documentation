---
title: Client SDK Setup
content_filters:
  - trait_id: sdk
    option_group_id: sdk_platform_options
---

## Overview
  
This is a template for a customizable doc. It includes some example tags and resources.
  
## Conditional content examples
    
{% alert level="info" %}
Change any of the filters for this page to update the 1 lines below.
{% /alert %}

<!-- Browser -->
{% if equals($sdk, "browser") %}
Browser-specific content goes here.
{% /if %}

<!-- Android -->
{% if equals($sdk, "android") %}
Android-specific content goes here.
{% /if %}

<!-- iOS -->
{% if equals($sdk, "ios") %}
iOS-specific content goes here.
{% /if %}

<!-- React Native -->
{% if equals($sdk, "react_native") %}
React Native-specific content goes here.
{% /if %}

<!-- Flutter -->
{% if equals($sdk, "flutter") %}
Flutter-specific content goes here.
{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($sdk, "kotlin_multiplatform") %}
Kotlin Multiplatform-specific content goes here.
{% /if %}

<!-- Roku -->
{% if equals($sdk, "roku") %}
Roku-specific content goes here.
{% /if %}

<!-- Unity -->
{% if equals($sdk, "unity") %}
Unity-specific content goes here.
{% /if %}


## Valid traits and their values (option IDs)
  
For reference, here's a list of all the traits available on this page, and the valid values for each trait.

You can use this table to populate the `equals` function in your `if` tags: `equals(<TRAIT>, <VALUE>)`. Example: `equals($sdk, "browser")`. For details on using `if` tags, see the [relevant section of the Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)).
  
{% table %}
* Trait
* Valid values
* Equals function to use in `if` tag
---
* `sdk` {% rowspan=8 %}
* `browser`
* `equals($sdk, "browser")`
---
* `android`
* `equals($sdk, "android")`
---
* `ios`
* `equals($sdk, "ios")`
---
* `react_native`
* `equals($sdk, "react_native")`
---
* `flutter`
* `equals($sdk, "flutter")`
---
* `kotlin_multiplatform`
* `equals($sdk, "kotlin_multiplatform")`
---
* `roku`
* `equals($sdk, "roku")`
---
* `unity`
* `equals($sdk, "unity")`
{% /table %}

  
## Guidelines and resources
  
- When possible, keep headers at the top level (outside of any `if` tags), giving each section its own `if` tags.
- If you can't keep headers at the top level, follow the [best practices for avoiding duplicate headers](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#Avoid-duplicate-headers) to make sure your page's right nav works properly.
- Need to add an alert or other element? See the [Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference).
- If you need to link to this page, follow the [best practices for linking to a customizable doc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#When-you-link-to-a-top-level-header,-do-not-include-the-filter-params-in-the-URL).
