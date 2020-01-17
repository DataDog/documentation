---
title: Roles
type: apicontent
order: 37
external_redirect: /api/#roles
---

## Roles

The Roles API can be used to create and manage Datadog roles, what [global permissions][1] they grant, and which users belong to them.

Permissions related to specific account assets can be granted to roles in the Datadog application without using this API. For example, granting read access on a specific log index to a role can be done in Datadog from [the Pipelines Page][2].

### Requests

All the API endpoints below can have two different host endpoints:

* If you are on the Datadog US site: `https://api.datadoghq.com/api/`
* If you are on the Datadog EU site: `https://api.datadoghq.eu/api/`

[1]: /account_management/faq/how-do-i-grant-or-remove-a-global-permission-to-or-from-a-role
[2]: https://app.datadoghq.com/logs/pipelines
