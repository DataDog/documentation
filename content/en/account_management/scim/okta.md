---
title: Configure SCIM with Okta
description: Synchronize users and teams from Okta to Datadog using SCIM for automated user provisioning, team management, and access control.
algolia:
  tags: ["scim", "identity provider", "IdP", "Okta"]
further_reading:
    - link: '/account_management/scim/'
      tag: 'Documentation'
      text: 'User Provisioning with SCIM'
    - link: 'account_management/saml/mapping/#map-saml-attributes-to-datadog-roles'
      tag: 'Documentation'
      text: 'Group Attribute Mapping'
---

<div class="alert alert-info">
SCIM is available with the Infrastructure Pro and Infrastructure Enterprise plans.
</div>

See the following instructions to synchronize your Datadog users with Okta using SCIM.

For the capabilities and limitations of this feature, see [SCIM][1].

## Prerequisites

SCIM in Datadog is an advanced feature available with the Infrastructure Pro and Infrastructure Enterprise plans

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][2].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Select the Datadog application in the Okta application gallery

1. In your Okta portal, go to **Applications**
2. Click **Browse App Catalog**
3. Type "Datadog" in the search box
4. Select the Datadog application
5. Click **Add Integration**

**Note:** If you already have Datadog configured with Okta, select your existing Datadog application.

## Configure automatic user provisioning

1. In the application management screen, select **Provisioning** in the left panel
2. Click **Configure API integration**.
3. Select **Enable API integration**.
4. Complete the **Credentials** section as follows:
    - **Base URL**: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **Note:** Use the appropriate subdomain for your site. To find your URL, see [Datadog sites][3].
    - **API Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][4]. To maintain continuous access to your data, use a [service account][5] application key.

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Okta Admin Credentials configuration screen">}}

5. Click **Test API Credentials**, and wait for the message confirming that the credentials are verified.
6. Click **Save**. The settings section appears.
7. Next to **Provisioning to App** , select **Edit** to enable the features:
    - **Create Users**
    - **Update User Attributes**
    - **Deactivate Users**
8. Under **Datadog Attribute Mappings**, find the mapping of Okta attributes to Datadog attributes already pre-configured. You can re-map them if needed, but map the Okta values to the same set of Datadog values.

## Configure automatic team provisioning

With [Managed Teams][6], you control the core provisioning of a Datadog Team — its name, handle, and membership — through the identity provider. The setup process differs depending on whether the team already exists in Datadog.

**Note:** Users must exist in Datadog before you can add them to a team. Therefore, you must assign users to the Datadog app in Okta to ensure that they are created in Datadog through SCIM. Assign the Datadog application to your Okta group to ensure that all team members are created in Datadog automatically.

### Create a new team in Datadog

1. In your Datadog application in Okta, navigate to the **Push Groups** tab.
{{< img src="/account_management/scim/okta/pushed-groups.png" alt="Okta pushed groups configuration interface">}}
1. Click the **Push Groups** button. The pushed groups interface opens.
1. Select the Okta group you want to push to Datadog.
1. In the **Match result & push action** column, ensure **Create group** is selected.
1. Click **Save**.

To verify that the operation completed successfully, navigate to the [Teams list][7] in Datadog. Search for a Datadog Team matching the Okta group you configured. Verify that the team exists in Datadog and is managed externally. It may take a minute or two before the team appears in Datadog.

{{< img src="/account_management/scim/okta/managed-externally.png" alt="Datadog team list showing a team called Identity team that is managed externally.">}}

### Synchronize an existing Datadog Team with an Okta group

You can map an existing Datadog Team to an Okta group. Establishing a link from the Okta group to the Datadog Team causes the Datadog Team to be managed by Okta going forward.

**Note:** In order to synchronize an existing Datadog Team with an Okta group, the two names must match exactly.

1. In your Datadog application in Okta, navigate to the **Push Groups** tab.
1. Click the **Push Groups** button. The pushed groups interface opens.
1. Select the Okta group you want to synchronize with a Datadog Team.
1. In the **Match result & push action** column, ensure **Create group** is selected.
1. Click **Save**.

**Note:** When you select **Create group**, Okta displays a **No match found** message. You can ignore this message and proceed with creating the group to establish synchronization.

### Delete the connection between an Okta group and a Datadog Team

You have two options for disconnecting an Okta group from a Datadog Team, with different impacts on the Datadog Team membership.

#### Keep team members in Datadog

This procedure allows you to manage team membership in Datadog instead of Okta. The team members stay unchanged.

1. In your Datadog application in Okta, navigate to the **Push Groups** tab.
1. Click the **Push Groups** button. The pushed groups interface opens.
1. Select the Okta group you want to unlink from its Datadog Team.
1. In the **Match result & push action** column, select **Unlink Pushed Group**. A dialog box appears.
1. Select **Leave the group in the target app**.
1. Click **Unlink**.
1. Click **Save**.

#### Remove team members from Datadog

This procedure allows you to manage team membership in Datadog instead of Okta and removes the team members from the Datadog Team.

1. In your Datadog application in Okta, navigate to the **Push Groups** tab.
1. Click the **Push Groups** button. The pushed groups interface opens.
1. Select the Okta group you want to unlink from its Datadog Team.
1. In the **Match result & push action** column, select **Unlink Pushed Group**. A dialog box appears.
1. Select **Delete the group in the target app (recommended)**.
1. Click **Unlink**.
1. Click **Save**.

**Note:** Contrary to the name of the option, selecting **Delete the group in the target app** does _not_ delete the team in Datadog. Instead, it removes all members from the team and removes the link between the group in Okta and the Datadog Team.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/scim/
[2]: /account_management/scim/#using-a-service-account-with-scim
[3]: /getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /account_management/org_settings/service_accounts
[6]: /account_management/teams/manage/#manage-teams-through-an-identity-provider
[7]: https://app.datadoghq.com/teams
