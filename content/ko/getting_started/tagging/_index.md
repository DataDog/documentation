---
algolia:
  tags:
  - tagging
aliases:
- /ko/getting_started/getting_started_with_tags
- /ko/guides/getting_started/tagging/
- /ko/developers/getting_started/tagging/
- /ko/tagging
- /ko/guides/tagging/
- /ko/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
description: Datadog에서 태그를 할당하고 사용하는 방법 알아보기
further_reading:
- link: /getting_started/tagging/assigning_tags/
  tag: 설명서
  text: 태그 할당 방법 알아보기
- link: /getting_started/tagging/unified_service_tagging/
  tag: 설명서
  text: unified service tagging 구성 방법 알아보기
- link: /getting_started/tagging/using_tags/
  tag: 설명서
  text: 태그 사용법 알아보기
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 인터랙티브 세션에 참여하여 Datadog을 통한 효과적인 태그 지정에 대해 알아보세요.
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: 블로그
  text: Datadog으로 효과적인 임원 대시보드 설계
- link: https://learn.datadoghq.com/courses/tagging-best-practices
  tag: 학습 센터
  text: 태깅 모범 사례
title: 태그 시작하기
---
## 개요 {#overview}

태그는 Datadog 텔레메트리에 디멘션을 추가하여 Datadog 시각화에서 필터링, 집계, 비교할 수 있게 하는 방법입니다. [태그를 사용][1]하면 여러 호스트의 집계 성능을 관찰하고 (선택적으로) 특정 요소에 따라 설정을 더 좁힐 수 있습니다. 간단히 말해, 태깅은 집계 데이터 포인트를 관측하는 방법입니다.

태그는 `<key>:<value>` 또는 `<value>` 형식으로 지정할 수 있습니다. Datadog에서는 `<key>:<value>` 형식 사용을 권장합니다. 이 형식이 의미론적으로 더 명확하고, 강력한 쿼리 기능을 사용할 수 있기 때문입니다(예를 들어 키 기준으로 그룹화). `<key>:<value>` 쌍을 사용하는 경우:

- 태그 **키**가 식별자입니다. 일반적으로 사용되는 태그 키는 `env`, `instance`, `name`입니다.
- 태그 **값**은 키와 연결된 특정 데이터 또는 정보입니다. 태그 값은 리소스별로 고유하지 않으며, `<key>:<value>` 쌍의 여러 리소스에서 사용할 수 있습니다.

태깅은 Datadog에서 다양한 데이터 유형을 바인딩하여 메트릭, 트레이스, 로그 간의 상관관계와 CTA(calls to action)를 허용합니다. 이렇게 하려면 **예약된** 태그 키를 사용하면 됩니다.
| 태그 키   | 가능한 동작                                                             |
|-----------|------------------------------------------------------------------------|
| `host`    | 메트릭, 트레이스, 프로세스, 로그 사이의 상관관계.              |
| `device`  | 메트릭, 트레이스, 프로세스 및 로그를 장치 또는 디스크별로 분리. |
| `source`  | Log Management를 위한 스팬 필터링 및 자동 파이프라인 생성.     |
| `service` | 메트릭, 트레이스, 로그 전반의 애플리케이션별 데이터 범위 지정. |
| `env`     | 메트릭, 트레이스, 로그 전반의 애플리케이션별 데이터 범위 지정. |
| `version` | 메트릭, 트레이스, 로그 전반의 애플리케이션별 데이터 범위 지정. |
| `team`    | 리소스에 소유권 할당.                                  |

Datadog에서는 집계 중인 `service` 수준에서 컨테이너, VM 및 클라우드 인프라를 살펴볼 것을 권장합니다. 예를 들어 서버 A 또는 서버 B의 CPU 사용량을 따로 확인하는 것이 아니라 서비스를 나타내는 호스트 컬렉션 전체의 CPU 사용량을 살펴봅니다.

컨테이너나 클라우드 환경에서는 규칙적으로 호스트가 교체되므로, 태그를 사용하여 메트릭을 집계하는 것이 중요합니다.

## 태그 정의하기 {#define-tags}

태그 문자열(즉 `<key>:<value>` 또는 `<value>`의 전체 내용)은 다음 요구 사항을 충족해야 합니다.

