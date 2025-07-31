---
title: Users Explorer
disable_toc: false
---

This topic describes how to use the App and API Protection [Users explorer][1] to investigate the risks associated with the users tracked by security [Signals][3].

## Overview

Datadog App and API Protection identifies users as risks when one or more signals is associated with a user ID, email, or name. 

With the Users explorer, you can investigate and take action on these users.

### Risk categories

The Users explorer assigns one or more of the following risk categories to a user identified as a risk:

- **New Geolocation:** User activity from an unfamiliar location might signal unauthorized access or legitimate travel requiring verification.
- **Impossible Travel:** Occurs when a user logs in from two distant locations in an unrealistically short time, indicating possible credential compromise.
- **Compromised User:** A user's credentials are stolen or hacked, allowing attackers to perform malicious activities with their identity.
- **Disposable Email:** A disposable email is an email address that is temporary.

When a user ID, email, or name is associated with a signal, but does not match a category, it still appears in the Users explorer.

### How the Users explorer differs from other explorers

To understand the difference between the different explorers, review these approaches:

- **Protect:** Automatically block attackers (IPs and authenticated users) using App and API Protection [Policies][2]. Customers should block attack tools as their first automated blocking action. Blocking attack tools reduces common vulnerability discovery for OWASP threats such as SQLi, command injection, and SSRF.
- **React:** Blocking attackers in response to observed threats using the [Signals][3], Users, [Attackers][4] explorers.

Each explorer focuses on a specific use case:

- **Signal explorer**: Provides a list of actionable alerts such as Credential Stuffing Attack or Command Injection. Signals have workflow capabilities, a description, severity, and correlated Traces. Interactions include user assignment workflows, automated protection, analytics, search, and pivoting to Trace Explorer.
- **Trace explorer**: List of evidence for business logic events, such as logins, or attack payloads. Interactions include analytics and search.
- **Attackers explorer**: Identifies attackers as suspicious (IP addresses that have attacked in the last 24 hours up to a threshold) and flagged (IP addresses that have exceeded that threshold).
- **Users explorer**: List of authenticated users associated with one or more signals. Interactions include: 
  - Bulk actions for user analytics and blocking
  - Drill-down into the history of any user
  - Search
  - Pivoting to other explorers

## Explore and filter users

To start reviewing users, go to the [Users explorer][1].

There are two sections in the Users explorer:

- Facets and search. These enable you to filter users by multiple user attributes.
- The list of users with security metrics. 
  - Click a user to examine its risks, IPs, locations, endpoints, and signals. 
  - You can block an individual user from the list or its details drawer.
  - To block multiple users, select one or more users and click **Compare and Block**.

## Block a user

To block an individual user, do the following: 

1. Click **Block** in the user's row, and choose a blocking duration.
2. In **Select Security Responses**, select **Block with Datadog's Library**.
   
   Permanently or temporarily blocked authenticated users are added to the [Denylist][6]. Manage the list on the Datadog [Denylist][7] page.


## Compare and block multiple users

When you select two or more users, you can use the **Compare and Block** button to compare datapoints across compromised users.

When you click **Compare and Block**, several metrics are displayed in **Block selected users**. These metrics help you detect whether you are dealing with **a single attacker**, **a larger coordinated campaign**, or **widespread credential exposure**.

Here's a breakdown of the benefits of comparing each datapoint across two (or more) compromised users.

### Users per ASN

**Benefit:** Identifies if compromised accounts are accessed from the same internet service provider or network operator.

If multiple users are compromised from the same ASN (Autonomous System Number), it could suggest:
  * A botnet operating from that network.
  * A VPN or proxy exit node.
  * A targeted attack from a specific ISP region (for example, a university or corporate network).

### Users per User Agent

**Benefit:** Reveals if the attacker is using automated tools or a specific browser configuration.

Matching user agents could mean:
  * Same malware toolkit (for example, info-stealer like RedLine or Raccoon).
  * Use of headless browsers or scripts.
  * Credential stuffing using a shared toolset.

### Users per Location (Geo-IP)

**Benefit:** Exposes if access attempts are coming from the same country or region.

If multiple users are being accessed from the same location (especially foreign or unexpected ones), it:
  * Points to targeted regional attacks.
  * Helps detect suspicious login anomalies (for example, impossible travel).
  * May indicate TOR exit nodes or VPN clusters.

### Users per Domain

**Benefit:** Groups affected users by email domain, which typically represents their organization.

Benefits include:
  * Identifying organization-wide breaches.
  * Highlighting phishing campaigns targeting a specific company or domain.
  * Supporting incident response and alert prioritization.

### Threat Intel Category

**Benefit:** Shows the associated [Threat Intelligence Category][5].

Comparing helps you:
  * Understand the vector of compromise.
  * Prioritize responses (for example, `hosting_proxy` might require different mitigation than `malware`).

### Threat Intel Intention

**Benefit:** Clarifies **why the attacker stole the credentials** (fraud, espionage, resale, lateral movement, etc.).

Matching intentions reveal:
  * Common attacker **goals**.
  * Whether your users were part of a **targeted vs opportunistic** campaign.
  * Whether you should expect **further action**, like BEC (business email compromise) or internal movement.

### IPs per User

**Benefit:** Highlights whether multiple (especially **anomalous or malicious**) IPs were used to access one user.

Overlap between users might indicate:

  * Use of the **same attacker infrastructure**.
  * Centralized control (e.g., via a **command-and-control server**).
  * Account access from **known malicious IPs** (check threat feeds).

### Summary of comparison details

| Detail                 | Value of Comparison                                |
| ---------------------- | -------------------------------------------------- |
| Users per ASN          | Identify shared attacker infrastructure or VPN use |
| Users per User Agent   | Spot common tooling or automation                  |
| Users per Location     | Detect geolocation-based threat patterns           |
| Users per Domain       | Pinpoint org-wide targeting or breaches            |
| Threat Intel Category  | Understand attack type (phishing, malware, etc.)   |
| Threat Intel Intention | Determine attacker's objective                     |
| IPs per User           | Trace attacker network behavior and connections    |


## Tracking compromised credentials

Here are some investigation tips for comparing each datapoint across two (or more) compromised users:

1. Breaches are just the start.
  A leaked credential is the entry point into a wider investigation.
2. Look for patterns.
  Compare ASN, IP, user agent, geo, domain. If multiple users share infrastructure, it's likely one actor or campaign.
3. Geo anomalies matter more than location.
  Ask whether the location is normal for this user?
4. Domains reveal the scope.
  The same attack across multiple users or domains can mean coordinated targeting, not random hits.
5. IP/User Agent overlap equals attacker fingerprint.
  Toolkits reuse browser strings, scripts, and proxies. Overlap shows the attacker infrastructure.
6. Threat intel context guides response.
  To triage effectively, combine the category with the intention. This combination tells you if it's phishing, malware, or fraud.


[1]: https://app.datadoghq.com/security/appsec/users
[2]: /security/application_security/policies/
[3]: /security/application_security/security_signals
[4]: /security/application_security/security_signals/attacker-explorer/
[5]: /security/threat_intelligence/#threat-intelligence-categories
[6]: /security/application_security/policies/#denylist
[7]: https://app.datadoghq.com/security/appsec/denylist

