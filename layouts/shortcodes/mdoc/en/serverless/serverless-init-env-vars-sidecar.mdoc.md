<!--
Shared sidecar serverless-init environment variables table (defaultSource: containerapp).

Pages using this partial must declare these filters:

content_filters:
  - trait_id: prog_lang
    option_group_id: aca_runtime_options
-->

| Variable                 | Description | Container |
| ------------------------ | ----------- | --------- |
| `DD_API_KEY`             | [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys) - **Required** | Sidecar container |
| `DD_SITE`                | [Datadog site](/getting_started/site/) - **Required** | Sidecar container |
| `DD_SERVICE`             | Datadog Service name. **Required** | Both containers |
| `DD_AZURE_SUBSCRIPTION_ID` | Azure Subscription ID. **Required** | Sidecar container |
| `DD_AZURE_RESOURCE_GROUP` | Azure Resource Group name. **Required** | Sidecar container |
| `DD_SERVERLESS_LOG_PATH` | The path where the sidecar should tail logs from. Recommended to set to `/shared-volume/logs/app.log`. | Sidecar container |
| `DD_LOGS_INJECTION`      | When true, enrich all logs with trace data for supported loggers. See [Correlate Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/) for more information. | Application container |
| `DD_VERSION`             | See [Unified Service Tagging](/getting_started/tagging/unified_service_tagging/). | Both containers |
| `DD_ENV`                 | See [Unified Service Tagging](/getting_started/tagging/unified_service_tagging/). | Both containers |
| `DD_SOURCE`              | Set the log source to enable a [Log Pipeline](/logs/log_configuration/pipelines) for advanced parsing. To automatically apply language-specific parsing rules, set it to your application language (`python`, `nodejs`, `go`, `java`, `csharp`, `ruby`, or `php`), or use your custom pipeline. Defaults to `containerapp`. | Sidecar container |
| `DD_TAGS`                | Add custom tags to your logs, metrics, and traces. Tags should be comma separated in key/value format (for example: `key1:value1,key2:value2`). | Sidecar container |

<!-- Java -->
{% if equals($prog_lang, "java") %}
For Java, also set `JAVA_TOOL_OPTIONS` (**Required** for tracing) in the application container to the path to the Datadog Java agent. For example, `-javaagent:/path/to/dd-java-agent.jar`.
{% /if %}
