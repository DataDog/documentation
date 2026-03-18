---
title: Instrumenting Azure API Management
code_lang: azure-apim
type: multi-code-lang
code_lang_weight: 60
further_reading:
- link: "/integrations/guide/azure-integrations/"
  tag: "Documentation"
  text: "Azure integrations"
---

Datadog APM can create **inferred spans** for requests that pass through Azure API Management to your backend services. The spans power end-to-end traces, service maps, and sampling based on the API Management gateway.

Inferred spans for Azure API Management are supported for **.NET**, **JavaScript** (Node.js), and **Python** only. Minimum tracer versions: .NET [v3.39.0][1]+, JavaScript [v5.87.0][2]+, Python [v4.6.0][3]+.

## Prerequisites

- `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED` is set in your application settings
- Your underlying application is running a [supported web framework](/tracing/trace_collection/proxy_setup/apigateway#supported-versions-and-web-frameworks) for your language.
- Your application tracer is at or above the minimum version listed above for your language.

## Setup

To create inferred spans, Azure API Management must pass the following headers to your backend services:

| Header | Value |
| ------ | ----- |
| `x-dd-proxy` | `azure-apim` |
| `x-dd-proxy-request-time-ms` | Request timestamp in Unix milliseconds |
| `x-dd-proxy-httpMethod` | HTTP method (e.g. from `context.Operation.Method`) |
| `x-dd-proxy-path` | URL template (e.g. from `context.Operation.UrlTemplate`) |
| `x-dd-proxy-region` | Deployment region (e.g. from `context.Deployment.Region`) |
| `x-dd-proxy-domain-name` | Request host (e.g. from `context.Request.OriginalUrl.Host`) |

### Inbound policy

Add the following policy to the **inbound** section of your API in Azure API Management so these headers are set on requests to your backend:

```xml
<set-header name="x-dd-proxy" exists-action="override">
    <value>azure-apim</value>
</set-header>
<set-header name="x-dd-proxy-request-time-ms" exists-action="override">
    <value>@(new DateTimeOffset(context.Timestamp).ToUnixTimeMilliseconds().ToString())</value>
</set-header>
<set-header name="x-dd-proxy-httpMethod" exists-action="override">
    <value>@(context.Operation.Method)</value>
</set-header>
<set-header name="x-dd-proxy-path" exists-action="override">
    <value>@(context.Operation.UrlTemplate)</value>
</set-header>
<set-header name="x-dd-proxy-region" exists-action="override">
    <value>@(context.Deployment.Region)</value>
</set-header>
<set-header name="x-dd-proxy-domain-name" exists-action="override">
    <value>@(context.Request.OriginalUrl.Host)</value>
</set-header>
```

You can add this policy at the API level in the Azure portal under **API Management** → your API → **Design** → **Inbound processing** → **Code view**, or via the Azure API Management REST API or policies in your API definition.

## Update sampling rules

Head-based sampling still applies when using Azure API Management tracing. Because the inferred span becomes the new trace root, update your rules so the service value matches the API Management service name shown in Datadog.

For example, if the original sampling rule is:

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-backend","sample_rate":0.5}]'
{{< /code-block >}}

Update the rule so the `service` value matches your API Management API name as it appears in Datadog, or remove the `service` key to apply the rule to all root spans:

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-azure-apim-api","sample_rate":0.5}]'
{{< /code-block >}}

Or apply to all root spans:

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"sample_rate":0.5}]'
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.39.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.87.0
[3]: https://github.com/DataDog/dd-trace-py/releases/tag/v4.6.0
