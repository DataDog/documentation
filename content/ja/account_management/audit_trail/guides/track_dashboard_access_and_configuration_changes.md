---
aliases:
- /ja/./track_dashboard_usage/
disable_toc: false
further_reading:
- link: account_management/audit_trail/
  tag: ドキュメント
  text: Audit Trail のセットアップ
title: ダッシュボードのアクセスと構成変更を追跡する
---

## 概要

Audit Trail は、組織内で誰が Datadog を使用しているか、またどのように使用しているかについて、Datadog 管理者に可視性を提供します。本ガイドでは、特定のダッシュボードの使用状況を確認する方法を説明します。

## 特定のダッシュボードの使用状況を表示する

### ダッシュボード ID を取得する

ダッシュボードの使用状況を取得するには、そのダッシュボードの ID が必要です。

1. [Dashboards][1] に移動します。
1. 対象のダッシュボードを選択します。
1. ダッシュボード ID はダッシュボード URL に含まれており、 `https://app.datadoghq.com/dashboard/` の後に続きます。例えば、ダッシュボード URL が `https://app.datadoghq.com/dashboard/pte-tos-7kc/escalations-report` の場合、ダッシュボード ID は `pte-tos-7kc` です。
1. ダッシュボード ID をコピーします。

### Audit Trail でダッシュボードの使用状況を表示する

ダッシュボードの使用状況を確認するには、Audit Trail でそのダッシュボード ID に対するすべての API `GET` リクエストを検索します。

1. [Audit Trail][2] に移動します。
2. 検索バーに次のクエリを入力します: `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/dashboard/<dashboard_id>`。 `<dashboard_id>` は先ほどコピーしたダッシュボード ID に置き換えてください。 <br>例えば、ダッシュボード ID が `pte-tos-7kc` の場合、検索クエリは次のようになります:
{{< img src="account_management/audit_logs/dashboard_access_query.png" alt="ダッシュボード ID pte-tos-7kc に対する成功したすべての GET リクエストの検索クエリ" style="width:100%;" >}}
`@http.status_code:200` は、結果を成功したリクエストのみに絞り込みます。
<br>**注**: ページ左側のファセット パネルを使用して、検索クエリを組み立てることもできます。
3. ページ右上のタイム フレームを選択して、特定期間のイベントを表示します。
4. **Group into fields** セクションを構成し、ユース ケースに応じてデータを分解して分析するために異なる可視化ツールを選択できます。例えば、 `group by` フィールドを `User Email` に設定し、**Visualize as** セクションで **Top List** をクリックすると、ダッシュボードにアクセスしたユーザーの Top List が得られます。
5. この情報をダッシュボードやグラフに取り込みたい場合は、 [ダッシュボードまたはグラフの作成][3] を参照してください。

## 最近のダッシュボードの構成変更を表示する

Audit Trail の [イベント クエリ][7] を使用して、最近構成が変更されたダッシュボードの一覧を確認できます。

1. [Audit Trail][2] に移動します。
1. **Search for** フィールドに、表示したい変更の種類でフィルタリングするクエリを貼り付けます。以下は一般的な例です:

   | 監査イベント | Audit Explorer 内のクエリ |
   |-----------------------------------|--------------------------------------------------------------|
   | [最近作成されたダッシュボード][4] | `@evt.name:Dashboard @asset.type:dashboard @action:created` |
   | [最近変更されたダッシュボード][5] | `@evt.name:Dashboard @asset.type:dashboard @action:modified` |
   | [最近削除されたダッシュボード][6] | `@evt.name:Dashboard @asset.type:dashboard @action:deleted` |

1. 必要に応じて、ファセット パネルの **Asset ID** や **Asset Name** などのフィルターを使用し、特定のダッシュボードに結果を絞り込みます。
1. テーブルの各イベントでは、最後の変更を実行したユーザーのメール アドレスと、何が起きたかの概要を確認できます。

   特定の変更について追加情報を表示するには、テーブル内の行をクリックします。次に、**Inspect Changes (Diff)** タブをクリックして、ダッシュボードの構成に対して行われた変更を確認します:

   {{< img src="account_management/audit_logs/dashboard_change_diff.png" alt="ダッシュボードに新しいウィジェットが追加されたことを示すテキスト ディフ" style="width:100%;" >}}

1. この情報をダッシュボードやグラフに取り込みたい場合は、 [ダッシュボードまたはグラフの作成][3] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/audit-trail
[3]: /ja/account_management/audit_trail/#create-a-dashboard-or-a-graph
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[7]: /ja/account_management/audit_trail/events