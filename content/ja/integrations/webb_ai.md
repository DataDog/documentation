---
app_id: webb-ai
app_uuid: ca4c3360-0e0f-4257-a392-8d6e461a3806
assets:
  dashboards:
    Webb.ai Overview: assets/dashboards/webb_ai_overview.json
  oauth: assets/oauth_clients.json
author:
  homepage: https://webb.ai
  name: Webb.ai
  sales_email: support@webb.ai
  support_email: support@webb.ai
categories:
- ai/ml
- kubernetes
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/webb_ai/README.md
display_on_public_website: true
draft: false
git_integration_title: webb_ai
integration_id: webb-ai
integration_title: Webb.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: webb_ai
public_title: Webb.ai
short_description: 世界初の AI を活用したリライアビリティエンジニア
supported_os:
- any
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Kubernetes
  - Offering::Integration
  - Queried Data Type::Metrics
  - Queried Data Type::Events
  - Submitted Data Type::Events
  - Supported OS::Any
  configuration: README.md#Setup
  description: 世界初の AI を活用したリライアビリティエンジニア
  media:
  - caption: Matt による RCA 概要
    image_url: images/webb_ai-rca-summary.jpg
    media_type: image
  - caption: RCA 中のトラブルシューティング手順
    image_url: images/webb_ai-troubleshooting-steps.jpg
    media_type: image
  - caption: Webb.ai 概要ダッシュボード
    image_url: images/webb_ai-datadog-dashboard.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Webb.ai
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Webb.ai の Matt は、初の AI 対応の信頼性エンジニアです。
Matt は Datadog、Kubernetes、AWS や Azure、GCP などのクラウドプロバイダからのモニターやアラートをトラブルシュートします。
5 分以内にアラートやインシデントの根本原因を特定します。

このインテグレーションにより、Matt は Datadog のアラートを自動的に認識し、トラブルシューティングを行います。その結果、アラートのデバッグに要する平均時間 (MTTD) が大幅に短縮されます。トラブルシューティングの 80～90% が自動化され、オンコール担当者のデバッグ時間が大幅に削減されます。

このインテグレーションは次のデータを取得します。
- Datadog のイベント
- Datadog のメトリクスとタグ

このインテグレーションは、Matt が行った根本原因分析や Kubernetes クラスタの変更などのイベントを Datadog に送信します。
アラートの詳細な根本原因分析を参照でき、検証されたすべての仮説や、Matt が実施した正確な手順と裏付けとなる証拠を見ることができます。

## セットアップ

1. [Webb.ai][1] にアクセスして、無料サービスに登録してください。
2. [Datadog のインテグレーションページ][2]で Webb.ai のタイルを見つけ、**Install Integration** をクリックします。
3. **Configure** タブに移動し、**Connect Accounts** をクリックします。
4. 一連の OAuth ステップに従って、インテグレーションの設定を完了させます。

## アンインストール
Datadog インテグレーションを Webb.ai から削除するには、[Webb.ai のインテグレーションページ][3]に移動し、リストから Datadog インテグレーションを削除してください。

このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。

このインテグレーションに関連するすべての API キーを無効にするには、[Datadog API Keys][4] ページでインテグレーション名を検索してください。

## 収集データ

### メトリクス
Webb.ai は独自のメトリクスを生成しません。Datadog のメトリクスに依存しています。

### サービスチェック
Webb.ai はサービスチェックを含んでいません。

### イベント
Webb.ai は以下のイベントを Datadog に送信します。
- Matt による根本原因分析
- Kubernetes クラスタで検出された変更

## トラブルシューティング

サポートが必要ですか？[Webb.ai サポート][5]までご連絡ください。


[1]: https://app.webb.ai/
[2]: https://app.datadoghq.com/integrations
[3]: https://app.webb.ai/integrations
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: mailto:support@webb.ai