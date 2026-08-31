To use Observability Pipelines' Amazon Data Firehose:
- Since Amazon Data Firehose can only deliver data over HTTP to an HTTPS URL, when you deploy the Observability Pipelines Worker, you need to deploy it with a publicly exposed endpoint and solve TLS termination. To solve TLS termination, you can front OPW with a load balancer or configure TLS options. See [Understand HTTP endpoint delivery request and response specifications][10111] for more information.
- If your forwarders are globally configured to enable SSL, you need the appropriate TLS certificates and the password you used to create your private key.

[10111]: https://docs.aws.amazon.com/firehose/latest/dev/httpdeliveryrequestresponse.html#requestformat