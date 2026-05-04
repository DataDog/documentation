---
title: Network
further_reading:
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "BYOC Logs Ingress Configuration"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="true" header="In Preview" >}}
  BYOC Logs is in Preview.
{{< /callout >}}

This document provides an overview of how BYOC Logs and Datadog communicate with each other.

## Reverse connection (default)

By default, BYOC Logs **searcher** pods initiate an outbound WebSocket connection to Datadog using your API key. Each searcher pod maintains its own connection to `wss://<DD_SITE>/api/unstable/cloudprem-connection-gateway/connect`.

Datadog recommends this setup because:
- **No inbound ports need to be opened** in your network.
- **No DNS record or public ingress is required.**
- The connection is initiated from your infrastructure, which simplifies firewall and security policies.

### What flows through the reverse connection

| Data | Direction | Description |
|------|-----------|-------------|
| Search queries | Datadog → BYOC Logs | Queries from Log Explorer, dashboards, monitors |
| Query results | BYOC Logs → Datadog | Matching log entries returned for display |
| Index management | Datadog → BYOC Logs | Index creation, updates, deletion |

### Network requirements

Searcher pods require **outbound HTTPS (port 443)** access to your Datadog site (for example, `app.datadoghq.com`). No inbound connectivity is required.

If your environment uses an HTTP proxy, BYOC Logs supports standard proxy configuration with `HTTPS_PROXY`, `ALL_PROXY`, and `NO_PROXY` environment variables.

### Which pods connect to Datadog

Only **searcher** pods establish the reverse connection. Indexers, the control plane, the metastore, and the janitor do not initiate any connection to Datadog.

## Public ingress (optional)

It is also possible to configure BYOC Logs to deploy a public ingress so Datadog can establish the connection in the other direction.

The public ingress enables Datadog's control plane and query service to manage and query BYOC Logs clusters over the public internet. It provides secure access to the BYOC Logs gRPC API using mTLS authentication. You can find more information about BYOC Logs ingress in its [configuration page](/cloudprem/configure/ingress/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
