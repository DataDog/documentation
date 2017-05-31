---
title: Installing the Agent on Debian 5
kind: documentation
---

###One-Step
The Agent can be installed on Debian Lenny (5.0) using our one-step install command: <br/>

    DD_API_KEY=your_api_key bash -c "$(wget -qO- http://dtdg.co/agent-install-debian)"

Be sure to substitute your API key into the command. Your key can be found <a href="https://app.datadoghq.com/account/settings#api">here</a>.

###Step-by-Step
If you prefer, the Agent can also be installed by following our step-by-step instructions:

Set up the Datadog deb repo on your system and import Datadog's apt key:

    sudo sh -c "echo 'deb http://apt.datadoghq.com/ unstable main' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys C7A7DA52

Update your local apt repo and install the Agent:

    sudo apt-get update
    sudo apt-get install datadog-agent-base

Copy the example config into place. Be sure to plug in your <a href="https://app.datadoghq.com/account/settings#api">API key</a> into the command:

    sudo sh -c "sed 's/api_key:.*/api_key: your_api_key' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"

Start the Agent:

    sudo /etc/init.d/datadog-agent start
