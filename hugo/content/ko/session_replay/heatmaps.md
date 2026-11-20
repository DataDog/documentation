---
aliases:
- /ko/real_user_monitoring/session_replay/heatmaps
- /ko/real_user_monitoring/heatmaps
- /ko/product_analytics/session_replay/heatmaps
- /ko/product_analytics/heatmaps
description: 히트맵은 사용자가 웹사이트에서 클릭한 부분을 가시화합니다.
further_reading:
- link: /session_replay/
  tag: 설명서
  text: 브라우저 Session Replay
- link: /session_replay/?platform=android
  tag: 설명서
  text: 모바일 Session Replay
- link: https://www.datadoghq.com/blog/session-replay-custom-heatmap-backgrounds/
  tag: 블로그
  text: Session Replay의 사용자 지정 히트맵 캡처 및 분석
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: 블로그
  text: Datadog 히트맵에서 Scrollmaps를 사용해 페이지의 사용자 인터페이스 가시화
title: 히트맵
---
{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="히트맵 기능 개요입니다." style="width:100%;">}}

히트맵(또는 열지도)은 사용자의 상호 작용을 Session Replay 데이터와 오버레이한 결과를 가시화한 것입니다. 히트맵의 세 가지 유형은 다음과 같습니다.

- {{< ui >}}Click maps{{< /ui >}}: 사용자가 페이지와 어떻게 상호 작용(클릭)하는지를 확인할 수 있습니다.
- {{< ui >}}Top Elements{{< /ui >}}: 페이지에서 가장 상호 작용이 많았던 상위 10개 요소를 확인합니다.
- {{< ui >}}Scroll maps{{< /ui >}}: 사용자가 페이지를 어디까지 스크롤하는지, 페이지의 평균 폴드 위치를 확인합니다. 평균 폴드는 사용자가 기기에서 스크롤하지 않고 볼 수 있는 페이지의 가장 아래 지점입니다.

히트맵을 사용하면 복잡한 데이터를 한 번에 정리하여 사용자 경험을 최적화할 인사이트를 확보할 수 있습니다.

<div class="alert alert-info">히트맵은 브라우저 Session Replay에서만 지원됩니다.</div>

## 전제 조건 {#prerequisites}

히트맵 시작하기

1. 브라우저 SDK 버전을 확인합니다.
   - 클릭 맵을 사용하려면 SDK 최신 버전(v4.40.0 이상)이 있어야 합니다.
   - 스크롤 맵은 v4.50.0 이상이어야 합니다.
2. [Session Replay][1]를 활성화합니다.
3. SDK 초기화 단계에 `trackUserInteractions: true`를 설정해 활동 추적을 활성화합니다(클릭맵에 필요).

## 시작하기 {#getting-started}

{{< tabs >}}
{{% tab "RUM" %}}

[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Heatmaps{{< /ui >}}][1]로 이동합니다. 애플리케이션과 화면(뷰)를 선택합니다.

[Real User Monitoring 랜딩 페이지][2]에서 애플리케이션 선택기로 애플리케이션과 뷰를 선택합니다. 기간 선택기 왼쪽에서 확인하려는 히트맵 유형(상위 요소, 클릭 맵, 스크롤 맵)을 선택할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-different-views.png" alt="히트맵 페이지에서는 애플리케이션, 맵 유형, 기기 유형, 활동 이름, 세부 필터 기준으로 다양한 뷰를 표시할 수 있습니다." style="width:100%;">}}

[1]: https://app.datadoghq.com/rum/heatmap/
[2]: https://app.datadoghq.com/rum/performance-monitoring

{{% /tab %}}
{{% tab "Product Analytics" %}}

[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Heatmaps{{< /ui >}}][1]로 이동합니다. 애플리케이션과 화면(뷰)를 선택합니다.

이 페이지에서 특정 뷰로 확인하려는 히트맵 유형(상위 요소, 클릭 맵, 스크롤 맵)을 선택할 수 있습니다.

{{< img src="product_analytics/heatmaps/pa-heatmaps-page.png" alt="각 뷰별로 상위 요소, 클릭 맵, 스크롤 맵을 선택할 수 있습니다." style="width:100%;">}}

관련 히트맵을 자세히 보려면 뷰 이름을 클릭합니다.

