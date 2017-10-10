---
title: Comments
type: apicode
order: 14
---

##### Signature
`POST api/v1/comments`
##### Example Request
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-create.py" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-create.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-create.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/comments/code_snippets/result.api-comment-create.py" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/result.api-comment-create.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/result.api-comment-create.rb" highlight="true" >}}


##### Signature
`PUT api/v1/comments/:comment_id`
##### Example Request
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-edit.py" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-edit.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-edit.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/comments/code_snippets/result.api-comment-edit.py" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/result.api-comment-edit.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/result.api-comment-edit.rb" highlight="true" >}}


##### Signature
`DELETE api/v1/comments/:comment_id`
##### Example Request
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-delete.py" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-delete.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/comments/code_snippets/api-comment-delete.rb" highlight="true" >}}
##### Example Response
*This end point does not return JSON on successful requests.*