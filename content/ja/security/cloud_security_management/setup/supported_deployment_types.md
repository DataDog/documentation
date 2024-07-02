---
title: Cloud Security Supported Deployment Types
---

The following table summarizes the CSM features available relative to each deployment type.

| Deployment type     | 必要な Agent  (7.46+) | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities | CSM Identity Risks | CSM エージェントレススキャン |
|---------------------|------------------------|-----------------------|-------------|---------------------|--------------------|------------------------|
| AWS アカウント         |                        | {{< X >}}             |             |                     | {{< X >}}          | {{< X >}}              |
| Azure アカウント       |                        | {{< X >}}             |             |                     | {{< X >}}          |                        |
| GCP アカウント         |                        | {{< X >}}             |             |                     |                    |                        |
| Terraform           |                        |                       |             |                     |                    | {{< X >}}              |
| Docker              | {{< X >}}              | {{< X >}}             | {{< X >}}   |                     |                    |                        |
| Kubernetes          | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |                        |
| Linux               | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |                        |
| Amazon ECS/EKS      | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |                        |
| Windows             | {{< X >}}              |                       | {{< X >}}   |                     |                    |                        |
| AWS Fargate ECS/EKS | {{< X >}}              |                       | beta        |                     |                    |                        |

The following table summarizes the scope of coverage available relative to each CSM feature.
| Resources monitored             | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities | CSM Identity Risks | CSM Agentless scanning |
|---------------------------------|-----------------------|-------------|---------------------|--------------------|------------------------|
| Resources in AWS Account        | {{< X >}}             |             |                     |                    | {{< X >}}              |
| Resources in Azure Subscription | {{< X >}}             |             |                     |                    |                        |
| Resources in GCP Project        | {{< X >}}             |             |                     |                    |                        |
| Kubernetes Cluster              | {{< X >}}             | {{< X >}}   |                     |                    |                        |
| Docker Host                     | {{< X >}}             |             |                     |                    |                        |
| Linux Host                      | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    | {{< X >}}              |
| Docker Container                |                       | {{< X >}}   |                     |                    |                        |
| Container Image                 |                       |             | {{< X >}}           |                    | {{< X >}}              |
| IAM in AWS Account              |                       |             |                     | {{< X >}}          |                        |

**注**: CSM Misconfigurations は、さらに、EC2 インスタンス、RDS、S3、ELB など、Windows と AWS Fargate を実行しているクラウドアカウントで使用されている一般的なリソースを監視します。

[1]: /security/cloud_security_management/setup/#csm-threats
[2]: /security/cloud_security_management/setup/#csm-vulnerabilities
[3]: /security/cloud_security_management/setup/#csm-identity-risks
[4]: /security/cloud_security_management/setup/agentless_scanning?tab=crossaccountscanning#prerequisites