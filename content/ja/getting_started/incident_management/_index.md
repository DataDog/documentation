---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-incident-management
  tag: ラーニングセンター
  text: Incident Management の紹介
- link: /service_management/incident_management/datadog_clipboard
  tag: Documentation
  text: Datadog クリップボード
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: ビデオ
  text: Datadog Incident Management について
- link: /monitors/incident_management
  tag: Documentation
  text: インシデント管理
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インシデントマネジメントを向上させるためのインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: ブログ
  text: Datadog でのインシデント管理
- link: /service_management/incident_management/incident_settings
  tag: Documentation
  text: 通知ルール
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: Documentation
  text: インシデントと Slack のインテグレーション
- link: https://www.datadoghq.com/blog/pair-programming-coscreen-datadog/
  tag: ブログ
  text: Datadog CoScreen でより効率的なペアプログラミングを実現
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: ブログ
  text: インシデントの事後分析を作成するためのベストプラクティス
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: ブログ
  text: Datadog でのインシデント管理方法
kind: documentation
title: Incident Management の概要
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) では Incident Management は利用できません。</div>
{{% /site-region %}}

## 概要

Datadog Incident Management は、メトリクス、トレース、またはログで発見した問題の追跡とコミュニケーションに役立ちます。

このガイドでは、Datadog サイトを使用してインシデントを宣言する、調査と修復の進行に合わせてインシデントを更新する、およびインシデントが解決したときに事後分析を生成する方法について説明します。この例では、[Slack インテグレーション][1]が有効になっていることを前提としています。

## インシデント管理のプロセス: 問題の検知から解決まで

### インシデントの宣言

**シナリオ:** エラーが大量に発生し、いくつかのサービスが遅延している可能性があるとモニターから警告されたと仮定します。お客様に影響が出ているかどうかは不明です。

このガイドでは、[Datadog クリップボード][2]を使ってインシデントを宣言する方法を説明します。クリップボードを使うと、グラフ、モニター、ダッシュボード全体、または[ノートブック][3]など、さまざまなソースから情報を収集することができます。これにより、インシデントを宣言する際に可能な限り多くの情報を収集することができます。

1. Datadog で [**Dashboard List**][15] に移動し、**System - Metrics** を選択します。
2. グラフのひとつにカーソルを合わせ、次のいずれかのコマンドを使用してクリップボードにコピーします。
    - **Ctrl**/**Cmd** + **C**
    - グラフ上で **Export** アイコンをクリックして **Copy** を選択します。
3. 左側の Datadog メニューから [**Monitors** > **Monitors List**][16] に進み、**[Auto] Clock in sync with NTP** を選択します。
4. **Ctrl**/**Cmd** + **Shift** + **K** でクリップボードを開きます。
5. クリップボードの **Add current page** をクリックして、モニターをクリップボードに追加します。
{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="クリップボードにコピー" responsive="true" style="width:100%;">}}
6. **Select All**、***Export items to...** の順にクリックします。
7. **Declare Incident** を選択します。
8. 発生している事象について説明します。
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| タイトル                    | インシデントのタイトルは、チームで使用している命名規則に従って設定します。これは実際のインシデントではないため、テストインシデントであることが明確になるよう `TEST` という言葉を含めます。タイトルの例: `[TEST] My incident test`                                                                      |
| 重大度           | お客様に影響があるかどうか、また関連するサービスにどのような影響があるかが不明であるため、**Unknown**に設定します。各重大度の意味については、アプリ内の説明を参照し、チームのガイドラインに従ってください。                                                                                |
| インシデントコマンダー       | 今回のテストではあなたに割り当てられたままにしてください。実際のインシデントが発生した場合はインシデント調査のリーダーに割り当てられます。インシデントの進行状況に合わせてインシデントコマンダーを更新することができます。                                                                                 |
| 通知            | 今回のテストでは、他のメンバーや他のサービスに警告を出さないよう空白にしておきます。実際のインシデントでは、調査や修復のために通知すべき人やサービスを追加します。これらの通知は Slack や PagerDuty にも送信できます。 |
|  メモ & リンク                  | インシデントを宣言する理由についての補足情報を追加します。グラフやログ、その他のキービジュアルなどがこれに該当します。選択したグラフとモニターはすでに含まれていますが、その他のシグナルを追加することができます。例えば、このガイドの URL をコピーして貼り付けます。                      |
9. **Declare Incident** をクリックしてインシデントを作成します。
   また、[グラフ][4]、[モニター][5]、または[インシデント API][6] からインシデントを宣言することもできます。APM ユーザーの場合は、APM グラフ上の任意のインシデントアイコンをクリックしてインシデントを宣言できます。
 Slack インテグレーションの一環として、`/datadog incident` ショートカットを使ってインシデントを宣言し、タイトル、重大度、顧客への影響を設定することもできます。
