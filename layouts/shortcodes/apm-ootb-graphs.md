### Requests and Errors

The **Requests and Errors** graph displays the total number of requests (hits) and errors over time. Using the dropdown menu, you can also view:

- **Requests by Version**: Breakdown of requests across different service versions.
- **Requests per Second by Version**: The rate of requests for each version.
- **Requests and Errors Per Second**: The rate of requests (hits) and errors per second.

### Errors

The **Errors** graph displays the total count of errors over time. Using the dropdown menu, you can also view:

- **Errors by Version**: The error counts for each service version side by side.
- **Errors per Second by Version**: The error rate (errors per second) for each service version over time.
- **Errors per Second**: The overall error rate for the service, per second.
- **% Error Rate by Version**: The percentage of requests resulting in errors for each service version.
- **% Error Rate**: The overall error rate for the service, as a percentage.

### Latency

The **Latency** graph displays the latency percentiles as a timeseries. Using the dropdown menu, you can also view:

- **Latency by Version**: Latency broken down by service version.
- **Historical Latency**: Comparison of the current latency distribution with the previous day and week.
- **Latency Distribution**: The distribution of latencies over the selected time frame.
- **Latency by Error**: The latency of requests over time, segmented by whether the requests resulted in errors.
- **Apdex** (Application Performance Index): The [Apdex][100] score over time.

### Avg Time per Request

For services involving multiple downstream services, a fourth graph breaks down the average [execution time][101] spent per request. Using the dropdown menu, you can also view:

- **Total Time Spent**: The cumulative time spent in each downstream service over time.
- **% of Time Spent**: The percentage of time spent in each downstream service relative to the total time.

For services like Postgres or Redis, which are final operations that do not call other services, there is no sub-services graph. [Watchdog][102] performs automatic anomaly detection on the Requests, Latency, and Error graphs. If an anomaly is detected, an overlay appears on the graph. Clicking the Watchdog icon provides more details in a side panel.

[100]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[101]: /glossary/#execution-time
[102]: /watchdog/
