---
algolia:
  category: Documentation
  rank: 80
  subcategory: Datadog ロールのアクセス許可
aliases:
- /ja/account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: ドキュメント
  text: ロールの作成、更新、削除
- link: /api/v2/roles/#list-permissions
  tag: ドキュメント
  text: Permission API を使用してアクセス許可を管理する
title: Datadog ロールのアクセス許可
---

ロールを作成した後、[Datadog でロールを更新][1]するか [Datadog Permission API][2] を使用して、このロールへアクセス許可を直接割り当てたり削除したりできます。利用可能なアクセス許可の一覧は次のとおりです。

## 概要

デフォルトで、既存ユーザーは 3 つのすぐに使用できるロールのうち 1 つに紐付けられています。

- Datadog 管理者
- Datadog 標準
- Datadog 読み取り専用

上記いずれかのロールを持つユーザーは全員、すべてのデータタイプを読み取ることができます。管理者および標準ユーザーは、アセットに対する書き込み権限を有します。管理者ユーザーは、ユーザー管理、組織管理、請求、使用状況に関する機密アセットに対する追加的な読み取り・書き込み権限を持ちます。

**注**: ユーザーに新しいカスタムロールを追加する際、新しいロールの権限を適用するために、そのユーザーに関連付けられている既存の Datadog ロールを必ず削除してください。

各アセットタイプには、対応する読み取り・書き込み権限があります。これらの権限の詳細は、下の表で確認することができます。

{{% permissions %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration は Datadog, Inc. の商標です

[1]: /ja/account_management/users/#edit-a-user-s-roles
[2]: /ja/api/latest/roles/#list-permissions