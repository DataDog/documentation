---
aliases:
  - /ja/integrations/nodejs/
categories:
  - languages
  - log collection
ddtype: ライブラリ
dependencies: []
description: Node.js サービスからカスタムメトリクスを DogStatsD または Datadog の API 経由で送信
doc_link: 'https://docs.datadoghq.com/integrations/nodejs/'
git_integration_title: node
has_logo: true
integration_title: NodeJS
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: node
public_title: Datadog-NodeJS インテグレーション
short_description: Node.js サービスからカスタムメトリクスを DogStatsD または Datadog の API 経由で送信 our API.
version: '1.0'
---
{{< img src="integrations/nodejs/nodejs_graph.png" alt="Node JS graph" >}}

## 概要

Node.js アプリケーションを Datadog に接続して、以下のことができます。

* アプリケーションのパフォーマンスを視覚化できます。
* アプリケーションのパフォーマンスを他のアプリケーションと関連付けることができます。
* 関連するメトリクスを監視できます。

## セットアップ
### コンフィグレーション

#### メトリクスの収集

Node.js インテグレーションを使用すると、数行のコードのインスツルメンテーションでカスタムメトリクスを監視できます。たとえば、ページビューや関数呼び出しの回数を返すメトリクスを監視できます。

インスツルメンテーションは、Node.js 用のオープンソース DogStatsD クライアントである [hot-shots][1] を使用して実装できます。

Node.js インテグレーションの詳細については、こちらの[メトリクスの送信に関するガイド][2]を参照してください。

1. npm を使用して hot-shots をインストールします。

```
npm install hot-shots
```

2. コードのインスツルメンテーションを開始します。

```js
var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

// カウンターをインクリメントします
dogstatsd.increment('page.views')
```

####         - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP

**Agent 6 以上で使用可能**

Node.js アプリケーションからログを収集するには、[Winston][3] を使用することをお勧めします。カスタムパース規則を保守しなくても済むように、JSON 形式のログを生成するようにロギングライブラリをセットアップすることを強くお勧めします。

Datadog の [Node.js ログ収集ガイド][4]に従って、ログの転送を開始してください。

### 検証
メトリクスは、メトリクスエクスプローラーページに表示されます。

## 収集データ
### メトリクス
Node.js インテグレーションには、メトリクスは含まれません。

### イベント
Node.js インテグレーションには、イベントは含まれません。

### サービスのチェック
Node.js インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://github.com/brightcove/hot-shots
[2]: https://docs.datadoghq.com/ja/developers/metrics
[3]: https://github.com/winstonjs/winston
[4]: https://docs.datadoghq.com/ja/logs/languages/nodejs
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}