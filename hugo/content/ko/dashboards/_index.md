---
aliases:
- /ko/guides/templating/
- /ko/graphing/dashboards/
- /ko/guides/graphing
- /ko/graphing/miscellaneous/metrics_arithmetic
- /ko/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
- /ko/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
- /ko/graphing/
- /ko/dashboards/dashboards/
- /ko/dashboards/screenboards/
- /ko/dashboards/timeboards/
cascade:
  algolia:
    rank: 70
    tags:
    - snapshot
    - dashboards
description: 데이터를 시각화하여 인사이트 확보
further_reading:
- link: /dashboards/sharing/
  tag: 설명서
  text: Datadog 외부에서 그래프 공유
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: 모범 사례
  text: 탁월한 통합 대시보드 만들기
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: Dashboards를 통해 보다 나은 시각화를 위한 대화형 세션 참여
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: 블로그
  text: 클립보드에 대시보드 위젯 추가
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: 블로그
  text: 새로운 Datadog 대시보드 경험
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: 블로그
  text: Datadog으로 효과적인 임원 대시보드 설계
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: 릴리스 노트
  text: 최신 Datadog Dashboards 릴리스를 확인하세요! (앱에 로그인해야 함).
title: Dashboards
---
## 개요 {#overview}

Dashboards는 조직 내 시스템과 애플리케이션의 성능 및 상태에 관한 실시간 인사이트를 제공합니다. 대시보드를 사용하면 사용자가 시각적으로 데이터를 분석하고, 핵심 성과 지표(KPI)를 추적하고 효율적으로 추세를 모니터링할 수 있습니다. 대시보드를 사용하면 팀에서 이상치를 파악하고, 문제에 우선순위를 지정하고, 선제적으로 문제를 감지하고, 근본 원인을 진단하며 안정성 목표를 달성하도록 보장할 수 있습니다. 중요한 메트릭 및 성능 지표를 모니터링하고 분석할 중앙 집중형, 사용자 친화적 인터페이스를 제공하여 정보에 기반한 의사 결정을 내리고 시스템 운영을 최적화하도록 팀을 지원하세요.

{{< whatsnext desc="Dashboard 기능:">}}
    {{< nextlink href="/dashboards/configure" >}}구성: 대시보드의 구성 옵션 개요{{< /nextlink >}}
    {{< nextlink href="/dashboards/list" >}}Dashboard List: 대시보드 및 목록 검색, 조회 또는 생성{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}템플릿 변수: 대시보드에서 동적으로 위젯 필터링{{< /nextlink >}}
    {{< nextlink href="/dashboards/guide/datadog_clipboard/" >}}Datadog 클립보드{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: 대시보드를 프로그래밍 방식으로 관리{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Graphing 기능:">}}
    {{< nextlink href="/dashboards/widgets" >}}위젯: 다양한 시각화의 구성 알아보기{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}쿼리: 그래프 쿼리의 형식 지정 옵션 보기{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}함수: 메트릭 쿼리 및 그 결과로 도출되는 그래프 수정{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}오버레이: 그래프에 자동으로 변경 이벤트 오버레이{{< /nextlink >}}
{{< /whatsnext >}}

## 시작하기 {#get-started}

대시보드를 생성하는 방법: 
1. [Dashboard List][4] 페이지에서 **+새 대시보드**를 클릭하거나 탐색 메뉴에서 **새 대시보드**를 클릭합니다.
2. 대시보드 이름을 입력하고 레이아웃 옵션을 선택합니다.

{{< img src="dashboards/create-dashboard.png" alt="새 대시보드 추가" style="width:70%;">}}

Dashboards 
: 그리드 기반 레이아웃이며, 이미지, 그래프 및 로그 등 다양한 개체를 포함할 수 있습니다. 일반적으로 상태 보드 또는 스토리텔링 뷰로 사용되며 실시간으로 업데이트되고, 과거의 고정된 시점을 나타낼 수 있습니다. 최대 너비는 그리드 정사각형 12개이며, 디버그용으로도 효과적입니다.

타임보드
: 대시보드 전체에서 한 개의 시점(고정 또는 실시간)을 나타내는 자동 레이아웃입니다. 일반적으로 문제 해결, 상호 연계 및 일반 데이터 탐색에 사용됩니다.

스크린보드
: 프리폼 레이아웃을 포함한 대시보드이며 이미지, 그래프, 로그 등의 다양한 개체를 포함할 수 있습니다. 일반적으로 실시간으로 업데이트되는 상태 보드 또는 스토리텔링 보기로 사용되거나, 과거의 고정된 시점을 나타냅니다.

{{< whatsnext desc="다음 리소스 참조:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}대시보드 시작하기{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}학습 과정: 대시보드 소개{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}학습 과정: 더 나은 대시보드 구축하기{{< /nextlink >}}
{{< /whatsnext >}}

## 새로고침 빈도 {#refresh-rate}

프라이빗 대시보드의 새로고침 빈도는 조회 중인 시간 프레임에 좌우됩니다. 시간 프레임이 짧을수록 데이터가 자주 새로 고쳐집니다. 공개적으로 공유되는 대시보드는 선택한 시간 프레임과 관계없이 30초에 한 번씩 새로 고쳐집니다.

| 시간 프레임   | 새로고침 빈도 |
|--------------|--------------|
| 1분     | 10초   |
| 2분    | 10초   |
| 5분    | 10초   |
| 10분   | 10초   |
| 30분   | 20초   |
| 1시간       | 20초   |
| 3시간      | 1분     |
| 4시간      | 1분     |
| 1일        | 3분     |
| 2일       | 10분    |
| 1주       | 1시간       |
| 1개월      | 1시간       |
| 3개월     | 1시간       |
| 6개월     | 1시간       |
| 1년       | 1시간       |

## 모바일 장치에서 대시보드 조회 {#view-dashboards-on-mobile-devices}

[Apple App Store][2] 및 [Google Play Store][3]에서 제공되는 Datadog 모바일 앱을 사용하면 대시보드를 모바일 친화적인 형식으로 조회할 수 있습니다. 모바일 앱에는 모바일 홈 화면 위젯이 있어 모바일 앱을 열지 않고도 서비스 상태와 인프라를 모니터링할 수 있습니다.

**참고**: 대시보드를 설정하거나 편집하려면 Datadog 브라우저 UI에 로그인해야 합니다. 앱 설치에 관한 자세한 내용은 [Datadog 모바일 앱][1] 설명서를 참조하세요.

## 추가 자료{#further-reading}

{{< learning-center-callout header="Datadog 학습 센터에서 그래프 위젯 생성 수강" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/dashboard-graph-widgets">}} 시계열, 쿼리 값, 상위 목록, 표, 분포 및 원형 차트 위젯을 둘러보세요. 위젯을 구성하는 방법을 알아보고 각 위젯 유형을 언제 활용해야 할지 이해도를 높여 보세요. {{< /learning-center-callout >}}

{{< learning-center-callout header="Datadog 학습 센터에서 표, 목록, SLO 및 아키텍처 위젯 생성 수강" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/discovering-table-list-widgets">}} 표, 목록, SLO 및 아키텍처 위젯을 둘러보세요. 웹 애플리케이션의 메트릭 및 성능을 추적하는 방법과 중요한 데이터를 표시하는 방법을 알아보세요. {{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists