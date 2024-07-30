---
categories:
- languages
- log collection
- tracing
dependencies: []
description: Datadog クライアントライブラリを使用して Ruby アプリケーションからカスタムメトリクスを送信。
doc_link: https://docs.datadoghq.com/integrations/ruby/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rails-with-datadog/
  tag: ブログ
  text: Datadog を使用した Rails アプリケーションの監視
- link: https://www.datadoghq.com/blog/managing-rails-logs-with-datadog/
  tag: ブログ
  text: Datadog を使用した Rails ログの収集および監視
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: ブログ
  text: Rails アプリケーションログを収集、カスタマイズ、管理する方法
git_integration_title: ruby
has_logo: true
integration_id: ruby
integration_title: Ruby
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: ruby
public_title: Datadog-Ruby インテグレーション
short_description: Datadog クライアントライブラリを使用して Ruby アプリケーションからカスタムメトリクスを送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Ruby インテグレーションを利用して、Ruby アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## 計画と使用

### メトリクスの収集

[DogStatsD を使用した Ruby カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[Ruby アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### 収集データ

**Agent v6.0 以上で使用可能**

ログを Datadog に転送するには、[Ruby ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=ruby
[2]: https://docs.datadoghq.com/ja/tracing/setup/ruby/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/ruby/
[4]: https://docs.datadoghq.com/ja/help/