Does your Cluster Agent restarts all the time on AKS?

It might be because you have deployed it with our helm chart and the readiness probe is killing it.
On AKS, the default RBAC does not allow access to /healthz for unauthenticated users.
The following RBAC fixes that:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: system:healthz
rules:
- nonResourceURLs:
  - /healthz
  verbs:
  - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
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