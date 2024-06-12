---
categories:
- languages
- log collection
- tracing
dependencies: []
description: PHP アプリケーションのメトリクス、トレース、ログ、プロファイルデータを収集します。
doc_link: https://docs.datadoghq.com/integrations/php/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した PHP の監視。
- link: https://www.datadoghq.com/blog/php-logging-guide/
  tag: ブログ
  text: PHP ログを収集、カスタマイズ、分析する方法。
git_integration_title: php
has_logo: true
integration_id: php
integration_title: PHP
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: php
public_title: Datadog-PHP インテグレーション
short_description: PHP アプリケーションのメトリクス、トレース、ログ、プロファイルデータを収集します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Datadog-PHP インテグレーションを利用して、PHP アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## 計画と使用

### メトリクスの収集

[DogStatsD を使用した PHP カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[PHP アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### 収集データ

**Agent v6.0 以上で使用可能**

ログを Datadog に転送するには、[PHP ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

### プロファイルの収集

[PHP プロファイラを有効にするための][4]専用ドキュメントをご覧ください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=php
[2]: https://docs.datadoghq.com/ja/tracing/setup/php/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/php/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/php/
[5]: https://docs.datadoghq.com/ja/help/