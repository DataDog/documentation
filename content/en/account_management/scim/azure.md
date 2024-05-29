---
title: Configure SCIM with Azure Active Directory
kind: documentation
algolia:
  tags: ["scim", "identity provider", "IdP", "Azure AD"]
---

See the following instructions to synchronize your Datadog users with Azure Active Directory using SCIM.

For capabilities and limitations of this feature, see [SCIM][1].

## Prerequisites

SCIM in Datadog is an advanced feature included in the Enterprise plan.

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][2].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Add Datadog to the Azure AD application gallery

1. In your Azure portal, go to **Azure Active Directory** -> **Enterprise Applications**
2. Click **New Application** -> **Create your own application**
3. Type "Datadog" in the search box
4. Select the Datadog application from the gallery
5. Enter a name
6. Click **Create**

**Note:** If you already have Datadog configured with Azure AD for SSO, go to **Enterprise Applications** and select your existing Datadog application.

## Configure automatic user provisioning

1. In the application management screen, select **Provisioning** in the left panel
2. In the **Provisioning Mode** menu, select **Automatic**
3. Open **Admin Credentials**
4. Complete the **Admin Credentials** section as follows:
    - **Tenant URL**: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **Note:** Use the appropriate subdomain for your site. To find your URL, see [Datadog sites][3].
    - **Secret Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][4]. To maintain continuous access to your data, use a [service account][5] application key.

{{< img src="/account_management/scim/admin-credentials.png" alt="Azure AD Admin Credentials configuration screen">}}

5. Click **Test Connection**, and wait for the message confirming that the credentials are authorized to enable provisioning.
6. Click **Save**. The mapping section appears. See the following section to configure mapping.

## Attribute mapping

### User attributes

1. Expand the **Mappings** section
2. Click **Provision Azure Active Directory Users**
3. Set **Enabled** to **Yes**
4. Click the **Save** icon
5. Under **Target Object actions**, ensure Create, Update, and Delete actions are selected
6. Review the user attributes that are synchronized from Azure AD to Datadog in the attribute mapping section. Set the following mappings:
| Azure Active Directory Attribute | Datadog Attribute              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users.png" alt="Attribute mapping configuration, Provision Azure Active Directory Users">}}

7. After you set your mappings, click **Save**.

### Group attributes

Group mapping is not supported.

[1]: /account_management/scim/
[2]: /account_management/scim/#using-a-service-account-with-scim
[3]: /getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /account_management/org_settings/service_accounts
