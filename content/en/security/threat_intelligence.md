---
title: Threat Intelligence
aliases:
    - /security/threat_intel
description: "Threat Intelligence at Datadog"
further_reading:
  - link: "/security/application_security/how-it-works/threat-intelligence/"
    tag: "documentation"
    text: "AAP Threat Intelligence"
  - link: "/security/cloud_siem/threat_intelligence/"
    tag: "documentation"
    text: "Cloud SIEM Threat Intelligence"

products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Workload Protection
  url: /security/workload_protection/
  icon: cloud-security-management
- name: App and API Protection
  url: /security/application_security/
  icon: app-sec
---

{{< product-availability >}}

## Overview

Threat Intelligence is reputation information that helps responders make informed decisions on attacks and compromises.

Datadog curates commercial, open-source, and in-house threat intelligence indicators of compromise into categories and intents. Threat intelligence is updated at least once per day, per source. This data is used to enrich your logs and traces with relevant reputation information.

## Bring your own threat intelligence

Datadog Security supports enriching and searching traces with threat intelligence indicators of compromise stored in Datadog reference tables. [Reference Tables][2] allow you to combine metadata with information already in Datadog.

The amount of time threat intelligence persists as asn available enrichment varies depending on source:
- OEM- and integration-based feeds: 24 hours
  - Datadog reacquires threat intelligence from these providers at least once a day, and depends on the provider to persist threat intelligence information
- Bring your own threat intelligence: however long you configure the intelligence to be available

For more information, see the [Bring Your Own Threat Intelligence][3] guide.

## Threat intelligence lifecycle

Datadog collects threat intelligence across the following entity types. Each entity type has unique characteristics and a useful time frame. This time frame, or lifecycle, requires consideration when assessing the importance of a threat intelligence match on your data.

### File hashes: unique digital fingerprints

File hashes function as unique digital fingerprints for specific files. When a file hash is marked as malware, it signifies the file's exact content is harmful. The immutability of a hash, which is tied to its file's content, ensures its consistent identification. As a result, a file hash tagged as malware retains this identification, provided the identification was a true positive.

### Application packages: malware risk in distribution

Unlike immutable file hashes, application packages can vary in content and security, even under the same version number. Malicious actors may upload harmful packages mimicking legitimate ones, or they might compromise existing packages by introducing malware. The lifecycle of malicious packages is frequently long-lived, but not immutable.

### Domains: temporary signatures

Unlike file hashes, domains identified as malicious are subject to change. They may undergo processes such as remediation, reassignment, or repurposing by various entities. While the lifecycle of malicious or suspicious domains is somewhat prolonged compared to IP addresses, it remains temporary and variable.

### IP addresses: dynamic and transient

IP addresses represent the most volatile element in threat intelligence, often changing reputations within a 24-hour cycle. Given their dynamic nature, particularly in residential and mobile networks where multiple hosts may be involved, it's crucial to regularly reassess their status. Not all hosts connected to a low-reputation IP address are inherently malicious, underscoring the need for correlation.

## Best practices in threat intelligence

With threat intelligence, reputation is key, but it must be weighed alongside other evidence. Relying solely on IP and domain intelligence for blocking traffic is not recommended, with few exceptions. A balanced, evidence-based approach is essential.

Threat intelligence used in [Detection Rules][1] should reference the Datadog keys such as category (`@threat_intel.results.category`) and intent (`@threat_intel.results.intention`). Other keys should not be used.

## Transparency in threat intelligence

Datadog ensures transparency by providing external links to external threat intelligence sources associated with a detection. Threat intelligence curated by Datadog is ingested into the Datadog platform for enrichment and detection. Datadog does not send customer data to threat intelligence sources.

The detections and enrichments are accessible in the UI and event JSON.

## Threat intelligence facets

Sources, categories, and intents are available as facets and filters on relevant product explorers.

### Threat intelligence sources

| Source | Category | Source Use Cases | Primary Products |
|--------|------------|-----------|------------------|
| Datadog Threat Research| scanners, Redis exploitation, Docker exploitation, malware, bruteforcer | Honeypots focused on software specific threats | AAP, CWS and Cloud SIEM |
| [Datadog AAP](https://docs.datadoghq.com/security/application_security/) | scanner | List of IPs that have been observed attacking multiple AAP customers | AAP |
| [Spur](https://spur.us/) | residential_proxy | Proxies associated credential stuffing and fraud | AAP and Cloud SIEM |
| [Spur](https://spur.us/) | malware_proxy | Proxies associated with malware command and control | Cloud SIEM |
| [Abuse.ch](https://abuse.ch/) Malware Bazaar| malware | Malware on hosts | CWS |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | cryptomining | Coinminer activity with known mining pools| Workload Protection and Cloud SIEM |
| Tor | tor | Policy violations for user activity | App and API Protection, Cloud SIEM, and Workload Protection |
| [Threatfox](https://threatfox.abuse.ch/) | malware | Identify hosts communicating with known malware infrastructure | Cloud SIEM, and Workload Protection |


### Threat intelligence categories

| Category | Intention | Entity Types | Product Use Cases | Primary Products |
|----------|----------|--------------|----------|------------------|
| residential_proxy | suspicious | IP addresses | Reputation for credential stuffing and fraud | AAP and Cloud SIEM |
| botnet_proxy | suspicious | IP addresses | Reputation for being part of a botnet and contributing to distributed attacks | AAP and Cloud SIEM |
| malware | malicious | application library versions, file hashes | Malicious packages and communication with mining pools| CWS |
| scanner | suspicious | IP addresses | Reputation for scanners | App and API Protection, Workload Protection, and Cloud SIEM |
| hosting_proxy | suspicious | IP addresses | Datacenter IPs with a reputation of abuse, such as for distributed credential stuffing attacks | AAP and Cloud SIEM |
| tor | suspicious | IP addresses  | Corporate policy violations for user activity | App and API Protection, Workload Protection, and Cloud SIEM |
| disposable_email | suspicious | Domain  | Detect product usage from disposable email addresses | AAP |
| corp_vpn | benign | IP addresses | IPs associated to corporate VPNs | AAP and Client SIEM |
| cryptomining | malicious | IP addresses | IP addresses associated with cryptomining activities | AAP, CWS, and Cloud SIEM |

### Threat intelligence intents

| Intent     | Use Case                                     |
|------------|----------------------------------------------|
| benign     | Corporate VPNs and informational enrichments |
| suspicious | Low reputation                               |
| malicious  | Malicious reputation                         |


## Entity types
| Entity Type | Example | Use Cases |
|-------------|---------|-----------------------------|
| IP addresses | 128.66.0.1 | Identify IP addresses associated with attacks, command and control, and scanning activity |
| domains | example.com, subdomain.example.com | Domains associated with malicious use. Often used with malware as a command and control |
| application package versions | (example_package, 1.0.0) | Identify malicious packages downloaded from PyPi |
| file hashes [SHA1, SHA256, ssdeep (Workload Protection only)] | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | Identify a distinct file associated with malware or compromise |

<div class="alert alert-info">Threat intelligence sources and categories are not configurable.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:/security/detection_rules/
[2]: /integrations/guide/reference-tables
[3]: /security/guide/byoti_guide
