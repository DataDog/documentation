---
title: Attacker Clustering
aliases:
  - /security/application_security/threats/attacker_clustering
disable_toc: false
further_reading:
- link: "/security/application_security/threats/attacker_fingerprint"
  tag: "Documentation"
  text: "Attacker Fingerprint"
- link: "/security/application_security/threats/threat-intelligence/"
  tag: "Documentation"
  text: "Threat Intelligence"
- link: "/security/application_security/threats/event_rules"
  tag: "Documentation"
  text: "In-app WAF Rules"
- link: "/security/application_security/threats/security_signals/"
  tag: "Documentation"
  text: "Security Signals"
---

This topic describes how to use **Attacker Clustering** to block more efficiently distributed attacks.

## Overview

Datadog Application Security Management (ASM) analyses traffic of security signals to find attacker patterns and help you mitigate distributed attacks more efficiently. Attacker clustering highlights a set of common attributes that is shared by a significant portion of the traffic and suggests blocking on those.

Blocking on attacker attributes means you keep your application or API protected even as the attacker rotates between IPs.

## For which signals are attacker clusters computed?

The attacker clustering is computed for every [ASM security signal][4] being emitted from a detection rule tagged with the following:
`category:account_takeover` or `category:fraud`

Out of the box, the attacker clustering will be computed for the ASM detection rules that detect API abuse, credential stuffing or brute force attacks.

If you create custom detection rules and want the attacker clustering to be executed, do not forget to add such tags in the detection rule editor (see screenshot below).

{{< img src="security/application_security/threats/tag-on-detection-rule.png" alt="Screenshot of the Detection rule editor showing where to add tags"  >}}

## Attacker Clustering Attributes

Attacker clustering is computed on the following request attributes of requests:
* Browser name & version
* OS name & version
* ASN number
* ASN domain
* User agent header
* [Threat Intelligence][1]
* [Datadog attacker fingerprinting][2]

When the attacker attributes are identified, we show them on the signal side panel and signal full page.

{{< img src="security/application_security/threats/attacker-attributes.png" alt="Screenshot of an ASM signals with attacker attributes identified"  >}}

## Attacker Clustering Mechanism

The clustering algorithm analyzes frequency of attributes in the traffic of the attack. It selects attributes that appear frequently while also filtering out the noise from your usual traffic. The goal being to suggest an attribute that can be blocked on to stop or slow the attacker down.

The algorithm  tracks the changes in the attack traffic by identifying emerging trends as the attacker changes tactics (ie. change of headers, tool). The attacker cluster gets updated accordingly to the latest traffic trends.

Traffic associated with threat intelligence also weights into the clustering mechanism. The more an attribute is correlated with threat intelligence the higher the chance to create an attacker cluster around this attribute.

The attacker clustering attributes selected are then shown as regular expressions that can be used to block with ASM's [in-app WAF][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/threat-intelligence/
[2]: /security/application_security/threats/attacker_fingerprint
[3]: /security/application_security/threats/event_rules
[4]: /security/application_security/threats/security_signals/
