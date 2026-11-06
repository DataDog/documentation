---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Azure AD
  - Entra ID
aliases:
- /ja/account_management/scim/azure/
description: SCIM を使用した Microsoft Entra ID から Datadog への自動ユーザープロビジョニングを、ステップバイステップの構成と属性マッピングで設定します。
title: Microsoft Entra ID で SCIM を構成する
---
<div class="alert alert-info">
SCIM は、Infrastructure Pro、Infrastructure Enterprise、および Startup プランで利用可能です。
</div>

<div class="alert alert-danger">
  2024 年後半に発生したセキュリティインシデントを受け、Microsoft が Entra におけるサードパーティ製アプリの更新を停止しているため、SCIM を使用した Teams のプロビジョニングは現在利用できません。Datadog で Teams を作成するには、サポートされている以下のいずれかの代替手段を使用してください:
  <a href="https://docs.datadoghq.com/account_management/saml/mapping/" target="_blank">SAML マッピング</a>、
  <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team" target="_blank">Terraform</a>、
  <a href="https://docs.datadoghq.com/api/latest/teams/" target="_blank">パブリック API</a>、または 
  <a href="https://docs.datadoghq.com/api/latest/scim/" target="_blank">SCIM サーバーへの直接呼び出し</a>。SCIM は引き続きユーザーのプロビジョニングに使用できます。
</div>

SCIM を使用して Datadog ユーザーを Microsoft Entra ID と同期する手順については、以下を参照してください。

この機能の特徴と制限については、「[SCIM][1]」を参照してください。

## 前提条件 {#prerequisites}

Datadog の SCIM は、Infrastructure Pro、Infrastructure Enterprise、および Startup プランで利用可能な高度な機能です。

このドキュメントは、組織がアイデンティティプロバイダーを使用してユーザーアイデンティティを管理していることを前提としています。

Datadog では、SCIM の構成時にサービスアカウントのアプリケーションキーを使用してアクセスの中断を回避することを強く推奨します。詳細については、「[SCIM でサービスアカウントを使用する][2]」を参照してください。

SAML と SCIM を併用する場合、Datadog ではアクセスの不一致を避けるために SAML のジャストインタイム (JIT) プロビジョニングを無効にすることを強く推奨します。SCIM のみでユーザープロビジョニングを管理します。

## Microsoft Entra ID アプリケーションギャラリーに Datadog を追加する{#add-datadog-to-the-microsoft-entra-id-application-gallery}

1. [Microsoft Entra 管理センター][6] に、[クラウドアプリケーション管理者][7] 以上の権限でサインインします。
1. {{< ui >}}Identity{{< /ui >}} -> {{< ui >}}Applications{{< /ui >}} -> {{< ui >}}Enterprise Applications{{< /ui >}} に移動します。
1. [{{< ui >}}New Application{{< /ui >}}] をクリックします。
1. 検索ボックスに「Datadog」と入力します。
1. ギャラリーから Datadog アプリケーションを選択します。
1. 必要に応じて、{{< ui >}}Name{{< /ui >}} テキストボックスに名前を入力します。
1. [{{< ui >}}Create{{< /ui >}}] をクリックします。

**注:** すでに Microsoft Entra ID を使用して Datadog に SSO を構成している場合は、{{< ui >}}Enterprise Applications{{< /ui >}} に移動し、既存の Datadog アプリケーションを選択してください。

## 自動ユーザープロビジョニングを構成する {#configure-automatic-user-provisioning}

1. アプリケーション管理画面で、左のパネルから [{{< ui >}}Provisioning{{< /ui >}}] を選択します。
2. [{{< ui >}}Provisioning Mode{{< /ui >}}] メニューで、[{{< ui >}}Automatic{{< /ui >}}] を選択します。
3. [{{< ui >}}Admin Credentials{{< /ui >}}] を開きます。
4. [{{< ui >}}Admin Credentials{{< /ui >}}] セクションを次のように完了します。
    - {{< ui >}}Tenant URL{{< /ui >}}: `{{< region-param key="dd_api" >}}/api/v2/scim?aadOptscim062020`
        - **Note:** Use the API host for your site, not the app host. For the SCIM endpoints for each site, see the [SCIM API reference][3].
        - **Note:** The `Tenant URL の ?aadOptscim062020` の部分は、Entra ID 専用のものです。これは、この「[Microsoft Entra ドキュメント][8]」に記載されているように、Entra に SCIM の動作を適切に修正するように指示するフラグです。Entra ID を使用していない場合は、このサフィックスを URL に含めないでください。
    - {{< ui >}}Secret Token{{< /ui >}}: 有効な Datadog アプリケーションキーを使用します。アプリケーションキーは [組織の設定ページ][4] で作成できます。データへの継続的なアクセスを維持するには、[サービスアカウント][5] のアプリケーションキーを使用します。

