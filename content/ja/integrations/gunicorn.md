---
"app_id": "gunicorn"
"app_uuid": "49687997-bbf2-45db-9b4f-223cf7c492ed"
"assets":
  "dashboards":
    "gunicorn": "assets/dashboards/gunicorn_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "gunicorn.workers"
      "metadata_path": "metadata.csv"
      "prefix": "gunicorn."
    "process_signatures":
    - "gunicorn: master"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "60"
    "source_type_name": "Gunicorn"
  "saved_views":
    "4xx_errors": "assets/saved_views/4xx_errors.json"
    "5xx_errors": "assets/saved_views/5xx_errors.json"
    "bot_errors": "assets/saved_views/bot_errors.json"
    "gunicorn_processes": "assets/saved_views/gunicorn_processes.json"
    "status_code_overview": "assets/saved_views/status_code_overview.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/gunicorn/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gunicorn"
"integration_id": "gunicorn"
"integration_title": "Gunicorn"
"integration_version": "2.7.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "gunicorn"
"public_title": "Gunicorn"
"short_description": "Monitor request rates and durations, log-message rates, and worker processes."
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Monitor request rates and durations, log-message rates, and worker processes."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Gunicorn"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Gunicorn Dashboard][1]

## Overview

The Datadog Agent collects one main metric about Gunicorn: the number of worker processes running. It also sends one service check: whether or not Gunicorn is running.

Gunicorn itself can provide further metrics using DogStatsD, including:

- Total request rate
- Request rate by status code (2xx, 3xx, 4xx, 5xx)
- Request duration (average, median, max, 95th percentile, etc.)
- Log message rate by log level (critical, error, warning, exception)

## Setup

### Installation

The Datadog Agent's Gunicorn check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Gunicorn servers.

The Gunicorn check requires your Gunicorn app's Python environment to have the [`setproctitle`][3] package; without it, the Datadog Agent reports that it cannot find a `gunicorn` master process (and hence, cannot find workers, either). Install the `setproctitle` package in your app's Python environment if you want to collect the `gunicorn.workers` metric.

### Configuration

Edit the `gunicorn.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Gunicorn [metrics](#metric-collection) and [logs](#log-collection).
See the [sample gunicorn.yaml][5] for all available configuration options.

#### Metric collection

##### Connect Gunicorn to DogStatsD

1. As of version 19.1, Gunicorn [provides an option][6] to send its metrics to a daemon that implements the StatsD protocol, such as [DogStatsD][7]. As with many Gunicorn options, you can either pass it to `gunicorn` on the CLI (`--statsd-host`) or set it in your app's configuration file (`statsd_host`). To ensure that you collect **all Gunicorn metrics**, configure your app to send metrics to [DogStatsD][7] at `"localhost:8125"`, and restart the app.

2. Add this configuration block to your `gunicorn.d/conf.yaml` file to start gathering [Gunicorn metrics](#metrics):

```yaml
init_config:

instances:
    ## @param proc_name - string - required
    ## The name of the gunicorn process. For the following gunicorn server:
    ##
    ## gunicorn --name <WEB_APP_NAME> <WEB_APP_CONFIG>.ini
    ##
    ## the name is `<WEB_APP_NAME>`
  - proc_name: <YOUR_APP_NAME>
```

3. [Restart the Agent][8] to begin sending Gunicorn metrics to Datadog.

#### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Use the following command to configure the path of the [access log][9] file:
    `--access-logfile <MY_FILE_PATH>`

3. Use the following command to configure the path of the [error log][10] file:
    `--error-logfile FILE, --log-file <MY_FILE_PATH>`

4. Add this configuration block to your `gunicorn.d/conf.yaml` file to start collecting your Gunicorn logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/gunicorn/access.log
       service: "<MY_SERVICE>"
       source: gunicorn

     - type: file
       path: /var/log/gunicorn/error.log
       service: "<MY_SERVICE>"
       source: gunicorn
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \[\d{4}-\d{2}-\d{2}
   ```

    Change the `service` and `path` parameter values and configure them for your environment. See the [sample gunicorn.yaml][5] for all available configuration options.

5. [Restart the Agent][8].

### Validation

[Run the Agent's status subcommand][11] and look for `gunicorn` under the Checks section.

If the status is not `OK`, see the Troubleshooting section.

Use `netstat` to verify that Gunicorn is sending _its_ metrics, too:

```text
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:38374         127.0.0.1:8125          ESTABLISHED 15500/gunicorn: mas
```

## Data Collected

### Metrics
{{< get-metrics-from-git "gunicorn" >}}


### Events

The Gunicorn check does not include any events.

### Service Checks
{{< get-service-checks-from-git "gunicorn" >}}


## Troubleshooting

### Agent cannot find Gunicorn process

```shell
  Checks
  ======

    gunicorn (5.12.1)
    -----------------
      - instance #0 [ERROR]: 'Found no master process with name: gunicorn: master [my_web_app]'
      - Collected 0 metrics, 0 events & 1 service check
      - Dependencies:
          - psutil: 4.4.1
```

Either Gunicorn really isn't running, or your app's Python environment doesn't have the `setproctitle` package installed.

If `setproctitle` is not installed, Gunicorn appears in the process table like so:

```text
$ ps -ef | grep gunicorn
ubuntu   18013 16695  2 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18018 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18019 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
```

If it _is_ installed, `gunicorn` processes appear in the format the Datadog Agent expects:

```text
$ ps -ef | grep gunicorn
ubuntu   18457 16695  5 20:26 pts/0    00:00:00 gunicorn: master [my_app]
ubuntu   18462 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
ubuntu   18463 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
```

## Further Reading

- [Monitor Gunicorn performance with Datadog][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/gunicorn/images/gunicorn-dash.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://pypi.python.org/pypi/setproctitle
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[6]: https://docs.gunicorn.org/en/stable/settings.html#statsd-host
[7]: https://docs.datadoghq.com/guides/dogstatsd/
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.gunicorn.org/en/stable/settings.html#accesslog
[10]: https://docs.gunicorn.org/en/stable/settings.html#errorlog
[11]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/assets/service_checks.json
[14]: https://www.datadoghq.com/blog/monitor-gunicorn-performance

