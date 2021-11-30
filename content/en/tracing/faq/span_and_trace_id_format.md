---
title: Trace and Span ID Formats
kind: faq
---
{{< jqmath-vanilla >}}

If you write code that interacts directly with Datadog tracing spans and traces, here's what you need to know about how span IDs and trace IDs are generated and accepted by Datadog tracing libraries.

Generally, the libraries generate IDs that are 64-bit unsigned integers. Specifics and exceptions noted below:

| Language   | Generated IDs            | Valid Accepted 64-bit int IDs |
| ---------- | ------------------------ | ----------------------------- |
| JavaScript | Unsigned [0, $2^63$]     | Signed or unsigned            |
| Java       | Unsigned [1, $2^63-1$]   | Unsigned                      |
| Go         | Unsigned [0, $2^63-1$]   | Signed or unsigned            |
| Python     | Unsigned [0, $2^63$]     | Unsigned                      |
| Ruby       | Unsigned [0, $2^63$]     | Unsigned                      |
| .NET       | Unsigned [0, $2^63$]     | Unsigned                      |
| PHP        | [0, $2^63$]              | Signed                        |
| C++        | Unsigned [0, $2^63-1$]   | Unsigned                      |