10. インシデントページの左上にある **Slack Channel** をクリックすると、インシデントの Slack チャンネルに移動します。

新しいインシデントが発生すると、そのインシデント専用の新しい Slack チャンネルが自動的に作成され、チームとのコミュニケーションをそこに集約してトラブルシューティングを開始することができます。所属するオーガニゼーションの Slack インテグレーションがグローバルなインシデントチャンネルを更新するよう設定されている場合は、そのチャンネルが新しいインシデントで更新されます。

この例では、新しいインシデントチャンネルに追加されたのはあなたのユーザーのみです。実際のインシデントで _Notifications_ に人やサービスを追加すると、その全員が自動的にインシデントチャンネルに追加されます。

Slack インテグレーションが有効になっていない場合は、**Add Chat** をクリックして、インシデントに関するやり取りに使用しているチャットサービスへのリンクを追加します。

インシデントに関する議論が行われているコールへのリンクを追加するには、**Add Video Call** をクリックします。

### トラブルシューティングとインシデントの更新

インシデントページには、_Overview_、_Timeline_、_Remediation_、_Notifications_ という 4 つの主なセクションがあります。インシデントの進行に合わせてこれらのセクションを更新し、全員に現在の状況を知らせます。

#### 概要

**シナリオ:** いくつか調査を行った結果、根本的な原因はホストのメモリ不足であることがわかりました。また、一部のお客様が影響を受けており、ページの読み込みが遅くなっているとの情報も得ました。15 分前に最初のお客様からの報告があり、インシデントのレベルは SEV-3 です。

_Overview_ セクションで、調査が進むにつれてインシデントのフィールドや顧客の影響を更新することができます。

重大度レベルと根本原因を更新する:
1. _Severity_  ドロップダウンをクリックして **SEV-3** を選択します。
2. この問題についてはモニターから最初に警告を受けたため、_What happened_ の _Detection Method_ ドロップダウン (Unknown が選択されています) で **Monitor** を選択します。
1. _Why it happened_ フィールドに値を追加します:  `TEST: Host is running out of memory.`
4. **Save** をクリックしてプロパティを更新します。
    Slack から、`/datadog incident update` コマンドを使って進行中の問題のタイトル、重大度、ステータスを更新することもできます。

顧客への影響を追加する:
1. _Impact_ セクションで **+ Add** をクリックします。
2. タイムスタンプを 15 分前に変更します。これは、最初の顧客レポートが入ってきたタイミングを表します。
3. descriptions フィールドに値を追加します: `TEST: Some customers seeing pages loading slowly.`　
4. **Save** をクリックしてフィールドを更新します。_Impact_ セクションが更新され、顧客への影響がどのくらい継続しているかが表示されます。_Overview_ ページで行われたすべての変更が _Timeline_ に追加されます。

#### 沿革

_Timeline_ には、インシデントのフィールドや情報の追加・変更が時系列で表示されます。

{{< img src="getting_started/incident_management/flag_event.png" alt="イベントにフラグを追加" responsive="true" style="width:50%;">}}

1. **Timeline** タブをクリックします。
2. _Impact added_ イベントを見つけ、旗のアイコンをクリックして「_重要_」としてマークします。
3. タイムラインにメモを追加します: `I found the host causing the issue.`
4. メモのイベントにカーソルを合わせて鉛筆アイコンをクリックし、ノートのタイムスタンプを変更します。これは、問題の原因となっているホストを 10 分前に実際に見つけたためです。
5. メモを**重要**としてマークします。
6. **Slack Channel** をクリックして、インシデントの Slack チャンネルに戻ります。
7. チャンネルに `I am working on a fix.` (修正対応中) とメッセージを投稿します。
8. メッセージのアクションコマンドアイコン (メッセージにカーソルを合わせたときに右に表示される 3 点ドット) をクリックします。
9. **Add to Incident** を選択してタイムラインにメッセージを送信します。

{{< img src="getting_started/incident_management/add_from_slack.png" alt="Slack から追加" responsive="true" style="width:40%;">}}

インシデントチャンネル内の Slack コメントはタイムラインに追加できるため、インシデントの調査や軽減に関わる重要なコミュニケーションをまとめることができます。

#### 修復

**シナリオ:** この種の問題の対処法についてのノートブックがあり、そこに問題を解決するために必要なタスクが含まれています。

 _Remediation_ セクションでは、問題の調査やインシデント発生後の修復タスクについてのドキュメントやタスクを記録することができます。

