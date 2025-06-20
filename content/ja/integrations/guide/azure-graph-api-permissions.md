---
further_reading:
- link: /integrations/azure/
  tag: ドキュメント
  text: Datadog-Azure インテグレーション
title: Azure を監視するための Microsoft Graph API 権限
---

[Datadog-Azure インテグレーション][1]が Azure アプリの登録詳細を取得するには、[Microsoft Graph API][2] へのアクセス権が必要です。この API はテナントレベルでクエリされます。

**注**: Datadog の Azure インテグレーションタイルで、同じテナントに対して複数のアプリ登録 (クライアント ID) が使用されている場合、1 つのアプリ登録にのみ権限が必要です。

## セットアップ

1. Azure ポータルで **App registrations** ページに移動します。変更したいアプリ登録をクリックします。
2. 左サイドバーの_Manage_セクションで、**API permissions** をクリックします。 
3. **+ Add a permission** をクリックします。
4. 開いたパネルで、**Microsoft Graph** を選択します。
5. 次のページで **Application permissions** を選択します。次に、_Select permissions_で以下の各権限を検索し、有効にします。
   - `Application.Read.All`
   - `Directory.Read.All`
   - `Group.Read.All`
   - `Policy.Read.All`
   - `User.Read.All`

   左側のチェックボックスをクリックし、一番下にある **Add permissions** ボタンをクリックして、各権限を追加します。
   {{< img src="integrations/guide/azure-graph-api-permissions/permission-select-1.png" alt="Microsoft Graph API 権限を追加するためのパネル。'Application permissions' が選択されています。'Select permissions' セクションで、ユーザーが 'Application.Read.All' と入力しました。その下のセクション 'Application (1)' で、Application.Read.All 権限が選択済みのチェックボックスの隣に表示されています。">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/azure
[2]: https://learn.microsoft.com/en-us/graph/permissions-reference