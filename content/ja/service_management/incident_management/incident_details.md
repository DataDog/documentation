---
aliases:
- /ja/monitors/incident_management/incident_details
description: インシデントのコンテキストと作業を管理する
further_reading:
- link: dashboards/querying/#incident-management-analytics
  tag: Documentation
  text: インシデント管理分析
title: インシデント詳細ページ
---

## 概要

{{< img src="/service_management/incidents/incident_details/incident_overview_page.png" alt="Active SEV-4 インシデントのインシデント詳細ページ。" style="width:100%;">}}

Datadog のすべてのインシデントには、インシデントのプロパティフィールド、シグナル、タスク、ドキュメント、対応者、および通知を管理できる独自の Incident Details ページがあります。Incident Details ページは、[新しいインシデントを作成][1]した後に利用できます。Incident Details ページには、キーアクションに素早くアクセスするためのグローバルヘッダーがあり、残りのページ本体は、関連するインシデントデータをグループ化するためのタブによって、異なるセクションに分かれています。最初のセクションは Overview です。

## グローバルヘッダー

グローバルヘッダーは、[Status and Severity][2] セレクタへのアクセス、および [Incident Integrations][3] へのリンクを提供します。Slack および Microsoft Teams のリンクについて、新しいインシデントごとに自動リンクを構成する方法の詳細については、[インシデントの設定][4]を参照してください。

インシデントを解決済みステータスに移動すると、[事後分析テンプレート][5]を使用して事後分析ノートブックを生成するオプションがヘッダーに表示されます。[Incident Settings][6] ページで事後分析テンプレートを構成して、事後分析の構造と内容を事前に定義します。

## インシデント詳細の概要セクション

Overview セクションを使用して、インシデントのプロパティを指定し、顧客への影響を定義します。

デフォルトでは、すべてのインシデントには以下のプロパティがあります。

* Root Cause
* サービス
* ヘルプ
* 検出方法
* ダウンタイム

プロパティは以下の 3 つのセクションに分かれています。

* 発生した事象
* 発生原因
* .NET コア

[Incident Settings][7] で、Datadog メトリクスタグから `<KEY>:<VALUE>` ペアを使用してプロパティフィールドを追加するか、カスタムフィールドを作成します。インシデントのプロパティに値を割り当てると、[Incident Homepage][8] でインシデントのサブセットを検索したり、[Incident Management Analytics][9] を使用する際にクエリを形成したりできます。プロパティフィールドを並べ替えたり、異なる見出しに移動させたりして、最も重要なプロパティを目立つ場所に配置することもできます。

インシデントが顧客向けの場合は、Impact セクションで詳細を指定します。

1. **Add** をクリックします。
2. 影響の開始日時を指定します。
3. 影響の終了日時を指定するか、影響が継続中の場合は空白のままにします。
4. `Scope of impact` に顧客に対する影響の性質を記述します。
5. **Save** をクリックします。

プロパティフィールドの他に、Overview セクションには以下のような一目でわかるサマリーモジュールがあります。

