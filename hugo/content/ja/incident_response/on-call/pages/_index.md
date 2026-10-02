---
aliases:
- /ja/service_management/on-call/pages/
- /ja/service_management/on-call/triggering_pages/
- /ja/incident_response/on-call/triggering_pages/
further_reading:
- link: /incident_response/on-call/
  tag: ドキュメント
  text: Datadog On-Call
- link: /incident_response/incident_management/
  tag: ドキュメント
  text: Incident Management
title: Page
---
Page とは、On-Call 担当者の対応が必要なアラートのことです。Page は以下のライフサイクルをたどります。

- **トリガー済み**: Page は送信されましたが、まだ誰も対応していません。エスカレーションポリシーは設定に従って実行され、定義された時間枠内に誰も応答しない場合は、追加の担当者に通知します。
- **確認済み**: 担当者が Page の対応を開始しました。エスカレーション通知は停止し、担当者が問題の解決に取り組みます。
- **解決済み**: 根本的な問題が対処され、Page はクローズされます。

このガイドでは、Page のトリガー、確認、再割り当て、解決の方法を説明します。

## Page をトリガーする{#trigger-a-page}

Page は Team に送信され、そのエスカレーションポリシーとスケジュールに従ってルーティングされます。Team が [Datadog On-Call にオンボード][1] されたら、その Team へのページングを開始できます。

### モニターから Page をトリガーする{#trigger-pages-from-monitors}

チームのハンドルに `oncall-` を付けてメンションすることで、Page を送信できます。たとえば、Checkout Operations Team (`@checkout-operations`) に Page を送信するには、`@oncall-checkout-operations` とメンションします。

{{< img src="incident_response/on-call/notification_page.png" alt="On-Call Team に言及する通知。" style="width:80%;" >}}

モニター、Incident Management、セキュリティ検出ルール、Event Management など、@-ハンドルがサポートされている場所であればどこからでも、On-Call Teams に Page を送信できます。

#### Page を自動的に解決する{#resolving-pages-automatically}

モニターが復旧すると、そのモニターがトリガーした Page は、復旧通知に On-Call Team のメンション (例: `@oncall-payments`) が含まれている場合、自動的に `Resolved` に設定されます。

