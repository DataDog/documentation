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

## 概要

Synthetic モニタリングでは、JavaScript のスクリプトから変数を生成できるので、カスタム認証を定義したり、パラメーターをエンコードしたりすることができます。

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="HMAC 認証を使った HTTP テスト" style="width:100%;" >}}

このガイドでは、スクリプトの変数を使用して、HMAC 署名付きの HTTP テストを作成する方法を説明します。

**注**: 標準的な HMAC 認証は存在しないため、実際にご利用になる HMAC 認証は若干異なる可能性があります。例えば、使用するヘッダー名が異なる場合があります。

## セットアップ

### ローカル変数を使って HMAC 認証の構成要素を作成する

[Synthetic HTTP テスト][3]を作成し、**Create a Local Variable** をクリックして、以下の変数を追加します。

`MY_SECRET_KEY`
: メッセージの署名に使用される UTF-8 でエンコードされた鍵 ([グローバル変数][4]からインポートすることも可能)。

`BODY`
: リクエストの本文 (**Request Body** に設定)で、HMAC 認証の計算処理に使用されます。

`DATETIME`
: HMAC 署名を計算するためのパラメーター。[ローカル変数][1]として作成するか、`dd.variable.set('DATETIME', new Date().toISOString())` を使って[スクリプトからの変数](#compute-the-hmac-signature-with-javascript)内で作成してエクスポートすることができます。

### テスト URL とリクエスト本文の定義

HTTP テストの URL とリクエストタイプを定義します。次に、**Advanced Options** > **Request Body** をクリックして、変数 `{{ BODY }}` をリクエスト本文として追加します。

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="HTTP テストのリクエスト本文として設定されたローカル変数" style="width:80%;" >}}

### JavaScript で HMAC 署名を計算する

**Variable From Script** をクリックして、HTTP リクエストの HMAC 署名を生成します。

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="JavaScript で生成されたローカル変数" style="width:80%;" >}}

* 変数をスクリプトにインポートするには、`dd.variable.get("<variable_name>")` を使用します。
* 変数を定義するには、`dd.variable.set("<variable_name>", <value>)` または`dd.variable.setObfuscated("<variable_name>", <value>)` を使用します。

また、以下のようなヘルパー関数にもアクセス可能です。
* [`std` ライブラリ][5]の大部分は、`std.*` でアクセスできます。例えば、`@std/encoding/hex.ts` で定義されている関数 `encodeHex` を呼び出すには、`std.encoding.hex.encodeHex` を使用します。
* [Web Crypto API][6] などの標準的な JavaScript API。

**注***: これらの API の一部はセキュリティ上の理由で無効になっています。

例:

{{< code-block lang="JavaScript" filename="Variable from Script" collapsible="true" >}}
const datetime = new Date().toISOString();
// "日付" の HTTP ヘッダーを設定し、DATETIME を UI におけるその値として使用します
dd.variable.set("DATETIME", datetime);

const message = "Hello, World!";
// BODY を UI におけるリクエスト本文として使用します
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

// "認証" の HTTP ヘッダーを設定し、SIGNATURE を UI におけるその値として使用します
dd.variable.set("SIGNATURE", std.encoding.hex.encodeHex(rawSignature));

// 別の方法:
dd.variable.set("SIGNATURE_BASE64", std.encoding.base64.encode(rawSignature));
{{< /code-block >}}

### リクエストヘッダーに HMAC 署名を追加する

エクスポートされた変数 `SIGNATURE` を使用して、HTTP リクエストヘッダーを構築します。

**Request Options** タブで、`Name` を `Authentication` に、`Value` を `{{ SIGNATURE }}` に設定したヘッダーと、`Name` を `Date` に、`Value` を `{{ DATETIME }}` に設定したヘッダーを追加します。`Authorization` など別のヘッダーを定義することもできます。

HTTP テストの残りの部分を構成し、**Create** をクリックして保存します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /ja/synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /ja/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://jsr.io/@std
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto