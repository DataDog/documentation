---
description: Datadog의 시각화 도구를 사용하여 팀 모니터링, 경영진 보고, 문제 해결에 효과적인 대시보드를 만드는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: 블로그
  text: 조직 외부인과도 안전하게 대시보드 공유하기
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: 블로그
  text: 관련된 템플릿 변수를 사용해 대시보드 정리하기
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: 학습 센터
  text: 더 나은 대시보드 빌드
- link: /dashboards/
  tag: 설명서
  text: 대시보드 기본 사항
- link: /notebooks/
  tag: 설명서
  text: 노트북으로 데이터의 맥락 추가하기
- link: /monitors/
  tag: 설명서
  text: 모니터링, SLO, 알림, 다운타임, 인시던트
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: Dashboards를 통해 보다 나은 시각화를 위한 대화형 세션 참여
title: 대시보드 시작하기
---
{{< learning-center-callout header="교육 웨비나 세션 참가" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Dashboarding">}}
  기반 활성화 세션을 탐색하고 등록하세요. 시각화 라이브러리와 드래그 앤 드롭 방식의 대시보드 빌더를 사용하여 대시보드를 사용자 지정하는 방법을 알아보세요. 보고서, 공개 URL, 노트북을 통해 이해관계자와 데이터를 공유하여 팀의 성공을 지원하세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

대시보드 시작 단계에서의 핵심은 정기적으로 스스로에게 어떤 질문을 던지는지 파악하는 것입니다. 고객이 일반적으로 겪는 문제는 무엇인가요? 문제 발생 시 해결책을 찾는 데 도움이 되는 질문은 무엇인가요? 

좋은 대시보드를 만드는 것은 해당 질문에 대한 답을 명확히 제시하는 것입니다. 또한 이러한 모든 생각을 동일한 대시보드에 담지 않는 것이 중요합니다. 각각 다른 문제를 정확히 파악하기 위해 별도의 대시보드를 만들면 답을 빠르게 찾는 데 도움이 될 수 있습니다.

이 가이드는 대시보드 생성을 시작하는 방법을 안내합니다. 이러한 기본 대시보드는 팀 논의를 활성화하고 문제 해결 속도를 높이는 효과를 제공합니다.

## 전제 조건 {#prerequisites}

계정이 없다면 [Datadog 계정][1]을 만드세요. 호스트 및 호스트에서 실행되는 통합에서 에이전트를 설치합니다.

## 계획 {#plan}

생성하려는 대시보드의 목적을 결정합니다. 대시보드는 고객님과 팀원들이 올바른 작업에 집중할 수 있도록 돕습니다. _팀 대시보드_는 우선순위가 높은 과제, 주의가 필요한 사항, 어떤 영역에서 성과를 내고 있는지 상기시켜 줍니다. 사람들이 가장 자주 찾는 정보가 포함된 팀 대시보드(또는 여러 개)를 만드세요. SLO 및 SLI 세부 정보는 훌륭한 팀 대시보드를 구성하는 요소입니다.

실시간 데이터에 연결된 대시보드는 관리자 및 경영진과의 논의를 이끄는 강력한 도구입니다. 좋은 _임원용 대시보드_는 가장 중요한 업무를 수행하고 있는지, 서비스 비용은 어느 정도 소요되는지, 목표를 향해 진전하고 있는지, SLO를 충족하는지, 효과적으로 확장하고 있는지 등 다양한 상황을 보여줄 수 있습니다. 임원용 대시보드는 최상위 수준에서 이러한 질문에 대한 답을 제시하고, 서로 연결된 상태로 답을 비교 및 분석할 때 가장 효과적입니다.

또한 대시보드는 지속적인 문제를 추적하고 해결하는 데 도움이 될 수 있습니다. _문제 해결 대시보드_는 종종 알고 있는 내용을 기록하는 메모장으로 시작한 후 더 많은 정보를 발견하면서 점차 확장됩니다. 예를 들어, 문제 상황을 보여주는 다른 대시보드나 뷰의 그래프/위젯으로 시작하세요. 그 지점에서 추가로 분석하여 해결책을 찾으세요.

## 기본 제공 대시보드 살펴보기 {#explore-out-of-the-box-dashboards}

Datadog은 기능 및 통합을 위한 기본 제공 대시보드를 다양하게 제공합니다. 모니터링하는 인프라에 대해 Datadog 기본 제공 대시보드를 확인해 보세요.

1. Datadog에서 [대시보드 목록 페이지][2]로 이동한 다음 추가한 통합 이름을 검색합니다. 예를 들어 `Redis` 또는 `RUM` 등 사용하는 기능이 될 수 있습니다. 
2. {{< ui >}}Preset{{< /ui >}}으로 표시된 대시보드의 검색 결과를 찾아보고 그래프 중 적어도 일부에 원하는 답이 표시되어 있는지 확인합니다.
3. 기본 제공 대시보드의 제목 드롭다운 메뉴에서 링크를 탐색하여 자세한 활용 방법을 찾아보세요.

## 다른 대시보드를 재사용하는 단계부터 시작하기{#start-by-reusing-other-dashboards}

대시보드를 시작하는 일반적인 방법은 이미 사용 중인 유사한 대시보드를 찾아 필요에 맞게 조정하는 것입니다. 대시보드에서 확인하려는 여러 질문에 대한 답을 제시하는 대시보드를 찾았다면 다음을 수행하세요. 

1. 대시보드를 열고 구성 작업 메뉴(오른쪽 {{< ui >}}Configure{{< /ui >}} 버튼)에서 {{< ui >}}Clone dashboard{{< /ui >}}를 선택하여 복제합니다. 이렇게 하면 대시보드의 연결되지 않은 복사본이 생성되며, 새 복사본에서 변경한 사항은 소스 위젯에 영향을 주지 않습니다.
  {{< img src="getting_started/dashboards/configure_clone_dashboard.png" alt="구성 작업 메뉴의 대시보드 복제 옵션" style="width:100%;" >}}
2. 복사본을 열고 {{< ui >}}Edit widgets{{< /ui >}}를 클릭하여 내용을 수정하세요. 
3. 위젯의 설정 메뉴에서 {{< ui >}}Delete{{< /ui >}}를 선택하여 필요하지 않은 위젯을 삭제합니다.
4. 필요에 맞게 항목을 이동하세요. 그룹 및 개인 위젯은 대시보드에서 새로운 위치에 끌어다 놓을 수 있습니다.
5. 위젯 위에 마우스를 올리고 `Command + C` (`Ctrl + C` on Windows)을 입력하여 다른 대시보드에서 원하는 위젯을 복사하세요. 대시보드를 열고 `Command + V` (`Ctrl + V` on Windows)을 입력하여 대시보드에 붙여넣으세요.
5. 여러 Datadog 뷰에서 제공하는 {{< ui >}}Export to Dashboard{{< /ui >}} 옵션을 사용하여 데이터를 표시하세요. 예를 들어, Log Explorer 및 Log Analytics 뷰에는 로그 목록과 메트릭을 대시보드로 내보내는 공유 옵션이 있습니다.

## 메트릭에 대해 자세히 알아보기 {#learn-more-about-metrics}

Datadog은 통합을 통해 인프라 및 애플리케이션에서 [메트릭][3]을 수집합니다. 수집된 메트릭은 통합 README 파일에 문서화되어 있습니다. [Metrics Explorer][4]에서 메트릭을 발견하거나 대시보드를 생성할 때 해당 메트릭이 무엇인지 알고 싶다면 통합 문서에서 찾아보세요. 

예를 들어, 메트릭 `aws.s3.first_byte_latency`의 시간 그래프를 보고 있다고 가정해 보세요. Amazon S3 Integrations README의 [Data collected][5] 섹션으로 이동하여 설명을 확인하세요. `The average per-request time from the complete request being received by a bucket to when the response starts to be returned. Shown as millisecond.`

## 위젯 추가 및 표시 방법 설정 {#add-widgets-and-refine-what-they-show}

대시보드에 추가할 메트릭을 선택했다면 다양한 [위젯 유형][6], [쿼리][7], [함수][8], [집계 방식][9]을 시도해 보면서 질문에 가장 적절한 답을 제시하는 방향으로 데이터를 표시합니다. 

템플릿 변수를 지정하면 하나의 대시보드로 여러 시나리오에 대한 질문에 답을 제시할 수 있습니다. 예를 들어, 사용자가 대시보드의 변수 드롭다운에서 선택한 데이터 센터 지역의 지연 시간 메트릭을 보여주는 시간 그래프를 만들거나, 모든 지역의 지연 시간 메트릭을 보여주는 그래프를 만들 수 있습니다. 자세한 내용은 [템플릿 변수][10]를 참조하세요.

Y축 범위, 색상, 범례를 조정하거나 마커 및 이벤트 오버레이를 추가하면 더 쉽게 식별 가능한 그래프를 만들 수 있습니다. [시계열][12] 및 [기타 위젯][6]을 사용자 지정하고 세부 조정하는 모든 방법은 [대시보드 문서][11]를 참조하세요.

이러한 기법을 자세히 알아보고 사례를 확인하고 싶다면 온라인 학습 코스 [더 나은 대시보드 구축하기][13]에 등록하세요.

## 기타 위젯 사용해 보기 {#try-out-other-widgets}

메트릭의 시계열 그래프도 유용하지만 대시보드에는 중요한 정보를 전달하기 위해 다양한 유형의 위젯을 포함할 수 있습니다. 다음을 사용해 보세요.

 - **경고값과 점검 상태**: 숫자를 큰 빨강, 노랑, 초록색으로 표시하여 작업이 순조로운지, 문제가 발생했는지 여부를 쉽게 알 수 있습니다.
 - **히트맵**: 직관적인 색상 강도 그래프를 사용하여 여러 태그에 걸쳐 복잡한 메트릭-인프라스트럭처 관계를 표시합니다.
   {{< img src="getting_started/dashboards/heatmap_widget.png" alt="히트맵 예시" >}}
 - **iFrames, 서식 있는 텍스트 및 이미지**: 대시보드 콘텐츠에 대한 설명 및 추가 리소스 제공을 위해 웹사이트와 유사한 세부 정보를 얼마든지 표시할 수 있습니다.
 - **표**: 메트릭 목록을 태그 키별로 그룹화하여 표시합니다.
 - **상위 목록**: 예를 들어 가장 용량이 적은 호스트, 가장 많은 오류가 발생하는 서비스, 404를 가장 많이 반환하는 URL 등을 표시할 수 있습니다.
 - **호스트 맵**: 호스트 통합 또는 서비스 상태를 색상별로 나타내는 등, 인프라스트럭처의 호스트를 다이어그램으로 표시합니다.
 - **서비스 수준 목표(SLO)**: SLO 위젯을 통해 목표 대비 팀 성과를 표시하고 추가 위젯을 그룹화하여 SLI 메트릭에 대한 상세 정보를 표시할 수 있습니다.
 - **분포**: 컨테이너화된 환경에서 발생하는 다양한 이벤트 수와 각 서비스의 주요 오류 개수, 웹사이트 플로우(2페이지, 3페이지, 4페이지를 연 사용자 수), 레이턴시의 백분위 버킷 등을 히스토그램으로 보여줍니다.

이러한 그래프를 설정하는 방법에 대한 자세한 정보와 예시는 [위젯][6]을 참조하세요.

## 정렬, 연결, 분석{#organize-link-and-analyze}

대시보드를 활용하여 수행하는 작업이나 대화의 흐름에 맞게 그래프 위치를 조정합니다. 위젯을 드래그 앤 드롭하여 배치합니다. 스크린보드에서는 자유 텍스트 위젯을 사용하여 제목 아래에 섹션을 구성합니다. 타임보드에서는 여러 위젯을 포함할 수 있는 그룹 위젯을 추가하고, 대시보드를 볼 때는 방해가 되지 않도록 위젯을 접어둘 수 있습니다.

대시보드가 커지면 탭을 사용하여 위젯을 이름이 지정된 섹션으로 구성합니다. 탭 막대에서 {{< ui >}}\+{{< /ui >}}을 클릭하거나({{< ui >}}Add Widgets{{< /ui >}} 옆의 드롭다운 아래에서 {{< ui >}}Add New Tab{{< /ui >}}을 클릭하여) 탭을 추가한 다음, 각 위젯의 공유 메뉴(⋮)에서 탭 간에 위젯을 이동합니다. 탭을 사용하면 관련 없는 콘텐츠를 스크롤하지 않아도 단일 대시보드에 집중하고 쉽게 탐색할 수 있습니다. 자세한 내용은 [Tabs][20]를 참조하세요.

대시보드에서 타겟 URL로 연결되는 링크를 생성하는 방법은 두 가지입니다.

 - 링크 등의 마크다운 서식 설정 텍스트를 포함할 수 있는 노트 & 링크(Notes and Links) 위젯을 추가합니다. 위젯 편집기에는 마크다운 서식 설정 팁이 안내되어 있습니다.
 - 위젯의 설정(기어) 메뉴에서 커스텀 링크를 생성합니다. 커스텀 링크는 변수와 템플릿 변수를 보간(interpolate)합니다. 따라서 사용자가 선택한 콘텐츠에 따라 링크가 달라지며, 데이터를 분석하거나 수정하기 위해 적절한 위치로 이동시킬 수 있습니다. 
     {{< img src="getting_started/dashboards/opening_custom_link.mp4" alt="커스텀 링크 열기" video=true >}}

## 다음 단계 {#whats-next}

### Datadog 사이트 외부로 대시보드 공유하기 {#share-your-dashboards-outside-of-the-datadog-site}

대시보드의 내보내기 메뉴에서 {{< ui >}}Configure Public URL{{< /ui >}}을 클릭해 큰 화면에서, 또는 Datadog 계정을 보유할 필요가 없는 사람들에게 공유할 수 있는 URL을 생성하세요. 자세한 내용은 [대시보드 공유][14]를 참조하세요.

[Slack 통합][15]을 사용해 팀과의 커뮤니케이션을 통합하여 대시보드와 기타 Datadog 기능을 가져오세요. 모니터와 인시던트 등을 Slack 채널로 가져올 수 있습니다.

### 여러 대시보드를 빠르게 만들기 {#create-multiple-dashboards-quickly}

모든 대시보드에는 설정 메뉴에서 복사하거나 내보낼 수 있는 JSON 표현이 포함되어 있습니다. 대시보드의 각 위젯에도 JSON 정의가 포함되며, 위젯 편집기(연필 아이콘)를 열고 {{< ui >}}Graph your data{{< /ui >}} 아래의 JSON 탭을 클릭하여 확인하고 편집할 수 있습니다.

모든 위젯과 대시보드가 JSON으로 표시되므로 프로그래밍 방식으로 [대시보드 API][16]를 사용해 생성할 수 있습니다. 그러므로 팀이 새로운 프로젝트를 시작하거나, 인시던트가 있을 때 또는 SLO를 규격화할 때 등 대시보드를 생성해야 할 때 유용합니다.

### Datadog 모바일 앱에서 대시보드 보기{#view-dashboards-from-the-datadog-mobile-app}

[Apple 앱 스토어][18] 및 [Google Play 스토어][19]에서 이용 가능한 [Datadog 모바일 앱][17]을 사용해 모바일 장치에서 대시보드를 봅니다. 

모바일 앱을 사용하면 Datadog 조직에서 액세스 권한이 있는 모든 대시보드를 보고 검색할 수 있으며, Datadog 웹 앱에서 사용하는 것과 동일한 템플릿 변수를 사용하여 필터링할 수 있습니다.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS 및 Android의 대시보드">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ko/metrics/introduction/
[4]: /ko/metrics/explorer/
[5]: /ko/integrations/amazon_s3/#data-collected
[6]: /ko/dashboards/widgets/
[7]: /ko/dashboards/querying/
[8]: /ko/dashboards/functions/
[9]: /ko/metrics/distributions/
[10]: /ko/dashboards/template_variables/
[11]: /ko/dashboards/
[12]: /ko/dashboards/widgets/timeseries/
[13]: https://learn.datadoghq.com/courses/building-better-dashboards/
[14]: /ko/dashboards/sharing/
[15]: /ko/integrations/slack/
[16]: /ko/api/v1/dashboards/
[17]: /ko/mobile/
[18]: https://apps.apple.com/app/datadog/id1391380318
[19]: https://play.google.com/store/apps/details?id=com.datadog.app
[20]: /ko/dashboards/configure/#tabs