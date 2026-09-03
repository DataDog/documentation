---
aliases:
- /ja/real_user_monitoring/setup
- /ja/real_user_monitoring/browser/setup/client
description: NPM または CDN 付きのクライアントサイドのインスツルメンテーションを使用して RUM Browser SDK を設定し、Web アプリケーションのユーザーエクスペリエンス、パフォーマンス、およびエラーを監視します。
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/advanced_configuration/
  tag: よくあるご質問
  text: 高度な構成
- link: /session_replay/browser/
  tag: よくあるご質問
  text: セッションリプレイの設定
- link: /real_user_monitoring/error_tracking/browser/
  tag: よくあるご質問
  text: エラートラッキングの設定
- link: /real_user_monitoring/correlate_with_other_telemetry/
  tag: よくあるご質問
  text: RUM イベントと他のテレメトリを相関させる
title: ブラウザ監視のクライアントサイド設定
---
## 概要 {% #overview %}

Datadog Browser SDK は、Web アプリケーションのための Real User Monitoring (RUM) を有効にし、ユーザーエクスペリエンスとアプリケーションパフォーマンスに関する包括的な可視性を提供します。RUM を使用すると、ページの読み込み時間、ユーザー操作、リソースの読み込み、およびアプリケーションエラーをリアルタイムで監視できます。

RUM は次のことに役立ちます。

- ページ読み込み、ユーザーアクション、リソースリクエストに関する、詳細なパフォーマンスメトリクスを活用してユーザーエクスペリエンスを監視する
- セッションリプレイ機能を活用して、アプリケーション内のユーザー操作を追跡する
- パフォーマンスのボトルネックを特定し、APM トレースを使用してフロントエンドとバックエンドのパフォーマンスを相関させる

ブラウザ SDK は、すべての最新のデスクトップおよびモバイルブラウザをサポートし、主要なパフォーマンスメトリクス、ユーザーアクション、およびアプリケーションエラーの自動収集を提供します。設定後、Datadog でアプリケーションごとに RUM 構成を管理し、ダッシュボードや RUM エクスプローラーで収集したデータを可視化できます。

{% partial file="sdk/setup/browser.mdoc.md" /%}

#### セッションサンプリングレートの設定 {% #set-session-sampling-rates %}

アプリケーションが Datadog RUM に送信するデータを制御するため、ブラウザ SDK を初期化する際に RUM セッションのサンプリングレートを指定できます。たとえば、セッションの 80% をサンプリングするには、`sessionSampleRate` を 80 に設定します。

```javascript
datadogRum.init({
  applicationId: '<APP_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  sessionSampleRate: 80,
  sessionReplaySampleRate: 20,
  // ... other configuration options
});
```

詳細については、[ブラウザ RUM とセッションリプレイのサンプリング][1] を参照してください。

## アプリケーションの監視を開始する {% #start-monitoring-your-application %}

RUM の基本設定が完了したので、アプリケーションはブラウザエラーを収集しており、リアルタイムで問題の監視やデバッグを開始できます。

[収集したデータ][2] を [ダッシュボード][3] で視覚化したり、[RUM エクスプローラー][4] で検索クエリを作成したりできます。

Datadog がデータの受信を開始するまで、[Applications] (アプリケーション) ページでアプリケーションは保留中として表示されます。

## 次のステップ {% #next-steps %}

[高度な構成][5] を参照してください。


[1]: /ja/real_user_monitoring/guide/sampling-browser-plans/
[2]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/
[3]: /ja/real_user_monitoring/platform/dashboards/
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/