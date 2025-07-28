After the container is built and pushed to your registry, set the required environment variables for the Datadog Agent:

- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a Google Cloud Secret for privacy and safety.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page.

For more environment variables and their function, see [Environment Variables](#environment-variables).

The following command deploys the service and allows any external connection to reach it. In this example, your service listening is set to port 8080. Ensure that this port number matches the exposed port inside of your Dockerfile.

```shell
gcloud run deploy <APP_NAME>
  --image=gcr.io/<YOUR_PROJECT>/<APP_NAME> \
  --port=8080 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_SITE=$DD_SITE \
```

### Environment variables

| Variable | Description |
| -------- | ----------- |
| `DD_API_KEY` | [Datadog API key][1] - **Required**|
| `DD_SITE` | [Datadog site][2] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_LOGS_INJECTION`| When true, enrich all logs with trace data for supported loggers in [Java][4], [Node.js][5], [.NET][6], and [PHP][7]. See additional docs for [Python][8], [Go][9], and [Ruby][10]. |
| `DD_SERVICE`      | See [Unified Service Tagging][3].                                  |
| `DD_VERSION`      | See [Unified Service Tagging][3].                                  |
| `DD_ENV`          | See [Unified Service Tagging][3].                                  |
| `DD_SOURCE`       | See [Unified Service Tagging][3].                                  |
| `DD_TAGS`         | See [Unified Service Tagging][3].                                  |


[1]: /account_management/api-app-keys/#api-keys
[2]: /getting_started/site/
[3]: /getting_started/tagging/unified_service_tagging/
[4]: /tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[5]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[6]: /tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[7]: /tracing/other_telemetry/connect_logs_and_traces/php
[8]: /tracing/other_telemetry/connect_logs_and_traces/python
[9]: /tracing/other_telemetry/connect_logs_and_traces/go
[10]: /tracing/other_telemetry/connect_logs_and_traces/ruby
