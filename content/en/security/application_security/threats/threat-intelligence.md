---
title: Threat Intelligence
further_reading:
- link: "https://docs.datadoghq.com/security/threat_intelligence/"
  tag: "Documentation"
  text: "Threat Intelligence at Datadog"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against threats with Datadog Application Security Management"
---

## Overview

This topic describes [threat intelligence][1] for Application Security Management (ASM).

Datadog provides built-in threat intelligence [datasets][1] for ASM. This provides additional evidence when acting on security activity and reduces detection thresholds for some business logic detections. 

Additionally, ASM supports *bring your own threat intelligence*. This functionality enriches detections with business-specific threat intelligence. 

## Best practices

Datadog recommends the following methods for consuming threat intelligence:

1. Reducing detection rule thresholds for business logic threats such as credential stuffing. Users can clone the default [Credential Stuffing][6] rule and modify it to meet their needs.
2. Using threat intelligence as a indicator of reputation with security activity.

Datadog recommends _against_ the following:
1. Blocking threat intelligence traces without corresponding security activity. IP addresses might have many hosts behind them. Detection of a residential proxy means that the associated activity has been observed by a host behind that IP. It does not guarantee that the host running the malware or proxy is the same host communicating with your services.
2. Blocking on all threat intelligence categories, as this is inclusive of benign traffic from corporate VPNs and blocks unmalicious traffic.

## Filtering on threat intelligence in ASM

Users can filter threat intelligence on the Signals and Traces explorers using facets and the search bar.

To search for all traces flagged by a specific source, use the following query with the source name:

    @threat_intel.results.source.name:<SOURCE_NAME> 

To query for all traces containing threat intelligence from any source, use the following query:

    @appsec.threat_intel:true 

## Bring your own threat intelligence

ASM supports enriching and searching traces with threat intelligence indicators of compromise stored in Datadog reference tables. [Reference Tables][2] allow you to combine metadata with information already in Datadog.

### Storing indicators of compromise in reference tables

Threat intelligence is supported in the CSV format and requires the following columns:

**CSV Structure**

| field            | data  | description| required | example|
|------------------|-------|----|-----|--|
| ip_address       | text | The primary key for the reference table in the IPv4 dot notation format. | true | 192.0.2.1  |
| additional_data  | json      | Additional data to enrich the trace. | false | `{"ref":"hxxp://example.org"}`
| category         | text  | The threat intel [category][7]. This is used by some out of the box detection rules. | true | `residential_proxy` |
| intention        | text | The threat intel [intent][8]. This is used by some out of the box detection rules.| true | malicious | |
| source           | text  | The name of the source and the link to its site, such as your team and your teams wiki. | true| `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` | | 



The full list of supported categories and intents is available at [Threat Intelligence Facets][3].

<div class="alert alert-info">JSON in a CSV requires double quoting. The following is an example CSV.</div>

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

### Uploading and enabling your own threat intel

Datadog supports creating reference tables through a manual upload, or by periodically retrieving the data from [Amazon S3, Azure storage, or Google Cloud storage][10].

Notes:
- It can take 10 to 30 minutes to start enriching ASM traces after creating a table.
- If a primary key is duplicated, it is skipped and an error message about the key is displayed.

On a new [references table][4] page:

1. Name the table. The table name is referenced in ASM's **Threat Intel** config.
2. Upload a local CSV or import a CSV from a cloud storage bucket. The file is normalized and validated.
3. Preview the table schema and choose the IP address as the Primary Key.
   
   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table.png" alt="New reference table" style="width:100%;" >}}
4. Save the table.
5. In [Threat Intel][5], locate the new table, and then select the toggle to enable it. 
   
   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table_enabled.png" alt="Enabled reference table" style="width:100%;" >}}

#### Using cloud storage

When the reference table is created from cloud storage, it is refreshed periodically. The entire table is *replaced*. Data is not merged.

See the related reference table documentation for:
- [Amazon S3][11]
- [Azure storage][12]
- [Google Cloud storage][13]

#### Troubleshooting cloud imports

If the reference tables are not refreshing, select the **View Change Events** link from the settings on the reference table detail page. 

**View Change Events** opens a page in **Event Management** showing potential error events for the ingestion. You can also filter in **Event Management** using the reference table name.

<div class="alert alert-info">In Datadog Event Management, it can look like the data is fetched from the cloud, but it can take a few more minutes to propagate those changes to Threat Intellegence.</div>

Other useful cloud import details to remember:

- The expected latency before updated enrichments are available when a source is uploaded or updated is 10 to 30 minutes.
- How to know when the updates are applied: The changes are visible in the reference table or in the spans. Select the **View Change Events** link from settings on the reference table detail page to see the related events.
- The update replaces the *entire table* with the new data. 
- In case of a duplicated primary key, the rows with the duplicated key are not written, and an error is shown in the reference table detail page.

### Filter traces by joining the list with a Reference Table

You can filter ASM traces in Datadog by joining a trace table with a Reference Table. 

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

{{< img src="security/application_security/threats/threat_intel/threat_intel_ref_join.png" alt="Your image description" style="width:100%;" >}}

### Enriching traces for detection rules

Enriching traces includes the threat intelligence attributes in ASM traces when the indicator of compromise matches the value of the `http.client_ip` key in the ASM trace. This enables searching for traces with threat intelligence matches using existing facets and using threat intelligence with detection rules.



## Threat intelligence in the user interface

When viewing the traces in the ASM Traces Explorer, you can see threat intelligence data under the `@appsec` attribute. The `category` and `security_activity` attributes are both set.

{{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="Example of the appsec attribute containing threat intelligence data">}}

Under `@threat_intel.results` you can always see the full details of what was matched from which source:

 {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="Example of the threat_intel attribute containing threat intelligence data">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threat_intelligence/#threat-intelligence-sources
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
