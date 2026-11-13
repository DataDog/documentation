---
aliases:
- /ja/service_management/case_management/create_notifications_and_third_party_tickets
- /ja/service_management/case_management/notifications_integrations/
- /ja/incident_response/case_management/notifications_integrations/
further_reading:
- link: /incident_response/work_management/troubleshooting
  tag: ドキュメント
  text: サードパーティインテグレーションのトラブルシューティング
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: ブログ
  text: ServiceNow ITSM と Datadog を統合して、Incident Response を迅速化します。
- link: https://www.datadoghq.com/blog/forms-case-management-requests/
  tag: ブログ
  text: Datadog Forms と Case Management を使用して、リクエストフローを簡素化します。
- link: https://www.datadoghq.com/blog/work-management/
  tag: ブログ
  text: Datadog Work Management で人間とエージェントの作業を一元化する
title: Notifications と Integrations
---
## 概要 {#overview}

Work Management は、Notifications やチケットを自動または手動で生成するためのサードパーティインテグレーションを作成する機能を提供します。
- 自動: 新しいワークアイテムが作成されるたびに、新しいチケットまたは Notifications が生成されます。
- 手動: ユーザーは特定のワークアイテムに対してチケットまたは Notifications を作成することを選択します。

Work Management をサードパーティシステムと連携させることで、Datadog ソリューションを既存のワークフローやプロセスに統合できます。Jira および ServiceNow インテグレーションを使用すると、Datadog のフルスタックテレメトリを使用してワークアイテムを解決しながら、これらのサードパーティシステムに記録を残すことができます。


## 通知 {#notifications}

新しいワークアイテムが作成されたときに通知を受け取るには、ビューを作成します。
1. 通知を受け取りたいプロジェクトに移動します。
1. まだプロジェクトのメンバーでない場合は、**Join This Project** をクリックします。
1. **Add view** をクリックします。
1. **Name** フィールドにビューの名前を入力します。
1. 検索ボックスに、通知を受け取りたいワークアイテムを取得するためのフィルタリングクエリを入力します。
1. 受信者フィールドで通知方法を選択してください。
1. **Save** をクリックします。

### Notifications オプション {#notification-options}

| インテグレーション     | 構成    |
| --------------- | ---------------- |
| メール           | 1 つ以上のメールアドレスを選択してください。|
| Slack           | Slack のワークスペースとチャンネルを選択してください。|
| Microsoft Teams | Microsoft Teams のテナントを Datadog に接続している場合は、テナント、チーム、チャンネルを選択してください。それ以外の場合は、コネクタを選択してください。|
| PagerDuty       | サービスを選択してください。|
| Webhooks        | Webhook の名前を選択してください。|

## Notifications ルール {#notification-rules}

プロジェクト設定で Notifications ルールを構成すると、重要な作業項目の更新に関するアラートを受け取ることができます。Notifications ルールを作成するには、

1. [**Project Settings**][1] に移動し、プロジェクトをクリックして設定を展開してください。
1. 展開されたメニューで、**Notifications** をクリックしてください。
1. **+ Create Rule**をクリックして、Notifications ルールを追加してください。
1. クエリフィールドにフィルターを入力して、Notifications のスコープを特定の作業項目に設定してください。たとえば、以下のとおりです。
   ```
   priority:P1 OR priority:P2
   ```
   **すべての作業項目**の Notifications を受け取るには、クエリを空白のままにしてください。
1. 通知を送信する条件を選択してください。以下から 1 つ以上を選択できます。
   - 作業項目の作成
   - ステータスの遷移
   - 優先度の変更
   - 担当者の変更
   - 新しいアラートの相関 (イベント作業項目用)
1. Notifications 先を選択します。サポートされている Notifications 先は以下の通りです。
   - Email
   - Slack
   - Microsoft Teams
   - PagerDuty
   - Webhook
1. **Save** をクリックしてルールを有効にします。

## On-Call Paging ルール {#on-call-paging-rules}

ワークアイテムから、[Datadog On-Call][4] を使用してユーザーを手動または自動で呼び出すことができます。

手動でページをトリガーするには、
1. ワークアイテムの詳細を開いてください。
2. **Page** ボタンをクリックしてください。

