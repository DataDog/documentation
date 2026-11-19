---
aliases:
- /ko/developers/metrics/agent_metrics_submission/
- /ko/metrics/agent_metrics_submission
description: count, gauge, histogram 및 rate 함수를 사용하여 Agent 사용자 지정 검사에서 Custom Metrics를
  제출할 수 있습니다.
further_reading:
- link: /extend/custom_checks/write_agent_check/
  tag: 문서
  text: Agent 사용자 지정 검사 작성
title: '메트릭 제출: Agent 사용자 지정 검사'
---
함수는 [Agent 사용자 지정 검사][1]를 통해 메트릭을 제출하는 데 사용됩니다. [메트릭 유형][2]에 따라 다양한 함수를 사용할 수 있습니다. 사용된 함수에 따라 제출 내용과 Datadog 내에 저장되는 실제 메트릭 유형이 다를 수 있습니다.

## 함수 {#functions}

{{< tabs >}}
{{% tab "개수" %}}

### `monotonic_count()` {#monotonic-count}

이 함수는 항상 증가하는 원시 COUNT 메트릭을 추적하는 데 사용됩니다. Datadog Agent는 각 제출 간의 델타를 계산합니다. 이전 샘플보다 값이 낮은 샘플은 무시됩니다. 더 낮은 값은 일반적으로 기본 원시 COUNT 메트릭이 재설정되었음을 나타냅니다. 이 함수는 검사 실행 중에 여러 번 호출될 수 있습니다.

예를 들어, 샘플 2, 3, 6, 7을 제출하면 첫 번째 검사 실행 중에 값 5(7-2)가 전송됩니다. 동일한 `monotonic_count`에서 샘플 10, 11을 제출하면 두 번째 검사 실행 중에 값 4(11-7)가 전송됩니다.

**참고**: 이 함수로 제출된 메트릭은 Datadog에 `COUNT` 메트릭 유형으로 저장됩니다. 저장된 시계열의 각 값은 샘플 간 메트릭 값의 델타입니다(시간 정규화되지 않음).

함수 템플릿:

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 여부 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 문자열          | 예      | -             | 메트릭의 이름입니다.                                                             |
| `value`       | 부동 소수점           | 예      | -             | 메트릭의 값입니다.                                                           |
| `tags`        | 문자열 목록 | 아니요       | -             | 이 메트릭과 연결할 태그 목록입니다.                                       |
| `hostname`    | 문자열          | 아니요       | 현재 호스트  | 이 메트릭과 연결할 호스트 이름입니다.                                           |
| `device_name` | 문자열          | 아니요       | -             | 지원이 중단되었습니다. 대신 `device:<DEVICE_NAME>` 형식의 태그를 태그 목록에 추가합니다. |

### `count()` {#count}

이 함수는 검사 간격 중 발생한 이벤트 수를 제출합니다. 검사 실행 중에 여러 번 호출할 수 있으며, 각 샘플은 전송되는 값에 추가됩니다.

**참고**: 이 함수로 제출된 메트릭은 Datadog에 `COUNT` 메트릭 유형으로 저장됩니다.

함수 템플릿:

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 여부 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 문자열          | 예      | -             | 메트릭의 이름입니다.                                                             |
| `value`       | 부동 소수점           | 예      | -             | 메트릭의 값입니다.                                                           |
| `tags`        | 문자열 목록 | 아니요       | -             | 이 메트릭과 연결할 태그 목록입니다.                                       |
| `hostname`    | 문자열          | 아니요       | 현재 호스트  | 이 메트릭과 연결할 호스트 이름입니다.                                           |
| `device_name` | 문자열          | 아니요       | -             | 지원이 중단되었습니다. 대신 `device:<DEVICE_NAME>` 형식의 태그를 태그 목록에 추가합니다. |

{{% /tab %}}
{{% tab "게이지" %}}

### `gauge()` {#gauge}

이 함수는 특정 타임스탬프에서의 메트릭 값을 제출합니다. 검사 실행 중에 메트릭에 대해 여러 번 호출되는 경우 마지막 샘플만 사용됩니다.

**참고**: 이 함수로 제출된 메트릭은 Datadog에 `GAUGE` 메트릭 유형으로 저장됩니다.

함수 템플릿:

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 여부 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 문자열          | 예      | -             | 메트릭의 이름입니다.                                                             |
| `value`       | 부동 소수점           | 예      | -             | 메트릭의 값입니다.                                                           |
| `tags`        | 문자열 목록 | 아니요       | -             | 이 메트릭과 연결할 태그 목록입니다.                                       |
| `hostname`    | 문자열          | 아니요       | 현재 호스트  | 이 메트릭과 연결할 호스트 이름입니다.                                           |
| `device_name` | 문자열          | 아니요       | -             | 지원이 중단되었습니다. 대신 `device:<DEVICE_NAME>` 형식의 태그를 태그 목록에 추가합니다. |

