---
categories:
- collaboration
- developer tools
- issue tracking
- notifications
custom_kind: インテグレーション
dependencies: []
description: このインテグレーションにより、Datadog でトリガーされたアラートからチケットを作成し、新しい情報が発生すると既存のチケットを更新することができます。さらに、Jira
  チケットの作成を Datadog 内のイベントとして表示し、すべてのメトリクスと重ね合わせることができます。
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
public_title: Datadog-Jira Integration
short_description: Have your Datadog alerts auto-generate and later update Jira tickets.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Jira is an issue and project tracking system for software teams. The Datadog Jira integration allows you to create issues from triggered alerts, incidents, and cases in Datadog and view issues created in Jira as Datadog events.

## セットアップ

### Create an application link in Jira

1. Navigate to Jira.
1. Click the Gear icon in the right corner and select **Products**.
1. In the left menu under **Integrations**, click **Application links**, and then click **Create link**.
1. Select the **Direct application link** checkbox, enter the URL `https://{{< region-param key="dd_full_site" code="true" >}}` and click **Continue**.
1. Ignore the warning "No response was received from the URL you entered" and click **Continue**.
1. Fill in the form as follows and click **Continue**.

    | Field                 | Input                          |
    |-----------------------|--------------------------------|
    | Application Name      | `{Enter a name (e.g. Datadog)}`|
    | Application Type      | Generic Application            |
    | Service Provider Name | `{leave blank}`                |
    | Consumer key          | `{leave blank}`                |
    | Shared secret         | `{leave blank}`                |
    | Request Token URL     | `{leave blank}`                |
    | Access token URL      | `{leave blank}`                |
    | Authorize URL         | `{leave blank}`                |
    | Create incoming link  | Check the box                  |

7. Fill in the next form as follows and click **Continue**. To find the public key in the [Datadog Jira integration tile][1], click **Add Account**.

    | Field         | Input                                                      |
    |---------------|------------------------------------------------------------|
    | Consumer Key  | `{Enter a key name (e.g. datadog)}`                        |
    | Consumer Name | Datadog                                                    |
    | Public Key    | `{Enter the public key from Datadog Jira integration tile}`|

### Connect Datadog to your Jira instance

1. Navigate to the [Datadog Jira integration tile][1] and click **Add Account**.
2. Enter the URL of your Jira instance and the consumer key of the application link you previously created.
3. Click **Connect** and follow the instructions on the Jira authorization page. Datadog recommends having a dedicated (non-personal) Jira service account specifically for this integration for optimal and more consistent results. Be sure to log into this account before hitting **Connect**.
**Note**: The Datadog Jira integration can connect to On-Prem/Jira Server and Jira Data Center instances. However, many of these instances blacklist IP ranges. For the integration to work, follow the IP filtering documentation below.

### IP フィルタリング

Jira インスタンスが IP アドレスによってトラフィックをフィルタリングする場合、インテグレーションが機能するためには、Datadog に属する **Webhooks** IP プレフィックスからの接続を許可する必要があります。お住まいの地域の **Webhooks** IP プレフィックスのリストについては、[Datadog IP 範囲][2]を参照してください。

### 詳細なコンフィギュレーション

Case Management で双方向同期による Jira 課題の自動作成を構成するには、[Jira webhook の構成](#configure-a-jira-webhook)の説明および [Case Management][3] のドキュメントを参照してください。

Datadog モニターアラートから Jira 課題を作成するには、[課題テンプレートの構成](#configure-an-issue-template)を参照してください。

## Jira webhook の構成

Webhook を構成することで、Case Management で作成されたケースが自動的に Jira に課題を作成し、両方のリソースを同期させることができます。

Jira webhook を作成するには
1. Jira で右上の**歯車**アイコンをクリックし、**System** を選択します。
1. 左メニューの *Advanced* で、**Webhooks** をクリックします。
1. 右隅の **Create a Webhook** をクリックします。
1. webhook 名には `Datadog Webhook` と入力します。
1. ステータスを **Enabled** のままにします。
1. [Datadog Jira インテグレーションタイル][4]に移動します。
1. Webhooks セクションで、webhook URL をコピーします。
1. Jira に戻り、*URL* の下に webhook URL を貼り付けます。
1. 以下の課題関連イベントを有効にします。課題イベントのサブセットのみを送信したい場合は、JQL を使用してフィルタリングできます。この例では、プロジェクト AB と CD のみをフィルタリングしています。
    {{< img src="integrations/jira/jira_issue_events.png" alt="Jira 課題イベント" style="width:80%;">}}
1. `deleted` プロジェクト関連のイベントを有効にします。
1. その他の項目はチェックを入れないでください。
1. ページ下部の **Create** ボタンをクリックします。

## 課題テンプレートを構成する

課題テンプレートは、Datadog のアラートイベントから Jira で課題がどのように作成されるかを定義します。

課題テンプレートを作成するには

1. Datadog で、**Connect Jira to Monitor Notifications** セクションの **New Issue Template** をクリックします。
2. 課題テンプレートの名前を入力します。この名前の前に `jira-` を付けると、モニターで通知を送るためのハンドルになります (`jira-my-issue-template-name` のように)。
3. Jira アカウントを選択します。
4. プロジェクトと課題の種類 (**Story**、*Epic**、*Task**、*Bug**など) を選択します。
5. 構成可能なフィールドのリストが表示されます。必要な項目に値を入力し、** Save** をクリックします。

### 課題のフィールドを構成する

課題テンプレートフィールドは、Jira で課題を作成する際に含まれるデータを定義します。たとえば、特定の優先度やデフォルトの担当者で課題を作成するようにテンプレートを構成することができます。

`${EVENT_TITLE}` などのテンプレート変数を使用すると、アラートイベントのデータを使用して、課題フィールドに値を入力することができます。使用可能な変数の一覧は、[Datadog Webhooks インテグレーション][5]を参照してください。

## 使用方法

#### Datadog アラートから自動的に課題を作成する

Datadog のアラートイベントから Jira 課題を作成するには、**Notify your team** または **Say what's happening** セクションでモニターを作成する際に `@jira-my-issue-template` などの 1 つまたは複数の課題テンプレートの通知ハンドルを入力する必要があります。

課題は、モニターがトリガーされたときに作成されます。モニターが解決されるまで、モニターによって新しい課題が作成されることはありません。

## 収集データ

### メトリクス

Jira インテグレーションには、メトリクスは含まれません。

### イベント

作成されたすべての Jira の課題は、Datadog 内にイベントとして表示されます。

### サービスチェック

Jira インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://app.datadoghq.com/integrations/jira
[2]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/
[3]: https://docs.datadoghq.com/ja/service_management/case_management/settings/#jira
[4]: https://app.datadoghq.com/account/settings#integrations/jira
[5]: https://docs.datadoghq.com/ja/integrations/webhooks/
[6]: https://docs.datadoghq.com/ja/help/