---
aliases:
- /ko/integrations/go_expvar
app_id: go-expvar
categories:
- 언어
custom_kind: 통합
description: Go 서비스에서 expvar 계측 메트릭 및 메모리 통계를 수집합니다.
further_reading:
- link: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog
  tag: 블로그
  text: Expvar 및 Datadog으로 Go 앱 계측하기
integration_version: 5.0.0
media: []
supported_os:
- linux
- macos
- 윈도우즈(Windows)
title: Go-Expvar
---
![Go 그래프](https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png)

## 개요

Go 서비스의 메모리 사용량을 추적하고 Go의 expvar 패키지에서 계측된 메트릭을 수집합니다.

[dogstats-go](https://github.com/DataDog/datadog-go)만 사용하여 Go 코드를 계측하는 것을 선호한다면 본 통합을 사용하여 메모리 관련 메트릭을 수집할 수 있습니다.

## 설정

### 설치

Go Expvar 점검은 Agent와 같이 패키지로 제공되므로, Go 서비스를 실행하여 메트릭을 수집하는 어느 곳에서든 [해당 Agent를 설치](https://app.datadoghq.com/account/settings/agent/latest)할 수 있습니다.

### 설정

#### 서비스 준비하기

Go 서비스에서 [expvar 패키지](https://golang.org/pkg/expvar)를 사용하고 있지 않다면 해당 패키지를 불러옵니다(`import "expvar"`). expvar를 사용해 메트릭을 계측하고 싶지 않다면, 즉 서비스의 메모리 메트릭만 수집하고 싶다면 빈 식별자(`import _ "expvar"`)를 사용하여 패키지를 가져옵니다. 서비스가 HTTP 요청을 수신 대기하지 않는 경우(http 패키지 사용) Datadog Agent에 대해서만 로컬로 [수신 대기하도록 설정](https://golang.org/pkg/net/http/#ListenAndServe)합니다.

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 에이전트 연결

1. [Agent 설정 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory)의 루트에 있는 `conf.d/` 폴더에서 `go_expvar.d/conf.yaml` 파일을 편집합니다. 모든 가용 설정 옵션을 보려면 [샘플 go_expvar.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example)을 참조하세요.

   **참고**: `metrics` 목록을 설정하지 않았다면 Agent는 memstat 메트릭을 수집합니다. `metrics`을 사용하여 Agent가 수집할 expvar 변수를 지정해 줍니다.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**참고**: Go Expvar 통합 설정은 [커스텀 메트릭](https://docs.datadoghq.com/developers/metrics/custom_metrics/)을 내보낼 가능성이 있으며, [빌링](https://docs.datadoghq.com/account_management/billing/custom_metrics/)에 영향을 미칠 수도 있습니다. 기본적으로 350 메트릭으로 제한되어 있습니다. 메트릭이 추가로 필요한 경우 [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                    |
| -------------------- | ---------------------------------------- |
| `<INTEGRATION_NAME>` | `go_expvar`                              |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                            |
| `<INSTANCE_CONFIG>`  | `{"expvar_url": "http://%%host%%:8080"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `go_expvar`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **go_expvar.memstats.alloc** <br>(게이지) | 할당되었으나 아직 해제되지 않음<br>Byte로 표시됨 |
| **go_expvar.memstats.frees** <br>(게이지) | 해제 횟수<br>Operation으로 표시됨 |
| **go_expvar.memstats.heap_alloc** <br>(게이지) | 할당되었으나 아직 해제되지 않음<br>Byte로 표시됨 |
| **go_expvar.memstats.heap_idle** <br>(게이지) | 유휴 스팬의 바이트<br>Byte로 표시됨 |
| **go_expvar.memstats.heap_inuse** <br>(게이지) | 유휴 상태가 아닌 스팬의 바이트<br>Byte로 표시됨 |
| **go_expvar.memstats.heap_objects** <br>(게이지) | 할당된 오브젝트의 총 개수<br>Item으로 표시됨 |
| **go_expvar.memstats.heap_released** <br>(게이지) | OS에 반환한 바이트<br>Byte로 표시됨 |
| **go_expvar.memstats.heap_sys** <br>(게이지) | 시스템에서 확보한 바이트<br>Byte로 표시됨 |
| **go_expvar.memstats.lookups** <br>(게이지) | 포인터 조회 횟수<br>Operation으로 표시됨 |
| **go_expvar.memstats.mallocs** <br>(게이지) | 할당 수<br>Operation으로 표시됨 |
| **go_expvar.memstats.num_gc** <br>(게이지) | 가비지 컬렉션 수<br>Garbage collection으로 표시됨 |
| **go_expvar.memstats.pause_ns.95percentile** <br>(게이지) | 최근 GC 일시 중지 시간의 95번째 백분위수<br>Nanosecond로 표시됨 |
| **go_expvar.memstats.pause_ns.avg** <br>(게이지) | 최근 GC 일시 중지 시간의 평균<br>Nanosecond로 표시됨 |
| **go_expvar.memstats.pause_ns.count** <br>(레이트) | 최근 제출한 GC 일시 중지 시간의 수<br>Sample로 표시됨 |
| **go_expvar.memstats.pause_ns.max** <br>(게이지) | 최대 GC 일시 중지 시간<br>Nanosecond로 표시됨 |
| **go_expvar.memstats.pause_ns.median** <br>(게이지) | GC 일시 중지 시간 중앙값<br>Nanosecond로 표시됨 |
| **go_expvar.memstats.pause_total_ns** <br>(게이지) | 프로세스 수명 동안의 최대 GC 일시 중지 시간<br>Nanosecond로 표시됨 |
| **go_expvar.memstats.total_alloc** <br>(게이지) | 할당된 바이트(해제된 경우에도)<br>Byte로 표시됨 |
| **go_expvar.memstats.total_alloc.count** <br>(카운트) | 할당된 바이트(해제된 경우에도)<br>Byte로 표시됨 |

### 이벤트

Go-Expvar 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

Go-Expvar 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [Expvar와 Datadog으로 Go 앱 계측하기](https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog)