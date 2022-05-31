---
categories:
- notification
ddtype: crawler
dependencies: []
description: 「Datadog のアラートやイベントで任意の Webhook を通知チャンネルとして使用します。」
doc_link: https://docs.datadoghq.com/integrations/webhooks/
draft: false
git_integration_title: Webhooks
has_logo: true
integration_id: ''
integration_title: Webhooks
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: Webhooks
public_title: 「Datadog-Webhooks インテグレーション」
short_description: 「Datadog のアラートやイベントで任意の Webhook を通知チャンネルとして使用します。」
version: '1.0'
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

ペイロードフィールドに独自のペイロードを指定して、リクエストに独自のカスタムフィールドを追加することもできます。ペイロードを URL エンコードする場合は、**Encode as form** をオンにし、JSON 形式でペイロードを指定します。以下のセクションの変数を使用できます。

### 変数

$AGGREG_KEY
: 一緒に属するイベントを集約するための ID。<br />
**例**: `9bd4ac313a4d1e8fae2482df7b77628`

$ALERT_CYCLE_KEY
: アラートがトリガーした時点から解決するまでイベントにリンクする ID。

$ALERT_ID
: アラートの ID。<br />
**例**: `1234`

$ALERT_METRIC
: アラートの場合はメトリクスの名前。<br />
**例**: `system.load.1`

$ALERT_PRIORITY
: アラートモニターの優先度。<br />
**例**: `P1`、`P2`

$ALERT_QUERY
: Webhook をトリガーしたモニターのクエリ。

$ALERT_SCOPE
: アラートをトリガーしたタグのカンマ区切りリスト。<br />
**例**: `availability-zone:us-east-1a, role:computing-node`

$ALERT_STATUS
: アラートステータスのサマリー。<br />
**例**: `system.load.1 over host:my-host was > 0 at least once during the last 1m`

$ALERT_TITLE
: アラートのタイトル。

$ALERT_TRANSITION
: アラート通知のタイプ。<br />
**例**: `Recovered`、`Triggered`/`Re-Triggered`、`No Data`/`Re-No Data`、`Warn`/`Re-Warn`、`Renotify`

$ALERT_TYPE
: アラートのタイプ。

$DATE
: イベントが発生した日付 _(epoch)_。<br />
**例**: `1406662672000`

$EMAIL
: Webhook をトリガーしたイベントをポストしたユーザーの電子メール。

$EVENT_MSG
: イベントのテキスト。<br />
**例**: `@webhook-url Sending to the webhook`

$EVENT_TITLE
: イベントのタイトル。<br />
**例**: `[Triggered] [Memory Alert]`

$EVENT_TYPE
: イベントのタイプ。<br />
**例**: `metric_alert_monitor`、`event_alert`、または `service_check`.

$HOSTNAME
: イベントに関連付けられたサーバーのホスト名 (ある場合)。

$ID
: イベントの ID。<br />
**例**: `1234567`

$INCIDENT_ATTACHMENTS
: インシデントの添付 (事後分析やドキュメントなど) のある JSON オブジェクトのリスト。<br />
**例**: `[{"attachment_type": "postmortem", "attachment": {"url": "https://app.datadoghq.com/notebook/123","title": "Postmortem IR-1"}}]` 

$INCIDENT_COMMANDER
: JSON オブジェクトとインシデントコマンダーのハンドル、uuid、名前、メール、およびアイコン

$INCIDENT_CUSTOMER_IMPACT
: インシデントの顧客への影響のステータス、期間、スコープを含む JSON オブジェクト。<br />
**例**: `{"customer_impacted": true, "customer_impact_duration": 300 ,"customer_impact_scope": "scope here"}`

$INCIDENT_FIELDS
: 各インシデントのフィールドを値にマッピングする JSON オブジェクト。<br />
**例**: `{"state": "active", "datacenter": ["eu1", "us1"]}`

$INCIDENT_PUBLIC_ID
: 関連するインシデントのパブリック ID。<br />
**例**: `123`

