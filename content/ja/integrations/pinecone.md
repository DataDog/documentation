---
app_id: pinecone
app_uuid: dd7ebeb0-9910-4897-81b3-d8bc73003413
assets:
  dashboards:
    pinecone: assets/dashboards/pinecone_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - pinecone.index.fullness
      metadata_path: metadata.csv
      prefix: pinecone.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10363
    source_type_name: Pinecone
  monitors:
    '[Pinecone] Index approaching maximum capacity': assets/monitors/index_fullness.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
- data stores
- ai/ml
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pinecone
integration_id: pinecone
integration_title: Pinecone
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: pinecone
public_title: Pinecone
short_description: 高性能 AI アプリケーションのためのクラウドベースのベクターデータベース。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Data Stores
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 高性能 AI アプリケーションのためのクラウドベースのベクターデータベース。
  media:
  - caption: Pinecone ダッシュボード概要
    image_url: images/pinecone-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Pinecone
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

- **パフォーマンスの最適化と使用量の管理:** Pinecone 内で特定のアクション (リクエスト数など) を観測、追跡し、レイテンシーが高かったり使用量が多かったりするアプリケーションリクエストを特定します。傾向を監視し、実用的な洞察を得ることで、リソースの使用量を改善し、コストを削減します。

- **メトリクスの自動アラート:** インデックスの空き状況が特定のしきい値に達したときにアラートを取得します。また、特定のメトリクスやしきい値にアラートする独自のカスタムモニターを作成することもできます。

- **使用量やレイテンシーにおける予期せぬスパイクの発見とトリアージ:** Pinecone の Datadog ダッシュボードで、使用量やレイテンシーの異常をすばやく視覚化します。メトリクスを時系列で表示することで、傾向の理解を深め、スパイクの重大度を判断します。

## 計画と使用

### インフラストラクチャーリスト

1. [Pinecone アカウント][1]にログインします。
2. **API Keys** タブに移動します。
3. API キーを作成します。
4. 作成した API キーをクリップボードにコピーします。

### ブラウザトラブルシューティング

1. Datadog の [Pinecone インテグレーションタイル][2]内のコンフィギュレーションタブに移動します。
2. プロジェクト ID を入力します。
3. API キーをクリップボードにコピーした際に表示される、環境を入力します。
4. コピーした API キーを入力します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "pinecone" >}}


### ワークフローの自動化

Pinecone には、収集ログは含まれません。

### ヘルプ

Pinecone には、サービスのチェック機能は含まれません。

### ヘルプ

Pinecone には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.pinecone.io/
[2]: https://app.datadoghq.com/account/settings#integrations/pinecone
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/pinecone/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/