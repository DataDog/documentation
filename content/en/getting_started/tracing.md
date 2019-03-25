---
title: Application Performance Monitoring (APM)
kind: documentation
further_reading:
- link: "https://learn.datadoghq.com/enrol/index.php?id=4"
  tag: "Learning Center"
  text: "Introduction to Application Performance Monitoring"
---

## Overview
Datadog APM is used to collect [traces][1] from your back-end application code. This is a quickstart guide to show you how APM works. Get started by following the sections below:

- Create a Datadog account
- Install the Agent
- APM Agent setup
- APM application setup

## Create a Datadog account
If you haven't already, create a [Datadog account][2].

## Install the Agent
This tutorial uses a [Vagrant Ubuntu 16.04 VM][3]. If have questions on setting up a VM, see [Vagrant's getting started][4].

```
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

Install the Datadog host Agent using the [one line install command][5] updated with your [Datadog API key][6]:

```
DD_API_KEY=<YOUR_DD_API_KEY> bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Validation
Verify the Agent is running with the [status command][7]:

```
sudo datadog-agent status
```

Verify the Agent is connected to your account by checking the [Infrastructure List][8] in Datadog.

## APM Agent setup
### Enable APM
On the latest version of Agent v6, APM is enabled by default. You can see this in the Agent [configuration file][9]:

```
# /etc/datadog-agent/datadog.yaml:
# apm_config:
#   Whether or not the APM Agent should run
#   enabled: true
```

And in `trace-agent.log`:

```
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-xenial
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### Environment name
Name your environment by updating the `datadog.yaml` by setting `env` under `apm_config`, for example:

```
apm_config:
  enabled: true
  env: hello_world
```

Then, [restart][10] the Datadog Agent:

```
sudo service datadog-agent status
```


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/terminology
[2]: https://www.datadoghq.com
[3]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[4]: https://www.vagrantup.com/intro/getting-started/index.html
[5]: https://app.datadoghq.com/account/settings#agent/ubuntu
[6]: https://app.datadoghq.com/account/settings#api
[7]: /agent/guide/agent-commands/?tab=agentv6#agent-information
[8]: https://app.datadoghq.com/infrastructure
[9]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[10]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
