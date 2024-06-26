---
app_id: rum-javascript
app_uuid: d2496eee-ced1-4bf2-a85d-b8277b4952cf
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 言語
- メトリクス
- トレーシング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_javascript/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_javascript
integration_id: rum-javascript
integration_title: JavaScript
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_javascript
public_title: JavaScript
short_description: Datadog RUM を使用した JavaScript アプリケーションの監視とメトリクス生成
supported_os:
- すべて
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Languages
  - Category::Metrics
  - Category::Tracing
  - Supported OS::Any
  configuration: README.md#Setup
  description: Datadog RUM を使用した JavaScript アプリケーションの監視とメトリクス生成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: JavaScript
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog [JavaScript インテグレーション][1]で、JavaScript コンポーネントのパフォーマンス問題を迅速に解決します。

- サーバーの応答速度が遅い、レンダーブロックするリソース、コンポーネント内のエラーなど、パフォーマンスボトルネックの根本原因をデバッグ
- JavaScript のパフォーマンスデータをユーザージャーニー、サーバーサイドへの AJAX コール、ログと自動的に相関付け
- JavaScript の重要なパフォーマンスメトリクス (Core Web Vitals など)がしきい値を下回り、ユーザーエクスペリエンスが低下した場合にエンジニアリングチームにアラートを発信


JavaScript アプリケーションをエンドツーエンドで監視します。

- スタック全体におけるユーザージャーニーを追跡、視覚化
- ロードタイムが遅くなる根本的な原因をデバッグ。JavaScript のコード、ネットワークパフォーマンス、または基礎的なインフラストラクチャーの問題である可能性があります。
- ユーザー ID、電子メール、名前などの属性で、すべてのユーザーセッションを分析し、コンテキストを作成
- フロントエンドとバックエンドの開発チームのために、フルスタックモニタリングを 1 つのプラットフォームで実現


## 計画と使用

### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[ブラウザモニタリング][2]を参照してください。

### トレースの収集

JavaScript アプリケーションのトレースを Datadog に送信し始めるには、[RUM とトレースの接続][3]をご覧ください。

### ログの収集

JavaScript アプリケーションのログを Datadog に転送し始めるには、[ブラウザログ収集][4]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ

JavaScript インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][5]を参照してください。

### イベント

イベントや属性の詳細については、[RUM ブラウザデータ収集][6]を参照してください。

### サービスチェック

JavaScript インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## その他の参考資料 

お役に立つドキュメント、リンクや記事:

- [ブラウザモニタリング][2]



[1]: https://app.datadoghq.com/integrations/rum-javascript
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces/?tabs=browserrum
[4]: https://docs.datadoghq.com/ja/logs/log_collection/javascript/
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/data_collected/
[7]: https://docs.datadoghq.com/ja/help/