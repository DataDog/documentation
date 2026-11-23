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
- Your Datadog role has the Integrations Manage permission, to turn on scanning. To upgrade or configure the Agent from Datadog, your role also needs the [Fleet Automation permissions][7].
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

After you edit `datadog.yaml`, [restart the Agent][6] to apply the settings.

### Grant read access to the tables

Data Security connects with the `datadog` database user that Database Monitoring uses. Grant `SELECT` on the tables you want to scan to that user. For example, to grant access to every table in a schema:

```sql
GRANT USAGE ON SCHEMA <SCHEMA_NAME> TO datadog;
GRANT SELECT ON ALL TABLES IN SCHEMA <SCHEMA_NAME> TO datadog;
ALTER DEFAULT PRIVILEGES IN SCHEMA <SCHEMA_NAME> GRANT SELECT ON TABLES TO datadog;
```

`ALTER DEFAULT PRIVILEGES` covers the tables that the user who runs it creates later. If another user creates tables in the schema, add `FOR ROLE <TABLE_OWNER>` after `ALTER DEFAULT PRIVILEGES`.

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
