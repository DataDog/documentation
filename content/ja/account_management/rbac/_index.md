---
title: ロールベースのアクセス制御
kind: documentation
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
    text: 利用可能なアクセス許可の一覧。
  - link: /account_management/saml/
    tag: Documentation
    text: SAML を使用したシングルサインオンを有効にする
---
ロールによりユーザーを分類し、各ユーザーが読み取ることができるデータや変更できるアカウントアセットなど、アカウントのアクセス許可を定義します。Datadog ではデフォルトで 3 つのロールを提供していますが、[カスタムロール](#カスタムロール)を作成すると、ユーザーとアクセス許可のマッピングをより適切に定義できます。

ロールにアクセス許可を付与することで、ロールに関連付けられているユーザーはアクセス許可を受け取ります。複数のロールに関連付けられているユーザーは、それぞれのロールに付与されているすべてのアクセス許可を受け取ります。ユーザーに関連付けられたロールが増えるほど、Datadog アカウント内で持つアクセス権も増えます。

**注** SAML ID プロバイダーを使用する場合、認証のためにそれを Datadog と統合でき、ID 属性を Datadog のデフォルトロールとカスタムロールにマップできます。詳細については、[SAML を使用したシングルサインオン][1]を参照してください。

## Datadog のデフォルトのロール

Datadog 管理者ロール
: 請求情報へのアクセス、API キーの無効化に加えて、ユーザーの管理や[読み取り専用ダッシュボード][2]の構成が可能です。標準ユーザーを管理者に昇格させることもできます。

Datadog 標準ロール
: [ダッシュボード][2]、[モニター][3]、[イベント][4]、[ノートブック][5]など、Datadog が提供するすべてのモニタリング機能を表示および変更できます。他のユーザーをオーガニゼーションに招待することも可能です。

Datadog 読み取り専用ロール
: Datadog システム内での編集権限を持たないユーザーです。特定の機能を読み取り専用ビューでクライアントに共有したり、ある部門のメンバーから外部ユーザーに[ダッシュボード][2]を共有する必要がある場合に便利です。

## カスタムロール

<div class="alert alert-warning">
カスタムロールの作成と変更は、オプトイン Enterprise 機能です。ご使用のアカウントでこの機能を有効にしたい場合は、<a href="/help">Datadog のサポートチームにお問い合わせください</a>。
</div>

Datadog アプリケーション、[Datadog ロール API][6]、または SAML から直接カスタムロールを管理できます。下記からロールの作成、更新、削除方法をご確認ください。利用可能なアクセス許可の詳細については、[Datadog ロールのアクセス許可][7]ドキュメントを参照してください。Datadog でロールを作成または編集できるのは、Access Management アクセス許可を持つユーザーのみです。

### カスタムロールを作成する

次の手順でカスタムロールを作成します。

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを作成するには

1. [Datadog Roles ページ][1]に移動します。
2. ページ右上隅 **New Role** を選択します。
3. ロールに名前を付けます。
4. 任意 - ロールにアクセス許可セットを割り当てます。利用可能なアクセス許可の詳細については、[Datadog ロールのアクセス許可][2]ドキュメントを参照してください。

{{< img src="account_management/rbac/create_role.png" alt="カスタムロールの作成" style="width:90%;">}}

ロールを作成したら、[このロールを既存のユーザーに追加][3]できます。


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions/
[3]: /ja/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

[Datadog ロール作成 API のドキュメント][1]で、ロールの作成方法の例をご紹介しています。


[1]: /ja/api/v2/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### ロールを更新する

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを編集するには

1. [Datadog Roles ページ][1]に移動します。
2. 変更するロールの編集ボタンを選択します。
3. ロールのアクセス許可セットを変更します。利用可能なアクセス許可の詳細については、[Datadog ロールのアクセス許可][2]ドキュメントを参照してください。
4. 変更を保存します。

{{< img src="account_management/rbac/edit_role.png" alt="ロールの編集" style="width:90%;">}}

ロールが変更されると、そのロールを持つすべてのユーザーのアクセス許可が更新されます。


[1]: https://app.datadoghq.com/access/roles
[2]: /ja/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

[Datadog ロール作成 API のドキュメント][1]で、ロールの更新方法の例をご紹介しています。


[1]: /ja/api/v2/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### ロールを削除する

{{< tabs >}}
{{% tab "Datadog application" %}}

カスタムロールを削除するには

1. [Datadog Roles ページ][1]に移動します。
2. 削除するロールの削除ボタンを選択します。
3. 決定を確認します。

{{< img src="account_management/rbac/delete_role.png" alt="ロールの削除" style="width:90%;">}}

{{< img src="account_management/users/delete_role_confirmation.png" alt="ロールの削除" style="width:90%;">}}

ロールが削除されると、そのロールを持つすべてのユーザーのアクセス許可が更新されます。ロールのないユーザーは Datadog を効果的に使用できませんが、それでも制限されたアクセス権を持つことができます。ユーザーが組織へのアクセスを必要としない場合は、ユーザーがロールを持っているか、無効になっていることを必ず確認する必要があります。


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

[Datadog ロール作成 API のドキュメント][1]で、ロールの削除方法の例をご紹介しています。


[1]: /ja/api/v2/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

## ダッシュボードおよびモニターへのアクセスを制限

RBAC ロールをセットアップしたら、ユーザーロール別にダッシュボード、モニター、Synthetic テストへのアクセスを制限できます。詳しくは、[ダッシュボードのアクセス許可ドキュメント][8]、[モニターのアクセス許可ドキュメント][9]、[Synthetics のアクセス許可ドキュメント][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/saml/
[2]: /ja/dashboards/
[3]: /ja/monitors/
[4]: /ja/events/
[5]: /ja/notebooks/
[6]: /ja/api/v2/roles/
[7]: /ja/account_management/rbac/permissions/
[8]: /ja/dashboards/#restrict-access
[9]: /ja/getting_started/monitors/#restrict-access
[10]: /ja/synthetics/browser_tests/#permissions