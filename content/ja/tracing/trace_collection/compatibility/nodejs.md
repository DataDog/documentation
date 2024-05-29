---
aliases:
- /ja/tracing/compatibility_requirements/nodejs
- /ja/tracing/setup_overview/compatibility_requirements/nodejs
code_lang: nodejs
code_lang_weight: 40
description: Node.js トレーサーの互換性要件
further_reading:
- link: tracing/trace_collection/dd_libraries/nodejs
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
kind: documentation
title: Node.js 互換性要件
type: multi-code-lang
---
## リリース

### バージョン

Datadog Node.js のトレーシングライブラリのバージョンは、[semver][1] に従っています。新しいメジャーバージョンがリリースされると、それが主要なリリースラインとなり、すべての新機能、バグ修正、セキュリティパッチがそこに置かれます。以下は、semver の各タイプの変更を構成するものの概要です。

| メジャー          | マイナー                                                          | パッチ    |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| 旧バージョンと互換性のない変更点。                  | 旧バージョンとの互換性がある (壊れない) ものを追加する。 | セキュリティ修正        |
| 旧バージョンと互換性のない API の変更点。                         | API の追加                   | バグ修正             |
| 旧バージョンと互換性のない機能の変更点。 | 機能の追加                                                 | |
| Node.js のバージョン、対応ライブラリ、その他の機能など、あらゆるもののサポートを打ち切る。     | Node.js のバージョン、対応ライブラリ、その他の機能など、あらゆるもののテスト済みのサポートを追加する。   |  |

リリースに複数のカテゴリーがある場合、最も高いカテゴリーが選択されます。 [リリースノート][2]は、GitHub の各リリースに掲載されています。

### メンテナンス

_メンテナンスモード_とは、可能な限りセキュリティとバグ修正のみを行い、新しい機能はケースバイケースで提供しない期間のことです。`dd-trace` のメジャーバージョンは、後続の dd-trace のメジャーバージョンがリリースされた時点でメンテナンスモードに移行します。メンテナンスモードの期間は、後続バージョンのリリース日から 1 年間です。

例えば、`dd-trace` のバージョン 5.0.0 が 2023 年 5 月 4 日にリリースされた場合、4.x.x リリースラインは 2024 年 5 月 4 日までメンテナンスモードベースでサポートされます。このメンテナンスモード期間中は、セキュリティパッチやバグパッチが可能な限り適用されます。

もし、特定のバージョンの `dd-trace-js` のサポートについて質問や懸念がある場合は、[サポートにお問い合わせ][3]ください。

### Node.js のバージョンサポート

Node.js プロジェクトが LTS のメジャーリリースラインのサポートを終了すると (EOL になると)、次のメジャーバージョンの `dd-trace` でそのサポートが停止されます。
`dd-trace` ライブラリの最後のメジャーサポートリリースラインは、メンテナンスモードベースで、少なくともあと 1 年間はその EOL バージョンの Node.js をサポートします。

いくつかの問題は `dd-trace` で解決できず、代わりに Node.js で解決しなければなりません。このような場合、問題のある Node.js のリリースが EOL であれば、EOL ではない別のリリースに移行しなければ問題を解決することは不可能です。
Datadog は、LTS でない Node.js のメジャーリリースライン (奇数バージョン) に対する特定のサポートを提供するために、`dd-trace` の新しいリリースを作成することはありません。

最高のサポートレベルを得るためには、常に最新の LTS リリースの Node.js と、最新のメジャーバージョンの `dd-trace` を実行します。Node.js のどのリリースラインを使用する場合でも、最新のセキュリティ修正を確実に行うために、そのリリースラインの最新バージョンの Node.js を使用します。

Node.js のリリースについては、[Node.js の公式ドキュメント][4]を参照してください。

### オペレーティングシステム対応

以下のオペレーティングシステムが `dd-trace` によって公式にサポートされています。リストにないオペレーティングシステムも動作する可能性はありますが、例えば ASM やプロファイリング、ランタイムメトリクスなど、いくつかの機能が欠けています。一般的には、メジャーバージョンの最初のリリース時に活発にメンテナンスされているオペレーティングシステムがサポートされます。

| dd-trace バージョン    | オペレーティングシステム      | アーキテクチャ         | 最小バージョン                         |
| ------------------- | --------------------- | --------------------- | ---------------------------------------- |
| 3.x                 | Linux (glibc)         | arm、arm64、x64       | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
|                     | Linux (musl)          | arm、arm64、x64       | Alpine 3.13                              |
|                     | macOS                 | arm64、x64            | Catalina (10.15)                         |
|                     | Windows               | ia32、x64             | Windows 8.1、Windows Server 2012         |
| 2.x                 | Linux (glibc)         | arm、arm64、ia32、x64 | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
|                     | Linux (musl)          | arm、arm64、ia32、x64 | Alpine 3.10                              |
|                     | macOS                 | arm64、x64            | Yosemite (10.10)                         |
|                     | Windows               | ia32、x64             | Windows 8.1、Windows Server 2012         |

