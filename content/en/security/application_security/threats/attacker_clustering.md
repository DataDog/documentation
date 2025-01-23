---
title: Attacker Clustering
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
  text: "In-App WAF Rules"
- link: "/security/application_security/threats/security_signals/"
  tag: "Documentation"
  text: "Security Signals"
---


## Overview

Attacker Clustering improves distributed attack blocking. Datadog Application Security Management (ASM) identifies security signal traffic attacker patterns and to help you mitigate distributed attacks more efficiently.

Attacker clustering highlights a set of common attributes shared by a significant portion of traffic and suggests blocking based on those attributes.

Blocking on attacker attributes means you keep your application or API protected even as the attacker rotates between IPs.

## What signals are used for attacker clusters?

The attacker clustering is computed for every [ASM security signal][4] emitted from a detection rule tagged with `category:account_takeover` or `category:fraud`

Out of the box, attacker clustering is computed for the ASM detection rules that detect API abuse, credential stuffing, or brute force attacks.

If you want the attacker clustering executed on custom detection rules, add these tags in the detection rule editor (see screenshot below).

{{< img src="security/application_security/threats/tag-on-detection-rule.png" alt="Screenshot of the Detection rule editor showing where to add tags"  >}}

## Attacker clustering attributes

Attacker clustering is computed using the following request attributes:
* Browser name
* Browser version
* OS name
* OS version
* User agent header
* [Datadog attacker fingerprinting][2]

When the attacker attributes are identified, they are displayed on the signal side panel and **Signals** page. Attacker attributes can be a combination of the attributes listed above.

{{< img src="security/application_security/threats/attacker-attributes.png" alt="Screenshot of an ASM signals with attacker attributes identified"  >}}

## Attacker clustering mechanism

The clustering algorithm analyzes the frequency of attributes in the attack traffic. It selects attributes that appear frequently while also filtering out typical traffic noise. This process results in attributes that can be blocked to stop or slow the attacker.

The algorithm tracks the changes in the attack traffic by identifying emerging trends as the attacker changes tactics (for example, changing headers, tool, etc.). The attacker cluster is updated with the latest traffic trends.

Traffic associated with threat intelligence is also considered in the clustering mechanism. The more an attribute is correlated with [Threat Intelligence][1], the higher the chance to create an attacker cluster around this attribute.

The attacker clustering attributes selected are then shown as regular expressions that can be used to block with ASM's [In-App WAF][3] or to filter out traffic in ASM Traces explorer for investigation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/threat-intelligence/
[2]: /security/application_security/threats/attacker_fingerprint
[3]: /security/application_security/threats/event_rules
[4]: /security/application_security/threats/security_signals/