1. **Remediation** タブをクリックします。
2. _Documents_ ボックスのプラスアイコン `+` をクリックして、[Datadog ノートブック][7]へのリンクを追加します。_Documents_ セクションの更新内容はすべて、_Incident Update_ タイプとしてタイムラインに追加されます。
3. _Incident Tasks_ ボックスにタスクの説明を追加して、タスクを追加することができます。例: `Run the steps in the notebook.`
4. **Create Task** をクリックします。
5. **Assign To** をクリックして自分自身をタスクに割り当てます。
6. **Set Due Date** をクリックして日付を今日に設定します。
    タスクの追加や変更はすべて _Timeline_ に記録されます。
    また、_Remediation_ セクションにインシデント発生後のタスクを追加して、それらを管理することもできます。

#### デフォルトの検出ルール

**シナリオ:** 問題が軽減され、チームは状況を監視しています。インシデントのステータスは安定しています。

_Notifications_ セクションで、インシデントのステータス更新を伝える通知を送信することができます。

1. _Overview_ セクションに戻ります。
2. ロップダウンメニューで、ステータスを _ACTIVE_ から _STABLE_ に変更します。
4. _Notifications_ タブに移動します。
5. **New Notification** をクリックします。
    デフォルトのメッセージには、件名にインシデントのタイトル、本文にインシデントの現在のステータスに関する情報が含まれています。
    実際のインシデントでは、インシデントに関わった人たちに最新情報を送信します。今回の例では、自分だけに通知を送ります。
6. _Recipients_ フィールドに自分自身を追加します。
7. **Send** をクリックします。
    メッセージが記載されたメールが届きます。
   カスタマイズした[メッセージテンプレート][8]を作成することができます。_Category_ フィールドを使用してテンプレートをグループ化します。

### 解決と事後分析

**シナリオ:** 問題による顧客への影響も解消し、問題が解決したことが確認されました。チームは問題を振り返るために事後調査を希望しています。

1. _Overview_ セクションを移動します。
3. ステータスを _STABLE_ から _RESOLVED_ に変更して、アクティブでない状態にします。顧客への影響がそれ以前に終了していた場合は、終了日時を変更することもできます。
7.  インシデントのステータスが解決済みに設定されると、画面上部に _Generate Postmortem_ ボタンが表示されます。**Generate Postmortem** をクリックします。
8. タイムラインセクションで **Marked as Important** (重要としてマーク) を選択すると、_重要な_イベントのみが事後分析に追加されます。
9. **Generate** をクリックします。

事後分析は Datadog ノートブックとして生成され、調査と修復の際に参照されたタイムラインイベントとリソースが含まれます。これにより、問題の原因や今後の予防方法を簡単に確認し、さらに文書化することができます。Datadog ノートブックはライブコラボレーションをサポートしているため、リアルタイムでチームメンバーと共同編集を行うことができます。

問題の再発を防ぐためにあなたおよびチームが完了しなければならないフォローアップタスクがある場合は、それらを追加して、Remediation の _Incident Tasks_ セクションで追跡します。

{{< img src="getting_started/incident_management/generate_postmortem.png" alt="事後分析を生成" responsive="true" style="width:80%;">}}
## インシデント管理のワークフローをカスタマイズ

Datadog Incident Management はオーガニゼーションのニーズに基づいて、異なる重大度とステータスレベルでカスタマイズすることはもちろん、インシデントに関連する APM サービスやチームなどの追加情報も含めることができます。詳細については、Incident Management ページのこちらの[セクション][9]を参照してください。

また、通知のルールを設定して、インシデントの重大度レベルに応じて特定の人やサービスに自動的に通知することもできます。詳しくは、[インシデント設定][10]のドキュメントをご覧ください。

Incident Management をカスタマイズするには、[インシデント設定ページ][11]にアクセスします。画面左側の Datadog メニューから、**Monitors** > **Incidents** (Incident Management のウェルカム画面が表示されたら、**Get Started** をクリックします) に進みます。そして、画面上部の **Settings** をクリックします。

## モバイルでインシデントを作成・管理

[Apple App Store][13] と [Google Play Store][14] で提供されている [Datadog モバイルアプリ][12]では、Datadog アカウントでアクセスできるすべてのインシデントを作成、表示、検索、フィルターできるため、ノートパソコンを開かずに迅速に対応・解決することができます。

また、インシデントの宣言と編集、Slack や Zoom などとのインテグレーションにより、チームへの迅速なコミュニケーションも可能です。

{{< img src="service_management/incidents/incidents-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モバイルアプリでのモニター">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/slack/
[2]: /ja/service_management/incident_management/datadog_clipboard
[3]: /ja/notebooks/#overview
[4]: /ja/service_management/incident_management/#from-a-graph
[5]: /ja/service_management/incident_management/#from-a-monitor
[6]: /ja/api/latest/incidents/#create-an-incident
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/incidents/settings#Messages
[9]: /ja/service_management/incident_management/#status-levels
[10]: /ja/service_management/incident_management/incident_settings
[11]: https://app.datadoghq.com/incidents/settings
[12]: /ja/service_management/mobile/
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/monitors/manage