---
title: CD Pipeline Visibility in Datadog
kind: documentation
further_reading:
  - link: "/continuous_delivery"
    tag: "Documentation"
    text: "Learn about Continuous Delivery"
cascade:
    algolia:
        rank: 70
        tags: ['cd pipeline', 'cd pipelines']
---

## Overview

[Pipeline Visibility][1] provides a pipeline-first view into your CI health by displaying important metrics and results from your pipelines. 

## Setup

{{< whatsnext desc="Select your CD provider to set up Pipeline Visibility in Datadog:" >}}
    {{< nextlink href="continuous_delivery/pipelines/argocd" >}}ArgoCD{{< /nextlink >}}
{{< /whatsnext >}}

## Use CD pipelines data

When creating a [dashboard][2] or a [notebook][3], you can use CD pipeline data in your search query, which updates the visualization widget options. For more information, see the [Dashboards][4] and [Notebooks documentation][5].

## Alert on pipeline data

You can export your search query to a [CI Pipeline monitor][6] by clicking the **Export** button.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cd/pipelines
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/notebook/list
[4]: /dashboards
[5]: /notebooks
[6]: /monitors/types/cd
