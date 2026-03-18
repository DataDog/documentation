---
title: Enabling App and API Protection for Azure Container Apps in Node.js
further_reading:
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
- link: "/security/application_security/threats/"
  tag: "Documentation"
  text: "App and API Protection"
---

<div class="alert alert-info">AAP support for Azure Container Apps is in Preview.</div>

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][4] to block IPs in your [WAF][5].

## Setup

1. **Install the Datadog Node.js tracer**.

   1. In your main application, install the `dd-trace` package.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. Initialize the Node.js tracer with the `NODE_OPTIONS` environment variable:
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   For more information, see [Tracing Node.js applications][1].

2. **Install serverless-init as a sidecar**.

   {{% serverless-init-install mode="sidecar" %}}

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% aca-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% aca-install-sidecar-terraform %}}
   {{% /tab %}}

   {{% tab "Bicep" %}}
   {{% aca-install-sidecar-bicep %}}
   {{% /tab %}}

   {{% tab "ARM Template" %}}
   {{% aca-install-sidecar-arm-template %}}
   {{% /tab %}}

   {{% tab "Manual" %}}
   {{% aca-install-sidecar-manual %}}
   {{% /tab %}}

   {{< /tabs >}}

## Configuration

### Enable App and API Protection

Set the environment variable `DD_APPSEC_ENABLED=true` in your application container to enable App and API Protection.

### Disable APM tracing

To use App and API Protection without APM tracing, set `DD_APM_TRACING_ENABLED=false` in your application container in addition to `DD_APPSEC_ENABLED=true`.

{{% serverless-init-env-vars-sidecar language="nodejs" defaultSource="containerapp" %}}

{{% svl-tracing-env %}}

## Testing threat detection

To see App and API Protection threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][6] attempt:
```sh
curl -A 'dd-test-scanner-log' https://<YOUR_APP_URL>/existing-route
```
After you enable your application and exercise it, threat information appears in the [Application Signals Explorer][7].

## Troubleshooting

{{% serverless-init-troubleshooting productNames="Azure Container Apps" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[4]: /actions/workflows/
[5]: /security/application_security/waf-integration/
[6]: /security/default_rules/security-scan-detected/
[7]: https://app.datadoghq.com/security/appsec
