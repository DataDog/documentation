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
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/n2ws/README.md
display_on_public_website: true
draft: false
git_integration_title: n2ws
integration_id: n2ws
integration_title: N2WS
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: n2ws
public_title: N2WS
short_description: 接続されているすべての N2WS Backup & Recovery ホストからの要約データを表示する
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
  description: 接続されているすべての N2WS Backup & Recovery ホストからの要約データを表示する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: N2WS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要


N2WS として知られる N2WS Backup & Recovery (CPM) は、Amazon Web Services (AWS) および Microsoft Azure 向けのエンタープライズクラスのバックアップ、リカバリ、およびディザスタリカバリソリューションです。N2WS は、クラウドネイティブテクノロジー (スナップショット) を使用して、AWS および Azure のバックアップや復元機能を提供します。

N2WS Backup and Recovery インスタンスは、Datadog のモニタリングサービスを使用したバックアップのモニタリング、ディザスタリカバリ、S3 へのコピー、アラートなどをサポートします。
このインテグレーションにより、ユーザーは N2WS Backup and Recovery ダッシュボードのメトリクスを監視、分析できます。

## 計画と使用

### インフラストラクチャーリスト

1.  [Python インテグレーション][1]をインストールします。

2.  N2WS インスタンスで Datadog のサポートを有効にします。
    - SSH を使用して N2WS Backup and Recovery インスタンスに接続します。
    - 下記の行を `/cpmdata/conf/cpmserver.cfg` に追加します。このアクションを実行するには、`sudo` 権限が必要になる場合があります。
        ```
        [external_monitoring]
        enabled=True
        ```
    - `service apache2 restart` を実行します

3.  N2WS インスタンスに Datadog Agent をインストールします。
    - Datadog にログインし、Integrations -> Agent -> Ubuntu に移動します
    - Agent の one-step install コマンドをコピーします。
    - SSH を使用して N2WS Backup and Recovery インスタンスに接続し、コマンドを実行します。このアクションを実行するには、`sudo` 権限が必要になる場合があります。

4.  Datadog ダッシュボードメトリクスを設定します。
    - [**Metrics** -> **Explorer**][2] に移動します

    **Graph**: リストからメトリクスを選択します。すべての N2WS メトリクスは、文字列 `cpm_metric` で始まります。

    **Over**: リストからデータを選択します。すべての N2WS ユーザーのデータは、文字列 `cpm:user:<user-name>` で始まります。
              特定のユーザーまたは N2WS インスタンス全体を選択できます。


5.  N2WS ダッシュボードを取得します
    - [Datadog インテグレーション][3]で、`N2WS` タイルを検索してインストールします。
    - 5 つのダッシュボードがアカウントにインストールされます。
    `N2WSBackup&Recovery-Graphicalversion`、`N2WSBackup&Recovery-Graphicalversion-areas`、`N2WSBackup&Recovery-EntitiesSpecificDashboard` (N2WS Backup & Recovery v3.2.1 用)
    **注**: これらのダッシュボードは、AWS ユーザーのみ利用可能です。
    `N2WSBackup&Recovery-EntitiesSpecificDashboardV4.1`、`N2WSBackup&Recovery-GraphicalVersionV4.1` (N2WS Backup & Recovery v4.1 用)

    また、[N2WS から JSON テンプレートをインポートする][4]ことでダッシュボードを作成することも可能です。

## リアルユーザーモニタリング

Datadog は、N2WS Backup & Recovery バックアップに関する以下のデータを収集します。

- 各タイプのスナップショット数
- 成功したバックアップ (AWS のみ)
- 失敗したバックアップ (AWS のみ)
- 一部成功したバックアップ (AWS のみ)
- 任意のタイプの保護されたリソース
- ボリューム容量に関するデータ（AWS のみ）、アラートなど

### データセキュリティ
{{< get-metrics-from-git "n2ws" >}}


### ヘルプ

Datadog では、すべての N2WS Backup & Recovery ホストからアラートメッセージを収集します。

### ヘルプ

N2WS Backup & Recovery インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

- [N2WS ユーザーガイドとドキュメント][6]
- [N2WS サポート][7]
- [Datadog サポート][8]


[1]: https://app.datadoghq.com/account/settings#integrations/python
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://app.datadoghq.com/account/settings#integrations/n2ws
[4]: https://support.n2ws.com/portal/en/kb/articles/datadog-templates
[5]: https://github.com/DataDog/integrations-extras/blob/master/n2ws/metadata.csv
[6]: https://n2ws.com/support/documentation
[7]: https://n2ws.com/support
[8]: https://docs.datadoghq.com/ja/help/