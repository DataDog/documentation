---
aliases:
- /ko/monitors/monitor_types/process
- /ko/monitors/create/types/process/
description: 프로세스가 호스트에서 실행되는지 점검
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
- link: /monitors/downtimes/
  tag: 설명서
  text: 다운타임을 예약하여 모니터 음소거
- link: /monitors/manage/status/
  tag: 설명서
  text: 모니터 상태 점검
- link: https://www.datadoghq.com/blog/monitor-fargate-processes/
  tag: 블로그
  text: Datadog으로 AWS Fargate에서 실행 중인 프로세스 모니터링
kind: 설명서
title: 실시간 프로세스 모니터
---

## 개요

실시간 프로세스 모니터링은 [프로세스 에이전트][1]에서 수집한 데이터에 기반합니다. 호스트나 태그 프로세스의 그룹 수에 기반하여 경고 또는 알림을 보내는 모니터를 생성합니다.

실시간 프로세스 모니터는 하단과 같은 시나리오에서 사용하는 것이 최적입니다.

- 논컨테이너화된 장기 프로세스 인스턴스가 충분히 실행되고 있는지 확인합니다.
- 특정 프로세스가 실행 중일 시 플래그를 지정합니다.

**참고**: 에이전트는 장기 프로세스만 선택합니다. 20초 미만으로 지속되는 프로세스의 모니터는 불안정할 수도 있습니다.

## 모니터 생성

실시간 프로세스 모니터를 생성하는 방법은 다음 두 가지입니다.

- 기본 탐색 사용: *Monitors --> New Monitor --> Live Process**.
- [실시간 프로세스 페이지][4]에서 모니터링 하고 싶은 프로세스를 검색한 후, **+새 메트릭(New Metric)** 옆의 드롭다운 메뉴를 클릭하고 **모니터링 생성(Create monitor)**을 클릭합니다.

### 프로세스 선택

태그 또는 퍼지 텍스트 검색으로 인프라스트럭처의 모든 프로세스에 필터를 적용할 수 있습니다. 일치하는 프로세스 및 개수는 검색 하단에 표시됩니다.

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Select processes" style="width:90%;">}}

검색을 정의하면 검색 입력값 상단에 검색한 프로세스의 총 근사치가 포함된 그래프가 표시됩니다. 모니터 범위를 프로세스 몇천 개 내로 유지하실 것을 권장합니다. 태그를 추가로 사용하여 검색 범위를 좁히거나, 필요한 경우 모니터를 여러 개로 분할하는 것도 고려해 볼 수 있습니다. 더 자세한 데이터를 확인하려면 [실시간 프로세스 페이지][4]를 참조하세요.

#### 태그 검색

모니터링할 프로세스에 태그를 적용합니다. Datadog은 태그로 프로세스에 필터를 적용한 후 전체 텍스트 검색을 사용하기를 권장합니다.

#### 전체 텍스트 검색

태그를 사용하여 프로세스를 원하는 세부 수준까지 검색할 수 없는 경우, 텍스트 검색을 활용하여 명령어 라인과 사용자 이름 모두에 필터를 적용할 수 있습니다. 해당 검색으로 인프라스트럭처에서 모든 프로세스에 부분 일치 및 퍼지 검색을 수행합니다. 검색 연산자 `AND`, `OR`, `NOT`을 지원합니다. 자세한 내용을 확인하려면 [실시간 프로세스 모니터링 문서][3]를 참조하세요.

##### 예시

| 예시 쿼리 | 설명 |
|---|---|
| `foo AND bar` | 명령어 라인에 `foo`, `bar`이 포함되는 모든 프로세스와 일치함 |
| `foo AND NOT bar` | 명령어 라인에 `foo`이 포함되고 `bar`이 포함되지 않은 모든 프로세스와 일치함 |
| `foo OR bar` | 명령어 라인에 `foo` 또는 `bar`이 포함된 모든 프로세스와 일치함 |
| `foo or NOT bar` | `foo`을 포함하거나 `bar`을 포함하지 않는 모든 프로세스와 일치함, |

#### 경고 그룹화

`Simple Alert` (기본값): 모든 보고 출처에 대한 알림을 집계합니다. 집계한 값이 설정한 값을 충족하면 하나의 알림을 받게 됩니다.

`Multi Alert`: 그룹 파라미터에 따라 각 출처에 알림을 적용합니다. 설정한 조건을 충족하는 각 그룹에 대해 알림을 받습니다.

### 알림 조건 설정

- 프로세스 개수는 `above`, `above or equal to`, `below`, 또는 `below or equal to`였습니다.
- `5 minutes`, `15 minutes`, `1 hour` 전 또는 그 이전의 임계값입니다. 또한 `custom`을 사용하여 5분 ~ 24시간 사이의 값을 설정할 수도 있습니다.

이러한 경우, 프로세스 개수는 해당 시간 간격 동안 동작한 모든 일치 프로세스의 개수를 나타냅니다.

임계값을 사용하여 알림을 트리거할 숫자값을 설정합니다. Datadog은 두 가지 알림 유형(알림 및 경고)을 갖추고 있습니다. 실시간 프로세스 모니터는 알림 또는 경고 임계값에 따라 자동 복구됩니다.

#### 타임프레임 선택 모범 사례

실시간 프로세스 모니터 기능으로 [롤링 타임 윈도우][7]를 사용하여 프로세스 개수를 측정합니다. 모니터는 매분마다 지난 X분 동안의 개수를 측정하고, 경고 조건을 충족할 경우 트리거됩니다. 프로세스 에이전트와 Datadog 간의 산발적 네트워크 중단으로 인한 오탐 발생을 방지하려면 5분 미만의 롤링 타임 윈도우는 사용하지 않을 것을 권장합니다.

### 고급 알림 조건

고급 알림 옵션(자동 해결, 측정 지연 등)에 대한 자세한 지침을 확인하려면 [모니터 설정][5] 페이지를 참조하세요.

### 알림

**알림 및 자동화 설정** 섹션에 대한 자세한 지침은 [알림][6] 페이지를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/infrastructure/process/
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /ko/infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /ko/monitors/configuration/#advanced-alert-conditions
[6]: /ko/monitors/notify/
[7]: /ko/monitors/configuration/?tab=thresholdalert#evaluation-window