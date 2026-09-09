---
title: Stack Traces in Error Tracking
description: Learn how Error Tracking uses stack traces to fingerprint and group errors.
further_reading:
- link: '/tracing/error_tracking/'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Backend Services'
- link: '/tracing/error_tracking/error_grouping/'
  tag: 'Documentation'
  text: 'Learn about Error Grouping'
---

## Overview

Error Tracking uses stack traces on error spans to fingerprint errors, group them into issues, and show where they occurred. This page describes which span attribute Error Tracking reads for the stack trace, and how that varies by your service's language and tracer version.

## Stack trace span attributes

An error span reports its stack trace in the `error.stack` [span attribute][1]. For most tracers, `error.stack` contains the stack trace captured when the error was handled (for example, at a `catch` block or middleware). This isn't always where the error was thrown.

For Go services instrumented with `dd-trace-go` v2.7.0 or later, the handling stack trace is reported separately, in the `error.handling_stack` attribute. In this case, `error.stack` instead contains the stack trace captured at the point the error was thrown, if available.

## Which stack trace is used by Error Tracking

### For Go services

For Go services, Error Tracking has a fallback mechanism to decide which stack trace to use:

- Go tracer v2.7.0 and later:
  - The throwing stack is reported in `error.stack`. This stack is used if available.
  - The handling stack is reported in `error.handling_stack`. This stack is used if the throwing stack is not available.
- Go tracer earlier than v2.7.0:
  - The throwing stack is reported in `error.details`. This stack is used if available.
  - The handling stack is reported in `error.stack`. This stack is used if the throwing stack is not available.

### For all other languages

For all other languages, the handling stack is captured and reported in `error.stack`. This attribute is used by Error Tracking to group issues and derive information such as the suspect commit.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/trace/?tab=spantags#more-information
