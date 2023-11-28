---
title: Datadog Processing Language
---

The Datadog Processing Language (DPL) is an expression-oriented, domain-specific language designed for transforming data (logs and metrics (beta)) sent to Observability Pipelines. It features a simple syntax and [built-in functions][1].

You can use DPL in the [`remap` transform][2] to:

- Manipulate [arrays][3], [strings][4], and other data types.
- Encode and decode values using [Codec][5].
- [Encrypt][6] and [decrypt][7] values.
- [Coerce][8] one datatype to another datatype (for example, from an integer to a string).
- [Convert syslog values][9] to read-able values.
- Enrich values by using [enrichment tables][10].
- [Manipulate IP values][11].
- [Parse][12] values with custom rules (for example, grok, regex, and so on) and out-of-the-box functions (for example, syslog, apache, VPC flow logs, and so on).
- Manipulate event [metadata][13] and [paths][14].

See [DPL Functions Reference][1] for a full list of DPL built-in functions.

[1]: /observability_pipelines/reference/processing_language/functions/
[2]: /observability_pipelines/reference/transforms/#remap
[3]: /observability_pipelines/reference/processing_language/functions/#array
[4]: /observability_pipelines/reference/processing_language/functions/#string
[5]: /observability_pipelines/reference/processing_language/functions/#codec
[6]: /observability_pipelines/reference/processing_language/functions/#encrypt
[7]: /observability_pipelines/reference/processing_language/functions/#decrypt
[8]: /observability_pipelines/reference/processing_language/functions/#coerce
[9]: /observability_pipelines/reference/processing_language/functions/#convert
[10]: /observability_pipelines/reference/processing_language/functions/#enrichment
[11]: /observability_pipelines/reference/processing_language/functions/#ip
[12]: /observability_pipelines/reference/processing_language/functions/#parse
[13]: /observability_pipelines/reference/processing_language/functions/#event
[14]: /observability_pipelines/reference/processing_language/functions/#path
