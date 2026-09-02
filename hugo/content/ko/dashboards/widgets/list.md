---
algolia:
  tags:
  - event stream
  - log stream
description: 로그, RUM, 이벤트 및 기타 소스에서 필터링 가능한 이벤트 및 이슈 목록을 대시보드 위젯에 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /notebooks/
  tag: 설명서
  text: Notebooks
- link: https://learn.datadoghq.com/courses/discovering-table-list-widgets
  tag: 학습 센터
  text: 표, 목록, SLO 및 아키텍처 위젯 목록 살펴보기
title: 목록 위젯
widget_type: list_stream
---
목록 위젯은 로그, RUM 또는 이벤트와 같은 다양한 소스에서 가져올 수 있는 이벤트 및 이슈 목록을 표시합니다. 소스 전반에서 검색 및 쿼리하여 위젯에서 강조하고 표시할 이벤트를 좁힙니다.

_Error Tracking 이슈를 표시하는 목록 위젯_

{{< img src="dashboards/widgets/list/list_overview.png" alt="오류 목록, 오류 수 및 볼륨을 표시하는 목록 위젯입니다." style="width:50%;">}}

## 설정 {#setup}

{{< img src="dashboards/widgets/list/list_setup.png" alt="목록 위젯 구성 모달" style="width:100%;">}}

### 구성 {#configuration}

