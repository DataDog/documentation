---
title: Attacker Explorer
kind: documentation
---

## Introduction

ASM identifies attackers via Flagged IPs. Flagged IPs are IPs that have exceeded thresholds for abuse. Customers can pivot, drill down, and take action against attackers with Attacker Explorer. 

## Attacker Explorer Relationship to Signals and Traces

Each explorer focuses on a specific use case.

Traces are the evidence for business logic events, such as logins, and attack payloads, such as command injection. All ASM traces have an IP address.

Signals are traces that have been correlated into an actionable alert and assigned a severity. Signals contain multiple traces.

Attack Explorer enables users to interact with large numbers of IP addresses and enables the following use cases:

1. Evaluate the IP across Signals and Traces and pivot to other explorers
2. Drill down into meaningful IP attributes and the IP history with your services
3. Block with safety and confidence

## Attacker Explorer

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_default_view.png" alt="Screenshot of the ASM Attacker Explorer"  >}}

There are three sections to the Attacker Explorer

1. Metrics, including Suspicious, Flagged, Blocked attackers. These are global counts and are not affected by the time selector.
2. Facets, search, and time used to filter rows of attackers.
3. The list of attackers

### Filter Attackers

**TODO: add image**

Filter by Flagged Attackers, the default view.

Flagged and Suspicious are mutually exclusive; an IP cannot have both states at the same time.

### Individual IP actions

**TODO: Show IP pill screenshot**

**Step 1**: Click on any row to see the history and attributes for any IP.

**Step 2**: Choose an action from the actions column.

### Mass IP actions

**TODO: Show Mass IP actions screenshot**

**Step 1**: Select IPs to investigate and choose an action, Block Attackers or Explore Signals.

In this example, we selected IPs from the same location that appear to be related and selected Block Attackers. Block Attackers will present a view with metrics and attributes for selected IP addresses.

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups.png" alt="Screenshot of the ASM Attacker Explorer group blocking"  >}}

**Step 2**: Review and block selected attackers

Metrics for Similarity Overview and Activity are scoped to the time selection on the Attacker Explorer.

### Selected IPs

Contains the IPs selected from the explorer. Deselecting an IP will remove it from the subsequent sections and Block action.

### Similarity Overview

Each column exists to help block with confidence and safety. The provided attributes are also used by ASM’s Attacker Similarity Feature.

ASNs
: Autonomous System Numbers - Attacks with large numbers of IP addresses may originate from the same ASN, especially when attacks originate from datacenter and cloud IPs.

User Agents
: Attackers, commercial scanners, and your own software may use predictable user agents which can help qualify what should be included or excluded from blocking.

Location
: Companies may have policies or serviceable markets that determine what countries they allow traffic from.

Domain
: The owner of the ASN, helpful when an organization owns multiple ASNs.

Users
: The number of users who have authenticated from that IP. IPs with large numbers of logins may indicate a load balancer or many users from the same location, like a company site.

### Activity

The time scope for activity is inherited from the time selection on the Attacker Explorer.

#### Signals

The Signals associated with the IP addresses over the selected time.

#### Traces

The traces associated with the IP addresses over the selected time.
Benign traffic is sampled APM traffic, traces without business logic or attack traffic detections.
Attack traffic is all ASM traces inclusive of business logic.

### Block

This will add the IP addresses to the Denylist {link} for the specified duration.

## Blocking

There are two methods to block traffic.

Protect
: Automated blocking with the configuration of ASM Protection. Customers should block Attack Tools as their first automated blocking action. {link to this} Blocking Attack Tools reduces common vulnerability discovery for OWASP threats such as SQLi, command injection, and SSRF.

Reactive
: Blocking via Signals or Attacker Explorer in response to observed threats.

### Best practices for blocking

1. Short durations between 15 minutes and 1 hour are recommended for blocking IP addresses. 
2. Add authorized scanners to monitored passlists to observe activity but prevent blocking
3. Identifying load balancers and proxies for correct X-Forwarded-For headers
4. Block mobile ISPs with caution; these networks may have large numbers of users and mobile devices behind single IP addresses
 
