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
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Deployment Gates are not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Deployment gates allow you to gate your deployments based on Datadog telemetry. For example, you can deploy a new change to a subset of customers and check a set of monitors before proceeding with the deployment. In this way, you can make sure that the changes you're deploying work as expected and reduce the amount of incidents caused by unsafe deployments.

The two main product concepts are gates and rules:

- A **gate** is defined for a service and environment, and it has a set of (one or more) rules to be evaluated.
- A **rule** is a type of evaluation performed as part of a gate. For example, you can check the status of specific monitors by creating a new rule of type `Monitor`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
