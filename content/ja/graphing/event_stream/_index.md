---
title: イベントストリーム
kind: documentation
aliases:
  - /ja/guides/eventsemail
  - /ja/guides/eventcorrelation/
  - /ja/guides/markdown/
---
## イベントクエリ言語

いくつかのイベントプロパティでフィルターすることで、検索を絞り込むことができます。詳細は、以下のフィルターリストを参照してください。
フィルターは完全一致検索を行います。部分文字列には対応していないことに注意してください。

| フィルター                                            | 説明                                                                              |
| --------                                          | -------------                                                                            |
| `user:pup@datadoghq.com`                          | pup@datadoghq.com によるコメント付きのすべてのイベントを検索します。                                      |
| `sources:github,chef`                             | GitHub または Chef からのイベントを表示します。                                                         |
| `tags:env-prod OR db`                             | #env-prod または #db でタグ付けされたイベントを表示します。                                                |
| `tags:security-group:sg-123 AND role:common-node` | `#security-group:sg-123` と `#role:common-node` でタグ付けされたイベントを表示します。                |
| `hosts:i-0ade23e6,db.myapp.com`                   | i-0ade23e6 または db.myapp.com からのイベントを表示します。                                             |
| `status:error`                                    | error ステータスのイベントを表示します。(サポートされるステータス: **error**、**warning**、**success**)           |
| `priority:low`                                    | 優先度が低い (low) イベントのみを表示します。(サポートされる優先度: **low** または **normal**。デフォルトは **all**)    |
| `cloud_provider:* NOT "azure"`                    | "azure" でタグ付けされたプロバイダーを除くすべてのクラウドプロバイダーを表示します。                             |

フィルターの適用後に、検索クエリで提供されたすべてのキーワードに対する全文検索が行われます。全文検索は、イベントのテキスト、タイトル、タグ、イベントにコメントしたユーザー、イベントに関連付けられたホスト名およびデバイスから、すべての関連情報を検索します。

タグ検索を使用すると、以下のクエリを使用して、同じキータグを持つすべてのイベントを検索できます。

| フィルター               | 説明                                                                    |
| ----                 | ---                                                                            |
| `tags:<KEY>:<VALUE>` | `<KEY>:<VALUE>` タグを持つイベントを表示します。                                     |
| `tags:<VALUE>`       | `<KEY>` の値に関係なく、`<VAlUE>` がアタッチされたすべてのイベントを表示します。            |
| `<KEY>:*`            | `<KEY>` がアタッチされたすべてのイベントを表示します。                                    |
| `<KEY>`:`<REGEX>`    | `<VALUE>` が `<REGEX>` と一致する `<KEY>:<VALUE>` タグを持つすべてのイベントを表示します。|
| `tags:<KEY>`         | 何も表示されません。                                                       |
| `<KEY>:<VALUE>`      | 何も表示されません。                                                       |

複合クエリで複数の条件を組み合わせるには、以下のブール演算子のいずれかを使用します。

| 演算子 | 説明                                                                                                                      | 例                             |
| ----     | ----                                                                                                                             | -----                               |
| `AND`    | **積**: 両方の条件を含むイベントが選択されます (タグの場合は、何も追加しなければ、`AND` がデフォルトで採用されます)。                        | `redis_* AND down`                  |
| `OR`     | **和**: いずれかの条件を含むイベントが選択されます。タグの場合はカンマ (`,`) を使用します。                                                    | `sources:nagios,chef directory OR Mixlib`    |
| `NOT`    | **排他**: 後続の条件はイベントに含まれません。この演算子は文字列に対してのみ機能します。タグの場合は直前に `-` を使用します。 | `-tags:<KEY>:<VALUE> NOT "<STRING>"` |


**注**: 高度なクエリ言語機能の一部 (ブール論理など) は、イベントストリームページでのみ動作し、グラフタイルやスクリーンボードウィジェットでは動作しません。

プレフィックスを組み合わせて、さらに複雑な検索を作成できます。たとえば、`chef` または `nagios` のオープンエラーのうち、`cassandra` に言及しているエラーをすべて検索する場合は、次のように検索します。

`sources:nagios,chef status:error cassandra`

**注**: リスト内のコロンやカンマの後にスペースを入れないでください。プレフィックスが付いていない文字列は、全文検索のキーワードになります。

## 未集計のイベントの表示

 イベントを集計しないでイベントストリームに表示するには、イベントストリームの右上にある **Aggregate related events** トグルをオフにします。

{{< img src="graphing/events/event_stream_aggregated.png" alt="Aggregated event stream" responsive="true" style="width:50%;" >}}

## イベント電子メール

アプリケーションまたはシステムを Datadog と統合する必要がある場合は、いくつかのオプションがあります。1 つは、既存の [Datadog インテグレーション][1]のいずれかを使用する方法です。
この場合、お客様は最小限の設定作業を行うだけで、さまざまなメトリクスやイベントにアクセスできます。アプリケーションが統合アプリケーションでない場合は、[Agent を使用してカスタムチェックを作成][2]することになります。この場合は作業量が増え、アプリケーションと Datadog の機能についてより多くの知識が必要になります。

