---
aliases:
- /ko/infrastructure/process/generate_process_metrics/
- /ko/processes/processing/process_to_metrics/
- /ko/infrastructure/generate_process_metrics/
description: 프로세스에서 메트릭을 생성합니다.
further_reading:
- link: metrics/distributions/
  tag: 설명서
  text: 분포 메트릭
- link: monitors/monitor_types/metric/?tab=threshold
  tag: 설명서
  text: 메트릭 모니터 생성
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: 블로그
  text: 쿠버네티스 워크로드 규모 효율화를 위한 실용적인 팁
title: 프로세스 리텐션 증가
---

## 개요

실시간 프로세스 데이터는 36시간 동안 저장되지만, 프로세스에서 글로벌 및 백분위수 분포 메트릭을 생성하여 리소스 소비를 장기적으로 모니터링할 수 있습니다. 프로세스 기반 메트릭은 다른 Datadog 메트릭과 마찬가지로 15개월 동안 저장됩니다. 이를 통해 다음을 수행할 수 있습니다:

- 과거 및 현재에도 진행 중인 인프라스트럭처 문제 디버깅
- 중요 워크로드의 리소스 소비 동향 파악
- 부하 또는 스트레스 테스트 전후 시스템 상태 평가
- 소프트웨어 배포가 기본 호스트 또는 컨테이너의 상태에 미치는 영향 추적

{{< img src="infrastructure/process/process2metrics_overview_2.png" alt="프로세스 기반 메트릭 생성" style="width:80%;">}}

## 프로세스 기반 메트릭 생성

실시간 프로세스 페이지의 쿼리에서 직접 새 프로세스 기반 메트릭을 생성하거나 _[리텐션 증가][1]_ 탭에서 **메트릭 생성** 버튼을 선택하여 새 메트릭을 생성할 수 있습니다.

{{< img src="infrastructure/process/process2metrics_create_LP_2.png" alt="프로세스 기반 메트릭 생성" style="width:80%;">}}

### 새 프로세스 기반 메트릭 추가

{{< img src="infrastructure/process/process2metrics_create.png" alt="프로세스 기반 메트릭 생성" style="width:80%;">}}

1. **쿼리를 필터링할 태그를 선택하세요**: 쿼리 구문은 [실시간 프로세스][2]와 동일하며, 필터 범위와 일치하는 프로세스만 집계에 고려됩니다. 텍스트 검색 필터는 실시간 프로세스 페이지에서만 지원됩니다.
2. **추적하려는 측정값을 선택합니다**: 숫자 값 집계를 위해 `Total CPU %`와 같은  측정 값을 입력하고, 해당 `count`, `min`, `max`, `sum`, `avg` 집계된 메트릭을 생성합니다.
3. **`group by`에 태그를 추가합니다: 메트릭에  범위로 추가할 태그를 선택하여 필터링, 집계, 비교가 가능하도록 합니다. 기본적으로 프로세스에서 생성된 메트릭에는 명시적으로 추가하지 않는 한 태그가 없습니다. 실시간 프로세스 쿼리에 대해 사용 가능한 모든 태그는 이 필드에서도 사용할 수 있습니다.
4. **메트릭 이름 입력**: 메트릭의 이름을 입력합니다. 프로세스 기반 메트릭에는 항상 접두사 _proc._와 접미사 _[measure_selection]_이 붙습니다.
5. **백분위수 집계를 추가**합니다: _백분위수 집계 포함_ 체크박스를 선택하면 p50, p75, p90, p95 및 p99 백분위수를 생성할 수 있습니다. 백분위수 메트릭은 고객 메트릭으로도 간주되며 그에 따라 요금이 청구됩니다.

메트릭 생성 모달 하단의 **다른 메트릭 생성** 체크박스를 선택하면 동일한 쿼리를 사용하여 여러 개의 메트릭을 만들 수 있습니다. 이 옵션을 선택하면 메트릭이 이미 채워진 필터와 집계 그룹을 통해 생성된 이후에도 모달은 열려있습니다.

**참고**: 프로세스 기반 메트릭의 데이터 포인트는 10초 간격으로 생성됩니다. 메트릭이 생성되거나 업데이트되는 순간부터 첫 번째 데이터 포인트가 보고되는 시점까지 최대 3분 가량 지연될 수 있습니다.

<div class="alert alert-warning">프로세스 기반 메트릭은 <a href="/metrics/custom_metrics/">커스텀 메트릭</a>으로 간주되며 그에 따라 요금이 청구됩니다. 청구에 영향을 미치지 않게 하려면 <code>명령</code> 및 <code>사용자</code>와 같은 제한이 없거나 카디널리티가 매우 높은 태그를 기준으로 그룹을 생성하지 않아야 합니다.

### 프로세스 기반 메트릭 업데이트

{{< img src="infrastructure/process/process2metrics_update.png" alt="분포 메트릭 업데이트" style="width:80%;">}}

메트릭이 생성되면 다음 필드를 업데이트할 수 있습니다:

- 쿼리를 필터링합니다: 'Filter by' 필드에서 태그를 추가하거나 제거하여 메트릭이 생성되는 일치 프로세스 집합을 변경합니다.
- 집계 그룹: 'Group by' 필드에서 태그를 추가하거나 제거하여 메트릭을 다양한 방식으로 분류하거나 카디널리티를 관리할 수 있습니다.
- 백분위수 선택: '백분위수 집계 포함' 체크박스를 선택하거나 선택 취소하여 백분위수 메트릭을 제거 또는 생성합니다.

메트릭 유형 또는 이름을 변경하려면 새 메트릭을 만들어야 합니다.

## Datadog 플랫폼 전반에서 프로세스 메트릭 활용

{{< img src="infrastructure/process/process2metrics_dashboard_widget.png" alt="대시보드에서 프로세스 분포 메트릭 그래프 작성하기" style="width:80%;">}}

생성된 후에는 Datadog의 다른 모든 메트릭과 마찬가지로 프로세스 분포 집계 및 백분위수 메트릭을 사용할 수 있습니다. 예를 들어:

- 대시보드와 노트북에서 프로세스 기반 메트릭을 그래프로 표시하여 중요한 워크로드의 리소스 소비 내역을 추적하세요.
- 프로세스 기반 메트릭 위에 임계값 또는 이상 징후 기반 모니터를 생성하여 CPU 또는 RSS 메모리가 예기치 않게 떨어지거나 급증하는 시점을 감지합니다.
- [메트릭 상관관계][4]를 사용하여 내부 및 타사 소프트웨어 성능에 대한 리소스 소비 변화의 맥락을 파악합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/process?view=metrics
[2]: https://app.datadoghq.com/process
[3]: /ko/metrics/custom_metrics/
[4]: /ko/dashboards/correlations/