---
aliases:
- /ja/hostnames
autotocdepth: 2
customnav: infrastructurenav
hideguides: true
kind: documentation
placeholder: true
title: Infrastructure List
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

The Infrastructure list page shows all hosts monitored by your datadog application:

{{< img src="infrastructure/index/infrastructure_list.png" alt="Infrastructure list" >}}

## Host details

If you click on one host, You can see the tags applied to it:

{{< img src="infrastructure/index/infrastructure_list_host_details.png" alt="Infrastructure list host details" >}}

### Agent Host Names

The Datadog Agent collects potential hostnames from a number of different
sources. To see all the names the Agent is detecting, run the Agent info
command:

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

A single host running in EC2 might have an
instance ID (`i-abcd1234`), a generic hostname provided by EC2 based on the
host's IP address (`ip-192-0-0-1`), and a meaningful host name provided by an
internal DNS server or a config-managed hosts file (`myhost.mydomain`). Datadog
creates aliases for host names when there are multiple uniquely identifiable
names for a single host.

The names collected by the Agent (detailed [above](#agent-host-names)) are
added as aliases for the chosen canonical name.

You can see a list of all the hosts in your account from the Infrastructure tab
in Datadog. From the Inspect panel, you can see (among other things) the list of
aliases associated with each host.

{{< img src="infrastructure/index/host_aliases.png" >}}

## what's next?

* [See all of your hosts together on one screen with the hostmap](/infrastructure/hostmap)
* [Get real-time visibility of all of the containers across your environment](/infrastructure/livecontainers)
* [Understand what is going on at any level of your system](/infrastructure/process)
