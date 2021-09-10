---
assets:
  configuration: {}
  dashboards:
    N2WSBackup&Recovery-EntitiesSpecificDashboard: assets/dashboards/N2WSBackup&Recovery-EntityTypesDetails.json
    N2WSBackup&Recovery-EntitiesSpecificDashboardV4.0: assets/dashboards/N2WSBackup&RecoveryV4.0-EntityTypesDetails.json
    N2WSBackup&Recovery-GraphicalVersion: assets/dashboards/N2WSBackup&Recovery-BackupSuccessRates(ColumnGraphs).json
    N2WSBackup&Recovery-GraphicalVersion-Areas: assets/dashboards/N2WSBackup&Recovery-BackupSuccessRates(AreasGraphs).json
    N2WSBackup&Recovery-GraphicalVersionV4.0: assets/dashboards/N2WSBackup&RecoveryV4.0-BackupSuccessRates(ColumnGraphs).json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/n2ws/README.md'
display_name: N2WS Backup & Recovery
doc_link: 'https://docs.datadoghq.com/integrations/n2ws/'
draft: false
git_integration_title: n2ws
guid: 315aa71c-cc41-4f8c-b0f3-37882c1fa766
has_logo: true
integration_id: n2ws
integration_title: N2WS
is_public: true
kind: インテグレーション
maintainer: eliad.eini@n2ws.com
manifest_version: 1.0.0
metric_prefix: cpm_metric.
metric_to_check: cpm_metric.dashboard_activity.backup_success_num
name: n2ws
public_title: Datadog-N2WS インテグレーション
short_description: 接続されているすべての N2WS Backup & Recovery ホストからの要約データを表示する
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要


N2WS として知られる N2WS Backup & Recovery (CPM) は、Amazon Web Services (AWS) および Microsoft Azure 向けのエンタープライズクラスのバックアップ、リカバリ、およびディザスタリカバリソリューションです。N2WS は、クラウドネイティブテクノロジー (スナップショット) を使用して、AWS および Azure のバックアップや復元機能を提供します。

N2WS Backup and Recovery インスタンスは、Datadog モニタリングサービスによるバックアップのモニタリング、ディザスタリカバリ、S3 へのコピー、アラートなどをサポートします。
このインテグレーションにより、ユーザーは N2WS Backup and Recovery ダッシュボードのメトリクスを監視、分析できます。

## セットアップ

### インストール

1.  ##### [Python インテグレーション][1]をインストールします

2.  ##### N2WS インスタンスで Datadog のサポートを有効にします。
    - SSH を使用して N2WS Backup and Recovery インスタンスに接続します。
    - 下記の行を `/cpmdata/conf/cpmserver.cfg` に追加します。このアクションを実行するには、`sudo` 権限が必要になる場合があります。
        ```
        [external_monitoring]
        enabled=True
        ```
    - `service apache2 restart` を実行します

3.  ##### N2WS インスタンスに Datadog Agent をインストールします。
    Datadog にログインし、Integrations -> Agent -> Ubuntu に移動します
    Agent の ‘easy one-step install’ コマンドをコピーします
    SSH を使用して N2WS Backup and Recovery インスタンスに接続します。このアクションを実行するには、`sudo` 権限が必要になる場合があります。

4.  ##### Datadog ダッシュボードメトリクスを設定します
    [‘Metrics-> Explorer’][2] に移動します

    **Graph**: リストからメトリクスを選択します。すべての N2WS メトリクスは、文字列 ‘cpm_metric’ で始まります。

    **Over**: リストからデータを選択します。すべての N2WS ユーザーデータは、文字列 ‘cpm:user:<user-name>’ で始まります。
              特定のユーザーまたは N2WS インスタンス全体を選択できます。


5.  ##### N2WS ダッシュボードを取得します
    [Datadog インテグレーション][3]で、'N2WS' タイルを検索してインストールします。
    アカウントには次の 5 種類のダッシュボードが表示されます。N2WS Backup & Recovery v3.2.1 (AWS のみ対応) 用の 3 種類および N2WS Backup & Recovery v4.0 (Azure を含む) 用の 2 種類。
    'N2WSBackup&Recovery-Graphicalversion'、'N2WSBackup&Recovery-Graphicalversion-areas'、'N2WSBackup&Recovery-EntitiesSpecificDashboard'（バージョン 3.2.1）
    'N2WSBackup&Recovery-EntitiesSpecificDashboardV4.0'、'N2WSBackup&Recovery-GraphicalVersionV4.0'（バージョン 4.0）

    または、ユーザーは [N2WS から JSON テンプレートをインポート][4]することもできます。

## 収集データ

Datadog は、N2WS Backup & Recovery バックアップに関する以下のデータを収集します。

- 各タイプのスナップショット数
- 成功したバックアップ (AWS のみ)
- 失敗したバックアップ (AWS のみ)
- 一部成功したバックアップ (AWS のみ)
- 任意のタイプの保護されたリソース
- ボリューム容量に関するデータ（AWS のみ）、アラートなど

### メトリクス
{{< get-metrics-from-git "n2ws" >}}


### イベント

Datadog では、すべての N2WS Backup & Recovery ホストからアラートメッセージを収集します。

### サービスのチェック

N2WS Backup & Recovery インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

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