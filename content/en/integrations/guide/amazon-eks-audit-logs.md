---
title: Log collection for Amazon EKS audit logs
kind: guide
---

## Overview

Amazon EKS audit logs give cluster administrators insight into actions within an EKS cluster. Paired with Datadog [Security Monitoring][1], you can collect your EKS audit logs to create rules that trigger signals whenever an unwarranted action happens within your EKS cluster.

## Setup

### Datadog Forwarder

### Datadog AWS integration

### Create an Amazon EKS Cluster

If you do not have an Amazon EKS cluster, create one by following the [Creating an Amazon EKS Cluster][] documentation.

On the Configure logging page, enable Audit logs.

If you already have an Amazon EKS cluster configured, navigate to your cluster in the [Amazon EKS console][].

### Amazon CloudWatch log group collection

## Log Explorer

## Next Steps


https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
https://console.aws.amazon.com/eks/home#/clusters
[1]: https://docs.datadoghq.com/security_platform/security_monitoring/
