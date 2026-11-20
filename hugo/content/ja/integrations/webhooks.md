---
app_id: webhook
categories:
- developer tools
- notifications
custom_kind: integration
description: Webhooks を使って自社サービスと連携しましょう！
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/webhook
  tag: terraform
  text: Webhooks (Terraform)
media: []
title: Webhook
---
## 概要

Webhook を使用して、以下のことができます。

- ご使用のサービスに接続できます。
- メトリクスアラートがトリガーされたときにサービスにアラートを送信できます。

## セットアップ

[Webhooks インテグレーション タイル](https://app.datadoghq.com/integrations/webhooks) に移動し、使用する webhook の URL と名前を入力してください。

## Usage

webhook を利用するには、webhook をトリガーしたいメトリクス アラートの本文に `@webhook-<WEBHOOK_NAME>` を追加します。これにより、設定した URL に対して、次の内容を含む JSON 形式の POST リクエストが送信されます。

Datadog は、内部エラー (不正な形式の通知メッセージなど) が発生した場合、または Webhook エンドポイントから 5XX 応答を受け取った場合にのみ再試行を行います。各リクエストのタイムアウトは 15 秒で、接続失敗時には最大 5 回まで再試行されます。

**注**:

- カスタム ヘッダーは JSON 形式で指定する必要があります。リクエストに独自のカスタム フィールドを追加したい場合は、Payload フィールドで独自のペイロードを指定することもできます。ペイロードを URL エンコードしたい場合は、 **Encode as form** チェック ボックスをオンにし、ペイロードを JSON 形式で指定してください。次のセクションの変数を使用します。
- HIPAA の制約により、Datadog は Webhooks 経由でセキュリティ通知を送信しません。Datadog の通知で、 **Finding** に含まれるセキュリティ上の弱点、または **Signals** 内の Security 製品を参照する場合、 **Notify the following recipients** 設定で `@webhook...` を使用できません。HIPAA を有効化したアカウントでは、セキュリティ アラートは webhook に送信されません。これらのアラートを webhook に送信したい場合は、例外の適用について Datadog のアカウント チームまでお問い合わせください。

### 変数

$AGGREG_KEY
: 一緒に属するイベントを集約するための ID。<br />
**例**: `9bd4ac313a4d1e8fae2482df7b77628`

$ALERT_CYCLE_KEY
: アラートがトリガーした時点から解決するまでイベントにリンクする ID。

$ALERT_ID
: アラートを発行するモニターの ID です。<br />
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
: アラートステータスの概要です。<br />
**例**: `system.load.1 over host:my-host was > 0 at least once during the last 1m`
**注**: Logs Monitor アラートからの Webhook ペイロードでこの変数を入力するには、Webhook インテグレーションタイルで `$ALERT_STATUS` を手動で追加する必要があります。

$ALERT_TITLE
: アラートのタイトル。<br />
**例**: `[Triggered on {host:ip-012345}] Host is Down`

$ALERT_TRANSITION
: アラート通知のタイプ。<br />
**例**: `Recovered`、`Triggered`/`Re-Triggered`、`No Data`/`Re-No Data`、`Warn`/`Re-Warn`、`Renotify`

$ALERT_TYPE
: アラートのタイプ。<br />
**例**: `error`、`warning`、`success`、`info`

$DATE
: イベントが発生した日時を、エポック (ミリ秒) で表した値です。<br />
**例**: `1406662672000`

$DATE_POSIX
: イベントが発生した日時を、POSIX エポック (秒) で表した値です。<br />
**例**: `1406662672`

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
[イベントタイプ](#event-types)の一覧は、[例](#examples)をご覧ください。

$HOSTNAME
: イベントに関連付けられたサーバーのホスト名 (ある場合)。

$ID
: イベントの ID。<br />
**例**: `1234567`

$INCIDENT_ATTACHMENTS
: ポストモーテムやドキュメントなど、インシデントに添付されたファイルを表す JSON オブジェクトのリストです。<br />
**例**: `[{"attachment_type": "postmortem", "attachment": {"documentUrl": "https://app.datadoghq.com/notebook/123","title": "Postmortem IR-1"}}]`

$INCIDENT_COMMANDER
: JSON オブジェクトとインシデントコマンダーのハンドル、uuid、名前、メール、およびアイコン

$INCIDENT_CUSTOMER_IMPACT
: インシデントの顧客への影響のステータス、期間、スコープを含む JSON オブジェクト。<br />
**例**: `{"customer_impacted": true, "customer_impact_duration": 300 ,"customer_impact_scope": "scope here"}`

$INCIDENT_FIELDS
: 各インシデントのフィールドを値にマッピングする JSON オブジェクト。<br />
**例**: `{"state": "active", "datacenter": ["eu1", "us1"]}`

$INCIDENT_INTEGRATIONS
: Slack や Jira など、インシデントのインテグレーションを持つ JSON オブジェクトのリスト。<br />
**例**: `[{"uuid": "11a15def-eb08-52c8-84cd-714e6651829b", "integration_type": 1, "status": 2, "metadata": {"channels": [{"channel_name": "#incident-1", "channel_id": "<channel_id>", "team_id": "<team_id>", "redirect_url": "<redirect_url>"}]}}]`

$INCIDENT_MSG
: インシデント通知のメッセージ。<br />

$INCIDENT_PUBLIC_ID
: 関連するインシデントのパブリック ID。<br />
**例**: `123`

$INCIDENT_SEVERITY
: インシデントの重大度。

$INCIDENT_STATUS
: インシデントのステータス。

$INCIDENT_TITLE
: インシデントのタイトル。

$INCIDENT_TODOS
: インシデントの修復タスクを持つ JSON オブジェクトのリスト。<br />
**例**: `[{"uuid": "01c03111-172a-50c7-8df3-d61e64b0e74b", "content": "task description", "due_date": "2022-12-02T05:00:00+00:00", "completed": "2022-12-01T20:15:00.112207+00:00", "assignees": []}]`

$INCIDENT_URL
: インシデントの URL。<br />
**例**: `https://app.datadoghq.com/incidents/1`

$INCIDENT_UUID
: 関連するインシデントの UUID。<br />
**例**: `01c03111-172a-50c7-8df3-d61e64b0e74b`

$LAST_UPDATED
: イベントが最後に更新された日時を、エポック (ミリ秒) で表した値です。<br />
**例**: `1406662672000`

$LAST_UPDATED_POSIX
: イベントが最後に更新された日時を、POSIX エポック (秒) で表した値です。<br />
**例**: `1406662672`

$LINK
: イベントの URL。<br />
**例**: `https://app.datadoghq.com/event/jump_to?event_id=123456`

$LOGS_SAMPLE
: ログ モニターのアラートに含まれるログ サンプルを格納した JSON オブジェクトです。サンプル メッセージの最大長は 500 文字です。<br />
**例**:<br />

```json
{
  "columns": [
    "Time",
    "Host"
  ],
  "label": "Sample Logs",
  "rows": [
    {
      "items": [
        "15:21:18 UTC",
        "web"
      ],
      "message": "[14/Feb/2023:15:21:18 +0000] \"GET / HTTP/1.1\" 200"
    },
    {
      "items": [
        "15:21:13 UTC",
        "web00"
      ],
      "message": "[14/Feb/2023:15:21:13 +0000] \"GET / HTTP/1.1\" 200"
    }
  ]
}
```

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
**例**: `{"network":{"client":{"ip":"1.2.3.4"}}, "service": ["agent"]}`

$SECURITY_RULE_ID
: セキュリティルール ID。<br />
**例**: `aaa-aaa-aaa`

$SECURITY_RULE_MATCHED_QUERIES
: セキュリティルールに関連するクエリ。<br />
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
: Synthetics テストで最初に失敗したステップ名です。

$SYNTHETICS_SUMMARY
: Synthetic テストの詳細の概要<br />
**例**:

```json
{
  "result_id": "1871796423670117676",
  "test_type": "browser",
  "test_name": "Test name",
  "date": "Nov 05, 2021, 09:49AM UTC",
  "test_url": "https://app.datadoghq.com/synthetics/edit/apc-ki3-jwx",
  "result_url": "https://app.datadoghq.com/synthetics/details/anc-ki2-jwx?resultId=1871796423670117676",
  "location": "Frankfurt (AWS)",
  "browser": "Chrome",
  "device": "Laptop Large",
  "failing_steps": [
    {
      "error_message": "Error: Element's content should contain given value.",
      "name": "Test span #title content",
      "is_critical": true,
      "number": "3.1"
    }
  ]
}
```

$TAGS
: イベントタグのカンマ区切りリスト。<br />
**例**: `monitor, name:myService, role:computing-node`

$TAGS\[key\]
: `key` タグの値です。`key` タグが存在しない、または `key` タグに値が設定されていない場合、この式は空文字列として評価されます。
**例**: `$TAGS` に `role:computing-node` が含まれる場合、`$TAGS[role]` は `computing-node` に評価されます

$TEXT_ONLY_MSG
: マークダウン書式設定なしのイベントのテキスト。

$USER
: Webhook をトリガーしたイベントをポストしたユーザー。<br />
**例**: `rudy`

$USERNAME
: Webhook をトリガーしたイベントをポストしたユーザーのユーザー名。

### カスタム変数

組み込み変数のリストに加えて、インテグレーションタイルで独自のカスタム変数を作成することができます。これらの変数は、Webhook URL、ペイロード、カスタムヘッダーで使用することができます。一般的な使用例は、ユーザー名やパスワードのような資格情報の保存です。

また、セキュリティを高めるために、カスタム変数の値を非表示にすることもできます。値を非表示にするには、カスタム変数を編集または追加する際に、**hide from view** チェックボックスを選択します。

{{< img src="/integrations/webhooks/webhook_hidefromview.png" alt="Hide from view チェックボックスでカスタム変数の値をマスキング" style="width:100%;" >}}

### 認証

#### HTTP Basic 認証

認証を必要とするサービスに Webhook をポストする場合は、URL を `https://my.service.example.com` から `https://<USERNAME>:<PASSWORD>@my.service.example.com` に変更することで、Basic HTTP 認証を使用できます。

#### OAuth 2.0 認証

OAuth 2.0 認証を必要とするサービスに Webhook をポストしたい場合は、認証方式を設定します。認証方式には、サービスから OAuth トークンを取得するために必要なすべての情報が含まれます。認証方式が設定され、Webhook に関連付けられると、Datadog が OAuth トークンの取得、必要に応じたトークンの更新、Bearer トークンとしての Webhook リクエストへの追加を処理します。

認証方式を追加するには、Auth Methods タブ をクリックし、New Auth Method ボタンをクリックします。認証方式にに分かりやすい名前を付け、以下の情報を入力します。

- アクセストークン URL
- Client ID
- Client Secret
- スコープ (オプション)
- オーディエンス (オプション)

Save をクリックして認証方式を作成します。この認証方式を Webhook に適用するには、Configuration タブに戻り、既存の Webhook 構成を選択して Edit ボタンをクリックします。作成した認証方式が認証方式選択リストに表示されます。

### 複数の Webhook

モニターアラートで、2 つ以上の Webhook エンドポイントが通知を受けた場合、サービスレベルごとに 1 つの Webhook キューが作成されます。たとえば、PagerDuty と Slack にアクセスする場合、Slack Webhook での再試行は PagerDuty の Webhook に影響しません。

ただし、PagerDuty のスコープ内では、いくつかイベントは常に他のイベントより前に送信されます。たとえば、"Acknowledge" ペイロードは必ず "Resolution" の前に送信されます。"Acknowledge" の ping が失敗すると、"Resolution" の ping は、再試行ロジックによってキューに入れられます。

## 例

### Twilio を使用した SMS の送信

URL として使用する:
`https://<ACCOUNT_ID>:<AUTH_TOKEN>@api.twilio.com/2010-04-01/Accounts/<ACCOUNT_ID>/Messages.json`

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

### Webhook ペイロードのイベントタイプ一覧 {#event-types}

| イベントタイプ | 関連するモニター |
| ---------  | ------------------- |
| `ci_pipelines_alert` | CI パイプライン |
| `ci_tests_alert` | CI テスト |
| `composite_monitor` | Composite |
| `error_tracking_alert` | Error Tracking |
| `event_alert` | V1 エンドポイントを使用したイベント |
| `event_v2_alert` | V2 エンドポイントを持つイベント |
| `log_alert` | ログ |
| `monitor_slo_alert` | モニターベース SLO |
| `metric_slo_alert` | メトリクスベース SLO |
| `outlier_monitor` | Outlier |
| `process_alert` | プロセス |
| `query_alert_monitor` | メトリクス、異常値、予測 |
| `rum_alert` | RUM |
| `service_check` | ホスト、サービスチェック |
| `synthetics_alert` | Synthetics |
| `trace_analytics_alert` | トレース分析 |

## サポート

ヘルプが必要ですか？[Datadog サポート](https://docs.datadoghq.com/help/)にお問い合わせください