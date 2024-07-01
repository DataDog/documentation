---
further_reading:
- link: /containers/datadog_operator
  tag: documentation
  text: Datadog Operator
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: GitHub
  text: 'Datadog Operator: 高度なインストール'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: GitHub
  text: 'Datadog Operator: 構成'
title: Datadog Operator の概要
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
2. お使いの API とアプリケーションキーで Kubernetes シークレットを作成します。
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
  ```
  `<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を [Datadog API とアプリケーションキー][5]に置き換えます。

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
        appSecret:
          secretName: datadog-secret
          keyName: app-key
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
  ```

4. Datadog Agent をデプロイします。
  ```bash
  kubectl apply -f /path/to/your/datadog-agent.yaml
  ```

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

[1]: /ja/containers/datadog_operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/account/settings#api