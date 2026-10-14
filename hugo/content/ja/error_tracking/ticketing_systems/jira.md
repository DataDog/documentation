---
further_reading:
- link: /error_tracking/explorer/
  tag: ドキュメント
  text: Error Tracking Explorer
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking における Issue の状態
- link: /integrations/jira/
  tag: ドキュメント
  text: Jira 統合
is_beta: false
private: false
site_support_id: jira_error_tracking
title: Jira を Error Tracking と統合する
---
## 概要{#overview}

Jira と Error Tracking を統合することで、Error Tracking の Issue から Jira チケットを作成してリンクできるようになります。Jira と Error Tracking を連携させると、以下のことが可能になります。

- Error Tracking の Issue パネルから直接 Jira チケットを作成する
- 複数の Error Tracking の Issue を 1 つのチケットにまとめる
- 自動化ルールを使用して、Issue を特定の Jira ボードに自動的にルーティングする
- 特定の条件に一致する Error Tracking の Issue に対して、Jira チケットを自動的に作成する

## 前提条件{#prerequisites}

<div class="alert alert-info">Error Tracking の Issue からチケットを作成する機能は、Jira Cloud および Data Center で利用可能です。Jira と Error Tracking 間の双方向同期は、Jira Cloud でのみ利用可能です。</div>

1. [Datadog 用の Jira 統合][7]をセットアップします。
2. 以下の[権限][1]があることを確認してください。
   - Error Tracking Read
   - Error Tracking Issue Write
   - Cases Read
   - Cases Write
   - Integrations Read

## Issue からチケットを作成する{#create-a-ticket-from-an-issue}

Issue パネルから直接 Jira チケットを作成し、その Issue に関する調査作業をまとめることができます。

1. [Error Tracking Explorer][2] に移動します。
2. Issue をクリックして、Issue パネルを開きます。
3. Issue パネルの [{{< ui >}}Actions{{< /ui >}}] ドロップダウンから、[{{< ui >}}Add Jira ticket{{< /ui >}}] をクリックします。
4. チケットを作成する Jira アカウントとプロジェクトを選択します。次に、作成するチケットタイプを選択します。
5. 必要に応じて、Data Sync 設定にアクセスし、Datadog と Jira 間でデータを同期する方法を設定します。
6. [{{< ui >}}Create{{< /ui >}}] をクリックしてチケットを作成します。

{{< img src="error_tracking/create-ticket.png" alt="Error Tracking の Issue から Jira チケットを作成する" style="width:100%;" >}}

チケットが作成されると、そのチケットはその Error Tracking の Issue にリンクされます。Issue パネルにチケットへのリンクが表示され、Issue のステータスは自動的に [{{< ui >}}REVIEWED{{< /ui >}}] に変更されます。

