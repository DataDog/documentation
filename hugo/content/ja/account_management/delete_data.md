---
private: true
title: データの削除
---

{{< callout url="#" btn_hidden="true" header="false">}}
  UI を使用したデータの削除は現在プレビューです。
{{< /callout >}} 

このページでは Datadog からデータを削除する方法を説明します。

## Logs 以外のデータの削除

Logs 以外の製品からデータを削除するには、[サポート][1] に依頼を送ってください。

## Logs データの削除

Logs 製品のデータは、UI を使用して削除できます。

### 削除権限の付与

アカウントにデータ削除のアクセス権を付与するには、次の手順を実行します:

1. Organizational Settings で [Roles][3] に移動します。
2. 削除したい製品に対し **Delete Data** 権限を持つロールをリクエストするか作成します。例えば Logs のデータを削除するには、**Logs Delete Data** 権限を持つロールをリクエストするか作成します。

### 削除の開始

<div class="alert alert-warning">削除されたデータは復旧できず、削除は元に戻せません。</div>

<div class="alert alert-info"><strong>Logs の場合</strong>: 削除を特定の Index にスコープすることはできず、削除は Index、Flex Indexes、Online Archives 全体に対して実行されます。
</div>

データを削除するには、次の手順を実行します:

1. Organization Settings で [Data Deletion][4] に移動します。
2. 削除する製品を選択します。
3. 検索対象の期間を選択します。
4. その期間内のイベントをクエリします。
5. 削除したい結果が表示されたら、右下の **Delete** ボタンをクリックします。
6. チェック ボックスを選択し、確認用テキストを入力して削除を確定するよう求められます。**Confirm** をクリックします。

リクエストの確認から 2 時間後に削除が開始されます。

削除を検証するには [Deletion History][5] タブでステータスを確認します。さらに、[Audit Trail][6] で文字列 `@asset.name:"Data Deletion"` を使用して削除を検索できます。

**注**:
- 削除は確認から 2 時間後に開始され、この期間中に到着した一致レコードも削除対象に含まれます。場合によっては、ジョブ開始後に到着したレコードが、当該レコードが発生した時間ウィンドウの処理がすでに完了しているため削除されないことがあります。
- レコードを削除しても、そのレコードから派生したデータは削除されません (例: Logs から生成された Metrics)。

### 削除の停止

**注**: 進行中の削除はキャンセルできますが、そのジョブでまだ処理されていないデータの削除のみが防止されます。

削除をキャンセルするには、**Upcoming** または **In Progress** のジョブで **Cancel** をクリックします。

### 削除の監査

削除は [Deletion History][5] に 90 日間記録されます。また、依頼ユーザーの詳細とともに [Audit Trail][6] にも記録されます。

[1]: https://www.datadoghq.com/support/
[2]: /ja/account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"