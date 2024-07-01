---
code_lang: nodejs
code_lang_weight: 50
title: Node.js 互換性要件
type: multi-code-lang
---

## ASM の機能

Node.js ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | NodeJS  トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection  | 3.13.1|
| Threat Protection  | 3.19.0  |
| オープンソースソフトウェア (OSS) の脆弱性管理 |  NodeJS 12+ の場合は 2.23.0、NodeJS 14+ の場合は 3.10.0 |
| コードレベルの脆弱性管理 (ベータ版)  | NodeJS 12+ の場合は 2.32.0、NodeJS 14+ の場合は 3.19.0 |

Node.js でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 3.19.0 です。


**注**:
- Threat Protection では、[リモート構成][2]を有効にする必要があり、これは記載のトレーサーの最小バージョンに含まれています。

### サポートされるデプロイメントタイプ
|タイプ | 脅威検知のサポート | OSSの脆弱性管理のサポート |
| ---           |   ---             |           ----            |
| Docker        | {{< X >}}         | {{< X >}}                 |
| Kubernetes    | {{< X >}}         | {{< X >}}                 | 
| AWS ECS       | {{< X >}}         | {{< X >}}                 |
| AWS Fargate   | {{< X >}}         | {{< X >}}                 |
| AWS Lambda    | {{< X >}}         | beta                      |   

## 言語とフレームワークの互換性

### Node.js のバージョンサポート

Node.js プロジェクトが LTS のメジャーリリースラインのサポートを終了すると (End of Life になると)、次のメジャーバージョンの `dd-trace` でそのサポートが停止されます。
`dd-trace` ライブラリの最後のメジャーサポートリリースラインは、メンテナンスモードベースで、少なくともあと 1 年間はその EOL バージョンの Node.js をサポートします。

いくつかの問題は `dd-trace` で解決できず、代わりに Node.js で解決しなければなりません。このような場合、問題のある Node.js のリリースが EOL であれば、EOL ではない別のリリースに移行しなければ問題を解決することは不可能です。
Datadog は、LTS でない Node.js のメジャーリリースライン (奇数バージョン) に対する特定のサポートを提供するために、`dd-trace` の新しいリリースを作成することはありません。

最高のサポートレベルを得るためには、常に最新の LTS リリースの Node.js と、最新のメジャーバージョンの `dd-trace` を実行します。Node.js のどのリリースラインを使用する場合でも、最新のセキュリティ修正を確実に行うために、そのリリースラインの最新バージョンの Node.js を使用します。

Node.js のリリースについては、[Node.js の公式ドキュメント][4]を参照してください。



### オペレーティングシステム対応

以下のオペレーティングシステムが `dd-trace` によって公式にサポートされています。リストにないオペレーティングシステムも動作する可能性はありますが、例えば ASM やプロファイリング、ランタイムメトリクスなど、いくつかの機能が欠けています。一般的には、メジャーバージョンの最初のリリース時に活発にメンテナンスされているオペレーティングシステムがサポートされます。


| dd-trace バージョン    | オペレーティングシステム      | アーキテクチャ         | 最小バージョン                         |
| ------------------- | --------------------- | --------------------- | ---------------------------------------- |
| 3.x                 | Linux (glibc)         | arm64、x64       | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
|                     | Linux (musl)          | arm64、x64       | Alpine 3.13                              |
|                     | macOS                 | arm64、x64            | Catalina (10.15)                         |
|                     | Windows               | x64             | Windows 8.1、Windows Server 2012         |
| 2.x                 | Linux (glibc)         | arm64、x64 | CentOS 7、Debian 9、RHEL 7、Ubuntu 14.04 |
|                     | Linux (musl)          | arm64、x64 | Alpine 3.10                              |
|                     | macOS                 | arm64、x64            | Yosemite (10.10)                         |
|                     | Windows               |  x64             | Windows 8.1、Windows Server 2012         |





### Web フレームワークの互換性

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散トレーシング

##### ASM の機能に関する備考
- **Vulnerability Management for OSS** はすべてのフレームワークでサポートされています
- お使いのフレームワークが以下にリストされていない場合でも、**Vulnerability Management for Code** は Weak Cipher、Weak Hashing、Insecure Cookie、Cookie without HttpOnly Flag、Cookie without SameSite Flag の脆弱性は検知します。


| フレームワーク                  | バージョン   | 脅威検知のサポートの有無 | 脅威保護のサポートの有無 | コードレベルの脆弱性管理のサポートの有無 |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| express | >=4| {{< X >}}  |{{< X >}}  | {{< X >}} |





<div class="alert alert-info">サポートされていない機能または Node.js フレームワークのサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>


### ネットワーキングフレームワークの互換性


**ネットワーキングのトレーシングでは以下の確認が可能です**

- アプリケーションの分散トレーシング
- リクエストベースのブロッキング

##### ASM の機能に関する備考
- **Vulnerability Management for OSS** はすべてのフレームワークでサポートされています



| フレームワーク                | 脅威検知のサポートの有無 | 脅威保護のサポートの有無 | コードレベルの脆弱性管理のサポートの有無 |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| http    |  {{< X >}} |  {{< X >}}  |  {{< X >}}  |
| https   |  {{< X >}} |  {{< X >}} |  |


<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性


**データストアのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### ASM の機能に関する備考
- **Vulnerability Management for OSS** はすべてのフレームワークでサポートされています
- **脅威保護** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。


| フレームワーク                 | バージョン | 脅威検知のサポートの有無 | 脅威保護のサポートの有無 | コードレベルの脆弱性管理のサポートの有無 |
| ----------------------- | ---------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| [cassandra-driver][28] | `3 以降`    |{{< X >}}|{{< X >}} |          |
| [couchbase][29]        | `2.4.2 以降` |{{< X >}}|          |          |
| [elasticsearch][30]    | `10 以降`   |{{< X >}}|          |          |
| [ioredis][31]          | `2 以降`    |{{< X >}}|{{< X >}} |          |
| [knex][32]             | `0.8 以降`  |{{< X >}}|{{< X >}} |          |
| [mariadb][5]           | `3 以降`    |{{< X >}}|{{< X >}} |          |
| [memcached][33]        | `2.2 以降`  |{{< X >}}|{{< X >}} |          |
| [mongodb-core][34]     | `2 以降`    |{{< X >}}|{{< X >}} |          |
| [mysql][35]            | `2 以降`    |{{< X >}}|          |{{< X >}} |
| [mysql2][36]           | `1 以降`    |{{< X >}}|{{< X >}} |{{< X >}} |
| [oracledb][37]         | `>=5`    |{{< X >}}|{{< X >}} |          |
| [pg][38]               | `4 以降`    |{{< X >}}|{{< X >}} |{{< X >}} |
| [redis][39]            | `0.12 以降` |{{< X >}}|{{< X >}} |          |
| [sharedb][40]          | `1 以降`    |{{< X >}}|{{< X >}} |          |
| [tedious][41]          | `1 以降`    |{{< X >}}|{{< X >}} |          |
| [sequelize][42]        | `4 以降`    |         |          | {{< X >}}|


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