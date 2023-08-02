---
title: SAML Group Mapping
kind: documentation
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Single sign on with SAML"
---

## Overview

With Datadog, you can map attributes in your Identity Provider (IdP)'s response to Datadog entities.

You can map attributes to the following principals:
- [Datadog roles][1]
- [Datadog Teams (beta)][2]

 Users with the Access Management permission can assign or remove Datadog principals based on a user's SAML-assigned attributes.

## Prerequisites

It's important to understand what is sent in an assertion before turning on mappings, as mappings require correct attributes. Every IdP has specific mappings. For example, Azure works with object IDs, and Okta requires you to set attributes in [Okta settings][3]. Datadog recommends cross-referencing with [built-in browser tooling][4] such as Chrome Dev Tools or browser extensions and [validating your SAML assertions][5] **before** creating mappings.

## Map SAML attributes to Datadog roles

1. [Cross-reference][4] and [validate][5] your SAML assertion to understand your IdP's attributes.

2. Go to **Organization Settings** and click the **SAML Group Mappings** tab.

3. If it is visible, ensure the **Role Mappings** tab is selected.

4. Click **New Mapping**. A dialog box appears.

5. Specify the SAML identity provider `key-value` pair that you want to associate with an existing Datadog role (either default or custom). **Note**: These entries are case-sensitive.

   For example, if you want all users whose `member_of` attribute has a value of `Development` to be assigned to a custom Datadog role called `Devs`:

    {{< img src="account_management/saml/create_mapping.png" alt="Creating a SAML mapping to Datadog Role" >}}

   **Note**: Every identity provider is different. Some allow you to set your attribute key or label. Others provide one by default. Datadog recommends you use an assertion inspector on your login to view the details of your particular assertion to understand how your Identity Provider is sending your group membership.

6. If you have not already done so, enable mappings by clicking **Enable Mappings**.

When a user logs in who has the specified identity provider attribute, they are automatically assigned the Datadog role. Likewise, if someone has that identity provider attribute removed, they lose access to the role (unless another mapping adds it).

<div class="alert alert-warning">
  <strong>Important:</strong> If a user does <i>not</i> match any mapping, they lose any roles they had previously and are prevented from logging into the org with SAML. Double-check your mapping definitions and inspect your own assertions before enabling Mappings to prevent any scenarios where your users are unable to login.
</div>

Make changes to a mapping by clicking the pencil (**Edit**) icon, or remove a mapping by clicking the garbage (**Delete**) icon. These actions affect only the mapping, not the identity provider attributes or the Datadog roles.

Alternatively, you can create and change mappings of SAML attributes to Datadog roles with the `authn_mappings` endpoint. For more information, see [Federated Authentication to Role Mapping API][6].

## Map SAML attributes to Teams

{{< callout url="/help/" >}}
  Mapping SAML attributes to Teams is in beta. To request access, contact Support.
{{< /callout >}}

1. [Cross-reference][4] and [validate][5] your SAML assertion to understand your IdP's attributes.

2. Go to **Organization Settings** and click the **SAML Group Mappings** tab.

3. Ensure the **Team Mappings** tab is selected.

4. Click **New Mapping**. A dialog box appears.

5. Specify the SAML identity provider `key-value` pair that you want to associate with a Datadog Team. **Note**: These entries are case-sensitive.

    **Note**: Every identity provider is different. Some allow you to set your attribute key or label. Others provide one by default. Datadog recommends you use an assertion inspector on your login to view the details of your particular assertion to understand how your Identity Provider is sending your group membership.

6. Select a **Team** from the dropdown menu.

7. To add an additional mapping, click **Add Row**.

8. When you are done adding mappings, click **Create**.

7. If you have not already done so, enable mappings by clicking **Enable Mappings**.

Make changes to a mapping by clicking the pencil (**Edit**) icon, or remove a mapping by clicking the garbage (**Delete**) icon. These actions affect only the mapping, not the identity provider attributes or the Datadog Team.

[1]: /account_management/rbac/
[2]: /account_management/teams/
[3]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[4]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[5]: https://www.samltool.com/validate_response.php
[6]: /account_management/authn_mapping/
