---
description: 通知、ポストモーテム、Jira、およびチャンネル名テンプレートで使用される Incident Management で利用可能なすべてのテンプレート変数のリファレンス。
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: ドキュメント
  text: 通知およびポストモーテムテンプレートを構成する
- link: /incident_response/incident_management/setup_and_configuration/notification_rules
  tag: ドキュメント
  text: 通知ルールをセットアップする
- link: /incident_response/incident_management/setup_and_configuration/property_fields
  tag: ドキュメント
  text: プロパティフィールドを構成する
title: インシデント変数リファレンス
---
## 概要 {#overview}

インシデント変数は、通知、ポストモーテム、Jira の問題、およびチャンネル名にインシデントデータを動的に挿入するテンプレート変数です。これらを使用すると、関連するインシデントコンテキストをテンプレートに自動的に入力できるため、インシデント中およびインシデント後の手作業を削減できます。

変数は、以下の 4 つのテンプレートタイプで使用できます。

- **通知**: メール、Slack、またはその他のチャンネルに送信される手動および自動のインシデント通知で使用されます。
- **ポストモーテムテンプレート**: ポストモーテムを生成する際に、Datadog Notebooks または Confluence ページの自動入力に使用されます。
- **Jira テンプレート**: インシデントから Jira の問題が作成される際に、インシデントフィールドを Jira の問題フィールドにマッピングするために使用されます。
- **チャンネル名テンプレート**: Datadog がインシデントに対して自動的に作成する Slack チャンネル、Microsoft Teams チャンネル、または Google Chat スペースの名前を生成するために使用されます。

**注**: Jira テンプレートでは、変数はプレフィックスなしで表示されます。例: `{{incident.title}}` appears as `{{ title }}` (Jira テンプレートエディター)。変数の動作は同じです。

## インシデント変数 {#incident-variables}

以下の変数は、通知メッセージ、ポストモーテムテンプレート、および Jira テンプレートで使用できます。

| 変数 | 説明 |
|---|---|
| `{{incident.<property_field_name>}}` | Any [custom property field][2] configured for your organization. Replace `<property_field_name>` with the field name. |
| `{{incident.id}}` | The incident's public ID. |
| `{{incident.title}}` | The incident title. |
| `{{incident.severity}}` | The incident severity (for example, `SEV-1`, `SEV-2`). |
| `{{incident.severity_number}}` | The numeric part of the incident severity, such as `1` for `SEV-1`. Empty if there is no numeric value. |
| `{{incident.status}}` | The incident [status level][1]. |
| `{{incident.created}}` | Timestamp when the incident was created. |
| `{{incident.detected}}` | Timestamp when the incident was detected. |
| `{{incident.resolved}}` | Timestamp when the incident was resolved. |
| `{{incident.time_to_detect}}` | Time from the earliest impact start to detection. |
| `{{incident.time_to_internal_response}}` | Time from detection to declaration. |
| `{{incident.time_to_repair}}` | Time from detection to the latest recorded impact end. |
| `{{incident.time_to_resolve}}` | Time from declaration to resolution. |
| `{{incident.time_from_detect_to_resolve}}` | Time from detection to resolution. |
| `{{incident.mean_time_to_<metric>_<window>}}` | Average duration for other incidents of the same type. Replace `<metric>` with `detect`, `internal_response`, `repair`, or `resolve`. Replace `<window>` with `30_days`, `90_days`, or `12_months` (365 days). Example: `{{incident.mean_time_to_resolve_30_days}}`. |
| `{{incident.mean_time_from_detect_to_resolve_<window>}}` | Average time from detection to resolution for other incidents of the same type. Replace `<window>` with `30_days`, `90_days`, or `12_months` (365 days). |
| `{{incident.customer_impacted}}` | `True` or `False`, depending on whether an impact has been added to the incident. |
| `{{incident.customer_impact}}` | A description of the impacts and their duration. |
| `{{incident.scope_of_impact}}` | A list of the impact descriptions. |
| `{{incident.customer_impact_start}}` | The start time of the impact. If multiple impacts were added, this is the earliest start time. |
| `{{incident.customer_impact_end}}` | The end time of the impact. If multiple impacts were added, this is the latest end time. |
| `{{incident.customer_impact_duration}}` | The total duration of the impacts,  from `customer_impact_start` to `customer_impact_end`. |
| `{{incident.commander}}` | The incident commander's name. If the user has no name, this is their email. If they have no email, this is their handle. |
| `{{incident.commander_name}}` | The incident commander's name. |
| `{{incident.commander_handle}}` | The incident commander's handle. |
| `{{incident.commander_email}}` | The incident commander's email address. |
| `{{incident.created_by_name}}` | The name of the user who created the incident. |
| `{{incident.created_by_handle}}` | The handle of the user who created the incident. |
| `{{incident.created_by_email}}` | The email address of the user who created the incident. |
| `{{incident.responders_summary}}` | A summary of the incident's responders, truncated if there are many responders. |
| `{{incident.responders_full_list}}` | The full, non-truncated list of the incident's responders. |
| `{{incident.slack_channel_name}}` | The name of the incident's Slack channel. |
| `{{incident.slack_channel_url}}` | The URL of the incident's Slack channel. |
| `{{incident.slack_channel_link}}` | A Markdown link to the incident's Slack channel. |
| `{{incident.slack_channel_id}}` | The ID of the incident's Slack channel. |
| `{{incident.ms_teams_channel_name}}` | The name of the incident's Microsoft Teams channel. |
| `{{incident.ms_teams_channel_url}}` | The URL of the incident's Microsoft Teams channel. |
| `{{incident.ms_teams_channel_link}}` | A Markdown link to the incident's Microsoft Teams channel. |
| `{{incident.ms_teams_channel_id}}` | The ID of the incident's Microsoft Teams channel. |
| `{{incident.ms_teams_meeting_link}}` | A Markdown link to the incident's Microsoft Teams meeting. The display text is `Microsoft Teams Meeting {id}` |
| `{{incident.ms_teams_meeting_id}}` | The ID of the incident's Microsoft Teams meeting. |
| `{{incident.zoom_id}}` | The Zoom meeting ID. |
| `{{incident.zoom_join_url}}` | The Zoom join URL. |
| `{{incident.zoom_password}}` | The Zoom meeting password, if one exists. |
| `{{incident.zoom_link}}` | A Markdown link to the Zoom meeting. The display text is `Zoom Meeting {id}`。|

