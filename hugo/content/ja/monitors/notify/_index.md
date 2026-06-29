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
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: ラーニングセンター
  text: アラートモニター通知をカスタマイズするコースを受講する
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: ブログ
  text: Datadog モニター通知ルールでモニター アラートをルーティングする
title: 通知
---
## 概要 {#overview}

通知は、チームに問題を知らせ、トラブルシューティングをサポートするモニターの重要なコンポーネントです。[モニターを作成する][1]場合は、次のように応答を構成します。
- 実行可能なメッセージを作成します。
- ワークフローをトリガーしたり、モニターからワークフローを作成します。
- [自動的にケースを作成する][2]
- 自動的にインシデントを作成します。

## 効果的なタイトルとメッセージの構築 {#constructing-effective-titles-and-messages}

このアプローチは、モニターのタイトルとメッセージが明確で実行可能であり、対象のニーズに合わせて調整されていることを保証するのに役立ちます。
- **固有タイトル**: モニターに固有タイトルを追加します (必須)。マルチアラートモニターの場合、トリガーしているスコープを識別するタグの一部は自動的に挿入されます。[タグ変数][3]を使用して具体性を高めることができます。
- **メッセージフィールド**: メッセージフィールドでは、標準の[Markdownフォーマット][4]および[変数][5]がサポートされています。[条件付き変数][6]を使用することにより、[@notifications](#notifications)でさまざまな連絡先に送る通知テキストを調整します。[合成テンプレート変数][23]を使用することにより、合成失敗のコンテキストでアラートメッセージの機能を拡張します。

<div class="alert alert-info"> Markdown 形式のサポートは、通知方法に応じて異なります。一部のチャンネルでは、Markdown 構文のサブセットのみをサポートしています。
<ul>
  <li/>Slack 通知: 本的な書式設定 (太字、イタリック、インラインコード、リンク) がサポートされています。Markdown ヘッダー (例えば、<code>#</code>,<code>##</code>) および表はレンダリングされず、プレーンテキストとして表示されます。
  <li/>メール通知: 基本的な書式設定 (太字、イタリック、インラインコード、リンク) がサポートされています。表は Markdown 表としてはレンダリングされず、メッセージ本文にプレーンテキストとして表示されます。
</ul>
</div>

{{% collapse-content title="サンプルモニターメッセージ" level="h4" expanded=false %}}
モニターメッセージの一般的な使用例は、問題を解決するための段階的な方法を含めることです。次に例を示します。

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


## 通知受信者 {#notification-recipients}
Datadog では、モニター通知を管理するために[モニター通知ルール][22]の使用が推奨されています。通知ルールを使用すると、事前定義された条件セットに基づいて、モニターに追加される通知受信者を自動化できます。モニター通知のタグに基づいてモニターアラートをルーティングするために異なるルールを作成すれば、各モニタの受信者や通知ルーティングロジックを手動で設定する必要がなくなります。

通知ルールと個々のモニターの両方で、`@notification` を使用することにより、チームメンバー、インテグレーション、ワークフロー、またはケースを通知に追加できます。入力時に、ドロップダウンメニューで既存のオプションが Datadog からの自動推奨事項として示されます。オプションをクリックすると、それが通知に追加されます。または、**@ Add Mention**、**Add Workflow**、または **Add Case** をクリックしてください。

@notification では、最後の行文字との間にスペースが必要です。

| 正しいフォーマット | 誤ったフォーマット |
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Integrations" level="h4" expanded=false %}}
{{% notifications-integrations %}}
{{% /collapse-content %}}

{{% collapse-content title="Teams" level="h4" expanded=false %}}
{{% notifications-teams %}}
{{% /collapse-content %}}

{{% collapse-content title="ケース" level="h4" expanded=false %}}
{{% notifications-cases %}}
{{% /collapse-content %}}

{{% collapse-content title="Email" level="h4" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

### モニターの @ ハンドルを一括編集 {#bulk-editing-monitor-handles}
Datadog では、複数のモニターでアラートメッセージの受信者を一度に編集する機能がサポートされています。この機能を使用することにより、モニターメッセージ本文内の `@-handles` を効率的に追加、削除、または置き換えることができます。次のような使用例があります。

- **ハンドルを交換**: 複数のモニターで 1 つのハンドルを別のハンドルに置き換えます。たとえば、`@pagerduty-sre` を `@oncall-sre` に変更します。単一のハンドルを複数のハンドルと入れ替えることもできます。たとえば、`@pagerduty-sre` を `@pagerduty-sre` と `@oncall-sre` の両方に置き換えて、デュアルページングや拡張アラートカバレッジをサポートできます。
- **ハンドルを追加**: 既存の受信者を削除せずに新しい受信者を追加します。たとえば、すべての選択したモニターに `@slack-infra-leads` を追加します。
- **ハンドルを削除**: モニターメッセージから特定のハンドルを削除します。たとえば、`@webhook-my-legacy-event-intake` を削除します。

## ワークフロー {#workflows}
[ワークフローの自動化][8]をトリガーしたり、モニターから新しいワークフローを作成することができます。

ワークフローをモニターに追加する前に、[ワークフローにモニタートリガーを追加][9]します。

モニタートリガーを追加した後、[モニターに既存のワークフローを追加][10]するか、新しいワークフローを作成します。モニターページから新しいワークフローを作成するには、次のようにします。

1. **ワークフローを追加**をクリックします。
1. **+** アイコンをクリックし、ブループリントを選択するか、**Start From Scratch** を選択します。
   {{< img src="/monitors/notifications/create-workflow.png" alt="新しいワークフローを追加するには、[+] ボタンをクリックします。" style="width:90%;">}}

ワークフローの構築については、[ワークフローを構築する][11]を参照してください。

## インシデント {#incidents}
インシデントは、モニターが `alert`、`warn`、または `no data` の状態に遷移した時点で自動的に作成されます。**インシデントを追加**をクリックし、`@incident-` オプションを選択します。管理者は、[インシデント設定][12]で `@incident-` オプションを作成できます。

モニターからインシデントが作成されると、インシデントの[フィールド値][13]はモニターのタグに基づいて自動的に入力されます。たとえば、モニターにタグ `service:payments` がある場合、インシデントのサービスフィールドは "payments" に設定されます。これらのインシデントに関する通知を受け取るには、モニターのタグがインシデント通知ルールと一致していることを確認してください。**注**: インシデント通知ルールはモニター通知ルールとは別に設定され、独立して構成する必要があります。詳細については、[インシデント通知][14]を参照してください。

## 追加コンテンツのトグル {#toggle-additional-content}

モニター通知には、モニターのクエリ、使用される @メンション、メトリクススナップショット (メトリクスモニターの場合)、およびDatadogの関連ページへのリンクなどのコンテンツが含まれます。個々のモニターに対して、通知に含めるか除外するかを選択するオプションがあります。

<div class="alert alert-danger">パーセンタイルアグリゲーターを伴うディストリビューションメトリクス (`p50`、`p75`、`p95`、`p99` など) は、通知でスナップショットグラフを生成しません。</div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="モニタープリセットを設定する" style="width:70%;" >}}

オプションは、以下の通りです。

- **デフォルト**: コンテンツが隠れることはありません。
- **クエリを隠す**: 通知メッセージからモニターのクエリを削除します。
- **ハンドルを隠す**: 通知メッセージで使用されている @メンションを削除します。
- **すべて隠す**: 通知メッセージには、クエリ、ハンドル、スナップショット (メトリクスモニター用)、フッターの追加リンクは含まれません。

**注**: インテグレーションによっては、一部のコンテンツがデフォルトで表示されない場合があります。

## 再通知 {#renotify}

モニターの再通知 (オプション) を有効にすると、問題の未解決をチームに知らせることができます。

  {{< img src="monitors/notifications/renotify_options.png" alt="再通知を有効にする" style="width:90%;" >}}

再通知の間隔、再通知の対象となるモニターの状態 (`alert`、`no data`、`warn`) を構成し、オプションで再通知メッセージの送信数の制限を設定します。

たとえば、メインアラートの後に単一のエスカレーションメッセージを受け取るには、モニターを `stop renotifying after 1 occurrence` に構成します。
**注:** 再通知内の[属性およびタグ変数][3]には、再通知の期間中にモニターから利用可能なデータが設定されます。

再通知が有効になっている場合、モニターが指定した時間、選択した状態のいずれかに留まっている場合に送信されるエスカレーションメッセージを含めるオプションが提供されます。

エスカレーションメッセージは次の方法で追加できます。

* 元の通知メッセージの `{{#is_renotify}}` ブロック内 (推奨)。
* `Configure notifications and automations` セクションの *Renotification message* フィールド。
* API の`escalation_message` 属性。

``{{#is_renotify}}` ブロックを使用する場合、元の通知メッセージも再通知に含まれるため、次のようになります。

1. `{{#is_renotify}}` ブロックには余分な詳細のみを含め、元のメッセージの詳細は繰り返さないでください。
2. グループの一部にエスカレーションメッセージを送信します。

[サンプルセクション][15]で、これらのユースケースに合わせてモニターを構成する方法を学びましょう。

## メタデータ {#metadata}

モニターにメタデータ (優先度、タグ、Datadog チーム) を追加します。モニターの優先度により、P レベル (P1 ～ P5) を通じてモニターの重要性を設定できます。モニタータグ -- メトリックタグとは異なり、UI でモニターをグループ化および検索するために使用されます。タグポリシーが構成されている場合、必須タグとタグ値を追加する必要があります。詳細については、[タグポリシー][16]を参照してください。Datadog Teams を使用すると、このモニターに所有権のレイヤーを設定し、チームにリンクされているすべてのモニターを表示できます。詳細については、[Datadog Teams][17]を参照してください。

{{< img src="monitors/notifications/notifications_metadata.png" alt="ポリシータグ構成のビュー。「ポリシータグ」の下には、cost_center、product_id、および env の 3 つのサンプルタグがあり、その横に [値を選択] ドロップダウンがあります。" style="width:100%;" >}}

{{% collapse-content title="優先度" level="h4" expanded=false %}}

モニターに関連付けられている優先度 (オプション) を追加します。値は P1 ～ P5 の範囲であり、P1 が優先度最高、P5 が優先度最低です。
通知メッセージのモニター優先度をオーバーライドするには、次のものを使います: `{{override_priority 'Pi'}}` where `Pi` は P1 ～ P5 の間です。

たとえば、`alert` と `warning` の通知を異なる優先度で設定できます。

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


## 集計 {#aggregation}

モニターのクエリがグループ化されている場合、通知のグループ化から 1 つ以上の次元を削除するか、すべてを削除してシンプルアラートとして通知できます。

{{< img src="monitors/notifications/notifications_aggregation.png" alt="マルチアラートに設定された集計構成のビュー。" style="width:100%;" >}}

この機能に関する詳細は、[モニターの構成][18]を参照してください。

## テスト通知 {#test-notifications}

モニターを定義したら、モニターページの右下にある**テスト通知**ボタンを使用して通知をテストします。

テスト通知は、ホスト、メトリクス、異常、外れ値、予測値、ログ、RUM、APM、インテグレーション (チェックのみ)、プロセス (チェックのみ)、ネットワーク (チェックのみ)、カスタムチェック、イベント、複合条件の[モニターの種類][19]でサポートされています。

1. テスト通知ポップアップから、テストするモニターの遷移とグループを選択します (クエリに[grouping][20]がある場合のみ利用可能)。テストできるのは、アラート条件で指定されるしきい値のモニター構成で利用可能な状態だけです。[回復しきい値][21]は例外であり、Datadog はモニターがアラート状態でなくなった場合、または警告条件がない場合に回復通知を送信します。

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="このモニターの通知をテストします。" style="width:70%;" >}}

1. **テストを実行**をクリックして、モニターにリストされている人とサービスに通知を送信します。

### イベント {#events}

テスト通知は、イベントエクスプローラー内で検索可能なイベントを生成します。これらの通知は、通知タイトルに `[TEST]` を含めて、メッセージ本文でテストを開始した人を示します。

タグ変数は、Datadog の子イベントのテキストにのみ埋め込まれます。親イベントには集約サマリーのみが表示されます。

### 変数 {#variables-test-notification}

メッセージ変数には、モニター定義のスコープに基づいて、ランダムに選択されたグループが自動挿入されます。例:

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/configuration
[2]: /ja/incident_response/case_management/create_case/#automatic-case-creation
[3]: /ja/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /ja/monitors/notify/variables/
[6]: /ja/monitors/notify/variables/#conditional-variables
[8]: /ja/service_management/workflows/
[9]: /ja/service_management/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /ja/service_management/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /ja/service_management/workflows/build/
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