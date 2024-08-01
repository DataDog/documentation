---
app_id: microsoft-defender-for-cloud
app_uuid: e9e9981e-c97a-4395-a98b-b39b2adf1bb6
assets:
  dashboards:
    MicrosoftDefenderforCloud-Overview: assets/dashboards/MicrosoftDefenderforCloud-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10376
    source_type_name: Microsoft Defender for Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- azure
- クラウド
- ログの収集
- security
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_defender_for_cloud
integration_id: microsoft-defender-for-cloud
integration_title: Microsoft Defender for Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: microsoft_defender_for_cloud
public_title: Microsoft Defender for Cloud
short_description: Microsoft Defender for Cloud を監視
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Log Collection
  - Category::Security
  configuration: README.md#Setup
  description: Microsoft Defender for Cloud を監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Defender for Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Microsoft Defender for Cloud][1] のログとアラートを収集します。

Defender for Cloud は、Microsoft Azure アプリケーションを監視し、クラウドセキュリティポスチャ管理 (CSPM) を通じて Azure セキュリティリスクを把握し、サーバー、コンテナ、ストレージ、データベース (CWPP) の Azure クラウドワークロードを保護するクラウドネイティブアプリケーション保護プラットフォーム (CNAPP) です。

Datadog Cloud SIEM を有効にすると、すぐに使えるセキュリティルールを使用して、他のセキュリティインフラストラクチャーと一緒に Azure 環境を監視できます。

## 計画と使用

### インフラストラクチャーリスト

このインテグレーションでは、Datadog Azure インテグレーションが有効になっている必要があります。イベントハブを使用して Azure 経由で Datadog にログを転送します。インテグレーションには、ログフォワーダーのバージョンが少なくとも `1.0.1` 以降であることが必要です。

### ブラウザトラブルシューティング

イベントハブに[ログを継続的にエクスポートする][2]ように Defender for Cloud を構成します。Datadog 内で追加の構成は必要ありません。

### 検証

Defender for Cloud でサンプルのアラートを生成するには、[Microsoft からのこの指示][3]に従ってください。

Defender for Cloud のログは、ログ管理で `source:microsoft-defender-for-cloud` を使ってアクセスできます。

Datadog Cloud SIEM を使用している場合は、Microsoft Defender for Cloud の検出ルールが有効になっていることを確認します。
1. Datadog のメニューで、**Security** > **Configuration** に進み、**Cloud SIEM** を展開します。
1. "Detection Rules" を選択します。右側の **Group By** セレクタをクリックし、**Source** を選択して検出ルールをソース別にグループ化します。
1. 下にスクロールして、**Azure** というセクションを展開します。リストをスクロールして、Microsoft Defender for Cloud ルールを見つけます。ルールがオンになっていることを確認します。


## リアルユーザーモニタリング

### データセキュリティ

Microsoft Defender for Cloud には、メトリクスは含まれません。

### ヘルプ

Microsoft Defender for Cloud には、サービスのチェック機能は含まれません。

### ヘルプ

Microsoft Defender for Cloud には、イベントは含まれません。

## ヘルプ

Cloud SIEM が Defender for Cloud アラートを受信していることを確認するには、以下の手順に従ってください。
1. Datadog のメニューで、**Security** > **Configuration** に進み、**Cloud SIEM** を展開します。
1. **Log Sources** を選択し、**Azure** までスクロールします。
1. Microsoft Defender for Cloud が **Installed** として表示されているかどうかを確認します。
1. カラムチャートを見て、ログが受信されていることを確認します。
1. ログを受信している場合は、**Logs** > **Search** に移動し、`source:microsoft-defender-for-cloud` を検索します。ログが表示されるタイムウィンドウを変更する必要があるかもしれません。
1. ログを点検し、適切に形成されていることを確認します。

それでも問題が解決しない場合は、[Datadog サポート][4]にお問い合わせください。

[1]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction
[2]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/continuous-export?tabs=azure-portal
[3]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/alert-validation
[4]: https://docs.datadoghq.com/ja/help/