自動的にページをトリガーするには、プロジェクト設定で自動ページングルールを構成してください。
1. [**Project Settings**][1] に移動し、プロジェクトをクリックして設定を展開してください。
1. 展開されたメニューで、**Integrations** > **Datadog On-Call** をクリックしてください。
1. **Automatically page work items to On-Call** をオンに切り替えてください。これにより Paging Rule モーダルが開き、最初のルールを定義できます。
1. モーダルでクエリを入力してください。ワークアイテムがライフサイクルのいずれかの時点で指定されたクエリに一致すると、Datadog は指定されたチームを自動的に呼び出します。
1. 呼び出すチームを選択してください。
   - **Specific Team**: ルールがトリガーされたときに常に呼び出される特定のチームを選択してください。
   - **Dynamic Team Selection**: `Team`属性を通じてワークアイテムに関連付けられたチームを自動的に呼び出してください。
1. **Add Rule** をクリックします。
1. Datadog On-Call 設定ページでルールを表示します。このページに戻ってこの構成を管理するか、**New Paging Rule** をクリックして複数のルールを追加します。
1. (オプション) ページがトリガーされたときに、ワークアイテムをオンコールユーザーに自動的に割り当てる機能をオンに切り替えてください。

## サードパーティのチケット{#third-party-tickets}
プロジェクト設定では、メンバーシップの管理、ワークアイテムの自動クローズの構成、および Jira や ServiceNow などのサードパーティインテグレーションのセットアップを行うことができます。

{{% collapse-content title="Jira の構成" level="h3" expanded=false id="jira" %}}
1. Jira インテグレーションが構成されていることを確認します。
1. Work Management プロジェクト設定で、プロジェクトから手動で Jira の課題を作成するために **Jira** を有効にします。
1. Jira アカウント、課題を作成するプロジェクト、および希望する課題タイプ (ストーリー、エピック、バグ、タスクなど) を選択します。
1. プロジェクトで作成された各ワークアイテムについて、Jira 課題を自動的に作成するよう選択できます。
1. 以下の属性 (ワークアイテムのタイトル、説明、担当者、コメント、ステータス、優先度) について、以下のいずれかのオプションを選択します。
  |  オプション |  説明 |
  |-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
  | Once to Jira at work item creation | フィールドは、ワークアイテムの作成時にのみ Work Management から Jira に同期されます。その後の変更は、どちら側にも反映されません。 |
  | Two-way sync (bi-directional) | Work Management での変更は Jira に反映され、その逆も同様です。|
  | Don't sync                          | フィールドは Jira に同期されません。                                                                                                             |
1. ワークアイテムのステータスと優先度について、Jira 側でマッピングする値を選択してください。
1. 変更を保存します。

**注**:
- ワークアイテムは、プロジェクトごとに一度に 1 つの外部リソースとのみ同期できます。Jira 同期を有効にするには、ServiceNow の自動作成と同期を無効にする必要があります。
- [Open]、[In Progress]、[Closed] のコアステータスを使用しているワークアイテムのみが Jira と同期できます。
- 双方向同期には [Webhook サポート][2] が必要です。
- 課題の作成は、Jira Cloud および Data Center で利用できます。フィールド同期は Jira Cloud でのみ利用できます。
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow の構成" level="h3" expanded=false id="servicenow" %}}
1. [ITOM および ITSM セットアップ手順][3] に従って ServiceNow インテグレーションを構成します。
1. Work Management プロジェクト設定で、プロジェクトから手動で ServiceNow インシデントを作成するために ServiceNow を有効にします。
1. ServiceNow インスタンスと割り当てグループを選択します。
1. プロジェクトで作成された各ワークアイテムについて、ServiceNow インシデントを自動的に作成するよう選択できます。
1. 以下の属性 (ステータス、コメント) について、以下のオプションのいずれかを選択します。
  | オプション     | 説明    |
  | ---  | ----------- |
  |Once to ServiceNow at work item creation |フィールドは、ワークアイテムの作成時にのみ Work Management から ServiceNow に同期されます。その後の変更は、どちら側にも反映されません。|
  |All updates to ServiceNow |Work Management での変更は ServiceNow に反映されますが、ServiceNow での変更は Work Management には反映されません。|
  |Two-way sync (bi-directional)|Work Management での変更は ServiceNow に反映され、その逆も同様です。|
  |Don't sync|フィールドは ServiceNow に同期されません。|
1. Work Management のステータス値をマッピングする ServiceNow のステート値を選択します。
1. 変更を保存します。

**注**: 1 つのプロジェクトにつき、ワークアイテムは一度に 1 つの外部リソースとのみ同期できます。ServiceNow 同期を有効にするには、Jira の自動作成と同期を無効にする必要があります。[Open]、[In Progress]、[Closed] のコアステータスを使用しているワークアイテムのみが ServiceNow と同期できます。
{{% /collapse-content %}}

