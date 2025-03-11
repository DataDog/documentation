---
aliases:
- /ko/agent/cluster_agent/troubleshooting
- /ko/containers/cluster_agent/troubleshooting
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog Cluster Agent 소개
- link: /containers/kubernetes/installation/
  tag: 설명서
  text: Kubernetes 설치
- link: /containers/kubernetes/integrations/
  tag: 설명서
  text: 커스텀 통합
title: Cluster Agent 트러블슈팅
---

이 설명서에는 다음 구성 요소에 대한 트러블슈팅 정보가 포함되어 있습니다.

- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Node Agent](#node-agent)

## Datadog Cluster Agent

Cluster Agent에 대한 트러블슈팅 명령을 실행하려면, 먼저 Cluster Agent 또는 노드 기반 Agent 파드 내부에 있어야 합니다. 이를 위해 다음을 사용하세요:

```text
kubectl exec -it <DATADOG_CLUSTER_AGENT_POD_NAME> bash
```

Datadog Cluster Agent가 제공하는 클러스터 수준 메타데이터를 확인하려면 다음을 실행하세요:

```text
agent metamap
```

다음 결과가 표시됩니다:

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

Datadog Cluster Agent가 쿼리되고 있는지 확인하려면 다음을 찾으세요:

```text
root@datadog-cluster-agent-8568545574-x9tc9:/# tail -f /var/log/datadog/cluster-agent.log
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
2018-06-11 09:37:20 UTC | DEBUG | (metadata.go:40 in GetPodMetadataNames) | CacheKey: agent/KubernetesMetadataMapping/ip-192-168-226-77.ec2.internal, with 1 services
```

이벤트를 제대로 수집하지 않는 경우, `DD_LEADER_ELECTION`과 `DD_COLLECT_KUBERNETES_EVENTS`가 `true`으로 설정되어 있는지 확인하고, RBAC에 나열된 적절한 동사(특히 `watch events`)를 확인하세요.

이를 활성화한 경우, 다음 명령을 사용하여 리더 선출 상태와  `kube_apiserver` 검사를 확인하세요: 

```text
agent status
```

이것으로 다음과 같은 결과가 생성됩니다:

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

Agent 상태 명령을 실행하여 Datadog Cluster Agent의 상태를 점검할 수 있습니다: `agent status`

Datadog Cluster Agent가 활성화되고 올바르게 설정된 경우 다음과 같이 표시됩니다:

```text
[...]
 =====================
 Datadog Cluster Agent
 =====================
   - Datadog Cluster Agent endpoint detected: https://XXX.XXX.XXX.XXX:5005
   Successfully Connected to the Datadog Cluster Agent.
   - Running: {Major:1 Minor:0 Pre:xxx Meta:xxx Commit:xxxxx}
```

Cluster Agent 서비스가 Agent의 파드보다 먼저 생성되었는지 확인하여 환경 변수에서 DNS를 사용할 수 있도록 합니다:

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

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}