---
title: Threat Intelligence
aliases:
  - /security/application_security/threats/threat-intelligence

further_reading:
  - link: "https://www.datadoghq.com/blog/cloud-siem-enterprise-security"
    tag: "Blog"
    text: "Datadog Cloud SIEM: Driving innovation in security operations"

---

## Overview

This topic describes [threat intelligence][1] for App and API Protection (AAP).

Datadog provides built-in threat intelligence [datasets][1] for AAP. This provides additional evidence when acting on security activity and reduces detection thresholds for some business logic detections. 

Additionally, AAP supports *bring your own threat intelligence*. This functionality enriches detections with business-specific threat intelligence. 

## Best practices

Datadog recommends the following methods for consuming threat intelligence:

1. Reducing detection rule thresholds for business logic threats such as credential stuffing. Users can clone the default [Credential Stuffing][6] rule and modify it to meet their needs.
2. Using threat intelligence as a indicator of reputation with security activity.

Datadog recommends _against_ the following:
1. Blocking threat intelligence traces without corresponding security activity. IP addresses might have many hosts behind them. Detection of a residential proxy means that the associated activity has been observed by a host behind that IP. It does not guarantee that the host running the malware or proxy is the same host communicating with your services.
2. Blocking on all threat intelligence categories, as this is inclusive of benign traffic from corporate VPNs and blocks unmalicious traffic.

## Filtering on threat intelligence in AAP

Users can filter threat intelligence on the Signals and Traces explorers using facets and the search bar.

To search for all traces flagged by a specific source, use the following query with the source name:

    @threat_intel.results.source.name:<SOURCE_NAME> 

To query for all traces containing threat intelligence from any source, use the following query:

    @appsec.threat_intel:true 

## Bring your own threat intelligence

AAP supports enriching and searching traces with threat intelligence indicators of compromise stored in Datadog reference tables. [Reference Tables][2] allow you to combine metadata with information already in Datadog.

For more information, see the [Bring Your Own Threat Intelligence][14] guide.


## Threat intelligence in the user interface

When viewing the traces in the AAP Traces Explorer, you can see threat intelligence data under the `@appsec` attribute. The `category` and `security_activity` attributes are both set.

<!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="Example of the appsec attribute containing threat intelligence data">}} -->

Under `@threat_intel.results` you can always see the full details of what was matched from which source.

 <!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="Example of the threat_intel attribute containing threat intelligence data">}} -->

[1]: /security/threat_intelligence/#threat-intelligence-sources
[2]: /integrations/guide/reference-tables
[3]: /security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/threat-intel
[6]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20defaultRuleId%3Adef-000-yk4
[7]: /security/threat_intelligence#threat-intelligence-categories
[8]: /security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table
[14]: /security/guide/byoti_guide
