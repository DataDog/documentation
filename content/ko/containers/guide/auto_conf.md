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
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 만들기 & 불러오기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 컨테이너에 Agent 자동탐지를 포함하도록 관리하기
kind: guide
title: 자동 탐지에 대한 자동 설정
---

Agent가 컨테이너로 실행되면 기본적으로 `auto_conf.yaml`이라는 이름의 기본 자동 탐지 설정 파일을 기반으로 주변의 다른 컨테이너를 자동 탐지하려고 시도합니다. 다음 통합에 대한 해당 `conf.d/<INTEGRATION>.d/` 폴더에서 이러한 파일을 찾을 수 있습니다.

## 자동 설정 파일

| 통합                    | 자동 설정 파일 |
| ------                         | --------                |
| [Apache][1]                    | [auto_conf.yaml][2]     |
| [Cilium][3]                    | [auto_conf.yaml][4]     |
| [Consul][5]                    | [auto_conf.yaml][6]     |
| [Coredns][7]                   | [auto_conf.yaml][8]     |
| [Couch][9]                     | [auto_conf.yaml][10]    |
| [Couchbase][11]                | [auto_conf.yaml][12]    |
| [Elastic][13]                  | [auto_conf.yaml][14]    |
| [Etcd][15]                     | [auto_conf.yaml][16]    |
| [외부 DNS][17]             | [auto_conf.yaml][18]    |
| [Harbor][19]                   | [auto_conf.yaml][20]    |
| [Istio][21]                    | [auto_conf.yaml][22]    |
| [Kube APIserver][23]           | [auto_conf.yaml][24]    |
| [Kube Controller Manager][25]  | [auto_conf.yaml][26]    |
| [KubeDNS][23]                  | [auto_conf.yaml][27]    |
| [Kube Scheduler][28]           | [auto_conf.yaml][29]    |
| [Kubernetes State][23]         | [auto_conf.yaml][30]    |
| [Kyototycoon][31]              | [auto_conf.yaml][32]    |
| [MemCached][33]                | [auto_conf.yaml][34]    |
| [Presto][35]                   | [auto_conf.yaml][36]    |
| [RabbitMQ][47]                 | [auto_conf.yaml][48]    |
| [Redis][37]                    | [auto_conf.yaml][38]    |
| [Riak][39]                     | [auto_conf.yaml][40]    |
| [Tomcat][41]                   | [auto_conf.yaml][42]    |

`auto_conf.yaml` 설정 파일은 컨테이너화된 환경을 고려하기 위해 해당 [자동 탐지 템플릿 변수][43]와 함께 특정 통합을 설정하는 데 필요한 모든 파라미터를 포함합니다.

## 사용자 지정 설정
자동 설정 로직은 위의 모든 통합에 대한 기본 설정만 지원합니다. Datadog 통합 설정을 사용자 정의하려면 통합 템플릿 설명서를 참조하여  Agent 자동 탐지를 구성하는 방법을 알아보세요. 특정 컨테이너에 대해 Kubernetes 주석 또는 Docker 라벨을 통해 발견된 모든 설정은 `auto_conf.yaml` 파일보다 우선합니다.

* [Key-Value 스토어 사용하기][44]
* [Kubernetes 주석 사용하기][45]
* [Docker 라벨 사용하기][46]

## 자동 설정 해제

 Agent가 `auto_conf.yaml` 설정을 사용하지 못하도록 하려면 원하는 통합에 대한 `DD_IGNORE_AUTOCONF` 환경 변수를 추가하면 됩니다. 다음 예에서는  Agent가 [`redisdb.d/auto_conf.yaml`][38] 및 [`istio.d/auto_conf.yaml`][22] 파일을 무시하고 이러한 통합이 자동으로 설정되지 않도록 합니다.

{{< tabs >}}
{{% tab "Helm" %}}

Helm과의 자동 설정 통합을 비활성화하려면 `values.yaml`에 `datadog.ignoreAutoconfig`를 추가하세요.

```yaml
datadog:
 # auto_conf.yaml을 무시할 통합 목록.
  ignoreAutoConfig:
    - redisdb
    - istio
```
{{% /tab %}}
{{% tab "DaemonSet" %}}
DaemonSet와의 자동 설정 통합을 비활성화하려면 Agent 매니페스트에 `DD_IGNORE_AUTOCONF` 변수를 추가하세요.

```yaml
DD_IGNORE_AUTOCONF="redisdb istio"
```
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

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
[19]: /ko/integrations/harbor/
[20]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/auto_conf.yaml
[21]: /ko/integrations/istio
[22]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[23]: /ko/agent/kubernetes/
[24]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/auto_conf.yaml
[25]: /ko/integrations/kube_controller_manager
[26]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/auto_conf.yaml
[27]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[28]: /ko/integrations/kube_scheduler
[29]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/auto_conf.yaml
[30]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[31]: /ko/integrations/kyototycoon/
[32]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[33]: /ko/integrations/mcache/
[34]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[35]: /ko/integrations/presto/
[36]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/auto_conf.yaml
[37]: /ko/integrations/redisdb/
[38]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[39]: /ko/integrations/riak/
[40]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[41]: /ko/integrations/tomcat/
[42]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/auto_conf.yaml
[43]: /ko/agent/guide/template_variables/
[44]: /ko/agent/kubernetes/integrations/?tab=keyvaluestore#configuration
[45]: /ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
[46]: /ko/agent/docker/integrations/#configuration
[47]: /ko/integrations/rabbitmq/
[48]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/auto_conf.yaml