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
- Have a [personal access token, service access token, or Workload Identity Federation token][applications-2] whose principal and scope allow `ai_gateway_usage`.
- Review the [data capture setting][applications-6] before sending sensitive content.
- Choose `<PROVIDER_SLUG>/<MODEL_ID>` for a specific provider model, or `router/<RULE_SLUG>` for a routing rule. The target must support the client's request format, either natively or through API translation. Translation supports a subset of each API; available client features depend on the target.

## Authenticate requests

AI Gateway accepts the following Datadog credentials. The user or service account and the credential scope must allow `ai_gateway_usage`.

| Credential | Request headers |
|---|---|
| [Personal access token][4] | `Authorization: Bearer <PERSONAL_ACCESS_TOKEN>` |
| [Personal access token][4], for coding agents signed in with a [subscription](/ai_gateway/providers/#use-subscription-providers) | `dd-application-key: <PERSONAL_ACCESS_TOKEN>` |
| [Service access token (SAT)][5] | `Authorization: Bearer <SERVICE_ACCESS_TOKEN>` |
| [Workload Identity Federation][applications-22] token | `Authorization: Bearer <WIF_TOKEN>` |

Coding agents signed in with a subscription send two headers:

- `Authorization`: The subscription credential, which AI Gateway passes through to the subscription vendor.
- `dd-application-key`: Your Datadog personal access token, which AI Gateway uses to authenticate you.

Despite its name, `dd-application-key` takes a personal access token, not an application key.

For service workloads, use a service access token. For workloads running in AWS, you can [authenticate with Workload Identity Federation](#authenticate-aws-workloads-with-workload-identity-federation) instead, with no Datadog secret to store or rotate. Store credentials in your application's secret manager and keep them out of source control and logs.

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

For the Claude Code CLI, merge the following settings into your Claude Code user settings file, `~/.claude/settings.json`. If the file already has an `env` block, add these keys to it. Do not add these settings to a project settings file that you commit to source control. Replace `<PERSONAL_ACCESS_TOKEN>` with your Datadog [personal access token][4] and `<PROVIDER_SLUG>/<MODEL_ID>` with the model identifier you selected earlier.

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai",
    "ANTHROPIC_AUTH_TOKEN": "<PERSONAL_ACCESS_TOKEN>",
    "ANTHROPIC_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_CUSTOM_MODEL_OPTION": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_DEFAULT_FABLE_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_CUSTOM_HEADERS": "x-dd-tag-ml_app: claude-code",
    "CLAUDE_CODE_USE_BEDROCK": "0",
    "CLAUDE_CODE_USE_VERTEX": "0",
    "CLAUDE_CODE_USE_FOUNDRY": "0",
    "CLAUDE_CODE_USE_ANTHROPIC_AWS": "0"
  }
}
```

This example maps the model aliases to one approved target for the connection test. To use different models for those aliases, set each variable to an approved AI Gateway model or routing rule. See [Claude Code model configuration][applications-19].

Setting each `CLAUDE_CODE_USE_*` variable to `"0"` prevents cloud-provider selectors in your shell from routing requests away from AI Gateway.

Start `claude`, run `/status`, and confirm the AI Gateway base URL and `ANTHROPIC_AUTH_TOKEN` credential source. Managed settings can override local configuration. For other client surfaces, see [Claude Code gateway configuration][applications-16].

<!-- vale Datadog.headings = NO -->
## Configure Codex
<!-- vale Datadog.headings = YES -->

In the following settings, replace the model placeholder with the identifier you selected earlier. Keep the top-level settings before the first TOML table, and update existing keys instead of adding duplicate definitions. Merge the settings into `~/.codex/config.toml`:

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

AI Gateway model IDs and `router/<RULE_SLUG>` identifiers might not match Codex's model catalog. For an identifier Codex does not recognize, supply a matching catalog entry with model instructions, context limits, and tool capabilities. This avoids generic model settings. If your administrator supplies a local catalog, add its absolute path before the first TOML table:

```toml
model_catalog_json = "<ABSOLUTE_PATH_TO_CODEX_MODEL_CATALOG>"
```

The catalog entry's `slug` must match `model`. An AI Gateway model-listing response is not a Codex model catalog. See [Codex model catalog configuration][applications-20].

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

<!-- vale Datadog.headings = NO -->
## Authenticate AWS workloads with Workload Identity Federation
<!-- vale Datadog.headings = YES -->

With [Workload Identity Federation][applications-22] (WIF), an application running in AWS exchanges its AWS role for a short-lived Datadog token. It sends that token to AI Gateway as `Authorization: Bearer <WIF_TOKEN>`. You don't create, store, or rotate a Datadog credential for the application.

### Map the AWS role to a service account

1. Connect the application's AWS account to Datadog with the [AWS integration][applications-23].
2. [Create a service account][applications-24] for the application, and give it a role that allows `ai_gateway_usage`. A service account for each application lets you attribute usage to each one and give each its own [model access][applications-25] and [budgets][applications-4].
3. From the application's environment, find its assumed-role ARN:

   ```shell
   aws sts get-caller-identity --query Arn --output text
   ```

   The ARN has the form `arn:aws:sts::<ACCOUNT_ID>:assumed-role/<ROLE_NAME>/<SESSION_NAME>`. Use this assumed-role ARN, not the IAM role ARN (`arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>`).
4. Go to **Organization Settings > Workload Identity Federation > Identity Mappings** and click **New Mapping**. Select **AWS**, enter `arn:aws:sts::<ACCOUNT_ID>:assumed-role/<ROLE_NAME>/*` as the source pattern, and select the service account as the target identity. The `*` matches any session name, which Amazon ECS and Amazon EKS generate.
5. Copy your organization UUID from the **Workload Identity Federation** page.

Creating mappings requires the `workload_identity_federation_config_write` permission. For the full setup, see [Workload Identity Federation][applications-22].

### Get a token in your application

The Datadog API clients for Python and Go perform the token exchange. The application's AWS role needs no additional AWS permissions. Each example reuses the token until shortly before it expires and then requests a new one.

{{< tabs >}}
{{% tab "Python" %}}

Install the packages:

```shell
python -m pip install datadog-api-client boto3 openai anthropic
```

Save the following as `datadog_wif.py`. The Datadog API client reads AWS credentials from environment variables only. `BotoAWSAuth` passes it the credentials that boto3 finds instead, including EC2 instance profiles, Amazon ECS task roles, and Amazon EKS service account roles:

```python
import threading
from datetime import datetime, timedelta

import boto3
from datadog_api_client import Configuration
from datadog_api_client.aws import PROVIDER_AWS, AWSAuth, AWSCredentials
from datadog_api_client.delegated_auth import DelegatedTokenConfig


class BotoAWSAuth(AWSAuth):
    """Signs the token exchange with the AWS credentials that boto3 finds."""

    def __init__(self, session=None, aws_region=None):
        super().__init__(aws_region=aws_region)
        self._session = session or boto3.Session()

    def get_credentials(self) -> AWSCredentials:
        creds = self._session.get_credentials().get_frozen_credentials()
        return AWSCredentials(creds.access_key, creds.secret_key, creds.token)


class DatadogToken:
    """Holds a short-lived Datadog token and refreshes it before it expires."""

    def __init__(self, org_uuid: str, site: str, refresh_margin=timedelta(minutes=2)):
        self._api_config = Configuration(host=f"https://api.{site}")
        self._auth = BotoAWSAuth()
        self._config = DelegatedTokenConfig(org_uuid, PROVIDER_AWS, self._auth)
        self._margin = refresh_margin
        self._creds = None
        self._lock = threading.Lock()

    def get(self) -> str:
        with self._lock:
            if self._creds is None or datetime.now() >= self._creds.expiration - self._margin:
                self._creds = self._auth.authenticate(self._config, self._api_config)
            return self._creds.delegated_token
```

Pass a current token on each request with `with_options`. With the OpenAI Python SDK:

```python
import os

from openai import OpenAI

from datadog_wif import DatadogToken

site = os.environ["DD_SITE"]
token = DatadogToken(org_uuid=os.environ["DD_ORG_UUID"], site=site)

client = OpenAI(
    api_key="unused",  # replaced with a Datadog token on each request
    base_url=f"https://ai-gateway.{site}/ai/v1",
)

response = client.with_options(api_key=token.get()).responses.create(
    model=os.environ["DD_AI_GATEWAY_MODEL"],
    input="Reply with exactly: Gateway connected.",
)
print(response.output_text)
```

With the Anthropic Python SDK:

```python
import os

from anthropic import Anthropic

from datadog_wif import DatadogToken

site = os.environ["DD_SITE"]
token = DatadogToken(org_uuid=os.environ["DD_ORG_UUID"], site=site)

client = Anthropic(
    auth_token="unused",  # replaced with a Datadog token on each request
    base_url=f"https://ai-gateway.{site}/ai",
)

message = client.with_options(auth_token=token.get()).messages.create(
    model=os.environ["DD_AI_GATEWAY_MODEL"],
    max_tokens=128,
    messages=[{"role": "user", "content": "Reply with exactly: Gateway connected."}],
)
for block in message.content:
    if block.type == "text":
        print(block.text)
```

{{% /tab %}}
{{% tab "Go" %}}

Add the modules:

```shell
go get github.com/DataDog/datadog-api-client-go/v2 github.com/aws/aws-sdk-go-v2/config
```

The Datadog API client reads AWS credentials from the request context. `DatadogToken` passes it the credentials that the AWS SDK finds, including EC2 instance profiles, Amazon ECS task roles, and Amazon EKS service account roles:

```go
package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"sync"
	"time"

	datadog "github.com/DataDog/datadog-api-client-go/v2/api/datadog"
	"github.com/aws/aws-sdk-go-v2/config"
)

// DatadogToken holds a short-lived Datadog token and refreshes it before it expires.
type DatadogToken struct {
	Site    string
	OrgUUID string

	mu      sync.Mutex
	token   string
	expires time.Time
}

func (t *DatadogToken) Get(ctx context.Context) (string, error) {
	t.mu.Lock()
	defer t.mu.Unlock()
	if t.token != "" && time.Until(t.expires) > 2*time.Minute {
		return t.token, nil
	}
	awsCfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return "", err
	}
	creds, err := awsCfg.Credentials.Retrieve(ctx)
	if err != nil {
		return "", err
	}
	ctx = context.WithValue(ctx, datadog.ContextServerVariables, map[string]string{"site": t.Site})
	ctx = context.WithValue(ctx, datadog.ContextAWSVariables, map[string]string{
		datadog.AWSAccessKeyIdName:     creds.AccessKeyID,
		datadog.AWSSecretAccessKeyName: creds.SecretAccessKey,
		datadog.AWSSessionTokenName:    creds.SessionToken,
	})
	cfg := &datadog.DelegatedTokenConfig{
		OrgUUID:      t.OrgUUID,
		Provider:     datadog.ProviderAWS,
		ProviderAuth: &datadog.AWSAuth{},
	}
	res, err := cfg.ProviderAuth.Authenticate(ctx, cfg)
	if err != nil {
		return "", err
	}
	t.token, t.expires = res.DelegatedToken, res.Expiration
	return t.token, nil
}

func main() {
	ctx := context.Background()
	site := os.Getenv("DD_SITE")
	token := &DatadogToken{Site: site, OrgUUID: os.Getenv("DD_ORG_UUID")}

	bearer, err := token.Get(ctx)
	if err != nil {
		fmt.Fprintln(os.Stderr, "get Datadog token:", err)
		os.Exit(1)
	}

	body, _ := json.Marshal(map[string]any{
		"model": os.Getenv("DD_AI_GATEWAY_MODEL"),
		"input": "Reply with exactly: Gateway connected.",
	})
	req, _ := http.NewRequestWithContext(ctx, http.MethodPost,
		"https://ai-gateway."+site+"/ai/v1/responses", bytes.NewReader(body))
	req.Header.Set("Authorization", "Bearer "+bearer)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Fprintln(os.Stderr, "call AI Gateway:", err)
		os.Exit(1)
	}
	defer resp.Body.Close()
	out, _ := io.ReadAll(resp.Body)
	fmt.Println(resp.Status, string(out))
}
```

{{% /tab %}}
{{< /tabs >}}

Set `DD_SITE` to your Datadog site ({{< region-param key="dd_site" code="true" >}}), `DD_ORG_UUID` to your organization UUID, and `DD_AI_GATEWAY_MODEL` to the model identifier. Then run the example in an environment that has the AWS role.

If the token exchange returns `401`, no mapping matches the application's role. Check that the source pattern uses the assumed-role ARN, and that the AWS account is connected through the AWS integration. If AI Gateway returns `403`, check that the service account allows `ai_gateway_usage` and has access to the model.

## Attribute requests to an application

By default, AI Gateway traces appear under the `datadog-ai-gateway` application. To change the application name, send the `x-dd-tag-ml_app: <VALUE>` request header. Use lowercase letters, digits, hyphens, and underscores in the value, because Agent Observability stores the name in lowercase and replaces spaces and most symbols with underscores.

An application that propagates its Agent Observability trace context to AI Gateway is an exception to the default: without the header, the AI Gateway span uses that application's name.

The application name can also define who can read captured prompts and responses. See [Restrict who can view captured content](/ai_gateway/security/#restrict-who-can-view-captured-content).

[Verify the request](/ai_gateway/getting_started/#verify-the-request) in Agent Observability. The recorded content depends on the effective [data capture setting](/ai_gateway/security/#configure-data-capture).

## Select a team

To attribute requests to a team you belong to, add `x-ai-gateway-team: <TEAM_SLUG>` to the client's request headers:

- **Claude Code:** In `~/.claude/settings.json`, separate the two headers with `\n`: `"ANTHROPIC_CUSTOM_HEADERS": "x-dd-tag-ml_app: claude-code\nx-ai-gateway-team: <TEAM_SLUG>"`.
- **Codex:** Add `"x-ai-gateway-team" = "<TEAM_SLUG>"` to the provider's `http_headers` map.
- **SDK:** Add `"x-ai-gateway-team": "<TEAM_SLUG>"` to `default_headers`.

Team selection affects matching [budgets][applications-4], [rate limits][applications-5], and [data capture][applications-6]. It does not grant model access.

## Verify your application

1. In Claude Code or Codex, send `Reply with exactly: Gateway connected.` The SDK examples send the same prompt. Look for `Gateway connected.` in a successful response.
2. Open [Agent Observability traces][applications-traces] and select the time range containing the request.
3. Filter by the application name. The examples set the application to `claude-code`, `codex`, or `my-application`.
4. Confirm the caller, served model, and provider. For a routing rule, confirm the destination that served the request.

## Troubleshoot client connections

| Symptom | What to check |
|---|---|
| A request returns HTTP `401` or `403` | Check the Datadog site, token, `ai_gateway_usage` permission, and model access. For Claude Code, use `ANTHROPIC_AUTH_TOKEN` so the Datadog token is sent as a bearer token. |
| Unknown model or no eligible target | Use the full `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>` identifier. Check the target's request format and the caller's access. For Claude Code, check the model alias settings as well as `ANTHROPIC_MODEL`. |
| Incorrect request path | Use `/ai` for Claude Code and the Anthropic SDK, and `/ai/v1` for Codex and the OpenAI SDK. Do not append the request path to the base URL. |
| Codex returns `websocket_not_supported` | Set `supports_websockets = false` on the selected provider. |
| Codex uses generic model settings | Check that the model catalog is compatible with your Codex version and its `slug` matches the AI Gateway model identifier. Restart Codex after changing the catalog. |
| Claude Code reports an authentication conflict | Run `/logout` to clear the saved Claude account login, then restart Claude Code. |
| Claude Code stops responding, then shows `Failed to authenticate. API Error: 401 {"errors":["Unauthorized"]}` | Claude Code retries a `401` from AI Gateway for about 3 minutes before it shows the error. Check that `ANTHROPIC_AUTH_TOKEN` is valid and not expired. |
| Claude Code shows `Failed to authenticate` after you set `x-ai-gateway-team` | AI Gateway returns a `403` error with the message `you are not authorized to use the selected Datadog Team`. Check that the team slug is correct and that you belong to the team. |
| Client does not use the configured AI Gateway | Check the client's active settings and credential source. Shell exports apply to processes launched from that shell; a desktop app can require separate environment configuration. |

See [AI Gateway troubleshooting][applications-7] for AI Gateway error codes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: /account_management/personal-access-tokens/
[5]: /account_management/service-access-tokens/
[12]: /getting_started/site/
[applications-1]: /ai_gateway/getting_started/
[applications-2]: /ai_gateway/applications/#authenticate-requests
[applications-traces]: https://app.datadoghq.com/llm/traces
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
[applications-22]: /account_management/workload_identity_federation/
[applications-23]: /integrations/amazon_web_services/
[applications-24]: /account_management/org_settings/service_accounts/
[applications-25]: /ai_gateway/access_control/
