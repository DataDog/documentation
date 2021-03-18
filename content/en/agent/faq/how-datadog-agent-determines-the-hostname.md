---
title: How does Datadog determine the Agent hostname?
kind: faq
aliases:
    - /agent/faq/how-can-i-change-the-hostname/
comments: <!–– Original flowchart is in lucidchart. Search Trello for link or ask Grant. ––>
---

## Potential host names

The Datadog Agent collects potential host names from many different sources. Run the Agent's [status subcommand][1] to see all names the Agent is detecting.
```text
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

From these names, a canonical name is chosen for the host. The Agent uses this name to identify itself to Datadog. The other names are submitted as well, but only as candidates for aliasing.

The canonical hostname is chosen according to the following rules. The first match is selected.

1. **agent-hostname**: A hostname explicitly set in the [Agent configuration file][2] if it does not start with ip- or domu.
2. **hostname** (`hostname -f` on Linux): If the DNS hostname is not an EC2 default (e.g. ip-192-0-0-1).
3. **instance-id**: If the Agent can reach the EC2 metadata endpoint from the host.
4. **hostname**: Fall back on the DNS hostname even if it is an EC2 default.

If the name is recognized as obviously non-unique (example: `localhost.localdomain`), the current rule fails and passes through to the next.

### AWS hosts

When pulling information on your AWS hosts from the [Datadog API][3], the following attributes display based on availability:

| Attribute      | Description                                         |
|----------------|-----------------------------------------------------|
| `aws_id`       | The instance id, fallback on host if no instance id |
| `aws_name`     | The cloud `providername` tag                        |
| `display_name` | The canonical hostname (value of host identifier)   |

### Host aliases

A single host running in EC2 might have an instance ID (i-abcd1234), a generic hostname provided by EC2 based on the host's IP address (ip-192-0-0-1), and a meaningful hostname provided by an internal DNS server or a config-managed hosts file (myhost.mydomain). Datadog creates aliases for host names when there are multiple uniquely identifiable names for a single host.

The names collected by the Agent (detailed above) are added as aliases for the chosen canonical name.

See the list of all hosts in your account from the [Infrastructure List][4]. The aliases associated with each host are available in the inspect panel, which is accessed by clicking the **Inspect** button while hovering over a host row:

{{< img src="agent/faq/host_aliases.png" alt="Host aliases"  >}}

## Agent versions

There are differences in hostname resolution between Agent v5 and Agent v6.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

### Linux and macOS

When upgrading from Agent v5 to Agent v6, there might be a difference in the hostname reported by your Agent. To resolve the system hostname Agent v5 uses the `hostname -f` command while Agent v6 uses the Golang API `os.Hostname()`. On upgrades, the Agent hostname could change from a Fully-Qualified Domain Name (FQDN) to a short hostname, for example:

`sub.domain.tld` --> `sub`

**Note**: Starting from Agent v6.3, the `hostname_fqdn` configuration option was introduced that allows Agent v6 to have the same behavior as Agent v5. This flag is disabled by default on version 6.3+. See the [example datadog.yaml][1] for enabling this option.

#### Determine if you're affected

Starting with v6.3.0, the Agent logs the warning below if you’re affected by the change:
```text
DEPRECATION NOTICE: The agent resolved your hostname as <HOSTNAME>. However in a future version, it will be resolved as <FQDN> by default. To enable the future behavior, please enable the `hostname_fqdn` flag in the configuration.
```

You are not affected if any of the following are true:

* The Agent runs in GCE.
* The hostname is set the [Agent's main configuration][2] file or through the `DD_HOSTNAME` environment variable.
* The Agent runs in a container with access to the Docker or Kubernetes API.
* The hostname output of `cat /proc/sys/kernel/hostname` and `hostname -f` are the same.

#### Recommended action

If you're affected by this change, Datadog recommends taking the following action when you upgrade your Agent:

* **Upgrading from Agent v5 to Agent v < 6.3**: Hardcode your hostname in the [Agent's main configuration][2] file.
* **Upgrading from Agent v5 to Agent >= v6.3**: Enable the `hostname_fqdn` option in the [Agent's main configuration][2] file. This ensures that you keep the same hostname.
* **Upgrading from Agent v5 to Agent v6 (a future version which uses the fqdn by default)**: you don’t need to take any action.
* If you want to ensure the current default behavior of Agent v6 is preserved when you upgrade the Agent in the future, set `hostname_fqdn` to `false`. That said, Datadog recommends you switch `hostname_fqdn` to `true` whenever possible.

### Windows

On Agent v5, the Windows Agent reported the unqualified hostname by default. To maintain backward compatibility, this behavior is preserved with Agent v6. The new flag `hostname_fqdn` remains disabled by default on Windows, and will remain disabled by default on future **v6** versions.

The Windows Agent honors the configuration flag starting with v6.5. Setting `hostname_fqdn` to true results in the Windows Agent reporting the fully qualified hostname.

#### Recommended action

By default, the recommended action is to do nothing. This preserves the existing behavior, especially if upgrading from Agent v5.

If you want to have Windows hosts specifically report fully qualified host names, then add `hostname_fqdn` set to `true` in your [Agent's main configuration file][2].

### GCE

_Only affects Agents running on GCE_

By default, Agent v6 uses the instance's hostname provided by GCE. This matches the behavior of Agent v5.5.1+ if `gce_updated_hostname` is set to true in `datadog.conf`.

If you're upgrading from Agent v5 with `gce_updated_hostname` unset or set to false, and the hostname of the Agent is not hardcoded in `datadog.conf`/`datadog.yaml`, the reported hostname on Datadog will change from the GCE instance `name` to the full GCE instance `hostname` (which includes the GCE project id).

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/faq/agent_hostname.jpeg" alt="Agent hostname scheme"  >}}

{{% /tab %}}
{{< /tabs >}}

[1]: /agent/guide/agent-commands/#agent-status-and-information
[2]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /api/v1/hosts/
[4]: https://app.datadoghq.com/infrastructure
