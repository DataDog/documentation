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
name: journald
ddtype: check
supported_os:
- linux
---


## Overview

Systemd-journald is a system service that collects and stores logging data. It creates and maintains structured, indexed journals based on logging information that is received from a variety of sources.
Note that this integration does not currently support RPM-based Linux distributions, including Red Hat and CentOS.

## Setup

### Installation

Journal files are, by default, owned and readable by the `systemd-journal` system group. To start collecting your journal logs, you need to:

1. [Install the agent][1] on the instance running the journal
2. Add the `dd-agent` user to the `systemd-journal` group by running:

```
usermod -a -G systemd-journal dd-agent
```

### Configuration

Create the `journald.d/conf.yaml` file in the in the Agent’s `conf.d/` folder at the root of your Agent's directory.

#### Log collection

**Available for Agent version >6.0**

Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml` with:

```
logs_enabled: true
```

Then add this configuration block to your `journald.d/conf.yaml` file to start collecting your Logs:

```
logs:
  - type: journald
```

Finally, [restart the agent][2].

#### Advanced features

##### Change journal location

By default the agent looks for the journal at the following locations:

* `/var/log/journal`
* `/var/run/journal`

If your journal is located elsewhere, add a `path` parameter with the corresponding journal path.

##### Filter journal units

It is possible to filter in/out specific units thanks to the following parameters:

* `include_units`: Includes all units specified.
* `exclude_units`: Excludes all units specified.

Example:

```
logs:
  - type: journald
    path: /var/log/journal/journal
    include_units:
      - docker.service
      - sshd.service
```

##### Collect Container tags

Tags are critical for finding information in highly dynamic containerized environments. Which is why the agent is able to collect container tags on journald logs.

This should work directly when the agent is running from the host. If you are using the containerized version of the Datadog Agent, simply mount the path of the journal and the following directory:

- `/etc/machine-id`: this ensure that the agent can query the journal that is stored on the host.

Finally, [restart the agent][2].

## Troubleshooting

Need help? Contact [Datadog Support][3].

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog][4]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[3]: /help
[4]: https://www.datadoghq.com/blog/
