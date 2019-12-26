---
categories:
- notification
ddtype: クローラー
dependencies: []
description: Datadog のアラートやイベントで任意の Webhook を通知チャンネルとして使用
doc_link: https://docs.datadoghq.com/integrations/webhooks/
git_integration_title: webhook
has_logo: true
integration_title: Webhook
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: webhook
public_title: Datadog-Webhook インテグレーション
short_description: Datadog のアラートやイベントで任意の Webhook を通知チャンネルとして使用
  events.
version: '1.0'
---

## 概要

Webhook を使用して、以下のことができます。

* ご使用のサービスに接続できます。
* メトリクスアラートがトリガーされたときにサービスにアラートを送信できます。

## セットアップ
### コンフィグレーション

[Webhooks インテグレーションタイル][1]に移動して、使用する Webhook の URL と名前を入力します。

## 使用方法

Webhook を使用するには、Webhook をトリガーするメトリクスアラートのテキストに **@webhook-*name_of_the_webhook*** を追加します。これにより、以下の内容を JSON 形式で含む POST リクエストが、設定した URL に向けてトリガーされます。各リクエストのタイムアウトは 15 秒です。

独自のペイロードを指定して、リクエストに独自のカスタムフィールドを追加することもできます。**Use Custom Payload** チェックボックスをオンにし、以下の変数を使用してカスタムペイロードを指定します。ペイロードを URL エンコードする場合は、**Encode as form** をオンにし、JSON 形式でペイロードを指定します。

|変数|意味|
|-----|-----|
|$AGGREG_KEY| 所属が同じイベントを集約するための ID (例: 9bd4ac313a4d1e8fae2482df7b77628)|
|$ALERT_CYCLE_KEY|アラートがトリガーした時点から解決するまでイベントにリンクする ID|
|$ALERT_ID| アラートの ID (例: 1234)|
|$ALERT_METRIC| メトリクスがアラートの場合は、メトリクスの名前 (例: `system.load.1`)|
|$ALERT_QUERY| Webhook をトリガーしたモニターのクエリ|
|$ALERT_SCOPE| アラートをトリガーしたタグのカンマ区切りリスト (例: `availability-zone:us-east-1a, role:computing-node`)|
|$ALERT_STATUS| アラートステータスのサマリー (例: system.load.1 over host:my-host was >  0 at least once during the last 1m)|
|$ALERT_TITLE| アラートのタイトル|
|$ALERT_TRANSITION| アラート通知のタイプ (値: `Recovered`、`Triggered`/`Re-Triggered`、`No Data`/`Re-No Data`、`Warn`/`Re-Warn`、`Null`、`Renotify`)|
|$ALERT_TYPE| アラートのタイプ|
|$DATE| イベントが発生した日付 (Epoch) (例: 1406662672000)|
|$EMAIL| Webhook をトリガーしたイベントをポストしたユーザーの電子メール|
|$EVENT_MSG| イベントのテキスト (例: @webhook-url Sending to the webhook)|
|$EVENT_TITLE| イベントのタイトル (例: \[Triggered] \[Memory Alert]) |
|$EVENT_TYPE| イベントのタイプ (値: `metric_alert_monitor`、`event_alert`、または `service_check)
|$HOSTNAME|イベントに関連付けられたサーバーのホスト名 (ある場合)|
|$ID | イベントの ID (例: 1234567)|
|$LAST_UPDATED| イベントが最後に更新された日付|
|$LINK| イベントの URL (例: `https://app.datadoghq.com/event/jump_to?event_id=123456`)|
|$LOGS_SAMPLE| ログモニターアラートからのログサンプル|
|$METRIC_NAMESPACE|メトリクスがアラートの場合は、メトリクスのネームスペース|
|$ORG_ID| オーガニゼーションの ID (例: 11023)|
|$ORG_NAME| オーガニゼーションの名前 (例: Datadog)|
|$PRIORITY| イベントの優先度 (値: `normal` または `low`)|
|$SNAPSHOT| イベントにスナップショットが含まれている場合は、そのイメージの URL (例: https://url.to.snpashot.com/)|
|$TAGS| イベントタグのカンマ区切りリスト (例: `monitor, name:myService, role:computing-node`)|
|$TEXT_ONLY_MSG|マークダウン書式設定なしのイベントのテキスト|
|$USER| Webhook をトリガーしたイベントをポストしたユーザー (例: rudy)|
|$USERNAME|Webhook をトリガーしたイベントをポストしたユーザーのユーザー名|

認証を必要とするサービスに Webhook をポストする場合は、URL を `https://my.service.com` から `https://username:password@my.service.com` に変更することで、Basic HTTP 認証を使用できます。

### 複数の Webhook
モニターアラートで、2 つ以上の Webhook エンドポイントが通知を受けた場合、サービスレベルごとに 1 つの Webhook キューが作成されます。たとえば、PagerDuty と Slack にアクセスする場合、Slack Webhook での再試行は PagerDuty の Webhook に影響しません。

ただし、PagerDuty のスコープ内では、いくつかイベントは常に他のイベントより前に送信されます。たとえば、"Acknowledge" ペイロードは必ず "Resolution" の前に送信されます。"Acknowledge" の ping が失敗すると、"Resolution" の ping は、再試行ロジックによってキューに入れられます。

#### Webhook が失敗した場合、キューはどのように動作しますか
サービス X の Webhook の失敗はサービス Y の Webhook に影響しません。

#### Webhook が失敗する (5XX 応答または内部エラー) 原因は何ですか
Datadog は、内部エラー (不正な形式の通知メッセージなど) が発生した場合、または Webhook エンドポイントから 5XX 応答を受け取った場合にのみ、再試行を発行します。失敗した接続は 5 回再試行されます。

### 例
#### Twilio を使用した SMS の送信

使用する URL:
`https://{Your-Account-id}:{Your-Auth-Token}@api.twilio.com/2010-04-01/Accounts/{Your-Account-id}/Messages.json`

ペイロードの例:

```
    {
        "To":"+1347XXXXXXX",
        "From":"+1347XXXXXX",
        "Body":"$EVENT_TITLE \n Related Graph: $SNAPSHOT"
    }
```


`To` は自分の電話番号、`From` は Twilio から割り当てられた番号に置き換えます。**Encode as form** チェックボックスは、オンにします。

#### Jira での課題の作成

使用する URL:
`https://{Your-Jira-Username}:{Your-Jira-Password}@{Your-Domain}.atlassian.net/rest/api/2/issue`

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
        "description": "There's an issue. See the graph: $SNAPSHOT and event: $LINK",
        "summary": "$EVENT_TITLE"
    }
}
```

"Encode as form" チェックボックスはオンにしないでください。

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks


{{< get-dependencies >}}
