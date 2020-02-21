---
title: Node.js アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/nodejs/
  - /ja/tracing/languages/nodejs/
  - /ja/tracing/languages/javascript/
  - /ja/tracing/setup/javascript/
  - /ja/agent/apm/nodejs/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-js'
    tag: GitHub
    text: ソースコード
  - link: 'https://datadog.github.io/dd-trace-js'
    tag: Documentation
    text: APIドキュメント
  - link: tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースを調査する
  - link: tracing/
    tag: 高度な使用方法
    text: 高度な使用方法
---
## インストールと利用開始

<div class="alert alert-info">Datadog アカウントをお持ちの場合、アプリ内ガイドで<a href="https://app.datadoghq.com/apm/docs?architecture=host-based&language=node" target=_blank>ホストベース</a>の設定や<a href="https://app.datadoghq.com/apm/docs?architecture=container-based&language=node" target=_blank>コンテナベース</a>の設定に関する詳細な手順をご確認いただけます。</div>

APM で使用される用語の説明は、[公式ドキュメント][1]を参照してください。

コンフィギュレーションおよび API の使用の詳細については、Datadog の [API ドキュメント][2]を参照してください。

貢献の詳細については、[開発ガイド][3]を参照してください。

### Quickstart

<div class="alert alert-warning">
このライブラリは、インスツルメントされたいずれのモジュールよりも先にインポートおよび初期化する<strong>必要があります</strong>。トランスパイラーを使用する時は、トレーサーライブラリを外部ファイルにインポートして初期化する<strong>必要があります</strong>。その後、アプリケーションを構築する際にそのファイルをまとめてインポートします。これにより、ホイストを防ぎ、他のモジュールがインポートされる前にトレーサーライブラリを確実にインポートして初期化します。
</div>

Node.js アプリケーションのトレースを開始するには、まず [Datadog Agent をインストールおよび構成][4]し、次に [Docker アプリケーションのトレース][5]または [Kubernetes アプリケーション][6]に関する追加ドキュメントを確認します。

次に、以下の npm を使用して Datadog Tracing ライブラリをインストールします。

```sh
npm install --save dd-trace
```

最後に、トレーサーをインポートして初期化します。

##### JavaScript

```js
// この行は、インスツルメントされたいずれのモジュールのインポートより前である必要があります。
const tracer = require('dd-trace').init()
```

##### TypeScript

```js
// server.js
import "./tracer"; // インスツルメントされたいずれのモジュールのインポートより前である必要があります。

// tracer.js
import tracer from "dd-trace";
tracer.init(); // ホイストを避けるため異なるファイルで初期化。
export default tracer;
```

初期化のオプションについては、[トレーサー設定][7]を参照してください。

## コンフィギュレーション

トレーサーの設定は、パラメーターを `init()` メソッドとして、または環境変数として構成できます。

