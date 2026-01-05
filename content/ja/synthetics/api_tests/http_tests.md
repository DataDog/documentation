---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API テスト
  tags:
  - http
  - http テスト
  - http テスト
aliases:
- /ja/synthetics/http_test
- /ja/synthetics/http_check
- /ja/synthetics/guide/or-logic-api-tests-assertions
description: HTTP リクエストをシミュレートして、パブリックおよび内部 API エンドポイントを監視します。
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: HTTP テストの概要
- link: /synthetics/private_locations
  tag: Documentation
  text: 内部エンドポイントで HTTP テストを実行する
- link: /synthetics/multistep
  tag: ドキュメント
  text: マルチステップ HTTP テスト
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: HTTP テスト
---
## 概要

HTTP テストでは、アプリケーションの API エンドポイントに HTTP リクエストを送信し、応答時間、ステータスコード、ヘッダー、本文のコンテンツなど、定義された条件と応答を確認することができます。

HTTP テストは、ネットワークの外部または内部からのテストの実行の好みに応じて、[管理ロケーション](#select-locations)と[プライベートロケーション][1]の両方から実行することができます。HTTP テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行することができます。

## 構成

You may create a test using one of the following options:

   - **Create a test from a template**:

     1. あらかじめ用意されたテンプレートの上にマウスカーソルを置き、**View Template** をクリックします。すると、「Test Details」「Request Details」「Assertions」「Alert Conditions」「Monitor Settings」など、あらかじめ設定された構成情報が表示されるサイドパネルが開きます。
     2. Click **+Create Test** to open the **Define Request** page, where you can review and edit the pre-populated configuration options. The fields presented are identical to those available when creating a test from scratch.
     3. **Save Details** をクリックして、API テストを送信します。<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video of Synthetics API test landing page with templates" video="true" >}}

  - **Build a test from scratch**:

     1. テストを一から作成するには、**+ Start from scratch** テンプレートをクリックし、`HTTP` リクエストタイプを選択し、クエリする **URL** を指定します。
        使用可能なメソッドは、`GET`、`POST`、`PATCH`、`PUT`、`HEAD`、`DELETE`、`OPTIONS` です。`http` と `https` の両方の URL がサポートされています。

        <div class="alert alert-info">その他のオプションについては、<a href=#advanced-options>高度なオプション</a>をご覧ください。</div>

     2. HTTP テストに**名前**を付けます。

     3. HTTP テストに Environment **タグ**とその他のタグを追加します。次に、これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3]で Synthetic テストをフィルタリングできます。

     4. **Send** をクリックして、リクエストの構成をテストします。画面の右側に応答プレビューが表示されます。<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="HTTP リクエストを定義する" style="width:90%;" >}}

     5. Click **Create Test** to submit your API test.

### スニペット

{{% synthetics-api-tests-snippets %}}

