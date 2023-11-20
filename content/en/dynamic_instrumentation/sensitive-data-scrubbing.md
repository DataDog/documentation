---
title: Dynamic Instrumentation Sensitive Data Scrubbing
kind: documentation
---

## Overview

With Dynamic Instrumentation (DI) you can craft arbitrary expressions that are evaluated at runtime, and the result of that evaluation is used as part of a log message, or added dynamically as a span tag. So there is a serious risk of data leakage. An automatic data scrubber redacts certain data in your own infrastructure, before the data is uploaded to Datadog.

## Default data scrubbing configuration

The default scrubber redacts values that are associated with the keys `password` or `accessToken`.

## Extend data scrubbing rules

* Redaction rules are customizable.
* Redact based on keys, not values. 
