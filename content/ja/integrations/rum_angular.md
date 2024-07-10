---
app_id: rum-angular
app_uuid: 0dd38c9b-921d-4252-8c46-c7a6d83c5778
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
- トレーシング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_angular/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_angular
integration_id: rum-angular
integration_title: Angular
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_angular
public_title: Angular
short_description: Datadog RUM を使用した Angular アプリケーションの監視とメトリクス生成
supported_os:
- any
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Tracing
  - Supported OS::Any
  configuration: README.md#Setup
  description: Datadog RUM を使用した Angular アプリケーションの監視とメトリクス生成
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Angular
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog [Angular インテグレーション][1]で、Angular コンポーネントのパフォーマンス問題を迅速に解決します。

- サーバーの応答速度が遅い、レンダーブロックするリソース、コンポーネント内のエラーなど、パフォーマンスボトルネックの根本原因をデバッグ
- Angular のパフォーマンスデータをユーザージャーニー、サーバーサイドへの AJAX コール、ログと自動的に相関付け
- Angular の重要なパフォーマンスメトリクス (Core Web Vitals など)がしきい値を下回り、ユーザーエクスペリエンスが低下した場合にエンジニアリングチームにアラートを発信


Angular アプリケーションをエンドツーエンドで監視します。

- スタック全体におけるユーザージャーニーを追跡、視覚化
- ロードタイムが遅くなる根本的な原因をデバッグ。Angular のコード、ネットワークパフォーマンス、または基礎的なインフラストラクチャーの問題である可能性があります。
- ユーザー ID、電子メール、名前などの属性で、すべてのユーザーセッションを分析し、コンテキストを作成
- フロントエンドとバックエンドの開発チームのために、フルスタックモニタリングを 1 つのプラットフォームで実現






## 計画と使用

### RUM イベントの収集

アプリケーションからリアルユーザーモニタリングのイベント収集を開始するには、[ブラウザモニタリング][2]を参照してください。

### トレースの収集

Angular アプリケーションは、自動的に Datadog にトレースを送信します。

### ログの収集

Angular アプリケーションのログを Datadog に転送し始めるには、[JavaScript ログ収集][3]をご覧ください。

## リアルユーザーモニタリング

### データセキュリティ

Angular インテグレーションには、メトリクスは含まれていません。RUM アプリケーションからカスタムメトリクスを生成するには、[メトリクスの生成][4]を参照してください。

### イベント

イベントや属性の詳細については、[RUM ブラウザデータ収集][5]を参照してください。

### サービスチェック

Angular インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問い合わせください。



[1]: https://app.datadoghq.com/integrations/rum-angular
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/javascript/
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/data_collected/
[6]: https://docs.datadoghq.com/ja/help/