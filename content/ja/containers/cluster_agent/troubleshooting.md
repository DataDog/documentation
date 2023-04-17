---
aliases:
- /ja/agent/cluster_agent/troubleshooting
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
kind: documentation
title: Cluster Agent のトラブルシューティング
---

このドキュメントには、次のコンポーネントのトラブルシューティング情報が記載されています。

- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Node Agent](#node-agent)
- [カスタムメトリクスサーバー](#custom-metrics-server)
  - [Cluster Agent のステータスとフレア](#cluster-agent-status-and-flare)
  - [HPA マニフェストの記述](#describing-the-hpa-manifest)
  - [Datadog と Kubernetes の価値の違い](#differences-of-value-between-datadog-and-kubernetes)
- [クラスターチェック](#cluster-checks)
  - [Kubernetes: リーダー Cluster Agent を探す](#kubernetes-find-the-leader-cluster-agent)
  - [Cluster Agent のオートディスカバリー](#autodiscovery-in-the-cluster-agent)
  - [Cluster Agent のディスパッチロジック](#dispatching-logic-in-the-cluster-agent)
  - [ノードベース Agent のオートディスカバリー](#autodiscovery-in-the-node-based-agent)
  - [Agent ステータス](#agent-status)
- [エンドポイントチェック](#endpoint-checks)
  - [Node Agent のオートディスカバリー](#autodiscovery-in-the-node-agent)
  - [Agent ステータス](#agent-status-1)
  - [Cluster Agent のオートディスカバリー](#autodiscovery-in-the-cluster-agent-1)
- [参考文献](#further-reading)

## Datadog Cluster Agent

Cluster Agent のトラブルシューティングコマンドを実行するには、最初に Cluster Agent またはノードベースの Agent のポッド内にいる必要があります。これには、次を使用します。

```text
kubectl exec -it <DATADOG_CLUSTER_AGENT_ポッド名> bash
```

Datadog Cluster Agent が提供するクラスターレベルのメタデータを確認するには、次を実行します。

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

イベントを正しく収集できない場合は、`DD_LEADER_ELECTION` と `DD_COLLECT_KUBERNETES_EVENTS` を `true` に設定し、RBAC に記載されている適切な動詞 (特に、`watch events`) も設定するようにしてください。

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

Agent ステータスコマンドを実行することで、Datadog Cluster Agent のステータスを確認できます。
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
DATADOG_CLUSTER_AGENT_PORT=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP=tcp://10.100.202.234:5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_ADDR=10.100.202.234
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PORT=5005
DATADOG_CLUSTER_AGENT_PORT_5005_TCP_PROTO=tcp
DATADOG_CLUSTER_AGENT_SERVICE_HOST=10.100.202.234
DATADOG_CLUSTER_AGENT_SERVICE_PORT=5005
DATADOG_CLUSTER_AGENT_SERVICE_PORT_AGENTPORT=5005

root@datadog-agent-9d5bl:/# echo ${DD_CLUSTER_AGENT_AUTH_TOKEN}
DD_CLUSTER_AGENT_AUTH_TOKEN=1234****9
```

## カスタムメトリクスサーバー

### Cluster Agent のステータスと flare

カスタムメトリクスサーバーに問題がある場合

* 集計レイヤーと証明書が設定されていることを確認します。
* 自動スケーリングするメトリクスが利用可能であることを確認します。HPA を作成すると、Datadog Cluster Agent はマニフェストを解析し、Datadog にクエリしてメトリクスの取得を試みます。メトリクス名に表記上の問題がある場合、またはメトリクスが Datadog アプリケーション内に存在しない場合、次のエラーが発生します。

    ```text
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

`datadog-cluster-agent status` コマンドを実行して、External Metrics Provider プロセスのステータスを確認します。

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

このコマンドでは、External Metrics Provider プロセスのエラーが表示されます。より詳細な出力が必要な場合は、flare コマンド `datadog-cluster-agent flare` を実行します。

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

後者は、Datadog Cluster Agent が External Metrics Provider として適切に登録されている場合、および External Metrics Provider の APIService で参照されている同じサービス名と、ポート `8443` 上の Datadog Cluster Agent のサービス名がある場合に表示されます。また、[External Metrics Provider の登録][1]ステップから RBAC を作成したことを確認します。

HPA マニフェストの記述時に次のエラーが表示される場合

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Datadog Cluster Agent が実行されており、APIService に名前が登録されているポート `8443` を公開しているサービスが稼働していることを確認します。

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

## クラスターチェック

### Kubernetes: リーダー Cluster Agent の検索

リーダー選択が可能な場合、リーダーだけがクラスターチェック構成をノードベースの Agent に送ります。Cluster Agent ポッドのレプリカが 1 つだけ稼働している場合、そのレプリカがリーダーとなります。それ以外の場合は、`datadog-leader-election` ConfigMap でリーダーの名前を確認することができます。

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ... }'
```

この例では、リーダーポッドは `cluster-agent-rhttz` です。ポッドが削除されている、あるいは応答がない場合は、別のポッドが自動的に引き継ぎます。

### Cluster Agent 内のオートディスカバリー

Cluster Agent に構成 (静的またはオートディスカバリー) が分かるよう、Cluster Agent のリーダーの `configcheck` コマンドを使用します。

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent configcheck
...
=== http_check cluster check ===
Source: kubernetes-services
Instance ID: http_check:My service:6e5f4b16b4b433cc
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
Auto-discovery IDs:
* kube_service://751adfe4-1280-11e9-a26b-42010a9c00c8
===
```

### Cluster Agent のディスパッチロジック

`clusterchecks` コマンドにより、以下を含むディスパッチロジックの状態をチェックできます。

- どのノードベースの Agent が Cluster Agent にアクティブに報告しているか
- 各ノードにどのチェックがディスパッチされているか

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks

=== 3 node-agents reporting ===
Name                                            Running checks
default-pool-bce5cd34-7g24.c.sandbox.internal   0
default-pool-bce5cd34-slx3.c.sandbox.internal   2
default-pool-bce5cd34-ttw6.c.sandbox.internal   1
...

===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**注**: `configcheck` コマンドとはインスタンス ID が異なりますが、インスタンスが変更されてタグとオプションが追加されるためです。

この場合、この構成は `default-pool-bce5cd34-ttw6` ノードへディスパッチされます。トラブルシューティングは、その対応するノード上の Agent ポッドに関して続行されます。

### ノードベースの Agent 内のオートディスカバリー

Agent の `configcheck` コマンドは、`cluster-checks` ソース付きのインスタンスを表示します。

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

インスタンス ID は初期のものと一致します。

### Agent のステータス

Agent の `status` コマンドは、正しく実行されて報告を行っているチェックインスタンスを表示します。

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## エンドポイントチェック

エンドポイントチェックのトラブルシューティングは、[クラスターチェックのトラブルシューティング](#cluster-checks)と似ています。Node Agent では、スケジュールされたエンドポイントチェックがクラスターチェックと一緒に表示されるという違いが生じます。

**注**: エンドポイントチェックは、監視されるサービスのエンドポイントをホストするポッドと同じノードで動作している Agent によってスケジューリングされます。エンドポイントがポッドをホストしない場合は、クラスター Agent がエンドポイントチェックをクラスター チェックに変換します。このクラスターチェックは、どの Node Agent でも実行できます。

### Node Agent 内のオートディスカバリー

Agent の `configcheck` コマンドは、`endpoints-checks` ソースを付けてインスタンスを表示します。

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:956741d8796d940c
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- pod_phase:running
- kube_deployment:nginx
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
```

### Agent のステータス

Agent の `status` コマンドは、正しく実行されて報告を行っているチェックインスタンスを表示します。

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    nginx (4.0.0)
    -------------
      Instance ID: nginx:956741d8796d940c [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Cluster Agent 内のオートディスカバリー

Cluster Agent の `clusterchecks` コマンドは、`kubernetes-endpoints` ソースを付けてインスタンスを表示します。

```shell
# kubectl exec <クラスター AGENT のポッド名> agent clusterchecks
...
===== 3 Pod-backed Endpoints-Checks scheduled =====

=== nginx check ===
Configuration provider: kubernetes-endpoints
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:f139adc46c81828e
name: My Nginx Endpoints
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
...
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/cluster_agent/external_metrics/#register-the-external-metrics-provider