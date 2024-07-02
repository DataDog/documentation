---
title: Cluster Check Runners
aliases:
- /agent/cluster_agent/clusterchecksrunner
- /containers/cluster_agent/clusterchecksrunner
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: Blog
  text: Introducing the Datadog Cluster Agent
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: Blog
  text: Autoscale your Kubernetes workloads with any Datadog metric
- link: /containers/cluster_agent/clusterchecks/
  tag: Documentation
  text: Cluster Checks
---

Cluster Agent は[エンドポイントチェック][1]と[クラスターチェック][2]の 2 種類のチェックをディスパッチできます。チェックの内容は若干異なります。

エンドポイントチェックは、アプリケーションポッドのエンドポイントと同じノード上の通常の Datadog Agent に特別にディスパッチされます。アプリケーションエンドポイントと同じノード上でエンドポイントチェックを実行することで、メトリクスに適切なタグ付けを行うことができます。

クラスターチェックは、Kubernetes の内部サービスだけでなく、マネージドデータベースやネットワークデバイスなどの外部サービスも監視し、より自由にディスパッチできます。
クラスターチェックランナーの使用はオプションです。クラスターチェックランナーを使用すると、少数の専用 Agent セットがクラスターチェックを実行し、エンドポイントチェックは通常の Agent に任せます。この戦略は、特にクラスターチェックの規模が大きくなった場合に、クラスターチェックのディスパッチを制御するのに有益です。

## セットアップ

まず、[Cluster Agent をデプロイ][3]します。

次に、[Datadog Operator][4] または [Helm][5] を使用してクラスターチェックランナーをデプロイします。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Operator を使用することで、単一のマニフェストでこれらのリソースすべてをローンチおよび管理することができます。例:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
  features:
    clusterChecks:
      enabled: true
      useClusterChecksRunners: true
  override:
    clusterAgent:
      replicas: 2
```

リソースをクラスターにデプロイします。

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

以下のような結果が表示された場合、コンフィギュレーションは正常に適用されています。

```
datadogagent.datadoghq.com/datadog created
```

Datadog Operator についての詳細は [Datadog Operator リポジトリ][1]を参照してください。


[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

チャートの関連するセクションを更新してクラスターチェック、Cluster Agent, クラスターチェックランナーを同時に有効化することができます。例:

```yaml
datadog:
  clusterChecks:
    enabled: true
  #(...)

clusterAgent:
  enabled: true
  #(...)

clusterChecksRunner:
  enabled: true
  replicas: 2
```


{{% /tab %}}
{{< /tabs >}}

**注**: Datadog Operator および Helm チャートは、どちらも `podAntiAffinity` を使用して複数のクラスターチェックランナーが同じノードに適用されるのを回避しています。Cluster Agent はノード名でクラスターチェックを識別するため、これは重要です。`podAntiAffinity` を使用することで名前の衝突を避けることができます。


[1]: https://docs.datadoghq.com/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
