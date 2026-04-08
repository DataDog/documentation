---
title: Alert box
draft: true
---

## Overview

This page contains examples of the alert box component.


## Examples

### Info

{% alert level="info" %}
This is an info-level alert message. Use it for general information and helpful tips.
{% /alert %}

### Warning

{% alert level="warning" %}
This is a warning-level alert message. Use it for cautionary notes that require attention.
{% /alert %}

### Danger

{% alert level="danger" %}
This is a danger-level alert message. Use it for critical warnings about destructive actions or breaking changes.
{% /alert %}

### Alert with inline formatting

{% alert level="info" %}
This alert contains **bold text**, *italic text*, `inline code`, and a [link to Datadog](https://www.datadoghq.com).
{% /alert %}

### Alert with a list

{% alert level="warning" %}
Before proceeding, confirm that you have:

- Installed the Datadog Agent
- Configured your API key
- Enabled log collection
{% /alert %}
