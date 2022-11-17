---
title: Agent Configuration Files
kind: guide
aliases:
  - /agent/faq/agent-configuration-files
---

## Agent main configuration file

The Agent v6 configuration file uses **YAML** to better support complex configurations, and to provide a consistent configuration experience, as Checks also use YAML configuration files. Therefore, `datadog.conf` (v5) is retired in favor of `datadog.yaml` (v6).

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform                             | Command                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows Server 2008, Vista and newer | `%ProgramData%\Datadog\datadog.yaml` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform                             | Command                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |                                       |
| Windows Server 2008, Vista and newer | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003, XP or older     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

{{% /tab %}}
{{< /tabs >}}

## Agent configuration directory

Prior releases of Datadog Agent stored configuration files in `/dd-agent/conf.d/`. Starting with the 6.0 release, configuration files are stored in `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform                             | Command                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Source                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows Server 2008, Vista and newer | `%ProgramData%\Datadog\conf.d` |
| Windows Server 2003, XP or older     | *unsupported platform*         |

### Checks configuration files for Agent 6

An example for each Agent check configuration file is found in the `conf.yaml.example` file in the corresponding `<CHECK_NAME>.d/` folder. Rename this file to `conf.yaml` to enable the associated check. **Note**: The Agent loads valid YAML files contained in the folder: `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`. This allows complex configurations to be broken down into multiple files. For example, a configuration for the `http_check` might look like this:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

A special case are YAML files with the suffix `.default`. These files are loaded by the Agent by default and help define the core set of checks that are always enabled (CPU, memory, uptime ...). They are ignored if any other configuration are found for that check, therefore you can safely ignore them. If you want to disable one of the default checks, remove that file. To configure these checks, `conf.yaml.example` should be use as a base.

Autodiscovery template files are stored in the configuration folder with the `auto_conf.yaml` file. For example, for the Redis check, here is the configuration in `redisdb.d/`:

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

For log collection, the Agent does not accept multiple YAML files that point to the same log source to prevent duplicate logs from being sent to Datadog. In the case where there is more than one YAML file that points to the same log source, the Agent considers the files in alphabetical order and uses the first file.

To preserve backwards compatibility, the Agent still picks up configuration files in the form `/etc/dd-agent/conf.d/<CHECK_NAME>.yaml`, but migrating to the new layout is strongly recommended.

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform                             | Command                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| Source                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008, Vista and newer | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003, XP or older     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

{{% /tab %}}
{{< /tabs >}}

## JMX configuration file

JMX Agent checks have an additional `metrics.yaml` file in their configuration folder. It is a list of all the beans that the Datadog Agent collects by default. This way, you do not need to list all of the beans manually when you configure a check through [Docker labels or k8s annotations][1].

[1]: /agent/kubernetes/integrations/#configuration
