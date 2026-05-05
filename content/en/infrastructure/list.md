---
title: Host List
aliases:
  - /hostnames
  - /graphing/infrastructure/list/
further_reading:
- link: "/infrastructure/hostmap/"
  tag: "Documentation"
  text: "Host Map"
- link: "/infrastructure/livecontainers/"
  tag: "Documentation"
  text: "Container Map"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Live Process Monitoring"
---

## Overview

The Host List gives you a live inventory of all hosts reporting to Datadog through the Agent or cloud integrations. By default, it shows hosts with activity in the last 15 minutes, with an option to switch to a live view. To open the Host List, navigate to [**Infrastructure > Hosts**][10] in Datadog. This list should not be used to estimate your infrastructure host billing. See the [billing][11] page to learn about billing.

This page describes the default view of the Host List. To switch to the **Legacy** view, click the toggle in the upper-right corner.

{{< img src="infrastructure/index/infra-list-overview.png" alt="The Host List with a filter panel on the left and a list of hosts with customizable columns." style="width:100%;">}}

## Filter and search

Use the filter panel on the left to narrow the list of hosts:

- **My Teams**: Toggle on to show only hosts associated with your teams.
- **Quick filters**: Use the checkboxes at the top of the panel to filter by cloud provider (AWS, Azure, Google Cloud, Oracle, or Alibaba Cloud), telemetry source (Datadog Agent or OpenTelemetry), operating system (Windows, Linux, or Darwin), or hardware (GPU).
- **Filter Metrics**: Select a metric and define a value range to filter hosts by metric value.
- **Search facets**: Filter by any host property or tag, such as Cloud Provider, Env, Region, Resource Type, Instance Type, OS, OS Version, Agent, or Docker Version.

You can also use the search box at the top of the list to filter hosts with the [Datadog search syntax][16].

{{< img src="infrastructure/index/infra-list-filter-panel.png" alt="The Host List filter panel with quick filter checkboxes, a Filter Metrics section, and a search facets section." style="width:100%;">}}

## Save views

To save your filter and column configuration as a view, click **My View** in the upper-left corner, and then click **Save as new view**. Saved views are accessible from the **My View** panel, where you can filter, sort, and edit them. Star a view to mark it as a favorite.

{{< img src="infrastructure/index/infra-list-views.png" alt="The My View panel with options to save, filter, sort, and edit saved views." style="width:100%;">}}

## Customize columns

To add, remove, or reorder columns, click **Columns** above the host list. You can add any of the following as a column:

- **Host Attributes**: Properties of the host, such as hostname or status.
- **Tags**: Any tag applied to the host.
- **Metrics**: Any metric reported by the host.

Drag a column to reorder it. To resize a column, drag its right edge. To hide a column, toggle it off.

{{< img src="infrastructure/index/infra-list-columns.png" alt="The column customization panel with sections for Host Attributes, Tags, and Metrics, and toggles to show or hide each column." style="width:100%;">}}

The following columns combine multiple datapoints into a single column:

- **Configurations**: The cloud provider, operating system, and Datadog Agent installation status for each host.
- **Software**: The host's web server, database, cache, and container orchestrator (such as Docker or Kubernetes), if detected.
- **Integrations**: The Datadog Agent integrations enabled on the host. This column is similar to the **Apps** column in the legacy view, but it includes only Agent integrations, not custom metrics reported from the host.

## Inspect a host

Click any host to open its detail panel, which includes:

