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

An APM SDK is a language-specific library that allows you to instrument your application for application performance monitoring. Datadog offers APM SDKs for various programming languages, including:

| Language   | SDK                  |
|------------|----------------------|
| C++        | [dd-trace-cpp][1]    |
| .NET       | [dd-trace-dotnet][2] |
| Go         | [dd-trace-go][3]     |
| Java       | [dd-trace-java][4]   |
| JavaScript | [dd-trace-js][5]     |
| PHP        | [dd-trace-php][6]    |
| Ruby       | [dd-trace-rb][7]     |
| Python     | [dd-trace-py][8]     |



## APM SDK vs. tracer

Datadog uses "APM SDK" for the following reasons:

- **Alignment with industry standards**: APM SDK aligns with the terminology used across the application performance monitoring industry.
- **Expanded capabilities**: APM SDK better reflects the comprehensive nature of Datadog's tools, which include not only tracing capabilities but also other features such as profiling and metrics collection, and support for OpenTelemetry tracing APIs.

## Impact on Datadog users

The terminology update does not affect the functionality of Datadog's APM tools. You can continue using them as before without any required actions on your part. Whenever you encounter "APM SDK" in Datadog documentation, app, or communications, be aware that it refers to what was previously called tracing libraries or tracers.

## API vs. SDK

APIs provide a standardized interface for instrumenting your applications to collect telemetry data.

- **API**: The interface that defines how to instrument your application. It provides methods and classes for creating spans, adding tags, and managing traces. For more information, read [Custom Instrumentation][9] using the Datadog API or OpenTelemetry API.
- **SDK**: The implementation of the API. It includes all the logic for processing, managing, and sending telemetry data to the Datadog Agent. For more information, read [Add the APM SDK][10].

<div class="alert alert-info">Datadog SDKs also support using the <a href="/opentelemetry/interoperability/instrumentation_libraries">OpenTelemetry tracing APIs</a> to instrument your applications.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-cpp
[2]: https://github.com/DataDog/dd-trace-dotnet
[3]: https://github.com/DataDog/dd-trace-go
[4]: https://github.com/DataDog/dd-trace-java
[5]: https://github.com/DataDog/dd-trace-js
[6]: https://github.com/DataDog/dd-trace-php
[7]: https://github.com/DataDog/dd-trace-rb
[8]: https://github.com/DataDog/dd-trace-py
[9]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[10]: /tracing/trace_collection/custom_instrumentation/
