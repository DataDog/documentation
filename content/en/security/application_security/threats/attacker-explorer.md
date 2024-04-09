---
title: Attackers Explorer
kind: documentation
---

This topic describes how to use the Attackers Explorer to investigate and block Flagged IPs.

## Overview

Datadog Application Security Management (ASM) identifies attackers using Flagged IPs. Flagged IPs are IPs that have exceeded thresholds for abuse. Customers can pivot, investigate, and take action against the attackers Datadog identifies using [Attackers Explorer][1]. 

### How Attackers differs from Signals and Traces

APM Attacks contains the **Signals**, **Traces**, and **Attackers** explorers. Each of the explorers focus on a specific use case:

- **Traces** are the evidence for business logic events, such as logins, or attack payloads, such as command injection. All ASM traces have an IP address.
- **Signals** are traces that are correlated into an actionable alert and assigned a severity. Each signal contains multiple traces.
- **Attackers** enables you to interact with large numbers of IP addresses and perform the following use cases:
  - Evaluate an IP across **Signals** and **Traces** and pivot to other explorers.
  - Drill down into meaningful IP attributes and the history of the IP's interactions with your services.
  - Block an IP with safety and confidence.

### Blocking methods

ASM uses two methods when blocking traffic:

- **Protect:** Automated blocking using ASM Protection configuration.
  Customers should block Attack Tools as their first automated blocking action. {link to this} Blocking Attack Tools reduces common vulnerability discovery for OWASP threats such as SQLi, command injection, and SSRF.
- **Reactive:** Blocking using Signals or Attackers Explorer in response to observed threats.

### Best practices for blocking

1. In the Attackers Explorer time selector, use short durations for blocking IP addresses. Between 15 minutes and 1 hour are recommended. 
2. Add authorized scanners to monitored passlists to observe activity but prevent blocking.
3. Identifying load balancers and proxies for correct `X-Forwarded-For` headers.
4. Block mobile ISPs with caution. These networks might have large numbers of users and mobile devices behind single IP addresses.

## Explore and filter attackers

To start reviewing attackers, go to [Attackers Explorer][1].

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_default_view.png" alt="ASM Attacker Explorer"  >}}

There are three sections to the Attackers Explorer:

1. Metrics, displayed in **Suspicious Attackers** and **Flagged Attackers**. For example, `21 out of 37 IPs`. These are global counts and are not impacted by the explorer's time selection.
2. Facets, search, and time selector, used to filter rows of attackers.
3. The list of attackers.

You can filter attackers using the default filters, such as **Flagged Attackers**. And you can further refine your filter using the **Severity**, **Blocking status**, **Attackers**, and other facets. 

<div class="alert alert-info"><strong>Flagged Attackers</strong> and <strong>Suspicious Attackers</strong> are mutually exclusive. An IP cannot be grouped in both states at the same time.</a></div>


## Block individual IPs

To block an individual IP temporarily or permanently, do the following:

1. Select the IP row and use the options in the **Actions** column or the **Block Attackers** option.
2. To explore the signals or traces for an IP, select the IP row and select the **Explore Signals** or **Explore Traces** option.

**TODO: Show IP pill screenshot**

## Block IPs in bulk

You can select multiple IPs and block them temporarily or permanently using the Attackers Explorer's **Block Attackers** option. 

**Block Attackers** provides metrics about the IPs to help you block with safety and confidence. For example, **Similarity Overview** and **Activity**, described later in this topic.


**TODO: Show bulk IP actions screenshot**

To investigate and block IPs in bulk, do the following:
1. Use the search, facets, and time selector to filter the list of IPs.
2. Select multiple/all IP rows.
3. Select the **Block Attackers** option.
    In the following example, the selected IPs are from the same location and appear to be related. The **Block Attackers** option opens the **Block selected attackers** view, showing metrics and attributes for the selected IP addresses.

    {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups.png" alt="Screenshot of the ASM Attacker Explorer group blocking"  >}}

4. To block attackers, click **Block**.

## Block selected attackers metrics

When you select the **Block Attackers** option, the **Block selected attackers** view opens, showing metrics and attributes for the selected IP addresses.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups.png" alt="Screenshot of the ASM Attacker Explorer group blocking"  >}}

<div class="alert alert-info">Metrics for <strong>Similarity Overview</strong> and <strong>Activity</strong> are scoped to the time selection on the Attacker Explorer.</a></div>

The **Block selected attackers** view metrics are explained in the following sections.

### Selected IPs

Contains the IPs selected from the explorer. Deselecting an IP removes it from the subsequent sections and **Block** action.

### Similarity overview

Each column exists to help block with confidence and safety. The provided attributes are also used by ASM’s Attacker Similarity feature.

ASNs
: Autonomous System Numbers. Attacks with large numbers of IP addresses might originate from the same ASN, especially when attacks originate from data centers and cloud IPs.

User Agents
: Attackers, commercial scanners, and your own software might use predictable user agents that can help qualify what should be included or excluded from blocking.

Location
: Companies might have policies or serviceable markets that determine what countries they allow traffic from.

Domain
: The owner of the ASN. This is helpful when an organization owns multiple ASNs.

Users
: The number of users who have authenticated from the IP. IPs with large numbers of logins might indicate a load balancer or many users from the same location, like a company site.

### Activity

The time scope for activity is inherited from the time selection on the Attackers Explorer.

#### Signals

The signals associated with the IP addresses over the selected time.

#### Traces

The traces associated with the IP addresses over the selected time. 

Benign traffic is sampled APM traffic, traces without business logic, or attack traffic detections.

Attack traffic is all ASM traces inclusive of business logic.

### Block

This adds the IP addresses to the Denylist {link} for the specified duration.


 
[1]: https://app.datadoghq.com/security/appsec/attackers