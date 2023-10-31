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

Datadog provides built-in [threat intelligence][1] datasets for some services such as Application Security Management (ASM) and Cloud SIEM (Security Information and Event Management).

The Threat Intelligence data typically contains a source and a category. Different sources categorize IP addresses as known attackers, or as originating from a residential proxy, VPN, or so on.

In ASM, the Threat Intelligence data is used in two ways:

- If a high fidelity threat intelligence source categorizes a request as being made by a known attacker, this request is surfaced in ASM *even in the absence of an actual attack*. This can serve as an early warning sign that a known attacker is looking at your services.
- If a request contains any attack, it is surfaced in ASM. Threat intelligence here can provide additional context when investigating traces.

If you use ASM, threat intelligence data is also available in APM traces. 

## Which sources are surfaced in ASM

Threat intelligence matches from any of the following sources are surfaced in ASM even in the absence of attacks:

- minerstat
- abuse.ch
- FireHOL
- spur (only the `malware` category)
- Tor Exit Nodes

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
