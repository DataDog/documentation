---
title: How does Datadog determine the Agent hostname?
kind: faq
aliases:
    - /agent/faq/how-can-i-change-the-hostname/
comments: <!–– Original flowchart is in lucidchart. Search Trello for link or ask Grant. ––>
---

{{< tabs >}}
{{% tab "Agent v6" %}}

For Agent 6, there are differences in hostname resolution. For more information, see [differences in hostname resolution between Agent v5 and Agent v6][1].

**Note**: Starting from the Agent v6.3 a configuration option called `hostname_fqdn` has been introduced that allows Agent v6 to have the same behavior as Agent v5. This flag is disabled by default on version 6.3+. See the [example datadog.yaml][2] for enabling this option.


[1]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/hostname-resolution.md
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/faq/agent_hostname.jpeg" alt="Agent hostname scheme" responsive="true" >}}

{{% /tab %}}
{{< /tabs >}}

### Potential host names

The Datadog Agent collects potential host names from many different sources. To see all the names the Agent is detecting, [run the Agent status command][1]. For example:
```
$ sudo /etc/init.d/datadog-agent status
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

The canonical hostname is picked according to the following rules. The first match is selected.

* **agent-hostname**: A hostname explicitly set in the Agent configuration file.
* **hostname**: If the DNS hostname is not an EC2 default (e.g. ip-192-0-0-1).
* **instance-id**: If the Agent can reach the EC2 metadata endpoint from the host.
* **hostname**: Fall back on the DNS hostname even if it is an EC2 default.

If the name is recognized as obviously non-unique (like localhost.localdomain), the current rule fails and passes through to the next.

#### AWS hosts

When pulling information on your AWS hosts from the [Datadog API][2], the following attributes display based on availability:

| Attribute      | Description                                         |
|----------------|-----------------------------------------------------|
| `aws_id`       | The instance id, fallback on host if no instance id |
| `aws_name`     | The cloud `providername` tag                        |
| `display_name` | The canonical hostname (value of host identifier)   |

### Host Aliases

A single host running in EC2 might have an instance ID (i-abcd1234), a generic hostname provided by EC2 based on the host's IP address (ip-192-0-0-1), and a meaningful hostname provided by an internal DNS server or a config-managed hosts file (myhost.mydomain). Datadog creates aliases for hostnames when there are multiple uniquely identifiable names for a single host.

The names collected by the Agent (detailed above) are added as aliases for the chosen canonical name.

See a list of all the hosts in your account from the [Infrastructure List][3]. See the list of aliases associated with each host in the Inspect panel, which is accessed by clicking the "Inspect" button while hovering over a host row:

{{< img src="agent/faq/host_aliases.png" alt="Host aliases" responsive="true" >}}

[1]: /agent/guide/agent-commands/#agent-status-and-information
[2]: /api/#hosts
[3]: https://app.datadoghq.com/infrastructure
