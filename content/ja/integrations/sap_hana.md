---
app_id: sap-hana
app_uuid: 53d66afa-de92-4f09-9514-778324f38f5c
assets:
  dashboards:
    SAP HANA Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sap_hana.uptime
      metadata_path: metadata.csv
      prefix: sap_hana.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10076
    source_type_name: SAP HANA
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- sap
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sap_hana/README.md
display_on_public_website: true
draft: false
git_integration_title: sap_hana
integration_id: sap-hana
integration_title: SAP HANA
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: sap_hana
public_title: SAP HANA
short_description: Monitor memory, network, volume, and other metrics from your SAP
  HANA system.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::SAP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor memory, network, volume, and other metrics from your SAP HANA
    system.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SAP HANA
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [SAP HANA][1] 2.0, SPS 2 through the Datadog Agent.

## セットアップ

### インストール

The SAP HANA check is included in the [Datadog Agent][2] package. To use this integration, you need to manually install the [hdbcli][3] library.


For Unix:

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install hdbcli==2.10.15
```

For Windows:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install hdbcli==2.10.15
```

#### Prepare HANA

To query certain views, specific privileges must be granted to the chosen HANA monitoring user. For more information, see [Granting privileges](#granting-privileges).

To learn how to set the port number for HANA tenant, single-tenant, and system databases, see the [Connect to SAP documentation][4].

##### User creation

1. Connect to the system database and run the following command to create a user:

   ```shell
   CREATE RESTRICTED USER <USER> PASSWORD <PASSWORD>;
   ```

2. Run the following command to allow the user to connect to the system:

   ```shell
   ALTER USER <USER> ENABLE CLIENT CONNECT;
   ```

3. (optional) To avoid service interruption you may want to make the password long-lived:

   ```shell
   ALTER USER <USER> DISABLE PASSWORD LIFETIME;
   ```

##### Granting privileges

1. Run the following command to create a monitoring role (named `DD_MONITOR` for these examples):

   ```shell
   CREATE ROLE DD_MONITOR;
   ```

2. Run the following command to grant read-only access to all system views:

   ```shell
   GRANT CATALOG READ TO DD_MONITOR;
   ```

3. Then run the following commands to grant select privileges on each system view:

   ```shell
   GRANT SELECT ON SYS.M_DATABASE TO DD_MONITOR;
   GRANT SELECT ON SYS.M_DATABASES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_BACKUP_PROGRESS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_CONNECTIONS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_DISK_USAGE TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_LICENSES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_RS_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_COMPONENT_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_STATISTICS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_VOLUME_IO_TOTAL_STATISTICS TO DD_MONITOR;
   ```

4. Finally, run the following command to assign the monitoring role to the desired user:

   ```shell
   GRANT DD_MONITOR TO <USER>;
   ```

### 構成

1. Edit the `sap_hana.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your sap_hana performance data. See the [sample sap_hana.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

Run the [Agent's status subcommand][7] and look for `sap_hana` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "sap_hana" >}}


### イベント

SAP HANA does not include any events.

### サービスチェック
{{< get-service-checks-from-git "sap_hana" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://www.sap.com/products/hana.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://pypi.org/project/hdbcli/
[4]: https://help.sap.com/viewer/0eec0d68141541d1b07893a39944924e/2.0.02/en-US/d12c86af7cb442d1b9f8520e2aba7758.html
[5]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/datadog_checks/sap_hana/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/