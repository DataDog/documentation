---
title: Incident Management の概要
kind: documentation
further_reading:
  - link: /monitors/incident_management/datadog_clipboard
    tag: ドキュメント
    text: Datadog クリップボード
  - link: https://www.youtube.com/watch?v=QIambwILy_M
    tag: ビデオ
    text: Datadog Incident Management について
  - link: /monitors/incident_management
    tag: ドキュメント
    text: インシデント管理
  - link: /blog/incident-response-with-datadog/
    tag: ブログ
    text: Datadog でのインシデント管理
  - link: /monitors/incident_management/notification_rules
    tag: ドキュメント
    text: 通知ルール
  - link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
    tag: ドキュメント
    text: インシデントと Slack のインテグレーション
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog for Government site では、インシデント管理をご利用いただけません。</div>
{{< /site-region >}}

## 概要

Datadog Incident Management は、メトリクス、トレース、またはログで発見した問題の追跡とコミュニケーションに役立ちます。

このガイドでは、Datadog サイトを使用してインシデントを宣言する、調査と修復の進行に合わせてインシデントを更新する、およびインシデントが解決したときに事後分析を生成する方法について説明します。この例では、[Slack インテグレーション][1]が有効になっていることを前提としています。

## インシデント管理のプロセス: 問題の検知から解決まで

### インシデントの宣言

**シナリオ:** エラーが大量に発生し、いくつかのサービスが遅延している可能性があるとモニターから警告されたと仮定します。お客様に影響が出ているかどうかは不明です。

このガイドでは、[Datadog クリップボード][2]を使ってインシデントを宣言する方法を説明します。

1. **Ctrl**/**Cmd** + **Shift** + **K** でクリップボードを開きます。

   クリップボードを使うと、グラフ、モニター、ダッシュボード全体、または[ノートブック][3]など、さまざまなソースから情報を収集することができます。これにより、インシデントを宣言する際に可能な限り多くの情報を収集することができます。

   このガイドでは、_System - Metrics_ ダッシュボードからクリップボードにコピーするグラフを選択します。

2. 画面左側の Datadog メニューで、**Dashboard** > **Dashboard lists** に進み、**System - Metrics** を選択します。

3. グラフのひとつにカーソルを合わせ、クリップボードにコピーします。

    a. **Ctrl**/**Cmd** + **C** を使用するか、

   または

    b. グラフ上で **Export** アイコンをクリックして **Copy** を選択します。

4. 画面左側の Datadog メニューで **Monitors** > **Manage Monitors** を開き、**[Auto] Clock in sync with NTP** を選択します。

5. **Add current page** をクリックしてモニターをクリップボードに追加します。

{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="クリップボードにコピー" responsive="true" style="width:100%;">}}

6. **Select All**、**Add Selected Items To…** の順にクリックします。

7. **New Incident** を選択します。

