---
title: Threat Intelligence
kind: documentation
description: "Threat Intelligence at Datadog"
---

## Overview
Threat Intelligence is reputation information that helps responders make informed decisions on attacks and compromises. 

Datadog curates commercial, open-source, and in-house threat intelligence into categories and intents. Threat Intelligence is updated at least once per day per source. This data is used to enrich your logs and traces with relevant reputation information.

## Threat Intelligence Lifecycle

**File Hashes: Unique Digital Fingerprints** 

File hashes function as unique digital fingerprints for specific files. When a file hash is marked as malware, it signifies the file's exact content is harmful. The immutability of a hash, which is tied to its file's content, ensures its consistent identification. As a result, a file tagged as malware retains this identification, provided its content remains unaltered and the identification was a true positive.

**Application Packages: Malware Risk in Distribution**

Unlike immutable file hashes, application packages can vary in content and security, even under the same version number. Malicious actors may upload harmful packages mimicking legitimate ones, or they might compromise existing packages by introducing malware. The lifecycle of malicious packages is frequently long-lived, but not immutable.

**Domains: Temporary Signatures**

Unlike file hashes, domains identified as malicious are subject to change. They may undergo processes such as remediation, reassignment, or repurposing by various entities. While the lifecycle of malicious or suspicious domains is somewhat prolonged compared to IP addresses, it remains temporary and variable.

**IP Addresses: Dynamic and Transient** 

IP addresses represent the most volatile element in threat intelligence, often changing reputations within a 24-hour cycle. Given their dynamic nature, particularly in residential and mobile networks where multiple hosts may be involved, it's crucial to regularly reassess their status. Not all hosts connected to a low-reputation IP address are inherently malicious, underscoring the need for cautious interpretation.

## Best Practices in Threat Intelligence
With threat intelligence, reputation is key, but it must be weighed alongside other evidence. Relying solely on IP and Domain intelligence for blocking traffic is not recommended, with few exceptions. A balanced, evidence-based approach is essential.

Threat intelligence used in Detection Rules should reference the Datadog keys such as category and intent. Other keys should not be used.

## Transparency in Threat Intelligence 
Datadog ensures transparency by providing external links to external threat intelligence sources associated with a detection. All external threat intelligence at Datadog is ingested to the Datadog platform for enrichment and detection. Datadog does not send customer data to threat intelligence sources.

The detections and enrichments are accessible in the UI and event JSON.

## Threat Intel Facets
Sources, categories, and intents are available as facets and filters on relevant product Explorers. 

### Threat Intel Sources

| Source | Categories | Source Use Cases | Primary Products | 
|--------|------------|-----------|------------------|
| Datadog Threat Research| scanners, exploits | Honeypots focused on software specific threats | ASM and CWS |
| [Datadog Guarddog](https://github.com/DataDog/guarddog) | malware | Malware in application libraries | ASM |
| [Spur](https://spur.us/) | residential_proxy | Proxies associated with fraud and credential stuffing | ASM and Cloud SIEM |
| [Spur](https://spur.us/) | malware_proxy | Proxies associated with malware command and control | ASM and CWS |
| [Abuse.ch](https://abuse.ch/) Malware Bazaar| malware | Malware on hosts | CWS |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | malware | Coinminer activity with known mining pools| CWS |
| Tor | Tor | Policy violations for user activity | AWS, Cloud SIEM, and CWS |

### Threat Intel Categories

| Category | Intention | Entity Types | Product Use Cases | Primary Products |
|----------|----------|--------------|----------|------------------|
| residential_proxy | suspicious | IP Addresses | Reputation for credential stuffing and fraud use cases | ASM and Cloud SIEM |
| malware_proxy | suspicious | IP Addresses | Reputation for automated application abuse and anomalous processes | Cloud SIEM, and CWS |
| malware | malicious | application library versions, file hashes | Malicious packages and communication with mining pools| ASM, CWS |
| Tor | suspicious | IP Addresses  | Corporate policy violations for user activity | ASM and Cloud SIEM |

### Threat Intel Intents
| Intent | Use Case |
|--------|----------|
| Benign | Corporate VPNs and informational enrichments |
| Suspicious | Low reputation | 
| Malicious | Malicious reputation | 


## Entity Types
| Entity Type | Example | Use Cases | 
|-------------|---------|-----------------------------|
| IP addresses | 128.66.0.1 | Identify IP addresses associated with attacks, command and control, and scanning activity | 
| Domains | example.com, subdomain.example.com | Domains associated with malicious use. Often used with malware as a command and control |
| Application packages versions | (mjrl, 1.0.0) | Identify malicious packages downloaded from PyPi |
| File hashes [SHA1, SHA256] | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | Identify a distinct file associated with malware or compromise |



Threat intelligence sources and categories are not customer configurable at this time. For specific product implementations see:

[ASM](https://docs.datadoghq.com/security/application_security/threats/threat-intelligence/)

Cloud SIEM

CWS
