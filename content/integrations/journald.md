---
integration_title: Journald
kind: integration
public_title: Datadog-Journald Integration
categories:
- log collection
description: View, search on, and discuss Airbrake exceptions in your event stream.
has_logo: true
is_public: true
name: journald
---


## Overview

Systemd-journald is a system service that collects and stores logging data. It creates and maintains structured, indexed journals based on logging information that is received from a variety of sources.
This integration explains how to forward logs from the journal to Datadog as well as the advanced filtering capabilities of the agent regarding journald.

## Setup

## Installation

Journal files are, by default, owned and readable by the `systemd-journal` system group, to start collecting your journal logs, you need to:

1. [Install the agent](https://app.datadoghq.com/account/settings#agent) on the instance running the journal
1. Add the dd-agent user to the `systemd-journal` group by running:  

```
usermod -a -G systemd-journal dd-agent
```

## Configuration

1. Create the `journald.d/conf.yaml` file in the in the Agent’s `conf.d/` directory

### Log collection

**Available for Agent version >6.0**

Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

```
  logs_enabled: true
```

Add this configuration block to your `journald.d/conf.yaml file to start collecting your Logs:

```
logs:
  type: journald
```

[Restart the agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent).

#### Advanced features

1. Change journal location

By default the agent looks for the journal at the following locations:

- /var/log/journal 
- /var/run/journal


If your journal is located elsewhere, add a `path` parameter with the corresponding journal path.

2. Filter journal units

It is possible to filter in/out specific units thanks to the following parameters:

- `include_units: unit1,unit2` : Collect all if not specified, wildcard can be used
- `exclude_units: unit1, unit2`:  Exclude nothing if not specified

Example:

```
logs:
  type: journald
  path: /var/log/journal/journal
  include_units: kernel*, docker*
```