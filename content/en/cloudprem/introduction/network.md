---
title: Network
further_reading:
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "CloudPrem Ingress Configuration"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

This document provides an overview of how CloudPrem and Datadog communicate with each other.

## Reverse connection (default)

By default, CloudPrem **searcher** pods initiate an outbound WebSocket connection to Datadog using your API key. Each searcher pod maintains its own connection to `wss://<DD_SITE>/api/unstable/cloudprem-connection-gateway/connect`.

This is the recommended setup because:
- **No inbound ports need to be opened** in your network.
- **No DNS record or public ingress is required.**
- The connection is initiated from your infrastructure, which simplifies firewall and security policies.

### What flows through the reverse connection

| Data | Direction | Description |
|------|-----------|-------------|
| Search queries | Datadog → CloudPrem | Queries from Log Explorer, dashboards, monitors |
| Query results | CloudPrem → Datadog | Matching log entries returned for display |
| Index management | Datadog → CloudPrem | Index creation, updates, deletion |

### Network requirements

Searcher pods require **outbound HTTPS (port 443)** access to your Datadog site (for example, `app.datadoghq.com`). No inbound connectivity is required.

If your environment uses an HTTP proxy, CloudPrem supports standard proxy configuration via `HTTPS_PROXY`, `ALL_PROXY`, and `NO_PROXY` environment variables.

### Which pods connect to Datadog

Only **searcher** pods establish the reverse connection. Indexers, the control plane, the metastore, and the janitor do not initiate any connection to Datadog.

## Public ingress (optional)

It is also possible to configure CloudPrem to deploy a public ingress so Datadog can establish the connection in the other direction.

The public ingress enables Datadog's control plane and query service to manage and query CloudPrem clusters over the public internet. It provides secure access to the CloudPrem gRPC API using mTLS authentication. You can find more information about CloudPrem ingress in its [configuration page](/cloudprem/configure/ingress/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
