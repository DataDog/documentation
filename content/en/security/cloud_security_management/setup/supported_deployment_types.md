---
title: Cloud Security Supported Deployment Types
---

{{< partial name="security-platform/CSW-billing-note.html" >}}

The following table summarizes the Cloud Security features available relative to each deployment type.

| Deployment type     | Agent Required (7.46+) | Misconfigurations | Vulnerabilities              | Identity Risks | Agentless Scanning |
|---------------------|------------------------|-------------------|------------------------------|----------------|--------------------|
| AWS Account         |                        | {{< X >}}         | {{< X >}}                    | {{< X >}}      | {{< X >}}          |
| Azure Subscription  |                        | {{< X >}}         | {{< X >}}                    | {{< X >}}      | {{< X >}}          |
| GCP Project         |                        | {{< X >}}         | {{< X >}}                    | {{< X >}}      | {{< X >}}          |
| Terraform           |                        |                   |                              |                | {{< X >}}          |
| Docker              | {{< X >}}              | {{< X >}}         |                              |                |                    |
| Kubernetes          | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Linux               | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                |                    |
| Amazon ECS/EKS      | {{< X >}}              | {{< X >}}         | {{< X >}}                    |                | {{< X >}}          |
| Windows             | {{< X >}}              |                   | {{< X >}}                    |                |                    |
| AWS Fargate ECS/EKS | {{< X >}}              |                   |                              |                | ECS Fargate only |

The following table summarizes the scope of coverage available relative to each Cloud Security feature.
| Resources monitored             | Misconfigurations | Vulnerabilities | Identity Risks | Agentless scanning |
|---------------------------------|-------------------|-----------------|----------------|--------------------|
| AWS Resources                   | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| Azure Resources                 | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| GCP Resources                   | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| Kubernetes Cluster              | {{< X >}}         |                 |                |                    |
| Docker Host                     | {{< X >}}         |                 |                |                    |
| Linux Host                      | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Windows Host                    |                   | {{< X >}}       |                | {{< X >}}          |
| Docker Container                |                   |                 |                | {{< X >}}          |
| Container Image                 |                   | {{< X >}}       |                | {{< X >}}          |

**Note**: Cloud Security Misconfigurations additionally monitors common resources used in your cloud accounts that are running Windows and AWS Fargate, such as EC2 instances, RDS, S3, and ELB.

[1]: /security/cloud_security_management/setup/#cloud-security-threats
[2]: /security/cloud_security_management/setup/#cloud-security-vulnerabilities
[3]: /security/cloud_security_management/setup/#cloud-security-identity-risks
