---
title: E メールによるイベント送信
kind: documentation
aliases:
  - /ja/guides/eventsemail
---
ご利用のアプリケーションに現在の [Datadog インテグレーション][1]が含まれておらず、[カスタム Agent チェック][2]の作成を希望されない場合は、イベントをE メールで送信できます。

## セットアップ

イベントを E メールで送信するには、Datadog から専用の E メールアドレスを取得する必要があります。

1. [Datadog アカウント][3]にログインします。
2. **Integrations** メニューに移動し、**APIs** を選択します。
3. **Events API Emails** を展開します。
4. **Format** ドロップダウンからメッセージのフォーマット (`Plain text` または `JSON`) を選択します。
5. **Create API Email** ボタンをクリックします。

**Events API Emails** セクションに、アプリケーションで利用可能なすべての E メールと、その作成者が表示されます。

## 送信

E メールによるイベントの送信方法は 2 つあります。

{{< tabs >}}
{{% tab "JSON" %}}

アプリケーションから送信される E メールを完全に制御できる場合は、JSON 形式のメッセージを構成できます。JSON 形式では、Datadog に表示されるイベントのすべてを設定できます。

### E メールの送信元 {#E メールの送信元-1}

JSON 形式の E メールでは、次のフィールドを変更できます。

* 送信者の E メールアドレス
* [Datadog イベント API][1] のすべての引数

**注意**: JSON が適切にフォーマット化されていない場合や、件名が空欄の状態でE メールが送信された場合は、イベントがイベントストリームに表示されません。

### Datadog イベント {#Datadog イベント 1}

JSON 形式の E メールでは、E メールの件名はイベントに表示されません。タイトルの属性値はイベントタイトルに使用されます。イベントに表示されるすべてのデータは、E メールの本文内に JSON 形式で定義される必要があります。また、本文が完全に適格な JSON 形式で定義されている必要があり、定義されていない場合、メッセージは無視されます。JSON を使用して送信されたイベントの例を以下に示します。

{{< img src="developers/events/json-event.png" alt="JSON イベント"  >}}

**注意**: 標準的な E メールクライアントで E メールをテストすると、本文が HTML に変換されることがあります。これにより本文が完全な JSON 形式ではなくなるため、E メールが無視されます。

[1]: /ja/api/#events
{{% /tab %}}
{{% tab "Plain text" %}}

アプリケーションから送信される E メールを部分的にしか制御できない場合は、プレーンテキスト形式のメッセージを使用します。

### E メールの送信元 {#E メールの送信元 2}

プレーンテキスト形式の E メールでは、次のフィールドを制御できます。

| フィールド                | 必須 | 説明                     |
|----------------------|----------|---------------------------------|
| 送信者の E メールアドレス | はい      | 送信者の E メールアドレス |
| 件名              | はい      | E メールの件名        |
| 本文                 | いいえ       | E メールの本文           |

送信が有効な E メールの例を以下に示します。
```text
Sender's Email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### Datadog イベント {#Datadog イベント 2}

E メールの件名はイベントのタイトルに、E メールの本文はイベントのメッセージになります。E メールの送信者はイベントの一番下に表示されます。プレーンテキストにより送信されたイベントの例を以下に示します。

{{< img src="developers/events/plain-event.png" alt="プレーンイベント"  >}}

**注意**: タイトルとイベント本文の最後部にタグが表示されているように見えますが、どちらも実際にはタグではありません。

{{% /tab %}}
{{< /tabs >}}

### Markdown

Datadog イベントのテキストは [Markdown][4] に対応していますが、Markdown に埋め込まれた HTML には対応していません。イベントテキスト内で Markdown を使用するには、テキストブロックを `%%% \n` で開始し、`\n %%%` で閉じます。

```json
{
  "title": "本日のニュースをお届けします",
  "text": "%%% \n [サンプルリンク](http://catchpoint.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

Markdown ブロックにリンクを埋め込む場合は、URL が正しくエンコードされていることを確認してください。

```text
# エンコードされていない
http://catchpoint.com/session_id:123456

# エンコードされている
http://catchpoint.com/session_id%3A123456
```

[1]: /ja/integrations
[2]: /ja/agent/agent_checks
[3]: https://app.datadoghq.com
[4]: http://daringfireball.net/projects/markdown/syntax#lin