---
title: Role Based Access Control
kind: documentation
private: true
beta: true
aliases:
  - /guides/rbac
further_reading:
- link: "account_management/rbac/log_management/"
  tag: "Documentation"
  text: "RBAC for Log Management"
- link: "account_management/rbac/role_api"
  tag: "Documentation"
  text: "Manage Roles and Permissions with the Roles API"
---

<div class="alert alert-warning">
RBAC is only available for Log Management. Ask your sales representative or customer success manager to enable this feature.
</div>

## Roles

Roles categorize users and define what account permissions those users have, such as what data they can read or what account assets they can modify. By default, Datadog offers three roles, and you can create custom roles so you can define a better mapping between your users and their permissions.

By granting permissions to roles, any user who is associated with that role receives that permission. When users are associated with multiple roles, they receive all the permissions granted to each of their roles. The more roles a user is associated with, the more access they have within a Datadog account.

## Out of the Box Roles

The following roles are available out of the box. By default, users are associated with one of these three roles:

| Role                   | Description                                                                                 |
|------------------------|---------------------------------------------------------------------------------------------|
| Datadog Admin          | Has read and write permissions on all data and assets in a Datadog account.                 |
| Datadog Standard Role  | Has read permissions on all data and write permissions on most assets in a Datadog account. |
| Datadog Read Only Role | Has read permissions on all data and write permissions on no assets in a Datadog account.   |

## Custom Roles

Custom roles are imported via SAML integrations from identity providers. Datadog receives the user groups from your IdP and automatically generates roles to match those user groups. In this case, users who sign in via the IdP are automatically associated with those roles and have the permissions that are granted to those roles. 

Alternatively, use [the Roles API][1] to create roles, and associate users with those roles.

For existing roles, you can grant/revoke permissions to/from via [the Roles API][1] to manage the access of users associated with those roles.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/role_api
