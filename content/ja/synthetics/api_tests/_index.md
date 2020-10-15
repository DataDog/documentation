---
title: API テスト
kind: documentation
description: 特定の場所から HTTP リクエストをシミュレートして監視します
aliases:
  - /ja/synthetics/uptime_check
  - /ja/synthetics/api_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /synthetics/
    tag: Documentation
    text: チェックの管理
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: ブラウザーテストの設定
---
## 概要

API テストを行うと、API エンドポイントを監視して失敗や遅延が発生している場合にアラートを受け取ることができます。このテストにより、アプリケーションがリクエストに応答していることや、応答時間、HTTP ステータスコード、ヘッダー、本文の内容など、定義条件をすべて満たしていることを検証できます。Datadog API の完全なリストについては、[Datadog API][1]を参照してください。

## コンフィグレーション

API テストのコンフィギュレーションは、作成する API テストのタイプにより異なります: [HTTP テスト](?tab=httptest)、[SSL テスト](?tab=ssltest)、[TCP テスト](?tab=tcptest)、または [DNS テスト](?tab=dnstest)

### リクエストを作成する

Datadog によって実行される `HTTP`、`SSL`、`TCP`、または `DNS` のリクエストを定義します。

{{< tabs >}}

{{% tab "HTTP Test" %}}

{{< img src="synthetics/api_tests/make-http-request.png" alt="HTTP リクエストの定義"  style="width:80%;" >}}

Datadog によって実行されるリクエストを定義します。

