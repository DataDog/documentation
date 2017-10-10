---
title: Downtimes
type: apicode
order: 9
---
##### Signature
`POST /api/v1/downtime`
##### Example Request
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-schedule-downtime.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-schedule-downtime.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-schedule-downtime.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-schedule-downtime.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-schedule-downtime.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-schedule-downtime.rb" highlight="true" >}}


##### Signature
`PUT /api/v1/downtime/:downtime_id`
##### Example Request
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-update-downtime.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-update-downtime.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-update-downtime.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-update-downtime.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-update-downtime.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-update-downtime.rb" highlight="true" >}}


##### Signature
`DELETE /api/v1/downtime/:downtime_id`
##### Example Request
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-cancel-downtime.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-cancel-downtime.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-cancel-downtime.rb" highlight="true" >}}
##### Example Response
*This end point does not return JSON on successful requests.*


##### Signature
`POST /api/v1/downtime/cancel/by_scope`
##### Example Request
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-cancel-downtime-by-scope.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-cancel-downtime-by-scope.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-cancel-downtime-by-scope.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-cancel-downtime-by-scope.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-cancel-downtime-by-scope.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-cancel-downtime-by-scope.rb" highlight="true" >}}


##### Signature
`GET /api/v1/downtime/:downtime_id`
##### Example Request
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-get-downtime.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-get-downtime.sh" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-get-downtime.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-get-downtime.sh" highlight="true" >}}


##### Signature
`GET /api/v1/downtime`
##### Example Request
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-get-downtimes.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-get-downtimes.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/api-monitor-get-downtimes.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-get-downtimes.py" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-get-downtimes.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/downtimes/code_snippets/result.api-monitor-get-downtimes.rb" highlight="true" >}}