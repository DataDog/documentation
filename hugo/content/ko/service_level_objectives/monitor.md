---
aliases:
- /ko/monitors/service_level_objectives/monitor/
- /ko/service_management/service_level_objectives/monitor/
description: 모니터를 사용하여 Service Level Objectives 정의하기
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터에 대해 더 알아보기
- link: https://www.datadoghq.com/blog/define-and-manage-slos/#monitor-based-slo
  tag: 블로그
  text: Datadog으로 SLO를 관리한 모범 사례
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: 블로그
  text: Datadog Synthetic Monitoring으로 SLO 정확도 및 성능 향상
- link: https://learn.datadoghq.com/courses/understanding-slos
  tag: 학습 센터
  text: Service Level Objectives(SLO) 이해하기
title: 모니터 기반 SLO
---
## 개요 {#overview}
새로운 또는 기존의 Datadog 모니터에서 SLO를 만들려면 모니터 기반 SLO를 생성합니다. 모니터 기반 SLO를 사용하면 시스템이 양호하게 작동되는 시간을 총 시간으로 나누어 서비스 수준 표시기(SLI)를 계산할 수 있습니다.

<div class="alert alert-info">시간 슬라이스 SLO는 시간 기반 SLI 계산으로 SLO를 생성하는 또 다른 방법입니다. 시간 슬라이스 SLO를 사용하면 모니터를 거치지 않고 가동 시간 SLO를 생성할 수 있으므로 모니터와 SLO를 모두 생성하고 유지 관리할 필요가 없습니다.</div>

{{< img src="service_level_objectives/monitor/monitor_slo_side_panel.png" alt="모니터 기반 SLO 예시" >}}

## 전제 조건 {#prerequisites}

모니터 기반 SLO를 생성하려면 기존 Datadog 모니터가 필요합니다. 새 모니터를 설정하려면 [모니터 생성 페이지][1]로 이동하세요.

Datadog 모니터 기반 SLO는 다음 모니터 유형을 지원합니다.
- 메트릭 모니터 유형(메트릭, 통합, APM 메트릭, 이상, 예측, 이상치)
- 신서틱(Synthetic)
- 서비스 검사

## 설정 {#setup}

[SLO 상태 페이지][2]에서 {{< ui >}}\+ New SLO{{< /ui >}}를 클릭합니다. 그런 다음 {{< ui >}}By Monitor Uptime{{< /ui >}}을 선택합니다.

### 쿼리 정의 {#define-queries}


검색 상자에 모니터 이름을 입력하기 시작합니다. 일치하는 모니터 목록이 나타납니다. 모니터 이름을 클릭하여 소스 목록에 추가하세요.

**참고**:

- SLO에서 단일 다중 경보 모니터를 사용하는 경우, 선택적으로 "선택한 그룹에 대해 계산"을 선택하여 최대 20개의 그룹을 선택할 수 있습니다. 
- SLO에 여러 모니터를 추가하는 경우 그룹 선택은 지원되지 않습니다. 최대 20개의 모니터를 추가할 수 있습니다.

### SLO 목표 설정 {#set-your-slo-targets}

{{< ui >}}target{{< /ui >}} 백분율, {{< ui >}}time window{{< /ui >}}, 그리고 선택 사항인 {{< ui >}}warning{{< /ui >}} 수준을 선택하세요.

목표 백분율은 SLO의 기본 모니터가 ALERT 상태가 되지 않아야 하는 시간을 지정합니다. 시간 창은 SLO가 계산을 실행하는 주기를 지정합니다.

SLI 값에 따라 Datadog UI는 SLO 상태를 다른 색으로 표시합니다:
- SLI가 목표 이상이면 SLO 상태가 녹색으로 표시됩니다.
- SLI가 목표 미만이면 SLO 상태가 빨간색으로 표시됩니다.
- 경고 수준을 포함하는 경우 SLI가 경고 수준보다는 낮고 목표 수준보다 높으면 SLO 상태가 노란색으로 표시됩니다.

선택한 시간 창에 따라 모니터 기반 SLO에서 사용 가능한 정확도가 달라집니다:
- 7일 및 30일 시간 창은 소수점 이하 두 자리까지 허용합니다.
- 90일 시간 창은 소수점 이하 세 자리까지 허용합니다.

Datadog은 SLO 세부 정보 UI에서 7일 및 30일 시간 창에서는 소수점 이하 두 자리, 90일 시간 창에서는 소수점 이하 세 자리까지 표시합니다.

다음 예시는 Datadog이 SLO 계산을 위해 소수점 자릿수를 제한하여 표시하는 이유를 보여줍니다. 7일 또는 30일 시간 창에 대해 99.999% 목표를 설정하면 각각 6초 또는 26초의 오류 예산이 발생합니다. 모니터는 매분 평가되므로 모니터 기반 SLO의 세분성도 1분입니다. 따라서 이전 예시의 6초 또는 26초 오류 예산을 한 번의 경보로 완전히 소진하고 초과하게 됩니다. 실제로 팀은 이렇게 작은 오류 예산을 충족할 수 없습니다.

분당 1회의 모니터 평가보다 더 정밀한 단위가 필요한 경우 [메트릭 기반 SLO][3]를 사용하는 것이 좋습니다.

### 이름 및 태그 추가 {#add-name-and-tags}

SLO의 이름과 자세한 설명을 선택합니다. SLO와 연결할 태그를 선택합니다. {{< ui >}}Create{{< /ui >}} 또는 {{< ui >}}Create & Set Alert{{< /ui >}}를 선택하여 새 SLO를 저장합니다.

## 상태 계산 {#status-calculation}

