---
title: Traces
type: apicontent
order: 19
---

##### Signature
`PUT /v0.3/traces`

##### Example Request
{{< snippet-code-block file="content/api/tracing/code_snippets/send_trace.sh" highlight="true" >}}

##### Example Response

{{< snippet-result-code-block file="content/api/tracing/code_snippets/result.send_trace.sh" >}}

The Agent will return a 200 status code and the text "OK" if the traces were successfully delivered. If delivery fails, a 500 status code and an error message will be returned. Note that successful delivery does <em>not</em> mean the traces are accepted. Traces may be dropped after successful delivery. For more information about your traces, please refer to your agent log.