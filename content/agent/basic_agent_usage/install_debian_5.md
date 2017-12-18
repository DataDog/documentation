---
title: Installing the Agent on Debian 5
kind: documentation
aliases:
    - /install_debian_5/
---

## One-Step

The Agent can be installed on Debian Lenny (5.0) using our one-step install command:

```bash
DD_API_KEY=your_api_key bash -c "$(wget -qO- http://dtdg.co/agent-install-debian)"
```

Be sure to substitute your API key into the command. Your key can be found [in the Datadog api page](https://app.datadoghq.com/account/settings#api).

## Step-by-Step

If you prefer, the Agent can also be installed by following our step-by-step instructions:

Set up the Datadog deb repository on your system and import Datadog's apt key:
```shell
sudo sh -c "echo 'deb http://apt.datadoghq.com/ unstable main' > /etc/apt/sources.list.d/datadog.list"
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys C7A7DA52
```

Update your local apt repository and install the Agent:
```shell
sudo apt-get update
sudo apt-get install datadog-agent-base
```

Copy the example configuration into place. Be sure to plug in your [API key](https://app.datadoghq.com/account/settings#api) into the command:
```shell
sudo sh -c "sed 's/api_key:.*/api_key: your_api_key' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
```

Start the Agent:
```shell
sudo /etc/init.d/datadog-agent start
```
