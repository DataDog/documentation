---
title: Configuring the Azure API Management callout
description: Deploy the App and API Protection callout service with the Azure CLI, Bicep, or Docker, and configure its environment variables.
further_reading:
    - link: "/security/application_security/setup/azure/api-management"
      tag: "Documentation"
      text: "Enabling App and API Protection for Azure API Management"
    - link: "/security/application_security/setup/azure/api-management/policies"
      tag: "Documentation"
      text: "Azure API Management policies for App and API Protection"
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout'
      tag: "Source Code"
      text: "App and API Protection Azure API Management callout source code"
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

This page describes how to deploy and configure the App and API Protection callout service for Azure API Management (APIM) without using the one-click template. If you have not deployed the integration yet, start with [Enabling App and API Protection for Azure API Management][1].

The callout service ships as the container image `ghcr.io/datadog/dd-trace-go/apim-callout:latest`. It listens on two ports:

- `8080` serves the callout endpoint, `POST /`, which handles all request and response phases.
- `8081` serves the health endpoint, `GET /`.

## Deployment options

{{< tabs >}}
{{% tab "Azure CLI" %}}

The `deploy/azure/deploy.sh` script wraps `az deployment group create`.

It first verifies that the Azure CLI is installed and authenticated, Bicep is available, the resource group exists, and the APIM tier is not Consumption. It then runs `az deployment group what-if` so you can preview the changes before applying them.

```shell
DD_API_KEY=<your-datadog-api-key> \
  ./deploy/azure/deploy.sh \
  --resource-group <rg-name> \
  --apim-name <apim-service-name>
```

On success, the script prints the callout URL, the Container Apps hostname, the Datadog Agent IP address, and whether the policy was deployed.

Available flags:

| Flag                            | Description                                                     |
|---------------------------------|-----------------------------------------------------------------|
| `--resource-group`, `-g`        | Resource group for the deployment.                                          |
| `--apim-name`                   | Name of the APIM instance to protect.                           |
| `--apim-resource-group`         | Resource group containing the APIM instance, if different from the deployment resource group.           |
| `--api-ids`                     | Restrict the policy to specific API IDs.                        |
| `--deploy-policy`               | Inject the Datadog policy.                                      |
| `--no-deploy-policy`            | Skip policy injection.                                          |
| `--what-if`                     | Preview the deployment without applying it.                     |
| `--name-prefix`                 | Prefix for created resource names.                              |
| `--container-image`             | Override the callout container image.                           |
| `--dd-site`                     | Datadog site.                                                   |
| `--log-analytics-workspace-id`  | ID of an existing Log Analytics workspace for logs.                      |
| `--vnet-address-prefix`         | Address prefix for the created virtual network.                 |
| `--existing-vnet-id`            | ID of an existing virtual network to use. Requires `--existing-aca-subnet-id` and `--existing-aci-subnet-id`, and the APIM instance must already be integrated with the same virtual network. |
| `--existing-aca-subnet-id`      | ID of an existing subnet for the callout service.               |
| `--existing-aci-subnet-id`      | ID of an existing subnet for the Datadog Agent.      |
| `--enable-https`                | Serve the callout endpoint over HTTPS.                          |
| `--no-locks`                    | Skip resource locks.                                            |
| `--min-replicas`                | Minimum number of callout replicas.                                       |
| `--max-replicas`                | Maximum number of callout replicas.                                       |
| `--concurrent-requests`         | Concurrent requests per replica before scaling out.             |

The script reads `DD_API_KEY` and `DD_SITE` from the environment.

{{% /tab %}}

{{% tab "Bicep module" %}}

Reference the Bicep module directly from your own infrastructure-as-code:

```bicep
module apimCallout 'path/to/contrib/azure/apim-callout/deploy/azure/main.bicep' = {
  name: 'dd-apim-callout'
  params: {
    datadogApiKey: keyVault.getSecret('dd-api-key')
    apimServiceName: 'my-apim'
    logAnalyticsWorkspaceId: logAnalytics.id
    // every other parameter has a default
  }
}
```

`datadogApiKey` and `apimServiceName` are required. The remaining parameters are optional: `apimResourceGroup`, `targetApiIds`, `logAnalyticsWorkspaceId`, `namePrefix`, `location`, `datadogSite`, `deployPolicy`, `enableHttps`, `containerImage`, `vnetAddressPrefix`, `existingVnetId`, `existingAcaSubnetId`, `existingAciSubnetId`, `enableLocks`, `minReplicas`, `maxReplicas`, `concurrentRequestsThreshold`, and `customTags`.

Setting `existingVnetId` changes those requirements. In that mode, `existingAcaSubnetId` and `existingAciSubnetId` become required, and the module does not create an APIM subnet. The APIM instance must therefore already be integrated with the same virtual network. Otherwise the APIM configuration step can fail, or APIM cannot resolve the callout service.

Defaults:

