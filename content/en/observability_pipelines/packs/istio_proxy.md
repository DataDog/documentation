---
title: Istio Proxy
description: Learn more about the Istio Proxy pack.
---

## Overview

Istio Proxy logs capture inbound and outbound traffic handled by Envoy.

What this pack does:

- Generates key HTTP metrics for latency, errors, and traffic
- Samples routine successful requests
- Drops low-value noise (health checks, static assets, empty `200` logs)