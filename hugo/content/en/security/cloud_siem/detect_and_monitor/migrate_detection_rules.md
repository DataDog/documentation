---
title: Migrate Detection Rules
description: Translate detection rules from third-party SIEMs into Cloud SIEM detection rules.
further_reading:
- link: "/security/cloud_siem/detect_and_monitor/custom_detection_rules/"
  tag: "Documentation"
  text: "Create custom detection rules"
- link: "/mcp_server/tools/#security"
  tag: "Documentation"
  text: "Datadog MCP Server security tools"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Detection rule migration is not available for the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Detection rule migration is in Preview.
{{< /callout >}}

## Overview

Detection rule migration translates the detection logic of third-party SIEM rules into Cloud SIEM detection rules.
Datadog uses AI to generate each detection rule from the source rule and the logs your organization sends.
Each generated rule is a proposal. Datadog doesn't create a rule in Cloud SIEM until you publish or save it.

Detection rule migration supports Splunk as a source platform.

### Translate a single rule

| Method                                                        | Use case                                                                                                                                       |
|---------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| [Rule editor UI](#translate-a-single-rule-in-the-rule-editor) | Chat with Bits AI in the Cloud SIEM rule editor. Paste or describe a source rule, then refine the draft until it matches your needs.           |
| [MCP Server tool][1]                                          | Translate a single rule from an AI agent with the `propose_datadog_security_detection_rule` tool. Returns a proposed rule without creating it. |
| [Rule proposal API][2]                                        | Translate a single rule with an API call. Returns a proposed rule without creating it.                                                         |

### Migrate rules in bulk

| Method                                                | Use case                                                                                             |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| [Bulk migration UI](#migrate-detection-rules-in-bulk) | Upload a CSV export of your Splunk saved searches, then review and publish a proposal for each rule. |
| [Batch migration API][3]                              | Run the same bulk migration with API calls instead of the UI.                                        |

To migrate Splunk log search queries, alerts, or dashboards, use [Migration Tools][4].

## Prerequisites

<div class="alert alert-warning">Before you migrate, send the logs your source rules query to Datadog. See <a href="/security/cloud_siem/ingest_and_enrich/">Ingest and Enrich</a>. Datadog uses these logs to map each source rule's fields and queries to Cloud SIEM. Without them, translations are less accurate.</div>

- [Cloud SIEM][5] is enabled for your organization.
- You have the following [permissions][6]:

| Permission                                                                    | Required to                                                                                      |
|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| {{< ui >}}Security Rules Read{{< /ui >}} (`security_monitoring_rules_read`)   | View migrations, proposals, and their statuses.                                                  |
| {{< ui >}}Security Rules Write{{< /ui >}} (`security_monitoring_rules_write`) | Create, update, start, cancel, and delete migrations, publish rules, and translate single rules. |

## Translate a single rule in the rule editor

1. Open the [rule editor][7].
2. In the chat, paste the source rule and describe what you want.
3. Send follow-up messages to refine the draft.
4. Review and save the rule.

For example:

```text
Convert this Splunk rule, but alert when a user logs in from 3+ IPs in 10 minutes:

`cloudtrail` eventName=ConsoleLogin
| bin span=5m _time
| stats dc(src) as distinct_ip_count values(src) as src by _time, user_name
| where distinct_ip_count>1
```

## Migrate detection rules in bulk

### How it works

1. Export your detection rules from the source platform.
2. Upload the export to Datadog and start a migration.
3. Datadog generates a detection rule proposal for each source rule. Proposals appear as Datadog translates them, so you can start reviewing before the migration completes.
4. Review each proposal, then publish the ones you want to Cloud SIEM.

Large migrations can take a few hours to complete.

### Migrate from Splunk

1. Go to [Detection Rules][8], click the arrow next to {{< ui >}}New Rule{{< /ui >}}, and select {{< ui >}}Migrate from Splunk{{< /ui >}}.
2. Copy the export query, run it in Splunk, and export the results as a CSV file.
3. Upload one or more CSV files.
4. Name the migration and deselect any rules you don't want to migrate.
5. Click {{< ui >}}Start Migration{{< /ui >}}.

### Review and publish proposals

Open a migration from the [Migrations][9] page to follow its progress. Tabs group proposals by status: ready to publish, needs review, and in progress.

Open a proposal to compare the source rule with the proposed detection rule, then publish it. You can also select several proposals and publish them at once.

Published rules are disabled, so they don't generate signals until you enable them. Open a published rule from the migration to enable it.

## Translation limitations

Proposals are AI-generated and might not detect the same activity as the source rule. Review each rule before you enable it. Common gaps:

Missing log sources
: If Datadog doesn't receive the logs a source rule queries, it can't check the proposal against real data, so the proposal is less accurate.

Different field names
: Source fields rarely map one-to-one to Datadog attributes. Check that the proposed query uses attributes your logs contain.

Unsupported logic
: Detection rule migration doesn't support some source rule logic. Rules that use it fail to translate, or the proposal approximates the logic.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/tools/#security
[2]: /api/latest/security-monitoring/start-a-rule-proposal/
[3]: /api/latest/security-monitoring/start-a-batch-migration/
[4]: /logs/migration/migration_tools/
[5]: /security/cloud_siem/
[6]: /account_management/rbac/permissions/#cloud-security-platform
[7]: https://app.datadoghq.com/security/siem/rules/new
[8]: https://app.datadoghq.com/security/siem/rules
[9]: https://app.datadoghq.com/security/siem/detections/migrations
