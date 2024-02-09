---
further_reading:
- link: /agent/kubernetes/prometheus/
  tag: 설명서
  text: OpenMetrics 검사 설정
- link: /developers/custom_checks/write_agent_check/
  tag: 설명서
  text: 커스텀 검사 작성
- link: /developers/integrations/
  tag: 설명서
  text: Agent 기반 통합에 대한 소개
kind: documentation
title: 커스텀 레거시 OpenMetrics 검사
---

## 개요

이 페이지에서는 [Kube DNS][1]에서 타이밍 메트릭과 상태 이벤트를 수집하는 간단한 검사 예를 포함하여 고급 사용을 위한 `OpenMetricsBaseCheck` 인터페이스에 대해 자세히 설명합니다. 기본 OpenMetrics 검사 설정에 대한 자세한 내용은 [Kubernetes Prometheus 및 OpenMetrics 메트릭 수집][2]을 참조하세요.

## 고급 사용: OpenMetrics 검사 인터페이스

메트릭 사전 처리와 같이 일반 검사보다 고급 요구사항이 있는 경우 커스텀 `OpenMetricsBaseCheck`를 작성할 수 있습니다. 이것은 일반 검사의 [베이스 클래스][3]로, Prometheus에 노출된 메트릭, 이벤트 및 서비스 검사를 수집하기 위한 구조와 몇 가지 헬퍼를 제공합니다. 이 클래스를 기반으로 하는 검사에 대한 최소 설정은 다음과 같습니다:

- `namespace`와 `metrics` 매핑과 함께 기본 인스턴스를 만듭니다.
- `check()` 메서드 구현 및/또는:
- 처리된 OpenMetric의 이름을 딴 메서드를 생성합니다 (`self.prometheus_metric_name` 참조).

## 커스텀 Prometheus 검사 작성

다음은 `OpenMetricsBaseCheck` 클래스의 사용법을 설명하기 위해 Kube DNS 검사를 작성하는 간단한 예제입니다. 아래 예제는 다음과 같은 일반 Prometheus 검사의 기능을 복제합니다:

```yaml
instances:
  - prometheus_url: http://localhost:10055/metrics
    namespace: "kubedns"
    metrics:
      - kubedns_kubedns_dns_response_size_bytes: response_size.bytes
      - kubedns_kubedns_dns_request_duration_seconds: request_duration.seconds
      - kubedns_kubedns_dns_request_count_total: request_count
      - kubedns_kubedns_dns_error_count_total: error_count
      - kubedns_kubedns_dns_cachemiss_count_total: cachemiss_count
```

### 설정

<div class="alert alert-warning">
설정 파일과 검사 파일의 이름이 일치해야 합니다. 만약 검사 파일의 이름이 <code>mycheck.py</code>인 경우, 설정 파일의 이름은 <em>반드시</em> <code>mycheck.yaml</code>이어야 합니다.
</div>

Prometheus 검사에 대한 설정은 일반 [Agent 검사][4]와 거의 같습니다. 주요 차이점은 `check.yaml` 파일에 `prometheus_url` 변수를 포함하는 것입니다. 이는 `conf.d/kube_dns.yaml`에 포함됩니다.

```yaml
init_config:

instances:
    #  Prometheus의 메트릭 엔드포인트 URL
  - prometheus_url: http://localhost:10055/metrics
```

### 검사 작성

모든 OpenMetrics 검사는 [`OpenMetricsBaseCheck` 클래스][5]에서 상속됩니다:

```python
from datadog_checks.base import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
```

#### 메트릭 매핑 정의

```python
from datadog_checks.base import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
    def __init__(self, name, init_config, instances=None):
        METRICS_MAP = {
            #메트릭은 kubernetes 1.6.0에서 kubedns로 이름이 변경되었습니다.
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count'
        }
```

#### 기본 인스턴스 정의

기본 인스턴스는 검사에 사용되는 기본 설정입니다. 기본 인스턴스는 `namespace`, `metrics` 및 `prometheus_url`를 재정의해야 합니다.

**참고**: `OpenMetricsBaseCheck`에서 일부 설정 옵션에 대한 기본값을 덮어쓰므로 [Prometheus 및 Datadog 메트릭 유형][6] 간에 메트릭 동작 상관 관계가 증가했습니다.

