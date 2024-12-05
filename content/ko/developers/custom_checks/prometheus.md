---
aliases:
- /ko/developers/openmetrics/
- /ko/developers/prometheus/
further_reading:
- link: /agent/kubernetes/prometheus
  tag: 설명서
  text: OpenMetrics 검사 설정
- link: /developers/custom_checks/write_agent_check/
  tag: 설명서
  text: 커스텀 검사 작성
- link: /developers/integrations/
  tag: 설명서
  text: 에이전트 기반 통합에 대한 소개
title: 커스텀 OpenMetrics 검사
---

## 개요

이 페이지는 [Kong][1]에서 타이밍 메트릭과 상태 이벤트를 수집하는 단순 검사 예제를 포함하여 고급 사용을 위한 `OpenMetricsBaseCheckV2` 인터페이스에 대해 설명합니다. 기본 OpenMetrics 검사 설정에 대한 자세한 내용은 [쿠버네티스(Kubernetes)  Prometheus 및 OpenMetrics 수집][2]을 참조하세요.

**참고**: `OpenMetricsBaseCheckV2`는 에이전트 v`7.26.x`+에서 사용할 수 있으며 파이썬(Python) 3이 필요합니다.

<div class="alert alert-info">
레거시 구현 또는<code>OpenMetric기본검사</code> 인터페이스 커스텀 검사 가이드를 찾고 있다면 <a href="https://docs.datadoghq.com/developers/faq/legacy-openmetrics/">커스텀 레거시 OpenMetrics 검사</a>를 참조하세요.
</div>

## 고급 사용: OpenMetrics 검사 인터페이스

메트릭 사전 처리와 같이 일반 검사보다 고급 사용이 필요한 경우, 커스텀 `OpenMetricsBaseCheckV2`을 작성할 수 있습니다. 일반 검사의 [기본 클래스][3]이며, Prometheus에 노출된 메트릭, 이벤트 및 서비스 검사를 수집할 수 있는 구조와 도움을 제공합니다. 이 클래스를 기반으로 한 검사의 최소 설정은 다음과 같습니다:

- `namespace`와 `metrics`매핑과 함께 기본 인스턴스를 만듭니다.
- `check()` 방법 구현 AND/OR:
- 처리된 OpenMetric의 이름을 딴 방법을 생성합니다 (참조 `self.prometheus_metric_name`).

Prometheus 메트릭 `kong_upstream_target_health` 값이 서비스 검사로 사용되는 [Kong 통합의 예][4]를 참조하세요.

## 커스텀 OpenMetrics 검사 작성

이것은 `OpenMetricsBaseCheckV2` 클래스의 사용법을 설명하기 위해 Kong 검사을 작성하는 간단한 예입니다. 아래 예제에서는 다음과 같은 일반적인 Openmetrics 검사 기능을 복제합니다:

```yaml
instances:
  - openmetrics_endpoint: http://localhost:8001/status/
    namespace: "kong"
    metrics:
      - kong_bandwidth: bandwidth
      - kong_http_consumer_status: http.consumer.status
      - kong_http_status: http.status
      - kong_latency:
          name: latency
          type: counter
      - kong_memory_lua_shared_dict_bytes: memory.lua.shared_dict.bytes
      - kong_memory_lua_shared_dict_total_bytes: memory.lua.shared_dict.total_bytes
      - kong_nginx_http_current_connections: nginx.http.current_connections
      - kong_nginx_stream_current_connections: nginx.stream.current_connections
      - kong_stream_status: stream.status
```

### 설정

<div class="alert alert-warning">
설정 파일과 검사 파일의 이름이 일치해야 합니다. 만약 검사 파일의 이름이 <code>mycheck.py </code>인 경우, 설정 파일의 이름은 <em>반드시</em> <code>mycheck.svl</code>이어야 합니다.
</div>

Openmetrics 검사에 대한 설정은 일반 [에이전트 검사][5]와 거의 같습니다. 주요 차이점은 변수 `openmetrics_endpoint`을 `check.yaml` 파일에 포함하는 것입니다. 이것은 `conf.d/kong.yaml`로 나뉩니다:

