---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - http
  - http test
  - http tests
aliases:
- /ja/synthetics/http_test
- /ja/synthetics/http_check
- /ja/synthetics/guide/or-logic-api-tests-assertions
description: HTTP リクエストをシミュレートして、公開および内部 API エンドポイントを監視します。
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic Monitoring の紹介
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /getting_started/synthetics/api_test
  tag: ドキュメント
  text: HTTP テストの概要
- link: /synthetics/private_locations
  tag: ドキュメント
  text: 内部エンドポイントで HTTP テストを実行する
- link: /synthetics/multistep
  tag: ドキュメント
  text: マルチステップ HTTP テストを実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: HTTP テスト
---
## 概要 {#overview}

HTTP テストでは、アプリケーションの API エンドポイントに HTTP リクエストを送信し、応答時間、ステータスコード、ヘッダー、本文のコンテンツなど、定義された条件と応答を確認することができます。

HTTP テストは、ネットワークの外部または内部のどちらからテストを実行するかの好みによって、[管理](#select-locations)ロケーションと[プライベートロケーション][1]の両方から実行できます。HTTP テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行できます。

## 構成 {#configuration}

テストを作成するには次の方法があります。

   - **テンプレートからテストを作成する**:
   
     1. あらかじめ設定されているテンプレートのいずれかにカーソルを合わせて、[**View Template**] (テンプレートを表示) をクリックします。すると、「Test Details」(テストの詳細)、「Request Details」(リクエストの詳細)、「Assertions」(アサーション)、「Alert Conditions」(アラートの条件)、「Monitor Settings」(モニターの設定) など、あらかじめ設定された構成情報が表示されるサイドパネルが開きます。
     2. [**+Create Test**] (テストを作成) をクリックして [**Define Request**] (リクエストの定義) ページを開きます。このページで、あらかじめ設定された構成オプションを確認および編集できます。表示されるフィールドは、テストを一から作成する際に利用可能なフィールドと同じです。
     3. [**Save Details**] (詳細を保存) をクリックして、API テストを送信します。<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="テンプレートを使った Synthetics API テストのランディングページの動画" video="true" >}}

  - **テストを一から作成する**:
    
     1. テストを一から作成するには、[**+ Start from scratch**] (一から作成する) テンプレートをクリックし、`HTTP` リクエストタイプを選択して、クエリする **URL** を指定します。
        利用可能なメソッドは、`GET`、`POST`、`PATCH`、`PUT`、`HEAD`、`DELETE`、および `OPTIONS` です。`http` および `https` の両方の URL がサポートされています。

        <div class="alert alert-info">その他のオプションについては、<a href=#advanced-options>高度なオプション</a>を参照してください。</div>

     2. **Name** your HTTP test.

     3. Add Environment **Tags** as well as any other tag to your HTTP test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][3]. 
     
     4. Click **Send** to try out the request configuration. A response preview is displayed on the right side of your screen.<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="HTTP リクエストを定義する" style="width:90%;" >}}

     5. Click **Create Test** to submit your API test.

### スニペット {#snippets}

{{% synthetics-api-tests-snippets %}}

