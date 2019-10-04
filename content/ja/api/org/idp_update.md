---
title: IdP メタデータのアップロード
type: apicontent
order: 27.4
external_redirect: /api/#upload-idp-metadata
---

## IdP メタデータのアップロード

現在の SAML IdP から Identity Provider (IdP) メタデータを更新するためのオプションがいくつかあります。

* **マルチパートフォームデータ**: フォームポストを使用して IdP メタデータファイルをポストします。
* **XML 本文**: リクエストの本文として IdP メタデータファイルをポストします。

### マルチパートフォームデータ

##### ヘッダー
* **`Content-Type: multipart/form-data`**

##### 引数
* **`idp_file`** [必須]:
     アップロードする XML メタデータファイルのパス。

### XML 本文

##### ヘッダー
* **`Content-Type: application/xml`**

##### 引数
本文には IdP メタデータ XML ファイルの内容が含まれている必要があります。
