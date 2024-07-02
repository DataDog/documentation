---
title: Monitor Status
description: "Get an overview of your monitor status over time"
aliases:
- /monitors/monitor_status/
further_reading:
- link: /monitors/
  tag: Documentation
  text: Create monitors
- link: /monitors/notify/
  tag: Documentation
  text: Monitor Notifications
- link: /monitors/manage/
  tag: Documentation
  text: Manage monitors
---

## 概要

[モニターの作成][1]後、モニターのステータスページを使用して、経時的なステータスを表示します。

{{< img src="monitors/monitor_status/monitor_status_page.png" alt="モニターステータスページ" >}}

## ヘッダー

ヘッダーには、モニターのステータス、ステータスの時間、モニターのタイトルが含まれます。右側には、**Mute**、**Resolve**、設定歯車ボタンがあります。

### ミュート

ミュートボタンを使用してモニター全体をミュートするか、**スコープ** を設定して部分的にミュートします。使用できるスコープは、モニターのグループタグに基づきます。複数のスコープまたはモニターを同時にミュートする方法の詳細については、[ダウンタイム][2]を参照してください。

**注**: UI を使用してモニターをミュートまたはミュート解除すると、そのモニターに関連付けられているすべてのスケジュールされたダウンタイムが削除されます。

### 解決

モニターがアラート状態の場合、**Resolve** ボタンが表示されます。このボタンを使用して、モニターを手動で解決します。

モニターの `resolve` 機能を使用すると、次回のモニター評価に備えて、モニターのステータスを意図的に `OK` に切り替えることができます。通常は、モニターの元データに基づいて、次のモニター評価が実行されます。

現在のデータが `ALERT` 状態であるためにモニターでアラートが発生した場合は、`resolve` によってモニターの状態が `ALERT -> OK -> ALERT` の順に切り替わります。このため、アラートを確認したり、Datadog にアラートを無視させたりするために `resolve` を使用するのは不適切です。

データが断続的に報告される場合は、手動でモニターを解決しても問題ありません。たとえば、アラートがトリガーされると、モニターはデータを受信しなくなります。このため、モニターはアラートの条件を評価することや、`OK` の状態に回復することができなくなります。このような場合は、`resolve` 機能、またはタイマーにより自動的に解決する `Automatically resolve monitor after X hours` 機能を使用することで、モニターを `OK` の状態に戻すことができます。

**一般的な使用例**: エラーがない場合には生成されないエラーメトリクスに基づいたモニター (`aws.elb.httpcode_elb_5xx`、コード内に置かれて_エラーがある場合にのみ_エラーを報告する DogStatsD カウンター)

### インシデントを作成する
**Declare incident** を選択して、モニターからインシデントを作成します。重大度レベル、通知、および追加のメモを含む *Declare Incident* ポップアップモーダル を構成します。詳細については、[インシデント管理][3]のドキュメントを参照してください。

### 設定

設定歯車をクリックして、使用可能なオプションを表示します。

| オプション | 説明                                                                                                                                                                                                    |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 編集   | 現在のモニターを編集します。[モニターの構成][1]セクションの詳細を参照してください。                                                                                                                                            |
| Clone  | 現在のモニターのコピーを作成します。                                                                                                                                                                            |
| エクスポート | 現在のモニターの JSON 構成をエクスポートします。このオプションは、[モニターの作成][1]時でも使用できます。プログラムでモニターを管理する場合は、UI でモニターを定義し、JSON をエクスポートします。 |
| 削除 | 現在のモニターを削除します。削除の確認を求められます。                                                                                                                                      |

## プロパティ

プロパティセクションは、モニターの概要です。

