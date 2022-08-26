---
further_reading:
- link: logs/log_configuration/attributes_naming_convention
  tag: ドキュメント
  text: ログ管理の標準属性の詳細はこちら
- link: /real_user_monitoring/browser/data_collected
  tag: ドキュメント
  text: RUM ブラウザ用に収集したデータ
- link: /tracing/trace_explorer/query_syntax/
  tag: ドキュメント
  text: トレースの調査方法
kind: documentation
title: スパンタグのセマンティクス
---

## 概要
[Datadog トレーシングライブラリ][1]は、様々なライブラリのインスツルメンテーションをすぐに利用できるようサポートしています。
これらのインスツルメンテーションは、分散システムにおける作業の論理的な単位を表すスパンを生成します。
各スパンは[スパンタグ][2]で構成され、システムで発生している作業単位に関する追加情報を提供します。命名規則では、スパンイベントで使用できる名前と内容を記述しています。

## スパンタグの命名規則
### コア
以下のスパンタグは、使用するインスツルメンテーションと実行する操作の種類を記述するための核となる概念です。

| **名前**    | **型** | **説明**                                                                                                                                                                                                                                                                   |
|-------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `language`  | `string` | スパンを生成するために使用されるクライアント SDK の言語。`cpp`、`dotnet`、`go`、`jvm`、`javascript`、`php`、`python`、`ruby` のいずれかになります。                                                                                                                                                                                                                                 |
| `env`       | `string` | 実行中のプロセスの `DD_ENV` 環境変数、またはユーザー定義の `env` の値。                                                                                                                                                                                            |
| `version`   | `string` | 実行中のプロセスの `DD_VERSION` 環境変数、またはユーザー定義の `version` の値。                                                                                                                                                                                      |
| `span.kind` | `string` | スパンが扱う作業単位の種類を表す文字列。`server`、`client`、`producer`、`consumer`、`internal` のいずれかとなります。<br>詳細は [OpenTelemetry SpanKind ドキュメント][3]を参照してください。 |
| `component` | `string` | スパンを作成したライブラリ/インテグレーションの名前。                                                                                                                                                                                                                        |

### ネットワーク通信
ネットワーク通信に対応する作業単位を記述するために、以下のスパンタグを使用することができます。

| **名前**                    | **型** | **説明**                                                           |
|---------------------------------|----------|---------------------------------------------------------------------------|
| `network.client.ip`             | `string` | インバウンド接続を開始したクライアントの IP アドレス。        |
| `network.destination.ip`        | `string` | アウトバウンド接続が行われる IP アドレス。             |
| `network.host.ip`               | `string` | ローカルホストの IP アドレス。                                                     |
| `network.client.port`           | `number` | 接続を開始したクライアントのポート。                      |
| `network.destination.port`      | `number` | アウトバウンド接続のリモートポート番号。                             |
| `network.client.name`           | `string` | インバウンド接続を開始したクライアントのホスト名。          |
| `network.destination.name`      | `string` | アウトバウンド接続が行われるリモートホスト名またはそれに類するもの。 |
| `network.host.name`             | `string` | ローカルホスト名。                                                            |
| `network.client.transport`      | `string` | インバウンド接続に使用されるトランスポートプロトコル。                    |
| `network.destination.transport` | `string` | アウトバウンド接続に使用されるトランスポートプロトコル。                   |

### HTTP リクエスト
HTTP クライアントとサーバーのスパンを記述するために、以下のスパンタグを使用することができます。

| **名前**                                | **説明**                                                                                                                                                                                                              |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `http.status_code`                          | タイプ: `string` <br> HTTP 応答ステータスコード。                                                                                                                                                                                                |
| `http.url`                                  | タイプ: `string` <br>  難読化されたクエリ文字列を含む、HTTP リクエストの URL。難読化の詳細については、[データセキュリティの構成][4]を参照してください。                                                         |
| `http.version`                              | タイプ: `string` <br>  リクエストに使用された HTTP のバージョン。                                                                                                                                                                                     |
| `http.method`                               | タイプ: `string` <br>  接続を開始したクライアントのポート。                                                                                                                                                                         |
| `http.route`                                | タイプ: `string` <br>  一致したルート (パステンプレート)。<br>例: `/users/:userID`                                                                                                                                                              |
| `http.client_ip`                            | タイプ: `string` <br> すべてのプロキシの背後にある元のクライアントの IP アドレス (既知の場合)。`X-Forwarded-For` のようなヘッダーから発見される。                                                                                                        |
| `http.useragent`                            | タイプ: `string` <br>  リクエストとともに受け取ったユーザーエージェントヘッダー。                                                                                                                                                                              |
| `http.request.content_length`               | タイプ: `number` <br>  リクエストペイロード本文のサイズ (バイト単位)。                                                                                                                                                                                |
| `http.response.content_length`              | タイプ: `number` <br> リクエストペイロード本文のサイズ (バイト単位)。                                                                                                                                                                                |
| `http.request.content_length_uncompressed`  | タイプ: `number` <br> トランスポートデコード後の圧縮されていないリクエストペイロード本文のサイズ。                                                                                                                                                   |
| `http.response.content_length_uncompressed` | タイプ: `number` <br> トランスポートデコード後の圧縮されていないレスポンスペイロード本文のサイズ。                                                                                                                                                  |
| `http.request.headers.*`                    | タイプ: `string` <br> リクエストの HTTP ヘッダー。デフォルトでは何も収集されませんが、オプションで `DD_TRACE_HEADER_TAGS` を使って構成することができます。<br>ヘッダーの収集方法については、該当する[ライブラリの構成][5]を参照してください。  |
| `http.response.headers.*`                   | タイプ: `string` <br> レスポンスの HTTP ヘッダー。デフォルトでは何も収集されませんが、オプションで `DD_TRACE_HEADER_TAGS` を使って構成することができます。<br>ヘッダーの収集方法については、該当する[ライブラリの構成][5]を参照してください。 |

