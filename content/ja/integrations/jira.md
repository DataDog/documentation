---
categories:
- collaboration
- developer tools
- issue tracking
- notifications
custom_kind: integration
dependencies: []
description: This integration allows you to create tickets from triggered alerts in
  Datadog, and update existing tickets with new information as it arises. Additionally,
  you can see Jira ticket creations as events within Datadog to overlay with all of
  your metrics.
doc_link: https://docs.datadoghq.com/integrations/jira/
draft: false
git_integration_title: jira
has_logo: true
integration_id: ''
integration_title: Jira
integration_version: ''
is_public: true
manifest_version: '1.0'
name: jira
public_title: Datadog-Jira インテグレーション
short_description: Datadog でアラートを自動生成し、その後 Jira チケットを更新。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Jira は、ソフトウェアチーム向けの課題およびプロジェクト追跡システムです。Datadog Jira インテグレーションにより、Datadog でトリガーされたアラート、インシデント、ケースから Jira に課題を作成し、Jira で作成された課題を Datadog のイベントとして表示することができます。

## Setup

### Jira でアプリケーションリンクを作成する

1. Jira に移動します。
1. 右端の歯車アイコンをクリックし、** Products** を選択します。
1. 左メニューの **Integrations** の下にある **Application links** をクリックし、**Create link** をクリックします。
1. Select the **Direct application link** checkbox, enter the URL `https://{{< region-param key="dd_full_site" code="true" >}}` and click **Continue**.
1. "No response was received from the URL you entered” (入力した URL から応答がありません) という警告を無視して、**Continue** をクリックします。
1. 下記のようにフォームに入力し、**Continue** をクリックします。

    | フィールド                 | 入力                          |
    |-----------------------|--------------------------------|
    | Application Name      | `{Enter a name (e.g. Datadog)}`|
    | Application Type      | 一般的なアプリケーション            |
    | Service Provider Name | `{leave blank}`                |
    | Consumer key          | `{leave blank}`                |
    | Shared secret         | `{leave blank}`                |
    | Request Token URL     | `{leave blank}`                |
    | Access token URL      | `{leave blank}`                |
    | Authorize URL         | `{leave blank}`                |
    | Create incoming link  | ボックスをチェック                  |

7. 次のフォームに以下のように入力し、**Continue** をクリックします。[Datadog Jira インテグレーションタイル][1]で公開鍵を見つけるには、**Add Account** をクリックします。

    | フィールド         | 入力                                                      |
    |---------------|------------------------------------------------------------|
    | Consumer Key  | `{キー名を入力 (例: datadog)}`                        |
    | Consumer Name | Datadog                                                    |
    | Public Key    | `{Datadog Jira インテグレーションタイルから公開鍵を入力}`|

### Datadog を Jira インスタンスに接続する

1. [Datadog Jira インテグレーションタイル][1]に移動し、**Add Account** をクリックします。
2. Jira インスタンスの URL と、以前に作成したアプリケーションリンクのコンシューマーキーを入力します。
3. **Connect** をクリックし、Jira 認可ページの指示に従います。Datadog では、最適かつ一貫した結果を得るために、このインテグレーション専用の (個人用ではない) Jira サービスアカウントを持つことを推奨しています。**Connect** をクリックする前に、このアカウントにログインしていることを確認してください。
**Note**: The Datadog Jira integration can connect to On-Prem/Jira Server and Jira Data Center instances. However, many of these instances blacklist IP ranges. For the integration to work, follow the IP filtering documentation below.

### IP filtering

If your Jira instance filters traffic by IP address, you need to allow connections from the **Webhooks** 
IP prefixes belonging to Datadog in order for the integration to work. For a list of **Webhooks** IP prefixes for your region, see [Datadog IP Ranges][2].

### Further configuration

To configure automated Jira issue creation with bidirectional syncing in Case Management, see the instructions for [Configuring a Jira webhook](#configure-a-jira-webhook) and the [Case Management][3] documentation. 

To create Jira issues from Datadog monitor alerts, see [Configure an issue template](#configure-an-issue-template). 

## Configure a Jira webhook

Configuring a webhook enables cases created in Case Management to automatically create issues in Jira and keep both resources synced. 

To create a Jira webhook:
1. In Jira, click the **Gear** icon in the top right corner and select **System**.
1. In the left menu under *Advanced*, click **Webhooks**.
1. Click **Create a Webhook** in the right corner.
1. Enter `Datadog Webhook` as the webhook name.
1. Keep the status as **Enabled**.
1. Navigate to the [Datadog Jira integration tile][4].
1. Under the Webhooks section, copy the webhook URL.
1. Navigate back to Jira and paste the webhook URL under *URL*.
1. Enable the following issue-related events. If you only want to send a subset of issue events, you can use JQL to filter them. In this example we are filtering only for projects AB and CD.
    {{< img src="integrations/jira/jira_issue_events.png" alt="Jira Issue Events" style="width:80%;">}}
1. Enable the `deleted` project-related events.
1. Leave everything else unchecked.
1. Click the **Create** button at the bottom of the page.

## Configure an issue template

Issue templates define how issues are created in Jira from Datadog alert events.

To create an issue template:

1. In Datadog, click **New Issue Template** in the **Connect Jira to Monitor Notifications** section.
2. Enter a name for your issue template. This name, prefixed with `jira-`, becomes the handle you can use in your monitor to send notifications to (such as `jira-my-issue-template-name`).
3. Select a Jira account.
4. Select the project and issue type (such as **Story**, **Epic**, **Task**, or **Bug**).
5. A list of configurable fields appears. Enter values in the desired fields and click **Save**.

### Configure issue fields

Issue template fields define the data that is included when creating issues in Jira. For example, you can configure your template to create issues with a specific priority or a default assignee.

You can use data from the alert event to populate values in the issue fields using template variables such as `${EVENT_TITLE}`. For a list of possible variables, see the [Datadog Webhooks integration][5]. 

## Usage

#### Automatically create issues from Datadog alerts

To create Jira issues from Datadog alert events, enter the notification handle of one or more issue templates such as `@jira-my-issue-template` when creating a monitor in the **Notify your team** or **Say what's happening** sections.

Issues are created when the monitor triggers. New issues are not created by the monitor until the monitor is resolved.

## Data Collected

### Metrics

The Jira integration does not include any metrics.

### Events

All created Jira issues appear as events within Datadog.

### Service Checks

The Jira integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://app.datadoghq.com/integrations/jira
[2]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/
[3]: https://docs.datadoghq.com/ja/service_management/case_management/settings/#jira
[4]: https://app.datadoghq.com/account/settings#integrations/jira
[5]: https://docs.datadoghq.com/ja/integrations/webhooks/
[6]: https://docs.datadoghq.com/ja/help/