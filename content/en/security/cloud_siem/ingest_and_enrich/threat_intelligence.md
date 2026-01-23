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

When Cloud SIEM processes a log, the log's IP, domain, hash, AWS account ID, container, SSH, and user agent attributes are evaluated against reference tables that you have enabled for Cloud SIEM. The process is as follows:

1. For each log, Datadog extracts the relevant attributes:
    - **IPs**: IPv4 and IPv6 addresses found anywhere in the log.
    - **Domains and hostnames**: The values in the following attributes (when present):
      - `DNS_QUESTION_NAME`
      - `DNS_ANSWER_NAME`
      - `HTTP_URL`
      - `HTTP_URL_DETAILS_DOMAIN`
      - `HOSTNAME`
    - **File hashes**: SHA1, SHA256, and ssdeep hashes found in file- and process-related log attributes.
    - **AWS account IDs**: Values from AWS-related log attributes (for example, `userIdentity.accountId`).
    - **Container image names**: Values from container runtime logs.
    - **Container registry account names**: Values from container registry logs.
    - **SSH public keys**: Values from SSH authentication logs.
    - **User agents**: Values from HTTP request header attributes.
2. Evaluate extracted values against reference tables.
    - Extracted values are compared to the primary key in the corresponding reference tables. Each indicator type has its own reference table with a specific primary key (for example, `ip_address` for IPs, `sha256` for SHA256 hashes).
3. Enrich on match.
    - If a match is found, Datadog enriches the log with the threat intelligence metadata from the table (for example, `category`, `source`, `first_seen`, `last_seen`, `confidence`). The enriched fields are then available for search, analytics, and detection rules.

**Notes**:
- Cloud SIEM evaluates logs in real time and uses both [Datadog-curated threat intelligence][10] and your own reference tables.
- Reference tables are the mechanism for storing and joining your custom IoCs with logs and detections.

### Store indicators of compromise in reference tables

Threat intelligence is supported in the CSV format, and requires a table for each Indicator type (for example, IP address, domain, SHA256 hash, AWS account ID, container image name) and requires the following columns:

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
| additional_data | json | Additional data to enrich the trace.                                                     | false    | `{"ref":"hxxp://example.org"}`                                            |
| category        | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.     | true     | Phishing                                                                  |
| intention       | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.       | true     | malicious                                                                 |
| source          | text | The name of the source and the link to its site, such as your team and your team's wiki. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

#### CSV structure for file hashes

File hash indicators require a separate reference table for each hash type: SHA1, SHA256, or ssdeep. The primary key column name varies based on the hash type.

| Field           | Data | Description                                                                              | Required | Example                                  |
|-----------------|------|------------------------------------------------------------------------------------------|----------|------------------------------------------|
| sha1 / sha256 / ssdeep | text | The primary key for the reference table.                                          | true     | `5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8` |
| additional_data | json | Additional data to enrich the logs.                                                      | false    | `{"ref":"hxxp://example.org"}`           |
| category        | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.     | true     | malware                                  |
| intention       | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.       | true     | malicious                                |
| source          | json | The name of the source and the link to its site, such as your team and your team's wiki. | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">JSON in a CSV requires double quoting. The following are example CSVs for each hash type:</div>

**SHA256 example:**
```
sha256,additional_data,category,intention,source
5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

**SHA1 example:**
```
sha1,additional_data,category,intention,source
a1b2c3d4e5f6789012345678901234567890abcd,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
5e884898da28047151d0e56f8dc6292773603d0d,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

**ssdeep example:**
```
ssdeep,additional_data,category,intention,source
3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
96:C7Q4LPmPWJwF7qLQd6C8vjF8ULQd6vhLQd6C8vjF:C7Q4LSjKdD8eKdhD8e,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192:4gHHP2ZJwF0gHHrFqxXgHH8RZJwF:4gHtZy0gHMsxQH,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

#### CSV structure for AWS account ID

| Field           | Data | Description                                                                              | Required | Example              |
|-----------------|------|------------------------------------------------------------------------------------------|----------|----------------------|
| aws_account_id  | text | The primary key for the reference table in AWS account ID format (12-digit number).     | true     | 123456789012         |
| additional_data | json | Additional data to enrich the logs.                                                      | false    | `{"ref":"hxxp://example.org"}` |
| category        | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.    | true     | scanner              |
| intention       | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.      | true     | suspicious           |
| source          | json | The name of the source and the link to its site, such as your team and your team's wiki.| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

**Note**: Useful for tracking compromised or suspicious AWS accounts.

<div class="alert alert-info">JSON in a CSV requires double quoting. The following is an example CSV:</div>

```
aws_account_id,additional_data,category,intention,source
123456789012,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
987654321098,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
555666777888,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