{{% /tab %}}
{{% tab "Rate" %}}

### `rate()` {#rate}

이 함수는 RATE 메트릭의 샘플링된 원시 값을 제출합니다. Datadog Agent는 두 번의 제출 사이에 해당 메트릭 값의 변화량을 계산하고 이를 제출 간격으로 나누어 변화율을 구합니다. 이 함수는 검사 중에 한 번만 호출해야 하며 그렇지 않으면 이전에 제출된 값보다 작은 값은 모두 버립니다.

**참고**: 이 함수로 제출된 메트릭은 Datadog에 `GAUGE` 메트릭 유형으로 저장됩니다. 저장된 시계열의 각 값은 샘플 간 메트릭 값 변화량을 시간 기준으로 정규화한 값입니다.

함수 템플릿:

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 여부 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 문자열          | 예      | -             | 메트릭의 이름입니다.                                                             |
| `value`       | 부동 소수점           | 예      | -             | 메트릭의 값입니다.                                                           |
| `tags`        | 문자열 목록 | 아니요       | -             | 이 메트릭과 연결할 태그 목록입니다.                                       |
| `hostname`    | 문자열          | 아니요       | 현재 호스트  | 이 메트릭과 연결할 호스트 이름입니다.                                           |
| `device_name` | 문자열          | 아니요       | -             | 지원이 중단되었습니다. 대신 `device:<DEVICE_NAME>` 형식의 태그를 태그 목록에 추가합니다. |

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()` {#histogram}

이 함수는 검사 간격 중 발생한 히스토그램 메트릭의 샘플을 제출합니다. 이 함수는 검사 실행 중에 여러 번 호출될 수 있습니다. 각 샘플은 이 메트릭에 대한 값 집합의 통계적 분포에 추가됩니다.

**참고**: 생성된 모든 메트릭 집계는 Datadog에 `GAUGE` 메트릭 유형으로 저장되지만, 예외적으로 `<METRIC_NAME>.count`는 Datadog에 `RATE` 메트릭 유형으로 저장됩니다.

함수 템플릿:

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| 파라미터     | 유형            | 필수 여부 | 기본값 | 설명                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | 문자열          | 예      | -             | 메트릭의 이름입니다.                                                             |
| `value`       | 부동 소수점           | 예      | -             | 메트릭의 값입니다.                                                           |
| `tags`        | 문자열 목록 | 아니요       | -             | 이 메트릭과 연결할 태그 목록입니다.                                       |
| `hostname`    | 문자열          | 아니요       | 현재 호스트  | 이 메트릭과 연결할 호스트 이름입니다.                                           |
| `device_name` | 문자열          | 아니요       | -             | 지원이 중단되었습니다. 대신 `device:<DEVICE_NAME>` 형식의 태그를 태그 목록에 추가합니다. |

{{% /tab %}}
{{< /tabs >}}

## 튜토리얼 {#tutorial}

아래 단계에 따라 모든 메트릭 유형을 주기적으로 전송하는 [사용자 지정 Agent 검사][2]를 생성하세요.

1. [Agent 구성 디렉터리][3] 루트의 `conf.d/` 폴더에 `metrics_example.d/` 디렉터리를 생성합니다.

2. `metrics_example.d/` 폴더에 다음과 같은 내용으로 `metrics_example.yaml`이라는 빈 구성 파일을 생성합니다.

    ```yaml
    instances: [{}]
    ```

3. `conf.d/` 폴더에서 한 단계 위로 이동한 다음 `checks.d/` 폴더로 이동합니다. 아래 내용으로 `metrics_example.py`라는 사용자 지정 검사 파일을 생성합니다.

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

4. [Agent를 다시 시작][4]합니다.
5. [Agent의 상태 하위 명령][5]으로 사용자 지정 검사가 올바르게 실행되고 있는지 확인합니다. {{< ui >}}Checks{{< /ui >}} 섹션 아래에서 `metrics_example`을 찾습니다.

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

6. [Metrics Catalog 페이지][6]에서 메트릭이 Datadog으로 전송되고 있는지 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/extend/custom_checks/write_agent_check/
[2]: /ko/metrics/types/
[3]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: /ko/agent/configuration/agent-commands/#restart-the-agent
[5]: /ko/agent/configuration/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/catalog