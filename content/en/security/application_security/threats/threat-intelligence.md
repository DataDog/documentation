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

Datadog provides built-in [threat intelligence][1] datasets for some services such as Application Security Management (ASM), or Cloud SIEM.

The Threat Intelligence data typically contains a source and a category. Different sources categorize IP addresses as known attackers, or as originating from a residential proxy, VPN, or so on.

In ASM the Threat Intelligence data is used in two ways:

- If a high fidelity threat intelligence source categorizes a request as being made by a known attacker, this request is surfaced in ASM *even in the absence of an actual attack*. This can serve as an early warning sign that a known attacker is looking at your services.
- If a request contains any attack, it is surfaced in ASM. Threat intelligence here can provide additional context when investigating traces.

For ASM customers threat intelligence data will be available also in APM traces. 

## Which feeds will be surfaced in ASM

Threat intelligence matches from any of the following sources will be surfaced in ASM even without any attacks present:

- minerstat
- abuse.ch
- FireHOL
- spur (only subcategory `malware`)
- Tor Exit Nodes

To search for all traces flagged by a specific source you can use the following query:

    @threat_intel.results.source.name:FireHOL 

Replace FireHOL by the source name you are interested in.
Replace `FireHOL` by the source name you are interested in.
If you wish to know which traces contain significant threat intelligence, but don't care about the source
specifically, you can use the following query:

    @appsec.threat_intel:true 

<div class="alert alert-info">
Note that the query <code>@appsec.threat_intel:true</code> is not equivalent to looking at the <code>@threat_intel.indicators_matched:*</code> attribute. The latter contains values for every threat intelligence match. This attribute can contain values, but the overall trace might not be resurfaced in ASM if there is no attack present, and the source does not match one of the sources mentioned previously.
</div>

## Behaviour across Cloud SIEM, APM, and ASM

These Datadog products each may contain threat intelligence information. The behaviour can vary depending on which products you are using.

|Product|Other products in use|Description|
|---|---|---|
|APM| *None* or Cloud SIEM |Threat intelligence will not be present.|
|APM| ASM |Threat intelligence will be present the same way as in ASM.|
|Cloud SIEM| *Any* |Threat intelligence will be present in every log.|
|ASM| *Any* |Only traces with attacks or `@appsec.threat_intel:true` will be present. Every trace that matche any threat intelligence source will contain the `@threat_intel` attribute.|

In other words, this table means that:

- APM requires ASM to display threat intelligence
- Cloud SIEM may display logs with threat intelligence data, which is not surfaced in ASM for the same IP addresses

## Threat intelligence in the user interface

When viewing the traces in the UI, you can see threat intelligence data under the `@appsec` attribute. The `category`, and `security_activity` will be set.

{{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="Example of the appsec attribute containing threat intelligence data">}}

Under `@threat_intel.results` you can always see the full details of what was matched from which source:

 {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="Example of the threat_intel attribute containing threat intelligence data">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/datadog-threat-intelligence/