#### CSV structure for container image name

| Field                | Data | Description                                                                              | Required | Example                                      |
|----------------------|------|------------------------------------------------------------------------------------------|----------|----------------------------------------------|
| container_image_name | text | The primary key for the reference table. Can include registry, repository, and tag.     | true     | malicious-registry.com/suspicious/image:latest |
| additional_data      | json | Additional data to enrich the logs.                                                      | false    | `{"ref":"hxxp://example.org"}`               |
| category             | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.    | true     | malware                                      |
| intention            | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.      | true     | malicious                                    |
| source               | json | The name of the source and the link to its site, such as your team and your team's wiki.| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

**Note**: Track known malicious container images.

<div class="alert alert-info">JSON in a CSV requires double quoting. The following is an example CSV:</div>

```
container_image_name,additional_data,category,intention,source
malicious-registry.com/suspicious/image:latest,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
bad-repo.io/malware/cryptominer:v2,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
suspicious-hub.com/backdoor/payload:1.0,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

#### CSV structure for container registry account name

| Field                           | Data | Description                                                                              | Required | Example                 |
|---------------------------------|------|------------------------------------------------------------------------------------------|----------|-------------------------|
| container_registry_account_name | text | The primary key for the reference table. The account or organization name in a container registry. | true | suspicious-publisher    |
| additional_data                 | json | Additional data to enrich the logs.                                                      | false    | `{"ref":"hxxp://example.org"}` |
| category                        | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.    | true     | malware                 |
| intention                       | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.      | true     | malicious               |
| source                          | json | The name of the source and the link to its site, such as your team and your team's wiki.| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

**Note**: Identify compromised or malicious container registry accounts.

<div class="alert alert-info">JSON in a CSV requires double quoting. The following is an example CSV:</div>

```
container_registry_account_name,additional_data,category,intention,source
suspicious-publisher,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
compromised-org,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
malicious-vendor,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

#### CSV structure for SSH public key

| Field           | Data | Description                                                                              | Required | Example                                      |
|-----------------|------|------------------------------------------------------------------------------------------|----------|----------------------------------------------|
| ssh_public_key  | text | The primary key for the reference table. SSH public key in standard format (typically ssh-rsa, ssh-ed25519, etc.). | true | ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... |
| additional_data | json | Additional data to enrich the logs.                                                      | false    | `{"ref":"hxxp://example.org"}`               |
| category        | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.    | true     | scanner                                      |
| intention       | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.      | true     | suspicious                                   |
| source          | json | The name of the source and the link to its site, such as your team and your team's wiki.| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

**Note**: Track unauthorized or compromised SSH keys. Remove line breaks from multi-line keys before adding to CSV.

<div class="alert alert-info">JSON in a CSV requires double quoting. The following is an example CSV:</div>

```
ssh_public_key,additional_data,category,intention,source
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3F6tyPEFEzV0LX3X8BsXdMsQ,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDGZfNyAXqPdvZ0qqIWFVxH5z2k,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

#### CSV structure for user agent

| Field           | Data | Description                                                                              | Required | Example                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|-------------------------------------------|
| user_agent      | text | The primary key for the reference table. HTTP User-Agent string.                        | true     | Mozilla/5.0 (compatible; MaliciousBot/1.0) |
| additional_data | json | Additional data to enrich the logs.                                                      | false    | `{"ref":"hxxp://example.org"}`            |
| category        | text | The threat intel [category][8]. This is used by some out-of-the-box detection rules.    | true     | scanner                                   |
| intention       | text | The threat intel [intent][9]. This is used by some out-of-the-box detection rules.      | true     | suspicious                                |
| source          | json | The name of the source and the link to its site, such as your team and your team's wiki.| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

**Note**: Identify malicious bots and scanners.

<div class="alert alert-info">JSON in a CSV requires double quoting. The following is an example CSV:</div>

```
user_agent,additional_data,category,intention,source
Mozilla/5.0 (compatible; MaliciousBot/1.0),"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
BadCrawler/2.0,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
SuspiciousScanner/3.5,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

### Upload and enable your own threat intelligence

Datadog supports creating reference tables either by a manual upload or by periodically retrieving the data from Amazon S3, Azure storage, or Google Cloud storage.

**Notes**:
- It can take 10 to 30 minutes to start enriching Logs after creating a table.
- If a primary key is duplicated, it is skipped and an error message about the key is displayed.

On a new [reference table][2] page:

1. Name the table. The table name is referenced in the Threat Intelligence setting.
1. Upload a local CSV or import a CSV from a cloud storage bucket. The file is normalized and validated.
1. Preview the table schema and choose the appropriate IOC column as the Primary Key (for example, `ip_address` for IP indicators, `sha256` for SHA256 hash indicators).
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
