You can generate these types of metrics for your logs. See the [Metrics Types][10031] and [Distributions][10032] documentation for more details.

| Metric type  | Description                                                                                                                                     | Example                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| COUNT        | Represents the total number of event occurrences in one time interval. This value can be reset to zero, but cannot be decreased.                | You want to count the number of logs with `status:error`.                                         |
| GAUGE        | Represents a snapshot of events in one time interval.                                                                                           | You want to measure the latest CPU utilization per host for all logs in the production environment. |
| DISTRIBUTION | Represent the global statistical distribution of a set of values calculated across your entire distributed infrastructure in one time interval. | You want to measure the average time it takes for an API call to be made.                           |

###### Count metric example

For this `status:error` log example:

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

To create a count metric that counts the number of logs that contain `"status":"error"` and groups them by `env` and `host`, enter the the following information:

| Input parameters | Value               |
|------------------|---------------------|
| Filter query     | `@status:error`     |
| Metric name      | `status_error_total`|
| Metric type      | Count               |
| Group by         | `env`, `prod`       |

###### Distribution metric example

For this example of an API response log:

```
{
    "timestamp": "2018-10-15T17:01:33Z",
    "method": "GET",
    "status": 200,
    "request_body": "{"information"}",
    "response_time_seconds: 10
}
```

To create a distribution metric that measures the average time it takes for an API call to be made, enter the following information:

| Input parameters       | Value                   |
|------------------------|-------------------------|
| Filter query           | `@method`               |
| Metric name            | `status_200_response`   |
| Metric type            | Distribution            |
| Select a log attribute | `response_time_seconds` |
| Group by               | `method`                |

[10031]: /metrics/types/
[10032]: /metrics/distributions/