### データベース
データベースのスパンを記述するために、以下のスパンタグを使用することができます。

| **名前**           | **型** | **説明**                                                                                              |
|------------------------|----------|--------------------------------------------------------------------------------------------------------------|
| `db.system`            | `string` | データベース管理システム (使用している DBMS 製品) を表す識別子。                                       |
| `db.connection_string` | `string` | データベースへの接続に使用する接続文字列。                                                        |
| `db.user`              | `string` | データベースにアクセスしたユーザー名                                                                          |
| `db.instance`          | `string` | 接続中のデータベースの名前。                                                                  |
| `db.statement`         | `string` | 実行中のデータベースステートメント。                                                                        |
| `db.operation`         | `string` | 実行中の操作の名前。 <br>例: `SELECT`、`findAndModify`、`HMSET`                     |
| `db.sql.table`         | `number` | データベース名 (該当する場合) を含む、操作の対象となる主テーブルの名前。 |
| `db.row_count`         | `number` | クエリまたは操作の行数/結果数。                                                      |

特定のデータベース技術に関する追加の属性は、接頭辞 `db.<db.system>` を使用します。

### メッセージキュー
メッセージングシステムに対応するスパンを記述するために、以下のスパンタグを使用することができます。

| **名前**                     | **型** | **説明**                                                                                                                                                                                                                  |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | メッセージングシステムの識別子。                                                                                                                                                                                               |
| `messaging.destination`          | `string` | メッセージの宛先名。                                                                                                                                                                                                     |
| `messaging.destination_kind`     | `string` | メッセージの宛先の種類。                                                                                                                                                                                                  |
| `messaging.protocol`             | `string` | トランスポートプロトコルの名前。                                                                                                                                                                                               |
| `messaging.protocol_version`     | `string` | トランスポートプロトコルのバージョン。                                                                                                                                                                                            |
| `messaging.url`                  | `string` | メッセージングシステムへの接続文字列。                                                                                                                                                                                    |
| `messaging.message_id`           | `string` | データベース名 (該当する場合) を含む、操作の対象となる主テーブルの名前。                                                                                                                     |
| `messaging.conversation_id`      | `string` | クエリまたは操作の行数/結果数。                                                                                                                                                                          |
| `messaging.message_payload_size` | `number` | 圧縮されていないメッセージペイロードのサイズ (バイト数)。                                                                                                                                                                            |
| `messaging.operation`            | `string` | 消費メッセージの種類を示す文字列。 <br>例: `send` (プロデューサーに送るメッセージ)、`receive` (コンシューマーが受け取るメッセージ)、または `process` (以前に受け取ったメッセージをコンシューマーが処理する)。 |
| `messaging.consumer_id`          | `string` | メッセージを受信するコンシューマーの識別子。                                                                                                                                                                              |

特定のデータベース技術に関する追加の属性は、接頭辞 `messaging.<messaging.system>` を使用します。

### リモートプロシージャコール
RMI や gRPC などのリモートプロシージャコールに対応するスパンを記述するために、以下のスパンタグを使用することができます。

| **名前**  | **型** | **説明**                      |
|---------------|----------|--------------------------------------|
| `rpc.system`  | `string` | リモートシステムの識別子。    |
| `rpc.service` | `string` | 呼び出されるサービスの名前。 |
| `rpc.method`  | `string` | 呼び出されるメソッドの名前。  |

### エラー
スパンに関連するエラーを記述するために、以下のスパンタグを使用することができます。

| **名前**    | **型** | **説明**                                                  |
|-----------------|----------|------------------------------------------------------------------|
| `error.message` | `string` | エラーのタイプまたは種類 (場合によってはコード)。                  |
| `error.type`    | `string` | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | `string` | スタックトレースまたはエラーに関する補足情報。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup_overview/
[2]: /ja/tracing/visualization/#span-tags
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /ja/tracing/setup_overview/configure_data_security/
[5]: /ja/tracing/trace_collection/library_config/