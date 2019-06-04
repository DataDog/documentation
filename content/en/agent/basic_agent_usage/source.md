---
title: Basic Agent Usage for Source Installation
kind: documentation
platform: Source
aliases:
    - /guides/basic_agent_usage/source/
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---
## Overview

This page outlines the basic features of the Datadog Agent. If you haven't installed the Agent yet, instructions can be found [in the Datadog Agent Integration page][1].

By default, your Agent is installed in its own sandbox at `~/.datadog-agent`. You're free to move this folder wherever you like. However, this article assumes that the Agent is installed in its default location, so be sure to modify the instructions accordingly if you decide to move them.

## Linux Installation

* Install [Go][2] version 1.11.5 or later. Remember to set your `GOPATH` and have `$GOPATH/bin` in your path.
* Install Python version 3.x, along with development libraries. 
* Create a virtual environment in Python. Activate it and install Python dependencies with `pip install -r requirements.txt`
* Install CMake version 3.12+.
* Checkout the repo: `git clone https://github.com/DataDog/datadog-agent.git $GOPATH/src/github.com/DataDog/datadog-agent`
* Install the project's dependencies with `invoke deps`. Ensure that `$GOPATH/bin` is in your `$PATH`.


Next, build the Agent packages using [Omnibus][3]. In order to run Omnibus, install the following:

* Ruby 2.2+
* Bundler

Set `GOPATH` and `$GOPATH/bin` for your `root` user. Activate your Python virtual environment.

Then, run:

```
inv agent.omnibus-build --base-dir=$HOME/.omnibus
```

This generates an installable `.deb` with integrations that matches Datadog's releases.

## Commands

Datadog Agent has some commands and only the _lifecycle commands_ (i.e. `start`/`stop`/`restart`/`status` on the Agent) should be run with `sudo`.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Description                   | Command                                 |
| ----------------------------- | --------------------------------------- |
| Start Agent                   | `sudo ./bin/agent/agent start`          |
| Stop Agent                    | `sudo ./bin/agent/agent  stop`          |
| Status page of running Agent  | `sudo ./bin/agent/agent  info`          |
| Send flare                    | `sudo ./bin/agent/agent  flare`         |
| Display command usage         | `sudo ./bin/agent/agent  help`          |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                   | Command                                 |
| ----------------------------- | --------------------------------------- |
| Start Agent                   | `sudo ~/.datadog-agent/bin/agent start` |
| Stop Agent                    | `sudo ~/.datadog-agent/bin/agent stop`  |
| Status page of running Agent  | `sudo ~/.datadog-agent/bin/agent info`  |
| Send flare                    | `sudo ~/.datadog-agent/bin/agent flare` |
| Display command usage         | `sudo ~/.datadog-agent/bin/agent help`  |

{{% /tab %}}
{{< /tabs >}}

## Configuration

{{< tabs >}}
{{% tab "Agent v6" %}}
The configuration files and folders for the Agent are located in:

* `/etc/datadog-agent/datadog.yaml`

Configuration files for [Integrations][1]:

* `/etc/datadog-agent/conf.d/`


[1]: /integrations
{{% /tab %}}
{{% tab "Agent v5" %}}

The configuration files and folders for the Agent are located in:

* `/etc/dd-agent/datadog.conf`

Configuration files for [Integrations][1]:

* `/etc/dd-agent/conf.d/`


[1]: /integrations
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

[Refer to the dedicated Agent Troubleshooting documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/source
[2]: https://golang.org/doc/install
[3]: https://github.com/chef/omnibus
[4]: /agent/troubleshooting
