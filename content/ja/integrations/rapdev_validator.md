---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "RapDev Validator Dashboard": assets/dashboards/rapdev_validator_dashboard.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors":
    "Host has non-compliant value for tag key": assets/monitors/host_non_compliant_value.json
    "Host is missing required tag key": assets/monitors/host_missing_tag_key.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- ""
"creates_events": false
"ddtype": "check"
"dependencies": []
"display_name": "RapDev Validator"
"draft": false
"git_integration_title": "rapdev_validator"
"guid": "368ebcdb-5d45-4dfd-87d6-913d6c997534"
"integration_id": "rapdev-validator"
"integration_title": "RapDev Validator"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "rapdev.validator."
"metric_to_check": "rapdev.validator.agent.installed"
"metrics_metadata": "metadata.csv"
"name": "rapdev_validator"
"pricing":
- "billing_type": flat_fee
  "unit_price": !!int "500"
"public_title": "RapDev Validator"
"short_description": "モニタータグを検証し、DD 環境での Agent コンプライアンスを確保します。"
"support": "パートナー"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/EULA.pdf
  "legal_email": integrations@rapdev.io
---



## 概要
RapDev Validator は、Datadog 環境でのタグモニタリングと Agent のコンプライアンス問題を解決するのに役立ちます。インテグレーションはタグキーのリストと、お使いの環境のタグ付け戦略に基づく許容値を受け取り、それらをメトリクスおよびサービスチェックとして Datadog インスタンスに報告します。このようにして、お使いの環境内のホストに正しいタグが割り当てられているかを表示することができます。

### Validator ダッシュボード
{{< img src="marketplace/rapdev_validator/images/validator.png" alt="スクリーンショット 1" >}}

### ダッシュボード  
1. RapDev Validator ダッシュボード

### モニター
1. ホストに必要なタグキーが割り当てられていない
2. ホストのタグキーに非準拠の値が割り当てられている

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

