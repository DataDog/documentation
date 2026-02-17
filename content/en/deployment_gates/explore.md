---
title: Explore Deployment Gates
description: "View gate evaluations, identify frequently failing rules, analyze failure patterns, and track evaluation trends over time."
further_reading:
- link: "/deployment_gates/setup"
  tag: "Documentation"
  text: "Set up Deployment Gates"
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Deployment Gates are not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

To explore your Deployment Gates and rules evaluations, navigate to [**Software Delivery > Deployment Gates > Evaluations**][1]. 

On this page you can:
* View recently completed gate evaluations and failure reasons
* Identify frequently failing rules and gates
* Analyze common failure patterns
* Track evaluation trends over time

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployment-gates/evaluations
