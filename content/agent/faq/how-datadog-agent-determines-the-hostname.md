---
title: How does Datadog determine the Agent hostname?
kind: faq
aliases:
    - /agent/faq/how-can-i-change-the-hostname/
comments: <!–– Original flowchart is in lucidchart. Search Trello for link or ask Grant. ––>
---

{{< tabs >}}
{{% tab "Agent v6" %}}

For Agent 6, some differences in hostname resolution apply. See our document on [Differences in hostname resolution between Agent v5 and Agent v6][1].


[1]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/hostname-resolution.md
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/faq/agent_hostname.jpeg" alt="Agent hostname scheme" responsive="true" >}}

{{% /tab %}}
{{< /tabs >}}

The Datadog Agent collects potential hostnames from a number of different sources. To see all the names the Agent is detecting, [run the Agent info command][1], for example:
```
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
```

From these names, a canonical name is picked for the host. This is the name the Agent primarily uses to identify itself to Datadog. The other names are submitted as well, but only as candidates for aliasing.

The canonical host name is picked according to the following rules. The first match is selected.

* **agent-hostname**: If a host name is explicitly set in the Agent configuration file.
* **hostname**: If the DNS host name is not an EC2 default (e.g. ip-192-0-0-1).
* **instance-id**: If the Agent can reach the EC2 metadata endpoint from the host.
* **hostname**: Fall back on the DNS host name even if it is an EC2 default.

If name is recognized as obviously non-unique (e.g. localhost.localdomain), the current rule fails and passes through to the next.

### Host Aliases

A single host running in EC2 might have an instance ID (i-abcd1234), a generic hostname provided by EC2 based on the host's IP address (ip-192-0-0-1), and a meaningful host name provided by an internal DNS server or a config-managed hosts file (myhost.mydomain). Datadog creates aliases for host names when there are multiple uniquely identifiable names for a single host.

The names collected by the Agent (detailed above) are added as aliases for the chosen canonical name.

See a list of all the hosts in your account from the Infrastructure tab in Datadog. From the Inspect panel, which you get to by clicking the "Inspect" button while hovering over a host row, see (among other things) the list of aliases associated with each host.

{{< img src="agent/faq/host_aliases.png" alt="Host aliases" responsive="true" >}}

[1]: /agent/faq/agent-commands/#agent-status-and-information
