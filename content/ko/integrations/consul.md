---
app_id: consul
categories:
- configuration & deployment
- containers
- log collection
- network
- notifications
- orchestration
custom_kind: 통합
description: Alert on Consul health checks, see service-to-node mappings, and much
  more.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/hcp-consul
  tag: 설명서
  text: Datadog으로 HCP Consul 모니터링
- link: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
  tag: 블로그
  text: Monitor Consul health and performance with Datadog
- link: https://www.datadoghq.com/blog/engineering/consul-at-datadog/
  tag: 블로그
  text: Consul at Datadog
- link: https://www.datadoghq.com/blog/consul-metrics/
  tag: 블로그
  text: Key metrics for monitoring Consul
- link: https://www.datadoghq.com/blog/consul-monitoring-tools/
  tag: 블로그
  text: Consul monitoring tools
- link: https://www.datadoghq.com/blog/consul-datadog/
  tag: 블로그
  text: How to monitor Consul with Datadog
integration_version: 5.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Consul
---
![Consul Dash](https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png)

## 개요

Datadog Agent는 다음을 포함하여 Consul 노드에서 많은 메트릭을 수집합니다.

- Consul 피어 총개수
- 서비스 상태 - 특정 서비스에 대해 UP, PASSING, WARNING, CRITICAL인 노드 수
- 노드 상태 - 특정 노드에 대해 UP, PASSING, WARNING, CRITICAL인 서비스 수
- 네트워크 좌표 - 데이터 센터 간 및 데이터 센터 내 대기 시간

_Consul_ Agent는 DogStatsD를 통해 추가 메트릭을 제공할 수 있습니다. 이러한 메트릭은 Consul에 의존하는 서비스가 아닌 Consul 자체의 내부 상태와 더 관련이 있습니다. 메트릭은 다음과 같습니다.

- Serf 이벤트 및 멤버 플랩
- Raft 프로토콜
- DNS 성능

이외에 다수가 있습니다.

Datadog Agent는 메트릭 외에도 Consul의 각 상태 점검마다 서비스 점검을 전송하고, 새 리더 선출마다 이벤트를 전송합니다.

## 설정

### 설치

The Datadog Agent's Consul check is included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, so you don't need to install anything else on your Consul nodes.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. Edit the `consul.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) to start collecting your Consul metrics. See the [sample consul.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example) for all available configuration options.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Where your Consul HTTP server lives,
     ## point the URL at the leader to get metrics about your Consul cluster.
     ## Use HTTPS instead of HTTP if your Consul setup is configured to do so.
     #
     - url: http://localhost:8500
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

###### OpenMetrics

(선택 사항) `use_prometheus_endpoint` 설정 옵션을 활성화하여 Consul Prometheus 엔드포인트에서 추가 메트릭 세트를 가져올 수 있습니다.

**참고**: 동일한 인스턴스에 대해 두 가지를 모두 활성화하지 말고 DogStatsD 또는 Prometheus 메서드를 사용하세요.

1. Configure Consul to expose metrics to the Prometheus endpoint. Set the [`prometheus_retention_time`](https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time) nested under the top-level `telemetry` key of the main Consul configuration file:

   ```conf
   {
     ...
     "telemetry": {
       "prometheus_retention_time": "360h"
     },
     ...
   }
   ```

1. Edit the `consul.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) to start using the Prometheus endpoint.

   ```yaml
   instances:
       - url: <EXAMPLE>
         use_prometheus_endpoint: true
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### DogStatsD

Instead of using the Prometheus endpoint, you can configure Consul to send the same set of additional metrics to the Agent through [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/).

1. DogStatsD 메트릭을 보내도록 Consul을 설정하려면 Consul의 기본 설정 파일에서 최상위 `telemetry` 키 아래에 중첩된 `dogstatsd_addr`을 추가합니다.

   ```conf
   {
     ...
     "telemetry": {
       "dogstatsd_addr": "127.0.0.1:8125"
     },
     ...
   }
   ```

1. Update the [Datadog Agent main configuration file](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) `datadog.yaml` by adding the following configs to ensure metrics are tagged correctly:

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: consul
       prefix: "consul."
       mappings:
         - match: 'consul\.http\.([a-zA-Z]+)\.(.*)'
           match_type: "regex"
           name: "consul.http.request"
           tags:
             method: "$1"
             path: "$2"
         - match: 'consul\.raft\.replication\.appendEntries\.logs\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.logs"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.appendEntries\.rpc\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.rpc"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.heartbeat\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.heartbeat"
           tags:
             peer_id: "$1"
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog Agent에서 기본적으로 비활성화되어 있습니다. `datadog.yaml`에서 다음을 사용하여 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. Consul 로그를 수집하려면 `consul.yaml` 파일에서 이 설정 블록을 편집합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/consul_server.log
       source: consul
       service: myservice
   ```

   `path`와 `service` 파라미터 값을 변경하고 환경에 맞게 구성합니다.
   See the [sample consul.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example) for all available configuration options.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

