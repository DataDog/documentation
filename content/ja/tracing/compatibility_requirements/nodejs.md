---
title: Nodejs 互換性要件
kind: ドキュメント
description: Nodejs トレーサーの互換性要件
further_reading:
  - link: tracing/setup/nodejs
    tag: Documentation
    text: アプリケーションのインスツルメンテーション
---
Nodejs Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

Node `8 以降`がこのライブラリのサポート対象です。8.x や 10.x など、偶数バージョンのみが公式なサポート対象です。9.x や 11.x などの奇数バージョンは動作しますが、公式なサポート対象ではありません。

## サポート対象のインテグレーション

APM は、プラグインシステムを使用することで追加設定なしで使用できる装置を多くの一般的なフレームワークやライブラリ向けに提供しています。一覧にないモジュールのサポートをご希望の場合は、[サポートチーム][2]までお問い合わせください。

プラグインの切り替え方法と構成方法の詳細については、[API ドキュメント][3]をご確認ください。

### Web フレームワークの互換性

| モジュール                  | バージョン | サポートの種類    | 注                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][4]           | `2 以降`    | 完全対応 |                                            |
| [express][5]           | `4 以降`    | 完全対応 | Sails、Loopback、[その他][6]に対応   |
| [fastify][7]           | `1 以降`    | 完全対応 |                                            |
| [graphql][8]           | `0.10 以降` | 完全対応 | Apollo Server および express-graphql に対応 |
| [gRPC][9]              | `>=1.13` | 完全対応 |                                            |
| [hapi][10]              | `2 以降`    | 完全対応 | 対応 [@hapi/hapi] バージョン `17.9 以降`    |
| [koa][11]               | `2 以降`    | 完全対応 |                                            |
| [microgateway-core][12] | `2.1 以降`  | 完全対応 | Apigee Edge 用のコアライブラリ。[edgemicro][13] CLI への対応には [@datadog/cli][14] を使用した静的パッチが必要。 |
| [paperplane][15]        | `2.3 以降`  | 完全対応 | [serverless-mode][16] では非対応     |
| [restify][17]           | `3 以降`    | 完全対応 |                                            |

### ネイティブモジュールの互換性

| モジュール      | サポートの種類        | 注 |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][18]   | 完全対応     |       |
| [fs][19]    | 完全対応     |       |
| [http][20]  | 完全対応     |       |
| [https][21] | 完全対応     |       |
| [http2][22] | 一部対応 | 現在、HTTP2 クライアントのみ対応。サーバーは非対応。 |
| [net][23]   | 完全対応     |       |

### データストアの互換性

| モジュール                 | バージョン | サポートの種類    | 注                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][24] | `3 以降`    | 完全対応 |                                                  |
| [couchbase][25]        | `2.4.2 以降` | 完全対応 |                                                  |
| [elasticsearch][26]    | `10 以降`   | 完全対応 | バージョン 5 以降の `@elastic/elasticsearch` に対応 |
| [ioredis][27]          | `2 以降`    | 完全対応 |                                                  |
| [knex][28]             | `0.8 以降`  | 完全対応 | このインテグレーションはコンテキストの伝搬のみが目的 |
| [memcached][29]        | `2.2 以降`  | 完全対応 |                                                  |
| [mongodb-core][30]     | `2 以降`    | 完全対応 | Mongoose に対応                                |
| [mysql][31]            | `2 以降`    | 完全対応 |                                                  |
| [mysql2][32]           | `1 以降`    | 完全対応 |                                                  |
| [pg][33]               | `4 以降`    | 完全対応 | `pg` と共に使用した場合 `pg-native` に対応         |
| [redis][34]            | `0.12 以降` | 完全対応 |                                                  |
| [tedious][35]          | `1 以降`    | 完全対応 | `mssql` および `sequelize` 用の SQL Server ドライバー    |

### ワーカーの互換性

