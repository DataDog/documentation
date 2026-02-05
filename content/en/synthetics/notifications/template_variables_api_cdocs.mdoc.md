---
title: Synthetic Monitoring API Template Variables
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

<!-- Test execution variables -->
{% if equals($synthetics_variables, "execution") %}
Test execution variables-specific content goes here.
{% /if %}

<!-- Test metadata variables -->
{% if equals($synthetics_variables, "test_metadata") %}
Test metadata variables-specific content goes here.
{% /if %}

<!-- Device information variables -->
{% if equals($synthetics_variables, "device_info") %}
Device information variables-specific content goes here.
{% /if %}

<!-- Execution results variables -->
{% if equals($synthetics_variables, "execution_results") %}
Execution results variables-specific content goes here.
{% /if %}

<!-- Failed step information variables -->
{% if equals($synthetics_variables, "failed_step_info") %}
Failed step information variables-specific content goes here.
{% /if %}

<!-- Local & Global variables -->
{% if equals($synthetics_variables, "local_global_variables") %}
Local & Global variables-specific content goes here.
{% /if %}

<!-- Extracted variables -->
{% if equals($synthetics_variables, "extracted") %}
Extracted variables-specific content goes here.
{% /if %}

<!-- Step variables -->
{% if equals($synthetics_variables, "step") %}
Step variables-specific content goes here.
{% /if %}


