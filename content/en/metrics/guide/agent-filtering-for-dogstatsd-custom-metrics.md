
---
title: Agent-Side Filtering for Custom Metrics
further_reading:
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Learn more about Custom Metrics"
- link: "/account_management/billing/custom_metrics/?tab=countrate"
  tag: "Documentation"
  text: "Custom Metrics Billing"
- link: "/metrics/metrics-without-limits/"
  tag: "Documentation"
  text: "Metrics without Limits™"
- link: "/metrics/volume/"
  tag: "Documentation"
  text: "Metrics Volume Management"
- link: "https://www.datadoghq.com/blog/custom-metrics-governance/"
  tag: "Blog"
  text: "Best practices for end-to-end custom metrics governance"
---

{{< callout url="https://www.datadoghq.com/" btn_hidden="true" header="false" >}}
Agent-side filtering for custom metrics is in Preview.
{{< /callout >}} 

## Overview

Agent-side filtering enables you to filter out unused or unwanted custom metrics (both from DogStatsD and Agent checks) directly at the Datadog Agent, before sending them to Datadog. This can significantly reduce both indexed and ingested custom metric volume.

Filtering is performed at the Agent level but centrally managed through the Datadog UI, giving teams full visibility and control. You can create, update, and manage filtering policies in Datadog, streamlining metric governance while maintaining transparency.

Creating and updating filtering policies requires the [`metric_tags_write`][1] RBAC permission. All users can view filtering policies.

## Prerequisites

- Upgrade to Datadog Agent v7.67.0 or higher (v7.70.0 or higher is recommended).
- With [`org_management`][2] permissions, enable [Remote Configuration][3] for your organization.
- With [`api_keys_write`][4] permissions, enable the [Remote Configuration capability on the API keys][5] used by your Agents. After enabling Remote Configuration on an API key, restart your Agents for the change to take effect.

