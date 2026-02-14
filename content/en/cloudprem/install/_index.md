---
title: Install CloudPrem
description: Learn how to deploy CloudPrem on various platforms and environments
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

CloudPrem can be deployed in various environments, from cloud-managed Kubernetes services to bare metal servers. The provided installation instructions are specific to **Kubernetes distributions**.

## Prerequisites

<div class="alert alert-info">
If you don't see the CloudPrem entry in the Logs menu, it means CloudPrem is not activated on your account. Join the <a href="https://www.datadoghq.com/product-preview/cloudprem/">CloudPrem Preview</a> to activate CloudPrem on your account.
</div>

### Kubernetes cluster requirements

| Requirement            | Details                                                                                  |
|------------------------|------------------------------------------------------------------------------------------|
| **Kubernetes Version** | 1.25 or higher                                                                           |
| **Recommended Platforms** | - AWS EKS<br>- Google GKE<br>- Azure AKS<br>- Self-managed Kubernetes (Nginx controller) |
| **Metadata Storage**   | PostgreSQL database                                                                      |
| **Recommended PostgreSQL Options** | - AWS: RDS PostgreSQL<br>- GCP: Cloud SQL for PostgreSQL<br>- Azure: Azure Database for PostgreSQL<br>- Self-hosted: PostgreSQL with persistent storage |

### Object storage
CloudPrem supports the following object storage types:
- Amazon S3
- Google Cloud Storage (GCS)
- Azure Blob Storage
- MinIO
- Ceph Object Storage
- Any S3-compatible storage

## Cloud-managed Kubernetes

{{< whatsnext desc="Select the installation guide that matches your environment:">}}
  {{< nextlink href="/cloudprem/install/aws_eks" >}}Install on AWS EKS{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/azure_aks" >}}Install on Azure AKS{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/gcp_gke" >}}Install on GCP GKE{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/docker" >}}Install locally with Docker for testing{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/custom_k8s" >}}Install on Custom Kubernetes (manual){{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/