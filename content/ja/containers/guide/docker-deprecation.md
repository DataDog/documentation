---
aliases:
- /ja/agent/guide/docker-deprecation
title: Docker Deprecation in Kubernetes
---

Kubernetes は、バージョン 1.20 以降ランタイムとしての Docker を廃止します。また一部のクラウドプロバイダーは、画像において Docker を廃止しました。

- AKS 1.19 は [Docker を廃止し、デフォルトで containerd を使用します][1]。

- GKE 1.19 は [Docker を廃止し、新しいノードにデフォルトで containerd を使用します][2]。

- EKS 1.22 では [Docker が非推奨となり、デフォルトで containerd が使用されます][3]。

- OKE 1.20 では [Docker が非推奨となり、デフォルトで CRI-O が使用されます][4]。

Docker がすでに廃止されているバージョンの Kubernetes を実行している場合、Docker ソケットが存在しないか、Kubernetes により実行しているコンテナに関する情報がなく、Docker チェックが機能しません。Docker ランタイムに関する詳細は、[kubernetes.io][5] で確認できます。つまり、使用しているコンテナのランタイムに基づき [containerd][6] または [CRI-O][7] チェックを有効にする必要があります。新しいコンテナのランタイムから収集されたコンテナのメトリクスは、Docker メトリクスと置換されます。

Datadog Agent のバージョン 7.27 以降の場合は、実行している環境が自動的に Agent で検出されるため、コンフィギュレーションを変更する必要はありません。

**Agent v7.27 以前を使用している場合、コンテナのランタイムソケットパスを指定する必要があります。**

**注**: メトリクス名が変更されるため（たとえば `docker.*` から `containerd.*` へ）、既存のモニター、ダッシュボード、および SLO を更新する必要がある場合があります。

{{< tabs >}}
{{% tab "Helm" %}}
[Helm チャート][1]で、コンテナのランタイムソケットへのパスを `datadog.criSocketPath` パラメーターで設定します。

例:

```
criSocketPath:  /var/run/containerd/containerd.sock
```

[1]: https://github.com/DataDog/helm-charts/blob/d8817b4401b75b1a064481da989c451633249ea9/charts/datadog/values.yaml#L262-L263
{{% /tab %}}
{{% tab "DaemonSet" %}}

Docker ソケットへのすべての参照と、Docker ソケットのボリュームマウントを削除します。

環境変数 `DD_CRI_SOCKET_PATH` を使用して、コンテナのランタイムソケットパスにポイントします。専用コンテナを使用する場合は、すべての Agent コンテナに設定します。

```
env:
  - name: DD_CRI_SOCKET_PATH
    value: /var/run/containerd/containerd.sock
```

ホストから Agent コンテナへソケットをマウントします。

```
volumeMounts:
  - name: containerdsocket
    mountPath: /var/run/containerd/containerd.sock
  - mountPath: /host/var/run
    name: var-run
    readOnly: true
volumes:
  - hostPath:
      path: /var/run/containerd/containerd.sock
    name: containerdsocket
  - hostPath:
      path: /var/run
    name: var-run
```

{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/Azure/AKS/releases/tag/2020-11-16
[2]: https://cloud.google.com/kubernetes-engine/docs/release-notes#December_08_2020
[3]: https://aws.amazon.com/blogs/containers/amazon-eks-1-21-released/
[4]: https://docs.oracle.com/en-us/iaas/releasenotes/changes/52d34150-0cb8-4a0f-95f3-924dec5a3c83/
[5]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/check-if-dockershim-deprecation-affects-you/#role-of-dockershim
[6]: /ja/integrations/containerd/
[7]: /ja/integrations/crio/