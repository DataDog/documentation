---
aliases:
- /ja/agent/guide/operator-advanced
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Datadog と Kubernetes
title: Datadog Operator の高度なセットアップ
---

[Datadog Operator][1] は Kubernetes や OpenShift にDatadog Agent をデプロイする方法です。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度なコンフィギュレーションオプションでコンフィギュレーションミスのリスクを抑えます。

## 前提条件

Datadog Operator を使用するには、次の前提条件が必要です。

- **Kubernetes Cluster バージョン >= v1.20.X**: テストはバージョン >= `1.20.0` で行われましたが、バージョン `>= v1.11.0` で動作するはずです。以前のバージョンでは、CRD サポートが制限されているため、Operator が期待どおりに機能しない場合があります。
- `datadog-operator` をデプロイするための [`Helm`][2]。
- `datadog-agent` をインストールするための [`Kubectl` CLI][3]。

## Datadog Operator のデプロイ

Datadog Operator を使用するには、Kubernetes クラスターにデプロイします。次に、Datadog デプロイコンフィギュレーションを含む `DatadogAgent` Kubernetes リソースを作成します。

1. Datadog Helm リポジトリを追加します。
  ```
  helm repo add datadog https://helm.datadoghq.com
  ```

2. Datadog Operator をインストールします。
  ```
  helm install my-datadog-operator datadog/datadog-operator
  ```

## Operator を使用して Datadog Agent をデプロイする

Datadog Operator をデプロイした後、Kubernetes クラスターでの Datadog Agent のデプロイをトリガーする `DatadogAgent` リソースを作成します。このリソースを `Datadog-Operator` ネームスペースに作成することにより、Agent はクラスターのすべての `Node` に `DaemonSet` としてデプロイされます。

以下のテンプレートを使用して、`datadog-agent.yaml` マニフェストを作成します。

* [ログ、APM、プロセス、メトリクス収集を有効にしたマニフェスト][4]。
* [ログ、APM、メトリクス収集を有効にしたマニフェスト][5]。
* [ログとメトリクス収集を有効にしたマニフェスト][6]。
* [APMとメトリクス収集を有効にしたマニフェスト][7]。
* [クラスター Agent のあるマニフェスト][8]。
* [許容範囲のあるマニフェスト][9]。

`<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を [Datadog API とアプリケーションキー][10]に置き換えてから、次のコマンドで Agent のインストールをトリガーします。

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog created
```

`DatadogAgent` リソースの状態は次のコマンドで確認できます。

```shell
kubectl get -n $DD_NAMESPACE dd datadog

NAME            ACTIVE   AGENT             CLUSTER-AGENT   CLUSTER-CHECKS-RUNNER   AGE
datadog-agent   True     Running (2/2/2)                                           110m
```

2-worker-nodes のクラスターでは、各ノードで作成された Agent ポッドが表示されます。

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get -n $DD_NAMESPACE pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```


## クリーンアップ

次のコマンドは、上記の手順で作成されたすべての Kubernetes リソースを削除します。

```shell
kubectl delete datadogagent datadog
helm delete datadog
```

### 許容範囲

`datadog-agent.yaml` ファイルを次のコンフィギュレーションで更新して、`DaemonSet` の `Daemonset.spec.template` に許容範囲を追加します。

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - operator: Exists
```

この新しいコンフィギュレーションを適用します。

```shell
$ kubectl apply -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog updated
```

DaemonSet の更新は、新しい目的のポッド値を確認することで検証できます。

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   3         3         3       3            3           <none>          7m31s

$ kubectl get -n $DD_NAMESPACE pod
NAME                                         READY   STATUS     RESTARTS   AGE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running    0          15h
datadog-agent-5ctrq                          1/1     Running    0          7m43s
datadog-agent-lkfqt                          0/1     Running    0          15s
datadog-agent-zvdbw                          1/1     Running    0          8m1s
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-all.yaml
[5]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-logs-apm.yaml
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-logs.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-apm.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-clusteragent.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-tolerations.yaml
[10]: https://app.datadoghq.com/organization-settings/api-keys