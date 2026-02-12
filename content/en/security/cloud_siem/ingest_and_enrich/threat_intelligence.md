---
title: Bring Your Own Threat Intelligence
disable_toc: false
aliases:
  - /security/cloud_siem/threat_intelligence
further_reading:
- link: "security/cloud_siem/detection_rules"
  tag: "Documentation"
  text: "Create custom detection rules"
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: documentation
  text: IOC Explorer
---

## Overview

Datadog provides built-in [threat intelligence][1] for Cloud SIEM logs. This article explains how to extend that functionality by enriching logs with your own custom threat intelligence feeds.

Cloud SIEM supports enriching and searching logs using threat intelligence indicators of compromise (IOCs) stored in Datadog reference tables. [Reference Tables][7] allow you to combine metadata with information already in Datadog.

### How bring your own threat intelligence works

When Cloud SIEM processes a log, the log's IP and domain attributes are evaluated against reference tables that you have enabled for Cloud SIEM. The process is as follows:

1. For each log, Datadog extracts the IP and domain attributes.
    - IPs: IPv4 and IPv6 addresses found anywhere in the log.
    - Domains and hostnames: The values in the following attributes (when present):
      - `DNS_QUESTION_NAME`
      - `DNS_ANSWER_NAME`
      - `HTTP_URL`
      - `HTTP_URL_DETAILS_DOMAIN`
      - `HOSTNAME`
2. Evaluate extracted values against reference tables.
    - Extracted values are compared to the primary key in the corresponding reference tables.
3. Enrich on match.
    - If a match is found, Datadog enriches the log with the threat intelligence metadata from the table (for example, `category`, `source`, `first_seen`, `last_seen`, `confidence`). The enriched fields are then available for search, analytics, and detection rules.

**Notes**:
- Cloud SIEM evaluates logs in real time and uses both [Datadog-curated threat intelligence][10] and your own reference tables.
- Reference tables are the mechanism for storing and joining your custom IoCs with logs and detections.

### Store indicators of compromise in reference tables

Threat intelligence is supported in the CSV format, and requires a table for each Indicator type (for example, IP address or domain) and requires the following columns:

#### CSV structure for IP address

| Field           | Data | Description                                                                              | Required | Example                                                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| ip_address      | text | The primary key for the reference table in the IPv4 dot notation format.                 | true     | 192.0.2.1                                                                 |
| additional_data | json | Additional data to enrich the logs.                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| category        | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.     | true     | Malware                                                                   |
| intention       | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.       | true     | malicious                                                                 |
| source          | text | The name of the source and the link to its site, such as your team and your team's wiki. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">JSON in a CSV requires double quoting. The following is an example CSV:</div>

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

#### CSV structure for domain

| Field           | Data | Description                                                                              | Required | Example                                                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| domain          | text | The primary key for the reference table.                                                 | true     | mal-domain.com                                                            |
| additional_data | json | Additional data to enrich the logs.                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| category        | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.     | true     | Phishing                                                                  |
| intention       | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.       | true     | malicious                                                                 |
| source          | text | The name of the source and the link to its site, such as your team and your team's wiki. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

### Upload and enable your own threat intelligence

Datadog supports creating reference tables either by a manual upload or by periodically retrieving the data from Amazon S3, Azure storage, or Google Cloud storage.

**Notes**:
- It can take 10 to 30 minutes to start enriching Logs after creating a table.
- If a primary key is duplicated, it is skipped and an error message about the key is displayed.

On a new [reference table][2] page:

1. Name the table. The table name is referenced in the Threat Intelligence setting.
1. Upload a local CSV or import a CSV from a cloud storage bucket. The file is normalized and validated.
1. Preview the table schema and choose the IOC column as the Primary Key.
1. Save the table.
1. In [Threat Intel][3], locate the new table and toggle it on to enable it.

#### Using cloud storage

When the reference table is created from cloud storage, it is refreshed periodically. The entire table is replaced. Data is not merged.

See the related reference table documentation for:

- [Amazon S3][4]
- [Azure storage][5]
- [Google Cloud storage][6]

#### Troubleshooting cloud imports

If a reference table is not refreshing, open the reference table's settings menu and select **View Change Events**.

**View Change Events** opens a page in **Event Management** showing potential error events for the ingestion. You can also filter in **Event Management** using the reference table name.

In Datadog Event Management, it may appear that data has been fetched from the cloud, but it can take a few additional minutes for those changes to propagate to Threat Intelligence. Other useful cloud import details to remember:

- The expected latency before updated enrichments are available when a source is uploaded or updated is 10 to 30 minutes.
- How to know when the updates are applied: The changes are visible in the reference table or in the logs. Select the **View Change Events** link from settings on the reference table detail page to see the related events.
- The update replaces the entire table with the new data.
In case of a duplicated primary key, the rows with the duplicated key are not written, and an error is shown in the reference table detail page.

## View threat intelligence data in Datadog

To enable Cloud SIEM threat intelligence data for reference tables:
1. Navigate to [Threat Intelligence][3].
1. For the table you want to see Cloud SIEM threat intelligence data for, click the dropdown menu in the **Enabled** column and select Cloud SIEM.

After applying a reference table to Cloud SIEM, all incoming logs are evaluated against the table using a specific Indicator of Compromise (IoC) key, such as an IP address or domain. If a match is found, the log is enriched with relevant Threat Intelligence (TI) attributes from the table, which enhances detection, investigation, and response. A threat intelligence reference table can be shared across multiple security products.

You can view your threat intelligence data in the [IOC Explorer][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threat_intelligence/#threat-intelligence-sources
[2]: https://app.datadoghq.com/reference-tables/create
[3]: https://app.datadoghq.com/security/configuration/threat-intel
[4]: /reference_tables/?tab=amazons3#create-a-reference-table
[5]: /reference_tables/?tab=azurestorage#create-a-reference-table
[6]: /reference_tables/?tab=googlecloudstorage#create-a-reference-table
[7]: /reference_tables/
[8]: /security/threat_intelligence/#threat-intelligence-categories
[9]: /security/threat_intelligence/#threat-intelligence-intents
[10]: /security/threat_intelligence#threat-intelligence-sources
[11]: /security/cloud_siem/triage_and_investigate/ioc_explorer/
