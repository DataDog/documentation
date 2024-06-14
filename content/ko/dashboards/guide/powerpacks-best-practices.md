---
further_reading:
- link: /dashboards/widgets/powerpack
  tag: 설명서
  text: Powerpack 위젯
- link: https://docs.datadoghq.com/getting_started/dashboards/#add-widgets-and-refine-what-they-show
  tag: 설명서
  text: 위젯 추가 및 표시 방법 설정
- link: https://www.datadoghq.com/blog/standardize-dashboards-powerpacks-datadog/
  tag: 블로그
  text: Powerpack을 사용하여 재사용 가능 그룹에 대시보드 위젯 저장
- link: https://docs.datadoghq.com/dashboards/guide/maintain-relevant-dashboards/
  tag: 지침
  text: 관련 대시보드 유지 관리를 위한 모범 사례
kind: 지침
title: Powerpack으로 그래프 전문성 확장
---

## 개요

Powerpack은 재사용 가능한 대시보드 빌딩 블록으로, 그래프화 전문성을 확장하는 템플릿 위젯 그룹입니다. 도메인 지식 또는 조직별 표준을 캡처하고 조직 전체에서 공유할 수 있는 확장 가능한 방법을 제공합니다. Powerpack을 사용하면 대시보드 생성자가 추가 교육 없이도 기술 영역 전반의 지식을 기존 대시보드에 통합할 수 있습니다.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_powerpack.png" alt="태그 또는 속성으로 값을 구성하는 섹션을 보여주는 Datadog 애플리케이션의 설정 Powerpack 페이지, 예시 Powerpack의 여러 그래프 및 다른 팩을 볼 수 있는 오른쪽 메뉴" style="width:100%;" >}}

Powerpack은 프리셋(Datadog에서 생성) 또는 커스텀(사용자가 생성) 중 하나의 형태를 가집니다.

