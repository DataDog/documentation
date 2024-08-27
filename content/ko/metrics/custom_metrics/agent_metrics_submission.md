---
aliases:
- /ko/developers/metrics/agent_metrics_submission/
- /ko/metrics/agent_metrics_submission
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: 설명서
  text: Agent 커스텀 점검 생성하기
title: '메트릭 제출: 커스텀 에이전트 점검'
---

함수는 [커스텀 에이전트 점검][1]과 함께 메트릭을 제출하는 데 사용됩니다. [메트릭 타입][2]에 따라 다양한 함수를 사용할 수 있습니다. 사용한 함수에 따라 Datadog 내에 저장된 제출 및 실제 메트릭 타입이 다를 수 있습니다.

## 함수

{{< tabs >}}
{{% tab "Count" %}}

### `monotonic_count()`

해당 함수는 항상 증가하는 로우 COUNT 메트릭을 추적하는 데 사용됩니다. Datadog 에이전트는 각 제출 간의 델타 값을 계산합니다. 이전 샘플보다 작은 값의 샘플은 무시됩니다. 더 작은 값은 기존 로우 COUNT 메트릭이 초기화되었음을 나타냅다. 점검 실행 중에 해당 함수를 여러 번 호출할 수 있습니다.

예를 들어, 샘플 2, 3, 6, 7을 제출하면 첫 번째 점검 실행 중 값 5(7-2)가 전송됩니다. 동일한 `monotonic_count` 샘플 10, 11을 제출하면  두 번째 점검 실행 중 값 4(11-7)가 전송됩니다.

**참고**: 해당 기능으로 제출한 메트릭은 Datadog에 `COUNT` 메트릭 타입으로 저장됩니다. 저장된 시계열 데이터의 각 값은 샘플 간 메트릭 값의 델타 값입니다(시간 정규화되지 않음).

함수 템플릿:

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 스트링          | 예      | -             | 메트릭 이름.                                                             |
| `value`       | Float           | 예      | -             | 메트릭 값.                                                           |
| `tags`        | 스트링 목록 | 아니요       | -             | 해당 메트릭과 연관된 태그 목록.                                       |
| `hostname`    | 스트링          | 아니요       | 현재 호스트  | 해당 메트릭과 연관된 호스트네임.                                           |
| `device_name` | 스트링          | 아니요       | -             | 더 이상 사용되지 않음. 대신 `device:<DEVICE_NAME>` 타입의 태그를 태그 목록에 추가합니다. |

### `count()`

해당 함수는 점검 사이에 발생한 이벤트의 수를 제출합니다. 점검 실행 중에 여러 번 호출할 수 있으며, 각 샘플은 전송된 값에 더해집니다.

**참고**: 해당 기능으로 제출한 메트릭은 Datadog에 `COUNT` 메트릭 타입으로 저장됩니다. 저장된 시계열 데이터의 각 값은 샘플 간 메트릭 값의 델타 값입니다(시간 정규화되지 않음).

함수 템플릿:

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 스트링          | 예      | -             | 메트릭 이름.                                                             |
| `value`       | Float           | 예      | -             | 메트릭 값.                                                           |
| `tags`        | 스트링 목록 | 아니요       | -             | 해당 메트릭과 연관된 태그 목록.                                       |
| `hostname`    | 스트링          | 아니요       | 현재 호스트  | 해당 메트릭과 연관된 호스트네임.                                           |
| `device_name` | 스트링          | 아니요       | -             | 더 이상 사용되지 않음. 대신 `device:<DEVICE_NAME>` 타입의 태그를 태그 목록에 추가합니다. |

{{% /tab %}}
{{% tab "Gauge" %}}

### `gauge()`

해당 함수는 지정한 타임스탬프에서 메트릭 값을 제출합니다. 메트릭 점검 실행 중 여러 번 호출하면 마지막 샘플만 사용합니다.

**참고**: 해당 기능으로 제출한 메트릭은 Datadog에 `GAUGE` 타입으로 저장됩니다.

함수 템플릿:

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 스트링          | 예      | -             | 메트릭 이름.                                                             |
| `value`       | Float           | 예      | -             | 메트릭 값.                                                           |
| `tags`        | 스트링 목록 | 아니요       | -             | 해당 메트릭과 연관된 태그 목록.                                       |
| `hostname`    | 스트링          | 아니요       | 현재 호스트  | 해당 메트릭과 연관된 호스트네임.                                           |
| `device_name` | 스트링          | 아니요       | -             | 더 이상 사용되지 않음. 대신 `device:<DEVICE_NAME>` 타입의 태그를 태그 목록에 추가합니다. |

