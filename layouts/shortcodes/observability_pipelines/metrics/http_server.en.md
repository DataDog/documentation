These metrics are emitted by sources that receive data over HTTP, such as the Datadog Agent, HTTP/S Server, Splunk HEC, and OpenTelemetry sources.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the source type.

`pipelines.http_server_requests_received_total`
: **Description**: The number of HTTP requests received.
: **Metric type**: count

`pipelines.http_server_responses_sent_total`
: **Description**: The number of HTTP responses sent.
: **Metric type**: count

`pipelines.http_server_handler_duration_seconds`
: **Description**: The time spent handling an HTTP request.
: **Metric type**: distribution
