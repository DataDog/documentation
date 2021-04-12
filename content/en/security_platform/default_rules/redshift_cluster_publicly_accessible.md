---
aliases:
- a7e-e88-302
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Redshift cluster is not publicly accessible
type: security_rules
---

## Description

Confirm [Redshift clusters][1] are not publicly available.

## Rationale

Publicly available Redshift clusters have a public IP address, which gives any machine the opportunity to attempt to connect to your clusters. Malicious activity, such as SQL injections or distributed denial-of-service (DDoS) attacks, can occur if a connection is established.

## Remediation

### Console

Follow the [Managing clusters in a VPC][7] docs to learn how to modify public accessibility for your clusters.

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
