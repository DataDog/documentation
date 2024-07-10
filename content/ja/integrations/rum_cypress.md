---
app_id: rum-cypress
app_uuid: a6c112b6-f3af-4f9e-bf25-e0f8d8d7bb5f
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 問題追跡
- メトリクス
- ネットワーク
- テスト
- トレーシング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_cypress/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_cypress
integration_id: rum-cypress
integration_title: Cypress
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_cypress
public_title: Cypress
short_description: Datadog を使用したアプリケーションの Cypress テスト実行の監視
supported_os:
- すべて
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Issue Tracking
  - Category::Metrics
  - Category::Network
  - Category::Testing
  - Category::Tracing
  - Supported OS::Any
  configuration: README.md#Setup
  description: Datadog を使用したアプリケーションの Cypress テスト実行の監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cypress
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog [Cypress インテグレーション][1]により、CI/CD パイプラインとパイプラインで実行されている Cypress テストのパフォーマンスを以下の方法で監視します。

- 不安定なテストや失敗するテストを調査し、失敗するステップに焦点を当てる
- 分散型トレーシングでテスト結果を確認し、Cypress のテストが遅い理由を理解する
- RUM とセッションリプレイから収集したデータによるエンドツーエンドの Cypress テストにおけるパフォーマンスギャップのトラブルシューティング
- リアルユーザーセッションの監視・キャプチャ・視覚化


## 計画と使用

Cypress テストと RUM & セッションリプレイのインテグレーションに関する詳細は、[CI Visibility-RUM インテグレーションドキュメント][2]を参照してください。


### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[Cypress モニタリング][3]を参照してください。

### トレースの収集

アプリケーションは、自動的に Datadog にトレースを送信します。

## リアルユーザーモニタリング

### データセキュリティ

CI Visibility-RUM インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][4]を参照してください。

### サービスチェック

Cypress インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料 

お役に立つドキュメント、リンクや記事:

- [CI Visibility][6]



[1]: https://app.datadoghq.com/integrations/rum-cypress
[2]: https://docs.datadoghq.com/ja/continuous_integration/guides/rum_integration/
[3]: https://docs.datadoghq.com/ja/continuous_integration/guides/rum_integration/#browser-tests-and-rum
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://docs.datadoghq.com/ja/continuous_integration/