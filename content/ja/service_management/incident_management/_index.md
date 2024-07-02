---
aliases:
- /ja/monitors/incident_management/
description: インシデントの作成と管理
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Incident%20Management
  tag: リリースノート
  text: Incident Management の最新リリースをチェック！ (アプリログインが必要です)。
- link: dashboards/querying/#incident-management-analytics
  tag: Documentation
  text: インシデント管理分析
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インシデントマネジメントを向上させるためのインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/pair-programming-coscreen-datadog/
  tag: ブログ
  text: Datadog CoScreen でより効率的なペアプログラミングを実現
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: ブログ
  text: インシデントの事後分析を作成するためのベストプラクティス
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: blog
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
title: インシデント管理
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog for Government site では、インシデント管理をご利用いただけません。</div>
{{< /site-region >}}

組織のサービス中断につながる可能性のあるイベントは、すべてインシデントと見なすことができます。多くの場合、こうしたイベントを処理するためのフレームワークを用意する必要があります。Datadog のインシデント管理機能は、組織がインシデントを効果的に識別して軽減できるシステムを提供します。

インシデントは、収集しているメトリクス、トレース、ログとともに Datadog に存在します。自分に関連するインシデントを表示してフィルタリングできます。

Datadog パラダイムでは、次のいずれかがインシデントを宣言するための適切な状況です。

* 問題が顧客またはサービスに影響を及ぼしている、またはその可能性があります。
* あなたは、インシデントを呼び出す必要があるかどうかがわかりません。他の人に通知し、重大度を適切に上げます。

## 使用方法

インシデント管理にインストールは必要ありません。インシデントを表示するには、[Incidents][1] ページに移動して、すべての進行中インシデントのフィードを確認します。[Incident Settings][2] で、すべてのインシデントに表示される追加フィールドを構成できます。

**注**: [Apple App Store][4] および [Google Play Store][5] で入手できる [Datadog モバイルアプリ][3]をダウンロードして、モバイルデバイスのホーム画面からインシデント一覧を表示し、インシデントを管理/作成することができます。

{{< img src="service_management/incidents/incidents-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モバイルアプリでのインシデント">}}

### インシデントの作成

#### グラフから作成

グラフ上でエクスポートボタンをクリックすると表示される **Declare incident** ボタンをクリックすることで、グラフから直接インシデントを宣言できます。インシデント作成モーダルが表示され、グラフがシグナルとして追加されます。

{{< img src="service_management/incidents/from-a-graph.png" alt="グラフからインシデントを作成" style="width:80%;">}}

#### クリップボードから作成

Datadog クリップボードから複数のモニターとグラフを収集し、インシデントを生成します。クリップボードにダッシュボードを追加するには、いずれかのグラフを複製し、**Open Clipboard** を選択します。次に、関連するグラフとモニターすべてをクリップボードに追加し、**Add to New Incident** をクリックします。クリップボード上のすべてがシグナルとしてインシデントに追加されます。

{{< img src="service_management/incidents/from-clipboard.png" alt="クリップボードにダッシュボードを追加" style="width:80%;">}}

{{< img src="service_management/incidents/clipboard.png" alt="クリップボードからインシデントを作成" style="width:80%;">}}

**注**: インシデントからのエクスポートに加え、クリップボードのデータを新しいダッシュボードやノートブックにエクスポートできます。

#### モニターから作成

**Declare incident** ボタンをクリックすることで、モニターから直接インシデントを宣言できます。インシデント作成モーダルが表示され、モニターがシグナルとして追加されます。

{{< img src="service_management/incidents/incident-from-monitor.png" alt="モニターからインシデントを作成" style="width:80%;">}}

既存のインシデントにモニターを追加することもできます。

{{< img src="service_management/incidents/existing.png" alt="既存のインシデントにモニターを追加" style="width:80%;">}}

#### セキュリティシグナルから

サイドパネルの右上にあるケバブボタンをクリックし、**Declare incident** をクリックして、Cloud SIEM または Cloud Workload Security のシグナルから直接インシデントを宣言することができます。

サイドパネルの右上にあるエクスポートボタンを選択し、**Export to incident** をクリックして、Application Security Management のシグナルからインシデントを宣言します。

{{< img src="service_management/incidents/security-signal-incidents.png" alt="セキュリティシグナルからインシデントを作成" style="width:80%;">}}

#### Incidents ページから作成

[Datadog UI][1] で **New Incident** をクリックし、インシデントを作成します。

