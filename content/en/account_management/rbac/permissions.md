---
title: Datadog Role Permissions
kind: documentation
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

After creating a role, assign or remove permissions to this role directly by [updating the role in Datadog][1], or through the [Datadog Permission API][2]. Find below a list of available permissions.

## Overview

By default, existing users are associated with one of the three out-of-the-box roles:

- Datadog Admin
- Datadog Standard
- Datadog Read-Only

All users with one of these roles can read all data types. Admin and Standard users have write permissions on assets. Admin users have additional read and write permissions for sensitive assets relating to user management, org management, billing, and usage.

**Note**: When adding a new custom role to a user, make sure to remove the out-of-the-box Datadog role associated with that user in order to enforce the new role permissions.

Each asset type has corresponding read and write permissions. In the tables below, find the details of these permissions.

{{% permissions %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration is a trademark of Datadog, Inc.

[1]: /account_management/users/#edit-a-user-s-roles
[2]: /api/latest/roles/#list-permissions
