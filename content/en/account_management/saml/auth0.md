---
title: Configuring Auth0 as a SAML IdP
kind: documentation
aliases:
  - /account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
---

## Setup

SAML is set up [Using Auth0 with a SAML2 Web App][1].

1. On the Auth0 **Applications** page, modify an existing **Client** or create a new one.
2. Under the **Addons** tab of the client, enable the **SAML2 Web App**.
3. Enter the configuration below on the **Settings** tab of the SAML2 Web App.

### Configuration

This is the official Auth0 [Datadog SAML Configuration][2].

**Application Callback URL**:

```text
https://app.datadoghq.com/account/saml/assertion
```

**Settings**:

```json
{
  "audience": "https://app.datadoghq.com/account/saml/metadata.xml",
  "mappings": {},
  "createUpnClaim": false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities": false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

## Additional information

`first_name` and `give_name` are root attributes of an Auth0 user. These can only be set upon creation with Auth0 Management API. See [Normalized User Profiles][3] for reference.

The `user_metadata` section of the user profile is used to specify additional user information, for example:

{{< img src="account_management/saml/auth0_metadata.png" alt="Update this" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://auth0.com/docs/protocols/saml/saml2webapp-tutorial
[2]: https://auth0.com/docs/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog
[3]: https://auth0.com/docs/users/normalized/auth0#normalized-user-profile-schema
