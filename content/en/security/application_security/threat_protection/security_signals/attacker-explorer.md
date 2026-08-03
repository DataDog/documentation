---
title: Attackers Explorer
disable_toc: false
aliases:
  - /security/application_security/security_signals/attacker-explorer/
  - /security/application_security/threats/attacker-explorer
further_reading:
- link: "/security/application_security/threat_protection/policies"
  tag: "Documentation"
  text: "Protection"
---
 

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

This topic describes how to use {{< ui >}}Attackers Explorer{{< /ui >}} to investigate and block Flagged Attackers.

## Overview

Datadog App and API Protection (AAP) identifies attackers as suspicious and flagged. With [Attackers Explorer][1], you can investigate and take action against the attackers. 


### Definitions

- **Suspicious Attackers:** IP addresses that have sent attack traffic in the last 24 hours up to a maximum threshold.

- **Flagged Attackers:** IP addresses that have sent attack traffic, exceeding the threshold of Suspicious Attackers, in the last 24 hours. Flagged Attackers should be reviewed and blocked.

<div class="alert alert-info"><strong>Flagged Attackers</strong> and <strong>Suspicious Attackers</strong> are mutually exclusive. An IP cannot be in both states at the same time.</a></div>

### How Attackers Explorer differs from Signal and Trace explorers

To understand the difference between the different explorers, review these approaches:

- **Protect:** Automated blocking using AAP Protection configuration. Customers should block attack tools as their first automated blocking action. Blocking attack tools reduces common vulnerability discovery for OWASP threats such as SQLi, command injection, and SSRF.
- **Reactive:** Blocking using Signals or Attackers explorer in response to observed threats.

