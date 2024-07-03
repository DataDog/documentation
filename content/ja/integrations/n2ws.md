---
app_id: n2ws
app_uuid: 6c0176c4-b878-43e0-a5a8-d280b0fa123e
assets:
  dashboards:
    N2WSBackup&Recovery-EntitiesSpecificDashboard: assets/dashboards/N2WSBackup&Recovery-EntityTypesDetails.json
    N2WSBackup&Recovery-EntitiesSpecificDashboardV4.0: assets/dashboards/N2WSBackup&Recoveryv4.1-EntityTypesDetails.json
    N2WSBackup&Recovery-GraphicalVersion: assets/dashboards/N2WSBackup&Recovery-BackupSuccessRates(ColumnGraphs).json
    N2WSBackup&Recovery-GraphicalVersion-Areas: assets/dashboards/N2WSBackup&Recovery-BackupSuccessRates(AreasGraphs).json
    N2WSBackup&Recovery-GraphicalVersionV4.0: assets/dashboards/N2WSBackup&Recoveryv4.1-BackupSuccessRates(ColumnGraphs).json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cpm_metric.dashboard_activity.backup_success_num
      metadata_path: metadata.csv
      prefix: cpm_metric.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10129
    source_type_name: N2WS Backup & Recovery
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: N2WS
  sales_email: eliad.eini@n2ws.com
  support_email: eliad.eini@n2ws.com
categories:
- cloud
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/n2ws/README.md
display_on_public_website: true
draft: false
git_integration_title: n2ws
integration_id: n2ws
integration_title: N2WS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: n2ws
public_title: N2WS
short_description: View summary data from all the connected N2WS Backup & Recovery
  hosts
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  configuration: README.md#Setup
  description: View summary data from all the connected N2WS Backup & Recovery hosts
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: N2WS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview


N2WS Backup & Recovery (CPM), known as N2WS, is an enterprise-class backup, recovery, and disaster recovery solution for Amazon Web Services (AWS) and Microsoft Azure. N2WS uses cloud native technologies (snapshots) to provide backup and restore capabilities in AWS and Azure.

Your N2WS Backup and Recovery instance supports the monitoring of backups, disaster recovery, copy to S3, alerts,
and more with Datadog's monitoring service. This integration allows users to monitor and analyze the N2WS Backup and Recovery Dashboard metrics.

## セットアップ

### インストール

1.  Install the [Python integration][1].

2.  Enable support for Datadog on your N2WS instance:
    - Connect to your N2WS Backup and Recovery instance with SSH.
    - Add the lines below to `/cpmdata/conf/cpmserver.cfg`. You might need `sudo` privileges to perform this action.
        ```
        [external_monitoring]
        enabled=True
        ```
    - Run `service apache2 restart`

3.  Install the Datadog Agent on your N2WS Instance.
    - Login to Datadog and go to Integrations -> Agent -> Ubuntu
    - Copy the Agent one-step install command.
    - Connect to your N2WS Backup and Recovery Instance with SSH and run the command. You may require `sudo` privileges to perform this action.

4.  Set up Datadog dashboard metrics:
    - Go to [**Metrics** -> **Explorer**][2]

    **Graph**: Select your metric from the list. All N2WS metrics begin with the string `cpm_metric`.

    **Over**: Select data from the list. All N2WS users' data begins with the string `cpm:user:<user-name>`.
              You can select either a specific user or the entire N2WS instance.


5.  Get N2WS dashboards
    - In [Datadog Integrations][3], search for the `N2WS` tile and install it.
    - Five dashboards are installed in your account:
    `N2WSBackup&Recovery-Graphicalversion`, `N2WSBackup&Recovery-Graphicalversion-areas` and `N2WSBackup&Recovery-EntitiesSpecificDashboard` for N2WS Backup & Recovery v3.2.1
    **Note**: These dashboards are only available for AWS users.
    `N2WSBackup&Recovery-EntitiesSpecificDashboardV4.1` and `N2WSBackup&Recovery-GraphicalVersionV4.1` for N2WS Backup & Recovery v4.1

    Alternatively, you can [import JSON templates from N2WS][4] to create your dashboards.

## 収集データ

Datadog collects the following data about N2WS Backup & Recovery backups:

- The number of snapshots of each type
- Successful backups (AWS only)
- Failed backups (AWS only)
- Partially successful backups (AWS only)
- Protected resources from any type
- Data about volume capacity (AWS only), alerts, etc.

### メトリクス
{{< get-metrics-from-git "n2ws" >}}


### イベント

Datadog collects alert messages from all N2WS Backup & Recovery hosts.

### サービスチェック

The N2WS Backup & Recovery integration does not include any service checks.

## トラブルシューティング

- [N2WS user guide and documentation][6]
- [N2WS support][7]
- [Datadog support][8]


[1]: https://app.datadoghq.com/account/settings#integrations/python
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://app.datadoghq.com/account/settings#integrations/n2ws
[4]: https://support.n2ws.com/portal/en/kb/articles/datadog-templates
[5]: https://github.com/DataDog/integrations-extras/blob/master/n2ws/metadata.csv
[6]: https://n2ws.com/support/documentation
[7]: https://n2ws.com/support
[8]: https://docs.datadoghq.com/ja/help/