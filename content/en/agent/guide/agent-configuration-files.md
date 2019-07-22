---
title: Agent Configuration Files
kind: guide
aliases:
  - /agent/faq/agent-configuration-files
---

## Agent main configuration file

The Agent v6 configuration file uses **YAML** to better support complex configurations, and to provide a consistent configuration experience, as Checks also use YAML configuration files. Therefore, `datadog.conf` (v5) is now retired in favor of `datadog.yaml` (v6).

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform                             | Command                              |
| :--------                            | :--------                            |
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| CentOS                               | `/etc/datadog-agent/datadog.yaml`    |
| Debian                               | `/etc/datadog-agent/datadog.yaml`    |
| Fedora                               | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| RedHat                               | `/etc/datadog-agent/datadog.yaml`    |
| Source                               | `/etc/datadog-agent/datadog.yaml`    |
| Suse                                 | `/etc/datadog-agent/datadog.yaml`    |
| Ubuntu                               | `/etc/datadog-agent/datadog.yaml`    |
| Windows Server 2008, Vista and newer | `\\ProgramData\Datadog\datadog.yaml` |
| Windows Server 2003, XP or older     | *unsupported platform*               |


{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform                             | Command                                                                    |
| :--------                            | :-----                                                                     |
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| CentOS                               | `/etc/dd-agent/datadog.conf`                                               |
| Debian                               | `/etc/dd-agent/datadog.conf`                                               |
| Fedora                               | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |
| RedHat                               | `/etc/dd-agent/datadog.conf`                                               |
| Source                               | `/etc/dd-agent/datadog.conf`                                               |
| Suse                                 | `/etc/dd-agent/datadog.conf`                                               |
| Ubuntu                               | `/etc/dd-agent/datadog.conf`                                               |
| Windows Server 2008, Vista and newer | `\\ProgramData\Datadog\datadog.conf`                                       |
| Windows Server 2003, XP or older     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

{{% /tab %}}
{{< /tabs >}}

Note: [A full example of the `datadog.yaml` file is available in the `datadog-agent` Github repository][1].

## Agent configuration directory

Prior releases of Datadog Agent stored configuration files in `/dd-agent/conf.d/`. Starting with the 6.0 release, configuration files are stored in `/etc/datadog-agent/conf.d/<CHECK_NAME>`.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform                             | Command                        |
| :--------                            | :--------                      |
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
| Windows Server 2008, Vista and newer | `\\ProgramData\Datadog\conf.d` |
| Windows Server 2003, XP or older     | *unsupported platform*         |

### Checks configuration files for Agent 6

In order to provide a more flexible way to define the configuration for a check, from version 6.0.0, the Agent loads any valid YAML file contained in the folder:

`/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`.

Note: For log collection, to prevent duplicate logs from being sent to Datadog, the Agent does not accept multiple YAML files that point to the same log source. In the case where there is more than one YAML file that points to the same log source, the Agent considers the files in alphabetical order and uses the first file.

This way, complex configurations can be broken down into multiple files. For example, a configuration for the `http_check` might look like this:

```
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Autodiscovery template files are stored in the configuration folder as well. For example, consider `redisdb`:

```
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

To preserve backwards compatibility, the Agent still picks up configuration files in the form `/etc/datadog-agent/conf.d/<check_name>.yaml`, but migrating to the new layout is strongly recommended.

{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform                             | Command                                                              |
| :--------                            | :-----                                                               |
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| Source                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008, Vista and newer | `\\ProgramData\Datadog\conf.d`                                       |
| Windows Server 2003, XP or older     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

{{% /tab %}}
{{< /tabs >}}

## JMX configuration file

JMX Agent checks have an additional `metrics.yaml` file in their configuration folder. It is a list of all the beans that the Datadog Agent collects by default. This way, you do not need to list all of the beans manually when you configure a check through [Docker labels or k8s annotations][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /agent/autodiscovery/integrations/#configuration