{{< img src="product_analytics/heatmaps/pa-heatmaps-annotated.png" alt="히트맵 페이지에서는 애플리케이션, 맵 유형, 기기 유형, 활동 이름, 세부 필터 기준으로 다양한 뷰를 표시할 수 있습니다." style="width:100%;">}}

[1]: https://app.datadoghq.com/product-analytics/heatmap

{{% /tab %}}
{{< /tabs >}}

추가 조회 옵션은 다음과 같습니다.

- 뷰를 전환하려면 상단의 {{< ui >}}View Name{{< /ui >}} 및 {{< ui >}}Application{{< /ui >}} 선택기를 사용합니다.
- 기기 뷰를 변경하려면 {{< ui >}}Device type{{< /ui >}} 선택기를 사용합니다.
- 활동 이름 기준으로 필터링하려면 {{< ui >}}Filter actions by{{< /ui >}} 드롭다운을 사용합니다.
- 예를 들어 특정 지역과 같이 보다 세분화된 필터를 추가하려면 {{< ui >}}Add Filter{{< /ui >}} 버튼을 클릭합니다.

## 상위 요소 {#top-elements}

상위 요소 히트맵은 특정 뷰에서 가장 상호 작용이 많았던 요소를 상호 작용 순위와 함께 표시해 클릭 활동을 집계합니다. 맵 자체의 순위는 측면에 명시된 활동 이름과 일치합니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-top-elements.png" alt="페이지에서 클릭된 상위 요소의 순위입니다." style="width:100%;">}}

패널의 활동 이름 위에 마우스를 올리면 맵에서 해당 활동이 강조 표시됩니다.

## 클릭 맵 {#click-maps}

클릭 맵을 선택하면 세션에서 사용자 클릭 활동을 집계하여 현재 화면에서 가장 상호 작용이 많았던 활동을 맵에 블롭으로 가시화합니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmaps.png" alt="웹사이트에 오버레이된 클릭 맵 데이터입니다." style="width:100%;">}}

왼쪽에는 페이지에서 이루어진 모든 활동을 빈도순으로 나열한 목록이 있습니다. 활동을 클릭하면 해당 상호 작용에 대해 자세히 파악할 수 있습니다(예:

- 사용자가 활동을 한 횟수와 해당 페이지의 상위 활동 전체 분석에서 차지하는 순위).
- 해당 활동에서 불만 신호가 있었는지 여부(예: 사용자가 답답해서 해당 버튼을 반복적으로 클릭했는지 여부) 및 관련 불만 신호 확인 가능

이 화면에서 {{< ui >}}Start a Funnel{{< /ui >}} 버튼을 클릭하여 사용자 이탈을 식별할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmap-actions.png" alt="예시 활동과 해당 활동에 대해 입수할 수 있는 정보를 보여줍니다." style="width:50%;">}}

## 스크롤 맵 {#scroll-maps}

스크롤 맵은 특정 페이지에서 이루어진 스크롤 활동을 집계한 결과를 표시합니다. 스크롤 맵을 통해 페이지의 평균 폴드 위치, 그리고 특정 깊이까지 스크롤하는 사용자 수를 확인할 수 있습니다. 스크롤 맵의 파란색 플로팅 바를 드래그하여 평가하려는 깊이로 이동할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="샘플 전자상거래 애플리케이션의 침구류 페이지 스크롤 맵" style="width:100%;">}}

스크롤 맵 왼쪽의 패널에는 쿼리 결과로 바로 연결되는 링크가 포함되어 있어 포괄적인 인사이트를 제공합니다(예: 사용자가 특정 백분위수를 넘어 스크롤한 보기 목록으로 연결되는 링크). 인사이트 패널 아래에는 페이지 미니맵과 세부 스크롤 데이터를 보여주는 분포 그래프가 있어, 가장 큰 이탈이 발생하는 지점을 파악하는 데 유용합니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="스크롤 데이터 인사이트의 쿼리 스크린샷" style="width:50%;">}}

## 스크린샷 {#screenshots}

스크린샷은 특정 시점의 뷰 상태를 나타냅니다. 스크린샷을 변경하면 선택한 스크린샷에 따라 결과가 다르게 표시됩니다. 또한 스크린샷을 저장하여 조직의 모든 구성원이 동일한 뷰 상태를 분석하도록 할 수 있습니다. 

