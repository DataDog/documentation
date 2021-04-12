---
aliases:
- xt2-taa-c27
control: 5.2.5
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Minimize the admission of containers with allowPrivilegeEscalation
type: security_rules
---

## Description

Do not generally permit containers to be run with the allowPrivilegeEscalation flag set to true.

## Rationale

A container running with the `allowPrivilegeEscalation` flag set to true may have processes that can gain more privileges than their parent. There should be at least one PodSecurityPolicy (PSP) defined which does not permit containers to allow privilege escalation. The option exists (and is defaulted to true) to permit setuid binaries to run. If you have need to run containers that use setuid binaries or require privilege escalation, this should be defined in a separate PSP and you should carefully check RBAC controls to ensure that only limited service accounts and users are given permission to access that PSP.

## Audit

Get the set of PSPs with the following command: `kubectl get psp`

For each PSP, check whether privileged is enabled: `kubectl get psp <name> -o=jsonpath='{.spec.allowPrivilegeEscalation}'`

Verify that there is at least one PSP which does not return true.

## Remediation

Create a PSP as described in the Kubernetes documentation, ensuring that the `.spec.allowPrivilegeEscalation` field is omitted or set to false.

## Impact

Pods defined with `spec.allowPrivilegeEscalation: true` will not be permitted unless they are run under a specific PSP.

## Default Value

By default, PodSecurityPolicies are not defined.

## References

1. [https://kubernetes.io/docs/concepts/policy/pod-security-policy][1]

## CIS Controls

Version 6 5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

[1]: https://kubernetes.io/docs/concepts/policy/pod-security-policy
