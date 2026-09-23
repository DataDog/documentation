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
  text: HTTP テストを使い始める
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

HTTP テストでは、アプリケーションの API エンドポイントに HTTP リクエストを送信し、レスポンス時間、ステータスコード、ヘッダー、ボディの内容など、定義された条件とレスポンスを確認することができます。

HTTP テストは、ネットワーク外部または内部のどちらから実行するかという要件に応じて、[管理](#select-locations)ロケーションと[プライベートロケーション][1]の両方から実行できます。HTTP テストは、スケジュール、オンデマンド、または [CI/CD パイプライン][2]内で直接実行できます。

## 構成 {#configuration}

次のいずれかの方法でテストを作成します。

   - **テンプレートからテストを作成する**:
   
     1. 事前設定済みテンプレートのいずれかにカーソルを合わせて、[{{< ui >}}View Template{{< /ui >}}] (テンプレートを表示) をクリックします。サイドパネルが開き、[{{< ui >}}Test Details{{< /ui >}}] (テストの詳細)、[{{< ui >}}Request Details{{< /ui >}}] (リクエストの詳細)、[{{< ui >}}Assertions{{< /ui >}}] (アサーション)、[{{< ui >}}Alert Conditions{{< /ui >}}] (アラート条件)、[{{< ui >}}Monitor Settings{{< /ui >}}] (モニター設定) など、事前に設定された構成情報が表示されます。
     2. [{{< ui >}}+Create Test{{< /ui >}}] (テストを作成) をクリックして、[{{< ui >}}Define Request{{< /ui >}}] (リクエストを定義) ページを開きます。このページで、事前に設定された構成オプションを確認し、編集できます。表示されるフィールドは、テストを一から作成する際に利用可能なフィールドと同じです。
     3. [{{< ui >}}Save Details{{< /ui >}}] (詳細を保存) をクリックして、API テストを送信します。<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="テンプレートを使った Synthetics API テストのランディングページの動画" video="true" >}}

  - **テストを一から作成する**:
    
     1. テストを一から作成するには、[{{< ui >}}+ Start from scratch{{< /ui >}}] (テストを一から作成する) テンプレートをクリックし、`HTTP` リクエストタイプを選択して、クエリする {{< ui >}}URL{{< /ui >}} を指定します。
        利用可能なメソッドは、`GET`、`POST`、`PATCH`、`PUT`、`HEAD`、`DELETE`、および `OPTIONS` です。`http` および `https` の両方の URL がサポートされています。

        <div class="alert alert-info">その他のオプションについては、<a href=#advanced-options>高度なオプション</a>を参照してください。</div>

     2. {{< ui >}}Name{{< /ui >}} (名前) を HTTP テストに付けます。

     3. Add Environment {{< ui >}}Tags{{< /ui >}} およびその他のタグを HTTP テストに追加します。これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3] で Synthetic テストをフィルタリングできます。
     
     4. Click {{< ui >}}Send{{< /ui >}} をクリックして、リクエストの構成を試します。画面の右側にレスポンスのプレビューが表示されます。<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="HTTP リクエストを定義する" style="width:90%;" >}}

     5. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.

### スニペット {#snippets}

{{% synthetics-api-tests-snippets %}}

### 高度なオプション {#advanced-options}

   {{< tabs >}}

   {{% tab "リクエストオプション" %}}
   * {{< ui >}}HTTP version{{< /ui >}} (HTTP バージョン): `HTTP/1.1 only`、`HTTP/2 only`、または `HTTP/2 fallback to HTTP/1.1` を選択します。

     CDN (Akamai、CloudFront、Fastly など) を経由するエンドポイントの場合は、HTTP バージョンをデフォルトの `HTTP/2 with fallback to HTTP/1.1` ではなく、`HTTP/2 only` または `HTTP/1.1 only` に設定してください。HTTP バージョンのサポートはプローブによって異なり、デフォルト設定では次のような [HTTP エラー][1] が断続的に発生する可能性があります。
     - `MALFORMED_RESPONSE: Unable to parse HTTP response`
     - `Session closed without receiving a SETTINGS frame`
     - `Error HTTP2: Error performing HTTP/2 request`
   * {{< ui >}}Follow redirects{{< /ui >}} (リダイレクトに従う): リクエストの実行時に、HTTP テストで最大 10 個のリダイレクトに従うようにします。
   * {{< ui >}}Ignore server certificate error{{< /ui >}} (サーバー証明書のエラーを無視する): SSL 証明書の検証時にエラーが発生した場合でも、HTTP テストが接続を続行するようにします。
   * {{< ui >}}Timeout{{< /ui >}} (タイムアウト): テストがタイムアウトするまでの時間を秒単位で指定します。
   * {{< ui >}}Request headers{{< /ui >}} (リクエストヘッダー): HTTP リクエストに追加するヘッダーを定義します。デフォルトのヘッダー (たとえば、`user-agent` ヘッダー) をオーバーライドすることもできます。
   * {{< ui >}}Cookies{{< /ui >}}: HTTP リクエストに追加する Cookie を定義します。複数の Cookie を設定する場合は、`<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` の形式を使用します。

