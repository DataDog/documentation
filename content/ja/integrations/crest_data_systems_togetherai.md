---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-togetherai
app_uuid: b7a02f76-1a8c-42bd-8f1f-99c33f26803d
assets:
  dashboards:
    TogetherAI Overview: assets/dashboards/crest_data_togetherai_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18080733
    source_type_name: crest_data_systems_togetherai
  logs:
    source: crest-data-systems-togetherai
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- ai/ml
- marketplace
- log collection
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_togetherai
integration_id: crest-data-systems-togetherai
integration_title: TogetherAI
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_togetherai
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: togetherai
  short_description: TogetherAI インテグレーションの月額定額料金。
  unit_price: 95.0
public_title: TogetherAI
short_description: TogetherAI のファイン チューニング ジョブ、ジョブ イベント、ファイルを可視化し、状況を深く把握できます。
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
  - Category::AI/ML
  - Category::Marketplace
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: TogetherAI のファイン チューニング ジョブ、ジョブ イベント、ファイルを可視化し、状況を深く把握できます。
  media:
  - caption: TogetherAI - Fine-tuning Overview
    image_url: images/cds_togetherai_finetuning_overview.png
    media_type: image
  - caption: TogetherAI - Fine-tuning Details
    image_url: images/cds_togetherai_finetuning_details.png
    media_type: image
  - caption: TogetherAI - Files
    image_url: images/cds_togetherai_files.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/genai-monitoring-crestdata/
  support: README.md#Support
  title: TogetherAI
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
[TogetherAI][1] は、オープン ソースの生成 AI モデルの開発からデプロイまでを支援するために設計されたクラウド ベースのプラットフォームです。多様な AI モデルの作成、学習、管理を後押しする堅牢な基盤を提供し、開発者が高度な AI ソリューションをよりスムーズに構築できるようにします。さらに TogetherAI は、AI 機能をアプリケーションにシームレスに組み込める API 群を用意し、サービスを手軽に利用できるようにしています。

TogetherAI の API を活用することで、このインテグレーションは AI モデルのファイン チューニングに必要な情報へシームレスにアクセスし、取得できます。具体的には、ファイン チューニング ジョブ、ジョブ イベント、ファイルに関するデータを取り込みます。


## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][3]
- 営業メール: [datadog-sales@crestdata.ai][4]
- Web サイト: [crestdata.ai][5]
- FAQ: [Crest Data Datadog Marketplace インテグレーション FAQ][13]



[1]: https://www.together.ai/
[2]: https://docs.together.ai/reference/authentication-1
[3]: mailto:datadog.integrations@crestdata.ai
[4]: mailto:datadog-sales@crestdata.ai
[5]: https://www.crestdata.ai/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[11]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[12]: https://www.crestdatasys.com/datadog-integrations-readme/TogetherAI.pdf
[13]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[14]: https://docs.datadoghq.com/ja/help/
[15]: https://www.datadoghq.com/blog/genai-monitoring-crestdata/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-togetherai" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。