```python
from datadog_checks.base import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
    def __init__(self, name, init_config, instances=None):
        METRICS_MAP = {
            #메트릭은 kubernetes 1.6.0에서 kubedns로 이름이 변경되었습니다.
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count'
        }
        super(KubeDNSCheck, self).__init__(
            name,
            init_config,
            instances,
            default_instances={
                'kubedns': {
                    'prometheus_url': 'http://localhost:8404/metrics',
                    'namespace': 'kubedns',
                    'metrics': [METRIC_MAP],
                    'send_histograms_buckets': True,
                    'send_distribution_counts_as_monotonic': True,
                    'send_distribution_sums_as_monotonic': True,
                }
            },
            default_namespace='kubedns',
        )
```


#### 검사 메서드 구현

추가 기능을 구현하려면 `check()` 함수를 재정의하세요.

`instance`에서 `endpoint`를 사용합니다. 이는 다음에서 메트릭을 폴링할 Prometheus 또는 OpenMetrics 메트릭 엔드포인트입니다:

```python
def check(self, instance):
    endpoint = instance.get('prometheus_url')
```

##### 예외

잘못된 설정, 프로그래밍 오류, 메트릭을 수집할 수 없는 등의 이유로 검사를 수행할 수 없는 경우 적절한 예외를 생성해야 합니다. 디버깅을 위해 이 예외가 기록되고 Agent [상태 명령][7]에 표시됩니다. 예를 들면 다음과 같습니다.

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find prometheus_url in config file.
          - Collected 0 metrics & 0 events

`ConfigurationError`로 `check()` 메서드 개선:

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('prometheus_url')
    if endpoint is None:
        raise ConfigurationError("Unable to find prometheus_url in config file.")
```

그런 다음 데이터를 사용할 수 있는 즉시 내보내세요.

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('prometheus_url')
    if endpoint is None:
        raise ConfigurationError("Unable to find prometheus_url in config file.")

    self.process(instance)
```

### 지금까지 다룬 내용

```python
from datadog_checks.base import ConfigurationError, OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
    """
    Collect kube-dns metrics from Prometheus endpoint
    """
    def __init__(self, name, init_config, instances=None):
        METRICS_MAP = {
            #메트릭은 kubernetes 1.6.0에서 kubedns로 이름이 변경되었습니다.
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count'
        }
        super(KubeDNSCheck, self).__init__(
            name,
            init_config,
            instances,
            default_instances={
                'kubedns': {
                    'prometheus_url': 'http://localhost:8404/metrics',
                    'namespace': 'kubedns',
                    'metrics': [METRIC_MAP],
                    'send_histograms_buckets': True,
                    'send_distribution_counts_as_monotonic': True,
                    'send_distribution_sums_as_monotonic': True,
                }
            },
            default_namespace='kubedns',
        )

    def check(self, instance):
        endpoint = instance.get('prometheus_url')
        if endpoint is None:
            raise ConfigurationError("Unable to find prometheus_url in config file.")

        self.process(instance)
```

## 더 알아보기

Prometheus 및 OpenMetrics 기반 통합에 대한 자세한 내용은 통합 [개발자 문서][8]를 참조하세요.

추가 설정 옵션에 대한 기본값을 포함하여 OpenMetrics 검사를 개선할 수 있습니다:

`ignore_metrics`
: 일부 메트릭이 중복되거나 카디널리티가 높기 때문에 무시됩니다. 이 목록에 포함된 메트릭은 로그에 `Unable to handle metric` 디버그 줄 없이 자동으로 건너뜁니다.

`labels_mapper`
: `labels_mapper` 사전이 제공되면 게이지를 전송할 때 `labels_mapper`의 메트릭 라벨은 해당 값을 태그 이름으로 사용합니다.

`exclude_labels`
: `exclude_labels`은 제외할 라벨의 배열입니다. 이러한 라벨은 메트릭을 제출할 때 태그로 추가되지 않습니다. 

`type_overrides`
: `type_overrides`는 사전으로, 키는 Prometheus 또는 OpenMetrics 메트릭 이름이고 값은 페이로드에 나열된 메트릭 유형 대신 사용할 메트릭 유형(이름은 문자열)입니다. 유형이 지정되지 않은 메트릭에 유형을 강제로 적용하는 데 사용할 수 있습니다.
사용 가능한 유형은 다음과 같습니다: `counter`, `gauge`, `summary`, `untyped`, 및 `histogram`.
: **참고**: 이 값은 기본 클래스에서는 비어 있지만 커스텀 메트릭으로 계산되지 않도록 최종 검사에서 오버로드/하드코딩해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /ko/agent/kubernetes/prometheus/
[3]: https://github.com/DataDog/dd-agent/blob/master/checks/prometheus_check.py
[4]: /ko/developers/integrations/
[5]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/base_check.py
[6]: /ko/integrations/guide/prometheus-metrics/
[7]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: https://datadoghq.dev/integrations-core/base/openmetrics/