For containerized environments, see the [Autodiscovery Integration Templates](https://docs.datadoghq.com/agent/kubernetes/integrations/) for guidance on applying the parameters below.

##### 메트릭 수집

| 파라미터            | 값                              |
| -------------------- | ---------------------------------- |
| `<INTEGRATION_NAME>` | `consul`                           |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                      |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:8500"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection](https://docs.datadoghq.com/agent/kubernetes/log/).

| 파라미터      | 값                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "consul", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `consul` under the Checks section.

**참고**: Consul 노드에 디버그 로깅이 활성화된 경우 Datadog Agent의 정기적인 폴링이 Consul 로그에 표시됩니다.

```text
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/leader (59.344us) from=127.0.0.1:53768
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/peers (62.678us) from=127.0.0.1:53770
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/state/any (106.725us) from=127.0.0.1:53772
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/catalog/services (79.657us) from=127.0.0.1:53774
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/service/consul (153.917us) from=127.0.0.1:53776
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/datacenters (71.778us) from=127.0.0.1:53778
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/nodes (84.95us) from=127.0.0.1:53780
```

#### Consul Agent에서 DogStatsD까지

`netstat`를 사용해 Consul 메트릭도 전송되고 있는지 확인합니다.

```shell
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:53874         127.0.0.1:8125          ESTABLISHED 23176/consul
```

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **consul.catalog.nodes_critical** <br>(gauge) | \[Integration\] The number of nodes with service status `critical` from those registered<br>_Shown as node_ |
| **consul.catalog.nodes_passing** <br>(gauge) | \[Integration\] The number of nodes with service status `passing` from those registered<br>_Shown as node_ |
| **consul.catalog.nodes_up** <br>(gauge) | \[Integration\] The number of nodes<br>_Shown as node_ |
| **consul.catalog.nodes_warning** <br>(gauge) | \[Integration\] The number of nodes with service status `warning` from those registered<br>_Shown as node_ |
| **consul.catalog.services_count** <br>(gauge) | \[Integration\] Metrics to count the number of services matching criteria like the service tag, node name, or status. To be queried using the `sum by` aggregator.<br>_Shown as service_ |
| **consul.catalog.services_critical** <br>(gauge) | \[Integration\] Total critical services on nodes<br>_Shown as service_ |
| **consul.catalog.services_passing** <br>(gauge) | \[Integration\] Total passing services on nodes<br>_Shown as service_ |
| **consul.catalog.services_up** <br>(gauge) | \[Integration\] Total services registered on nodes<br>_Shown as service_ |
| **consul.catalog.services_warning** <br>(gauge) | \[Integration\] Total warning services on nodes<br>_Shown as service_ |
| **consul.catalog.total_nodes** <br>(gauge) | \[Integration\] The number of nodes registered in the consul cluster<br>_Shown as node_ |
| **consul.check.up** <br>(gauge) | A metric representing the status of a service check. A value of 0 = unavailable, 1 = passing, 2 = warning, 3 = critical|
| **consul.client.rpc** <br>(count) | \[DogStatsD\] \[Prometheus\] This increments whenever a Consul agent in client mode makes an RPC request to a Consul server. This gives a measure of how much a given agent is loading the Consul servers. This is only generated by agents in client mode, not Consul servers.<br>_Shown as request_ |
| **consul.client.rpc.failed** <br>(count) | \[DogStatsD\] \[Prometheus\] Increments whenever a Consul agent in client mode makes an RPC request to a Consul server and fails<br>_Shown as request_ |
| **consul.http.request** <br>(gauge) | \[DogStatsD\] Tracks how long it takes to service the given HTTP request for the given verb and path. Using a DogStatsD mapper as described in the README, the paths are mapped to tags and do not include details like service or key names. For these paths, an underscore is present as a placeholder, for example: `http_method:GET, path:v1.kv._)`<br>_Shown as millisecond_ |
| **consul.http.request.count** <br>(count) | \[Prometheus\] A count of how long it takes to service the given HTTP request for the given verb and path. It includes labels for path and method. Path does not include details like service or key names. For these paths, an underscore is present as a placeholder, for example: `path=v1.kv._)`<br>_Shown as millisecond_ |
| **consul.http.request.quantile** <br>(gauge) | \[Prometheus\] A quantile of how long it takes to service the given HTTP request for the given verb and path. Includes labels for path and method. Path does not include details like service or key names. For these paths, an underscore is present as a placeholder, for example: `path=v1.kv._)`<br>_Shown as millisecond_ |
| **consul.http.request.sum** <br>(count) | \[Prometheus\] The sum of how long it takes to service the given HTTP request for the given verb and path. Includes labels for path and method. Path does not include details like service or key names. For these paths, an underscore is present as a placeholder, for example: `path=v1.kv._)`<br>_Shown as millisecond_ |
| **consul.memberlist.degraded.probe** <br>(gauge) | \[DogStatsD\] \[Prometheus\] This metric counts the number of times the Consul agent has performed failure detection on another agent at a slower probe rate. The agent uses its own health metric as an indicator to perform this action. If its health score is low, it means that the node is healthy, and vice versa.|
| **consul.memberlist.gossip.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the number of gossips (messages) broadcasted to a set of randomly selected nodes.<br>_Shown as message_ |
| **consul.memberlist.gossip.avg** <br>(gauge) | \[DogStatsD\] The avg for the number of gossips (messages) broadcasted to a set of randomly selected nodes.<br>_Shown as message_ |
| **consul.memberlist.gossip.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of consul.memberlist.gossip|
| **consul.memberlist.gossip.max** <br>(gauge) | \[DogStatsD\] The max for the number of gossips (messages) broadcasted to a set of randomly selected nodes.<br>_Shown as message_ |
| **consul.memberlist.gossip.median** <br>(gauge) | \[DogStatsD\] The median for the number of gossips (messages) broadcasted to a set of randomly selected nodes.<br>_Shown as message_ |
| **consul.memberlist.gossip.quantile** <br>(gauge) | \[Prometheus\] The quantile for the number of gossips (messages) broadcasted to a set of randomly selected nodes.<br>_Shown as message_ |
| **consul.memberlist.gossip.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum of the number of gossips (messages) broadcasted to a set of randomly selected nodes.<br>_Shown as message_ |
| **consul.memberlist.health.score** <br>(gauge) | \[DogStatsD\] \[Prometheus\] This metric describes a node's perception of its own health based on how well it is meeting the soft real-time requirements of the protocol. This metric ranges from 0 to 8, where 0 indicates "totally healthy". For more details see section IV of the Lifeguard paper: https://arxiv.org/pdf/1707.00788.pdf|
| **consul.memberlist.msg.alive** <br>(count) | \[DogStatsD\] \[Prometheus\] This metric counts the number of alive Consul agents, that the agent has mapped out so far, based on the message information given by the network layer.|
| **consul.memberlist.msg.dead** <br>(count) | \[DogStatsD\] \[Prometheus\] This metric counts the number of times a Consul agent has marked another agent to be a dead node.<br>_Shown as message_ |
| **consul.memberlist.msg.suspect** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of times a Consul agent suspects another as failed while probing during gossip protocol|
| **consul.memberlist.probenode.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the time taken to perform a single round of failure detection on a select Consul agent.<br>_Shown as node_ |
| **consul.memberlist.probenode.avg** <br>(gauge) | \[DogStatsD\] The avg for the time taken to perform a single round of failure detection on a select Consul agent.<br>_Shown as node_ |
| **consul.memberlist.probenode.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of consul.memberlist.probenode|
| **consul.memberlist.probenode.max** <br>(gauge) | \[DogStatsD\] The max for the time taken to perform a single round of failure detection on a select Consul agent.<br>_Shown as node_ |
| **consul.memberlist.probenode.median** <br>(gauge) | \[DogStatsD\] The median for the time taken to perform a single round of failure detection on a select Consul agent.<br>_Shown as node_ |
| **consul.memberlist.probenode.quantile** <br>(gauge) | \[Prometheus\] The quantile for the time taken to perform a single round of failure detection on a select Consul agent.<br>_Shown as node_ |
| **consul.memberlist.probenode.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum for the time taken to perform a single round of failure detection on a select Consul agent.<br>_Shown as node_ |
| **consul.memberlist.pushpullnode.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the number of Consul agents that have exchanged state with this agent.<br>_Shown as node_ |
| **consul.memberlist.pushpullnode.avg** <br>(gauge) | \[DogStatsD\] The avg for the number of Consul agents that have exchanged state with this agent.<br>_Shown as node_ |
| **consul.memberlist.pushpullnode.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of consul.memberlist.pushpullnode|
| **consul.memberlist.pushpullnode.max** <br>(gauge) | \[DogStatsD\] The max for the number of Consul agents that have exchanged state with this agent.<br>_Shown as node_ |
| **consul.memberlist.pushpullnode.median** <br>(gauge) | \[DogStatsD\] The median for the number of Consul agents that have exchanged state with this agent.<br>_Shown as node_ |
| **consul.memberlist.pushpullnode.quantile** <br>(gauge) | \[Prometheus\] The quantile for the number of Consul agents that have exchanged state with this agent.|
| **consul.memberlist.pushpullnode.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum for the number of Consul agents that have exchanged state with this agent.|
| **consul.memberlist.tcp.accept** <br>(count) | \[DogStatsD\] \[Prometheus\] This metric counts the number of times a Consul agent has accepted an incoming TCP stream connection.<br>_Shown as connection_ |
| **consul.memberlist.tcp.connect** <br>(count) | \[DogStatsD\] \[Prometheus\] This metric counts the number of times a Consul agent has initiated a push/pull sync with an other agent.<br>_Shown as connection_ |
| **consul.memberlist.tcp.sent** <br>(count) | \[DogStatsD\] \[Prometheus\] This metric measures the total number of bytes sent by a Consul agent through the TCP protocol<br>_Shown as byte_ |
| **consul.memberlist.udp.received** <br>(count) | \[DogStatsD\] \[Prometheus\] This metric measures the total number of bytes sent/received by a Consul agent through the UDP protocol.<br>_Shown as byte_ |
| **consul.memberlist.udp.sent** <br>(count) | \[DogStatsD\] \[Prometheus\] This metric measures the total number of bytes sent/received by a Consul agent through the UDP protocol.<br>_Shown as byte_ |
| **consul.net.node.latency.max** <br>(gauge) | \[Integration\] Maximum latency from this node to all others<br>_Shown as millisecond_ |
| **consul.net.node.latency.median** <br>(gauge) | \[Integration\] Median latency from this node to all others<br>_Shown as millisecond_ |
| **consul.net.node.latency.min** <br>(gauge) | \[Integration\] Minimum latency from this node to all others<br>_Shown as millisecond_ |
| **consul.net.node.latency.p25** <br>(gauge) | \[Integration\] P25 latency from this node to all others<br>_Shown as millisecond_ |
| **consul.net.node.latency.p75** <br>(gauge) | \[Integration\] P75 latency from this node to all others<br>_Shown as millisecond_ |
| **consul.net.node.latency.p90** <br>(gauge) | \[Integration\] P90 latency from this node to all others<br>_Shown as millisecond_ |
| **consul.net.node.latency.p95** <br>(gauge) | \[Integration\] P95 latency from this node to all others<br>_Shown as millisecond_ |
| **consul.net.node.latency.p99** <br>(gauge) | \[Integration\] P99 latency from this node to all others<br>_Shown as millisecond_ |
| **consul.peers** <br>(gauge) | \[Integration\] The number of peers in the peer set|
| **consul.raft.apply** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of raft transactions occurring<br>_Shown as transaction_ |
| **consul.raft.commitTime.95percentile** <br>(gauge) | \[DogStatsD\] The p95 time it takes to commit a new entry to the raft log on the leader<br>_Shown as millisecond_ |
| **consul.raft.commitTime.avg** <br>(gauge) | \[DogStatsD\] The average time it takes to commit a new entry to the raft log on the leader<br>_Shown as millisecond_ |
| **consul.raft.commitTime.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of raft.commitTime|
| **consul.raft.commitTime.max** <br>(gauge) | \[DogStatsD\] The max time it takes to commit a new entry to the raft log on the leader<br>_Shown as millisecond_ |
| **consul.raft.commitTime.median** <br>(gauge) | \[DogStatsD\] The median time it takes to commit a new entry to the raft log on the leader<br>_Shown as millisecond_ |
| **consul.raft.commitTime.quantile** <br>(gauge) | \[Prometheus\] The quantile time it takes to commit a new entry to the raft log on the leader<br>_Shown as millisecond_ |
| **consul.raft.commitTime.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum of the time it takes to commit a new entry to the raft log on the leader<br>_Shown as millisecond_ |
| **consul.raft.leader.dispatchLog.95percentile** <br>(gauge) | \[DogStatsD\] The p95 time it takes for the leader to write log entries to disk<br>_Shown as millisecond_ |
| **consul.raft.leader.dispatchLog.avg** <br>(gauge) | \[DogStatsD\] The average time it takes for the leader to write log entries to disk<br>_Shown as millisecond_ |
| **consul.raft.leader.dispatchLog.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of raft.leader.dispatchLog|
| **consul.raft.leader.dispatchLog.max** <br>(gauge) | \[DogStatsD\] The max time it takes for the leader to write log entries to disk<br>_Shown as millisecond_ |
| **consul.raft.leader.dispatchLog.median** <br>(gauge) | \[DogStatsD\] The median time it takes for the leader to write log entries to disk<br>_Shown as millisecond_ |
| **consul.raft.leader.dispatchLog.quantile** <br>(gauge) | \[Prometheus\] The quantile time it takes for the leader to write log entries to disk<br>_Shown as millisecond_ |
| **consul.raft.leader.dispatchLog.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum of the time it takes for the leader to write log entries to disk<br>_Shown as millisecond_ |
| **consul.raft.leader.lastContact.95percentile** <br>(gauge) | \[DogStatsD\] The p95 time elapsed since the leader was last able to check its lease with followers<br>_Shown as millisecond_ |
| **consul.raft.leader.lastContact.avg** <br>(gauge) | \[DogStatsD\] The average time elapsed since the leader was last able to check its lease with followers<br>_Shown as millisecond_ |
| **consul.raft.leader.lastContact.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of raft.leader.lastContact|
| **consul.raft.leader.lastContact.max** <br>(gauge) | \[DogStatsD\] The max time elapsed since the leader was last able to check its lease with followers<br>_Shown as millisecond_ |
| **consul.raft.leader.lastContact.median** <br>(gauge) | \[DogStatsD\] The median time elapsed since the leader was last able to check its lease with followers<br>_Shown as millisecond_ |
| **consul.raft.leader.lastContact.quantile** <br>(gauge) | \[Prometheus\] The quantile time elapsed since the leader was last able to check its lease with followers<br>_Shown as millisecond_ |
| **consul.raft.leader.lastContact.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum of the time elapsed since the leader was last able to check its lease with followers<br>_Shown as millisecond_ |
| **consul.raft.replication.appendEntries.logs** <br>(count) | \[DogStatsD\] \[Prometheus\] Measures the number of logs replicated to an agent, to bring it up to speed with the leader's logs.<br>_Shown as entry_ |
| **consul.raft.replication.appendEntries.rpc.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The count the time taken by the append entries RFC to replicate the log entries of a leader agent onto its follower agent(s)<br>_Shown as millisecond_ |
| **consul.raft.replication.appendEntries.rpc.quantile** <br>(gauge) | \[Prometheus\] The quantile of the time taken by the append entries RFC to replicate the log entries of a leader agent onto its follower agent(s)<br>_Shown as millisecond_ |
| **consul.raft.replication.appendEntries.rpc.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum the time taken by the append entries RFC to replicate the log entries of a leader agent onto its follower agent(s)<br>_Shown as millisecond_ |
| **consul.raft.replication.heartbeat.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The count the time taken to invoke appendEntries on a peer.<br>_Shown as millisecond_ |
| **consul.raft.replication.heartbeat.quantile** <br>(gauge) | \[Prometheus\] The quantile of the time taken to invoke appendEntries on a peer.<br>_Shown as millisecond_ |
| **consul.raft.replication.heartbeat.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum of the time taken to invoke appendEntries on a peer.<br>_Shown as millisecond_ |
| **consul.raft.state.candidate** <br>(count) | \[DogStatsD\] \[Prometheus\]The number of initiated leader elections<br>_Shown as event_ |
| **consul.raft.state.leader** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of completed leader elections<br>_Shown as event_ |
| **consul.runtime.gc_pause_ns.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the number of nanoseconds consumed by stop-the-world garbage collection (GC) pauses since Consul started.<br>_Shown as nanosecond_ |
| **consul.runtime.gc_pause_ns.avg** <br>(gauge) | \[DogStatsD\] The avg for the number of nanoseconds consumed by stop-the-world garbage collection (GC) pauses since Consul started.<br>_Shown as nanosecond_ |
| **consul.runtime.gc_pause_ns.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of consul.runtime.gc_pause_ns|
| **consul.runtime.gc_pause_ns.max** <br>(gauge) | \[DogStatsD\] The max for the number of nanoseconds consumed by stop-the-world garbage collection (GC) pauses since Consul started.<br>_Shown as nanosecond_ |
| **consul.runtime.gc_pause_ns.median** <br>(gauge) | \[DogStatsD\] The median for the number of nanoseconds consumed by stop-the-world garbage collection (GC) pauses since Consul started.<br>_Shown as nanosecond_ |
| **consul.runtime.gc_pause_ns.quantile** <br>(gauge) | \[Prometheus\] The quantile of nanoseconds consumed by stop-the-world garbage collection (GC) pauses since Consul started.<br>_Shown as nanosecond_ |
| **consul.runtime.gc_pause_ns.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum of nanoseconds consumed by stop-the-world garbage collection (GC) pauses since Consul started.<br>_Shown as nanosecond_ |
| **consul.serf.coordinate.adjustment_ms.95percentile** <br>(gauge) | \[DogStatsD\] The p95 in milliseconds for the node coordinate adjustment<br>_Shown as millisecond_ |
| **consul.serf.coordinate.adjustment_ms.avg** <br>(gauge) | \[DogStatsD\] The avg in milliseconds for the node coordinate adjustment<br>_Shown as millisecond_ |
| **consul.serf.coordinate.adjustment_ms.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of consul.serf.coordinate.adjustment_ms|
| **consul.serf.coordinate.adjustment_ms.max** <br>(gauge) | \[DogStatsD\] The max in milliseconds for the node coordinate adjustment<br>_Shown as millisecond_ |
| **consul.serf.coordinate.adjustment_ms.median** <br>(gauge) | \[DogStatsD\] The median in milliseconds for the node coordinate adjustment<br>_Shown as millisecond_ |
| **consul.serf.coordinate.adjustment_ms.quantile** <br>(gauge) | \[Prometheus\] The quantile in milliseconds for the node coordinate adjustment<br>_Shown as millisecond_ |
| **consul.serf.coordinate.adjustment_ms.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum in milliseconds for the node coordinate adjustment<br>_Shown as millisecond_ |
| **consul.serf.events** <br>(count) | \[DogStatsD\] \[Prometheus\] This increments when a Consul agent processes a serf event<br>_Shown as event_ |
| **consul.serf.member.failed** <br>(count) | \[DogStatsD\] \[Prometheus\] This increments when a Consul agent is marked dead. This can be an indicator of overloaded agents, network problems, or configuration errors where agents cannot connect to each other on the required ports.|
| **consul.serf.member.flap** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of times a Consul agent is marked dead and then quickly recovers|
| **consul.serf.member.join** <br>(count) | \[DogStatsD\] \[Prometheus\] This increments when a Consul agent processes a join event<br>_Shown as event_ |
| **consul.serf.member.left** <br>(count) | \[DogStatsD\] \[Prometheus\] This increments when a Consul agent leaves the cluster.|
| **consul.serf.member.update** <br>(count) | \[DogStatsD\] \[Prometheus\] This increments when a Consul agent updates.|
| **consul.serf.msgs.received.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the number of serf messages received<br>_Shown as message_ |
| **consul.serf.msgs.received.avg** <br>(gauge) | \[DogStatsD\] The avg for the number of serf messages received<br>_Shown as message_ |
| **consul.serf.msgs.received.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The count of serf messages received|
| **consul.serf.msgs.received.max** <br>(gauge) | \[DogStatsD\] The max for the number of serf messages received<br>_Shown as message_ |
| **consul.serf.msgs.received.median** <br>(gauge) | \[DogStatsD\] The median for the number of serf messages received<br>_Shown as message_ |
| **consul.serf.msgs.received.quantile** <br>(gauge) | \[Prometheus\] The quantile for the number of serf messages received<br>_Shown as message_ |
| **consul.serf.msgs.received.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum for the number of serf messages received<br>_Shown as message_ |
| **consul.serf.msgs.sent.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the number of serf messages sent<br>_Shown as message_ |
| **consul.serf.msgs.sent.avg** <br>(gauge) | \[DogStatsD\] The avg for the number of serf messages sent<br>_Shown as message_ |
| **consul.serf.msgs.sent.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The count of serf messages sent|
| **consul.serf.msgs.sent.max** <br>(gauge) | \[DogStatsD\] The max for the number of serf messages sent<br>_Shown as message_ |
| **consul.serf.msgs.sent.median** <br>(gauge) | \[DogStatsD\] The median for the number of serf messages sent<br>_Shown as message_ |
| **consul.serf.msgs.sent.quantile** <br>(gauge) | \[Prometheus\] The quantile for the number of serf messages sent<br>_Shown as message_ |
| **consul.serf.msgs.sent.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] The sum of the number of serf messages sent<br>_Shown as message_ |
| **consul.serf.queue.event.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the size of the serf event queue|
| **consul.serf.queue.event.avg** <br>(gauge) | \[DogStatsD\] The avg size of the serf event queue|
| **consul.serf.queue.event.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of items in the serf event queue|
| **consul.serf.queue.event.max** <br>(gauge) | \[DogStatsD\] The max size of the serf event queue|
| **consul.serf.queue.event.median** <br>(gauge) | \[DogStatsD\] The median size of the serf event queue|
| **consul.serf.queue.event.quantile** <br>(gauge) | \[Prometheus\] The quantile for the size of the serf event queue|
| **consul.serf.queue.intent.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the size of the serf intent queue|
| **consul.serf.queue.intent.avg** <br>(gauge) | \[DogStatsD\] The avg size of the serf intent queue|
| **consul.serf.queue.intent.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of items in the serf intent queue|
| **consul.serf.queue.intent.max** <br>(gauge) | \[DogStatsD\] The max size of the serf intent queue|
| **consul.serf.queue.intent.median** <br>(gauge) | \[DogStatsD\] The median size of the serf intent queue|
| **consul.serf.queue.intent.quantile** <br>(gauge) | \[Prometheus\] The quantile for the size of the serf intent queue|
| **consul.serf.queue.query.95percentile** <br>(gauge) | \[DogStatsD\] The p95 for the size of the serf query queue|
| **consul.serf.queue.query.avg** <br>(gauge) | \[DogStatsD\] The avg size of the serf query queue|
| **consul.serf.queue.query.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of items in the serf query queue|
| **consul.serf.queue.query.max** <br>(gauge) | \[DogStatsD\] The max size of the serf query queue|
| **consul.serf.queue.query.median** <br>(gauge) | \[DogStatsD\] The median size of the serf query queue|
| **consul.serf.queue.query.quantile** <br>(gauge) | \[Prometheus\] The quantile for the size of the serf query queue|
| **consul.serf.snapshot.appendline.95percentile** <br>(gauge) | \[DogStatsD\] The p95 of the time taken by the Consul agent to append an entry into the existing log.<br>_Shown as millisecond_ |
| **consul.serf.snapshot.appendline.avg** <br>(gauge) | \[DogStatsD\] The avg of the time taken by the Consul agent to append an entry into the existing log.<br>_Shown as millisecond_ |
| **consul.serf.snapshot.appendline.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of consul.serf.snapshot.appendline|
| **consul.serf.snapshot.appendline.max** <br>(gauge) | \[DogStatsD\] The max of the time taken by the Consul agent to append an entry into the existing log.<br>_Shown as millisecond_ |
| **consul.serf.snapshot.appendline.median** <br>(gauge) | \[DogStatsD\] The median of the time taken by the Consul agent to append an entry into the existing log.<br>_Shown as millisecond_ |
| **consul.serf.snapshot.appendline.quantile** <br>(gauge) | \[Prometheus\] The quantile of the time taken by the Consul agent to append an entry into the existing log.<br>_Shown as millisecond_ |
| **consul.serf.snapshot.compact.95percentile** <br>(gauge) | \[DogStatsD\] The p95 of the time taken by the Consul agent to compact a log. This operation occurs only when the snapshot becomes large enough to justify the compaction .<br>_Shown as millisecond_ |
| **consul.serf.snapshot.compact.avg** <br>(gauge) | \[DogStatsD\] The avg of the time taken by the Consul agent to compact a log. This operation occurs only when the snapshot becomes large enough to justify the compaction .<br>_Shown as millisecond_ |
| **consul.serf.snapshot.compact.count** <br>(count) | \[DogStatsD\] \[Prometheus\] The number of samples of consul.serf.snapshot.compact|
| **consul.serf.snapshot.compact.max** <br>(gauge) | \[DogStatsD\] The max of the time taken by the Consul agent to compact a log. This operation occurs only when the snapshot becomes large enough to justify the compaction .<br>_Shown as millisecond_ |
| **consul.serf.snapshot.compact.median** <br>(gauge) | \[DogStatsD\] The median of the time taken by the Consul agent to compact a log. This operation occurs only when the snapshot becomes large enough to justify the compaction .<br>_Shown as millisecond_ |
| **consul.serf.snapshot.compact.quantile** <br>(gauge) | \[Prometheus\] The quantile of the time taken by the Consul agent to compact a log. This operation occurs only when the snapshot becomes large enough to justify the compaction .<br>_Shown as millisecond_ |

