---
aliases:
- /ja/error_tracking/ticketing_systems/case_management/
further_reading:
- link: /error_tracking/explorer/
  tag: ドキュメント
  text: Error Tracking エクスプローラー
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking における問題の状態
- link: /incident_response/work_management/
  tag: ドキュメント
  text: Work Management
is_beta: false
private: false
title: Work Management を Error Tracking と統合する
---
## 概要{#overview}

Work Management を Error Tracking と統合して、Work Management の作業項目を作成し、Error Tracking の問題にリンクします。Work Management for Error Tracking を統合すると、以下のことができます。

- Error Tracking の問題パネルから直接 Work Management の作業項目を作成する
- 複数の Error Tracking の問題を 1 つの作業項目にグループ化する
- 自動化ルールを使用して、問題を特定の Work Management プロジェクトに自動的にルーティングする
- 特定の条件に一致する Error Tracking の問題に対応する Work Management の作業項目を自動的に作成する。

## セットアップ {#setup}

Error Tracking 用の Work Management 統合を使用するには、以下の [権限][1] が必要です。

- Error Tracking Read
- Error Tracking Issue Write
- Cases Read
- Cases Write

## 問題から作業項目を作成する {#create-a-work-item-from-an-issue}

問題パネルから直接 Work Management の作業項目を作成し、その問題に関する調査作業をグループ化できます。

1. [Error Tracking エクスプローラー][2] に移動します。
2. 問題をクリックして、問題パネルを開きます。
3. 問題パネルの [{{< ui >}}Actions{{< /ui >}}] (アクション) ドロップダウンで、[{{< ui >}}Add Case{{< /ui >}}] (ケースの追加) をクリックします。
4. 作業項目を作成する Work Management プロジェクトを選択します。デフォルトでは、作業項目は Error Tracking プロジェクトに自動的に作成されます。
5. [{{< ui >}}Create{{< /ui >}}] (作成) をクリックして、作業項目を作成します。

作成後、作業項目は Error Tracking の問題にリンクされます。その後、作業項目のリンクが問題パネルに表示され、問題のステータスが自動的に[ {{< ui >}}REVIEWED{{< /ui >}}] (レビュー済) に変更されます。

