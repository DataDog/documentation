---
aliases:
- /ko/service_management/events/pipelines_and_processors/
description: Event Management Pipelines를 사용하여 다양한 소스의 이벤트를 프로세서로 처리하고 보강하는 방법을 알아보세요.
further_reading:
- link: /events/
  tag: 설명서
  text: Event Management
- link: /events/correlation/
  tag: 설명서
  text: 이벤트 상관관계
title: Pipelines 및 프로세서
---
## 개요 {#overview}

Datadog Event Management Pipelines를 사용하면 다양한 소스의 이벤트를 효율적으로 처리하고 관리할 수 있습니다. Pipelines를 사용하면 다양한 처리 규칙과 필터를 적용하여 이벤트 처리 방식을 사용자 지정할 수 있습니다. Pipelines를 사용하면 대량의 수신 이벤트를 구조화된 방식으로 더 쉽게 관리할 수 있습니다.

Pipelines를 사용하여 다음 작업을 수행하세요.
- **이벤트 보강**: Pipelines는 이벤트에 태그 지정, 사용자 지정 속성 추가 또는 관련 메타데이터와 이벤트의 상관관계 파악 등의 방법으로 추가 컨텍스트나 정보를 더하여 이벤트를 더 유익하고 실행 가능하게 만들 수 있습니다.
- **이벤트 태그 정규화**: 태그를 다시 매핑하여 모든 이벤트가 표준화된 태그를 갖도록 규칙을 설정할 수 있습니다.
- **메시지 및 속성을 태그로 구문 분석**: 원시 이벤트의 전체 메시지 또는 특정 속성을 구문 분석할 사용자 지정 grok 규칙을 생성합니다. 조사 중에 참조할 수 있는 추적 가능한 태그 및 속성으로 컨텍스트를 변환하세요.

Datadog Event Management Pipelines는 조직이 모니터링 프로세스를 간소화하고 운영 통찰력의 명확성을 높이며 궁극적으로 인시던트 및 경보에 더 효과적으로 대응하도록 돕습니다.

## 작동 방식 {#how-it-works}

Pipelines를 사용하면 이벤트가 프로세서를 순차적으로 거치면서 구문 분석되고 보강됩니다. 이렇게 하면 반구조화된 텍스트에서 의미 있는 정보 또는 속성이 추출됩니다. Pipelines를 통해 수신되는 각 이벤트는 모든 파이프라인 필터에 대하여 테스트됩니다. 필터와 일치하면 모든 프로세서가 순차적으로 적용된 이후에 다음 파이프라인으로 넘어갑니다.

Pipelines와 프로세서는 모든 이벤트에 적용할 수 있으며 [Event Management Pipelines][1]에서 구성할 수 있습니다.

## 파이프라인 생성 {#create-a-pipeline}

관심 있는 이벤트(예: 소스 또는 태그)로 필터링할 파이프라인을 생성하세요.

1. Datadog에서 [Event Management Pipelines][1]로 이동합니다.
1. {{< ui >}}Add a Pipeline{{< /ui >}}을 클릭합니다.
1. 드롭다운 메뉴에서 필터를 선택하거나 `</>` 아이콘을 선택하여 [Event Management Explorer][2]에서 고유한 필터 쿼리를 생성합니다. 필터를 사용하여 특정 이벤트에 파이프라인 프로세서를 적용하세요. **참고**: 파이프라인 필터링은 파이프라인의 모든 프로세서보다 먼저 적용됩니다. 파이프라인 자체에서 추출되는 속성에 대해서는 필터링할 수 없습니다.
1. 파이프라인 이름을 지정합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

## 프로세서 추가 {#add-a-processor}

파이프라인을 생성한 후 프로세서를 추가할 수 있습니다. 사용 가능한 프로세서는 다음과 같습니다.

- [집계 키 프로세서][3]
- [산술 프로세서][4]
- [날짜 리매퍼][5]
- [카테고리 프로세서][6]
- [Grok 구문 분석 도구][7]
- [조회 프로세서][8]
- [리매퍼][9]
- [서비스 리매퍼][10]
- [상태 리매퍼][11]
- [문자열 빌더 프로세서][12]
- [VRL 프로세서][14]


## 파이프라인 권한 {#pipeline-permissions}

Event Management Pipelines에 대한 액세스는 다음 두 가지 권한에 의해 제어됩니다.

- **`events_write_pipelines`**: 필터 쿼리 및 파이프라인 순서와 같은 파이프라인 속성 수정을 포함하여 파이프라인을 생성, 편집 및 삭제할 수 있습니다.
- **`events_write_processors`**: 파이프라인 내에서 프로세서를 생성, 편집 및 삭제할 수 있습니다.

관리자는 [Role Based Access Control][13]을 사용하여 이러한 권한을 역할에 할당함으로써 파이프라인 및 프로세서 구성을 수정할 수 있는 사용자를 제어할 수 있습니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/settings/pipelines
[2]: https://app.datadoghq.com/event/explorer
[3]: /ko/events/pipelines_and_processors/aggregation_key
[4]: /ko/events/pipelines_and_processors/arithmetic_processor
[5]: /ko/events/pipelines_and_processors/date_remapper
[6]: /ko/events/pipelines_and_processors/category_processor
[7]: /ko/events/pipelines_and_processors/grok_parser
[8]: /ko/events/pipelines_and_processors/lookup_processor
[9]: /ko/events/pipelines_and_processors/remapper
[10]: /ko/events/pipelines_and_processors/service_remapper
[11]: /ko/events/pipelines_and_processors/status_remapper
[12]: /ko/events/pipelines_and_processors/string_builder_processor
[13]: /ko/account_management/rbac/permissions/
[14]: /ko/events/pipelines_and_processors/vrl_processor