### 스크린샷 변경 {#changing-screenshots}

히트맵 뷰에서 {{< ui >}}Change Screenshot{{< /ui >}} 버튼을 클릭합니다. 세 가지 옵션을 보여주는 드롭다운이 나타납니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-screenshot-button.png" alt="세 가지 옵션(기존 스크린샷, 새 스크린샷 찍기, 재생에서 가져오기)을 보여주는 스크린샷 변경 드롭다운입니다." style="width:100%;">}}

{{< ui >}}Existing screenshots{{< /ui >}}

본인이나 팀원이 이전에 저장한 스크린샷 중에서 선택합니다. 이렇게 하면 조직의 모든 구성원이 동일한 뷰 상태를 분석할 수 있습니다.

{{< ui >}}Take new screenshot{{< /ui >}}

라이브 애플리케이션에서 직접 스크린샷을 캡처합니다. 열린 모달, 호버 메뉴, 특정 스크롤 위치 등 확인하려는 상태가 기록된 재생에 존재하지 않는 경우 이 옵션을 사용하세요.

**전제 조건**: 이 옵션을 사용하기 전에 [Datadog Test Recorder][6] Chrome 확장 프로그램을 설치합니다. 확장 프로그램은 Datadog 내 임베디드 브라우저에서 라이브 애플리케이션을 로드하므로, 캡처하려는 정확한 페이지와 UI 상태로 이동할 수 있습니다.

1. {{< ui >}}Take new screenshot{{< /ui >}}을 클릭합니다.


1. 임베디드 브라우저에서 캡처하려는 페이지로 이동합니다.
1. 페이지를 스크롤하고 상호 작용하여 원하는 콘텐츠를 표시합니다.
1. 히트맵 스크린샷에 민감한 데이터가 표시되지 않도록 적절한 마스킹 수준을 선택합니다. 코드에서 구성한 개별 요소 수준의 개인정보 보호 설정이 여전히 우선합니다. 자세한 내용은 [Privacy options][5]을 참조하세요.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-take-new-screenshot.png" alt="탐색 지침과 마스킹 수준 선택기를 표시하는 새 스크린샷 찍기 패널입니다." style="width:100%;">}}

1. {{< ui >}}Take Screenshot{{< /ui >}}을 클릭합니다. 스크린샷 미리 보기가 열립니다.
1. 미리 보기를 검토하고 {{< ui >}}Confirm{{< /ui >}}을 클릭하여 스크린샷을 히트맵에 적용합니다.

{{< ui >}}Grab from replay{{< /ui >}}

기록된 Session Replay에서 스크린샷을 선택합니다.

1. {{< ui >}}Grab from replay{{< /ui >}}를 클릭합니다.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-grab-from-replay-selected.png" alt="'재생에서 가져오기'가 선택된 스크린샷 변경 드롭다운입니다." style="width:100%;">}}

1. 오른쪽의 활동 이벤트를 클릭하여 히트맵에 사용할 다른 스냅샷을 선택합니다.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events-1.png" alt="Session Replay의 활동 이벤트 목록입니다." style="width:100%;">}}

