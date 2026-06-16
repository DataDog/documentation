---
title: Set Up Deployment Gates
description: "Compare Just-In-Time (JIT) and preconfigured Deployment Gates and follow the setup walkthrough for your chosen mode."
further_reading:
- link: "/deployment_gates/setup/jit"
  tag: "Documentation"
  text: "Set up Just-In-Time (JIT) Deployment Gates"
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

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Deployment Gates have two main components:

- A **Gate** is defined for a service and environment, and evaluates one or more rules to decide whether a deployment should proceed.
- A **Rule** is a type of evaluation performed as part of a gate, such as checking the status of a set of monitors or running APM Faulty Deployment Detection analysis on the deployed version.

Gate evaluations are asynchronous — the API returns immediately with an evaluation ID, and the result resolves to `pass` or `fail` over time as the rules run.

## Deployment Gate evaluation modes
Deployment Gates support two evaluation modes: Just-In-Time (JIT) and preconfigured.


| | **[JIT][1]** (default) | **[Preconfigured][2]** |
|---|---|---|
| **Where rules live** | Inline in your deployment configuration or CI step | Persisted in Datadog (UI, API, or Terraform) |
| **Setup in Datadog** | None | Create a gate and rules ahead of time |
| **Best for** | Rules-as-code, per-deployment flexibility, teams that own their own gate configuration | Shared rules across services, central management, non-CI editing |
| **How to evaluate** | Send rules in the evaluation request | Reference the gate by service and environment |

You can use different modes across different gates if needed.

If you're unsure where to start, use JIT.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /deployment_gates/setup/jit
[2]: /deployment_gates/setup/preconfigured
