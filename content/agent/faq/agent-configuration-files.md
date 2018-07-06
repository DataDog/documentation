---
title: Agent configuration files
kind: faq
---

## Agent main configuration file 

The primary agent configuration file has been transitioned between Agent v5 and agent v6 respectively from **INI** format to **YAML** to better support complex configurations and for a more consistent experience across the Agent and Checks; as such `datadog.conf` is now retired in favor of `datadog.yaml`.

| Platform                             | Agent v5                                                                   | Agent v6                             |
| :--------                            | :-----                                                                     | :--------                            |
| Linux                                | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| CentOS                               | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| Debian                               | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| Fedora                               | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| MacOS x                              | `~/.datadog-agent/datadog.conf`                                            | `~/.datadog-agent/datadog.yaml`      |
| RedHat                               | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| Source                               | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| Suse                                 | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| Ubuntu                               | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| Windows Server 2008, Vista and newer | `\\ProgramData\Datadog\datadog.conf`                                       | `\\ProgramData\Datadog\datadog.yaml` |
| Windows Server 2003, XP or older     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` | `n/a` _(unsupported OS)_             |

## Agent configuration directory

Prior releases of Datadog Agent stored configuration files in `/dd-agent/conf.d/`. Starting with the 6.0 release configuration files are stored in
`/datadog-agent/conf.d/<CHECK_NAME>`.

| Platform                             | Agent v5                                                             | Agent v6                       |
| :--------                            | :-----                                                               | :--------                      |
| Linux                                | `/etc/dd-agent/conf.d/`                                              | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/dd-agent/conf.d/`                                              | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              | `/etc/datadog-agent/conf.d/`   |
| MacOS x                              | `~/.datadog-agent/conf.d/`                                           | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              | `/etc/datadog-agent/conf.d/`   |
| Source                               | `/etc/dd-agent/conf.d/`                                              | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              | `/etc/datadog-agent/conf.d/`   |
| Windows Server 2008, Vista and newer | `\\ProgramData\Datadog\conf.d`                                       | `\\ProgramData\Datadog\conf.d` |
| Windows Server 2003, XP or older     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` | `n/a` _(unsupported OS)_       |

### Checks configuration files for Agent 6

In order to provide a more flexible way to define the configuration for a check, from version 6.0.0 the Agent loads any valid YAML file contained in the folder:

`/datadog-agent/conf.d/<check_name>.d/`.

This way, complex configurations can be broken down into multiple files: for example, a configuration for the `http_check` might look like this:

```
/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Autodiscovery template files will be stored in the configuration folder as well, for example this is how the `redisdb` check configuration folder looks like:

```
/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

To keep backwards compatibility, the Agent still picks up configuration files in the form `/datadog-agent/conf.d/<check_name>.yaml` but migrating to the new layout is strongly recommended.

[1]: /agent/basic_agent_usage/windows/#configuration