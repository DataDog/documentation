{{- $target := .Get "target" -}}
## Set up the Datadog Agent

Datadog SDKs use the [Datadog Agent][1] to send AI Guard data to Datadog. The Agent must be running and accessible to the SDK for you to see data in Datadog.

If you don't use the Datadog Agent, the AI Guard evaluator API still works, but you can't see AI Guard traces in Datadog.

## Required environment variables

Set the following environment variables in your application:

| Variable              | Value                    |
|:----------------------|:-------------------------|
| `DD_AI_GUARD_ENABLED` | `true`                   |
| `DD_API_KEY`          | `<YOUR_API_KEY>`         |
| `DD_APP_KEY`          | `<YOUR_APPLICATION_KEY>` |
| `DD_ENV`              | `<YOUR_ENVIRONMENT>`     |
| `DD_SERVICE`          | `<YOUR_SERVICE>`         |
{{- if eq $target "automatic" -}}
| `DD_TRACE_ENABLED`    | `true`                   |

By default, automatic integrations follow the blocking configuration set in the UI. To disable blocking for a specific service, set `DD_AI_GUARD_BLOCK` to false (equivalent to the block option in the [SDK][2] and [REST API][3]):

| Variable            | Value   |
| :------------------ |:--------|
| `DD_AI_GUARD_BLOCK` | `false` |
{{- end -}}


[1]: /agent/?tab=Host-based
[2]: /security/ai_guard/setup/sdk/
[3]: /security/ai_guard/setup/http_api/
