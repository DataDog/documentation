---
description: 사이드 패널에서 컨텍스트, 워터폴, 성능 시계열 및 성능 데이터 등 개별 RUM 이벤트의 상세 정보를 확인합니다.
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
- link: /real_user_monitoring/application_monitoring/mobile_vitals/#performance-timeseries
  tag: 설명서
  text: 모바일 바이탈 및 성능 시계열
title: 이벤트 사이드 패널
---
## 개요 {#overview}

Real User Monitoring(RUM) 탐색기는 개별 이벤트를 사이드 패널에 표시합니다. [RUM Explorer][1]에서 이벤트 사이드 패널을 열려면 {{< ui >}}List{{< /ui >}} 시각화 유형에서 표의 행을 클릭합니다.

사이드 패널 헤더에서 사용자의 컨텍스트 정보(환경, 국가)와 보기 경로, 로딩 유형 등 이벤트별 세부 정보를 확인합니다. Synthetic 테스트 실행 결과를 확인하려면 테스트 ID를 클릭합니다.

상단의 분포 시각화를 통해 현재 보기가 중앙값에 가까운지 아니면 이상치에 해당하는지 파악할 수 있습니다. 드롭다운을 사용하여 다음 항목 간에 전환합니다. {{< tooltip text="Loading Time" tooltip="페이지가 준비되고 네트워크 요청이나 DOM 변경이 더 이상 발생하지 않을 때까지 걸리는 시간입니다. 모바일 앱의 로딩 시간은 별도로 수동 보고됩니다. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>자세히 알아보기</a>" >}}또는 다음과 같은 웹 및 모바일 바이탈: {{< tooltip text="Time To First Byte" tooltip="보기의 첫 번째 바이트가 수신될 때까지 경과된 시간. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>자세히 알아보기</a>" >}}, {{< tooltip text="FCP" tooltip="First Contentful Paint: 브라우저가 텍스트, 이미지 또는 SVG를 처음 렌더링한 시점입니다. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>자세히 알아보기</a>" >}}, {{< tooltip text="LCP" tooltip="Largest Contentful Paint: 뷰포트에서 가장 큰 DOM 객체가 렌더링되는 시점입니다. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>자세히 알아보기</a>" >}}, {{< tooltip text="CLS" tooltip="Cumulative Layout Shift: 동적으로 로드된 콘텐츠로 인해 발생하는 예기치 않은 페이지 이동을 수치화합니다. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>자세히 알아보기</a>" >}}, {{< tooltip text="INP" tooltip="Interaction to Next Paint: 사용자 상호 작용부터 다음 페인트까지 걸리는 시간 중 가장 긴 시간입니다. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>자세히 알아보기</a>" >}}, 새로 고침 빈도 및 평균 메모리 사용량입니다. 시간 범위를 조정하여 일별, 주별 또는 월별 데이터를 확인합니다.

{{< img src="real_user_monitoring/explorer/events/side-panel-overview-2.png" alt="분포 시각화, 워터폴 타임라인 및 필터 옵션이 표시된 RUM Explorer 사이드 패널" width="100%" >}}

