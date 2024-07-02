---
title: Datadog Role Permissions
aliases:
  - /account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
    - link: /account_management/rbac/
      tag: Documentation
      text: Learn how to create, update and delete a Role
    - link: "/api/v2/roles/#list-permissions"
      tag: Documentation
      text: Manage your permissions with the Permission API
algolia:
    rank: 80
    category: Documentation
    subcategory: Datadog Role Permissions
---

## 概要

Permissions define the type of access a user has to a given resource. Typically, permissions give a user the right to read, edit, or delete an object. Permissions underlie the access rights of all roles, including the three out-of-the-box roles and custom roles.

### Out-of-the-box roles

デフォルトで、既存ユーザーは 3 つのすぐに使用できるロールのうち 1 つに紐付けられています。

- Datadog 管理者
- Datadog 標準
- Datadog 読み取り専用

All users with one of these roles can read all data types, except for [individually read-restricted][1] resources. Admin and Standard users have write permissions on assets. Admin users have additional read and write permissions for sensitive assets relating to user management, org management, billing, and usage. 

### カスタムロール

Create a custom role to combine permissions into new roles. A custom role gives you the ability to define a persona, for example, a billing administrator, and then assign the appropriate permissions for that role. After creating a role, assign or remove permissions to this role directly by [updating the role in Datadog][2], or through the [Datadog Permission API][3].

**Note**: When adding a new custom role to a user, make sure to remove the out-of-the-box Datadog role associated with that user to enforce the new role permissions.

## Permissions list

The following table lists the name, description, and default role for all available permissions in Datadog. Each asset type has corresponding read and write permissions. 

Each out-of-the-box role inherits all of the permissions from the less powerful roles. Therefore, the Datadog Standard role has all of the permissions listed in the table with Datadog Read Only as the default role. Additionally, the Datadog Admin role contains all of the permissions from both the Datadog Standard and the Datadog Read Only role.

{{% permissions %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration は Datadog, Inc. の商標です

[1]: /account_management/rbac/granular_access
[2]: /account_management/users/#edit-a-user-s-roles
[3]: /api/latest/roles/#list-permissions
