---
title: Compatibility 
kind: documentation
further_reading:
- link: "/security/cloud_security_management/setup/csm_enterprise"
  tag: "Documentation"
  text: "Setting up CSM Enterprise"
- link: "/security/cloud_security_management/setup/csm_pro"
  tag: "Documentation"
  text: "Setting up CSM Pro"
---

## Supported CSM deployment types

| Type          | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities | CSM Identity Risks | 
| ------------- | --------------------- | ----------- | -------------------- | ------------------- |  
| Docker        | {{< X >}}             | {{< X >}}   |  {{< X >}}           |                     |  
| Kubernetes    | {{< X >}}             | {{< X >}}   |  {{< X >}}           |                     | 
| Linux         | {{< X >}}             | {{< X >}}   |  {{< X >}}           |                     |  
| Amazon ECS    | {{< X >}}             | {{< X >}}   |  {{< X >}}           |                     |    
| AWS Account   |  {{< X >}}            |             |                      | {{< X >}}           |
| Azure Account |  {{< X >}}            |             |                      |                     |
| GCP Account   |  {{< X >}}            |             |                      |                     |
| Windows       |                       |  beta       |                      |                     |
| AWS Fargate   |                       |             |                      |                     |


## CSM Product 

| Feature                          | CSM Enterprise                       | CSM Pro                   | Cloud Workload Security | 
| -------------------------------- | ----------------------------|---------------------------|-------------------------|
| CSM Misconfigurations            |    {{< X >}}                |   {{< X >}}               |
| CSM Threats                      |    {{< X >}}                |                           | {{< X >}}
| CSM Vulnerabilities              |    {{< X >}}                |   {{< X >}}               |
| CSM Identity Risks               |    {{< X >}}                |                           |

## Scope of protection
| Protection scope                  | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities  | CSM Identity Risks | 
| ----------------------------------| --------------------- | ----------- | -------------------- | ------------------- |  
| Resources in AWS Account          | {{< X >}}             |             |                      |                     |  
| Resources in Azure Subscription   | {{< X >}}             |             |                      |                     | 
| Resources in GCP Project          | {{< X >}}             |             |                      |                     |  
| Kubernetes Cluster                | {{< X >}}             | {{< X >}}   |                      |                     |  
| Docker Host                       | {{< X >}}             |             |                      |                     |
| Linux Host                        | {{< X >}}             | {{< X >}}   |    {{< X >}}         |                     |  
| Docker Container                  |                       | {{< X >}}   |                      |                     |
| Container Image                   |                       |             |    {{< X >}}         |                     |
| IAM in AWS Account                |                       |             |                      |  {{< X >}}          |






## Further Reading

{{< partial name="whats-next/whats-next.html" >}}