| プロパティ     | 説明                                                                           |
|--------------|---------------------------------------------------------------------------------------|
| ステータス       | アラート、警告、データなし、または OK                                                           |
| タイプ         | [モニターの種類][4]の詳細をご覧ください。                                                  |
| ID           | [モニター API][5] に使用されます。                                                        |
| Date created | モニターが作成された日付。                                                     |
| Author       | モニターを作成した人。                                                   |
| タグ         | モニターレベルでアタッチされたタグ。鉛筆アイコンをクリックしてタグを編集します。 |
| クエリ        | [クエリ][6]の詳細をご覧ください。                                                       |
| メッセージ      | モニターの[通知][7]セクションで指定されたメッセージ。                |

## ステータスと履歴

ステータスと履歴セクションには、モニターのクエリと状態の経時的な変化が表示されます。情報をフィルタリングするには、セクションの上の検索ボックス、ステータス、および時間セレクターを使用します。

### ステータス

ステータスグラフは、時間の経過に伴うモニターのステータスをグループごとに示します。**注**: `None` または `no groups found` と表示される場合、次のいずれかの状況が当てはまる可能性があります。

* 新しく作成されたモニターがまだ評価されていない。
* モニターのクエリが最近変更された。
* モニターのタイムフレームがメトリクスに対して短すぎるため、データの供給頻度が低くなっています。
* 以前にクエリに含まれていたホストの名前が変更されました。ホスト名の変更は、2 時間以内に UI から期限切れになります。
* フィルターしているクエリが期待通りに動作していない。

The status graph shows you the dimensions you configured for your alerts, not the dimensions in your monitor query. For example: your monitor query is grouped by `service` and `host`, but you only want to receive alerts for the `service`. The status graph shows the monitor's status grouped by `service`. You can see the `host` subgroups by clicking **View all** which opens a panel showing status graphs for each subgroup. For more information on alert groupings, see [Configure Monitors][14].

{{< img src="monitors/monitor_status/monitor_status_group_subgroup.png" alt="モニターステータスをサービス別にグループ化し、サブグループを表示するオプションをハイライトしています" style="width:100%;" >}}

#### グループまたはイベントによるモニターステータスのフィルター 


**Status & History** ビューを特定のグループに絞り込むには、フィルターフィールドを使用し、フィルタリングしたい属性を入力します。グループフィルターの構文は、[モニター検索クエリ][30]と同じ原則に従います。従うべきベストプラクティスをいくつか紹介します。

- フィルターは大文字と小文字を区別し、`env:prod` と `env:Prod` は同じモニターグループを返しません。Datadog ではタグの統一を推奨しています。詳細については、[タグの概要][31]を参照してください。
- クエリは自動的にワイルドカードを付加します。特定のフィルターを適用するには、クエリを二重引用符 (`"`) で囲んでください。
  例えば、以下のクエリは二重引用符を使用していません。
  ```
  availability-zone:us-central1-a,instance-type:*,name:gke-demo-1
  ```
  クエリが 1 つの特定のグループを表示することを期待しているにもかかわらず、モニターはフォローグループを返します。
  ```
  availability-zone:us-central1-a,instance-type:*,name:gke-demo-10
  availability-zone:us-central1-a,instance-type:*,name:gke-demo-12
  ```

  クエリを二重引用符で囲むと、期待通りのグループが返されます。
  `"availability-zone:us-central1-a,instance-type:*,name:gke-demo-1"`

#### ノートブックのモニターを調査する

メトリクスの進化をさらに詳しく調べるには、ステータスグラフの横にある **Open in a notebook** をクリックします。これにより、モニタークエリのフォーマットされたグラフを含む調査用[ノートブック][8]が生成されます。

{{< img src="monitors/monitor_status/notebook-button2.png" alt="Open in notebook ボタン" style="width:90%;">}}

ノートブックはモニターの評価期間と一致し、関連する場合は関連するログを含んでいます。

#### フォローモニターグループの保持

Datadog は、クエリが変更されない限り、UI 上でモニターグループを 24 時間利用可能な状態に保ちます。データの欠落を通知するように構成されているホストモニターとサービスチェックは、48 時間利用可能です。モニターグラフに点線が表示され、non-reporting (報告なし) になっている場合は、以下の理由が考えられます。

