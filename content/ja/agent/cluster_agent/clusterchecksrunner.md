---
title: クラスターチェックランナー
kind: ドキュメント
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: ブログ
    text: Datadog Cluster Agent のご紹介
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
    tag: ブログ
    text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Autodiscovery によるクラスターチェックの実行
  - link: /agent/kubernetes/daemonset_setup/
    tag: Documentation
    text: Kubernetes DaemonSet のセットアップ
  - link: /agent/kubernetes/integrations/
    tag: Documentation
    text: カスタムインテグレーション
  - link: 'https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting'
    tag: Github
    text: Datadog Cluster Agent のトラブルシューティング
---
通常の Datadog Agent はノードとアプリケーションポッドに [エンドポイントチェック][1]を実行しますが、クラスターチェックランナーは内部の Kubernetes サービス、およびマネージドデータベースとネットワークデバイスのような外部サービスを監視する[**クラスターチェック**][2]の実行に特化しています。エンドポイントチェックとクラスターチェックを並行して行うことで、クラスターサービスと、お使いのアプリケーションが依存している外部サービスの両方を監視することができます。

**注**: クラスターチェックランナーを使用する場合、通常の Datadog Agent に対してクラスターチェックを有効化する必要はありません。

## セットアップ

まず、[Cluster Agent をデプロイ][3]します。

次に、[Datadog Operator][4] または [Helm][5] を使用してクラスターチェックランナーをデプロイします。

{{< tabs >}}
{{% tab "Operator" %}}

Operator を使用することで、[この例][1]にあるような単一のマニフェストでこれらのリソースすべてをローンチおよび管理することができます。

リソースをクラスターにデプロイします。

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

コンフィギュレーションが正常に適用された場合は以下のような結果が表示されます。

```
datadogagent.datadoghq.com/datadog created
```

Datadog Operator についての詳細は [Datadog Operator リポジトリ][2] を参照してください。


[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-dca-clusterchecksrunner.yaml
[2]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

以下のように、チャートの関連するセクションを更新してクラスターチェック、Cluster Agent, クラスターチェックランナーを同時に有効化することができます。

```
[...]
  clusterChecks:
    enabled: true
[...]
 clusterAgent:
  enabled: true
[...]
 clusterChecksRunner:
  enabled: true
  replicas: 2
```


{{% /tab %}}
{{< /tabs >}}

同じノードに複数のクラスターチェックランナーが適用されないよう、`podAntiAffinity` を使用します。

**注**: Datadog Operator および Helm チャートは、`podAntiAffinity` を使用して複数のクラスターチェックランナーが同じノードに適用されるのを回避しています。Cluster Agent はノード名でクラスターチェックを識別するため、`podAntiAffinity` を使用することで名前の衝突を避けることができます。


[1]: https://docs.datadoghq.com/ja/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/ja/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml