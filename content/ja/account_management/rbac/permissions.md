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

## 概要

権限は、ユーザーが特定のリソースに対して持つアクセスの種類を定義します。通常、権限はユーザーにオブジェクトの読み取り、編集、削除の権利を与えます。権限は、管理対象の 3 つのロールとカスタムロールを含むすべてのロールのアクセス権の基盤です。

### 機密性の高い権限

Datadog の一部の権限は、以下のような注意すべきより高い特権の機能へのアクセスを提供します。

- 組織設定を変更するアクセス
- 潜在的に機密性の高いデータを読むアクセス
- 特権的な操作を実行するアクセス

機密性の高い権限は、ロールと権限のインターフェイスでフラグが立てられ、より厳重な注意が必要であることを示します。ベストプラクティスとして、ロールを構成する管理者はこれらの権限に特別な注意を払い、これらの権限のうちどれが自分のロールやユーザーに割り当てられているかを確認すべきです。

### 管理対象のロール

デフォルトでは、既存のユーザーは 3 つの管理対象ロールのいずれかに関連付けられています。

- Datadog 管理者
- Datadog 標準
- Datadog 読み取り専用

これらのロールのいずれかを持つユーザーは、[個別に読み取りが制限されている][1]リソースを除き、すべてのデータタイプを読み取ることができます。Admin および Standard ユーザーは、アセットに対する書き込み権限を持ちます。Admin ユーザーには、ユーザー管理、組織管理、請求、および使用に関する機密アセットに対する追加の読み取りおよび書き込み権限があります。

管理対象のロールは Datadog によって作成・維持されます。新機能の追加や権限の変更に伴い、その権限は Datadog によって自動的に更新される場合があります。ユーザーは管理対象ロールを直接変更することはできませんが、それらを複製して特定の権限を持つ[カスタムロール](#custom-roles)を作成できます。必要に応じて、ユーザーは自分のアカウントから管理対象ロールを削除することができます。

### カスタムロール

新しいロールに権限をまとめるには、カスタムロールを作成します。カスタムロールを使用すると、例えば請求管理者などの役割を定義し、そのロールに適切な権限を割り当てることができます。ロールを作成した後、[Datadog でロールを更新][2]するか、[Datadog Permission API][3] を使用して、このロールに直接権限を割り当てたり、削除したりします。

**注**: 新しいカスタムロールをユーザーに追加する場合、そのユーザーに関連する管理対象の Datadog ロールを削除して、新しいロールの権限を適用してください。

## 権限リスト

以下の表は、Datadog で利用可能なすべての権限の名前、説明、およびデフォルトロールの一覧です。各アセットタイプには、対応する読み取り権限と書き込み権限があります。

管理対象の各ロールは、権限の少ないロールからすべての権限を継承します。したがって、Datadog Standard Role は、Datadog Read Only をデフォルトロールとして、表に記載されているすべての権限を持ちます。さらに、Datadog Admin Role には、Datadog Standard と Datadog Read Only の両方の権限が含まれています。

{{% permissions %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration は Datadog, Inc. の商標です

[1]: /ja/account_management/rbac/granular_access
[2]: /ja/account_management/users/#edit-a-user-s-roles
[3]: /ja/api/latest/roles/#list-permissions