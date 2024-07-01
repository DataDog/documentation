---
"app_id": "powerdns"
"app_uuid": "44e491e1-f7c3-447a-b597-e740196479e0"
"assets":
  "dashboards":
    "powerdns": "assets/dashboards/powerdns_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "powerdns.recursor.questions"
      "metadata_path": "metadata.csv"
      "prefix": "powerdns."
    "process_signatures":
    - "pdns_server"
    - "systemctl start pdns@"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "144"
    "source_type_name": "PowerDNS Recursor"
  "saved_views":
    "powerdns_processes": "assets/saved_views/powerdns_processes.json"
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
- "https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "powerdns_recursor"
"integration_id": "powerdns"
"integration_title": "Power DNS Recursor"
"integration_version": "2.5.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "powerdns_recursor"
"public_title": "Power DNS Recursor"
"short_description": "Keep an eye on strange traffic to and from your PowerDNS recursors."
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
  "description": "Keep an eye on strange traffic to and from your PowerDNS recursors."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Power DNS Recursor"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Track the performance of your PowerDNS Recursor and monitor strange or worrisome traffic. This Agent check collects a variety of metrics from your recursors, including those for:

- Query answer times-see how many responses take less than 1ms, 10ms, 100ms, 1s, or greater than 1s.
- Query timeouts.
- Cache hits and misses.
- Answer rates by type: SRVFAIL, NXDOMAIN, NOERROR.
- Ignored and dropped packets.

And many more.

## Setup

### Installation

The PowerDNS Recursor check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your recursors.

### Configuration

#### Prepare PowerDNS

This check collects performance statistics using PowerDNS Recursor's statistics API. Versions of pdns_recursor before 4.1 do not enable the stats API by default. If you're running an older version, enable it by adding the following to your recursor config file, for example `/etc/powerdns/recursor.conf`:

```conf
webserver=yes
api-key=changeme             # only available since v4.0
webserver-readonly=yes       # default no
#webserver-port=8081         # default 8082
#webserver-address=0.0.0.0   # default 127.0.0.1
```

If you're running pdns_recursor 3.x, prepend `experimental-` to these option names, for example: `experimental-webserver=yes`.

If you're running pdns_recursor >= 4.1, just set `api-key`.

Restart the recursor to enable the statistics API.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `powerdns_recursor.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample powerdns_recursor.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## Host running the recursor.
     #
     - host: 127.0.0.1

       ## @param port - integer - required
       ## Recursor web server port.
       #
       port: 8082

       ## @param api_key - string - required
       ## Recursor web server api key.
       #
       api_key: "<POWERDNS_API_KEY>"

       ## @param version - integer - required - default: 3
       ## Version 3 or 4 of PowerDNS Recursor to connect to.
       ## The PowerDNS Recursor in v4 has a production ready web server that allows for
       ## statistics gathering. In version 3.x the server was marked as experimental.
       ##
       ## As the server was marked as experimental in version 3 many of the metrics have
       ## changed names and the API structure (paths) have also changed. With these changes
       ## there has been a need to separate the two concerns. The check now has a key value
       ## version: which if set to version 4 queries with the correct API path on the
       ## non-experimental web server.
       ##
       ## https://doc.powerdns.com/md/httpapi/api_spec/#url-apiv1serversserver95idstatistics
       #
       version: 3
   ```

2. [Restart the Agent][3].

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add the `dd-agent` user to the `systemd-journal` group by running:
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

3. Add this configuration block to your `powerdns_recursor.d/conf.yaml` file to start collecting your PowerDNS Recursor Logs:

   ```yaml
   logs:
     - type: journald
       source: powerdns
   ```

    See the [sample powerdns_recursor.d/conf.yaml][2] for all available configuration options.

4. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `powerdns_recursor`                                                              |
| `<INIT_CONFIG>`      | blank or `{}`                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host":"%%host%%", "port":8082, "api_key":"<POWERDNS_API_KEY>", "version": 3}` |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "powerdns"}`                  |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][2] and look for `powerdns_recursor` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "powerdns_recursor" >}}


### Events

The PowerDNS Recursor check does not include any events.

### Service Checks
{{< get-service-checks-from-git "powerdns_recursor" >}}


## Troubleshooting

Need help? Contact [Datadog support][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
