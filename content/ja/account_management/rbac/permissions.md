---
title: Datadog ロールのアクセス許可
kind: ドキュメント
aliases:
  - /ja/account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
  - link: /account_management/rbac/
    tag: ドキュメント
    text: ロールの作成、更新、削除
  - link: '/api/v2/roles/#list-permissions'
    tag: ドキュメント
    text: Permission API を使用してアクセス許可を管理する
---
ロールを作成すると、[Datadog アプリケーションでロールを更新][1]するか [Datadog Permission API][2] を使用して、このロールへアクセス許可を直接割り当てたり削除したりできます。利用可能なアクセス許可の一覧は次のとおりです。

## 概要

### 一般許可

一般許可は、各ロールのユーザーに対して基本的なアクセス権を許可するものです。[高度な許可](#advanced-permissions)は、一般許可に加えて付与される特定目的の許可を指します。

{{< permissions group="一般" >}}

**注**: ロールに `admin` と `standard` アクセス許可の両方がないことにより定義されるため、`read-only` アクセス許可はありません。

### 高度な許可

デフォルトでは、既存のユーザーは、すぐに使用できる 3 つの Datadog 管理者、標準、または読み取り専用ロールのいずれかにすでに関連付けられているため、すべてのユーザーは全種類のデータを読み取るアクセス許可をすでに持ち、管理者または標準ユーザーはアセットの書き込みアクセス許可をすでに持っています。

**注**: ユーザーに新しいカスタムロールを追加する際、新しいロールのアクセス許可を適用するために、そのユーザーに関連付けられている既存の Datadog ロールを必ず削除してください。

一般的なアクセス許可の他に、特定のアセットやデータタイプに対しより粒度の高いアクセス許可を定義することもできます。アクセス許可は、グローバルにすることも要素のサブセットに範囲を絞ることもできます。オプションの詳細と利用可能なアクセス許可に対する影響に関しては、以下をご覧ください。

{{% permissions %}}
{{< permissions group="ログ" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
\*Log Rehydration は Datadog, Inc. の商標です

[1]: /ja/account_management/users/#edit-a-user-s-roles
[2]: /ja/api/v2/roles/#list-permissions