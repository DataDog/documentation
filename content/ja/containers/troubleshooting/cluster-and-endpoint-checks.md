---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Introducing the Datadog Cluster Agent
- link: /containers/cluster_agent/clusterchecks/
  tag: Documentation
  text: Running Cluster Checks with Autodiscovery
- link: /containers/cluster_agent/endpointschecks/
  tag: Documentation
  text: Running Endpoint Checks with Autodiscovery
title: Troubleshooting Cluster and Endpoint Checks
---

## Cluster checks

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

## Endpoint checks

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