### 高度なオプション

   {{< tabs >}}

   {{% tab "リクエストオプション" %}}
   * **HTTP バージョン**: `HTTP/1.1 のみ`、`HTTP/2 のみ`、または `HTTP/2 から HTTP/1.1 へのフォールバック` を選択してください。
   * **Follow redirects**: 選択すると、リクエストを実行するときに HTTP テストで最大 10 個のリダイレクトをフォローします。
   * **Ignore server certificate error**: 選択すると、SSL 証明書の検証時にエラーが発生した場合でも、HTTP テストが接続を続行します。
   * **Timeout**: テストがタイムアウトするまでの時間を秒単位で指定します。
   * **Request headers**: HTTP リクエストに追加するヘッダーを定義します。デフォルトのヘッダー (たとえば、`user-agent` ヘッダー) をオーバーライドすることもできます。
   * **Cookies**: HTTP リクエストに追加するクッキーを定義します。`<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` の形式を使用して複数のクッキーを設定します。

   {{% /tab %}}

   {{% tab "認証" %}}

   * **クライアント証明書**: クライアント証明書 (`.crt`) と関連する秘密キー (`.key`) を `PEM` 形式でアップロードして、mTLS を介して認証します。`openssl` ライブラリを使用して証明書を変換することができます。たとえば、`PKCS12` 証明書を `PEM` 形式の秘密キーと証明書に変換します。

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * **HTTP Basic Auth**: HTTP 基本認証資格情報を追加します。
   * **Digest Auth**: ダイジェスト認証の資格情報を追加します。
   * **NTLM**: NTLM 認証の資格情報を追加します。NTLMv2 と NTLMv1 の両方をサポートします。
   * **AWS Signature v4**: Access Key ID と Secret Access Key を入力します。Datadog は、リクエストの署名を生成します。このオプションは、SigV4 の基本的な実装を使用します。Amazon S3 などの特定の署名はそのままではサポートされていません。
     Amazon S3 バケットへの "Single Chunk" 転送リクエストの場合、リクエストの本文を sha256 エンコードした値を含む `x-amz-content-sha256` ヘッダーを追加します (本文が空の場合は、`x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` を使用します)。
   * **OAuth 2.0**: クライアント資格情報またはリソース所有者のパスワードのどちらかを付与するかを選択し、アクセストークンの URL を入力します。選択内容に応じて、クライアント ID とシークレット、またはユーザー名とパスワードを入力します。ドロップダウンメニューから、API トークンを基本認証ヘッダーとして送信するか、クライアント資格情報を本文に送信するかを選択します。オプションで、オーディエンス、リソース、スコープなどの追加情報を提供できます (**Resource Owner Password** を選択した場合は、クライアント ID とシークレットも提供します)。

   {{% /tab %}}

   {{% tab "クエリパラメーター" %}}

   * **Encode parameters**: エンコーディングが必要なクエリパラメーターの名前と値を追加します。

   {{% /tab %}}

   {{% tab "リクエスト本文" %}}

   * **Body type**: HTTP リクエストに追加するリクエスト本文のタイプ (`application/json`、`application/octet-stream`、`application/x-www-form-urlencoded`、`multipart/form-data`、`text/html`、`text/plain`、`text/xml`、`GraphQL`、または `None`) を選択します。
   * **Request body**: HTTP リクエスト本文の内容を追加します。
       * `application/json`、`application/x-www-form-urlencoded`、`text/html`、`text/plain`、`text/xml`、`GraphQL` では、リクエスト本文のサイズは最大 50 キロバイトに制限されます。
       * `application/octet-stream` では、リクエスト本文は 3 メガバイトのファイル 1 つに制限されます。
       * `multipart/form-data` では、リクエスト本文はそれぞれ 3 メガバイトのファイル 3 つに制限されます。
   {{% /tab %}}

   {{% tab "プロキシ" %}}

   * **Proxy URL**: HTTP リクエストが通過する必要があるプロキシの URL (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`) を指定します。
   * **Proxy header**: プロキシへの HTTP リクエストに含めるヘッダーを追加します。

   {{% /tab %}}

   {{% tab "Privacy" %}}

   * **Do not save response body**: 応答の本文が実行時に保存されないようにするには、このオプションを選択します。テスト結果に機密データを含めたくない場合に有用です。障害発生時のトラブルシューティングに影響を及ぼす可能性があるため、慎重に使用してください。セキュリティに関する推奨の詳細は、[Synthetic Monitoring Security][1] をご確認ください。


[1]: /ja/data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

JavaScript を使用して HTTP API テスト用の変数を定義します。

{{< img src="synthetics/api_tests/http_javascript.png" alt="JavaScript を使用して HTTP API テストを定義する" style="width:90%;" >}}

   {{% /tab %}}

   {{< /tabs >}}

### アサーションを定義する

アサーションは、期待されるテスト結果が何であるかを定義します。**Test URL** をクリックすると、`response time`、`status code`、`header`、`content-type` の基本的なアサーションが、取得された応答に基づいて追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ          | 演算子                                                                                               | 値の型                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 本文          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][4]、[`xpath`][5] | _文字列_ <br> _[正規表現][6]_ |
| ヘッダー        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`                       | _文字列_ <br> _[正規表現][6]_                                      |
| response time | `is less than`                                                                                         | 整数 (ms)                                                  |
| ステータスコード   | `is`、`is not`、<br> `matches`、`does not match`                                                                                         | _整数_ <br> _[正規表現][6]_                                                     |

HTTP テストでは、`br`、`deflate`、`gzip`、`identity` の `content-encoding` ヘッダーを使用して本文を解凍することが可能です。

**New Assertion** をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_http.png" alt="HTTP テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

アサーションで `OR` ロジックを実行するには、`matches regex` コンパレータを使って `(200|302)` のように複数の期待値を持つ正規表現を定義します。たとえば、サーバーが `200` あるいは `302` というステータスコードで応答したときに HTTP テストを成功させたいことがあるでしょう。ステータスコードが 200 あるいは 302 であれば、 `status code` アサーションは成功します。`body` や `header` アサーションに `OR` ロジックを追加することもできます。

テストがレスポンス本文にアサーションを含まない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連するレスポンスタイムを返します。

テストがレスポンス本文に対するアサーションを含み、タイムアウトの制限に達した場合、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する

HTTP テストを実行する**ロケーション**を選択します。HTTP テストは、ネットワークの外部または内部のどちらからテストを実行するかの好みによって、管理ロケーションと[プライベートロケーション][1]の両方から実行できます。

{{% managed-locations %}}

### テストの頻度を指定する

HTTP テストは次の頻度で実行できます。

* **On a schedule**: 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog で HTTP テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][2]: 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
* **On-demand**: チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

