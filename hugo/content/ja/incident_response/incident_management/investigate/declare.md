---
aliases:
- /ja/service_management/incident_management/declare/
- /ja/incident_response/incident_management/declare
title: インシデントの宣言
---
## 概要 {#overview}

Datadog パラダイムでは、次のいずれかがインシデントを宣言するための適切な状況です。
- インシデントが顧客に影響を及ぼしている、またはその可能性があります。
- インシデント (内部的なものを含む) が緊急に対処される必要があると判断しました。
- インシデントを呼び出す必要があるかどうかわかりません。他の人に通知し、重大度を適切に上げます。

Datadog プラットフォーム内の複数の場所 (ダッシュボードのグラフウィジェット、Incidents UI、Datadog にレポートするアラートなど) からインシデントを宣言できます。

## 宣言モーダル {#declaration-modal}

インシデントを宣言すると、宣言モーダルが表示されます。このモーダルには、いくつかの主要な要素があります。

| インシデント要素  | 説明 |
| ------------------ | ----------- |
| タイトル              | (必須) インシデントのわかりやすいタイトル。|
| 重大度レベル     | (必須) デフォルトでは、重大度は SEV-1 (最も重大) から SEV-5 (最も重大はでない) までの範囲です。重大度の数とその説明は、Incident Management 設定でカスタマイズできます。
| Incident Commander | インシデント対応を主導するために割り当てられた担当者。|

[Incident Management Settings][2] を構成して、インシデント宣言モーダルにフィールドを追加したり、特定のフィールドを必須にしたりできます。


## インシデントページから {#from-the-incident-page}

[Datadog UI][1] で **Declare Incident** をクリックし、インシデントを作成します。

*Declare Incident* モーダルには、組織で使用される重大度とステータスのヘルプテキストおよび説明を含む、折りたたみ可能なサイドパネルが表示されます。ヘルプテキストおよび説明は、[インシデント設定][2] でカスタマイズ可能です。

## モニターから {#from-a-monitor}

モニターから直接インシデントを宣言できます。**Declare incident** を選択してインシデント作成モーダルを開くと、モニターがシグナルとしてインシデントに追加されます。既存のインシデントにモニターを追加することもできます。

{{< img src="incident_response/incident_management/investigate/declare/declare_monitor.png" alt="モニターのアクションドロップダウンメニューから、インシデントを宣言オプションを選択できます。" style="width:50%;" >}}

または、モニターが `warn`、`alert`、または `no data` ステータスに遷移したときに、モニターで自動的にインシデントを作成するように設定することもできます。これを有効にするには、モニターの**通知と自動化の設定**セクションで**インシデントを追加**をクリックし、`@incident-` オプションを選択します。管理者は、[インシデント設定][9] で `@incident-` オプションを作成できます。

モニターから作成されたインシデントは、モニターのタグから [フィールド値][10] を継承します。インシデントから自動通知を送信するには、作成されたインシデントが [通知ルール][11] の条件に一致するようにモニターにタグを追加します。

## セキュリティシグナルから {#from-a-security-signal}

Cloud SIEM または Workload Protection のシグナルサイドパネルで**インシデントを宣言**または**調査をエスカレーション**をクリックして、直接インシデントを宣言します。詳細については、[セキュリティシグナルの調査][3] を参照してください。

App and API Protection シグナルのサイドパネルに表示されるアクションから、インシデントを宣言します。**すべてのアクションを表示**をクリックし、**インシデントを宣言**をクリックします。
詳細については、App and API Protection の [セキュリティシグナルの調査][4] を参照してください。

{{< img src="/incident_response/incident_management/investigate/declare/declare_asm.png" alt="画像の説明" style="width:90%;" >}}

## 漏洩シークレットから {#from-a-leaked-secret}

[Secret Scanning][15] の検出サイドパネルで**インシデントを宣言**をクリックして、インシデントを宣言します。インシデントには、すべての検出メタデータが事前に入力されます。

{{< img src="/incident_response/incident_management/investigate/declare/declare-secrets.png" alt="画像の説明" style="width:90%;" >}}

## ワークアイテムから {#from-a-work-item}

[Work Management][5] からインシデントを宣言します。個々のワークアイテムの詳細ページで**インシデントを宣言**をクリックすると、ワークアイテムをインシデントにエスカレーションできます。

## グラフから {#from-a-graph}
グラフのエクスポートボタンをクリックし、**インシデントを宣言**をクリックすることで、グラフから直接インシデントを宣言できます。インシデント作成モーダルが表示され、グラフがシグナルとしてインシデントに追加されます。

{{< img src="incident_response/incident_management/from-a-graph.png" alt="グラフからインシデントを作成する" style="width:80%;">}}

