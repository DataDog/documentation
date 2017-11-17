---
title: Using RBAC permission with your Kubernetes integration
kind: faq
customnav: integrationsnav
---

Use these Kubernetes RBAC entities for your Datadog agent to properly configure the previous permissions by [applying this datadog service account to your pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/):

```yaml
  kind: ClusterRole
  apiVersion: rbac.authorization.k8s.io/v1beta1
  metadata:
    name: datadog
  rules:
  - nonResourceURLs:
    - "/version"  # Used to get apiserver version metadata
    - "/healthz"  # Healthcheck
    verbs: ["get"]
  - apiGroups: [""]
    resources:
      - "nodes"
      - "namespaces"  #
      - "events"      # Cluster events + kube_service cache invalidation
      - "services"    # kube_service tag
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources:
      - "configmaps"
    resourceNames: ["datadog-leader-elector"]
    verbs: ["get", "delete", "update"]
  - apiGroups: [""]
    resources:
      - "configmaps"
    verbs: ["create"]
  ---
  # You need to use that account for your dd-agent DaemonSet
  apiVersion: v1
  kind: ServiceAccount
  metadata:
    name: datadog
  automountServiceAccountToken: true
  ---
  # Your admin user needs the same permissions to be able to grant them
  # Easiest way is to bind your user to the cluster-admin role
  # See https://cloud.google.com/container-engine/docs/role-based-access-control#setting_up_role-based_access_control
  kind: ClusterRoleBinding
  apiVersion: rbac.authorization.k8s.io/v1beta1
  metadata:
    name: datadog
  subjects:
  - kind: ServiceAccount
    name: datadog
    namespace: default
  roleRef:
    kind: ClusterRole
    name: datadog
    apiGroup: rbac.authorization.k8s.io
```

* Create the ClusterRole, ServiceAccount, and ClusterRoleBinding:
  ```
  kubectl create -f datadog-serviceaccount.yaml
  ```

* Update the dd-agent daemonset config as follows:
  ```
  ...
      spec:
        serviceAccountName: datadog
  ...
  ```

5. Then reload the daemonset:
  ```
  kubectl replace --force -f configs/dd-agent/dd-agent.yaml
  ```