<!-- {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_nav.png" alt="Screenshot of the AAP Attackers Explorer navigation"  >}} -->

Each explorer focuses on a specific use case:

- **Signal Explorer**: List of actionable alerts such as Credential Stuffing Attack or Command Injection. Signals have workflow capabilities, a description, severity, and correlated Traces. Interactions include user assignment workflows, automated protection, analytics, search, and pivoting to Trace Explorer.
- **Trace Explorer**: List of evidence for business logic events, such as logins, or attack payloads. Interactions include analytics and search.
- **Users Explorer**: Lists authenticated users associated with one or more traces. Interactions include: 
  - Bulk actions for user analytics and blocking
  - Drill-down into the history of any user
  - Search
  - Pivoting to other explorers
- **Attackers Explorer**: List of Flagged and Suspicious Attackers. Interactions include: 
  - Bulk actions for attacker analytics and blocking
  - Drill-down into the history of any attacker
  - Search
  - Pivoting to other explorers  


### Explore and filter attackers

To start reviewing attackers, go to [Attackers Explorer][1].

<!-- {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_default_view2.png" alt="AAP Attackers Explorer"  >}} -->

There are two sections to the Attackers Explorer:

1. Facets and search. These enable you to filter traffic by service or attacker attributes. 
2. The list of attackers with security metrics.


### Investigate an attacker

1. In {{< ui >}}View by{{< /ui >}}, click {{< ui >}}IP{{< /ui >}}, {{< ui >}}User Agent{{< /ui >}}, {{< ui >}}ASN{{< /ui >}}, or {{< ui >}}Cluster{{< /ui >}}.
2. Click on any row to view the details pane for the attacker.

<!-- {{< img src="security/application_security/threats/attacker-explorer/ip_drawer.png" alt="Investigate and IP address with AAP Attackers Explorer"  >}} -->

An attacker can be blocked or added to the Passlist from its details.

### Attacker details

Details common to all attacker views:

- {{< ui >}}Blocking Status{{< /ui >}}: Indicates whether the attacker IP is actively being blocked, helping you confirm if immediate action is needed.
- {{< ui >}}Threat Intelligence{{< /ui >}}: Show Datadog definitions **Suspicious** or **Flagged**.
- {{< ui >}}Last Information{{< /ui >}}: Provides contextual network origin (for example, route, public/private status, geolocation), which helps you understand attacker infrastructure and scope.
- {{< ui >}}Associated Users{{< /ui >}}: Shows which user accounts (if any) were affected or linked to the IP, assisting with lateral movement tracking and potential account compromise identification.
- {{< ui >}}Security Traces{{< /ui >}}: Visualizes the timeline and volume of suspicious activity (for example, **151k AAP traces**), helping SOC teams correlate events and identify peaks in attack behavior.

View-specific details:

- IP:
  - {{< ui >}}Threat Intel{{< /ui >}}: See [Threat Intelligence][4].
  - {{< ui >}}History{{< /ui >}}: Displays past activity to detect patterns or repeated attacks.
  - {{< ui >}}Associated Users{{< /ui >}}: Identifies user accounts associated with the IP.
  - {{< ui >}}Endpoint Requests{{< /ui >}}: Lists HTTP requests to reveal attack methods or targets.
  - {{< ui >}}Signals{{< /ui >}}: Displays triggered detections to assess threat severity.
  - {{< ui >}}Clusters{{< /ui >}}: Points to affected app clusters to gauge impact scope.
  - {{< ui >}}Top User Agents{{< /ui >}}: Lists the most frequent user agents used by the attacker (for example, scripts, scanners, or browsers), helping to identify automation tools or custom clients involved in the attack.
- User Agent:
  - {{< ui >}}Associated IPs{{< /ui >}}: Displays IPs using the same User Agent, with trace counts and recent activity bars per IP.
  - {{< ui >}}Associated Users{{< /ui >}}: Lists user accounts tied to this User Agent, helping detect possible account compromise.
  - {{< ui >}}Blocking History{{< /ui >}}: Shows past blocks on the User Agent, useful for spotting repeated offenses.
  - {{< ui >}}Endpoint Requests{{< /ui >}}: Detail which endpoints were targeted and how often.
  - {{< ui >}}Signals{{< /ui >}}: Shows triggered alerts from this User Agent, flagging rule violations or suspicious behavior.
- ASN:
  - {{< ui >}}AS{{< /ui >}}: Identifies the Autonomous System, helping to trace malicious traffic back to its network owner or hosting provider.
  - {{< ui >}}Signals{{< /ui >}}: Shows the volume and severity of security alerts (for example, CRITICAL, HIGH), indicating how active or threatening the ASN's traffic is.
  - {{< ui >}}Services{{< /ui >}}: Lists affected services and environments, helping you understand which parts of the infrastructure are being targeted.
  - {{< ui >}}Last activity{{< /ui >}}: Indicates the most recent time malicious activity was observed from this ASN, helping prioritize investigation of current threats.
  - {{< ui >}}Traffic Distribution{{< /ui >}}: Visualizes the proportion of normal vs suspicious traffic, helping analysts assess if an ASN is primarily used for attacks or mixed usage.
- Cluster:
  - {{< ui >}}Similarity Overview{{< /ui >}}: Shows shared attributes across IPs, user agents, locations, and domains.
    - {{< ui >}}IPs per ASN{{< /ui >}}: Identifies autonomous systems used by attackers.
    - {{< ui >}}IPs per User Agent{{< /ui >}}: Detects automation, spoofing, or reuse across campaigns.
    - {{< ui >}}IPs per Location{{< /ui >}}: Identifies geographic distribution of attacking IPs.
    - {{< ui >}}IPs per Domain{{< /ui >}}: Traces attacker infrastructure and detects suspicious domains.
  - {{< ui >}}Threat Intel Category{{< /ui >}}: Classifies the type of threat.
  - {{< ui >}}Threat Intel Intention{{< /ui >}}: Indicates the likely purpose of the malicious activity.
  - {{< ui >}}Users per IP{{< /ui >}}: Measures breadth of compromise or impersonation.
  - {{< ui >}}Services{{< /ui >}}: Identifies impacted services and environments.
  - {{< ui >}}Cluster Activity{{< /ui >}}: Displays behavioral trends and enables trace inspection.


### Best practices for blocking with Attackers Explorer

1. Account takeover attacks: Use short durations for blocking IP addresses.
2. Add authorized scanners to monitored passlists to observe activity but prevent blocking.
3. Block mobile ISPs with caution. These networks might have large numbers of users and mobile devices behind single IP addresses.

## Block individual IPs

To block an individual IP temporarily or permanently, do the following:

{{< img src="security/application_security/threats/attacker-explorer/block_ip_address.png" alt="Block an IP address with AAP Attackers Explorer"  >}}

1. Click {{< ui >}}Block{{< /ui >}} on the row.
2. Choose a blocking duration.

## Block IPs in bulk

You can select multiple IPs and block them temporarily or permanently using the {{< ui >}}Attackers Explorer{{< /ui >}}'s {{< ui >}}Compare and Block{{< /ui >}} option.

{{< ui >}}Compare and Block{{< /ui >}} provides metrics about the IPs to help you block with safety and confidence. For example, {{< ui >}}Similarity Overview{{< /ui >}} and {{< ui >}}Activity{{< /ui >}}, described later in this topic.

To compare and block IPs in bulk, do the following:
1. Filter the list of Attackers with a search or facets.
2. Select multiple IPs.
3. Select the {{< ui >}}Compare and Block{{< /ui >}} option.

    In the following example, the selected IPs are from the same location and appear to be related. The {{< ui >}}Compare and Block{{< /ui >}} option opens the {{< ui >}}Block selected attackers{{< /ui >}} view, showing metrics and attributes for the selected IP addresses.

    {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="Screenshot of the AAP Attackers Explorer group blocking"  >}}

4. To block attackers, click {{< ui >}}Block{{< /ui >}}.

## Block selected attackers metrics

When you select the {{< ui >}}Compare and Block{{< /ui >}} option, the {{< ui >}}Block selected attackers{{< /ui >}} view opens, showing metrics and attributes for the selected IP addresses.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="Screenshot of the AAP Attackers Explorer group blocking"  >}}

