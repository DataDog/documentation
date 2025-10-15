---
title: Cloud Security Supported Deployment Types
---

{{< partial name="security-platform/CSW-billing-note.html" >}}

The following table summarizes the scope of coverage available relative to each Cloud Security feature.
| Resources monitored             | Misconfigurations | Vulnerabilities      | Identity Risks | Agentless scanning |
|---------------------------------|-------------------|----------------------|----------------|--------------------|
| Resources in AWS Account        | {{< X >}}         | {{< X >}}            |                | {{< X >}}          |
| Resources in Azure Subscription | {{< X >}}         | {{< X >}}            |                | {{< X >}}          |
| Resources in GCP Project        | {{< X >}}         | {{< X >}}            |                | Coming soon        |
| Kubernetes Cluster              | {{< X >}}         | {{< X >}}            |                | {{< X >}}          |
| Docker Host                     | {{< X >}}         |                      |                |                    |
| Linux Host                      | {{< X >}}         | {{< X >}}            |                | {{< X >}}          |
| Windows Host                    |                   | {{< X >}}            |                | {{< X >}}          |
| Docker Container                |                   |                      |                |                    |
| Running Container Image         |                   | {{< X >}}            |                | {{< X >}}          |
| Container Registry              |                   | AWS ECR via Agentless|                | AWS ECR            |
| IAM in AWS Account              |                   |                      | {{< X >}}      |                    |

**Note**: Cloud Security Misconfigurations additionally monitors common resources used in your cloud accounts that are running Windows and AWS Fargate, such as EC2 instances, RDS, S3, and ELB.

The following table summarizes available deployment types for each Cloud Security feature.

| Deployment type     | Agent Required (7.46+) | Misconfigurations | Vulnerabilities              | Identity Risks | Agentless Scanning |
|---------------------|------------------------|-------------------|------------------------------|----------------|--------------------|
| AWS Account         |                        | {{< X >}}         | {{< X >}}                    | {{< X >}}      | {{< X >}}          |
| Azure Account       |                        | {{< X >}}         | {{< X >}}                    | {{< X >}}      | {{< X >}}          |
| GCP Account         |                        | {{< X >}}         | {{< X >}}                    |                | Coming soon        |
| Terraform           |                        |                   |                              |                | {{< X >}}          |
| Docker              | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Kubernetes          | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Linux               | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Amazon ECS/EKS      | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Windows             | {{< X >}}              |                   | {{< X >}}                    |                |                    |
| AWS Fargate ECS/EKS | {{< X >}}              |                   | ECS via Agentless            |                |                    |

[1]: /security/cloud_security_management/setup/#cloud-security-threats
[2]: /security/cloud_security_management/setup/#cloud-security-vulnerabilities
[3]: /security/cloud_security_management/setup/#cloud-security-identity-risks