### 高度なオプション {#advanced-options}

   {{< tabs >}}

   {{% tab "リクエストオプション" %}}
   * **HTTP version** (HTTP バージョン): `HTTP/1.1 only`、`HTTP/2 only`、または `HTTP/2 fallback to HTTP/1.1`を選択します。
   * **Follow redirects** (リダイレクトをフォローする): リクエストを実行するときに HTTP テストで最大 10 個のリダイレクトをフォローするように選択します。
   * **Ignore server certificate error** (サーバー証明書のエラーを無視する): SSL 証明書の検証時にエラーが発生した場合でも、HTTP テストが接続を続行するように選択します。
   * **Timeout** (タイムアウト): テストがタイムアウトするまでの時間を秒単位で指定します。
   * **Request headers** (リクエストヘッダー): HTTP リクエストに追加するヘッダーを定義します。デフォルトのヘッダー (たとえば、`user-agent` ヘッダー) をオーバーライドすることもできます。
   * **Cookies** (クッキー): HTTP リクエストに追加するクッキーを定義します。複数のクッキーを設定するには次の形式を使用します: `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`。

   {{% /tab %}}

   {{% tab "認証" %}}

   * **Client Certificate** (クライアント証明書): クライアント証明書 (`.crt`) と関連する秘密キー (`.key`) を `PEM` 形式でアップロードして、mTLS を介して認証します。`openssl` ライブラリを使用して証明書を変換することができます。たとえば、`PKCS12` 証明書を `PEM` 形式の秘密キーと証明書に変換できます。

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * **HTTP Basic Auth** (HTTP 基本認証): HTTP 基本認証の資格情報を追加します。
   * **Digest Auth** (ダイジェスト認証): ダイジェスト認証の資格情報を追加します。
   * **NTLM**: NTLM 認証の資格情報を追加します。NTLMv2 と NTLMv1 の両方に対応しています。
   * **AWS Signature v4** (AWS 署名バージョン 4): Access Key ID と Secret Access Key を入力します。Datadog は、リクエストの署名を生成します。このオプションは、SigV4 の基本的な実装を使用します。Amazon S3 などの特定の署名は、そのままではサポートされていません。
     Amazon S3 バケットへの "Single Chunk" 転送リクエストの場合、リクエストの本文を sha256 エンコードした値を含む `x-amz-content-sha256` ヘッダーを追加します (本文が空の場合は `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` を使用します)。
   * **OAuth 2.0**: クライアント資格情報またはリソース所有者のパスワードのどちらを付与するかを選択し、アクセストークンの URL を入力します。選択内容に応じて、クライアント ID とシークレット、またはユーザー名とパスワードを入力します。ドロップダウンメニューから、API トークンを基本認証ヘッダーとして送信するか、クライアント資格情報を本文で送信するかを選択します。オプションで、オーディエンス、リソース、スコープなどの追加情報を提供できます ([**Resource Owner Password**] (リソース所有者のパスワード) を選択した場合は、クライアント ID とシークレットも提供できます)。

   {{% /tab %}}

   {{% tab "クエリパラメーター" %}}

   * **Encode parameters** (パラメーターのエンコード): エンコードが必要なクエリパラメーターの名前と値を追加します。

   {{% /tab %}}

   {{% tab "リクエスト本文" %}}

   * **Body type** (本文のタイプ): HTTP リクエストに追加するリクエスト本文のタイプ (`application/json`、`application/octet-stream`、`application/x-www-form-urlencoded`、`multipart/form-data`、`text/html`、`text/plain`、`text/xml`、`GraphQL`、または `None`) を選択します。
   * **Request body** (リクエスト本文): HTTP リクエスト本文の内容を追加します。
       * `application/json`、`application/x-www-form-urlencoded`、`text/html`、`text/plain`、`text/xml`、`GraphQL` では、リクエスト本文のサイズが最大 50 キロバイトに制限されます。
       * `application/octet-stream` では、リクエスト本文は 3 メガバイトのファイル 1 つに制限されます。
       * `multipart/form-data` では、リクエスト本文はそれぞれ 3 メガバイトのファイル 3 つに制限されます。
   {{% /tab %}}

   {{% tab "プロキシ" %}}

   * **Proxy URL** (プロキシ URL): HTTP リクエストが通過する必要があるプロキシの URL を指定します (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。
   * **Proxy header** (プロキシヘッダー): プロキシへの HTTP リクエストに含めるヘッダーを追加します。

   {{% /tab %}}

   {{% tab "プライバシー" %}}

   * **Do not save response body** (応答本文を保存しない): このオプションを選択すると、実行時に応答本文が保存されず、失敗した JavaScript アサーションのエラーメッセージが切り捨てられます。これは、テスト結果に機密データが表示されないようにするために役立ちますが、障害のトラブルシューティングが困難になる可能性があります。セキュリティに関する完全な推奨事項については、[Synthetic Monitoring のデータセキュリティ][1]を参照してください。


[1]: /ja/data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

JavaScript を使用して HTTP API テスト用の変数を定義します。

{{< img src="synthetics/api_tests/http_javascript.png" alt="JavaScript を使用して HTTP API テストを定義する" style="width:90%;" >}}

<div class="alert alert-info">Windows プライベートロケーションでは API テストの JavaScript 機能はサポートされていません。</div>

   {{% /tab %}}

   {{< /tabs >}}

### アサーションを定義する {#define-assertions}

アサーションは、期待されるテスト結果を定義します。[**Test URL**] (URL をテスト) をクリックすると、`response time`、`status code`、`header`、`content-type`の基本的なアサーションが、取得された応答に基づいて追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

<div class="alert alert-info">アサーションのヘッダー、本文、JavaScript の各セクションは、アサーションを定義するためだけに使用されます。追加の HTTP リクエストを行うためには使用できません。</div>

{{< tabs >}}
{{% tab "Response Assertions" %}}

| タイプ          | 演算子                                                                                               | 値の型                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5] | _String_ <br> _[Regex][6]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _String_ <br> _[Regex][6]_                                      |
| response time | `is less than`                                                                                         | _Integer (ms)_                                                  |
| status code   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _Integer_ <br> _[Regex][6]_                                                     |