{{% /tab %}}
{{% tab "Rate" %}}

### `rate()`

해당 함수는 RATE 메트릭의 로우 샘플 값을 제출합니다. Datadog 에이전트는 두 제출 사이의 메트릭 델타 값을 계산하고 이를 제출 간격으로 나누어 비율을 산출합니다. 해당 함수는 점검 중 단 한 번만 호출해야 하며, 그렇지 않은 경우 기존 제출 값보다 작은 값을 폐기합니다.

**참고**: 해당 기능으로 제출한 메트릭은 Datadog에 `GAUGE` 메트릭 타입으로 저장됩니다. 저장된 시계열 데이터의 각 값은 샘플 간 메트릭 값의 시간 정규화된 델타 값입니다.

함수 템플릿:

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 스트링          | 예      | -             | 메트릭 이름.                                                             |
| `value`       | Float           | 예      | -             | 메트릭 값.                                                           |
| `tags`        | 스트링 목록 | 아니요       | -             | 해당 메트릭과 연관된 태그 목록.                                       |
| `hostname`    | 스트링          | 아니요       | 현재 호스트  | 해당 메트릭과 연관된 호스트네임.                                           |
| `device_name` | 스트링          | 아니요       | -             | 더 이상 사용되지 않음. 대신 `device:<DEVICE_NAME>` 타입의 태그를 태그 목록에 추가합니다. |

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()`

해당 함수는 점검 사이에 발생한 히스토그램 메트릭 샘플을 제출합니다. 점검 실행 중에 여러 번 호출할 수 있으며, 각 샘플은 메트릭 값 집합의 통계분포에 더해집니다.

**참고**: 생성한 모든 메트릭 집계는 Datadog에 `RATE` 메트릭 타입으로 저장되는 `<METRIC_NAME>.count` 메트릭을 제외하고, Datadog에 `GAUGE` 메트릭 타입으로 저장됩니다. 

함수 템플릿:

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 스트링          | 예      | -             | 메트릭 이름.                                                             |
| `value`       | Float           | 예      | -             | 메트릭 값.                                                           |
| `tags`        | 스트링 목록 | 아니요       | -             | 해당 메트릭과 연관된 태그 목록.                                       |
| `hostname`    | 스트링          | 아니요       | 현재 호스트  | 해당 메트릭과 연관된 호스트네임.                                           |
| `device_name` | 스트링          | 아니요       | -             | 더 이상 사용되지 않음. 대신 `device:<DEVICE_NAME>` 타입의 태그를 태그 목록에 추가합니다. |

{{% /tab %}}
{{< /tabs >}}

## 튜토리얼

하단의 지침에 따라 모든 메트릭 타입을 주기적으로 전송하는 [커스텀 에이전트 점검][2]을 생성하세요.

1. [에이전트 설정 디렉토리][3] 루트의 `conf.d/` 폴더에  `metrics_example.d/`디렉토리를 만듭니다.

2. `metrics_example.d/` 폴더에서 다음 콘텐츠가 있는 `metrics_example.yaml`(이)라는 빈 설정 파일을 만듭니다.

    ```yaml
    instances: [{}]
    ```

3. `conf.d/` 폴더의 한 단계 상위 폴더로 이동합니다. `checks.d/` 폴더로 가서 다음 콘텐츠가 있는 `metrics_example.py`(이)라는 커스텀 점검 파일을 만듭니다.

    ```python
    import random

    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.count(
                "example_metric.count",
                2,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.decrement",
                -1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.increment",
                1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.rate(
                "example_metric.rate",
                1,
                tags=["env:dev","metric_submission_type:rate"],
            )
            self.gauge(
                "example_metric.gauge",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:gauge"],
            )
            self.monotonic_count(
                "example_metric.monotonic_count",
                2,
                tags=["env:dev","metric_submission_type:monotonic_count"],
            )

            # Calling the functions below twice simulates
            # several metrics submissions during one Agent run.
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
    ```

4. [Agent를 다시 시작합니다][4].
5. [에이전트 상태 하위 명령어][5] 실행으로 커스텀 점검이 올바로 동작하는지 확인합니다. 점검 섹션에서 `metrics_example`을 찾습니다.

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        metrics_example (1.0.0)
        -----------------------
          Instance ID: metrics_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 8, Total: 16
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 2ms

        (...)
    ```

6. [메트릭 개요 페이지][6]에서 메트릭이 Datadog에 보고되는지 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/custom_checks/write_agent_check/
[2]: /ko/metrics/types/
[3]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /ko/agent/guide/agent-commands/#restart-the-agent
[5]: /ko/agent/guide/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/summary