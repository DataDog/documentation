---
aliases:
- fwu-obr-c9n
- /security_monitoring/default_rules/fwu-obr-c9n
- /security_monitoring/default_rules/cloudtrail-aws-user-attempted-to-assumerole-anomaly
disable_edit: true
iaas: aws
integration_id: cloudtrail
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
source: cloudtrail
tactic: TA0007-discovery
title: Anomalous number of assumed roles from user
type: security_rules
---

## Goal
Detect when a user has attempted to assume an anomalous number of unique roles.

## Strategy
This rule sets a baseline for user activity for the [`AssumeRole`][1] API call, and enables detection of potentially anomalous activity.

An attacker may attempt this for the following reasons:

* To identify which roles the user account has access to.
* To identify what AWS services are being used internally.
* To identify third party integrations and internal software.

## Triage and response
1. Investigate activity for the following ARN `{{@userIdentity.arn}}` using `{{@userIdentity.session_name}}`.
2. Review any other security signals for `{{@userIdentity.arn}}`.
3. If the activity is deemed malicious:
    * Rotate user credentials.
    * Determine what other API calls were made by the user.
    * Begin your organization's incident response process and investigate.

[1]: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html
