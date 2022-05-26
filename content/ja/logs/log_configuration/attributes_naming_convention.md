---
title: 属性とエイリアス設定
kind: documentation
description: 属性と命名規則の遵守について
aliases:
  - /ja/logs/processing/attributes_naming_convention/
further_reading:
  - link: logs/log_configuration/pipelines
    tag: ドキュメント
    text: Datadog のパイプライン
  - link: logs/log_configuration/processors
    tag: ドキュメント
    text: 使用可能なプロセッサーのリスト
  - link: logs/logging_without_limits
    tag: ドキュメント
    text: 無制限のログ
  - link: logs/explorer
    tag: ドキュメント
    text: ログの調査方法
---
## 概要

さまざまなテクノロジーやアプリケーションから取得されるログを一元化すると、ログ管理環境に数十個から数百個の属性が生成されます。特に多数のチームのユーザーが同じ環境内で作業している場合は、その傾向が顕著です。

たとえば、クライアントの IP も、`clientIP`、`client_ip_address`、`remote_address`、`client.ip` など、さまざまなログ属性が存在します。リクエストの実行時間の場合は `exec_time`、`request_latency`、`request.time_elapsed` のようになります。

**属性** と **エイリアス**を使用して、ログ環境を統一します、

## 属性の種類とエイリアス設定

