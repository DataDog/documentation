---
title: Webhooks を使用した Freshservice チケット
author: Trevor Veralrud
further_reading:
  - link: /integrations/webhooks/
    tag: Documentation
    text: Webhooks インテグレーション
---
このガイドでは、Datadog Webhooks インテグレーションを使用して、モニターがアラートを出すときに、Freshservice で新しいチケットを開く方法について説明します。

## セットアップ

最初に [Webhooks インテグレーションタイル][1]を開き、Configuration タブに移動して画面の一番下にあるフォームまでスクロールし、新しい Webhook を追加します。

### 名前

Webhook に名前を付けます。この名前がモニターメッセージに `@webhook-<名前>` で表示されます。たとえば、Webhook に freshservice という名前を付けた場合、モニターメッセージで `@webhook-freshservice` をメンションすれば、モニターからチケットを開くことができます。

### URL

Freshservice には 2 つのバージョンの API があります。このガイドでは V2 を使用しますが、JSON ペイロードに少し修正を加えれば、V1 を使用することもできます。

URL フィールドに、次のエンドポイントを入力します。

`https://<YOUR_DOMAIN>.freshservice.com/api/v2/tickets`

### ペイロード

新しいチケットの JSON ペイロードを入力します。次の例は、必須フィールドだけを使用しています。ペイロードのカスタマイズオプションについて、詳しくは [Freshservice のチケットエンドポイント][2]を参照してください。

```json
{
  "email": "[チケットに関連付けるメールアドレス]",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2
}
```

**注**:

* `$EVENT_TITLE` などの値は、Webhook インテグレーションで使用される変数です。この変数の一覧と、それぞれの意味については、Webhook インテグレーションタイル、または [Webhook インテグレーションのドキュメント][3]を参照してください。
* email フィールドには `$EMAIL` 変数を使用せず、メールアドレスを直接入力してください。この変数は、Webhook をイベントストリームでメンションする場合にのみ値が入力され、*モニターアラート*内では使用されません。
* ペイロードの `description` フィールドは HTML を受け取ります。`$EVENT_MSG` 変数は、モニターのメッセージを Markdown で表示しますが、Freshservice の API には対応していないため、上記の例では `$TEXT_ONLY_MSG` をグラフのスナップショットと一緒に使用しています。
* `status` と `priority` のフィールドには、さまざまな値に対応付けられた数値を指定します。これらの値については、[Freshservice によるチケットエンドポイントの情報][2]を参照してください。

### Authentication

Freshservice の API は、[Basic 認証][4]を使用します。Base64 でエンコードされた資格情報を、`Authorization` リクエストヘッダーで送る必要があります。ユーザー名とパスワードを `ユーザー名:パスワード` の形式で入力するか、または Freshservice API のキーを、資格情報として送ることができます。

Webhook でこれを設定するには、以下を **Headers** セクションに追加します。

```json
{"Authorization": "Basic <BASE64でエンコードされた資格情報>"}
```

### 最後に

Webhook インテグレーションタイルで、**Install Integration** または（以前に Webhook の定義を入力していれば）**Update Configuration** をクリックし、変更を保存します。

## 使用方法

`@webhook-<名前>` をモニターメッセージに追加します。モニターの状態が変わると Webhook がトリガーされます。

@ メンションは、以下の例のように `{{#is_alert}}` または `{{#is_warning}}` 条件の内部に追加することをお勧めします。

```text
{{#is_alert}}
    {{host.name}} がダウンしました！
    @webhook-freshservice
{{/is_alert}}
```

モニターがアラートをトリガーすると、新しいチケットが Freshservice のダッシュボードに表示されます。条件付きステートメントを使用しない場合は、モニターが回復したときに Webhook がもう一度トリガーされるため、新しいチケットが作成されます。

## 制限

### チケットの作成

Webhooks インテグレーションで可能なのはチケットの作成だけです。既存のチケットを更新するには `PUT` メソッドが必要ですが、Webhooks インテグレーションがサポートするのは `POST` メソッドだけです。

### ステータスと優先度

`$ALERT_STATUS` と `$PRIORITY` の変数は、Freshservice の API が期待する数値ではなく、（`ALERT` や `NORMAL` などの）文字列を返します。さまざまなレベルのステータスやプライオリティを設定するには、重複する Webhook を作成して、ステータスとプライオリティのフィールドをハードコーディングし、それらの Webhook を関連する条件付きステートメントの内部で `@-メンション` してください。以下に例を示します。

```text
{{#is_warning}}
    ディスクスペースの使用率が 80% を超えました
    @webhook-freshservice-warning
{{/is_warning}}
{{#is_alert}}
    ディスクスペースの使用率が 95% を超えました
    @webhook-freshservice-alert
{{/is_alert}}
```

### タグ付け

タグ付けは Freshservice API でサポートされていますが、以下の点に注意してください。

* JSON ペイロードの tags パラメーターは、配列にする必要があります。つまり、Webhook の `$TAGS` 変数は（コンマで区切られた文字列のリストを返すので）使用できません。
* JSON ペイロードに追加するタグに `:` の文字を含めると、Datadog のすべてのタグを Freshservice に対応付けできない場合があるので避けてください。タグに `:` の文字が存在すると、リクエストが失敗します。
* Freshservice のタグに使用できる変数について詳しくは、[Webhook インテグレーションのドキュメント][3]を参照してください。以下の例では、`$HOSTNAME` と `$ORG_ID` が使用されています。

```json
{
  "email": "<チケットに関連付けるメールアドレス>",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2,
  "tags": ["$HOSTNAME", "$ORG_ID"]
}
```

### トラブルシューティング

モニターのトリガー後に Webhook が送信に失敗する場合は、イベントストリームに移動して、`sources:webhooks` `status:error` を探してください。Webhooks が失敗したイベントを探し、そこに含まれる情報（以下の例を参照）をトラブルシューティングに使用することができます。

```text
- Reply status code was: HTTP 401
- Reply content was:
  {"code":"invalid_credentials","message":"You have to be logged in to perform this action."}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks
[2]: https://api.freshservice.com/v2/#create_ticket
[3]: /ja/integrations/webhooks/#usage
[4]: https://en.wikipedia.org/wiki/Basic_access_authentication