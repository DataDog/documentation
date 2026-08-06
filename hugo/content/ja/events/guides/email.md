---
aliases:
- /ja/developers/events/email/
- /ja/guides/eventsemail
- /ja/service_management/events/guides/email/
title: メールによるイベント送信
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">メールを使用したイベントはサポートされていません。 {{< region-param key=dd_datacenter code="true" >}}</div>
{{< /site-region >}}

ご利用のアプリケーションに現在の [Datadog インテグレーション][1] が含まれておらず、[カスタム Agent チェック][2] の作成を希望されない場合は、イベントをメールで送信できます。これは、Amazon SNS トピックにパブリッシュされたメッセージでも実行できます。詳細については、[Amazon SNS メールから Datadog イベントを作成する][6] ガイドを参照してください。

## セットアップ {#setup}

イベントをメールで送信するには、Datadog 専用のメールアドレスを取得する必要があります。

1. [Datadog アカウント][3] にログインします。
2. 左下の {{< ui >}}Account{{< /ui >}} メニューから、{{< ui >}}Organization Settings{{< /ui >}} を選択します。
3. {{< ui >}}Events API emails{{< /ui >}} タブをクリックします。
4. {{< ui >}}Format{{< /ui >}} ドロップダウンからメッセージフォーマット (`Plain text` または `JSON v2`) を選択します。
5. 必要に応じて、このページの[属性定義セクション](#attribute-definitions)に記載されている他の属性を定義します。
6. {{< ui >}}Create Email{{< /ui >}} ボタンをクリックします。

{{< ui >}}Events API emails{{< /ui >}} セクションに、アプリケーションで利用可能なすべてのメールと、その作成者が表示されます。

### 属性定義 {#attribute-definitions}

| 名前 | 説明 | 例 |
|---|---|---|
| 説明 | メールの目的の説明。| "MyService の通知に使用" |
| タグ | メール経由で受信した各イベントに追加するタグのリスト。JSON メッセージに他のタグが含まれている場合は、それらもすべて追加されます。<br>メール 1 通につきタグは最大 **20** 個までです。| `tag1:val1`、`tag2:val2` |
| 受信者 | メールを通じて作成されたすべてのイベントのメッセージの先頭に追加するハンドルのリスト (`@` プレフィックスなし)。詳細については、[通知の受信者][7] を参照してください。<br>メール 1 通につき受信者は **10** 人までです。| `my@email.com`、`slack-acc-ch` |
| アラートタイプ | {{< ui >}}Plain text{{< /ui >}} および {{< ui >}}JSON{{< /ui >}} 形式のアドレスの場合、イベントのアラートタイプを設定します。指定されている場合、JSON メールの `alert_type` フィールドがこの設定よりも優先されます。**JSON v2 ではサポートされていません**—代わりに、メール JSON 本文でカテゴリおよび関連フィールドを設定してください。| `Info` |

## 送信 {#submission}

メールでイベントを送信する方法は、以下のタブ ({{< ui >}}JSON{{< /ui >}}、{{< ui >}}Plain text{{< /ui >}}、{{< ui >}}JSON v2{{< /ui >}}) で説明されている 3 通りあります。`JSON` 形式は新しいイベントメールアドレスでは非推奨です。この形式で新しいアドレスを作成することはできませんが、既存の `JSON` アドレスは引き続き機能します。JSON 形式のメールを送信する新しいアプリケーションには、`JSON v2` を使用してください。

{{< tabs >}}
{{% tab "JSON" %}}

アプリケーションから送信されるメールを完全に制御できる場合は、JSON 形式のメッセージを送信できます。メール本文は、[**Events API v1**][1] (`POST /api/v1/events`) の JSON 形式に従う必要があります。{{< ui >}}v1{{< /ui >}} API バージョンを選択して、リクエスト本文のフィールドを確認してください。メール本文の JSON によって、Datadog に表示されるイベントフィールドが設定されます。

### メールの送信元 {#source-email-1}

`JSON` 形式のメールでは、次のフィールドを変更できます。

* 送信者のメールアドレス
* [**Events API v1**][1] でサポートされているすべてのフィールド (例: `title`、`text`、`tags`、`alert_type`)

**注**: JSON が適切にフォーマット化されていない場合や、件名が空欄の状態でメールが送信された場合は、イベントがイベントストリームに表示されません。

### Datadog イベント {#datadog-event-1}

`JSON` 形式のメールでは、メールの件名はイベントに表示されません。title 属性の値がイベントタイトルとして使用されます。イベントに表示されるすべてのデータは、メール本文の JSON 内で定義する必要があります。さらに、本文は純粋で正しい形式の JSON である必要があります。そうでない場合、メッセージは無視されます。JSON で送信されたイベントの例:

{{< img src="extend/events/json-event.png" alt="JSON イベント" >}}

**注**: 標準的なメールクライアントでメールをテストする場合、本文が HTML に変換されることがあります。これにより、本文が純粋な JSON ではなくなり、メールが無視されます。

[1]: /ja/api/latest/events/#post-an-event
{{% /tab %}}
{{% tab "プレーンテキスト" %}}

アプリケーションから送信されるメールを部分的にしか制御できない場合は、プレーンテキスト形式のメッセージを使用します。

### メールの送信元 {#source-email-2}

プレーンテキスト形式のメールでは、次のフィールドを制御できます。

| フィールド                | 必須 | 説明                     |
|----------------------|----------|---------------------------------|
| 送信者のメールアドレス | はい      | 送信者のメールアドレス |
| 件名              | はい      | メールの件名        |
| 本文                 | はい      | メールの本文           |

送信が有効なメールの例を以下に示します。

```text
Sender's email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### メール本文の処理 {#email-body-2}
メールの本文は、読みやすさとセキュリティを向上させるために、いくつかのクリーンアップ手順を経て処理されます。予想される変更は以下のとおりです。

- **HTML から Markdown へ**: HTML コンテンツは、対応する Markdown に変換されます。
- **HTML サニタイズ**: セキュリティのため、メール本文はサニタイズされ、特定の HTML タグのみが許可されます: `a`、`br`、`caption`、`code`、`div`、`em`、`h1`、`h2`、`h3`、`h4`、`h5`、`h6`、`hr`、`iframe`、`img`、`li`、`ol`、`p`、`pre`、`span`、`strong`、`table`、`tbody`、`td`、`tfoot`、`th`、`thead`、`tr`、`ul`。`<>` で囲まれた文字列を含む、その他の HTML タグはすべて削除されます。
- **返信/転送コンテンツの削除**: スレッド内の最新のメールのみが保持され、古い返信や転送は削除されます。

### Datadog イベント {#datadog-event-2}

メールの件名がイベントタイトルになり、メール本文がイベントメッセージになります。メールの送信元はイベントの下部に表示されます。メッセージ本文で `#` を使用してタグを追加できます。

Datadog は、これらのデフォルトのフィールド制限を超える値を切り捨てます。

| フィールド   | 最大値         |
|---------|-----------------|
| タイトル   | 300 文字  |
| メッセージ | 4000 文字 |
| タグ    | 200 タグ        |

プレーンテキストで送信されたイベントの例:

{{< img src="extend/events/plain-event.png" alt="プレーンイベント" >}}

{{% /tab %}}
{{% tab "JSON v2" %}}

アプリケーションから送信されるメールを完全に制御できる場合は、JSON 形式のメッセージを送信できます。メール本文は [**Events API v2**][1] (`POST /api/v2/events`) の JSON 形式に従う必要があります。メール本文の JSON によって、Datadog に表示されるイベントフィールドが設定されます。

### メールの送信元 {#source-email-json-v2}

`JSON v2` 形式のメールでは、次のフィールドを変更できます。

* 送信者のメールアドレス
* [**Events API v2**][1] でサポートされているすべてのフィールド (例: `data.attributes.title`、`data.attributes.message`、`data.attributes.tags`、`data.attributes.category`)

アラートイベントのメール本文の例。変更イベントと情報イベントでは `data.attributes.attributes` 配下の異なるフィールドを使用します。これらのカテゴリについては、API リファレンスを参照してください。

```json
{
  "data": {
    "attributes": {
      "category": "alert",
      "title": "CPU threshold exceeded",
      "message": "Host prod-web-01 averaged 92% CPU for five minutes.",
      "tags": [
        "env:production",
        "region:us-east"
      ],
      "integration_id": "custom-events",
      "attributes": {
        "status": "error",
        "priority": "3"
      }
    },
    "type": "event"
  }
}
```

**注**: JSON が適切にフォーマット化されていない場合や、件名が空欄の状態でメールが送信された場合は、イベントがイベントストリームに表示されません。

### Datadog イベント {#datadog-event-json-v2}

`JSON v2` 形式のメールでは、メールの件名はイベントに表示されません。JSON 本文の title フィールドの値がイベントタイトルとして使用されます。イベントに表示されるすべてのデータは、メール本文の JSON 内で定義する必要があります。さらに、本文は純粋で正しい形式の JSON である必要があります。そうでない場合、メッセージは無視されます。

**注**: 標準的なメールクライアントでメールをテストする場合、本文が HTML に変換されることがあります。これにより、本文が純粋な JSON ではなくなり、メールが無視されます。

[1]: /ja/api/latest/events/#post-an-event
{{% /tab %}}
{{< /tabs >}}

### Markdown {#markdown}

Datadog イベントテキストは [Markdown][5] をサポートしていますが、Markdown 内への HTML の埋め込みはサポートされていません。イベントテキストで Markdown を使用するには、テキストブロックを `%%% \n` で開始し、`\n %%%` で終了します。

```json
{
  "title": "Did you hear the news today?",
  "text": "%%% \n [an example link](http://example.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

Markdown ブロックにリンクを埋め込む場合は、URL が正しくエンコードされていることを確認してください。

```text
# Not encoded
http://example.com/session_id:123456

# Encoded
http://example.com/session_id%3A123456
```

### メールサイズ {#email-size}
コンテンツや添付ファイルを含む、許可されるメールの最大サイズは 20 MB です。この制限を超えるメールは無視されます。

### 使用状況の追跡 {#usage-tracking}
どのメールが使用され、イベントを受信しているかを確認するには、組織設定の {{< ui >}}Events API Emails{{< /ui >}} タブにある {{< ui >}}Last Used{{< /ui >}} 列を確認してください。各アドレスについて、メールが最後に処理された日付、または使用記録が存在しない場合は {{< ui >}}No data{{< /ui >}} が表示されます。

[1]: /ja/integrations/
[2]: /ja/agent/agent_checks/
[3]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: /ja/integrations/guide/events-from-sns-emails/
[7]: /ja/monitors/notify/#notification-recipients