---
title: Multistep API テスト
kind: documentation
description: リクエストをチェーンして主要なサービスで高度なトランザクションを監視する
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: API テストの概要
  - link: /synthetics/private_locations
    tag: Documentation
    text: 内部エンドポイントで Multistep API テストを実行する
---
## 概要

Multistep API テストを使用すると、**[HTTP テスト][1]**をチェーンして、主要なサービスの高度なジャーニーがいつでもどこからでも利用できることを事前に監視できます。

* 認証を必要とする API エンドポイントで HTTP リクエストを実行します (たとえば、トークンを介して)
* API レベルで主要なビジネストランザクションを監視します
* エンドツーエンドのモバイルアプリケーションのジャーニーなどをシミュレートします

{{< img src="synthetics/api_tests/ms_overview.png" alt="Multistep API テストの概要" style="width:90%;" >}}

サービスの 1 つが応答遅延を起こしたり、予期しない方法 (たとえば、予期しない応答本文、ステータスコードなど) で応答を開始した場合、テストは[**チームに警告する**][2]、[**CI パイプラインをブロックする**][3]、または[**障害のあるデプロイをロールバックする**][3]ことができます。

Multistep API テストは、Datadog [管理ロケーション][4]および[プライベートロケーション][5]から実行できるため、外部と内部の両方で**システムを完全にカバー**できます。

**注**: Multistep API テストを使用すると、1 つのテストで複数の HTTP リクエストをリンクできます。サービスに対する単一のリクエストを実行する場合は、[API テスト][6]を利用できます。

## コンフィギュレーション

### テストに名前を付けてタグを付ける

1. Multistep API テストに**名前**を付けます。
2. Multistep API テストに `env` **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring ホームページ][7]で Synthetic テストをすばやくフィルタリングできます。

### ロケーションを選択する

Multistep API テストを実行する**ロケーション**を選択します。Multistep API テストは、ネットワークの外部または内部のどちらからテストを実行するかによって、[管理ロケーション][4]と[プライベートロケーション][5]の両方から実行できます。

### リクエストを定義する

**Create Your First Request** を押して、テストのリクエストの設計を開始します。

{{< img src="synthetics/api_tests/create_request.png" alt="Multistep API テストリクエストを作成する"  style="width:90%;" >}}

#### リクエストを定義する

{{< img src="synthetics/api_tests/ms_define_request.png" alt="Multistep API テストのリクエストを定義する" style="width:90%;" >}}

