---
title: 標準属性
kind: documentation
description: パイプライン用の Datadog 標準属性
further_reading:
  - link: logs/processing/pipelines
    tag: Documentation
    text: Datadog のパイプライン
  - link: logs/processing/processors
    tag: Documentation
    text: 使用可能なプロセッサーのリスト
  - link: logs/logging_without_limits
    tag: Documentation
    text: 無制限のログ
  - link: logs/explorer
    tag: Documentation
    text: ログの調査方法
---
## 概要

さまざまなテクノロジーやアプリケーションから取得されるログを一元化すると、ログ管理環境に数十個から数百個の属性が生成されがちです。多数のチームのユーザーが同じ環境内で作業し、それぞれが独自の方法でログを使用している場合は、特にその傾向が顕著です。

これは混乱の原因になります。たとえば、同じクライアント IP がさまざまなログで `clientIP`、`client_ip_address`、`remote_address`、`client.ip` などの属性を持つことになるからです。

このような場合、多数の属性が生成または提供されることにより混乱が生じ、環境の構成ないし理解に悪影響を及ぼす可能性があります。また、Web プロキシと Web アプリケーションログの関連付けなど、個々の属性に対応するログの識別も困難になります。それぞれのテクノロジーでログの属性を個別に定義していたとしても、URL、クライアント IP、接続時間などは普遍的に一貫した意味を持つからです。

標準属性を使用すれば、組織内で独自の命名規則を定義し、それを可能な限り多くのユーザーと部門チームで共有することができます。これは、チーム共通のセマンティクスの受け皿となる属性のサブセットを定義することを意図して設計されたものです。

### 標準属性を設定する

ログインテグレーションは、基本的に[デフォルト提供セット](#default-standard-attribute-list)に基づいて行われますが、組織内でこのリストを拡張または変更することも可能です。
標準属性テーブルは、パイプラインおよびその他のログインテーク機能 (メトリクス生成、アーカイブ、除外フィルターなど) と併せてログコンフィギュレーションページで確認できます。

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="標準属性"  style="width:60%;">}}

標準属性の設定にあたって、管理者は既存の非標準属性セットを標準属性セットに再コピーする権限を有しています。こうすることでこれまでの情報を失うことなく、非準拠のログソースを準拠ソースに転換することができます。

### ログエクスプローラーの標準属性

一般的に、移行期間中は組織内に標準属性と非標準属性の双方が共存することになります。エクスプローラーでは各属性が区別されているため (ファセットリスト、アナリティクスのメジャーまたはグループセクターなど) 、このような場合も標準属性を簡単に識別することができます。

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_explorer.png" alt="標準属性"  style="width:60%;">}}

組織の管理者または命名規則の作成者は、このタイミングで他のユーザーに標準属性の概要を説明し、規則に従うよう促しておきましょう。

## 標準属性リスト

標準属性テーブルには、[定義済み標準属性セット](#default-standard-attribute-list)が付属しています。このリストに独自の属性を追加したり、既存の標準属性を編集または削除することができます。

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="標準属性を編集"  style="width:80%;">}}

### 標準属性を追加または更新する

標準属性は以下によって定義されます。

* `Path`: JSON で定義される標準属性のパス (例: `network.client.ip`)
* `Type` (`string`、`integer`、`double`、`boolean`): 属性の型。再マップリストの要素をキャストするために使用されます。
* `Description`: 属性のわかりやすい説明
* `Remapping list`: 標準属性に再マップが必要な非準拠属性のカンマ区切りリスト

新しい標準属性を追加したり、既存の標準属性を編集する際は、標準属性パネルが表示されます。

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="標準属性を定義"  style="width:80%;">}}

ここで標準属性の任意の要素を入力または更新できます。

**注**: 更新または追加された標準属性データは、新しく収集されるログにのみ適用されます。

### 標準属性の再マッピング

各ログはパイプラインで処理された後、標準属性の全リストと照合されます。
現在のログに再マッピングリストと一致する属性が含まれる場合は、標準属性テーブルのエントリごとに以下が実行されます。

