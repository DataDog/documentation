---
aliases:
- /ko/real_user_monitoring/heatmaps
description: 히트맵은 사용자가 웹사이트에서 클릭한 부분을 가시화합니다.
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: 설명서
  text: 브라우저 세션 재생
- link: /real_user_monitoring/session_replay/mobile/
  tag: 설명서
  text: 모바일 세션 재생
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: 블로그
  text: Datadog 히트맵에서 Scrollmaps를 사용해 페이지의 사용자 인터페이스 가시화
title: 히트맵
---

{{< img src="real_user_monitoring/heatmaps/heatmap_v2.png" alt="히트맵 기능 개요" style="width:100%;">}}

히트맵은 사용자의 상호 작용을 세션 재생 데이터와 오버레이한 결과를 가시화한 것입니다. RUM(Real User Monitoring)에는 세 가지 종류의 히트맵이 있습니다.

- **Click maps:** 사용자가 페이지와 어떻게 상호 작용(클릭)하는지를 확인할 수 있습니다.
- **Top Elements:** 페이지에서 가장 상호 작용이 많았던 상위 10개 요소를 봅니다.
- **Scroll maps:** 페이지의 평균 폴드를 포함해 사용자가 페이지 스크롤을 어디까지 하는지 확인합니다. 평균 폴드란 사용자가 스크롤하지 않아도 보이는 화면의 하단 끝을 의미합니다.

히트맵을 사용하면 복잡한 데이터를 한 번에 정리하여 사용자 경험을 최적화할 인사이트를 얻을 수 있습니다.

## 사전 필수 조건

히트맵 시작하는 방법:

1. SDK 버전 인증:
  - 클릭 맵을 사용하려면 SDK 최신 버전(v4.40.0 이상)이 있어야 합니다.
  - 스크롤 맵은 v4.50.0 이상이어야 합니다.
2. [세션 재생][1]을 활성화합니다.
3. SDK 초기화 단계에 `trackUserInteractions: true`를 설정해 추적 활동을 활성화합니다(클릭맵에 필요).

## 시작하기

[**Digital Experience > Real User Monitoring > Session Replay > Heatmaps**][2]로 이동합니다. 내 애플리케이션을 선택하고 확인합니다.

[Real User Monitoring 랜딩 페이지][3]의 [애플리케이션 선택기][4]에서 내 애플리케이션을 선택하고 볼 수 있습니다. 맵 유형 아래에서 보고 싶은 맵 유형을 선택하세요. Top Elements, Click Maps, 또는 Scroll Map 중에서 선택할 수 있습니다. 옵션을 하나 클릭하면 특정 보기의 [히트맵 페이지][2]로 이동합니다.

{{< img src="real_user_monitoring/heatmaps/rum-heatmaps-getting-started.png" alt="애플리케이션을 선택해 히트맵 보기" style="width:100%;" >}}

 상단에 있는 **View Name** 및 **Application** 선택기를 사용해 보기를 변환할 수 있습니다. 상세한 필터를 추가(예: 특정 지리)하려면 왼쪽에 있는 패널에서 필터를 추가하세요.

{{< img src="real_user_monitoring/heatmaps/heatmaps-filters-v2.png" alt="애플리케이션 선택기와 세션 재생을 활성화한 옵션을 선택하여 히트맵 보기" style="width:100%;">}}

## 클릭 맵

클릭 맵을 선택하면 세션에서 사용자 클릭 활동을 집계하여 현재 화면에서 가장 상호 작용이 많았던 활동을 맵에 블롭으로 가시화합니다.

{{< img src="real_user_monitoring/heatmaps/heatmap_v3.png" alt="웹사이트에 오버레이된 클릭맵 데이터" style="width:100%;">}}

각 클릭 맵에서 다음과 같은 분석 결과도 볼 수 있습니다.

- 다른 방문 페이지 중에서 해당 페이지가 차지하는 순위
- 해당 페이지의 고유한 사용자 수
- 해당 페이지의 차질 신호

아래 패널은 해당 페이지에서 발생한 모든 활동을 빈도 순으로 정열한 것입니다. 활동 하나를 클릭하면 해당 상호 작용에 관해 더 자세히 이해할 수 있습니다. 다음 예시를 참고하세요.

- 사용자가 활동을 한 횟수와 해당 페이지의 상위 활동 전체 분석에서 차지하는 순위
- 해당 활동에서 차질 신호가 있었는지 여부(예: 사용자가 답답해서 해당 버튼을 반복적으로 클릭했는지 여부) 및 관련 차질 신호 확인 가능

{{< img src="real_user_monitoring/heatmaps/actions.jpeg" alt="예시 활동과 해당 활동으로 얻을 수 있는 정보" style="width:60%;">}}

## 상위 요소

상위 요소는 해당 보기에서 클릭 활동을 집계해 가장 상호 작용이 많았던 요소와 그 순위를 보여줍니다. 맵 순위 옆에 해당 활동 이름이 표시됩니다.

{{< img src="real_user_monitoring/heatmaps/top-elements-v3.png" alt="페이지에서 클릭이 가장 많았던 요소 순위" style="width:100%;">}}

패널에 있는 활동 이름 하나를 클릭하면 해당 활동이 맵에 강조 표시 됩니다.

## 스크롤 맵