| Parameter                     | Default                                           |
|-------------------------------|---------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                         |
| `datadogSite`                 | `datadoghq.com`                                   |
| `deployPolicy`                | `false`                                           |
| `enableHttps`                 | `false`                                           |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest` |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                     |
| `minReplicas` / `maxReplicas` | `1` / `10`                                        |
| `concurrentRequestsThreshold` | `20`                                              |
| `targetApiIds`                | empty, which applies to all APIs                  |

Accepted `datadogSite` values are `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, `ap2.datadoghq.com`, and `ddog-gov.com`. Your site is {{< region-param key="dd_site" code="true" >}}.

{{% /tab %}}

{{% tab "Docker" %}}

For local testing or for hosting outside Azure, run the image directly:

```shell
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -e DD_AGENT_HOST=datadog-agent \
  ghcr.io/datadog/dd-trace-go/apim-callout:latest
```

Confirm the service is running:

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

A container hosted this way still needs network reachability from the APIM gateway and a Datadog Agent to receive traces and security events.

{{% /tab %}}
{{< /tabs >}}

## Configuration

The callout service enables the Datadog Web Application Firewall (WAF) itself at startup, so you do not need to set `DD_APPSEC_ENABLED`.

The service supports the following settings:

| Environment variable               | Default value | Description                                                                                                                         |
|------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APIM_CALLOUT_HOST`             | `0.0.0.0`     | Address on which the callout service listens.                                                                                            |
| `DD_APIM_CALLOUT_PORT`             | `8080`        | Port for the callout endpoint (`POST /`).                                                                                           |
| `DD_APIM_CALLOUT_HEALTHCHECK_PORT` | `8081`        | Port for the health endpoint (`GET /`).                                                                                             |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`| `10485760`    | Maximum number of body bytes analyzed, in bytes (10 MB). Set to `0` to skip body analysis, which reduces the exchange to two calls.  |
| `DD_APIM_CALLOUT_REQUEST_TIMEOUT`  | `30s`         | Time-to-live for cached per-request state. Orphaned state is released after this duration.                                           |
| `DD_APIM_CALLOUT_TLS`              | `false`       | Serve HTTPS instead of HTTP.                                                                                                        |
| `DD_APIM_CALLOUT_TLS_CERT_FILE`    | (empty)       | Path to the TLS certificate. Required when TLS is enabled.                                                                          |
| `DD_APIM_CALLOUT_TLS_KEY_FILE`     | (empty)       | Path to the TLS private key. Required when TLS is enabled.                                                                          |

## Automatic defaults

If the following variables are unset, the service assigns them at startup:

| Environment variable          | Value     | Description                                                    |
|-------------------------------|-----------|----------------------------------------------------------------|
| `DD_APM_TRACING_ENABLED`      | `false`   | Whether to send APM traces for the callout service itself.                |
| `DD_APPSEC_WAF_TIMEOUT`       | `10ms`    | Per-request WAF evaluation budget.                             |
| `DD_TRACE_PROPAGATION_STYLE`  | `datadog` | Format of the trace-context headers injected into requests.    |

If a single WAF evaluation exceeds its budget, the request is allowed rather than delayed.

## Datadog Agent connection

The callout service does not send data directly to Datadog. It sends traces and security events to a Datadog Agent, which forwards them to Datadog. The callout service and Agent run in separate containers, and each has its own environment variables.

On the **callout container**:

| Environment variable | Default value | Description                           |
|----------------------|---------------|---------------------------------------|
| `DD_AGENT_HOST`      | `localhost`   | Hostname or IP of your Datadog Agent. |

On the **Datadog Agent container**:

| Environment variable | Default value   | Description                          |
|----------------------|-----------------|--------------------------------------|
| `DD_API_KEY`         | (required)      | Your Datadog API key.                |
| `DD_SITE`            | `datadoghq.com` | Your Datadog site.                   |

Do not set `DD_API_KEY` on the callout container. The one-click deployment sets `DD_AGENT_HOST` on the callout container and maps `datadogApiKey` and `datadogSite` to `DD_API_KEY` and `DD_SITE` on the Agent container.

Your site is {{< region-param key="dd_site" code="true" >}}.

## Encrypting the callout endpoint

To serve the callout endpoint over HTTPS, set `DD_APIM_CALLOUT_TLS` to `true` and provide both `DD_APIM_CALLOUT_TLS_CERT_FILE` and `DD_APIM_CALLOUT_TLS_KEY_FILE`. If TLS is enabled and either file is missing, the service does not start. The minimum accepted TLS version is 1.2.

When TLS is enabled, the APIM policy must call the service over `https://`.

## Health check

Check the health endpoint on port `8081`:

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

A `200` response indicates that the service is running, but does not indicate the state of the WAF. To confirm that security data is arriving, use the Datadog UI checks described in [Enabling App and API Protection for Azure API Management][1].

## Sizing and performance

On a 0.5 vCPU, 1 GiB Azure Container Apps deployment, the request-headers and response-headers phases each take about 2.4 ms. The full APIM pipeline, including both callouts and the backend, takes about 9.7 ms.

Body phases run only when body inspection is enabled and the previous phase requested the body. The gateway maintains a connection pool to the callout service, which can reduce latency in production.

To minimize network round-trip time, deploy the callout service in the same Azure region as your APIM instance, and keep APIM close to your API consumers. By default, the service scales from 1 to 10 replicas and scales out at 20 concurrent requests per replica.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/azure/api-management
