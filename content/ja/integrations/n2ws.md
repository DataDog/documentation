---
assets:
  configuration: {}
  dashboards:
    N2WSBackup&Recovery-EntitiesSpecificDashboard: assets/dashboards/N2WSBackup&Recovery-EntitiesSpecificDashboard.json
    N2WSBackup&Recovery-GraphicalVersion: assets/dashboards/N2WSBackup&Recovery-Graphicalversion.json
    N2WSBackup&Recovery-GraphicalVersion-Areas: assets/dashboards/N2WSBackup&Recovery-Graphicalversion-areas.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: false
ddtype: crawler
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

N2WS として知られる N2WS Backup & Recovery (CPM) は、Amazon Web Services (AWS) 向けのエンタープライズクラスのバックアップ、リカバリ、およびディザスタリカバリソリューションです。N2WS は、クラウドネイティブテクノロジー (スナップショット) を使用して、AWS のバックアップおよび復元機能を提供します。

N2WS Backup and Recovery インスタンスは、Datadog モニタリングサービスによるバックアップのモニタリング、ディザスタリカバリ、S3 へのコピー、アラートなどをサポートします。
このインテグレーションにより、ユーザーは N2WS Backup and Recovery ダッシュボードのメトリクスを監視、分析できます。

## セットアップ

### インストール

1. [Python インテグレーション][1]をインストールします。

2. N2WS インスタンスで Datadog のサポートを有効にします。
    - SSH を使用して N2WS Backup and Recovery インスタンスに接続します。
    - 下記の行を `/cpmdata/conf/cpmserver.cfg` に追加します。このアクションを実行するには、`sudo` 権限が必要になる場合があります。
        ```
        [external_monitoring]
        enabled=True
        ```
    - `service apache2 restart` を実行します。

3. N2WS インスタンスに Datadog Agent をインストールします。
    - Datadog にログインし、[Integrations -> Agent -> Ubuntu][2] に移動します。
    - Agent の one-step install コマンドをコピーします。
    - SSH を使用して N2WS Backup and Recovery インスタンスに接続します。このアクションを実行するには、`sudo` 権限が必要になる場合があります。

4. Datadog で N2WS メトリクスを視覚化します。
    - [Metrics-> Explorer][3] に移動します。
    - **Graph**: リストからメトリクスを選択します。すべての N2WS メトリクスは、文字列 `cpm_metric` で始まります。
    - **Over**: リストからデータを選択します。すべての N2WS ユーザーデータは、文字列 `cpm:user:<USER_NAME>` で始まります。特定のユーザーまたは N2WS インスタンス全体を選択できます。


5. N2WS ダッシュボードを Datadog アカウントに追加します。
    - [N2WS タイル][4]に移動してインテグレーションをインストールします。
    - インストールボタンをクリックすると、ダッシュボード: `N2WSBackup&Recovery-Graphicalversion`、`N2WSBackup&Recovery-Graphicalversion-areas`、`N2WSBackup&Recovery-Squaresdashboard` が追加されます。
    - または、ユーザーが [N2WS から JSON テンプレートをインポート][5]することもできます。

## 収集データ

Datadog は、N2WS Backup & Recovery バックアップに関する以下のデータを収集します。

- 各タイプのスナップショット数
- 成功したバックアップ
- 失敗したバックアップ
- 一部成功したバックアップ
- 任意のタイプの保護されたリソース
- ボリューム容量に関するデータ、アラートなど

### メトリクス
{{< get-metrics-from-git "n2ws" >}}


### イベント

Datadog では、すべての N2WS Backup & Recovery ホストからアラートメッセージを収集します。

### サービスのチェック

N2WS Backup & Recovery インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

- [N2WS ユーザーガイドとドキュメント][7]
- [N2WS サポート][8]
- [Datadog サポート][9]


[1]: https://app.datadoghq.com/account/settings#integrations/python
[2]: https://app.datadoghq.com/account/settings#ubuntu
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/account/settings#integrations/n2ws
[5]: https://support.n2ws.com/portal/en/kb/articles/datadog-templates
[6]: https://github.com/DataDog/integrations-extras/blob/master/n2ws/metadata.csv
[7]: https://n2ws.com/support/documentation
[8]: https://n2ws.com/support
[9]: https://docs.datadoghq.com/ja/help/