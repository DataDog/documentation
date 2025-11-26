---
title: Resource Collection for Kubernetes Explorer
---

This guide discusses resource collection in Datadog's [Kubernetes Explorer][1].

### Collected Kubernetes resources



### Collected custom resources

When the following CRDs are present in your cluster, the Agent automatically collects their Custom Resources (CRs). If a CRD you use is **not** listed here—or your Agent version is older—follow the **manual configuration** steps below.

| CRD group          | CRD kind             | CRD versions | Minimal Agent version |
| ------------------ | -------------------- | ------------ | --------------------- |
| datadoghq.com      | datadogslo           | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogdashboard     | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogagentprofile  | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogmonitor       | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogmetric        | v1alpha1     | 7.71.0                |
| datadoghq.com      | datadogpodautoscaler | v1alpha2     | 7.71.0                |
| datadoghq.com      | datadogagent         | v2alpha1     | 7.71.0                |
| argoproj.io        | rollout              | v1alpha1     | 7.71.0                |
| karpenter.sh       | *                    | v1           | 7.71.0                |
| karpenter.k8s.aws  | *                    | v1           | 7.71.0                |
| azure.karpenter.sh | *                    | v1beta1      | 7.71.0                |