[1]: /ja/synthetics/api_tests/errors/#http-errors

   {{% /tab %}}

   {{% tab "認証" %}}

   * {{< ui >}}Client Certificate{{< /ui >}} (クライアント証明書): クライアント証明書 (`.crt`) と関連する秘密キー (`.key`) を `PEM` 形式でアップロードして、mTLS による認証を行います。`openssl` ライブラリを使用して証明書を変換することができます。たとえば、`PKCS12` 証明書を `PEM` 形式の秘密キーと証明書に変換できます。

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * {{< ui >}}HTTP Basic Auth{{< /ui >}} (HTTP Basic 認証): HTTP 基本認証の資格情報を追加します。
   * {{< ui >}}Digest Auth{{< /ui >}} (Digest 認証): Digest 認証の資格情報を追加します。
   * {{< ui >}}NTLM{{< /ui >}}: NTLM 認証の資格情報を追加します。NTLMv2 と NTLMv1 の両方に対応しています。
   * {{< ui >}}AWS Signature v4{{< /ui >}}: Access Key ID と Secret Access Key を入力します。Datadog は、リクエストの署名を生成します。このオプションは、SigV4 の基本的な実装を使用します。Amazon S3 などの特定の署名は、そのままではサポートされていません。
     Amazon S3 バケットへの "Single Chunk" 転送リクエストの場合、リクエストの本文を sha256 エンコードした値を含む `x-amz-content-sha256` ヘッダーを追加します (本文が空の場合は `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` を使用します)。
   * {{< ui >}}OAuth 2.0{{< /ui >}}: クライアント資格情報またはリソース所有者パスワードのどちらを付与するかを選択し、アクセストークンの URL を入力します。選択内容に応じて、クライアント ID とシークレット、またはユーザー名とパスワードを入力します。ドロップダウンメニューから、API トークンを基本認証ヘッダーとして送信するか、クライアント資格情報を本文で送信するかを選択します。オプションで、オーディエンス、リソース、スコープなどの追加情報を提供できます ([{{< ui >}}Resource Owner Password{{< /ui >}}] (リソース所有者パスワード) を選択した場合は、クライアント ID とシークレットも指定できます)。
   * {{< ui >}}JWT{{< /ui >}}: 認証用に署名付き JWT ベアラートークンを生成します。署名アルゴリズム (`HS256`、`RS256`、または `ES256`) を選択し、署名キーを指定します。`HS256` の場合はテキスト形式のシークレットを入力し、`RS256` および `ES256` の場合は PEM 形式の秘密鍵をアップロードします。両方とも `{{ GLOBAL_VARIABLE }}` references. Enter payload claims as a JSON object; claims can be strings, numbers, Booleans, arrays, or nested objects. The `iat` (issued at) and `exp` (expiration) claims are auto-added by default. If you include `iat` or `exp` in the payload JSON, those values take precedence over the auto-generated ones. Optionally, set the expiration window in seconds (default: `3600`), add custom JWT header fields such as `kid` or `x5t`, and customize the token prefix in the `Authorization` header (default: `Bearer`)。

   {{% /tab %}}

   {{% tab "クエリパラメーター" %}}

   * {{< ui >}}Encode parameters{{< /ui >}} (パラメーターをエンコード): エンコードが必要なクエリパラメーターの名前と値を追加します。

   {{% /tab %}}

   {{% tab "リクエストボディ" %}}

   * {{< ui >}}Body type{{< /ui >}}: HTTP リクエストに追加するリクエストボディのタイプ (`application/json`、`application/octet-stream`、`application/x-www-form-urlencoded`、`multipart/form-data`、`text/html`、`text/plain`、`text/xml`、`GraphQL`、または `None`) を選択します。
   * {{< ui >}}Request body{{< /ui >}} (リクエストボディ): HTTP リクエストボディの内容を追加します。
       * `application/json`、`application/x-www-form-urlencoded`、`text/html`、`text/plain`、`text/xml`、`GraphQL` では、リクエストボディのサイズが最大 50 キロバイトに制限されます。
       * `application/octet-stream` では、リクエストボディは 3 メガバイトのファイル 1 つに制限されます。
       * `multipart/form-data` では、リクエストボディはそれぞれ 3 メガバイトのファイル 3 つに制限されます。
   {{% /tab %}}

   {{% tab "プロキシ" %}}

   * {{< ui >}}Proxy URL{{< /ui >}} (プロキシ URL): HTTP リクエスト送信先となるプロキシの URL を指定します (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。
   * {{< ui >}}Proxy header{{< /ui >}} (プロキシヘッダー): プロキシへの HTTP リクエストに含めるヘッダーを追加します。

   {{% /tab %}}

   {{% tab "プライバシー" %}}

   * {{< ui >}}Do not save response body{{< /ui >}} (レスポンスボディを保存しない): このオプションを選択すると、実行時にレスポンスボディは保存されず、失敗した JavaScript アサーションのエラーメッセージが切り捨てられます。これにより、テスト結果に機密データが表示されるのを防ぐことができますが、障害のトラブルシューティングが難しくなる可能性があります。セキュリティに関する完全な推奨事項については、「[Synthetic Monitoring のデータセキュリティ][1]」を参照してください。


[1]: /ja/data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

JavaScript を使用して HTTP API テスト用の変数を定義します。

{{< img src="synthetics/api_tests/http_javascript.png" alt="JavaScript を使用して HTTP API テストを定義する" style="width:90%;" >}}

<div class="alert alert-info">Windows プライベートロケーションでは API テストの JavaScript 機能はサポートされていません。</div>

   {{% /tab %}}

   {{< /tabs >}}

### アサーションを定義する {#define-assertions}

アサーションは、期待されるテスト結果を定義します。[{{< ui >}}Test URL{{< /ui >}}] (URL をテスト) をクリックすると、取得されたレスポンスに基づいて `response time`、`status code`、`header`、`content-type` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

<div class="alert alert-info">アサーションのヘッダー、ボディ、JavaScript の各セクションは、アサーションを定義するためにのみ使用されます。追加の HTTP リクエストを行うためには使用できません。</div>

{{< tabs >}}
{{% tab "レスポンスアサーション" %}}

| タイプ          | 演算子                                                                                               | 値の型                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> [`jsonpath`][4]、[`xpath`][5]、<br> [`jsonschema`][7] | _String_ <br> _[Regex][6]_ <br> _String_、_[Regex][6]_ <br> _String_ |
| body hash     | `md5`、`sha1`、`sha256`                                                                                 | _String_                                                        |
| header        | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`、<br> `does not exist`、<br> `is less than`、`is less than or equal`、`is more than`、`is more than or equal` | _String_ <br> _[Regex][6]_ <br> _None_ <br> _Integer_ |
| response time | `is less than`                                                                                         | _Integer (ms)_                                                  |
| status code   | `is`、`is not`、<br> `matches`、`does not match`                                                                                         | _Integer_ <br> _[Regex][6]_                                                     |

HTTP テストでは、`content-encoding` ヘッダーに `br`、`deflate`、`gzip`、`identity` が指定されたボディを展開できます。

[{{< ui >}}New Assertion{{< /ui >}}] (新しいアサーション) をクリックするか、レスポンスプレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_http.png" alt="HTTP テストの成功または失敗を判定するアサーションを定義する" style="width:90%;" >}}

アサーションで `OR` ロジックを実行するには、`matches regex` コンパレーターを使用して、`(200|302)` のように複数の期待値を持つ正規表現を定義します。たとえば、サーバーが `200` または `302` というステータスコードを返した場合に HTTP テストを成功させたい場合、ステータスコードが 200 または 302 であれば `status code` アサーションが成功します。`matches regex` コンパレーターを使用して `body` や `header` のアサーションに `OR` ロジックを追加することもできます。

レスポンスボディに対するアサーションを含まないテストでは、ボディのペイロードは破棄され、Synthetics Worker で設定されたタイムアウト制限内でリクエストにかかったレスポンス時間が返されます。

レスポンスボディが返されるのは、その内容に関するアサーションが追加されていて、そのアサーションが失敗した場合のみです。テストにレスポンスボディに対するアサーションが含まれていて、テストが成功した場合は、ボディのペイロードは破棄され、レスポンスボディの最初の 50 文字のみのスニペットが表示されます。

テストにレスポンスボディに関するアサーションが含まれていて、タイムアウトの制限に達した場合は、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: https://json-schema.org/

{{% /tab %}}
{{% tab "JavaScript" %}}

標準のレスポンスアサーションが検証ニーズを満たさない場合は、JavaScript アサーションを使用します。Synthetic Monitoring は、柔軟なアサーション方法として `dd.expect()`、`dd.should`、および `dd.assert()` を提供する [Chai アサーションライブラリ][20] を使用します。

JSON レスポンスを扱う場合は、プロパティにアクセスする前に `JSON.parse(dd.response.body)` を使用してレスポンスボディを解析します。これは、JSON データを検証する際にすべてのアサーションメソッド (`dd.assert()`、`dd.expect()`、および `dd.should`) で必要です。

{{< img src="synthetics/api_tests/JS_assertion.png" alt="HTTP API テストのための JavaScript アサーション" style="width:90%;" >}}

<div class="alert alert-info">
  <ul>
    <li>Windows プライベートロケーションでは API テストの JavaScript 機能はサポートされていません。</li>
    <li>失敗した JavaScript アサーションのエラーメッセージに機密データが含まれる可能性がある場合は、[{{< ui >}}Advanced Options{{< /ui >}}] (高度なオプション) > [{{< ui >}}Privacy{{< /ui >}}] (プライバシー) で [{{< ui >}}Do not save response body{{< /ui >}}] (レスポンスボディを保存しない) を有効にします。これにより、アサーションのエラーメッセージが切り捨てられます。</li>
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

レスポンス例

```json
{
  "status": {
    "code": 200,
    "message": "Success"
  }
}
```

このアサーションの処理内容
- JSON レスポンスボディを解析する
-  `status.code` が許容値の配列 (200、210、320、または 330) に含まれていることを確認する

このテストは**成功**します。`status.code` が `200` で、許容値の配列に含まれているからです。

`assert.include()` の詳細については、[Chai assert.include() のドキュメント][21] を参照してください。

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

レスポンス例

```json
{
  "status": {
    "indicator": "none"
  }
}
```
このアサーションの処理内容
- JSON レスポンスボディを解析する
- ネストされたプロパティ `status.indicator` が存在することを検証する
- 値が正規表現パターンと一致することを確認する (`major`、`critical`、`minor`、`none` のいずれか)

正規表現が `/^(major|critical|minor|none)$/` の場合、このテストは**成功**します。`status.indicator` が `"none"` で、このパターンと一致するからです。

正規表現が `/^(major|critical|minor)$/` の場合、このテストは**失敗**します。`"none"` が許容値に含まれていないからです。

`expect()` の詳細については、[Chai expect() のドキュメント][22] を参照してください。

#### dd.should の使用{#using-ddshould}

自然言語構文でアサーションを書くには `dd.should` を使用します。

たとえば、`status.indicator` フィールドが存在し、特定の値と等しいことをアサートするには、次のように指定します。

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
response.status.should.exist();
const indicator = response.status.indicator;
indicator.should.equal('none');
{{< /code-block >}}

レスポンス例

```json
{
  "status": {
    "indicator": "none"
  }
}
```

このアサーションの処理内容
- JSON レスポンスボディを解析する
- `status` プロパティが存在することを確認する
- indicator 値を変数に抽出する
- `status.indicator` が `"none"` と等しいことを確認する

このテストは**成功**します。`status` が存在し、`status.indicator` が `"none"` であるからです。

`should()` の詳細については、[Chai should() のドキュメント][23] を参照してください。

[20]: https://www.chaijs.com/api/
[21]: https://www.chaijs.com/api/assert/#method_include
[22]: https://www.chaijs.com/guide/styles/#expect
[23]: https://www.chaijs.com/guide/styles/#should

{{% /tab %}}
{{< /tabs >}}

### ロケーションを選択する {#select-locations}

HTTP テストを実行する {{< ui >}}Locations{{< /ui >}} を選択します。HTTP テストは、ネットワーク外部または内部のどちらから実行するかという要件に応じて、管理ロケーションと [プライベートロケーション][1] の両方から実行できます。

{{% managed-locations %}}

### テストの頻度を指定する{#specify-test-frequency}

HTTP テストは次の頻度で実行できます。

* **On a schedule** (スケジュール): 最も重要なエンドポイントにユーザーが常にアクセスできるようにします。Datadog で HTTP テストを実行する頻度を選択します。
* [**Within your CI/CD pipelines**][2] (CI/CD パイプライン内): 欠陥のあるコードがカスタマーエクスペリエンスに影響を与えることを心配せずに、デプロイを開始できます。
[* **On-demand**] (オンデマンド): チームにとって最適なタイミングでテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

## ワンクリック{#one-click}

API テストの作成は、[カタログ][17] と既存の API テストからエンドポイントを提案し、関連するオプションをテストフォームに自動入力します。
既存の Datadog データソース (APM トレース、カタログで検出されたエンドポイント、ユーザーが作成した類似の Synthetic テストなど) を活用します。

API テストの {{< ui >}}URL{{< /ui >}} に入力を開始すると、エンドポイントの候補や Synthetic Monitoring の類似テストが表示されます。

   {{< img src="synthetics/api_tests/api-one-click.png" alt="既存の API テストの GET 検索を表示している HTTP API テスト" style="width:90%;" >}}

次に、候補を選択すると、テスト構成 (リクエストオプションとヘッダー、認証、変数) が自動入力されます。

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="選択" style="width:90%;" >}}

{{% synthetics-variables %}}

### 変数を使用する{#use-variables}

HTTP テストの URL、高度なオプション、アサーションでは、[{{< ui >}}Settings{{< /ui >}}] (設定) ページで定義されたグローバル変数][11] を使用することができます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="HTTP テストでの変数の使用" video="true" width="100%" >}}

## テストの失敗 {#test-failure}

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが途中で失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが失敗することもあります。

{{< img src="synthetics/api_tests/api_test_summary_updated.png" alt="グローバルな稼働時間、アラートタイムライン、およびアラート状態の最近のテスト実行のリストを表示する [Activity] (アクティビティ) タブを開いた、HTTP API テストの詳細ページ" style="width:100%;">}}

### タイムラインの概要 {#timeline-summary}

[{{< ui >}}Summary{{< /ui >}}] (サマリー) パネルは、選択した期間内のテスト実行で失敗の原因となった、固有の問題を特定します。各問題について、パネルには次の情報が表示されます。

- {{< ui >}}First seen{{< /ui >}} (初回検出): テスト実行で問題が最初に発生した日時。
- {{< ui >}}Last seen{{< /ui >}} (最終検出): テスト実行で問題が最後に発生した日時。
- {{< ui >}}Classification{{< /ui >}} (分類): AI による失敗サマリーに基づいて、その問題が {{< ui >}}True failure{{< /ui >}} (アプリケーションの実際の問題) か {{< ui >}}Test Misconfiguration{{< /ui >}} (テスト設定の問題) かを示します。
- {{< ui >}}Description{{< /ui >}} (説明): エラーの簡単な説明。
- {{< ui >}}Latest alerts{{< /ui >}} (最新のアラート): その問題に関連する最新のアラートのリスト。

HTTP および SSL のエラーコードの完全なリストについては、「[API テストのエラー][12]」を参照してください。

## Bits Investigation を起動する {#launch-a-bits-investigation}

Synthetic HTTP テストの失敗の根本原因を特定するには、[Bits Investigation][18] を開始します。Bits Investigation は、テスト結果、トレース、ログ、およびメトリクスを分析して根本原因を明らかにし、その失敗がリグレッションによるものか、設定ミスによるものかをフラグ付けします。

## 権限 {#permissions}

デフォルトでは、[Datadog Admin および Datadog 標準のロール][13] を持つユーザーのみが、Synthetic HTTP テストを作成、編集、削除できます。Synthetic HTTP テストの作成、編集、削除のアクセスを取得するには、ユーザーをこれら 2 つの [デフォルトのロール][13] のいずれかにアップグレードします。

[カスタムロール機能][14] を使用している場合は、`synthetics_read` および `synthetics_write` の権限を含むカスタムロールにユーザーを追加します。

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
[18]: /ja/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page