---
"app_id": "rum-roku"
"app_uuid": "0ab4b7a1-f017-4b3c-ab0f-eab5d476f132"
"assets": {}
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- モニター
- network
- tracing
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rum_roku/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "rum_roku"
"integration_id": "rum-roku"
"integration_title": "Roku"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "rum_roku"
"public_title": "Roku"
"short_description": "Monitor Roku channels and generate metrics using Datadog RUM"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Metrics"
  - "Category::Network"
  - "Category::Tracing"
  "configuration": "README.md#Setup"
  "description": Monitor Roku channels and generate metrics using Datadog RUM
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://docs.datadoghq.com/real_user_monitoring/roku/"
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-roku-with-rum/"
  "support": "README.md#Support"
  "title": Roku
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

With the Datadog [Roku integration][1], you can spend less time triaging issues and more time releasing new features by:

- Debugging the root cause of slow performance issues and application crashes, network requests, or large media files
- Improving application responsiveness, setting up service level indicators (SLIs), and diagnosing issues with out-of-the-box dashboards and real-time metrics
- 大量のアプリケーションエラーを管理可能な固有の問題群にインテリジェントにグループ化

ユーザーエクスペリエンスがビジネスに与える影響を関連付けます。

- Analyzing critical user experience data such as screen engagement by demographics, version releases, or any custom attributes, to reach your business KPIs
- カスタマイズ可能なアナリティクスと地理的マップによりユーザー行動傾向を把握

アプリケーションのエンドツーエンドの健全性を監視します。

- ユーザーエクスペリエンスデータからバックエンドトレース、ランタイムメトリクス、ログに視点を移し、問題を調査する際の完全なコンテクストを提供
- クライアントサイドとサーバーサイドのメトリクス、トレース、ログを統合し、クラッシュのデバッグを高速化
- フロントエンドとバックエンドのチーム向けに、フルスタックモニタリングを単一プラットフォームで実現

## セットアップ

### RUM イベントの収集

To start collecting Real User Monitoring events from your application, see [Roku Monitoring][2]. Additionally, you can [Connect RUM and Traces][3].

### ログの収集

To start forwarding your Roku application's logs to Datadog, see [Roku Log Collection][4].

## 収集データ

### メトリクス

The Roku integration does not include any metrics. To generate custom metrics from your RUM application, see [Generate Metrics][5]. 

### イベント

For more information about events and attributes, see [RUM Roku Data Collected][6].

### サービスチェック

The Roku integration does not include any service checks.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [RUM Roku Channel Monitoring][2] documentation
- [Monitor your Roku channels with Datadog RUM][8] blog post

[1]: https://app.datadoghq.com/integrations/rum-roku
[2]: https://docs.datadoghq.com/real_user_monitoring/roku/
[3]: https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces/?tab=rokurum#setup-rum
[4]: https://docs.datadoghq.com/logs/log_collection/roku/
[5]: https://docs.datadoghq.com/real_user_monitoring/generate_metrics
[6]: https://docs.datadoghq.com/real_user_monitoring/roku/data_collected/
[7]: https://docs.datadoghq.com/help/
[8]: https://www.datadoghq.com/blog/monitor-roku-with-rum/

