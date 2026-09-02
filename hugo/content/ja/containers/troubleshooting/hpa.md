---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: ブログ
  text: Datadog Cluster Agent のご紹介
- link: /containers/guide/cluster_agent_autoscaling_metrics
  tag: ドキュメント
  text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
title: カスタムメトリクスサーバーと HPA のトラブルシューティング
---

## Cluster Agent のステータスと flare

カスタムメトリクスサーバーに問題がある場合

* 集計レイヤーと証明書が設定されていることを確認します。
* 自動スケーリングするメトリクスが利用可能であることを確認します。HPA を作成すると、Datadog Cluster Agent はマニフェストを解析し、Datadog にクエリしてメトリクスの取得を試みます。メトリクス名に表記上の問題がある場合、またはメトリクスが Datadog アカウント内に存在しない場合、次のエラーが発生します。

    ```text
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

`agent status` コマンドを実行して、External Metrics Provider プロセスのステータスを確認します。

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

このコマンドでは、External Metrics Provider プロセスのエラーが表示されます。より詳細な出力が必要な場合は、flare コマンド `agent flare` を実行します。

この flare コマンドは、`custom-metrics-provider.log` を含む zip ファイルを生成します。このファイルには、次のような出力が表示されます。

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - cluster: eks
    metricName: redis.key
    ts: 1532042322
    valid: false
    value: 0

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - dcos_version: 1.9.4
    metricName: docker.mem.limit
    ts: 1.532042322
    valid: true
    value: 268435456
```

メトリクスのフラグ `Valid` が `false` に設定されている場合、メトリクスは HPA パイプラインで考慮されません。

## HPA マニフェストの記述

HPA マニフェストの記述時に次のメッセージが表示される場合

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

メトリクスプロバイダーの RBAC やサービス接続が正しく設定されていない可能性があります。`kubectl get apiservices` を実行し、以下の内容を確認してください。

```text
% kubectl get apiservices
NAME                                   SERVICE                                     AVAILABLE   AGE
...
v1beta1.external.metrics.k8s.io        default/datadog-cluster-agent-metrics-api   True        57s
```

外部メトリクス API サービスが、API サービス、サービス、ポッドでのポートマッピングがすべて一致している場合は、Available が `true` として表示されます。さらに、Cluster Agent に適切な RBAC 権限が付与されていることを確認してください。[External Metrics Provider の登録][1]のステップで必要なリソースを作成していることも忘れずに確認してください。

HPA マニフェストの記述時に次のエラーが表示される場合

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Datadog Cluster Agent が実行されており、APIService に名前が登録されているポート `8443` を公開しているサービスが稼働していることを確認します。

## Datadog と Kubernetes の値の違い

Kubernetes がリソースをオートスケーリングする際、HPA は Cluster Agent から提供されるメトリクス値に基づいてスケーリングを決定します。Cluster Agent は Datadog API から返される厳密なメトリクス値をクエリして保存します。もし HPA が `type: Value` をターゲットとして使用している場合は、その厳密なメトリクス値がそのまま HPA に提供されます。HPA が `type: AverageValue` を使用している場合は、このメトリクス値を現在のレプリカ数で割った値が提供されます。

そのため、以下のような値が返ってくる場合があります。

```text
% kubectl get datadogmetric
NAME             ACTIVE   VALID   VALUE   REFERENCES                UPDATE TIME
example-metric   True     True    7       hpa:default/example-hpa   21s

% kubectl get hpa
NAME          REFERENCE          TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
example-hpa   Deployment/nginx   3500m/5 (avg)   1         3         2          24
```

`7` というメトリクス値に対してレプリカ数が `2` であるため、`3.5` の平均値が返されます。HPA は両方のタイプ (Value と AverageValue) に対応していますので、クエリとターゲット値を設定する際にはどちらのタイプを使用するかを考慮してください。設定例については、[こちらの Cluster Agent ガイド][2]を参照してください。

*免責事項*: Datadog Cluster Agent は、異なる HPA マニフェストに設定されたメトリクスを処理し、デフォルトで 30 秒ごとに Datadog に照会して値を取得します。Kubernetes は、デフォルトで 30 秒ごとに Datadog Cluster Agent に照会します。このプロセスは非同期で行われるため、特にメトリクスが異なる場合、上記のルールが常に検証されることを期待するべきではありませんが、問題を軽減するために両者の頻度は構成可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/guide/cluster_agent_autoscaling_metrics
[2]: /ja/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm#value-vs-averagevalue-for-the-target-metric