{{< img src="/account_management/scim/admin-credentials-entra-flag.png" alt="Azure AD 管理者資格情報の構成画面">}}

5. {{< ui >}}Test Connection{{< /ui >}} をクリックして、資格情報が認可され、プロビジョニングが有効になることを確認するメッセージを待ってください。
6. [{{< ui >}}Save{{< /ui >}}] をクリックします。マッピングセクションが表示されます。マッピングの構成については、次のセクションを参照してください。

## 属性マッピング {#attribute-mapping}

### ユーザー属性 {#user-attributes}

1. {{< ui >}}Mappings{{< /ui >}} セクションを展開します。
2. [{{< ui >}}Provision Azure Active Directory Users{{< /ui >}}] をクリックします。属性マッピングページが表示されます。
3. [{{< ui >}}Enabled{{< /ui >}}] を [{{< ui >}}Yes{{< /ui >}}] に設定します。
4. {{< ui >}}Save{{< /ui >}} アイコンをクリックします。
5. [{{< ui >}}Target Object actions{{< /ui >}}] で、[Create]、[Update]、[Delete] のアクションが選択されていることを確認します。
6. 属性マッピングセクションで、Microsoft Entra ID から Datadog に同期されるユーザー属性を確認します。以下のマッピングを設定します。
| Microsoft Entra ID 属性     | Datadog 属性              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |
| `AppRoleAssignmentsComplex([appRoleAssignments])` | `roles`               |

   {{< img src="/account_management/scim/ad-users-2.png" alt="属性マッピング設定、Azure Active Directory ユーザーのプロビジョニング">}}

7. マッピングを設定したら、[{{< ui >}}Save{{< /ui >}}] をクリックします。

ユーザーの Datadog ロール (組み込みまたはカスタム) をプロビジョニングするには、まず Microsoft Entra アプリ登録でアプリロールを定義します。プロビジョニングする Datadog ロールごとに、アプリロールを 1 つ作成します。該当するユーザーまたはグループをそれらのアプリロールに割り当てます。各アプリロールの [**Display name**] には Datadog ロール名を、**Value** には対応する Datadog ロール UUID を設定します。アプリロールの [**Value**] には、Datadog ロール名や SAML ロールクレーム値を使用しないでください。ロール UUID は、[Organization Settings][11] ページのロールの URL で確認できます。設定手順については、「[Microsoft のアプリロールに関するドキュメント][12]」を参照してください。アプリロールを定義した後、上記のように `roles` 属性をマッピングします。Microsoft Entra ID 属性には `AppRoleAssignmentsComplex([appRoleAssignments])` 式を使用します。ターゲット属性のドロップダウンに `roles` がない場合は、**複数値**文字列属性として追加してください。設定手順については、「[Microsoft の属性マッピングに関するドキュメント][10]」を参照してください。

ロールは、[RFC 7643][9] で定義されている SCIM 複数値属性の規則に従います。SCIM リクエストが複数のロールを送信する場合、Datadog は組織内のロールと一致するロールのみをプロビジョニングします。一致するロールがなく、組織にデフォルトロールが設定されている場合、ユーザーはそのロールにフォールバックします。組織にデフォルトロールがない場合、Datadog はロールの更新をスキップし、ユーザーの既存のロールを保持します。一致しなかったロールは、Audit Trail に記録されます。詳細については、[SCIM][1] を参照してください。

### グループ属性 {#group-attributes}

グループマッピングはサポートされていません。

[1]: /ja/account_management/scim/
[2]: /ja/account_management/scim/#using-a-service-account-with-scim
[3]: /ja/api/latest/scim/
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /ja/account_management/org_settings/service_accounts
[6]: https://entra.microsoft.com/
[7]: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator
[8]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#flags-to-alter-the-scim-behavior
[9]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[10]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/customize-application-attributes#provisioning-a-role-to-a-scim-app
[11]: https://app.datadoghq.com/organization-settings/roles
[12]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps