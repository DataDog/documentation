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
- link: https://www.datadoghq.com/blog/go-memory-metrics/
  tag: ブログ
  text: Go メモリメトリクスの謎解き
git_integration_title: go
has_logo: true
integration_id: go
integration_title: Go
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: go
public_title: Datadog-Go インテグレーション
short_description: Datadog のクライアントライブラリを使用して Go アプリケーションからランタイムメトリクスを送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Go インテグレーションを利用して、Go アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## 計画と使用

### メトリクスの収集

[DogStatsD を使用した Go カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[Go アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### 収集データ

_Agent v6.0 以上で使用可能_

ログを Datadog に転送するには、[Go ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

### プロファイルの収集

[Go プロファイラを有効にするための][4]専用ドキュメントをご覧ください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "go" >}}


### ヘルプ

Go インテグレーションには、イベントは含まれません。

### ヘルプ

Go インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=go
[2]: https://docs.datadoghq.com/ja/tracing/setup/go/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/go/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/go/
[5]: https://docs.datadoghq.com/ja/help/