| モジュール                     | バージョン | サポートの種類    | 注                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][36] | `1.2 以降`  | 完全対応 |                                                        |
| [amqp10][37]               | `3 以降`    | 完全対応 | AMQP 1.0 ブローカー (ActiveMQ、Apache Qpid など) に対応 |
| [amqplib][38]              | `0.5 以降`  | 完全対応 | AMQP 0.9 ブローカー (RabbitMQ、Apache Qpid など) に対応 |
| [generic-pool][39]         | `2 以降`    | 完全対応 |                                                        |
| [kafka-node][40]           |          | 間もなく対応     |                                                        |
| [rhea][41]                 | `1 以降`    | 完全対応 |                                                        |

### SDK の互換性

| モジュール             | バージョン   | サポートの種類    | 注                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][42]      | `>=2.1.35` | 完全対応 | CloudWatch、DynamoDB、Kinesis、Redshift、S3、SNS、SQS、一般的なリクエスト。 |

### Promise ライブラリの互換性

| モジュール           | バージョン  | サポートの種類    |
| ---------------- | --------- | --------------- |
| [bluebird][43]   | `2 以降`     | 完全対応 |
| [promise][44]    | `7 以降`     | 完全対応 |
| [promise-js][45] | `0.0.3 以降` | 完全対応 |
| [q][46]          | `1 以降`     | 完全対応 |
| [when][47]       | `3 以降`     | 完全対応 |

### ロガーの互換性

| モジュール           | バージョン  | サポートの種類    |
| ---------------- | --------- | --------------- |
| [bunyan][48]     | `1 以降`     | 完全対応 |
| [paperplane][49] | `2.3.2 以降` | 完全対応 |
| [pino][50]       | `2 以降`     | 完全対応 |
| [winston][51]    | `1 以降`     | 完全対応 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js
[2]: /ja/help/
[3]: https://datadog.github.io/dd-trace-js/#integrations
[4]: https://github.com/senchalabs/connect
[5]: https://expressjs.com
[6]: https://expressjs.com/en/resources/frameworks.html
[7]: https://www.fastify.io
[8]: https://github.com/graphql/graphql-js
[9]: https://grpc.io/
[10]: https://hapijs.com
[11]: https://koajs.com
[12]: https://github.com/apigee/microgateway-core
[13]: https://github.com/apigee-internal/microgateway
[14]: https://www.npmjs.com/package/@datadog/cli
[15]: https://github.com/articulate/paperplane
[16]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[17]: http://restify.com
[18]: https://nodejs.org/api/dns.html
[19]: https://nodejs.org/api/fs.html
[20]: https://nodejs.org/api/http.html
[21]: https://nodejs.org/api/https.html
[22]: https://nodejs.org/api/http2.html
[23]: https://nodejs.org/api/net.html
[24]: https://github.com/datastax/nodejs-driver
[25]: https://github.com/couchbase/couchnode
[26]: https://github.com/elastic/elasticsearch-js
[27]: https://github.com/luin/ioredis
[28]: https://knexjs.org
[29]: https://github.com/3rd-Eden/memcached
[30]: http://mongodb.github.io/node-mongodb-native/core
[31]: https://github.com/mysqljs/mysql
[32]: https://github.com/sidorares/node-mysql2
[33]: https://node-postgres.com
[34]: https://github.com/NodeRedis/node_redis
[35]: http://tediousjs.github.io/tedious
[36]: https://github.com/googleapis/nodejs-pubsub
[37]: https://github.com/noodlefrenzy/node-amqp10
[38]: https://github.com/squaremo/amqp.node
[39]: https://github.com/coopernurse/node-pool
[40]: https://github.com/SOHU-Co/kafka-node
[41]: https://github.com/amqp/rhea
[42]: https://github.com/aws/aws-sdk-js
[43]: https://github.com/petkaantonov/bluebird
[44]: https://github.com/then/promise
[45]: https://github.com/kevincennis/promise
[46]: https://github.com/kriskowal/q
[47]: https://github.com/cujojs/when
[48]: https://github.com/trentm/node-bunyan
[49]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[50]: http://getpino.io
[51]: https://github.com/winstonjs/winston