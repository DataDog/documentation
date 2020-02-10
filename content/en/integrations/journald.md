---
integration_title: Journald
kind: integration
public_title: Datadog-Journald Integration
categories:
- log collection
description: "Forward your logs from the journal to Datadog"
short_description: "Forward your logs from the journal to Datadog"
has_logo: true
is_public: true
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/journald.md"]
name: journald
ddtype: check
supported_os:
- linux
---

## Overview

Systemd-journald is a system service that collects and stores logging data. It creates and maintains structured, indexed journals based on logging information that is received from a variety of sources.

## Setup

### Installation

Journal files are, by default, owned and readable by the `systemd-journal` system group. To start collecting your journal logs, you need to:

1. [Install the agent][1] on the instance running the journal
2. Add the `dd-agent` user to the `systemd-journal` group by running:

```text
usermod -a -G systemd-journal dd-agent
```

### Configuration

Create the `journald.d/conf.yaml` file in the in the Agent's `conf.d/` folder at the root of your Agent's directory.

#### Log collection

**Available for Agent version >6.0**

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

**Note**: With Agent 7.17+ if `container_mode` is set to `true`, the `source` attribute of your logs is automatically set to the corresponding short image name of the container instead of simply `docker`.

Finally, [restart the agent][2].

#### Advanced features

##### Change journal location

By default the Agent looks for the journal at the following locations:

* `/var/log/journal`
* `/var/run/journal`

If your journal is located elsewhere, add a `path` parameter with the corresponding journal path.

##### Filter journal units

It is possible to filter in/out specific units thanks to the following parameters:

* `include_units`: Includes all units specified.
* `exclude_units`: Excludes all units specified.

Example:

```yaml
logs:
  - type: journald
    path: /var/log/journal/
    include_units:
      - docker.service
      - sshd.service
```

##### Collect Container tags

Tags are critical for finding information in highly dynamic containerized environments, which is why the Agent can collect container tags in journald logs.

This works automatically when the Agent is running from the host. If you are using the containerized version of the Datadog Agent, mount your journal path and the following file:

* `/etc/machine-id`: this ensures that the Agent can query the journal that is stored on the host.

## Troubleshooting

Need help? Contact [Datadog Support][3].

## Further Reading

Learn more about infrastructure monitoring and all Datadog integrations on [our blog][4]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/guide/agent-commands/#start-stop-restart-the-agent
[3]: /help
[4]: https://www.datadoghq.com/blog
