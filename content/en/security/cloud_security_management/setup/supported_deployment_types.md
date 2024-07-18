---
title: Cloud Security Supported Deployment Types
---

The following table summarizes the CSM features available relative to each deployment type.

| Deployment type     | Agent Required (7.46+) | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities | CSM Identity Risks | CSM Agentless Scanning |
|---------------------|------------------------|-----------------------|-------------|---------------------|--------------------|------------------------|
| AWS Account         |                        | {{< X >}}             |             |                     | {{< X >}}          | {{< X >}}              |
| Azure Account       |                        | {{< X >}}             |             |                     | {{< X >}}          |                        |
| GCP Account         |                        | {{< X >}}             |             |                     |                    |                        |
| Terraform           |                        |                       |             |                     |                    | {{< X >}}              |
| Docker              | {{< X >}}              | {{< X >}}             | {{< X >}}   |                     |                    |                        |
| Kubernetes          | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |                        |
| Linux               | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |                        |
| Amazon ECS/EKS      | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |                        |
| Windows             | {{< X >}}              |                       | {{< X >}}   | beta                |                    |                        |
| AWS Fargate ECS/EKS | {{< X >}}              |                       | beta        |                     |                    |                        |

The following table summarizes the scope of coverage available relative to each CSM feature.
| Resources monitored             | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities | CSM Identity Risks | CSM Agentless scanning |
|---------------------------------|-----------------------|-------------|---------------------|--------------------|------------------------|
| Resources in AWS Account        | {{< X >}}             |             | {{< X >}}           |                    | {{< X >}}              |
| Resources in Azure Subscription | {{< X >}}             |             |                     |                    |                        |
| Resources in GCP Project        | {{< X >}}             |             |                     |                    |                        |
| Kubernetes Cluster              | {{< X >}}             | {{< X >}}   |                     |                    |                        |
| Docker Host                     | {{< X >}}             |             |                     |                    |                        |
| Linux Host                      | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    | {{< X >}}              |
| Windows Host                    |                       | {{< X >}}   | beta                |                    |                        |
| Docker Container                |                       | {{< X >}}   |                     |                    |                        |
| Container Image                 |                       |             | {{< X >}}           |                    | {{< X >}}              |
| IAM in AWS Account              |                       |             |                     | {{< X >}}          |                        |

**Note**: CSM Misconfigurations additionally monitors common resources used in your cloud accounts that are running Windows and AWS Fargate, such as EC2 instances, RDS, S3, and ELB.

[1]: /security/cloud_security_management/setup/#csm-threats
[2]: /security/cloud_security_management/setup/#csm-vulnerabilities
[3]: /security/cloud_security_management/setup/#csm-identity-risks
[4]: /security/cloud_security_management/setup/agentless_scanning?tab=crossaccountscanning#prerequisites