* 指定のリストに一致する最初の属性を再マップした後、値が既に存在する場合はそれを新しい値で上書きします。
* Datadog で再マップされた属性の型を適用します。これが不可能な場合、対象の属性はスキップされ、リスト内で次に一致する属性が使用されます。
* 元の属性はログ内に維持されます。

**重要**: デフォルトでは、再マップリストが空の場合、既存の標準属性の型は変更されません。標準属性の型を強制するには、標準属性をそれ自身の再マップリストに追加します。

#### 検証

標準属性を追加または更新するには、次の規則に従います。

* ある標準属性を別の標準属性の再マップリストに追加することはできません。
* カスタム属性は 1 つの標準属性にしか再マップできません。
* ログの JSON 構造を尊重するため、ある標準属性を別の標準属性の子とすることはできません (`user` と `user.name` の両方を標準属性にすることは不可) 。

## デフォルトの標準属性リスト

デフォルトの標準属性リストは、7 つの機能領域に分かれています。

* [ネットワーク/通信](#network)
* [HTTP リクエスト](#http-requests)
* [ソースコード](#source-code)
* [データベース](#database)
* [パフォーマンス](#performance)
* [ユーザー関連の属性](#user-related-attributes)
* [Syslog とログシッパー](#syslog-and-log-shippers)
* [DNS](#dns)

### ネットワーク

以下は、ネットワーク通信で使用されるデータに関連する属性です。すべてのフィールドとメトリクスに `network` というプレフィックスが付きます。

| **完全名**               | **型** | **説明**                                                                          |
|:---------------------------|:---------|:-----------------------------------------------------------------------------------------|
| `network.client.ip`        | `string` | TCP 接続を開始したクライアントの IP アドレス。                          |
| `network.destination.ip`   | `string` | クライアントが接続した先の IP アドレス。                                                  |
| `network.client.port`      | `number` | 接続を開始したクライアントのポート。                                    |
| `network.destination.port` | `number` | クライアントが接続した先の TCP ポート。                                                    |
| `network.bytes_read`       | `number` | ログの送信時にクライアントからサーバーに転送された合計バイト数。 |
| `network.bytes_written`    | `number` | ログの送信時にサーバーからクライアントに転送された合計バイト数。 |

これらの属性に依存する代表的なインテグレーションには、[Apache][1]、[Varnish][2]、[AWS ELB][3]、[Nginx][4]、[HAProxy][5] などがあります。

### 位置情報

以下は、ネットワーク通信で使用される IP アドレスの位置情報に関連する属性です。すべてのフィールドに `network.client.geoip` または `network.destination.geoip` というプレフィックスが付きます。

| **完全名**                                | **型** | **説明**                                                                                                                      |
|:--------------------------------------------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `network.client.geoip.country.name`         | `string` | 国の名前。                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | 国の [ISO コード][6] (米国は `US`、フランスは `FR` など)。                                                  |
| `network.client.geoip.continent.code`       | `string` | 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antartica`、`South America`、`Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など) |
| `network.client.geoip.subdivision.iso_code` | `string` | その国で最大規模の地方区分の [ISO コード][6] (米国は `CA`、フランスは `SA` など)    |
| `network.client.geoip.city.name`            | `String` | 都市名 (`Paris`、`New York` など)                                                                                   |

### HTTP リクエスト

以下は、HTTP リクエストおよびアクセスで一般に使用されるデータに関連する属性です。すべての属性に `http` というプレフィックスが付きます。

これらの属性に依存する代表的なインテグレーションには、[Apache][1]、Rails、[AWS CloudFront][3]、Web アプリケーションサーバーなどがあります。

#### 共通属性

| **完全名**       | **型** | **説明**                                                                                           |
|:-------------------|:---------|:----------------------------------------------------------------------------------------------------------|
| `http.url`         | `string` | HTTP リクエストの URL。                                                                              |
| `http.status_code` | `number` | HTTP 応答ステータスコード。                                                                            |
| `http.method`      | `string` | リソースに対して行われるアクションを示します。                                        |
| `http.referer`     | `string` | リクエスト中のリソースにリンクした Web ページのアドレスを識別する HTTP ヘッダーフィールド。 |
| `http.request_id`  | `string` | HTTP リクエストの ID。                                                                               |
| `http.useragent`   | `string` | 送信されたままの User-Agent (未加工の形式)。[詳細については下記を参照してください](#user-agent-attributes)。          |
| `http.version`     | `string` | リクエストに使用された HTTP のバージョン。                                                                 |

#### URL 詳細属性

これらの属性は、HTTP URL のパースされた各部に関する詳細を提供します。通常は、[URL パーサー][7] によって生成されます。すべての属性に `http.url_details` というプレフィックスが付きます。

| **完全名**                   | **型** | **説明**                                                                         |
|:-------------------------------|:---------|:----------------------------------------------------------------------------------------|
| `http.url_details.host`        | `string` | URL の HTTP ホスト部分。                                                          |
| `http.url_details.port`        | `number` | URL の HTTP ポート部分。                                                          |
| `http.url_details.path`        | `string` | URL の HTTP パス部分。                                                          |
| `http.url_details.queryString` | `object` | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。 |
| `http.url_details.scheme`      | `string` | URL のプロトコル名 (HTTP または HTTPS)                                            |

#### User-Agent 属性

これらの属性は、ユーザーエージェントの属性の意味に関する詳細を示すものです。通常は、[ユーザーエージェントパーサー][8] によって生成されます。すべての属性に `http.useragent_details` というプレフィックスが付きます。

| **完全名**                            | **型** | **説明**                                |
|:----------------------------------------|:---------|:-----------------------------------------------|
| `http.useragent_details.os.family`      | `string` | User-Agent によって報告された OS ファミリー。      |
| `http.useragent_details.browser.family` | `string` | User-Agent によって報告されたブラウザファミリー。 |
| `http.useragent_details.device.family`  | `string` | User-Agent によって報告されたデバイスファミリー。  |

### ソースコード

以下は、カスタムアプリケーションのロガーからログまたはエラーを生成する際に使用されるデータに関係する属性です。すべての属性に `logger` または `error` というプレフィックスが付きます。

| **完全名**         | **型** | **説明**                                                  |
|:---------------------|:---------|:-----------------------------------------------------------------|
| `logger.name`        | `string` | ロガーの名前。                                          |
| `logger.thread_name` | `string` | ログの生成時の現在のスレッドの名前。            |
| `logger.method_name` | `string` | クラスメソッド名。                                           |
| `logger.version`     | `string` | ロガーのバージョン。                                       |
| `error.kind`         | `string` | エラーのタイプまたは種類 (場合によってはコード)。                  |
| `error.message`      | `string` | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`        | `string` | スタックトレースまたはエラーに関する補足情報 |

これらの属性に依存する代表的なインテグレーションには、Java、NodeJs、.NET、Golang、Python などがあります。

### データベース

データベース関連の属性には `db` というプレフィックスが付いています。

| **完全名**   | **型** | **説明**                                                                                                                       |
|:---------------|:---------|:--------------------------------------------------------------------------------------------------------------------------------------|
| `db.instance`  | `string` | データベースインスタンス名。たとえば、Java で `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"` の場合、インスタンス名は `customers` です。       |
| `db.statement` | `string` | 指定されたデータベースタイプのデータベースステートメント。たとえば、mySQL の場合は `"SELECT * FROM wuser_table"、Redis の場合は `"SET mykey 'WuValue'"` です。 |
| `db.operation` | `string` | 実行された処理 ("query"、"update"、"delete" など)。                                                                   |
| `db.user`      | `string` | 処理を実行するユーザー。                                                                                                     |

これらの属性に依存する代表的なインテグレーションには、[Cassandra][9]、[MySQL][10]、[RDS][11]、[Elasticsearch][12] などがあります。

### パフォーマンス

パフォーマンスメトリクス属性。

| **完全名** | **型** | **説明**                                                                                   |
|:-------------|:---------|:--------------------------------------------------------------------------------------------------|
| `duration`   | `number` | **nanoseconds** 単位の任意の種類の時間。HTTP 応答時間、データベースクエリ時間、レイテンシーなどがあります。 |

Datadog ではこの属性を[トレース検索][14]のデフォルトの[メジャー][13]として表示および使用するため、この属性に関するログ内で処理時間を[再マップ][21]することを推奨しています。

### ユーザー関連の属性

すべての属性とメジャーに `usr` というプレフィックスが付きます。

| **完全名** | **型** | **説明**         |
|:-------------|:---------|:------------------------|
| `usr.id`     | `string` | ユーザーの識別子。    |
| `usr.name`   | `string` | わかりやすいユーザー名。 |
| `usr.email`  | `string` | ユーザーの電子メール。         |

### Syslog とログシッパー

以下は、syslog またはログシッパーエージェントによって追加されるデータに関連する属性です。すべてのフィールドとメトリクスに `syslog` というプレフィックスが付きます。

| **完全名**       | **型** | **説明**                                                               |
|:-------------------|:---------|:------------------------------------------------------------------------------|
| `syslog.hostname`  | `string` | ホスト名。                                                                  |
| `syslog.appname`   | `string` | アプリケーション名。通常は、予約済み属性 `service` に再マップされます。 |
| `syslog.severity`  | `number` | ログの重大度。通常は、予約済み属性 `status` に再マップされます。      |
| `syslog.timestamp` | `string` | ログのタイムスタンプ。通常は、予約済み属性 `date` に再マップされます。       |
| `syslog.env`       | `string` | ログのソースが由来する環境名。                      |

これらに依存するインテグレーションには、[Rsyslog][15]、[NxLog][16]、[Syslog-ng][17]、[Fluentd][18]、[Logstash][19] などがあります。

### DNS

すべての属性とメジャーに `dns` というプレフィックスが付きます。

| **完全名**         | **型** | **説明**                                                           |
|:---------------------|:---------|:--------------------------------------------------------------------------|
| `dns.id`             | `string` | DNS のクエリ識別子。                                                 |
| `dns.question.name`  | `string` | DNS の質問で解決したい IP アドレスの URL。                  |
| `dns.question.type`  | `string` | DNS の質問の種類を指定する [2 オクテットのコード][20]。             |
| `dns.question.class` | `string` | DNS の質問で検索されるクラス (インターネットを使用する場合は IN など) 。 |
| `dns.question.size`  | `number` | DNS 質問のバイトサイズ。                                           |
| `dns.answer.name`    | `string` | クエリ対象のドメイン名。                                                  |
| `dns.answer.type`    | `string` | DNS の回答の種類を指定する [2 オクテットのコード][20]。               |
| `dns.answer.class`   | `string` | DNS によって回答されるクラス。                                            |
| `dns.answer.size`    | `number` | DNS 回答のバイトサイズ。                                             |
| `dns.flags.rcode`    | `string` | DNS の返答コード。                                                       |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/apache
[2]: /ja/integrations/varnish
[3]: /ja/integrations/amazon_elb
[4]: /ja/integrations/nginx
[5]: /ja/integrations/haproxy
[6]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[7]: /ja/logs/processing/processors/#url-parser
[8]: /ja/logs/processing/processors/#user-agent-parser
[9]: /ja/integrations/cassandra
[10]: /ja/integrations/mysql
[11]: /ja/integrations/amazon_rds
[12]: /ja/integrations/elastic
[13]: /ja/logs/explorer/?tab=measures#setup
[14]: /ja/tracing/app_analytics/search
[15]: /ja/integrations/rsyslog
[16]: /ja/integrations/nxlog
[17]: /ja/integrations/syslog_ng
[18]: /ja/integrations/fluentd
[19]: /ja/integrations/logstash
[20]: https://en.wikipedia.org/wiki/List_of_DNS_record_types
[21]: /ja/logs/processing/processors/#remapper