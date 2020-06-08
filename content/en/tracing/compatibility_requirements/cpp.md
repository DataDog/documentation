---
title: C++ Compatibility Requirements
kind: documentation
description: 'Compatibility Requirements for the C++ tracer'
further_reading:
    - link: 'tracing/setup/cpp'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

`dd-opentracing-cpp` requires C++14 to build, but if you use [dynamic loading][1] then you are instead only limited by OpenTracing's requirement for [C++11 or later][2].

Supported platforms include Linux and Mac. If you need Windows support, [contact Datadog support][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/cpp/#dynamic-loading
[2]: https://github.com/opentracing/opentracing-cpp/#cc98
[3]: /help/
