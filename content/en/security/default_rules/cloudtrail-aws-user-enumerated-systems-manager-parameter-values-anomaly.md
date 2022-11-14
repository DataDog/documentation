---
aliases:
- 02d-y74-06e
- /security_monitoring/default_rules/02d-y74-06e
- /security_monitoring/default_rules/cloudtrail-aws-user-enumerated-systems-manager-parameter-values-anomaly
disable_edit: true
iaas: aws
integration_id: cloudtrail
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: cloudtrail
tactic: TA0007-discovery
title: User enumerated AWS Systems Manager parameters - Anomaly
type: security_rules
---

## Goal
Detect when a user is attempting to retrieve a high number of parameters, through Cloudtrail's [`GetParameter`][1] event.

## Strategy
This rule sets a baseline for user activity in the `GetParameter` event, and enables detection of potentially anomalous activity when a user attempts to retrieve an anomalous volume of parameters.

An attacker may attempt to enumerate and access the AWS Systems Manager to gain access to Application Programming Interface (API) keys, database credentials, Identity and Access Management (IAM) permissions, Secure Shell (SSH) keys, certificates, and more. Once these credentials are obtained, they can be used to perform lateral movement and access restricted information.

## Triage and response
1. Investigate API activity for `{{@userIdentity.session_name}}` to determine if the specific set of API calls are malicious.
    * Use the investigation queries on the suggested actions panel.
2. Review any other security signals for `{{@userIdentity.session_name}}`.
3. If the activity is deemed malicious:
    * Rotate user credentials.
    * Determine what other API calls were made by the user.
    * Rotate any parameters that were accessed by the user with the `aws-cli` command [`put-parameter`][2].
    * Begin your organization's incident response process and investigate.
4. If the activity is benign:
    * Use the linked blog post in the suggested actions panel to tune out noise.

[1]: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParameter.html
[2]: https://docs.aws.amazon.com/cli/latest/reference/ssm/put-parameter.html
