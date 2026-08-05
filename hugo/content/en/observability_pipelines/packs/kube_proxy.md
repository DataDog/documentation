---
title: Kube Proxy
description: Learn more about the Kube Proxy pack.
---

## Overview

{{< img src="observability_pipelines/packs/kube_proxy.png" alt="The Kube Proxy pack" style="width:25%;" >}}

Keeps kube-proxy errors and warnings only, dropping routine iptables sync noise fired every cycle.

What this pack does:

- Keeps sync failures
- Drops routine sync noise
- Extracts log level
