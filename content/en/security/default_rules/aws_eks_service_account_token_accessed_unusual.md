---
aliases:
- moi-gio-c9a
- /security_monitoring/default_rules/moi-gio-c9a
- /security_monitoring/default_rules/aws_eks_service_account_token_accessed_unusual
disable_edit: true
integration_id: runtime security
kind: documentation
rule_category:
- Workload Security
- Cloud Security Management
security: attack
source: runtime security
tactic: TA0006-credential-access
technique: T1552-unsecured-credentials
title: Unfamiliar process accessed AWS EKS service account token
type: security_rules
---

## Goal
Detects when the AWS EKS service account token has been viewed by a user.

## Strategy
AWS provides an authentication mechanism called [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) to allow Kubernetes workloads such as pods to securely authenticate to AWS without hardcoding credentials.

The authentication token made available by AWS is located at `/var/run/secrets/eks.amazonaws.com/serviceaccount/token` and can be exchanged for AWS credentials using `sts:AssumeRoleWithWebIdentity`. It is consequently an attractive target for attackers.

This rule uses the New Value detection method. Datadog will learn the historical behavior of a specified field in agent logs and then create a signal when unfamiliar values appear.

## Triage and response
1. Determine which user executed the command to read the token and determine if that access is authorized.
2. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack), and look for indications of initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
4. Determine the nature of the attack and network tools involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path and signals from other tools. For example, if a DNS exfiltration attack is suspected, examine DNS traffic and servers if available.
5. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
