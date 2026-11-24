---
title: Set Up Data Security for PostgreSQL
description: Scan PostgreSQL tables for sensitive data with Data Security, using the Datadog Agent you run for Database Monitoring.
disable_toc: false
further_reading:
  - link: "/database_monitoring/setup_postgres/"
    tag: "Documentation"
    text: "Set up Database Monitoring for PostgreSQL"
  - link: "/agent/fleet_automation/"
    tag: "Documentation"
    text: "Fleet Automation"
  - link: "/security/data_security/findings/"
    tag: "Documentation"
    text: "Investigate Data Security findings"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Data Security is not available for the US1-FED Datadog site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/dspm/" btn_hidden="false" header="Join the Preview!">}}
Data Security is in Preview. To request access, fill out the form.
{{< /callout >}}

## Overview

Data Security scans PostgreSQL tables with the Datadog Agent you run for Database Monitoring. The Agent reads a sample of rows from each table in your environment and sends only the match metadata to Datadog. The scanned data doesn't leave your environment. Data Security scans the tables continuously, a few tables at a time.

Datadog sends the list of tables to scan to the Agent through [Remote Configuration][1].

## Prerequisites

- [Database Monitoring][2] is set up on the PostgreSQL host.
- The Agent that monitors the host runs Datadog Agent 7.86.0 or later.
- [Schema collection][8] is enabled in the Database Monitoring configuration of the host. Schema collection is enabled by default with Agent 7.80.0 and later. Do not set `collect_schemas.enabled` to `false`.
- Your Datadog role has the Integrations Manage permission, to turn on scanning.
- Optional: to upgrade or configure the Agent from the side panel with Fleet Automation, your role also needs the [Fleet Automation permissions][7]. You can enable scanning without Fleet Automation.
- [Remote Configuration][1] is enabled for your organization and connected on the Agent.

## Configure the Agent

The Postgres side panel checks each requirement and shows a status for each of the following steps. Go to the [Data Security configuration page][3], click the {{< ui >}}Postgres{{< /ui >}} tab, then click the host to open its side panel.

### Upgrade the Agent

If the Agent runs a version earlier than 7.86.0, upgrade it:

- If [Remote Agent Management][4] is enabled on the Agent, upgrade it from the side panel with Fleet Automation.
- Otherwise, follow the [Agent upgrade instructions][5].

### Update the Agent configuration

Add the following settings to the Agent's `datadog.yaml` file:

```yaml
data_security:
  enabled: true
shared_library_check:
  enabled: true
remote_configuration:
  enabled: true
```

If Remote Agent Management is enabled and the Agent runs version 7.71.1 or later, you can push these settings from the side panel instead of editing the file.

Optional: to make scans use TLS when the `postgres` integration instance does not require it, also set `enforce_ssl` to `true`:

```yaml
data_security:
  enabled: true
  enforce_ssl: true
```

With `enforce_ssl: true`, the Agent changes the `ssl` mode of the integration instance to `require` for scans when the mode is unset, `disable`, `allow`, or `prefer`. The Agent keeps the stricter modes `require`, `verify-ca`, and `verify-full`. The Agent does not scan a host that it connects to through a UNIX socket.

After you edit `datadog.yaml`, [restart the Agent][6] to apply the settings.

### Grant read access to the tables

Data Security connects with the `datadog` database user that Database Monitoring uses. Grant `SELECT` on the tables you want to scan to that user. For example, to grant access to every table in a schema:

```sql
GRANT USAGE ON SCHEMA <SCHEMA_NAME> TO datadog;
GRANT SELECT ON ALL TABLES IN SCHEMA <SCHEMA_NAME> TO datadog;
ALTER DEFAULT PRIVILEGES IN SCHEMA <SCHEMA_NAME> GRANT SELECT ON TABLES TO datadog;
```

`ALTER DEFAULT PRIVILEGES` covers the tables that the user who runs it creates later. If another user creates tables in the schema, add `FOR ROLE <TABLE_OWNER>` after `ALTER DEFAULT PRIVILEGES`. For example, if the `app_owner` role creates the tables in the `sales` schema:

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE app_owner IN SCHEMA sales GRANT SELECT ON TABLES TO datadog;
```

To run this command, you must be a member of the `app_owner` role or a superuser.

#### Grant read access to all schemas

To grant read access to every schema at once, use one of the following methods.

On PostgreSQL 14 and later, grant the predefined `pg_read_all_data` role to the `datadog` user. The user can then read every table in every schema and database of the instance, including tables created later:

```sql
GRANT pg_read_all_data TO datadog;
```

On any version, run the following block in each database to scan. It runs the commands above for each schema, except the system schemas:

```sql
DO $$
DECLARE
  schema_name text;
BEGIN
  FOR schema_name IN
    SELECT nspname FROM pg_namespace
    WHERE nspname NOT LIKE 'pg\_%' AND nspname <> 'information_schema'
  LOOP
    EXECUTE format('GRANT USAGE ON SCHEMA %I TO datadog', schema_name);
    EXECUTE format('GRANT SELECT ON ALL TABLES IN SCHEMA %I TO datadog', schema_name);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT SELECT ON TABLES TO datadog', schema_name);
  END LOOP;
END $$;
```

The block applies to the schemas that exist when you run it. For a schema created later, run the commands for that schema.

Tables the `datadog` user can't read appear as setup issues in the side panel.

## Enable scanning

1. Go to the [Data Security configuration page][3] and click the {{< ui >}}Postgres{{< /ui >}} tab.
1. In the row of the host to scan, turn on the {{< ui >}}Scanning{{< /ui >}} toggle and confirm.

Scanning applies to each host separately.

## Verify the setup

The side panel lists the Agents that monitor the host, with their {{< ui >}}Agent name{{< /ui >}}, {{< ui >}}Version{{< /ui >}}, {{< ui >}}Remote Agent Management{{< /ui >}} status, and {{< ui >}}Remote config status{{< /ui >}}.

After the first scan, check the setup issues in the side panel. A missing read permission appears as a warning with the table name, for example `Scanning the table <DATABASE>.<SCHEMA>.<TABLE> failed: permission denied`. To fix it, grant `SELECT` on the table to the `datadog` user.

## Disable scanning

1. Go to the [Data Security configuration page][3] and click the {{< ui >}}Postgres{{< /ui >}} tab.
1. In the row of the host, turn off the {{< ui >}}Scanning{{< /ui >}} toggle and confirm.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: /database_monitoring/setup_postgres/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/data-security/postgres
[4]: /agent/fleet_automation/
[5]: /agent/fleet_automation/upgrade_agents/
[6]: /agent/configuration/agent-commands/#restart-the-agent
[7]: /agent/fleet_automation/#control-access-to-fleet-automation
[8]: /database_monitoring/schema_explorer/?tab=postgres#tuning-schema-collection
