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

The Infrastructure list shows all of your hosts monitored by Datadog with activity during the last 2 hours(default) and up to 1 week. Search your hosts, or group them by tags.

## Hosts

The following information is displayed in the infrastructure list for your hosts:

| Column           | Description                                                                                         |
|------------------|-----------------------------------------------------------------------------------------------------|
| Hostname         | The preferred hostname [alias](#aliases) (use the Options menu to view Cloud Name or Instance ID).              |
| Cloud Name       | A hostname [alias](#aliases).                                                                                   |
| Instance ID      | A hostname [alias](#aliases).                                                                                   |
| Status           | Displays `UP` when the expected metrics are received and displays `???` if no metrics are received. |
| CPU              | The percent of CPU used (everything but idle).                                                      |
| IOWait           | The percent of CPU spent waiting on the IO (not reported for all platforms).                        |
| Load 15          | The system load over the last 15 minutes.                                                           |
| Apps             | The Datadog integrations reporting metrics for the host.                                            |
| Operating System | The tracked operating system                                                                        |
| Cloud Platform   | Cloud platform the host is running on. (Example: AWS, GCP, Azure, etc...)                           |
| Datadog Agent    | Agent version that is collecting data on the host.                                                  |

### Hostname

The Datadog Agent collects potential hostnames from a number of different sources. For more details, see [How does Datadog determine the Agent hostname?][1].

**Note**: Hostnames should be unique within a Datadog account, otherwise you may experience some inconsistencies on your host graphs.

### Inspect

Click on any host to view more details including [aliases](#aliases), [tags][2], [metrics][3], [containers][4] and [logs][5] (if enabled):

{{< img src="infrastructure/index/Infra-List.png" alt="Infrastructure list host details"  style="width:90%;">}}

#### Aliases

Datadog creates aliases for host names when there are multiple uniquely identifiable names for a single host. The names collected by the Agent are added as aliases for the chosen canonical name. For example, a single host running in EC2 might have an instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (`myhost.mydomain`).

{{< img src="infrastructure/index/Infra-List-Alias.png" alt="host aliases"  style="width:90%;">}}

### Export

For a JSON formatted list of your hosts reporting to Datadog, use one of the following:

* The **JSON API permalink** at the bottom of the infrastructure list.
* The [search hosts API endpoint][6] - see the [developer guide][7] for an example.

#### Agent version

At times it may also be prove useful to audit your Agent versions to ensure you are running the latest version. To accomplish this, use the [get_host_agent_list script][8], which leverages the JSON permalink to output the current running Agents with version numbers. There is also a `json_to_csv` script to convert the JSON output into a CSV file.

#### No Agent

Another use case of the JSON export would be to get a list of AWS EC2 instances with no Agent installed. These instances appear in the infrastructure list by setting up your AWS account in the Datadog AWS integration tile. See this [example script][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/how-datadog-agent-determines-the-hostname/
[2]: /getting_started/tagging/
[3]: /metrics/
[4]: /infrastructure/livecontainers/?tab=helm#overview
[5]: /logs/
[6]: /api/v1/hosts/#get-the-total-number-of-active-hosts
[7]: /developers/guide/query-the-infrastructure-list-via-the-api/
[8]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[9]: https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38
