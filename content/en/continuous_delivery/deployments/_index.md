---
title: CD Visibility in Datadog
kind: documentation
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

## Overview

[Deployment Visibility][1] provides a deployment-first view into your CD health by displaying important metrics and results from your deployments. 

## Setup

{{< whatsnext desc="Select your CD provider to set up Deployment Visibility in Datadog:" >}}
    {{< nextlink href="continuous_delivery/deployments/argocd" >}}ArgoCD{{< /nextlink >}}
{{< /whatsnext >}}
<div class="alert alert-warning">If your CD provider is not supported, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHpvshBu20v6qqMrAjMpUJrwYpRlaGai1mkAPsPU78hWZOKA/viewform?usp=sf_link">you can fill out this form to request support</a>.</div>

## Use deployment data

When creating a [dashboard][2] or a [notebook][3], you can use deployment data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][4] and [Notebooks documentation][5].

## Share deployment data

You can export your search query to a [saved view][6] by clicking the **Export** button.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/notebook/list
[4]: /dashboards
[5]: /notebooks
[6]: /continuous_delivery/explorer/saved_views