Issue がチケットにリンクされると、その状態、担当者、およびコメントが双方向に同期されます。Issue の状態とチケットのステータスがどのように同期されるかについての詳細は、「[Issue とチケット間の状態の双方向同期](#state-dual-way-sync-between-issues-and-tickets)」を参照してください。

## 複数の Issue を 1 つのチケットにまとめる{#group-multiple-issues-into-a-single-ticket}

複数の Error Tracking の Issue を 1 つの Jira チケットに紐付けることで、関連する Issue を 1 つの作業単位にグループ化できます。

1. [Error Tracking Explorer][2] に移動します。
2. Issue をクリックして、Issue パネルを開きます。
3. Issue パネルの [{{< ui >}}Actions{{< /ui >}}] ドロップダウンから、[{{< ui >}}Add Jira ticket{{< /ui >}}] をクリックします。
4. [{{< ui >}}Add to Existing{{< /ui >}}] タブで、Issue をグループ化するチケットの URL を貼り付けます。
5. 必要に応じて、Data Sync 設定にアクセスし、Datadog と Jira 間でデータを同期する方法を設定します。
6. [{{< ui >}}Link to Issue{{< /ui >}}] をクリックして、Issue をチケットに紐付けます。
7. このグループに追加するすべての Issue に対して、これらの操作を繰り返します。

{{< img src="error_tracking/add-to-existing-ticket.png" alt="Error Tracking の Issue を既存の Jira チケットに追加する" style="height:300px;" >}}

複数の Issue が 1 つのチケットにリンクされている場合、その状態、担当者、およびコメントは双方向に同期されます。Issue の状態とチケットのステータスがどのように同期されるかについての詳細は、「[Issue とチケット間の状態の双方向同期](#state-dual-way-sync-between-issues-and-tickets)」を参照してください。

チケットと Issue の関係は 1 対 N です。1 つのチケットには複数の Issue をリンクできますが、1 つの Issue をリンクできる Jira チケットは 1 つだけです。

## Issue とチケット間の状態の双方向同期{#state-dual-way-sync-between-issues-and-tickets}

Datadog と Jira プロジェクト間で双方向同期が有効かつ適切に設定されている場合、Error Tracking の Issue と Jira チケットの状態はミラーリングされます。この状態同期で予期しない動作が発生した場合は、「[トラブルシューティング](#troubleshooting)」のセクションを参照して設定を修正してください。

### 1 つの Error Tracking の Issue が 1 つの Jira チケットにリンクされている場合{#single-error-tracking-issue-linked-to-single-jira-ticket}

1 つの Error Tracking の Issue が Jira チケットにリンクされている場合、それらの状態は双方向に同期されます。これらの状態間のマッピングは、チケット作成フォームまたは自動化ルールフォームのデータ同期設定で構成できます。

{{< img src="error_tracking/jira-status-mapping.png" alt="Error Tracking の Issue の状態を Jira チケットのステータスにマッピングする" style="width:100%;" >}}

### 複数の Error Tracking の Issue が 1 つの Jira チケットにリンクされている場合{#multiple-error-tracking-issues-linked-to-single-jira-ticket}

複数の Error Tracking の Issue が同じ Jira チケットにリンクされている場合、状況に応じてその状態間でも同期が行われます。チケットのステータスを更新すると、設定したマッピングに従い、リンクされているすべての Issue のステータスも同様に更新されます。

マッピングが次のように定義されていると仮定します。

| Work Management ステータスグループ| Jira チケットのステータス|
|------------------------------|--------------------|
| `Open`                       | `To Do`            |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

いずれかの Issue の状態を更新した場合、リンクされている他の Issue および Jira チケットの状態は、以下のルールに従って変化します。

| 初期状態                                                      | アクション                                                 | 結果の状態                                                                                    |
|--------------------------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| チケットは {{< ui >}}Done{{< /ui >}} で、すべての Issue は {{< ui >}}Resolved{{< /ui >}} です。               | 1 つの Issue を {{< ui >}}For Review{{< /ui >}} に更新します。                 | チケットは {{< ui >}}To Do{{< /ui >}} ですが、他のすべての Issue は {{< ui >}}Resolved{{< /ui >}} のままです。                                     |
| チケットは {{< ui >}}To Do{{< /ui >}} で、すべての Issue は {{< ui >}}For Review{{< /ui >}} です。            | 1 つの Issue を {{< ui >}}Resolved{{< /ui >}} に更新します。                   | チケットは {{< ui >}}To Do{{< /ui >}} で、1 つの Issue は {{< ui >}}Resolved{{< /ui >}}、他のすべての Issue は {{< ui >}}For Review{{< /ui >}} のままです。             |
| チケットは {{< ui >}}Done{{< /ui >}} で、リンクされていない {{< ui >}}For Review{{< /ui >}} の Issue が 1 つあります。| {{< ui >}}For Review{{< /ui >}} の Issue を {{< ui >}}Done{{< /ui >}} のチケットにリンクします。| チケットは {{< ui >}}Done{{< /ui >}} で、すべての Issue は {{< ui >}}Resolved{{< /ui >}} になります (新しくリンクされた課題を含む)。            |
| チケットは {{< ui >}}To Do{{< /ui >}} で、リンクされていない {{< ui >}}Resolved{{< /ui >}} の Issue が 1 つあります。 | {{< ui >}}Resolved{{< /ui >}} の Issue を {{< ui >}}To Do{{< /ui >}} のチケットにリンクします。 | チケットは {{< ui >}}To Do{{< /ui >}} で、新しい Issue を除いてすべての Issue は {{< ui >}}For Review{{< /ui >}} になります。新しい Issue は {{< ui >}}Resolved{{< /ui >}} のままです。|

## 自動化ルール{#automation-rules}

特定の Issue を Jira ボードに割り当てるためのルールを設定できます。Issue がルールに一致すると、その Issue に対して手動または自動で作成されたチケットは、ルールで指定されたボードにデフォルトで割り当てられます。

### セットアップ{#setup}

Error Tracking の Issue に対する自動化ルールを作成するには、以下のいずれかの[権限][1]が必要です。
- Error Tracking Write
- Error Tracking Settings Write

### 自動化ルールを作成する{#create-an-automation-rule}

Jira の自動化ルールを作成する手順は以下のとおりです。

1. [{{< ui >}}Ticketing & Automation{{< /ui >}}] セクションにある、[Error Tracking 設定][3]に移動します。
2. [{{< ui >}}New Rule{{< /ui >}}] をクリックします。
3. ルールを設定します。
    - {{< ui >}}Match Criteria{{< /ui >}}: ルールをトリガーするために Issue が満たすべき条件を定義します。
    - {{< ui >}}Destination{{< /ui >}}: ルールに一致する Issue からチケットが作成される際の、送信先となる Jira アカウントとプロジェクトを選択します。作成するチケットの種類を選択し、チケットの必須フィールドに値を入力します。
    - {{< ui >}}Auto-create{{< /ui >}}: Issue が一致した際にチケットを自動作成する機能を有効にします (オプション)。
4. [{{< ui >}}Save Rule{{< /ui >}}] をクリックします。

{{< img src="error_tracking/create-jira-automation-rule.png" alt="Jira 自動化ルールの作成" style="width:100%;" >}}

### 一致条件{#match-criteria}

以下の属性に基づいてルールを設定します。

- {{< ui >}}Service{{< /ui >}}: 特定のサービスからの Issue を対象とする (例: `service:web-store`)
- {{< ui >}}Team{{< /ui >}}: [Issue チームオーナーシップ][4]に基づいて Issue を絞り込む (例: `team:Shopist`)

複数の条件を組み合わせて、正確なルーティングルールを作成できます。Issue を特定するためのクエリでは、以下の演算子を使用できます。

- `AND`: 論理積 (例: `service:web-store AND team:Shopist`)
- `OR`: 論理和 (例: `service:web-store OR team:Shopist`)
- `-`: 論理否定 (例: `service:web-store -team:Shopist`)

<div class="alert alert-info">ルールには順序があります。Issue に最初に一致したルールが適用されます。</div>

### チケットの自動作成{#automatic-ticket-creation}

自動化ルールを追加する際、そのルールに一致する Issue に対して Jira チケットを自動作成する設定を有効にできます。

{{< img src="error_tracking/enable-auto-ticket-creation.png" alt="ケースの自動作成を有効にする" style="height:300px;" >}}

新しい Error Tracking の Issue が作成されると、ルールが評価され、最初に一致したルールが適用されます。その一致したルールで自動チケット作成が有効になっている場合、ルールで指定された Jira ボード上に新しい Jira チケットが作成され、該当する Issue に紐付けられます。

## トラブルシューティング{#troubleshooting}

Error Tracking とチケットシステムを併用する際に予期しない動作が発生した場合は、以下のトラブルシューティング手順を実行することで問題を迅速に解決できる可能性があります。それでも問題が解決しない場合は、[Datadog サポート][5]までお問い合わせください。

### Jira と Error Tracking 間の同期が機能していない{#sync-is-broken-between-jira-and-error-tracking}

Jira チケットと対応する Error Tracking の Issue との間で同期の問題が発生している場合 (Jira チケットをクローズしても Issue の状態が更新されないなど)、以下の設定がすべて正しく行われているか確認してください。

1. Issue パネルで、その Issue が Jira チケットに正しくリンクされていることを確認します。
2. Error Tracking の Issue と Jira チケットのリンクポイントとして機能する Work Management の作業項目が、Datadog によって自動的に作成されています。Issue パネルからこの作業項目にアクセスでき、作成された Work Management プロジェクトを確認できます。Work Management の設定で、そのプロジェクトに対して Jira 統合が有効になっており、正しい Jira アカウントとボードが設定されていることを確認します。

3. Work Management の設定で、このプロジェクトについて Work Management と Jira 間の同期が有効になっていることを確認します。同期対象のフィールドが、Datadog と Jira 間で双方向同期するように設定されているかチェックします。

4. Datadog と Jira 間で更新を自動的に同期するには、Webhook の設定が必要です。Jira の設定で、この Webhook が存在するかチェックします。Webhook が見当たらない場合は、[これらのステップ][6]に従って追加し、Datadog と Jira 間の同期を修正してください。

### Jira チケットの報告者が間違ったユーザーになっている{#reporter-on-jira-tickets-is-the-wrong-user}

Error Tracking の Issue から Jira チケットが作成される際、チケットの [{{< ui >}}Reporter{{< /ui >}}] フィールドには、チケット作成をトリガーしたユーザーではなく、Jira 統合を設定した Datadog ユーザーが設定されます。これは Datadog の Jira 統合における既知の仕様で、Error Tracking から作成されるすべてのチケットに適用されます。特定のチケットの報告者を変更するには、作成後に Jira で直接更新してください。

### Jira チケットごとに新しい Work Management プロジェクトが作成される{#a-new-work-management-project-is-created-for-each-jira-ticket}

Datadog Work Management は、各 Jira Issue タイプを異なる Work Management プロジェクトにマッピングします。これまでに使用されたことのない Jira Issue タイプを使用して Error Tracking の Issue からチケットを作成すると、その Error Tracking の Issue と Jira チケットを紐付けるための新しい Work Management プロジェクトが自動的に作成されます。この動作により、異なる Jira Issue タイプを使用して継続的にチケットを作成していくと、Issue タイプごとに 1 つずつ、複数の Work Management プロジェクトが作成されることになります。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /ja/error_tracking/issue_team_ownership/
[5]: /ja/help/
[6]: /ja/integrations/jira/#configure-a-jira-webhook
[7]: /ja/integrations/jira/#setup