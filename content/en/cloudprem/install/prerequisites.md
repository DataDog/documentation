---
title: CloudPrem Prerequisites
description: Understand the infrastructure and software requirements for deploying CloudPrem
private: true
further_reading:
- link: "/cloudprem/install/"
  tag: "Documentation"
  text: "Install CloudPrem"
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}

## Overview

This page outlines the infrastructure and software requirements for deploying CloudPrem.

## Infrastructure requirements

### Kubernetes cluster

**Required version**: Kubernetes 1.25 or higher

**Recommended platforms**:
- AWS EKS
- Google GKE
- Azure AKS
- Self-managed Kubernetes clusters with Nginx controller

**PostgreSQL database** is used for metadata storage.

**Recommended options**:
- **AWS**: RDS PostgreSQL
- **GCP**: Cloud SQL for PostgreSQL
- **Azure**: Azure Database for PostgreSQL
- **Self-hosted**: PostgreSQL with persistent storage

### Object storage

**Supported storage types**:
- Amazon S3
- Google Cloud Storage (GCS)
- Azure Blob Storage
- MinIO
- Ceph Object Storage
- Any S3-compatible storage

## Next step

{{< whatsnext desc="Install CloudPrem">}}
  {{< nextlink href="./aws_eks/" >}}Install on AWS EKS{{< /nextlink >}}
  {{< nextlink href="./azure_aks/" >}}Install on Azure AKS{{< /nextlink >}}
  {{< nextlink href="./kubernetes_nginx/" >}}Install on a K8s cluster with NGINX Ingress Controller{{< /nextlink >}}
{{< /whatsnext >}}

