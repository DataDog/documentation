---
title: Getting Started with the Datadog Operator
further_reading:
  - link: /containers/datadog_operator
    tag: documentation
    text: Datadog Operator
  - link: "https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md"
    tag: ソースコード
    text: "Datadog Operator: Advanced Installation"
  - link: "https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md"
    tag: ソースコード
    text: "Datadog Operator: Configuration"
---

[Datadog Operator][1] は、Kubernetes 環境に Datadog Agent をデプロイし、構成することができるオープンソースの [Kubernetes Operator][2] です。このガイドでは、Datadog Agent をデプロイするために Operator を使用する方法について説明します。

## 前提条件

- Kubernetes v1.20.X+
- Datadog Operator をデプロイするための [Helm][3]
- Datadog Agent をインストールするための Kubernetes コマンドラインツール、[kubectl][4]

## インストールとデプロイメント

1. Helm で Datadog Operator をインストールします。
  ```bash
  helm repo add datadog https://helm.datadoghq.com
  helm install my-datadog-operator datadog/datadog-operator
  ```
2. Create a Kubernetes secret with your API key:
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
  ```
  Replace `<DATADOG_API_KEY>` with your [Datadog API key][5].

  **Note**: add the application key for autoscaling using the external metrics server.

3. `DatadogAgent` のデプロイメント構成の仕様を記述した `datadog-agent.yaml` ファイルを作成します。以下のサンプル構成では、メトリクス、ログ、APM を有効にしています。
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiSecret:
          secretName: datadog-secret
          keyName: api-key
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
  ```
  For all configuration options, see the [Operator configuration spec][6].

4. Datadog Agent をデプロイします。
  ```bash
  kubectl apply -f /path/to/your/datadog-agent.yaml
  ```

### Running Agents in a single container

<div class="alert alert-warning">Available in Operator v1.4.0 or later</div>

By default, the Datadog Operator creates an Agent DaemonSet with pods running multiple Agent containers. Datadog Operator v1.4.0 introduces a configuration which allows users to run Agents in a single container. In order to avoid elevating privileges for all Agents in the single container, this feature is only applicable when `system-probe` or `security-agent` is not required. For more details, see [Running as an unprivileged user][7] on the Agent Data Security page.

To enable this feature add `global.containerStrategy: single` to the `DatadogAgent` manifest:

{{< highlight yaml "hl_lines=7" >}}
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      containerStrategy: single
      credentials:
        apiSecret:
          secretName: datadog-secret
          keyName: api-key
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
{{< /highlight >}}
With the above configuration, Agent pods run as single containers with three Agent processes. The default for `global.containerStrategy` is `optimized` and runs each Agent process in a separate container.

**Note**: Running multiple Agent processes in a single container is discouraged in orchestrated environments such as Kubernetes. Pods running multiple processes need their lifecycles to be managed by a process manager, which is not directly controllable by Kubernetes and potentially leads to inconsistencies or conflicts in the container lifecycle management.

## 検証

`kubectl get daemonset` と `kubectl get pod -owide` を使用して、インストールを検証します。

2 つのワーカーノードを持つクラスターでは、それぞれのノードに Agent ポッドが作成されているのが確認できるはずです。

```bash
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```

## クリーンアップ

以下のコマンドは、本ガイドで作成したすべての Kubernetes リソースを削除します。

```bash
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/datadog_operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/data_security/agent/#running-as-an-unprivileged-user
