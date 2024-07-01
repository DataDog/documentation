---
"app_id": "varnish"
"app_uuid": "e342e5eb-71ce-4c5b-a9c9-2c33691e858f"
"assets":
  "dashboards":
    "varnish": "assets/dashboards/varnish_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "varnish.n_backend"
      "metadata_path": "metadata.csv"
      "prefix": "varnish."
    "process_signatures":
    - "service varnish start"
    - "varnishd"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "29"
    "source_type_name": "Varnish"
  "saved_views":
    "4xx_errors": "assets/saved_views/4xx_errors.json"
    "5xx_errors": "assets/saved_views/5xx_errors.json"
    "bot_errors": "assets/saved_views/bot_errors.json"
    "status_code_overview": "assets/saved_views/status_code_overview.json"
    "varnish_processes": "assets/saved_views/varnish_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "log collection"
- "network"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/varnish/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "varnish"
"integration_id": "varnish"
"integration_title": "Varnish"
"integration_version": "2.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "varnish"
"public_title": "Varnish"
"short_description": "Track client and backend connections, cache misses and evictions, and more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track client and backend connections, cache misses and evictions, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Varnish"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Varnish default dashboard][1]

## Overview

This check collects Varnish metrics regarding:

- Clients: connections and requests
- Cache performance: hits, evictions, etc.
- Threads: creations, failures, and threads queued
- Backends: successful, failed, and retried connections

It also submits service checks for the health of each backend.

## Setup

### Installation

The Varnish check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### Configuration

##### Prepare Varnish

If you're running Varnish 4.1+, add the `dd-agent` system user to the Varnish group using:

```text
sudo usermod -G varnish -a dd-agent
```

If you use a `secretfile`, you must ensure it is readable by the `dd-agent` user.

##### Metric collection

1. Edit the `varnish.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][3]. See the [sample varnish.d/conf.yaml][4] for all available configuration options.

   ```yaml
   init_config:

   instances:
     - varnishstat: /usr/bin/varnishstat
       varnishadm: <PATH_TO_VARNISHADM_BIN>
   ```

    **Note**: If you don't set `varnishadm`, the Agent doesn't check backend health. If you do set it, the Agent needs privileges to execute the binary with root privileges. Add the following to your `/etc/sudoers` file:

   ```shell
     dd-agent ALL=(ALL) NOPASSWD:/usr/bin/varnishadm
   ```

2. [Restart the Agent][5].

##### Log collection

_Available for Agent versions >6.0_

1. To enable Varnish logging uncomment the following in `/etc/default/varnishncsa`:

   ```text
     VARNISHNCSA_ENABLED=1
   ```

2. Add the following at the end of the same file:

   ```text
     LOG_FORMAT="{\"date_access\": \"%{%Y-%m-%dT%H:%M:%S%z}t\", \"network.client.ip\":\"%h\", \"http.auth\" : \"%u\", \"varnish.x_forwarded_for\" : \"%{X-Forwarded-For}i\", \"varnish.hit_miss\":  \"%{Varnish:hitmiss}x\", \"network.bytes_written\": %b, \"http.response_time\": %D, \"http.status_code\": \"%s\", \"http.url\": \"%r\", \"http.ident\": \"%{host}i\", \"http.method\": \"%m\", \"varnish.time_first_byte\" : %{Varnish:time_firstbyte}x, \"varnish.handling\" : \"%{Varnish:handling}x\", \"http.referer\": \"%{Referer}i\", \"http.useragent\": \"%{User-agent}i\" }"

     DAEMON_OPTS="$DAEMON_OPTS -c -a -F '${LOG_FORMAT}'"
   ```

3. Restart the `varnishncsa` utility to apply the changes.

4. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

5. Add this configuration block to your `varnish.d/conf.yaml` file to start collecting your Varnish logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/varnish/varnishncsa.log
       source: varnish
       service: varnish
   ```

    Change the `path` and `service` parameter value and configure them for your environment. See the [sample varnish.yaml][4] for all available configuration options.

6. [Restart the Agent][5].


### Validation

Run the [Agent's status subcommand][6] and look for `varnish` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "varnish" >}}


### Events

The Varnish check does not include any events.

### Service Checks
{{< get-service-checks-from-git "varnish" >}}


## Troubleshooting

Need help? Contact [Datadog support][9].

## Further Reading

Additional helpful documentation, links, and articles:

- [Top Varnish performance metrics][10]
- [How to collect Varnish metrics][11]
- [Monitor Varnish using Datadog][12]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/varnish/images/varnish.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/varnish/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/varnish/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/
[10]: https://www.datadoghq.com/blog/top-varnish-performance-metrics
[11]: https://www.datadoghq.com/blog/how-to-collect-varnish-metrics
[12]: https://www.datadoghq.com/blog/monitor-varnish-using-datadog

