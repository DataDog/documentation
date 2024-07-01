---
"app_id": "supervisord"
"app_uuid": "c4ee3618-f4b4-48b8-9515-a4a2f4091c0d"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "supervisord.process.count"
      "metadata_path": "metadata.csv"
      "prefix": "supervisord."
    "process_signatures":
    - "python supervisord"
    - "supervisord"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "116"
    "source_type_name": "Supervisord"
  "saved_views":
    "supervisord_processes": "assets/saved_views/supervisord_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/supervisord/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "supervisord"
"integration_id": "supervisord"
"integration_title": "Supervisord"
"integration_version": "2.6.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "supervisord"
"public_title": "Supervisord"
"short_description": "Monitor the status, uptime, and number of supervisor-managed processes."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::OS & System"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Monitor the status, uptime, and number of supervisor-managed processes."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Supervisord"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Supervisor Event][1]

## Overview

This check monitors the uptime, status, and number of processes running under Supervisor.

## Setup

### Installation

The Supervisor check is included in the [Datadog Agent][2] package, so you don't need to install anything else on servers where Supervisor is running.

### Configuration

#### Prepare supervisord

The Agent can collect data from Supervisor through a HTTP server or UNIX socket. The Agent collects the same data no matter which collection method you configure.

##### HTTP server

Add a block like this to Supervisor's main configuration file (`/etc/supervisor.conf`):

```ini
[inet_http_server]
port=localhost:9001
;username=user  # optional
;password=pass  # optional
```

##### UNIX socket

Add blocks like these to `/etc/supervisor.conf` (if they're not already there):

```ini
[supervisorctl]
serverurl=unix:///var/run/supervisor.sock

[unix_http_server]
file=/var/run/supervisor.sock
chmod=777
chown=nobody:nogroup
;username=user  # optional
;password=pass  # optional
```

If Supervisor is running as root, make sure `chmod` or `chown` is set so that non-root users, such as `dd-agent`, can read the socket.

---

Reload `supervisord`.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

Edit the `supervisord.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample supervisord.d/conf.yaml][2] for all available configuration options:

```yaml
init_config:

instances:
  ## Used to tag service checks and metrics, i.e. supervisor_server:supervisord0
  - name: supervisord0
    host: localhost
    port: 9001
  ## To collect from the socket instead
  # - name: supervisord0
  #   socket: unix:///var/run/supervisor.sock
```

Use the `proc_names` and/or `proc_regex` options to list processes you want the Agent to collect metrics on and create service checks for. If you don't provide either option, the Agent tracks _all_ child processes of Supervisor. If you provide both options, the Agent tracks processes from both lists meaning the two options are not mutually exclusive.

See the [example check configuration][2] for comprehensive descriptions of other check options.

[Restart the Agent][3] to start sending Supervisor metrics to Datadog.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `supervisord`                                                                                                      |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                                      |
| `<INSTANCE_CONFIG>`  | `{"name":"<SUPERVISORD_SERVER_NAME>", "host":"%%host%%", "port":"9001", "username":"<USERNAME>", "password":"<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Log collection



1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `supervisord.d/conf.yaml` file to start collecting your Supervisord Logs:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: supervisord
   ```

   Change the `path` parameter value and configure it for your environment.
   See the [sample supervisord.d/conf.yaml][3] for all available configuration options.

3. [Restart the Agent][4].

### Validation

Run the [Agent's status subcommand][5] and look for `supervisord` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "supervisord" >}}


### Events

The Supervisor check does not include any events.

### Service Checks
{{< get-service-checks-from-git "supervisord" >}}


## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

- [Supervisor monitors your processes. Datadog monitors Supervisor.][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/supervisord/images/supervisorevent.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/supervisor-monitors-your-processes-datadog-monitors-supervisor
