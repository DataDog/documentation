---
title: Authorization Scopes
type: api
disable_sidebar: true
---
## Authorization scopes for OAuth clients

Scopes are an authorization mechanism that allow you to limit and define the specific access applications have to an organization's Datadog data. When authorized to access data on behalf of a user or service account, applications can only access the information explicitly permitted by their assigned scopes.

<div class="alert alert-danger">This page lists only the authorization scopes that can be assigned to OAuth clients. To view the full list of assignable permissions for scoped application keys, see <a href="/account_management/rbac/permissions/#permissions-list">Datadog Role Permissions</a>.

<ul>
  <li><strong>OAuth clients</strong> → Can only be assigned authorization scopes (limited set).</li>
  <li><strong>Scoped application keys</strong> → Can be assigned any Datadog permission.</li>
</ul>
</div>

The best practice for scoping applications is to follow the principle of least privilege. Assign only the minimum scopes necessary for an application to function as intended. This enhances security and provides visibility into how applications interact with your organization's data. For example, a third-party application that only reads dashboards does not need permissions to delete or manage users.

You can use authorization scopes with OAuth2 clients for your [Datadog Apps][1].

{{< api-scopes >}}

[1]: https://docs.datadoghq.com/developers/datadog_apps/#oauth-api-access
