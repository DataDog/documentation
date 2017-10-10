---
title: Metrics
type: apicode
order: 5
---
##### Signature
GET https://app.datadoghq.com/api/v1/metrics
##### Example Request
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metrics-list.sh" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metrics-list.sh" highlight="true" >}}


##### Signature
POST https://app.datadoghq.com/api/v1/series
##### Example Request
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metrics-post.py" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metrics-post.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metrics-post.rb" highlight="true" >}}


##### Signature
GET https://app.datadoghq.com/api/v1/query
##### Example Request
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metrics-query.py" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metrics-query.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metrics-query.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metrics-query.py" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metrics-query.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metrics-query.rb" highlight="true" >}}


##### Signature
GET /api/v1/metrics/:metric_name
##### Example Request
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metric-metadata-get.py" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metric-metadata-get.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metric-metadata-get.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metric-metadata-get.py" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metric-metadata-get.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metric-metadata-get.rb" highlight="true" >}}


##### Signature
PUT /api/v1/metrics/:metric_name
##### Example Request
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metric-metadata-update.py" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metric-metadata-update.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/api-metric-metadata-update.rb" highlight="true" >}}
##### Example Response
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metric-metadata-update.py" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metric-metadata-update.sh" highlight="true" >}}
{{< snippet-code-block file="content/api/metrics/code_snippets/result.api-metric-metadata-update.rb" highlight="true" >}}