## ワンクリック

API テストの作成は、[ソフトウェアカタログ][17]と既存の API テストからエンドポイントを提案し、テストフォームに関連するオプションを自動入力します。既存の Datadog データソース (APM トレース、Software Catalog で検出されたエンドポイント、ユーザーが作成した類似の Synthetic テストなど) を活用します。

Synthetic Monitoring の API テスト **URL** 入力に入力を開始すると、エンドポイントの提案や類似テストを取得できます。

{{< img src="synthetics/api_tests/api-one-click.png" alt="既存の API テストの GET 検索を表示する HTTP API テスト" style="width:90%;" >}}

次に、提案を選択してテスト構成 (リクエストオプションとヘッダー、認証、変数) を自動入力します。

{{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="選択" style="width:90%;" >}}

{{% synthetics-variables %}}

### 変数を使用する

HTTP テストの URL、高度なオプション、アサーションで、[**Settings** ページで定義されたグローバル変数][11]を使用することができます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="HTTP テストで変数を使用する" video="true" width="100%" >}}

## テストの失敗

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが実際に失敗することがあります。

よくあるエラーは以下の通りです。

`AUTHENTICATION_ERROR`
:Synthetic Monitoring は認証失敗が発生した場合、自動的にテストのリトライを無効にします。この安全策は、有効な認証情報を使ってテストを更新するまで継続されます。これにより、不要なテスト実行が行われ、誤アラートが発生したり課金対象の使用量が増加したりすることを防ぎます。

`CONNREFUSED`
: ターゲットマシーンが積極的に拒否したため、接続できませんでした。

`CONNRESET`
: 接続がリモートサーバーによって突然閉じられました。Web サーバーにエラーが発生した、応答中にシステムが停止した、Web サーバーへの接続が失われた、などの原因が考えられます。

`DNS`
: テスト URL に対応する DNS エントリが見つかりませんでした。原因としては、テスト URL の誤構成や DNS エントリの誤構成が考えられます。

`Error performing HTTP/2 request`
: リクエストを実行できませんでした。詳細は専用の[エラー][16]ページを参照してください。

`INVALID_REQUEST`
: テストのコンフィギュレーションが無効です (URL に入力ミスがあるなど)。

`SSL`
: SSL 接続を実行できませんでした。[詳細については、個別のエラーページを参照してください][12]。

`TIMEOUT`
: リクエストを一定時間内に完了できなかったことを示します。`TIMEOUT` には 2 種類あります。
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` は、リクエストの持続時間がテスト定義のタイムアウト (デフォルトは 60 秒に設定されています) に当たったことを示します。
  各リクエストについて、ネットワークウォーターフォールに表示されるのは、リクエストの完了したステージのみです。例えば、`Total response time` だけが表示されている場合、DNS の解決中にタイムアウトが発生したことになります。
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`  は、テスト時間 (リクエスト＋アサーション) が最大時間 (60.5s) に達したことを示しています。

`MALFORMED_RESPONSE`
: リモートサーバーが HTTP 仕様に準拠していないペイロードで応答しました。

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][13]を持つユーザーのみが、Synthetic HTTP テストを作成、編集、削除できます。Synthetic HTTP テストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][13]のいずれかにアップグレードします。

[カスタムロール機能][14]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

{{% synthetics_grace_permissions %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: /ja/synthetics/cicd_integrations
[3]: /ja/synthetics/search/#search
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: /ja/monitors/notify/#configure-notifications-and-automations
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[10]: /ja/synthetics/guide/synthetic-test-monitors
[11]: /ja/synthetics/settings/#global-variables
[12]: /ja/synthetics/api_tests/errors/#ssl-errors
[13]: /ja/account_management/rbac/
[14]: /ja/account_management/rbac#custom-roles
[15]: /ja/account_management/rbac/#create-a-custom-role
[16]: /ja/synthetics/api_tests/errors/#http-errors
[17]: /ja/api_catalog