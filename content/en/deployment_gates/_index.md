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

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Deployment Gates gives you data-driven control over your production deployments. Instead of hoping for the best when rolling out changes, you can deploy to a subset of production while Datadog automatically monitors your key metrics and APM data.

By evaluating monitors and performance metrics in real-time, Deployment Gates helps catch issues early - if something looks wrong in your initial rollout, the deployment stops before impacting your entire customer base. This brings concrete, metrics-based validation to your deployment process, replacing gut feelings with actual data.

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