<div class="alert alert-info">Metrics for <strong>Similarity Overview</strong> and <strong>Activity</strong> are scoped to the last 30 days.</a></div>

The {{< ui >}}Block selected attackers{{< /ui >}} view metrics are explained in the following sections.

### Selected IPs

Contains the IPs selected from the explorer. Deselecting an IP removes it from the metrics sections and **Block** action.

### Similarity overview

Each column exists to help block with confidence and safety. The provided attributes are also used by AAP's Attacker Similarity feature.

{{< ui >}}ASNs{{< /ui >}}
: Autonomous System Numbers. Attacks with large numbers of IP addresses might originate from the same ASN, especially when attacks originate from data centers and cloud IPs.

{{< ui >}}User Agents{{< /ui >}}
: Attackers, commercial scanners, and your own software might use predictable user agents that can help qualify what should be included or excluded from blocking.

{{< ui >}}Location{{< /ui >}}
: Companies might have policies or serviceable markets that determine what countries they allow traffic from.

{{< ui >}}Domain{{< /ui >}}
: The owner of the ASN. This is helpful when an organization owns multiple ASNs.

{{< ui >}}Users per IPs{{< /ui >}}
: The number of users who have authenticated from the IP. IPs with large numbers of logins might indicate a load balancer or many users from the same location, like a company site.

### Activity

The time scope for activity is 30 days.

#### Signals

The signals associated with the IP addresses over the selected time.

#### Traces

The traces associated with the IP addresses over the selected time. 

Benign traffic is sampled APM traffic which are traces without business logic or attack traffic detections.

Attack traffic is all AAP traces, inclusive of business logic.

### Block

This adds the IP addresses to the [Denylist][2] for the specified duration.

 
[1]: https://app.datadoghq.com/security/appsec/attackers
[2]: https://app.datadoghq.com/security/appsec/denylist
[3]: https://app.datadoghq.com/security/appsec/passlist
[4]: /security/threat_intelligence