- The new group is evaluated some time after the monitor is created. The evaluation graph shows the dotted line from the start of the time period to when the group is first evaluated.
- The group stops reporting, drops out, and then starts reporting again. The dotted line appears from the time the group dropped out to when the group starts evaluating again.

{{< img src="monitors/monitor_status/dotted-line.png" alt="Follow group retention" style="width:90%;">}}

**注**: non-reporting は no data (データなし) と同じではありません。non-reporting はグループ固有のステータスです。

### 履歴

履歴グラフは、収集されたデータをステータスグラフと並べて表示します。これは、モニターのメトリクスクエリに送信される生のデータポイントを表示します。モニターステータスページでは、ノートブックやダッシュボードで使用されているのと同じ時系列グラフウィジェットを使用します。

### 評価グラフ

評価グラフは、モニターに固有のものです。履歴グラフと同じクエリロジックを使用しますが、履歴グラフの時間枠ブラケットにスコープされます。表示されたポイントが正しく集計されるように、モニターの[評価ウィンドウ][9]に対応する固定でズームされたウィンドウを持ちます。たとえば、過去 15 分間のクエリの平均を評価するようにモニターが構成されている場合、評価グラフの各データポイントは、前の 15 分間の評価ウィンドウのメトリクスの集計値を表示します。

このグラフは、モニターで構成した評価条件に対して適用した、あるメトリクスの生データポイントからの結果を示しています。この視覚化は、モニタークエリを通過した後のデータの値を表示しているため、履歴グラフとは異なります。

{{< img src="monitors/monitor_status/status_monitor_history.mp4" alt="ステータスモニター履歴" video="true" width="100%" >}}

## イベント

モニターから生成されたイベント (アラート、警告、回復など) は、**Status & History** セクションの上の時間セレクターに基づいてこのセクションに表示されます。イベントは[イベントエクスプローラー][10]にも表示されます。

### Audit trail（監査証跡）
監査証跡は、あらゆるタイプのモニターの変更を自動的にキャプチャし、イベントを生成します。このイベントはモニターへの変更をドキュメント化します。

 For example, in the case of an edit to a monitor, the Audit Trail event shows:
 - The previous monitor configuration
 - The current monitor configuration
 - The user that made the change

 For more information, see the [Audit Trail][11] documentation and read the [Audit Trail best practices][12] blog.

Datadog は、作成したモニターへの変更に対する通知オプションも提供しています。モニターエディターの下部にある、**Define permissions and audit notifications** の下にある *If this monitor is modified, notify monitor creator and alert recipients.* (このモニターが変更された場合、モニターの作成者とアラート受信者に通知する) の隣のドロップダウンで、**Notify** を選択します。

この設定により、モニター監査イベントに関する電子メールが、特定のモニターの全アラート受信者とモニター作成者に送信されます。モニター監査イベントは[イベントエクスプローラー][10]にも表示されます。

## エクスポートとインポート

モニターのステータスページから、任意のモニターのエクスポートを JSON で取得できます。右上にある歯車アイコン（設定）をクリックし、メニューから **Export** を選択します。

[Import a monitor][13] to Datadog with JSON using the main navigation: *Monitors --> New Monitor --> Import*.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /monitors/configuration/
[2]: /monitors/downtimes/
[3]: /service_management/incident_management/#from-a-monitor
[4]: /monitors/types/
[5]: /api/v1/monitors/
[6]: /dashboards/querying/
[7]: /monitors/notify/
[8]: /notebooks
[9]: /monitors/configuration/?tab=thresholdalert#evaluation-window
[10]: https://app.datadoghq.com/event/explorer
[11]: /account_management/audit_trail/
[12]: https://www.datadoghq.com/blog/audit-trail-best-practices/
[13]: https://app.datadoghq.com/monitors#create/import
[14]: /monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
[30]: /monitors/manage/search/#query
[31]: /getting_started/tagging/
