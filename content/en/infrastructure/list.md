---
title: Infrastructure List
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

The Infrastructure List gives you a live inventory of all hosts reporting to Datadog through the Agent or cloud integrations. By default, it shows hosts with activity in the last two hours, but you can extend the view to cover up to one week. Search your hosts or group them by tags. In Datadog, navigate to [**Infrastructure > Hosts**][10] to view the Infrastructure list. This list should not be used to estimate your infrastructure host billing. See the [billing][11] page to learn about billing.

## Hosts

The following information is displayed in the infrastructure list for your hosts:

Hostname
: The preferred hostname [alias](#aliases) (use the Options menu to view Cloud Name or Instance ID).

Cloud Name
: A hostname [alias](#aliases).

Instance ID
: A hostname [alias](#aliases).

Status
: Displays `ACTIVE` when the expected metrics are received and displays `INACTIVE` if no metrics are received.

CPU
: The percent of CPU used (everything but idle).

IOWait
: The percent of CPU spent waiting on the IO (not reported for all platforms).

Load 15
: The system load over the last 15 minutes.

Apps
: The Datadog integrations reporting metrics for the host.

Operating System
: The tracked operating system.

Cloud Platform
: Cloud platform the host is running on (for example, AWS, Google Cloud, or Azure).

Datadog Agent
: Agent version that is collecting data on the host.

OpenTelemetry
: OpenTelemetry Collector version that is collecting data on the host.

### Hostname

The Datadog Agent collects potential hostnames from several different sources. For more details, see [How does Datadog determine the Agent hostname?][1].

**Note**: Hostnames should be unique within a Datadog account, otherwise you may experience some inconsistencies on your host graphs.

### Inspect

Click on any host to view more details including:
- [aliases](#aliases)
- [tags][2]
- [metrics][3]
- [containers][4]
- [logs][5] (if enabled)
- [Agent configuration](#agent-configuration) (if enabled)
- [OpenTelemetry Collector configuration](#opentelemetry-collector-configuration) (if enabled)

{{< img src="infrastructure/index/infra-list2.png" alt="Infrastructure list host details" style="width:100%;">}}

#### Aliases

Datadog creates aliases for host names when there are multiple uniquely identifiable names for a single host. The names collected by the Agent are added as aliases for the chosen canonical name. For example, a single host running in EC2 might have an instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (`myhost.mydomain`).

{{< img src="infrastructure/index/infra-list-alias2.png" alt="Host aliases" style="width:100%;">}}

#### Agent configuration

You can view and manage Agent configurations across your entire infrastructure using [Fleet Automation][12].

To view Agent configurations:
1. Click **Open Host** in the top-right corner of the host detail panel.
2. Select **View Agent Configurations** from the dropdown menu to go directly to Fleet Automation.

{{< img src="infrastructure/index/infra-list-config-4.png" alt="View Agent configurations in Fleet Automation" style="width:100%;">}}

#### OpenTelemetry Collector configuration

When the [Datadog Extension][14] is configured with your OpenTelemetry Collector, you can view Collector configuration and build information directly in the Infrastructure list host detail panel. The Datadog Extension provides visibility into your Collector fleet from within the Datadog UI, helping you manage and debug your OpenTelemetry Collector deployments.

To view OpenTelemetry Collector configurations:
1. Click on a host running the OpenTelemetry Collector in the Infrastructure list.
2. In the host detail panel, select the **OTel Collector** tab to view the build information and complete Collector configuration.

For detailed setup instructions and requirements, such as hostname matching and pipeline configuration, see the main [Datadog Extension documentation][14].

{{< img src="infrastructure/index/infra-list-config-otel.png" alt="View OpenTelemetry Collector configurations in infrastructure list" style="width:100%;">}}


### Export

For a JSON formatted list of your hosts reporting to Datadog, use one of the following:

* The **JSON API permalink** at the top of the infrastructure list.
* The [search hosts API endpoint][7] - see the [developer guide][8] for an example.

#### Agent version

It may be useful to audit your Agent versions to ensure you are running the latest version. To accomplish this, use the [get_host_agent_list script][9], which leverages the JSON permalink to output the current running Agents with version numbers. There is also a `json_to_csv` script to convert the JSON output into a CSV file.

#### No Agent

Another use case of the JSON export would be to get a list of Amazon EC2 (excluding RDS) instances with no Agent installed. These instances appear in the infrastructure list by setting up your AWS account in the Datadog AWS integration tile. See the Python3 script below:

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
[8]: /developers/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://app.datadoghq.com/infrastructure
[11]: https://docs.datadoghq.com/account_management/billing/
[12]: https://app.datadoghq.com/release-notes/fleet-automation-is-now-generally-available
[13]: /agent/fleet_automation
[14]: /opentelemetry/integrations/datadog_extension/
