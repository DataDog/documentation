---
title: Screenboards
type: apicode
order: 11
---

##### Signature
`POST /api/v1/screen`
##### Example Request
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-create.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-create.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-create.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-create.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-create.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-create.rb" highlight="true" >}}

##### Signature
`PUT /api/v1/screen/:board_id`
##### Example Request
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-update.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-update.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-update.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-update.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-update.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-update.rb" highlight="true" >}}


##### Signature
`DELETE /api/v1/screen/:board_id`
##### Example Request
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-delete.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-delete.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-delete.rb" highlight="true" >}}
##### Example Response
*This end point does not return JSON on successful requests.*


##### Signature
`GET /api/v1/screen/:board_id`
##### Example Request
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-get.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-get.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-get.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-get.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-get.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-get.rb" highlight="true" >}}


##### Signature
`GET /api/v1/screen`
##### Example Request
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-get-all.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-get-all.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-get-all.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-get-all.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-get-all.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-get-all.rb" highlight="true" >}}



##### Signature
`GET /api/v1/screen/share/:board_id`
##### Example Request
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-share.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-share.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-share.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-share.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-share.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/result.api-screenboard-share.rb" highlight="true" >}}



##### Signature
`DELETE /api/v1/screen/share/:board_id`
##### Example Request
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-revoke.py" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-revoke.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/screenboards/code_snippets/api-screenboard-revoke.rb" highlight="true" >}}
##### Example Response
*This end point does not return JSON on successful requests.*