---
kind: faq
title: Webhook インテグレーションを利用して Trello カードを作成する
---

[Webhook インテグレーション][1]を利用して、[@通知機能][2]を使って Trello カードを即座に作成することができます。

このフローでは、Trello REST POST カード API エンドポイントを使用して、関連する Trello リストに @通知を投稿します。

## 概要

* Trello のアプリキーとトークンを探す

* カードを送信したいボード内のリストを探す

* Webhook を構成する

## Trello のアプリキーとトークンを取得する

Trello にログインし、[Trello のアプリケーションキーとトークン][3]を取得します。

**注**: Trello では、URL の中に API キーが記載されています。本記事では、API キーとアプリキーは同じものです。

{{< img src="developers/faq/developer_api_key.png" alt="developer_api_key" >}}

トークンを取得するには、上記のトークンリンク (緑の矢印) をクリックし、ログインしている Trello アカウントでトークンを認可し、その後のリンクでトークンを取得してください。
{{< img src="developers/faq/trello_api_key.png" alt="trello_api_key" >}}

## Trello のリストを指定する

カードを追加したいリスト内のカードをクリックします。URL に `.json` を付加し、その URL に移動します。
{{< img src="developers/faq/card_url.png" alt="card_url" >}}

そこから、`idList` の値を探します。
{{< img src="developers/faq/id_list.png" alt="id_list" >}}

## Webhook を構成する

[Trello カードの API ドキュメント][4]、Datadog の [Webhook インテグレーション][1]をご参照ください

構成で

* "name" はこのフックを参照する際のエイリアスです (@webhook-NAME)

* "URL" は `https://api.trello.com/1/cards` です

Custom Payload を有効にして、以下のような JSON オブジェクトを記入します。

```json
{
  "name": "$USER : $EVENT_TITLE",
  "desc": "$EVENT_MSG",
  "key": "{APP_KEY}",
  "token": "{TOKEN_KEY}",
  "pos": "bottom",
  "idList": "{ID_LIST_VALUE}"
}
```

* **name**: カードのタイトル
* **desc**: カードの説明
* **key**: アプリケーションキー
* **token**: トークンキー
* **pos**: リスト上のカードの相対位置
* **idList**: リスト ID

できあがった構成は次のようになります。
{{< img src="developers/faq/integration_config.png" alt="integration_config" >}}

## 考慮すべきいくつかのポイント

このフローには、Trello がアプリケーション用のサーバートークンを生成するプロセスが含まれます。トークンの免責事項にある通り、
{{< img src="developers/faq/trello_disclaimer.png" alt="trello_disclaimer" >}}

トークンは、あなたのすべてのボードとチームへの読み取り/書き込みアクセスを提供するので、この方法でアクセスを渡したくない場合、これは潜在的な懸念事項です。

これを避けるには、指定したボードにのみ参加する特定の Trello ユーザーを作成することを検討してください。そのユーザーにサーバートークンを受け取らせてください。

[1]: /ja/integrations/webhooks/
[2]: /ja/monitors/notify/
[3]: https://trello.com/app-key
[4]: https://trello.com/guide