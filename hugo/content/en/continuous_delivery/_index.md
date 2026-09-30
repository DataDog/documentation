---
title: Continuous Delivery Visibility
disable_sidebar: true
further_reading:
- link: "continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn how to set up Deployment Visibility"
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Learn how to query and visualize deployments"
- link: "/continuous_delivery/features"
  tag: "Documentation"
  text: "Learn about CD Visibility Features"
- link: "https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/"
  tag: "Blog"
  text: "Best practices for CI/CD monitoring"
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
cascade:
    algolia:
        rank: 70
        tags: ['ci/cd', 'continuous delivery', 'deployment visibility', 'deployments', 'deployment executions']
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Join the Preview!" >}}
CD Visibility is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Datadog Continuous Delivery (CD) Visibility provides observability on your deployments. CD Visibility brings deployment metrics and data into Datadog so you can communicate the health of your deployments, and focus your efforts in improving your team's ability to deliver quality code every time.

With CD Visibility, you can monitor deployments across CD environments by tracking every deployment event. You can understand the changes being deployed and how they are affecting your services.

## Increase efficiency through seamless integrations

Datadog integrates with [CI providers][3] and CD providers like [Argo CD][4] to track the execution performance and results of your deployments.

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

Use the data aggregated over time to identify trends and improve your deployment strategies for enhanced operational efficiency.

## Ready to start?

See [Deployment Visibility][1] for instructions on setting up CD Visibility with your CD providers, information about compatibility requirements, and steps for instrumenting and configuring data collection. See [Explore CD Visibility Deployments][2] to understand how to query and visualize deployments.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_delivery/deployments
[2]: /continuous_delivery/explorer
[3]: /continuous_delivery/deployments/ciproviders
[4]: /continuous_delivery/deployments/argocd
