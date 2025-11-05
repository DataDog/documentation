---
title: Reverse Connection
further_reading:
- link: "/cloudprem/install/"
  tag: "Documentation"
  text: "CloudPrem Installation Prerequisites"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

Reverse connection lets your CloudPrem cluster initiate a WebSocket connection with Datadog using your API key, without requiring adding a DNS record and configuring a public ingress. This setup is useful for environments with strict network policies which do not allow inbound requests.

## Helm chart configuration

1. Create a Kubernetes secret with your API key:

   ```
   kubectl create secret generic datadog-secret -n <NAMESPACE_NAME> --from-literal api-key=<DD_API_KEY>
   ```
   Replace `<DD_API_KEY>` with your Datadog API key.

2. Configure the `datadog` section of your Helm chart values:

   ```yaml
   datadog:
     site: datadoghq.com
     apiKeyExistingSecret: datadog-secret
   ```
   **Note**: Make sure to set `site` to the Datadog site you are using (for instance, `datadoghq.eu`).

## Proxies

To configure CloudPrem to use a forward proxy such as Squid, set the environment variable `HTTPS_PROXY`:

```yaml
environment:
  HTTPS_PROXY: <your HTTP proxy>
```