{{< img src="service_level_objectives/monitor/monitor_slo_overall_status.png" alt="그룹이 있는 모니터 기반 SLO" >}}

Datadog은 특정 그룹이 선택되지 않은 경우 모든 모니터 또는 모니터 그룹의 가동 시간 백분율로 전체 SLO 상태를 계산합니다.
- 특정 그룹이 선택된 경우(최대 20개), 해당 그룹만 사용하여 SLO 상태가 계산됩니다. UI에 선택된 모든 그룹이 표시됩니다. 
- 특정 그룹이 선택되지 않은 경우, SLO 상태는 *모든* 그룹에 걸쳐 계산됩니다. UI에 SLO의 모든 기본 그룹이 표시됩니다. 

**참고:** 그룹이 있는 모니터 기반 SLO의 경우, 최대 5,000개의 그룹을 포함하는 모든 SLO에 대해 모든 그룹을 표시할 수 있습니다. 5,000개가 넘는 그룹을 포함하는 SLO의 경우, SLO는 모든 그룹을 기반으로 계산되지만 UI에는 그룹이 표시되지 않습니다.

모니터 기반 SLO는 `WARN` 상태를 `OK`로 취급합니다. SLO 정의에는 양호한 동작과 불량한 동작 간의 이진 구분이 필요합니다. SLO 계산은 `WARN`이 불량한 동작을 나타낼 만큼 심각하지 않기 때문에 `WARN`을 양호한 동작으로 취급합니다.

다음은 3개의 모니터를 포함하는 모니터 기반 SLO에 대한 예시입니다. 단일 다중 경보 모니터를 기반으로 하는 모니터 기반 SLO에 대한 계산도 이와 유사하게 나타납니다.

| 모니터            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | 상태 |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| 모니터 1          | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK    | OK  | 90%    |
| 모니터 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERT | OK  | 90%    |
| 모니터 3          | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK    | OK  | 80%    |
| **전체 상태** | OK | OK | 경보 | OK | 경보 | OK | OK | OK | 경보 | OK  | 70%    |

이 예시에서는 전체 상태가 개별 상태의 평균보다 낮습니다.

모니터 음소거는 SLO 계산에 영향을 주지 않습니다. SLO 계산에서 기간을 제외하려면 [SLO 상태 수정][5] 기능을 사용합니다.

### Synthetic 테스트의 예외 사항 {#exceptions-for-synthetic-tests}
특정 경우에는 그룹화된 Synthetic 테스트 하나로 구성된 모니터 기반 SLO의 상태 계산에 예외가 적용됩니다. Synthetic 테스트에는 테스트가 ALERT 상태로 전환되는 시점의 동작을 변경하여 결과적으로 전체 가동 시간에 영향을 주는 선택적 특수 경보 조건이 있습니다.

- 지정된 시간(분) 동안 그룹에 장애가 발생할 때까지 기다립니다(기본값: 0).
- 지정된 수의 그룹에 장애가 발생할 때까지 기다립니다(기본값: 1).
- 위치 테스트가 실패로 간주될 때까지 지정된 횟수만큼 재시도합니다(기본값: 0).

어느 조건이든 기본값이 아닌 다른 조건으로 변경하면 하나의 Synthetic 테스트를 사용하는 모니터 기반 SLO의 전체 상태가 개별 그룹의 집계 상태보다 더 나을 수 있습니다.

Synthetic 테스트 경고 조건에 대한 자세한 내용은 [Synthetic Monitoring][4]을 참조하시기 바랍니다.

### 누락된 데이터 {#missing-data}
#### 메트릭 모니터 {#metric-monitors}
메트릭 모니터를 생성할 때 [모니터가 누락된 데이터를 처리하는 방법][6]을 선택합니다. 이 구성은 모니터 기반 SLO 계산이 누락된 데이터를 해석하는 방식에 영향을 줍니다.

| 모니터 구성     | 누락된 데이터의 SLO 계산 |
|---------------------------|---------------------------------|
| `Evaluate as zero`        | 모니터 경고 임계값에 따라 다름 <br> 예를 들어, 임계값이 `> 10`이면 가동 시간이 되고(모니터 상태가 `OK`가 되므로), 임계값이 `< 10`이면 가동 중지가 발생합니다.                             |
| `Show last known status`  | SLO의 마지막 상태 유지          |
| `Show NO DATA`            | 가동 시간                          |
| `Show NO DATA and notify` | 가동 중지                        |
| `Show OK`                 | 가동 시간                          |

#### 기타 모니터 유형 {#other-monitor-types}
서비스 검사 모니터를 생성할 때, 데이터 누락 시 경보를 전송할지 여부를 선택합니다. 이 구성은 모니터 기반 SLO 계산이 누락된 데이터를 해석하는 방식에 영향을 줍니다. 누락된 데이터를 무시하도록 구성된 모니터의 경우, 데이터가 누락된 기간은 SLO에 의해 OK(가동 시간)로 처리됩니다. 누락된 데이터에 대해 경고하도록 구성된 모니터의 경우, 데이터가 누락된 기간은 SLO에 의해 ALERT(가동 중지)로 처리됩니다.

Synthetic 테스트를 일시 중지하면 SLO는 계산에서 데이터가 누락된 기간을 제외합니다. UI에서 이러한 기간은 SLO 상태 표시줄에 밝은 회색으로 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://app.datadoghq.com/slo
[3]: /ko/service_level_objectives/metric/
[4]: /ko/synthetics/api_tests/?tab=httptest#alert-conditions
[5]: /ko/service_level_objectives/#slo-status-corrections
[6]: /ko/monitors/configuration/#no-data