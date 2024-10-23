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

When a release has changes that could go in multiple semver categories, the highest one is chosen. [Release notes][2] are posted with each GitHub release.

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
| [connect][6]           | `2 以降`    | 完全対応 |                                             |
| [express][7]           | `4 以降`    | 完全対応 | Sails、Loopback、[その他][8]に対応     |
| [fastify][9]           | `1 以降`    | 完全対応 |                                             |
| [graphql][10]           | `0.10 以降` | 完全対応 | Apollo Server および express-graphql に対応 |
| [graphql-yoga][65]      | `>=3.6.0`| 完全対応 | Supports graphql-yoga v3 executor          |
| [gRPC][11]              | `>=1.13` | 完全対応 |                                            |
| [hapi][12]              | `2 以降`    | 完全対応 | 対応 [@hapi/hapi] バージョン `17.9 以降`    |
| [koa][13]               | `2 以降`    | 完全対応 |                                            |
| [microgateway-core][14] | `2.1 以降`  | 完全対応 | Apigee Edge 用のコアライブラリ。[edgemicro][15] CLI への対応には [@datadog/cli][16] を使用した静的パッチが必要。 |
| [moleculer][17]         | `>=0.14` | 完全対応 |                                            |
| [next][18]              | `>=9.5`  | 完全対応 | See note on Complex framework usage.<br /><br />The tracer supports the following Next.js features: <ul><li>Standalone (`output: 'standalone'`)</li><li>App Router</li><li>Middleware: Not traced, use tracer versions `4.18.0` and `3.39.0` or higher for best experience.</li></ul> |
| [paperplane][19]        | `2.3 以降`  | 完全対応 | [serverless-mode][20] では非対応     |
| [restify][21]           | `3 以降`    | 完全対応 |                                            |

#### Complex framework usage

Some modern complex Node.js frameworks, such as Next.js and Nest.js, provide their own entry-point into an application. For example, instead of running `node app.js`, you may need to run `next start`. In these cases, the entry point is a file that ships in the framework package, not a local application file (`app.js`).

Loading the Datadog tracer early in your application code isn't effective because the framework could have already loaded modules that should be instrumented.

To load the tracer before the framework, use one of the following methods:

Prefix all commands you run with an environment variable:

```shell
NODE_OPTIONS='--require dd-trace/init' npm start
```

Or, modify the `package.json` file if you typically start an application with npm or yarn run scripts:

```plain
    // existing command
    "start": "next start",

    // suggested command
    "start": "node --require dd-trace/initialize ./node_modules/next start",
    "start": "NODE_OPTIONS='--require dd-trace/initialize' ./node_modules/next start",
```

**Note**: The previous examples use Next.js, but the same approach applies to other frameworks with custom entry points, such as Nest.js. Adapt the commands to fit your specific framework and setup. Either command should work, but using `NODE_OPTIONS`  also applies to any child Node.js processes.


### Native module compatibility

| Module      | Support Type        | Notes |
| ----------- | ------------------- | ------------------------------------------ |
| [dns][22]   | 完全対応     |       |
| [http][24]  | 完全対応     |       |
| [https][25] | Fully supported     |       |
| [http2][26] | Partially supported | Only HTTP2 clients are currently supported and not servers. |
| [net][27]   | Fully supported     |       |

### Data store compatibility

| Module                 | Versions | Support Type    | Notes                                            |
| ---------------------- | -------- | --------------- | ------------------------------------------------ |
| [cassandra-driver][28] | `>=3`    | Fully supported |                                                  |
| [couchbase][29]        | `^2.4.2` | Fully supported |                                                  |
| [elasticsearch][30]    | `>=10`   | Fully supported | Supports `@elastic/elasticsearch` versions `>=5` |
| [ioredis][31]          | `>=2`    | Fully supported |                                                  |
| [knex][32]             | `>=0.8`  | Fully supported | This integration is only for context propagation |
| [mariadb][63]          | `>=3`    | Fully supported |                                                  |
| [memcached][33]        | `>=2.2`  | Fully supported |                                                  |
| [mongodb-core][34]     | `>=2`    | Fully supported | Supports Mongoose                                |
| [mysql][35]            | `>=2`    | Fully supported |                                                  |
| [mysql2][36]           | `>=1`    | Fully supported |                                                  |
| [oracledb][37]         | `>=5`    | Fully supported |                                                  |
| [pg][38]               | `>=4`    | Fully supported | Supports `pg-native` when used with `pg`         |
| [redis][39]            | `>=0.12` | Fully supported |                                                  |
| [sharedb][40]          | `>=1`    | Fully supported |                                                  |
| [tedious][41]          | `>=1`    | Fully supported | SQL Server driver for `mssql` and `sequelize`    |

### Worker compatibility

| Module                     | Versions | Support Type    | Notes                                                  |
| -------------------------- | -------- | --------------- | ------------------------------------------------------ |
| [@google-cloud/pubsub][42] | `>=1.2`  | Fully supported |                                                        |
| [amqp10][43]               | `>=3`    | Fully supported | Supports AMQP 1.0 brokers (such as ActiveMQ, or Apache Qpid) |
| [amqplib][44]              | `>=0.5`  | Fully supported | Supports AMQP 0.9 brokers (such as RabbitMQ, or Apache Qpid) |
| [generic-pool][45]         | `>=2`    | Fully supported |                                                        |
| [kafkajs][46]         | `>=1.4`    | Fully supported |                                                        |
| [rhea][48]                 | `>=1`    | Fully supported |                                                        |

### SDK compatibility

| Module             | Versions   | Support Type    | Notes                                                  |
| ------------------ | ---------- | --------------- | ------------------------------------------------------ |
| [aws-sdk][49]      | `>=2.1.35` | Fully supported | CloudWatch, DynamoDB, Kinesis, Redshift, S3, SNS, SQS, and generic requests. |
| [openai][64]       | `3.x`      | Fully supported |                                                        |

### Promise library compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bluebird][50]   | `>=2`     | Fully supported |
| [promise][51]    | `>=7`     | Fully supported |
| [promise-js][52] | `>=0.0.3` | Fully supported |
| [q][53]          | `>=1`     | Fully supported |
| [when][54]       | `>=3`     | Fully supported |

### Logger compatibility

| Module           | Versions  | Support Type    |
| ---------------- | --------- | --------------- |
| [bunyan][55]     | `>=1`     | Fully supported |
| [paperplane][56] | `>=2.3.2` | Fully supported |
| [pino][57]       | `>=2`     | Fully supported |
| [winston][58]    | `>=1`     | Fully supported |

## Unsupported libraries

### Fibers

[`fibers`][59] is incompatible with `async_hooks`, a Node.js [module][60] that is used by `dd-trace-js` to track asynchronous contexts thereby ensuring accurate tracing. Interactions between `fibers` and `async_hooks` may lead to unpreventable crashes and undefined behavior. So, the use of `dd-trace-js` with applications that invoke `fibers` directly or indirectly through frameworks such as [Meteor][61] may result in instability (crashes) or incorrect tracing.

For additional information or to discuss [leave a comment on this github issue][62] or [reach out to support][3] to discuss further.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/
[2]: https://github.com/DataDog/dd-trace-js/releases
[3]: /ja/help/
[4]: https://github.com/nodejs/release#release-schedule
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
[64]: https://github.com/openai/openai-node
[65]: https://github.com/dotansimha/graphql-yoga