- 프리셋 Powerpack은 성능 메트릭 또는 기능 사용과 같은 일반적인 모니터링 패턴의 바로 사용 가능한 보기를 제공합니다. 종종 특정 제품 또는 통합(예: `RUM Page Views`')에 연결되며 Datadog에서 이를 유지 관리합니다.
- 대시보드 쓰기 권한이 있는 누구나 커스텀 Powerpack을 생성하여 사용자가 내부 모범 사례를 공유하고 표준화하도록 지원할 수 있습니다. 커스텀 Powerpack에 대한 업데이트는 모든 Powerpack 인스턴스에 동기화되므로, 여러 개의 대시보드에서 개별적으로 업데이트할 필요가 없습니다.

이 지침은 커스텀 Powerpack을 생성하고 공유하는 모범 사례를 다룹니다.

## 커스텀 Powerpack은 언제 도움이 되나요?

조직이 성장함에 따라 전문성과 소유권이 여러 팀에 쉽게 분산됩니다. Powerpack은 다음과 같은 조직에 가장 적합합니다.

- 조직 전체에서 특정 기술(예: Postgres, Kafka, Node.js) 또는 이해관계(예: 규정 준수 또는 보안)를 소유한 팀.
- 이러한 기술 또는 이해관계를 전체 스택 및 비즈니스 중심 보기에 통합하는 일을 담당하는 개별 팀.

이 소유권 모델은 팀 전체의 표준화를 촉진하고, 비즈니스의 주요 구성 요소를 모니터링하기 위한 조직적 모범 사례를 촉진하는 확장 가능한 방법을 제공합니다. 운영 메트릭과 KPI 모두와 관련하여, 기술 라인과 팀 라인에 따라 소유권을 분산하면 대기 중인 엔지니어, SRE 및 경영진과 같은 주요 이해관계자가 비즈니스 전반에 걸쳐 대시보드에서 관련 보기에 액세스하고 이를 해석할 수 있습니다.

## Powerpack 생성 모범 사례

잘 구성된 Powerpack은 모든 기존 애플리케이션 팀의 대시보드에 보안 관측성을 추가하는 등, 조직이 새로운 모니터링 패턴을 채택하는 속도를 높일 수 있습니다. 명확하고 독립적으로 구축된 Powerpack을 빌드하면 대시보드 소유자가 문제나 문의를 최소화하면서 콘텐츠를 최대한 활용할 수 있습니다.

### 자명한 콘텐츠 빌드

Powerpack 콘텐츠는 자명해야 합니다. Powerpack을 생성할 때 대시보드에 속한 다른 그룹의 컨텍스트에서도 대시보드 뷰어가 해당 팩을 해석하고 이해하는 데 필요한 컨텍스트를 포함해야 합니다. 이를 달성하기 위한 몇 가지 도구는 다음과 같습니다.

- 그래프가 표시하는 내용을 설명하는 명확하고 짧은 타이틀.
- 추가 컨텍스트가 있는 메모 위젯.
- 예상했거나 예상치 못한 기준치를 표시하는 수평 마커.

메모 위젯은 그래프를 해석하는 방법에 대한 유용한 컨텍스트를 제공할 수 있습니다. 예를 들어, `RUM Page Views` Powerpack은 현재 주의 페이지 보기를 이전 주의 페이지 보기와 비교하는 방법을 설명합니다. 메모는 `System Resource Utilization` 팩과 같은 외부 리소스에 연결할 수도 있습니다.

{{< img src="dashboards/guide/powerpacks_best_practices/note_widget_example.png" alt="실제 사용자 모니터링 데이터의 여러 그래프를 보여주는 /checkout Page Views라는 타이틀의 예시 Powerpack. 오른쪽 상단에는 그래프 중 하나에 대한 정보를 제공하는 메시지가 있는 메모 위젯이 있습니다." style="width:100%;" >}}

수평 마커 및 예측 기능과 같은 그래프상의 마커는 어떠한 값이 의미하는 바에 대한 컨텍스트를 제공할 수 있습니다. 예를 들어, `Hosts Overview` 팩은 적용된 에이전트 NTP 오프셋을 그래프에 표시합니다. 수평 마커는 그래프에서 허용 가능한 기준치를 명확하게 정의하여 뷰어가 수행해야 하는 시각적 매핑을 완화합니다.

{{< img src="dashboards/guide/powerpacks_best_practices/horizontal_marker_example.png" alt="현재 에이전트 NTP 오프셋이라는 타이틀의 선 그래프를 보여주는 호스트 개요라는 타이틀의 예시 Powerpack입니다. 해당 그래프는 값 -1과 1 사이에서 녹색으로 표시되며 이들 기준치는 각각 오프셋 -1과 오프셋 +1로 표시됩니다. 해당 그래프는 1과 3 사이 및 -1과 -3 사이에서 노란색으로 표시되며, 이들 기준치는 각각 오프셋 -3과 오프셋 +3으로 표시됩니다. +3과 -3을 초과하는 그래프 부분은 빨간색으로 표시됩니다." style="width:100%;" >}}

### Powerpack을 검색 가능하게 만들기

Powerpack은 대시보드 위젯 트레이에 나타나며, 키워드나 태그 검색을 통해 찾을 수 있습니다. Powerpack의 타이틀, 설명 및 태그는 모두 검색 가능한 필드이며, 다른 사람이 Powerpack을 찾는 가장 쉬운 방법을 제공합니다.

{{< img src="dashboards/guide/powerpacks_best_practices/powerpack_keyword_search.png" alt="키워드 리소스가 있는 대시보드의 위젯 추가 메뉴에서 수행되는 검색 예시" style="width:60%;" >}}

올바른 사용자가 Powerpack을 찾을 수 있도록 타이틀이나 설명에 사용자가 검색할 수 있는 키워드(예: "성능")를 포함하고 주요 기술에 태그를 지정하세요.

설명은 80자로 제한됩니다. 팩의 용도와 사용 방법에 대한 간략한 요약을 제공한다면 훌륭한 설명입니다. 예를 들어, `RUM Feature Usage`에 대한 "특정 앱 페이지의 UI 작업에 대한 사용 패턴 보기"는 Powerpack이 추적하는 항목, 입력값으로 예상되는 항목(특정 앱 페이지)을 설명하고, "사용량", "UI", "앱"과 같은 키워드를 포함합니다.

#### Powerpack 태그 지정

태그를 사용하여 특정 팩(예: `aws`, `k8s`, `app`)에 대한 주요 기술 또는 검색 구문을 지정합니다. 일반 스트링을 사용하여 해당 팩의 콘텐츠를 설명합니다. 태그 필드에 `key:value` 페어를 직접 입력하지는 마세요. 태그는 80자로 제한됩니다.

위젯 트레이에서 태그로 Powerpack을 검색하려면 `tag:search_string` 구문을 사용하세요.

{{< img src="dashboards/guide/powerpacks_best_practices/powerpack_tag_search.png" alt="tag:security을 사용하여 대시보드의 위젯 추가 메뉴에서 수행되는 검색 예시" style="width:60%;" >}}

### Powerpack을 맞춤 설정 가능하게 만들기

Powerpack은 각 팀이 관련 컨텍스트에 맞게 맞춤 설정할 수 있을 때 가장 유용합니다. 이를 허용하도록 설정 변수를 설정하세요.

Powerpack 생성 모들은 쿼리에 나타나는 공통 필터를 기반으로 팩에 추가할 변수를 제안합니다. 제안된 변수 위로 마우스를 가져가 영향을 받는 그래프를 확인하세요. 제안되지 않은 변수를 추가하려면 대시보드에서 직접 그래프를 수정하여 원하는 변수를 필터 또는 템플릿 변수로 사용하세요.

다른 사람들이 변수를 어떻게 사용해야 하는지 명확히 하기 위해 변수 이름을 수정합니다. 아래 예시에서 `@appsec.type`은 예상되는 입력 값을 명확히 하기 위해 `AttackType`으로 이름이 변경되었습니다.

{{< img src="dashboards/guide/powerpacks_best_practices/create_powerpack.png" alt="Create Powerpack 화면. 왼쪽을 따라 Application Security Overview로 입력된 Powerpack Title 및 Group Title, 보안 및 앱으로 설정된 Add Tags 섹션, 이름으로 입력된 AttackType을 표시하는 @appsec.type 속성을 포함하여 Add Variables 섹션에 설정된 여러 변수가 표시되어 있습니다. 그 아래에는 여러 옵션이 표시되고 @appsec.category:attack_attempt 필터가 강조 표시된, Add Common Filters as Variables가 표시된 섹션이 위치합니다. 오른쪽을 따라 위치한 여러 개의 그래프 중 3개는 왼쪽의 @appsec.category:attack_attempt 필터와 같은 색상으로 강조 표시되어 있습니다." style="width:100%;" >}}

설정 변수는 두 가지 용도로 사용됩니다. 이들을 이용해서는 다음이 가능합니다.
1. 팩이 대시보드에 추가되기 전에 팀이 Powerpack 범위를 컨텍스트에 맞게 조정할 수 있게 한 번 지원(예: 보안 Powerpack이 올바른 서비스와 관련이 있는지 확인하기 위해 하나의 `service` 선정)
2. 팩이 대시보드에 추가된 후 사용자가 Powerpack을 필터링할 수 있게 허용(예: `prod` 및 `staging` 환경 모두에서 Powerpack의 보안 신호 보기)

각 Powerpack 사용자는 동적 필터링을 허용하기 위해 대시보드에 변수를 저장할지 여부를 결정합니다. 아래 예시에서 사용자는 템플릿 변수를 통해 대시보드에서 `$Environment` 값을 변경할 수 있지만, `$Service`는 항상 `agent`로 설정됩니다.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_variables.png" alt="Add to dashboard 옵션을 제공하는 확인란을 표시하는 Tag or Attribute, Name, Value 및 Use as Template Variable 열과 함께 태그 또는 속성 변수의 값을 설정하는 옵션을 보여주는 화면. Add to dashboard 확인란은 $Environment에서 선택되고, $Service에서 선택 취소됩니다." style="width:100%;" >}}

### Powerpack 업데이트

기존 커스텀 Powerpack에 대한 변경 사항은 동일 Powerpack의 모든 인스턴스에 반영됩니다. 이렇게 하면 여러 대시보드에서 중복 콘텐츠를 업데이트하는 프로세스 작업이 간소화됩니다. 동기화된 Powerpack 인스턴스를 편집하려면 **Powerpack 레이아웃 편집**을 클릭합니다.

### 권한 허용
기본적으로 Powerpack 편집 권한은 작성자에게만 있습니다. 편집 권한은 위젯 트레이의 kebab 메뉴 또는 Powerpack 인스턴스의 헤더에서 언제든 수정할 수 있습니다.

### 안내하기

Powerpack이 생성되면 조직에 안내하세요. 팩에 대해 커뮤니케이션하면 팩을 알리고 질문에 대한 채널을 제공할 수 있습니다. 이메일 또는 메시징 플랫폼과 같은 커뮤니케이션 채널을 통해 Powerpack의 이름을 조직과 공유하고, 팩의 대상을 지정하고, 팩이 표시될 위치를 설명하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}