1. 그래프에 표시할 데이터 유형을 선택합니다. 목록 위젯은 조직에 활성화된 제품에 따라 다양한 데이터 소스를 지원합니다. 전체 목록은 [지원되는 데이터 소스](#supported-data-sources)를 참조하세요.

2. 디스플레이 기본 설정을 지정합니다. 스크린보드 및 노트북에서 위젯에 커스텀 기간이 있는지 또는 글로벌 기간을 사용하는지를 선택하세요.

3. 선택 사항: 그래프에 타이틀을 지정합니다(또는 제안된 타이틀을 비워 둡니다).

### 지원되는 데이터 소스 {#supported-data-sources}

소스 드롭다운에서 사용할 수 있는 데이터 소스는 조직에 활성화된 제품에 따라 다릅니다. 다음 표에는 각 데이터 소스, 표시되는 데이터 및 제품 요구 사항이 목록으로 나열되어 있습니다. 사용 가능한 경우 표에서 데이터 소스를 클릭하여 해당 구성 옵션으로 이동합니다.

_(미리 보기)_로 표시된 데이터 소스는 미리 보기 상태이며 조직에서 사용하지 못할 수도 있습니다.

| 데이터 소스 | 설명 | 요구 사항 |
|-------------|-------------|--------------|
| [Audit Trail](#options) | 조직 전반의 활동을 추적하는 Audit Trail 이벤트입니다. | Audit Trail |
| [케이스](#cases) | 팀 간의 작업을 추적하고 분류하는 케이스입니다. | Case Management |
| [CD 배포](#options) _(미리 보기)_ | CD 배포 실행입니다. | CD Visibility |
| [CI 파이프라인](#ci-pipeline) | CI 파이프라인 실행입니다. | CI Pipeline Visibility |
| [CI 테스트](#options) | CI 테스트 실행입니다. | Test Optimization |
| [Data Observability](#data-observability-preview) _(미리 보기)_ | Data Observability의 데이터 세트 및 계보와 같은 데이터 자산입니다. | Data Observability |
| [Database 권장 사항](#database-recommendations-preview) _(미리 보기)_ | Database Monitoring에서 제공하는 최적화 권장 사항입니다. | Database Monitoring |
| [DDSQL 편집기](#notebook-ddsql-editor-reference-tables-and-developer-portal) | DDSQL 쿼리 결과입니다. | 없음 |
| [탐지 규칙](#detection-rules-preview) _(미리 보기)_ | 보안 탐지 규칙입니다. | Cloud SIEM 또는 Cloud Security |
| [Developer Portal](#notebook-ddsql-editor-reference-tables-and-developer-portal) _(미리 보기)_ | 서비스, API, 데이터 저장소를 포함한 소프트웨어 엔터티 보기입니다. | Internal Developer Portal |
| [Events](#events) | Events Explorer의 이벤트입니다. | 없음 |
| [Incidents](#incidents) | Incident Management의 인시던트입니다. | Incident Management |
| [인프라 리소스](#infrastructure-resources-preview) _(미리 보기)_ | 호스트 및 컨테이너와 같은 인프라 리소스입니다. | Infrastructure Monitoring |
| [이슈](#issues) | APM, 로그, RUM 및 기타 소스 전반의 Error Tracking 이슈. | Error Tracking |
| [Agent Observability](#options) | Agent Observability의 트레이스 및 스팬입니다. | Agent Observability |
| [로그](#logs) | 개별 로그 이벤트입니다. 패턴이나 트랜잭션별로 로그를 그룹화할 수도 있습니다. | Log Management |
| [Notebook](#notebook-ddsql-editor-reference-tables-and-developer-portal) | 노트북 셀의 데이터입니다. | Notebooks |
| [On-Call](#on-call) | On-Call 이벤트 및 페이지입니다. | Datadog On-Call |
| [Product Analytics](#options) _(미리 보기)_ | Product Analytics 이벤트입니다. | Product Analytics |
| [권장 사항](#recommendations) | Cloud Cost Management의 클라우드 비용 최적화 권장 사항입니다. | Cloud Cost Management |
| [Reference Tables](#notebook-ddsql-editor-reference-tables-and-developer-portal) | 참조 표의 행입니다. | Reference Tables |
| [RUM](#options) | Real User Monitoring 이벤트입니다. | Real User Monitoring |
| [보안 시그널](#options) _(미리 보기)_ | 탐지 규칙에 의해 생성된 보안 시그널입니다. | Cloud SIEM |
| [스팬](#spans-and-watchdog-alerts) | APM 스팬입니다. | APM |
| [Watchdog Alerts](#spans-and-watchdog-alerts) | Watchdog Alerts입니다. | 없음 |
| [Workload Protection Agent](#workload-protection-agent-preview) _(미리 보기)_ | Datadog Agent의 Workload Protection 이벤트입니다. | Workload Protection |

**참고:** **권장 사항** 데이터 소스는 Cloud Cost Management의 권장 사항만 표시합니다. APM 권장 사항은 목록 데이터 소스로 사용할 수 없습니다. 조직에 Cloud Cost Management가 구성되어 있지 않으면 위젯에 `Not Accessible` 메시지가 표시됩니다. 이는 권한이 부족한 것이 아니라 소스에 Cloud Cost Management가 필요함을 나타냅니다.

### 옵션 {#options}

각 데이터 소스에는 고유한 구성이 있습니다. 대부분의 데이터 소스에서 다음을 수행할 수 있습니다.

- 표시할 **열**을 선택합니다.
- **열**과 방향(오름차순 또는 내림차순)을 선택하여 목록을 정렬합니다. 사용 가능한 정렬 열은 위젯에 표시된 열입니다.
- 검색 쿼리**로 결과를 좁힙니다.**

다음 소스에는 추가 또는 다른 옵션이 있습니다.

{{% collapse-content title="케이스" level="h4" id="cases" expanded=false %}}
정렬 기준(오름차순 또는 내림차순)

- 경보 수
- 마지막 생성일
- 케이스 키
- 마지막 업데이트일
- 우선 순위
- 상태
- 할당되지 않음
{{% /collapse-content %}}

{{% collapse-content title="CI 파이프라인" level="h4" id="ci-pipeline" expanded=false %}}
파이프라인, 스테이지, 작업, 단계 또는 사용자 지정 등 표시할 **수준**을 선택하세요.
{{% /collapse-content %}}

{{% collapse-content title="Data Observability (미리 보기)" level="h4" id="data-observability-preview" expanded=false %}}
엔터티 유형(데이터베이스 표 또는 데이터베이스 열)을 선택하세요. 사용 가능한 열 및 정렬 옵션은 엔터티 유형에 따라 다릅니다.
{{% /collapse-content %}}

{{% collapse-content title="데이터베이스 권장 사항(미리 보기)" level="h4" id="database-recommendations-preview" expanded=false %}}
정렬 기준(오름차순 또는 내림차순)

- 심각도
- 유형
- 가장 먼저 확인됨
- 마지막으로 확인됨
{{% /collapse-content %}}

{{% collapse-content title="탐지 규칙(미리 보기)" level="h4" id="detection-rules-preview" expanded=false %}}
정렬 가능한 열에는 이름, 생성 날짜, 마지막 업데이트 날짜, 활성화 여부, 심각도 및 소스가 포함됩니다. 규칙 제품을 선택하여 표시되는 규칙을 필터링할 수도 있습니다.
{{% /collapse-content %}}

{{% collapse-content title="이벤트" level="h4" id="events" expanded=false %}}
보고 형식 크기

- 작게(타이틀만)(기본값)
- 크게(전체 이벤트)
{{% /collapse-content %}}

{{% collapse-content title="인시던트" level="h4" id="incidents" expanded=false %}}
정렬 기준(오름차순 또는 내림차순)

- 생성됨
- 탐지됨
- 수정됨
- 해결됨
- 심각도
- 상태
- 타이틀
{{% /collapse-content %}}

{{% collapse-content title="인프라 리소스(미리 보기)" level="h4" id="infrastructure-resources-preview" expanded=false %}}
Pod, 컨테이너, 배포, 서비스 또는 노드와 같이 표시할 **리소스 유형**을 선택하세요. 사용 가능한 열 및 정렬 옵션은 리소스 유형에 따라 다릅니다.
{{% /collapse-content %}}

{{% collapse-content title="이슈" level="h4" id="issues" expanded=false %}}
정렬 기준

- 관련성(기본값)
- 카운트
- 최신순
- 영향을 받는 세션(RUM 이슈만 해당)

사용 가능한 열은 이슈 소스(로그, APM 또는 RUM)에 따라 다릅니다.

**참고:** 정렬 선택을 변경해도 표시되는 열은 변경되지 않습니다. 영향을 받는 세션별로 정렬하고 위젯에서 확인하려면 그래프 편집기에서 '영향을 받는 세션' 열도 추가해야 합니다.
{{% /collapse-content %}}

{{% collapse-content title="로그" level="h4" id="logs" expanded=false %}}
그룹 기준

- 패턴
- 트랜잭션

로그 구성에 따라 표준 인덱스, 표준 인덱스 + Flex Logs 또는 온라인 아카이브와 같은 저장 위치를 선택할 수도 있습니다.

메시지 열의 경우 표시할 줄 수(1, 3 또는 10)를 선택할 수 있습니다.
{{% /collapse-content %}}

{{% collapse-content title="Notebook, DDSQL 편집기, Reference Tables 및 개발자 포털" level="h4" id="notebook-ddsql-editor-reference-tables-and-developer-portal" expanded=false %}}
이러한 데이터 소스는 저장된 데이터 세트나 표의 행을 표시합니다.

- **Notebook** 및 **DDSQL 편집기**: 게시된 데이터 세트를 선택합니다.
- **Reference Tables**: 참조 표를 선택합니다.
- **개발자 포털**: 서비스, API 또는 데이터 저장소와 같은 소프트웨어 엔터티 표를 선택합니다.

이러한 데이터 소스의 경우 다음을 수행할 수 있습니다.

- **첫 번째 표시**를 설정하여 행 수(10, 25, 50, 100, 500, 1000 또는 사용자 지정 값)를 제한합니다.
- **모든 열 표시**를 전환하거나 최대 12개의 열을 선택하여 표시합니다.
- 열의 정렬 아이콘을 클릭하여 정렬합니다.
- 검색 쿼리로 행을 필터링합니다.
{{% /collapse-content %}}

{{% collapse-content title="On-Call" level="h4" id="on-call" expanded=false %}}
**팀**을 선택하고 선택적으로 **태그**를 추가하여 표시되는 이벤트를 필터링합니다.
{{% /collapse-content %}}

{{% collapse-content title="권장 사항" level="h4" id="recommendations" expanded=false %}}
권장 사항 데이터 소스의 열은 고정되어 있으며 사용자 지정할 수 없습니다.
{{% /collapse-content %}}

{{% collapse-content title="스팬 및 Watchdog Alerts" level="h4" id="spans-and-watchdog-alerts" expanded=false %}}
이 데이터 소스는 검색 쿼리를 지원하지만 정렬 옵션은 제공하지 않습니다. Watchdog Alerts는 고정된 필드 세트를 표시합니다.
{{% /collapse-content %}}

{{% collapse-content title="Workload Protection Agent(미리 보기)" level="h4" id="workload-protection-agent-preview" expanded=false %}}
콘텐츠 열의 경우 표시할 줄 수(1, 3 또는 10)를 선택할 수 있습니다.
{{% /collapse-content %}}

## API {#api}

이 위젯은 **[Dashboards API][1]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][2]는 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/