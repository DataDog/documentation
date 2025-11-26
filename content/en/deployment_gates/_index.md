---
title: Deployment Gates
description: "Reduce deployment incidents by automatically evaluating monitors and APM anomalies to halt releases when performance regressions are detected."
further_reading:
- link: "/deployment_gates/setup"
  tag: "Documentation"
  text: "Set up Deployment Gates"
- link: "/deployment_gates/explore"
  tag: "Documentation"
  text: "Learn about the Deployment Gates explorer"
- link: "continuous_delivery"
  tag: "Documentation"
  text: "Learn about Continuous Delivery Visibility"
- link: "continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn how to set up CD Visibility"
algolia:
  tags: ["cd gates"]
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Deployment Gates are not available for the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Deployment Gates allow you to reduce the likelihood and impact of incidents caused by deployments.

When performing a production rollout, you can use Deployment Gates to evaluate the impact of the new changes by using [monitors][1] and APM anomalies.
When anomalies or performance regressions are detected, you can automatically halt the release, preventing unstable code from reaching a wider user base. Additionally, you can then use Deployment Gates as the entry-point to investigate the problem.

For setup instructions, see [Set up Deployment Gates][2]. After the setup is completed, you can track and analyze gate evaluations through the [Deployment Gates Evaluations][3] page:

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: /deployment_gates/setup
[3]: /deployment_gates/explore
