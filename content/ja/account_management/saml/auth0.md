---
title: Auth0 SAML IdP
aliases:
  - /account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
---

## Setup and configuration

Follow the [Configure Auth0 as Identity Provider for Datadog][1] docs to configure Auth0 as a SAML identity provider.

## Additional information

`first_name` and `give_name` are root attributes of an Auth0 user. These can only be set upon creation with Auth0 Management API. See [Normalized User Profiles][2] for reference.

The `user_metadata` section of the user profile is used to specify additional user information, for example:

{{< img src="account_management/saml/auth0_metadata.png" alt="Update this" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://auth0.com/docs/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog
[2]: https://auth0.com/docs/users/normalized/auth0#normalized-user-profile-schema
