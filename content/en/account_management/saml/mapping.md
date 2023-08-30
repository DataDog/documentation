---
title: SAML Group Mapping
kind: documentation
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Single sign on with SAML"
---

## Mapping SAML attributes to Datadog roles

With Datadog, you can map attributes in your Identity Provider (IdP)'s response to Datadog roles. Users with the Access Management permission can assign or remove Datadog roles based on a user's SAML-assigned attributes.

It's important to understand what is sent in an assertion before turning on mappings, as mappings require correct attributes. Every IdP has specific mappings. For example, Azure works with object IDs, and Okta requires you to set attributes in [Okta settings][1]. Datadog recommends cross-referencing with [built-in browser tooling][2] such as Chrome Dev Tools or browser extensions and [validating your SAML assertions][3] **before** creating mappings.

1. [Cross-reference][2] and [validate][3] your SAML assertion to understand your IdP's attributes.

2. Go to **Organization Settings** and click the **SAML Group Mappings** tab.

3. Click **New Mapping**.

4. Specify the SAML identity provider `key-value` pair that you want to associate with an existing Datadog role (either default or custom). **Note**: These entries are case-sensitive.

   For example, if you want all users whose `member_of` attribute has a value of `Development` to be assigned to a custom Datadog role called `Devs`:

    {{< img src="account_management/saml/create_mapping.png" alt="Creating a SAML mapping to Datadog Role" >}}

   **Note**: Every identity provider is different. Some allow you to set your attribute key or label. Others provide one by default. Datadog recommends you use an assertion inspector on your login to view the details of your particular assertion to understand how your Identity Provider is sending your group membership.

5. If you have not already done so, enable mappings by clicking **Enable Mappings**.

When a user logs in who has the specified identity provider attribute, they are automatically assigned the Datadog role. Likewise, if someone has that identity provider attribute removed, they lose access to the role (unless another mapping adds it).

<div class="alert alert-warning">
  <strong>Important:</strong> If a user does <i>not</i> match any mapping, they lose any roles they had previously and are prevented from logging into the org with SAML. Double-check your mapping definitions and inspect your own assertions before enabling Mappings to prevent any scenarios where your users are unable to login.
</div>

You can make changes to a mapping by clicking the **pencil** icon or remove it by clicking the **garbage** icon. These actions affect only the mapping, not the identity provider attributes or the Datadog roles.

Alternatively, you can create and change mappings of SAML attributes to Datadog roles with the `authn_mappings` endpoint. For more information, see [Federated Authentication to Role Mapping API][4].

[1]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[2]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[3]: https://www.samltool.com/validate_response.php
[4]: /account_management/authn_mapping/
