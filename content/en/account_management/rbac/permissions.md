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
    rank: 60
    tags: ["rbac_permissions"]
    category: Documentation
    subcategory: Datadog Role Permissions
---

After creating a role, assign or remove permissions to this role directly by [updating the role in Datadog][1], or through the [Datadog Permission API][2]. Find below a list of available permissions.

## Overview

### General permissions

General permissions provide the base level of access for your role. [Advanced Permissions](#advanced-permissions) are explicitly defined permissions that augment the base permissions.

{{< permissions group="General" >}}

**Note**: There is no `read-only` permission as it is defined by the lack of the `standard` permission for a role.

### Advanced permissions

By default, existing users are associated with one of the three out-of-the-box roles:

- Datadog Admin
- Datadog Standard
- Datadog Read-Only.

All users can read all data types. Admin and Standard users have write permissions on assets.

**Note**: When adding a new custom role to a user, make sure to remove the out-of-the-box Datadog role associated with that user in order to enforce the new role permissions.

In addition to the general permissions, you can define more granular permissions for specific assets or data types. Permissions can be either global or scoped to a subset of elements. Find below the details of these options and the impact they have on each available permission.

{{% permissions %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration is a trademark of Datadog, Inc.

[1]: /account_management/users/#edit-a-user-s-roles
[2]: /api/latest/roles/#list-permissions
