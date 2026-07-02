These metrics are emitted by destinations that send data over HTTP, such as Datadog Logs, Datadog Metrics, Elasticsearch, OpenSearch, New Relic, Splunk HEC, Microsoft Sentinel, SentinelOne, CrowdStrike NG-SIEM, Google SecOps, and the HTTP Client destination. **Note**: AWS-based destinations (such as Amazon S3, Amazon OpenSearch, and Amazon Security Lake) do not emit these metrics.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the destination type.

`pipelines.http_client_requests_sent_total`
: **Description**: The number of HTTP requests sent, tagged by request method.
: **Metric type**: count

`pipelines.http_client_responses_total`
: **Description**: The number of HTTP responses received, tagged by response status.
: **Metric type**: count

`pipelines.http_client_errors_total`
: **Description**: The number of HTTP client errors, tagged by error kind.
: **Metric type**: count

`pipelines.http_client_rtt_seconds`
: **Description**: The round-trip time, in seconds, for HTTP requests, from when the request is sent to when the final response or error is received.
: **Metric type**: gauge

`pipelines.http_client_response_rtt_seconds`
: **Description**: The round-trip time, in seconds, of HTTP requests, tagged by response status.
: **Metric type**: gauge

`pipelines.http_client_error_rtt_seconds`
: **Description**: The round-trip time, in seconds, of HTTP requests that resulted in an error, tagged by error kind.
: **Metric type**: gauge

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
