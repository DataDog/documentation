---
title: Connect Applications to AI Gateway
description: Connect Claude Code and Codex to Datadog AI Gateway with Trajectory, configure other clients and Python SDKs, attribute requests to applications and teams, and verify traffic.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/integrations/trajectory/"
    tag: "Documentation"
    text: "Trajectory"
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
AI Gateway is in Preview.
{{< /callout >}}

Connect coding agents and your own applications to AI Gateway. For Claude Code and Codex, use [Trajectory](#connect-claude-code-and-codex-with-trajectory): it configures the agent and signs you in to Datadog, with no access token to manage. For other clients, and for applications built with an SDK, see [Configure clients manually](#configure-clients-manually) and [Connect applications with SDKs](#connect-applications-with-sdks).

Before you begin, complete [Get started][applications-1], or ask your administrator for access to a configured model or routing rule. Review the [data capture setting][applications-6] before sending sensitive content.

## Connect Claude Code and Codex with Trajectory

[Trajectory][applications-26], Datadog's open source CLI for coding agents, is the recommended way to connect Claude Code and Codex to AI Gateway. It configures each agent to use AI Gateway, lists your AI Gateway models in the agent's `/model` picker, and signs you in to Datadog in the browser.

### Before you start

- Install the coding agents you want to connect: Claude Code 2.1.83 or later, or Codex 0.128.0 or later. Trajectory sets up only the agents it finds on your computer.
- Use macOS, Linux, or Windows Subsystem for Linux (WSL). Native Windows support is coming soon.
- Your Datadog site must be US1, US3, US5, EU, AP1, AP2, or UK1.

### Set up Trajectory for AI Gateway

1. Run the installer. It installs or updates Trajectory, installs Pup (the Datadog CLI that Trajectory uses to sign you in) if it's missing, and turns on AI Gateway for the coding agents you pick in its setup wizard. The installer asks for your Datadog site and an API key. The API key is optional: without one, Trajectory keeps its session data on your computer. AI Gateway routing works either way.

   ```shell
   dir="$(mktemp -d)" &&
   curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh -o "$dir/install.sh" &&
   bash "$dir/install.sh" --plugin ai-gateway &&
   export PATH="$HOME/.trajectory/bin:$PATH"
   ```

2. Check that AI Gateway is ready:

   ```shell
   trajectory plugins ai-gateway status
   ```

3. Start the agent through Trajectory with `trajectory claude` or `trajectory codex`. The agent's `/model` picker lists the models and routing rules you can use through AI Gateway. To send requests on behalf of a team you belong to, see [Select a team](#select-a-team).
4. Optional: Run `trajectory gateway-ui` to open the AI Gateway dashboard with your models, routing rules, and budgets.

AI Gateway signs you in to the site you pass with `--site`, or else the site of your existing Pup sign-in, or else US1. It does not use the site you choose in the installer's wizard. If AI Gateway signed you in to the wrong site, run `trajectory plugins ai-gateway login --site <SITE>`, for example `--site us3.datadoghq.com`.

If you install another agent later, run `trajectory plugins ai-gateway setup --clients <CLIENT>`. To stop routing an agent through AI Gateway, run `trajectory plugins ai-gateway disable --clients <CLIENT>`.

A request that fails through AI Gateway is not retried with the agent's own provider credentials.

### Roll out Trajectory to your organization

To connect a team or a whole organization, deploy Trajectory to developer computers with your MDM product, such as Jamf Pro or Microsoft Intune, instead of asking each developer to install it. See [Roll out Trajectory with MDM][applications-27]. On macOS, the deployment can also install launcher wrappers, so that ordinary `claude` and `codex` commands start through Trajectory. To limit which provider accounts appear in the agents' `/model` pickers, administrators can set `provider_slugs` for the `frontier-ai-gateway` module in the deployment profile.

## Configure clients manually

Configure a client yourself when Trajectory doesn't support it, when you can't install Trajectory, or when you need settings it doesn't manage. Each client needs a Datadog credential, the base URL for your Datadog site, and any request headers you use. [Send Requests](/ai_gateway/requests/) describes each of them: [Authenticate requests](/ai_gateway/requests/#authenticate-requests), [Base URL](/ai_gateway/requests/#base-url), and [Request headers](/ai_gateway/requests/#request-headers).

Request a model with `<PROVIDER_SLUG>/<MODEL_ID>` for a specific provider model, or `router/<RULE_SLUG>` for a routing rule. The target must support the client's request format, either natively or through API translation. [Translation](/ai_gateway/requests/#api-translation) supports a subset of each API; available client features depend on the target.

### Set up your shell

The following shell examples use Bash or Zsh. Load your Datadog token from your secret manager into `DD_AI_GATEWAY_TOKEN`, then set the model identifier:

```shell
export DD_AI_GATEWAY_MODEL="<PROVIDER_SLUG>/<MODEL_ID>"
```

<!-- vale Datadog.headings = NO -->
### Claude Code
<!-- vale Datadog.headings = YES -->

Trajectory sets all of this for you. Configure Claude Code by hand only when you can't use [Trajectory](#connect-claude-code-and-codex-with-trajectory).

To connect Claude Code for every session, add the AI Gateway settings to the `env` block of your user settings file, `~/.claude/settings.json`. Create the file if needed, and keep the other keys in an existing `env` block:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai",
    "ANTHROPIC_AUTH_TOKEN": "<DATADOG_ACCESS_TOKEN>",
    "ANTHROPIC_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_DEFAULT_FABLE_MODEL": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_CUSTOM_MODEL_OPTION": "<PROVIDER_SLUG>/<MODEL_ID>",
    "ANTHROPIC_CUSTOM_HEADERS": "x-dd-tag-ml_app: claude-code"
  }
}
```

Set each model variable to an approved AI Gateway model or routing rule. Claude Code uses the Sonnet, Opus, Haiku, and Fable aliases for subagents and background tasks, so a request through an unmapped alias reaches AI Gateway without a provider prefix and fails with `model_not_found`. `ANTHROPIC_CUSTOM_MODEL_OPTION` adds the model to the `/model` picker. This file holds your token, so keep it out of shared project settings and source control. Make sure `ANTHROPIC_API_KEY` isn't set in your shell, because Claude Code can use it instead of the AI Gateway token.

To try AI Gateway in one terminal instead, export the settings and start Claude Code:

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

This example maps the model aliases to one approved target for the connection test. To use different models for those aliases, set each variable to an approved AI Gateway model or routing rule. See [Claude Code model configuration][applications-19].

The example clears the API key and cloud-provider selectors in this terminal to use the Messages endpoint with AI Gateway credentials. Run `/status` and confirm the AI Gateway base URL and `ANTHROPIC_AUTH_TOKEN` credential source. Managed settings can override local configuration. For other client surfaces and persistent configuration, see [Claude Code gateway configuration][applications-16]. Keep tokens out of shared project settings.

To stop using AI Gateway, remove the settings from `~/.claude/settings.json`.

<!-- vale Datadog.headings = NO -->
### Codex
<!-- vale Datadog.headings = YES -->

Trajectory sets all of this for you, including the model catalog that Codex needs for AI Gateway models. Configure Codex by hand only when you can't use [Trajectory](#connect-claude-code-and-codex-with-trajectory).

In the following settings, replace the model placeholder with the identifier you selected earlier. Keep the top-level settings before the first TOML table, and update existing keys instead of adding duplicate definitions. Merge the settings into `~/.codex/config.toml`:

```toml
model = "<PROVIDER_SLUG>/<MODEL_ID>"
model_provider = "datadog"

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