1. ステップに**名前**を付けます。
2. **HTTP Method** を選択し、クエリする **URL** を指定します。使用可能なメソッドは、`GET`、`POST`、`PATCH`、`PUT`、`HEAD`、`DELETE`、`OPTIONS` です。`http` と `https` の両方の URL がサポートされています。
3. **Advanced Options** を使用して HTTP リクエストを加工します (オプション)。

  {{< tabs >}}

  {{% tab "リクエストオプション" %}}

  * **Follow redirects**: チェックマークを付けると、リクエストを実行するときに HTTP テストで最大 10 個のリダイレクトをフォローします。
  * **Request headers**: HTTP リクエストに追加するヘッダーを定義します。デフォルトのヘッダー (たとえば、`user-agent` ヘッダー) をオーバーライドすることもできます。
  * **Cookies**: HTTP リクエストに追加するクッキーを定義します。`<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` の形式を使用して複数のクッキーを設定します。
  * **HTTP Basic Auth**: HTTP 基本認証資格情報を追加します。

  {{% /tab %}}

  {{% tab "リクエスト本文" %}}

  * **Body type**: HTTP リクエストに追加するリクエスト本文のタイプ (`text/plain`、`application/json`、`text/xml`、`text/html`、または `None`) を選択します。
  * **Request body**: HTTP リクエスト本文のコンテンツを追加します。**注**: リクエスト本文は最大サイズ 50 キロバイトに制限されています。

  {{% /tab %}}

  {{% tab "証明書" %}}

  * **Ignore server certificate error**: チェックマークを付けると、SSL 証明書の検証時にエラーが発生した場合でも、HTTP テストが接続を続行します。
  * **Client certificate**: クライアント証明書と関連する秘密キーをアップロードして、mTLS を介して認証します。

  {{% /tab %}}

  {{% tab "プロキシ" %}}

  * **Proxy URL**: HTTP リクエストが通過する必要があるプロキシの URL (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`) を指定します。
  * **Proxy Header**: プロキシへの HTTP リクエストに含めるヘッダーを追加します。

  {{% /tab %}}

  {{< /tabs >}}

**Test URL** をクリックして、リクエストのコンフィギュレーションをテストします。応答プレビューが表示されます。

#### アサーションの追加

アサーションは、期待されるテスト結果が何であるかを定義します。`Test URL` を押すと、`response time`、`status code`、`header`、`content-type` の基本的なアサーションが、取得された応答に基づいて追加されます。Multistep API テストでは、アサーションはオプションです。

| タイプ          | 演算子                                                                                               | 値の型                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 本文          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][8] | _String_ <br> _[Regex][9]_ <br> _String_、_[Regex][9]_ |
| ヘッダー        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`                       | _String_ <br> _[Regex][10]                                      |
| response time | `is less than`                                                                                         | 整数 (ms)                                                  |
| ステータスコード   | `is`、`is not`                                                                                         | 整数                                                      |

**注**: HTTP テストでは、`br`、`deflate`、`gzip`、`identity` の `content-encoding` ヘッダーを使用して本文の圧縮を解除することが可能です。

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、ステップごとに最大 10 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions.png" alt="Multistep API テストのアサーションを定義する" style="width:90%;" >}}

#### 応答から変数を抽出する

オプションで、応答ヘッダーまたは本文をパースすることにより、HTTP リクエストの応答から変数を抽出することもできます。変数の値は、HTTP リクエストステップが実行されるたびに更新されます。

変数をパースするには

1. **Variable Name** を入力します。変数名に使用できるのは大文字、数字、アンダースコアのみです。また、3 文字以上にする必要があります。
2. 変数を応答ヘッダーから抽出するか、本文から抽出するか決定します。

    * **応答ヘッダー**から値を抽出: HTTP リクエストの応答ヘッダー全体を変数値に使用するか、[正規表現][10]によりパースします。
    * **応答本文**から値を抽出: HTTP リクエストの応答本文全体を変数値に使用し、[正規表現][10]または [JSONPath][8] によりパースします。

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Multistep API テストで HTTP リクエストから変数を抽出する" style="width:90%;" >}}

作成されたこの変数は、Multistep API テストの次の手順で使用できます。

### テストの頻度を指定する

Multistep API テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog で Multistep API テストを実行する頻度を選択します。

{{< img src="synthetics/api_tests/schedule.png" alt="スケジュールどおりに API テストを実行する"  style="width:90%;" >}}

* [**Within your CI/CD pipelines**][3]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

### アラート条件を定義する

アラート条件で、テストが失敗しアラートをトリガーする状況を設定します。

#### アラート設定規則

アラートの条件を `An alert is triggered if any assertion fails for X minutes from any n of N locations` に設定すると、次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

* 直近 *X* 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
* 直近 *X* 分間に、ある時点で最低 *n* 個のロケーションで失敗。

#### 高速再試行

テスト結果が失敗した場合、テストによって再試行をトリガーすることができます。デフォルトでは、再試行は最初に失敗したテスト結果の 300 ミリ秒後に実行されます。この間隔は [API][9] を介して構成できます。


ロケーションのアップタイムは、評価ごとに計算されます (評価前の最後のテスト結果がアップかダウンか)。合計アップタイムは、構成されたアラート条件に基づいて計算されます。送信される通知は、合計アップタイムに基づきます。

### チームへの通知

以前に定義された[アラート条件](#define-alert-conditions)に基づいて、テストによって通知が送信されます。このセクションを使用して、チームに送信するメッセージの方法と内容を定義します。

1. [モニターと同様][11]、メッセージに `@notification` を追加するか、ドロップダウンボックスでチームメンバーと接続されたインテグレーションを検索して、通知を受信する**ユーザーやサービス**を選択します。

2. テストの通知**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][12]のほか、以下の[条件付き変数][13]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            |テストがアラートを発する場合に表示します。                                          |
    | `{{^is_alert}}`            |テストがアラートを発しない限り表示します。                                        |
    | `{{#is_recovery}}`         |テストがアラートから回復したときに表示します。                             |
    | `{{^is_recovery}}`         |テストがアラートから回復しない限り表示します。                           |

3. テストが失敗した場合に、テストで**通知メッセージを再送信する**頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。

メール通知には、このセクションで定義されているメッセージと、失敗したアサーションの要約が含まれます。
通知の例:

{{< img src="synthetics/api_tests/notifications-example.png" alt="API テスト通知"  style="width:90%;" >}}

**Save** をクリックしてテストを保存し、Datadog にテストの実行を開始させます。

## 変数

### ローカル変数を作成する

#### 抽出された変数

[Multistep API テストの任意のステップから変数を抽出](#extract-variables-from-the-response)してから、テストの[後続のステップでその値を再挿入](#use-variables)することができます。

#### パターンからの変数

以下の利用可能な組み込みの 1 つから値を定義してローカル変数を作成できます。

| パターン                    | 説明                                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `{{ numeric(n) }}`         | `n` 桁の数字列を生成します。                                                                 |
| `{{ alphabetic(n) }}`      | `n` 文字のアルファベット文字列を生成します。                                                            |
| `{{ alphanumeric(n) }}`    | `n` 文字の英数字文字列を生成します。                                                       |
| `{{ date(n, format) }}`    | テストが開始された日付 + `n` 日の値を使用して、許容される形式のいずれかで日付を生成します。        |
| `{{ timestamp(n, unit) }}` | テストが +/- `n` 選択単位で開始されたタイムスタンプの値を使用して、許容される単位のいずれかでタイムスタンプを生成します。 |

### 変数を使用する

HTTP テストの URL、高度なオプション、アサーションで、[`Settings` で定義されたグローバル変数][14]と[ローカルで定義された変数](#create-local-variables)を使用できます。
変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Multistep API テストでの変数の使用" video="true" width="90%" >}}

## テストの失敗

ステップが 1 つまたは複数のアサーションを満たさない場合、またはステップのリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストできずにテストが実際に失敗することがあります。これらの理由には次のものがあります。

| エラー             | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。                                                                                                                                                                                                                                                         |
| DNS               | テスト URL に対応する DNS エントリが見つかりませんでした。テスト URL の構成の誤り、DNS エントリの構成の誤りなどの原因が考えられます。                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。                                                                                                                                                                                                                                                                                                                                                                                     |
| `SSL`             | SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][15]。                                                                                                                                                                                                                                                                                                                                                      |
| `TIMEOUT`         | リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。<br> - `TIMEOUT: The request couldn’t be completed in a reasonable time.`  は、タイムアウトが TCP ソケットの接続レベルで発生したことを示します。<br> - `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` は、タイムアウトがリクエストの実行全体 (TCP ソケット接続、データ転送、アサーション) で発生したことを示します。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests
[2]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[3]: /ja/synthetics/ci
[4]: /ja/api/v1/synthetics/#get-all-locations-public-and-private
[5]: /ja/synthetics/private_locations
[6]: /ja/synthetics/api_tests/
[7]: /ja/synthetics/search/#search
[8]: https://restfulapi.net/json-jsonpath/
[9]: /ja/api/v1/synthetics/#create-a-test
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[11]: /ja/monitors/notifications/?tab=is_alert#notification
[12]: http://daringfireball.net/projects/markdown/syntax
[13]: /ja/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[14]: /ja/synthetics/settings/#global-variables
[15]: /ja/synthetics/api_tests/errors/#ssl-errors