원하는 탭을 클릭하여 관련 세부 정보를 확인하고 이벤트의 특정 측면을 조사합니다. 전체 목록은 [추가 탭](#additional-tabs)을 참조하세요.

## 사용자 세션 간 탐색 {#navigate-between-user-sessions}

RUM SDK에서 `@usr.id`가 설정되어 있고 Explorer를 특정 `@usr.id` 값으로 필터링하면 세션 사이드 패널에 {{< ui >}}Previous{{< /ui >}} 및 {{< ui >}}Next{{< /ui >}} 버튼이 나타납니다. 이 버튼을 사용하면 Explorer 목록으로 돌아가지 않고 해당 사용자의 세션 간에 이동할 수 있습니다.

[보존 필터][5]를 통해 보존된 세션만 탐색에 표시됩니다. 보존되지 않은 세션은 건너뜁니다. 예를 들어, 사용자에게 세 개의 세션이 있고 첫 번째와 세 번째 세션만 보존된 경우, 버튼을 사용하면 중간에 세션이 있었다는 표시 없이 두 세션 사이를 바로 이동할 수 있습니다.

`@usr.id`를 설정하려면 [고급 구성][6]을 참조하세요.

{{< img src="real_user_monitoring/explorer/events/rum-explorer-session-continuity.png" alt="Previous 및 Next 탐색 버튼이 강조 표시되어 있고 세션 시작 화면과 종료 사유를 보여주는 툴팁이 표시된 RUM Explorer 세션 사이드 패널" style="width:100%;" >}}

## Waterfall 탭 {#waterfall-tab}

{{< ui >}}Waterfall{{< /ui >}} 탭에는 이 보기와 관련된 이벤트의 대화형 타임라인이 표시됩니다. 오버레이에는 [Core Web Vitals][3] 또는 모바일 타이밍을 비롯한 주요 성능 마커가 통과 또는 실패 표시와 함께 나타납니다.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-3.mp4" alt="Waterfall 탭에서 워터폴 타임라인과 상호 작용" video="true" width="80%" >}}

### 워터폴 필터링 {#filtering-the-waterfall}

워터폴에 표시되는 이벤트를 다음과 같이 제어합니다.

- **임계 경로별**: {{< ui >}}Critical Events{{< /ui >}} 토글을 클릭하여 주요 성능 타이밍에 직접 영향을 미치는 이벤트만 확인합니다.
- **속성별**: 워터폴 위의 필터 버튼을 사용합니다. 필터를 클릭하여 리소스 URL, 액션 이름, 오류 메시지 등의 추가 옵션에 액세스합니다.
- **시간 범위별**: 미니맵에서 시간 선택기를 드래그하거나 왼쪽 사이드바를 확장하고 특정 시점을 클릭하여 해당 시점 이전의 이벤트만 표시하도록 필터링합니다.

왼쪽 사이드바에는 [addTiming API][4]의 사용자 지정 타이밍을 비롯한 주요 타이밍이 표시됩니다.

### 이벤트 확인 {#inspecting-events}

워터폴의 이벤트 위로 마우스를 가져가면 타임스탬프, 지속 시간 및 기여 요인(스크립트, 스타일/레이아웃 또는 기타 처리)을 확인할 수 있습니다. Core Web Vital 위로 마우스를 가져가면 해당 지표의 정의와 임계값, p75 값과의 비교 결과를 확인할 수 있습니다.

{{< img src="real_user_monitoring/explorer/events/specific-times-1.png" alt="성능 세부 정보, 임계값 표시 및 p75 성능과의 비교 결과가 표시된 Loading Time 팝오버" width="100%" >}}

### 연결된 텔레메트리 {#connected-telemetry}

워터폴에서 이벤트를 클릭하면 다음과 같은 관련 데이터에 액세스할 수 있습니다.

- {{< ui >}}Resources{{< /ui >}}: 연결된 백엔드 트레이스를 확인합니다.
- {{< ui >}}Long Animation Frames{{< /ui >}}: 성능 분석을 위해 관련 프로필에 액세스합니다.

## 성능 시계열 {#performance-timeseries}

{{< callout url="https://www.datadoghq.com/product-preview/rum-timeseries/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
성능 시계열은 미리 보기로 제공되고 있으며, 수집은 기본적으로 꺼져 있습니다. 활성화하려면 미리 보기에 참여하세요. Datadog은 참여하는 고객에게 설정 지침을 보냅니다.
{{< /callout >}}

{{< img src="real_user_monitoring/mobile_vitals/timeseries-panel.png" alt="세션 동안의 대화형 메모리 및 CPU 그래프를 보여주는 RUM 사이드 패널의 성능 시계열 섹션" style="width:100%;" >}}

iOS 및 Android SDK의 세션에 대해 {{< ui >}}Performance Timeseries{{< /ui >}} 섹션에는 세션 전체에 걸쳐 1초 간격으로 캡처된 애플리케이션 리소스 사용량을 보여주는 {{< ui >}}Memory & CPU{{< /ui >}} 그래프가 표시됩니다. 세션, 보기 및 작업 사이드 패널에서 사용할 수 있습니다.

그래프는 세션 전체를 보여줍니다. 보기나 작업에서 그래프를 열면 마커가 해당 보기나 작업의 시작 및 종료 시점을 표시하므로, 전후에 실행된 다른 모든 항목과 비교하여 리소스 사용량을 확인할 수 있습니다. 애플리케이션이 백그라운드에 있던 기간은 음영 처리됩니다.

각 시리즈의 측정 항목은 [모바일 바이탈][7]을 참조하세요.

## 추가 탭 {#additional-tabs}

다른 탭에서 다음과 같은 관련 데이터를 탐색할 수 있습니다.

{{< ui >}}Replay{{< /ui >}}
: 사용자 세션의 시각적 재생을 확인합니다.

{{< ui >}}Errors{{< /ui >}}
: 이벤트와 관련된 오류를 확인합니다.

{{< ui >}}Resources{{< /ui >}}
: 이벤트 중에 로드된 모든 리소스를 확인합니다.

{{< ui >}}Traces{{< /ui >}}
: 이벤트에 연결된 백엔드 트레이스를 확인합니다.

{{< ui >}}Feature Flags{{< /ui >}}
: 이벤트 중에 평가된 기능 플래그를 확인합니다.

{{< ui >}}Actions{{< /ui >}}
: 세션 중 캡처된 사용자 액션을 검토합니다.

{{< ui >}}Logs{{< /ui >}}
: 이벤트와 관련된 로그에 액세스합니다.

{{< ui >}}Attributes{{< /ui >}}
: 수집된 컨텍스트 속성을 확인합니다. [Global Context API][2]를 사용하여 사용자 지정 속성을 추가합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[4]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#track-additional-performance-timings
[5]: /ko/real_user_monitoring/rum_without_limits/retention_filters
[6]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[7]: /ko/real_user_monitoring/application_monitoring/mobile_vitals/#performance-timeseries