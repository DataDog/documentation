---
title: Saved Views
kind: documentation
further_reading:
- link: "/continuous_integration/explorer/search_syntax/"
  tag: "Documentation"
  text: "Learn how to create a search query"
---

## Overview

Saved views allow you to save the state of the [CI Visibility Explorer][2] ([**Executions**][3] and [**Test Runs** pages][1]) and enable effective troubleshooting by providing you with quick access to scoped queries, relevant facets, visualization options, and the time range. 

Saved views can keep track of your:

- Pipeline executions and test runs
- Search queries (such as failed jobs or flaky tests)
- Column sort order
- Live time range (such as the past hour or the past week)
- Visualizations (such as a timeseries, toplist, table, or funnel graph)
- Subset of facets

You can also use saved views to share common queries and configurations with your teammates.

## Saved views

To access your saved views, expand **> Views** to the left in the [CI Visibility Explorer][1].

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. Click **Save** to create a custom saved view from the current content in your Explorer.

{{< tabs >}}
{{% tab "Test Runs" %}}

  {{< img src="continuous_integration/saved-view-test-runs.png" alt="Access Saved Views by clicking the tab to the left of CI Visibility" width="45%" >}}

{{% /tab %}}
{{% tab "Pipeline Executions" %}}

  {{< img src="continuous_integration/saved-view-pipelines-executions.png" alt="Access Saved Views by clicking the tab to the left of CI Visibility" width="40%" >}}

[1]: /agent/configuration/agent-commands/

{{% /tab %}}
{{< /tabs >}}

You can:

- Load or reload a saved view
- Update a saved view with the current view's configuration
- Rename or delete a saved view
- Share a saved view through a short link
- Favorite a saved view to add it to your Saved Views list accessible in the navigation menu

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

## Default views

You can set a saved view to be your default landing page in the [CI Visibility Explorer][2]. Default views are set per user and have no impact on your organization. 

Temporarily override your default saved view by completing an action in the UI or opening links in the Explorer that embeds a different configuration.

In the default view entry in the **Views** panel, you can:

- Click on the entry to reload your default view
- Update your default view with the current parameters
- Reset your default view back to the default setting for a fresh restart

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-runs
[2]: /continuous_integration/explorer/
[3]: https://app.datadoghq.com/ci/pipeline-executions