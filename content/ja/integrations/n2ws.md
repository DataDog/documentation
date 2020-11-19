---
"assets":
  "configuration": {}
  "dashboards":
    "N2WSBackup&Recovery-EntitiesSpecificDashboard": assets/dashboards/N2WSBackup&Recovery-EntitiesSpecificDashboard.json
    "N2WSBackup&Recovery-GraphicalVersion": assets/dashboards/N2WSBackup&Recovery-Graphicalversion.json
    "N2WSBackup&Recovery-GraphicalVersion-Areas": assets/dashboards/N2WSBackup&Recovery-Graphicalversion-areas.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- ""
"creates_events": false
"ddtype": "check"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/n2ws/README.md"
"display_name": "N2WS Backup & Recovery"
"draft": true
"git_integration_title": "n2ws"
"guid": "315aa71c-cc41-4f8c-b0f3-37882c1fa766"
"integration_id": "n2ws"
"integration_title": "N2WS"
"is_public": false
"kind": "インテグレーション"
"maintainer": "eliad.eini@n2ws.com"
"manifest_version": "1.0.0"
"metric_prefix": "cpm_metric."
"metric_to_check": "cpm_metric.dashboard_activity.backup_success_num"
"name": "n2ws"
"public_title": "N2WS"
"short_description": "接続されているすべての N2wS Backup & Recovery ホストからの要約データを表示する"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## 概要

N2WS として知られる N2WS Backup & Recovery (CPM) は、Amazon Web Services (AWS) 向けのエンタープライズクラスのバックアップ、リカバリ、およびディザスタリカバリ (DR) ソリューションです。
N2WS は、クラウドネイティブテクノロジー (EBS スナップショットなど) を使用して、AWS のバックアップおよび復元機能を提供します。

N2WS Backup and Recovery インスタンスは、Datadog モニタリングサービスによるバックアップのモニタリング、ディザスタリカバリ (DR)、S3 へのコピー、アラートなどをサポートします。
このインテグレーションにより、ユーザーは N2WS Backup and Recovery ダッシュボードのメトリクスを監視、分析できます。

## セットアップ

### インストール

1.  [Python インテグレーション][1]をインストールします


2.  N2WS インスタンスで Datadog サポートを有効にします
SSH を使用して N2WS Backup and Recovery インスタンスに接続します。次の行を `/cpmdata/conf/cpmserver.cfg` に追加します。このアクションを実行するには、`sudo` 権限が必要になる場合があります。
`[external_monitoring]
enabled=True`

`service apache2 restart` を実行します


3.  N2WS インスタンスに Datadog Agent をインストールします
Datadog にログインし、Integrations -> Agent -> Ubuntu に移動します
Agent の ‘easy one-step install’ コマンドをコピーします
SSH を使用して N2WS Backup and Recovery インスタンスに接続します。このアクションを実行するには、`sudo` 権限が必要になる場合があります。


4.  Datadog ダッシュボードメトリクスを設定します
[‘Metrics-> Explorer’][2] に移動します

**Graph**: リストからメトリクスを選択します。すべての N2WS メトリクスは、文字列 ‘cpm_metric’ で始まります。

**Over**: リストからデータを選択します。すべての N2WS ユーザーデータは、文字列 ‘cpm:user:<user-name>’ で始まります。
特定のユーザーまたは N2WS インスタンス全体のいずれかを選択できます。


5.  N2WS ダッシュボードを取得します
[Datadog インテグレーション][3]で、'N2WS' タイルを検索してインストールします。
    アカウントには次の 3 種類のダッシュボードが表示されます。
    'N2WSBackup&Recovery-Graphicalversion'、'N2WSBackup&Recovery-Graphicalversion-areas'、'N2WSBackup&Recovery-Squaresdashboard'

または、ユーザーは [N2WS から JSON テンプレートをインポート][4]することもできます。


## 収集データ

Datadog は、N2WS Backup & Recovery のバックアップに関する次のデータを収集します。各タイプのスナップショットの数、成功したバックアップ、失敗したバックアップ、部分的に成功したバックアップ、あらゆるタイプの保護されたリソース、ボリューム容量に関するデータ、アラートなど。


### メトリクス
{{< get-metrics-from-git "n2ws" >}}



### イベント

Datadog は、すべての N2WS Backup & Recovery ホストからアラートメッセージを収集します。


### サービスのチェック

N2WS Backup & Recovery にはサービスチェックがありません。


## トラブルシューティング

[N2WS ユーザーガイドとドキュメント][6]
[N2WS サポート][7] 



[1]: https://app.datadoghq.com/account/settings#integrations/python
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://app.datadoghq.com/account/settings#integrations
[4]: https://support.n2ws.com/portal/en/kb/articles/datadog-templates
[5]: https://github.com/DataDog/integrations-extras/blob/master/n2ws/metadata.csv
[6]: https://n2ws.com/support/documentation
[7]: https://n2ws.com/support

