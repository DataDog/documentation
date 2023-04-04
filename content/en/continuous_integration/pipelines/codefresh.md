---
title: Set up Tracing on Codefresh Pipelines
kind: documentation
aliases:
  - /continuous_integration/setup_pipelines/codefresh
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

- **Partial pipelines**: View partially retried and downstream pipeline executions

- **Manual steps**: View manually triggered pipelines

- **Parameters**: Set custom parameters (for example, [Codefresh variables][6]) when a pipeline is triggered 

- **Pipeline failure reasons**: Identify pipeline failure reasons from error messages

## Configure the Datadog integration

The steps to activate the Datadog integration for [Codefresh][1] are:

1. Go to **[Account Settings > Configuration > Integrations][2]** in Codefresh and click **CONFIGURE** on the Datadog row.
2. Click **ADD INTEGRATION**.
3. Fill the form with the following information:
   * **Datadog site**: Select {{< region-param key="dd_site" code="true" >}} from the dropdown.
   * **Token**: Add your [Datadog API Key][3].
4. Click **SAVE** to save the integration.

## Visualize pipeline data in Datadog

The [Pipelines][4] and [Pipeline Executions][5] pages populate with data after the pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://codefresh.io/
[2]: https://g.codefresh.io/account-admin/account-conf/integration/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://codefresh.io/docs/docs/codefresh-yaml/variables/#user-provided-variables