{{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}

## Create a metric filtering policy

You can create a metric filtering policy from the [Metrics Settings page][7] or the [Metrics Summary page][6].

Metric filtering policies are applied to all Agents v7.67.0+ with Remote Configuration enabled. Older Agent versions, or Agents with Remote Configuration disabled, do not apply filtering policies.

Policy updates are deployed to Agents in 1-2 minutes.

### From the Metrics Settings page

1. Click **+ Create Policy**.
2. Click **Filter metrics**.
3. Provide a description for the new policy.
4. Select the metrics to filter from the **Metrics to Filter** dropdown, or click **Upload CSV**.
   - If you choose to upload a CSV, select the file and click **Open**. You can use multiple CSVs to create the policy.
5. When you're satisfied with the list of metrics to filter, click **Save and Filter**.

### From the Metrics Summary page

Create a metric filtering policy from the Metrics Summary page using any of the following methods:

{{< tabs >}}
{{% tab "From a metric query" %}}

1. Enter a metric query in the search bar.
2. Click the three vertical dots button on the right-hand side of the screen.
3. Click **Filter metrics**.
4. In the **Choose policy** dropdown, click **New Policy**. Provide a description for the policy.
5. Review the **Metrics to Filter**. Click `X` on the right side of any row to remove a metric from the list, or click `+ Include More Metrics` to add metrics to the list.
6. Click **Save and Filter**.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_from_metric_query.mp4" alt="Creating a metric filtering policy from a metric query" video="true" >}}

{{% /tab %}}
{{% tab "From the policy editor" %}}

1. Click the three vertical dots button on the right-hand side of the screen.
2. Click **Filter metrics**.
3. In the **Choose policy** dropdown, click **New Policy**. Provide a description for the policy.
4. Enter a metric query in the **Metrics to Filter** field, or select metrics individually from the dropdown. Click `X` on the right side of any row to remove a metric from the list.
5. Click **Save and Filter**.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_policy_editor.mp4" alt="Creating a metric filtering policy from the policy editor" video="true" >}}

{{% /tab %}}
{{% tab "From CSV upload" %}}

1. Click the three vertical dots button on the right-hand side of the screen.
2. Click **Filter metrics**.
3. In the **Choose policy** dropdown, click **New Policy**. Provide a description for the policy.
4. Click **Upload CSV** to the right of the **Metrics to Filter** field.
5. Select the CSV file, and click **Open**.
6. Review the metrics listed. Click `X` on the right side of any row to remove a metric from the list. If needed, upload additional CSV files, or add metrics through the **Metrics to Filter** field.
7. Click **Save and Filter**.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_csv_upload.mp4" alt="Creating a metric filtering policy with a CSV file upload" video="true" >}}

{{% /tab %}}
{{< /tabs >}}

## Edit a metric filtering policy

You can edit a metric filtering policy from the [Metrics Settings page][1] or the [Metrics Summary page][2].

### From the Metrics Settings page

1. Click the policy to edit.
2. Click **Edit**.
3. Select the metrics to filter from the **Metrics to Filter** dropdown, or click **Upload CSV**.
   - If you choose to upload a CSV, select the file and click **Open**.
4. Click **Save and Filter**.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_from_metrics_settings.mp4" alt="Editing a metric filtering policy from the Metrics Settings page" video="true" >}}

### From the Metrics Summary page

Edit a metric filtering policy from the Metrics Summary page using any of the following methods:

{{< tabs >}}
{{% tab "From a metric query" %}}

1. Enter a metric query in the search bar.
2. Click the three vertical dots button on the right-hand side of the screen.
3. Click **Filter metrics**.
4. In the **Choose policy** dropdown, select the policy to edit.
5. Review the **Metrics to Filter** and **Existing metrics in policy** lists. Click `X` on the right side of any row to remove a metric from the list, or click `+ Include More Metrics` to add metrics to the list.
6. Click **Save and Filter**.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_with_metric_query.mp4" alt="Editing a metric filtering policy with a metric query" video="true" >}}

{{% /tab %}}
{{% tab "From the policy editor" %}}

1. Click the three vertical dots button on the right-hand side of the screen.
2. Click **Filter metrics**.
3. In the **Choose policy** dropdown, select the policy to edit.
4. Select metrics individually from the **Metrics to Filter** dropdown. Click `X` on the right side of any row to remove a metric from the list.
5. Click **Save and Filter**.

{{% /tab %}}
{{% tab "From CSV upload" %}}

1. Click the three vertical dots button on the right-hand side of the screen.
2. Click **Filter metrics**.
3. In the **Choose policy** dropdown, select the policy to edit.
4. Click **Upload CSV** to the right of the **Metrics to Filter** field.
5. Select the CSV file, and click **Open**.
6. Review the **Metrics to Filter** and **Existing metrics in policy** lists. Click `X` on the right side of any row to remove a metric from the list, or click `+ Include More Metrics` to add metrics to the list.
7. Click **Save and Filter**.

{{% /tab %}}
{{< /tabs >}}

## View all policies and filtered metrics

You can view all your policies and filtered metrics from the [Metrics Settings page][1].

**Click on the [settings button][1]**: 

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_summary.png" alt="The settings button on the metric summary page" style="width:100%;" >}}

**Click on Metrics in the navigation bar** and go straight to settings:

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_nav.png" alt="The settings option from the expanded Metrics panel in Datadog" style="width:100%;" >}}

### View all policies

Select the **Policies** tab from the sidebar to see a list of all your policies. If you don't see the sidebar, click the **Show Sidebar** button {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" alt="The Show Sidebar button" inline="true" >}}.

Click on any metric filtering policy to open its detail view for edits or deletion.

### View all filtered metrics

Select the **Filtered Metrics** tab from the sidebar to see a list of all your filtered. If you don't see the sidebar, click the **Show Sidebar** button {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" alt="The Show Sidebar button" inline="true" >}}.

Click on a filtered metric's attached policies in the **ATTACHED POLICIES** column for edits or deletion.

## Delete policies

You can delete metric filtering policies from the [Metrics Settings page][1].

1. Click on the metric filtering policy to delete.
2. Select **Delete** in the top-right corner of the page.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/delete_policy.png" alt="The delete policy button on a metric filtering policy detail view" style="width:100%;" >}}

## Manage metric filtering policies through the API

<div class="alert alert-danger">These endpoints are subject to change while Agent-side filtering for custom metrics is in Preview.</div>

These endpoints require a valid Datadog API key and application key. See [Getting started][8] in the API Reference for more information.

### Create a filtered metric policy

The base URL for your selected [Datadog site][9] is: {{<region-param key="dd_api" code="true">}}

Substitute `<BASE_URL>` in the example below with the base URL.

**POST** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### Example body

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.one",
        "metric.name.two"
      ]
    }
  }
}
{{< /code-block >}}