属性は、ログエクスプローラーでのフィルタリングと検索に使用される[ログファセット][7]と[タグ][2]を規定します。

  * [**予約済み属性**](#reserved-attributes)は自動的に取り込まれます。

  * [**標準属性**](#standard-attributes)は、組織で使用する命名規則の基盤となる存在です。[アプリ][3]に標準的な属性のデフォルトセットが用意されていますが、このリストをカスタマイズしてチームの**命名規則**を作ることがきます。

  * 標準属性で命名規則を実装した場合や、複数のログソースから一意の標準ファセットを作成する場合、[**エイリアス設定**](#aliasing)を使用します。たとえば、ハイブリッド [Apache][4] および [Amazon Cloud Front][5] インフラストラクチャーの場合、標準の `Network Client IP` ファセットと標準の `duration` を使用して、レイテンシーに最も影響を受けるクライアントを追跡できます。エイリアス設定によりチームの技術スタックを変更することなく命名規則を実装できます。

## 予約済み属性

以下は、ログとともに自動的に取り込まれる予約済みの属性の一覧です。

**注**: トレースまたはメトリクスも収集している場合は、統合サービスタグ付けを構成することをお勧めします。このコンフィギュレーションは、`env`、`service`、`version` の 3 つの標準タグを使用して、Datadog テレメトリを結び付けます。詳細については、専用の[統合サービスタグ付け][6]ドキュメントを参照してください。

| 属性 | 説明                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | メトリクスで定義された送信元ホストの名前。Datadog で一致したホストから、対応するホストタグが自動的に取得され、ログに適用されます。Agent では、この値が自動的に設定されます。                          |
| `source`  | これは、インテグレーション名 (ログの生成元) に対応します。インテグレーション名と一致する場合、対応するパーサーとファセットが自動的にインストールされます。たとえば、`nginx`、`postgresql` などです。 |
| `status`  | これは、ログのレベル/セキュリティに対応します。[パターン][7] の定義に使用され、Datadog Logs UI に専用のレイアウトがあります。                                                                                                     |
| `service` | ログイベントを生成するアプリケーションまたはサービスの名前。Logs から APM への切り替えに使用されます。このため、両方の製品を使用する際には必ず同じ値を定義してください。                                                                |
| `trace_id` | これは、トレースに使用されるトレース ID に対応します。[ログとそのトレースを関連付ける][8]ために使用されます。                                                                                                                                 |
| `message` | デフォルトでは、`message` 属性の値はログエントリの本文として収集されます。Live Tail では、この値はハイライトされて表示され、全文検索用にインデックス化されます。                                    |

## 標準属性

ログのインテグレーションは標準属性の[デフォルトセット](#デフォルトの標準属性リスト)に依存します。

リストはオーガニゼーションの管理者が作成できます。

- [ログエクスプローラー][1]から、既存の属性を標準属性に**格上げ**できます。
- 標準属性の[コンフィギュレーションページ][3]から、新しい標準属性を**作成**します。

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="標準属性"  style="width:60%;">}}

標準属性テーブルには、[定義済み標準属性セット](#default-standard-attribute-list)が付属しています。このリストに独自の属性を追加したり、既存の標準属性を編集または削除することができます。

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="標準属性を編集"  style="width:80%;">}}

標準属性は以下によって定義されます。

- `Path`: 標準属性として**格上げされる**属性のパス。JSON で定義されます (例: network.client.ip`) 。
- `Type` (`string`, `integer`, `double`, `boolean`): 属性の型。再マップリストの要素をキャストするために使用されます。
- `Aliasing list`: **エイリアス設定**対象となる属性のカンマ区切りリスト。
- `Description`: 属性のわかりやすい説明。

新しい標準属性を追加したり、既存の標準属性を編集する際は、標準属性パネルが表示されます。

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="標準属性を定義"  style="width:80%;">}}

### デフォルトの標準属性リスト

デフォルトの標準属性リストは機能領域に分かれています。

- [ネットワーク/通信](#network)
- [HTTP リクエスト](#http-requests)
- [ソースコード](#source-code)
- [データベース](#database)
- [パフォーマンス](#performance)
- [ユーザー関連の属性](#user-related-attributes)
- [Syslog およびログシッパー](#syslog-and-log-shippers)
- [DNS](#dns)

#### ネットワーク

以下は、ネットワーク通信で使用されるデータに関連する属性です。すべてのフィールドとメトリクスに `network` というプレフィックスが付きます。

| **完全名**               | **型** | **説明**                                                                          |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| `network.client.ip`        | `string` | TCP 接続を開始したクライアントの IP アドレス。                          |
| `network.destination.ip`   | `string` | クライアントが接続した先の IP アドレス。                                                  |
| `network.client.port`      | `number` | 接続を開始したクライアントのポート。                                    |
| `network.destination.port` | `number` | クライアントが接続した先の TCP ポート。                                                    |
| `network.bytes_read`       | `number` | ログの送信時にクライアントからサーバーに転送された合計バイト数。 |
| `network.bytes_written`    | `number` | ログの送信時にサーバーからクライアントに転送された合計バイト数。 |

これらの属性に依存する代表的なインテグレーションには、[Apache][4]、[Varnish][9]、[AWS ELB][10]、[Nginx][11]、[HAProxy][12] などがあります。

#### 位置情報

以下は、ネットワーク通信で使用される IP アドレスの位置情報に関連する属性です。すべてのフィールドに `network.client.geoip` または `network.destination.geoip` というプレフィックスが付きます。

| **完全名**                                | **型** | **説明**                                                                                                                      |
| :------------------------------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `network.client.geoip.country.name`         | `string` | 国の名前。                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | 国の [ISO コード][6] (米国は `US`、フランスは `FR` など)。                                                  |
| `network.client.geoip.continent.code`       | `string` | 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antartica`、`South America`、`Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など) |
| `network.client.geoip.subdivision.iso_code` | `string` | その国で最大規模の地方区分の [ISO コード][6] (米国は `CA`、フランスは `SA` など)    |
| `network.client.geoip.city.name`            | `String` | 都市名 (`Paris`、`New York` など)                                                                                   |

#### HTTP リクエスト

以下は、HTTP リクエストおよびアクセスで一般に使用されるデータに関連する属性です。すべての属性に `http` というプレフィックスが付きます。

これらの属性に依存する代表的なインテグレーションには、[Apache][4]、Rails、[AWS CloudFront][10]、Web アプリケーションサーバーなどがあります。

##### 共通属性

| **完全名**       | **型** | **説明**                                                                                           |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| `http.url`         | `string` | HTTP リクエストの URL。                                                                              |
| `http.status_code` | `number` | HTTP 応答ステータスコード。                                                                            |
| `http.method`      | `string` | リソースに対して行われるアクションを示します。                                        |
| `http.referer`     | `string` | リクエスト中のリソースにリンクした Web ページのアドレスを識別する HTTP ヘッダーフィールド。 |
| `http.request_id`  | `string` | HTTP リクエストの ID。                                                                               |
| `http.useragent`   | `string` | 送信されたままの User-Agent (未加工の形式)。[詳細については下記を参照してください](#user-agent-attributes)。          |
| `http.version`     | `string` | リクエストに使用された HTTP のバージョン。                                                                 |

##### URL 詳細属性

これらの属性は、HTTP URL のパースされた各部に関する詳細を提供します。通常は、[URL パーサー][13]によって生成されます。すべての属性に `http.url_details` というプレフィックスが付きます。

| **完全名**                   | **型** | **説明**                                                                         |
| :----------------------------- | :------- | :-------------------------------------------------------------------------------------- |
| `http.url_details.host`        | `string` | URL の HTTP ホスト部分。                                                          |
| `http.url_details.port`        | `number` | URL の HTTP ポート部分。                                                          |
| `http.url_details.path`        | `string` | URL の HTTP パス部分。                                                          |
| `http.url_details.queryString` | `object` | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。 |
| `http.url_details.scheme`      | `string` | URL のプロトコル名 (HTTP または HTTPS)                                            |

##### User-Agent 属性

これらの属性は、ユーザーエージェントの属性の意味に関する詳細を示すものです。通常は、[ユーザーエージェントパーサー][14]によって生成されます。すべての属性に `http.useragent_details` というプレフィックスが付きます。

| **完全名**                            | **型** | **説明**                                |
| :-------------------------------------- | :------- | :--------------------------------------------- |
| `http.useragent_details.os.family`      | `string` | User-Agent によって報告された OS ファミリー。      |
| `http.useragent_details.browser.family` | `string` | User-Agent によって報告されたブラウザファミリー。 |
| `http.useragent_details.device.family`  | `string` | User-Agent によって報告されたデバイスファミリー。  |

#### ソースコード

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

これらの属性に依存する代表的なインテグレーションには、_Java_、_NodeJs_、_.NET_、_Golang_、_Python_ などがあります。

#### データベース

データベース関連の属性には `db` というプレフィックスが付いています。

| **完全名**   | **型** | **説明**                                                                                                                       |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `db.instance`  | `string` | データベースインスタンス名。たとえば、Java で `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"` の場合、インスタンス名は `customers` です。       |
| `db.statement` | `string` | 指定されたデータベースタイプのデータベースステートメント。たとえば、mySQL の場合は `"SELECT * FROM wuser_table";`、Redis の場合は `"SET mykey 'WuValue'"` です。 |
| `db.operation` | `string` | 実行された処理 ("query"、"update"、"delete" など)。                                                                   |
| `db.user`      | `string` | 処理を実行するユーザー。                                                                                                     |

これらの属性に依存する代表的なインテグレーションには、[Cassandra][15]、[MySQL][16]、[RDS][17]、[Elasticsearch][18] などがあります。

#### パフォーマンス

パフォーマンスメトリクス属性。

| **完全名** | **型** | **説明**                                                                                   |
| :----------- | :------- | :------------------------------------------------------------------------------------------------ |
| `duration`   | `number` | **nanoseconds** 単位の任意の種類の時間。HTTP 応答時間、データベースクエリ時間、レイテンシーなどがあります。 |

Datadog ではこの属性を[トレース検索][20]のデフォルトの[メジャー][1]として表示および使用するため、この属性に関するログ内で処理時間を[再マップ][19]することを推奨しています。

#### ユーザー関連の属性

すべての属性とメジャーに `usr` というプレフィックスが付きます。

| **完全名** | **型** | **説明**         |
| :----------- | :------- | :---------------------- |
| `usr.id`     | `string` | ユーザーの識別子。    |
| `usr.name`   | `string` | わかりやすいユーザー名。 |
| `usr.email`  | `string` | ユーザーの電子メール。         |

#### Syslog とログシッパー

以下は、syslog またはログシッパーエージェントによって追加されるデータに関連する属性です。すべてのフィールドとメトリクスに `syslog` というプレフィックスが付きます。

| **完全名**       | **型** | **説明**                                                               |
| :----------------- | :------- | :---------------------------------------------------------------------------- |
| `syslog.hostname`  | `string` | ホスト名。                                                                  |
| `syslog.appname`   | `string` | アプリケーション名。通常は、予約済み属性 `service` に再マップされます。 |
| `syslog.severity`  | `number` | ログの重大度。通常は、予約済み属性 `status` に再マップされます。      |
| `syslog.timestamp` | `string` | ログのタイムスタンプ。通常は、予約済み属性 `date` に再マップされます。       |
| `syslog.env`       | `string` | ログのソースが由来する環境名。                      |

これらに依存するインテグレーションには、[Rsyslog][21]、[NxLog][22]、[Syslog-ng][23]、[Fluentd][24]、[Logstash][25] があります。

#### DNS

すべての属性とメジャーに `dns` というプレフィックスが付きます。

| **完全名**         | **型** | **説明**                                                           |
| :------------------- | :------- | :------------------------------------------------------------------------ |
| `dns.id`             | `string` | DNS のクエリ識別子。                                                 |
| `dns.question.name`  | `string` | クエリ対象のドメイン名。                                                  |
| `dns.question.type`  | `string` | DNS の質問の種類を指定する [2 オクテットのコード][26]。             |
| `dns.question.class` | `string` | DNS の質問で検索されるクラス (インターネットを使用する場合は IP など) 。 |
| `dns.question.size`  | `number` | DNS 質問のバイトサイズ。                                           |
| `dns.answer.name`    | `string` | DNS で回答する際の IP アドレス。                                 |
| `dns.answer.type`    | `string` | DNS の回答の種類を指定する [2 オクテットのコード][26]。               |
| `dns.answer.class`   | `string` | DNS によって回答されるクラス。                                            |
| `dns.answer.size`    | `number` | DNS 回答のバイトサイズ。                                             |
| `dns.flags.rcode`    | `string` | DNS の返答コード。                                                       |

#### イベント

すべての属性に `evt` というプレフィックスが付きます。

| **完全名** | **型** | **説明**                                                                       |
|:--------------|:---------|:-------------------------------------------------------------------------------------|
| `evt.name`    | `string` | 同じアクティビティ (例: 認証) によって生成されたイベント間での共有名。 |
| `evt.outcome` | `string` | イベントの結果 (例: `success`、`failure`)。                                 |

## エイリアス設定

宛先属性にマップされるソース属性のエイリアスを作成することで、ログにソースと宛先の両方の属性が含まれるようにできます。

ユーザーはエイリアス設定された (ソース) または標準 (宛先) ファセット属性のいずれかを利用することができますが、[推奨される][27]のは、エイリアス設定されたファセットではなく標準ファセットです。これにより命名規則に従う必要性が強調され、非標準のコンテンツに基づくアセットの構築 (保存済みのビューやダッシュボードなど) を回避することができます。

**エイリアス設定に関する確認事項**:

- エイリアス設定はパイプラインによってログが処理された後に実行されます。抽出済みまたは処理済みの属性は、エイリアス設定時のソースとして利用可能です。
- Datadog ではエイリアス設定済みの属性の型が適用されます。これが不可能な場合、エイリアス設定はスキップされます。
- ログに既に宛先属性が含まれている場合、エイリアス設定によりその値が上書きされます。
- ひとつの標準属性で複数の属性をエイリアス化する場合、ログにこれらのソース属性が複数含まれているケースでは、そのうち 1 つのソース属性のみエイリアス設定が可能です。
- 更新または追加された標準属性データは、新しく収集されるログにのみ適用されます。
- 標準属性をエイリアス化することはできません。
- 属性は標準属性に対してのみエイリアス設定が可能です。
- ログの JSON 構造を尊重するため、ある標準属性を別の標準属性の子とすることはできません (`user` と `user.name` の両方を標準属性にすることは不可) 。

詳細は、[関連ドキュメント][28]を参照してください。 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/facets/
[2]: /ja/logs/search_syntax/#tags
[3]: https://app.datadoghq.com/logs/pipelines/standard-attributes
[4]: /ja/integrations/apache/
[5]: /ja/integrations/amazon_cloudfront/
[6]: /ja/getting_started/tagging/unified_service_tagging/
[7]: /ja/logs/explorer/patterns/
[8]: /ja/tracing/connect_logs_and_traces/
[9]: /ja/integrations/varnish/
[10]: /ja/integrations/amazon_elb/
[11]: /ja/integrations/nginx/
[12]: /ja/integrations/haproxy/
[13]: /ja/logs/log_configuration/processors/#url-parser
[14]: /ja/logs/log_configuration/processors/#user-agent-parser
[15]: /ja/integrations/cassandra/
[16]: /ja/integrations/mysql/
[17]: /ja/integrations/amazon_rds/
[18]: /ja/integrations/elastic/
[19]: /ja/logs/log_configuration/processors/#remapper
[20]: /ja/tracing/app_analytics/search/
[21]: /ja/integrations/rsyslog/
[22]: /ja/integrations/nxlog/
[23]: /ja/integrations/syslog_ng/
[24]: /ja/integrations/fluentd/
[25]: /ja/integrations/logstash/
[26]: https://en.wikipedia.org/wiki/List_of_DNS_record_types
[27]: /ja/logs/explorer/facets/#aliased-facets
[28]: /ja/logs/explorer/facets/#alias-facets