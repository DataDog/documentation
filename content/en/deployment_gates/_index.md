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

Deployment Gates help you control deployments based on Datadog telemetry. This approach prevents production incidents by ensuring changes work as expected before wider rollout.

The product consists of two main components:

- A [gate][1] is defined for a service and environment. It has a set of rules to be evaluated on.
- A rule is a type of evaluation evaluated as part of a gate. For example, you can create:
  - [Monitors][2] rules
  - [APM Faulty Deployment Detection][3] rules

For setup instructions, see [Set up Deployment Gates][4].

Once the setup is completed, you can track and analyze gate evaluations through the [Gate Evaluation page][5]:

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /deployment_gates/setup/#create-a-deployment-gate
[2]: /deployment_gates/setup/?tab=monitors#rule-types
[3]: /deployment_gates/setup/?tab=apm_faulty_deployment_detection#rule-types
[4]: /deployment_gates/setup
[5]: /deployment_gates/explore