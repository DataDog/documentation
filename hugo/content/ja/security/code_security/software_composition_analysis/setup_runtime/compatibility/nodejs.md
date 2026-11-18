---
code_lang: nodejs
code_lang_weight: 50
title: Node.js 互換性要件
type: multi-code-lang
---
## Code Security 機能 {#code-security-capabilities}

指定されたトレーサーバージョンにおいて、Node.js ライブラリでサポートされている Code Security 機能は以下のとおりです。

| Code Security 機能                       | 必要な Node.js tracer の最小バージョン                     |
|------------------------------------------------|----------------------------------------------------|
| Runtime Software Composition Analysis (SCA)    | 4.0.0                                              |
| Runtime Code Analysis (IAST)                   | Node.js 16+ の場合は 4.18.0、Node.js 18+ の場合は 5.0.0   |

Node.js でサポートされるすべてのアプリケーションセキュリティ機能を利用するための最小トレーサーバージョンは、Node.js 16+ の場合は 4.18.0、Node.js 18+ の場合は 5.0.0 です。

### サポートされているデプロイメントタイプ {#supported-deployment-types}
| タイプ        | Threat Detection のサポート | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                | {{< X >}}                     |

| タイプ              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)                                |
|------------------ | ------------------------------------------- | ----------------------------------------------------------- |
| Docker            | {{< X >}}                                   | {{< X >}}                                                   |
| Kubernetes        | {{< X >}}                                   | {{< X >}}                                                   |
| Amazon ECS        | {{< X >}}                                   | {{< X >}}                                                   |
| AWS Fargate       | {{< X >}}                                   | Preview (4.18.0 for Node.js 16+, or 5.0.0 for Node.js 18+)  |
| AWS Lambda        |                                             |                                                             |

## 言語とフレームワークの互換性 {#language-and-framework-compatibility}

### Node.js のバージョンサポート {#nodejs-version-support}

Node.js プロジェクトが LTS メジャーリリースラインのサポートを終了 (EOL) すると、`dd-trace` の次のメジャーバージョンでもそのサポートが終了します。
`dd-trace` ライブラリの最後のメジャーサポートリリースラインは、その EOL バージョンの Node.js をメンテナンスモードで少なくともあと 1 年間サポートします。

一部の問題は `dd-trace` では解決できず、Node.js 側で解決する必要があります。これが発生し、該当する Node.js リリースが EOL である場合、EOL ではない別のリリースに移行せずに問題を解決することはできません。
Datadog は、非 LTS の Node.js メジャーリリースライン (奇数番号のバージョン) に対する特定のサポートを提供するための `dd-trace` の新しいリリースを作成しません。

最良のサポートを受けるには、常に最新の LTS リリースの Node.js と、`dd-trace` の最新メジャーバージョンを実行してください。どの Node.js リリースラインを使用する場合でも、そのリリースラインにおける最新バージョンの Node.js を使用して、最新のセキュリティ修正が適用されていることを確認してください。

Node.js のリリースについては、[Node.js の公式ドキュメント][4]を参照してください。

### ECMAScript モジュール (ESM) {#ecmascript-modules-esm}

Runtime Software Composition Analysis は、アプリケーションが読み込むパッケージを報告します。`import` ステートメントまたは `import()` 呼び出しを通じて ECMAScript モジュール (ESM) として読み込まれたパッケージは、Datadog ESM ローダーが登録されている場合にのみ報告されます。これには `dd-trace` 6.24.0 以降 (v5 リリースラインでは 5.135.0 以降) が必要です。

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

ESM ローダーがない場合、`require()` を使用して読み込まれたパッケージのみが報告されます。

これは、Next.js など実行時に `import()` を使用してパッケージを読み込むフレームワークにも適用されます。[トレーサーのセットアップ][45] の起動オプションはそのままで、ESM ローダーを追加します。

```sh
NODE_OPTIONS='--import dd-trace/register.js --require dd-trace/init' next start
```

#### 制限事項 {#limitations}

