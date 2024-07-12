---
aliases:
- /ja/guides/rbac
- /ja/account_management/rbac/role_api
- /ja/account_management/users/default_roles
- /ja/account_management/users/custom_roles
- /ja/account_management/rbac/log_management
further_reading:
- link: /api/v2/roles/
  tag: Documentation
  text: Roles API を使用してロールとアクセス許可を管理する
- link: /api/v2/roles/#list-permissions
  tag: Documentation
  text: Permission API を使用してアクセス許可を管理する
- link: /account_management/rbac/permissions
  tag: ドキュメント
  text: 利用可能なアクセス許可の一覧
- link: /account_management/saml/
  tag: Documentation
  text: SAML を使用したシングルサインオンを有効にする
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: ブログ
  text: Datadog Audit Trail で、チーム全体のコンプライアンス、ガバナンス、透明性を構築します
title: アクセス制御
---

## 概要

Datadog は、Datadog リソースへのアクセスを制御するレベルをカスタマイズすることを可能にする、柔軟なアクセス管理システムを提供しています。

基本的な機能を求めるユーザーには、[権限][1]付きのすぐに使える[ロール](#role-based-access-control)が用意されています。より柔軟性を求めるのであれば、独自の[カスタムロール](#custom-roles)を作成し、権限を新しいロールにまとめることができます。カスタムロールにアタッチされた権限は、特定のリソースタイプのすべてのリソースに適用されます。

最大限の柔軟性を必要とする組織やユーザーは、[粒度の高いアクセス制御][2]を使用して、個々のダッシュボード、ノートブック、およびその他のリソースへのアクセスを制御できます。

## ロールベースのアクセス制御

ロールによりユーザーを分類し、各ユーザーが読み取ることができるデータや変更できるアカウントアセットなど、アカウントのアクセス許可を定義します。Datadog ではデフォルトで 3 つのロールを提供していますが、[カスタムロール](#カスタムロール)を作成すると、ユーザーとアクセス許可のマッピングをより適切に定義できます。

ロールにアクセス許可を付与することで、ロールに関連付けられているユーザーはアクセス許可を受け取ります。複数のロールに関連付けられているユーザーは、それぞれのロールに付与されているすべてのアクセス許可を受け取ります。ユーザーに関連付けられたロールが増えるほど、Datadog アカウント内で持つアクセス権も増えます。

[子組織][3]のユーザーが `org_management` 権限を持っていても、親組織で同じ権限を持っているとは限りません。ユーザーのロールは、親組織と子組織の間で共有されることはありません。

**注**: SAML ID プロバイダーを使用する場合、認証のためにそれを Datadog と統合でき、ID 属性を Datadog のデフォルトロールとカスタムロールにマップできます。詳細については、[SAML グループマッピング][4]を参照してください。

## Datadog のデフォルトのロール

Datadog 管理者ロール
: 請求情報へのアクセス、API キーの無効化に加えて、ユーザーの管理や[読み取り専用ダッシュボード][5]の構成が可能です。標準ユーザーを管理者に昇格させることもできます。

Datadog 標準ロール
: [ダッシュボード][5]、[モニター][6]、[イベント][7]、[ノートブック][8]など、Datadog が提供するすべての監視機能を表示および変更できます。他のユーザーを組織に招待することも可能です。

Datadog 読み取り専用ロール
: Datadog システム内での編集権限を持たないユーザーです。特定の機能を読み取り専用ビューでクライアントに共有したり、ある部門のメンバーから外部ユーザーに[ダッシュボード][5]を共有する必要がある場合に便利です。

## カスタムロール

カスタムロール機能を使用すると、組織で一意の権限セットを持つ新しいロールを作成できます。Datadog サイト、[Datadog Role API][8]、または SAML から直接カスタムロールを管理できます。下記からロールの作成、更新、削除方法をご確認ください。利用可能なアクセス許可の詳細については、[Datadog ロールの権限][1]を参照してください。Datadog でロールを作成または編集できるのは、User Access Manage 権限を持つユーザーのみです。

### カスタムロールを有効にする

1. [Organization Settings][9] に移動します。
2. ページ左側の **Roles** を選択します。
3. 右上のギアアイコンをクリックすると、Custom Roles のポップアップウィンドウが開きます。
4. Custom Roles で **Enable** をクリックします。

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Custom Roles ポップアップウィンドウの Enable ボタン" style="width:90%;">}}

代替として、POST 呼び出しを [Create Role API エンドポイント][10]宛てにすると、自動的にオーガニゼーションに対するカスタムロールが有効になります。

### カスタムロールを作成する

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを作成するには

1. [Datadog Roles ページ][1]に移動します。
2. ページ右上隅 **New Role** を選択します。
3. ロールに名前を付けます。
4. ロールにアクセス許可セットを割り当てます。利用可能なアクセス許可の詳細については、[Datadog ロールのアクセス許可][2]を参照してください。

ロールを作成したら、[既存のユーザーに追加][3]できます。


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions/
[3]: /ja/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

[ロールの作成 API リファレンス][1]で、ロールの作成方法の例をご紹介しています。


[1]: /ja/api/latest/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### ロールを更新する

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを編集するには

1. [Datadog Roles ページ][1]に移動します。
2. 変更するロールの編集ボタンを選択します。
3. ロールのアクセス許可セットを変更します。利用可能なアクセス許可の詳細については、[ロールのアクセス許可][2]を参照してください。
4. 変更を保存します。


ロールが変更されると、そのロールを持つすべてのユーザーのアクセス許可が更新されます。


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

[ロールの更新 API リファレンス][1]で、ロールの更新方法の例をご紹介しています。


[1]: /ja/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### ロールの複製

{{< tabs >}}
{{% tab "Datadog application" %}}

既存ロールのクローンを作成するには:

1. [Datadog Roles ページ][1]に移動します。
2. クローンを作成するロールの上にカーソルを合わせます。右側にボタン群が表示されます。
3. クローンを作成するロールのクローンボタンを選択します。
4. オプションで、ロールの名前または権限を変更します。
5. 下の **Save** ボタンをクリックします。

{{< img src="account_management/rbac/clone_role.png" alt="クローンボタンがハイライトされた 2 つのロールのリスト" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[ロールのクローン作成 API リファレンス][1]で、ロールのクローン作成方法の例をご紹介しています。

[1]: /ja/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### ロールを削除する

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを削除するには

1. [Datadog Roles ページ][1]に移動します。
2. 削除するロールの上にカーソルを合わせます。右側にボタン群が表示されます。
3. 削除するロールの削除ボタンを選択します。
4. 決定を確認します。


ロールが削除されると、このロールを持つすべてのユーザーのアクセス許可が更新されます。ロールのないユーザーは、Datadog を効率的に使用できませんが、制限付きのアクセスを保持します。


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[ロールの削除 API リファレンス][1]で、ロールの削除方法の例をご紹介しています。


[1]: /ja/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### ロールテンプレートの適用

Datadog サイトでロールを作成または更新する際、Datadog ロールテンプレートを使用すると、ロールに既定のアクセス許可を適用できます。

1. New Role または Edit Role ページで、右側の **Show Role Templates** ボタンをクリックします。
2. ロールテンプレートのドロップダウンメニューが表示されます。
3. メニューから、ロールに適用するアクセス許可のロールテンプレートを選択します。
4. **Apply** ボタンをクリックします。
4. オプションで、ロールにさらに変更を加えます。
5. **Save** ボタンをクリックします。

{{< img src="account_management/rbac/role_templates.png" alt="Datadog 請求管理者ロールが選択されたロールテンプレートのドロップダウンメニュー" style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/
[2]: /ja/account_management/rbac/granular_access/
[3]: /ja/account_management/multi_organization/
[4]: /ja/account_management/saml/mapping/
[5]: /ja/dashboards/
[6]: /ja/monitors/
[7]: /ja/events/
[8]: /ja/api/v2/roles/
[9]: https://app.datadoghq.com/organization-settings/
[10]: /ja/api/latest/roles/#create-role
