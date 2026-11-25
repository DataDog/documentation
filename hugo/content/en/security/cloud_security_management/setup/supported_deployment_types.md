---
title: Cloud Security Supported Deployment Types
---

{{< partial name="security-platform/CSW-billing-note.html" >}}

The following table summarizes the Cloud Security features available relative to each deployment type.

| Deployment type     | Agent required | Misconfigurations | Vulnerabilities | Identity Risks | Agentless Scanning |
|---------------------|----------------|-------------------|-----------------|----------------|--------------------|
| AWS Account         |                | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| Azure Subscription  |                | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| GCP Project         |                | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| OCI Tenancy         |                | {{< X >}}         |                 |                |                    |
| Docker              | {{< X >}}      | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Kubernetes          | {{< X >}}      | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Linux               | {{< X >}}      | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Amazon ECS/EKS      | {{< X >}}      | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Windows             | {{< X >}}      |                   | {{< X >}}       |                | {{< X >}}          |
| AWS Fargate ECS/EKS | {{< X >}}      |                   | {{< X >}}       |                | {{< X >}}          |

For the minimum Agent version required on each platform, see [Setting up Cloud Security on the Agent][1].

Agentless Scanning is available on AWS, Azure, and GCP. For Agent-based deployment types, it covers hosts and containers running on these cloud providers, whether or not they run Docker or Kubernetes. It does not cover on-premises infrastructure. For the full list of supported resources, including serverless workloads and container registries, see [Agentless Scanning compatibility][2].

The following table summarizes the scope of coverage available relative to each Cloud Security feature.
| Resources monitored | Misconfigurations | Vulnerabilities | Identity Risks | Agentless scanning |
|---------------------|-------------------|-----------------|----------------|--------------------|
| AWS Resources/IAM   | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| Azure Resources/IAM | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| GCP Resources/IAM   | {{< X >}}         | {{< X >}}       | {{< X >}}      | {{< X >}}          |
| OCI Resources/IAM   | {{< X >}}         |                 |                |                    |
| Kubernetes Cluster  | {{< X >}}         |                 |                |                    |
| Docker Host         | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Linux Host          | {{< X >}}         | {{< X >}}       |                | {{< X >}}          |
| Windows Host        |                   | {{< X >}}       |                | {{< X >}}          |
| Docker Container    |                   | {{< X >}}       |                | {{< X >}}          |
| Container Image     |                   | {{< X >}}       |                | {{< X >}}          |

<div class="alert alert-info">
  <ul>
    <li>Cloud Security Misconfigurations additionally monitors common resources used in your cloud accounts that are running Windows and AWS Fargate, such as EC2 instances, RDS, S3, and ELB.</li>
    <li>For Kubernetes clusters, Cloud Security Vulnerabilities reports vulnerabilities on the cluster's hosts and container images.</li>
  </ul>
</div>

[1]: /security/cloud_security_management/setup/agent/
[2]: /security/cloud_security_management/setup/agentless_scanning/compatibility/
