---
title: Cluster Agent のトラブルシューティング
kind: documentation
further_reading:
  - link: https://www.datadoghq.com/blog/datadog-cluster-agent/
    tag: ブログ
    text: Datadog Cluster Agent のご紹介
  - link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
    tag: ブログ
    text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
  - link: /agent/cluster_agent/clusterchecks/
    tag: ドキュメント
    text: Autodiscovery によるクラスターチェックの実行
  - link: /agent/kubernetes/daemonset_setup/
    tag: ドキュメント
    text: Kubernetes DaemonSet のセットアップ
  - link: /agent/kubernetes/integrations/
    tag: ドキュメント
    text: カスタムインテグレーション
  - link: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting
    tag: Github
    text: Datadog Cluster Agent のトラブルシューティング
---
Cluster Agent のトラブルシューティングコマンドを実行するには、最初に Cluster Agent またはノードベースの Agent のポッド内にいる必要があります。これには、次を使用します。

```text
kubectl exec -it <DATADOG_CLUSTER_AGENT_ポッド名> bash
```

## Datadog Cluster Agent

Datadog Cluster Agent が提供するクラスターレベルのメタデータを確認するには、ポッドに `exec` して次を実行します。

```text
datadog-cluster-agent metamap
```

次の結果が表示されます。

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# datadog-cluster-agent metamap

===============
Metadata Mapper
===============

Node detected: gke-test-default-pool-068cb9c0-sf1w

  - Namespace: kube-system
      - Pod: kube-dns-788979dc8f-hzbj5
        Services: [kube-dns]
      - Pod: kube-state-metrics-5587867c9f-xllnm
        Services: [kube-state-metrics]
      - Pod: kubernetes-dashboard-598d75cb96-5khmj
        Services: [kubernetes-dashboard]

Node detected: gke-test-default-pool-068cb9c0-wntj

  - Namespace: default
      - Pod: datadog-cluster-agent-8568545574-x9tc9
        Services: [datadog-custom-metrics-server dca]

  - Namespace: kube-system
      - Pod: heapster-v1.5.2-6d59ff54cf-g7q4h
        Services: [heapster]
      - Pod: kube-dns-788979dc8f-q9qkt
        Services: [kube-dns]
      - Pod: l7-default-backend-5d5b9874d5-b2lts
        Services: [default-http-backend]
      - Pod: metrics-server-v0.2.1-7486f5bd67-v827f
        Services: [metrics-server]
```

Datadog Cluster Agent が照会されていることを確認するには、以下を探します。

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# tail -f /var/log/datadog/cluster-agent.log
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
```

イベントを適切に収集していない場合は、これらの環境変数が `true` に設定されていることを確認します。

- リーダー選出: `DD_LEADER_ELECTION`
- イベント収集: `DD_COLLECT_KUBERNETES_EVENTS`

また、RBAC にリストされている適切な動詞（特に、`watch events`）。

これらを有効にしている場合は、リーダー選出ステータスと `kube_apiserver` チェックを次のコマンドで確認します。

```text
datadog-cluster-agent status
```

これにより、次の結果が生成されます。

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# datadog-cluster-agent status
[...]
  Leader Election
  ===============
    Leader Election Status:  Running
    Leader Name is: datadog-cluster-agent-8568545574-x9tc9
    Last Acquisition of the lease: Mon, 11 Jun 2018 06:38:53 UTC
    Renewed leadership: Mon, 11 Jun 2018 09:41:34 UTC
    Number of leader transitions: 2 transitions
[...]
  Running Checks
  ==============
    kubernetes_apiserver
    --------------------
      Total Runs: 736
      Metrics: 0, Total Metrics: 0
      Events: 0, Total Events: 100
      Service Checks: 3, Total Service Checks: 2193
[...]
```

## Node Agent

Agent のステータスコマンドの実行中に、Datadog Cluster Agent のステータスを確認できます。
`datadog-agent status`

Datadog Cluster Agent が有効になっており、正しく構成されている場合、以下が表示されます。

```text
[...]
 =====================
 Datadog Cluster Agent
 =====================
   - Datadog Cluster Agent endpoint detected: https://XXX.XXX.XXX.XXX:5005
   Successfully Connected to the Datadog Cluster Agent.
   - Running: {Major:1 Minor:0 Pre:xxx Meta:xxx Commit:xxxxx}
