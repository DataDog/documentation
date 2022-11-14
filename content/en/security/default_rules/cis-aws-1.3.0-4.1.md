---
aliases:
- 4rg-4iy-q95
- /security_monitoring/default_rules/4rg-4iy-q95
- /security_monitoring/default_rules/cis-aws-1.3.0-4.1
cloud: aws
disable_edit: true
integration_id: amazon-
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
title: Log metric filter and alarm exist for unauthorized API calls
type: security_rules
---

## Description

Real-time monitoring of API calls can be achieved by directing CloudTrail Logs to Datadog and enabling the default rule [A user received multiple AccessDenied errors][1]. It is recommended that a metric filter and alarm be established for unauthorized API calls.

## Rationale

Monitoring unauthorized API calls will help reveal application errors and may reduce time to detect malicious activity.

## Remediation

To enable default rule [A user received multiple AccessDenied errors][1], navigate to the [Rules page][2]. If you have not yet enabled Security Monitoring, visit the [Setup and Configuration page][3].

## Impact

This alert may be triggered by normal read-only console activities that attempt to opportunistically gather optional information, but gracefully fail if they don't have permissions. If an excessive number of alerts are being generated then an organization may wish to consider adding read access to the limited IAM user permissions simply to quiet the alerts. In some cases doing this may allow the users to actually view some areas of the system - any additional access given should be reviewed for alignment with the original limited IAM user intent.

## Default value

None

## References

1. CCE-79186-3
2. https://docs.datadoghq.com/security_platform/default_rules/aws-cloudtrail-access-denied-multiple-events/

**Additional Information**: Configuring log metric filter and alarm on multi-region (global) CloudTrail ensures that activities from all regions (used as well as unused) are monitored.

## CIS controls

Version 7:

6.5 - Central Log Management - Ensure that appropriate logs are being aggregated to a central log management system for analysis and review.

6.7 - Regularly Review Logs - On a regular basis, review logs to identify anomalies or abnormal events.

[1]: https://docs.datadoghq.com/security_platform/default_rules/aws-cloudtrail-access-denied-multiple-events/
[2]: https://app.datadoghq.com/security/configuration/rules?query=una%20ruleId%3Abxz-x3r-zqw&sort=rule
[3]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