## Synthetic テストから {#from-a-synthetic-test}

[Synthetic テスト][8] のアクションドロップダウンから直接インシデントを作成します。**インシデントを宣言**を選択してインシデント作成モーダルを開くと、テストの概要がインシデントタイムラインに追加され、そこから調査を進めることができます。

{{< img src="incident_response/incident_management/investigate/declare/synthetics_declare_incident.png" alt="Synthetic テストからインシデントを宣言します。" style="width:90%;" >}}

## Datadog クリップボードから {#from-the-datadog-clipboard}
[Datadog クリップボード][6] を使用して複数のモニターやグラフを収集し、インシデントを生成します。クリップボードからインシデントを宣言するには、調査対象のグラフをコピーし、コマンド `Cmd/Ctrl + Shift + K` でクリップボードを開きます。**インシデントを宣言**またはエクスポートアイコンをクリックして、シグナルとしてインシデントに追加します。

{{< img src="incident_response/incident_management/investigate/declare/declare_clipboard.png" alt="Datadog クリップボードからインシデントを宣言する" style="width:90%;" >}}

## Datadog On-Call ページから {#from-a-datadog-on-call-page}

[Datadog On-Call ページ][12] から直接インシデントを宣言できます。[On-Call ページリスト][13] からページを選択し、**インシデントを宣言**をクリックしてインシデントを作成すると、関連する On-Call チームが自動的に関連付けられます。

## Slack から {#from-slack}

[Datadog インテグレーションを Slack で有効化][7] している場合、どの Slack チャンネルからでもスラッシュコマンド `/datadog incident` を使用して新しいインシデントを宣言できます。

インシデントを宣言するユーザーが Slack を Datadog アカウントに接続している場合、デフォルトでそのユーザーがインシデントコマンダーとしてリストされます。インシデントコマンダー (IC) は、必要に応じて後からアプリ内で変更できます。インシデントを宣言するユーザーが Datadog アカウントのメンバーではない場合、IC は汎用の `Slack app user` に割り当てられ、アプリ内で別の IC に割り当て直すことができます。

{{< img src="incident_response/incident_management/from-slack.png" alt="Slack からインシデントを作成する" style="width:60%;">}}

Slack でインシデントを宣言すると、インシデントチャネルが生成されます。

## Google Chat から {#from-google-chat}

[Google Chat の Datadog インテグレーション][14] を設定している場合は、任意の Google Chat スペースからスラッシュコマンド `/dd_incident` を使用してインシデントを宣言できます。

## Handoff Notifications から {#from-handoff-notifications}

Handoff Notifications は、オンコールページが送信されたとき、またはアクティブなインシデントに追加されたときに、コールアウトカードを表示します。これらのカードでは、以下が可能です。

- On-Call ページを表示し、承認する
- 関連するインシデントリソースに移動する
- インシデントチャネルからの Slack メッセージをプレビューする
- インシデントに対して直接アクションを実行する

{{< img src="/incident_response/incident_management/investigate/declare/handoff_notification_card.png" alt="インシデントの詳細を表示し、確認し、アクションを実行するオプションが表示されたハンドオフ通知カード" style="width:100%;" >}}

ハンドオフ通知カードは、閉じられるか、インシデントのステータスが変更されるまで表示されたままになります。個々のカードではなく、ハンドオフコンテナ全体を展開、折りたたむ、または閉じることができます。

個々のハンドオフ通知カードからインシデントを宣言できます。

## 次のステップ {#whats-next}

{{< whatsnext desc="インシデントに役立つ情報を追加し、調査に関与する全員にコンテキストを提供します。">}}
    {{< nextlink href="/incident_response/incident_management/investigate/describe" >}}インシデントの説明: コンテキストと詳細を追加する{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents
[2]: /ja/incident_response/incident_management/setup_and_configuration/information
[3]: /ja/security/workload_protection/investigate_and_triage/security_signals/actions/#declare-an-incident
[4]: /ja/security/application_security/threat_protection/security_signals/#declare-an-incident
[5]: /ja/incident_response/work_management/view_and_manage
[6]: /ja/dashboards/guide/datadog_clipboard
[7]: /ja/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: https://app.datadoghq.com/synthetics/tests
[9]: https://app.datadoghq.com/incidents/settings?section=global-settings
[10]: /ja/incident_response/incident_management/setup_and_configuration/property_fields
[11]: /ja/incident_response/incident_management/setup_and_configuration/notification_rules
[12]: /ja/incident_response/on-call/
[13]: https://app.datadoghq.com/on-call/pages
[14]: /ja/integrations/google-hangouts-chat/
[15]: /ja/security/code_security/secret_scanning/