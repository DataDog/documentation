---
title: 概要
type: apicontent
order: 1
external_redirect: '/api/#overview'
---
## 概要
このセクションでは、HTTP API について取り上げ、Datadog でのデータの入出力の方法を説明します。

**Datadog の HTTP API を使用するには、[Datadog Postman コレクション][1]をご利用ください**

Datadog の API はリソース指向 URL を使用しています。リクエストの成否はステータスコードで示し、すべてのリクエストに対し JSON オブジェクトを返します。以下で具体的な仕組みを見ていきます。

**注**: cURL コードの例は、 BASH および GNU Core Utilities を使用することを想定したものです。macOS をお使いの方は [Homebrew package manager][2] から Coreutils をダウンロードして、次のコマンドでインストールが可能です: `brew install coreutils`

[1]: /ja/getting_started/api
[2]: https://brew.sh