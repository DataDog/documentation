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

128-bit trace IDs are generated and accepted by default in the latest versions of Datadog tracing libraries.

| Language   | Generated IDs             | Valid Accepted 128-bit int IDs |
| ---------- | --------------------------| ------------------------------ |
| JavaScript | Unsigned [0, $2^128-1$]   |  Signed or unsigned            |
| Java       | Unsigned [0, $2^128-1$]   |  Unsigned                      |
| Go         | Unsigned [0, $2^128-1$]   |  Signed or unsigned            |
| Python     | Unsigned [0, $2^128-1$]   |  Unsigned                      |
| Ruby       | Unsigned [0, $2^128-1$]   |  Unsigned                      |
| .NET       | Unsigned [0, $2^128-1$]   |  Unsigned                      |
| PHP        | Unsigned [0, $2^128-1$]   |  Unsigned                      |
| C++        | Unsigned [0, $2^128-1$]   |  Unsigned                      |

## 64-bit trace and span IDs

### Trace IDs

Trace IDs are generated as 128-bit by default, and they are accepted as either 128-bit or 64-bit integers. To generate 64-bit trace IDs, set the environment variable `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED` to `false`.

| Language   | Generated IDs            | Valid Accepted 64-bit int IDs |
| ---------- | ------------------------ | ----------------------------- |
| JavaScript | Unsigned  [$0, 2^64-1$]   | Signed or unsigned            |
| Java       | Unsigned  [$0, 2^64-1$]   | Unsigned                      |
| Go         | Unsigned  [$0, 2^64-1$]   | Signed or unsigned            |
| Python     | Unsigned  [$0, 2^64-1$]   | Unsigned                      |
| Ruby       | Unsigned  [$0, 2^64-1$]   | Unsigned                      |
| .NET       | Unsigned  [$0, 2^64-1$]   | Unsigned                      |
| PHP        | Unsigned  [$0, 2^64-1$]   | Unsigned                      |
| C++        | Unsigned  [$0, 2^64-1$]   | Unsigned                      |

## Span IDs

Span IDs are limited to 64-bits in Datadog.

| Language   | Generated IDs            | Valid Accepted 64-bit int IDs |
| ---------- | ------------------------ | ----------------------------- |
| JavaScript | Unsigned [0, $2^63$]     | Signed or unsigned            |
| Java       | Unsigned [1, $2^63-1$]   | Unsigned                      |
| Go         | Unsigned [0, $2^63-1$]   | Signed or unsigned            |
| Python     | Unsigned [0, $2^64-1$]   | Unsigned                      |
| Ruby       | Unsigned [1, $2^62-1$]   | Unsigned                      |
| .NET       | Unsigned [0, $2^63-1$]   | Unsigned                      |
| PHP        | Unsigned [1, $2^64-1$]   | Unsigned                      |
| C++        | Unsigned [0, $2^63-1$]   | Unsigned                      |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}