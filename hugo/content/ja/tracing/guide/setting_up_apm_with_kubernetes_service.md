---
further_reading:
- link: /containers/kubernetes/apm/
  tag: ドキュメント
  text: トレース収集の設定
- link: /containers/cluster_agent/admission_controller
  tag: ドキュメント
  text: Admission Controller
title: Kubernetes Service を使用した APM のセットアップ
---

## 概要

Kubernetes では、Datadog のトレーサーは Unix Domain Socket (UDS)、ホスト IP、または Kubernetes Service の 3 つの方法で Datadog Agent にデータを送信できます。いずれのオプションでも、アプリケーション Pod が APM データを送信した場合、そのデータは同じノード上にある Datadog Agent Pod に到達します。この戦略により、トラフィックが適切に分散され、データに正しいタグが付与されるようにすることが目的です。Datadog では、UDS を使用してデータを送信することを推奨しています。

しかし、UDS に必要な `hostPath` ボリュームや、ホスト IP を使用するために必要な `hostPort` が利用できない場合は、代替オプションとして Kubernetes Service を使用できます。

このガイドでは、Kubernetes Service を使用して Datadog Agent にデータを送信する方法を設定する手順を説明します。

## Service の設定

Kubernetes 1.22 では、[Internal Traffic Policy 機能][1]により、Service に `internalTrafficPolicy: Local` を設定するオプションが追加されました。これを有効化すると、アプリケーション Pod からのトラフィックは、同じノード上にある Service のダウンストリーム Pod にルーティングされるようになります。

Datadog [Helm チャート][3]または [Datadog Operator][4] を使用して Kubernetes バージョン v1.22.0+ のクラスターに Datadog Agent をインストールした場合、`internalTrafficPolicy: Local` が設定された Agent 用の Service は自動的に作成されます。追加で、以下の設定を行い、Agent の APM ポートオプションを有効にする必要があります。

### Agent の構成
{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` を更新して、`features.apm.enabled` を `true` に設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` を更新して、`datadog.apm.portEnabled` を `true` に設定します。

```yaml
datadog:
  apm:
    portEnabled: true
```    

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

## アプリケーションの設定
アプリケーションを Kubernetes Service 経由で Datadog Agent に接続させるには、Cluster Agent Admission Controller を使用する方法と、手動で設定を行う方法の 2 つがあります。

### Cluster Agent Admission Controller
[Cluster Agent の Admission Controller][2] を使用すると、APM 接続用の設定をコンテナにインジェクトすることができます。オプションとして `hostip`、`socket`、`service` のいずれかを指定します。`service` モードを選択すると、Admission Controller によって `DD_AGENT_HOST` 環境変数が Service の DNS 名に設定されます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml` を以下のように更新します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
    admissionController:
      enabled: true
      agentCommunicationMode: service
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` を以下のように更新します。

```yaml
clusterAgent:
  admissionController:
    enabled: true
    configMode: service
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

**注:** Linux と Windows の混在ノード環境では、Cluster Agent とその Admission Controller は Linux のデプロイに依存します。その結果、Windows の Pod には Service 接続用の環境変数が正しくない形でインジェクトされる場合があります。

### 手動設定
手動で設定する場合は、Pod マニフェストの環境変数 `DD_AGENT_HOST` を `<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local` に指定してください。

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: <SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local
```

`<SERVICE_NAME>` には Service の名前を、`<SERVICE_NAMESPACE>` には Service の Namespace を置き換えてください。

例えば、以下のような Service 定義がある場合:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: datadog
  namespace: monitoring
  labels:
    #(...)
spec:
  selector:
    app: datadog
  ports:
    - protocol: UDP
      port: 8125
      targetPort: 8125
      name: dogstatsdport
    - protocol: TCP
      port: 8126
      targetPort: 8126
      name: traceport
  internalTrafficPolicy: Local
```

`DD_AGENT_HOST` の値は `datadog.monitoring.svc.cluster.local` に設定します。

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: datadog.monitoring.svc.cluster.local
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/
[2]: /ja/containers/cluster_agent/admission_controller
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[4]: /ja/containers/datadog_operator