---
title: Using RBAC permission with your Kubernetes integration
kind: faq
---

Use these Kubernetes RBAC entities to configure permissions for your Datadog Agent service account. For more information about service accounts, see the [Kubernetes documentation][1].

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-agent
rules:
- apiGroups:
  - ""
  resources:
  - services
  - events
  - endpoints
  - pods
  - nodes
  - componentstatuses
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - configmaps
  resourceNames:
  - datadogtoken             # Kubernetes event collection state
  - datadog-leader-election  # Leader election token
  verbs:
  - get
  - update
- apiGroups:  # To create the leader election token
  - ""
  resources:
  - configmaps
  verbs:
  - create
- nonResourceURLs:
  - "/version"
  - "/healthz"
  verbs:
  - get
- apiGroups:  # Kubelet connectivity
  - ""
  resources:
  - nodes/metrics
  - nodes/spec
  - nodes/proxy
  - nodes/stats
  verbs:
  - get
---
# You need to use that account for your dd-agent DaemonSet
kind: ServiceAccount
apiVersion: v1
metadata:
  name: datadog-agent
  namespace: default
---
# Your admin user needs the same permissions to be able to grant them
# Easiest way is to bind your user to the cluster-admin role
# See https://cloud.google.com/container-engine/docs/role-based-access-control#setting_up_role-based_access_control
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-agent
subjects:
- kind: ServiceAccount
  name: datadog-agent
  namespace: default
```

* Create the ClusterRole, ServiceAccount, and ClusterRoleBinding:
  ```
  kubectl create -f datadog-serviceaccount.yaml
  ```

* Update the `dd-agent` daemonset config as follows:
  ```
  ...
      spec:
        serviceAccountName: datadog-agent
  ...
  ```

* Then reload the daemonset:
  ```
  kubectl replace --force -f configs/dd-agent/dd-agent.yaml
  ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account
