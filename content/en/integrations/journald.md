---
integration_title: Journald
kind: integration
public_title: Datadog-Journald Integration
categories:
    - log collection
description: 'Forward your logs from the journal to Datadog'
short_description: 'Forward your logs from the journal to Datadog'
has_logo: true
is_public: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/journald.md']
name: journald
ddtype: check
supported_os:
    - linux
further_reading:
    - link: "logs/guide/docker-logs-collection-troubleshooting-guide"
      tag: "Documentation"
      text: "Docker Log Collection"
---

## Overview

Systemd-journald is a system service that collects and stores logging data. It creates and maintains structured, indexed journals based on logging information that is received from a variety of sources.

## Setup

### Installation

Journal files are, by default, owned and readable by the `systemd-journal` system group. To start collecting your journal logs, you need to:

1. [Install the Agent][1] on the instance running the journal
2. Add the `dd-agent` user to the `systemd-journal` group by running:

```text
usermod -a -G systemd-journal dd-agent
```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

To configure this check for an Agent running on a host:

Add a `journald.d/conf.yaml` file in the in the Agent's `conf.d/` folder at the root of your Agent's directory.

#### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml` with:

```yaml
logs_enabled: true
```

Then add this configuration block to your `journald.d/conf.yaml` file to start collecting your Logs:

```yaml
logs:
    - type: journald
      container_mode: true
```

To fill `source` and `service` attributes, the Agent collects `SYSLOG_IDENTIFIER` , `_SYSTEMD_UNIT` and `_COMM`and set them to the first non empty value. In order to take advantage of the integration pipelines, Datadog recommends setting the `SyslogIdentifier` parameter in the `systemd` service file directly, or in a `systemd` service override file. Their location depends on your distribution, but you can find the location of the `systemd` service file by using the command `systemctl show -p FragmentPath <unit_name>`.

**Note**: With Agent 7.17+, if `container_mode` is set to `true`, the default behavior changes for logs coming from docker containers. The `source` attribute of your logs is automatically set to the corresponding short image name of the container instead of simply `docker`.

Finally, [restart the Agent][1].

[1]: /agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

#### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection documentation][2].

| Parameter      | Value                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "journald", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}



#### Advanced features

##### Change journal location

By default the Agent looks for the journal at the following locations:

- `/var/log/journal`
- `/var/run/journal`

If your journal is located elsewhere, add a `path` parameter with the corresponding journal path.

##### Filter journal units

It is possible to filter in/out specific units thanks to the following parameters:

- `include_units`: Includes all units specified.
- `exclude_units`: Excludes all units specified.

Example:

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_units:
          - docker.service
          - sshd.service
```

##### Collect container tags

Tags are critical for finding information in highly dynamic containerized environments, which is why the Agent can collect container tags in journald logs.

This works automatically when the Agent is running from the host. If you are using the containerized version of the Datadog Agent, mount your journal path and the following file:

- `/etc/machine-id`: this ensures that the Agent can query the journal that is stored on the host.

## Troubleshooting

Need help? Contact [Datadog Support][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /help/
