---
aliases:
- hgb-6lp-94f
- /security_monitoring/default_rules/hgb-6lp-94f
- /security_monitoring/default_rules/cis-gcp-1.3.0-3.3
disable_edit: true
integration_id: google_dns_managed_zone
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_dns_managed_zone
title: DNSSEC is enabled for Cloud DNS
type: security_rules
---

## Description
Cloud Domain Name System (DNS) is a fast, reliable, and cost-effective domain name system
that powers millions of domains on the internet. Domain Name System Security Extensions
(DNSSEC) in Cloud DNS enables domain owners to take easy steps to protect their domains
against DNS hijacking, man-in-the-middle attacks, and more.

## Rationale
Domain Name System Security Extensions (DNSSEC) adds security to the DNS protocol by enabling the DNS responses to be validated. A trustworthy DNS that translates a domain name like `www.example.com` into its associated IP address is an increasingly important building block for modern web-based applications. 

Attackers can hijack this process of domain/IP lookup and redirect users to a malicious site through DNS hijacking and man-in-the-middle attacks. DNSSEC helps mitigate the risk of such attacks by cryptographically signing DNS records to prevent attackers from issuing fake DNS responses that may misdirect browsers to nefarious websites.

By default, DNSSEC is not enabled.

## Remediation

### From the console
1. Navigate to the [Cloud DNS page][1].
2. For each Type Public zone, set `DNSSEC` to **On**.

### From the command line
Use this command to enable DNSSEC for Cloud DNS Zone Name:

```
gcloud dns managed-zones update ZONE_NAME --dnssec-state on
```


## References
1. [https://cloudplatform.googleblog.com/2017/11/DNSSEC-now-available-in-Cloud-DNS.html][2]
2. [https://cloud.google.com/dns/dnssec-config#enabling][3]
3. [https://cloud.google.com/dns/dnssec][4]


[1]: https://console.cloud.google.com/net-services/dns/zones
[2]: https://cloudplatform.googleblog.com/2017/11/DNSSEC-now-available-in-Cloud-DNS.html
[3]: https://cloud.google.com/dns/dnssec-config#enabling
[4]: https://cloud.google.com/dns/dnssec
