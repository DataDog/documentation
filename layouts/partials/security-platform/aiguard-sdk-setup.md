{{- $target := .Get "target" -}}
## Set up the Datadog Agent

SDKs use the [Datadog Agent](/agent/?tab=Host-based) to send AI Guard data to Datadog. The Agent must be running and accessible to your application.

If you don't use the Datadog Agent, the AI Guard evaluator API still works, but you can't see AI Guard traces in Datadog.

## Required environment variables

Set the following environment variables in your application:

{{ if eq $target "automatic" }}

| Variable              | Value                                     |
|:----------------------|:------------------------------------------|
| `DD_AI_GUARD_ENABLED` | `true`                                    |
| `DD_API_KEY`          | <code>&lt;YOUR_API_KEY&gt;</code>         |
| `DD_APP_KEY`          | <code>&lt;YOUR_APPLICATION_KEY&gt;</code> |
| `DD_ENV`              | <code>&lt;YOUR_ENVIRONMENT&gt;</code>     |
| `DD_SERVICE`          | <code>&lt;YOUR_SERVICE&gt;</code>         |
| `DD_TRACE_ENABLED`    | `true`                                    |

By default, automatic integrations follow the blocking configuration set in the AI Guard service settings. To disable blocking for a specific service, set `DD_AI_GUARD_BLOCK` to `false` (equivalent to the `block` option in the [SDK](/security/ai_guard/setup/sdk/) and [REST API](/security/ai_guard/setup/http_api/)):

| Variable            | Value   |
| :------------------ |:--------|
| `DD_AI_GUARD_BLOCK` | `false` |

{{ else }}

| Variable              | Value                                     |
|:----------------------|:------------------------------------------|
| `DD_AI_GUARD_ENABLED` | `true`                                    |
| `DD_API_KEY`          | <code>&lt;YOUR_API_KEY&gt;</code>         |
| `DD_APP_KEY`          | <code>&lt;YOUR_APPLICATION_KEY&gt;</code> |
| `DD_ENV`              | <code>&lt;YOUR_ENVIRONMENT&gt;</code>     |
| `DD_SERVICE`          | <code>&lt;YOUR_SERVICE&gt;</code>         |

{{ end }}

