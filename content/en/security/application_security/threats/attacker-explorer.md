---
title: Attacker Explorer
disable_toc: false
further_reading:
- link: "/security/application_security/threats/protection"
  tag: "Documentation"
  text: "Protection"
---
 
This topic describes how to use **Attacker Explorer** to investigate and block Flagged Attackers.

## Overview

Datadog Application Security Management (ASM) identifies attackers as suspicious and flagged. With [Attacker Explorer][1], you can investigate and take action against the attackers. 


### Definitions

- **Suspicious Attackers:** IP addresses that have sent attack traffic in the last 24 hours up to a maximum threshold.

- **Flagged Attackers:** IP addresses that have sent attack traffic, exceeding the threshold of Suspicious Attackers, in the last 24 hours. Flagged Attackers should be reviewed and blocked.

<div class="alert alert-info"><strong>Flagged Attackers</strong> and <strong>Suspicious Attackers</strong> are mutually exclusive. An IP cannot be in both states at the same time.</a></div>

### How Attacker Explorer differs from Signal and Trace explorers

To understand the difference between the different explorers, review these approaches:

- **Protect:** Automated blocking using ASM Protection configuration. Customers should block attack tools as their first automated blocking action. Blocking attack tools reduces common vulnerability discovery for OWASP threats such as SQLi, command injection, and SSRF.
- **Reactive:** Blocking using Signals or Attackers explorer in response to observed threats.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_nav.png" alt="Screenshot of the ASM Attacker Explorer navigation"  >}}

Each explorer focuses on a specific use case:

- **Signal Explorer**: List of actionable alerts such as Credential Stuffing Attack or Command Injection. Signals have workflow capabilities, a description, severity, and correlated Traces. Interactions include user assignment workflows, automated protection, analytics, search, and pivoting to Trace Explorer.
- **Trace Explorer**: List of evidence for business logic events, such as logins, or attack payloads. Interactions include analytics and search.
- **Attacker Explorer**: List of Flagged and Suspicious Attackers. Interactions include: 
  - Bulk actions for attacker analytics and blocking
  - Drill-down into the history of any attacker
  - Search
  - Pivoting to other explorers  


### Explore and filter attackers

To start reviewing attackers, go to [Attacker Explorer][1].

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_default_view2.png" alt="ASM Attacker Explorer"  >}}

There are two sections to the Attacker Explorer:

1. Facets and search. These enable you to filter traffic by service or attacker attributes. 
2. The list of attackers with security metrics.


### Investigate an IP

Click on any row to view the history and attributes of the IP.

{{< img src="security/application_security/threats/attacker-explorer/ip_drawer.png" alt="Investigate and IP address with ASM Attacker Explorer"  >}}

IPs can be blocked or added to the Passlist from the IP drawer.

### Best practices for blocking with Attacker Explorer

1. Account takeover attacks: Use short durations for blocking IP addresses.
2. Add authorized scanners to monitored passlists to observe activity but prevent blocking.
3. Block mobile ISPs with caution. These networks might have large numbers of users and mobile devices behind single IP addresses.

## Block individual IPs

To block an individual IP temporarily or permanently, do the following:

{{< img src="security/application_security/threats/attacker-explorer/block_ip_address.png" alt="Block an IP address with ASM Attacker Explorer"  >}}

1. Click `Block` on the row.
2. Choose a blocking duration.

## Block IPs in bulk

You can select multiple IPs and block them temporarily or permanently using the Attacker Explorer's **Compare and Block** option. 

**Compare and Block** provides metrics about the IPs to help you block with safety and confidence. For example, **Similarity Overview** and **Activity**, described later in this topic.

To compare and block IPs in bulk, do the following:
1. Filter the list of Attackers with a search or facets.
2. Select multiple IPs.
3. Select the **Compare and Block** option.
    
    In the following example, the selected IPs are from the same location and appear to be related. The **Compare and Block** option opens the **Block selected attackers** view, showing metrics and attributes for the selected IP addresses.

    {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="Screenshot of the ASM Attacker Explorer group blocking"  >}}

4. To block attackers, click **Block**.

## Block selected attackers metrics

When you select the **Compare and Block** option, the **Block selected attackers** view opens, showing metrics and attributes for the selected IP addresses.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="Screenshot of the ASM Attacker Explorer group blocking"  >}}

<div class="alert alert-info">Metrics for <strong>Similarity Overview</strong> and <strong>Activity</strong> are scoped to the last 30 days.</a></div>

The **Block selected attackers** view metrics are explained in the following sections.

### Selected IPs

Contains the IPs selected from the explorer. Deselecting an IP removes it from the metrics sections and **Block** action.

### Similarity overview

Each column exists to help block with confidence and safety. The provided attributes are also used by ASM's Attacker Similarity feature.

ASNs
: Autonomous System Numbers. Attacks with large numbers of IP addresses might originate from the same ASN, especially when attacks originate from data centers and cloud IPs.

User Agents
: Attackers, commercial scanners, and your own software might use predictable user agents that can help qualify what should be included or excluded from blocking.

Location
: Companies might have policies or serviceable markets that determine what countries they allow traffic from.

Domain
: The owner of the ASN. This is helpful when an organization owns multiple ASNs.

Users per IPs
: The number of users who have authenticated from the IP. IPs with large numbers of logins might indicate a load balancer or many users from the same location, like a company site.

### Activity

The time scope for activity is 30 days.

#### Signals

The signals associated with the IP addresses over the selected time.

#### Traces

The traces associated with the IP addresses over the selected time. 

Benign traffic is sampled APM traffic which are traces without business logic or attack traffic detections.

Attack traffic is all ASM traces, inclusive of business logic.

### Block

This adds the IP addresses to the [Denylist][2] for the specified duration.

 
[1]: https://app.datadoghq.com/security/appsec/attackers
[2]: https://app.datadoghq.com/security/appsec/denylist
[3]: https://app.datadoghq.com/security/appsec/passlist