스크롤 맵은 페이지의 스크롤 활동을 집계하여 표시합니다. 스크롤 맵을 사용해 페이지의 평균 폴드가 페이지 어느 부분인지 알 수 있고, 사용자가 어디까지 스크롤하는지 알 수 있습니다. 스크롤 맵에 있는 파란색 창을 드래그하여 보고 싶은 페이지 깊이를 조정할 수 있습니다.

{{< img src="real_user_monitoring/heatmaps/scrollmaps-v3.png" alt="샘플 이커머스 애플리케이션의 침구류 페이지의 스크롤 맵" style="width:100%;">}}

스크롤 맵 왼쪽 패널에는 상세한 인사이트와 쿼리 결과의 바로가기 링크(예: 사용자가 특정 백분율 이상으로 스크롤한 보기 목록 링크)가 있습니다. 인사이트 패널 아래에는 페이지 미니맵과 함께 상세한 스크롤 데이터를 표시하는 분산 그래프가 있습니다. 이 데이터를 이용해 사용자가 페이지를 벗어나게 만드는 지점을 파악할 수 있습니다.

{{< img src="real_user_monitoring/heatmaps/scrollmaps-insights-panel.png" alt="스크롤 데이터 인사이트의 쿼리 스크린샷" style="width:50%;">}}

## 배경

배경은 세션 재생의 스냅샷입니다. 각 히트맵은 해당 세션에서 가장 많이 트리거된 20개의 배경을 가져옵니다. 배경을 변경할 시, 변경한 배경에 따라 다른 결과를 보여줍니다. **Choose Background** 버튼을 사용해 내 히트맵의 특정 배경을 선택할 수 있습니다.

히트맵의 배경 목록을 수정할 수 없습니다.

## 다음 단계

히트맵을 분석한 후에는 관련 데이터를 탐색해 사용자 활동을 이해하는 것입니다. [Analytics 탐색기][4]를 피벗하거나 관련 [세션 재생][1]을 시청하여 사용자의 전체 세션에서 사용자 활동을 직접 눈으로 확인할 수 있습니다.

## 트러블슈팅

### 특정 보기의 히트맵을 확인했는데, 다른 페이지를 보여줍니다.

히트맵은 RUM 보기 이름 기반입니다. RUM 애플리케이션이 구성된 방법에 따라 여러 페이지를 동일한 보기 이름으로 그룹화하거나 특정 보기 이름으로 시작할 수 있습니다.

### 선택한 보기가 초기 콘텐츠가 아닙니다.

히트맵은 세션 재생 데이터로 생성됩니다. Datadog의 지능형 알고리듬이 초기 페이지 상태와 가장 일치하는 최근 세션을 선택합니다. 그러나 올바른 재생 세션을 찾지 못하는 경우도 발생할 수 있습니다. 히트맵의 [배경](#backgrounds)을 전환하려면 **Choose Background** 버튼을 사용해 페이지의 여러 상태를 탐색하고 내가 원하는 것을 선택하세요.

{{< img src="real_user_monitoring/heatmaps/heatmaps-background-selector.mp4" alt="Choose Background 버튼으로 다른 배경 선택" video=true >}}

### 히트맵 측면의 활동 목록에 히트맵에 표시되지 않는 요소의 아이콘이 있습니다.

{{< img src="real_user_monitoring/heatmaps/heatmaps-hidden-elements.png" alt="히트맵 활동 목록의 숨겨진 요소" style="width:60%;">}}

아이콘의 툴팁에 **element is not visible**이라고 표시됩니다. 이는 요소가 해당 페이지의 일반 활동이지만 히트맵의 배경에 표시되지 않는다는 뜻입니다. 해당 요소를 보려면 오른쪽 하단 모서리에 있는 **Choose Background**를 클릭하여 히트맵의 배경을 해당 요소가 있는 배경으로 전환합니다.

### 히트맵을 생성하려는데 "No Replay Data" 상태가 나타납니다.

이는 Datadog에서 현재 검색 필터와 일치하면서 히트맵 배경으로 사용할 세션 재생을 찾을 수 없다는 뜻입니다. [브라우저 SDK][6]로 세션을 기록하기 시작했다면 세션 재생을 보는 데 몇 분 정도 걸릴 수 있습니다.

### 히트맵을 생성하려는데 "Not enough data to generate a heatmap" 상태가 나타납니다.

이는 Datadog에서 현재 선택된 재생과 일치하는 사용자 활동을 찾을 수 없다는 뜻입니다. 이와 같은 현상은 다음과 같은 이유로 발생할 수 있습니다.

- 애플리케이션이 최신 SDK 버전(4.20.0 이상)이 아닌 경우
- 최근에 페이지가 상당 부분 변경되었을 경우

### 페이지의 사용자 정보가 비워져 있을 경우

사용자 정보 수집은 기본값이 아닙니다. 히트맵은 세션 데이터에서 이용할 수 있는 사용자 정보를 사용해 동작과 관련된 인사이트를 표시합니다.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/session_replay/
[2]: https://app.datadoghq.com/rum/heatmap/
[3]: https://app.datadoghq.com/rum/performance-monitoring
[4]: /ko/real_user_monitoring/explorer/#view-by-application
[5]: https://app.datadoghq.com/rum/sessions
[6]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json