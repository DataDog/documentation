---
title: Connect applications to AI Gateway
description: Connect Claude Code, Codex, and Python SDKs to Datadog AI Gateway, attribute requests to applications and teams, and verify traffic.
further_reading:
  - link: "/llm_observability/configure/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

Connect a coding agent or SDK to AI Gateway with a Datadog credential and an approved model identifier. These examples connect organization-funded applications using provider credentials configured by your administrator.

Before you begin:

- Complete [Get started][1], or ask your administrator for access to a configured model or routing rule.
- Have a [personal access token or service access token][2] whose principal and scope allow `ai_gateway_usage`.
- Review the [data capture setting][6] before sending sensitive content.
- Choose `<PROVIDER_SLUG>/<MODEL_ID>` for a specific provider model, or `router/<RULE_SLUG>` for a routing rule. The target must support the client's request format, either natively or through API translation. Translation supports a subset of each API; available client features depend on the target.

The following shell examples use Bash or Zsh. Load your Datadog token from your secret manager into `DD_AI_GATEWAY_TOKEN`, then set the model identifier:

```shell
export DD_AI_GATEWAY_MODEL="<PROVIDER_SLUG>/<MODEL_ID>"
```

Use the base URL for your [Datadog site][12]. The paths differ because each client appends its API path:

| Client | Base URL | Request path |
|---|---|---|
| Claude Code or Anthropic SDK | `https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai` | `/v1/messages` |
| Codex | `https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1` | `/responses` |
| OpenAI SDK | `https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1` | `/responses` or `/chat/completions` |

<!-- vale Datadog.headings = NO -->
## Configure Claude Code
<!-- vale Datadog.headings = YES -->

For the Claude Code CLI, set the Gateway URL and bearer token in the terminal where you start the client:

```shell
export ANTHROPIC_BASE_URL="https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai"
export ANTHROPIC_AUTH_TOKEN="$DD_AI_GATEWAY_TOKEN"
export ANTHROPIC_MODEL="$DD_AI_GATEWAY_MODEL"
export ANTHROPIC_CUSTOM_MODEL_OPTION="$DD_AI_GATEWAY_MODEL"
export ANTHROPIC_DEFAULT_SONNET_MODEL="$DD_AI_GATEWAY_MODEL"
export ANTHROPIC_DEFAULT_OPUS_MODEL="$DD_AI_GATEWAY_MODEL"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="$DD_AI_GATEWAY_MODEL"
export ANTHROPIC_DEFAULT_FABLE_MODEL="$DD_AI_GATEWAY_MODEL"
export ANTHROPIC_CUSTOM_HEADERS="x-dd-tag-ml_app: claude-code"
claude
```

This example maps the model aliases to one approved target for the connection test. To use different models for those aliases, set each variable to an approved Gateway model or routing rule. See [Claude Code model configuration][19].

Run `/status` in Claude Code and confirm the base URL and credential source. A saved or managed client configuration can affect these settings. For other client surfaces and persistent configuration, see [Claude Code gateway configuration][16]. Keep tokens out of shared project settings.

<!-- vale Datadog.headings = NO -->
## Configure Codex
<!-- vale Datadog.headings = YES -->

Merge the following settings into `~/.codex/config.toml`. Replace the model placeholder with the same identifier you selected above. Keep the top-level settings before the first TOML table, and update existing keys instead of adding duplicate definitions.

```toml
model = "<PROVIDER_SLUG>/<MODEL_ID>"
model_provider = "datadog"
web_search = "disabled"

[model_providers.datadog]
name = "Datadog AI Gateway"
base_url = "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1"
wire_api = "responses"
env_key = "DD_AI_GATEWAY_TOKEN"
requires_openai_auth = false
supports_websockets = false
http_headers = { "x-dd-tag-ml_app" = "codex" }
```

Start `codex` from the terminal where `DD_AI_GATEWAY_TOKEN` is available. The `env_key` setting sends that token as `Authorization: Bearer`. AI Gateway supports Responses over HTTP and server-sent events (SSE), so keep `supports_websockets = false`.

Gateway model IDs and routing aliases can be unfamiliar to Codex. Configure a matching Codex model catalog to supply model instructions, context limits, and tool capabilities; otherwise, Codex can use generic settings. If your administrator supplies a local catalog, add its absolute path before the first TOML table:

```toml
model_catalog_json = "<ABSOLUTE_PATH_TO_CODEX_MODEL_CATALOG>"
```

The catalog entry's `slug` must match `model`. A Gateway model-listing response is not a Codex model catalog. See [Codex model catalog configuration][20].

Web search is disabled for the connection test. Enable additional client features after checking compatibility with the selected target. For desktop environment variables and configuration options, see [Codex gateway configuration][17].

<!-- vale Datadog.headings = NO -->
## Configure the OpenAI Python SDK
<!-- vale Datadog.headings = YES -->

Set the OpenAI Python SDK base URL to AI Gateway and use your Datadog token as the API key. This example uses the Responses API.

Install the SDK:

```shell
python -m pip install openai
```

Save the following as `gateway_example.py`:

```python
import os

from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DD_AI_GATEWAY_TOKEN"],
    base_url="https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1",
    default_headers={"x-dd-tag-ml_app": "my-application"},
)

response = client.responses.create(
    model=os.environ["DD_AI_GATEWAY_MODEL"],
    input="Reply with exactly: Gateway connected.",
)
print(response.output_text)
```

Run `python gateway_example.py` from the terminal where you set the token and model. See the [OpenAI Python SDK reference][18] for SDK options. Only the inference operations supported by AI Gateway and the selected target are available.

To stream the response over HTTP with server-sent events (SSE), replace the request and print statement with:

```python
stream = client.responses.create(
    model=os.environ["DD_AI_GATEWAY_MODEL"],
    input="Reply with exactly: Gateway connected.",
    stream=True,
)
for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
    elif event.type in {"error", "response.failed", "response.incomplete"}:
        raise RuntimeError(event)
print()
```

Handle stream failures as well as HTTP errors. Receiving an HTTP `200` does not guarantee that the stream completed successfully.

<!-- vale Datadog.headings = NO -->
## Configure the Anthropic Python SDK
<!-- vale Datadog.headings = YES -->

Install the SDK:

```shell
python -m pip install anthropic
```

Set `auth_token` to send your Datadog token as a bearer token. Use `/ai` as the base URL because the SDK appends `/v1/messages`:

```python
import os

from anthropic import Anthropic

client = Anthropic(
    auth_token=os.environ["DD_AI_GATEWAY_TOKEN"],
    base_url="https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai",
    default_headers={"x-dd-tag-ml_app": "my-application"},
)

message = client.messages.create(
    model=os.environ["DD_AI_GATEWAY_MODEL"],
    max_tokens=128,
    messages=[{"role": "user", "content": "Reply with exactly: Gateway connected."}],
)
for block in message.content:
    if block.type == "text":
        print(block.text)
```

Only inference operations supported by AI Gateway and the selected model are available. See the [Anthropic Python SDK documentation][21] for client options.

## Select a team

To attribute requests to a team you belong to, add `x-ai-gateway-team: <TEAM_SLUG>` to the client's request headers:

- **Claude Code:** Add a second line to `ANTHROPIC_CUSTOM_HEADERS`, keeping the existing application header.
- **Codex:** Add `"x-ai-gateway-team" = "<TEAM_SLUG>"` to the provider's `http_headers` map.
- **SDK:** Add `"x-ai-gateway-team": "<TEAM_SLUG>"` to `default_headers`.

Team selection affects matching [budgets][4], [rate limits][5], and [data capture][6]. It does not grant model access.

## Verify your application

1. In Claude Code or Codex, send `Reply with exactly: Gateway connected.` The SDK example sends the same prompt.
2. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][3] and select the time range containing the request.
3. Open the matching trace in Agent Observability. The examples set the application to `claude-code`, `codex`, or `my-application`. Confirm the caller, served model, and provider. For a routing rule, inspect the destination that served the request.

## Troubleshoot client connections

| Symptom | What to check |
|---|---|
| `401` or `403` | Check the Datadog site, token, `ai_gateway_usage` permission, and model access. For Claude Code, use `ANTHROPIC_AUTH_TOKEN` so the Datadog token is sent as a bearer token. |
| Unknown model or no eligible target | Use the full Gateway model identifier or routing-rule alias. Check the target's request format and the caller's access. For Claude Code, check model alias variables as well as the main model. |
| Incorrect request path | Use `/ai` for Claude Code and the Anthropic SDK, and `/ai/v1` for Codex and the OpenAI SDK. Do not append the request path to the base URL. |
| Codex returns `websocket_not_supported` | Set `supports_websockets = false` on the selected provider. |
| Codex uses generic model settings | Check that the model catalog is compatible with your Codex version and its `slug` matches the Gateway model identifier. Restart Codex after changing the catalog. |
| Client does not use the configured Gateway | Check the client's active settings and credential source. Shell exports apply to processes launched from that shell; a desktop app can require separate environment configuration. |

See [Gateway troubleshooting][7] for Gateway error codes.

[1]: /llm_observability/configure/ai_gateway/#get-started
[2]: /llm_observability/configure/ai_gateway/#authenticate-requests
[3]: https://app.datadoghq.com/llm/gateway
[4]: /llm_observability/configure/ai_gateway/#set-budgets
[5]: /llm_observability/configure/ai_gateway/#set-rate-limits
[6]: /llm_observability/configure/ai_gateway/#configure-data-capture
[7]: /llm_observability/configure/ai_gateway/#troubleshooting
[12]: /getting_started/site/
[16]: https://code.claude.com/docs/en/llm-gateway-connect
[17]: https://learn.chatgpt.com/docs/enterprise/connect-to-a-gateway
[18]: https://developers.openai.com/api/reference/python
[19]: https://code.claude.com/docs/en/model-config
[20]: https://learn.chatgpt.com/docs/enterprise/roll-out-a-gateway
[21]: https://platform.claude.com/docs/en/cli-sdks-libraries/overview
