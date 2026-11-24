
---
title: Filtering for Custom Metrics
description: "Filter out unused custom metrics at the Datadog Agent to reduce ingested and indexed volume, or server-side to reduce indexed volume."
aliases:
- /metrics/guide/agent-filtering-for-dogstatsd-custom-metrics/
- /metrics/guide/agent-filtering-for-custom-metrics/
further_reading:
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Learn more about Custom Metrics"
- link: "/account_management/billing/custom_metrics/?tab=countrate"
  tag: "Documentation"
  text: "Custom Metrics Billing"
- link: "/metrics/guide/tag-indexing-rules/"
  tag: "Documentation"
  text: "Tag Indexing Rules"
- link: "/metrics/metrics-without-limits/"
  tag: "Documentation"
  text: "Metrics without Limits™"
- link: "/metrics/catalog/"
  tag: "Documentation"
  text: "Metrics Catalog"
- link: "https://www.datadoghq.com/blog/custom-metrics-governance/"
  tag: "Blog"
  text: "Best practices for end-to-end custom metrics governance"
---
{{< callout url="#" header="false" btn_hidden="true" >}}
Agent-side and server-side filtering for custom metrics are in Preview.
{{< /callout >}}

## Overview

Use metric filtering to drop unused or unwanted custom metrics. You manage filtering rules centrally in Datadog, and Datadog applies them at two points:

- **Agent-side filtering** drops metrics from DogStatsD and Agent integrations at the Datadog Agent, before the Agent sends them to Datadog. This reduces both ingested and indexed custom metric volume.
- **Server-side filtering** drops metrics in the Datadog intake pipeline, before they're indexed. It applies to custom metrics from any source, including the API. This reduces indexed custom metric volume, but not ingested volume.

You can use both types of filtering together. Server-side filtering covers metrics that still reach Datadog. For example, it covers metrics from Agents that don't apply Agent-side rules, and metrics that don't pass through an Agent. To reduce both ingested and indexed volume, use Agent-side filtering for metrics from DogStatsD and Agent integrations.

Creating and updating filtering rules requires the [`metric_tags_write`][1] RBAC permission. All users can view filtering rules.

## Prerequisites

These prerequisites apply only to Agent-side filtering.

- Upgrade to Datadog Agent v7.67.0 or higher.
    - Using v7.70.0 or higher is recommended to filter DogStatsD metrics.
    - Using v7.74.0 or higher is required for Agent integration metrics.
- With [`org_management`][2] permissions, enable [Remote Configuration][3] for your organization.
- With [`api_keys_write`][4] permissions, enable the [Remote Configuration capability on the API keys][5] used by your Agents. After enabling Remote Configuration on an API key, restart your Agents for the change to take effect.

