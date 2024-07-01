---
title: Set up Tracing on Codefresh Pipelines
aliases:
  - /continuous_integration/setup_pipelines/codefresh
further_reading:
    - link: /continuous_integration/pipelines
      tag: Documentation
      text: Explore Pipeline Execution Results and Performance
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Codefresh][1] is a continuous integration and delivery platform built for Kubernetes which offers automation features that streamline the building, testing, and deploying of your applications. 

Set up tracing in Codefresh to collect data on each step of your pipelines, analyze performance bottlenecks, troubleshoot operational challenges, and monitor your deployment workflows.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Partial retries][7] | Partial pipelines | View partially retried pipeline executions. |
| [Manual steps][8] | Manual steps | View manually triggered pipelines. |
| [Parameters][9] | Parameters | Set custom parameters (for example, [Codefresh variables][6]) when a pipeline is triggered. |
| [Pipeline failure reasons][10] | Pipeline failure reasons | Identify pipeline failure reasons from error messages. |

## Configure the Datadog integration

To set up the Datadog integration for [Codefresh][1]:

1. Go to **[Account Settings > Configuration > Integrations][2]** in Codefresh and click **CONFIGURE** on the Datadog row.
2. Click **ADD INTEGRATION**.
3. Fill the form with the following information:
   * **Datadog site**: Select {{< region-param key="dd_site" code="true" >}} from the dropdown.
   * **Token**: Add your [Datadog API Key][3].
4. Click **SAVE** to save the integration.

## Visualize pipeline data in Datadog

The [**CI Pipeline List**][4] and [**Executions**][5] pages populate with data after the pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://codefresh.io/
[2]: https://g.codefresh.io/account-admin/account-conf/integration/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://codefresh.io/docs/docs/codefresh-yaml/variables/#user-provided-variables
[7]: /glossary/#partial-retry
[8]: /glossary/#manual-step
[9]: /glossary/#parameter
[10]: /glossary/#pipeline-failure