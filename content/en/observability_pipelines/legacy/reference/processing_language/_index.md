---
title: (LEGACY) Datadog Processing Language / Vector Remap Language
aliases:
  - /observability_pipelines/reference/processing_language/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

Datadog Processing Language (DPL), or Vector Remap Language (VRL), is an expression-oriented, domain specific language designed for transforming logs. It features a simple syntax and [built-in functions][1] tailored to observability use cases.

Datadog Processing Language is supported in the `remap` transform.

Remap transforms act on a single event and can be used to transform them or specify conditions for routing and filtering. You can use DPL in the following ways:

- Manipulate [arrays][2], [strings][3], and other data types.
- Encode and decode values using [Codec][4].
- [Encrypt][5] and [decrypt][6] values.
- [Coerce][7] one datatype to another datatype (for example, from an integer to a string).
- [Convert syslog values][8] to read-able values.
- Enrich values by using [enrichment tables][9].
- [Manipulate IP values][10].
- [Parse][11] values with custom rules (for example, grok, regex, and so on) and out-of-the-box functions (for example, syslog, apache, VPC flow logs, and so on).
- Manipulate event [metadata][12] and [paths][13].

[1]: /observability_pipelines/legacy/reference/processing_language/functions/
[2]: /observability_pipelines/legacy/reference/processing_language/functions/#array
[3]: /observability_pipelines/legacy/reference/processing_language/functions/#string
[4]: /observability_pipelines/legacy/reference/processing_language/functions/#codec
[5]: /observability_pipelines/legacy/reference/processing_language/functions/#encrypt
[6]: /observability_pipelines/legacy/reference/processing_language/functions/#decrypt
[7]: /observability_pipelines/legacy/reference/processing_language/functions/#coerce
[8]: /observability_pipelines/legacy/reference/processing_language/functions/#convert
[9]: /observability_pipelines/legacy/reference/processing_language/functions/#enrichment
[10]: /observability_pipelines/legacy/reference/processing_language/functions/#ip
[11]: /observability_pipelines/legacy/reference/processing_language/functions/#parse
[12]: /observability_pipelines/legacy/reference/processing_language/functions/#event
[13]: /observability_pipelines/legacy/reference/processing_language/functions/#path
