---
title: Supported Deployment Types
disable_toc: false
---

The following table summarizes Workload Protection relative to deployment types.

|          | Docker    | Kubernetes | Linux     | Amazon ECS/EKS | Windows   | AWS Fargate ECS/EKS | AWS Account | Azure Account | GCP Account | Terraform |
|------------------------|-----------|------------|-----------|----------------|-----------|---------------------|-------------|---------------|-------------|-----------|
| Agent Required (7.46+) | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}}      | {{< X >}} | {{< X >}}           |             |               |             |           |
| Workload Protection    | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}}      | {{< X >}} | {{< X >}}           |             |               |             |           |

The following table summarizes the scope of coverage available relative to Workload Protection.

| Resources monitored             | Workload Protection |
|---------------------------------|---------------------|
| Resources in AWS Account        |                     |
| Resources in Azure Subscription |                     |
| Resources in GCP Project        |                     |
| Kubernetes Cluster              | {{< X >}}           |
| Docker Host                     |                     |
| Linux Host                      | {{< X >}}           |
| Windows Host                    | {{< X >}}           |
| Docker Container                | {{< X >}}           |
| Container Image                 |                     |
| IAM in AWS Account              |                     |





