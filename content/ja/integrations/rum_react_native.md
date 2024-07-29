---
app_id: rum-react-native
app_uuid: 61207de8-cc1e-4915-a18a-7fb25093d85c
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- モニター
- apm
- ネットワーク
- profiler_troubleshooting
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_react_native/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_react_native
integration_id: rum-react-native
integration_title: React Native
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_react_native
public_title: React Native
short_description: Datadog RUM を使用した React Native アプリケーションの監視とメトリクス生成
supported_os:
- android
- ios
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Metrics
  - Category::Mobile
  - Category::Network
  - Category::Tracing
  - Supported OS::Android
  - Supported OS::iOS
  configuration: README.md#Setup
  description: Datadog RUM を使用した React Native アプリケーションの監視とメトリクス生成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: React Native
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog [React Native インテグレーション][1]を利用することで、問題のトリアージに費やす時間を減らし、より多くの時間を新機能のリリースに費やすことができるようになります。

- サードパーティライブラリ、ネットワークリクエスト、大容量メディアファイルにおけるパフォーマンス低下やアプリケーションクラッシュの根本的な原因をデバッグ
- アプリケーションの応答性向上、サービスレベルインジケータ (SLI) の設定、すぐに使えるダッシュボード、リアルタイムメトリクス、難読化されたクラッシュレポートによる問題の診断
- 大量のアプリケーションエラーを管理可能な固有の問題群にインテリジェントにグループ化

ユーザーエクスペリエンスがビジネスに与える影響を関連付けます。

- ビジネス KPI を達成するために、デモグラフィック、バージョンリリース、または任意のカスタム属性による画面エンゲージメントなど、重要なモバイルユーザーエクスペリエンスデータを分析
- すべてのユーザージャーニーを、ID、セルラーアクティビティ、リファーラル URL などのセッションイベントや属性のタイムラインと自動的に相関付け
- カスタマイズ可能なアナリティクスと地理的マップによりユーザー行動傾向を把握

React Native アプリケーションのエンドツーエンドの健全性を監視します。

- ユーザーエクスペリエンスデータからバックエンドトレース、ランタイムメトリクス、ログに視点を移し、問題を調査する際の完全なコンテクストを提供
- クライアントサイドとサーバーサイドのメトリクス、トレース、ログを統合し、クラッシュのデバッグを高速化
- フロントエンドとバックエンドのチーム向けに、フルスタックモニタリングを単一プラットフォームで実現

## 計画と使用

### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[React Native モニタリング][2]を参照してください。

### トレースの収集

React Native アプリケーションは、自動的に Datadog にトレースを送信します。

### ログの収集

React Native アプリケーションのログを Datadog に転送し始めるには、[React Native ログ収集][3]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ

React Native インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][4]を参照してください。

### イベント

イベントや属性の詳細については、[RUM React Native モニタリング][5]を参照してください。

### サービスチェック

React Native インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問い合わせください。

## その他の参考資料 

お役に立つドキュメント、リンクや記事:

- [React Native モニタリング][5]

[1]: https://app.datadoghq.com/integrations/rum-react-native
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/#setup
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/#manual-instrumentation
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/reactnative/
[6]: https://docs.datadoghq.com/ja/help/