1. 세션에[ 원하는 스크린샷으로 이어지는 활동이 포함되지 않은 경우](#the-view-that-i-selected-is-not-showing-the-initial-content), {{< ui >}}Choose Another Replay{{< /ui >}}를 클릭하여 세션 재생 목록으로 돌아갑니다.
1. {{< ui >}}Take Screenshot{{< /ui >}}을 클릭하여 일시 중지된 지점의 스크린샷을 히트맵에 적용합니다.

### 스크린샷 저장 중{#saving-screenshots}

{{< ui >}}Grab from replay{{< /ui >}} 또는 {{< ui >}}Take new screenshot{{< /ui >}}으로 촬영한 스크린샷은 자동으로 저장되며 히트맵을 여는 조직 내 모든 사용자의 기본 뷰로 설정됩니다. 최근 재생에서 자동 선택된 스크린샷을 추가로 저장하려면 현재 스크린샷에서 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-save-screenshot-1.png" alt="저장을 클릭하여 자동 선택된 스크린샷을 적용합니다." style="width:100%;">}}

동일한 뷰에 대해 여러 스크린샷을 저장하고(예: 기본 뷰, 열린 탐색 메뉴, 열린 모달) 팀원이 저장한 스크린샷 간 전환이 가능합니다.

현재 저장된 스크린샷을 삭제하고, 최근 재생에서 자동 선택된 스크린샷으로 되돌리려면 현재 스크린샷에서 {{< ui >}}Unpin{{< /ui >}}을 클릭합니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-unpin-screenshot-1.png" alt="고정 해제를 클릭하여 현재 고정된 스크린샷을 삭제합니다." style="width:100%;">}}

### 재생 보존 기간을 초과하는 히트맵 분석{#analyzing-heatmaps-beyond-replay-retention}

Product Analytics에서 클릭 데이터는 배경으로 사용된 Session Replay보다 오래 보존됩니다. [데이터 보존](#data-retention)을 참조하세요. 재생 보존 기간보다 긴 기간의 히트맵을 보려면 다음을 수행하세요.

1. 최근 30일 이내로 날짜 범위를 설정하여 최근 재생의 배경으로 히트맵을 렌더링합니다.
1. 현재 스크린샷에서 {{< ui >}}Save{{< /ui >}}를 클릭하여 고정합니다.
1. 날짜 범위를 분석하려는 기간으로 다시 설정합니다.

과거의 클릭 데이터가 고정된 스크린샷에 표시됩니다. 또한 {{< ui >}}Take new screenshot{{< /ui >}}을 사용하여 라이브 애플리케이션의 특정 상태를 캡처할 수 있습니다.

**참고**: 배경은 분석 중인 기간이 아닌 최근의 애플리케이션을 반영합니다. 그 사이에 페이지 레이아웃이 변경된 경우, 잘못된 요소 위에 클릭이 표시될 수 있습니다.

## 데이터 보존 {#data-retention}

히트맵은 두 가지 데이터(**오버레이** - 클릭 및 스크롤, **배경 스크린샷**)를 결합하며, Datadog은 데이터를 각각 다른 기간에 걸쳐 보존합니다.

| 데이터 | 소스 | 보존 기간 |
| ---- | ------ | --------- |
| **오버레이**(클릭 및 스크롤) RUM | RUM 활동 이벤트 | 30일 |
| **오버레이**(클릭 및 스크롤) Product Analytics | Product Analytics 클릭 데이터 | 15개월 |
| **배경 스크린샷** 두 가지 모두 | Session Replay | 기본 30일 |

히트맵을 렌더링할 때 두 가지 모두 필요합니다. 클릭 데이터는 존재하지만 배경으로 사용할 재생이 남아 있지 않은 기간을 선택하면, Analytics Explorer에서 해당 작업을 쿼리할 수 있어도 히트맵에는 '세션 재생 데이터 없음'으로 표시됩니다.

Product Analytics에서 30일이 넘는 기간의 뷰를 분석하려면, 재생을 사용할 수 있을 때 해당 뷰에 대한 스크린샷을 저장합니다. 스크린샷을 저장하면 배경 재생의 보존 기간이 15개월로 연장되므로, Datadog에서 Product Analytics 클릭 데이터를 보존하는 동안 히트맵이 계속 렌더링됩니다. [세션 재생 보존 기간을 초과하는 히트맵 분석](#analyzing-heatmaps-beyond-replay-retention)을 참조하세요.

RUM에서 활동 이벤트는 30일 후에 만료되므로, 해당 기간을 초과하는 히트맵은 사용할 수 없습니다.

다른 데이터 유형에 적용되는 보존 기간은 [데이터 보존 기간][7]을 참조하세요. 개별 재생의 보존 기간을 연장하려면 [데이터 보존 기간 연장][8]을 참조하세요.

## 다음 단계 {#next-steps}

히트맵 분석 후 다음 단계는 관련 데이터를 탐색해 사용자 활동을 파악하는 것입니다. 관련 [Session Replay][1]를 시청하여 전체 세션 맥락에서 사용자 활동을 확인하거나, [RUM][3] 또는 [Product Analytics][4]의 Analytics Explorer로 이동해 사용자 데이터를 분석합니다.

## 문제 해결 {#troubleshooting}

### 특정 뷰의 히트맵을 확인했는데, 다른 페이지가 나타납니다. {#i-am-looking-at-a-heatmap-for-a-given-view-but-its-showing-me-an-unexpected-page}

히트맵은 뷰 이름을 기반으로 합니다. 애플리케이션 구성 방법에 따라 여러 페이지를 동일한 뷰 이름으로 그룹화하거나 특정 뷰 이름으로 시작할 수 있습니다.

### 선택한 뷰에서 초기 콘텐츠가 표시되지 않습니다. {#the-view-that-i-selected-is-not-showing-the-initial-content}

히트맵은 Session Replay 데이터를 바탕으로 생성됩니다. Datadog의 지능형 알고리즘은 페이지의 초기 상태와 가장 잘 일치하는 최근 재생을 선택합니다. 경우에 따라 원하는 재생이 아닐 수 있습니다. 히트맵의 스냅샷을 전환하려면 {{< ui >}}Change Snapshot{{< /ui >}} 버튼을 사용하여 세션 재생의 다양한 상태를 탐색하고 원하는 것을 찾습니다. 현재 보고 있는 재생에 원하는 스냅샷이 없는 경우, {{< ui >}}Choose Another Replay{{< /ui >}} 버튼을 사용하여 동일한 뷰의 다른 세션 재생을 선택할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-the-snapshot.mp4" alt="스냅샷 변경 버튼을 클릭하여 다른 배경을 선택합니다." video=true >}}

### 히트맵 측면의 활동 목록에 히트맵에 표시되지 않는 요소의 아이콘이 있습니다. {#on-the-action-list-on-the-side-of-my-heatmap-i-see-an-icon-showing-an-element-that-is-not-visible-in-the-heatmap}

아이콘 툴팁에 요소가 표시되지 않는다는 문구가 나타납니다. 이는 해당 요소가 페이지에서 이루어지는 일반적인 활동이지만, 히트맵의 스냅샷에는 표시되지 않음을 의미합니다. 해당 요소를 확인하려면 오른쪽 상단 모서리에 있는 {{< ui >}}Change Snapshot{{< /ui >}}을 클릭하여 히트맵의 스냅샷을 해당 요소가 표시된 스냅샷으로 전환할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="히트맵의 활동 목록에서 숨겨진 요소입니다." style="width:100%;">}}

### 히트맵을 생성하려는데 'No Replay Data' 상태가 나타납니다. {#after-attempting-to-create-a-heatmap-i-see-a-no-replay-data-state-appear}

'No Replay Data' 상태는 Datadog이 히트맵 배경으로 사용할 Session Replay를 찾을 수 없다는 뜻입니다. 일반적인 원인:

- 선택한 기간이 Session Replay의 보존 기간(기본 30일)을 초과합니다. 클릭 데이터는 여전히 존재할 수 있지만, 배경으로 사용할 재생이 남아 있지 않습니다. [Replay 보존 기간을 초과하는 히트맵 분석](#analyzing-heatmaps-beyond-replay-retention)을 참조하세요.
- 현재 검색 필터와 일치하는 재생 항목이 존재하지 않습니다.
- 최근에 [브라우저 SDK][2]로 기록을 시작했으므로, 현재 재생을 실행할 수 없습니다. 몇 분 정도 소요될 수 있습니다.

### 히트맵을 생성하려는데 'Not enough data to generate a heatmap' 상태가 나타납니다. {#after-attempting-to-create-a-heatmap-i-see-a-not-enough-data-to-generate-a-heatmap-state-appear}

이는 Datadog이 현재 선택된 재생과 일치하는 사용자 활동을 찾을 수 없다는 뜻입니다. 이와 같은 현상은 다음과 같은 이유로 발생합니다.

- 애플리케이션이 최신 SDK 버전(4.20.0 이상)이 아닌 경우
- 최근에 페이지가 상당 부분 변경된 경우 

### 페이지의 사용자 정보가 비워져 있을 경우 {#all-of-the-user-information-on-the-page-is-empty}

사용자 정보는 기본적으로 수집되지 않습니다. 히트맵은 세션 데이터에서 이용할 수 있는 사용자 정보를 사용해 동작과 관련된 인사이트를 표시합니다.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: /ko/real_user_monitoring/explorer/
[4]: /ko/product_analytics/charts/analytics_explorer/
[5]: /ko/session_replay/privacy_options?platform=browser#privacy-options
[6]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[7]: /ko/data_security/data_retention_periods/
[8]: /ko/session_replay/#extend-data-retention