{{< img src="service_management/incidents/incident_declaration_modal.jpeg" alt="インシデント宣言モーダル" style="width:80%;">}}

インシデント作成モーダルは、オーガニゼーションで使用されている重大度とステータスのヘルパーテキストと説明を含む折りたたみ可能なサイドパネルをレスポンダーに提供します。ヘルパーのテキストと説明は、[Incident Settings][6] でカスタマイズできます。

{{< img src="service_management/incidents/incident_information_settings.jpeg" alt="インシデント情報の設定" style="width:80%;">}}

#### Slack から作成

[Datadog インテグレーションを Slack で有効化][7]すると、どの Slack チャンネルからでもスラッシュコマンド `/datadog incident` を使用して新しいインシデントを宣言できます。

作成モーダルで、説明タイトル (Title) に入力し、カスタマーへの影響 (Yes、No、Unknown) を選択して、重大度 (Severity) を (Unknown または 1～5) から選択します。

インシデントを宣言しているユーザーが Slack を Datadog アカウントと接続済みの場合、デフォルトではそのユーザーがインシデント調査責任者 (IC) になります。IC は、必要に応じて後からアプリ内で変更できます。インシデントを宣言しているユーザーが Datadog アカウントを所有していない場合、IC は一般の `Slack app user` に割り当てられ、アプリ内の別の IC に割り当てることができます。

Datadog Slack アプリの使用については、[こちら][8]を確認してください。

{{< img src="service_management/incidents/from-slack.png" alt="Slack からインシデントを作成" style="width:60%;">}}

インシデントを宣言しているユーザーが Datadog アカウントを所有している場合、デフォルトではそのユーザーがインシデント調査責任者 (IC) になります。インシデントを宣言しているユーザーが Datadog アカウントを所有していない場合、IC は一般の `Slack app user` に割り当てられます。IC は Datadog アプリの[インシデントページ][1]で変更できます。

Slack でインシデントを宣言すると、インシデントチャネルが生成されます。

Datadog Slack インテグレーションについては、[ドキュメント][7]を参照してください。

{{< site-region region="eu" >}}
Slack をご利用の {{< region-param key="dd_site_name" >}} のお客様は、https://help.datadoghq.com/ でチケットを提出して、Slack アプリに関する最新情報を入手してください。
{{< /site-region >}}

### インシデントの説明

インシデントの作成場所に関わらず、インシデントについてできる限り詳細な説明を添えて、社内のインシデント管理プロセスに関わるメンバーと情報を共有することが重要です。

インシデントを作成すると、インシデントモーダルが表示されます。このモーダルにはいくつかの重要な要素が含まれています。

**Severity Level**: インシデントの重大度を SEV-1 (最も重大) から SEV-5 (最も軽微) で表します。インシデントを調査中で重大度がまだわからない場合は UNKNOWN を選択します。

* SEV-1: 重大な影響
* SEV-2: 大きな影響
* SEV-3: 中程度の影響
* SEV-4: 小さい影響
* SEV-5: 軽微な問題
* UNKNOWN: 初期調査

**注**: 各重大度レベルの説明は、組織の要件に合わせてカスタマイズできます。

**Title**: インシデントにわかりやすいタイトルを付けます。

**Signals**: インシデントを宣言している理由。これは、グラフやログなどの視覚情報にすることができます。

**Incident commander**: この人物はインシデント調査のリーダーとして割り当てられます。

**Additional notifications**: 他のチームまたは人々に通知します。

**Declare Incident** をクリックして、インシデントの作成を完了します。

### インシデントとインシデントタイムラインの更新

インシデントのステータスは、インシデントの概要ページ、または、専用のインシデントチャネルの Slack から直接更新できます。その Slack チャネルからインシデントを更新するには、スラッシュコマンド `/datadog incident update` を使用して、更新モーダルを開きます。

影響セクションを更新し、顧客への影響、影響の開始と終了時刻、およびインシデントがまだアクティブであるかどうかを指定します。また、このセクションには、完了する影響範囲の記述が必要です。

インシデントのヘッダーには、インシデントの状況、重大度、タイムスタンプ、影響、期間のほか、インシデントに対応した人物が表示されます。また、対応者に最新情報を通知することもできます。Datadog Slack アプリを使用していない場合は、チャット、ビデオ会議、事後分析 (追加されている場合) 用のリンクが用意されています。

