---
title: CD Visibility in Datadog
further_reading:
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Learn how to query and visualize deployments"
- link: "/continuous_delivery/features"
  tag: "Documentation"
  text: "Learn about CD Visibility Features"
cascade:
    algolia:
        rank: 70
        tags: ['cd pipeline', 'cd pipelines']
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Join the Preview!" >}}
CD Visibility is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

## Overview

CD Visibility provides a deployment-first view into your CD health by displaying important metrics and results from your deployments.

## Setup

{{< whatsnext desc="Select your deployments provider to set up CD Visibility in Datadog:" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}Argo CD{{< /nextlink >}}
    {{< nextlink href="continuous_delivery/deployments/ciproviders" >}}CI Providers (GitLab, Jenkins, CircleCI, and more){{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info">If you are using a provider that is not supported, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">fill out this form to request support</a>.</div>

## Use deployment data

When creating a [dashboard][1] or a [notebook][2], you can use deployment data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][3] and [Notebooks documentation][4].

## Share deployment data

You can export your search query to a [saved view][5] by clicking the **Export** button.

{{< img src="continuous_delivery/explorer/deployment_executions_export.png" alt="Deployment execution results appearing in the CD Visibility Explorer" width="100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /dashboards
[4]: /notebooks
[5]: /continuous_delivery/explorer/saved_views
