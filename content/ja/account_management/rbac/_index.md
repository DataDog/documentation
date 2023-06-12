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
kind: documentation
title: ロールベースのアクセス制御
---

ロールによりユーザーを分類し、各ユーザーが読み取ることができるデータや変更できるアカウントアセットなど、アカウントのアクセス許可を定義します。Datadog ではデフォルトで 3 つのロールを提供していますが、[カスタムロール](#カスタムロール)を作成すると、ユーザーとアクセス許可のマッピングをより適切に定義できます。

ロールにアクセス許可を付与することで、ロールに関連付けられているユーザーはアクセス許可を受け取ります。複数のロールに関連付けられているユーザーは、それぞれのロールに付与されているすべてのアクセス許可を受け取ります。ユーザーに関連付けられたロールが増えるほど、Datadog アカウント内で持つアクセス権も増えます。

[子組織][1]のユーザーが `org_management` 権限を持っていても、親組織で同じ権限を持っているとは限りません。ユーザーのロールは、親組織と子組織の間で共有されることはありません。

**注**: SAML ID プロバイダーを使用する場合、認証のためにそれを Datadog と統合でき、ID 属性を Datadog のデフォルトロールとカスタムロールにマップできます。詳細については、[SAML を使用したシングルサインオン][2]を参照してください。

## Datadog のデフォルトのロール

Datadog 管理者ロール
: 請求情報へのアクセス、API キーの無効化に加えて、ユーザーの管理や[読み取り専用ダッシュボード][3]の構成が可能です。標準ユーザーを管理者に昇格させることもできます。

Datadog 標準ロール
: [ダッシュボード][3]、[モニター][4]、[イベント][5]、[ノートブック][6]など、Datadog が提供するすべてのモニタリング機能を表示および変更できます。他のユーザーをオーガニゼーションに招待することも可能です。

Datadog 読み取り専用ロール
: Datadog システム内での編集権限を持たないユーザーです。特定の機能を読み取り専用ビューでクライアントに共有したり、ある部門のメンバーから外部ユーザーに[ダッシュボード][3]を共有する必要がある場合に便利です。

## カスタムロール

カスタムロール機能を使用すると、オーガニゼーションで一意の権限セットを持つ新規ロールを作成できます。Datadog サイト、[Datadog Role API][7]、または SAML から直接カスタムロールを管理できます。下記からロールの作成、更新、削除方法をご確認ください。利用可能なアクセス許可の詳細については、[Datadog ロールのアクセス許可][8]を参照してください。Datadog でロールを作成または編集できるのは、ユーザーアクセス管理のアクセス許可を持つユーザーのみです。

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

## 個々のリソースへのアクセスを制限する

RBAC ロールを設定すると、ユーザーロールによって個々のリソースへのアクセスを制限することができます。

以下のリソースでは、きめ細かいアクセス制御が可能です。
- [ダッシュボード][11]
- [モニター][12]
- [ノートブック][6]
- [セキュリティルール][13]
- [サービスレベル目標][14]
- [Synthetic テスト][15]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/multi_organization/
[2]: /ja/account_management/saml/
[3]: /ja/dashboards/
[4]: /ja/monitors/
[5]: /ja/events/
[6]: /ja/notebooks/#limit-edit-access
[7]: /ja/api/v2/roles/
[8]: /ja/account_management/rbac/permissions/
[9]: https://app.datadoghq.com/organization-settings/
[10]: /ja/api/latest/roles/#create-role
[11]: /ja/dashboards/#permissions
[12]: /ja/monitors/notify/#permissions
[13]: /ja/security_platform/detection_rules/#limit-edit-access
[14]: /ja/monitors/service_level_objectives/#permissions
[15]: /ja/synthetics/browser_tests/#permissions