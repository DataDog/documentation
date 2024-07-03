---
title: Team Management
---

## Team detail

Each team has a detail page that displays information about the team, its members, and its associated resources. Navigate to a team detail page by clicking on a team from the [Teams directory][1].

The team page displays the following resources associated with your team:
- ダッシュボード
- ノートブック
- モニター
- サービス
- リンク
- Ongoing incidents
- API endpoints

You can change which resources are shown and their order on the page.

Customize the look of your team by choosing an emoji avatar and banner. The emoji avatar displays next to the team name in lists across Datadog.

See the following instructions to customize your team.

### Customize layout

To modify the team page layout, you must have the `user_access_manage` or `teams_manage` permission. Alternately, you can be a team member or team manager of a team that is configured to allow members and managers to edit team details.

1. Click **Page Layout**. The page layout dialog appears.
1. To reorder the resources, click and drag the drag handle icons.
1. To hide a resource, mouse over an item and click the eye (**Hide content**) icon.

Hidden resources appear at the bottom of the page layout dialog. To reveal a resource, mouse over it and click the **Unhide content** icon.

### Customize settings

To modify the team details, you must have the `user_access_manage` or `teams_manage` permission. Alternately, you can be a team member or team manager of a team that is configured to allow members and managers to edit team details.

Click **Settings**. The settings dialog appears.

From the settings dialog, use the menu to customize the following team settings:
- Members
- リンク
- Name and description
- Avatar and banner
- Page layout
- 権限
- 通知

## チームのメンバーシップ

チームのメンバーを差別化するために、チームマネージャーとして指定します。メンバーリストでは、チームマネージャーの名前の横に "TEAM MANAGER" バッジが表示されます。

チームの設定で、チームメンバーを変更できるユーザーを指定します。次のオプションが利用できます。
- `user_access_manage` 権限を持つユーザーのみ
- チームマネージャー
- チームマネージャーとメンバー
- 組織内の誰でも

`user_access_manage` 権限を持つユーザは、誰がメンバーの追加や削除、チーム詳細の編集を行えるかのデフォルトルールを設定できます。チームディレクトリページの **Default Settings** ボタンで、デフォルトルールを設定します。チーム詳細パネルで、個々のチームに対してこれらのポリシーをオーバーライドすることができます。

## SAML 属性マッピング

SAML 属性を使用してチームおよびチームメンバーシップを管理するには、[SAML 属性のチームへのマッピング][2]を参照してください。

## チーム管理の委任

オープンメンバーシップモデルの場合、デフォルトのチーム設定を構成し、**組織内の誰でも**メンバーの追加や削除ができるようにします。適切なロールに `teams_manage` 権限を割り当て、誰でもチームを作成したり、チームの詳細を編集できるようにします。

チーム主導のメンバーシップモデルを好む場合は、デフォルトのチーム設定を、**チームマネージャー**または**チームマネージャーとメンバー**がメンバーを追加または削除できるように設定します。チームマネージャー全員を含むロールに、`teams_manage` 権限を割り当てます。

厳密なメンバーシップモデルを実施するには、デフォルトのチーム設定で、**user_access_manage** を持つユーザーだけがメンバーを追加または削除できるように構成します。`teams_manage` 権限を組織管理者にのみ割り当てます。

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /ja/account_management/saml/mapping/#map-saml-attributes-to-teams