- 태그 문자열은 **문자로 시작해야 합니다**(이것은 태그가 `<key>:<value>` 또는 `<value>` 형식 중 어느 것을 사용하든 관계없이 적용됨). 선행 문자 뒤에 오는 태그 문자열에는 아래 목록에 나열된 문자를 포함할 수 있습니다.

    - 문자(모든 유니코드 문자가 지원됨 - 예: a, ó, 気, 녕, ك, ดี)
    - 숫자
    - 밑줄(선행 및 후행 밑줄이 제거되고, 연속된 밑줄은 한 개로 축소됨)
    - 음의 부호
    - 콜론
    - 마침표
    - 포워드 슬래시
    - (기호(`@`)에서 [HTTP를 통해 수집된][28] 로그에 대한 태그에만 해당)

    다른 모든 문자(쉼표, 이모지, 백슬래시, 공백 포함)는 밑줄로 변환됩니다.
    
    **참고**:
    - 숫자로 시작하는 태그는 Agent 수준에서 설정된 `env` 태그와 같이 일부 컨텍스트에서 수용될 수 있습니다. 단, 표준 명명 규칙을 따르지 않는 태그는 모든 Datadog 제품에서 일관되게 작동하지 않을 수 있고, 태그 카디널리티를 증가시킬 수 있습니다. 특정 제품에서 달리 명시적으로 지원하지 않는 경우, 태그는 문자로 시작하세요.
    - `DD_TAGS` 환경 변수는 태그 간 구분 기호로 공백을 사용합니다. `DD_TAGS` 값의 공백은 밑줄로 변환되지 **않습니다**. 예를 들어 `DD_TAGS="test:this is a test"`를 사용하면 `test:this`, `is`, `a`, `test`의 네 가지 태그를 생성합니다. 공백을 포함하는 태그 값을 설정하려면 YAML 구성 파일 또는 통합 어노테이션을 사용하세요. 여기에서는 공백이 밑줄로 변환됩니다.

- 태그의 길이는 **최대 200자**까지 가능합니다. 태그의 형식이 `<key>:<value>`인 경우, 키, `:`, 값이 모두 글자 수 한도에 포함됩니다.
- [스팬 태그][26] 및 메트릭 태그는 소문자로 정규화되므로, 태그 키에 카멜 케이스를 사용하지 않는 것이 좋습니다. 클라우드 제공업체는 카멜 케이스를 일관성 없이 정규화합니다. 예를 들어 AWS는 `TestTag`를 `testtag`로 변환하지만, Alibaba Cloud는 `TestTag`를 `test_tag`로 변환합니다.
    - 이와는 달리 [스팬 속성][27] 및 로그 속성은 대소문자를 구분하며 정규화되지 않습니다.
- 형식 `<key>:<value>`를 사용하는 경우, 키가 항상 전역 태그 정의의 첫 번째 콜론보다 앞에 옵니다. 예:
    
    | 태그                | 키          | 값          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

- 태그는 Epoch 타임스탬프, 사용자 ID 또는 요청 ID와 같이 바인딩되지 않은 소스가 출처이면 안 됩니다. 이렇게 하면 [메트릭][2] 수가 무한히 증가할 수 있습니다.


## 태그 할당{#assign-tags}

### 태깅 방법 {#tagging-methods}

태그는 다음 방법 중 하나(또는 전체)를 사용하여 지정할 수 있습니다.

| 방법                   | 태그 할당                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [구성 파일][3] | 메인 Agent 또는 통합 구성 파일에서 수동으로. |
| [UI][4]                  | Datadog 사이트에서.                                             |
| [API][5]                 | Datadog의 API를 사용할 때.                                        |
| [DogStatsD][6]           | DogStatsD로 메트릭을 제출할 때.                          |

더 자세한 정보는 [태그 할당][7] 가이드를 참조하세요.

#### Unified service tagging {#unified-service-tagging}

Datadog에서는 태그를 할당할 때 unified service tagging을 사용하는 것을 모범 사례로 권장합니다. Unified service tagging은 Datadog `env`, `service`, `version`의 세 가지 표준 태그를 사용하여 Datadog 텔레메트리를 연결합니다. unified tagging으로 환경을 구성하는 방법은 [Unified Service Tagging][8]을 참조하세요.

### 태그 상속 {#tag-inheritance}

모든 메트릭, 로그, 트레이스, 통합은 데이터가 Datadog으로 수집되면서 `host-tag` 상속 프로세스를 거치게 됩니다. 데이터가 주어진 호스트 이름과 연결되어 있기 때문에, 그러한 구성 요소는 해당 호스트와 연결된 모든 `host-level` 태그를 상속합니다. 이러한 태그는 주어진 호스트의 [인프라 목록][12]에 표시되며, 출처는 클라우드 제공업체일 수도 있고 Datadog Agent일 수도 있습니다. 자세한 내용은 [새 호스트 또는 노드에서 `host-level` 태그 누락][25]을 참조하세요.

태그는 여러 소스에서 상속될 수 있으므로, 여러 소스에서 중복되지 않도록 방지하려면 고유하고 구체적인 키 이름을 선택해야 합니다. 예를 들어 호스트(`service:my-host`)에서 `service` 키를 설정했고 해당 호스트에서 실행되는 포드(`service:my-service`)에서는 `service` 키를 설정한 경우, 데이터가 두 태그를 모두 상속합니다. 중복되는 태그 키를 피하려면 좀 더 차별화된 키 이름(예: `infra_service`)을 선택하세요.

### 태그 우선순위 {#tag-precedence}

Datadog Agent는 다른 소스에서 설정된 태그에 우선순위 순서를 강제로 적용하지 **않습니다**. 대신 Agent는 사용 가능한 모든 소스에서 모든 태그를 수집하고, 주어진 태그 키에 대한 각각의 고유한 값을 저장하고, 텔레메트리를 사용해 모든 태그를 내보냅니다.

