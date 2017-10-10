---
title: Monitors
type: apicode
order: 8
---

##### Signature
`POST /api/v1/monitor`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-create.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-create.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-create.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-create.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-create.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-create.rb" highlight="true" >}}


##### Signature
`GET /api/v1/monitor/:monitor_id`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-show.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-show.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-show.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-show.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-show.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-show.rb" highlight="true" >}}


##### Signature
`PUT /api/v1/monitor/:monitor_id`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-edit.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-edit.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-edit.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-edit.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-edit.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-edit.rb" highlight="true" >}}


##### Signature
`DELETE /api/v1/monitor/:monitor_id`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-delete.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-delete.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-delete.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-delete.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-delete.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-delete.rb" highlight="true" >}}


##### Signature
`GET /api/v1/monitor`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-show-all.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-show-all.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-show-all.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-show-all.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-show-all.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-show-all.rb" highlight="true" >}}


##### Signature
`POST /monitor/bulk_resolve`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-bulk-resolve.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-bulk-resolve.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-bulk-resolve.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-bulk-resolve.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-bulk-resolve.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-bulk-resolve.rb" highlight="true" >}}


##### Signature
`POST /api/v1/monitor/mute_all`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-mute-all.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-mute-all.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-mute-all.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-mute-all.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-mute-all.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-mute-all.rb" highlight="true" >}}


##### Signature
`POST /api/v1/monitor/unmute_all`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-unmute-all.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-unmute-all.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-unmute-all.rb" highlight="true" >}}
##### Example Response
*This end point does not return JSON on successful requests.*


##### Signature
`POST /api/v1/monitor/:monitor_id/mute`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-mute.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-mute.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-mute.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-mute.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-mute.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-mute.rb" highlight="true" >}}


##### Signature
`POST /api/v1/monitor/:monitor_id/unmute`
##### Example Request
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-unmute.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-unmute.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/api-monitor-unmute.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-unmute.py" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-unmute.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/monitors/code_snippets/result.api-monitor-unmute.rb" highlight="true" >}}
