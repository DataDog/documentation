---
title: Table
draft: true
---

## Overview

This page contains examples of the table component.


## Examples

### Basic table

{% table %}
* Name
* Status
* Description
---
* Agent
* Active
* The Datadog Agent collects metrics and events from your hosts.
---
* Tracer
* Active
* The tracer instruments your application code for APM.
{% /table %}

### Two-column table

{% table %}
* Parameter
* Description
---
* `api_key`
* Your Datadog API key.
---
* `site`
* The Datadog site to send data to.
{% /table %}

### Table with inline formatting

{% table %}
* Feature
* Supported
---
* Log collection
* {% x/ %}
---
* APM tracing
* {% x/ %}
---
* Custom metrics
* {% x/ %}
{% /table %}
