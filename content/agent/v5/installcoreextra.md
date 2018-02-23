---
title: Installing Core & Extra Integrations
kind: documentation
aliases:
    - /guides/installcoreextra/
disable_toc: true
---

<div class="alert alert-info">
This documentation covers Agent <strong>versions prior to 6.0.0</strong><br>
Agent v6 is now available, <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">upgrade to the newest version </a> to benefit from all new functionality. 
</div>

### Overview
Starting with version 5.12 of the Datadog Agent, we are moving integrations from the [dd-agent repository](https://github.com/DataDog/dd-agent) on GitHub to the [integrations-core](https://github.com/DataDog/integrations-core) and [integrations-extras](https://github.com/DataDog/integrations-extras) repositories.

This move allows us to have a method to distribute more community-developed integrations, as well as being able to update supported integrations out of band with the Agent.
**Note**: these integrations are not designed for Windows operating systems.

For more information on adding new integrations to `integrations-extras`, see the guide on the [Integration SDK](/developers/integrations/integration_sdk)

The two integration repositories are defined as follows:

* **[integrations-core](https://github.com/DataDog/integrations-core)** - Datadog-supported integrations that were formerly found in the core Agent.
* **[integrations-extras](https://github.com/DataDog/integrations-extras)** - Community-supported integrations that have been written according to the guidelines specified by Datadog

All core integrations continue to be installed with the agent install. You only have to install an integration in core separately if there is an out of band update to that integration.
To either install an out-of-band update to a core integration or to install one of the extra integrations, follow these steps:

### Installing on yum-based systems

1.  Run `yum update` to ensure your system has access to the latest packages.
1.  Run `yum install dd-check-integration`, replacing `integration` with the name of the chosen integration. So if you are installing `mysql`, then run `yum install dd-check-mysql`.

### Installing on apt-based systems

1.  Run `apt-get update` to ensure your system has access to the latest packages.
1.  Run `apt-get install dd-check-integration`, replacing `integration` with the name of the chosen integration. So if you are installing `mysql`, then run `apt-get install dd-check-mysql`.

### Installing on systems with no package management

1.  Copy the Python script for your chosen integration to the `checks.d` directory where you installed the Agent.
2.  Copy the corresponding yaml configuration file to the `conf.d` directory where you installed the Agent.