{{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}

## Create a metric filtering rule

You can create a metric filtering rule from the [Metrics Settings page][6] or the [Metrics Catalog page][7].

Agent-side rules apply to all Agents v7.67.0 or higher (v7.74.0 or higher for Agent integration metrics) with Remote Configuration enabled. Older Agents and Agents with Remote Configuration disabled don't apply Agent-side rules. Server-side rules can filter metrics from these Agents.

Agent-side rule updates are deployed to Agents in 1-2 minutes.

### Create a rule from the Metrics Settings page

1. Click {{< ui >}}\+ Create Rule{{< /ui >}}.
2. Click {{< ui >}}Metric Name Filtering{{< /ui >}}.
3. Enter a name for the rule.
4. Select the metrics to filter from the {{< ui >}}Metrics to Filter{{< /ui >}} dropdown. To add metrics from a CSV file instead, click {{< ui >}}Upload CSV{{< /ui >}}, select the file, and click {{< ui >}}Open{{< /ui >}}. You can upload multiple CSV files.
5. Click {{< ui >}}Create Rules{{< /ui >}}.
6. Review the confirmation dialog and click {{< ui >}}Create Rules{{< /ui >}} again.

<!-- SCREENSHOT: Create rule form (Metric Name Filtering), captured with prefix filtering off -->

### Create a rule from the Metrics Catalog page

1. Click {{< ui >}}Actions{{< /ui >}}.
2. Click {{< ui >}}Manage Metric Name Filtering Rules{{< /ui >}}.
3. Open the dropdown and click {{< ui >}}New Rule{{< /ui >}}. Enter a name for the rule.
4. Select the metrics to filter from the {{< ui >}}Metrics to Filter{{< /ui >}} dropdown. To add metrics from a CSV file instead, click {{< ui >}}Upload CSV{{< /ui >}}, select the file, and click {{< ui >}}Open{{< /ui >}}. You can upload multiple CSV files.
5. Click {{< ui >}}Create Rules{{< /ui >}}.
6. Review the confirmation dialog and click {{< ui >}}Create Rules{{< /ui >}} again.

### How Datadog creates Agent-side and server-side rules

Depending on your environment, Datadog creates one or two rules:

- **Two rules**: An Agent-side rule and a server-side rule, which share the same name. The server-side rule includes all of the metric names you selected. The Agent-side rule includes the selected metric names up to the Agent-side limit of 10,000 names. Metrics beyond that limit are filtered only server-side.
- **One rule**: A server-side rule only. Datadog creates one rule when Remote Configuration isn't enabled for your organization or no Agents are connected.

For example, if you select 20,000 metric names:

- The Agent-side rule includes 10,000 metric names.
- The server-side rule includes all 20,000 metric names.

The 10,000 metric names that are only in the server-side rule are still ingested, but they're filtered before indexing.

<!-- SCREENSHOT: Confirmation dialog for a two-rule create -->

### Verify the created rules

After you create rules, confirm that each rule includes the metrics you expect. If Datadog created two rules, review each one. On the [Metrics Settings page][6], Agent-side rules are under {{< ui >}}Ingestion Controls{{< /ui >}} > {{< ui >}}Metric Name Filtering (Agent){{< /ui >}}. Server-side rules are under {{< ui >}}Indexing Controls{{< /ui >}} > {{< ui >}}Metric Name Filtering (Server Side){{< /ui >}}.

For Agent-side rules, also confirm that the rule reached your Agents:

1. Under {{< ui >}}Active Rules{{< /ui >}}, expand {{< ui >}}Ingestion Controls{{< /ui >}} > {{< ui >}}Metric Name Filtering (Agent){{< /ui >}}.
2. Check the deployment status next to the rule name.
3. Click the rule to see the percentage of Agents that the rule is deployed to.

<!-- SCREENSHOT: Metrics Settings, Active Rules with Ingestion Controls and Indexing Controls expanded, showing a deployment status pill -->

## Edit a metric filtering rule

You can edit a metric filtering rule from the [Metrics Settings page][6]. Editing a rule changes only that rule. If Datadog created an Agent-side rule and a server-side rule with the same name, edit each one to change both.

1. Under {{< ui >}}Active Rules{{< /ui >}}, expand the section for the rule type:
   - **Agent-side rules**: {{< ui >}}Ingestion Controls{{< /ui >}} > {{< ui >}}Metric Name Filtering (Agent){{< /ui >}}
   - **Server-side rules**: {{< ui >}}Indexing Controls{{< /ui >}} > {{< ui >}}Metric Name Filtering (Server Side){{< /ui >}}
2. Click the rule to edit.
3. Click {{< ui >}}Edit{{< /ui >}} in the upper-right corner.
4. Add metrics from the {{< ui >}}Metrics to Filter{{< /ui >}} dropdown. To add metrics from a CSV file instead, click {{< ui >}}Upload CSV{{< /ui >}}, select the file, and click {{< ui >}}Open{{< /ui >}}. Remove any metrics you no longer want the rule to filter.
5. Click {{< ui >}}Edit Rule{{< /ui >}}.
6. Review the confirmation dialog and click {{< ui >}}Filter Metrics{{< /ui >}}.

## View all rules and filtered metrics

You can view all your filtering rules and filtered metrics from the [Metrics Settings page][6].

### View all filtering rules

To see Agent-side rules, expand {{< ui >}}Ingestion Controls{{< /ui >}} > {{< ui >}}Metric Name Filtering (Agent){{< /ui >}} under {{< ui >}}Active Rules{{< /ui >}}. To see server-side rules, expand {{< ui >}}Indexing Controls{{< /ui >}} > {{< ui >}}Metric Name Filtering (Server Side){{< /ui >}}.

Click a rule to open its details, where you can edit or delete it.

### View all filtered metrics

Select the {{< ui >}}Filtered Metrics{{< /ui >}} tab in the sidebar to see a list of all your filtered metrics. The {{< ui >}}Attached Rules{{< /ui >}} column lists the rules that filter each metric and shows whether each rule is Agent-side or server-side.

Click a rule in the {{< ui >}}Attached Rules{{< /ui >}} column to edit or delete it.

<!-- SCREENSHOT: Filtered Metrics tab with the Attached Rules column -->

## Delete a metric filtering rule

You can delete metric filtering rules from the [Metrics Settings page][6].

**Note**: Deleting a rule doesn't stop filtering a metric if another rule also filters it. To stop filtering a metric, check all of its attached rules, both Agent-side and server-side, in the [View all filtered metrics](#view-all-filtered-metrics) section. If Datadog created an Agent-side rule and a server-side rule with the same name, delete both to stop filtering those metrics.

1. Click the rule to delete. Agent-side rules are under {{< ui >}}Ingestion Controls{{< /ui >}}, and server-side rules are under {{< ui >}}Indexing Controls{{< /ui >}}.
2. In the upper-right corner, open the dropdown next to {{< ui >}}Edit{{< /ui >}} and click {{< ui >}}Delete rule{{< /ui >}}.
3. In the confirmation dialog, click {{< ui >}}Confirm{{< /ui >}}.

<!-- SCREENSHOT: Delete rule option in the rule details dropdown -->

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

### Update a filtered metric rule (partial update)

The base URL for your selected [Datadog site][9] is: {{<region-param key="dd_api" code="true">}}

Substitute `<BASE_URL>` in the example below with the base URL.

**PATCH** `<BASE_URL>/api/unstable/remote_config/products/metric_control/rules/{rule-id}`

Use `metrics_to_add` and `metrics_to_remove` to change a rule's metric list without replacing it. Send both attributes, and use an empty array for the one you don't need. Metric names must match exactly, so list each variant of a metric individually, such as `.count`, `.avg`, and `.95percentile`.

`{rule-id}` is the `id` returned by the request in the [List filtered metric policies](#list-filtered-metric-policies) section.

#### Example body

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "rule",
    "attributes": {
      "rule_name": "my rule",
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

#### Example response body

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "id": "abc-123-def",
    "type": "rule"
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

The Preview release has the following limitations.

### Agent-side filtering

- A maximum of 10,000 metric names can be filtered.
- Agent-side filtering uses up to 10 MB of additional memory (resident set size, RSS) and doesn't increase CPU usage.
- Only custom metrics received from DogStatsD or Agent integrations are supported.

### Server-side filtering

- A maximum of 150,000 metric names can be filtered.
- Custom metrics from any source are supported, including metrics submitted through the API.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#metrics
[2]: /account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/metric/settings/rules
[7]: https://app.datadoghq.com/metric/catalog
[8]: /api/latest/#getting-started
[9]: /getting_started/site/
