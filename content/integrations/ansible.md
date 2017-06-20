---
title: Datadog-Ansible Integration
integration_title: Ansible
kind: integration
newhlevel: true
doclevel: basic
git_integration_title: ansible
---

# Overview

{{< img src="ansibledashboard.png" >}}

Install the Datadog Ansible callback integration to:

* Get real-time reports on Ansible server runs
* Track key Ansible performance metrics across all your servers
* Quickly identify and discuss failed Ansible runs with your team

For more information about using our integration with Ansible, read [this post on our blog](https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/).

# Installation

1.  Ensure the prerequisite python libraries are installed on the server:

    * datadogpy
    * pyyaml (install with pip install pyyaml)

1.  Clone the [ansible-datadog-callback GitHub repo](https://github.com/datadog/ansible-datadog-callback).
1.  Copy datadog_callback.py to your playbook callback directory (by default callback_plugins/ in your playbook's root directory). Create the directory if it doesn't exist.
1.  Create a datadog_callback.yml file alongside datadog_callback.py, and set its contents with your API key, as following:

        api_key: <your-api-key>

1.  You should start seeing Ansible events and metrics appear on Datadog when your playbook is run.

To install the Datadog Agent using Ansible, refer to the [installation documentation here](https://app.datadoghq.com/account/settings#agent/ansible).

# Metrics

{{< get-metrics-from-git >}}
