---
title: Infrastructure List
kind: documentation
aliases:
  - /hostnames
further_reading:
- link: "graphing/infrastructure/hostmap"
  tag: "Graphing"
  text: "See all of your hosts together on one screen with the hostmap"
- link: "graphing/infrastructure/livecontainers"
  tag: "Graphing"
  text: "Get real-time visibility for all containers across your environment"
- link: "graphing/infrastructure/process"
  tag: "Graphing"
  text: "Understand what is going on at any level of your system"
---

## Overview

The Infrastructure list shows all your hosts monitored by Datadog with activity during the last 2 hours. Search your hosts, group them by tags, or sort the list by column headers.

{{< img src="graphing/infrastructure/index/infrastructure_list.png" alt="Infrastructure list" responsive="true" >}}

## Hosts

| Column   | Description                                                                                         |
|----------|-----------------------------------------------------------------------------------------------------|
| Hostname | The preferred hostname alias (use the dropdown to view cloud name or instance ID).                  |
| Status   | Displays `UP` when the expected metrics are received and displays `???` if no metrics are received. |
| CPU      | The percent of CPU used (everything but idle).                                                      |
| IOWait   | The percent of CPU spent waiting on the IO (not reported for all platforms).                        |
| Load 15  | The system load over the last 15 minutes.                                                           |
| Apps     | The Datadog integrations reporting metrics for the host.                                            |

### Inspect

Click on any host to view more details including tags and logs (if enabled).

{{< img src="graphing/infrastructure/index/infrastructure_list_host_details.png" alt="Infrastructure list host details" responsive="true" style="width:80%;">}}

### Hostname

The Datadog Agent collects potential hostnames from a number of different
sources. To see all the names the Agent is detecting, [run the Agent status command][1]:

    $ sudo /etc/init.d/datadog-agent info

    ...

    Hostnames
    =========

      hostname: my.special.hostname
      agent-hostname: my.special.hostname
      ec2-hostname: ip-192-0-0-1.internal
      instance-id: i-deadbeef
      socket-hostname: myhost
      socket-fqdn: myhost.mydomain

    ...

From these names, a canonical name is picked for the host. This is the name the
Agent primarily uses to identify itself to Datadog. The other names are
submitted as well, but only as candidates for [aliases](#host-aliases).

The canonical host name is picked according to the following rules. The first
match is selected.

 1. `agent-hostname`: If a host name is explicitly set in the Agent configuration file.
 2. `hostname`: If the DNS host name is not an EC2 default (e.g. `ip-192-0-0-1`).
 3. `instance-id`: If the Agent can reach the EC2 metadata endpoint from the host.
 4. `hostname`: Fall back on the DNS host name even if it is an EC2 default.

If name is recognized as obviously non-unique (e.g. `localhost.localdomain`),
the current rule fails and passes through to the next.

**Note**: If an EC2 instance is an ECS host, Datadog uses the `instance-id` as the hostname, [even if the DNS hostname isn't an EC2 default][2]. If you don't wish to use the `instance-id`, set the hostname in the Agent configuration file.

<div class="alert alert-warning">
Hostnames should be unique within a Datadog account.<br>
Otherwise you may experience some inconsistencies on your host metric graphs.
</div>

#### Aliases

A single host running in EC2 might have an instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (`myhost.mydomain`).

Datadog creates aliases for host names when there are multiple uniquely identifiable names for a single host. The names collected by the Agent (detailed [above](#agent-host-names)) are added as aliases for the chosen canonical name.

You can see a list of all the hosts in your account from the Infrastructure tab
in Datadog. From the Inspect panel, you can see (among other things) the list of aliases associated with each host.

{{< img src="graphing/infrastructure/index/host_aliases.png" alt="host aliases" responsive="true" style="width:80%;">}}

### Export

For a JSON formatted list of your hosts reporting to Datadog, use the **JSON API permalink** at the bottom of the infrastructure list.

At times it may also be prove useful to audit your current Agent version numbers to ensure you are running the latest version of the Agent or to update them following a new release.

An easy way to accomplish this would be to use the following script that leverages the JSON permalink:

`https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion`

This script outputs all the current running Agents and their version numbers to a separate document.  Additionally, you can edit the script to input a desired Version number if you would also like all the running Agents that are under a particular version number.  There is also a separate file if you would like to convert the JSON output into a CSV file for your review.

Once you determine which hosts you would like to update, you can either manually install the Agent from the [install page][3], or you can use one of the Datadog automation integrations like [Chef][4], [Puppet][5], or [Ansible][6].

### List of ec2 instances without the datadog-agent installed

The host list and all its host information of the [Infrastructure List page][7] of Datadog is made available via the "JSON API permalink" at the bottom of the page.

You can programmatically access host information and get the insights you need, one example is this python script that prints the list of hosts:

* for which Datadog receives AWS EC2 information from Cloudwatch, through the Datadog-AWS integration.
* but that don't have the Agent installed.

{{< img src="graphing/infrastructure/index/ec2_instances_without_dd_agent.png" alt="ec2_instances_without_dd_agent" responsive="true" style="width:90%;">}}

[See the script to prints the list of hosts][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/dd-agent/blob/5.14.1/utils/hostname.py#L104
[3]: https://app.datadoghq.com/account/settings#agent
[4]: /integrations/chef
[5]: /integrations/puppet
[6]: /integrations/ansible
[7]: https://app.datadoghq.com/infrastructure
[8]: https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38
