---
title: Datadog Cluster Agent when using Azure Kubernetes Service (AKS).
---

Depending on how you deployed the manifest, you might be using readiness probes. Azure AKS requires extra permissions in the Cluster Role in order for the health endpoint to be reachable.

On AKS, the default RBAC does not allow access to `/healthz` for unauthenticated users. The following RBAC fixes that:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: system:healthz
rules:
- nonResourceURLs:
  - /healthz
  verbs:
  - get
---
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: system:healthz
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:healthz
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: system:authenticated
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: system:unauthenticated
```
