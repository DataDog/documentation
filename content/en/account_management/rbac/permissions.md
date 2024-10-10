---
title: Datadog Role Permissions
aliases:
  - /account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
    - link: '/account_management/rbac/'
      tag: 'Documentation'
      text: 'Learn how to create, update and delete a Role'
    - link: '/api/v2/roles/#list-permissions'
      tag: 'Documentation'
      text: 'Manage your permissions with the Permission API'
algolia:
    rank: 80
    category: Documentation
    subcategory: Datadog Role Permissions
---

## Overview

Permissions define the type of access a user has to a given resource. Typically, permissions give a user the right to read, edit, or delete an object. Permissions underlie the access rights of all roles, including the three out-of-the-box roles and custom roles.

### Sensitive permissions

Some Datadog permissions provide access to more privileged functionality that is important to be aware of, such as:

- Access to change organization settings
- Access to read potentially sensitive data
- Access to perform privileged operations

Sensitive permissions are flagged in the Roles and Permissions interfaces to identify that they may need increased scrutiny. As a best practice, administrators configuring roles should pay special attention to these permissions, and confirm which of these permissions are assigned to their roles and users.

### Out-of-the-box roles

By default, existing users are associated with one of the three out-of-the-box roles:

- Datadog Admin
- Datadog Standard
- Datadog Read Only

All users with one of these roles can read all data types, except for [individually read-restricted][1] resources. Admin and Standard users have write permissions on assets. Admin users have additional read and write permissions for sensitive assets relating to user management, org management, billing, and usage. 

### Custom roles

Create a custom role to combine permissions into new roles. A custom role gives you the ability to define a persona, for example, a billing administrator, and then assign the appropriate permissions for that role. After creating a role, assign or remove permissions to this role directly by [updating the role in Datadog][2], or through the [Datadog Permission API][3].

**Note**: When adding a new custom role to a user, make sure to remove the out-of-the-box Datadog role associated with that user to enforce the new role permissions.

## Permissions list

The following table lists the name, description, and default role for all available permissions in Datadog. Each asset type has corresponding read and write permissions. 

Each out-of-the-box role inherits all of the permissions from the less powerful roles. Therefore, the Datadog Standard role has all of the permissions listed in the table with Datadog Read Only as the default role. Additionally, the Datadog Admin role contains all of the permissions from both the Datadog Standard and the Datadog Read Only role.

{{% permissions %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration is a trademark of Datadog, Inc.

[1]: /account_management/rbac/granular_access
[2]: /account_management/users/#edit-a-user-s-roles
[3]: /api/latest/roles/#list-permissions
