These metrics describe the adaptive concurrency controller, which automatically tunes how many in-flight HTTP requests a destination allows based on observed response times. They are emitted by destinations that send data over HTTP, including AWS-based destinations.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the destination type.

`pipelines.active_endpoints`
: **Description**: The number of sink endpoints that are marked healthy.
: **Metric type**: gauge

`pipelines.adaptive_concurrency_limit`
: **Description**: The concurrency limit for HTTP requests to this destination, automatically adjusted by the adaptive concurrency controller based on observed response times.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_in_flight`
: **Description**: The number of HTTP requests in flight to a destination, compared against the adaptive concurrency limit to determine when to throttle.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_reached_limit`
: **Description**: Whether the adaptive concurrency controller reached its computed limit (1) or not (0) during the last measurement interval.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_back_pressure`
: **Description**: Whether the adaptive concurrency controller detected back pressure (1) or not (0) during the last measurement interval.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_averaged_rtt`
: **Description**: The smoothed average round-trip time (RTT), in seconds, for HTTP requests to this destination, used as the baseline for adaptive concurrency calculations.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_observed_rtt`
: **Description**: The round-trip time (RTT), in seconds, observed for the most recent HTTP request to this destination.
: **Metric type**: distribution

`pipelines.adaptive_concurrency_past_rtt_mean`
: **Description**: The historical mean RTT, in seconds, for HTTP requests to this destination, used as the long-term baseline for adaptive concurrency adjustments.
: **Metric type**: distribution

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
