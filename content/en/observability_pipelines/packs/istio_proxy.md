---
title: Istio Proxy
description: Learn more about the Istio Proxy pack.
---

## Overview

{{< img src="observability_pipelines/packs/istio_proxy.png" alt="The Istio Proxy pack" style="width:25%;" >}}

Istio Proxy logs capture inbound and outbound traffic handled by Envoy.

What this pack does:

- Generates key HTTP metrics for latency, errors, and traffic
- Samples routine successful requests
- Drops low-value noise (health checks, static assets, empty `200` logs)