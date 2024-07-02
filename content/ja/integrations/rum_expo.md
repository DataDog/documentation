---
"app_id": "rum-expo"
"app_uuid": "6894cf91-e7a2-4600-966b-20a0c99ff08d"
"assets": {}
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- モニター
- mobile
- network
- tracing
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rum_expo/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rum_expo"
"integration_id": "rum-expo"
"integration_title": "Expo"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rum_expo"
"public_title": "Expo"
"short_description": "Monitor Expo applications and generate metrics using Datadog RUM"
"supported_os":
- android
- ios
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Metrics"
  - "Category::Mobile"
  - "Category::Network"
  - "Category::Tracing"
  - "Supported OS::Android"
  - "Supported OS::iOS"
  "configuration": "README.md#Setup"
  "description": Monitor Expo applications and generate metrics using Datadog RUM
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/"
  - "resource_type": documentation
    "url": "https://docs.datadoghq.com/real_user_monitoring/error_tracking/expo/"
  "support": "README.md#Support"
  "title": Expo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog [Expo インテグレーション][1]を利用することで、問題のトリアージに費やす時間を減らし、より多くの時間を新機能のリリースに費やすことができるようになります。

- サードパーティライブラリ、ネットワークリクエスト、大容量メディアファイルにおけるパフォーマンス低下やアプリケーションクラッシュの根本的な原因をデバッグ
- アプリケーションの応答性向上、サービスレベルインジケータ (SLI) の設定、すぐに使えるダッシュボード、リアルタイムメトリクス、難読化されたクラッシュレポートによる問題の診断
- 大量のアプリケーションエラーを管理可能な固有の問題群にインテリジェントにグループ化

ユーザーエクスペリエンスがビジネスに与える影響を関連付けます。

- ビジネス KPI を達成するために、デモグラフィック、バージョンリリース、または任意のカスタム属性による画面エンゲージメントなど、重要なモバイルユーザーエクスペリエンスデータを分析
- すべてのユーザージャーニーを、ID、セルラーアクティビティ、リファーラル URL などのセッションイベントや属性のタイムラインと自動的に相関付け
- カスタマイズ可能なアナリティクスと地理的マップによりユーザー行動傾向を把握

Expo アプリケーションのエンドツーエンドの健全性を監視します。

- ユーザーエクスペリエンスデータからバックエンドトレース、ランタイムメトリクス、ログに視点を移し、問題を調査する際の完全なコンテクストを提供
- クライアントサイドとサーバーサイドのメトリクス、トレース、ログを統合し、クラッシュのデバッグを高速化
- フロントエンドとバックエンドのチーム向けに、フルスタックモニタリングを単一プラットフォームで実現

## セットアップ

### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[Expo モニタリング][2]を参照してください。

### トレースの収集

Expo アプリケーションは、自動的に Datadog にトレースを送信します。

### ログの収集

Expo アプリケーションのログを Datadog に転送し始めるには、[Expo ログ収集][3]をご覧ください。

## 収集データ

### メトリクス

Expo インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][4]を参照してください。

### イベント

イベントや属性の詳細については、[RUM Expo モニタリング][5]を参照してください。

### サービスチェック

Expo インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Expo モニタリング][5]
- [Expo のクラッシュレポートとエラー追跡][7]

[1]: https://app.datadoghq.com/integrations/rum-expo
[2]: https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/#setup
[3]: https://docs.datadoghq.com/real_user_monitoring/reactnative/#manual-instrumentation
[4]: https://docs.datadoghq.com/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/
[6]: https://docs.datadoghq.com/help/
[7]: https://docs.datadoghq.com/real_user_monitoring/error_tracking/expo/

