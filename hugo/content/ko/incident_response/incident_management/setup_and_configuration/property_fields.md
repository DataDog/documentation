---
aliases:
- /ko/service_management/incident_management/incident_settings/property_fields/
- /ko/incident_response/incident_management/incident_settings/property_fields
title: 속성 필드
---
## 개요 {#overview}

사용자 지정 속성 필드를 사용하면 자동차 산업의 특정 제품 모델이나 소프트웨어 배포의 고유 코드와 같이 조직에 고유한 중요한 속성을 캡처할 수 있습니다. 이러한 속성은 인시던트를 효율적으로 분류하는 데 도움이 됩니다.

사용자 지정 필드를 사용하여 [Incident Management][2] 페이지 및 [Incident Management Analytics][3]에서 특정 인시던트 하위 집합을 필터링할 수 있습니다. [인시던트 알림 규칙][9]에서 사용자 지정 필드를 기준으로 조건을 구성할 수도 있습니다.

## 필드 섹션 {#field-sections}

속성 필드는 Incident Details 페이지의 [Overview 탭][1]에서 필드가 표시되는 위치에 따라 세 개의 표로 구성됩니다.

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

드래그 핸들 아이콘을 사용하여 속성 필드를 드래그하면 이동하거나 순서를 변경할 수 있습니다.

## 기본 필드 {#default-fields}

5개의 기본 필드가 있습니다.

| 필드                   | 설명 |
| ----------------------   | ----------- |
|**탐지 방법** | 이 인시던트가 어떻게 선언되었는지에 대한 컨텍스트를 추가합니다.||
|**요약**               | 이 인시던트의 원인이 된 상황에 대한 세부 정보를 제공합니다.||
|**근본 원인**       | 가능한 근본 원인 또는 조사 영역을 나열합니다.||
|**서비스**              | [Datadog APM][4]이 구성된 경우 `Services` 속성 필드는 APM 서비스 이름을 자동으로 사용합니다. |
|**팀**                 |  `Teams` 속성 필드는 조직에 정의된 [팀][5]의 값으로 자동으로 채워집니다. |

**참고**: 기본 필드는 삭제할 수 없습니다.

### 필드 유형 {#field-types}

다음 필드 유형 중 하나를 사용하여 새 필드를 정의할 수 있습니다.

**단일 선택**
: 하나의 값을 허용하는 드롭다운입니다. 필드를 정의할 때 사용 가능한 값을 설정합니다.

**Multi Select**
: 여러 값을 허용하는 드롭다운입니다. 필드를 정의할 때 사용 가능한 값을 설정합니다.

**텍스트 배열**
: 여러 값을 허용하는 자유 형식 필드입니다. 인시던트 대응자는 인시던트에서 필드를 설정할 때 임의의 값을 설정합니다.

**텍스트 영역**
: 단일 값을 허용하는 자유 형식 텍스트 상자입니다. 인시던트 대응자는 인시던트에서 필드를 설정할 때 임의의 값을 설정합니다.

**메트릭 태그**
: 여러 값을 허용하는 드롭다운입니다. 필드를 정의할 때 선택한 메트릭 태그의 수집된 값 중 하나 이상을 선택하도록 인시던트 대응자에게 안내합니다.

**숫자**
: 모든 정수 또는 십진수를 허용합니다.

**날짜/시간**
: 모든 날짜/시간을 허용합니다. 값은 UTC로 저장되며 사용자의 현지 시간대를 기준으로 구문 분석되고 형식이 지정됩니다.

### 필드 이름 {#field-names}

필드 이름은 [검색 및 분석 쿼리][12], [워크플로 자동화][13] 및 API에서 사용되는 스네이크 케이스 식별자입니다. 표시 이름은 [인시던트 개요 페이지][1], [인시던트 타임라인][10] 및 [인시던트 선언 모달][11]에서 필드가 표시되는 방식을 결정하는 사용자 친화적인 레이블입니다.

### 선언 시 필수{#required-at-declaration}

필드를 '선언 시 필수'로 표시하면 사용자가 인시던트를 선언할 때 값을 입력해야 합니다. 이 옵션은 Datadog 워크플로 자동화나 API 요청에는 영향을 주지 않습니다.

### 사용자에게 메시지 표시 {#prompt-user}

Incident Management를 구성하여 인시던트 상태를 변경할 때 대응자에게 특정 필드를 설정하라는 메시지를 표시할 수 있습니다.

**선언 중**: 선언 중에 대응자에게 필드 값을 입력하라는 메시지를 표시하려면 필드의 'Prompt user' 옵션을 편집하세요.

**인시던트가 Stable/Resolved/Completed로 이동할 때**: 인시던트가 특정 상태로 이동할 때 사용자에게 필드 값을 입력하라는 메시지를 표시하려면 [전환 양식][14]을 사용하세요.

### 검색 및 분석의 사용자 지정 필드 {#custom-fields-in-search-and-analytics}

Single-Select, Multi-Select, Text Array, Number 및 Datetime 필드는 [Incident Homepage][2]와 [Incident Management Analytics][3]에서 검색 가능한 패싯으로 사용됩니다.

Incident Management Analytics에서 숫자 필드는 [Dashboards][7] 및 [Notebooks][8]에서 그래프로 표시하고 시각화할 수 있는 측정값으로 나타납니다.

[1]: /ko/incident_response/incident_management/investigate#overview-tab
[2]: https://app.datadoghq.com/incidents
[3]: /ko/incident_response/incident_management/analytics
[4]: /ko/tracing/
[5]: /ko/account_management/teams/
[6]: /ko/getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /ko/dashboards/
[8]: /ko/notebooks/
[9]: /ko/incident_response/incident_management/setup_and_configuration/notification_rules
[10]: /ko/incident_response/incident_management/investigate/timeline
[11]: /ko/incident_response/incident_management/investigate/declare
[12]: /ko/incident_response/incident_management/setup_and_configuration/property_fields/#custom-fields-in-search-and-analytics
[13]: /ko/actions/workflows/
[14]: /ko/incident_response/incident_management/setup_and_configuration/transition_forms