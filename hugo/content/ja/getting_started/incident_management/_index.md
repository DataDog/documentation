---
description: 共同作業用の Workflows、タイムライン、ポストモーテムを活用し、問題の発生宣言から解決に至るまでの追跡とコミュニケーションを行います。
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-incident-management
  tag: ラーニングセンター
  text: Incident Management の概要
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: ビデオ
  text: Datadog Incident Management について
- link: /monitors/incident_management
  tag: ドキュメント
  text: Incident Management
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Incident Management を向上させるためのインタラクティブなセッションに参加する
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: ブログ
  text: Datadog での Incident Management
- link: /incident_response/incident_management/incident_settings
  tag: ドキュメント
  text: 通知ルール
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: ドキュメント
  text: インシデントと Slack のインテグレーション
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: ブログ
  text: Datadog モバイルアプリを使って、外出先でインシデントを管理および解決する
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: ブログ
  text: インシデントのポストモーテムを作成するためのベストプラクティス
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: ブログ
  text: Datadog でのインシデント管理方法
title: Incident Management の概要
---
## 概要 {#overview}

Datadog Incident Management は、メトリクス、トレース、またはログで発見した問題の追跡とコミュニケーションに役立ちます。

このガイドでは、Datadog サイトを使用してインシデントを宣言する、調査と修復の進行に合わせてインシデント情報を更新する、およびインシデント解決後にポストモーテムを生成する方法について説明します。この例では、「[Slack インテグレーション][1]」が有効になっていることを前提としています。

## 問題の検知から解決までのインシデント対応の流れ{#walking-through-an-incident-from-issue-detection-to-resolution}

### インシデントの宣言 {#declaring-an-incident}

**シナリオ:** モニターが多数のエラーを検知してアラートを発しており、複数のサービスが遅延している可能性があります。顧客への影響の有無は現時点では不明です。

このガイドでは、[Datadog クリップボード][2]を使ってインシデントを宣言する方法を説明します。クリップボードを使用すると、グラフ、モニター、ダッシュボード全体、[ノートブック][3]など、さまざまなソースから情報を収集できます。これにより、インシデントを宣言する際に、可能な限り多くの情報を提供することが可能になります。

1. Datadog で、[{{< ui >}}Dashboard List{{< /ui >}}][15] に移動し、[{{< ui >}}System - Metrics{{< /ui >}}] を選択します。
2. グラフの 1 つにカーソルを合わせ、次のいずれかのコマンドを使用してクリップボードにコピーします。
    - {{< ui >}}Ctrl{{< /ui >}}/{{< ui >}}Cmd{{< /ui >}} + {{< ui >}}C{{< /ui >}}
    - グラフの {{< ui >}}Export{{< /ui >}} アイコンをクリックし、[{{< ui >}}Copy{{< /ui >}}] を選択します。
3. Datadog の左側のメニューで、[{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Monitors List{{< /ui >}}][16] に移動し、[{{< ui >}}[Auto] Clock in sync with NTP{{< /ui >}}] を選択します。
4. クリップボードを開きます: {{< ui >}}Ctrl{{< /ui >}}/{{< ui >}}Cmd{{< /ui >}} + {{< ui >}}Shift{{< /ui >}} + {{< ui >}}K{{< /ui >}}。
5. クリップボードの [{{< ui >}}Add current page{{< /ui >}}] をクリックして、モニターをクリップボードに追加します。
{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="クリップボードにコピーする" responsive="true" style="width:100%;">}}
6. [{{< ui >}}Select All{{< /ui >}}]、続いて [{{< ui >}}Export items to…{{< /ui >}}] をクリックします。
7. [{{< ui >}}Declare Incident{{< /ui >}}] を選択します。
8. 発生している事象について説明します。
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| {{< ui >}}Title{{< /ui >}}                    | インシデントのタイトルについては、チームが定めた命名規則に従います。これは実際のインシデントではないため、テストインシデントであることを明確にするために「`TEST`」という単語を含めてください。タイトルの例: `[TEST] My incident test`                                                                      |
| {{< ui >}}Severity Level{{< /ui >}}           | 顧客への影響や関連するサービスへの影響の有無や程度が不明なため、[{{< ui >}}Unknown{{< /ui >}}] に設定します。各重大度レベルの意味についてはアプリ内の説明を参照し、チームのガイドラインに従います。                                                                               |
| {{< ui >}}Incident Commander{{< /ui >}}       | これは自分に割り当てたままにします。実際のインシデントでは、これはインシデント調査のリーダーに割り当てられます。インシデント調査の進行に合わせて、あなたやほかのメンバーがインシデントコマンダーを変更することも可能です。                                                                                |
9. [{{< ui >}}Declare Incident{{< /ui >}}] をクリックして、インシデントを作成します。
   [graph][4]、[monitor][5]、または [incidents API][6] からインシデントを宣言することもできます。APM ユーザーの場合、APM グラフ上のインシデントアイコンをクリックしてインシデントを宣言できます。
