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

Role Observability shows who can access your PostgreSQL data and how they got that access, without connecting to the database or querying system catalogs yourself. Once enabled with the `collect_roles.enabled` option in `conf.d/postgres.d/conf.yaml` (off by default), Datadog collects role and privilege information from each monitored instance every 10 minutes and resolves it into a view of effective access, surfacing the relationships, inheritance, and membership behind every grant.

This page explains how to:

- Confirm role and privilege data is being collected for your monitored PostgreSQL databases
- Query roles, privileges, and membership relationships through the Datadog API or MCP server
- Investigate who can access a given database, schema, or table

## Requirements

- A PostgreSQL database monitored by [Database Monitoring][3].
- Datadog Agent version 7.86 or later.
- The feature is in open preview and gated behind a feature flag. To opt in, contact your Datadog account manager or fill out the request form at the top of this page.
- Role collection enabled in the Agent. Set `collect_roles.enabled: true` in `conf.d/postgres.d/conf.yaml` (off by default) and restart the Agent. To confirm data is flowing for a given instance, call [`GET /access/status`](#using-the-api).

## Access role data

Role Observability data is available through the Datadog API and the [Datadog MCP server][2]. No UI is available for this feature.

Every answer is computed from the latest role and privilege snapshot that Database Monitoring collected for the instance. Role Observability reads collected metadata only: it does not connect to your database, run queries as the role, or change any grant.

### Using the MCP server

Use the [Datadog MCP server][2] to ask a coding agent who can access your data and why. To add it to your agent, see [Set up the Datadog MCP server][4]. The tools are part of the `dbm` toolset:

<table style="width: 100%;">
  <thead>
    <tr>
      <th style="width: 50%;">Tool</th>
      <th style="width: 50%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>list_datadog_database_role_access_instances</code></td>
      <td>Lists the instances that are sending role and privilege data, with each instance's collection state and the databases it covers. Agents use it to find the instance name when you don't give one.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_role_access_status</code></td>
      <td>Checks whether role and privilege data has been collected and is ready for an instance and database.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>list_datadog_database_roles</code></td>
      <td>Lists the roles on an instance, with their attributes such as <code>LOGIN</code> and <code>SUPERUSER</code>. Agents use it to translate a role name into the role OID that the other tools take.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_role</code></td>
      <td>Gets one role's attributes, direct memberships, and role settings.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_object_access</code></td>
      <td>Answers "who can access this object?" for a table, view, sequence, function, schema, or database, optionally down to one column.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_role_access</code></td>
      <td>Answers "what can this role access?" across one logical database, with optional schema, object type, name, and privilege filters.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>explain_datadog_database_access</code></td>
      <td>Answers "why can this role access this object?" by returning the grants that contribute to the access and the membership path behind each one. For audits, it can return the full proof graph instead.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>list_datadog_database_default_privileges</code></td>
      <td>Lists the default-privilege rules (<code>ALTER DEFAULT PRIVILEGES</code>) that decide what grants objects created in the future receive.</td>
    </tr>
  </tbody>
</table>

You can ask questions in plain language. For example:

- "Why does `reporting_svc` get `permission denied` on `analytics.daily_revenue`?"
- "Who can read `analytics.daily_revenue` on `orders-db-primary`, and through which role?"
- "Is the `bi_readers` group actually read-only?"
- "Which roles will get access to new tables created in the `analytics` schema?"

{{< img src="database_monitoring/database_monitoring_role_observability/role_observability_mcp_demo.mp4" alt="A coding agent uses the Datadog MCP server to work a permission-denied ticket. It finds a table grant blocked by missing schema USAGE, uses default privileges to recommend group membership as the lasting fix, and finds that the group also has write access it should not have." video="true" >}}

### Using the API

Use the Role Observability API to answer access questions from scripts and automation, such as a scheduled export for a periodic access review. All endpoints are `GET` requests under `/api/unstable/databases/postgres/`, and every request except `/access/instances` takes `filter[database_instance]`. This is the instance name shown in Database Monitoring (the same value as the `database_instance` tag). To look up the available values, call `GET /access/instances`.

For example, to list every role that can access a table:

```shell
curl -G "{{< region-param key="dd_api" >}}/api/unstable/databases/postgres/objects/access" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  --data-urlencode "filter[database_instance]=orders-db-primary" \
  --data-urlencode "filter[database]=shop" \
  --data-urlencode "filter[schema]=billing" \
  --data-urlencode "filter[object]=invoices" \
  --data-urlencode "filter[object_type]=table"
```

The application key must belong to a user or service account with the [**Database Monitoring Read**][1] permission.

| Endpoint | Answers | Also requires |
| -------- | ------- | ------------- |
| `GET /access/instances` | Which instances are sending role data? | None. Optionally narrow by name with `filter[search]`. |
| `GET /access/status` | Is role data collected and ready? | |
| `GET /roles` | Which roles exist? | |
| `GET /roles/{role_oid}` | What are this role's attributes and memberships? | |
| `GET /objects/access` | Who can access this object? | `filter[database]`, `filter[schema]`, `filter[object]`, `filter[object_type]` |
| `GET /roles/{role_oid}/access` | What can this role access? | `filter[database]` |
| `GET /access/explain` | Why can this role access this object? | Same as `/objects/access`, plus `filter[role_oid]` |
| `GET /default-privileges` | What will new objects be granted? | `filter[database]` |

Most endpoints also accept optional filters such as `filter[privilege]` and `filter[column]`, and are paginated with `page[size]` and `page[cursor]`.

Each result reports access in two modes: `without_set_role`, for access the role has directly or through membership, and `via_set_role`, for access it can get only after `SET ROLE`. Each mode is `usable`, `blocked` (a grant exists, but a database `CONNECT` or schema `USAGE` check fails), `unknown` (the collected data can't prove it either way), or `not_applicable` (the privilege does not apply to this object type, for example `INSERT` on a function). The response also includes a representative path from the role to the grant.

If `meta.resolution_status` is `partial`, some access could not be resolved and `meta.warnings` explains why. In that case, an empty result does not prove that nobody has access. A `404` with `role_data_not_collected` means no data has been collected yet, so check `/access/status`.

## Limitations

Role Observability answers questions about who can access your PostgreSQL data. It does not cover other engines, row-filtering policies, or data sensitivity.

- **PostgreSQL only.** Other database engines are not covered.
- **Scope is per monitored database.** Each view is scoped to a single database monitored by Database Monitoring. There is no single API call to compare roles or privileges across instances. To compare two instances, use the MCP server and ask a coding agent to fetch and diff the data.
- **Data refreshes every 10 minutes.** Role and privilege changes made between refresh cycles are not visible until the next one. Set `collect_roles.enabled: true` in `conf.d/postgres.d/conf.yaml` to turn collection on; it is off by default.
- **Row-level security is not surfaced.** Policies defined with `CREATE POLICY` are not included. Role Observability reflects grant-level access only.
- **No data sensitivity classification.** Role Observability shows access to database objects. It does not describe the sensitivity of the data those objects contain. Pair it with a data classification tool to identify who can read sensitive columns or tables.
- **APIs may change.** The feature is in open preview, so endpoint shapes, parameter names, and response formats can change before general availability.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#database-monitoring
[2]: /mcp_server/
[3]: /database_monitoring/
[4]: /mcp_server/setup/
