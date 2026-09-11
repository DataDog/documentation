---
algolia:
  tags:
  - Logging Without LimitsTM
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: Log Explorer에 대해 더 알아보기
- link: /logs/explorer/#patterns
  tag: 설명서
  text: 로그 패턴 보기와 친숙해지기
- link: /logs/live_tail/
  tag: 설명서
  text: Live Tail에 대해 알아보기
- link: /logs/logs_to_metrics/
  tag: 설명서
  text: 수집한 로그에서 메트릭을 생성하는 방법
title: Logging Without LimitsTM 가이드
---

{{< img src="logs/lwl_marketecture_20231030.png" alt="Logging without LimitsTM" >}}

## 개요

클라우드 기반 애플리케이션은 1분당 로그를 수백만 개 생성할 수 있습니다. 그러나 로그의 중요도가 때에 따라 달라집니다. 그래서 Datadog의 [Logging Without LimitsTM]을 사용하면 [로그 수집과 인덱싱][2]을 구분하여 유연성을 얻을 수 있습니다.

이 가이드에서는 Logging Without LimitsTM의 핵심 구성 요소인 [패턴](#2-identify-high-volume-logging-patterns), [제외 필터](#3-create-a-log-pattern-exclusion-filter), [커스텀 로그 기반 메트릭](#4-generate-metrics-to-track-excluded-logs), [모니터](#create-an-anomaly-detection-monitor)에 관해 설명합니다. 이를 통해 Log Explorer를 효과적으로 정리하고 시간이 흐름에 따른 KPI를 모니터링할 수 있습니다.

## 1. 가장 많이 로깅된 서비스 상태 파악

가장 많이 로깅된 서비스에는 여러 로그가 포함되어 있는데, 일부는 트러블슈팅과 관련이 없을 수 있습니다. 예를 들어 주요한 중단 또는 이벤트가 발생한 상황에 4xx와 5xx 응답 코드 로그 전체를 조사하고자 할 때  Log Explorer에서 응답 코드 200을 모두 제외하여 트러블슈팅 속도를 높일 수 있습니다. 해당 서비스를 먼저 파악하면 로그를 가장 많이 생성하는 서비스 상태를 빠르게 찾을 수 있고, 이를 [Log Explorer 보기][3]에서 제외하는 것이 좋습니다.

{{< img src="logs/guide/getting-started-lwl/identify_logging_service.mp4" alt="가장 많이 로깅된 서비스 상태 파악" video=true style="width:100%;">}}

**가장 많이 로깅된 서비스 상태를 파악하는 방법**:

1. Log Explorer에서 검색 창 옆에 있는 **graph view**를 선택하세요.
2. 검색 창 아래에 개수를 `*`로 설정하고 `service` 별로 그룹화한 뒤 `top 10`로 제한합니다.
3. 컨트롤 숨기기 옆에 있는 드롭다운 메뉴에서 **Top List**를 선택합니다.
4. 목록 첫 번째 서비스를 클릭하고 자동으로 채워진 메뉴에서 **search for**를 클릭하세요. 그러면 검색이 생성되고 내 서비스 패싯에 따라 위의 검색 창에서 볼 수 있습니다. 
5. `service`별 그룹에서 `status`별 그룹으로 바꾸세요. 그러면 내 서비스의 상위 상태 목록이 생성됩니다.
6. 목록에서 첫 번째 상태를 클릭하고 자동으로 채워진 메뉴에서 **search for**를 클릭하세요. 그러면 검색에 상태 패싯이 추가됩니다.

**참고**: 볼륨이 많은 로깅 쿼리에서 상위 목록을 생성하고자 때 이 단계를 적용할 수 있습니다. `host` 또는 `network.client.ip`나 `service` 또는 `status` 등 어떤 패싯이든 사용할 수 있습니다.

## 2. 볼륨이 높은 로깅 패턴 파악

가장 높은 로깅 서비스 상태를 파악했으면 Log Explorer 왼쪽 상단의 그래프 보기 옆에 있는 [패턴 보기][4]로 바꾸세요. 선택한 컨텍스트의 로그 패턴이 여기에서 자동으로 표시됩니다.

컨텍스트는 시간 범위와 검색 쿼리로 구성됩니다. 각 패턴에는 특징을 바로 파악할 수 있도록 강조 표시가 되어 있습니다. 미니 그래프에 대략적인 로그 타임라인이 표시되어 해당 패턴과 다른 패턴의 차이를 쉽게 파악할 수 있습니다. 패턴 내 다양한 로그 섹션이 강조 표시 되어 있어 로그 라인 간 다른 점을 쉽게 파악할 수 있습니다.

기본 로그 샘플을 보려면 제외하고자 하는 로그 패턴을 클릭하세요.

{{< img src="logs/guide/getting-started-lwl/patterns_context_panel.jpg" alt="패턴 컨텍스트" style="width:100%;">}}

패턴 보기는 관련성이 없는 패턴을 파악하고 필터링하는 데 도움이 됩니다. 패턴과 일치하는 로그 개수를 표시하고 서비스와 상태로 나눕니다. 첫 번째 패턴을 클릭해 내 상태와 관련한 상세 이벤트 로그를 확인하세요. 컨텍스트 패널이 가장 관련성이 없는 상태 패턴 정보로 자동으로 채워집니다.

## 3. 로그 패턴 제외 필터 생성

패턴 컨텍스트 패널은 로그 패턴의 인스턴스(이벤트) 전체 목록을 표시하고 선택한 패턴을 기반으로 커스텀 검색 쿼리를 생성합니다. 이 쿼리를 제외 필터에 사용해 내 인덱스에서 해당 로그를 삭제할 수 있습니다.

**제외 필터를 생성하는 방법**:

1. 패턴 보기 목록에서 패턴 하나를 선택하세요.
2. 우측 상단에 있는 **Add Exclusion Filter**를 클릭하세요. 이 패턴에 있는 로그 절반 이하가 단일 인덱스에 속하면 이 버튼이 비활성화됩니다.
3. 새 탭에 로그 인덱스 구성 페이지가 나타납니다. 여기에 해당 패턴과 관련한 로그 대부분을 포함하고 있는 인덱스의 제외 필터가 자동으로 표시됩니다.
4. 제외 필터는 이 패턴과 연결되고 자동으로 생성된 검색 쿼리로 자동 완성됩니다. 필터 이름을 입력하고 제외 비율을 설정한 후 새 제외 필터로 저장하세요.

{{< img src="logs/guide/getting-started-lwl/exclusion_filter_new.mp4" alt="제외 필터" video=true style="width:100%;">}}

**참고**: 로그가 다른 제외 필터와 일치하는 경우 첫 제외 필터 규칙만 적용됩니다. 로그를 다른 제외 필터로 여러 번 제외하거나 샘플링할 수 없습니다.

이 예시에서는 `email-api-py` 서비스, `INFO` 상태 패턴 `response code from ses 200`이 제외 필터로 필터링되었습니다. Log Explorer에서 이와 유사한 대량의 로깅 패턴을 제거하면 관련 없는 로그를 제거하고 문제를 빠르게 파악하는 데 도움이 됩니다. 이 로그는 [Live Tail][5]에서 수집되기 때문에 사용자가 계속해서 해당 로그를 확인할 수 있습니다. 또  [로그 아카이브][6]나 [메트릭 생성][7]에서 사용할 수 있습니다.

{{< img src="logs/guide/getting-started-lwl/live_tail.png" alt="로그 목록과 시간대 드롭다운을 보여 주는 Live Tail 페이지" style="width:100%;">}}

제외 필터는 필터 우측에 있는 비활성화 옵션을 토글링해 언제든지 비활성화할 수 있습니다. 또 필터 위에 마우스 커서를 올려 편집 또는 삭제 옵션을 선택하여 수정하거나 삭제할 수 있습니다.

## 4. 제외된 로그를 추적할 수 있는 메트릭 생성

Log Explorer에서 로그 패턴을 제외해도 새 [커스텀 로그 기반 메트릭][8]을 생성해 수집 수준에서 시간 흐름에 따른 KPI를 추적할 수 있습니다.

### 새 로그 기반 메트릭 추가

**내 로그 패턴을 기반으로 새 로그 기반 메트릭을 생성하는 방법**:

1. [Generate Metrics][9] 페이지로 이동하세요.
1. 우측 상단에 있는 **New Metric**을 클릭하세요.
1. 내 메트릭 이름을 입력하세요. 로그 기반 메트릭 이름을 지정할 때 메트릭 이름 지정 규칙을 따라야 합니다.
1.  **Define Query** 아래에 패턴 제외 필터에 복사 및 붙여넣기 한 검색 쿼리를 입력하세요. 예를 들어, 위 예시의 경우 `service:web-store status:info "updating recommendations with customer_id" "url shops"`를 입력하면 됩니다.
1. 추적하고자 하는 필드를 선택하세요. 내 쿼리에 해당하는 모든 로그를 생성하려면 `*`를 선택하거나, 아니면 측정 값을 입력해(예: `@duration`) 수치 값의 누계를 계산하고 해당 값의 개수, 최솟값, 최댓값, 합계, 평균 누적 메트릭을 생성하세요.
1. 그룹에 차원을 추가하세요. 생성된 로그 기반 메트릭에 적용할 로그 속성이나 태그 키를 선택해 `<KEY>:<VALUE>` 형식을 따르는 태그로 변경합니다. 로그 기반 메트릭은 커스텀 메트릭으로 봅니다. 수치 제한이 없거나 카디널리티가 너무 높은 속성(예: 타임스탬프, 사용자 ID, 요청 ID, 또는 세션 ID)을 사용하면 요금에 영향을 줄 수 있으니 피하는 것이 좋습니다.

### 이상 감지 모니터 생성

[이상 감지][10]는 메트릭이 과거와 다르게 행동할 때를 파악하는 알고리듬 기능입니다. 제외된 로그에 이상 감지 모니터를 생성하면 설정한 알림 조건에 따라 변화가 있을 때 알림을 받을 수 있습니다.

**이상 감지 모니터를 설정하는 방법**:

1.  [New Monitor][11] 페이지로 이동하세요.
1. **Anomaly**를 선택하세요.
1. 이전 섹션에서 정의한 로그 기반 메트릭을 입력하세요.
1. 알림 조건을 설정하고 기타 정보를 추가해 나와 팀원에게 상황을 알릴 수 있도록 설정합니다.
1. **생성**을 클릭합니다.

이상이 감지될 때 태그된 사람 전체엑 알림이 전송됩니다. [Triggered Monitors][12] 페이지에서도 이 알림을 볼 수 있습니다.

## 복습

Logging Without LimitsTM 사용 방법을 살펴봤습니다. 

1. [가장 많이 로깅된 서비스 상태 파악](#1-identify-your-most-logged-service-status)
2. [볼륨이 높은 로깅 패턴 파악](#2-identify-high-volume-logging-patterns)
3. [로그 패턴 제외 필터 생성](#3-create-a-log-pattern-exclusion-filter)
4. [제외된 로그를 추적하는 메트릭 생성](#4-generate-metrics-to-track-excluded-logs)
  * [새 로그 기반 메트릭 추가](#add-a-new-log-based-metric)
  * [이상 감지 모니터 생성](#create-an-anomaly-detection-monitor)

Logging without LimitsTM에 관한 자세한 내용을 알아보고 Log Explorer, Live Tail, Log Patterns와 같은 기능을 유용하게 사용하는 방법을 배우려면 아래 링크를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/logging-without-limits/
[2]: /ko/logs/
[3]: https://app.datadoghq.com/logs
[4]: https://app.datadoghq.com/logs/patterns
[5]: /ko/logs/live_tail/
[6]: /ko/logs/archives/
[7]: /ko/metrics/
[8]: /ko/logs/logs_to_metrics/
[9]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[10]: /ko/monitors/types/anomaly/
[11]: https://app.datadoghq.com/monitors/create
[12]: https://app.datadoghq.com/monitors#/triggered