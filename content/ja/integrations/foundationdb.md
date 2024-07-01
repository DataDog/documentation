---
"app_id": "foundationdb"
"app_uuid": "0ab23627-c6f5-4ec5-b42c-43b85dc26445"
"assets":
  "dashboards":
    "FoundationDB Latency Probe": assets/dashboards/foundationdb_latency_probe.json
    "FoundationDB Processes and Utilization": assets/dashboards/foundationdb_processes_and_utilization.json
    "FoundationDB Transactions and Queues": assets/dashboards/foundationdb_transactions_and_queues.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - foundationdb.processes
      - foundationdb.instances
      "metadata_path": metadata.csv
      "prefix": foundationdb.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10258"
    "source_type_name": FoundationDB
  "monitors":
    "FoundationDB Errors Logged": assets/monitors/errors_logged.json
    "FoundationDB High Durability Lag": assets/monitors/high_durability_lag.json
    "FoundationDB High Level Of Conflicted Transactions": assets/monitors/conflicts.json
    "FoundationDB High Level Of Rejected Transactions": assets/monitors/rejections.json
    "FoundationDB Log Queue Reaching Spill Threshold": assets/monitors/log_queue_spill.json
    "FoundationDB Low Disk Space": assets/monitors/low_disk_space.json
    "FoundationDB Read Latency Probe": assets/monitors/read_latency_probe.json
    "FoundationDB Status Check": assets/monitors/service_check.json
    "FoundationDB Transaction Commit Latency Probe": assets/monitors/transaction_commit_latency.json
    "FoundationDB Transaction Start Latency Probe": assets/monitors/transaction_start_latency.json
  "saved_views":
    "all": assets/saved_views/all.json
    "errors": assets/saved_views/errors.json
    "errors_and_strong_warnings": assets/saved_views/errors_and_strong_warnings.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- data stores
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/foundationdb/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "foundationdb"
"integration_id": "foundationdb"
"integration_title": "FoundationDB"
"integration_version": "1.4.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "foundationdb"
"public_title": "FoundationDB"
"short_description": "FoundationDB integration"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": FoundationDB integration
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": FoundationDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [FoundationDB][1] through the Datadog Agent. Aside from
checking that the FoundationDB cluster is healthy, it also collects numerous metrics
and, optionally, FoundationDB transaction logs.

## Setup

Both the check and metrics apply to the FoundationDB cluster as a whole,
and should only be installed on one host. The host doesn't need to be one that is
running FoundationDB, but just one with access to it.

### Installation

The FoundationDB check is included in the [Datadog Agent][2] package,
but requires the [FoundationDB client][3] to be installed.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. To start collecting your FoundationDB metrics, edit the `foundationdb.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory.
   See the [sample foundationdb.d/conf.yaml][1] for all available configuration options.

2. The cluster to check is determined by searching for a cluster file  in the [default location][2]. If the cluster file is located elsewhere,
set the `cluster_file` property. Only one cluster can be monitored per check instance.

3. If the cluster is [configured to use TLS][3], further properties should  be set in the configuration. These properties follow the names of the TLS
related options given to `fdbcli` to connect to such a cluster.

4. [Restart the Agent][4].

##### Log collection

FoundationDB writes XML logs by default, however, Datadog integrations expect JSON logs. Thus, a configuration change needs to be made to
FoundationDB.

1. Locate your `foundationdb.conf` file. Under the `fdbserver` section, add
   or change the key `trace_format` to have the value `json`. Also, make
   note of the `logdir`.

    ```
    [fdbserver]
    ...
    logdir = /var/log/foundationdb
    trace_format = json
    ```

2. Restart the FoundationDB server so the changes take effect. Verify that
   logs in the `logdir` are written in JSON.

3. Ensure that log collection is enabled in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

4. In the `foundationdb.d/conf.yaml` file, uncomment the `logs` section
   and set the path to the one in your FoundationDB configuration file,
   appending `*.json`.

    ```yaml
    logs:
      - type: file
        path: /var/log/foundationdb/*.json
        service: foundationdb
        source: foundationdb
    ```

5. Make sure the Datadog Agent has the privileges required to list the
   directory and read its files.

5. Restart the Datadog Agent.

[1]: https://github.com/DataDog/integrations-core/blob/master/foundationdb/datadog_checks/foundationdb/data/conf.yaml.example
[2]: https://apple.github.io/foundationdb/administration.html#default-cluster-file
[3]: https://www.foundationdb.org/
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.


##### Metric collection

| Parameter            | Value                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `foundationdb`                                             |
| `<INIT_CONFIG>`      | blank or `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{}`                                                       |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection][2].

| Parameter      | Value                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "foundationdb", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}


### Validation

[Run the Agent's status subcommand][4] and look for `foundationdb` under the **Checks** section.


## Data Collected

### Metrics
{{< get-metrics-from-git "foundationdb" >}}


### Events

The FoundationDB check does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][5].


[1]: https://www.foundationdb.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://apple.github.io/foundationdb/downloads.html
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