- Node.js 18.19 以降では、`--import dd-trace/register.js` を使用します。ESM として読み込まれたパッケージは、`--loader dd-trace/loader-hook.mjs` では報告されません。
- アプリケーションの出力にバンドルされたパッケージ (たとえば esbuild や webpack を使用したもの) は、実行時に `node_modules` から読み込まれないため、報告されません。バンドルされなかったパッケージは報告されます。
- Yarn Plug'n'Play を使用する場合は、Yarn 4.11.0 以降を使用します。Node.js 22.22.3+、24.11.1+、25.1+、または 26 で ESM ローダーが登録されている場合、以前のバージョンでは起動時に失敗します。

### オペレーティングシステム対応 {#operating-system-support}

以下のオペレーティングシステムは、`dd-trace` によって公式にサポートされています。リストに記載されていないオペレーティングシステムでも動作する可能性はありますが、アプリケーションセキュリティ機能、プロファイリング、ランタイムメトリクスなどの一部の機能を利用できない場合があります。一般的に、メジャーバージョンの初期リリース時にアクティブにメンテナンスされているオペレーティングシステムはサポートされます。


| オペレーティングシステム | アーキテクチャ | 最小バージョン                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64、x64    | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
| Linux (musl)     | arm64、x64    | Alpine 3.13                              |
| macOS            | arm64、x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1、Windows Server 2012         |





### Web フレームワークの互換性 {#web-framework-compatibility}

- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散トレーシング

##### Code Security 機能に関する注意事項 {#code-security-capability-notes}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています
- お使いのフレームワークが以下に記載されていない場合でも、**Runtime Code Analysis (IAST)** は Weak Cipher、Weak Hashing、Insecure Cookie、HttpOnly フラグのない Cookie、および SameSite フラグのない Cookie の脆弱性を検出します。


| フレームワーク | バージョン | Runtime Code Analysis (IAST) |
|-----------|----------|------------------------------|
| express   | >=4      | {{< X >}}                    |
| nextjs    | >=11.1   |                              |

<div class="alert alert-info">サポートされていない機能や、お使いの Node.js フレームワークのサポートの追加をご希望の場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>


### ネットワーキングフレームワークの互換性 {#networking-framework-compatibility}


**ネットワーキングのトレーシングでは以下の確認が可能です。**

- アプリケーションの分散トレーシング
- リクエストベースのブロッキング

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-1}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています

| フレームワーク | Runtime Code Analysis (IAST) | 
|-----------|------------------------------|
| http      | {{< X >}}                    |
| https     | {{< X >}}                    |

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

### データストアの互換性 {#data-store-compatibility}

**データストアのトレーシングでは以下の確認が可能です。**

- クエリ情報 (サニタイズされたクエリ文字列など)
- エラーとスタックトレースの取得

##### Code Security 機能に関する注意事項 {#code-security-capability-notes-2}
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされています

| フレームワーク                | バージョン  | Runtime Code Analysis (IAST) |
|--------------------------|-----------|------------------------------|
| [@apollo/server][43]     | `>=4`     |                              |
| [apollo-server-core][44] | `>=3`     |                              |
| [cassandra-driver][28]   | `>=3`     |                              |
| [couchbase][29]          | `^2.4.2`  |                              |
| [elasticsearch][30]      | `>=10`    |                              |
| [ioredis][31]            | `>=2`     |                              |
| [knex][32]               | `>=0.8`   |                              |
| [mariadb][5]             | `>=3`     |                              |
| [memcached][33]          | `>=2.2`   |                              |
| [mongodb-core][34]       | `>=2`     | {{< X >}}                    |
| [mysql][35]              | `>=2`     | {{< X >}}                    |
| [mysql2][36]             | `>=1`     | {{< X >}}                    |
| [oracledb][37]           | `>=5`     |                              |
| [pg][38]                 | `>=4`     | {{< X >}}                    |
| [redis][39]              | `>=0.12`  |                              |
| [sharedb][40]            | `>=1`     |                              |
| [tedious][41]            | `>=1`     |                              |
| [sequelize][42]          | `>=4`     | {{< X >}}                    |


[1]: /ja/tracing/trace_collection/compatibility/nodejs/
[2]: /ja/remote_configuration#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: https://www.mongodb.com/docs/drivers/node/current/
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core
[45]: /ja/tracing/trace_collection/dd_libraries/nodejs/