8. 発生している事象について説明します。
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 重大度                 | お客様に影響があるかどうか、また関連するサービスにどのような影響があるかが不明であるため、**Unknown**に設定します。各重大度の意味については、アプリ内の説明を参照し、チームのガイドラインに従ってください。                                                                                    |
| タイトル                    | インシデントのタイトルは、チームで使用している命名規則に従って設定します。これは実際のインシデントではないため、テストインシデントであることが明確になるよう `TEST` という言葉を含めます。タイトルの例: `[TEST] My incident test`                                                                      |
| シグナル                  | シグナルとは、インシデントを宣言する理由のことです。グラフやログ、その他のキービジュアルなどがこれに該当します。選択したグラフとモニターはすでに含まれていますが、その他のシグナルを追加することができます。例えば、このガイドの URL をコピーして、**Ctrl**/**Cmd** + **V** で追加します。                      |
| インシデントコマンダー       | 今回のテストではあなたに割り当てられたままにしてください。実際のインシデントが発生した場合はインシデント調査のリーダーに割り当てられます。インシデントの進行状況に合わせてインシデントコマンダーを更新することができます。                                                                                 |
| その他の通知 | 今回のテストでは、他のメンバーや他のサービスに警告を出さないよう空白にしておきます。実際のインシデントでは、調査や修復のために通知すべき人やサービスを追加します。これらの通知は Slack や PagerDuty にも送信できます。 |

9. **Declare Incident** をクリックしてインシデントを作成します。

   また、[グラフ][4]、[モニター][5]、または[インシデント API][6]からインシデントを宣言することもできます。APM ユーザーの場合、APM グラフ上の **Siren** アイコンをクリックしてインシデントを宣言できます。

   {{< img src="getting_started/incident_management/apm_siren.png" alt="APM Siren" responsive="true" style="width:50%;">}}

    Slack インテグレーションの一環として、`/datadog incident` ショートカットを使ってインシデントを宣言し、タイトル、重大度、顧客への影響を設定することもできます。

    インシデントが作成された後、右上の _Notify_ ボタンをクリックして通知を追加することができます。

    {{< img src="getting_started/incident_management/notify_button.png" alt="Notify" responsive="true" style="width:100%;">}}

10. インシデントページの左上にある **Open Slack Channel** をクリックすると、インシデントの Slack チャンネルに移動します。

    {{< img src="getting_started/incident_management/open_slack_channel.png" alt="Slack チャンネルを開く" responsive="true" style="width:60%;">}}

    新しいインシデントが発生すると、そのインシデント専用の新しい Slack チャンネルが自動的に作成され、チームとのコミュニケーションをそこに集約してトラブルシューティングを開始することができます。所属するオーガニゼーションの Slack インテグレーションがグローバルなインシデントチャンネルを更新するよう設定されている場合は、そのチャンネルが新しいインシデントで更新されます。

    この例では、新しいインシデントチャンネルに追加されたのはあなたのユーザーのみです。実際のインシデントで「Additional Notifications」に人やサービスを追加すると、その全員が自動的にインシデントチャンネルに追加されます。

    Slack インテグレーションが有効になっていない場合は、**Link to Chat** をクリックして、インシデントに関するやり取りに使用しているチャットサービスへのリンクを追加します。

    また、**Link Video Call** を使って、インシデントに関する議論が行われているコールへのリンクを追加することもできます。

### トラブルシューティングとインシデントの更新

インシデントのページには、_Overview_, _Timeline_, _Remediation_, and _Communication_ という 4 つの主なセクションがあります。インシデントの進行に合わせてこれらのセクションを更新し、全員に現在の状況を知らせます。

#### 概要

**シナリオ:** いくつか調査を行った結果、根本的な原因はホストのメモリ不足であることがわかりました。また、一部のお客様が影響を受けており、ページの読み込みが遅くなっているとの情報も得ました。15 分前に最初のお客様からの報告があり、インシデントのレベルは SEV-3 です。

_Overview_ セクションで、調査が進むにつれてインシデントのフィールドや顧客の影響を更新することができます。

重大度レベルと根本原因を更新する:

1. **Overview** タブをクリックします。

2. _Properties_ ボックスで **Edit** をクリックします。

3. _Severity_  ドロップダウンをクリックして **SEV-3** を選択します。

4. _Root Cause_ フィールドに値を追加します: `TEST: Host is running out of memory.`

5. この問題についてはモニターから最初に警告を受けたため、_Detection_ ドロップダウンで **Monitor** を選択します。

6. **Save** をクリックしてプロパティを更新します。

    Slack から、`/datadog incident update` コマンドを使って進行中の問題のタイトル、重大度、ステータスを更新することもできます。

顧客への影響を更新する:

1. _Impact_ ボックスで **Edit** をクリックします。

2. _Customer impact_ ドロップダウンで **Yes** を選択します。

3. タイムスタンプを 15 分前に変更します。これは、最初の顧客レポートが入ってきたタイミングを表します。

4. _Scope of impact_ に値を追加します: `TEST: Some customers seeing pages loading slowly.`

5. **Save** をクリックしてフィールドを更新します。

    インシデントページの上部には、顧客への影響がどのくらい継続しているかが表示されます。_Overview_ ページで行われたすべての変更は、_Timeline_ に追加されます。

#### 沿革

_Timeline_ には、インシデントのフィールドや情報の追加・変更が時系列で表示されます。

1. **Timeline** タブをクリックします。

    _Content Type_、_Important_、_Responder_ の各フィルターを使用して、特定のタイプのイベントを表示することができます。

2. _Customer impact updated_ イベントを見つけ、旗のアイコンをクリックして「_重要_」とマークします。

    {{< img src="getting_started/incident_management/flag_event.png" alt="イベントにフラグを追加" responsive="true" style="width:50%;">}}

    イベントを「_重要_」とマークしておくことで、インシデントが解決した後に事後分析を作成する際に、「_重要_」とマークされたタイムラインイベントのみを含めるよう選択することができます。

3. タイムラインにメモを追加します: `I found the host causing the issue.`

4. メモのイベントにカーソルを合わせて鉛筆アイコンをクリックし、ノートのタイムスタンプを変更します。これは、問題の原因となっているホストを 10 分前に実際に見つけたためです。

    {{< img src="getting_started/incident_management/edit_event_timestamp.png" alt="イベントのタイムスタンプ" responsive="true" style="width:90%;">}}

5. メモを**重要**としてマークします。

6. **Open Slack Channel** をクリックして、インシデントの Slack チャンネルに戻ります。

7. チャンネルに `I am working on a fix.` (修正対応中) とメッセージを投稿します。

8. メッセージのアクションコマンドアイコン (メッセージにカーソルを合わせたときに右に表示される 3 点ドット) をクリックします。

9. **Add to Incident** を選択してタイムラインにメッセージを送信します。

    {{< img src="getting_started/incident_management/add_from_slack.png" alt="Slack から追加" responsive="true" style="width:40%;">}}

    インシデントチャンネル内の Slack コメントはタイムラインに追加できるため、インシデントの調査や軽減に関わる重要なコミュニケーションを簡単にまとめることができます。

#### 修復

**シナリオ:** この種の問題の対処法についてのノートブックがあり、そこに問題を解決するために必要なタスクが含まれています。

 _Remediation_ セクションでは、問題の調査やインシデント発生後の修復タスクについてのドキュメントやタスクを記録することができます。

1. **Remediation** タブをクリックします。

2. _Documents_ ボックスのプラスアイコン (+) をクリックして、Datadog ノートブックへのリンクを追加します。

    _Documents_ セクションに追加・更新されたものは、_Incident Update_ タイプとしてタイムラインに追加されます。

3. _Incident Tasks_ ボックスにタスクの説明を追加して、タスクを追加することができます。例: `Run the steps in the notebook.`

4. **Create Task** をクリックします。

5. **Assign To** をクリックして自分自身をタスクに割り当てます。

6. **Set Due Date** をクリックして日付を今日に設定します。

    タスクの追加や変更はすべて _Timeline_ に記録されます。

    また、_Remediation_ セクションにインシデント発生後のタスクを追加して、それらを管理することもできます。

#### コミュニケーション

**シナリオ:** 問題が軽減され、チームは状況を監視しています。インシデントのステータスは安定しています。

_Communications_ セクションで、インシデントのステータスを更新する通知を送信することができます。

1. _Overview_ セクションに戻ります。

2. _Properties_ ボックスで **Edit** をクリックし、ステータスを _stable_ に変更します。

3. **保存**をクリックします。

4. _Communications_ タブに移動します。

5. **New Communication** をクリックします。

    デフォルトのメッセージには、件名にインシデントのタイトル、本文にインシデントの現在のステータスに関する情報が含まれています。

    実際のインシデントでは、インシデントに関わった人たちに最新情報を送信します。今回の例では、自分だけに通知を送ります。

6. _Add recipients_ に自分自身を追加します。

7. **Send** をクリックします。

    メッセージが記載されたメールが届きます。

    **Manage Templates** > **New Template** をクリックして、カスタマイズしたテンプレートを作成することができます。_Category_ フィールドを使用してテンプレートをグループ化します。

### 解決と事後分析

**シナリオ:** 問題による顧客への影響も解消し、問題が解決したことが確認されました。チームは問題を振り返るために事後調査を希望しています。

1. _Overview_ セクションを移動します。

2. _Impact_ ボックスの **Edit** をクリックして、顧客の影響を更新します。

3. **Active** スイッチを切り替えて、アクティブでない状態にします。

    それ以前に顧客への影響が発生していた場合は、終了日時を変更することもできます。

4. インシデントのステータスを更新するには、_Properties_ ボックスの **Edit** をクリックします。

5. ステータスを _resolved_ に変更します。

6. **保存**をクリックします。

    インシデントのステータスが解決済みに設定されると、画面上部に _Generate Postmortem_ ボタンが表示されます。

    {{< img src="getting_started/incident_management/generate_postmortem.png" alt="事後分析を生成" responsive="true" style="width:80%;">}}

7. **Generate Postmortem** をクリックします。

8. タイムラインセクションで **Marked as Important** (重要としてマーク) を選択すると、_重要な_イベントのみが事後分析に追加されます。

9. **Generate** をクリックします。

    事後分析は Datadogノートブックとして生成され、調査と修復の際に参照されたタイムラインイベントとリソースが含まれます。これにより、問題の原因や今後の予防方法を簡単に確認し、さらに文書化することができます。Datadog ノートブックはライブコラボレーションをサポートしているため、リアルタイムでチームメンバーと共同編集を行うことができます。

    問題の再発を防ぐためにあなたおよびチームが完了しなければならないフォローアップタスクがある場合は、それらを追加して、Remediation の _Incident Tasks_ セクションで追跡します。

## インシデント管理のワークフローをカスタマイズ

Datadog Incident Management はオーガニゼーションのニーズに基づいて、異なる重大度とステータスレベルでカスタマイズすることはもちろん、インシデントに関連する APM サービスやチームなどの追加情報も含めることができます。詳細については、Incident Management ページのこちらの[セクション][7]を参照してください。

また、通知のルールを設定して、インシデントの重大度レベルに応じて特定の人やサービスに自動的に通知することもできます。詳しくは、[通知ルール][8]のドキュメントをご覧ください。

Incident Management をカスタマイズするには、[インシデント設定ページ][9]にアクセスします。画面左側の Datadog メニューから、**Monitors** > **Incidents** (Incident Management のウェルカム画面が表示されたら、**Get Started** をクリックします) に進みます。そして、右上の **Settings** をクリックします。

{{< img src="getting_started/incident_management/im_settings_button.png" alt="設定" responsive="true" style="width:100%;">}} 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/slack/
[2]: /ja/monitors/incident_management/datadog_clipboard
[3]: /ja/notebooks/#overview
[4]: /ja/monitors/incident_management/#from-a-graph
[5]: /ja/monitors/incident_management/#from-a-monitor
[6]: /ja/api/latest/incidents/#create-an-incident
[7]: /ja/monitors/incident_management/#status-levels
[8]: /ja/monitors/incident_management/notification_rules
[9]: https://app.datadoghq.com/incidents/settings