---
title: HAProxy Ingress
description: Learn more about the HAProxy Ingress pack.
---

## Overview

{{< img src="observability_pipelines/packs/haproxy_ingress.png" alt="The HAProxy Ingress pack" style="width:25%;" >}}

HAProxy Ingress logs record how Kubernetes ingress traffic is routed and served.

What this pack does:

- Extracts key fields for analysis
- Drops routine health check and metrics endpoints
- Generates metrics to support cluster monitoring