---
aliases:
- a38-n2h-p48
- /security_monitoring/default_rules/a38-n2h-p48
- /security_monitoring/default_rules/aws-ec2-IMDSv2
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: ec2
title: EC2 instance uses IMDSv2
type: security_rules
---

## Description

Use the IMDSv2 session-oriented communication method to transport instance metadata. 

## Rationale

AWS default configurations allow the use of either IMDSv1, IMDSv2, or both. IMDSv1 uses insecure GET request/responses which are at risk for a number of vulnerabilities, whereas IMDSv2 uses session-oriented requests and a secret token that expires after a maximum of six hours. This adds protection against misconfigured-open website application firewalls, misconfigured-open reverse proxies, unpatched Server Side Request Forgery (SSRF) vulnerabilities, and misconfigured-open layer-3 firewalls and network address translation.

## Remediation

Follow the [Transition to using Instance Metadata Service Version 2][1] docs to learn how to transition and reconfigure your software. 

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
