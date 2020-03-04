---
title: Kubernetes Metrics
kind: documentation
---

Metrics collected by the Agent when deployed on your Kubernetes cluster:

## Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

## Kubelet

{{< get-metrics-from-git "kubelet" >}}

## kube-state-metrics

Note that `kubernetes_state.*` metrics are gathered from the `kube-state-metrics` API.

{{< get-metrics-from-git "kubernetes_state" >}}

## kube-dns

{{< get-metrics-from-git "kube_dns" >}}

## Kubernetes Proxy

{{< get-metrics-from-git "kube_proxy" >}}
