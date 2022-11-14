---
aliases:
- qrd-odv-n89
- /security_monitoring/default_rules/qrd-odv-n89
- /security_monitoring/default_rules/aws-iam-servercertificateexpiry
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM server certificate will expire within 30 days
type: security_rules
---

## Description

Ensure that your IAM service SSL/TLS certificates are renewed 30 days prior to their validity period ending.

## Rationale

If a certificate becomes invalid, the communication between the client and AWS resource that implements certificates is no longer secure.

## Remediation

### From the console

Follow the [Managed renewal for ACM certificates][1] AWS documentation to set up renewal by validation type (DNS, email, or private PKI).

### From the command line

Follow the [Managed renewal for ACM certificates][1] AWS documentation to set up renewal by validation type (DNS, email, or private PKI).

[1]: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
