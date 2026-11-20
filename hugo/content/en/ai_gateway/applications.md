---
title: Connect Applications to AI Gateway
description: Authenticate application requests to AI Gateway with Datadog personal access tokens or service access tokens.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Configure your application to send inference requests to the AI Gateway endpoint for your [Datadog site][12]. Use Datadog credentials to authenticate the caller.

## Authenticate requests

AI Gateway accepts the following Datadog credentials. The user or service account and the credential scope must allow `ai_gateway_usage`.

| Credential | Request headers |
|---|---|
| [Personal access token][4] | `Authorization: Bearer <PERSONAL_ACCESS_TOKEN>` |
| [Service access token (SAT)][5] | `Authorization: Bearer <SERVICE_ACCESS_TOKEN>` |

For service workloads, use a service access token. Store credentials in your application's secret manager and keep them out of source control and logs.

## Configure your client

Use this base URL:

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1
```

Select a [supported request format](/ai_gateway/requests/#supported-request-formats) and pass a provider model or routing rule in the `model` field. For a complete request example, see [Send a request](/ai_gateway/getting_started/#send-a-request).

## Attribute requests to an application

By default, Gateway traces appear under the `datadog-ai-gateway` application. To change the application name, send the `x-dd-tag-ml_app: <VALUE>` request header.

The application name can also define who can read captured prompts and responses. See [Restrict who can view captured content](/ai_gateway/security/#restrict-who-can-view-captured-content).

[Verify the request](/ai_gateway/getting_started/#verify-the-request) in Agent Observability. The recorded content depends on the effective [data capture setting](/ai_gateway/security/#configure-data-capture).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: /account_management/personal-access-tokens/
[5]: /account_management/service-access-tokens/
[12]: /getting_started/site/
