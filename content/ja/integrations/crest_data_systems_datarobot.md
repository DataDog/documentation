---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-datarobot
app_uuid: 144ff7c9-134e-4075-90c3-bda4f1081c7b
assets:
  dashboards:
    CDS DataRobot - Deployments: assets/dashboards/cds_datarobot_deployments.json
    CDS DataRobot - LLM: assets/dashboards/cds_datarobot_llm.json
    CDS DataRobot - Models: assets/dashboards/cds_datarobot_models.json
    CDS DataRobot - Overview: assets/dashboards/cds_datarobot_overview.json
    CDS DataRobot - Predictions: assets/dashboards/cds_datarobot_predictions.json
    CDS DataRobot - Use Cases: assets/dashboards/cds_datarobot_use_cases.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.datarobot.deployments.totalPredictions
      metadata_path: metadata.csv
      prefix: cds.datarobot
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28626114
    source_type_name: crest_data_systems_datarobot
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- ai/ml
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_datarobot
integration_id: crest-data-systems-datarobot
integration_title: DataRobot
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_datarobot
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: datarobot
  short_description: 月額の定額料金。
  unit_price: 200.0
public_title: DataRobot
short_description: DataRobot のデータを可視化します。
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
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: DataRobot のデータを可視化します。
  media:
  - caption: CDS DataRobot - Overview
    image_url: images/cds_datarobot_overview.png
    media_type: image
  - caption: CDS DataRobot - Deployments
    image_url: images/cds_datarobot_deployments.png
    media_type: image
  - caption: CDS DataRobot - Models
    image_url: images/cds_datarobot_models.png
    media_type: image
  - caption: CDS DataRobot - Prediction
    image_url: images/cds_datarobot_prediction.png
    media_type: image
  - caption: CDS DataRobot - LLM
    image_url: images/cds_datarobot_llm.png
    media_type: image
  - caption: CDS DataRobot - Use Cases
    image_url: images/cds_datarobot_use_cases.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: DataRobot
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## 概要
[**DataRobot**][1] は、機械学習を用いてモデルの構築・デプロイ・運用管理までのプロセスを自動化する AI プラットフォームです。あらゆる規模の組織が AI を活用してビジネス成果を高められるように設計されています。DataRobot を利用することで、ユーザーは自社のデータセットに対して予測を行うモデルを作成・デプロイできるだけでなく、機械学習ワークフロー向けのカスタム ブループリントも設計できます。

このインテグレーションを使うと、DataRobot のデータを Datadog でメトリクスやログとしてシームレスに収集・可視化できます。次のコンポーネントを構成できます:

**インベントリ データ**:


- デプロイ
    - 依存コンポーネント: BatchServiceStats, Accuracy, ServiceStatsOverTime, ServiceStats [Metric Ingestion], PredictionsVsActualsOverTime, HumilityStatsOverTime, FeatureDrift, TargetDrift
- LLM
    - 関連コンポーネント: LLMApiCalls [Metric Ingestion]
- プロジェクト
    - 依存コンポーネント: Models
    - プロジェクトとモデルの依存コンポーネント: ModelDetails, NumIterationsTrained, MissingReport, Features, CrossValidationScores
- ModelPackages
- ExternalDataSources
- ExternalDataDrivers
- ExternalDataStores
- BatchPredictions

**非インベントリ データ**:

- UseCases
    - 依存コンポーネント: Data, Projects
- LLMBlueprints
- Playground

このインテグレーションには、あらかじめ用意されたダッシュボードが 6 つ含まれています:

  1. **Use Cases**: UseCases の統計を監視・可視化し、関連するデータセットやプロジェクトも含めて確認できます。

  2. **Deployments**: ユーザーが指定した `interval_for_inventory` 間隔で収集された Deployments の概要を表示します。

  3. **Models**: ユーザーが指定した `interval_for_inventory` 間隔で収集されたモデルの統計情報を監視します。

  4. **LLM**: ユーザーが指定した `interval_for_inventory` 間隔で収集された LLM 関連情報の概要を表示します。

  5. **Predictions**: ユーザーが指定した `interval_for_inventory` 間隔で収集された予測関連情報の概要を表示します。

  6. **Overview**: ユーザーが指定した `interval_for_inventory` 間隔で収集された Playgrounds、ExternalDataSources、ExternalDataStores、ExternalDataDrivers のデータを集約して表示します。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][10]

- 営業メール: [datadog-sales@crestdata.ai][11]

- Web サイト: [crestdata.ai][12]

- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]


[1]: https://www.datarobot.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Datarobot.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[5]: https://app.datarobot.com/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: mailto:datadog.integrations@crestdata.ai
[11]: mailto:datadog-sales@crestdata.ai
[12]: https://www.crestdata.ai/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-datarobot" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。