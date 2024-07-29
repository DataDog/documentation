---
aliases:
- /ja/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /ja/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /ja/developers/faq/what-do-notifications-do-in-datadog
- /ja/monitors/notifications/
description: モニターがアラートをトリガーしたときにチームに通知を送信する
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理
title: 通知
---

## 概要

通知は、チームに問題を知らせ、トラブルシューティングをサポートするモニターの重要なコンポーネントです。[モニターを作成する][1]場合は、**Configure notifications and automations** (通知と自動化の構成) セクションに追加します。

## 通知と自動化の構成

**Configure notifications and automations** (通知と自動化の構成) セクションを使用して、以下を行います。
- メール、Slack、PagerDuty、その他のインテグレーションでチームに通知を送ります。
- ワークフローをトリガーしたり、モニターからワークフローを作成します。
- モニターにケースを追加します。

### タイトル

モニターに一意のタイトルを追加します（必須）。マルチアラートモニターの場合、トリガースコープを識別するいくつかのタグが自動的に挿入されます。また、[タグ変数][2]を使用できます。

### メッセージ

メッセージフィールドでは、標準の[マークダウンフォーマット][3]と[変数][4]を使用できます。[@通知](#notifications)を使用して別の連絡先に送信される通知テキストを調整するには、[条件付き変数][5]を使用します。

モニターメッセージの一般的な使用例は、問題を解決するための段階的な方法を含めることです。次に例を示します。

```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

### 通知

`@notification` を使用して、チームメンバー、インテグレーション、ワークフロー、またはケースを通知に追加します。入力すると、Datadog がドロップダウンメニューで既存のオプションをお勧めします。オプションをクリックして、通知に追加します。または、**@ Add Mention**、**Add Workflow**、**Add Case** をクリックします。

**注**: `@通知` は最後の行文字との間にスペースが必要です。次に例を示します。

```text
Disk space is low @ops-team@company.com
```
`@通知`は以下に送信できます。

#### メール

{{% notifications-email %}}

#### チーム

通知チャンネルが設定されている場合、通知を特定のチームにルーティングできます。@team-handle をターゲットにしたモニターアラートは、選択した通信チャンネルにリダイレクトされます。チームへの通知チャンネルの設定の詳細については、[Teams][6] ドキュメントを参照してください。

#### インテグレーション

{{% notifications-integrations %}}

### ワークフロー
[ワークフローの自動化][7]をトリガーしたり、モニターから新しいワークフローを作成することができます。

**既存のワークフローをモニターに追加するには**:
1. メッセージセクションに、ワークフローの完全なメンション名を追加します。
   - メンション名は `@workflow-` で始まる必要があります。例えば、`@workflow-my-workflow` のようになります。
   - ワークフローにトリガー変数を渡すには、カンマ区切りのリストで `@workflow-name(key=value, key=value)` という構文を使います。メッセージテンプレート変数をトリガー変数として使用することができます。例えば、`@workflow-my-workflow(hostname=host.name)` とします。

1. または、**Add Workflow** をクリックし、ドロップダウンメニューで検索します。

ワークフローのトリガーについては、[ワークフローをトリガーする][8]を参照してください。

**ワークフローを作成するには**:
1. **Add Workflow** をクリックします。
1. **+** アイコンをクリックし、ブループリントを選択するか、**Start From Scratch** を選択します。
   {{< img src="/monitors/notifications/create-workflow.png" alt="+ ボタンをクリックして、新しいワークフローを追加する" style="width:90%;">}}

ワークフローの構築については、[ワークフローを構築する][9]を参照してください。

### 優先度

モニターに関連付けられた優先度 (オプション) を追加します。値の範囲は P1 から P5 で、P1 が最高の優先度、P5 が最低の優先度です。通知メッセージでモニターの優先度を上書きするには、`{{override_priority 'Pi'}}` を使用し、`Pi` を P1 から P5 の間で設定します。

たとえば、`alert` および `warning` 通知を異なる優先度で設定できます。

```
{{#is_alert}}
{{override_priority 'P1'}}
 ...
{{/is_alert}}
{{#is_warning}}
{{override_priority 'P4'}}
...
{{/is_warning}}
```

### 追加コンテンツのトグル

モニター通知には、モニターのクエリ、使用された @メンション、メトリクススナップショット (メトリクスモニターの場合)、Datadog の関連ページへのリンクなどのコンテンツが含まれます。個々のモニターの通知に含める、または除外するコンテンツを選択するオプションがあります。

<div class="alert alert-warning">パーセンタイルアグリゲーターを持つディストリビューションメトリクス (`p50`、`p75`、`p95`、`p99` など) は、通知でスナップショットグラフを生成しません。 </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="モニタープリセットを設定する" style="width:70%;" >}}

オプションは、以下の通りです。

- **Default**: コンテンツが隠れることはありません。
- **Hide Query**: 通知メッセージからモニターのクエリを削除します。
- **Hide Handles**: 通知メッセージで使用されている @メンションを削除します。
- **Hide All**: 通知メッセージには、クエリ、ハンドル、スナップショット (メトリクスモニター用)、フッターの追加リンクは含まれません。

**注**: インテグレーションによっては、デフォルトで表示されないコンテンツがあります。

### メタデータ

モニターにメタデータ (優先度、タグ、Datadog チーム) を追加します。モニターの優先度を P レベル (P1 から P5) で設定できます。モニタータグ (メトリクスタグとは異なります) は、UI でモニターをグループ化して検索するために使用されます。タグポリシーが構成されている場合は、必要なタグとタグ値を追加する必要があります。詳しくは、[タグポリシー][10]を参照してください。Datadog Teams を使用すると、このモニターに所有者のレイヤーを設定し、チームにリンクされているすべてのモニターを表示することができます。詳細については、[Datadog Teams][11] を参照してください。

{{< img src="monitors/notifications/notifications_metadata.png" alt="ポリシータグ構成の表示。'Policy tags' の下には、'Select value' のドロップダウンの横に、cost_center、product_id、env の 3 つのタグの例が示されています。" style="width:100%;" >}}

### 再通知

モニターの再通知（オプション）を有効にすると、問題の未解決をチームに知らせることができます。

  {{< img src="monitors/notifications/renotify_options.png" alt="再通知の有効化" style="width:90%;" >}}

再通知の間隔、再通知の対象となるモニターの状態 (`alert`、`no data`、`warn`) を構成し、オプションで再通知メッセージの送信数の制限を設定します。

例えば、`stop renotifying after 1 occurrence` (1 回発生したら再通知を停止する) ようにモニターを設定すると、メインの警告の後に 1 回のエスカレーションメッセージを受信することができます。
**注:** 再通知の[属性とタグの変数][12]には、再通知の期間中にモニターが利用できるデータが入力されます。

再通知が有効になっている場合、モニターが指定した時間、選択した状態のいずれかに留まっている場合に送信されるエスカレーションメッセージを含めるオプションが提供されます。


エスカレーションメッセージは次の方法で追加できます。

* 元の通知メッセージの `{{#is_renotify}}` ブロック (推奨)。
* `Configure notifications and automations` セクションの *Renotification message* フィールド。
* API の `escalation_message` 属性。

`{{#is_renotify}}` ブロックを使用する場合、元の通知メッセージも再通知に含まれます。

1. `{{#is_renotify}}` ブロックには余分な詳細のみを含め、元のメッセージの詳細は繰り返さないでください。
2. グループのサブセットにエスカレーションメッセージを送信します。

[サンプルセクション][13]で、これらのユースケースに合わせてモニターを構成する方法を学びましょう。


## 権限と監査通知の定義

### 変更

モニターが作成、変更、無音設定、または削除されるたびに[イベント][14]が生成されます。`Notify` オプションを設定して、これらのイベントをチームメンバー、チャットサービス、モニター作成者に通知します。

### 権限

すべてのユーザーは、関連するロールに関係なく、すべてのモニターを読むことができます。

デフォルトでは、[モニターの書き込み権限][15]を持つユーザーのみがモニターを編集できます。[Datadog Admin ロールおよび Datadog Standard ロール][16]には、デフォルトでモニターの書き込み権限があります。オーガニゼーションで[カスタムロール][17]を使用している場合、他のカスタムロールにモニターの書き込み権限が付与されていることがあります。

モニターの編集が許可される[ロール][18]のリストを指定することで、さらにモニターに制限を設定できます。モニターの作成者は、常にモニターを編集することが可能です。

  {{< img src="monitors/notifications/monitor_rbac_restricted.jpg" alt="RBAC 制限付きモニター" style="width:90%;" >}}

編集には、モニターのコンフィギュレーションの更新、モニターの削除、モニターのミュート（時間の長短を問わず）などが含まれます。

**注**: 制限は UI と API の両方に適用されます。

モニターの RBAC 設定や、モニターを固定設定からロール制限の使用へ移行する方法について、詳しくは[モニターに RBAC を設定する方法][19]をご参照ください。

## テスト通知

テスト通知は、ホスト、メトリクス、異常、外れ値、予測値、ログ、RUM、APM、インテグレーション (チェックのみ)、プロセス (チェックのみ)、ネットワーク (チェックのみ)、カスタムチェック、イベント、複合条件の[モニターの種類][20]でサポートされています。

### テストを実行する

1. モニターを定義したら、モニターページの右下にある **Test Notifications** ボタンを使用して通知をテストします。

2. テスト通知ポップアップから、テストするモニターケースを選択します。テストできるのは、アラート条件で指定されたしきい値について、モニターのコンフィギュレーションで使用可能な状態のみです。ただし、[回復しきい値][21]は例外です。これは、モニターがアラート状態でなくなったか、警告状態がなくなったときに、Datadog が回復通知を送信するためです。

    {{< img src="monitors/notifications/test-notif-select.png" alt="このモニターの通知をテストする" style="width:70%;" >}}

3. **Run Test** をクリックして、モニターにリストされている人とサービスに通知を送信します。

### イベント

テスト通知は、イベントエクスプローラー内で検索できるイベントを生成します。テストを開始したユーザーをメッセージ本文で示し、通知のタイトルに `[TEST]` が付きます。

タグ変数は、Datadog 子イベントのテキストにのみ入力されます。親イベントは、集計サマリーのみを表示します。

### 変数 {#variables-test-notification}

メッセージ変数には、モニター定義のスコープに基づいて、ランダムに選択されたグループが自動挿入されます。例:

```text
{{#is_alert}}
{{host.name}} <-- これが入力されます
{{/is_alert}}
```
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/configuration
[2]: /ja/monitors/notify/variables/#tag-variables
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /ja/monitors/notify/variables/
[5]: /ja/monitors/notify/variables/#conditional-variables
[6]: /ja/account_management/teams/#send-notifications-to-a-specific-communication-channel
[7]: /ja/service_management/workflows/
[8]: /ja/service_management/workflows/trigger/#trigger-a-workflow-from-a-monitor
[9]: /ja/service_management/workflows/build/
[10]: /ja/monitors/settings/#tag-policies
[11]: /ja/account_management/teams/
[12]: /ja/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[13]: /ja/monitors/notify/variables/?tab=is_renotify#examples
[14]: /ja/events/
[15]: /ja/account_management/rbac/permissions/#monitors
[16]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[17]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[18]: /ja/account_management/rbac/?tab=datadogapplication
[19]: /ja/monitors/guide/how-to-set-up-rbac-for-monitors/
[20]: /ja/monitors/types
[21]: /ja/monitors/guide/recovery-thresholds/