Slack インテグレーションの一環として、`/datadog incident` ショートカットを使ってインシデントを宣言し、タイトル、重大度、顧客への影響を設定することもできます。
10. インシデントページの [{{< ui >}}Slack Channel{{< /ui >}}] をクリックすると、そのインシデント用の Slack チャンネルに移動できます。
   
新しいインシデントが発生すると、そのインシデント専用の Slack チャンネルが自動的に作成されるため、チームとのコミュニケーションを集約し、トラブルシューティングを開始できます。組織の Slack インテグレーションでグローバルインシデントチャンネルを更新するように設定されている場合、そのチャンネルにも新しいインシデントに関する情報が通知されます。

Slack インテグレーションが有効になっていない場合は、[{{< ui >}}Add Chat{{< /ui >}}] をクリックして、インシデントに関するやり取りに使用しているチャットサービスへのリンクを追加します。

[{{< ui >}}Add Video Call{{< /ui >}}] をクリックして、インシデントに関する議論が行われているコールへのリンクを追加します。

### トラブルシューティングとインシデントの更新 {#troubleshooting-and-updating-the-incident}

インシデントページには、{{< ui >}}Overview{{< /ui >}}、{{< ui >}}Timeline{{< /ui >}}、{{< ui >}}Post-Incident{{< /ui >}}、{{< ui >}}Notifications{{< /ui >}} の 4 つの主要なセクションがあります。インシデントの進行に合わせてこれらのセクションを更新し、現在のステータスを全員に知らせます。

#### 概要 {#overview-1}

**シナリオ:** 調査の結果、根本原因はホストのメモリ不足であることが判明しました。また、一部の顧客が影響を受けており、ページの読み込みが遅くなっていることも報告されています。最初の顧客からの報告は 15 分前に寄せられました。これは SEV-3 のインシデントです。

{{< ui >}}Overview{{< /ui >}} セクションで、調査が進むにつれてインシデントのフィールドや顧客への影響範囲を更新できます。

重大度レベルと根本原因を更新するには:
1. {{< ui >}}Severity{{< /ui >}} ドロップダウンをクリックし、[{{< ui >}}SEV-3{{< /ui >}}] を選択します。
2. [{{< ui >}}What happened{{< /ui >}}] で、{{< ui >}}Detection Method{{< /ui >}} ドロップダウンから [{{< ui >}}Monitor{{< /ui >}}] を選択します (最初は Unknown が選択されています)。これは、この問題について最初にモニターからアラートを受け取ったためです。
1. [{{< ui >}}Why it happened{{< /ui >}}] フィールドに、`TEST: Host is running out of memory.` と入力します。
4. [{{< ui >}}Save{{< /ui >}}] をクリックしてプロパティを更新します。
    Slack からは、`/datadog incident update` コマンドを使用して、進行中のインシデントのタイトル、重要度、ステータスを更新することも可能です。

顧客への影響を追加するには:
1. {{< ui >}}\+ Add{{< /ui >}} セクションで [{{< ui >}}Impact{{< /ui >}}] をクリックします。
2. タイムスタンプを 15 分前に変更します。これは、最初の顧客レポートが入ってきたタイミングを表します。
3. [descriptions] フィールドに次を追加します: `TEST: Some customers seeing pages loading slowly.`
4. [{{< ui >}}Save{{< /ui >}}] をクリックしてフィールドを更新します。{{< ui >}}Impact{{< /ui >}} セクションが更新され、顧客への影響がどれくらい続いているかが表示されます。{{< ui >}}Overview{{< /ui >}} ページで行われたすべての変更は、{{< ui >}}Timeline{{< /ui >}} に追加されます。

