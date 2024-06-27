---
title: Agent Configuration Files
aliases:
  - /agent/faq/agent-configuration-files
  - /agent/guide/agent-configuration-files
algolia:
  rank: 80
  category: guide
  subcategory: Agent Configuration Files
  tags: ["agent config", "agent configuration", "agent directory"]

---

## Main configuration file

The location of the Agent configuration file differs depending on the operating system.

| Platform                             | Command                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

See the [sample `config_template.yaml` file][1] for all available configuration options.

## Agent configuration directory

Configuration files for Agent checks and integrations are stored in the `conf.d` directory. The location of the directory differs depending on the operating system.

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
| Windows                              | `%ProgramData%\Datadog\conf.d` |

### Check configuration files

An example for each Agent check configuration file is found in the `conf.yaml.example` file in the corresponding `<CHECK_NAME>.d/` folder. Rename this file to `conf.yaml` to enable the associated check. **Note**: The Agent loads valid YAML files contained in the folder: `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`. This allows complex configurations to be broken down into multiple files. For example, a configuration for the `http_check` might look like this:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

A special case are YAML files with the suffix `.default`. These files are loaded by the Agent by default and help define the core set of checks that are always enabled (CPU, memory, uptime ...). They are ignored if any other configuration are found for that check, therefore you can safely ignore them. If you want to disable one of the default checks, remove that file. To configure these checks, `conf.yaml.example` should be used as a base.

Autodiscovery template files are stored in the configuration folder with the `auto_conf.yaml` file. For example, for the Redis check, here is the configuration in `redisdb.d/`:

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

For log collection, the Agent does not accept multiple YAML files that point to the same log source to prevent duplicate logs from being sent to Datadog. In the case where there is more than one YAML file that points to the same log source, the Agent considers the files in alphabetical order and uses the first file.

## JMX configuration file

JMX Agent checks have an additional `metrics.yaml` file in their configuration folder. It is a list of all the beans that the Datadog Agent collects by default. This way, you do not need to list all of the beans manually when you configure a check through [Docker labels or k8s annotations][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /agent/kubernetes/integrations/#configuration