- [Hostnames and aliases](#hostnames-and-aliases)
- [Tags][2]
- [Metrics][3]
- [Containers][4]
- [Logs][5] (if enabled)
- [Agent configuration](#agent-configuration) (if enabled)
- [OpenTelemetry Collector configuration](#opentelemetry-collector-configuration) (if enabled)

{{< img src="infrastructure/index/infra-list-side-panel.png" alt="The host detail side panel with tabs for Host Summary, Metrics, Containers, Processes, and other host data." style="width:100%;">}}

The detail panel uses the [Resource Catalog][15] side panel.

### Hostnames and aliases

The Datadog Agent collects potential hostnames from several different sources. For more details, see [How does Datadog determine the Agent hostname?][1].

**Note**: Hostnames should be unique within a Datadog account. Otherwise, you may experience inconsistencies on your host graphs.

When there are multiple uniquely identifiable names for a single host, Datadog creates aliases for those host names. The names collected by the Agent are added as aliases for the chosen canonical name. For example, a single host running in EC2 might have an instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (`myhost.mydomain`).

{{< img src="infrastructure/index/infra-list-alias2.png" alt="Host aliases" style="width:100%;">}}

### Agent configuration

You can view and manage Agent configurations across your entire infrastructure using [Fleet Automation][12].

To view Agent configurations:
1. Click **Open Host** in the top-right corner of the host detail panel.
2. Select **View Agent Configurations** from the dropdown menu to go directly to Fleet Automation.

{{< img src="infrastructure/index/infra-list-config-4.png" alt="View Agent configurations in Fleet Automation" style="width:100%;">}}

### OpenTelemetry Collector configuration

When the [Datadog Extension][14] is configured with your OpenTelemetry Collector, you can view Collector configuration and build information directly in the host detail panel. The Datadog Extension provides visibility into your Collector fleet from within the Datadog interface, helping you manage and debug your OpenTelemetry Collector deployments.

To view OpenTelemetry Collector configurations:
1. Click a host running the OpenTelemetry Collector in the Host List.
2. In the host detail panel, select the **OTel Collector** tab to view the build information and complete Collector configuration.

For detailed setup instructions and requirements, such as hostname matching and pipeline configuration, see the main [Datadog Extension documentation][14].

{{< img src="infrastructure/index/infra-list-config-otel.png" alt="View OpenTelemetry Collector configurations in the Host List" style="width:100%;">}}

## Export

Click **Export** above the host list to download a copy. For a JSON-formatted list of your hosts reporting to Datadog, you can also use one of the following:

* The **JSON API permalink** at the top of the Host List.
* The [search hosts API endpoint][7]. See the [developer guide][8] for an example.

### Agent version

It may be useful to audit your Agent versions to confirm you are running the latest version. To do this, use the [get_host_agent_list script][9], which uses the JSON permalink to output the Agents that are running with version numbers. There is also a `json_to_csv` script to convert the JSON output into a CSV file.

### No Agent

Another use case of the JSON export would be to get a list of Amazon EC2 (excluding RDS) instances with no Agent installed. These instances appear in the Host List by setting up your AWS account in the Datadog AWS integration tile. See the Python3 script below:

```python
# 3p
import requests

# stdlib
import json
import pprint
import os

api_key = os.environ['DD_API_KEY']
app_key = os.environ['DD_APP_KEY']

url = "https://app.datadoghq.com/reports/v2/overview?\
window=3h&with_apps=true&with_sources=true&with_aliases=true\
&with_meta=true&with_tags=true&api_key=%s&application_key=%s"

infra = json.loads(requests.get(url %(api_key,app_key)).text)

for host in infra['rows']:
    if (('aws' in host['apps']) and ('rds' not in host['apps']) and ('agent' not in host['apps'])):
        try:
            print(f'HOST: {host["name"]} - TAGS: {host["tags_by_source"]}')
        except:
            pass
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/how-datadog-agent-determines-the-hostname/
[2]: /getting_started/tagging/
[3]: /metrics/
[4]: /infrastructure/livecontainers/?tab=helm#overview
[5]: /logs/
[6]: /agent/configuration/agent-configuration-files/
[7]: /api/v1/hosts/#get-the-total-number-of-active-hosts
[8]: /extend/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://app.datadoghq.com/infrastructure
[11]: https://docs.datadoghq.com/account_management/billing/
[12]: https://app.datadoghq.com/release-notes/fleet-automation-is-now-generally-available
[13]: /agent/fleet_automation
[14]: /opentelemetry/integrations/datadog_extension/
[15]: /infrastructure/resource_catalog/
[16]: /getting_started/search/
