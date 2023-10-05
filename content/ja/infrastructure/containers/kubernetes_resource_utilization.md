---
aliases:
- /ja/infrastructure/containers/kubernetes_resources
further_reading:
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: ブログ
  text: Kubernetes のワークロードをライトサイジングするための実践的なヒント
kind: documentation
title: Kubernetes Resource Utilization
---

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization.png" alt="Kubernetes Resource Utilization ビュー" >}}

Datadog の [Kubernetes Resource Utilization][3] ビューは、Kubernetes ワークロードがインフラストラクチャー全体のコンピューティングリソースをどのように使用しているかの洞察を提供します。これにより、リソースの使用状況を把握し、サイジングやキャパシティプランニングについてより良い意思決定を行うことができるほか、CPU やメモリの無駄を削減することができます。

リソースのリクエストと制限がポッドの現在の使用量とどの程度一致しているかのステータスが常に更新されるため、Kubernetes クラスター内のビンパッキングを改善できます。

## 前提条件

- Datadog Agent v7.45.0+
- [Orchestrator Explorer][1] を有効にします。

## 使用方法

Datadog で、**Infrastructure** > [**Kubernetes**][2] に進み、[**Resource Utilization** タブ][3]を選択します。

ページは **Pods** で開き、デフォルトでは `kube_cluster_name`、`kube_namespace`、`kube_deployment` でグループ化されています。

CPU とメモリのサイジングの最適化は、通常別々に行われます。表のデータは、**CPU** と ** Memory** のトグルで分割されています。

#### デフォルトの列

{{< tabs >}}
{{% tab "CPU" %}}
- **Pod group**: デフォルトではデプロイメントを表しますが、右上の **Group by** フィールドで指定する内容によって異なります。この列には、各グループ内のポッドの使用量、リクエスト、および制限の合計が含まれます。
- **CPU idle**: 使用されていない CPU の量で、使用量とリクエストの差の合計として計算されます。
- **CPU usage/requests**: 使用量の合計をリクエストの合計で割ったパーセンテージ。
- **CPU usage/limits**: 使用量の合計を制限の合計で割ったパーセンテージ。
- **CPU graph**: 使用量、リクエスト、制限の経時変化を表示する折れ線グラフ。各行をクリックすると、より長い時間枠が表示されます。
{{% /tab %}}
{{% tab "Memory" %}}
- **Pod group**: デフォルトではデプロイを表しますが、右上の **Group by** フィールドで指定する内容によって異なります。この列には、各グループ内のポッドの使用量、リクエスト、および制限の合計が含まれます。
- **Memory unused**: 使用量とリクエストの差の合計として計算される未使用メモリの量。
- **Memory usage/requests**: 使用量の合計をリクエストの合計で割ったパーセンテージ。
- **Memory usage/limits**: 使用量の合計を制限の合計で割ったパーセンテージ。
- **Memory graph**: 使用量、リクエスト、制限の経時変化を表示する折れ線グラフ。各行をクリックすると、より長い時間枠が表示されます。
{{% /tab %}}
{{< /tabs >}}

右上の **Customize** ボタンを使用して、表示する他の列を選択します。色分けは、ポッドの過不足プロビジョニングの程度を反映します。

#### 詳細ビュー

行をクリックするとサイドパネルが開き、各グループの CPU とメモリのデータの組み合わせ、各ポッドまたはコンテナの詳細グラフ、ポッドのトップリストが表示されます。

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_panel.png" alt="Kubernetes Resource Utilization サイドパネル" >}}

個々のポッドまたはコンテナのグラフは、負荷の不均衡が発生した場合にグループに影響を与える可能性のある外れ値を特定するのに役立ちます。デフォルトでは、グラフは `pod_name` でグループ化され、個々のポッドが表示されます。これを `kube_container_name` でグループ化するように変更すると、マルチコンテナポッドの場合にどのコンテナがプロビジョニングの過不足に最も貢献しているかを特定できます。

### アイドルリソースの最適化

アイドル状態の CPU とメモリは、ポッドがすぐにスロットルされたり強制終了されたりすることなく、アプリケーションが拡張できる余地を確保するために必要です。

アイドル状態の CPU やメモリが多すぎると、不必要にコストが高くなる可能性がありますが、反対の場合、リソースの使用量が増えれば、パフォーマンスや信頼性が低下するリスクが生じます。

このバランスを見つけるために、グラフを調整してより長いタイムスパンを見ます。最新の使用量のみに基づいてリソースのサイジングを決定することは避けてください。これらのメトリクスは標準的な Kubernetes メトリクスであるため、他の Datadog メトリクスと同様にクエリすることができます (たとえば、過去 15 か月について、必要に応じて最大解像度で)。

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_metrics.png" alt="Kubernetes Resource Utilization メトリクス" >}}

### 既知の制限

リクエストや制限が設定されていないコンテナを含む少なくとも 1 つのポッドを含むグループのメトリクスは表示されません。これは、リクエストや制限がないと Datadog が使用率を推測できないためです。メトリクスのないこれらのグループは、並べ替え順序に関係なく最後に表示されます。

グループのリソースリクエストと制限の合計は、そのグループに属するリソースの状態とは無関係です。これらの値は、関連するメトリクスグラフに表示される値とは異なる場合があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/infrastructure/containers/orchestrator_explorer?tab=datadogoperator#setup
[2]: https://app.datadoghq.com/kubernetes
[3]: https://app.datadoghq.com/orchestration/resource/pod?groups=tag%23kube_deployment%2Ctag%23kube_namespace%2Ctag%23kube_cluster_name