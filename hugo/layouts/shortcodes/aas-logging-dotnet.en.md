You can send logs from your application in Azure App Service to Datadog in one of the following ways:

- Use the [installation steps](#installation) on this page to enable APM with the Datadog APM extension. Then [enable Agentless logging][aas-logging-dotnet-1].
- Use [Agentless logging with the Serilog sink][aas-logging-dotnet-2].

Both methods allow trace ID injection, making it possible to connect logs and traces in Datadog. To enable trace ID injection with the extension, add the application setting `DD_LOGS_INJECTION:true`.

[aas-logging-dotnet-1]: /logs/log_collection/csharp/#agentless-logging-with-apm
[aas-logging-dotnet-2]: /logs/log_collection/csharp/#agentless-logging-with-serilog-sink
