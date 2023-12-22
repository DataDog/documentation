---
title: Threat Intelligence
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-threat-intelligence/"
  tag: "Blog"
  text: "Accelerate security investigations with Datadog Threat Intelligence"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against threats with Datadog Application Security Management"
---

## Overview

Datadog provides built-in [threat intelligence][1] datasets for Application Security Management (ASM) and Cloud SIEM (Security Information and Event Management). This provides additional evidence to take action when security activity is observed.

Datadog curates threat intelligence into a standardized list of categories and intents. Intents include _benign_, _suspicious_, and _malicious_. Categories of threat intelligence include benign detections such as _corp\_vpn_ and malicious categories like _malware_. Upstream threat intelligence information is passed through for all threat intelligence sources, with limits based on threat intelligence payload size.

Datadog recommends the following methods for consuming threat intelligence:
1. Reducing detection rule thresholds for business logic threats such as credential stuffing. Users can clone the default [Credential Stuffing](https://app.datadoghq.com/security/configuration/asm/rules/view/wnp-zlu-woa) rule and modify it to meet their needs.
2. Using threat intelligence as a indicator of reputation with security activity.

Datadog recommends _against_ the following:
1. Blocking threat intelligence traces without corresponding security activity. IP addresses may have many hosts behind them. Detection of malware or a residential proxy means that the associated activity has been observed by a host behind that IP. It does not guarantee that the host running the malware or proxy is the same host communicating with your services.
2. Blocking on all threat intelligence categories, as this is inclusive of benign traffic from corporate VPNs and will block non-malicious traffic.

## Which sources are surfaced in ASM

- [Tor Exit Nodes](https://www.dan.me.uk/torlist/?exit)

To search for all traces flagged by a specific source, use the following query with the source name:

    @threat_intel.results.source.name:<SOURCE_NAME> 

To query for all traces containing threat intelligence from any source, use the following query:

    @appsec.threat_intel:true 

<div class="alert alert-info">
The query <code>@appsec.threat_intel:true</code> in the ASM traces tab is not equivalent to <code>@threat_intel.indicators_matched:*</code>. The <code>@threat_intel.indicators_matched:*</code> query contains values for every threat intelligence match, but the overall trace may not be resurfaced in ASM if there is no attack present and the source does not match one of the sources mentioned in the <strong>Which sources are surfaced in ASM</strong> section.
</div>

## Availability across Cloud SIEM, APM, and ASM

The table below shows the availability of threat intelligence information for Datadog services:

|Service|Other services in use|Description|
|---|---|---|
|APM| *None* or Cloud SIEM |Threat intelligence is not present.|
|APM| ASM |Threat intelligence is present the same way as in ASM.|
|Cloud SIEM| *Any* |Threat intelligence is present in matching logs.|
|ASM| *Any* |Only traces with attacks or `@appsec.threat_intel:true` are present. Every trace that matches a threat intelligence source contains the `@threat_intel` attribute.|

As seen in the table above, APM requires ASM to display threat intelligence. Also, Cloud SIEM may display logs with threat intelligence data, which are not surfaced in ASM for the same IP addresses.

## Threat intelligence in the user interface

When viewing the traces in the ASM Traces Explorer, you can see threat intelligence data under the `@appsec` attribute. The `category` and `security_activity` attributes are both set.

{{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="Example of the appsec attribute containing threat intelligence data">}}

Under `@threat_intel.results` you can always see the full details of what was matched from which source:

 {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="Example of the threat_intel attribute containing threat intelligence data">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/datadog-threat-intelligence/
