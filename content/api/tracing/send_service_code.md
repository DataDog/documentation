---
title: Services
type: apicontent
order: 19.1
---

##### Signature
`PUT /v0.3/services`

##### Example Request
{{< snippet-code-block file="content/api/tracing/code_snippets/send_service.sh" highlight="true" >}}

##### Example Response
The Agent will return a 200 status code and the text "OK" if the service was successfully delivered. If delivery fails, a 500 status code and an error message will be returned. For more information about your service, please refer to your agent log.

{{< snippet-result-code-block file="content/api/tracing/code_snippets/result.send_service.sh" >}}

