---
title: Install BYOC Logs
description: Learn how to deploy BYOC Logs on various platforms and environments
aliases:
  - /cloudprem/install/
---

## Overview

BYOC (Bring Your Own Cloud) Logs requires **Kubernetes** for production deployments. It is supported on Amazon EKS, Google GKE, and Azure AKS. A [Docker installation][2] is also available for local evaluation and testing only.

<div class="alert alert-warning">
<strong>Docker is for evaluation only.</strong> The Docker installation method is designed for exploring BYOC Logs features locally. For production workloads, deploy on a supported Kubernetes platform.
</div>

## Prerequisites

<div class="alert alert-info">
If you don't see the BYOC Logs entry in the Logs menu, contact your Datadog account team to activate BYOC Logs on your account.
</div>

### Kubernetes cluster requirements

| Requirement            | Details                                                                                  |
|------------------------|------------------------------------------------------------------------------------------|
| **Kubernetes Version** | 1.25 or higher                                                                           |
| **Supported Platforms** | - AWS EKS<br>- Google GKE<br>- Azure AKS<br><br>Self-managed Kubernetes, OpenShift, and OCI (Oracle Cloud) are not tested or supported. |
| **Metadata Storage**   | PostgreSQL database                                                                      |
| **Recommended PostgreSQL Options** | - AWS: RDS PostgreSQL<br>- GCP: Cloud SQL for PostgreSQL<br>- Azure: Azure Database for PostgreSQL<br>- Self-hosted: PostgreSQL with persistent storage |

### Object storage
BYOC Logs supports the following object storage types:
- Amazon S3
- Google Cloud Storage (GCS)
- Azure Blob Storage

## Cloud-managed Kubernetes

{{< whatsnext desc="Select the installation guide that matches your environment:">}}
  {{< nextlink href="/byoc-logs/install/aws_eks" >}}Install on AWS EKS{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/install/azure_aks" >}}Install on Azure AKS{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/install/gcp_gke" >}}Install on GCP GKE{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/install/docker" >}}Install locally with Docker for testing{{< /nextlink >}}
{{< /whatsnext >}}

[2]: /byoc-logs/install/docker/
