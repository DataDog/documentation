---
disable_toc: false
further_reading:
- link: account_management/audit_trail/
  tag: ドキュメント
  text: Audit Trail をセットアップする
title: モニターへのアクセスと構成変更を追跡する
---

## 概要

Audit Trail は、組織内で誰が Datadog を使用しているか、またどのように使用しているかについて、Datadog 管理者に可視性を提供します。このガイドでは、特定のモニターの使用状況情報を確認する方法を説明します。

## 特定のモニターの使用状況を表示する

### モニター ID を取得する

モニターの使用状況情報を取得するには、そのモニターの ID が必要です。

1. [Monitors][1] に移動します。
1. 対象のモニターを選択します。
1. モニター ID はモニターの URL に含まれており、 `https://app.datadoghq.com/monitors/` の後ろにあります。例えば、モニターの URL が `https://app.datadoghq.com/monitors/123456789` の場合、モニター ID は `123456789` です。
1. モニター ID をコピーします。

### Audit Trail でモニターの使用状況を表示する

そのモニターの使用状況を確認するには、Audit Trail を使用して、そのモニター ID に対するすべての API `GET` リクエストを検索します。

1. [Audit Trail][2] に移動します。
2. 検索バーに次のクエリを入力します: `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/monitor/<monitor_id>`。`<monitor_id>` を先ほどコピーしたモニター ID に置き換えます。

   例えば、モニター ID が `123456789` の場合、検索クエリは `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/monitor/123456789` になります。`@http.status_code:200` は、成功したリクエストのみに結果を絞り込みます。

   **注**: ページ左側のファセット パネルを使って、検索クエリを作成することもできます。
3. ページ右上の期間を選択して、特定の期間のイベントを表示します。
4. **Group into fields** セクションを構成し、ユース ケースに応じてデータを分解・分析できるように、さまざまな可視化ツールを選択できます。例えば、`group by` フィールドを `User Email` に設定し、**Visualize as** セクションで **Top List** をクリックすると、そのモニターにアクセスしたユーザーのトップ リストが得られます。
5. この情報をダッシュボードやグラフに入れたい場合は、[ダッシュボードまたはグラフを作成する][3] を参照してください。

## 最近のモニター構成の変更を表示する

Audit Trail の [イベント クエリ][8] を使用すると、最近構成が変更されたモニターの一覧を表示できます。

1. [Audit Trail][2] に移動します。
1. **Search for** フィールドに、表示したい変更の種類で絞り込むためのクエリを貼り付けます。よくある例は次のとおりです:

   | 監査イベント | Audit Explorer のクエリ |
   |-----------------------|----------------------------------------------------------|
   | [モニターの作成][4] | `@evt.name:Monitor @asset.type:monitor @action:created` |
   | [モニターの変更][5] | `@evt.name:Monitor @asset.type:monitor @action:modified` |
   | [モニターの削除][6] | `@evt.name:Monitor @asset.type:monitor @action:deleted` |
   | [モニターの解決][7] | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

1. 必要に応じて、ファセット パネルで **Asset ID** や **Asset Name** などのフィルターを使用し、特定のモニターに結果を絞り込むこともできます。
1. 表の各イベントでは、最後の変更を実行したユーザーのメール アドレスと、何が起きたかの概要を確認できます。

   特定の変更の詳細を確認するには、表の行をクリックします。次に、**Inspect Changes (Diff) タブ** をクリックして、そのモニターの構成に加えられた変更を表示します:

   {{< img src="account_management/audit_logs/monitor_change_diff.png" alt="モニターに `check_type: api` タグが追加されたことを示すテキスト差分" style="width:100%;" >}}

1. この情報をダッシュボードやグラフに入れたい場合は、[ダッシュボードまたはグラフを作成する][3] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: https://app.datadoghq.com/audit-trail
[3]: /ja/account_management/audit_trail/#create-a-dashboard-or-a-graph
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[8]: /ja/account_management/audit_trail/events/#monitor-events