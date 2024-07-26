---
title: CD Visibility in Datadog
further_reading:
- link: "/continuous_delivery/search"
  tag: "Documentation"
  text: "Learn how to search and manage your deployment results"
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Learn about the CD Visibility Explorer"
cascade:
    algolia:
        rank: 70
        tags: ['cd pipeline', 'cd pipelines']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

[Deployment Visibility][1] provides a deployment-first view into your CD health by displaying important metrics and results from your deployments.

## Setup

{{< whatsnext desc="Select your deployments provider to set up CD Visibility in Datadog:" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}CI Providers (GitLab, Jenkins, CircleCI, and more){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info">If you are using a provider that is not supported, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">fill out this form to request support</a>.</div>

## Use deployment data

When creating a [dashboard][2] or a [notebook][3], you can use deployment data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][4] and [Notebooks documentation][5].

## Share deployment data

You can export your search query to a [saved view][6] by clicking the **Export** button.

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="Deployment execution results appearing in the CD Visibility Explorer" width="100%" >}}

## Visualize correlated pipelines and deployments

Once the setup is completed, the deployment executions panel contains a new tab called **Pipeline** from which the pipeline trace is visible. From this tab, you can navigate to CI visibility by clicking the **View Full Pipeline** link at the top:

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="Deployment executions panel with Pipeline tab" style="width:100%;">}}

Additionally, on the CI Visibility page, pipelines that contain deployments display a new **Deployments** tab:

{{< img src="ci/cd-ci-correlation-deployments-tab.png" alt="Deployment executions panel with Pipeline tab" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/notebook/list
[4]: /dashboards
[5]: /notebooks
[6]: /continuous_delivery/explorer/saved_views