```yaml
init_config:

instances:
# Prometheus 메트릭 엔드포인트의 URL 
- openmetrics_endpoint: http://localhost:8001/status/
```

### 검사 작성

모든 OpenMetrics 검사는 [`OpenMetricsBaseCheckV2`클래스][6]에서 파생됩니다:

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
```

## 통합 네임스페이스 정의

`__NAMESPACE__` 값은 해당 통합으로 수집된 모든 메트릭 및 서비스 검사 앞에 붙습니다. 

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

```

#### 메트릭 매핑 정의

[메트릭][7] 매핑을 사용하면 메트릭 이름을 변경하고 본래 메트릭 유형을 재정의할 수 있습니다.

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map =  {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }
```

#### 기본 인스턴스 정의

기본 인스턴스는 검사에 사용되는 기본 설정입니다. 기본 인스턴스는 `metrics` 및 `openmetrics_endpoint`를 재정의해야 합니다.
기본 인스턴트로 OpenMetricsBaseCheckV2의 `get_default_config`를 [재정의하세요][8].

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map = {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }

      def get_default_config(self):
            return {'metrics': self.metrics_map}
```


#### 검사 방법 구현

추가 기능을 구현하려면 `check()`기능을 재정의하세요.

`instance`에서 `endpoint`를 사용합니다. 이는 다음에서 메트릭을 폴링할 Prometheus 또는 OpenMetrics 메트릭 엔드포인트입니다:

```python
def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
```


##### 예외

잘못된 설정, 프로그래밍 오류, 메트릭 수집 불가로 검사를 실행할 수 없는 경우 의미 있는 예외가 발생해야 합니다. 이 예외는 기록되며 디버깅을 위해 에이전트 [상태 명령][9]에 표시됩니다. 예:

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find openmetrics_endpoint in config file.
          - Collected 0 metrics & 0 events

`ConfigurationError`로 `check()`방법 개선:

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")
```

그런 다음 데이터를 사용할 수 있는 즉시 내보내세요.

```python

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

    super().check(instance)
```

### 모든 것을 종합하기

```python
from datadog_checks.base import OpenMetricsBaseCheckV2
from datadog_checks.base import ConfigurationError

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map = {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }

      def get_default_config(self):
            return {'metrics': self.metrics_map}

      def check(self, instance):
          endpoint = instance.get('openmetrics_endpoint')
          if endpoint is None:
              raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

          super().check(instance)

```

## 더 알아보기

Prometheus 및 OpenMetrics 기본 통합에 대한 자세한 내용은 통합 [개발자 도움말][10]을 참조하세요.

 Openmetrics에서 사용 가능한 모든 설정 옵션을 보려면 [conf.yaml.example][11]을 참조하세요.
추가 설정 옵션에 대한 기본값을 포함하여 OpenMetrics 검사를 개선할 수 있습니다:

`exclude_metrics`
: 특정 메트릭이 중복되거나 높은 카디널리티를 도입하는 경우 일부 메트릭은 무시됩니다. 이 목록에 포함된 메트릭은 로그에서 `Unable to handle metric` 디버그 행 없이 자동으로 건너뜁니다. 
특정 필터와 일치하는 메트릭을 제외한 모든 메트릭을 제외하려면,` - ^(?!foo).*$`와 같은 네거티브 룩헤드 정규식을 사용할 수 있습니다.

`share_labels`
:`share_labels`매핑이 제공되면 메핑을 통해 여러 메트릭 간에 라벨을 공유할 수 있습니다. 키는 라벨을 공유하는 노출된 메트릭이며, 값은 공유 동작을 설정하는 매핑입니다. 각 매핑에는 최소한 다음 키 중 하나가 있어야 합니다: `labels`,`match`,`values` 

`exclude_labels`
: `exclude_labels`은 제외할 라벨의 배열입니다. 이러한 라벨은 메트릭을 제출할 때 태그로 추가되지 않습니다. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /ko/agent/kubernetes/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2
[4]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/kong/datadog_checks/kong/check.py#L22-L45
[5]: /ko/developers/integrations/
[6]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py
[7]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L65-L104
[8]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py#L86-L87
[9]: /ko/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: https://datadoghq.dev/integrations-core/base/openmetrics/
[11]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example