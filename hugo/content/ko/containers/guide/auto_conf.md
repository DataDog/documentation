---
algolia:
  tags:
  - auto conf
  - ignore auto conf
  - autoconf
  - ignore autoconf
aliases:
- /ko/agent/autodiscovery/auto_conf
- /ko/agent/faq/auto_conf
- /ko/agent/guide/auto_conf
description: Autodiscovery 자동 구성 템플릿을 사용하여 인기 있는 컨테이너 서비스의 자동 구성을 관리하세요.
further_reading:
- link: /containers/kubernetes/integrations/
  tag: 설명서
  text: Kubernetes에서 Autodiscovery를 사용하여 통합 구성하기
- link: /containers/docker/integrations/
  tag: 설명서
  text: Docker에서 Autodiscovery를 사용하여 통합 구성하기
- link: /containers/guide/container-discovery-management/
  tag: 설명서
  text: 컨테이너 탐지 관리
title: Autodiscovery 자동 구성
---
Agent가 컨테이너로 실행될 때 [Autodiscovery][44]는 `auto_conf.yaml`이라는 기본 구성 파일을 기반으로 다른 컨테이너를 검색합니다. 다음 통합의 해당 `conf.d/<INTEGRATION>.d/` 폴더에서 이러한 파일을 찾을 수 있습니다.

| 통합                    | 자동 구성 파일 |
| ------                         | --------                |
| [Apache][1]                    | [auto_conf.yaml][2]     |
| [Cilium][3]                    | [auto_conf.yaml][4]     |
| [Consul][5]                    | [auto_conf.yaml][6]     |
| [Coredns][7]                   | [auto_conf.yaml][8]     |
| [Couch][9]                     | [auto_conf.yaml][10]    |
| [Couchbase][11]                | [auto_conf.yaml][12]    |
| [Elastic][13]                  | [auto_conf.yaml][14]    |
| [Etcd][15]                     | [auto_conf.yaml][16]    |
| [External DNS][17]             | [auto_conf.yaml][18]    |
| [Istio][19]                    | [auto_conf.yaml][20]    |
| [Kube APIserver][21]           | [auto_conf.yaml][22]    |
| [Kube Controller Manager][23]  | [auto_conf.yaml][24]    |
| [KubeDNS][21]                  | [auto_conf.yaml][25]    |
| [Kube Scheduler][26]           | [auto_conf.yaml][27]    |
| [Kubernetes State][21]         | [auto_conf.yaml][28]    |
| [Kyototycoon][29]              | [auto_conf.yaml][30]    |
| [MemCached][31]                | [auto_conf.yaml][32]    |
| [Presto][33]                   | [auto_conf.yaml][34]    |
| [RabbitMQ][42]                 | [auto_conf.yaml][43]    |
| [Redis][35]                    | [auto_conf.yaml][36]    |
| [Riak][37]                     | [auto_conf.yaml][38]    |
| [Tomcat][39]                   | [auto_conf.yaml][40]    |

`auto_conf.yaml` 구성 파일은 특정 통합을 설정하는 데 필요한 모든 파라미터를 포함하며, 컨테이너화된 환경을 고려하도록 해당 [Autodiscovery 템플릿 변수][41]가 적용되어 있습니다.

## 자동 구성 재정의 {#override-auto-configuration}
각 `auto_conf.yaml` 파일은 기본 구성을 제공합니다. Kubernetes에서 이를 재정의하려면 [Kubernetes 주석][45]에 사용자 지정 구성을 추가하거나 [`DatadogInstrumentation` 사용자 지정 리소스][47]를 사용할 수 있습니다. Docker의 경우 [Docker 레이블][46]을 사용하세요.

Kubernetes 주석은 `DatadogInstrumentation` 리소스 및 `auto_conf.yaml` 파일보다 우선합니다. `DatadogInstrumentation` 리소스는 `auto_conf.yaml` 파일보다 우선하며, `auto_conf.yaml` 파일은 Datadog Operator 및 Helm 차트에 설정된 Autodiscovery 구성보다 우선합니다. Datadog Operator 또는 Helm을 사용하여 이 페이지의 표에 있는 통합에 대한 Autodiscovery를 구성하려면 [자동 구성을 비활성화](#disable-auto-configuration)해야 합니다.

## 자동 구성 비활성화 {#disable-auto-configuration}

다음 예시는 Redis 및 Istio 통합에 대한 자동 구성을 비활성화합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`에서 `override.nodeAgent.containers.agent.env`를 사용하여 `agent` 컨테이너에 `DD_IGNORE_AUTOCONF` 환경 변수를 설정합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  override:
    nodeAgent:
      containers: 
        agent:
          env:
            - name: DD_IGNORE_AUTOCONF
              value: "redisdb istio"
```

그런 다음 새로운 구성을 적용합니다.

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml`에 `datadog.ignoreAutoconfig`를 추가합니다.

```yaml
datadog:
  #List of integration(s) to ignore auto_conf.yaml.
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "컨테이너화된 Agent" %}}
컨테이너화된 Agent(수동 DaemonSet, Docker, ECS)에서 자동 구성 통합을 비활성화하려면 `DD_IGNORE_AUTOCONF` 환경 변수를 추가합니다.

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/apache/
[2]: https://github.com/DataDog/integrations-core/tree/master/apache/datadog_checks/apache/data/auto_conf.yaml
[3]: /ko/integrations/cilium
[4]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/auto_conf.yaml
[5]: /ko/integrations/consul/
[6]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[7]: /ko/integrations/coredns/
[8]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[9]: /ko/integrations/couch/
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: /ko/integrations/couchbase/
[12]: https://github.com/DataDog/integrations-core/tree/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[13]: /ko/integrations/elastic/
[14]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[15]: /ko/integrations/etcd/
[16]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[17]: /ko/integrations/external_dns
[18]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/auto_conf.yaml
[19]: /ko/integrations/istio
[20]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[21]: /ko/agent/kubernetes/
[22]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[23]: /ko/integrations/kube_controller_manager
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[26]: /ko/integrations/kube_scheduler
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[28]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[29]: /ko/integrations/kyototycoon/
[30]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[31]: /ko/integrations/mcache/
[32]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[33]: /ko/integrations/presto/
[34]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[35]: /ko/integrations/redisdb/
[36]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[37]: /ko/integrations/riak/
[38]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[39]: /ko/integrations/tomcat/
[40]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[41]: /ko/agent/guide/template_variables/
[42]: /ko/integrations/rabbitmq/
[43]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml
[44]: /ko/getting_started/containers/autodiscovery
[45]: /ko/containers/kubernetes/integrations/?tab=annotations#configuration
[46]: /ko/containers/docker/integrations/
[47]: /ko/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/