---
title: Scope of Coverage for Cloud Security Management
kind: documentation
---

The following table summarizes the scope of coverage available relative to each CSM feature.
| Resources monitored                        | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities  | CSM Identity Risks | CSM Agentless scanning |
| ----------------------------------------| --------------------- | ----------- | -------------------- | ------------------- | ----------------------| 
| Resources in AWS Account                | {{< X >}}             |             |                      |                     |  {{< X >}}
| Resources in Azure Subscription         | {{< X >}}             |             |                      |                     | 
| Resources in GCP Project                | {{< X >}}             |             |                      |                     |  
| Kubernetes Cluster                      | {{< X >}}             | {{< X >}}   |                      |                     |  
| Docker Host                             | {{< X >}}             |             |                      |                     |
| Linux Host                              | {{< X >}}             | {{< X >}}   |    {{< X >}}         |                     |  {{< X >}}
| Docker Container                        |                       | {{< X >}}   |                      |                     |
| Container Image                         |                       |             |    {{< X >}}         |                     |  {{< X >}}
| IAM in AWS Account                      |                       |             |                      |  {{< X >}}          |

**Note**: CSM Misconfigurations additionally monitors common resources used in your cloud accounts that are running Windows and AWS Fargate, such as EC2 instances, RDS, S3, and ELB.