メンションがアラートテンプレート内(例: {{#is_alert}} ... {{/is_alert}})にのみ表示され、復旧メッセージに含まれていない場合、Page は自動解決されません。

#### モニターと動的緊急度 {#monitors-and-dynamic-urgencies}

モニターアラートを通じて Page を送信し、Team のルーティングルールで動的緊急度を使用している場合、
- WARN (警告) しきい値を超えると、Page の緊急度は `low` に設定されます。
- ALERT しきい値を超えると、Page の緊急度は `high` に設定されます。

#### モニターの再通知{#monitor-renotification}

モニターが On-Call Team に [再通知を送信][8] するように設定されている場合、その動作は Page の現在の状態によって異なります。

- **Page は解決済み**: モニターが再通知を行い、新しい Page を作成します。新しい Page は Team のエスカレーションポリシーを通じてルーティングされます。
- **Page は確認済み**: モニターが再通知を行い、Page が再トリガーされ、エスカレーションポリシーは Page が確認された時点で進行中だったステップから再開されます。
- **Page はトリガー済み**: エスカレーションポリシーのすべてのステップがすでに実行されているにもかかわらず、誰も Page を確認していない場合、モニターが再通知を行い、Page が再トリガーされます。これにより、エスカレーションポリシーが最初から再開されます。

### メールで Page をトリガーする{#trigger-pages-through-email}

Team の On-Call 担当者に直接 Page をトリガーするための固有のメールアドレスを生成します。このアドレスに送信されたメールは、Team の設定済みのルーティングおよびエスカレーションポリシーに従います。

一部の Team では、このアドレスを人間が判読できる配布リスト (例: `page-network@company.com`) に埋め込み、認識しやすくしています。

メールで Team に Page を送信するには、

1. Team のページに移動し、**Custom Triggering Sources** までスクロールします。
1. メールトリガーセクションで、**Generate** をクリックします。

### インシデントから Page をトリガーする{#trigger-pages-through-incidents}

アクティブなインシデントから直接 Page をトリガーすることで、ワークフローを離れることなく、エスカレーションを行い、追加の担当者を関与させることができます。詳細な手順については、[インシデントから Page をトリガーする][5] を参照してください。

### 通話で Page をトリガーする{#trigger-pages-through-calls}

専用の電話番号に電話をかけて、[Live Call Routing][3] を通じて Page をトリガーします。

### Page を手動でトリガーする{#trigger-pages-manually}

Datadog プラットフォームから、または Slack や Microsoft Teams などのツールを通じて Page を送信します。これにより、On-Call 中でない場合でも、Team または個人に直接アラートを送信できます。

#### Datadog を通じて {#through-datadog}

1. [**On-Call** > **Teams**][2] に移動します。
1. Page を送信する Team を見つけます。**Page** を選択します。
   {{< img src="incident_response/on-call/pages/manual_page.png" alt="Checkout Operations Team を表示している On-Call Teams のリスト。[Schedules]、[Escalation Policies]、[Page] の 3 つのボタンが表示されます。" style="width:80%;" >}}
1. **Page title** を入力し、**Description** フィールドに詳細を追加します。**Page** を選択します。

Datadog を通じて手動で送信された Page は、常に `high` の緊急度となります。

#### Slack を通じて {#through-slack}

1. Datadog Slack アプリをインストールします。
1. `/datadog page` または `/dd page` を入力します。
1. Page を送信する Team を選択します。

Slack から送信された Page は、常に `high` の緊急度となります。

Slack で Page 通知を受け取るには、[ルーティングルール][4] を参照してください。

## Page に対応する{#respond-to-a-page}

[**On-Call** > **Pages**][7] に移動して、すべてのアクティブな Page と過去の Page を表示します。Page をクリックしてサイドパネルを開き、アクションを実行するか、1 つ以上の Page の横にあるチェックボックスを選択して一括編集します。

{{< img src="incident_response/on-call/pages/on-call-pages-list.png" alt="[Active、[Triggered]、[Acknowledged]、[Resolved]、[All] のサブタブを備えた On-Call Pages の一覧表示。各 Page の名前、ステータス、Team、担当者、作成日を表示するテーブル" style="width:100%;" >}}

### Page を確認する{#acknowledge-a-page}

Page を確認すると、対応中であることが示され、エスカレーションポリシーによる次の階層の担当者への通知が停止されます。Page を確認しない場合、エスカレーションが継続され、追加の担当者に Page が通知される可能性があります。

Page を確認するには、

1. Page をクリックしてサイドパネルを開きます。
1.  **Next Steps** で、**Acknowledge** を選択します。

Page のステータスが `Acknowledged` に変更されます。

{{< img src="incident_response/on-call/pages/on-call-page-next-steps.png" alt="On-Call Page のサイドパネルには、Page のステータス、緊急度、担当者、サービスが表示され、[Next Steps] として [Acknowledge]、[Reassign]、[Resolve]、[Escalate]、[Snooze]、[Declare Incident] のボタンがあります。" style="width:70%;" >}}

### Page をスヌーズする{#snooze-a-page}

スヌーズすると、確認済みだがまだ対応する準備ができていない Page のエスカレーションポリシーを、確認する場合のように所有権を取得することなく一時停止できます。現在 Page について通知を受けている担当者のみが、その Page をスヌーズできます。エスカレーションを一時停止する期間を選択します。その期間が終了するまでに誰も Page を確認または解決しなかった場合、エスカレーションポリシーが再開され、On-Call の担当者に再度通知されます。

Page をスヌーズするには、

1. Page をクリックしてサイドパネルを開きます。
1.  **Next Steps** で、**Snooze** の横にある矢印を選択し、プリセットの期間を選択するか、**At a specific time** を選択してカスタムの日時を指定します。

   {{< img src="incident_response/on-call/pages/on-call-snooze-page.png" alt="Snooze のドロップダウンが開いている On-Call Page のサイドパネル。10 分後、30 分後、1 時間後、4 時間後、12 時間後、または特定の時間にエスカレーションレベルを再通知するプリセットオプションが表示されています。" style="width:70%;" >}}

1. **Snooze** をクリックします。

**注**: Page のスヌーズは、Datadog モバイルアプリでも利用できます。

スヌーズ中も Page のステータスは `Triggered` のままです。スヌーズ期間が終了すると、エスカレーションポリシーが再開され、現在のエスカレーションレベルに再度通知されます。

### Page を再割り当てする{#reassign-a-page}

Page が誤った担当者や Team にルーティングされた場合、または対応により適した担当者に所有権を移譲する必要がある場合は、Page を再割り当てします。Page を再割り当てしても、Page の履歴はそのまま保持されます。

Page を再割り当てするには、

1. Page をクリックしてサイドパネルを開きます。
1. **Next Steps** で、**Reassign** を選択します。これにより、**Reassign Page** モーダルが開きます。

   {{< img src="incident_response/on-call/pages/on-call-reassign-page.png" alt="Team または User への再割り当て用トグル、Team 選択ドロップダウン、および任意のコメントフィールドを備えた [Reassign Page] モーダル。" style="width:60%;" >}}

1. 再割り当て先のユーザーまたは Team を選択します。
1. 必要に応じて、引き継ぎに関する説明コメントを追加します。
1. **Reassign** をクリックします。

新しい担当者に直ちに通知されます。

**注**: `Triggered` または `Acknowledged` のステータスの Page のみ再割り当てできます。

### Page を解決する{#resolve-a-page}

根本的な問題が解決したら、Page を解決します。これにより Page がクローズされ、ステータスが `Resolved` に設定されます。

Page を解決するには、

1. Page をクリックしてサイドパネルを開きます。
1. **Next Steps** で、**Resolve** を選択します。

Page がモニターによってトリガーされた場合、復旧通知に On-Call Team へのメンションが含まれていれば、モニターが復旧した時点で自動的に解決されます。詳細については、[Trigger a Page](#trigger-a-page) を参照してください。

### Page からインシデントを宣言する{#declare-an-incident-from-a-page}

Page にチーム間の調整、関係者への連絡、または正式な追跡が必要な場合は、インシデントに昇格させます。これにより、Page のコンテキストが事前入力された状態で、[Incident Management][6] にインシデントが作成されます。

インシデントを宣言するには、

1. Page をクリックしてサイドパネルを開きます。
1. **Next Steps** で、**Declare Incident** を選択します。
1. 必要に応じて、事前入力された詳細を確認して調整します。

   {{< img src="incident_response/on-call/pages/on-call-declare-incident-demo.png" alt="[Declare Incident] モーダルには、Page のタイトルと概要が事前入力されており、インシデントタイプ、重大度レベル、インシデントコマンダー、および Team のフィールドがあります。" style="width:100%;" >}}

1. **Declare Incident** を選択して確定します。

インシデントの重大度レベルと対応者の役割に関するガイダンスについては、[Incident Management][6] を参照してください。

### コメントを追加{#add-a-comment}

Page のタイムラインは、Page がトリガーされた日時、通知された担当者、エスカレーションの進行状況を記録するアクティビティログです。独自のコメントを追加して、他の担当者にコンテキストを提供できます。

{{< img src="incident_response/on-call/pages/on-call-timeline-demo.png" alt="On-Call Page の Timeline セクション。コメント入力フィールドと、Page のトリガー、送信された通知、確認などのイベントを時系列で記録したログが表示されています。" style="width:60%;" >}}

コメントを使用して、以下のことを行います。
- 調査済みまたは除外した内容を記録する
- 別の担当者に引き継ぐ際にコンテキストを提供する
- 対応に影響を与えた外部要因を記録する

コメントを追加するには、Page を開き、**Timeline** セクションにテキストを入力します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /ja/incident_response/on-call/pages/live_call_routing
[4]: /ja/incident_response/on-call/routing_rules/#send-pages-to-slack-or-microsoft-teams
[5]: /ja/incident_response/incident_management/notification/#trigger-a-page-from-an-incident
[6]: /ja/incident_response/incident_management/
[7]: https://app.datadoghq.com/on-call/pages
[8]: /ja/monitors/notify/#renotify