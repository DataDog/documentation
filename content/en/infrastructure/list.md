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

The Host List gives you a live inventory of all hosts reporting to Datadog through the Agent or cloud integrations. By default, it shows hosts with activity in the last 15 minutes. To open the Host List, navigate to [**Infrastructure > Hosts**][10] in Datadog.

This page describes the **New** view of the Host List. To switch to the **Legacy** view, use the toggle in the upper-right corner.

{{< img src="infrastructure/index/infra-list-overview-2.png" alt="The Host List with a filter panel on the left and a list of hosts with customizable columns." style="width:100%;">}}

**Note**: This list should not be used to estimate your infrastructure host billing. See the [billing][11] page for details.

## Filter and search

Use the filter panel on the left to narrow the list of hosts:

- **My Teams**: Toggle on to show only hosts associated with your teams.
- **Quick filters**: Use the checkboxes at the top of the panel to filter by cloud provider (AWS, Azure, Google Cloud, Oracle, or Alibaba Cloud), telemetry source (Datadog Agent or OpenTelemetry), operating system (Windows, Linux, or Darwin), or hardware (GPU).
- **Filter Metrics**: Select a metric and define a value range to filter hosts by metric value.
- **Search facets**: Filter by any host property or tag, such as Cloud Provider, Env, Region, Resource Type, Instance Type, OS, OS Version, Agent, or Docker Version.

You can also use the search box at the top of the list to filter hosts using the [Datadog search syntax][16].

## Customize columns

To add, remove, or reorder columns, click **Columns** above the Host List. You can add any of the following as a column:

- **Host Attributes**: Properties of the host, such as hostname or status.
- **Tags**: Any tag applied to the host.
- **Metrics**: Any metric reported by the host.

To reorder a column, drag it to a new position. To resize, drag its right edge. To hide, toggle it off.

{{< img src="infrastructure/index/infra-list-columns.png" alt="The column customization panel with sections for Host Attributes, Tags, and Metrics, and toggles to show or hide each column." style="width:100%;">}}

### Combined columns

The Host List includes three columns that combine multiple datapoints:

- **Configurations**: The cloud provider, operating system, and Datadog Agent installation status for each host.
- **Software**: The host's web server, database, cache, and container orchestrator (such as Docker or Kubernetes), if detected.
- **Integrations**: The Datadog Agent integrations enabled on the host.

## Saved views

To save your filter and column configuration, open the **Views** panel in the upper-left corner and click **Save as new view**. From this panel, you can filter, sort, edit, and star saved views.

{{< img src="infrastructure/index/infra-list-views.png" alt="The Views panel with options to save, filter, sort, and edit saved views." style="width:40%;">}}

## Inspect a host

Click any host to open its detail panel, which is the same side panel used by the [Resource Catalog][15]. The panel includes:

- [Hostnames and aliases](/agent/faq/how-datadog-agent-determines-the-hostname/#host-aliases)
- [Tags][2]
- [Metrics][3]
- [Containers][4]
- [Logs][5] (if enabled)
- [Agent configuration](#agent-configuration) (if enabled)
- [OpenTelemetry Collector configuration](#opentelemetry-collector-configuration) (if enabled)

{{< img src="infrastructure/index/infra-list-side-panel.png" alt="The host detail side panel with sections for Host Summary, Metrics, Containers, Processes, and other host data." style="width:100%;">}}

### Agent configuration

To view a host's Agent configuration, click the host to open the side panel, and then scroll to the **Agent** section. To view and manage Agent configurations across your entire infrastructure, use [Fleet Automation][12].

{{< img src="infrastructure/index/infra-list-agent-config.png" alt="The Agent section of the host side panel showing the Agent configuration in JSON format." style="width:100%;">}}

### OpenTelemetry Collector configuration

When you configure the [Datadog Extension][14] with your OpenTelemetry Collector, you can view Collector configuration and build information directly in the host detail panel. The extension also lets you manage and debug your Collector deployments from Datadog.

To view a host's OpenTelemetry Collector configuration, click the host to open the side panel. Scroll to the **OTel Collector** section to see the build information and complete Collector configuration. For detailed setup instructions and requirements, such as hostname matching and pipeline configuration, see the [Datadog Extension documentation][14].

{{< img src="infrastructure/index/infra-list-otel-config.png" alt="The OTel Collector section of the host side panel showing build information and Collector configuration." style="width:100%;">}}

## Export

Click **Export** > **Open in DDSQL Editor**, then download the results from the [DDSQL Editor][18]. You can also export to a dashboard, notebook, or spreadsheet. For a JSON-formatted list of your hosts reporting to Datadog, you can also use one of the following:

- The [host overview report][17].
- The [search hosts API endpoint][7]. See the [developer guide][8] for an example.

### Audit Agent versions

To audit which Agent versions are running across your hosts, use the [get_host_agent_list script][9]. The script uses the [host overview report][17] to output the running Agents with their version numbers. A `json_to_csv` script also converts the JSON output to CSV.

### List hosts without an Agent

You can also use the JSON export to list Amazon EC2 (excluding RDS) instances that don't have an Agent installed. These instances appear in the Host List when you set up your AWS account in the Datadog AWS integration. The following Python 3 script lists them:

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

[2]: /getting_started/tagging/
[3]: /metrics/
[4]: /infrastructure/livecontainers/?tab=helm#overview
[5]: /logs/
[7]: /api/v1/hosts/#get-the-total-number-of-active-hosts
[8]: /extend/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://app.datadoghq.com/infrastructure
[11]: https://docs.datadoghq.com/account_management/billing/
[12]: https://app.datadoghq.com/release-notes/fleet-automation-is-now-generally-available
[14]: /opentelemetry/integrations/datadog_extension/
[15]: /infrastructure/resource_catalog/#investigate-a-host-or-resource
[16]: /getting_started/search/
[17]: https://app.datadoghq.com/reports/v2/overview?metrics=avg%3Aaws.ec2.cpuutilization%2Cavg%3Aazure.vm.percentage_cpu%2Cavg%3Agcp.gce.instance.cpu.utilization%2Cavg%3Asystem.cpu.idle%2Cavg%3Asystem.cpu.iowait%2Cavg%3Asystem.load.norm.15%2Cavg%3Avsphere.cpu.usage%2Cavg%3Avsphere.cpu.usage.avg%2Cavg%3Aalibabacloud.ecs.cpu_utilization.average&with_apps=true&with_sources=true&with_aliases=true&with_meta=true&with_mute_status=true&with_tags=true
[18]: /ddsql_editor/#save-and-share-queries
