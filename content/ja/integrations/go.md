---
categories:
- 言語
- トレーシング
dependencies: []
description: Datadog のクライアントライブラリを使用して Go アプリケーションからランタイムメトリクスを送信。
doc_link: https://docs.datadoghq.com/integrations/go/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/go-logging/
  tag: ブログ
  text: Golang ログの収集、標準化、一元化方法
git_integration_title: go
has_logo: true
integration_id: go
integration_title: Go
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: go
public_title: Datadog-Go インテグレーション
short_description: Datadog のクライアントライブラリを使用して Go アプリケーションからランタイムメトリクスを送信。
version: '1.0'
---

## 概要

Go インテグレーションを利用して、Go アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## セットアップ

### メトリクスの収集

[DogStatsD を使用した Go カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[Go アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### ログの収集

_Agent v6.0 以上で使用可能_

ログを Datadog に転送するには、[Go ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "go" >}}


### イベント

Go インテグレーションには、イベントは含まれません。

### サービスのチェック

Go インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=go
[2]: https://docs.datadoghq.com/ja/tracing/setup/go/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/go/
[4]: https://docs.datadoghq.com/ja/help/