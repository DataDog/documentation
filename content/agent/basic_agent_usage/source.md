---
title: Basic Agent Usage for Source Installation
kind: documentation
platform: Source
aliases:
    - /guides/basic_agent_usage/source/
---
## Overview

This guide will outline the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
[here](https://app.datadoghq.com/account/settings#agent/source).<br/>

By default, your Agent will be installed in its own sandbox at `'~/.datadog-agent'`.
You're free to move this folder wherever you like.
However, this guide will assume that the Agent is installed in its default location, so be sure to modify the
instructions accordingly if you decide to move them.

## Starting and Stopping the Agent

To manually start the Agent:

```shell
sudo ~/.datadog-agent/bin/agent start
```

To stop the Agent: <br/>

```shell
sudo ~/.datadog-agent/bin/agent stop
```

To restart the Agent: <br/>

```shell
sudo ~/.datadog-agent/bin/agent restart
```

## Status and Information

To check if the Agent is running:

```shell
sudo ~/.datadog-agent/bin/agent status
```

To receive more information about the Agent's state:

```shell
sudo ~/.datadog-agent/bin/info
```

Tracebacks for errors can be retrieved by setting the `-v` flag: <em>(since 3.8.0)</em>

```shell
sudo ~/.datadog-agent/bin/info -v
```

## Configuration

The configuration file for the Agent is located at `~/.datadog-agent/agent/datadog.conf`

Configuration files for integrations are located in `~/.datadog-agent/agent/conf.d/`

## Troubleshooting

First, make sure you are using the correct version of Python. The Agent requires version 2.7. You can check your version by executing:

```shell
python -c 'import sys; print sys.version'
```

Next, try running the [info](#status_and_information) command to see the state of the Agent.

Logs for the subsystems are in the following files:

*   `~/.datadog-agent/supervisord/logs/supervisord.log`
*   `~/.datadog-agent/supervisord/logs/collector.log`
*   `~/.datadog-agent/supervisord/logs/dogstatsd.log`
*   `~/.datadog-agent/supervisord/logs/forwarder.log`

If you're still having trouble, [our support team](/help) will be glad to provide further assistance.

