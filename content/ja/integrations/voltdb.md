---
"app_id": "voltdb"
"app_uuid": "4ea56824-28da-4beb-8937-c45ef32fdb7f"
"assets":
  "dashboards":
    "VoltDB - Overview": assets/dashboards/voltdb_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": voltdb.cpu.percent_used
      "metadata_path": metadata.csv
      "prefix": voltdb.
    "process_signatures":
    - voltdb
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10149"
    "source_type_name": VoltDB
  "monitors":
    "CPU load": assets/monitors/cpu_load.json
  "saved_views":
    "voltdb_processes": assets/saved_views/voltdb_processes.json
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
- "https://github.com/DataDog/integrations-core/blob/master/voltdb/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "voltdb"
"integration_id": "voltdb"
"integration_title": "VoltDB"
"integration_version": "3.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "voltdb"
"public_title": "VoltDB"
"short_description": "Collect status, performance and other metrics from a VoltDB cluster."
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
  "description": Collect status, performance and other metrics from a VoltDB cluster.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": VoltDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [VoltDB][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

**Note**: This check should only be configured on one Agent per cluster. If you are monitoring a cluster spread across several hosts, install an Agent on each host. However, do not enable the VoltDB integration on more than one host, as this results in duplicate metrics.

### Installation

The VoltDB check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### Configuration

1. Add a `datadog-agent` user. You can do so by editing your VoltDB `deployment.xml` file. **Note**: No specific roles are required, so assign the built-in `user` role.

    ```xml
    <users>
        <!-- ... -->
        <user name="datadog-agent" password="<PASSWORD>" roles="user" />
    </users>
    ```

2. Edit the `voltdb.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your VoltDB performance data. See the [sample voltdb.d/conf.yaml][4] for all available configuration options.

    ```yaml
    init_config:

    instances:
      - url: http://localhost:8080
        username: datadog-agent
        password: "<PASSWORD>"
    ```

3. [Restart the Agent][5].

#### TLS support

If [TLS/SSL][6] is enabled on the client HTTP port:

1. Export your certificate CA file in PEM format:

    ```bash
    keytool -exportcert -file /path/to/voltdb-ca.pem -keystore <KEYSTORE> -storepass <PASSWORD> -alias voltdb -rfc
    ```

1. Export your certificate in PEM format:

    ```bash
    openssl pkcs12 -nodes -in <KEYSTORE> -out /path/to/voltdb.pem -password pass:<PASSWORD>
    ```

    The resulting file should contain the _unencrypted_ private key and the certificate:

    ```
    -----BEGIN PRIVATE KEY-----
    <Private key contents...>
    -----END PRIVATE KEY-----
    -----BEGIN CERTIFICATE-----
    <Certificate contents...>
    -----END CERTIFICATE-----
    ```

2. In your instance configuration, point `url` to the TLS-enabled client endpoint, and set the `tls_cert` and `tls_ca_cert` options. For example:

    ```yaml
    instances:
    - # ...
      url: https://localhost:8443
      tls_cert: /path/to/voltdb.pem
      tls_ca_cert: /path/to/voltdb-ca.pem
    ```

3. [Restart the Agent][5].

#### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `voltdb.d/conf.yaml` file to start collecting your VoltDB logs:

    ```yaml
    logs:
      - type: file
        path: /var/log/voltdb.log
        source: voltdb
    ```

  Change the `path` value based on your environment. See the [sample `voltdb.d/conf.yaml` file][4] for all available configuration options.

  3. [Restart the Agent][5].

  To enable logs for Kubernetes environments, see [Kubernetes Log Collection][7].

### Validation

[Run the Agent's status subcommand][8] and look for `voltdb` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "voltdb" >}}


### Events

This check does not include any events.

### Service Checks
{{< get-service-checks-from-git "voltdb" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://voltdb.com
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/voltdb/datadog_checks/voltdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.voltdb.com/UsingVoltDB/SecuritySSL.php
[7]: https://docs.datadoghq.com/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/voltdb/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/voltdb/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

