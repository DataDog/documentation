---
title: Attacker Clustering
disable_toc: false
aliases:
  - /security/application_security/threats/attacker_clustering
further_reading:
- link: "/security/application_security/security_signals/attacker_fingerprint"
  tag: "Documentation"
  text: "Attacker Fingerprint"
- link: "/security/application_security/how-it-works/threat-intelligence/"
  tag: "Documentation"
  text: "Threat Intelligence"
- link: "/security/application_security/policies/inapp_waf_rules/"
  tag: "Documentation"
  text: "In-App WAF Rules"
- link: "/security/application_security/security_signals/"
  tag: "Documentation"
  text: "Security Signals"
- link: "https://www.datadoghq.com/blog/attacker-clustering/"
  tag: "blog"
  text: "Detect and respond to evolving attacks with Attacker Clustering"
---


## Overview

Attacker Clustering improves distributed attack blocking. Datadog App and API Protection (AAP) identifies security signal traffic attacker patterns and to help you mitigate distributed attacks more efficiently.

Attacker clustering highlights a set of common attributes shared by a significant portion of traffic and suggests blocking based on those attributes.

Blocking on attacker attributes means you keep your application or API protected even as the attacker rotates between IPs.

## What signals are used for attacker clusters?

The attacker clustering is computed for every [AAP security signal][4] emitted from a detection rule tagged with `category:account_takeover` or `category:fraud`

Out of the box, attacker clustering is computed for the AAP detection rules that detect API abuse, credential stuffing, or brute force attacks.

If you want the attacker clustering executed on custom detection rules, add these tags in the detection rule editor (see screenshot below).

{{< img src="security/application_security/threats/tag-on-detection-rule.png" alt="Screenshot of the Detection rule editor showing where to add tags"  >}}

## Attacker clustering attributes

Attacker clustering is computed using the following request attributes:
* Browser name
* Browser version
* OS name
* OS version
* User agent header
* HTTP request headers (for example, `accept-encoding`, `content-type`)
* [Datadog attacker fingerprinting][2]

When the attacker attributes are identified, they are displayed on the signal side panel and **Signals** page. Attacker attributes can be a combination of the attributes listed above.

{{< img src="security/application_security/threats/attacker-attributes.png" alt="Screenshot of an AAP signals with attacker attributes identified"  >}}

### Custom HTTP request headers

If you want to use custom HTTP request headers for attacker clustering, they must be added under the path `@http.request.headers` in your traces. You can add custom headers to your traces by configuring the tracer with the `DD_TRACE_REQUEST_HEADER_TAGS` environment variable. For more information about this configuration, see [Configure the Datadog Tracing Library][5].

## Attacker clustering mechanism

The clustering algorithm analyzes the frequency of attributes in the attack traffic. It selects attributes that appear frequently while also filtering out typical traffic noise. This process results in attributes that can be blocked to stop or slow the attacker.

The algorithm tracks the changes in the attack traffic by identifying emerging trends as the attacker changes tactics (for example, changing headers, tool, etc.). The attacker cluster is updated with the latest traffic trends.

Traffic associated with threat intelligence is also considered in the clustering mechanism. The more an attribute is correlated with [Threat Intelligence][1], the higher the chance to create an attacker cluster around this attribute.

The attacker clustering attributes selected are then shown as regular expressions that can be used to block with AAP's [In-App WAF][3] or to filter out traffic in AAP Traces explorer for investigation.

## Custom attacker clustering

If the automatic attacker clustering detection fails to identify the appropriate attributes, you can manually create attacker clusters by selecting attributes from the trace analysis side panel.

To create a custom attacker cluster:

1. Open the trace analysis panel from a security signal.
2. Select the specific attributes that correspond to the attacker's patterns.
3. Create a cluster based on your selected attributes.

{{< img src="security/application_security/threats/create-custom-cluster.png" alt="The trace analysis panel with the create cluster from search button highlighted" >}}

This manual approach allows you to create more targeted blocking rules when the automatic detection doesn't capture the right patterns.

{{< img src="security/application_security/threats/custom-clusters.png" alt="An AAP signal with custom clusters sorted by the attacker attributes"  >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/how-it-works/threat-intelligence/
[2]: /security/application_security/security_signals/attacker_fingerprint
[3]: /security/application_security/security_signals/
[4]: /security/workload_protection/security_signals/
[5]: /tracing/trace_collection/library_config/
