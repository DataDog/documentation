---
title: Deployment Gates
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
<div class="alert alert-warning">Deployment Gates are not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Deployment Gates provide data-driven control over your production rollouts. They evaluate Datadog telemetry—such as targeted monitors and APM anomalies—to determine the health of new releases in real time.

By monitoring key indicators with Deployment Gates, you can automatically halt a release if anomalies or performance regressions are detected, preventing unstable code from reaching a wider user base.

The product consists of two main components:

- A [gate][1] is defined for a service and environment. Each gate is evaluated on a set of rules.
- A rule is a type of evaluation evaluated as part of a gate. You can create these types of rules:
  - [Monitors][2]
  - [APM Faulty Deployment Detection][3]

For setup instructions, see [Set up Deployment Gates][4]. After the setup is completed, you can track and analyze gate evaluations through the [Deployment Gates Evaluations][5] page:

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /deployment_gates/setup/#create-a-deployment-gate
[2]: /deployment_gates/setup/?tab=monitors#rule-types
[3]: /deployment_gates/setup/?tab=apmfaultydeploymentdetection#rule-types
[4]: /deployment_gates/setup
[5]: /deployment_gates/explore
