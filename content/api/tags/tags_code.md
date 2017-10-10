---
title: Tags
type: apicode
order: 12
---

##### Signature
`GET /api/v1/tags/hosts`
##### Example Request
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-get.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-get.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-get.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-get.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-get.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-get.rb" highlight="true" >}}


##### Signature
`GET /api/v1/tags/hosts/:host_name`
##### Example Request
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-get-host.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-get-host.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-get-host.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-get-host.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-get-host.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-get-host.rb" highlight="true" >}}


##### Signature
`POST /api/v1/tags/hosts/:host_name`
##### Example Request
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-add.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-add.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-add.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-add.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-add.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-add.rb" highlight="true" >}}


##### Signature
`PUT /api/v1/tags/hosts/:host_name`
##### Example Request
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-update.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-update.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-update.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-update.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-update.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/result.api-tags-update.rb" highlight="true" >}}

##### Signature
`DELETE /api/v1/tags/hosts/:host_name`
##### Example Request
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-remove.py" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-remove.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/tags/code_snippets/api-tags-remove.rb" highlight="true" >}}
##### Example Response
*This end point does not return JSON on successful requests.*