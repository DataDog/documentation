---
title: Bring Your Own Threat Intelligence
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/cloud-siem-enterprise-security"
  tag: "Blog"
  text: "Datadog Cloud SIEM: Driving innovation in security operations"
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

Datadog Security supports enriching and searching [traces][14] with [threat intelligence][1] indicators of compromise stored in Datadog reference tables. [Reference Tables][2] allow you to combine metadata with information already in Datadog.

## Storing indicators of compromise in reference tables

Threat intelligence is supported in the CSV format and requires the following columns:

**CSV Structure**

| field            | data  | description| required | example|
|------------------|-------|----|-----|--|
| ip_address       | text | The primary key for the reference table in the IPv4 dot notation format. | true | 192.0.2.1  |
| additional_data  | json      | Additional data to enrich the trace. | false | `{"ref":"hxxp://example.org"}`
| category         | text  | The threat intel [category][7]. This is used by some out of the box detection rules. | true | `residential_proxy` |
| intention        | text | The threat intel [intent][8]. This is used by some out of the box detection rules.| true | malicious | |
| source           | json  | Fields representing where the threat intelligence originates, such as your team and your team's wiki. | true| `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` | | 



The full list of supported categories and intents is available at [Threat Intelligence Facets][3].

<div class="alert alert-info">JSON in a CSV requires double quoting. The following is an example CSV.</div>

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

## Uploading and enabling your own threat intel

Datadog supports creating reference tables through a manual upload, or by periodically retrieving the data from [Amazon S3, Azure storage, or Google Cloud storage][10].

<div class="alert alert-info">
<p>**Usage notes:**</p>
<ul>
<li>If a primary key is duplicated, it is skipped and an error message about the key is displayed.</li>
<li>Signals are not enriched. Enrichment only applies to traces.</li>
<li>Datadog does not enrich local or private IPs.</li>
<li>Only new traces (after the reference table is enabled or updated) are enriched. Old traces are not retroactively enriched.</li>
<li>Enrichment happens for traces that match the IPs (supported in SIEM and App and API Protection) and domains (supported in SIEM) in the reference table.</li>
<li>Manual file uploads don't auto-update. Updates occur only from cloud storage.</li>
</ul>
</div>

On a new [references table][4] page:

1. Name the table. The table name is referenced in AAP's **Threat Intel** config.
2. Upload a local CSV or import a CSV from a cloud storage bucket. The file is normalized and validated.
3. Preview the table schema and choose the IP address as the Primary Key.
   
   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table.png" alt="New reference table" style="width:100%;" >}}
4. Save the table.
5. In [Threat Intel][5], locate the new table, and then select the toggle to enable it. 
   
   <!-- {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table_enabled.png" alt="Enabled reference table" style="width:100%;" >}} -->

### Using cloud storage

When the reference table is created from cloud storage, it is refreshed periodically. The entire table is *replaced*. Data is not merged.

See the related reference table documentation for:
- [Amazon S3][11]
- [Azure storage][12]
- [Google Cloud storage][13]

### Troubleshooting cloud imports

If the reference tables are not refreshing, select the **View Change Events** link from the settings on the reference table detail page. 

**View Change Events** opens a page in **Event Management** showing potential error events for the ingestion. You can also filter in **Event Management** using the reference table name.

<div class="alert alert-info">In Datadog Event Management, it can look like the data is fetched from the cloud, but it can take a few more minutes to propagate those changes to Threat Intellegence.</div>

Other useful cloud import details to remember:

- The expected latency before updated enrichments are available when a source is uploaded or updated is 10 to 30 minutes.
- How to know when the updates are applied: The changes are visible in the reference table or in the spans. Select the **View Change Events** link from settings on the reference table detail page to see the related events.
- The update replaces the *entire table* with the new data. 
- In case of a duplicated primary key, the rows with the duplicated key are not written, and an error is shown in the reference table detail page.

## Filter traces by joining the list with a Reference Table

You can filter AAP traces in Datadog by joining a trace table with a Reference Table. 

To join a Reference Table with a trace query, you combine rows from the Datadog trace table and a Reference Table based on a related column between them. The traces query returns only those traces where there is a match in both tables.

Using a join with a Reference Table enables you to evaluate impact before enrichment by searching for historical matches with existing traces.

You can use any fields, not just IP addresses. For example, by associating security traces with specific URLs from a reference table, you can identify which parts of your application are being targeted by attacks. This can help pinpoint vulnerabilities or high-risk areas within the application.

Examples:

- Investigation and incident response. You can upload and join using IPs or other fields from attacks and see the traffic related to that incident.
- By using security traces with the IP addresses from a Reference Table, such as associating IP addresses with geographic locations or organizational details, security teams can gain better context around attack attempts. This can help in understanding the origin and potential motivation behind the attacks.


To join a trace with a Reference Table:

1. Upload the Reference Table you want to use as described in [Uploading and enabling your own threat intel](#uploading-and-enabling-your-own-threat-intel).
2. To join a trace with a Reference Table, in [Traces][9], select **Add**, and then select **Join with Reference Table**.
3. In **Inner join with reference table**, select the Reference Table to use.
4. In **where field**, select the Datadog traces field to use for the join.
5. In **column**, select the Reference Table field to use for the join.

<!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_ref_join.png" alt="Your image description" style="width:100%;" >}} -->

## Enriching traces for detection rules

Enriching traces includes the threat intelligence attributes in AAP traces when the indicator of compromise matches the value of the `http.client_ip` key in the AAP trace. This enables searching for traces with threat intelligence matches using existing facets and using threat intelligence with detection rules.

[1]: /security/threat_intelligence
[2]: /integrations/guide/reference-tables
[3]: /security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/threat-intel
[6]: https://app.datadoghq.com/security/configuration/asm/rules/edit/kdb-irk-nua?product=appsec
[7]: /security/threat_intelligence#threat-intelligence-categories
[8]: /security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table
[14]: https://app.datadoghq.com/security/appsec/traces
