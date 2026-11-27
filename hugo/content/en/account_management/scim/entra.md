---
title: Configure SCIM with Microsoft Entra ID
description: Set up automated user provisioning from Microsoft Entra ID to Datadog using SCIM with step-by-step configuration and attribute mapping.
aliases:
  - /account_management/scim/azure/
algolia:
  tags: ["scim", "identity provider", "IdP", "Azure AD", "Entra ID"]
---

<div class="alert alert-info">
SCIM is available with the Infrastructure Pro, Infrastructure Enterprise, and Startup plans.
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

SCIM in Datadog is an advanced feature available with the Infrastructure Pro, Infrastructure Enterprise, and Startup plans.

This documentation assumes your organization manages user identities using an identity provider.

If you don't use Workload Identity Federation, use a [service access token][13] (SAT). A SAT belongs to a service account, so access does not depend on an individual user.

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Add Datadog to the Microsoft Entra ID application gallery

1. Sign in to the [Microsoft Entra admin center][6] as at least a [Cloud Application Administrator][7]
1. Browse to {{< ui >}}Identity{{< /ui >}} -> {{< ui >}}Applications{{< /ui >}} -> {{< ui >}}Enterprise Applications{{< /ui >}}
1. Click {{< ui >}}New Application{{< /ui >}}
1. Type "Datadog" in the search box
1. Select the Datadog application from the gallery
1. Optionally, enter a name in the {{< ui >}}Name{{< /ui >}} text box
1. Click {{< ui >}}Create{{< /ui >}}

**Note:** If you already have Datadog configured with Microsoft Entra ID for SSO, go to {{< ui >}}Enterprise Applications{{< /ui >}} and select your existing Datadog application.

## Configure automatic user provisioning

Microsoft Entra ID can authenticate to Datadog in two ways:

- **Workload Identity Federation (recommended)**: Entra ID gets short-lived tokens from Datadog. There is no secret to store or rotate.
- **Service access token**: Entra ID sends a Datadog service access token (SAT) with each request. Use this method if you can't use Workload Identity Federation.

{{< tabs >}}
{{% tab "Workload Identity Federation (recommended)" %}}

This setup moves back and forth between the Microsoft Entra admin center and Datadog. Keep both open.

To connect a tenant in Datadog, your user needs the `workload_identity_federation_read`, `user_access_read`, `user_access_invite`, and `user_access_manage` permissions.

### Start the configuration in Entra ID

1. In the application management screen, select {{< ui >}}Provisioning{{< /ui >}} in the left panel.
2. Click {{< ui >}}Connect your application{{< /ui >}}. The {{< ui >}}New provisioning configuration{{< /ui >}} page appears.
3. In {{< ui >}}Select authentication method{{< /ui >}}, select {{< ui >}}Workload identity based authentication{{< /ui >}}.

### Get the Datadog URLs

