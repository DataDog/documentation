Since Amazon Data Firehose can only deliver data over HTTP to an HTTPS URL, when you deploy the Observability Pipelines Worker, you need to deploy it with a publicly exposed endpoint and solve TLS termination. To solve TLS termination, you can front OPW with a load balancer or configure TLS options. See [Understand HTTP endpoint delivery request and response specifications][10122] for more information.

To send logs to the Observability Pipelines Worker, set up an Amazon Data Firehose stream with an [HTTP endpoint destination][10121] in the region where your logs are. Configure the endpoint URL to the endpoint where OPW is deployed.

Amazon Data Firehose may send log events nested in an array, such as the structure shown below. To extract the records as individual events, use the [Split Array processor][10123] and target the array. For example, `logEvents`. The Split Array processor enables you to break log data from arrays into individual events, making it easier for users to filter, query, and visualize data that was previously buried in layers.

```json
{
    "logEvents": [
        {log 1},
        {log 2},
        {log 3},
        {log n}
  ]
}
```

[10121]: https://docs.aws.amazon.com/firehose/latest/dev/create-destination.html?icmpid=docs_console_unmapped#create-destination-http
[10122]: https://docs.aws.amazon.com/firehose/latest/dev/httpdeliveryrequestresponse.html#requestformat
[10123]: https://docs.datadoghq.com/observability_pipelines/processors/split_array