## 対応インテグレーション

APM は、プラグインシステムを使用することで追加設定なしで使用できる装置を多くの一般的なフレームワークやライブラリ向けに提供しています。一覧にないモジュールのサポートをご希望の場合は、[サポートチーム][3]までお問い合わせください。

プラグインの切り替え方法と構成方法の詳細については、[API ドキュメント][5]をご確認ください。

### Web フレームワークの互換性

| モジュール                  | バージョン | サポートの種類    | 注                                      |
| ----------------------- | -------- | --------------- | ------------------------------------------ |
| [connect][6]           | `2 以降`    | 完全対応 |                                            |
| [express][7]           | `4 以降`    | 完全対応 | Sails、Loopback、[その他][8]に対応   |
| [fastify][9]           | `1 以降`    | 完全対応 |                                            |
| [graphql][10]           | `0.10 以降` | 完全対応 | Apollo Server および express-graphql に対応 |
| [gRPC][11]              | `>=1.13` | 完全対応 |                                            |
| [hapi][12]              | `2 以降`    | 完全対応 | 対応 [@hapi/hapi] バージョン `17.9 以降`    |
| [koa][13]               | `2 以降`    | 完全対応 |                                            |
| [microgateway-core][14] | `2.1 以降`  | 完全対応 | Apigee Edge 用のコアライブラリ。[edgemicro][15] CLI への対応には [@datadog/cli][16] を使用した静的パッチが必要。 |
| [moleculer][17]         | `>=0.14` | 完全対応 |                                            |
| [next][18]              | `>=9.5`  | 完全対応 | CLI で使用する場合は、`NODE_OPTIONS='-r dd-trace/init'` が必要です。 <br><br>トレーサーは、次のNext.jsの機能をサポートしています：<ul><li>Standalone (`output: 'standalone'`)</li><li>App Router</li><li>Middleware: トレースされません。最適な体験のためには、トレーサーのバージョン `4.18.0` と `3.39.0` またはそれ以上を使用してください。</li></ul> |
| [paperplane][19]        | `2.3 以降`  | 完全対応 | [serverless-mode][20] では非対応     |
| [restify][21]           | `3 以降`    | 完全対応 |                                            |

### ネイティブモジュールの互換性

| モジュール      | サポートの種類        | 注 |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][22]   | 完全対応     |       |
| [http][24]  | 完全対応     |       |
| [https][25] | 完全対応     |       |
| [http2][26] | 一部対応 | 現在、HTTP2 クライアントのみ対応。サーバーは非対応。 |
| [net][27]   | 完全対応     |       |

### データストアの互換性

| モジュール                 | バージョン | サポートの種類    | 注                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][28] | `3 以降`    | 完全対応 |                                                  |
| [couchbase][29]        | `2.4.2 以降` | 完全対応 |                                                  |
| [elasticsearch][30]    | `10 以降`   | 完全対応 | バージョン 5 以降の `@elastic/elasticsearch` に対応 |
| [ioredis][31]          | `2 以降`    | 完全対応 |                                                  |
| [knex][32]             | `0.8 以降`  | 完全対応 | このインテグレーションはコンテキストの伝搬のみが目的 |
| [mariadb][63]          | `3 以降`    | 完全対応 |                                                  |
| [memcached][33]        | `2.2 以降`  | 完全対応 |                                                  |
| [mongodb-core][34]     | `2 以降`    | 完全対応 | Mongoose に対応                                |
| [mysql][35]            | `2 以降`    | 完全対応 |                                                  |
| [mysql2][36]           | `1 以降`    | 完全対応 |                                                  |
| [oracledb][37]         | `>=5`    | 完全対応 |                                                  |
| [pg][38]               | `4 以降`    | 完全対応 | `pg` と共に使用した場合 `pg-native` に対応         |
| [redis][39]            | `0.12 以降` | 完全対応 |                                                  |
| [sharedb][40]          | `1 以降`    | 完全対応 |                                                  |
| [tedious][41]          | `1 以降`    | 完全対応 | `mssql` および `sequelize` 用の SQL Server ドライバー    |

### ワーカーの互換性

| モジュール                     | バージョン | サポートの種類    | 注                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][42] | `1.2 以降`  | 完全対応 |                                                        |
| [amqp10][43]               | `3 以降`    | 完全対応 | AMQP 1.0 ブローカー (ActiveMQ、または Apache Qpid など) に対応 |
| [amqplib][44]              | `0.5 以降`  | 完全対応 | AMQP 0.9 ブローカー (RabbitMQ、または Apache Qpid など) に対応 |
| [generic-pool][45]         | `2 以降`    | 完全対応 |                                                        |
| [kafkajs][46]         | `>=1.4`    | 完全対応 |                                                        |
| [kafka-node][47]           |          | 間もなく対応     |                                                        |
| [rhea][48]                 | `1 以降`    | 完全対応 |                                                        |

### SDK の互換性

| モジュール             | バージョン   | サポートの種類    | 注                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][49]      | `>=2.1.35` | 完全対応 | CloudWatch、DynamoDB、Kinesis、Redshift、S3、SNS、SQS、一般的なリクエスト。 |

### Promise ライブラリの互換性

| モジュール           | バージョン  | サポートの種類    |
| ---------------- | --------- | --------------- |
| [bluebird][50]   | `2 以降`     | 完全対応 |
| [promise][51]    | `7 以降`     | 完全対応 |
| [promise-js][52] | `0.0.3 以降` | 完全対応 |
| [q][53]          | `1 以降`     | 完全対応 |
| [when][54]       | `3 以降`     | 完全対応 |

### ロガーの互換性

| モジュール           | バージョン  | サポートの種類    |
| ---------------- | --------- | --------------- |
| [bunyan][55]     | `1 以降`     | 完全対応 |
| [paperplane][56] | `2.3.2 以降` | 完全対応 |
| [pino][57]       | `2 以降`     | 完全対応 |
| [winston][58]    | `1 以降`     | 完全対応 |

## 非対応のライブラリ

### Fibers

[`fibers`][59] は `async_hooks` と互換性がありません。これは Node.js の[モジュール][60]で、`dd-trace-js` が非同期コンテキストを追跡するために使用し、それによって正確なトレースを保証しています。`fibers` と `async_hooks` の間の相互作用は、予防できないクラッシュや未定義の挙動につながる可能性があります。そのため、`fibers` を直接、あるいは [Meteor][61] などのフレームワークを介して間接的に呼び出すアプリケーションで `dd-trace-js` を使用すると、不安定 (クラッシュ) や不正確なトレースが発生する可能性があります。

追加情報または議論については、[この github 問題にコメントを残す][62]か、[サポートにお問い合わせ][3]ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/
[2]: https://github.com/DataDog/dd-trace-js/releases
[3]: /ja/help/
[4]: https://nodejs.org/en/about/releases/
[5]: https://datadog.github.io/dd-trace-js/#integrations
[6]: https://github.com/senchalabs/connect
[7]: https://expressjs.com
[8]: https://expressjs.com/en/resources/frameworks.html
[9]: https://www.fastify.io
[10]: https://github.com/graphql/graphql-js
[11]: https://grpc.io/
[12]: https://hapijs.com
[13]: https://koajs.com
[14]: https://github.com/apigee/microgateway-core
[15]: https://github.com/apigee-internal/microgateway
[16]: https://www.npmjs.com/package/@datadog/cli
[17]: https://moleculer.services/
[18]: https://nextjs.org/
[19]: https://github.com/articulate/paperplane
[20]: https://github.com/articulate/paperplane/blob/master/docs/API.md#serverless-deployment
[21]: http://restify.com
[22]: https://nodejs.org/api/dns.html
[23]: https://nodejs.org/api/fs.html
[24]: https://nodejs.org/api/http.html
[25]: https://nodejs.org/api/https.html
[26]: https://nodejs.org/api/http2.html
[27]: https://nodejs.org/api/net.html
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: http://mongodb.github.io/node-mongodb-native/core
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/googleapis/nodejs-pubsub
[43]: https://github.com/noodlefrenzy/node-amqp10
[44]: https://github.com/squaremo/amqp.node
[45]: https://github.com/coopernurse/node-pool
[46]: https://github.com/tulios/kafkajs
[47]: https://github.com/SOHU-Co/kafka-node
[48]: https://github.com/amqp/rhea
[49]: https://github.com/aws/aws-sdk-js
[50]: https://github.com/petkaantonov/bluebird
[51]: https://github.com/then/promise
[52]: https://github.com/kevincennis/promise
[53]: https://github.com/kriskowal/q
[54]: https://github.com/cujojs/when
[55]: https://github.com/trentm/node-bunyan
[56]: https://github.com/articulate/paperplane/blob/master/docs/API.md#logger
[57]: http://getpino.io
[58]: https://github.com/winstonjs/winston
[59]: https://github.com/laverdet/node-fibers
[60]: https://nodejs.org/api/async_hooks.html
[61]: https://www.meteor.com/
[62]: https://github.com/DataDog/dd-trace-js/issues/1229
[63]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
