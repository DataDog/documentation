---
title: 標準属性とエイリアス設定
kind: documentation
description: 命名規則の遵守
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
## 命名規則

さまざまなテクノロジーやアプリケーションから取得されるログを一元化すると、ログ管理環境に数十個から数百個の属性が生成されがちです。多数のチームのユーザーが同じ環境内で作業し、それぞれが独自の方法でログを使用している場合は、特にその傾向が顕著です。

クライアント IP の表記方法ひとつをとっても非常に様々な属性が存在します。たとえば、クライアント IP はログで `clientIP`、`client_ip_address`、`remote_address`、`client.ip` などと表記されます。リクエストの実行時間の場合は `exec_time`、`request_latency`、`request.time_elapsed` のようになります。

このような場合、多数の属性が生成または提供されることにより混乱が生じ、環境の構成ないし理解に悪影響を及ぼす可能性があります。また、Web プロキシと Web アプリケーションログの関連付けなど、個々の属性に対応するログの識別も困難になります。

各技術やチーム内でもともと固有のログ属性が定義されている場合でも、URL、クライアント IP、所要時間などは普遍的に一貫した意味を持ちます。**命名規則**はある技術または事業を構成する概念について、誰もが理解できる一般的な言語を用いて標準的な名称を定めるものです。

## 標準属性とエイリアス設定

**標準属性**は、オーガニゼーションで使用する命名規則の基盤となる存在です。

**エイリアス設定**を行うことで、異種のソースから流れてくるログの検索と集計が可能となります。複数のチームからユーザーが集まる場合も、命名規則があれば個々人の技術スタックを変更することなく業務を進めることができます。

エイリアス設定は異なるソースからのログをまとめ、[ファセットとして][1]フィルタリングや集計を行う場合に特に有用です。複数の異種ソースからコンテンツを収集して一意の**標準ファセット**を作成することで、オーガニゼーション全体のインサイトの構築や情報の追跡がさらに効率化します。

たとえば、ハイブリッド [Apache][2] および [Amazon Cloud Front][3] インフラストラクチャーの場合、標準の `Network Client IP` ファセットと標準の `duration` を使用して、レイテンシーに最も影響を受けるクライアントを追跡できます。

### 標準属性を設定する

ログのインテグレーションは標準属性の[デフォルトセット](#デフォルトの標準属性リスト)に依存します。

リストはオーガニゼーションの管理者が作成できます。

- [ログエクスプローラー][1]から、既存の属性を標準属性に**格上げ**できます。
- 標準属性の[構成ページ](#ログエクスプローラー内の標準属性)から、新しい属性を**作成**します。

### エイリアス設定

ソース属性を宛先属性に向けてエイリアス化することで、ソース属性を含むログにソースと宛先の両方の属性 (どちらも同じ値) が含まれるよう設定できます。

ユーザーはエイリアス設定された (ソース) または標準 (宛先) ファセット属性のいずれかを利用することができます。 ファセット利用の観点からは、エイリアス設定されたファセットの代わりに標準ファセットを使用することが[推奨されます][4]。これにより命名規則に従う必要性が強調され、非標準のコンテンツに基づくアセットの構築 (保存済みのビューやダッシュボードなど) を回避することができます。

エイリアス設定に関する確認事項:

- エイリアス設定はパイプラインによってログが処理された後に実行されます。抽出済みまたは処理済みの属性は、エイリアス設定時のソースとして利用可能です。
- Datadog ではエイリアス設定済みの属性の型が適用されます。これが不可能な場合、エイリアス設定はスキップされます。
- ログに既に宛先属性が含まれている場合、エイリアス設定によりその値が上書きされます。
- ひとつの標準属性で複数の属性をエイリアス化する場合、ログにこれらのソース属性が複数含まれているケースでは、そのうち 1 つのソース属性のみエイリアス設定が可能です。
- 更新または追加された標準属性データは、新しく収集されるログにのみ適用されます。
- 標準属性をエイリアス化することはできません。
- 属性は標準属性に対してのみエイリアス設定が可能です。
- ログの JSON 構造を尊重するため、ある標準属性を別の標準属性の子とすることはできません (`user` と `user.name` の両方を標準属性にすることは不可) 。

## ログコンフィギュレーションの標準属性

標準属性テーブルは、パイプライン、およびメトリクス生成、アーカイブ、除外フィルターなどその他のログ取り込み機能と同様にログコンフィギュレーションページでご覧いただけます。

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="標準属性"  style="width:60%;">}}

