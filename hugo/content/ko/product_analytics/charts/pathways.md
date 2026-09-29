---
aliases:
- /ko/real_user_monitoring/product_analytics/sankey
- /ko/product_analytics/sankey
- /ko/product_analytics/journeys/sankey
- /ko/product_analytics/journeys/pathways
further_reading:
- link: /product_analytics/journeys
  tag: 설명서
  text: 차트
- link: /dashboards/widgets/sankey/
  tag: 설명서
  text: Dashboards에서 Sankey 위젯 빌드
title: 경로
---
## 개요 {#overview}

경로 다이어그램을 사용하면 애플리케이션 전반의 모든 사용자 여정을 시각화하여 중요 경로를 분석할 수 있습니다.

{{< img src="/product_analytics/journeys/pathways/ga_pathway_diagrams_page.png" alt="앱의 기본 경로 다이어그램" style="width:90%;" >}}

각 노드는 사용자가 방문한 조회를 나타냅니다. 각 노드의 두께는 해당 페이지의 사용자 세션 수를 나타냅니다. 방문자 수가 적은 페이지는 다이어그램에서 더 얇은 노드로 표시됩니다.

사용자가 세션 중에 동일한 페이지를 여러 번 방문하더라도 해당 페이지는 한 번만 집계됩니다.

액션 이벤트는 경로 다이어그램에서 지원되지 않습니다.

## 경로 다이어그램 빌드 {#build-a-pathways-diagram}

### 기본 다이어그램 조회 {#view-the-default-diagram}

1. [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Charts{{< /ui >}}][1]로 이동합니다.
2. 아직 선택되지 않은 경우 {{< ui >}}Pathways{{< /ui >}}를 클릭합니다. 애플리케이션에서 가장 인기 있는 사용자 여정을 나타내는 기본 시각화가 표시됩니다.

### 특정 조회에서 다이어그램 시작 또는 종료 {#start-or-end-the-diagram-at-a-given-view}

왼쪽 메뉴를 사용하여 이 다이어그램을 사용자 지정하고 다음을 표시할 수 있습니다.
- 사용자가 특정 조회를 방문한 *후* 수행한 단계
- 사용자가 특정 조회를 방문하기 *전* 수행한 단계

아래 예시는 미국 사용자가 `/department/lighting`을 방문한 후 수행한 4단계를 보여줍니다.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img2.png" alt="앱을 위한 사용자 지정 경로 다이어그램" style="width:90%;" >}}

### 지정된 구문이 포함된 모든 조회 그래프 표시 {#graph-all-views-containing-a-given-phrase}

경로 다이어그램은 [Datadog Wildcard][2]를 지원하므로 지정된 구문이 포함된 모든 조회의 다이어그램을 작성할 수 있습니다.

여러 경로를 일치시키려면 단일 조회 이름을 선택하는 대신 와일드카드를 입력하세요. 아래 예시는 `/department/*`와 일치하는 조회를 방문한 후 사용자가 수행하는 5단계를 보여줍니다.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img3.png" alt="와일드카드를 사용하여 여러 경로를 일치시키는 경로 다이어그램" style="width:90%;" >}}

## 경로 다이어그램 분석 {#analyze-a-pathways-diagram}

다이어그램 노드 위로 마우스를 가져가면 해당 조회를 방문한 세션 수를 확인할 수 있습니다.

노드를 클릭하면 샘플 [Session Replay][3] 조회 또는 해당 조회로 시작하는 경로 다이어그램 작성과 같은 분석 옵션 목록이 표시됩니다.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img4.png" alt="경로 다이어그램 노드의 작업 메뉴" style="width:90%;" >}}

### 다이어그램을 퍼널로 변환 {#convert-the-diagram-to-a-funnel}

1. 경로 다이어그램 페이지에서 {{< ui >}}Build Funnel{{< /ui >}} 버튼을 클릭합니다.
2. 경로 다이어그램에서 퍼널에 포함하려는 조회의 노드를 클릭합니다.
3.  {{< ui >}}Create Funnel From Selection{{< /ui >}}을 클릭합니다.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img5.png" alt="경로에서 퍼널로의 변환 진행 중" style="width:90%;" >}}

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/pathways
[2]: /ko/real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /ko/session_replay/