問題が作業項目にリンクされると、その状態、担当者、およびコメントが双方向に同期されます。
問題の状態と作業項目のステータスがどのように同期されるかについての詳細は、[問題と作業項目間の状態の双方向同期](#state-dual-way-sync-between-issues-and-work-items)を参照してください。

## 複数の問題を 1 つの作業項目にグループ化する {#group-multiple-issues-into-a-single-work-item}

複数の Error Tracking の問題を 1 つの Work Management の作業項目に紐付けると、相関する問題を 1 つの作業単位にグループ化できます。

1. [Error Tracking エクスプローラー][2] に移動します。
2. 問題をクリックして、問題パネルを開きます。
3. 問題パネルの [{{< ui >}}Actions{{< /ui >}}] (アクション) ドロップダウンで、[{{< ui >}}Add Case{{< /ui >}}] (ケースの追加) をクリックします。
4. [{{< ui >}}Add to Existing Case{{< /ui >}}] (既存ケースに追加) タブで、問題をグループ化する作業項目を選択します。
5. 問題を作業項目にリンクするには、[{{< ui >}}Attach to Case{{< /ui >}}] (ケースへの紐付け) をクリックします。
6. このグループに追加するすべての問題で、これらの操作を繰り返します。

リンクされたすべての Error Tracking の問題は作業項目ビューに表示されるので、関連するエラーがまとめられて表示されます。

複数の問題が作業項目にリンクされると、それらの状態、担当者、およびコメントが双方向に同期されます。問題の状態と作業項目のステータスがどのように同期されるかについての詳細は、[問題と作業項目間の状態の双方向同期](#state-dual-way-sync-between-issues-and-work-items)を参照してください。

作業項目と問題の関係は 1:N の関係です。1 つの作業項目を複数の問題にリンクできますが、1 つの問題は 1 つの作業項目にのみリンクできます。

## 問題と作業項目間の状態の双方向同期 {#state-dual-way-sync-between-issues-and-work-items}

### 単一の Error Tracking の問題が単一の Work Management の作業項目にリンクされている場合 {#single-error-tracking-issue-linked-to-single-work-management-work-item}

単一の Error Tracking の問題が単一の Work Management の作業項目にリンクされている場合、それらの状態は双方向に同期されます。問題の状態は以下のものにマッピングされます。
対応する作業項目のステータスグループのデフォルトステータス。

| Error Tracking の問題の状態 | Work Management のステータスグループ |
|----------------------------|------------------------------|
| [{{< ui >}}FOR REVIEW{{< /ui >}}] (レビュー待)  | [{{< ui >}}Open{{< /ui >}}] (未解決)        |
| [{{< ui >}}REVIEWED{{< /ui >}}]    | [{{< ui >}}In Progress{{< /ui >}}] (進行中) |
| [{{< ui >}}RESOLVED{{< /ui >}}]    | [{{< ui >}}Closed{{< /ui >}}] (終了)     |
| [{{< ui >}}IGNORED{{< /ui >}}] (無視)    | [{{< ui >}}Closed{{< /ui >}}]      |
| [{{< ui >}}EXCLUDED{{< /ui >}}] (除外済)   | [{{< ui >}}Closed{{< /ui >}}]      |

### 複数の Error Tracking の問題が単一の Work Management の作業項目にリンクされている場合 {#multiple-error-tracking-issues-linked-to-single-work-management-work-item}

複数の Error Tracking の問題が同じ Work Management の作業項目にリンクされている場合、状況に応じてそれらの状態間でも同期が行われます。
- 作業項目のステータスを更新すると、前の段落で説明した状態マッピングに従って、リンクされているすべての問題が更新されます。
- 問題の状態を更新すると、その結果として、リンクされている他の問題および作業項目の状態は次のルールに従ったものになります。

| 変更前の状態                                                       | アクション                                                 | 変更後の状態                                                                                 |
|--------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| ケースは [{{< ui >}}CLOSED{{< /ui >}}] で、すべての問題が [{{< ui >}}RESOLVED{{< /ui >}}]。               | 1 つの問題を [{{< ui >}}FOR REVIEW{{< /ui >}}] に更新します。                 | ケースは [{{< ui >}}OPEN{{< /ui >}}] になりますが、他のすべての問題は [{{< ui >}}RESOLVED{{< /ui >}}] のままです。                                     |
| ケースは [{{< ui >}}OPEN{{< /ui >}}] で、すべての問題が [{{< ui >}}FOR REVIEW{{< /ui >}}]。               | 1 つの問題を [{{< ui >}}RESOLVED{{< /ui >}}] に更新します。                   | ケースは [{{< ui >}}OPEN{{< /ui >}}] のままで、1 つの問題が [{{< ui >}}RESOLVED{{< /ui >}}] になりますが、他のすべての問題は [{{< ui >}}FOR REVIEW{{< /ui >}}] のままです。             |
| ケースは{{< ui >}}CLOSED{{< /ui >}}で、別のリンクされていない 1 つの{{< ui >}}FOR REVIEW{{< /ui >}}の問題がある。| [{{< ui >}}FOR REVIEW{{< /ui >}}] の問題を [{{< ui >}}CLOSED{{< /ui >}}] のケースにリンクします。| ケースは [{{< ui >}}CLOSED{{< /ui >}}] のままで、すべての問題が [{{< ui >}}RESOLVED{{< /ui >}}] になります (新しくリンクされた問題を含む)。         |
| ケースは [{{< ui >}}OPEN{{< /ui >}}] で、別のリンクされていない [{{< ui >}}RESOLVED{{< /ui >}} ] の問題が 1 つある。    | [{{< ui >}}RESOLVED{{< /ui >}}] の問題を [{{< ui >}}OPEN{{< /ui >}}] のケースにリンクします。    | ケースは [{{< ui >}}OPEN{{< /ui >}}] のままで、新しく追加された問題を除くすべての問題は [{{< ui >}}FOR REVIEW{{< /ui >}}] のままで、新しく追加された問題も [{{< ui >}}RESOLVED{{< /ui >}}] のままです。|

## 自動化ルール{#automation-rules}

特定の問題を Work Management プロジェクトに一致させるようにルールを設定できます。たとえば、問題がルールに一致すると、その問題に対して手動または自動で作成された作業項目は、そのルールで指定されたプロジェクトにデフォルトで割り当てられます。

### セットアップ {#setup-1}

Error Tracking の問題の自動化ルールを作成するには、以下の [権限][1] のいずれか 1 つが必要です。
- Error Tracking Write
- Error Tracking Settings Write

### 自動化ルールの作成{#create-an-automation-rule}

Work Management の自動化ルールを作成するには、次のようにします。

1. [Error Tracking Settings][3] に移動し、[{{< ui >}}Ticketing & Automation{{< /ui >}}] (チケット発行と自動化) セクションを開きます。
2. [{{< ui >}}New Rule{{< /ui >}}] (新規ルール) をクリックします。
3. ルールを構成するには、次のようにします。
    - [{{< ui >}}Match Criteria{{< /ui >}}] (一致する条件): ルールをトリガーするために問題が満たすべき条件を定義します
    - [{{< ui >}}Project{{< /ui >}}] (プロジェクト): ルールに一致する問題から作成される作業項目の送信先の Work Management プロジェクトを選択します
    - [{{< ui >}}Auto-create{{< /ui >}}] (自動作成): 必要に応じて有効化し、問題が一致したときに作業項目が自動作成されるようにします
4. [{{< ui >}}Save Rule{{< /ui >}}] (ルールの保存) をクリックします。

### 一致条件 {#match-criteria}

以下の属性に基づいてルールを構成します。

- [{{< ui >}}Service{{< /ui >}}] (サービス): 特定のサービスからの問題を一致させます (例: `service:web-store`)
- [{{< ui >}}Team{{< /ui >}}] (チーム): [問題のチームオーナーシップ][4] に基づいて問題を一致させます (例: `team:Shopist`)

複数の条件を組み合わせて、正確なルーティングルールを作成できます。問題一致クエリは、以下の演算子をサポートしています。

- `AND`: 論理 AND (例: `service:web-store AND team:Shopist`)
- `OR`: 論理 OR (例: `service:web-store OR team:Shopist`)
- `-`: 論理 NOT (例: `service:web-store -team:Shopist`)

<div class="alert alert-info"> ルールには順序があります。課題に一致する最初のルールが適用されます。</div>

### 作業項目の自動作成 {#automatic-work-item-creation}

自動化ルールを追加する際、ルールに一致する問題に対して作業項目の自動作成を有効にできます。

デフォルトでは、新しい Error Tracking 問題が作成されると、ルールが評価され、最初に一致したルールが適用されます。その一致したルールで作業項目自動作成が有効になっている場合、ルールで指定されたプロジェクト内に新しい Work Management 作業項目が作成され、一致した問題に紐付けられます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /ja/error_tracking/issue_team_ownership/