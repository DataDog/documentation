Datadog Agent `7.46` 以降がホストまたはコンテナにインストールされていること。

### CSM Vulnerabilities

| コンポーネント                | バージョン/要件                     |
| ------------------------ | ----------------------------------------|
| [Helm Chart][102]            | v3.49.6 以降 (Kubernetes のみ)      |
| [containerd][103]              | v1.5.6 以降 (Kubernetes とホストのみ)|

**注**: CSM Vulnerabilities は以下の環境では**利用できません**。

  - Windows
  - AWS Fargate 
  - CRI-O ランタイム
  - podman ランタイム

[102]: /containers/kubernetes/installation/?tab=helm
[103]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/