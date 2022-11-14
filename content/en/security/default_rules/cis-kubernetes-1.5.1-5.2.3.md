---
aliases:
- v32-b38-9yc
- /security_monitoring/default_rules/v32-b38-9yc
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-5.2.3
control: 5.2.3
disable_edit: true
framework: cis-kubernetes
integration_id: kubernetes
kind: documentation
rule_category:
- Posture Management (Infra)
- Cloud Security Management
scope: kubernetes
security: compliance
source: kubernetes
title: Limit admission of containers sharing the host IPC namespace
type: security_rules
---

## Description

Do not generally permit containers to be run with the hostIPC flag set to true.

## Rationale

A container running in the host's IPC namespace can use IPC to interact with processes outside the container. There should be at least one PodSecurityPolicy (PSP) defined which does not permit containers to share the host IPC namespace. If you have a requirement to containers that require hostIPC, this should be defined in a separate PSP and you should carefully check RBAC controls to ensure that only limited service accounts and users are given permission to access that PSP.

## Audit

Get the set of PSPs with the following command: `kubectl get psp`

For each PSP, check whether privileged is enabled: `kubectl get psp <name> -o=jsonpath='{.spec.hostIPC}'`

Verify that there is at least one PSP which does not return true.

## Remediation

Create a PSP as described in the Kubernetes documentation, ensuring that the .spec.hostIPC field is omitted or set to false.

## Impact

Pods defined with spec.hostIPC: true will not be permitted unless they are run under a specific PSP.

## Default value

By default, PodSecurityPolicies are not defined.

## References

1. [https://kubernetes.io/docs/concepts/policy/pod-security-policy][1]

## CIS controls

Version 6.5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

[1]: https://kubernetes.io/docs/concepts/policy/pod-security-policy
