---
title: Roles
---
The Roles API is used to create and manage Datadog roles, what
[global permissions](https://docs.datadoghq.com/account_management/rbac/)
they grant, and which users belong to them.

Permissions related to specific account assets can be granted to roles
in the Datadog application without using this API. For example, granting
read access on a specific log index to a role can be done in Datadog from the
[Pipelines page](https://app.datadoghq.com/logs/pipelines).

## List permissions

Returns a list of all permissions, including name, description, and ID.

## List roles

Returns all roles, including their names and their unique identifiers.

## Create role

Create a new role for your organization.

## Delete role

Disables a role.

## Get a role

Get a role in the organization specified by the role’s `role_id`.

## Update a role

Edit a role. Can only be used with application keys belonging to administrators.

## Create a new role by cloning an existing role

Clone an existing role

## Revoke permission

Removes a permission from a role.

## List permissions for a role

Returns a list of all permissions for a single role.

## Grant permission to a role

Adds a permission to a role.

## Remove a user from a role

Removes a user from a role.

## Get all users of a role

Gets all users of a role.

## Add a user to a role

Adds a user to a role.