$INCIDENT_TITLE
: インシデントのタイトル。

$INCIDENT_SEVERITY
: インシデントの重大度。

$INCIDENT_STATUS
: インシデントのステータス。

$INCIDENT_URL
: インシデントの URL。<br />
**例**: `https://app.datadoghq.com/incidents/1`

$INCIDENT_MSG
: インシデント通知のメッセージ。<br />

$LAST_UPDATED
: イベントが最後に更新された日付。

$LINK
: イベントの URL。<br />
**例**: `https://app.datadoghq.com/event/jump_to?event_id=123456`

$LOGS_SAMPLE
: ログモニターアラートからのログサンプル

$METRIC_NAMESPACE
: メトリクスがアラートの場合は、メトリクスのネームスペース

$ORG_ID
: オーガニゼーションの ID。<br />
**例**: `11023`

$ORG_NAME
: オーガニゼーションの名前。<br />
**例**: `Datadog`

$PRIORITY
: イベントの優先度。<br />
**例**: `normal` または `low`

$SECURITY_RULE_NAME
: セキュリティルールの名前。

$SECURITY_SIGNAL_ID
: シグナルの一意の識別子。<br />
**例**: `AAAAA-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`

$SECURITY_SIGNAL_SEVERITY
: セキュリティシグナルの重大度。<br />
**例**: `medium`

$SECURITY_SIGNAL_TITLE
: セキュリティシグナルのタイトル。

$SECURITY_SIGNAL_MSG
: セキュリティシグナルのメッセージ。

$SECURITY_SIGNAL_ATTRIBUTES
: セキュリティシグナルの属性。<br />
**例**: `{"network":{"client":{"ip":"1.2.3.4"}}}`

$SECURITY_RULE_ID
: セキュリティルール ID。<br />
**例**: `aaa-aaa-aaa`

$SECURITY_RULE_QUERY
: セキュリティルールに関連付けられた 1 つまたは複数のクエリ。<br />
**例**: `["@evt.name:authentication"]`

$SECURITY_RULE_GROUP_BY_FIELDS
: キーと値のペアによるセキュリティグループ。<br />
**例**: `{"@usr.name":"john.doe@your_domain.com"}`

$SECURITY_RULE_TYPE
: セキュリティルールの種類。<br />
**例**: `log_detection`

$SNAPSHOT
: イベントにスナップショットが含まれている場合の画像の URL。<br />
**例**: `https://p.datadoghq.com/path-to-snapshot`

$SYNTHETICS_TEST_NAME
: Synthetics テストの名前。

$SYNTHETICS_FIRST_FAILING_STEP_NAME 
: Synthetics テストの最初の失敗したステップの名前。

$SYNTHETICS_SUMMARY
: Synthetic テストの詳細の概要<br />
**例**:
```
{
  "result_id": "1871796423670117676",
  "test_type": "browser",
  "test_name": "Test name",
  "date": "Nov 05, 2021, 09:49AM UTC",
  "test_url": "https://app.datadoghq.com/synthetics/edit/apc-ki3-jwx",
  "result_url": "https://app.datadoghq.com/synthetics/details/anc-ki2-jwx?resultId=1871796423670117676",
  "location": "Frankfurt (AWS)",
  "browser": "Chrome",
  "device": "Laptop Large"
  "failing_steps": [
    {
      "error_message": "Error: Element's content should contain given value.",
      "name": "Test span #title content",
      "is_critical": true,
      "number": "3.1"
    }
  ],
}
```

$TAGS
: イベントタグのカンマ区切りリスト。<br />
**例**: `monitor, name:myService, role:computing-node`

$TEXT_ONLY_MSG
: マークダウン書式設定なしのイベントのテキスト。

$USER
: Webhook をトリガーしたイベントをポストしたユーザー。<br />
**例**: `rudy`

$USERNAME
: Webhook をトリガーしたイベントをポストしたユーザーのユーザー名。

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