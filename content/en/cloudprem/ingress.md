---
title: CloudPrem Ingress Configuration
description: Learn how to configure and manage ingress controllers for your CloudPrem deployment
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "CloudPrem Overview"
- link: "/cloudprem/architecture/"
  tag: "Documentation"
  text: "Learn more about CloudPrem Architecture"
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "Install CloudPrem and Send Logs with the Agent"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Learn more about Cluster Sizing and Operations"
- link: "/cloudprem/aws_config"
  tag: "Documentation"
  text: "Configure AWS"
- link: "/cloudprem/processing/"
  tag: "Documentation"
  text: "Configure CloudPrem Log Processing"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

<div class="alert alert-warning">CloudPrem is in Preview.</div>

## Overview

Ingress is a critical component of your CloudPrem deployment. The Helm chart automatically creates two ingress configurations called public ingress and internal ingress. If the AWS Load Balancer Controller is installed on the cluster, it provisions one ALB per ingress configuration. Each load balancer can be further configured using ingress annotations.

## Public ingress

<div class="alert alert-warning">Only the CloudPrem gRPC API endpoints (paths starting with `/cloudprem`) perform mutual TLS authentication. Exposing any other endpoints through the public ingress introduces a security risk, as those endpoints would be accessible over the internet without authentication. Always restrict non-gRPC endpoints to the internal ingress. </div>

The public ingress is essential for enabling Datadog's control plane and query service to manage and query CloudPrem clusters over the public internet. It provides secure access to the CloudPrem gRPC API through the following mechanisms:
- Creates an internet-facing AWS Application Load Balancer (ALB) that accepts traffic from Datadog services
- Implements TLS encryption with termination at the load balancer level
- Uses HTTP/2 (gRPC) for communication between the ALB and CloudPrem cluster
- Requires mutual TLS (mTLS) authentication where Datadog services must present valid client certificates
- Configures the ALB in TLS passthrough mode to forward client certificates to CloudPrem pods with the `X-Amzn-Mtls-Clientcert` header
- Rejects requests that are missing valid client certificates or the certificate header

This setup ensures that only authenticated Datadog services can access the CloudPrem cluster while maintaining secure encrypted communication end-to-end.

{{< img src="/cloudprem/ingress/public_ingress.png" alt="Diagram showing CloudPrem public ingress architecture with Datadog services connecting through an internet-facing AWS ALB using mTLS authentication to access the CloudPrem gRPC API" style="width:100%;" >}}

### IP Allowlisting

The Datadog control plane and query services connect to CloudPrem clusters using a set of fixed IP ranges, which can be retrieved for each Datadog site from the Datadog [IP Ranges API][1], specifically under the "webhooks" section. For example, to fetch the IP ranges for the datadoghq.eu site, you can run:
```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## Internal ingress

The internal ingress enables log ingestion from Datadog Agents and other log collectors within your environment through HTTP.

{{< img src="/cloudprem/ingress/internal_ingress.png" alt=" Internal ingress with ALB provisioned by Helm chart" style="width:100%;" >}}

By default, the chart creates an internal AWS Application Load Balancer (ALB) to route HTTP traffic to the appropriate CloudPrem services based on the requested API endpoint path. However, if you prefer to use your own ingress controller (such as HAProxy, NGINX, or Traefik), you can disable the default internal ALB and configure your controller with the following routing rules:

```
rules:
- http:
    paths:
      # Ingest (Quickwit, ES, Datadog) endpoints to indexers
      - path: /api/v1/*/ingest
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/bulk
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/*/_bulk
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v2/logs
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      # Index management API endpoints to metastores
      - path: /api/v1/indexes
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-metastore
            port:
              name: rest
      # Everything else to searchers
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-searcher
            port:
              name: rest

```

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="CloudPrem internal ingress configuration using NGINX ingress controller showing path routing to indexer, metastore, and searcher services" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/latest/ip-ranges/
