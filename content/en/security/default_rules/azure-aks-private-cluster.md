---
aliases:
- t1g-z9a-3l8
- /security_monitoring/default_rules/t1g-z9a-3l8
- /security_monitoring/default_rules/azure-aks-private-cluster
cloud: azure
disable_edit: true
integration_id: azure.kubernetes
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
security: compliance
source: azure.kubernetes
title: Azure Kubernetes Service (AKS) Private Cluster Feature is enabled
type: security_rules
---

## Description

The Private Cluster feature for Azure Kubernetes Service (AKS) cluster is enabled.

## Rationale

The Private Cluster feature ensures that network traffic between your API server and your node pools remains solely on the private network. The API server is not exposed over the internet as it is with the standard AKS deployment. This configuration is a common requirement in many regulatory and industry compliance standards.

## Remediation

**Note**: This setting cannot be changed after AKS deployment. Changing the setting requires recreating your cluster.

## Impact

Creating and managing a Private AKS Cluster requires additional considerations when compared to a standard AKS deployment. It requires understanding how Azure Private Link and Private Endpoints work. It also requires a thorough assessment of your AKS networking architecture and dependencies. If your AKS cluster is on an isolated Azure Virtual Network (VNET), the Private Cluster feature requires additional configurations to allow connectivity between your AKS Cluster and your management VNET. Microsoft's official documentation, which is included in ``references``, helps you navigate the deployment of Private AKS Clusters.

## References

1. [https://docs.microsoft.com/en-us/azure/aks/private-clusters][1]
2. [https://docs.microsoft.com/en-us/azure/private-link/private-link-service-overview][2]
3. [https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-overview][3]

[1]: https://docs.microsoft.com/en-us/azure/aks/private-clusters
[2]: https://docs.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-overview