HTTP テストでは、`br`、`deflate`、`gzip`、`identity` の `content-encoding` ヘッダーを使用して本文を解凍することが可能です。

[**New Assertion**] (新規アサーション) をクリックするか、応答プレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_http.png" alt="HTTP テストが成功または失敗するためのアサーションを定義する" style="width:90%;" >}}

アサーションで `OR` ロジックを実行するには、`matches regex` コンパレーターを使用して、`(200|302)` のように複数の期待値を持つ正規表現を定義します。たとえば、サーバーが `200` あるいは `302` というステータスコードで応答したときに HTTP テストを成功させたい場合、ステータスコードが 200 あるいは 302 であれば `status code` アサーションが成功します。`matches regex` コンパレーターを使用して `body` や `header` のアサーションに `OR` ロジックを追加することもできます。

テストに応答本文に関するアサーションが含まれていない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連する応答時間が返されます。

応答本文が返されるのは、その内容に関するアサーションが追加されていて、それらのアサーションが失敗した場合だけです。テストに応答本文に関するアサーションが含まれていて、テストが成功した場合は、本文のペイロードはドロップし、応答本文の最初の 50 文字のスニペットのみが表示されます。

テストに応答本文に関するアサーションが含まれていて、タイムアウトの制限に達した場合は、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

{{% /tab %}}
{{% tab "JavaScript" %}}

標準の応答アサーションが検証ニーズを満たさない場合は、JavaScript アサーションを使用します。Synthetic Monitoring は、柔軟なアサーションスタイルのために `dd.expect()`、`dd.should`、および `dd.assert()` を提供する [Chai アサーションライブラリ][20]を使用します。

JSON 応答を扱う場合は、プロパティにアクセスする前に `JSON.parse(dd.response.body)` を使用して応答本文を解析します。これは、JSON データを検証する際にすべてのアサーションメソッド (`dd.assert()`、`dd.expect()`、および `dd.should`) で必要です。

{{< img src="synthetics/api_tests/JS_assertion.png" alt="HTTP API テストのための JavaScript アサーション" style="width:90%;" >}}

<div class="alert alert-info">
  <ul>
    <li>Windows プライベートロケーションでは API テストの JavaScript 機能はサポートされていません。</li>
    <li>失敗した JavaScript アサーションのエラーメッセージに機密データが含まれる可能性がある場合は、[<strong>Advanced Options</strong>] (高度なオプション) > [<strong>Privacy</strong>] (プライバシー) で、[<strong>Do not save response body</strong>] (応答本文を保存しない) を有効にします。これにより、アサーションのエラーメッセージが切り捨てられます。</li>
  </ul>
</div>

#### dd.assert() の使用{#using-ddassert}

従来のアサーション構文には `dd.assert()` を使用します。

たとえば、`status.code` フィールドの許容値をアサートするには、次のように指定します。

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
// Assert that the status code is 200, 210, 320, or 330
dd.assert.include([200, 210, 320, 330], response.status.code);
{{< /code-block >}}

応答例

```json
{
  "status": {
    "code": 200,
    "message": "Success"
  }
}
```

このアサーションの処理内容
- JSON 応答本文を解析する
-  `status.code` が許容値の配列 (200、210、320、または 330) に含まれていることを確認する

このテストは**成功**します。`status.code` が `200` で、許容値の配列に含まれているからです。

`assert.include()` の詳細については、[Chai assert.include() のドキュメント][21]を参照してください。

#### dd.expect() の使用 {#using-ddexpect}

ネストされたプロパティの検証を伴うアサーションには `dd.expect()` を使用します。

たとえば、`status.indicator` フィールドの予測値をアサートするには、次のように指定します。

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
const regex = /^(major|critical|minor|none)$/;

dd.expect(response)
  .to.have.nested.property('status.indicator')
  .that.matches(regex);
{{< /code-block >}}

応答例

```json
{
  "status": {
    "indicator": "none"
  }
}
```
このアサーションの処理内容
- JSON 応答本文を解析する
- ネストされたプロパティ `status.indicator` が存在することを検証する
- 値が正規表現パターンと一致することを確認する (`major`、`critical`、`minor`、`none` のいずれか)

正規表現が `/^(major|critical|minor|none)$/` の場合、このテストは**成功**します。`status.indicator` が `"none"` で、このパターンと一致するからです。

