---
title: Network
aliases:
- /cloudprem/introduction/network/
further_reading:
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "CloudPrem Ingress Configuration"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Network between Datadog and CloudPrem

### Default behavior: CloudPrem initiates the connection

By default, CloudPrem initiates a WebSocket connection with Datadog using your API key, without requiring you to add a DNS record and configure a public ingress. This setup is useful for environments with strict network policies that do not allow inbound requests.


### Optional behavior: using a public Ingress

It's possible to configure CloudPrem to deploy a public ingress so Datadog can establish a connection. 

The public ingress enables Datadog's control plane and query service to manage and query CloudPrem clusters over the public internet. It provides secure access to the CloudPrem gRPC API using mTLS authentication. You can find more information about CloudPrem ingress in its [configuration page](/cloudprem/configure/ingress/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

