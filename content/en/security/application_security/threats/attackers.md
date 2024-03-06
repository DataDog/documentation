---
title: Attackers
kind: documentation
---

# Understanding Attackers

ASM classifies IP addresses as
Benign
Suspicious
Flagged

ASM additionally clusters IPs with similar attributes together.

Benign: Traffic from APM that has not recently sent attack traffic

Suspicious: A precursor to Flagged IPs. These IPs have met a minimum threshold of attack traffic to be classified as suspicious, but not the threshold for Flagged.

Flagged: IP’s that send large amounts of attack traffic. We recommend blocking Flagged IPs.

Suspicious and Flagged are available as facets. Benign traffic is shown when evaluating the impact of blocking an IP.

{{< img src="security/application_security/threats/attackers/attacker_explorer_default_view.png" alt="Screenshot of the ASM Attacker Explorer"  >}}

# Clusters
{insert blurb on clusters}

# Relationship to Signals and Traces
Evidence of an attack is visible on the Trace Explorer, which identifies specific payloads that are threats.

Signals correlate traces into actionable alerts.

Attack Explorer identifies attackers with persistent threats which may cross multiple Signals.

# Reviewing Attackers

Filter by Flagged Attackers, the default view.

{{< img src="security/application_security/threats/attackers/attacker_explorer_default_view.png" alt="Screenshot of the default view of the ASM Attacker Explorer."  >}}

You can review individual or groups of IP addresses.

{{< img style="width:75%;" src="security/application_security/threats/attackers/attacker_explorer_review_groups.png" alt="View with multiple IPs selected, showing the potential impact from blocking. "  >}}

# Blocking lifecycle

## Reactive

Select any IP and choose a block duration. 

## Proactive

Customers should block Attack Tools as their first automated blocking action. {link to this} Blocking Attack Tools reduces common vulnerability discovery for OWASP threats such as SQLi, command injection, and SSRF.

Customers who are already blocking Attack Tools should also block Flagged IPs.

## Best practices for blocking

- Short durations between 1 hour and 24 hours are recommended for blocking IP addresses.
- Add authorized scanners to Trusted IPs to prevent blocking.
- Identifying load balancer and proxies for correct `X-Forwarded-For` headers.
- Block mobile ISPs with caution, these networks may have large numbers of users and mobile devices behind single IP addresses
- Post review, customers should start blocking Flagged IPs.


# Appendix

## Definitions

Benign [entity]
: A benign IP is an IP that has not sent attack traffic

Suspicious [entity]
: A suspicious IP is a precursor to Flagged IPs. It has met a minimum threshold of attack traffic to be tagged as suspicious but not the minimum threshold for Flagged IPs. There are three inputs to being classified as Suspicious, duration, quantity, and the type of attack traffic.

Flagged [entity]
: A Flagged IPs has sent a large quantity of attack traffic. It should be blocked. There are three inputs to being classified as Suspicious, duration, quantity, and the type of attack traffic. 

Blocked [entity]
: 