正規表現が `/^(major|critical|minor)$/` の場合、このテストは**失敗**します。`"none"` が許容値に含まれていないからです。

`expect()` の詳細については、[Chai expect() のドキュメント][22]を参照してください。

#### dd.should の使用{#using-ddshould}

自然言語構文でアサーションを書くには `dd.should` を使用します。

たとえば、`status.indicator` フィールドが存在し、特定の値と等しいことをアサートするには、次のように指定します。

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
response.status.should.exist();
const indicator = response.status.indicator;
indicator.should.equal('none');
{{< /code-block >}}

応答例

```json
{
  "status": {
    "indicator": "none"
  }
}
```

このアサーションの処理内容
- JSON 応答本文を解析する
- `status` プロパティが存在することを確認する
- indicator 値を変数に抽出する
- `status.indicator` が `"none"` と等しいことを確認する

このテストは**成功**します。`status` が存在し、`status.indicator` が `"none"` であるからです。

`should()` の詳細については、[Chai should() のドキュメント][23]を参照してください。

[20]: https://www.chaijs.com/api/
[21]: https://www.chaijs.com/api/assert/#method_include
[22]: https://www.chaijs.com/guide/styles/#expect
[23]: https://www.chaijs.com/guide/styles/#should

{{% /tab %}}
{{< /tabs >}}

### ロケーションを選択する {#select-locations}

HTTP テストを実行する**ロケーション**を選択します。HTTP テストは、ネットワークの外部または内部のどちらからテストを実行するかの好みによって、管理ロケーションと[プライベートロケーション][1]の両方から実行できます。

{{% managed-locations %}}

### テストの頻度を指定する{#specify-test-frequency}

HTTP テストは次の頻度で実行できます。

* **On a schedule** (スケジュール): 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog で HTTP テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][2] (CI/CD パイプライン内): 欠陥のあるコードがカスタマーエクスペリエンスに影響を与える可能性があることを恐れずに出荷を開始します。
[* **On-demand**] (オンデマンド): チームにとって最も意味のあるときにいつでもテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

## ワンクリック{#one-click}

API テストの作成は、[カタログ][17]と既存の API テストからエンドポイントを提案し、関連するオプションをテストフォームに自動入力します。
既存の Datadog データソース (APM トレース、カタログで検出されたエンドポイント、ユーザーが作成した類似の Synthetic テストなど) を活用します。

API テストの [**URL**] に入力を開始すると、エンドポイントの提案や Synthetic Monitoring の類似テストを取得できます。

   {{< img src="synthetics/api_tests/api-one-click.png" alt="既存の API テストの GET 検索を表示している HTTP API テスト" style="width:90%;" >}}

次に、提案を選択してテスト構成 (リクエストオプションとヘッダー、認証、変数) を自動入力します。

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="選択" style="width:90%;" >}}

{{% synthetics-variables %}}

### 変数を使用する{#use-variables}

[[**Settings**] (設定) ページで定義されたグローバル変数][11]を、HTTP テストの URL、高度なオプション、アサーションで使用できます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="HTTP テストでの変数の使用" video="true" width="100%" >}}

## テストの失敗 {#test-failure}

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが時期尚早に失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが実際に失敗することがあります。

HTTP および SSL のエラーコードの完全なリストについては、[API テストのエラー][12]を参照してください。

## 権限 {#permissions}

デフォルトでは、[Datadog 管理者および Datadog 標準のロール][13]を持つユーザーのみが、Synthetic HTTP テストを作成、編集、削除できます。Synthetic HTTP テストの作成、編集、削除のアクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][13]のいずれかにアップグレードします。

[カスタムロール機能][14]を使用している場合は、`synthetics_read` および `synthetics_write` の権限を含むカスタムロールにユーザーを追加します。

### アクセス制限 {#restrict-access}

{{% synthetics_grace_permissions %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: /ja/synthetics/cicd_integrations
[3]: /ja/synthetics/search/#search
[7]: /ja/monitors/notify/#configure-notifications-and-automations
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[10]: /ja/synthetics/guide/synthetic-test-monitors
[11]: /ja/synthetics/settings/#global-variables
[12]: /ja/synthetics/api_tests/errors/
[13]: /ja/account_management/rbac/
[14]: /ja/account_management/rbac#custom-roles
[15]: /ja/account_management/rbac/#create-a-custom-role
[16]: /ja/synthetics/api_tests/errors/#http-errors
[17]: /ja/api_catalog