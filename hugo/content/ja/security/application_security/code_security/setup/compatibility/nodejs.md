---
code_lang: nodejs
code_lang_weight: 50
title: Node.js 互換性要件
type: multi-code-lang
---

## アプリケーションセキュリティ機能

指定されたトレーサーバージョンに対して、Node.js ライブラリでサポートされるアプリケーションセキュリティ機能は以下のとおりです:

| アプリケーションセキュリティ機能        | Minimum Node.js tracer version                     |
|----------------------------------------|----------------------------------------------------|
| Threat Detection                       | 4.0.0                                              |
| Threat Protection                      | 4.0.0                                              |
| ブロックされたリクエストへの対応をカスタマイズする | 4.1.0                                              |
| Software Composition Analysis (SCA)    | 4.0.0                                              |
| コードセキュリティ                          | 4.18.0 for Node.js 16+, or 5.0.0 for Node.js 18+   |
| ユーザーアクティビティイベントの自動追跡 | Node.js 16 以降の場合は 4.4.0                              |
| API セキュリティ                           | Node.js 16+ の場合は 4.30.0、Node.js 18+ の場合は 5.6.0   |

Node.js でサポートされるすべてのアプリケーションセキュリティ機能を利用するための最小トレーサーバージョンは 4.30.0 です。


**注**:
- Threat Protection では、[リモート構成][2]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

### サポートされるデプロイメントタイプ
| タイプ        | Threat Detection のサポート | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                | {{< X >}}                     |

## 言語とフレームワークの互換性

### Node.js のバージョンサポート

Node.js プロジェクトが LTS のメジャーリリースラインのサポートを終了すると (EOL になると)、次のメジャーバージョンの `dd-trace` でそのサポートが停止されます。
`dd-trace` ライブラリの最後のメジャーサポートリリースラインは、メンテナンスモードベースで、少なくともあと 1 年間はその EOL バージョンの Node.js をサポートします。

いくつかの問題は `dd-trace` で解決できず、代わりに Node.js で解決しなければなりません。このような場合、問題のある Node.js のリリースが EOL であれば、EOL ではない別のリリースに移行しなければ問題を解決することは不可能です。
Datadog は、LTS でない Node.js のメジャーリリースライン (奇数バージョン) に対する特定のサポートを提供するために、`dd-trace` の新しいリリースを作成することはありません。

最高のサポートレベルを得るためには、常に最新の LTS リリースの Node.js と、最新のメジャーバージョンの `dd-trace` を実行します。Node.js のどのリリースラインを使用する場合でも、最新のセキュリティ修正を確実に行うために、そのリリースラインの最新バージョンの Node.js を使用します。

Node.js のリリースについては、[Node.js の公式ドキュメント][4]を参照してください。



### オペレーティングシステム対応

The following operating systems are officially supported by `dd-trace`. Any operating system not listed is still likely to work, but with some features missing, for example application security capabilities, profiling, and runtime metrics. Generally speaking, operating systems that are actively maintained at the time of initial release for a major version are supported.


| オペレーティングシステム | アーキテクチャ | 最小バージョン                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64、x64    | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
| Linux (musl)     | arm64、x64    | Alpine 3.13                              |
| macOS            | arm64、x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1、Windows Server 2012         |





### Web フレームワークの互換性

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散型トレーシング

##### アプリケーションセキュリティ機能に関する注意事項
- **Software Composition Analysis** はすべてのフレームワークでサポートされます。
- フレームワークが下記に記載されていない場合でも、**Code Security** は、弱い暗号 (Weak Cipher)、弱いハッシュ (Weak Hashing)、安全でないクッキー (Insecure Cookie)、HttpOnly フラグのないクッキー、SameSite フラグのないクッキーの脆弱性を検出します。


| フレームワーク | バージョン | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 | Code Security ですか？ |
|-----------|----------|-----------------------------|------------------------------|----------------------------------------------------|
| express   | >=4      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| nextjs    | >=11.1   | {{< X >}}                   |                              |                                                    |





<div class="alert alert-info">サポートされていない機能または Node.js フレームワークのサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>


### ネットワーキングフレームワークの互換性


**ネットワーキングのトレーシングでは以下の確認が可能です**

- アプリケーションの分散型トレーシング
- リクエストベースのブロッキング

##### アプリケーションセキュリティ機能に関する注意事項
- **Software Composition Analysis** はすべてのフレームワークでサポートされます。



| フレームワーク | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 | Code Security ですか？ |
|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| http      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| https     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性


**データストアのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### アプリケーションセキュリティ機能に関する注意事項
- **Software Composition Analysis** はすべてのフレームワークでサポートされます。
- **Threat Protection** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。


| フレームワーク                | バージョン  | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 | Code Security ですか？ |
|--------------------------|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| [@apollo/server][43]     | `4 以降`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [apollo-server-core][44] | `3 以降`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [cassandra-driver][28]   | `3 以降`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [couchbase][29]          | `2.4.2 以降`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [elasticsearch][30]      | `10 以降`    | {{< X >}}                   | {{< X >}}                    |                                                    |
| [ioredis][31]            | `2 以降`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [knex][32]               | `0.8 以降`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mariadb][5]             | `3 以降`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [memcached][33]          | `2.2 以降`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mongodb-core][34]       | `2 以降`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql][35]              | `2 以降`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql2][36]             | `1 以降`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [oracledb][37]           | `>=5`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [pg][38]                 | `4 以降`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [redis][39]              | `0.12 以降`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sharedb][40]            | `1 以降`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [tedious][41]            | `1 以降`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sequelize][42]          | `4 以降`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


### User Authentication Frameworks の互換性

**User Authentication Frameworks へのインテグレーションは以下を提供します。**

- ユーザー ID を含むユーザーログインイベント
- ユーザーログインイベントを監視するアカウント乗っ取り検出

| フレームワーク       | フレームワークの最小バージョン |
|-----------------|---------------------------|
| passport-local  | 1.0.0                     |
| passport-http   | 0.3.0                     |

[1]: /ja/tracing/trace_collection/compatibility/nodejs/
[2]: /ja/agent/remote_config/#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
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
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core