## ポストモーテムテンプレートでのみ使用可能な変数 {#variables-available-only-in-postmortem-templates}

以下の変数は、ポストモーテムテンプレートでのみ機能します。通知または Jira テンプレートでは使用できません。

| 変数 | 説明 |
|---|---|
| `{{incident.card}}` | Inserts a self-updating incident card into the postmortem. **Only available for postmortems created in Datadog Notebooks.** This variable does not work for postmortems created in third-party locations such as Confluence or Google Drive. |
| `{{incident.timeline}}` | ポストモーテムテンプレートで使用する際、インシデントのすべてのタイムラインイベントをポストモーテムにコピーします。|

## チャンネル名テンプレートのみで使用可能な変数 {#variables-available-only-in-channel-name-templates}

チャンネル名テンプレートでは、Datadog がインシデントに対して自動的に作成する Slack チャンネル、Microsoft Teams チャンネル、または Google Chat スペースの名前を構成します。[Slack][3]、[Microsoft Teams][4]、または [Google Chat][5] のインテグレーション設定でこれらのテンプレートを構成します。

チャンネル名テンプレートは、通知、ポストモーテム、Jira テンプレートとは異なる、より少ない種類の変数に対応しており、`incident.` プレフィックスのない構文を使用します。

| 変数 | 説明 |
|---|---|
| `{{public_id}}` | The incident's numeric ID. |
| `{{title}}` | The incident title. |
| `{{created}}` | The incident's creation date, in `MM_DD_YYYY` format, in the timezone you configure for the channel name template. |
| `{{yyyy}}` | The four-digit year the incident was created, in the timezone you configure for the channel name template. |
| `{{mm}}` | The two-digit month the incident was created, in the timezone you configure for the channel name template. |
| `{{dd}}` | The two-digit day of month the incident was created, in the timezone you configure for the channel name template. |
| `{{severity}}` | The incident's severity. |
| `{{severity_number}}` | The incident's severity, as a number (for example, `1` for `SEV-1`). |
| `{{random_adjective}}` | A random adjective. |
| `{{random_noun}}` | A random noun. |
| `{{slug}}` | A slug value. When the slug source is set to `servicenow` の場合は、ServiceNow レコード番号が表示されます。|

**注**: Slack、Microsoft Teams、Google Chat にはそれぞれチャンネル名の制限があるため、Datadog は生成したチャンネル名を小文字に変換し、使用できない文字を置き換えます。

## AI 変数 {#ai-variables}
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger"> AI 変数は {{< region-param key="dd_site_name" >}}ではサポートされていません。</div>{{< /site-region >}}

通知およびポストモーテムテンプレートで AI 変数を利用できます。組織で AI が有効になっている必要があります。

### 通知テンプレート {#notification-templates}

| 変数 | 説明 |
|---|---|
| `{{incident.ai_issue}}` | An AI-generated description of the issue that occurred. |
| `{{incident.ai_impact}}` | An AI-generated description of the impact. |
| `{{incident.ai_remediation}}` | An AI-generated description of the remediation steps taken. |
| `{{incident.ai_contributing_factors}}` | AI が生成した要因の概要。|

### ポストモーテムテンプレート {#postmortem-templates}

| 変数 | 説明 |
|---|---|
| `{{incident.ai_summary}}` | An AI-generated summary of the incident. |
| `{{incident.ai_system_overview}}` | An AI-generated description of the involved services. |
| `{{incident.ai_key_timeline}}` | An AI-generated key timeline of events. |
| `{{incident.ai_customer_impact}}` | An AI-generated description of the customer impact. |
| `{{incident.ai_lessons_learned}}` | An AI-generated summary of lessons learned. |
| `{{incident.ai_action_items}}` | AI が生成したアクションアイテムのリスト。|

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/incident_management/setup_and_configuration/information#status-levels
[2]: /ja/incident_response/incident_management/setup_and_configuration/property_fields
[3]: /ja/incident_response/incident_management/setup_and_configuration/integrations/slack/#incident-channels
[4]: /ja/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#automatic-channel-creation
[5]: /ja/incident_response/incident_management/setup_and_configuration/integrations/google_chat/#incident-spaces