#### タイムライン {#timeline}

{{< ui >}}Timeline{{< /ui >}} には、インシデントのフィールドや情報の追加・変更が時系列で表示されます。

{{< img src="getting_started/incident_management/flag_event.png" alt="イベントにフラグを立てる" responsive="true" style="width:50%;">}}

1. [{{< ui >}}Timeline{{< /ui >}}] タブをクリックします。
2. [{{< ui >}}Impact added{{< /ui >}}] イベントを見つけ、フラグアイコンをクリックして [{{< ui >}}Important{{< /ui >}}] としてマークします。
3. タイムラインにメモを追加します: `I found the host causing the issue.`
4. メモのイベントにカーソルを合わせて鉛筆アイコンをクリックし、ノートのタイムスタンプを変更します。これは、問題の原因となっているホストを 10 分前に実際に見つけたためです。
5. メモに [{{< ui >}}Important{{< /ui >}}] とフラグを立てます。
6. [{{< ui >}}Slack Channel{{< /ui >}}] をクリックして、インシデントの Slack チャンネルに戻ります。
7. チャンネルに `I am working on a fix.` というメッセージを投稿します。
8. メッセージのアクションコマンドアイコン (メッセージにカーソルを合わせたときに右に表示される 3 点ドット) をクリックします。
9. {{< ui >}}Add to Incident{{< /ui >}} を選択して、メッセージをタイムラインに送信します。

{{< img src="getting_started/incident_management/add_from_slack.png" alt="Slack から追加する" responsive="true" style="width:40%;">}}

インシデントチャンネル内の Slack コメントはタイムラインに追加できるため、インシデントの調査や軽減にかかわる重要なコミュニケーションをまとめることができます。

#### インシデント後{#post-incident}

**シナリオ:** この種の問題の対処法についてのノートブックがあり、そこに問題を解決するために必要なタスクが含まれています。

 [{{< ui >}}Post-Incident{{< /ui >}}] セクションでは、問題の調査やインシデント発生後の修復タスクについてのドキュメントやタスクを記録することができます。

1. [{{< ui >}}Post-Incident{{< /ui >}}] タブをクリックします。
2. `+` ボックスのプラスアイコン {{< ui >}}Documents{{< /ui >}} をクリックして、[Datadog ノートブック][7]へのリンクを追加します。{{< ui >}}Documents{{< /ui >}} セクションへのすべての更新は、{{< ui >}}Incident Update{{< /ui >}} タイプのイベントとしてタイムラインに追加されます。
3. {{< ui >}}Incident Tasks{{< /ui >}} ボックスにタスクの説明を追加してタスクを追加します。例: `Run the steps in the notebook.`
4. [{{< ui >}}Create Task{{< /ui >}}] をクリックします。
5. [{{< ui >}}Assign To{{< /ui >}}] をクリックして自分自身をタスクに割り当てます。
6. [{{< ui >}}Set Due Date{{< /ui >}}] をクリックして、日付を今日に設定します。
    タスクの追加や変更はすべて {{< ui >}}Timeline{{< /ui >}} に記録されます。
    また、{{< ui >}}Post-Incident{{< /ui >}} セクションにインシデント発生後のタスクを追加して、それらを管理することもできます。

#### Notifications {#notifications}

**シナリオ:** 問題が軽減され、チームは状況を監視しています。インシデントのステータスは安定してます。

{{< ui >}}Notifications{{< /ui >}} セクションで、インシデントのステータス更新を伝える通知を送信することができます。

1. {{< ui >}}Overview{{< /ui >}} セクションに戻ります。
2. ドロップダウンメニューで、ステータスを [{{< ui >}}ACTIVE{{< /ui >}}] から [{{< ui >}}STABLE{{< /ui >}}] に変更します。
4. {{< ui >}}Notifications{{< /ui >}} タブに移動します。
5. [{{< ui >}}New Notification{{< /ui >}}] をクリックします。
    デフォルトのメッセージには、件名にインシデントのタイトル、本文にインシデントの現在のステータスに関する情報が含まれています。
    実際のインシデントでは、インシデントに関与している関係者に更新情報を送信します。この例では自分自身にのみ通知を送信します。
