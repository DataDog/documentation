---
title: trace root span
core_product:
  - apm
---
A [span][1] is a trace root span when it is the first span of a trace. The root span is the entry-point method of the traced request. Its start marks the beginning of the trace.

{{< img src="tracing/visualization/toplevelspans.png" alt="A trace root span" style="width:80%" >}}

In this example, the **service entry spans** are:

- `rack.request` (which is also the _root span_)
- `aspnet_coremvc.request`
- The topmost green span below `aspnet_coremvc.request`
- Every orange `mongodb` span

[1]: /glossary/#span