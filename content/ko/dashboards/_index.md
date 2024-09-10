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
    - 스냅샷
    - dashboards
description: 데이터를 시각화하여 인사이트 확보
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: 릴리스 노트
  text: 최신 Datadog 대시보드 릴리스를 확인하세요(앱 로그인 필요)!
- link: /dashboards/sharing/
  tag: 설명서
  text: Datadog 외부에서 그래프 공유
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: 블로그
  text: 클립보드에 대시보드 위젯 추가
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: 블로그
  text: 새로운 Datadog 대시보드 경험
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: 개발자 문서
  text: 탁월한 통합 대시보드 만들기
- link: https://dtdg.co/fe
  tag: \u0008기초 구축
  text: 대시보드를 통해 보다 나은 시각화를 위한 대화형 세션 참여
title: 대시보드
---

## 개요

대시보드는 조직 내 시스템 및 애플리케이션의 성능과 상태에 대한 실시간 인사이트를 제공합니다. 이를 통해 사용자는 데이터를 시각적으로 분석하고 핵심성과지표(KPI)를 추적하며 트렌드를 효율적으로 모니터링할 수 있습니다. 대시보드를 통해 팀은 이상 현상을 식별하고, 문제의 우선순위를 지정합니다. 또한 문제를 사전에 감지하고, 근본 원인을 진단하며, 안정성 목표가 충족되었는지 확인할 수 있습니다. 중요한 메트릭과 성과 지표를 모니터링하고 분석하기 위한 중앙 집중식 사용자 친화적인 인터페이스를 제공하여 팀이 정보에 입각한 결정을 내리고 시스템 운영을 최적화하며 비즈니스 성공을 촉진할 수 있도록 지원합니다.

{{< whatsnext desc="대시보드 기능:">}}
    {{< nextlink href="/dashboards/configure" >}}설정: 대시보드 설정 옵션 개요{{< /nextlink >}}
    {{< nextlink href="/dashboards/configure" >}}대시보드 목록: 대시보드 및 목록을 검색, 확인, 생성하기{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}템플릿 변수: 대시보드의 위젯을 동적으로 필터링{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/datadog_clipboard/" >}}Datadog 클립보드{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API: 프로그래밍 방식으로 대시보드 관리{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="그래프 기능:">}}
    {{< nextlink href="/dashboards/widgets" >}}위젯: 다양한 시각화 설정 알아보기{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}쿼리: 그래프 쿼리에 대한 형식 지정 옵션{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}함수: 메트릭 쿼리 및 결과 그래프 수정{{< /nextlink >}}
    {{< nextlink href="/dashboards/change_overlays" >}}오버레이: 그래프에 변경 이벤트를 자동으로 오버레이{{< /nextlink >}}
{{< /whatsnext >}}

## 시작하기

{{< whatsnext desc="다음 리소스를 참조하세요:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}대시보드 시작하기{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}학습 과정: 대시보드 소개{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/building-better-dashboards" >}}학습 과정: 더 나은 대시보드 구축{{< /nextlink >}}
{{< /whatsnext >}}

대시보드를 생성하려면 [Dashboard List][4] 페이지에서 **+New Dashboard**를 클릭하거나 탐색 메뉴에서 **New Dashboard**를 클릭하세요. 대시보드 이름을 입력하고 레이아웃 옵션을 선택하세요.

{{< img src="dashboards/create-dashboard.png" alt="새 대시보드 추가" style="width:70%;">}}

대시보드
: 이미지, 그래프, 로그 등 다양한 개체를 포함할 수 있는 그리드 기반 레이아웃입니다. 실시간으로 업데이트되고 과거의 고정 지점을 나타낼 수 있는 상태 보드 또는 스토리텔링 뷰로 사용됩니다. 최대 너비는 12개의 그리드 사각형이며 디버깅에도 적합합니다.

타임보드
: 전체 대시보드에서 단일 시점(고정 또는 실시간)을 나타내는 자동 레이아웃입니다. 일반적으로 문제 해결, 상관 관계 및 일반 데이터 탐색에 사용됩니다.

스크린보드
: 이미지, 그래프, 로그 등 다양한 개체를 포함할 수 있는 자유 형식 레이아웃을 갖춘 대시보드입니다. 실시간으로 업데이트되거나 과거의 고정 지점을 나타내는 상태 보드 또는 스토리텔링 뷰로 사용됩니다.

## 새로고침 빈도

프라이빗 대시보드의 새로고침 빈도는 사용자가 보고 있는 시간 프레임에 따라 다릅니다. 시간 프레임이 짧을수록 데이터가 더 잦은 빈도로 새로고침됩니다. 공개적으로 공유된 대시보드는 선택된 시간 프레임에 관계없이 30초마다 새로고침됩니다.

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

## 모바일 기기에서 대시보드 보기

[Apple App Store][2] 및 [Google Play Store][3]에서 다운로드할 수 있는 Datadog 모바일 앱을 사용하여 모바일 친화적인 형식의 대시보드를 확인하세요. 모바일 앱에는 모바일 앱을 열지 않고도 서비스 상태와 인프라스트럭처를 모니터링할 수 있는 모바일 홈 화면 위젯이 포함되어 있습니다.

**참고**: 대시보드를 설정하거나 편집하려면 Datadog 브라우저 UI에 로그인해야 합니다. 앱 설치에 대한 자세한 내용은 [Datadog 모바일 앱][1] 문서를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists