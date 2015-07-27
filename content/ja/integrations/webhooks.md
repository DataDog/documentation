---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-Webhooks Integration
integration_title: Webhooks
kind: integration
doclevel: basic
---

<!-- ### Overview
 {:#int-overview}

With Webhooks you'll be able to:

- Connect to your services.
- Alert your services when a metric alert is triggered. -->

### 概要
 {:#int-overview}

WebhooksとDatadogを連携することにより次のようなことが可能になります:

- 他のサービスと連携する
- メトリクスを基にしたアラートが発生した際に、連携したサービスに通知する


<!-- ### Setup
{:#int-setup}

To create a webhook, just enter the URL and a name. Then to use your
webhook in Datadog, just add @webhook-name_of_the_webhook in the
text of the metric alert you want to trigger the webhook. It will
trigger a POST request to the URL you set with the following content in JSON format.

You can also specify your own payload in order to add your own fields to the request.  Check the "Use Custom Payload" checkbox and specify your own custom payload, using the following variables.  If you want your payload to be URL-encoded, check the "Encode as form" payload and
specify your payload in a json format.

    $ID : ID of the event (ex: 1234567)
    $EVENT_TITLE: Title of the event (ex: [Triggered] [Memory Alert])
    $EVENT_MSG: Text of the event (ex: @webhook-url Sending to the webhook)
    $EVENT_TYPE: Type of the event (ex: metric_alert_monitor)
    $DATE: Date (epoch) where the event happened (ex: 1406662672000)
    $AGGREG_KEY: ID to aggregate events belonging together (ex: 9bd4ac313a4d1e8fae2482df7b77628)
    $ORG_ID: ID of your organization (ex: 11023)
    $ORG_NAME: Name of your organization (ex: Datadog)
    $USER: User posting the event that triggered the webhook (ex: rudy)
    $SNAPSHOT: Url of the image if the event contains a snapshot (ex: https://url.to.snpashot.com/)
    $LINK: Url of the event (ex: https://app.datadoghq.com/event/jump_to?event_id=123456)
    $PRIORITY: Priority of the event (ex: normal)
    $TAGS: Comma-separated list of the event tags (ex: monitor,name:myService,role:computing-node)
    $ALERT_ID: ID of alert (ex: 1234)
    $ALERT_METRIC: Name of the metric if it's an alert (ex: system.load.1)
    $ALERT_TRANSITION: Type of alert notification (ex: Triggered)
    $ALERT_STATUS: Summary of the alert status (ex: system.load.1 over host:my-host was > 0 at least once during the last 1m)

If you want to post your webhooks to a service requiring authentication, you can Basic HTTP authentication my modifing your URL from
`https://my.service.com` to `https://username:password@my.service.com`. -->

### 設定
{:#int-setup}

webhooksインテグレーションを設定するには、`Integrations`タブ-->`Integrations`ドロップダウンメニューと移動し、webhookインテグレーションの設定用ポップアップ画面で、接続先サービスのwebhook URLとそのサービスの名前を入力します。webhookを使ってメッセージを送信するには、アラートの通知欄やイベントでメッセージを書き込む際に、 @webhook-name_of_the_webhook と記述します。この記述を使うことで、アラートの発生時やイベントメッセージに書き込みをした時に、webhookインテグレーションが、設定先URLに対してjson形式でメッセージをPOSTするようになります。

jsonによりペイロードを設定することで、HTTPリクエストに独自のフィールドを追加することが出来ます。

    {
        "id":"$ID",
        "title":"$EVENT_TITLE",
        "last_updated": "$LAST_UPDATED",
        "date": "$DATE",
        "event_type":"$EVENT_TYPE",
        "body":"$EVENT_MSG",
        "org":{
            "id":"$ORG_ID",
            "name":"$ORG_NAME"
            }
    }

webhookインテグレーションの設定用ポップアップ画面内の"Use Custom Payload"欄にチェックマークを入れ、json形式で次に示す変数を指定していきます。

    $ID : ID of the event (ex: 1234567)
    $EVENT_TITLE: Title of the event (ex: [Triggered] [Memory Alert])
    $EVENT_MSG: Text of the event (ex: @webhook-url Sending to the webhook)
    $EVENT_TYPE: Type of the event (ex: metric_alert_monitor)
    $DATE: Date (epoch) where the event happened (ex: 1406662672000)
    $AGGREG_KEY: ID to aggregate events belonging together (ex: 9bd4ac313a4d1e8fae2482df7b77628)
    $ORG_ID: ID of your organization (ex: 11023)
    $ORG_NAME: Name of your organization (ex: Datadog)
    $USER: User posting the event that triggered the webhook (ex: rudy)
    $SNAPSHOT: Url of the image if the event contains a snapshot (ex: https://url.to.snpashot.com/)
    $LINK: Url of the event (ex: https://app.datadoghq.com/event/jump_to?event_id=123456)
    $PRIORITY: Priority of the event (ex: normal)
    $TAGS: Comma-separated list of the event tags (ex: monitor,name:myService,role:computing-node)
    $ALERT_ID: ID of alert (ex: 1234)
    $ALERT_METRIC: Name of the metric if it's an alert (ex: system.load.1)
    $ALERT_TRANSITION: Type of alert notification (ex: Triggered)
    $ALERT_STATUS: Summary of the alert status (ex: system.load.1 over host:my-host was > 0 at least once during the last 1m)

最後に、ペイロードをURLエンコードしたい場合は、"Encode as form"欄にチェックマークをつけます。

webhookの認証を必要とするサービスと連携するには、HTTPのベーシック認証を使い、登録するURLの部分を次のように書き換えて下さい。

`https://my.service.com` ---> `https://username:password@my.service.com`


<!-- ### Examples

#### Sending SMS through Twilio
{:#ex-twilio}

Use as URL:

`https://{Your-Account-id}:{Your-Auth-Token}@api.twilio.com/2010-04-01/Accounts/{Your-Account-id}/Messages.json`

and as payload

    {
        "To":"+1347XXXXXXX",
        "From":"+1347XXXXXX",
        "Body":"$EVENT_TITLE \n Related Graph: $SNAPSHOT"
    }

replacing `To` by your phone number and `From` by the one twilio attributed to you.  Check the "Encode as form" checkbox.

#### Creating an issue in Jira
{:#ex-jira}

Use as URL:

`https://jirauser:jirapassword@yourdomain.atlassian.net/rest/api/2/issue`

and as payload

    {
        "fields": {
            "project": {
                "key": "YOUR-PROJECT-KEY"
                },
            "issuetype": {
                "name": "Task"
            },
            "description": "There is an issue Look at the following graph: $SNAPSHOT and checkout the event at $LINK",
            "summary": "$EVENT_TITLE"
        }
    }

Don't check the "Encode as form" checkbox. -->

### サンプル

#### Twilioを使って、SMSを送信する
{:#ex-twilio}

URLは記述は次のように記述します:

`https://{Your-Account-id}:{Your-Auth-Token}@api.twilio.com/2010-04-01/Accounts/{Your-Account-id}/Messages.json`

送信するjsonは次のように記述します。

    {
        "To":"+1347XXXXXXX",
        "From":"+1347XXXXXX",
        "Body":"$EVENT_TITLE \n Related Graph: $SNAPSHOT"
    }

`To`の部分に送信先電話番号を記載し、`From`の部分にtwilioで取得した電話番号を記載します。URLの先のjsonをエンコードて追加するために、"Encode as form"の欄にチェックマークを追加します。

#### Creating an issue in Jira
{:#ex-jira}

URLは記述は次のようになります:

`https://jirauser:jirapassword@yourdomain.atlassian.net/rest/api/2/issue`

送信するjsonは次のようになります。

    {
        "fields": {
            "project": {
                "key": "YOUR-PROJECT-KEY"
                },
            "issuetype": {
                "name": "Task"
            },
            "description": "There is an issue Look at the following graph: $SNAPSHOT and checkout the event at $LINK",
            "summary": "$EVENT_TITLE"
        }
    }

Jiraの場合、先にjsonで記載した内容をURLエンコードしない為、"Encode as form" の欄にチェックマークが入っていないことを確認して下さい。
