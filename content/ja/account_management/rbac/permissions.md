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

## Overview

権限は、ユーザーが特定のリソースに対して持つアクセスの種類を定義します。通常、権限はユーザーにオブジェクトの読み取り、編集、削除の権利を与えます。権限は、すぐに使える 3 つのロールとカスタムロールを含むすべてのロールのアクセス権の基盤です。

### すぐに使えるロール

By default, existing users are associated with one of the three out-of-the-box roles:

- Datadog Admin
- Datadog Standard
- Datadog Read Only

これらのロールのいずれかを持つユーザーは、[個別に読み取りが制限されている][1]リソースを除き、すべてのデータタイプを読み取ることができます。Admin および Standard ユーザーは、アセットに対する書き込み権限を持ちます。Admin ユーザーには、ユーザー管理、組織管理、請求、および使用に関する機密アセットに対する追加の読み取りおよび書き込み権限があります。

### Custom roles

新しいロールに権限をまとめるには、カスタムロールを作成します。カスタムロールを使用すると、例えば請求管理者などの役割を定義し、そのロールに適切な権限を割り当てることができます。ロールを作成した後、[Datadog でロールを更新][2]するか、[Datadog Permission API][3] を使用して、このロールに直接権限を割り当てたり、削除したりします。

**注**: 新しいカスタムロールをユーザーに追加する場合、そのユーザーに関連するすぐに使える Datadog ロールを削除して、新しいロールの権限を適用してください。

## 権限リスト

以下の表は、Datadog で利用可能なすべての権限の名前、説明、およびデフォルトロールの一覧です。各アセットタイプには、対応する読み取り権限と書き込み権限があります。

すぐに使える各ロールは、権限の少ないロールからすべての権限を継承します。したがって、Datadog Standard ロールは、Datadog Read Only をデフォルトロールとして、表に記載されているすべての権限を持ちます。さらに、Datadog Admin ロールには、Datadog Standard と Datadog Read Only の両方の権限が含まれています。

{{% permissions %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration is a trademark of Datadog, Inc.

[1]: /ja/account_management/rbac/granular_access
[2]: /ja/account_management/users/#edit-a-user-s-roles
[3]: /ja/api/latest/roles/#list-permissions