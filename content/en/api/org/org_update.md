---
title: Update organization
type: apicontent
order: 28.3
external_redirect: /api/#update-organization
---

## Update organization

**ARGUMENTS**:

* **`name`** [*optional*]:
    The organization name.
* **`settings`** [*optional*]:
    A JSON array of settings. Settings include:
    * **`saml`** - Set the boolean property `enabled` to enable or disable single sign on with SAML. See the [SAML documentation][1] for more information about all SAML settings.
    * **`saml_idp_initiated_login`** - has one property `enabled` (boolean).v
    * **`saml_strict_mode`** - has one property `enabled` (boolean).
    * **`saml_autocreate_users_domains`** - has two properties: `enabled` (boolean) and `domains` which is a list of domains without the @ symbol.

[1]: /account_management/saml
