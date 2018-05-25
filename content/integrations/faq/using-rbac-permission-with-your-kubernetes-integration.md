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
  verbs:
  - get
```

* Create the ClusterRole, ServiceAccount, and ClusterRoleBinding:
  ```
  kubectl create -f datadog-serviceaccount.yaml
  ```

* Update the `dd-agent` daemonset config as follows:
  ```
  ...
      spec:
        serviceAccountName: datadog
  ...
  ```

* Then reload the daemonset:
  ```
  kubectl replace --force -f configs/dd-agent/dd-agent.yaml
  ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
