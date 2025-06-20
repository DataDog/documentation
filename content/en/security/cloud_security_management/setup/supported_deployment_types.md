---
title: Cloud Security Supported Deployment Types
---

{{< partial name="security-platform/CSW-billing-note.html" >}}

The following table summarizes the Cloud Security features available relative to each deployment type.

| Deployment type     | Agent Required (7.46+) | Misconfigurations | Vulnerabilities              | Identity Risks | Agentless Scanning |
|---------------------|------------------------|-------------------|------------------------------|----------------|--------------------|
| AWS Account         |                        | {{< X >}}         | {{< X >}}                    | {{< X >}}      | {{< X >}}          |
| Azure Account       |                        | {{< X >}}         | Agentless Scanning (Preview) | {{< X >}}      |                    |
| GCP Account         |                        | {{< X >}}         |                              |                |                    |
| Terraform           |                        |                   |                              |                | {{< X >}}          |
| Docker              | {{< X >}}              | {{< X >}}         |                              |                |                    |
| Kubernetes          | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Linux               | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Amazon ECS/EKS      | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Windows             | {{< X >}}              |                   | {{< X >}}                    |                |                    |
| AWS Fargate ECS/EKS | {{< X >}}              |                   |                              |                |                    |

The following table summarizes the scope of coverage available relative to each Cloud Security feature.
| Resources monitored             | Misconfigurations | Vulnerabilities | Identity Risks | Agentless scanning |
|---------------------------------|-------------------|-----------------|----------------|--------------------|
| Resources in AWS Account        | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Resources in Azure Subscription | {{< X >}}         |                 |                |                    |
| Resources in GCP Project        | {{< X >}}         |                 |                |                    |
| Kubernetes Cluster              | {{< X >}}         |                 |                |                    |
| Docker Host                     | {{< X >}}         |                 |                |                    |
| Linux Host                      | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Windows Host                    |                   | {{< X >}}       |                |                    |
| Docker Container                |                   |                 |                |                    |
| Container Image                 |                   | {{< X >}}       |                | {{< X >}}          |
| IAM in AWS Account              |                   |                 | {{< X >}}      |                    |

**Note**: Cloud Security Misconfigurations additionally monitors common resources used in your cloud accounts that are running Windows and AWS Fargate, such as EC2 instances, RDS, S3, and ELB.

[1]: /security/cloud_security_management/setup/#cloud-security-threats
[2]: /security/cloud_security_management/setup/#cloud-security-vulnerabilities
[3]: /security/cloud_security_management/setup/#cloud-security-identity-risks
