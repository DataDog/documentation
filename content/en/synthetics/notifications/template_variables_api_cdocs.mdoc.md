---
title: Synthetic Monitoring API Test Template Variables
content_filters:
- trait_id: protocol
  option_group_id: synthetics_protocol_options
  label: "Protocol"
- trait_id: synthetics_variables
  option_group_id: synthetics_variables_options
  label: "Variables"
---

## Overview

This page provides template variables available for API tests, organized by protocol type.

<!-- HTTP -->
{% if equals($protocol, "http") %}
HTTP-specific template variables content goes here.
{% /if %}

<!-- DNS -->
{% if equals($protocol, "dns") %}
DNS-specific template variables content goes here.
{% /if %}

<!-- SSL -->
{% if equals($protocol, "ssl") %}
SSL-specific template variables content goes here.
{% /if %}

<!-- WebSocket -->
{% if equals($protocol, "websocket") %}
WebSocket-specific template variables content goes here.
{% /if %}

<!-- UDP -->
{% if equals($protocol, "udp") %}
UDP-specific template variables content goes here.
{% /if %}

<!-- TCP -->
{% if equals($protocol, "tcp") %}
TCP-specific template variables content goes here.
{% /if %}

<!-- ICMP -->
{% if equals($protocol, "icmp") %}
ICMP-specific template variables content goes here.
{% /if %}

<!-- gRPC -->
{% if equals($protocol, "grpc") %}
gRPC-specific template variables content goes here.
{% /if %}


## Valid traits and their values (option IDs)
  
For reference, here's a list of all the traits available on this page, and the valid values for each trait.

You can use this table to populate the `equals` function in your `if` tags: `equals(<TRAIT>, <VALUE>)`. Example: `equals($protocol, "http")`. For details on using `if` tags, see the [relevant section of the Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)).
  
{% table %}
* Trait
* Valid values
* Equals function to use in `if` tag
---
* `protocol` {% rowspan=8 %}
* `http`
* `equals($protocol, "http")`
---
* `dns`
* `equals($protocol, "dns")`
---
* `ssl`
* `equals($protocol, "ssl")`
---
* `websocket`
* `equals($protocol, "websocket")`
---
* `udp`
* `equals($protocol, "udp")`
---
* `tcp`
* `equals($protocol, "tcp")`
---
* `icmp`
* `equals($protocol, "icmp")`
---
* `grpc`
* `equals($protocol, "grpc")`
{% /table %}


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
