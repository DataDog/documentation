---
"app_id": "couchdb"
"app_uuid": "0a7006e2-c76d-4ef0-8af7-347bad2db768"
"assets":
  "dashboards":
    "couchdb": "assets/dashboards/CouchDB-overview_dashboard.json"
    "couchdb-v1": "assets/dashboards/CouchDBv1-overview_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "couchdb.couchdb.request_time.n"
      - "couchdb.couchdb.request_time"
      "metadata_path": "metadata.csv"
      "prefix": "couchdb."
    "process_signatures":
    - "couchjs"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "20"
    "source_type_name": "CouchDB"
  "saved_views":
    "couchdb_processes": "assets/saved_views/couchdb_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "data stores"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/couch/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "couch"
"integration_id": "couchdb"
"integration_title": "CouchDB"
"integration_version": "6.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "couch"
"public_title": "CouchDB"
"short_description": "Track and graph your CouchDB activity and performance metrics."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track and graph your CouchDB activity and performance metrics."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "CouchDB"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![CouchDB dashboard][1]

## Overview

Capture CouchDB data in Datadog to:

- Visualize key CouchDB metrics.
- Correlate CouchDB performance with the rest of your applications.

For performance reasons, the CouchDB version you're using is cached, so you cannot monitor CouchDB instances with different versions with the same agent instance.

## Setup

### Installation

The CouchDB check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your CouchDB servers.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `couch.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your CouchDB performance data. See the [sample couch.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The Couch server's url.
     #
     - server: http://localhost:5984
   ```

    **Note**: provide a `db_include` and `db_exclude` to control which databases the Agent should and should not collect metrics from.

2. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `couch.d/conf.yaml` file to start collecting your CouchDB Logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/couchdb/couch.log
       source: couchdb
       service: couch
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample couch.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couch`                              |
| `<INIT_CONFIG>`      | blank or `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:5984"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "couchdb", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `couch` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "couch" >}}


### Events

The Couch check does not include any events.

### Service Checks
{{< get-service-checks-from-git "couch" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].

## Further Reading

- [Monitoring CouchDB performance with Datadog][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog
