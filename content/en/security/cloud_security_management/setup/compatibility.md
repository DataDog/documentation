---
title: CSM Compatibility 
kind: documentation
further_reading:
- link: "/security/cloud_security_management/setup/csm_enterprise"
  tag: "Documentation"
  text: "Setting up CSM Enterprise"
- link: "/security/cloud_security_management/setup/csm_pro"
  tag: "Documentation"
  text: "Setting up CSM Pro"
- link: "/security/cloud_security_management/setup/csm_workload_security"
  tag: "Documentation"
  text: "Setting up CSM Workload Security"
---

## Prerequisites

Datadog Agent `7.46` or later installed on your hosts or containers. 

## Supported deployment types and features

| Type          | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities | CSM Identity Risks | 
| ------------- | --------------------- | ----------- | -------------------- | ------------------- |  
| Docker        | {{< X >}}             | {{< X >}}   |  {{< X >}}           |                     |  
| Kubernetes    | {{< X >}}             | {{< X >}}   |  {{< X >}}           |                     | 
| Linux         | {{< X >}}             | {{< X >}}   |  {{< X >}}           |                     |  
| Amazon ECS    | {{< X >}}             | {{< X >}}   |  {{< X >}}           |                     |    
| AWS Account   | {{< X >}}             |             |                      | {{< X >}}           |
| Azure Account | {{< X >}}             |             |                      |                     |
| GCP Account   | {{< X >}}             |             |                      |                     |
| Windows       |                       |  beta       |                      |                     |
| AWS Fargate   |                       |  beta       |                      |                     |


{{% csm-prereqs %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}