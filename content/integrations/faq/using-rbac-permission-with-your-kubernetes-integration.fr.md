---
title: Utilisation de l'autorisation RBAC avec votre intégration Kubernetes
kind: faq
---

Utilisez ces entités RBAC Kubernetes pour configurer les autorisations pour votre compte de service Datadog Agent. Pour plus d'informations sur les comptes de service, consultez la documentation [Kubernetes][1].

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
      - "events"      # Cluster events 
      - "services"    # kube_service tag
      - "pods"
      - "endpoints"   # kube_service tag
      - "componentstatuses"
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources:
      - "configmaps"
    resourceNames: ["datadog-leader-election"]
    verbs: ["get", "list", "create", "delete", "update"]
  - apiGroups: [""]
    resources:
      - "configmaps"
    verbs: ["create"]
  - apiGroups: [""]
    resources:
      - "configmaps"
    resourceNames: ["datadogtoken"]
    verbs: ["get", "update"]    
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

* Créez le ClusterRole, ServiceAccount et ClusterRoleBinding:
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

5. Puis rechargez le daemonset:
  ```
  kubectl replace --force -f configs/dd-agent/dd-agent.yaml
  ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