タイムラインのデータは自動的に分類されるため、ファセットを使用してタイムラインの内容にフィルターを設定できます。この機能は、調査が長期におよぶ長期的なインシデントの場合、特に便利です。これにより、IC や対応者は関係者、進捗状況、調査済みの事柄についてフィルターを設定しやすくなります。タイムラインノートの作成者は、タイムスタンプや作成されたメッセージメモは編集できます。また、タイムラインコールにフラグを立てて、インシデントをモニタリングしている人に対して強調できます。

#### ステータスレベル

デフォルトのステータスは、**Active**、**Stable**、**Resolved** です。**Completed** は有効化/無効化できます。各ステータスレベルの説明は、組織の要件に合わせてカスタマイズできます。

* Active: インシデントが他者に影響している。
* Stable: インシデントはもはや他者に影響していないが、調査が未完了。
* Resolved: インシデントはもはや他者に影響しておらず、調査も完了している。
* Completed: すべての修復作業が完了している。

インシデントのステータスが変化すると、Datadog は次のように解決までの時間を追跡します。

| ステータスの遷移 | 解決されたタイムスタンプ |
| ------------------ | -----------|
| `Active` から `Resolved`、`Active` から `Completed` | 現在の時刻 |
| `Active` から `Resolved` から `Completed`、`Active` から `Completed` から `Resolved` | 変更なし |
| `Active` から `Completed` から `Active` から `Resolved` | 最後の遷移にオーバーライド |

#### 評価フィールド

評価フィールドは、インシデントごとに定義できるメタデータとコンテキストから成ります。このフィールドは [key:value メトリクスタグ][9]になっており、設定でフィールドキーを追加すると、概要ページでインシデントの影響を評価する際に、値を利用できるようになります。例えば、「アプリケーション」フィールドを追加できます。次のフィールドはすべてのインシデントの評価に利用できます。

* **Root Cause**: このテキストフィールドには、インシデントの根本原因の説明、トリガー、要因を入力できます。
* **Detection Method**: デフォルトの選択肢「Customer、Employee、Monitor、Other、Unknown」から、インシデントがどのように検出されたか指定します。
* **Services**: APM を構成済みの場合は、インシデント評価に APM サービスを利用できます。APM サービスの構成については、[ドキュメント][10]を参照してください。
    * Datadog APM を使用していない場合は、サービス名を CSV ファイルでアップロードできます。CSV ファイルでアップロードされた値は、インシデント管理のインシデント評価にのみ使用できます。
    * Datadog は、大文字と小文字を区別しないことによるサービス名の重複を排除します。そのため、"My Service" や "my service" といった名前を使用している場合、手動で追加した名前のみが表示されます。
    * Datadog は、手動でアップロードしたリストを優先して APM サービス名をオーバーライドします。
    * 利用しているサービスが APM サービスで、過去 7 日間にメトリクスが何もポストされていない場合、検索結果には表示されません。
    * Datadog 製品をさらに統合すると、サービスへの影響をより正確に評価できます。サービスのプロパティフィールドは、Datadog APM を使用しているカスタマーの APM サービスが自動的に入力されます。
* **Teams**: 組織で定義されている[チーム][11]から選択してください。CSV ファイルからチームリストをアップロードする必要はありません。

## 収集データ

インシデント管理は、次の分析メジャーを収集します。

* インシデント数
* 顧客への影響期間
* ステータスアクティブ期間
* ステータス安定期間
* 修理までの時間 (顧客への影響の終了時間 - 作成された時間)
* 解決までの時間 (解決された時間 - 作成された時間)

インシデント管理グラフの詳細については、[インシデント管理分析][12]を参照してください。

## インテグレーション

[Slack][7] との統合に加えて、インシデント管理は以下とも統合されます。

- [PagerDuty][13] と [OpsGenie][14] は、オンコールエンジニアにインシデント通知を送信します。
- [Jira][15] は、インシデントの Jira チケットを作成します。
- [Webhook][16] は、Webhook を使用してインシデント通知を送信します (たとえば、[SMS を Twilio に送信][17])。

## 準備はいいですか？

[Incident Management 入門][18]ガイドのワークフロー例を実行してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /ja/mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /ja/service_management/incident_management/incident_settings#information
[7]: /ja/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: /ja/integrations/slack/
[9]: /ja/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[10]: /ja/tracing/#2-instrument-your-application
[11]: /ja/account_management/teams/
[12]: /ja/service_management/incident_management/analytics/#overview
[13]: /ja/integrations/pagerduty/
[14]: /ja/integrations/opsgenie/
[15]: /ja/integrations/jira/
[16]: /ja/integrations/webhooks/
[17]: /ja/integrations/webhooks/#sending-sms-through-twilio
[18]: /ja/getting_started/incident_management