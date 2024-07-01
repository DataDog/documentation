---
dependencies:
- "https://github.com/ansible-collections/Datadog/blob/main/README.md"
title: Ansible
---
## Overview

The Datadog Ansible collection, `datadog.dd`, is the official collection of Ansible-related Datadog content. At the moment, it only contains the [Ansible Datadog Role](https://github.com/DataDog/ansible-datadog/). This role can be accessed as `datadog.dd.agent`, allowing to install and configure the Datadog Agent and integrations. Agent version 7 is installed by default.

## Setup

### Requirements

- Requires Ansible v2.10+.
- Supports most Debian, RHEL-based and SUSE-based Linux distributions, macOS, and Windows.
- When using to manage Windows hosts, requires the `ansible.windows` collection to be installed:

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- When using to manage openSUSE/SLES hosts, requires the `community.general` collection to be installed:

  ```shell
  ansible-galaxy collection install community.general
  ```

### Installation

To install from Ansible Galaxy, run:

```shell
ansible-galaxy collection install datadog.dd
```

The Datadog Ansible collection is also available through the [Red Hat Automation Hub](https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/), where it is officially certified by Red Hat.

### Usage

To deploy the Datadog Agent on hosts, add the Datadog role and your API key to your playbook:

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

Note for users installing the collection through the Ansible Automation Hub: OpenSUSE/SLES functionality depends on a community collection `community.general`. Red Hat Support does not provide support for any issues related to community content. Thus, all support issues for OpenSUSE/SLES should be directed to Datadog Support.

### Collection role list

- `datadog.dd.agent`: Installation and configuration of the Datadog Agent.
  - See [the official documentation for the role](https://docs.datadoghq.com/agent/guide/ansible_standalone_role/#setup).
  - See [the repository for the standalone role](https://github.com/DataDog/ansible-datadog#readme).

## Further Reading

Additional helpful documentation, links, and articles:

- [Automate Agent installation with the Datadog Ansible collection](https://www.datadoghq.com/blog/datadog-ansible-collection/)
