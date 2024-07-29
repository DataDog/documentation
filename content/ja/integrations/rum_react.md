---
app_id: rum-react
app_uuid: e112aa24-4dc9-465f-9f23-c1284c4d0d63
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
- ネットワーク
- トレーシング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_react/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_react
integration_id: rum-react
integration_title: React
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_react
public_title: React
short_description: Datadog RUM を使用した React アプリケーションの監視とメトリクス生成
supported_os:
- android
- linux
- windows
- ios
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Network
  - Category::Tracing
  - Supported OS::Android
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::iOS
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog RUM を使用した React アプリケーションの監視とメトリクス生成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: React
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog [React インテグレーション][1]で、React コンポーネントのパフォーマンス問題を迅速に解決します。

- サーバーの応答速度が遅い、レンダーブロックするリソース、コンポーネント内のエラーなど、パフォーマンスボトルネックの根本原因をデバッグ
- React のパフォーマンスデータをユーザージャーニー、サーバーサイドへの AJAX コール、ログと自動的に相関付け
- React の重要なパフォーマンスメトリクス (Core Web Vitals など)がしきい値を下回り、ユーザーエクスペリエンスが低下した場合にエンジニアリングチームにアラートを発信


React アプリケーションをエンドツーエンドで監視します。

- スタック全体におけるユーザージャーニーを追跡、視覚化
- ロードタイムが遅くなる根本的な原因をデバッグ。React のコード、ネットワークパフォーマンス、または基礎的なインフラストラクチャーの問題である可能性があります。
- ユーザー ID、電子メール、名前などの属性で、すべてのユーザーセッションを分析し、コンテキストを作成
- フロントエンドとバックエンドの開発チームのために、フルスタックモニタリングを 1 つのプラットフォームで実現

## 計画と使用

### RUM イベントの収集

React アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[React モニタリング][2]を参照してください。

### トレースの収集

React アプリケーションは、自動的に Datadog にトレースを送信します。

### ログの収集

React アプリケーションのログを Datadog に転送し始めるには、[React ログ収集][3]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ

React インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][4]を参照してください。

### イベント

イベントや属性の詳細については、[RUM React データ収集][5]を参照してください。

### サービスチェック

React インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問い合わせください。

## その他の参考資料 

お役に立つドキュメント、リンクや記事:

- [React モニタリング][7]




[1]: https://app.datadoghq.com/integrations/rum-react
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/javascript/
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/data_collected/
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/datadog-rum-react-components/