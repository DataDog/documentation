---
title: C++ Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the C++ tracer'
aliases:
  - /tracing/compatibility_requirements/cpp
code_lang: cpp
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: 'tracing/setup/cpp'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

The C++ Datadog Trace library is open source - view the [GitHub repository][1] for more information.

This library requires C++14 to build, but if you use [dynamic loading][2], then OpenTracing requires [C++11 or later][3].

Supported platforms include Linux and Mac. To request Windows support, [contact Datadog support][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-opentracing-cpp
[2]: /tracing/setup/cpp/#dynamic-loading
[3]: https://github.com/opentracing/opentracing-cpp/#cc98
[4]: /help/
