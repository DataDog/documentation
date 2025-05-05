---
title: CloudPrem Ingress Configuration
description: Learn how to configure and manage ingress controllers for your CloudPrem deployment
further_reading:
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "CloudPrem Installation"
- link: "/cloudprem/security/"
  tag: "Documentation"
  text: "CloudPrem Security"
---

## Overview

Ingress is a critical component of your CloudPrem deployment, CloudPrem has one public ingress and one private one.

## Public ingress

The public ingress is essential for enabling Datadog's control plane and query service to manage and query CloudPrem clusters over the public internet. It provides secure access to the CloudPrem gRPC API through the following mechanisms:
- Creates an internet-facing AWS Application Load Balancer (ALB) that accepts traffic from Datadog services
- Implements TLS encryption with termination at the load balancer level
- Uses HTTP/2 (gRPC) for communication between the ALB and CloudPrem cluster
- Requires mutual TLS (mTLS) authentication where Datadog services must present valid client certificates
- Configures the ALB in TLS passthrough mode to forward client certificates to CloudPrem pods via the `X-Amzn-Mtls-Clientcert` header
- Rejects requests that are missing valid client certificates or the certificate header

This setup ensures that only authenticated Datadog services can access the CloudPrem cluster while maintaining secure encrypted communication end-to-end.

<!-- {{< img src="path/to/your/image-name-here.png" alt="TBD Public ingress diagram" style="width:100%;" >}} -->

<div class="alert alert-warning">Only the CloudPrem gRPC API endpoints (paths starting with `/cloudprem`) perform mutual TLS authentication. Exposing any other endpoints through the public ingress introduces a security risk, as those endpoints would be accessible over the internet without authentication. Always restrict non-gRPC endpoints to the internal ingress. </div>

### IP Ranges
The Datadog control plane and query services connect to CloudPrem clusters using a set of fixed IP ranges, which can be retrieved for each Datadog site from the Datadog IP Ranges API, specifically under the "webhooks" section. For example, to fetch the IP ranges for the datadoghq.eu site, you can run:
```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```


## Internal ingress

The internal ingress enables log ingestion from Datadog Agents and other log collectors within your environment through HTTP.

<!-- {{< img src="path/to/your/image-name-here.png" alt="TBD Internal ingress with ALB provisioned by Helm chart" style="width:100%;" >}} -->

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
            name: <release name>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/bulk
        pathType: Prefix
        backend:
          service:
            name: <release name>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/*/_bulk
        pathType: ImplementationSpecific
        backend:
          service:
            name: <release name>-indexer
            port:
              name: rest 
      - path: /api/v2/logs
        pathType: Prefix
        backend:
          service:
            name: <release name>-indexer
            port:
              name: rest
      # Index management API endpoints to metastores
      - path: /api/v1/indexes
        pathType: Prefix
        backend:
          service:
            name: <release name>-metastore
            port:
              name: rest
      # Everything else to searchers
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: <release name>-searcher
            port:
              name: rest

```

<!-- {{< img src="path/to/your/image-name-here.png" alt="TBD Internal ingress using NGINX ingress controller" style="width:100%;" >}} -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}} 