---
title: Connect Applications to AI Gateway
description: Connect Claude Code, Codex, and Python SDKs to Datadog AI Gateway, attribute requests to applications and teams, and verify traffic.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Connect a coding agent or SDK to AI Gateway with a Datadog credential and an approved model identifier. These examples connect organization-funded applications using provider credentials configured by your administrator.

Before you begin:

- Complete [Get started][applications-1], or ask your administrator for access to a configured model or routing rule.
- Have a [personal access token or service access token][applications-2] whose principal and scope allow `ai_gateway_usage`.
- Review the [data capture setting][applications-6] before sending sensitive content.
- Choose `<PROVIDER_SLUG>/<MODEL_ID>` for a specific provider model, or `router/<RULE_SLUG>` for a routing rule. The target must support the client's request format, either natively or through API translation. Translation supports a subset of each API; available client features depend on the target.

## Authenticate requests

AI Gateway accepts the following Datadog credentials. The user or service account and the credential scope must allow `ai_gateway_usage`.

| Credential | Request headers |
|---|---|
| [Personal access token][4] | `Authorization: Bearer <PERSONAL_ACCESS_TOKEN>` |
| [Service access token (SAT)][5] | `Authorization: Bearer <SERVICE_ACCESS_TOKEN>` |

For service workloads, use a service access token. Store credentials in your application's secret manager and keep them out of source control and logs.

The following shell examples use Bash or Zsh. Load your Datadog token from your secret manager into `DD_AI_GATEWAY_TOKEN`, then set the model identifier:

```shell
export DD_AI_GATEWAY_MODEL="<PROVIDER_SLUG>/<MODEL_ID>"
```

Use the base URL for your [Datadog site][applications-12]. The paths differ because each client appends its API path:

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
unset ANTHROPIC_API_KEY
unset CLAUDE_CODE_USE_BEDROCK CLAUDE_CODE_USE_VERTEX CLAUDE_CODE_USE_FOUNDRY CLAUDE_CODE_USE_ANTHROPIC_AWS
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

This example maps the model aliases to one approved target for the connection test. To use different models for those aliases, set each variable to an approved Gateway model or routing rule. See [Claude Code model configuration][applications-19].

The example clears the API key and cloud-provider selectors in this terminal to use the Messages endpoint with Gateway credentials. Run `/status` and confirm the Gateway base URL and `ANTHROPIC_AUTH_TOKEN` credential source. Managed settings can override local configuration. For other client surfaces and persistent configuration, see [Claude Code gateway configuration][applications-16]. Keep tokens out of shared project settings.

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

Gateway model IDs and `router/<RULE_SLUG>` identifiers might not match Codex's model catalog. For an identifier Codex does not recognize, supply a matching catalog entry with model instructions, context limits, and tool capabilities. This avoids generic model settings. If your administrator supplies a local catalog, add its absolute path before the first TOML table:

```toml
model_catalog_json = "<ABSOLUTE_PATH_TO_CODEX_MODEL_CATALOG>"
```

The catalog entry's `slug` must match `model`. A Gateway model-listing response is not a Codex model catalog. See [Codex model catalog configuration][applications-20].

Web search is disabled for the connection test. Enable additional client features after checking compatibility with the selected target. For desktop environment variables and configuration options, see [Codex gateway configuration][applications-17].

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

Run `python gateway_example.py` from the terminal where you set the token and model. See the [OpenAI Python SDK reference][applications-18] for SDK options. Only the inference operations supported by AI Gateway and the selected target are available.

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

Set `auth_token` to send your Datadog token as a bearer token. Use `/ai` as the base URL because the SDK appends `/v1/messages`. Save the following as `anthropic_example.py`:

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

Run `python anthropic_example.py` from the terminal where you set the token and model. Only inference operations supported by AI Gateway and the selected model are available. See the [Anthropic Python SDK documentation][applications-21] for client options.

## Attribute requests to an application

