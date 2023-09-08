---
dependencies:
- https://github.com/DataDog/ansible-datadog/blob/main/README.md
kind: documentation
title: Set up Ansible Using a Standalone Datadog Role
---
The Datadog Agent Ansible role installs and configures the Datadog Agent and integrations.

## Ansible role versus Ansible collection

The Datadog Agent Ansible role is available through 2 different channels:

* As part of the Datadog collection, accessible under the [datadog.dd](https://galaxy.ansible.com/DataDog/dd) name on Ansible Galaxy (recommended).
* As a standalone role, accessible under the [datadog.datadog](https://galaxy.ansible.com/DataDog/datadog) name on Ansible Galaxy (legacy).

Version `4` of the role and version `5` of the collection install the Datadog Agent v7 by default.

## Setup

Note that the install instructions in this document describe installation of the standalone Datadog role. For installation instructions of the Datadog collection, please refer to [the collection README file](https://github.com/ansible-collections/Datadog/blob/main/README.md). The configuration variables are the same for both the standalone role as well as the role accessed through the collection.

### Requirements

- Requires Ansible v2.6+.
- Supports most Debian and RHEL-based Linux distributions, macOS, and Windows.
- When using with Ansible 2.10+ to manage Windows hosts, requires the `ansible.windows` collection to be installed:

  ```shell
  ansible-galaxy collection install ansible.windows
  ```

### Installation

Install the [Datadog role][1] from Ansible Galaxy on your Ansible server:

```shell
ansible-galaxy install datadog.datadog
```

To deploy the Datadog Agent on hosts, add the Datadog role and your API key to your playbook:

```text
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

## Role variables

| Variable                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog_api_key`                           | Your Datadog API key.|
| `datadog_site`                              | The site of the Datadog intake to send Agent data to. Defaults to `datadoghq.com`, set to `datadoghq.eu` to send data to the EU site. This option is only available with Agent version >= 6.6.0.|
| `datadog_agent_flavor`                      | Override the default Debian / RedHat Package for IOT Installations on RPI. Defaults to "datadog-agent" - use "datadog-iot-agent" for RPI.|
| `datadog_agent_version`                     | The pinned version of the Agent to install (optional, but recommended), for example: `7.16.0`. Setting `datadog_agent_major_version` is not needed if `datadog_agent_version` is used.|
| `datadog_agent_major_version`               | The major version of the Agent to install. The possible values are 5, 6, or 7 (default). If `datadog_agent_version` is set, it takes precedence otherwise the latest version of the specified major is installed. Setting `datadog_agent_major_version` is not needed if `datadog_agent_version` is used.|
| `datadog_checks`                            | YAML configuration for Agent checks to drop into: <br> - `/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml` for Agent v6 and v7, <br> - `/etc/dd-agent/conf.d` for Agent v5.|
| `datadog_disable_untracked_checks`          | Set to `true` to remove all checks not present in `datadog_checks` and `datadog_additional_checks`.|
| `datadog_additional_checks`                 | List of additional checks that are not removed if `datadog_disable_untracked_checks` is set to `true`.|
| `datadog_disable_default_checks`            | Set to `true` to remove all default checks.|
| `datadog_config`                            | Set configuration for the Datadog Agent. The role writes the config to the [correct location based on the operating system](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file). For a full list of config options, see [the `datadog.yaml` template file in the datadog-agent GitHub repository](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml).|
| `datadog_config_ex`                         | (Optional) Extra INI sections to go in `/etc/dd-agent/datadog.conf` (Agent v5 only).|
| `datadog_apt_repo`                          | Override the default Datadog `apt` repository. Make sure to use the `signed-by` option if repository metadata is signed using Datadog's signing keys: `deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://yourrepo`.|
| `datadog_apt_cache_valid_time`              | Override the default apt cache expiration time (defaults to 1 hour).|
| `datadog_apt_key_url_new`                   | Override the location from which to obtain Datadog `apt` key (the deprecated `datadog_apt_key_url` variable refers to an expired key that's been removed from the role). The URL is expected to be a GPG keyring containing keys `382E94DE`, `F14F620E` and `C0962C7D`.| 
| `datadog_yum_repo`                          | Override the default Datadog `yum` repository.|
| `datadog_yum_repo_gpgcheck`                 | Override the default `repo_gpgcheck` value (empty). If empty, value is dynamically set to `yes` when custom `datadog_yum_repo` is not used and system is not RHEL/CentOS 8.1 (due to [a bug](https://bugzilla.redhat.com/show_bug.cgi?id=1792506) in dnf), otherwise it's set to `no`. **Note**: repodata signature verification is always turned off for Agent 5.|
| `datadog_yum_gpgcheck`                      | Override the default `gpgcheck` value (`yes`) - use `no` to turn off package GPG signature verification.|
| `datadog_yum_gpgkey`                        | **Removed in version 4.18.0** Override the default URL to the Datadog `yum` key used to verify Agent v5 and v6 (up to 6.13) packages (key ID `4172A230`).|
| `datadog_yum_gpgkey_e09422b3`               | Override the default URL to the Datadog `yum` key used to verify Agent v6.14+ packages (key ID `E09422B3`).|
| `datadog_yum_gpgkey_e09422b3_sha256sum`     | Override the default checksum of the `datadog_yum_gpgkey_e09422b3` key.|
| `datadog_zypper_repo`                       | Override the default Datadog `zypper` repository.|
| `datadog_zypper_repo_gpgcheck`              | Override the default `repo_gpgcheck` value (empty). If empty, value is dynamically set to `yes` when custom `datadog_zypper_repo` is not used, otherwise it's set to `no`. **Note**: repodata signature verification is always turned off for Agent 5.|
| `datadog_zypper_gpgcheck`                   | Override the default `gpgcheck` value (`yes`) - use `no` to turn off package GPG signature verification.|
| `datadog_zypper_gpgkey`                     | **Removed in version 4.18.0** Override the default URL to the Datadog `zypper` key used to verify Agent v5 and v6 (up to 6.13) packages (key ID `4172A230`).|
| `datadog_zypper_gpgkey_sha256sum`           | **Removed in version 4.18.0** Override the default checksum of the `datadog_zypper_gpgkey` key.|
| `datadog_zypper_gpgkey_e09422b3`            | Override the default URL to the Datadog `zypper` key used to verify Agent v6.14+ packages (key ID `E09422B3`).|
| `datadog_zypper_gpgkey_e09422b3_sha256sum`  | Override the default checksum of the `datadog_zypper_gpgkey_e09422b3` key.|
| `datadog_agent_allow_downgrade`             | Set to `yes` to allow Agent downgrade (use with caution, see `defaults/main.yml` for details). **Note**: Downgrades are not supported on Windows platforms.|
| `datadog_enabled`                           | Set to `false` to prevent `datadog-agent` service from starting (defaults to `true`).|
| `datadog_additional_groups`                 | Either a list, or a string containing a comma-separated list of additional groups for the `datadog_user` (Linux only).|
| `datadog_windows_ddagentuser_name`          | The name of Windows user to create/use, in the format `<domain>\<user>` (Windows only).|
| `datadog_windows_ddagentuser_password`      | The password used to create the user and/or register the service (Windows only).|
| `datadog_apply_windows_614_fix`             | Whether or not to download and apply file referenced by `datadog_windows_614_fix_script_url` (Windows only). See https://dtdg.co/win-614-fix for more details. You can set this to `false` assuming your hosts aren't running Datadog Agent 6.14.\*.|
| `datadog_macos_user`                        | The name of the user to run Agent under. The user has to exist, it won't be created automatically. Defaults to `ansible_user` (macOS only).|
| `datadog_macos_download_url`                | Override the URL to download the DMG installer from (macOS only).|
| `datadog_apm_instrumentation_enabled`       | Configure APM host injection. Possible values are: <br/> - `host`: use it when both the Agent and your services are running on a host <br/> - `docker`: use it when the Agent and your services are running in separate Docker containers on the same Host.<br/>- `all`: configures APM injection to support all the previous scenarios at the same time.|
| `datadog_apm_instrumentation_languages`     | List of apm libraries to install if host or docker injection is enabled (defaults to `["all"]`). You can see the available values in our official docs https://docs.datadoghq.com/tracing/trace_collection/library_injection_local|
| `datadog_apm_instrumentation_docker_config` | Configure Docker APM injection. See: https://docs.datadoghq.com/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers#configure-docker-injection|

### Integrations

To configure a Datadog integration (check), add an entry to the `datadog_checks` section. The first level key is the name of the check, and the value is the YAML payload to write the configuration file. Examples are provided below. 

To install or remove an integration, refer to the `datadog_integrations` [paragraph][22]

#### Process check

To define two instances for the `process` check use the configuration below. This creates the corresponding configuration files:

* Agent v6 & v7: `/etc/datadog-agent/conf.d/process.d/conf.yaml`
* Agent v5: `/etc/dd-agent/conf.d/process.yaml`

```yml
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

#### Custom check

To configure a custom check use the configuration below. This creates the corresponding configuration files:

- Agent v6 & v7: `/etc/datadog-agent/conf.d/my_custom_check.d/conf.yaml`
- Agent v5: `/etc/dd-agent/conf.d/my_custom_check.yaml`

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
```

##### Custom Python Checks

To pass a Python check to the playbook, use the configuration below.

This configuration requires the Datadog [play and role][12] to be a part of the larger playbook where the value passed in is the relative file path to the actual task for [Linux][13] or [Windows][14].

This is only available for Agent v6 or later.

The key should be the name of the file created in the checks directory `checks.d/{{ item }}.py`:

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
    datadog_custom_checks:
      my_custom_check: '../../../custom_checks/my_custom_check.py'
```

#### Autodiscovery

When using Autodiscovery, there is no pre-processing nor post-processing on the YAML. This means every YAML section is added to the final configuration file, including `autodiscovery identifiers`.

The example below configures the PostgreSQL check through **Autodiscovery**:

```yml
    datadog_checks:
      postgres:
        ad_identifiers:
          - db-master
          - db-slave
        init_config:
        instances:
          - host: %%host%%
            port: %%port%%
            username: username
            password: password
```

Learn more about [Autodiscovery][3] in the Datadog documentation.

### Tracing

To enable trace collection with Agent v6 or v7 use the following configuration:

```yaml
datadog_config:
  apm_config:
    enabled: true
```

To enable trace collection with Agent v5 use the following configuration:

```yaml
datadog_config:
  apm_enabled: "true" # has to be a string
```

### Live processes

To enable [live process][6] collection with Agent v6 or v7 use the following configuration:

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
```

The possible values for `enabled` are: `"true"`, `"false"` (only container collection), or `"disabled"` (disable live processes entirely).

#### Variables

The following variables are available for live processes:

* `scrub_args`: Enables the scrubbing of sensitive arguments from a process command line (defaults to `true`).
* `custom_sensitive_words`: Expands the default list of sensitive words used by the command line scrubber.

#### System probe

The system probe is configured under the `system_probe_config` variable. Any variables nested underneath are written to the `system-probe.yaml`, in the `system_probe_config` section.

[Network Performance Monitoring][7] (NPM) is configured under the `network_config` variable. Any variables nested underneath are written to the `system-probe.yaml`, in the `network_config` section.

[Cloud Workload Security][8] is configured under the `runtime_security_config` variable. Any variables nested underneath are written to the `system-probe.yaml` and `security-agent.yaml`, in the `runtime_security_config` section.

[Universal Service Monitoring][17] (USM) is configured under the `service_monitoring_config` variable. Any variables nested underneath are written to the `system-probe.yaml`, in the `service_monitoring_config` section.

[Compliance][18] is configured under the `compliance_config` variable. Any variables nested underneath are written to the `security-agent.yaml`, in the `compliance_config` section.

**Note for Windows users**: NPM is supported on Windows with Agent v6.27+ and v7.27+. It ships as an optional component that is only installed if `network_config.enabled` is set to true when the Agent is installed or upgraded. Because of this, existing installations might need to do an uninstall and reinstall of the Agent once to install the NPM component, unless the Agent is upgraded at the same time.

#### Example configuration

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
    scrub_args: true
    custom_sensitive_words: ['consul_token','dd_api_key']
system_probe_config:
  sysprobe_socket: /opt/datadog-agent/run/sysprobe.sock
network_config:
  enabled: true
service_monitoring_config:
  enabled: true
runtime_security_config:
  enabled: true
```

**Note**: This configuration works with Agent 6.24.1+ and 7.24.1+. For older Agent versions, see the [Network Performance Monitoring][9] documentation on how to enable system-probe.

On Linux, once this modification is complete, follow the steps below if you installed an Agent version older than 6.18.0 or 7.18.0:

1. Start the system-probe: `sudo service datadog-agent-sysprobe start` **Note**: If the service wrapper is not available on your system, run this command instead: `sudo initctl start datadog-agent-sysprobe`.
2. [Restart the Agent][10]: `sudo service datadog-agent restart`.
3. Enable the system-probe to start on boot: `sudo service enable datadog-agent-sysprobe`.

For manual setup, see the [NPM][9] documentation.

#### Agent v5

To enable [live process][6] collection with Agent v5, use the following configuration:

```yml
datadog_config:
  process_agent_enabled: true
datadog_config_ex:
  process.config:
    scrub_args: true
    custom_sensitive_words: "<FIRST_WORD>,<SECOND_WORD>"
```

## Versions

By default, the current major version of the Datadog Ansible role installs Agent v7. The variables `datadog_agent_version` and `datadog_agent_major_version` are available to control the Agent version installed.

For v4+ of this role, when `datadog_agent_version` is used to pin a specific Agent version, the role derives per-OS version names to comply with the version naming schemes of the supported operating systems, for example:

- `1:7.16.0-1` for Debian and SUSE based
- `7.16.0-1` for RedHat-based
- `7.16.0-1` for macOS
- `7.16.0` for Windows.

This makes it possible to target hosts running different operating systems in the same Ansible run, for example:

| Provided                            | Installs     | System                |
|-------------------------------------|--------------|-----------------------|
| `datadog_agent_version: 7.16.0`     | `1:7.16.0-1` | Debian and SUSE-based |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | RedHat-based          |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | macOS                 |
| `datadog_agent_version: 7.16.0`     | `7.16.0`     | Windows               |
| `datadog_agent_version: 1:7.16.0-1` | `1:7.16.0-1` | Debian and SUSE-based |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0-1`   | RedHat-based          |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0`     | Windows               |

**Note**: If the version is not provided, the role uses `1` as the epoch and `1` as the release number.

**Agent v5 (older version)**:

The Datadog Ansible role includes support for Datadog Agent v5 for Linux only. To install Agent v5, use `datadog_agent_major_version: 5` to install the latest version of Agent v5 or set `datadog_agent_version` to a specific version of Agent v5. **Note**: The `datadog_agent5` variable is obsolete and has been removed.

### Repositories

#### Linux

When the variables `datadog_apt_repo`, `datadog_yum_repo`, and `datadog_zypper_repo` are not set, the official Datadog repositories for the major version set in `datadog_agent_major_version` are used:

| # | Default apt repository                    | Default yum repository             | Default zypper repository               |
|---|-------------------------------------------|------------------------------------|-----------------------------------------|
| 5 | deb https://apt.datadoghq.com stable main | https://yum.datadoghq.com/rpm      | https://yum.datadoghq.com/suse/rpm      |
| 6 | deb https://apt.datadoghq.com stable 6    | https://yum.datadoghq.com/stable/6 | https://yum.datadoghq.com/suse/stable/6 |
| 7 | deb https://apt.datadoghq.com stable 7    | https://yum.datadoghq.com/stable/7 | https://yum.datadoghq.com/suse/stable/7 |

To override the default behavior, set these variables to something else than an empty string.

If you previously used the Agent v5 variables, use the **new** variables below with `datadog_agent_major_version` set to `5` or `datadog_agent_version` pinned to a specific Agent v5 version.

| Old                          | New                   |
|------------------------------|-----------------------|
| `datadog_agent5_apt_repo`    | `datadog_apt_repo`    |
| `datadog_agent5_yum_repo`    | `datadog_yum_repo`    |
| `datadog_agent5_zypper_repo` | `datadog_zypper_repo` |

Since version 4.9.0, the `use_apt_backup_keyserver` variable has been removed, as APT keys are obtained from https://keys.datadoghq.com.

#### Windows

When the variable `datadog_windows_download_url` is not set, the official Windows MSI package corresponding to the `datadog_agent_major_version` is used:

| Agent version | Default Windows MSI package URL                                                  |
|---------------|----------------------------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi |
| 7             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi |

To override the default behavior, set this variable to something other than an empty string.

#### macOS

When the variable `datadog_macos_download_url` is not set, the official macOS DMG package corresponding to the `datadog_agent_major_version` is used:

| Agent version | Default macOS DMG package URL                                |
|---------------|--------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/dd-agent/datadog-agent-6-latest.dmg |
| 7             | https://s3.amazonaws.com/dd-agent/datadog-agent-7-latest.dmg |

To override the default behavior, set this variable to something other than an empty string.

### Upgrade

To upgrade from Agent v6 to v7, use `datadog_agent_major_version: 7` to install the latest version or set `datadog_agent_version` to a specific version of Agent v7. Use similar logic to upgrade from Agent v5 to v6.

#### Integration installation

**Available for Agent v6.8+**

Use the `datadog_integration` resource to install a specific version of a Datadog integration. Keep in mind, the Agent comes with the [core integrations][19] already installed. This command is useful for upgrading a specific integration without upgrading the whole Agent. For more details, see [integration management][4].

If you want to configure an integration, refer to the `datadog_checks` [paragraph][21]

Available actions:

- `install`: Installs a specific version of the integration.
- `remove`: Removes an integration.

##### Third party integrations

[Datadog community][20] and [Datadog Marketplace][15] integrations can be installed with the `datadog_integration` resource. **Note**: These integrations are considered to be "third party" and thus need `third_party: true` to be set—see the example below.

##### Syntax

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
```

To install third party integrations, set `third_party` to true:

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
      third_party: true
```

##### Example

This example installs version `1.11.0` of the ElasticSearch integration and removes the `postgres` integration.

```yml
 datadog_integration:
   datadog-elastic:
     action: install
     version: 1.11.0
   datadog-postgres:
     action: remove
```

To see the available versions of Datadog integrations, see their `CHANGELOG.md` file in the [integrations-core repository][5].

### Downgrade

To downgrade to a prior version of the Agent:

1. Set `datadog_agent_version` to a specific version, for example: `5.32.5`.
2. Set `datadog_agent_allow_downgrade` to `yes`.

**Notes:**

- Downgrades are not supported for Windows platforms.

## Playbooks

Below are some sample playbooks to assist you with using the Datadog Ansible role.

The following example sends data to Datadog US (default), enables logs, NPM, and configures a few checks.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
    datadog_agent_version: "7.16.0"
    datadog_config:
      tags:
        - "<KEY>:<VALUE>"
        - "<KEY>:<VALUE>"
      log_level: INFO
      apm_config:
        enabled: true
      logs_enabled: true  # available with Agent v6 and v7
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd' ]
          - name: syslog
            search_string: ['rsyslog' ]
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
      ssh_check:
        init_config:
        instances:
          - host: localhost
            port: 22
            username: root
            password: <YOUR_PASSWORD>
            sftp_check: True
            private_key_file:
            add_missing_keys: True
      nginx:
        init_config:
        instances:
          - nginx_status_url: http://example.com/nginx_status/
            tags:
              - "source:nginx"
              - "instance:foo"
          - nginx_status_url: http://example2.com:1234/nginx_status/
            tags:
              - "source:nginx"
              - "<KEY>:<VALUE>"

        #Log collection is available on Agent 6 and 7
        logs:
          - type: file
            path: /var/log/access.log
            service: myapp
            source: nginx
            sourcecategory: http_web_access
          - type: file
            path: /var/log/error.log
            service: nginx
            source: nginx
            sourcecategory: http_web_access
    # datadog_integration is available on Agent 6.8+
    datadog_integration:
      datadog-elastic:
        action: install
        version: 1.11.0
      datadog-postgres:
        action: remove
    network_config:
      enabled: true
```

### Agent v6

This example installs the latest Agent v6:

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_agent_major_version: 6
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Configuring the site

If using a site other than the default `datadoghq.com`, set the `datadog_site` var to the appropriate URL (eg: `datadoghq.eu`,  `us3.datadoghq.com`).

This example sends data to the EU site:

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_site: "datadoghq.eu"
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Windows

On Windows, remove the `become: yes` option so the role does not fail. Below are two methods to make the example playbooks work with Windows hosts:

#### Inventory file

Using the inventory file is the recommended approach. Set the `ansible_become` option to `no` in the inventory file for each Windows host:

```ini
[servers]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2
windows1 ansible_host=127.0.0.3 ansible_become=no
windows2 ansible_host=127.0.0.4 ansible_become=no
```

To avoid repeating the same configuration for all Windows hosts, group them and set the variable at the group level:

```ini
[linux]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2

[windows]
windows1 ansible_host=127.0.0.3
windows2 ansible_host=127.0.0.4

[windows:vars]
ansible_become=no
```

#### Playbook file

Alternatively, if your playbook **only runs on Windows hosts**, use the following in the playbook file:

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog }
  vars:
    ...
```

**Note**: This configuration fails on Linux hosts. Only use it if the playbook is specific to Windows hosts. Otherwise, use the [inventory file method](#inventory-file).

### Uninstallation

On Windows it's possible to uninstall the Agent by using the following code in your Ansible role:

```yml
- name: Check If Datadog Agent is installed
  win_shell: |
    (get-wmiobject win32_product -Filter "Name LIKE '%datadog%'").IdentifyingNumber
  register: agent_installed_result
- name: Set Datadog Agent installed fact
  set_fact:
    agent_installed: "{{ agent_installed_result.stdout | trim }}"
- name: Uninstall the Datadog Agent
  win_package:
    product_id: "{{ agent_installed }}"
    state: absent
  when: agent_installed != ""
```

However for more control over the uninstall parameters, the following code can be used.
In this example, the '/norestart' flag is added and a custom location for the uninstallation logs is specified:

```yml
- name: Check If Datadog Agent is installed
  win_stat:
  path: 'c:\Program Files\Datadog\Datadog Agent\bin\agent.exe'
  register: stat_file
- name: Uninstall the Datadog Agent
  win_shell: start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/norestart', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
  when: stat_file.stat.exists == True
```

## Troubleshooting

### Debian stretch

**Note:** this information applies to versions of the role prior to 4.9.0. Since 4.9.0, the `apt_key` module is no longer used by the role.

On Debian Stretch, the `apt_key` module used by the role requires an additional system dependency to work correctly. The dependency (`dirmngr`) is not provided by the module. Add the following configuration to your playbooks to make use of the present role:

```yml
---
- hosts: all
  pre_tasks:
    - name: Debian Stretch requires the dirmngr package to use apt_key
      become: yes
      apt:
        name: dirmngr
        state: present
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### CentOS 6/7 with Python 3 interpreter and Ansible 2.10.x or below

The `yum` Python module, which is used in this role to install the Agent on CentOS-based hosts, is only available on Python 2 if Ansible 2.10.x or below is used. In such cases, the `dnf` package manager would have to be used instead.

However, `dnf` and the `dnf` Python module are not installed by default on CentOS-based hosts before CentOS 8. In this case, it is not possible to install the Agent when a Python 3 interpreter is used.

This role fails early when this situation is detected to indicate that Ansible 2.11+ or a Python 2 interpreter is needed when installing the Agent on CentOS / RHEL < 8.

To bypass this early failure detection (for instance, if `dnf` and the `python3-dnf` package are available on your host), set the `datadog_ignore_old_centos_python3_error` variable to `true`.

### Windows

Due to a critical bug in Agent versions `6.14.0` and `6.14.1` on Windows, installation of these versions is blocked (starting with version `3.3.0` of this role).

**NOTE:** Ansible fails on Windows if `datadog_agent_version` is set to `6.14.0` or `6.14.1`. Use `6.14.2` or above.

If you are updating from **6.14.0 or 6.14.1 on Windows**, use the following steps:

1. Upgrade the present `datadog.datadog` Ansible role to the latest version (`>=3.3.0`).
2. Set the `datadog_agent_version` to `6.14.2` or above (defaults to latest).

For more details, see [Critical Bug in Uninstaller for Datadog Agent 6.14.0 and 6.14.1 on Windows][11].

### Ubuntu 20.04 broken by service_facts

Running the `service_facts` module on Ubuntu 20.04 causes the following error:

```
localhost | FAILED! => {
    "changed": false,
    "msg": "Malformed output discovered from systemd list-unit-files: accounts-daemon.service                    enabled         enabled      "
}
```

To fix this, [update Ansible to `v2.9.8` or above][16].

[1]: https://galaxy.ansible.com/Datadog/datadog
[2]: https://github.com/DataDog/ansible-datadog
[3]: https://docs.datadoghq.com/agent/autodiscovery
[4]: https://docs.datadoghq.com/agent/guide/integration-management/
[5]: https://github.com/DataDog/integrations-core
[6]: https://docs.datadoghq.com/infrastructure/process/
[7]: https://docs.datadoghq.com/network_performance_monitoring/
[8]: https://docs.datadoghq.com/security_platform/cloud_workload_security/getting_started/
[9]: https://docs.datadoghq.com/network_performance_monitoring/installation/?tab=agent#setup
[10]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[11]: https://app.datadoghq.com/help/agent_fix
[12]: https://docs.ansible.com/ansible/latest/reference_appendices/playbooks_keywords.html#playbook-keywords
[13]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-linux.yml
[14]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-win.yml
[15]: https://www.datadoghq.com/blog/datadog-marketplace/
[16]: https://github.com/ansible/ansible/blob/stable-2.9/changelogs/CHANGELOG-v2.9.rst#id61
[17]: https://docs.datadoghq.com/tracing/universal_service_monitoring/?tab=configurationfiles#enabling-universal-service-monitoring
[18]: https://docs.datadoghq.com/security/cspm/setup/?tab=docker
[19]: https://github.com/DataDog/integrations-core
[20]: https://github.com/DataDog/integrations-extras
[21]: https://github.com/DataDog/ansible-datadog/tree/nschweitzer/readme#integrations
[22]: https://github.com/DataDog/ansible-datadog/tree/nschweitzer/readme#integrations-installation
