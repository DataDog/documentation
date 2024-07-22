---
title: Send custom pipelines to Datadog
aliases:
  - /continuous_integration/setup_pipelines/custom
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/guides/pipeline_data_model"
      tag: "Documentation"
      text: "Learn about the Pipeline Data Model and Execution Types"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

You can send custom pipelines through HTTP using the [public API endpoint][1]. For more information about how pipeline executions are modeled, see [Pipeline Data Model and Execution Types][2].

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Custom tags][5] [and measures at runtime][6] | Custom tags and measures at runtime | Configure [custom tags and measures][7] at runtime. |
| [Manual steps][8] | Manual steps | View manually triggered pipelines. |
| [Parameters][9] | Parameters | Set custom parameters when a pipeline is triggered. |
| [Partial retries][10] | Partial pipelines | View partially retried pipeline executions. |
| [Pipeline failure reasons][11] | Pipeline failure reasons | Identify pipeline failure reasons from error messages. |
| [Queue time][12] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |

## Visualize pipeline data in Datadog

The [**CI Pipeline List**][3] and [**Executions**][4] pages populate with data after the pipelines are accepted for processing.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/ci-visibility-pipelines/#send-pipeline-event
[2]: /continuous_integration/guides/pipeline_data_model/
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /glossary/#custom-tag
[6]: /glossary/#custom-measure
[7]: /continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /glossary/#manual-step
[9]: /glossary/#parameter
[10]: /glossary/#partial-retry
[11]: /glossary/#pipeline-failure
[12]: /glossary/#queue-time