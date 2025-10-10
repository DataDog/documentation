---
title: Set up Tracing on Codefresh Pipelines
aliases:
  - /continuous_integration/setup_pipelines/codefresh
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

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
| [Filter CI Jobs on the critical path][12] | Filter CI Jobs on the critical path | Filter by jobs on the critical path. |
| [Execution time][13] | Execution time  | View the amount of time pipelines have been running jobs. |

## Configure the Datadog integration

To set up the Datadog integration for [Codefresh][1]:

1. Go to **[Account Settings > Configuration > Integrations][2]** in Codefresh and click **Configure** on the Datadog row.
2. Click **Add Integration**.
3. Fill the form with the following information:
   * **Datadog site**: Select `{{< region-param key="dd_site" code="true" >}}` from the dropdown.
   * **Token**: Add your [Datadog API key][3].
4. Click **Save** to save the integration.

## Visualize pipeline data in Datadog

The [**CI Pipeline List**][4] and [**Executions**][5] pages populate with data after the pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository. For more information, see [Search and Manage CI Pipelines][11].

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
[11]: /continuous_integration/search/#search-for-pipelines
[12]: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[13]: /glossary/#pipeline-execution-time
