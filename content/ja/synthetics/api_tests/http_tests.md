---
title: HTTP テスト
kind: documentation
description: HTTP リクエストをシミュレートして、パブリックおよび内部 API エンドポイントを監視します
aliases:
  - /ja/synthetics/http_test
  - /ja/synthetics/http_check
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: HTTP テストの概要
  - link: /synthetics/private_locations
    tag: Documentation
    text: 内部エンドポイントで HTTP テストを実行する
---
## 概要

HTTP テストを使用すると、**アプリケーションの API エンドポイントに HTTP リクエストを送信**して、リクエストに応答していること、および全体的な応答時間、ステータスコード、ヘッダーまたは本文のコンテンツなどの定義した条件を満たしていることを確認できます。

HTTP テストは、ネットワークの外部または内部のどちらからエンドポイントを監視するかによって、[**管理ロケーション**][1]および[**プライベートロケーション**][2]から実行できます。HTTP テストは、**スケジュール**、**オンデマンド**、または **[CI/CD パイプライン][3]**内で直接実行できます。

## コンフィギュレーション

作成するテストのタイプ ([`HTTP`][4]、[`SSL`][5]、[`TCP`][6]、または [`DNS` テスト][7]) を選択した後、テストのリクエストを定義できます。

### リクエストを定義する

{{< img src="synthetics/api_tests/http_test_config.png" alt="HTTP リクエストを定義する" style="width:90%;" >}}

