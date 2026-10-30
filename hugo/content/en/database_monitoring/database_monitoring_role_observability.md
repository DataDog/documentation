---
title: Database Monitoring Role Observability
description: See who can access your PostgreSQL data and how they got that access, without connecting to the database or querying system catalogs yourself.
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/schema_explorer/"
  tag: "Documentation"
  text: "Schema Explorer"
- link: "/account_management/rbac/permissions/"
  tag: "Documentation"
  text: "Role-based access control"
---

{{< callout url="https://app.datadoghq.com/forms/share/e5e882f61f3c52f41b235035f4a9af213cc0605812945c987859a9490d10c1b6" btn_hidden="false" header="Open Preview" >}}
Database Monitoring Role Observability is in open preview. APIs may change before general availability.
{{< /callout >}}

## Overview

Role Observability shows who can access your PostgreSQL data and how they got that access, without connecting to the database or querying system catalogs yourself. Datadog collects role and privilege information from each monitored instance on a 10 second interval and resolves it into a view of effective access, surfacing the relationships, inheritance, and membership behind every grant.

This page explains how to:

- Enable Role Observability for your monitored PostgreSQL databases
- Query roles, privileges, and membership relationships through the Datadog API or MCP server
- Investigate who can access a given database, schema, or table

## Requirements

- A PostgreSQL database monitored by [Database Monitoring][3].
- Datadog Agent version 7.86 or later.
- The feature is in open preview and gated behind a feature flag. To opt in, contact your Datadog account manager or fill out the request form at the top of this page.

## Access role data

Role Observability data is available through the Datadog API and the [Datadog MCP server][2]. At this time, there is no UI available for this feature.

### Using the API

TODO: Document the Role Observability API endpoints (list roles, list grants, resolve effective access for a given principal or object, change history, etc.).

```shell
curl -X GET "{{< region-param key="dd_api" >}}/api/unstable/TODO_endpoint" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

The application key must belong to a user or service account with the **Database Monitoring Read** permission.

| Parameter | Description |
| --------- | ----------- |
| <code style="white-space: nowrap;">TODO_param</code> | TODO description. |

TODO: Document the response shape, pagination, and any rate limits.

### Using the MCP server

Use the [Datadog MCP server][2] to query Role Observability from a coding agent. To add it to your agent, see [Set up the Datadog MCP server][4]. The MCP server exposes Role Observability as the following tools:

<table style="width: 100%;">
  <thead>
    <tr>
      <th style="width: 50%;">Tool</th>
      <th style="width: 50%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>TODO_tool_name</code></td>
      <td>TODO description.</td>
    </tr>
  </tbody>
</table>

TODO: Add a short example of what an agent interaction looks like (for example, "list every role that can read `customers.email`").

## Limitations

Role Observability answers questions about who can access your Postgres data. It does not cover other engines, row-filtering policies, or data sensitivity.

- **PostgreSQL only.** Role Observability supports Postgres 12 through 18. Other database engines are not covered.
- **Scope is per monitored database.** Each view is scoped to a single database monitored by Database Monitoring. Cross-database and cross-instance queries are not supported.
- **Data refreshes every 10 seconds.** Role and privilege changes made between refresh intervals are not visible until the next collection cycle.
- **Row-level security is not surfaced.** Policies defined with `CREATE POLICY` are not included. Role Observability reflects grant-level access only.
- **No data sensitivity classification.** Role Observability shows access to database objects. It does not describe the sensitivity of the data those objects contain. Pair it with a data classification tool to identify who can read sensitive columns or tables.
- **APIs may change.** The feature is in open preview, so endpoint shapes, parameter names, and response formats can change before general availability.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /mcp_server/
[3]: /database_monitoring/
[4]: /mcp_server/setup/