See [Consul's Telemetry doc](https://www.consul.io/docs/agent/telemetry.html) for a description of metrics the Consul Agent sends to DogStatsD.

See [Consul's Network Coordinates doc](https://www.consul.io/docs/internals/coordinates.html) for details on how the network latency metrics are calculated.

### 이벤트

**consul.new_leader**:<br>
Datadog Agent는 Consul 클러스터가 새 리더를 선출할 때 `prev_consul_leader`, `curr_consul_leader`, `consul_datacenter`로 태그를 지정하여 이벤트를 보냅니다.

### 서비스 점검

**consul.check**

Returns OK if the service is up, WARNING if there is an issue and CRITICAL when down.

_Statuses: ok, warning, critical, unknown_

**consul.up**

Returns OK if the consul server is up, CRITICAL otherwise.

_상태: ok, critical_

**consul.can_connect**

Returns OK if the Agent can make HTTP requests to consul, CRITICAL otherwise.

_상태: ok, critical_

**consul.prometheus.health**

Returns `CRITICAL` if the check cannot access the metrics endpoint, otherwise returns `OK`.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Monitoring HCP Consul with Datadog](https://docs.datadoghq.com/integrations/guide/hcp-consul)
- [Monitor Consul health and performance with Datadog](https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog)
- [Consul at Datadog](https://engineering.datadoghq.com/consul-at-datadog)
- [Key metrics for monitoring Consul](https://www.datadoghq.com/blog/consul-metrics/)
- [Consul monitoring tools](https://www.datadoghq.com/blog/consul-monitoring-tools/)
- [How to monitor Consul with Datadog](https://www.datadoghq.com/blog/consul-datadog/)
- [Datadog CNM now supports Consul networking](https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/)