1. **Choose a request type**: `HTTP`
2. <mrk mid="31" mtype="seg"/><mrk mid="32" mtype="seg"/><mrk mid="33" mtype="seg"/>
3. **Advanced Options** (オプション) をテストに追加します。
  * Follow redirects: トグルボタンで、監視しているエンドポイントが最大 10 個のリダイレクトをフォローするよう設定します。
  * Allow insecure server certificates: トグルボタンで、証明書の検証中にエラーが発生しても、HTTP の接続テストを続行するよう設定できます。
  * Client certificate: クライアント証明書と関連する秘密キーをアップロードして、mTLS を介して認証します。
  * Request headers: 定義されたヘッダーは、デフォルトのブラウザヘッダーをオーバーライドします。たとえば、ヘッダーに User Agent を設定して、[Datadog スクリプトを識別][1]します。
  * Cookies: 定義したクッキーをデフォルトのブラウザクッキーに追加します。複数のクッキーを設定するには、次の書式を使用します `<クッキー名1>=<クッキーの値1>; <クッキー名2>=<クッキーの値2>`。
  * HTTP Basic Auth: ユーザー名とパスワードを使用した HTTP 基本認証。
  * Request body: リクエストの本文と本文のタイプ (`text/plain`、`application/json`、`text/xml`、`text/html` または `None`)。**注**: リクエスト本文の最大サイズは 50 キロバイトに制限されています。
  * Proxy URL: HTTP リクエストが通過する必要があるプロキシの URL (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。
  * Proxy Header: プロキシへの HTTP リクエストに含めるヘッダー。

4. <mrk mid="68" mtype="seg"/><mrk mid="69" mtype="seg"/>
5. **Select your tags**: タグはブラウザテストに紐付いています。`<KEY>:<VALUE>` フォーマットを使用して `<VALUE>` に [Synthetic モニタリングページ][2]上の任意の `<KEY>` でフィルターを適用します。
6. **Locations**: Datadog 管理下のロケーションからテストを実行します。世界中どこからでも使用できる AWS ロケーションが多数用意されています。完全なリストは  [Datadog API][3] から入手できます。また、[プライベートロケーション][4]をセットアップして、公共インターネットからアクセスできない非公開のエンドポイントで Synthetic API テストを実行することもできます。
7. <mrk mid="57" mtype="seg"/><mrk mid="58" mtype="seg"/>
8. <mrk mid="59" mtype="seg"/><mrk mid="60" mtype="seg"/>

[1]: /ja/synthetics/identify_synthetics_bots/
[2]: /ja/synthetics/
[3]: /ja/api/#get-available-locations
[4]: /ja/synthetics/private_locations/
{{% /tab %}}

{{% tab "SSL Test" %}}

{{< img src="synthetics/api_tests/make-ssl-request.png" alt="SSL リクエストの定義"  style="width:80%;" >}}

1. **Choose a request type**: `SSL`
2. <mrk mid="66" mtype="seg"/><mrk mid="67" mtype="seg"/>
3. **Advanced Options** (オプション) をテストに追加します。
  * Accept self-signed certificates: 自己署名証明書に関連するエラーをバイパスします。
  * Client certificate: クライアント証明書と関連する秘密キーをアップロードして、mTLS を介して認証します。

4. **Name**: SSL テストの名前。
5. **Select your tags**: タグは SSL テストに紐付いています。`<KEY>:<VALUE>` フォーマットを使用して `<VALUE>` に [Synthetic モニタリングページ][1]上の任意の `<KEY>` でフィルターを適用します。
6. **Locations**: Datadog 管理下のロケーションからテストを実行します。世界中どこからでも使用できる AWS ロケーションが多数用意されています。完全なリストは  [Datadog API][2] から入手できます。また、[プライベートロケーション][3]をセットアップして、公共インターネットからアクセスできない非公開のホストで Synthetic SSL テストを実行することもできます。
7. <mrk mid="57" mtype="seg"/><mrk mid="58" mtype="seg"/>
8. <mrk mid="79" mtype="seg"/><mrk mid="80" mtype="seg"/>

[1]: /ja/synthetics/
[2]: /ja/api/#get-available-locations
[3]: /ja/synthetics/private_locations/
{{% /tab %}}

{{% tab "TCP Test" %}}

{{< img src="synthetics/api_tests/tcp_test.png" alt="TCP リクエストの定義"  style="width:80%;" >}}

1. **Choose a request type**: `TCP`
2. `Host` および TCP `Port` を指定します。
3. **Name**: TCP テストの名前。
4. **Select your tags**: タグは TCP テストに紐付いています。`<KEY>:<VALUE>` フォーマットを使用して `<VALUE>` に [Synthetic モニタリングページ][1]上の任意の `<KEY>` でフィルターを適用します。
5. **Locations**: Datadog 管理下のロケーションからテストを実行します。世界中どこからでも使用できる AWS ロケーションが多数用意されています。完全なリストは  [Datadog API][2] から入手できます。また、[プライベートロケーション][3]をセットアップして、公共インターネットからアクセスできない非公開のホストまたはポートで Synthetic TCP テストを実行することもできます。
6. <mrk mid="57" mtype="seg"/><mrk mid="58" mtype="seg"/>
7. **Test URL** をクリックし、リクエストのコンフィギュレーションをテストします。応答データのプレビューが右側に表示されます。

[1]: /ja/synthetics/
[2]: /ja/api/#get-available-locations
[3]: /ja/synthetics/private_locations/
{{% /tab %}}

{{% tab "DNS Test" %}}

{{< img src="synthetics/api_tests/dns_test.png" alt="DNS リクエストの定義"  style="width:80%;" >}}

1. **Choose a request type**: `DNS`
2. 使用する `Domain` とオプションの `DNS Server` を指定します。
3. **Name**: DNS テストの名前。
4. **Select your tags**: タグは DNS テストに紐付いています。`<KEY>:<VALUE>` フォーマットを使用して `<VALUE>` に [Synthetic モニタリングページ][1]上の任意の `<KEY>` でフィルターを適用します。
5. **Locations**: Datadog 管理下のロケーションからテストを実行します。世界中どこからでも使用できる AWS ロケーションが多数用意されています。完全なリストは  [Datadog API][2] から入手できます。また、[プライベートロケーション][3]をセットアップして、公共インターネットから解決できない非公開のドメインで Synthetic DNS テストを実行することもできます。
6. <mrk mid="57" mtype="seg"/><mrk mid="58" mtype="seg"/>
7. **Test URL** をクリックし、リクエストのコンフィギュレーションをテストします。応答データのプレビューが右側に表示されます。

[1]: /ja/synthetics/
[2]: /ja/api/#get-available-locations
[3]: /ja/synthetics/private_locations/
{{% /tab %}}

{{< /tabs >}}

### アサーション

API テストの実行中は、少なくとも 1 つのアサーションを定義して Datadog で監視する必要があります。アサーションは、パラメーター、任意のプロパティ、コンパレーター、ターゲット値により定義します。

{{< tabs >}}

{{% tab "HTTP Test" %}}

| タイプ          | 演算子                                                                                               | 値の型                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 本文          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][1] | _文字列_ <br> _[Regex][2]_ <br> _文字列_、_[Regex][2]_ |
| ヘッダー        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`                       | _文字列_ <br> _[Regex][2]_                                      |
| response time | `is less than`                                                                                         | 整数 (ms)                                                  |
| ステータスコード   | `is`、`is not`                                                                                         | 整数                                                      |

**注**: HTTP テストでは、`br`、`deflate`、`gzip`、`identity` の `content-encoding` ヘッダーを使用して本文の圧縮を解除することが可能です。

**注**: **Test URL** をクリックすると、基本のアサーションが自動的に入力されます。

- `response time` _is less than_ 1000 ms
- `status code` _is_ "戻り値"
- `header` `content-type` _is_ "戻り値"

[1]: https://restfulapi.net/json-jsonpath/
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{% tab "SSL Test" %}}

| タイプ          | 演算子                                                                               | 値の型                 |
|---------------|----------------------------------------------------------------------------------------|----------------------------|
| 証明書   | `expires in more than`、`expires in less than`                                         | _整数 (日数)_ |
| プロパティ      | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`       | 文字列 <br> [Regex][1] |
| response time | `is less than`                                                                         | 整数 (ms)             |
| TLS バージョン   | `is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _Decimal_                  |

**テスト URL** をクリックすると、基本アサーションが自動的に入力されます。

- `certificate` _expires in more than_ 10 days
- `response time` _is less than_ 1000 ms.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{% tab "TCP Test" %}}

| タイプ          | 演算子                                                                | 値の型     |
|---------------|-------------------------------------------------------------------------|----------------|
| response time | `is less than`                                                          | 整数 (ms) |

**テスト URL** をクリックすると、基本アサーションが自動的に入力されます。

- `response time` _is less than_ 1000 ms.

{{% /tab %}}

{{% tab "DNS Test" %}}

| タイプ                | レコードタイプ             | 演算子                                           | 値の型                 |
|---------------------|-------------------------|----------------------------------------------------|----------------------------|
| response time       |                         | `is less than`                                     | 整数 (ms)             |
| すべてのレコード        | of type A、of type AAAA | `is`、`contains`、<br> `matches`、`does not match` | 文字列 <br> [Regex][1] |
| at least one record | of type A、of type AAAA | `is`、`contains`、<br> `matches`、`does not match` | 文字列 <br> [Regex][1] |

**注**: **Test URL** をクリックすると、基本のアサーションが自動的に入力されます。

- `response time` _is less than_ 1000 ms
- `at least one record` `of type A` _is_ "戻り値" (戻ったとき)
- `at least one record` `of type AAAA` _is_ "戻り値" (戻ったとき)

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{< /tabs >}}

**Add new assertion** をクリック、またはレスポンスプレビューを直接クリックすることで、各 API テストにつき最大 10 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_setup.mp4" alt="アサーションのセットアップ" video="true"  width="80%" >}}


### アラートの条件

アラート条件で、テストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、アラートは次の状態でトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、**かつ**
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

<mrk mid="89" mtype="seg"/><mrk mid="90" mtype="seg"/><mrk mid="91" mtype="seg"/>

#### Fast Retry

ロケーションを*失敗*と判断するまでに必要な再試行回数を決定できます。デフォルトでは、既定のロケーションから失敗結果が得られると、Synthetic テストの再試行は行われなくなります。

### グローバル変数を使用する

[`Settings` で定義したグローバル変数][2]は、URL、高度なオプション、API テストのアサーションで使用できます。変数の一覧を表示するには、フィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/usingvariablesapi.mp4" alt="API テストで変数を使用する" video="true"  width="80%" >}}

### チームへの通知

<mrk mid="151" mtype="seg"/><mrk mid="152" mtype="seg"/>

1. 通知を受け取るユーザーおよび/または[サービス][3]を選択します。**注**: [`@-notifications`][4] は、モニターと同様に、**メッセージ**フィールドで使用できます。
2. API テストの**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][5]のほか、以下の[条件付き変数][6]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | モニターがアラートする場合に表示                                            |
    | `{{^is_alert}}`            | モニターがアラートしない場合に表示                                          |
    | `{{#is_recovery}}`         | モニターがいずれかの ALERT から回復する場合に表示   |
    | `{{^is_recovery}}`         | モニターがいずれかの ALERT から回復しない場合に表示 |

    通知メッセージには、このセクションで定義された**メッセージ**や、失敗したアサーションとその理由に関する情報が記載されます。
3. 再通知の頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。
4. **保存**をクリックします。

以下に通知の例を示します。

{{< img src="synthetics/api_tests/notifications-example.png" alt="API テスト通知"  style="width:80%;" >}}

## ネットワークに関する時間

Synthetic テストの詳細ページには、ネットワークに関する以下の時間が表示されます。

| 時間                      | 説明                                                                                           |
|-----------------------------|-------------------------------------------------------------------------------------------------------|
| `DNS`                       | 最後のリクエストの DNS 名が解決されるまでにかかった時間。                                                |
| `接続`                   | サーバーへの接続が確立されるまでにかかった時間。                                                   |
| `SSL`                       | <mrk mid="167" mtype="seg">TLS ハンドシェイクにかかった時間。</mrk><mrk mid="168" mtype="seg">最後のリクエストが HTTPS 経由ではなかった場合、このメトリクスは表示されません。</mrk> |
| `TTFB (time to first byte)` | 応答の最初のバイトを受信するまでにかかった時間。                                     |
| `ダウンロード`                  | 応答のダウンロードにかかった時間。                                                                  |

応答時間は、これらのネットワーク時間の合計です。

## テストの失敗

<mrk mid="131" mtype="seg">テストが`失敗`と見なされるのは、アサーションを満たさなかった場合、またはリクエストが他の理由で失敗した場合です。</mrk><mrk mid="132" mtype="seg">以下に、失敗の理由を示します。</mrk>

| エラー             | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。                                                                                                                                                                                                                                                         |
| DNS               | <mrk mid="139" mtype="seg">チェック URL に対応する DNS エントリが見つかりませんでした。</mrk><mrk mid="140" mtype="seg">チェック URL の構成の誤り、DNS エントリの構成の誤りなどの原因が考えられます。</mrk>                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | チェックのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。                                                                                                                                                                                                                                                                                                                                                                                     |
| `SSL`             | SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][7]。                                                                                                                                                                                                                                                                                                                                                      |
| `TIMEOUT`         | リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。`TIMEOUT: The request couldn’t be completed in a reasonable time.`  は、タイムアウトが TCP ソケットの接続レベルで発生したことを示します。`TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` は、タイムアウトがリクエストの実行全体 (TCP ソケット接続、データ転送、アサーション) で発生したことを示します。 |

テストが失敗した場合、アップタイムはエンドポイントが `down` であるとみなします。次のテストランまで再テストされません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/#get-available-locations
[2]: /ja/synthetics/settings/#global-variables
[3]: /ja/integrations/#cat-notification
[4]: /ja/monitors/notifications/#notification
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: /ja/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /ja/synthetics/api_tests/errors/#ssl-errors