1. **HTTP Method** を選択し、クエリする **URL** を指定します。使用可能なメソッドは、`GET`、`POST`、`PATCH`、`PUT`、`HEAD`、`DELETE`、`OPTIONS` です。`http` と `https` の両方の URL がサポートされています。
2. **Advanced Options** を使用して HTTP リクエストを加工します (オプション)。

  {{< tabs >}}

  {{% tab "リクエストオプション" %}}

  * **Follow redirects**: 選択すると、リクエストを実行するときに HTTP テストで最大 10 個のリダイレクトをフォローします。
  * **Request headers**: HTTP リクエストに追加するヘッダーを定義します。デフォルトのヘッダー (たとえば、`user-agent` ヘッダー) をオーバーライドすることもできます。
  * **Cookies**: HTTP リクエストに追加するクッキーを定義します。`<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` の形式を使用して複数のクッキーを設定します。
  * **HTTP Basic Auth**: HTTP 基本認証資格情報を追加します。

  {{% /tab %}}

  {{% tab "リクエスト本文" %}}

  * **Body type**: HTTP リクエストに追加するリクエスト本文のタイプ (`text/plain`、`application/json`、`text/xml`、`text/html`、または `None`) を選択します。
  * **Request body**: HTTP リクエスト本文のコンテンツを追加します。**注**: リクエスト本文は最大サイズ 50 キロバイトに制限されています。

  {{% /tab %}}

  {{% tab "証明書" %}}

  * **Ignore server certificate error**: 選択すると、SSL 証明書の検証時にエラーが発生した場合でも、HTTP テストが接続を続行します。
  * **Client certificate**: クライアント証明書と関連する秘密キーをアップロードして、mTLS を介して認証します。

  {{% /tab %}}

  {{% tab "プロキシ" %}}

  * **Proxy URL**: HTTP リクエストが通過する必要があるプロキシの URL (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`) を指定します。
  * **Proxy Header**: プロキシへの HTTP リクエストに含めるヘッダーを追加します。

  {{% /tab %}}

  {{< /tabs >}}

3. HTTP テストに**名前**を付けます。
4. HTTP テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][8]で Synthetic テストをすばやくフィルタリングできます。
6. HTTP テストを実行する**ロケーション**を選択します。HTTP テストは、ネットワークの外部または内部のどちらからエンドポイントを監視するかによって、[管理ロケーション][1]と[プライベートロケーション][2]から実行できます。

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。画面の右側に応答プレビューが表示されます。

### テストの頻度を指定する

HTTP テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog で HTTP テストを実行する頻度を選択します。

{{< img src="synthetics/api_tests/schedule.png" alt="スケジュールどおりに API テストを実行する"  style="width:90%;" >}}

* [**Within your CI/CD pipelines**][3]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。`Test URL` を押すと、`response time`、`status code`、`header`、`content-type` の基本的なアサーションが、取得された応答に基づいて追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ          | 演算子                                                                                               | 値の型                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 本文          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][9] | _String_ <br> _[Regex][10]_ <br> _String_、_[Regex][10]_ |
| ヘッダー        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`                       | _String_ <br> _[Regex][10]                                      |
| response time | `is less than`                                                                                         | 整数 (ms)                                                  |
| ステータスコード   | `is`、`is not`                                                                                         | 整数                                                      |

**注**: HTTP テストでは、`br`、`deflate`、`gzip`、`identity` の `content-encoding` ヘッダーを使用して本文の圧縮を解除することが可能です。

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 10 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions.png" alt="HTTP テストのアサーションを定義する" style="width:90%;" >}}

### アラート条件を定義する

アラート条件で、テストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

#### Fast Retry

テスト結果が失敗した場合、テストによって再試行をトリガーすることができます。デフォルトでは、再試行は最初に失敗したテスト結果の 300 ミリ秒後に実行されます。この間隔は [API][11] を介して構成できます。

ロケーションのアップタイムは、評価ごとに計算されます (評価前の最後のテスト結果がアップかダウンか)。合計アップタイムは、構成されたアラート条件に基づいて計算されます。送信される通知は、合計アップタイムに基づきます。

### チームへの通知

以前に定義された[アラート条件](#define-alert-conditions)に基づいて、テストによって通知が送信されます。このセクションを使用して、チームに送信するメッセージの方法と内容を定義します。

1. [モニターと同様][12]、メッセージに `@notification` を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

2. テストの通知**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][13]のほか、以下の[条件付き変数][14]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            |モニターがアラートする場合に表示します。                                          |
    | `{{^is_alert}}`            |テストが警告しない限り表示します。                                        |
    | `{{#is_recovery}}`         |テストがアラートから回復したときに表示します。                             |
    | `{{^is_recovery}}`         |テストがアラートから回復しない限り表示します。                           |

3. テストが失敗した場合に、テストで**通知メッセージを再送信する**頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。

メール通知には、このセクションで定義されているメッセージと、失敗したアサーションの要約が含まれます。
通知の例:

{{< img src="synthetics/api_tests/notifications-example.png" alt="API テスト通知"  style="width:90%;" >}}

**Save** をクリックしてテストを保存し、Datadog にテストの実行を開始させます。

## 変数

### ローカル変数を作成する

以下の利用可能な組み込みの 1 つから値を定義してローカル変数を作成できます。

| パターン                    | 説明                                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `{{ numeric(n) }}`         | `n` 桁の数字列を生成します。                                                                 |
| `{{ alphabetic(n) }}`      | `n` 文字のアルファベット文字列を生成します。                                                            |
| `{{ alphanumeric(n) }}`    | `n` 文字の英数字文字列を生成します。                                                       |
| `{{ date(n, format) }}`    | テストが開始された日付 + `n` 日の値を使用して、許容される形式のいずれかで日付を生成します。        |
| `{{ timestamp(n, unit) }}` | テストが +/- `n` 選択単位で開始されたタイムスタンプの値を使用して、許容される単位のいずれかでタイムスタンプを生成します。 |

### 変数を使用する

HTTP テストの URL、高度なオプション、アサーションで、[`Settings` で定義されたグローバル変数][15]と[ローカルで定義された変数](#create-local-variables)を使用できます。
変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/use_variable.mp4" alt="API テストでの変数の使用" video="true" width="90%" >}}

## テストの失敗

テストが 1 つまたは複数のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストできずにテストが実際に失敗することがあります。これらの理由には次のものがあります。

| エラー             | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。                                                                                                                                                                                                                                                         |
| DNS               | テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤り、DNS エントリの構成の誤りなどの原因が考えられます。                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。                                                                                                                                                                                                                                                                                                                                                                                     |
| `SSL`             | SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][16]。                                                                                                                                                                                                                                                                                                                                                      |
| `TIMEOUT`         | リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。<br> - `TIMEOUT: The request couldn’t be completed in a reasonable time.`  は、タイムアウトが TCP ソケットの接続レベルで発生したことを示します。<br> - `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` は、タイムアウトがリクエストの実行全体 (TCP ソケット接続、データ転送、アサーション) で発生したことを示します。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/synthetics/#get-all-locations-public-and-private
[2]: /ja/synthetics/private_locations
[3]: /ja/synthetics/ci
[4]: /ja/synthetics/api_tests/http_tests
[5]: /ja/synthetics/api_tests/ssl_tests
[6]: /ja/synthetics/api_tests/tcp_tests
[7]: /ja/synthetics/api_tests/dns_tests
[8]: /ja/synthetics/search/#search
[9]: https://restfulapi.net/json-jsonpath/
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[11]: /ja/api/v1/synthetics/#create-a-test
[12]: /ja/monitors/notifications/?tab=is_alert#notification
[13]: https://www.markdownguide.org/basic-syntax/
[14]: /ja/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[15]: /ja/synthetics/settings/#global-variables
[16]: /ja/synthetics/api_tests/errors/#ssl-errors