```

DNS が環境変数で使用できるように、Agent のポッドの前に Cluster Agent サービスが作成されていることを確認します。

```text
root@datadog-agent-9d5bl:/# env | grep DATADOG_CLUSTER_AGENT | sort
DATADOG_CLUSTER_AGENT_SERVICE_PORT=5005
DATADOG_CLUSTER_AGENT_SERVICE_HOST=10.100.202.234
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PORT=5005
DATADOG_CLUSTER_AGENT_PORT=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENTPORT_5005_TCP_PROTO=tcp
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_ADDR=10.100.202.234

root@datadog-agent-9d5bl:/# echo ${DD_CLUSTER_AGENT_AUTH_TOKEN}
DD_CLUSTER_AGENT_AUTH_TOKEN=1234****9
```

ノードベースの Agent が Datadog Cluster Agent をタグプロバイダーとして使用していることを確認します。

```text
root@datadog-agent-9d5bl:/# cat /var/log/datadog/agent.log | grep "metadata-collector"
2018-06-11 06:59:02 UTC | INFO | (tagger.go:151 in tryCollectors) | kube-metadata-collector tag collector successfully started
```

または、次のようなエラーログを探します。

```shell
2018-06-10 08:03:02 UTC | ERROR | Could not initialize the communication with the Datadog Cluster Agent, falling back to local service mapping: [...]
```

## カスタムメトリクスサーバー

### Cluster Agent のステータスと flare

カスタムメトリクスサーバーに問題がある場合

* 集計レイヤーと証明書が設定されていることを確認します。
* 自動スケーリングするメトリクスが利用可能であることを確認します。HPA を作成すると、Datadog Cluster Agent はマニフェストを解析し、Datadog にクエリしてメトリクスの取得を試みます。メトリクス名に表記上の問題がある場合、またはメトリクスが Datadog アプリケーション内に存在しない場合、次のエラーが発生します。

    ```shell
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

`datadog-cluster-agent status` コマンドを実行して、External Metrics Provider プロセスのステータスを確認します。

```shell
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

このコマンドでは、External Metrics Provider プロセスのエラーが表示されます。より詳細な出力が必要な場合は、flare コマンド `datadog-cluster-agent flare` を実行します。

この flare コマンドは、`custom-metrics-provider.log` を含む zip ファイルを生成します。このファイルには、次のような出力が表示されます。

```
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

### HPA マニフェストの記述

HPA マニフェストの記述時に次のメッセージが表示される場合

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

HPA に適切な RBAC が設定されていない可能性があります。`kubectl api-versions` が表示されることを確認します。

```text
autoscaling/v2beta1
[...]
external.metrics.k8s.io/v1beta1
```

後者は、Datadog Cluster Agent が External Metrics Provider として適切に登録されている場合、および External Metrics Provider の APIService で参照されている同じサービス名と、ポート `443` 上の Datadog Cluster Agent のサービス名がある場合に表示されます。また、[External Metrics Provider の登録][1]ステップから RBAC を作成したことを確認します。

HPA マニフェストの記述時に次のエラーが表示される場合

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Datadog Cluster Agent が実行されており、APIService に名前が登録されているポート `443` を公開しているサービスが稼働していることを確認します。

### Datadog と Kubernetes の値の違い

Kubernetes はリソースを自動スケーリングするため、現在のターゲットは、スケーリングされたデプロイのレプリカの数によって重み付けされます。
Datadog Cluster Agent によって返される値は Datadog から取得され、現在のターゲットにレプリカの数を掛けた値に比例する必要があります。

例:

```text
    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - app: puppet
    - env: demo
    metricName: nginx.net.request_per_s
    ts: 1532042322
    valid: true
    value: 2472
```

Cluster Agent は `2472` を取得しましたが、HPA は次を示します。

```text
NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   824/9 (avg)   1         3         3          41m
```

そしてもちろん、`824 * 3 replicas = 2472` です。

*免責事項*: Datadog Cluster Agent は、異なる HPA マニフェストに設定されたメトリクスを処理し、デフォルトで 30 秒ごとに Datadog に照会して値を取得します。Kubernetes は、デフォルトで 30 秒ごとに Datadog Cluster Agent に照会します。このプロセスは非同期で行われるため、特にメトリクスが異なる場合、上記のルールが常に検証されることを期待するべきではありませんが、問題を軽減するために両者の頻度は構成可能です。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/cluster_agent/external_metrics/#register-the-external-metrics-provider