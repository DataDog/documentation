---
title: Configure SCIM with Azure Active Directory
algolia:
  tags: [scim, identity provider, IdP, Azure AD]
---

See the following instructions to synchronize your Datadog users with Azure Active Directory using SCIM.

For capabilities and limitations of this feature, see [SCIM][1].

## 前提条件

Datadog の SCIM は、Enterprise プランに含まれる高度な機能です。

このドキュメントは、組織がアイデンティティプロバイダーを使用してユーザーアイデンティティを管理していることを前提としています。

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][2].

SAML と SCIM を併用する場合、Datadog は、アクセスの不一致を避けるために、SAML のジャストインタイム (JIT) プロビジョニングを無効にすることを強く推奨します。SCIM だけでユーザープロビジョニングを管理します。

## Datadog を Azure AD アプリケーションギャラリーに追加します

1. Azure ポータルで、**Azure Active Directory** -> **Enterprise Applications** に移動します
2. **New Application** -> **Create your own application** をクリックします
3. 検索ボックスに「Datadog」と入力します
4. ギャラリーから Datadog アプリケーションを選択します
5. 名前を入力します
6. **Create** をクリックします

**注:** すでに Azure AD を使用して Datadog に SSO を構成している場合は、**Enterprise Applications** に移動し、既存の Datadog アプリケーションを選択してください。

## 自動ユーザープロビジョニングの構成

1. アプリケーション管理画面で、左のパネルから **Provisioning** を選択します
2. **Provisioning Mode** メニューで、**Automatic** を選択します
3. **Admin Credentials** を開きます
4. **Admin Credentials** セクションを以下のように入力します。
    - **Tenant URL**: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **Note:** Use the appropriate subdomain for your site. To find your URL, see [Datadog sites][3].
    - **Secret Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][4]. To maintain continuous access to your data, use a [service account][5] application key.

{{< img src="/account_management/scim/admin-credentials.png" alt="Azure AD 管理者資格情報の構成画面">}}

5. **Test Connection** をクリックし、資格情報が認可されてプロビジョニングが有効になることを確認するメッセージを待ちます。
6. **Save** をクリックします。マッピングセクションが表示されます。マッピングを構成するには、次のセクションを参照してください。

## 属性のマッピング

### ユーザー属性

1. **Mappings** セクションを展開します
2. **Provision Azure Active Directory Users** をクリックします
3. **Enabled** を **Yes** に設定します
4. **Save** アイコンをクリックします
5. **Target Object actions** で、Create、Update、Delete の各アクションが選択されていることを確認します
6. 属性マッピングセクションで、Azure AD から Datadog に同期されるユーザー属性を確認します。以下のマッピングを設定します。
| Azure Active Directory 属性 | Datadog 属性              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users.png" alt="属性マッピング構成、Azure Active Directory ユーザーのプロビジョニング">}}

7. マッピングを設定したら、**Save** をクリックします。

### グループ属性

グループマッピングはサポートされていません。

[1]: /account_management/scim/
[2]: /account_management/scim/#using-a-service-account-with-scim
[3]: /getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /account_management/org_settings/service_accounts
