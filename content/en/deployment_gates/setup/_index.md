---
title: Set Up Deployment Gates
description: "Choose between JIT (default) and preconfigured Deployment Gates and follow the setup walkthrough for the chosen mode."
further_reading:
- link: "/deployment_gates/setup/jit"
  tag: "Documentation"
  text: "Set up JIT Deployment Gates"
- link: "/deployment_gates/setup/preconfigured"
  tag: "Documentation"
  text: "Set up preconfigured Deployment Gates"
- link: "/deployment_gates/explore"
  tag: "Documentation"
  text: "Learn about the Deployment Gates explorer"
- link: "/api/latest/deployment-gates"
  tag: "API Reference"
  text: "Deployment Gates API reference"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Deployment Gates are not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

A **Deployment Gate** evaluates one or more **rules** against a service and environment to decide whether a deployment should proceed. Deployment Gates support two modes — pick the one that matches how you want to manage gate configuration.

## Choose a mode

| | **[JIT (Just-In-Time)][1]** (default) | **[Preconfigured][2]** |
|---|---|---|
| **Where rules live** | Inline in your deployment config or CI step | Persisted in Datadog (UI, API, or Terraform) |
| **Setup in Datadog** | None | Create a gate and rules ahead of time |
| **Best for** | Rules-as-code, per-deployment flexibility, teams that own their own gate config | Shared rules across services, central management, non-CI editing |
| **How to evaluate** | Send rules in the evaluation request | Reference the gate by service and environment |

Both modes use the same [rule types](/deployment_gates/setup/jit/#rule-types) (Monitor and APM Faulty Deployment Detection) and the same asynchronous evaluation lifecycle (`in_progress` → `pass` or `fail`).

For the request and response schema in either mode, see the [Deployment Gates API reference][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /deployment_gates/setup/jit
[2]: /deployment_gates/setup/preconfigured
[3]: /api/latest/deployment-gates
