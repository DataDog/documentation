---
title: Trace and Span ID Formats
kind: guide
aliases:
  - /tracing/faq/span_and_trace_id_format/
further_reading:
  - link: /tracing/other_telemetry/connect_logs_and_traces/
    tag: documentation
    text: Correlating logs and traces

---
{{< jqmath-vanilla >}}

This page details Datadog tracing library support for trace and span IDs.

- **Generated IDs**: By default, all tracing libraries generate 128-bit trace IDs and 64-bit span IDs.  
- **Accepted IDs**: Datadog accepts 128-bit or 64-bit trace IDs, and 64-bit span IDs.

## 128-bit trace IDs

128-bit trace IDs are generated and accepted by default in the latest versions of Datadog tracing libraries:

- [Node.js][1]
- [Java][2]   
- [Go][3]     
- [Python][4] 
- [Ruby][5]   
- [.NET][6]   
- [PHP][7]    
- [C++][8]   

## 64-bit trace and span IDs

### Trace IDs

Trace IDs are generated as 128-bit by default, and they are accepted as either 128-bit or 64-bit integers. To generate 64-bit trace IDs, set the environment variable `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED` to `false`.

### Span IDs

Span IDs are limited to 64-bits in Datadog.

| Language   | Generated IDs            | Valid, Accepted 64-bit int IDs |
| ---------- | ------------------------ | ----------------------------- |
| Node.js    | Unsigned [0, $2^63$]     | Signed or unsigned            |
| Java       | Unsigned [1, $2^63-1$]   | Unsigned                      |
| Go         | Unsigned [0, $2^63-1$]   | Signed or unsigned            |
| Python     | Unsigned [0, $2^64-1$]   | Unsigned                      |
| Ruby       | Unsigned [1, $2^62-1$]   | Unsigned                      |
| .NET       | Unsigned [0, $2^63-1$]   | Unsigned                      |
| PHP        | Unsigned [1, $2^64-1$]   | Unsigned                      |
| C++        | Unsigned [0, $2^63-1$]   | Unsigned                      |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/releases
[2]: https://github.com/DataDog/dd-trace-java/releases
[3]: https://github.com/DataDog/dd-trace-go/releases
[4]: https://github.com/DataDog/dd-trace-py/releases
[5]: https://github.com/DataDog/dd-trace-rb/releases
[6]: https://github.com/DataDog/dd-trace-dotnet/releases
[7]: https://github.com/DataDog/dd-trace-php/releases
[8]: https://github.com/DataDog/dd-trace-cpp/releases