| 構成         | 環境変数         | デフォルト     | 説明                                                                                                                                                                              |
|----------------|------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enabled        | `DD_TRACE_ENABLED`           | `true`      | トレーサーを有効にするかどうか。                                                                                                                                                            |
| debug          | `DD_TRACE_DEBUG`             | `false`     | トレーサーでデバッグロギングを有効化します。                                                                                                                                                      |
| service        | `DD_SERVICE_NAME`            | `null`      | このプログラムで使用するサービス名。                                                                                                                                            |
| url            | `DD_TRACE_AGENT_URL`         | `null`      | トレーサーが送信するトレース Agent の URL。設定した場合、ホスト名およびポートより優先されます。                                                                                    |
| hostname       | `DD_TRACE_AGENT_HOSTNAME`    | `localhost` | トレーサーが送信する Agent のアドレス。                                                                                                                                     |
| port           | `DD_TRACE_AGENT_PORT`        | `8126`      | トレーサーが送信するトレース Agent のポート。                                                                                                                                  |
| dogstatsd.port | `DD_DOGSTATSD_PORT`          | `8125`      | メトリクスが送信される DogStatsD Agent のポート。                                                                                                                           |
| env            | `DD_ENV`                     | `null`      | アプリケーションの環境 (例: `prod`、`pre-prod`、staging`) を設定します。                                                                                                                  |
| logInjection   | `DD_LOGS_INJECTION`          | `false`     | 対応するログライブラリのログにトレース ID の自動挿入を有効にします。                                                                                                         |
| tags           | `DD_TAGS`                    | `{}`        | すべてのスパンおよびメトリクスに適用されるべきグローバルタグを設定します。環境変数として渡される場合、フォーマットは `key:value, key:value` となります。                                           |
| sampleRate     | -                            | `1`         | スパンのサンプリング率: `0` ～ `1` 間の浮動小数点。                                                                                                                            |
| flushInterval  | -                            | `2000`      | トレーサーが Agent へトレースを送信する際のインターバル (ミリセカンド)。                                                                                                              |
| runtimeMetrics | `DD_RUNTIME_METRICS_ENABLED` | `false`     | ランタイムメトリクスのキャプチャを有効にするかどうか。ポート `8125` (または `dogstatsd.port` で構成) が UDP 用に Agent で開いている必要があります。                                                      |
| reportHostname | `DD_TRACE_REPORT_HOSTNAME`   | `false`     | 各トレースにシステムのホスト名を報告するかどうか。無効の場合は、Agent のホスト名が使用されます。                                                                        |
| experimental   | -                            | `{}`        | 試験機能は、 Boolean の true を使用して一度に、またはキー/値のペアを使用して個々に有効にできます。試験機能に関する詳細は、[サポート][8]までお問合せください。 |
| plugins        | -                            | `true`      | ビルトインプラグインを使用して、外部ライブラリの自動インスツルメンテーションを有効にするかどうか。                                                                                     |
| clientToken    | `DD_CLIENT_TOKEN`            | `null`      | ブラウザーのトレーシング用クライアントトークン。Datadog の **Integrations** -> **APIs** で生成できます。                                                                                           |
| logLevel       | `DD_TRACE_LOG_LEVEL`         | `debug`     | デバッグロギングが有効な場合に使用する、トレーサーの最小ログレベル用ストリング (例: `error`, `debug`)。                                                                           |

## Agent ホスト名の変更

アプリケーションレベルのトレーサーを設定し、以下のカスタム Agent ホスト名にトレースを送信します。

Nodejs racing Module が自動的に検索し環境変数の `DD_AGENT_HOST` や `DD_TRACE_AGENT_PORT` で初期化します。

```sh
DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> ノードサーバー
```

UDS などの異なるプロトコルを使用するには、URL 全体を単一の環境変数 `DD_TRACE_AGENT_URL` として指定します。

```sh
DD_TRACE_AGENT_URL=unix:<SOCKET_PATH>ノードサーバー
```

## 互換性

Node `8 以降`がこのライブラリのサポート対象です。8.x や 10.x など、偶数バージョンのみが公式なサポート対象です。9.x や 11.x などの奇数バージョンは動作しますが、公式なサポート対象ではありません。

Node 4 または Node 6 のバージョンは、`dd-trace-js` トレーサーのバージョン 0.13 でサポートされています。このバージョンは **2020 年 4 月 30 日**までサポートされますが、今後新機能は追加されません。

**注**: グローバルポリシーでは、Datadog JS トレーサーはバージョンリリース後発売終了まで  1 年間 Node をサポートします (バグの修正のみ)。

### インテグレーション

APM は、プラグインシステムを使用することで追加設定なしで使用できる装置を多くの一般的なフレームワークやライブラリ向けに提供しています。一覧にないモジュールのサポートをご希望の場合は、[サポートにお問い合わせ][8]になり、ご希望をお伝えください。

プラグインの切り替え方法と構成方法の詳細については、[API ドキュメント][9]をご確認ください。

#### Web フレームワークの互換性

| モジュール           | バージョン | サポートの種類    | Notes                                      |
|------------------|----------|-----------------|--------------------------------------------|
| [connect][10]    | `2 以降`    | 完全対応 |                                            |
| [express][11]    | `4 以降`    | 完全対応 | Sails、Loopback、[その他][12]に対応   |
| [fastify][13]    | `1 以降`    | 完全対応 |                                            |
| [graphql][14]    | `0.10 以降` | 完全対応 | Apollo Server および express-graphql に対応 |
| [gRPC][15]       | `>=1.13` | 完全対応 |                                            |
| [hapi][16]       | `2 以降`    | 完全対応 |                                            |
| [koa][17]        | `2 以降`    | 完全対応 |                                            |
| [paperplane][18] | `2.3 以降`  | 完全対応 | [serverless-mode][19] では非対応     |
| [restify][20]    | `3 以降`    | 完全対応 |                                            |

#### ネイティブモジュールの互換性

| モジュール      | サポートの種類    |
|-------------|-----------------|
| [dns][21]   | 完全対応 |
| [fs][22]    | 完全対応 |
| [http][23]  | 完全対応 |
| [https][24] | 完全対応 |
| [net][25]   | 完全対応 |

#### データストアの互換性

| モジュール                 | バージョン | サポートの種類    | Notes                                            |
|------------------------|----------|-----------------|--------------------------------------------------|
| [cassandra-driver][26] | `3 以降`    | 完全対応 |                                                  |
| [couchbase][27]        | `2.4.2 以降` | 完全対応 |                                                  |
| [elasticsearch][28]    | `10 以降`   | 完全対応 | バージョン 5 以降の `@elastic/elasticsearch` に対応 |
| [ioredis][29]          | `2 以降`    | 完全対応 |                                                  |
| [knex][30]             | `0.8 以降`  | 完全対応 | このインテグレーションはコンテキストの伝搬のみが目的 |
| [memcached][31]        | `2.2 以降`  | 完全対応 |                                                  |
| [mongodb-core][32]     | `2 以降`    | 完全対応 | Mongoose に対応                                |
| [mysql][33]            | `2 以降`    | 完全対応 |                                                  |
| [mysql2][34]           | `1 以降`    | 完全対応 |                                                  |
| [pg][35]               | `4 以降`    | 完全対応 | `pg` と共に使用した場合 `pg-native` に対応         |
| [redis][36]            | `0.12 以降` | 完全対応 |                                                  |
| [tedious][37]          | `1 以降`    | 完全対応 | `mssql` および `sequelize` 用の SQL Server ドライバー    |

#### ワーカーの互換性

| モジュール             | バージョン | サポートの種類    | Notes                                                  |
|--------------------|----------|-----------------|--------------------------------------------------------|
| [amqp10][38]       | `3 以降`    | 完全対応 | AMQP 1.0 ブローカー (ActiveMQ、Apache Qpid など) に対応 |
| [amqplib][39]      | `0.5 以降`  | 完全対応 | AMQP 0.9 ブローカー (RabbitMQ、Apache Qpid など) に対応 |
| [generic-pool][40] | `2 以降`    | 完全対応 |                                                        |
| [kafka-node][41]   |          | 間もなく対応     |                                                        |
| [rhea][42]         | `1 以降`    | 完全対応 |                                                        |

#### Promise ライブラリの互換性

| モジュール           | バージョン  | サポートの種類    |
|------------------|-----------|-----------------|
| [bluebird][43]   | `2 以降`     | 完全対応 |
| [promise][44]    | `7 以降`     | 完全対応 |
| [promise-js][45] | `0.0.3 以降` | 完全対応 |
| [q][46]          | `1 以降`     | 完全対応 |
| [when][47]       | `3 以降`     | 完全対応 |

#### ロガーの互換性

| モジュール           | バージョン  | サポートの種類    |
|------------------|-----------|-----------------|
| [bunyan][48]     | `1 以降`     | 完全対応 |
| [paperplane][49] | `2.3.2 以降` | 完全対応 |
| [pino][50]       | `2 以降`     | 完全対応 |
| [winston][51]    | `1 以降`     | 完全対応 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization
[2]: https://datadog.github.io/dd-trace-js
[3]: https://github.com/DataDog/dd-trace-js/blob/master/README.md#development
[4]: /ja/tracing/send_traces
[5]: /ja/tracing/setup/docker
[6]: /ja/agent/kubernetes/daemonset_setup/#trace-collection
[7]: https://datadog.github.io/dd-trace-js/#tracer-settings
[8]: /ja/help
[9]: https://datadog.github.io/dd-trace-js/#integrations
[10]: https://github.com/senchalabs/connect
[11]: https://expressjs.com
[12]: https://expressjs.com/en/resources/frameworks.html
[13]: https://www.fastify.io
[14]: https://github.com/graphql/graphql-js
[15]: https://grpc.io/
[16]: https://hapijs.com
[17]: https://koajs.com
[18]: https://github.com/articulate/paperplane
[19]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[20]: http://restify.com
[21]: https://nodejs.org/api/dns.html
[22]: https://nodejs.org/api/fs.html
[23]: https://nodejs.org/api/http.html
[24]: https://nodejs.org/api/https.html
[25]: https://nodejs.org/api/net.html
[26]: https://github.com/datastax/nodejs-driver
[27]: https://github.com/couchbase/couchnode
[28]: https://github.com/elastic/elasticsearch-js
[29]: https://github.com/luin/ioredis
[30]: https://knexjs.org
[31]: https://github.com/3rd-Eden/memcached
[32]: http://mongodb.github.io/node-mongodb-native/core
[33]: https://github.com/mysqljs/mysql
[34]: https://github.com/sidorares/node-mysql2
[35]: https://node-postgres.com
[36]: https://github.com/NodeRedis/node_redis
[37]: http://tediousjs.github.io/tedious
[38]: https://github.com/noodlefrenzy/node-amqp10
[39]: https://github.com/squaremo/amqp.node
[40]: https://github.com/coopernurse/node-pool
[41]: https://github.com/SOHU-Co/kafka-node
[42]: https://github.com/amqp/rhea
[43]: https://github.com/petkaantonov/bluebird
[44]: https://github.com/then/promise
[45]: https://github.com/kevincennis/promise
[46]: https://github.com/kriskowal/q
[47]: https://github.com/cujojs/when
[48]: https://github.com/trentm/node-bunyan
[49]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[50]: http://getpino.io
[51]: https://github.com/winstonjs/winston