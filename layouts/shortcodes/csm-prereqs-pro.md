Datadog Agent `7.46` or later installed on your hosts or containers.  

### CSM Vulnerabilities

| Component                | Version/Requirement                     |
| ------------------------ | ----------------------------------------|
| [Helm Chart][102]            | v3.49.6 or later (Kubernetes only)      |
| [containerd][103]              | v1.5.6 or later (Kubernetes and hosts only)|

**Note**: CSM Vulnerabilities is **not** available for the following environments:

  - Windows
  - AWS Fargate 
  - CRI-O runtime
  - podman runtime

[102]: /containers/kubernetes/installation/?tab=helm
[103]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/