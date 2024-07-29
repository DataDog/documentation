---
app_id: rum-flutter
app_uuid: a7344e0c-5fcf-43c0-af3b-734b484c1f29
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
- https://github.com/DataDog/integrations-extras/blob/master/rum_flutter/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_flutter
integration_id: rum-flutter
integration_title: Flutter
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_flutter
public_title: Flutter
short_description: Datadog RUM を使用した Flutter アプリケーションの監視とメトリクス生成
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
  description: Datadog RUM を使用した Flutter アプリケーションの監視とメトリクス生成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Flutter
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog [Flutter インテグレーション][1]を利用することで、問題のトリアージに費やす時間を減らし、より多くの時間を新機能のリリースに費やすことができるようになります。

- サードパーティライブラリ、ネットワークリクエスト、大容量メディアファイルにおけるパフォーマンス低下やアプリケーションクラッシュの根本的な原因をデバッグ
- アプリケーションの応答性向上、サービスレベルインジケータ (SLI) の設定、すぐに使えるダッシュボード、リアルタイムメトリクス、難読化されたクラッシュレポートによる問題の診断
- 大量のアプリケーションエラーを管理可能な固有の問題群にインテリジェントにグループ化

ユーザーエクスペリエンスがビジネスに与える影響を関連付けます。

- ビジネス KPI を達成するために、デモグラフィック、バージョンリリース、または任意のカスタム属性による画面エンゲージメントなど、重要なモバイルユーザーエクスペリエンスデータを分析
- すべてのユーザージャーニーを、ID、セルラーアクティビティ、リファーラル URL などのセッションイベントや属性のタイムラインと自動的に相関付け
- カスタマイズ可能なアナリティクスと地理的マップによりユーザー行動傾向を把握

Flutter アプリケーションのエンドツーエンドの健全性を監視します。

- ユーザーエクスペリエンスデータからバックエンドトレース、ランタイムメトリクス、ログに視点を移し、問題を調査する際の完全なコンテクストを提供
- クライアントサイドとサーバーサイドのメトリクス、トレース、ログを統合し、クラッシュのデバッグを高速化
- フロントエンドとバックエンドのチーム向けに、フルスタックモニタリングを単一プラットフォームで実現


## 計画と使用

### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[Flutter モニタリング][2]を参照してください。

### トレースの収集

Flutter アプリケーションは、自動的に Datadog にトレースを送信します。

### ログの収集

Flutter アプリケーションのログを Datadog に転送し始めるには、[Flutter ログ収集][3]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ

Flutter インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][4]を参照してください。

### イベント

イベントや属性の詳細については、[RUM Flutter モニタリング][5]を参照してください。

### サービスチェック

Flutter インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問い合わせください。

## その他の参考資料 

お役に立つドキュメント、リンクや記事:

- [Flutter モニタリング][5]



[1]: https://app.datadoghq.com/integrations/rum-flutter
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/#setup
[3]: https://docs.datadoghq.com/ja/logs/log_collection/flutter/
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/
[6]: https://docs.datadoghq.com/ja/help/