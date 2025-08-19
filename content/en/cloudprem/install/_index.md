---
title: Install CloudPrem
description: Learn how to deploy CloudPrem on various platforms and environments
private: true
---

## Overview

CloudPrem can be deployed in various environments, from cloud-managed Kubernetes services to bare metal servers. This section guides you through the installation process for Kubernetes distribution only.

## Choose your installation method

Select the installation guide that matches your environment:

### Cloud-managed Kubernetes

{{< whatsnext desc="">}}
  {{< nextlink href="./aws-eks/" >}}Install CloudPrem on AWS EKS{{< /nextlink >}}
  {{< nextlink href="./azure-aks/" >}}Install CloudPrem on Azure AKS{{< /nextlink >}}
{{< /whatsnext >}}

### Self-managed Kubernetes

{{< whatsnext desc="">}}
  {{< nextlink href="./kubernetes-nginx/" >}}Install CloudPrem on a Kubernetes cluster using NGINX Ingress Controller{{< /nextlink >}}
{{< /whatsnext >}}

## Next steps

{{< whatsnext desc="After completing the installation:">}}
   {{< nextlink href="../configure/datadog-account/" >}}Configure your Datadog account{{< /nextlink >}}
   {{< nextlink href="../ingest-logs/" >}}Configure log ingestion{{< /nextlink >}}
   {{< nextlink href="../manage/" >}}Review management and operations{{< /nextlink >}}
{{< /whatsnext >}}

