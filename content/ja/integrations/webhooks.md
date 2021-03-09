---
"categories":
- "notification"
"ddtype": "crawler"
"dependencies": []
"description": 「Datadog のアラートやイベントで任意の Webhook を通知チャンネルとして使用します。」
"doc_link": "https://docs.datadoghq.com/integrations/webhooks/"
"draft": false
"git_integration_title": "Webhooks"
"has_logo": true
"integration_title": "Webhooks"
"is_public": true
"kind": "インテグレーション"
"manifest_version": "1.0"
"name": "Webhooks"
"public_title": 「Datadog-Webhooks インテグレーション」
"short_description": 「Datadog のアラートやイベントで任意の Webhook を通知チャンネルとして使用します。」
"version": "1.0"
---

## 概要

Webhook を使用して、以下のことができます。

-   ご使用のサービスに接続できます。
-   メトリクスアラートがトリガーされたときにサービスにアラートを送信できます。

## セットアップ

[Webhooks インテグレーションタイル][1]に移動して、使用する Webhook の URL と名前を入力します。

## 使用方法

Webhook を使用するには、Webhook をトリガーするメトリクスアラートのテキストに `@webhook-<WEBHOOK_NAME>` を追加します。これにより、以下の内容を JSON 形式で含む POST リクエストが、設定した URL に向けてトリガーされます。各リクエストのタイムアウトは 15 秒です。Datadog は、内部エラー (不正な形式の通知メッセージなど) が発生した場合、または Webhook エンドポイントから 5XX 応答を受け取った場合にのみ、再試行を発行します。失敗した接続は 5 回再試行されます。

**注**: カスタムヘッダーは JSON フォーマットである必要があります。

ペイロードフィールドに独自のペイロードを指定して、リクエストに独自のカスタムフィールドを追加することもできます。ペイロードを URL エンコードする場合は、**Encode as form** をオンにし、JSON 形式でペイロードを指定します。以下の変数を使用できます。

| 変数            | 意味                                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| $AGGREG_KEY         | 所属が同じイベントを集約するための ID _(例: 9bd4ac313a4d1e8fae2482df7b77628)_。                                                          |
| $ALERT_CYCLE_KEY    | アラートがトリガーした時点から解決するまでイベントにリンクする ID                                                                          |
| $ALERT_ID           | アラートの ID _(例: 1234)_                                                                                                                   |
| $ALERT_METRIC       | メトリクスがアラートの場合は、メトリクスの名前 _(例: `system.load.1`)_                                                                                |
| $ALERT_PRIORITY     | モニターのアラート設定優先度 _(例: `P1`、`P2`)_                                                                                        |
| $ALERT_QUERY        | Webhook をトリガーしたモニターのクエリ                                                                                              |
| $ALERT_SCOPE        | アラートをトリガーしたタグのカンマ区切りリスト _(例: `availability-zone:us-east-1a, role:computing-node`)_                              |
| $ALERT_STATUS       | アラートステータスのサマリー _(例: system.load.1 over host:my-host was > 0 at least once during the last 1m)_                               |
| $ALERT_TITLE        | アラートのタイトル                                                                                                                           |
| $ALERT_TRANSITION   | アラート通知のタイプ _(値: `Recovered`, `Triggered`/`Re-Triggered`, `No Data`/`Re-No Data`, `Warn`/`Re-Warn`, `Renotify`)_         |
| $ALERT_TYPE         | アラートのタイプ                                                                                                                            |
| $DATE               | イベントが発生した日付 _(epoch)_(例: 1406662672000)_                                                                              |
| $EMAIL              | Webhook をトリガーしたイベントをポストしたユーザーの電子メール                                                                               |
| $EVENT_MSG          | イベントのテキスト _(例: @webhook-url Sending to the webhook)_                                                                              |
| $EVENT_TITLE        | イベントのタイトル _(例: \[Triggered] \[Memory Alert])_                                                                                    |
| $EVENT_TYPE         | イベントのタイプ (値: `metric_alert_monitor`, `event_alert`, または `service_check`)                                                         |
| $HOSTNAME           | イベントに関連付けられたサーバーのホスト名 (ある場合)                                                                        |
| $ID                 | イベントの ID _(例: 1234567)_                                                                                                            |
| $INCIDENT_COMMANDER | JSON オブジェクトとインシデントコマンダーのハンドル、uuid、名前、メール、およびアイコン                                                                 |
| $INCIDENT_FIELDS    | インシデントフィールドからその値に対する、それぞれの JSON オブジェクトマッピング _(例: `{"state": "active", "datadenter": ["eu1", "us1"]}`)_                 |
| $INCIDENT_PUBLIC_ID | 関連するインシデントのパブリック ID _(例: 123)_                                                                                            |
| $INCIDENT_TITLE     | インシデントのタイトル                                                                                                                        |
| $LAST_UPDATED       | イベントが最後に更新された日付                                                                                                         |
| $LINK               | イベントの URL _(例: `https://app.datadoghq.com/event/jump_to?event_id=123456`)_                                                         |
| $LOGS_SAMPLE        | ログモニターアラートからのログサンプル                                                                                                          |
| $METRIC_NAMESPACE   | メトリクスがアラートの場合は、メトリクスのネームスペース                                                                                                     |
| $ORG_ID             | オーガニゼーションの ID _(例: 11023)_                                                                                                      |
| $ORG_NAME           | オーガニゼーションの名前 _(例: Datadog)_                                                                                                  |
| $PRIORITY           | イベントの優先度 _(値:`normal` または `low`)_                                                                                           |
| $SNAPSHOT           | イベントにスナップショットが含まれている場合は、そのイメージの URL _(例: `https://url.to.snpashot.com/`)_                                                   |
| $TAGS               | イベントタグのカンマ区切りリスト _(例: `monitor, name:myService, role:computing-node`)_                                              |
| $TEXT_ONLY_MSG      | マークダウン書式設定なしのイベントのテキスト                                                                                                |
| $USER               | Webhook をトリガーしたイベントをポストしたユーザー _(例: rudy)_                                                                             |
| $USERNAME           | Webhook をトリガーしたイベントをポストしたユーザーのユーザー名                                                                            |

### Authentication

認証を必要とするサービスに Webhook をポストする場合は、URL を `https://my.service.example.com` から `https://<USERNAME>:<PASSWORD>@my.service.example.com` に変更することで、Basic HTTP 認証を使用できます。

### 複数の Webhook

モニターアラートで、2 つ以上の Webhook エンドポイントが通知を受けた場合、サービスレベルごとに 1 つの Webhook キューが作成されます。たとえば、PagerDuty と Slack にアクセスする場合、Slack Webhook での再試行は PagerDuty の Webhook に影響しません。

ただし、PagerDuty のスコープ内では、いくつかイベントは常に他のイベントより前に送信されます。たとえば、"Acknowledge" ペイロードは必ず "Resolution" の前に送信されます。"Acknowledge" の ping が失敗すると、"Resolution" の ping は、再試行ロジックによってキューに入れられます。

## 例

### Twilio を使用した SMS の送信

使用する URL:
`https://<ACCOUNT_ID>:<AUTH_TOKENT>@api.twilio.com/2010-04-01/Accounts/<ACCOUNT_ID>/Messages.json`

ペイロードの例:

```json
{
    "To": "+1347XXXXXXX",
    "From": "+1347XXXXXX",
    "Body": "$EVENT_TITLE \n Related Graph: $SNAPSHOT"
}
```

`To` は自分の電話番号、`From` は Twilio から割り当てられた番号に置き換えます。**Encode as form** チェックボックスは、オンにします。

### Jira での課題の作成

使用する URL:
`https://<JIRA_USER_NAME>:<JIRA_PASSWORD>@<YOUR_DOMAIN>.atlassian.net/rest/api/2/issue`

ペイロードの例:

```json
{
    "fields": {
        "project": {
            "key": "YOUR-PROJECT-KEY"
        },
        "issuetype": {
            "name": "Task"
        },
        "description": "問題が発生しました。グラフ: $SNAPSHOT およびイベント: $LINK"を参照してください,
        "summary": "$EVENT_TITLE"
    }
}
```

"Encode as form" チェックボックスはオンにしないでください。

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks

