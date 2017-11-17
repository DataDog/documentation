---
aliases: []
description: Track failed tasks and see playbook runs in your event stream.
git_integration_title: ansible
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Ansible Integration
---

{{< img src="integrations/ansible/ansibledashboard.png" alt="ansible dashbaord" responsive="true" >}}

## Overview

Install the Datadog Ansible callback integration to:

* Get real-time reports on Ansible server runs
* Track key Ansible performance metrics across all your servers
* Quickly identify and discuss failed Ansible runs with your team

For more information about using our integration with Ansible, read [this post on our blog](https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/).

## Setup
### Installation

1.  Ensure the prerequisite python libraries are installed on the server:

    * datadogpy
    * pyyaml (install with pip install pyyaml)

1.  Clone the [ansible-datadog-callback GitHub repo](https://github.com/datadog/ansible-datadog-callback).
1.  Copy datadog_callback.py to your playbook callback directory (by default callback_plugins/ in your playbook's root directory). Create the directory if it doesn't exist.
1.  Create a datadog_callback.yml file alongside datadog_callback.py, and set its contents with your API key, as following:

        api_key: <your-api-key>

1.  You should start seeing Ansible events and metrics appear on Datadog when your playbook is run.

To install the Datadog Agent using Ansible, refer to the [installation documentation here](https://app.datadoghq.com/account/settings#agent/ansible).

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The Ansible integration does not include any event at this time.

### Service Checks
The Ansible integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