また、インテグレーションが用意されたアプリケーションを使用せず、Agent チェックも作成したくない場合は、別のオプションがあります。それには、アプリケーションまたはシステムによる電子メール送信を利用します。電子メールからのイベントを使用するには、送信される電子メール本文の形式をカスタマイズする機能がアプリケーションにあるかどうかに応じて、以下の 2 つの方法があります。

<div class="alert alert-info">
<b>JSON 形式とプレーンテキスト</b> <br>
アプリケーションから Datadog に送信される電子メールを完全に制御できる場合は、JSON 形式のメッセージが送信されるように設定するとよいでしょう。
これにより、イベントストリームに表示されるすべてイベントを設定できます。
 それぞれの例については、以下を参照してください。
</div>

### プレーンテキスト電子メール
#### ソース電子メール

ソースとなるプレーンテキスト電子メールでは、送信者の電子メールアドレス (必須)、件名 (必須)、本文 (任意) の 3 つのフィールドのみを制御します。

{{< img src="graphing/events/plain-email.png" alt="plain email" responsive="true" >}}

#### Datadog イベント

{{< img src="graphing/events/plain-event.png" alt="plain event" responsive="true" >}}

電子メールの件名はイベントのタイトルになり、電子メールの本文はイベントの本文になります。イベントのタイトルと本文の末尾にタグが表示されているように見えますが、実際にはどちらもタグではありません。イベントの下部には電子メールの送信者が表示されるため、これを利用して送信側のアプリケーションを特定することができます。

### JSON 電子メール
#### ソース電子メール

ソースとなる JSON 形式の電子メールでは、送信者の電子メールアドレスと最大 9 個の JSON キーの合計 10 個のフィールドを制御できます。9 個のキーとは、タイトル、テキスト、優先度、タグ、警告タイプ、発生日、ホスト、集計キー、およびソースタイプ名です。
**メモ: JSON が正しい形式でなかったり、電子メールに件名を付けて送信したりすると、イベントはイベントストリームに表示されません。**

{{< img src="graphing/events/json-email.png" alt="json email" responsive="true" >}}

#### Datadog イベント

{{< img src="graphing/events/json-event.png" alt="json event" responsive="true" >}}

JSON 形式の電子メールでは、電子メール本文内の JSON に含まれるタイトルが使用されるため、電子メールメッセージの件名は意味を持ちません。イベントに表示されるデータはすべて、電子メール本文内の JSON で定義されます。この JSON が正しい形式でなければ、メッセージは無視されます。つまり、カンマ区切りのキー/値ペアとして正しいだけでなく、純粋に JSON として正しくなければなりません。
標準的な電子メールクライアントで電子メールをテストすると、一般ユーザー向けとして本文が HTML に変換されることがあります。この場合は、JSON が JSON でなくなってしまい、電子メールは Datadog に無視されます。

使用できる JSON キーについては、[イベント API リファレンス][3]を参照してください。

### 電子メールアドレスの設定

電子メールを設定するには、まず [https://app.datadoghq.com][4] で Datadog アカウントにログインします。**Integrations** メニューから **APIs** を選択し、**Events API Emails** まで下へスクロールします。このセクションには、アプリケーションで使用できるすべての電子メールとその作成者が表示されます。Format: ドロップダウンからメッセージの形式を選択し、**Create API Email** をクリックします。

{{< img src="graphing/events/event-email-api.png" alt="JSON Event Email API" responsive="true" >}}


## マークダウンイベント
Datadog のイベントテキストはマークダウンをサポートしています ([詳細なマークダウン構文はこちら][5])。
ただし、マークダウンへの HTML の埋め込みは、Datadog ではサポートされていません。

イベントテキストでマークダウンを使用する場合は、テキストブロックを `%%% \n` で開始し、`\n %%%` で終わる必要があります。

次に例を示します。
```json
{
      "title": "Did you hear the news today?",
      "text": "%%% \n [an example link](http://catchpoint.com/session_id \"Title\") \n %%%",
      "priority": "normal",
      "tags": ["environment:test"],
      "alert_type": "info"
}
```

注: マークダウンブロックにリンクを埋め込む場合は、URL を適切にエンコードしてください。

たとえば、`http://catchpoint.com/session_id:123456` という URL があるとします。

これは、`http://catchpoint.com/session_id%3A123456` のようにエンコードする必要があります。

## @ 通知

* `@support-datadog` – ストリームにポストされると、Datadog のサポートチームに直接届きます。
* `@all` – オーガニゼーションの全メンバーに通知を送信します。
* `@yourname` – 'yourname' という名前の特定のユーザーに通知します。
* `@test@example.com` – 電子メールを `test@example.com` に送信します。
* Slack、Webhooks、Pagerduty、または VictorOps を使用している場合は、以下を使用できます。
    * `@slack-[room-name]` – イベントまたはグラフをチャットルームに投稿します。
    * `@webhook` – Webhook にアタッチされているイベントをアラートまたはトリガーします。[Webhooks に関するブログ記事][6]を参照してください。
    * `@pagerduty` – Pagerduty にアラートを送信します。`@pagerduty-acknowledge` と `@pagerduty-resolve` も使用できます。


[1]: /ja/integrations
[2]: /ja/agent/agent_checks
[3]: /ja/api/#events
[4]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio