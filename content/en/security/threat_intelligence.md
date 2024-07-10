---
title: Threat Intelligence
aliases:
    - /security/threat_intel
description: "Threat Intelligence at Datadog"
further_reading:
  - link: "/security/application_security/threats/threat-intelligence/"
    tag: "documentation"
    text: "ASM Threat Intelligence"
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: CSM Threats
  url: /security/threats/
  icon: cloud-security-management
- name: Application Security Management
  url: /security/application_security/
  icon: app-sec
---

{{< product-availability >}}

## Overview
Threat Intelligence is reputation information that helps responders make informed decisions on attacks and compromises. 

Datadog curates commercial, open-source, and in-house threat intelligence indicators of compromise into categories and intents. Threat intelligence is updated at least once per day, per source. This data is used to enrich your logs and traces with relevant reputation information.

## Threat Intelligence Lifecycle

Datadog collects threat intelligence across the following entity types. Each entity type has unique characteristics and a useful timeframe. This timeframe, or lifecycle, requires consideration when assessing the importance of a threat intelligence match on your data.

### File Hashes: Unique Digital Fingerprints

File hashes function as unique digital fingerprints for specific files. When a file hash is marked as malware, it signifies the file's exact content is harmful. The immutability of a hash, which is tied to its file's content, ensures its consistent identification. As a result, a file hash tagged as malware retains this identification, provided the identification was a true positive.

### Application Packages: Malware Risk in Distribution

Unlike immutable file hashes, application packages can vary in content and security, even under the same version number. Malicious actors may upload harmful packages mimicking legitimate ones, or they might compromise existing packages by introducing malware. The lifecycle of malicious packages is frequently long-lived, but not immutable.

### Domains: Temporary Signatures

Unlike file hashes, domains identified as malicious are subject to change. They may undergo processes such as remediation, reassignment, or repurposing by various entities. While the lifecycle of malicious or suspicious domains is somewhat prolonged compared to IP addresses, it remains temporary and variable.

### IP Addresses: Dynamic and Transient

IP addresses represent the most volatile element in threat intelligence, often changing reputations within a 24-hour cycle. Given their dynamic nature, particularly in residential and mobile networks where multiple hosts may be involved, it's crucial to regularly reassess their status. Not all hosts connected to a low-reputation IP address are inherently malicious, underscoring the need for correlation.

## Best Practices in Threat Intelligence

With threat intelligence, reputation is key, but it must be weighed alongside other evidence. Relying solely on IP and domain intelligence for blocking traffic is not recommended, with few exceptions. A balanced, evidence-based approach is essential.

Threat intelligence used in [Detection Rules][1] should reference the Datadog keys such as category (`@threat_intel.results.category`) and intent (`@threat_intel.results.intention`). Other keys should not be used.

## Transparency in Threat Intelligence 

Datadog ensures transparency by providing external links to external threat intelligence sources associated with a detection. Threat intelligence curated by Datadog is ingested into the Datadog platform for enrichment and detection. Datadog does not send customer data to threat intelligence sources.

The detections and enrichments are accessible in the UI and event JSON.

## Threat Intelligence Facets

Sources, categories, and intents are available as facets and filters on relevant product explorers. 

### Threat Intelligence Sources

| Source | Category | Source Use Cases | Primary Products | 
|--------|------------|-----------|------------------|
| Datadog Threat Research| scanners, exploits | Honeypots focused on software specific threats | ASM and CWS |
| [Spur](https://spur.us/) | residential_proxy | Proxies associated credential stuffing and fraud | ASM and Cloud SIEM |
| [Spur](https://spur.us/) | malware_proxy | Proxies associated with malware command and control | Cloud SIEM |
| [Abuse.ch](https://abuse.ch/) Malware Bazaar| malware | Malware on hosts | CWS |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | malware | Coinminer activity with known mining pools| CWS |
| Tor | tor | Policy violations for user activity | AWS, Cloud SIEM, and CWS |

### Threat Intelligence Categories

| Category | Intention | Entity Types | Product Use Cases | Primary Products |
|----------|----------|--------------|----------|------------------|
| residential_proxy | suspicious | IP addresses | Reputation for credential stuffing and fraud | ASM and Cloud SIEM |
| botnet_proxy | suspicious | IP addresses | Reputation for being part of a botnet and contributing to distributed attacks | ASM and Cloud SIEM |
| malware | malicious | application library versions, file hashes | Malicious packages and communication with mining pools| CWS |
| scanner | suspicious | IP addresses | Reputation for scanners | ASM and Cloud SIEM |
| hosting_proxy | suspicious | IP addresses | Datacenter IPs with a reputation of abuse, such as for distributed credential stuffing attacks | ASM and Cloud SIEM |
| Tor | suspicious | IP addresses  | Corporate policy violations for user activity | ASM and Cloud SIEM |

### Threat Intelligence Intents
| Intent | Use Case |
|--------|----------|
| benign | Corporate VPNs and informational enrichments |
| suspicious | Low reputation | 
| malicious | Malicious reputation | 


## Entity Types
| Entity Type | Example | Use Cases | 
|-------------|---------|-----------------------------|
| IP addresses | 128.66.0.1 | Identify IP addresses associated with attacks, command and control, and scanning activity | 
| domains | example.com, subdomain.example.com | Domains associated with malicious use. Often used with malware as a command and control |
| application packages versions | (example_package, 1.0.0) | Identify malicious packages downloaded from PyPi |
| file hashes [SHA1, SHA256] | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | Identify a distinct file associated with malware or compromise |</br>

**Note**: Threat intelligence sources and categories are not configurable at this time. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:/security/detection_rules/
