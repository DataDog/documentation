---
title: Network
further_reading:
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "BYOC Logs Ingress Configuration"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="BYOC Logs is in Preview" >}}
  Join the BYOC Logs Preview to access new self-hosted log management features.
{{< /callout >}}

This document provides an overview of how BYOC Logs and Datadog communicate with each other.

### Default behavior: BYOC Logs initiates the connection

By default, BYOC Logs initiates a WebSocket connection with Datadog using your API key, without requiring you to add a DNS record and configure a public ingress. This setup is useful for environments with strict network policies that do not allow inbound requests.


### Optional behavior: using a public Ingress

It's possible to configure BYOC Logs to deploy a public ingress so Datadog can establish a connection. 

The public ingress enables Datadog's control plane and query service to manage and query BYOC Logs clusters over the public internet. It provides secure access to the BYOC Logs gRPC API using mTLS authentication. You can find more information about BYOC Logs ingress in its [configuration page](/cloudprem/configure/ingress/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

