---
title: Configure SCIM with Microsoft Entra ID
description: Set up automated user provisioning from Microsoft Entra ID to Datadog using SCIM with step-by-step configuration and attribute mapping.
aliases:
  - /account_management/scim/azure/
algolia:
  tags: ["scim", "identity provider", "IdP", "Azure AD", "Entra ID"]
---

<div class="alert alert-info">
SCIM is available with the Infrastructure Pro and Infrastructure Enterprise plans.
</div>

<div class="alert alert-danger">
  Due to a Microsoft freeze on third-party app updates in Entra following a security incident in late 2024, Team provisioning via SCIM is unavailable. To create Teams in Datadog, use one of the supported alternatives: 
  <a href="https://docs.datadoghq.com/account_management/saml/mapping/" target="_blank">SAML mapping</a>, 
  <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team" target="_blank">Terraform</a>, 
  <a href="https://docs.datadoghq.com/api/latest/teams/" target="_blank">the public API</a>, or 
  <a href="https://docs.datadoghq.com/api/latest/scim/" target="_blank">direct calls to the SCIM server</a>. SCIM can still be used to provision users.
</div>

See the following instructions to synchronize your Datadog users with Microsoft Entra ID using SCIM.

For capabilities and limitations of this feature, see [SCIM][1].

## Prerequisites

SCIM in Datadog is an advanced feature available with the Infrastructure Pro and Infrastructure Enterprise plans.

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][2].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Add Datadog to the Microsoft Entra ID application gallery

1. Sign in to the [Microsoft Entra admin center][6] as at least a [Cloud Application Administrator][7]
1. Browse to **Identity** -> **Applications** -> **Enterprise Applications**
1. Click **New Application**
1. Type "Datadog" in the search box
1. Select the Datadog application from the gallery
1. Optionally, enter a name in the **Name** text box
1. Click **Create**

**Note:** If you already have Datadog configured with Microsoft Entra ID for SSO, go to **Enterprise Applications** and select your existing Datadog application.

## Configure automatic user provisioning

1. In the application management screen, select **Provisioning** in the left panel
2. In the **Provisioning Mode** menu, select **Automatic**
3. Open **Admin Credentials**
4. Complete the **Admin Credentials** section as follows:
    - **Tenant URL**: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim?aadOptscim062020`
        - **Note:** Use the appropriate subdomain for your site. To find your URL, see [Datadog sites][3].
        - **Note:** The `?aadOptscim062020` part of the Tenant URL is specifically for Entra ID. This is a flag that tells Entra to correct its SCIM behavior as outlined in this [Microsoft Entra documentation][8]. If you are not using Entra ID, you should not include this suffix on the URL.
    - **Secret Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][4]. To maintain continuous access to your data, use a [service account][5] application key.

{{< img src="/account_management/scim/admin-credentials-entra-flag.png" alt="Azure AD Admin Credentials configuration screen">}}

5. Click **Test Connection**, and wait for the message confirming that the credentials are authorized to enable provisioning.
6. Click **Save**. The mapping section appears. See the following section to configure mapping.

## Attribute mapping

### User attributes

1. Expand the **Mappings** section
2. Click **Provision Azure Active Directory Users**. The Attribute Mapping page appears.
3. Set **Enabled** to **Yes**
4. Click the **Save** icon
5. Under **Target Object actions**, ensure Create, Update, and Delete actions are selected
6. Review the user attributes that are synchronized from Microsoft Entra ID to Datadog in the attribute mapping section. Set the following mappings:
| Microsoft Entra ID Attribute     | Datadog Attribute              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users-2.png" alt="Attribute mapping configuration, Provision Azure Active Directory Users">}}

7. After you set your mappings, click **Save**.

### Group attributes

Group mapping is not supported.

[1]: /account_management/scim/
[2]: /account_management/scim/#using-a-service-account-with-scim
[3]: /getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /account_management/org_settings/service_accounts
[6]: https://entra.microsoft.com/
[7]: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator
[8]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#flags-to-alter-the-scim-behavior