By default, Codex adds a hosted `web_search` tool to each Responses request. OpenAI providers run the search, and API translation passes it to Anthropic providers as Anthropic's web search. For other providers, AI Gateway drops the tool and returns a `web_search_omitted` warning, and the model answers without searching. See [API translation](/ai_gateway/requests/#api-translation). To remove the tool from the model's tools altogether, add `web_search = "disabled"` before the first TOML table.

For OpenAI models, Codex can instead send its searches to AI Gateway's standalone search endpoint. Add `supports_standalone_web_search = true` to the provider, and set `standalone_web_search = true` under `[features]`. Turn it on only when you use OpenAI models: Codex then stops sending the `web_search` tool, and AI Gateway doesn't send standalone searches to other providers. Codex marks standalone search as under development.

To use AI Gateway only when you ask for it, put the provider in a profile instead of the top-level `model_provider`, and start Codex with `codex --profile <PROFILE>`. See [Codex configuration profiles][applications-28]. For desktop environment variables and configuration options, see [Codex gateway configuration][applications-17].

### Other coding agents

Any coding agent that lets you set a base URL and request headers can connect to AI Gateway. Use the [base URL](/ai_gateway/requests/#base-url) for the API format the agent speaks, send your Datadog credential as a bearer token, and add the [request headers](/ai_gateway/requests/#request-headers) you need. Check which session header the agent sends in [Session signals](/ai_gateway/routing/#session-signals). If it sends none, set `x-session-id` to a value that is unique to each conversation.

## Connect applications with SDKs

Use an SDK to call AI Gateway from your own applications. For service workloads, use a service access token, or [Workload Identity Federation](#authenticate-aws-workloads-with-workload-identity-federation) in AWS.

<!-- vale Datadog.headings = NO -->
### OpenAI Python SDK
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
### Anthropic Python SDK
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

- **Trajectory:** Add `--gateway-team <TEAM_SLUG>` when you start the agent, for example `trajectory claude --gateway-team <TEAM_SLUG>`. Trajectory also keeps a team and `x-dd-tag-*` tags that you set in the agent's own header settings.
- **Claude Code:** Set both headers on separate lines: `export ANTHROPIC_CUSTOM_HEADERS=$'x-dd-tag-ml_app: claude-code\nx-ai-gateway-team: <TEAM_SLUG>'`.
- **Codex:** Add `"x-ai-gateway-team" = "<TEAM_SLUG>"` to the provider's `http_headers` map.
- **SDK:** Add `"x-ai-gateway-team": "<TEAM_SLUG>"` to `default_headers`.

Team selection affects matching [budgets][applications-4], [rate limits][applications-5], and [data capture][applications-6]. It does not grant model access.

If you don't select a team, a request matches the budgets and rate limits of every team you directly belong to, and its full cost counts against each of them.

## Verify your application

1. In Claude Code or Codex, started directly or through Trajectory, send `Reply with exactly: Gateway connected.` The SDK examples send the same prompt. Look for `Gateway connected.` in a successful response.
2. Open [Agent Observability traces][applications-traces] and select the time range containing the request.
3. Filter by the application name. The examples set the application to `claude-code`, `codex`, or `my-application`.
4. Confirm the caller, served model, and provider. For a routing rule, confirm the destination that served the request.

## Troubleshoot client connections

| Symptom | What to check |
|---|---|
| Trajectory doesn't route an agent through AI Gateway | Run `trajectory plugins ai-gateway status`. Check that the agent was picked during setup and that you started it with `trajectory claude` or `trajectory codex`. |
| Trajectory reports that you aren't signed in | Run `trajectory plugins ai-gateway login`. |
| Trajectory setup or launch fails for another reason | Run `trajectory plugins ai-gateway doctor` and follow its findings. |
| A request returns HTTP `401` or `403` | Check the Datadog site, token, `ai_gateway_usage` permission, and model access. For Claude Code, use `ANTHROPIC_AUTH_TOKEN` so the Datadog token is sent as a bearer token. |
| Unknown model or no eligible target | Use the full `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>` identifier. Check the target's request format and the caller's access. For Claude Code, check model alias variables as well as the main model. |
| Incorrect request path | Use `/ai` for Claude Code and the Anthropic SDK, and `/ai/v1` for Codex and the OpenAI SDK. Do not append the request path to the base URL. |
| Codex returns `websocket_not_supported` | Set `supports_websockets = false` on the selected provider. |
| Codex uses generic model settings | Check that the model catalog is compatible with your Codex version and its `slug` matches the AI Gateway model identifier. Restart Codex after changing the catalog. |
| Claude Code reports an authentication conflict | Run `/logout` to clear the saved Claude account login, then restart with the AI Gateway environment variables. |
| Client does not use the configured AI Gateway | Check the client's active settings and credential source. Shell exports apply to processes launched from that shell; a desktop app can require separate environment configuration. |

See [AI Gateway troubleshooting][applications-7] for AI Gateway error codes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[applications-1]: /ai_gateway/getting_started/
[applications-traces]: https://app.datadoghq.com/llm/traces
[applications-4]: /ai_gateway/spend_controls/#set-budgets
[applications-5]: /ai_gateway/spend_controls/#set-rate-limits
[applications-6]: /ai_gateway/security/#configure-data-capture
[applications-7]: /ai_gateway/troubleshooting/
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
[applications-26]: /integrations/trajectory/
[applications-27]: /integrations/trajectory/#step-2-roll-out-trajectory-with-mdm
[applications-28]: https://developers.openai.com/codex/config-advanced#profiles