6. {{< ui >}}Recipients{{< /ui >}} フィールドに自分自身を追加します。
7. [{{< ui >}}Send{{< /ui >}}] をクリックします。
    メッセージが記載されたメールが届くはずです。
    カスタマイズされた[メッセージテンプレート][8]を作成できます。{{< ui >}}Category{{< /ui >}} フィールドを使用してテンプレートをグループ化できます。

### 解決とポストモーテム{#resolution-and-postmortem}

**シナリオ:** 問題による顧客への影響も解消し、問題が解決したことが確認されました。チームは、何が問題だったのかを振り返るためのポストモーテムを求めています。

1. {{< ui >}}Overview{{< /ui >}} セクションに移動します。
3. ステータスを {{< ui >}}STABLE{{< /ui >}} から {{< ui >}}RESOLVED{{< /ui >}} に変更して、アクティブな状態ではなくします。それ以前に顧客への影響が発生していた場合は、終了した日時を変更することもできます。
7. インシデントのステータスが解決済みに設定されると、上部に {{< ui >}}Generate Postmortem{{< /ui >}} ボタンが表示されます。[{{< ui >}}Generate Postmortem{{< /ui >}}] をクリックします。
8. タイムラインセクションで [{{< ui >}}Marked as Important{{< /ui >}}] を選択し、{{< ui >}}Important{{< /ui >}} イベントのみがポストモーテムに追加されるようにします。
9. [{{< ui >}}Generate{{< /ui >}}] をクリックします。

ポストモーテムには、調査および修復中に参照されたタイムラインイベントとリソースが含まれます。これにより、問題の原因や将来の再発防止策について、確認や詳細な文書化を行いやすくなります。詳細については、「[ポストモーテム][17]」を参照してください。

問題の再発を防ぐためにあなたおよびチームが完了しなければならないフォローアップタスクがある場合は、それらを追加して、ポストインシデントの {{< ui >}}Incident Tasks{{< /ui >}} セクションで追跡します。

{{< img src="getting_started/incident_management/generate_postmortem.png" alt="ポストモーテムを生成する" responsive="true" style="width:80%;">}}
## インシデント管理のワークフローをカスタマイズする{#customizing-your-incident-management-workflow}

Datadog Incident Management は組織のニーズに基づいて、異なる重大度とステータスレベルでカスタマイズできるほか、APM サービスや関連チームといったインシデントに関する追加情報を含めることも可能です。詳細については、Incident Management ページのこちらの[セクション][9]を参照してください。

また、インシデントの重大度に応じて特定の担当者やサービスへ自動的に通知を行うルールを設定することもできます。詳細については、「[インシデント設定][10]」のドキュメントを参照してください。

Incident Management をカスタマイズするには、[インシデント設定ページ][11]に移動します。左側の Datadog メニューから、{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Incidents{{< /ui >}} に移動します (Incident Management のウェルカム画面が表示された場合は、[{{< ui >}}Get Started{{< /ui >}}] をクリックします)。次に、上部にある [{{< ui >}}Settings{{< /ui >}}] をクリックします。

## モバイルでインシデントを作成して管理する{#create-and-manage-incidents-on-mobile}

[Apple App Store][13] と [Google Play Store][14] で提供されている [Datadog モバイルアプリ][12]では、Datadog アカウントでアクセスできるすべてのインシデントを作成、表示、検索、フィルターできるため、ノートパソコンを開かずに迅速に対応・解決することができます。

また、インシデントの宣言と編集、Slack や Zoom などとのインテグレーションにより、チームへの迅速なコミュニケーションも可能です。

{{< img src="incident_response/incident_management/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Datadog モバイルアプリの 2 つのビュー: 各インシデントに関する詳細情報を示すインシデントリストと、単一のインシデントの詳細パネルを表示するビュー">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/slack/
[2]: /ja/dashboards/guide/datadog_clipboard
[3]: /ja/notebooks/#overview
[4]: /ja/incident_response/incident_management/#from-a-graph
[5]: /ja/incident_response/incident_management/#from-a-monitor
[6]: /ja/api/latest/incidents/#create-an-incident
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/incidents/settings#Messages
[9]: /ja/incident_response/incident_management/#status-levels
[10]: /ja/incident_response/incident_management/incident_settings
[11]: https://app.datadoghq.com/incidents/settings
[12]: /ja/mobile/
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/monitors/manage
[17]: /ja/incident_response/incident_management/post_incident/postmortems