---
title: Cluster Agent Troubleshooting
aliases:
- /agent/cluster_agent/troubleshooting
- /containers/cluster_agent/troubleshooting
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: Blog
  text: Introducing the Datadog Cluster Agent
- link: /containers/kubernetes/installation/
  tag: Documentation
  text: Kubernetes Installation
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Custom Integrations
---

このドキュメントには、次のコンポーネントのトラブルシューティング情報が記載されています。

- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Node Agent](#node-agent)

## Datadog Cluster Agent

To execute the troubleshooting commands for the Cluster Agent, you first need to be inside the Cluster Agent or the node-based Agent pod. For this, use:

```text
kubectl exec -it <DATADOG_CLUSTER_AGENT_ポッド名> bash
```

Datadog Cluster Agent が提供するクラスターレベルのメタデータを確認するには、次を実行します。

```text
agent metamap
```

次の結果が表示されます。

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# agent metamap

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
agent status
```

これにより、次の結果が生成されます。

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# agent status
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

You can check the status of the Datadog Cluster Agent by running the Agent status command:
`agent status`

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}