### Update a filtered metric policy (partial update)

The base URL for your selected [Datadog site][9] is: {{<region-param key="dd_api" code="true">}}

Substitute `<BASE_URL>` in the example below with the base URL.

**PATCH** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Example body

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metrics_to_add": [
        "metric.name.three",
        "metric.name.four"
      ],
      "metrics_to_remove": [
        "metric.name.five",
        "metric.name.six"
      ]
    }
  }
}
{{< /code-block >}}

### Update a filtered metric policy (full replace)

The base URL for your selected [Datadog site][9] is: {{<region-param key="dd_api" code="true">}}

Substitute `<BASE_URL>` in the example below with the base URL.

**PUT** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Example body

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.seven",
        "metric.name.eight"
      ]
    }
  }
}
{{< /code-block >}}

### Delete a policy

The base URL for your selected [Datadog site][9] is: {{<region-param key="dd_api" code="true">}}

Substitute `<BASE_URL>` in the example below with the base URL.

**DELETE** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

### Get a filtered metric policy

The base URL for your selected [Datadog site][9] is: {{<region-param key="dd_api" code="true">}}

Substitute `<BASE_URL>` in the example below with the base URL.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Example response body

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
  "data": [
    {
      "type": "filtered_metrics",
      "id": "metric.name.one",
      "attributes": {
        "updated_timestamp": 1745954352
      }
    },
    {
      "type": "filtered_metrics",
      "id": "metric.name.two"
      "attributes": {
        "updated_timestamp": 1745954389
      }
    }
    // ... up to ~10,000 entries
  ],
  "links": {
    "self": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=200&page[limit]=100",
    "next": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=300&page[limit]=100",
    "prev": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=100&page[limit]=100",
    "first": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=0&page[limit]=100",
    "last": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=9900&page[limit]=100"
  },
  "meta": {
    "agent_coverage_percent": 100,
    "agents_with_latest_policy_count": 4,
    "deployment_failure": {
        "failed_agent_count": 0,
        "failure_message": ""
    },
    "deployment_status": "Deployed to all Agents",
    "deployment_strategy": "all",
    "policy_name": "test_policy_1",
    "total": 7,
    "total_agent_count": 4,
    "updated_by": "user@datadoghq.com",
    "updated_timestamp": 1758912365
  }
}
{{< /code-block >}}

### List filtered metric policies

The base URL for your selected [Datadog site][9] is: {{<region-param key="dd_api" code="true">}}

Substitute `<BASE_URL>` in the example below with the base URL.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### Example response body

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
    "data": [
        {
            "id": "06b-fab-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 85,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy one",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547485,
                "version": 4            
            }
        },
        {
            "id": "07b-201-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 8,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy two",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547212,
                "version": 1
            }
        }
    ]
}
{{< /code-block >}}

## Preview limitations

This initial preview release includes the following limitations:

- A maximum of 10,000 metric names can be filtered out.
- Resource usage impact on the Agent is limited to up to 10MB of memory (RSS), and no increase to CPU usage.
- Only custom metrics received from either DogStatsD or Agent checks are supported.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#metrics
[2]: /account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/settings/policies                                            
[8]: /api/latest/#getting-started
[9]: /getting_started/site/

