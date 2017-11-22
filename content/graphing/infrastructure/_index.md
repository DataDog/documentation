---
further_reading:
- link: "/graphing/infrastructure/hostmap"
  tag: ""
  text: See all of your hosts together on one screen with the hostmap
- link: "/graphing/infrastructure/livecontainers"
  tag: ""
  text: Get real-time visibility of all of the containers across your environment
- link: "/graphing/infrastructure/process"
  tag: ""
  text: Understand what is going on at any level of your system
title: Infrastructure List
kind: documentation
autotocdepth: 3
customnav: infrastructurenav
aliases:
  - /hostnames
  - /infrastructure/
---

## Overview

The Infrastructure list page shows all hosts monitored by your datadog application:

{{< img src="graphing/infrastructure/index/infrastructure_list.png" alt="Infrastructure list" responsive="true">}}

Note: All hosts that have not sent data in 24 hours will disappear from the infrastructure list; you can still query against them, but they will not appear in drop downs.

## Host details

If you click on one host, You can see the tags applied to it:

{{< img src="graphing/infrastructure/index/infrastructure_list_host_details.png" alt="Infrastructure list host details" responsive="true" >}}

### Agent Host Names

The Datadog Agent collects potential hostnames from a number of different
sources. To see all the names the Agent is detecting, [run the Agent info command](/agent/faq/agent-status-and-information):

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
Agent will primarily use to identify itself to Datadog. The other names are
submitted as well, but only as candidates for [aliases](#host-aliases).

The canonical host name is picked according to the following rules. The first
match is selected.

 1. `agent-hostname`: If a host name is explicitly set in the Agent configuration file.
 2. `hostname`: If the DNS host name is not an EC2 default (e.g. `ip-192-0-0-1`).
 3. `instance-id`: If the Agent can reach the EC2 metadata endpoint from the host.
 4. `hostname`: Fall back on the DNS host name even if it is an EC2 default.

If name is recognized as obviously non-unique (e.g. `localhost.localdomain`),
the current rule fails and passes through to the next.

### Host Aliases

A single host running in EC2 might have an instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (`myhost.mydomain`). Datadog creates aliases for host names when there are multiple uniquely identifiable names for a single host.  
The names collected by the Agent (detailed [above](#agent-host-names)) are added as aliases for the chosen canonical name.

You can see a list of all the hosts in your account from the Infrastructure tab
in Datadog. From the Inspect panel, you can see (among other things) the list of aliases associated with each host.

{{< img src="graphing/infrastructure/index/host_aliases.png" responsive="true">}}

### Export your infrastructure list and Agent versions

If you need to print or export the list of hosts reporting to Datadog, use the "JSON API permalink" at the bottom of the Infrastructure List. 

{{< img src="graphing/infrastructure/index/inf_list.png" alt="inf list" responsive="true">}}

Clicking this link will provide you with a JSON formatted list of all your hosts.  

At times it may also be prove useful to audit your current Agent version numbers to ensure you are running the latest version of the Agent or to update them following a new release.  

An easy way to accomplish this would be to use the following script that leverages the JSON permalink:

`https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion`

This script will output all the current running Agents and their version numbers to a separate document.  Additionally, you can edit the script to input a desired Version number if you would also like all the running Agents that are under a particular version number.  There is also a separate file if you would like to convert the JSON output into a CSV file for your review.

Once you determine which hosts you would like to update you can either manually install the Agent from the [install page](https://app.datadoghq.com/account/settings#agent).   

Or you can make use of one our automation integrations like [Chef](/integrations/chef), [Puppet](/integrations/puppet), or [Ansible](/integrations/ansible).

### List of ec2 instances without the datadog-agent installed

The host list and all its host information of the [Infrastructure List page](https://app.datadoghq.com/infrastructure) of Datadog is made available via the "JSON API permalink" at the bottom of the page.

You can programmatically access host information and get the insights you need, one example is this python script that prints the list of hosts:

* for which Datadog receives aws ec2 information from Cloudwatch, through our AWS integration.
* but that don't have the agent installed.

{{< img src="graphing/infrastructure/index/ec2_instances_without_dd_agent.png" alt="ec2_instances_without_dd_agent" responsive="true" >}}

See the script [here](https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38).

## What's next

{{< partial name="whats-next/whats-next.html" >}}


