---
aliases:
- 0k6-koa-a8c
- /security_monitoring/default_rules/0k6-koa-a8c
- /security_monitoring/default_rules/cis-gcp-1.3.0-2.12
disable_edit: true
integration_id: google_dns_policy
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_dns_policy
title: Cloud DNS logging is enabled for VPC networks
type: security_rules
---

## Description
Cloud DNS logging records the queries from the name servers within your VPC to
Stackdriver. Logged queries can come from Compute Engine VMs, GKE containers, or other
GCP resources provisioned within the VPC.

### Default value
Cloud DNS logging is disabled by default on each network.

## Rationale
Security monitoring and forensics cannot depend solely on IP addresses from VPC flow
logs, especially when considering the dynamic IP usage of cloud resources, HTTP virtual
host routing, and other technology that can obscure the DNS name used by a client from the
IP address. Monitoring Cloud DNS logs provides visibility into DNS names requested by the
clients within the VPC. These logs can be monitored for anomalous domain names and
evaluated against threat intelligence.

To fully capture DNS logging records, your firewall must block egress for UDP/53 (DNS) and TCP/443 (DNS
over HTTPS) to prevent the client from using an external DNS name server for resolution.

Only queries that reach a name server are logged. Cloud DNS resolvers cache
responses, queries answered from caches, and direct queries to an external DNS
resolver outside the VPC are not logged.

### Impact
Enabling of Cloud DNS logging might result in your project being charged for the additional
logs usage.

## Remediation

### From the command line
For VPC networks that need a new DNS policy with logging enabled, run the following:
```
gcloud dns policies create enable-dns-logging --enable-logging --
description="Enable DNS Logging" --networks=VPC_NETWORK_NAME
```

The `VPC_NETWORK_NAME` can be one or more networks in a comma-separated list.
For VPC networks that have existing DNS policies, run the following to enable logging:
```
gcloud dns policies update POLICY_NAME --enable-logging --
networks=VPC_NETWORK_NAME
```
The `VPC_NETWORK_NAME` can be one or more networks in a comma-separated list.

## References
1. [https://cloud.google.com/dns/docs/monitoring][1]

[1]: https://cloud.google.com/dns/docs/monitoring
