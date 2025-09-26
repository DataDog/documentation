---
dependencies:
- https://github.com/ansible-collections/Datadog/blob/main/README.md
title: Ansible
aliases:
  - /agent/basic_agent_usage/ansible/
---
## Description

The Datadog Ansible collection, `datadog.dd`, is the official collection of Ansible-related Datadog content. It contains the [Ansible Datadog Role](https://github.com/DataDog/ansible-datadog/), which can be accessed as `datadog.dd.agent`, allowing you to install and configure the Datadog Agent and integrations. Agent version 7 is installed by default.

## Requirements

- Ansible v2.10+.
- Supports most Debian, RHEL-based and SUSE-based Linux distributions, macOS, and Windows.
- To manage Windows hosts, install the `ansible.windows` collection:

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- When managing openSUSE/SLES hosts, install the `community.general` collection:
  
  ```shell
  ansible-galaxy collection install community.general
  ```

## Installation

Before using this collection, install it with the Ansible Galaxy command-line tool:

```
ansible-galaxy collection install datadog.dd
```

Alternatively, include it in a `requirements.yml` file and install it with `ansible-galaxy collection install -r requirements.yml`. Include the following in `requirments.yml`:


```yaml
collections:
  - name: datadog.dd
```

**Note**: If you install the collection from Ansible Galaxy, it will not be upgraded automatically when you upgrade the Ansible package. 
To upgrade the collection to the latest available version, run the following command:

```
ansible-galaxy collection install datadog.dd --upgrade
```

You can install a specific version of the collection, for example, if you need to downgrade when something is broken in the latest version (please report an issue in this repository). The following syntax shows how to install version 5.0.0:

```
ansible-galaxy collection install datadog.dd:==5.0.0
```

See [using Ansible collections](https://docs.ansible.com/ansible/devel/user_guide/collections_using.html) for more details.

The Datadog Ansible collection is also available through the [Red Hat Automation Hub](https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/), where it is officially certified by Red Hat.

## Use cases

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

**Note**: If you install the collection through the Ansible Automation Hub, OpenSUSE/SLES functionality depends on a community collection `community.general`. Red Hat Support does not provide support for issues related to community content. Direct all support issues for OpenSUSE/SLES to [Datadog Support][1].


## Testing

The Datadog Collection is tested on CentOS, Debian, Rocky Linux, OpenSUSE, Windows and macOS. Tests are run with latest `ansible-lint` version and sanity checks running with Python 3.9 to Python 3.12.

## Support

If you need support, you can create in issue in the `ansible-collections` GitHub repo, or contact [Datadog Support][1].

## Release notes

You can follow changes in the [CHANGELOG][2] file.

## Further reading

- [Automate Agent installation with the Datadog Ansible collection][6]
- Collection role: `datadog.dd.agent`: Installation and configuration of the Datadog Agent.
  - See [the official documentation for the role][3].
  - See [the repository for the standalone role][4].

## License information

The Datadog Ansible collection is published under [Apache License 2.0][5].

[1]: https://docs.datadoghq.com/help/
[2]: https://github.com/ansible-collections/Datadog/blob/main/CHANGELOG.rst
[3]: https://docs.datadoghq.com/agent/guide/ansible_standalone_role/#setup
[4]: https://github.com/DataDog/ansible-datadog#readme
[5]: https://github.com/ansible-collections/Datadog/blob/main/LICENSE
[6]: https://www.datadoghq.com/blog/datadog-ansible-collection/
