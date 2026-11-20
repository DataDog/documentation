---
code_lang: nodejs
code_lang_weight: 50
title: Node.js 互換性要件
type: multi-code-lang
---
## アプリケーションセキュリティ機能 {#application-security-capabilities}

Node.js ライブラリでは、指定されたトレーサーバージョンに対して以下のアプリケーションセキュリティ機能がサポートされています。

| アプリケーションセキュリティ機能        | 最小 Node.js トレーサーバージョン                     |
|----------------------------------------|----------------------------------------------------|
| Threat Detection                       | 4.0.0                                              |
| Threat Protection                      | 4.0.0                                              |
| ブロックされたリクエストへの対応をカスタマイズする | 4.1.0                                              |
| Software Composition Analysis (SCA)    | 4.0.0                                              |
| Code Security                          | Node.js 16+ の場合は 4.18.0、Node.js 18+ の場合は 5.0.0   |
| ユーザーアクティビティイベントの自動追跡 | Node.js 16+ の場合は 4.4.0                              |
| API Security                           | Node.js 16+ の場合は 4.30.0、Node.js 18+ の場合は 5.6.0   |

Node.js でサポートされるすべてのアプリケーションセキュリティ機能を利用するための最小トレーサーバージョンは 4.30.0 です。


**注**:
- Threat Protection では、記載されている最小トレーサーバージョンに含まれる [Remote Configuration][2] を有効にする必要があります。

### サポートされているデプロイメントタイプ {#supported-deployment-types}
| タイプ        | Threat Detection のサポート | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                | {{< X >}}                     |

## 言語とフレームワークの互換性 {#language-and-framework-compatibility}

### Node.js のバージョンサポート {#nodejs-version-support}

Node.js プロジェクトが LTS メジャーリリースラインのサポートを終了 (EOL) すると、`dd-trace` の次のメジャーバージョンでもそのサポートが終了します。
`dd-trace` ライブラリの最後のメジャーサポートリリースラインは、その EOL バージョンの Node.js をメンテナンスモードで少なくともあと 1 年間サポートします。

一部の問題は `dd-trace` では解決できず、Node.js 側で解決する必要があります。これが発生し、該当する Node.js リリースが EOL である場合、EOL ではない別のリリースに移行せずに問題を解決することはできません。
Datadog は、非 LTS の Node.js メジャーリリースライン (奇数番号のバージョン) に対する特定のサポートを提供するための `dd-trace` の新しいリリースを作成しません。

最良のサポートを受けるには、常に最新の LTS リリースの Node.js と、`dd-trace` の最新メジャーバージョンを実行してください。どの Node.js リリースラインを使用する場合でも、そのリリースラインにおける最新バージョンの Node.js を使用して、最新のセキュリティ修正が適用されていることを確認してください。

Node.js のリリースについては、[Node.js の公式ドキュメント][4]を参照してください。



### オペレーティングシステム対応 {#operating-system-support}

以下のオペレーティングシステムは、`dd-trace` によって公式にサポートされています。リストに記載されていないオペレーティングシステムでも動作する可能性はありますが、アプリケーションセキュリティ機能、プロファイリング、ランタイムメトリクスなどの一部の機能を利用できない場合があります。一般的に、メジャーバージョンの初期リリース時にアクティブにメンテナンスされているオペレーティングシステムはサポートされます。


| オペレーティングシステム | アーキテクチャ | 最小バージョン                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64、x64    | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
| Linux (musl)     | arm64、x64    | Alpine 3.13                              |
| macOS            | arm64、x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1、Windows Server 2012         |





### Web フレームワークの互換性 {#web-framework-compatibility}

**Web フレームワークの統合によって提供されるもの:**

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散トレーシング

##### アプリケーションセキュリティ機能に関する注意事項 {#application-security-capability-notes}
- **Software Composition Analysis** はすべてのフレームワークでサポートされます。
- お使いのフレームワークが以下に記載されていない場合でも、**Code Security** は Weak Cipher、Weak Hashing、Insecure Cookie、HttpOnly フラグのない Cookie、および SameSite フラグのない Cookie の脆弱性を検出します。


| フレームワーク | バージョン | Threat Detection のサポート| Threat Protection のサポート| Code Security のサポート |
|-----------|----------|-----------------------------|------------------------------|----------------------------------------------------|
| express   | >=4      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| nextjs    | >=11.1   | {{< X >}}                   |                              |                                                    |





<div class="alert alert-info">サポートされていない機能や、お使いの Node.js フレームワークのサポートの追加をご希望の場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>


### ネットワーキングフレームワークの互換性 {#networking-framework-compatibility}


**ネットワーキングのトレーシングでは以下の確認が可能です。**

- アプリケーションの分散トレーシング
- リクエストベースのブロッキング

##### アプリケーションセキュリティ機能に関する注意事項 {#application-security-capability-notes-1}
- **Software Composition Analysis** はすべてのフレームワークでサポートされます。



| フレームワーク | Threat Detection のサポート| Threat Protection のサポート| Code Security のサポート |
|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| http      | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| https     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

### データストアの互換性 {#data-store-compatibility}


**データストアのトレーシングでは以下の確認が可能です。**

- リクエストから応答までの所要時間
- クエリ情報 (サニタイズされたクエリ文字列など)
- エラーとスタックトレースの取得

##### アプリケーションセキュリティ機能に関する注意事項 {#application-security-capability-notes-2}
- **Software Composition Analysis** はすべてのフレームワークでサポートされます。
- **Threat Protection** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。


| フレームワーク                | バージョン  | Threat Detection のサポート| Threat Protection のサポート| Code Security のサポート |
|--------------------------|-----------|-----------------------------|------------------------------|----------------------------------------------------|
| [@apollo/server][43]     | `>=4`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [apollo-server-core][44] | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [cassandra-driver][28]   | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [couchbase][29]          | `^2.4.2`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [elasticsearch][30]      | `>=10`    | {{< X >}}                   | {{< X >}}                    |                                                    |
| [ioredis][31]            | `>=2`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [knex][32]               | `>=0.8`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mariadb][5]             | `>=3`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [memcached][33]          | `>=2.2`   | {{< X >}}                   | {{< X >}}                    |                                                    |
| [mongodb-core][34]       | `>=2`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql][35]              | `>=2`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [mysql2][36]             | `>=1`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [oracledb][37]           | `>=5`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [pg][38]                 | `>=4`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |
| [redis][39]              | `>=0.12`  | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sharedb][40]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [tedious][41]            | `>=1`     | {{< X >}}                   | {{< X >}}                    |                                                    |
| [sequelize][42]          | `>=4`     | {{< X >}}                   | {{< X >}}                    | {{< X >}}                                          |


### ユーザー認証フレームワークの互換性 {#user-authentication-frameworks-compatibility}

**User Authentication Frameworks へのインテグレーションは以下を提供します。**

- ユーザー ID を含むユーザーログインイベント
- ユーザーログインイベントを監視するアカウント乗っ取り検出

| フレームワーク       | フレームワークの最小バージョン |
|-----------------|---------------------------|
| passport-local  | 1.0.0                     |
| passport-http   | 0.3.0                     |

[1]: /ja/tracing/trace_collection/compatibility/nodejs/
[2]: /ja/tracing/guide/remote_config/
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