By default, Gateway traces appear under the `datadog-ai-gateway` application. To change the application name, send the `x-dd-tag-ml_app: <VALUE>` request header.

[Verify the request](/ai_gateway/getting_started/#verify-the-request) in Agent Observability. The recorded content depends on the effective [data capture setting](/ai_gateway/security/#configure-data-capture).

## Select a team

To attribute requests to a team you belong to, add `x-ai-gateway-team: <TEAM_SLUG>` to the client's request headers:

- **Claude Code:** Set both headers on separate lines: `export ANTHROPIC_CUSTOM_HEADERS=$'x-dd-tag-ml_app: claude-code\nx-ai-gateway-team: <TEAM_SLUG>'`.
- **Codex:** Add `"x-ai-gateway-team" = "<TEAM_SLUG>"` to the provider's `http_headers` map.
- **SDK:** Add `"x-ai-gateway-team": "<TEAM_SLUG>"` to `default_headers`.

Team selection affects matching [budgets][applications-4], [rate limits][applications-5], and [data capture][applications-6]. It does not grant model access.

## Verify your application

1. In Claude Code or Codex, send `Reply with exactly: Gateway connected.` The SDK examples send the same prompt. Look for `Gateway connected.` in a successful response.
2. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][applications-3] and select the time range containing the request.
3. Follow the {{< ui >}}Traces{{< /ui >}} link to open the request in Agent Observability. The examples set the application to `claude-code`, `codex`, or `my-application`.
4. Confirm the caller, served model, and provider. For a routing rule, confirm the destination that served the request.

## Troubleshoot client connections

| Symptom | What to check |
|---|---|
| `401` or `403` | Check the Datadog site, token, `ai_gateway_usage` permission, and model access. For Claude Code, use `ANTHROPIC_AUTH_TOKEN` so the Datadog token is sent as a bearer token. |
| Unknown model or no eligible target | Use the full `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>` identifier. Check the target's request format and the caller's access. For Claude Code, check model alias variables as well as the main model. |
| Incorrect request path | Use `/ai` for Claude Code and the Anthropic SDK, and `/ai/v1` for Codex and the OpenAI SDK. Do not append the request path to the base URL. |
| Codex returns `websocket_not_supported` | Set `supports_websockets = false` on the selected provider. |
| Codex uses generic model settings | Check that the model catalog is compatible with your Codex version and its `slug` matches the Gateway model identifier. Restart Codex after changing the catalog. |
| Claude Code reports an authentication conflict | Run `/logout` to clear the saved Claude account login, then restart with the Gateway environment variables. |
| Client does not use the configured Gateway | Check the client's active settings and credential source. Shell exports apply to processes launched from that shell; a desktop app can require separate environment configuration. |

See [Gateway troubleshooting][applications-7] for Gateway error codes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: /account_management/personal-access-tokens/
[5]: /account_management/service-access-tokens/
[12]: /getting_started/site/
[applications-1]: /ai_gateway/getting_started/
[applications-2]: /ai_gateway/applications/#authenticate-requests
[applications-3]: https://app.datadoghq.com/llm/gateway
[applications-4]: /ai_gateway/spend_controls/#set-budgets
[applications-5]: /ai_gateway/spend_controls/#set-rate-limits
[applications-6]: /ai_gateway/security/#configure-data-capture
[applications-7]: /ai_gateway/troubleshooting/
[applications-12]: /getting_started/site/
[applications-16]: https://code.claude.com/docs/en/llm-gateway-connect
[applications-17]: https://learn.chatgpt.com/docs/enterprise/connect-to-a-gateway
[applications-18]: https://developers.openai.com/api/reference/python
[applications-19]: https://code.claude.com/docs/en/model-config
[applications-20]: https://learn.chatgpt.com/docs/enterprise/roll-out-a-gateway
[applications-21]: https://platform.claude.com/docs/en/cli-sdks-libraries/overview
