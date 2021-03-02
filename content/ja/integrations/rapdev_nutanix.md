---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "RapDev Nutanix Cluster Overview": assets/dashboards/rapdev_nutanix_overview_dashboard.json
    "RapDev Nutanix Clusters Dashboard": assets/dashboards/rapdev_nutanix_clusters_dashboard.json
    "RapDev Nutanix Hosts and Disks Dashboard": assets/dashboards/rapdev_nutanix_hosts_and_disks_dashboard.json
    "RapDev Nutanix VMs Dashboard": assets/dashboards/rapdev_nutanix_vms_dashboard.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors":
    "Nutanix Cluster CPU": assets/monitors/nutanix_cpu_monitor.json
    "Nutanix Compression Saving": assets/monitors/nutanix_compression_saving_monitor.json
    "Nutanix Deduplication": assets/monitors/nutanix_deduplication_monitor.json
    "Nutanix Storage Usage": assets/monitors/nutanix_storage_monitor.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- マーケットプレイス
- cloud
- data store
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "RapDev Nutanix"
"draft": false
"git_integration_title": "rapdev_nutanix"
"guid": "4ae15fc5-ff5b-4cc4-a3cf-a7b5d164c538"
"integration_id": "rapdev-nutanix"
"integration_title": "RapDev Nutanix"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.nutanix."
"metric_to_check": "rapdev.nutanix.clusters.count"
"name": "rapdev_nutanix"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.nutanix
  "tag": コア
  "unit_label": Nutanix ホストコア
  "unit_price": !!float "5.0"
"public_title": "RapDev Nutanix"
"short_description": "Nutanix リソースの使用量を監視して、お使いの環境をより良く理解しましょう。"
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
Nutanix インテグレーションではストレージ、CPU 使用量、読み取り/書き込み IOPS、および Nutanix Clusters 内のその他のメトリクスを監視し、お使いの環境が常に最適なパフォーマンスで稼働しているかどうかを確認することができます。インテグレーションは 4 つのダッシュボードで構成されており、Nutanix Clusters を俯瞰的に可視化するとともに、潜在的なパフォーマンスの劣化をピンポイントかつ詳細に表示します。また、Nutanix インテグレーションには、ストレージの使用率やデータ重複除去といった、Nutanix 環境の総合的なパフォーマンス維持に欠かせない主要なメトリクスの監視機能も搭載されています。

### Nutanix 概要ダッシュボード
{{< img src="marketplace/rapdev_nutanix/images/4.png" alt="スクリーンショット 1" >}}

### Nutanix VM ダッシュボード
{{< img src="marketplace/rapdev_nutanix/images/5.png" alt="スクリーンショット 2" >}}

### Nutanix Clusters ダッシュボード
{{< img src="marketplace/rapdev_nutanix/images/6.png" alt="スクリーンショット 3" >}}

### Nutanix ホスト & ディスクダッシュボード
{{< img src="marketplace/rapdev_nutanix/images/7.png" alt="スクリーンショット 3" >}}

### モニター

1. Nutanix Cluster ストレージ使用率
2. Nutanix Cluster CPU 使用率
3. Nutanix Cluster データ重複除去率
4. Nutanix Cluster データ圧縮率

### ダッシュボード

RapDev Nutanix 概要
RapDev Nutanix Clusters
RapDev Nutanix ホスト & ディスク
RapDev Nutanix VM
## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- メール: integrations@rapdev.io
- チャット: RapDev.io/products
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-nutanix/pricing) してください。