1. *Condensed Timeline*: インシデントのライフサイクルの概要を把握できるように、インシデントが状態を変更した時間、影響が開始した時間と終了した時間が表示されます。
2. *Latest Notifications*: [Notification セクション](#notifications-section)にある通知の全リストに素早くアクセスできるように、インシデントに対して送信された最新の通知が表示されます。
3. *Pending Tasks*: [Remediation セクション](#remediation-section)にあるタスクの全リストに素早くアクセスできるように、最新の未完了タスクが表示されます。
4. *Responders*: 現在のインシデントコマンダーと、インシデントに割り当てられている残りの対応者のアバターが表示されます。
5. *Recent timeline entries*: [Timeline セクション](#timeline-section)全体に素早くアクセスできるように、インシデントタイムラインの最新の 5 つのエントリが表示されます。

## Timeline セクション

{{< img src="/service_management/incidents/incident_details/incident_details_timeline.png" alt="インシデントにエスカレーションされたケースの進行を示すインシデントの詳細の Timeline ビュー" style="width:100%;">}}

Incident Timeline は、インシデント中に行われた作業の主な情報源です。アクションが実行されると、新しいセルが時系列でタイムラインに追加され、変更内容、変更者、変更時刻がキャプチャされます。

### Content types

各セルには、そのセルに含まれる情報の種類を示す独自のコンテンツタイプがあります。

|  Content type      | 説明                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Responder note     | インシデント対応者が手動で書いたメモ。対応者メモには以下のサブタイプがあります。<br>- *Graph*: 対応者メモに 1 つ以上の Datadog グラフが含まれている<br>- *Link*: 対応者メモにハイパーリンクが含まれている<br>- *Code*: 対応者メモにコードブロックの Markdown 構文でラップされたテキストが含まれている
| Incident update    | インシデントのプロパティ (ステータスや重大度を含む) やその影響に加えられた変更。
| Integration update | Incident Management 製品の[インテグレーション][3]を通じて行われた変更。
| Task               | Incident Details ページの Remediation セクションでインシデントタスクに加えられたすべての変更。
| Notification sent  | インシデント対応者から手動通知が送信された場合の更新。

Incident Details ページのセクションを切り替えるタブのすぐ下にあるテキストボックスを使って、タイムラインに直接対応者メモを追加します。作成時の対応者メモのタイムスタンプをカスタマイズすることで、タイムラインの時系列で、以前の時点に関連する重要な情報をキャプチャすることができます。自分が作成した対応者メモについては、内容やタイムスタンプを編集したり、メモを完全に削除したりできます。また、特定のセルへのリンクをコピーして、チームメイトと共有することもできます。対応者メモは [Slack からタイムラインに追加][10]することができます。

グラフセルに限り、[組織設定][11]で有効化されている場合、グラフの定義はグラフの共有 URL を用いて保存されます。タイムラインにグラフセルを追加すると、ダッシュボード、ノートブック、その他のページに見られる完全なインタラクティブホバー状態を備えています。タイムラインに追加されてから 24 時間後、グラフはグラフが表示していたものをキャプチャした静止イメージに置き換えられます。これにより、短期間保持されるデータを表示するグラフについても、グラフ内のライブデータが失効した後でもバックアップイメージが取得されることを保証します。

デフォルトでは、タイムラインのセルは `oldest first` (古い順) にソートされますが、タイムラインの一番上にあるボタンを使って `newest first` (新しい順) に変更することができます。

## Remediation セクション

インシデントの修復プロセスに関連するドキュメントやリソースを保存したり、修復プロセスの主要タスクを追跡するには、Remediation セクションを使用します。

ドキュメントを追加するには、ドキュメントの URL を貼り付け、素早くアクセスできるようにリンクに人間が読める名前を付けます。

インシデントタスクは、Datadog の [Slack インテグレーション][12]と同様に、Remediation セクションで直接作成することができます。

Remediation セクションの creation テキストボックスにタスクの説明を入力します。タスクを Datadog ユーザーに割り当てるには、説明テキストボックスに `@` と入力するか、タスク作成後に `Assignees` 列を使用します。インシデントタスクは複数の担当者を持つことができます。タスクの作成後、期限を割り当てることもできます。

異なるタスクの作業が終了すると、タスクの説明の左にあるチェックボックスをクリックすることで、個々のタスクに完了マークを付けることができます。タスクの数が多い場合は、キーワードで検索したり、完了したタスクを非表示にすることで絞り込むことができます。

## Response Team セクション

<div class="alert alert-warning">
これはオープンベータ版の機能です。
</div>

{{< img src="/service_management/incidents/incident_details/incident_response_team.png" alt="割り当てられたインシデントコマンダー、対応者、コミュニケーションリードを示すインシデント詳細対応チームセクション" style="width:100%;" >}}

対応チームセクションでは、他のユーザーを追加し、インシデントの解決プロセスで実行するロールを割り当てることで、対応チームを編成することができます。Datadog が提供するデフォルトの対応者タイプは以下の 2 つです。

1. `Incident Commander` - 対応チームのリーダーを務める責任者
3. `Responder` - インシデントの調査やその根本的な問題の解決に積極的に貢献している人

カスタムの対応者ロールを作成したい場合は、[Incident Settings の Responder Types][13] で行うことができます。これにより、カスタムの名前と説明で新しい対応者タイプを作成できます。また、対応者タイプが one person role か multi person role かを選択することも可能です。

**注:** これらのロールは、[ロールベースのアクセス制御 (RBAC)][14] システムにおけるロールとは無関係です。RBAC のロールは、Datadog の特定の機能に対するユーザーのアクセス許可を制御します。インシデント管理における対応者タイプシステムは、いかなる点においてもユーザーのアクセス許可を変更するものではありません。それよりも、対応者をインシデントに招待し、対応プロセスにおいて文書化されたロールを付与することで可視性を高めることが目的です。

個人を対応者として追加すると、その人の Datadog アカウントに関連付けられたメールを通じて通知されます。対応者のロールは誰でも変更できますが、インシデントの対応チームから個人を削除できるのは、その個人が一般的な `Responder` のロールを持ち、インシデントで何の活動も行っていない場合のみです。インシデントにすでに `Incident Commander` が割り当てられている場合、別の個人を `Incident Commander` に指定すると、そのロールはその個人に引き継がれます。以前の `Incident Commander` には `Responder` のロールが再割り当てされます。カスタムの one person role を再割り当てした場合も、必ず同様の再割り当てが発生します。

対応チームリストには、個人が最初にインシデントの対応チームに追加された日付と時間、およびその個人がインシデントタイムラインに最後に何かを投稿した日付と時間も保存されます。

## 通知セクション

{{< img src="service_management/incidents/incident_notifications.jpeg" alt="インシデント通知" style="width:80%;">}}

インシデントに対するすべてのステークホルダーからの通知は、通知セクションに集約されます。
このページから直接、通知を手動で作成、下書きとして保存、送信することができます。当該インシデントの[通知ルール][15]によって送信された自動通知も、このセクションにリストされます。

手動で通知を作成するには

1. セクションの右上にある **+ New Notification** ボタンをクリックします。
2. 希望する受信者を入力します。メール、Slack チャンネル、PagerDuty ハンドル、Webhook など、Datadog がサポートする通知ハンドルであれば、どれでもかまいません。
3. [メッセージテンプレート][16]を選択します。
4. Markdown とサポートされているインシデントテンプレート変数を使用して、必要に応じて通知のタイトルとメッセージを編集し、`{{` と入力します。
   - テンプレート変数は、インシデントのプロパティに基づきます。メッセージが送信される前に、すべてのテンプレート変数は、メッセージが送信されたときに利用可能な参照プロパティの対応する値で置き換えられます。
5. メッセージのタイムゾーンをカスタマイズするには `{{incident.created}}` 変数を使います。このテンプレート変数はタイムゾーンを設定するオプションを表示します。
6. 通知を送信するか、下書きとして保存します。

通知セクションは、下書きリストと送信済みリストに分かれています。

両方のリストに以下が表示されます。

1. 通知の (意図された) 受信者
2. 通知のメッセージの内容、および送信された再通知メッセージ
3. 通知が最後にいつ更新されたか
4. 通知の元の作成者

送信済みリストには、通知が通知ルールによって手動で送信されたのか、自動的に送信されたのかも表示されます。通知が自動送信された場合、通知のトリガーとなったルールが表示されます。

## はじめに

[Incident Management 入門][17]ガイドのワークフロー例を実行してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/incident_management/#creating-an-incident
[2]: /ja/service_management/incident_management/#describing-the-incident
[3]: /ja/service_management/incident_management/#integrations
[4]: /ja/service_management/incident_management/incident_settings#integrations
[5]: /ja/service_management/incident_management/incident_settings#postmortem-templates
[6]: https://app.datadoghq.com/incidents/settings#Postmortems
[7]: https://app.datadoghq.com/incidents/settings#Property-Fields
[8]: https://app.datadoghq.com/incidents
[9]: /ja/service_management/incident_management/analytics
[10]: /ja/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[11]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[12]: /ja/integrations/slack/?tab=slackapplicationus#manage-incident-tasks
[13]: /ja/service_management/incident_management/incident_settings/#responder-types
[14]: /ja/account_management/rbac/?tab=datadogapplication
[15]: /ja/service_management/incident_management/incident_settings#rules
[16]: /ja/service_management/incident_management/incident_settings#message-templates
[17]: /ja/getting_started/incident_management