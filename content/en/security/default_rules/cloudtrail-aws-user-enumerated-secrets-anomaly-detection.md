---
aliases:
- 81g-402-ow1
- /security_monitoring/default_rules/81g-402-ow1
- /security_monitoring/default_rules/cloudtrail-aws-user-enumerated-secrets-anomaly-detection
disable_edit: true
iaas: aws
integration_id: cloudtrail
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
security: attack
source: cloudtrail
tactic: TA0007-discovery
title: User enumerated AWS Secrets Manager - Anomaly
type: security_rules
---

## Goal
Detect when a user is attempting to retrieve a high number of secrets while also receiving an error message of `AccessDenied`, through Cloudtrail's [`GetSecretValue`][1] event.

## Strategy
This rule sets a baseline for user activity in the `GetSecretValue` event, and enables the detection of potentially anomalous activity when a user receives an anomalous number of `AccessDenied` messages while attempting to retrieve secrets.

An attacker may attempt to enumerate and access the AWS Secrets Manager to gain access to Application Programming Interface (API) keys, database credentials, Identity and Access Management (IAM) permissions, Secure Shell (SSH) keys, certificates, and more. Once these credentials are obtained, they can be used to perform lateral movement and access restricted information.

## Triage and response
1. Investigate API activity for `{{@userIdentity.session_name}}` to determine if the specific set of API calls are malicious.
    * Use the investigation queries on the suggested actions panel.
2. Review any other security signals for `{{@userIdentity.session_name}}`.
3. If the activity is deemed malicious:
    * Rotate user credentials.
    * Determine what other API calls were made by the user.
    * Rotate any AWS secrets that were accessed by the user with the `aws-cli` command [`update-secret`][2] or use the [AWS Console][3].
    * Begin your organization's incident response process and investigate.
4. If the activity is benign:
    * Use the linked blog post in the suggested actions panel to tune out noise.

## Changelog
* 25 October 2022 - Updated query.

[1]: https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
[2]: https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/update-secret.html
[3]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/manage_update-secret.html
