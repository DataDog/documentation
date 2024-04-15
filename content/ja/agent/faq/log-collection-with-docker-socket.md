---
aliases:
- /ja/agent/faq/kubernetes-docker-socket-log-collection
further_reading:
- link: /agent/autodiscovery/
  tag: documentation
  text: Docker Agent オートディスカバリー
- link: /agent/kubernetes/host_setup/
  tag: documentation
  text: Kubernetes DaemonSet のセットアップ
- link: /agent/kubernetes/integrations/
  tag: documentation
  text: カスタムインテグレーション

title: Docker ソケットによるログ収集
---

Agent がログを収集する方法には、Docker ソケットから収集する方法と、Kubernetes ログファイルから収集する方法 (Kubernetes によって自動的に処理されます) の 2 つがあります。次の場合にログファイル収集を使用します。

* Docker がランタイムではない、**または**
* 各ノードで 10 個を超えるコンテナが使用されている

Docker API は、一度に 1 つのコンテナからログを取得するように最適化されています。同じノードに多数のコンテナがある場合、Docker ソケットからのログ収集は、ファイルからの収集よりはるかに多くのリソースを消費する可能性があります。

{{< tabs >}}
{{% tab "DaemonSet" %}}

Docker ソケットを Datadog Agent にマウントします。

```yaml
  # (...)
    env:
      - {name: "DD_CRI_SOCKET_PATH", value: "/host/var/run/docker.sock"}
      - {name: "DOCKER_HOST", value: "unix:///host/var/run/docker.sock"}
  # (...)
    volumeMounts:
    #  (...)
      - name: dockersocketdir
        mountPath: /host/var/run
  # (...)
  volumes:
    # (...)
    - hostPath:
        path: /var/run
      name: dockersocketdir
  # (...)
```

**注**: Docker デーモンの再起動後、ソケットが含まれるディレクトリ全体ではなく、`docker.sock` ソケットのみをマウントすると、Agent が回復できなくなります。

{{% /tab %}}
{{< /tabs >}}

### 存続期間の短いコンテナ {#short-lived-container-socket}

Docker 環境では、Agent は Docker イベントによりコンテナのアップデートをリアルタイムに受け取ります。Agent は 1 秒ごとにコンテナラベル（オートディスカバリー）からコンフィギュレーションを抽出しアップデートします。
Agent v6.14 以降、Agent はすべてのコンテナ（実行中かは問わず）のログを収集します。つまり、直近の 1 秒間に開始し停止した存続期間の短いコンテナのログは、削除されるまで収集されます。
