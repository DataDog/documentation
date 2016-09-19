---
title: Installing Core & Extra Integrations
kind: guide
listorder: 3
---
### Overview
Starting with version 5.9 of the Datadog Agent, we are moving integrations from the dd-agent repo on GitHub to the core-integrations and extra-integrations. This move will allow us to have a method to distribute more community-developed integrations, as well as being able to update supported integrations out of band with the Agent. Note: these integrations are not designed for Windows operating systems.

The two integration repositories are defined as follows:

* **core-integrations** - Datadog-supported integrations that were formerly found in the core Agent. 
* **extra-integrations** - Community-supported integrations that have been written according to the guidelines specified by Datadog

All core integrations will continue to be installed with the agent install. You only have to install an integration in core separately if there is an out of band update to that integration. To either install an out-of-band update to a core integration or to install one of the extra integrations, follow these steps:

### Installing on yum-based systems

1.  Run `yum update` to ensure your system has access to the latest packages.
1.  Run `yum install dd-check-integration`, replacing `integration` with the name of the chosen integration. So if you are installing `mysql`, then run `apt-get install dd-check-mysql`.  

### Installing on apt-get-based systems

1.  Run `apt-get update` to ensure your system has access to the latest packages.
1.  Run `apt-get install dd-check-integration`, replacing `integration` with the name of the chosen integration. So if you are installing `mysql`, then run `apt-get install dd-check-mysql`.  

### Installing on systems with no package management

1.  Copy the Python script for your chosen integration to the `checks.d` directory where you installed the Agent.
1.  Copy the corresponding yaml configuration file to the `conf.d` directory where you installed the Agent.
