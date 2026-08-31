---
title: Enabling App and API Protection for Azure API Management
further_reading:
    - link: "/security/application_security/setup/azure/api-management/configuration"
      tag: "Documentation"
      text: "Configuring the Azure API Management callout"
    - link: "/security/application_security/setup/azure/api-management/policies"
      tag: "Documentation"
      text: "Azure API Management policies for App and API Protection"
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout'
      tag: "Source Code"
      text: "App and API Protection Azure API Management callout source code"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" header="App and API Protection for Azure API Management is in Preview" >}}
To try the preview of App and API Protection for Azure API Management, use the following setup instructions.
{{< /callout >}}

App and API Protection for Azure API Management adds threat detection and blocking to your APIM gateway without any change to your backend code. Azure API Management is a managed service, so it cannot run an in-process tracer. Instead, Datadog provides an HTTP callout service that the gateway calls from an APIM policy. On each call, the service runs the Datadog Web Application Firewall (WAF) and returns a decision: continue or block.

Protection applies at the gateway, so it covers every API behind it in any language. That includes third-party and legacy APIs you do not own.

This integration is available starting in Datadog Go tracer v2.8.0.

## How it works

Azure API Management evaluates policies on the way in and on the way out. The Datadog policy adds a [`send-request`][1] callout to the Datadog callout service at each stage, then reads the decision back from a policy variable.

The exchange uses four calls:

1. **Inbound, request headers.** The service returns a request ID, Datadog trace propagation headers, and, when body inspection applies, the number of body bytes it accepts.
2. **Inbound, request body.** Runs only when the previous phase asked for the body.
3. **Outbound, response headers.**
4. **Outbound, response body.** Runs only when the previous phase asked for the body.

The request ID ties all four phases to a single WAF evaluation context. If the decision is block, APIM returns the block response to the client and never calls your backend. If the decision is continue, APIM injects Datadog trace-context headers and forwards the request as usual.

The integration is fail-open at every stage. Each callout sets `ignore-error="true"`, so if the callout service is unreachable, times out, or answers with anything other than `200`, traffic proceeds unmodified. A misconfiguration shows up as missing security data rather than as broken traffic.

For the policy internals, see [Azure API Management policies for App and API Protection][2].

## Prerequisites

- An Azure subscription.
- An existing Azure API Management instance on the **Developer**, **Standard v2**, or **Premium** tier. This integration places the callout service inside a virtual network and requires APIM virtual network integration, so the **Consumption** tier is not supported.
- A [Datadog API key][3].
- Permission to deploy ARM or Bicep templates into the target resource group, and to edit APIM policies.
- Optional: an existing Log Analytics workspace to collect Container Apps logs.

## Deploy the callout service

[Deploy to Azure][4]

Two parameters are required:

| Parameter         | Value                                                                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `datadogApiKey`   | Your Datadog API key. In the Azure portal, select **Reference a Key Vault secret** to use an existing Key Vault secret instead of the value. |
| `apimServiceName` | The name of the existing APIM instance to protect.                                                                                          |

Every other parameter has a default. The template provisions:

- A virtual network with separate subnets for APIM, the callout service, and the Datadog Agent. It also creates network security groups and a NAT gateway for egress.
- The callout service on Azure Container Apps with KEDA HTTP autoscaling. Ingress is on port `8080`, the health probe on port `8081`, and the service scales from 1 to 10 replicas at 20 concurrent requests per replica.
- The Datadog Agent on Azure Container Instances in a private subnet. The callout service sends traces and security events to it.
- A private DNS zone and virtual network link so APIM resolves the internal Container Apps hostname.
- Virtual network integration on the existing APIM instance, and optionally the Datadog policy itself.

Useful defaults:

| Parameter                     | Default                                              |
|-------------------------------|------------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                            |
| `datadogSite`                 | {{< region-param key="dd_site" code="true" >}}       |
| `deployPolicy`                | `false`                                              |
| `enableHttps`                 | `false`                                              |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest`    |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                        |
| `minReplicas` / `maxReplicas` | `1` / `10`                                           |
| `concurrentRequestsThreshold` | `20`                                                 |
| `targetApiIds`                | empty, which applies to all APIs                     |

To deploy from the command line or from your own infrastructure-as-code instead, see [Configuring the Azure API Management callout][5].

## Apply the Datadog policy

The callout service only inspects traffic the gateway sends to it, so attach the Datadog policy to the APIs you want to protect.

You have two options:

- Set `deployPolicy` to `true` and let the deployment inject the policy for you. The `targetApiIds` parameter selects which APIs receive it, and defaults to all APIs.
- Apply the provided policy XML yourself in the APIM policy editor, replacing the placeholder host with the hostname of your deployed callout service.

For the policy contents, attachment scopes, and how a block becomes a client response, see [Azure API Management policies for App and API Protection][2].

## Validate the deployment

Send a normal request, then a simulated attack:

```shell
# Normal request: passes through to your backend
curl -v https://<apim-gateway-host>/<api-path>

# Simulated attack: returns 403
curl -v -A dd-test-scanner-log-block "https://<apim-gateway-host>/<api-path>"
```

Then confirm the data reached Datadog:

1. Open [Security > App and API Protection][6]. The simulated attack appears as a signal.
2. Open [APM > Service Catalog][7] and look for the `dd-apim-callout` service. Its spans carry the tag `component:apim-callout`.

To check the callout service itself, request its health endpoint on port `8081`:

```shell
curl -s http://<callout-host>:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

## Performance

Measured on a 0.5 vCPU, 1 GiB Azure Container Apps deployment:

| Phase                                                          | Processing time |
|----------------------------------------------------------------|-----------------|
| Request headers                                                | ~2.4 ms         |
| Response headers                                               | ~2.4 ms         |
| Full APIM pipeline, including both callouts and the backend    | ~9.7 ms         |

Body phases run only when body inspection is enabled and the previous phase asked for the body. The dominant cost is network round-trip time, so deploy the callout service in the same Azure region as your APIM instance.

## Compatibility

For the capabilities this integration supports and the versions that introduced them, see the [App and API Protection compatibility requirements][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: /security/application_security/setup/azure/api-management/policies
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdd-trace-go%2Fmain%2Fcontrib%2Fazure%2Fapim-callout%2Fdeploy%2Fazure%2Fazuredeploy.json
[5]: /security/application_security/setup/azure/api-management/configuration
[6]: https://app.datadoghq.com/security/appsec
[7]: https://app.datadoghq.com/services
[8]: /security/application_security/setup/compatibility/
