---
aliases:
- /ja/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /ja/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /ja/developers/faq/what-do-notifications-do-in-datadog
- /ja/monitors/notifications/
description: モニターがアラートをトリガーしたときにチームへ通知を送信する
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターを作成する
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターを管理する
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: ラーニングセンター
  text: アラートモニターの通知をカスタマイズするためのコースを受講する
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: ブログ
  text: Datadog のモニター通知ルールを使用して、モニターアラートのルーティングを行う
title: Notifications
---
## 概要{#overview}

Notifications は、Issue についてチームに知らせ、トラブルシューティングをサポートするモニターの重要なコンポーネントです。[モニターを作成する][1]際に、以下の応答を設定します。
- 実行可能なメッセージを作成する
- ワークフローをトリガーする、またはモニターからワークフローを作成する
- [作業項目を自動的に作成する][2]
- インシデントを自動的に作成する

## 効果的なタイトルとメッセージの作成{#constructing-effective-titles-and-messages}

このアプローチは、モニターのタイトルとメッセージが明確で、実行可能であり、対象読者のニーズに合わせて調整されていることを保証します。
- **一意のタイトル**: モニターに一意のタイトルを追加します (必須)。マルチアラートモニターの場合、トリガースコープを識別する一部のタグが自動的に挿入されます。[タグ変数][3]を使用して、詳細を指定できます。
- **メッセージフィールド**: メッセージフィールドは、標準の [Markdown フォーマット][4]と[変数][5]をサポートします。[条件付き変数][6]を使用して、[@notifications](#notifications) で異なる連絡先に送信される通知テキストを調整します。[合成テンプレート変数][23]を使用して、合成エラーのコンテキストをアラートメッセージに追加します。

<div class="alert alert-info">Markdown フォーマットのサポートは、通知方法によって異なります。一部のチャンネルでは、Markdown 構文のサブセットのみがサポートされています。
<ul>
  <li/>Slack 通知: 基本的なフォーマット (太字、斜体、インラインコード、リンク) をサポートしています。Markdown ヘッダー (例:<code>#</code>,<code>##</code>) やテーブルはレンダリングされず、プレーンテキストとして表示されます。
  <li/>メール通知: 基本的なフォーマット (太字、斜体、インラインコード、リンク) をサポートしています。テーブルは Markdown テーブルとしてレンダリングされず、メッセージ本文にはプレーンテキストとして表示されます。
</ul>
</div>

{{% collapse-content title="モニターメッセージの例" level="h3" expanded=false %}}
モニターメッセージの一般的なユースケースは、問題を解決するためのステップバイステップの方法を含めることです。例:

```text
{{#is_alert}} <-- conditional variable

Steps to free up disk space on {{host.name}}: <-- tag variable

1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files

@slack-incident-response <-- channel to send notification

{{/is_alert}}

```

{{% /collapse-content %}}


## 通知の受信者{#notification-recipients}
Datadog では、[モニター通知ルール][22]を使用してモニター通知を管理することを推奨しています。通知ルールを使用すると、定義済みの条件セットに基づいて、どの通知受信者をモニターに追加するかを自動化できます。通知のタグに基づいてアラートの送信先を振り分けるルールを作成しておけば、個々のモニターごとに受信者や通知のルーティングロジックを手動で設定する必要がなくなります。

通知ルールと個々のモニターの両方で、`@notification` を使用してチームメンバー、統合、ワークフロー、または作業項目を通知に追加できます。入力中、Datadog は既存のオプションをドロップダウンメニューで自動的に提案します。オプションをクリックして、通知に追加します。または、[{{< ui >}}@ Add Mention{{< /ui >}}]、[{{< ui >}}Add Workflow{{< /ui >}}]、[{{< ui >}}Add Case{{< /ui >}}] をクリックして追加することも可能です。

@notification とその前の行の最後の文字との間には、スペースが必要です。

| 正しいフォーマット| 誤ったフォーマット|
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Integrations" level="h3" expanded=false %}}
{{% notifications-integrations %}}
{{% /collapse-content %}}

{{% collapse-content title="Teams" level="h3" expanded=false %}}
{{% notifications-teams %}}
{{% /collapse-content %}}

{{% collapse-content title="ケース" level="h3" expanded=false %}}
{{% notifications-cases %}}
{{% /collapse-content %}}

{{% collapse-content title="メール" level="h3" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

### モニターの @-handle の一括編集{#bulk-editing-monitor-handles}
Datadog では、複数のモニターにわたるアラートメッセージの受信者を一度に編集できます。この機能を使用すると、モニターのメッセージ本文に含まれる `@-handles` を効率的に追加、削除、または置換できます。主なユースケースは以下のとおりです。

- **ハンドルの置換**: 複数のモニターにわたって、あるハンドルを別のハンドルに置き換えます。たとえば、`@pagerduty-sre` を `@oncall-sre` に変更する場合などです。単一のハンドルを複数のハンドルに入れ替えることもできます。たとえば、`@pagerduty-sre` を `@pagerduty-sre` と `@oncall-sre` の両方に置き換えることで、二重のページングやアラート通知範囲の拡大に対応できます。
- **ハンドルの追加**: 既存の受信者を削除せずに、新しい受信者を追加します。たとえば、選択したすべてのモニターに `@slack-infra-leads` を追加する場合などです。
- **ハンドルの削除**: モニターメッセージから特定のハンドルを削除します。たとえば、`@webhook-my-legacy-event-intake` を削除する場合などです。

## ワークフロー{#workflows}
モニターから[Workflow Automation][8]をトリガーしたり、新しいワークフローを作成したりできます。

ワークフローをモニターに追加する前に、[ワークフローにモニターのトリガーを追加][9]してください。

モニターのトリガーを追加した後、[既存のワークフローをモニターに追加][10]するか、新しいワークフローを作成します。モニターページから新しいワークフローを作成する手順は以下のとおりです。

1. [{{< ui >}}Add Workflow{{< /ui >}}] をクリックします。
1. {{< ui >}}+{{< /ui >}} アイコンをクリックしてブループリントを選択するか、[{{< ui >}}Start From Scratch{{< /ui >}}] を選択します。
   {{< img src="/monitors/notifications/create-workflow.png" alt="+ ボタンをクリックして新しいワークフローを追加する" style="width:90%;">}}

ワークフローの構築に関する詳細については、「[ワークフローの構築][11]」を参照してください。

## インシデント{#incidents}
モニターが `alert`、`warn`、または `no data` ステータスに移行したときに、モニターからインシデントを自動的に作成できます。[{{< ui >}}Add Incident{{< /ui >}}] をクリックし、[`@incident-`] オプションを選択します。管理者は、[インシデント設定][12]で`@incident-`オプションを作成できます。

モニターからインシデントが作成されると、モニターのタグに基づいてインシデントの[フィールド値][13]が自動的に入力されます。たとえば、モニターにタグ `service:payments` がある場合、インシデントの [サービス] フィールドは「payments」に設定されます。これらのインシデントの通知を受け取るには、モニターのタグがインシデント通知ルールと一致していることを確認してください。**注**: インシデント通知ルールはモニター通知ルールとは別に構成されるため、個別に設定する必要があります。詳細については、「[インシデント通知][14]」を参照してください。

## 追加コンテンツの切り替え{#toggle-additional-content}

モニター通知には、モニターのクエリ、使用された @-メンション、メトリクススナップショット (メトリクスモニターの場合)、Datadog 内の関連ページへのリンクなどのコンテンツが含まれます。個々のモニターについて、通知に含めるコンテンツと含めないコンテンツを選択できます。

<div class="alert alert-danger">パーセンタイル集計 (`p50`、`p75`、`p95`、`p99` など) を使用する分布メトリクスは、通知内のスナップショットグラフを生成しません。</div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="モニタープリセットを設定する" style="width:70%;" >}}

オプションは以下のとおりです。

- {{< ui >}}Default{{< /ui >}}: コンテンツは非表示になりません。
- {{< ui >}}Hide Query{{< /ui >}}: 通知メッセージからモニターのクエリを削除します。
- {{< ui >}}Hide Handles{{< /ui >}}: 通知メッセージで使用されている @-mention を削除します。
- {{< ui >}}Hide All{{< /ui >}}: 通知メッセージに、クエリ、ハンドル、スナップショット (メトリクスモニターの場合)、フッターの追加リンクなどが含まれないようにします。

**注**: 統合によっては、一部のコンテンツがデフォルトで表示されない場合があります。

## 再通知{#renotify}

モニターの再通知機能 (オプション) を有効にすると、問題が未解決であることをチームに再確認させることができます。

  {{< img src="monitors/notifications/renotify_options.png" alt="再通知を有効にする" style="width:90%;" >}}

再通知の間隔、再通知を行うモニターの状態 (`alert`、`no data`、`warn`) を設定し、必要に応じて再通知メッセージの送信回数に上限を設けることも可能です。

たとえば、モニターを [`stop renotifying after 1 occurrence`] に設定すると、メインのアラートの後に 1 通のエスカレーションメッセージを受け取ることができます。
**注:** 再通知内の[属性およびタグ変数][3]には、再通知の時点においてモニターが利用可能なデータが反映されます。

再通知を有効にすると、モニターが選択した状態のいずれかを指定時間継続した場合に送信されるエスカレーションメッセージを含めるオプションも利用可能になります。

エスカレーションメッセージは、以下の方法で追加できます。

* 元の通知メッセージ内の `{{#is_renotify}}` ブロック (推奨)。
* [{{< ui >}}Configure notifications and automations{{< /ui >}}] セクション内の [{{< ui >}}Renotification message{{< /ui >}}] フィールド
* API の `escalation_message` 属性

`{{#is_renotify}}` ブロックを使用する場合、元の通知メッセージも再通知に含まれるため、以下の点に注意してください。

1. `{{#is_renotify}}` ブロックには追加情報のみを記述し、元のメッセージの内容を繰り返さないようにします。
2. エスカレーションメッセージをグループのサブセットに送信します。

これらのユースケースに合わせてモニターを設定する方法については、「[例のセクション][15]」を参照してください。

## メタデータ{#metadata}

モニターにメタデータ (優先度、タグ、Datadog Team) を追加します。モニターの優先度を使用すると、P レベル (P1 〜 P5) を使用してモニターの重要度を設定できます。モニタータグ (メトリクスタグとは異なる) は、UI でモニターをグループ化したり検索したりするために使用されます。タグポリシーが設定されている場合は、必須のタグとタグ値を追加する必要があります。詳細については、「[タグポリシー][16]」を参照してください。Datadog Teams を使用すると、このモニターの所有権を設定し、チームに関連付けられたすべてのモニターを表示できます。詳細については、「[Datadog Teams][17]」を参照してください。

{{< img src="monitors/notifications/notifications_metadata.png" alt="ポリシータグ設定の表示。[ポリシータグ] の下には、cost_center、product_id、env という 3 つのタグの例があり、その横に [値を選択] ドロップダウンがあります。" style="width:100%;" >}}

{{% collapse-content title="優先度" level="h3" expanded=false %}}

モニターに関連付けられた優先度 (オプション) を追加します。値は P1 から P5 の範囲で指定し、P1 が最も高く、P5 が最も低い優先度となります。
通知メッセージ内でモニターの優先度を上書きするには、以下を使用します。`{{override_priority 'Pi'}}` where `(ここで `Pi` は P1 から P5 のいずれかです)。

たとえば、`alert` と `warning` の通知に対して、それぞれ異なる優先度を設定することができます。

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
{{% /collapse-content %}}


## 集計{#aggregation}

モニターのクエリがグループ化されている場合は、通知グループから 1 つ以上のディメンションを削除することも、すべてを削除してシンプルアラートとして通知することもできます。

{{< img src="monitors/notifications/notifications_aggregation.png" alt="マルチアラートに設定された集計構成の表示。" style="width:100%;" >}}

この機能の詳細については、「[モニターの設定][18]」を参照してください。

## 通知のテスト{#test-notifications}

モニターを定義した後、モニターページ右下の [{{< ui >}}Test Notifications{{< /ui >}}] ボタンを使用して通知をテストします。

テスト通知は、以下の[監視タイプ][19]でサポートされています: ホスト、メトリクス、異常、外れ値、予測、ログ、RUM、APM、統合 (チェックのみ)、プロセス (チェックのみ)、ネットワーク (チェックのみ)、カスタムチェック、イベント、複合条件。

1. テスト通知のポップアップから、テストするモニターの遷移とグループ (クエリに [grouping][20] が含まれている場合のみ利用可能) を選択します。テストできるのは、アラート条件で指定されたしきい値に対し、モニターの設定で利用可能な状態のみです。ただし、[復旧しきい値][21]は例外です。Datadog は、モニターがアラートステータスでなくなった場合、または警告条件が設定されていない場合に、復旧通知を送信します。

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="このモニターの通知をテストする" style="width:70%;" >}}

1. [{{< ui >}}Run Test{{< /ui >}}] をクリックして、モニターにリストされている担当者やサービスに通知を送信します。

### イベント{#events}

テスト通知はイベントを生成し、それらはイベントエクスプローラー内で検索可能です。これらの通知は、通知タイトルの `[TEST]` が含まれ、メッセージ本文には誰がテストを開始したかが記載されます。

タグ変数は、Datadog の子イベントのテキスト内でのみ値が入力されます。親イベントには集計の概要のみが表示されます。

### 変数{#variables-test-notification}

メッセージ変数は、モニター定義のスコープに基づいてランダムに選択されたグループの情報で自動的に埋められます。例:

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/configuration
[2]: /ja/incident_response/work_management/create_work_item/#automatic-work-item-creation
[3]: /ja/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /ja/monitors/notify/variables/
[6]: /ja/monitors/notify/variables/#conditional-variables
[8]: /ja/actions/workflows/
[9]: /ja/actions/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /ja/actions/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /ja/actions/workflows/build/
[12]: https://app.datadoghq.com/incidents/settings?section=global-settings
[13]: /ja/incident_response/incident_management/setup_and_configuration/property_fields
[14]: /ja/incident_response/incident_management/notification
[15]: /ja/monitors/notify/variables/?tab=is_renotify#examples
[16]: /ja/monitors/settings/#tag-policies
[17]: /ja/account_management/teams/
[18]: /ja/monitors/configuration/#set-alert-aggregation
[19]: /ja/monitors/types
[20]: /ja/monitors/configuration/
[21]: /ja/monitors/guide/recovery-thresholds/
[22]: /ja/monitors/notify/notification_rules
[23]: /ja/synthetics/notifications/template_variables/