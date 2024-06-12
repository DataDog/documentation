---
aliases:
- /ja/integrations/nodejs/
categories:
- languages
- log collection
- tracing
dependencies: []
description: Node.js サービスから DogStatsD または Datadog API 経由でカスタムメトリクスを送信。
doc_link: https://docs.datadoghq.com/integrations/nodejs/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/node-logging-best-practices/
  tag: ブログ
  text: Node.js ログを収集、カスタマイズ、一元化する方法
- link: https://www.datadoghq.com/blog/node-monitoring-apm/
  tag: ブログ
  text: Datadog APM と分散型トレーシングを使用した Node.js の監視。
git_integration_title: node
has_logo: true
integration_id: node
integration_title: NodeJS
integration_version: ''
is_public: true
manifest_version: '1.0'
name: node
public_title: Datadog-NodeJS インテグレーション
short_description: Node.js サービスから DogStatsD または Datadog API 経由でカスタムメトリクスを送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Node.js インテグレーションを利用して、Node.js アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## 計画と使用

### メトリクスの収集

Node.js インテグレーションを使用すると、数行のコードのインスツルメンテーションでカスタムメトリクスを監視できます。たとえば、ページビューや関数呼び出しの回数を返すメトリクスを監視できます。

Node.js インテグレーションの詳細については、[メトリクスの送信に関するガイド][1]を参照してください。

```js
// dd-trace が必要です
const tracer = require('dd-trace').init();

// カウンターをインクリメントします
tracer.dogstatsd.increment('page.views');
```

カスタムメトリクスを動作させるには、Agent で DogStatsD を有効にする必要があることに注意してください。収集はデフォルトで有効になっていますが、Agent は localhost からのメトリクスのみをリッスンします。外部メトリクスを許可するには、環境変数を設定するか、コンフィギュレーションファイルを更新する必要があります。

```sh
DD_USE_DOGSTATSD=true # デフォルト
DD_DOGSTATSD_PORT=8125 # デフォルト
DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true # 外部メトリクスを期待する場合
```

```yaml
use_dogstatsd: true # デフォルト
dogstatsd_port: 8125 # デフォルト
dogstatsd_non_local_traffic: true # 外部メトリクスを期待する場合
```

Agent の DogStatsD コレクターを使用するようにアプリケーションを構成する必要もあります。

```sh
DD_DOGSTATSD_HOSTNAME=localhost DD_DOGSTATSD_PORT=8125 node app.js
```

### トレースの収集

トレースを Datadog に送信するには、[Node.js アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### 収集データ

_Agent v6.0 以上で使用可能_

ログを Datadog に転送するには、[Node.js ログ収集][3]のセットアップに関するドキュメントを参照してください。

### プロファイルの収集

[Node.js プロファイラを有効にするための][4]専用ドキュメントをご覧ください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs
[2]: https://docs.datadoghq.com/ja/tracing/setup/nodejs/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/nodejs/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/nodejs/
[5]: https://docs.datadoghq.com/ja/help/