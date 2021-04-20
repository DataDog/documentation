---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "RapDev MaxDB Dashboard": assets/dashboards/rapdev_maxdb_dashboard.json
  "metrics_metadata": metadata.csv
  "monitors":
    "RapDev MaxDB Data Volume Usage": assets/monitors/rapdev_maxdb_data_volume_usage.json
    "RapDev MaxDB Database Connection Check": assets/monitors/rapdev_maxdb_connection_check.json
    "RapDev MaxDB Database State": assets/monitors/rapdev_maxdb_state.json
    "RapDev MaxDB Lock Utilization": assets/monitors/rapdev_maxdb_lock_utilization.json
    "RapDev MaxDB Log Area Usage": assets/monitors/rapdev_maxdb_log_area_usage.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- マーケットプレイス
- data store
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "RapDev MaxDB"
"draft": false
"git_integration_title": "rapdev_maxdb"
"guid": "b002557b-f27c-47ad-8db7-a93c75b81707"
"integration_id": "rapdev-maxdb"
"integration_title": "MaxDB"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.maxdb."
"metric_to_check": "rapdev.maxdb.db_state"
"name": "rapdev_maxdb"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.maxdb
  "tag": db
  "unit_label": データベース
  "unit_price": !!float "50.0"
"public_title": "MaxDB インテグレーション"
"short_description": "MaxDB データベースのボリューム、キャッシュ、スキーマ、テーブル、およびその他のメトリクスを監視します"
"support": "パートナー"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---

## 概要

MaxDB インテグレーションは MaxDB インスタンスのデータ、ログ領域、ボリューム、キャッシュ、セッション、ロック、その他のメトリクスを監視し、データベースが正常に稼働していることを確認します。このインテグレーションで利用可能なダッシュボードは、データベースおよびデータベースホストでフィルタリングすることができます。MaxDB インテグレーションにはまた、データベースの総合的な健全性に関連する共通のメトリクスのモニターも搭載されています。

### データベースのステータス & データ/ログメトリクス
{{< img src="marketplace/rapdev_maxdb/images/1.png" alt="スクリーンショット 1" >}}

### データベースキャッシュメトリクス
{{< img src="marketplace/rapdev_maxdb/images/2.png" alt="スクリーンショット 2" >}}

### セッション、OMS、スキーマメトリクス
{{< img src="marketplace/rapdev_maxdb/images/3.png" alt="スクリーンショット 3" >}}

### モニター
1. MaxDB 接続チェック
2. MaxDB ステート
3. MaxDB データボリューム使用量
4. MaxDB ロック使用率
5. MaxDB ログ領域使用量

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

 - メールアドレス: integrations@rapdev.io 
 - チャット: [RapDev.io/products](https://rapdev.io/products)
 - 電話: 855-857-0222 

---
ボストンより ❤️  を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、Datadog が導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-maxdb/pricing) してください。

