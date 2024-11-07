---
aliases:
- /ko/logs/explorer/sidepanel
description: 모든 로그를 검색하고 로그 분석 수행하기
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: 설명서
  text: 로그 및 트레이스 연결
- link: /logs/guide/correlate-logs-with-metrics
  tag: 설명서
  text: 로그와 인프라스트럭처 메트릭 연결하기
title: 로그 사이드패널
---

## 개요
Datadog은 다음 일반 사이드 패널 레이아웃에 따라 개별 로그 을 표시합니다.

{{< img src="logs/explorer/side_panel/overview.png" alt="로그 탐색기 사이드 패널" style="width:60%;">}}

- 패널 상단에는 일반 **컨텍스트** 정보가 표시됩니다.
- 패널 하단에는 로그의 실제 **콘텐츠**가 표시됩니다.

**컨텍스트**는 로그가 생성한 인프라스트럭처 및 애플리케이션 컨텍스트를 의미합니다. 정보는 태그에서 수집되는데, Datadog 에이전트 또는 로그 포워더(Forwarder)가 로그에 자동 첨부(호스트 이름, 컨테이너 이름, 로그 파일 이름, 서버리스 함수 이름 등)하거나 커스텀 태그(담당 팀, 환경, 애플리케이션 버전 등)을 통해 추가합니다.

**콘텐츠**는 로그 자체를 의미합니다. 로그 메시지를 포함하여, [로그 파이프라인][1]을 통해 로그에서 추출 및 보강된 모든 구조화 정보가 포함됩니다. 기술 스택의 공통 구성 요소가 생성한 로그의 경우 파싱 및 보강되어 바로 사용 가능하도록 제공됩니다.

- 파일 로그 수집의 경우, 파일 로그 수집을 트리거하는 소스 필드를 정확하게 설정했는지 확인하세요. [로그 통합][2] 항목을 참조하세요.
- 컨테이너 로그 수집의 경우 [자동탐지][3] 기능을 사용합니다.

예를 들어 `error.stack`, `http.method`, `duration`와 같은 일부 표준 필드는 가독성을 높이기 위해 로그 패널에 특별히 보강되어 표시됩니다. 로그에서 해당 정보를 추출하고 [표준 속성 리매퍼(remapper)][4]로 속성을 다시 매핑합니다.

## 허브에서 다른 데이터 소스로

### 인프라스트럭처 데이터와 상호 연결

**컨텍스트에서 보기** 버튼으로 필터와 일치하지 않더라도 선택한 로그 바로 전후 시점의 로그 라인을 표시하도록 검색 요청을 업데이트합니다. Datadog은 `Hostname`, `Service`, `filename`, `container_id` 속성과 함께 태그를 사용하여 해당 로그에 적합한 컨텍스트를 찾기 때문에 상황에 따라 컨텍스트가 달라집니다.

**메트릭** 탭 을 클릭하고 로그 기준 30분 타임프레임 내 기본 인프라스트럭처 메트릭에 접근합니다.

상단 예약된 속성 섹션, 관련 [호스트 대시보드][5] 또는 [네트워크 분석][6] 페이지에서 **호스트**와 상호작용합니다. **컨테이너** 섹션과 상호작용하여 기본 파라미터로 범위 지정된 [컨테이너 페이지][7]로 이동합니다.

{{< img src="logs/explorer/side_panel/infra.mp4" alt="허브 투 인프라" video=true style="width:100%;">}}

로그가 서버리스 소스에서 생성된 경우, 호스트 섹션은 해당 [서버리스 페이지][8]로 연결되는 서버리스 섹션으로 대체됩니다.

{{< img src="logs/explorer/side_panel/infra-serverless.png" alt="허브 투 서버리스" style="width:80%;">}}

### 애플리케이션 성능 모니터링(APM) 데이터와 상호 연결

[로그에 트레이스 삽입][9]을 활성화하고 [통합 서비스 태깅]10] 모범 사례를 따라 로그 및 애플리케이션 성능 모니터링(APM) 상관관계의 모든 이점을 활용합니다.

**트레이스 탭**을 클릭하면 업스트림 및 다운스트림 서비스가 실행되는 전체 트레이스의 컨텍스트에서 로그를 확인할 수 있습니다. [트레이스 세부 정보 보기][11]를 클릭하여 해당 애플리케이션 성능 모니터링(APM) 데이터를 면밀히 살펴보세요.

**서비스** 섹션과 상호 작용하여 선택한 서비스 에 해당하는 트레이스 부분을 강조 표시합니다. 해당 정보를 사용하여 로그 탐색기의 쿼리를 재조명하고 동일한 트레이스의 다른 로그를 확인합니다.

{{< img src="logs/explorer/side_panel/trace.mp4" alt="허브 투 APM" video=true style="width:100%;">}}

## 트러블슈팅 컨텍스트 설정하기

하단 JSON 섹션의 속성 이름 및 값과 상호 작용하여 다음을 수행합니다.

- 로그 테이블에서 열 추가 또는 제거
- 검색 요청에 특정 값(포함 또는 제외)을 추가

{{< img src="logs/explorer/side_panel/context.jpg" alt="사이드 패널 컨텍스트" style="width:50%;">}} {{< img src="logs/explorer/side_panel/context2.jpg" alt="사이드 패널 컨텍스트" style="width:50%;">}}

- 속성에서 패싯 또는 측정값을 생성 또는 편집합니다. [로그 패싯][12]을 참조하세요.

{{< img src="logs/explorer/side_panel/facets.mp4" alt="사이드 패널 패싯" video=true style="width:100%;">}}

## 로그 공유

**공유** 버튼으로 사이드 패널의 공개 로그를 다른 컨텍스트와 공유할 수 있습니다.

- **클립보드에 복사** 또는 `Ctrl+C` / `Cmd+C`을 사용하여 로그 JSON을 클립보드에 복사합니다.
- **이벤트 공유** 기능으로 이메일, Slack 등을 통해 팀원과 로그(기본 보기)를 공유합니다. 사용할 수 있는 모든 기능을 확인하려면 [Datadog 알림 통합][13]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/pipelines
[2]: /ko/integrations/#cat-log-collection
[3]: /ko/agent/autodiscovery/integrations/?tab=kubernetes
[4]: /ko/logs/log_configuration/attributes_naming_convention
[5]: /ko/dashboards/list/#preset-lists
[6]: /ko/network_monitoring/performance/network_analytics/
[7]: /ko/infrastructure/livecontainers/?tab=linuxwindows#introduction
[8]: /ko/infrastructure/serverless/#function-detail-view
[9]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[10]: /ko/getting_started/tagging/unified_service_tagging
[11]: /ko/tracing/app_analytics/search/#displaying-a-full-trace
[12]: /ko/logs/explorer/facets/#overview
[13]: /ko/integrations/#cat-notification