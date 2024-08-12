---
title: APM SDKs
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

Datadog uses the term **APM SDK** to refer to Datadog Application Performance Monitoring tools, previously known as **tracing libraries** or **tracers**.

The terminology update does not affect the functionality of Datadog's APM tools. You can continue using them as before without any required actions on your part.

## What is an APM SDK?

An APM SDK is a language-specific library that allows you to instrument your application for application performance monitoring. The APM SDK terminology more accurately reflects the following:

- **Expanded capabilities**: APM SDKs offer you comprehensive toolset, including tracing, profiling, and trace metrics collection.
- **OpenTelemetry**: [APM SDKs support OpenTelemetry tracing APIs][11], giving you more flexible ways to instrument your applications.
- **Industry alignment**: APM SDKs align with industry standards, making it easier for you to compare and integrate tools across your tech stack.

Datadog offers APM SDKs for various programming languages, including:

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

## APIs vs. SDKs

APM SDKs are distinct from APIs, which provide a standardized interface for instrumenting your applications to collect telemetry data.

- **API**: The interface that defines how to instrument your application. It provides methods and classes for creating spans, adding tags, and managing traces. For more information, read [Custom Instrumentation][9] using the Datadog API or OpenTelemetry API.
- **SDK**: The implementation of the API. It includes all the logic for processing, managing, and sending telemetry data to the Datadog Agent. For more information, read [Add the APM SDK][10].

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
[11]: /opentelemetry/interoperability/instrumentation_libraries