### 標準属性リスト

標準属性テーブルには、[定義済み標準属性セット](#default-standard-attribute-list)が付属しています。このリストに独自の属性を追加したり、既存の標準属性を編集または削除することができます。

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="標準属性を編集"  style="width:80%;">}}

標準属性は以下によって定義されます。

- `Path`: 標準属性として**格上げされる**属性のパス。JSON で定義されます (例: network.client.ip`) 。
- `Type` (`string`, `integer`, `double`, `boolean`): 属性の型。再マップリストの要素をキャストするために使用されます。
- `Aliasing list`: **エイリアス設定**対象となる属性のカンマ区切りリスト。
- `Description`: 属性のわかりやすい説明。

新しい標準属性を追加したり、既存の標準属性を編集する際は、標準属性パネルが表示されます。

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="標準属性を定義"  style="width:80%;">}}

## ログエクスプローラーの標準属性

エイリアスはログエクスプローラーに直接帰属します。詳細は[関連ドキュメント][5]を参照してください。

## デフォルトの標準属性リスト

デフォルトの標準属性リストは機能領域に分かれています。

- [ネットワーク/通信](#network)
- [HTTP リクエスト](#http-requests)
- [ソースコード](#source-code)
- [データベース](#database)
- [パフォーマンス](#performance)
- [ユーザー関連の属性](#user-related-attributes)
- [Syslog とログシッパー](#syslog-and-log-shippers)
- [DNS](#dns)

### ネットワーク

以下は、ネットワーク通信で使用されるデータに関連する属性です。すべてのフィールドとメトリクスに `network` というプレフィックスが付きます。

| **完全名**               | **型** | **説明**                                                                          |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| `network.client.ip`        | `string` | TCP 接続を開始したクライアントの IP アドレス。                          |
| `network.destination.ip`   | `string` | クライアントが接続した先の IP アドレス。                                                  |
| `network.client.port`      | `number` | 接続を開始したクライアントのポート。                                    |
| `network.destination.port` | `number` | クライアントが接続した先の TCP ポート。                                                    |
| `network.bytes_read`       | `number` | ログの送信時にクライアントからサーバーに転送された合計バイト数。 |
| `network.bytes_written`    | `number` | ログの送信時にサーバーからクライアントに転送された合計バイト数。 |

これらの属性に依存する代表的なインテグレーションには、[Apache][2]、[Varnish][6]、[AWS ELB][7]、[Nginx][8]、[HAProxy][9] などがあります。

### 位置情報

以下は、ネットワーク通信で使用される IP アドレスの位置情報に関連する属性です。すべてのフィールドに `network.client.geoip` または `network.destination.geoip` というプレフィックスが付きます。

| **完全名**                                | **型** | **説明**                                                                                                                      |
| :------------------------------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `network.client.geoip.country.name`         | `string` | 国の名前。                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | 国の [ISO コード][10] (米国は `US`、フランスは `FR` など)。                                                  |
| `network.client.geoip.continent.code`       | `string` | 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antartica`、`South America`、`Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など) |
| `network.client.geoip.subdivision.iso_code` | `string` | その国で最大規模の地方区分の [ISO コード][10] (米国は `CA`、フランスは `SA` など)    |
| `network.client.geoip.city.name`            | `String` | 都市名 (`Paris`、`New York` など)                                                                                   |

### HTTP リクエスト

以下は、HTTP リクエストおよびアクセスで一般に使用されるデータに関連する属性です。すべての属性に `http` というプレフィックスが付きます。

これらの属性に依存する代表的なインテグレーションには、[Apache][2]、Rails、[AWS CloudFront][7]、Web アプリケーションサーバーなどがあります。

#### 共通属性

| **完全名**       | **型** | **説明**                                                                                           |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| `http.url`         | `string` | HTTP リクエストの URL。                                                                              |
| `http.status_code` | `number` | HTTP 応答ステータスコード。                                                                            |
| `http.method`      | `string` | リソースに対して行われるアクションを示します。                                        |
| `http.referer`     | `string` | リクエスト中のリソースにリンクした Web ページのアドレスを識別する HTTP ヘッダーフィールド。 |
| `http.request_id`  | `string` | HTTP リクエストの ID。                                                                               |
| `http.useragent`   | `string` | 送信されたままの User-Agent (未加工の形式)。[詳細については下記を参照してください](#user-agent-attributes)。          |
| `http.version`     | `string` | リクエストに使用された HTTP のバージョン。                                                                 |

#### URL 詳細属性

これらの属性は、HTTP URL のパースされた各部に関する詳細を提供します。通常は、[URL パーサー][11] によって生成されます。すべての属性に `http.url_details` というプレフィックスが付きます。

| **完全名**                   | **型** | **説明**                                                                         |
| :----------------------------- | :------- | :-------------------------------------------------------------------------------------- |
| `http.url_details.host`        | `string` | URL の HTTP ホスト部分。                                                          |
| `http.url_details.port`        | `number` | URL の HTTP ポート部分。                                                          |
| `http.url_details.path`        | `string` | URL の HTTP パス部分。                                                          |
| `http.url_details.queryString` | `object` | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。 |
| `http.url_details.scheme`      | `string` | URL のプロトコル名 (HTTP または HTTPS)                                            |

#### User-Agent 属性

これらの属性は、ユーザーエージェントの属性の意味に関する詳細を示すものです。通常は、[ユーザーエージェントパーサー][12] によって生成されます。すべての属性に `http.useragent_details` というプレフィックスが付きます。

| **完全名**                            | **型** | **説明**                                |
| :-------------------------------------- | :------- | :--------------------------------------------- |
| `http.useragent_details.os.family`      | `string` | User-Agent によって報告された OS ファミリー。      |
| `http.useragent_details.browser.family` | `string` | User-Agent によって報告されたブラウザファミリー。 |
| `http.useragent_details.device.family`  | `string` | User-Agent によって報告されたデバイスファミリー。  |

### ソースコード

以下は、カスタムアプリケーションのロガーからログまたはエラーを生成する際に使用されるデータに関係する属性です。すべての属性に `logger` または `error` というプレフィックスが付きます。

| **完全名**         | **型** | **説明**                                                  |
| :------------------- | :------- | :--------------------------------------------------------------- |
| `logger.name`        | `string` | ロガーの名前。                                          |
| `logger.thread_name` | `string` | ログの生成時の現在のスレッドの名前。            |
| `logger.method_name` | `string` | クラスメソッド名。                                           |
| `logger.version`     | `string` | ロガーのバージョン。                                       |
| `error.kind`         | `string` | エラーのタイプまたは種類 (場合によってはコード)。                  |
| `error.message`      | `string` | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`        | `string` | スタックトレースまたはエラーに関する補足情報 |

これらの属性に依存する代表的なインテグレーションには、_Java_、_NodeJs_、.NET、_Golang_、_Python_ などがあります。

### データベース

データベース関連の属性には `db` というプレフィックスが付いています。

| **完全名**   | **型** | **説明**                                                                                                                       |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `db.instance`  | `string` | データベースインスタンス名。たとえば、Java で `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"` の場合、インスタンス名は `customers` です。       |
| `db.statement` | `string` | 指定されたデータベースタイプのデータベースステートメント。たとえば、mySQL の場合は `"SELECT * FROM wuser_table"、Redis の場合は `"SET mykey 'WuValue'"` です。 |
| `db.operation` | `string` | 実行された処理 ("query"、"update"、"delete" など)。                                                                   |
| `db.user`      | `string` | 処理を実行するユーザー。                                                                                                     |

これらの属性に依存する代表的なインテグレーションには、[Cassandra][13]、[MySQL][14]、[RDS][15]、[Elasticsearch][16] などがあります。

### パフォーマンス

パフォーマンスメトリクス属性。

| **完全名** | **型** | **説明**                                                                                   |
| :----------- | :------- | :------------------------------------------------------------------------------------------------ |
| `duration`   | `number` | **nanoseconds** 単位の任意の種類の時間。HTTP 応答時間、データベースクエリ時間、レイテンシーなどがあります。 |

Datadog ではこの属性を[トレース検索][18]のデフォルトの[メジャー][1]として表示および使用するため、この属性に関するログ内で処理時間を[再マップ][17]することを推奨しています。

### ユーザー関連の属性

すべての属性とメジャーに `usr` というプレフィックスが付きます。

| **完全名** | **型** | **説明**         |
| :----------- | :------- | :---------------------- |
| `usr.id`     | `string` | ユーザーの識別子。    |
| `usr.name`   | `string` | わかりやすいユーザー名。 |
| `usr.email`  | `string` | ユーザーの電子メール。         |

### Syslog とログシッパー

以下は、syslog またはログシッパーエージェントによって追加されるデータに関連する属性です。すべてのフィールドとメトリクスに `syslog` というプレフィックスが付きます。

| **完全名**       | **型** | **説明**                                                               |
| :----------------- | :------- | :---------------------------------------------------------------------------- |
| `syslog.hostname`  | `string` | ホスト名。                                                                  |
| `syslog.appname`   | `string` | アプリケーション名。通常は、予約済み属性 `service` に再マップされます。 |
| `syslog.severity`  | `number` | ログの重大度。通常は、予約済み属性 `status` に再マップされます。      |
| `syslog.timestamp` | `string` | ログのタイムスタンプ。通常は、予約済み属性 `date` に再マップされます。       |
| `syslog.env`       | `string` | ログのソースが由来する環境名。                      |

これらに依存するインテグレーションには、[Rsyslog][19]、[NxLog][20]、[Syslog-ng][21]、[Fluentd][22]、[Logstash][23] などがあります。

### DNS

すべての属性とメジャーに `dns` というプレフィックスが付きます。

| **完全名**         | **型** | **説明**                                                           |
| :------------------- | :------- | :------------------------------------------------------------------------ |
| `dns.id`             | `string` | DNS のクエリ識別子。                                                 |
| `dns.question.name`  | `string` | クエリ対象のドメイン名。                                                  |
| `dns.question.type`  | `string` | DNS の質問の種類を指定する [2 オクテットのコード][24]。             |
| `dns.question.class` | `string` | DNS の質問で検索されるクラス (インターネットを使用する場合は IN など) 。 |
| `dns.question.size`  | `number` | DNS 質問のバイトサイズ。                                           |
| `dns.answer.name`    | `string` | DNS で回答する際の IP アドレス。                                 |                                                  
| `dns.answer.type`    | `string` | DNS の回答の種類を指定する [2 オクテットのコード][24]。               |
| `dns.answer.class`   | `string` | DNS によって回答されるクラス。                                            |
| `dns.answer.size`    | `number` | DNS 回答のバイトサイズ。                                             |
| `dns.flags.rcode`    | `string` | DNS の返答コード。                                                       |

### イベント

すべての属性に `evt` というプレフィックスが付きます。

| **完全名** | **型** | **説明**                                                                       |
|:--------------|:---------|:-------------------------------------------------------------------------------------|
| `evt.name`    | `string` | 同じアクティビティ (例: 認証) によって生成されたイベント間での共有名。 |
| `evt.outcome` | `string` | イベントの結果 (例: `success`、`failure`)。                                 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/facets/
[2]: /ja/integrations/apache/
[3]: /ja/integrations/amazon_cloudfront/
[4]: /ja/logs/explorer/facets/#aliased-facets
[5]: /ja/logs/explorer/facets/#alias-facets
[6]: /ja/integrations/varnish/
[7]: /ja/integrations/amazon_elb/
[8]: /ja/integrations/nginx/
[9]: /ja/integrations/haproxy/
[10]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[11]: /ja/logs/processing/processors/#url-parser
[12]: /ja/logs/processing/processors/#user-agent-parser
[13]: /ja/integrations/cassandra/
[14]: /ja/integrations/mysql/
[15]: /ja/integrations/amazon_rds/
[16]: /ja/integrations/elastic/
[17]: /ja/logs/processing/processors/#remapper
[18]: /ja/tracing/app_analytics/search/
[19]: /ja/integrations/rsyslog/
[20]: /ja/integrations/nxlog/
[21]: /ja/integrations/syslog_ng/
[22]: /ja/integrations/fluentd/
[23]: /ja/integrations/logstash/
[24]: https://en.wikipedia.org/wiki/List_of_DNS_record_types