다시 말해 태그 키 한 개라도 여러 소스에서 다르게 구성된 경우 값이 여러 개일 수 있습니다. 예를 들어 `service` 태그가 환경 변수에서는 `payments`, Agent YMAL에서는 `checkout`, 트레이싱 클라이언트 구성에서는 `orders`로 설정된 경우 해당 서비스의 텔레메트리에는 다음이 포함됩니다.

```
service:payments
service:checkout
service:orders
```

다운스트림 필터 또는 대시보드는 사용자가 값을 하나만 예상하는 경우, 원하는 값에 대하여 명시적으로 필터링해야 합니다.

## 사용량 {#usage}

호스트 및 [통합][9] 수준에서 [태그를 할당][7]한 뒤에는 이를 활용하여 메트릭, 트레이스, 로그를 필터링하고 그룹화하세요. 태그가 사용되는 Datadog 플랫폼의 영역은 다음과 같습니다.

| 영역                 | 태그 사용처                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [이벤트][10]         | 이벤트 스트림을 필터링합니다.                                                                          |
| [대시보드][11]     | 그래프의 메트릭을 필터링하고 그룹으로 묶습니다.                                                               |
| [인프라][12] | 호스트 맵, 인프라스트럭처 목록, 실시간 컨테이너, 실시간 프로세스 조회 화면을 필터링하고 그룹으로 묶습니다. |
| [모니터][13]       | 모니터를 관리하고 모니터를 생성하거나 가동 중지를 관리합니다.                                             |
| [메트릭][14]        | Metric Explorer를 사용하여 필터링 및 그룹화합니다.                                                        |
| [Integrations][15]   | AWS, Google Cloud, Azure 메트릭을 제한합니다(선택 사항).                                        |
| [APM][16]            | 서비스, 트레이스, 프로필을 필터링하거나 Service Map의 다른 영역으로 이동합니다.           |
| [RUM 및 세션 리플레이][17] | 이벤트 검색, 분석, 패턴, 리플레이 및 RUM Explorer 문제를 필터링합니다.        |
| [Synthetic Monitoring 및 Continuous Testing][18]     | Synthetic Monitoring 및 Testing Results Explorer를 사용하여 Synthetic 테스트 또는 CI 파이프라인의 테스트 실행을 필터링하고 그룹화합니다.   |
| [Notebooks][19]      | 그래프의 메트릭을 필터링하고 그룹으로 묶습니다.                                                               |
| [로그][20]           | 로그 검색, 분석, 패턴, 실시간 테일링, 파이프라인을 필터링합니다.                                |
| [SLO][21]           | SLO, 그룹화된 메트릭 기반의 SLO, 그룹화된 모니터 기반의 SLO를 검색합니다.                       |
| [개발자][22]     | API를 사용하여 정보를 얻거나 UI의 다양한 영역을 구성합니다.                                |
| [청구][23]        | 최대 3개의 태그를 사용하여 Datadog 사용량을 보고합니다(예: `env`, `team`, `account_id`). |
| [CI Visibility][24]  | CI Visibility Explorer를 사용하여 테스트 실행 또는 파이프라인 실행을 필터링하고 그룹화합니다. |

더 자세한 정보는 [태그 활용법][1]을 참조하시기 바랍니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/using_tags/
[2]: /ko/metrics/
[3]: /ko/getting_started/tagging/assigning_tags/#configuration-files
[4]: /ko/getting_started/tagging/assigning_tags/#ui
[5]: /ko/getting_started/tagging/assigning_tags/#api
[6]: /ko/getting_started/tagging/assigning_tags/#dogstatsd
[7]: /ko/getting_started/tagging/assigning_tags/
[8]: /ko/getting_started/tagging/unified_service_tagging
[9]: /ko/integrations/
[10]: /ko/getting_started/tagging/using_tags/#events
[11]: /ko/getting_started/tagging/using_tags/#dashboards
[12]: /ko/getting_started/tagging/using_tags/#infrastructure
[13]: /ko/getting_started/tagging/using_tags/#monitors
[14]: /ko/getting_started/tagging/using_tags/#metrics
[15]: /ko/getting_started/tagging/using_tags/#integrations
[16]: /ko/getting_started/tagging/using_tags/#apm
[17]: /ko/getting_started/tagging/using_tags/#rum--session-replay
[18]: /ko/getting_started/tagging/using_tags/#synthtics
[19]: /ko/getting_started/tagging/using_tags/#notebooks
[20]: /ko/getting_started/tagging/using_tags/#logs
[21]: /ko/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /ko/getting_started/tagging/using_tags/#developers
[23]: /ko/account_management/billing/usage_attribution/
[24]: /ko/getting_started/tagging/using_tags/#ci-visibility
[25]: /ko/containers/troubleshooting/log-collection?tab=datadogoperator#missing-host-level-tags-on-new-hosts-or-nodes
[26]: /ko/tracing/trace_collection/tracing_naming_convention/#span-tags
[27]: /ko/tracing/trace_collection/tracing_naming_convention/#span-attributes
[28]: /ko/api/latest/logs/#send-logs