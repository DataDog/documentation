---
title: Continuous Delivery Visibility
kind: documentation
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=CI%20Visibility"
  tag: "Release Notes"
  text: "Check out the latest CI/CD Visibility releases! (App login required)"
- link: "continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn how to set up Deployment Visibility"
- link: "continuous_delivery/search"
  tag: "Documentation"
  text: "Learn how to search and manage your deployment results"
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Learn about the CD Visibility Explorer"
- link: "https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/"
  tag: "Blog"
  text: "Best practices for CI/CD monitoring"
cascade:
    algolia:
        rank: 70
        tags: ['ci/cd', 'continuous delivery']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

Datadog Continuous Delivery (CD) Visibility provides observability on your deployments. CD Visibility brings deployment metrics and data into Datadog so you can communicate the health of your deployments, and focus your efforts in improving your team's ability to deliver quality code every time.

## Increase efficiency through seamless integrations

Datadog integrates with the following CD providers to gather deployment metrics and to track deployment execution performance and results. Use the data aggregated over time to track trends in the performance of deployments.

{{< partial name="continuous_delivery/cd-pipelines-getting-started.html" >}}

</br>

## Ready to start?

See [Deployment Visibility][1] for instructions on setting up CD Visibility with your CD providers, information about compatibility requirements, and steps for instrumenting and configuring data collection. Then, start exploring details about your deployment executions in the [CD Visibility Explorer][2] and export your search query into a [saved view][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_delivery/deployments
[2]: /continuous_delivery/explorer
[3]: /continuous_delivery/explorer/saved_views