---
aliases:
- f1m-wja-apn
- /security_monitoring/default_rules/f1m-wja-apn
- /security_monitoring/default_rules/k8s_pod_service_account_accessed_unusual
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
title: Unfamiliar process accessed Kubernetes pod service account token
type: security_rules
---

Detects when the Kubernetes pod service account token has been viewed by a user.

## Strategy
Kubernetes uses service accounts as its own internal identity system. Pods can authenticate with the Kubernetes API server using an auto-mounted token that only the Kubernetes API server could validate. These service account tokens can be used to authenticate to the Kubernetes API.
Kubernetes uses service accounts as its own internal identity system. Pods can authenticate with the Kubernetes API server using an auto-mounted token that only the Kubernetes API server could validate. These service account tokens can be used to authenticate to the Kubernetes API.

This rule uses the New Value detection method. Datadog will learn the historical behavior of a specified field in agent logs and then create a signal when unfamiliar values appear.

## Triage and response
1. Determine which user executed the command to read the token and determine if that access is authorized.
2. If this behavior is unexpected, attempt to contain the compromise (this may be achieved by terminating the workload, depending on the stage of attack), and look for indications of initial compromise. Follow your organization's internal processes for investigating and remediating compromised systems.
4. Determine the nature of the attack and network tools involved. Investigate security signals (if present) occurring around the time of the event to establish an attack path and signals from other tools. For example, if a DNS exfiltration attack is suspected, examine DNS traffic and servers if available.
5. Find and repair the root cause of the exploit.

*Requires Agent version 7.27 or greater*
