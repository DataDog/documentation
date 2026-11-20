---
description: HMAC を使用した HTTP テストの作成方法をご紹介します。
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: ドキュメント
  text: HTTP テストについて
- link: /synthetics/api_tests/http_tests#variables
  tag: ドキュメント
  text: Synthetic テスト変数について
title: HMAC 認証を使った HTTP テストの作成
---
## 概要{#overview}

Synthetic モニタリングでは、JavaScript のスクリプトから変数を生成できるので、カスタム認証を定義したり、パラメーターをエンコードしたりすることができます。

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="HMAC 認証を使用した HTTP テスト" style="width:100%;" >}}

このガイドでは、スクリプトの変数を使用して、HMAC 署名付きの HTTP テストを作成する方法を説明します。

**注**: 標準的な HMAC 認証というものは存在しないため、独自の HMAC 認証は多少異なる場合があります。例えば、異なるヘッダー名を使用する場合があります。

## セットアップ {#setup}

### ローカル変数を使って HMAC 認証の構成要素を作成する {#create-the-building-blocks-of-hmac-authentication-using-local-variables}

[Synthetic HTTP テスト][3]を作成し、{{< ui >}}Create a Local Variable{{< /ui >}} をクリックして、以下の変数を追加します。

`MY_SECRET_KEY`
: メッセージに署名するために使用される UTF-8 エンコードされたキー（[global variable][4]からインポートすることもできます）。

`BODY`
: リクエストの本文 ({{< ui >}}Request Body{{< /ui >}} に設定) で、HMAC 認証の計算処理に使用されます。

`DATETIME`
: HMAC 署名を計算するためのパラメーター。これは [ローカル変数][1] として作成するか、[variable from script script](#compute-the-hmac-signature-with-javascript) 内で `dd.variable.set('DATETIME', new Date().toISOString())` を使用して作成およびエクスポートすることができます。

### テスト用のURLとリクエスト本文を定義します{#define-a-test-url-and-request-body}

HTTP テストの URL とリクエストタイプを定義します。次に、{{< ui >}}Advanced Options{{< /ui >}} > {{< ui >}}Request Body{{< /ui >}} をクリックして、` を追加します。{{ BODY }}` 変数をリクエスト本文として使用します。

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="HTTP テストのリクエスト本文として設定されたローカル変数" style="width:80%;" >}}

### JavaScript で HMAC 署名を計算する {#compute-the-hmac-signature-with-javascript}

{{< ui >}}Variable From Script{{< /ui >}} をクリックして、HTTP リクエストの HMAC 署名を生成します。

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="JavaScript で生成されたローカル変数" style="width:80%;" >}}

このスクリプトは、Datadog が HTTP リクエストを送信する前に実行されます。リクエスト完了後に JSON レスポンスデータを検証するには、[JavaScript アサーション][7]と `dd.response.body` を使用します。

* スクリプトに変数をインポートするには、`dd.variable.get("<variable_name>")` を使用します。
* 変数を定義するには、`dd.variable.set("<variable_name>", <value>)` または `dd.variable.setObfuscated("<variable_name>", <value>)` を使用します。

また、以下のようなヘルパー関数にもアクセス可能です。
* [`std` ライブラリ][5] の大部分は、`std.*` でアクセスできます。例えば、`encodeHex`で定義された関数 `@std/encoding/hex.ts` を呼び出すには、`std.encoding.hex.encodeHex` を使用します。
* [Web Crypto API][6] などの標準的な JavaScript API。

**注**: これらの API の一部はセキュリティ上の理由で無効になっています。

例:

{{< code-block lang="JavaScript" filename="Variable from Script" collapsible="true" >}}
const datetime = new Date().toISOString();
// Set a "date" HTTP header using DATETIME as its value in the UI
dd.variable.set("DATETIME", datetime);

const message = "Hello, World!";
// Use BODY as the request body in the UI
dd.variable.set("BODY", message);

const secretKeyUtf8 = dd.variable.get("MY_SECRET_KEY");
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secretKeyUtf8),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);

const rawSignature = await crypto.subtle.sign(
  { name: "HMAC" },
  key,
  new TextEncoder().encode(datetime + "." + message)
);

// Set an "authentication" HTTP header using SIGNATURE as its value in the UI
dd.variable.set("SIGNATURE", std.encoding.hex.encodeHex(rawSignature));

// Alternative:
dd.variable.set("SIGNATURE_BASE64", std.encoding.base64.encode(rawSignature));
{{< /code-block >}}

### リクエストヘッダーに HMAC 署名を追加する {#add-the-hmac-signature-to-the-request-header}

エクスポートされた `SIGNATURE` 変数を使用して、HTTP リクエストヘッダーを構築します。

{{< ui >}}Request Options{{< /ui >}} タブで、{{< ui >}}Name{{< /ui >}} を `Authentication` に、{{< ui >}}Value{{< /ui >}} を ` に設定したヘッダーを追加します。{{ SIGNATURE }}`, and another one with {{< ui >}}Name{{< /ui >}} を `Date` and {{< ui >}}Value{{< /ui >}} を ` に設定します。{{ DATETIME }}`. You can define a different header such as `Authorization`。

HTTP テストの残りの部分を構成し、{{< ui >}}Create{{< /ui >}} をクリックして保存します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /ja/synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /ja/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://jsr.io/@std
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto
[7]: /ja/synthetics/api_tests/http_tests/#define-assertions