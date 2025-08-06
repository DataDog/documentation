---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-trulens-eval
app_uuid: 91fe78a3-7bd7-41d6-b24f-d41056112644
assets:
  dashboards:
    Trulens Eval - Overview: assets/dashboards/crest_data_trulens_eval_overview.json
    Trulens Eval - Troubleshooting: assets/dashboards/crest_data_trulens_eval_troubleshooting.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 12043594
    source_type_name: crest_data_systems_trulens_eval
  logs:
    source: crest-data-systems-trulens-eval
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- ai/ml
- ログの収集
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_trulens_eval
integration_id: crest-data-systems-trulens-eval
integration_title: TruLens Eval
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_trulens_eval
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: trulens-eval
  short_description: Trulens Eval インテグレーションの月額定額料金。
  unit_price: 45.0
public_title: TruLens Eval
short_description: LLM アプリケーションの実験を監視し、洞察を得る
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::AI/ML
  - Offering::Integration
  - Category::Log Collection
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: LLM アプリケーションの実験を監視し、洞察を得る
  media:
  - caption: TruLens Eval - 概要
    image_url: images/crest_data_trulens_eval_overview.png
    media_type: image
  - caption: TruLens Eval - トラブルシューティング
    image_url: images/crest_data_trulens_eval_troubleshooting.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
  support: README.md#Support
  title: TruLens Eval
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

TruLens Eval は、フィードバック機能を使用して LLM ベースのアプリケーションの品質と効果を客観的に測定するソフトウェアです。フィードバック機能は、入力、出力、および中間結果の品質をプログラム的に評価し、実験評価の迅速化とスケールアップを支援します。

この TruLens Eval インテグレーションにより、以下のことが可能になります。
* SQLAlchemy 互換のデータベースからデータを取得し、レコードとフィードバックを Datadog に送信する
* 付属のダッシュボードで LLM アプリケーションのパフォーマンスを視覚化し、複数の LLM アプリケーションのパフォーマンスやコストを比較するなどのアクションを取る

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][10]
- 営業メール: [datadog-sales@crestdata.ai][9]
- Web サイト: [crestdata.ai][4]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][8]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Crest Data の Datadog Marketplace インテグレーションで GenAI アプリケーションの監視を強化する][11]


[1]: https://docs.datadoghq.com/ja/agent/guide/
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.crestdata.ai/
[5]: https://docs.crestdata.ai/datadog-integrations-readme/TruLens_Eval.pdf
[6]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: mailto:datadog-sales@crestdata.ai
[10]: mailto:datadog.integrations@crestdata.ai
[11]: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-trulens-eval" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。