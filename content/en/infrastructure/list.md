---
title: Infrastructure List
kind: documentation
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

The Infrastructure list shows all of your hosts monitored by Datadog with activity during the last two hours (default) and up to one week. Search your hosts or group them by tags. In Datadog, navigate to [**Infrastructure > Hosts**][10] to view the Infrastructure list.

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

{{< img src="infrastructure/index/infra-list2.png" alt="Infrastructure list host details" style="width:100%;">}}

#### Aliases

Datadog creates aliases for host names when there are multiple uniquely identifiable names for a single host. The names collected by the Agent are added as aliases for the chosen canonical name. For example, a single host running in EC2 might have an instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (`myhost.mydomain`).

{{< img src="infrastructure/index/infra-list-alias2.png" alt="Host aliases" style="width:100%;">}}

#### Agent configuration

{{< callout url="#" btn_hidden="true" >}}
  The Agent configuration view is in public beta and is available in Agent versions >= 7.39/6.39.

  Starting with Agent version >= 7.47/6.47, this feature is enabled by default.
{{< /callout >}}

The Agent can send its own configuration to Datadog to be displayed in the `Agent Configuration` section of the host detail panel.

The Agent configuration is scrubbed of any sensitive information and only contains configuration you've set using the configuration file or environment variables. The configuration changes are updated every 10 minutes.

This feature is enabled by default in Agent version >= 7.47.0/6.47.0.

To modify this behavior, set the value of `inventories_configuration_enabled` in your [Agent configuration file][6] to `true` to send the configuration, or `false` to disable it.

Alternatively, use the `DD_INVENTORIES_CONFIGURATION_ENABLED` environment variable to enable or disable this feature.

{{< img src="infrastructure/index/infra-list-config3.png" alt="The Agent configuration view" style="width:100%;">}}

### Export

For a JSON formatted list of your hosts reporting to Datadog, use one of the following:

* The **JSON API permalink** at the top of the infrastructure list.
* The [search hosts API endpoint][7] - see the [developer guide][8] for an example.

#### Agent version

At times it may also be prove useful to audit your Agent versions to ensure you are running the latest version. To accomplish this, use the [get_host_agent_list script][9], which leverages the JSON permalink to output the current running Agents with version numbers. There is also a `json_to_csv` script to convert the JSON output into a CSV file.

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
