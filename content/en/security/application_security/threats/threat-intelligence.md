---
title: Threat Intelligence
kind: documentation
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

Datadog provides built-in [threat intelligence][1] datasets for ASM. This provides additional evidence when acting on security activity and reduces detection thresholds for some business logic detections. 

Additionally, ASM supports *bring your own threat intel* (private beta). This functionality enriches detections with business-specific threat intelligence. 

Datadog curates threat intelligence into a standardized list of categories and intents. Intents include _benign_, _suspicious_, and _malicious_. 

Categories of threat intelligence include benign detections such as _corp\_vpn_ and malicious categories like _botnet_proxy_. 

Upstream threat intelligence information is passed through for all threat intelligence sources, with limits based on threat intelligence payload size.

Datadog recommends the following methods for consuming threat intelligence:

1. Reducing detection rule thresholds for business logic threats such as credential stuffing. Users can clone the default [Credential Stuffing](https://app.datadoghq.com/security/configuration/asm/rules/view/wnp-zlu-woa) rule and modify it to meet their needs.
2. Using threat intelligence as a indicator of reputation with security activity.

Datadog recommends _against_ the following:
1. Blocking threat intelligence traces without corresponding security activity. IP addresses might have many hosts behind them. Detection of a residential proxy means that the associated activity has been observed by a host behind that IP. It does not guarantee that the host running the malware or proxy is the same host communicating with your services.
2. Blocking on all threat intelligence categories, as this is inclusive of benign traffic from corporate VPNs and blocks unmalicious traffic.

## Filtering on Threat Intelligence in ASM

Users can filter threat intelligence on the Signals and Traces explorers using facets and the search bar.

To search for all traces flagged by a specific source, use the following query with the source name:

    @threat_intel.results.source.name:<SOURCE_NAME> 

To query for all traces containing threat intelligence from any source, use the following query:

    @appsec.threat_intel:true 

## Bring your own threat intel

<div class="alert alert-info">Bring your own threat intel is in private beta.</div>

ASM supports enriching and searching traces with threat intel indicators of compromise stored in Datadog reference tables. [Reference Tables][2] allow you to combine metadata with information already in Datadog.

### Storing indicators of compromise in reference tables

Threat intel is supported in the CSV format and requires 4 columns.

**CSV Structure**

| field            | data  | description| required | example|
|------------------|-------|----|-----|--|
| ip_address       | text | The primary key for the reference table in the IPv4 dot notation format. | true | 192.0.2.1  |
| additional_data  | json      | Additional data to enrich the trace. | false | `{"ref":"hxxp://example.org"}`
| category         | text  | The threat intel category. This is used by some out of the box detection rules. | true | `residential_proxy` |
| intention        | text | The threat intel intent. This is used by some out of the box detection rules.| true | malicious | |
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

On a new [references table][4] page:

1. Name the table. The table name will be referenced in ASM's **Threat Intel** config.
2. Upload a CSV.
3. Preview the table schema and choose the IP address as the Primary Key.
   
   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table.png" alt="New reference table" style="width:100%;" >}}
4. Save the table.
5. In [Threat Intel][5], locate the new table, and then select the toggle to enable it. 
   
   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table_enabled.png" alt="Enabled reference table" style="width:100%;" >}}


### Enriching traces for detection rules

Enriching traces includes the threat intel attributes in ASM traces when the indicator of compromise matches the value of the `http.client_ip` key in the ASM trace. This enables searching for traces with threat intel matches using existing facets and using threat intel with detection rules.



## Threat intelligence in the user interface

When viewing the traces in the ASM Traces Explorer, you can see threat intelligence data under the `@appsec` attribute. The `category` and `security_activity` attributes are both set.

{{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="Example of the appsec attribute containing threat intelligence data">}}

Under `@threat_intel.results` you can always see the full details of what was matched from which source:

 {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="Example of the threat_intel attribute containing threat intelligence data">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threat_intelligence
[2]: /integrations/guide/reference-tables
[3]: /security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/asm/threat-intel