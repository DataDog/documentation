---
title: Datadog SDKs
further_reading:
  - link: '/tracing/'
    tag: 'Documentation'
    text: 'Learn about Datadog APM tracing'
  - link: '/tracing/glossary/'
    tag: 'Documentation'
    text: 'APM Terminology and Overview'
  - link: 'tracing/trace_collection/automatic_instrumentation/dd_libraries/'
    tag: 'Documentation'
    text: 'Add the Datadog APM SDK'
algolia:
  tags: ['tracer', 'tracing library']
---

## Overview

Datadog now consistently uses the term **APM SDK** to refer to Datadog Application Performance Monitoring tools, previously known as **tracing libraries** or **tracers**.

This guide provides an overview of the terminology and its implications.

## What is an APM SDK?

An APM SDK is a language-specific library that allows you to instrument your application for application performance monitoring. Datadog offers APM SDKs for various programming languages, including but not limited to:

| Language   | SDK                  |
|------------|----------------------|
| .NET       | [dd-trace-dotnet][1] |
| Java       | [dd-trace-java][2]   |
| JavaScript | [dd-trace-js][3]     |
| PHP        | [dd-trace-php][4]    |
| Ruby       | [dd-trace-rb][5]     |
| Python     | [dd-trace-py][6]     |
| Go         | [dd-trace-go][7]     |


## APM SDK vs. tracer

Datadog uses "APM SDK" for the following reasons:

- **Alignment with industry standards**: APM SDK aligns with the terminology used across the application performance monitoring industry.
- **Expanded capabilities**: APM SDK better reflects the comprehensive nature of Datadog's tools, which include not only tracing capabilities but also other features such as profiling and metrics collection, and support for OpenTelemetry tracing APIs.

## Impact on Datadog users

The terminology update does not affect the functionality of Datadog's APM tools. You can continue using them as before without any required actions on your part. Whenever you encounter the term "APM SDK" in Datadog documentation, app, or communications, be aware that it refers to what was previously called tracing libraries or tracers.

## Example usage

Here are some specific examples of how terms have changed:

- Datadog tracing library -> Datadog APM SDK
- Datadog Java tracer -> Datadog Java SDK
- Instrumenting your app with dd-trace-py -> Instrumenting your app with the Datadog Python SDK

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-cpp
[2]: https://github.com/DataDog/dd-trace-dotnet
[3]: https://github.com/DataDog/dd-trace-java
[4]: https://github.com/DataDog/dd-trace-js
[5]: https://github.com/DataDog/dd-trace-php
[5]: https://github.com/DataDog/dd-trace-rb
[6]: https://github.com/DataDog/dd-trace-py
[7]: https://github.com/DataDog/dd-trace-go
