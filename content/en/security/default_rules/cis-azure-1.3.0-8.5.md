---
aliases:
- i1g-d5o-j28
- /security_monitoring/default_rules/i1g-d5o-j28
- /security_monitoring/default_rules/cis-azure-1.3.0-8.5
disable_edit: true
integration_id: azure.kubernetes
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.kubernetes
title: RBAC within Azure Kubernetes Services is enabled
type: security_rules
---

## Description

Ensure that RBAC is enabled on all Azure Kubernetes Services instances.

## Rationale

Azure Kubernetes Services can integrate Azure Active Directory users and groups into Kubernetes RBAC controls within the AKS Kubernetes API Server. Use this to enable granular access to Kubernetes resources within the AKS clusters supporting RBAC controls, both to the overarching AKS instance and to the individual resources managed within Kubernetes.

## Remediation

**Note**: This setting cannot be changed after AKS deployment, your cluster will require recreation.

## Impact

If RBAC is not enabled, the granularity of permissions granted to Kubernetes resources is diminished, because you are presenting more permissions than needed to users requiring access to your Kubernetes resources in AKS.

## References

1. https://docs.microsoft.com/en-us/azure/aks/aad-integrationhttps://kubernetes.io/docs/reference/access-authn-authz/rbac/https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-list
2. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-privileged-access#pa-7-follow-just-enough-administration-least-privilege-principle

## CIS Controls

Version 7

4 Controlled Use of Administrative Privileges

14 Controlled Access Based on the Need to Know

9 AppService: This section covers security recommendations for Azure AppService
