---
title: Users Explorer
disable_toc: false
---

This topic describes how to use [Users explorer][1] to investigate users and their risks and signals.

## Overview

Datadog App and API Protection (AAP) identifies users as risks when one or more signals is associated with a user ID, email, or name. 

With Users explorer, you can investigate and take action against these users.

### Risk categories

The Users explorer assigns one or more of the following risk categories to a user identified as a risk:

- **New Geolocation:** User activity from an unfamiliar location might signal unauthorized access or legitimate travel requiring verification.
- **Impossible Travel:** Occurs when a user logs in from two distant locations in an unrealistically short time, indicating possible credential compromise.
- **Compromised User:** A user's credentials are stolen or hacked, allowing attackers to perform malicious activities with their identity.
- **Disposable Email:** A disposable email is an email address that is temporary.

If a user ID, email, or name is associated with a signal, but does not match a category, it will still appear in the Users explorer.

### How Users explorer differs from Signal and Trace explorers

To understand the difference between the different explorers, review these approaches:

- **Protect:** Automatically block attackers (IPs and authenticated users) using AAP [Policies][2]. Customers should block attack tools as their first automated blocking action. Blocking attack tools reduces common vulnerability discovery for OWASP threats such as SQLi, command injection, and SSRF.
- **React:** Blocking attackers in response to observed threats using the [Signals][3], Users, [Attackers][4] explorers.

Each explorer focuses on a specific use case:

- **Signal explorer**: Provides a list of actionable alerts such as Credential Stuffing Attack or Command Injection. Signals have workflow capabilities, a description, severity, and correlated Traces. Interactions include user assignment workflows, automated protection, analytics, search, and pivoting to Trace Explorer.
- **Trace Explorer**: List of evidence for business logic events, such as logins, or attack payloads. Interactions include analytics and search.
- **Users Explorer**: List of authenticated users associated with one or more signals. Interactions include: 
  - Bulk actions for user analytics and blocking
  - Drill-down into the history of any user
  - Search
  - Pivoting to other explorers

## Explore and filter users

To start reviewing users, go to the [Users explorer][1].

There are two sections in the Users explorer:

- Facets and search. These enable you to filter traffic by service or user attributes.
- The list of users with security metrics.

## Investigate a user

Click on any row to view the history and attributes of the user.

Users can be blocked or added to the Passlist from the user details drawer.

## Block selected users metrics

When you select two or more users, you can use the **Compare and Block** button to compare data points across compromised users.

When you click **Compare and Block**, several metrics are displayed in **Block selected users**. These metrics help you detect whether you are dealing with **a single attacker**, **a larger coordinated campaign**, or **widespread credential exposure**.

Here's a breakdown of the benefits of comparing each datapoint across two (or more) compromised users.

### Users per ASN

**Benefit:** Identifies whether compromised accounts are being accessed from the same internet service provider or network operator.

* If multiple users are compromised from the same ASN (Autonomous System Number), it could suggest:
  * A botnet operating from that network.
  * A VPN or proxy exit node.
  * A targeted attack from a specific ISP region (for example, a university or corporate network).

### Users per User Agent

**Benefit:** Reveals whether the attacker is using automated tools or a specific browser configuration.

* Matching user agents could mean:
  * Same malware toolkit (for example, info-stealer like RedLine or Raccoon).
  * Use of headless browsers or scripts.
  * Credential stuffing using a shared toolset.

### Users per Location (Geo-IP)

**Benefit:** Exposes whether access attempts are coming from the same country or region.

* If multiple users are being accessed from the same location (especially foreign or unexpected ones), it:
  * Points to targeted regional attacks.
  * Helps detect suspicious login anomalies (for example, impossible travel).
  * May indicate TOR exit nodes or VPN clusters.

### Users per Domain

**Benefit:** Groups affected users by email domain, which typically represents their organization.

* Benefits include:
  * Identifying organization-wide breaches.
  * Highlighting phishing campaigns targeting a specific company or domain.
  * Supporting incident response and alert prioritization.

---

### Threat Intel Category

**Benefit:** Shows the associated [Threat Intelligence Category][5].

* Comparing helps you:
  * Understand the vector of compromise.
  * Prioritize responses (for example, `hosting_proxy` might require different mitigation than `malware`).

### Threat Intel Intention

**Benefit:** Clarifies **why the attacker stole the credentials** — e.g., for fraud, espionage, resale, lateral movement, etc.

* Matching intentions reveal:

  * Common attacker **goals**.
  * Whether your users were part of a **targeted vs opportunistic** campaign.
  * Whether you should expect **further action**, like BEC (business email compromise) or internal movement.

---

### IPs per User

**Benefit:** Highlights whether multiple (especially **anomalous or malicious**) IPs were used to access one user.

* Overlap between users might indicate:

  * Use of the **same attacker infrastructure**.
  * Centralized control (e.g., via a **command-and-control server**).
  * Account access from **known malicious IPs** (check threat feeds).

---

### Summary table

| Detail                 | Value of Comparison                                |
| ---------------------- | -------------------------------------------------- |
| Users per ASN          | Identify shared attacker infrastructure or VPN use |
| Users per User Agent   | Spot common tooling or automation                  |
| Users per Location     | Detect geolocation-based threat patterns           |
| Users per Domain       | Pinpoint org-wide targeting or breaches            |
| Threat Intel Category  | Understand attack type (phishing, malware, etc.)   |
| Threat Intel Intention | Determine attacker’s objective                     |
| IPs per User           | Trace attacker network behavior and connections    |





## Block individual users


## Block users in bulk



[1]: https://app.datadoghq.com/security/appsec/users
[2]: /security/application_security/policies/
[3]: /security/application_security/security_signals
[4]: /security/application_security/security_signals/attacker-explorer/
[5]: /security/threat_intelligence/#threat-intelligence-categories

