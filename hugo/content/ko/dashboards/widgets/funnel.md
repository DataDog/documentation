---
aliases:
- /ko/graphing/widgets/funnel/
description: 퍼널 분석 시각화를 통해 전환율을 추적하고 사용자 워크플로의 병목 현상을 파악하세요.
further_reading:
- link: https://docs.datadoghq.com/product_analytics/journeys/funnel_analysis/
  tag: 설명서
  text: Funnel 분석에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: 블로그
  text: 퍼널 분석을 사용하여 주요 사용자 흐름을 파악하고 최적화
title: Funnel 위젯
widget_type: funnel
---
Funnel 분석을 이용하면 주요 워크플로 전반의 전환율을 추적하여 사용자 이동 경로 처음부터 끝까지 발생하는 병목 현상을 파악하고 이를 해결할 수 있습니다. 퍼널 위젯은 사용자 워크플로와 엔드 투 엔드 사용자 여정 전반에 걸쳐 전환율을 시각화합니다.

{{< img src="dashboards/widgets/funnel/funnel.png" alt="전자상거래 사이트에서 사용자의 이탈률을 시각화하는 퍼널 위젯" >}}

## 설정 {#setup}

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="퍼널 위젯 설정 화면" >}}

### 구성 {#configuration}

1. 그래프로 표시할 데이터 선택:
    * RUM: RUM 쿼리를 설정하려면 [RUM 이벤트 검색 가이드][1]를 참조하세요.
2. {{< ui >}}View{{< /ui >}} 또는 {{< ui >}}Action{{< /ui >}}을 선택하고 드롭다운 메뉴에서 쿼리를 선택합니다.
3. {{< ui >}}\+{{< /ui >}} 버튼을 클릭하고 드롭다운 메뉴에서 다른 쿼리를 선택하여 퍼널을 시각화합니다. 퍼널 분석 시각화에 대한 자세한 내용은 [RUM 시각화 가이드][2]를 참조하세요.

### 옵션 {#options}

#### 글로벌 시간 {#global-time}

스크린보드 및 노트북에서 위젯에 커스텀 기간이 있는지 또는 글로벌 기간을 사용하는지를 선택하세요.

## API {#api}

이 위젯은 [Dashboards API][3]와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][4]는 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/explorer/search/
[2]: /ko/product_analytics/journeys/funnel_analysis
[3]: /ko/api/latest/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/