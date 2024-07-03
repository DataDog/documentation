---
categories:
- automation
- configuration & deployment
- log collection
- orchestration
- provisioning
custom_kind: インテグレーション
dependencies: []
description: 失敗したタスクを追跡し、イベントストリームにプレイブックの実行を表示。
doc_link: https://docs.datadoghq.com/integrations/ansible/
draft: false
git_integration_title: ansible
has_logo: true
integration_id: ansible
integration_title: Ansible
integration_version: ''
is_public: true
manifest_version: '1.0'
name: ansible
public_title: Datadog-Ansible Integration
short_description: Track failed tasks and see playbook runs in your event stream.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/ansible/ansibledashboard.png" alt="Ansible dashboard" popup="true">}}

## Overview

Install the Datadog Ansible callback integration to:

- Get real-time reports on Ansible server runs
- Track key Ansible performance metrics across all your servers
- Quickly identify and discuss failed Ansible runs with your team

For more information about using Datadog integrations with Ansible, read the blog post [Ansible + Datadog: Monitor your automation, automate your monitoring][1].

## Setup

### Installation

1. Ensure the prerequisite Python libraries are installed on the server:

    - datadogpy
    - pyyaml (install with `pip install pyyaml`)
    - For Mac OS X users: If you're running OS-installed Python 2.7.10 or below, upgrade to a newer version of OpenSSL - `pip install pyopenssl idna`

2. Clone the [ansible-datadog-callback GitHub repo][2].
3. Copy `datadog_callback.py` to your playbook callback directory (by default callback_plugins/ in your playbook's root directory). Create the directory if it doesn't exist.
4. Create a `datadog_callback.yml` file alongside `datadog_callback.py`, and set its contents with your API key, as following:


        api_key: <YOUR_DATADOG_API_KEY>


5. Ansible events and metrics appear in Datadog after your playbook is run.

To install the Datadog Agent using Ansible, see the [Agent Installation Instructions][3].

### Log collection

See the [playbook example][4] to learn how to install the Datadog Agent with log collection enabled using Ansible.

## Data Collected

### Metrics
{{< get-metrics-from-git "ansible" >}}


### Events

The [ansible-datadog-callback][2] captures Ansible events from your playbook runs.

### Service Checks

The Ansible integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring
[2]: https://github.com/datadog/ansible-datadog-callback
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=ansible
[4]: https://github.com/DataDog/ansible-datadog#example-playbooks
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/ansible/ansible_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/