1. In Datadog, go to {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Workload Identity Federation{{< /ui >}} and open the {{< ui >}}SCIM Provisioning{{< /ui >}} tab.
2. Click {{< ui >}}Add New{{< /ui >}}. The {{< ui >}}Connect Entra Tenant{{< /ui >}} dialog opens.
3. Under {{< ui >}}Copy these values into Azure{{< /ui >}}, note the {{< ui >}}SCIM base URL{{< /ui >}} and the {{< ui >}}OAuth token endpoint{{< /ui >}}. Keep the dialog open.

### Register the workload identity in Entra ID

1. In {{< ui >}}Application API URL{{< /ui >}}, paste the {{< ui >}}SCIM base URL{{< /ui >}} from Datadog.
2. Under {{< ui >}}Register the workload identity app{{< /ui >}}, click {{< ui >}}Select workload identity{{< /ui >}}.
3. Register a new app or select an existing one:
    - To register an app, open the {{< ui >}}Register new{{< /ui >}} tab, enter an {{< ui >}}App registration name{{< /ui >}}, and click {{< ui >}}Register{{< /ui >}}.
    - To reuse an app, open the {{< ui >}}Select existing{{< /ui >}} tab and pick it.
4. Entra ID shows four values under {{< ui >}}Configure trust in the target application{{< /ui >}}. Copy them for the next step: {{< ui >}}Token Issuer (iss claim){{< /ui >}}, {{< ui >}}JWKS URI{{< /ui >}}, {{< ui >}}Subject (sub claim){{< /ui >}}, and {{< ui >}}Audience (aud claim){{< /ui >}}.

### Connect the tenant in Datadog

1. In the {{< ui >}}Connect Entra Tenant{{< /ui >}} dialog, under {{< ui >}}Paste the trust values from Azure{{< /ui >}}, fill in all fields:

   | Datadog field | Value from Entra ID |
   |---------------|---------------------|
   | {{< ui >}}Tenant ID{{< /ui >}} | Your Microsoft Entra tenant ID. It is the GUID in the Token Issuer URL. |
   | {{< ui >}}Token Issuer (iss claim){{< /ui >}} | {{< ui >}}Token Issuer (iss claim){{< /ui >}} |
   | {{< ui >}}JWKS URI{{< /ui >}} | {{< ui >}}JWKS URI{{< /ui >}} |
   | {{< ui >}}Subject (sub claim){{< /ui >}} | {{< ui >}}Subject (sub claim){{< /ui >}} |
   | {{< ui >}}Audience (aud claim){{< /ui >}} | {{< ui >}}Audience (aud claim){{< /ui >}} |

2. Click {{< ui >}}Create Integration{{< /ui >}}. The tenant appears under {{< ui >}}Connected tenants{{< /ui >}}.
3. Copy the {{< ui >}}Client ID{{< /ui >}} shown for the tenant.

{{< img src="/account_management/scim/datadog-connect-entra-tenant.png" alt="Connect Entra Tenant dialog in Datadog, with the trust values from Entra ID filled in" style="width:80%;" >}}

{{< img src="/account_management/scim/datadog-entra-tenant-connected.png" alt="SCIM Provisioning tab in Datadog showing the connected tenant and its Client ID" style="width:80%;" >}}

### Finish the configuration in Entra ID

1. Under {{< ui >}}Enter values from your application{{< /ui >}}, fill in:
    - {{< ui >}}OAuth token endpoint{{< /ui >}}: the {{< ui >}}OAuth token endpoint{{< /ui >}} from Datadog.
    - {{< ui >}}Client identifier{{< /ui >}}: the {{< ui >}}Client ID{{< /ui >}} from Datadog.
2. Click {{< ui >}}Test connection{{< /ui >}}, and wait for the message confirming that the connection test was successful.
3. Click {{< ui >}}Create{{< /ui >}}. Entra ID opens the provisioning overview for the app.

{{< img src="/account_management/scim/entra-wif-provisioning-config.png" alt="New provisioning configuration page in Entra ID with workload identity values filled in and a successful connection test" style="width:80%;" >}}

Provisioning starts paused. After you set your mappings (see the following section) and assign users and groups to the app, click {{< ui >}}Start provisioning{{< /ui >}}. To test with one user first, use {{< ui >}}Provision on demand{{< /ui >}}.

For more information, see [Workload Identity Federation][1].

[1]: /account_management/workload_identity_federation/

{{% /tab %}}
{{% tab "Service access token" %}}

1. In the application management screen, select {{< ui >}}Provisioning{{< /ui >}} in the left panel
2. In the {{< ui >}}Provisioning Mode{{< /ui >}} menu, select {{< ui >}}Automatic{{< /ui >}}
3. Open {{< ui >}}Admin Credentials{{< /ui >}}
4. Complete the {{< ui >}}Admin Credentials{{< /ui >}} section as follows:
    - {{< ui >}}Tenant URL{{< /ui >}}: `{{< region-param key="dd_api" >}}/api/v2/scim?aadOptscim062020`
        - **Note:** Use the API host for your site, not the app host. For the SCIM endpoints for each site, see the [SCIM API reference][1].
        - **Note:** The `?aadOptscim062020` part of the Tenant URL is specifically for Entra ID. This is a flag that tells Entra to correct its SCIM behavior as outlined in this [Microsoft Entra documentation][2]. If you are not using Entra ID, you should not include this suffix on the URL.
    - {{< ui >}}Secret Token{{< /ui >}}: Use a Datadog [service access token][3]. Create it on a [service account][4] and grant at least the `user_access_invite` and `user_access_manage` scopes.

{{< img src="/account_management/scim/admin-credentials-entra-flag.png" alt="Azure AD Admin Credentials configuration screen">}}

5. Click {{< ui >}}Test Connection{{< /ui >}}, and wait for the message confirming that the credentials are authorized to enable provisioning.
6. Click {{< ui >}}Save{{< /ui >}}. The mapping section appears. See the following section to configure mapping.

[1]: /api/latest/scim/
[2]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#flags-to-alter-the-scim-behavior
[3]: /account_management/service-access-tokens/
[4]: /account_management/org_settings/service_accounts

{{% /tab %}}
{{< /tabs >}}

## Attribute mapping

### User attributes

1. Expand the {{< ui >}}Mappings{{< /ui >}} section
2. Click {{< ui >}}Provision Azure Active Directory Users{{< /ui >}}. The Attribute Mapping page appears.
3. Set {{< ui >}}Enabled{{< /ui >}} to {{< ui >}}Yes{{< /ui >}}
4. Click the {{< ui >}}Save{{< /ui >}} icon
5. Under {{< ui >}}Target Object actions{{< /ui >}}, ensure Create, Update, and Delete actions are selected
6. Review the user attributes that are synchronized from Microsoft Entra ID to Datadog in the attribute mapping section. Set the following mappings:
| Microsoft Entra ID Attribute     | Datadog Attribute              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |
| `AppRoleAssignmentsComplex([appRoleAssignments])` | `roles`               |

   {{< img src="/account_management/scim/ad-users-2.png" alt="Attribute mapping configuration, Provision Azure Active Directory Users">}}

7. After you set your mappings, click {{< ui >}}Save{{< /ui >}}.

To provision a user's Datadog role (built-in or custom), first define an app role in the Microsoft Entra app registration. Create one app role for each Datadog role you want to provision. Assign the relevant users or groups to those app roles. Set each app role's **Display name** to the Datadog role name and its **Value** to the corresponding Datadog role UUID. Do not use the Datadog role name or SAML role claim value as the app role's **Value**. You can find a role's UUID in the role's URL on your [Organization Settings][11] page. For configuration instructions, see [Microsoft's app-role documentation][12]. After defining app roles, map the `roles` attribute as shown above. Use the `AppRoleAssignmentsComplex([appRoleAssignments])` expression for the Microsoft Entra ID attribute. If `roles` is not available in the target attribute dropdown, add it as a **multi-valued** string attribute. For configuration instructions, see [Microsoft's attribute-mapping documentation][10].

Roles follow the SCIM multi-valued attribute convention defined in [RFC 7643][9]. If a SCIM request sends multiple roles, Datadog provisions only the roles that match a role in your organization. If none match and the organization has a default role, the user falls back to that role. If the organization has no default role, Datadog skips the role update and preserves the user's existing roles. Unmatched roles are logged to Audit Trail. For more details, see [SCIM][1].

### Group attributes

Group mapping is not supported.

[1]: /account_management/scim/
[6]: https://entra.microsoft.com/
[7]: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator
[9]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[10]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/customize-application-attributes#provisioning-a-role-to-a-scim-app
[11]: https://app.datadoghq.com/organization-settings/roles
[12]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps
[13]: /account_management/service-access-tokens/
