---
aliases:
  - /ja/integrations/nodejs/
categories:
  - languages
  - log collection
ddtype: ライブラリ
dependencies: []
description: Node.js サービスから DogStatsD または Datadog API 経由でカスタムメトリクスを送信。
doc_link: 'https://docs.datadoghq.com/integrations/nodejs/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/node-logging-best-practices/'
    tag: ブログ
    text: Node.js ログを収集、カスタマイズ、一元化する方法
  - link: 'https://www.datadoghq.com/blog/node-monitoring-apm/'
    tag: ブログ
    text: Datadog APM と分散型トレーシングを使用した Node.js の監視。
git_integration_title: node
has_logo: true
integration_id: node
integration_title: NodeJS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: node
public_title: Datadog-NodeJS インテグレーション
short_description: Node.js サービスから DogStatsD または Datadog API 経由でカスタムメトリクスを送信。
version: '1.0'
---
## 概要

Node.js インテグレーションを利用して、Node.js アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## セットアップ

### メトリクスの収集

Node.js インテグレーションを使用すると、数行のコードのインスツルメンテーションでカスタムメトリクスを監視できます。たとえば、ページビューや関数呼び出しの回数を返すメトリクスを監視できます。

インスツルメンテーションは、Node.js 用のオープンソース DogStatsD クライアントである [hot-shots][1] を使用して実装できます。

Node.js インテグレーションの詳細については、こちらの[メトリクスの送信に関するガイド][2]を参照してください。

1. npm を使用して hot-shots をインストールします。

    ```shell
    npm install hot-shots
    ```

2. コードのインスツルメンテーションを開始します。

    ```js
    var StatsD = require('hot-shots');
    var dogstatsd = new StatsD();

    // Increment a counter.
    dogstatsd.increment('page.views')
    ```

### トレースの収集

トレースを Datadog に送信するには、[Node.js アプリケーションのインスツルメンテーション][3]に関するドキュメントを参照してください。

### ログの収集

_Agent v6.0 以上で使用可能_

ログを Datadog に転送するには、[Node.js ログ収集][4]のセットアップに関するドキュメントを参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/brightcove/hot-shots
[2]: https://docs.datadoghq.com/ja/metrics/
[3]: https://docs.datadoghq.com/ja/tracing/setup/nodejs/
[4]: https://docs.datadoghq.com/ja/logs/log_collection/nodejs/
[5]: https://docs.datadoghq.com/ja/help/