{{% collapse-content title="Linear の構成" level="h3" expanded=false id="linear" %}}
1. [Linear インテグレーション][5] が構成されていることを確認します。
1. Work Management プロジェクト設定で、プロジェクトから手動で Linear の課題を作成するために **Linear** を有効にします。
1. 課題を作成する Linear ワークスペースとチームを選択します。
1. プロジェクトで作成されたワークアイテムごとに Linear 課題の自動作成を選択できます。
1. 以下の属性 (ワークアイテムのタイトル、説明、担当者、コメント、ステータス、優先度) について、以下のいずれかのオプションを選択します。
  | オプション                                  | 説明                                                                                                                                    |
  |-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
  | Once to Linear at work item creation    | フィールドは、ワークアイテムが作成された時点でのみ Work Management から Linear に同期されます。その後の変更は、どちら側にも反映されません。 |
  | Two-way sync (bi-directional)           | Work Management での変更は Linear に反映され、その逆も同様です。                                                                           |
  | Don't sync                              | フィールドは Linear に同期しません。                                                                                                            |
1. ワークアイテムのステータスについて、Linear 側でどの状態にマッピングするかを選択します。
1. 変更を保存します。

**注**:
- [Open]、[In Progress]、[Closed] のコアステータスを使用しているワークアイテムのみが Linear と同期できます。
- 双方向同期には [Webhook サポート][6] が必要です。
{{% /collapse-content %}}

## インシデントの自動エスカレーション {#incident-auto-escalation}

イベント量が多いときに手動でインシデントを宣言すると、遅延が発生し、重要な状況下でのリスク露出が増大する可能性があります。Work Management からのインシデントの自動エスカレーションにより、ワークアイテムが定義した基準に一致したときにインシデントを自動的に宣言できるため、手動介入の必要がなくなります。

[Project Settings page][1] に移動し、**Integrations** &gt; **Datadog Incidents** をクリックして、**Auto-escalate work items to Incidents** をオンに切り替えます。

有効にすると、指定したクエリ基準を満たすワークアイテム (ライフサイクルのどの時点であっても) が自動的にインシデントをトリガーし、チームの対応時間を短縮できます。

## Slack ミラーリング {#slack-mirroring}
Slack インテグレーションを使用すると、ワークアイテムにリンクされた Slack 通知スレッドでの返信が、ワークアイテムのアクティビティタイムラインに自動的にミラーリングされます。これにより、Datadog で手動更新を行う必要なく、ワークアイテムのコンテキストを最新の状態に保つことができます。ワークアイテムへの Slack スレッドのミラーリングは、以下でサポートされています。
- Work Management から生成された [Slack 通知][8]
- [ケースハンドル][7] を使用してモニターから生成された Slack 通知
- [Slack インテグレーション][9] を使用して Slack から直接作成されたワークアイテムの Slack スレッド

**Slack スレッドのミラーリングを構成するには**、

Datadog 組織に対して [Slack インテグレーション][9] が構成されていることを確認してください。

Slack スレッドのミラーリングは、すべての Work Management プロジェクトでデフォルトで有効になっています。特定のプロジェクトで無効にするには、
1. [**Project Settings**][1] に移動し、プロジェクトをクリックして設定を展開します。
1. 展開されたメニューで、**Integrations** &gt; **Slack** をクリックします。
1. **Slack thread mirroring** をオフに切り替えます。

### 仕組み {#how-it-works}

- Slack に送信されたワークアイテムの通知について、通知スレッド内のアクティビティがワークアイテムにミラーリングされます。
- ミラーリングされるアクティビティには、すべてのテキスト返信が含まれます (添付ファイルはサポートされていません)。ミラーリングされた各メッセージには、Slack ユーザーの名前と、ソースとして Slack が表示されます。
- 複数の Slack スレッドから単一のワークアイテムにコメントをミラーリングできます。
- ミラーリングは一方向です。メッセージは Slack からワークアイテムへ流れますが、ワークアイテムから Slack へは流れません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /ja/integrations/jira/#configure-a-jira-webhook
[3]: /ja/integrations/servicenow/#itom-and-itsm-setup
[4]: /ja/incident_response/on-call/
[5]: /ja/integrations/linear/
[6]: /ja/integrations/linear/#configure-a-linear-webhook
[7]: /ja/incident_response/work_management/create_work_item#automatic-work-item-creation
[8]: /ja/incident_response/work_management/notifications_integrations#notifications
[9]: /ja/integrations/slack/?tab=datadogforslack