---
title: Troubleshooting Serverless Monitoring for AWS Step Functions
kind: documentation
---


#### Make sure logs are forwarded successfully to Datadog
- Check the Datadog Lambda Forwarder for error messages. Ensure that you have correctly set your API key and Datadog site.
- Enable `DEBUG` logs on the Datadog Lambda Forwarder by setting the environment variable `DD_LOG_LEVEL` to `debug`.

#### Verify that logs are searchable on Live Search
In Datadog, go to [*Logs*][1] > [*Live Tail*][2]. Search for `source:stepfunction`. You may need to trigger the state machine a few times.


[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/logs/livetail