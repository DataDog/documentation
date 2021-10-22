---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "RapDev ServiceNow": assets/dashboards/servicenow.json
    "RapDev ServiceNow ITSM": assets/dashboards/servicenow_itsm.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- マーケットプレイス
- cloud
- モニタリング
"creates_events": true
"ddtype": "check"
"dependencies": []
"display_name": "RapDev ServiceNow"
"draft": false
"git_integration_title": "rapdev_servicenow"
"guid": "45f54528-b04b-4741-8207-7bfb16c128ae"
"integration_id": "rapdev-servicenow"
"integration_title": "RapDev ServiceNow"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.servicenow."
"metric_to_check": "rapdev.servicenow.incident"
"name": "rapdev_servicenow"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.rapdev.servicenow
  "tag": instance_name
  "unit_label": ServiceNow インスタンス
  "unit_price": !!float "1000.0"
"public_title": "RapDev ServiceNow"
"short_description": "ServiceNow インスタンスのパフォーマンスと ITSM インシデントの統計を監視する"
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

ServiceNow インテグレーションは、トランザクション、ジョブ、データベース、キャッシュメトリクスに関する豊富な洞察を使用して、ServiceNow インスタンスの状態とパフォーマンスを監視します。このインテグレーションにより、未解決の ITSM インシデントも追跡され、SLA とビジネスに影響を与えるインシデントの年齢の両方に関する実用的なデータポイントが提供されます。

以下は、このインテグレーションに含まれているダッシュボードのスクリーンショットです。

### ServiceNow インスタンスパフォーマンスダッシュボード
{{< img src="marketplace/rapdev_servicenow/images/1.png" alt="スクリーンショット 1" >}}

### ServiceNow ITSM ダッシュボード
{{< img src="marketplace/rapdev_servicenow/images/2.png" alt="スクリーンショット 1" >}}

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

 - メール: integrations@rapdev.io 
 - チャット: [RapDev.io/products](https://rapdev.io/products)
 - 電話: 855-857-0222 

---

ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-o365/pricing)してください。

