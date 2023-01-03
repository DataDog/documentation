---
aliases:
- /kr/getting_started/getting_started_with_tags
- /kr/guides/getting_started/tagging/
- /kr/developers/getting_started/tagging/
- /kr/tagging
- /kr/guides/tagging/
- /kr/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
description: Datadog에서 태그를 지정하고 사용하는 방법 알아보기
further_reading:
- link: /getting_started/tagging/assigning_tags/
  tag: 설명서
  text: 태그 지정 방법 알아보기
- link: /getting_started/tagging/unified_service_tagging/
  tag: 설명서
  text: 통합 서비스 태깅 설정법 알아보기
- link: /getting_started/tagging/using_tags/
  tag: 설명서
  text: 태그 사용법 알아보기
kind: 설명서
title: 태그 시작하기
---

## 개요

태그는 Datadog 원격 측정(텔레메트리)에 범위를 정해주어 Datadog 시각화 기능을 통해 압축, 집계, 비교하는 데 도움이 됩니다. [태그를 사용][1]하면 여러 호스트의 집계된 성능을 관찰하고, 필요에 따라서는 특정 요소를 기준으로 설정 범위를 더 좁힐 수도 있습니다. 즉, 태그 설정(태깅)은 집계된 데이터 포인트를 관찰하는 방법입니다.

태깅을 통해 Datadog의 다양한 데이터 유형을 바인딩하고 메트릭, 트레이스, 로그 사이에서 액션의 상관관계를 설정하거나 호출할 수 있습니다. 이러한 동작은 **전용** 태그 키로 실행합니다.

| 태그 키   | 가능한 동작                                                            |
| --------- | --------------------------------------------------------------------- |
| `host`    | 메트릭, 트레이스, 프로세스, 로그 사이의 상관관계.              |
| `device`  | 기기 또는 디스크별 메트릭, 트레이스, 프로세스, 로그의 분리. |
| `source`  | 로그 관리용 스팬(span) 필터링 및 자동 파이프라인 생성.     |
| `service` | 메트릭, 트레이스, 로그를 기준으로 특정 애플리케이션 데이터의 범위 설정. |
| `env`     | 메트릭, 트레이스, 로그를 기준으로 특정 애플리케이션 데이터의 범위 설정. |
| `version` | 메트릭, 트레이스, 로그를 기준으로 특정 애플리케이션 데이터의 범위 설정. |

Datadog는 집계 서비스 수준에서 컨테이너, 가상 머신(VM), 클라우드 인프라스트럭처에 주목하시길 권장합니다. 예를 들면 서버 A와 서버 B에서 개별적으로 CPU 사용 내역을 확인하는 대신, 서비스를 나타내는 호스트 컬렉션 전체에서 CPU 사용률을 살펴보세요.

컨테이너나 클라우드 환경에서는 규칙적으로 호스트가 교체되므로, 태그를 사용하여 메트릭을 집계하는 것이 중요합니다.

## 태그 정의하기

Datadog의 태깅 요건은 다음과 같습니다.

1. 태그는 반드시 **영문자로 시작**해야 하며, 이후 아래에 명시된 문자를 포함할 수 있습니다.

    - 영문자와 숫자
    - 밑줄 표시("_" 기호)
    - 뺄셈 표시("-" 기호)
    - 콜론(":" 기호)
    - 마침표
    - 슬래시("/" 기호)

    기타 특수문자는 밑줄 표시로 변환됩니다.

    **참조**: 태그는 콜론으로 끝날 수 없습니다. 예를 들어, `tag:` 같은 태그는 사용할 수 없습니다.

2. 태그는 **최대 200자까지** 입력할 수 있으며 유니코드를 지원합니다. 유니코드는 일본어를 비롯하여 언어 대부분의 문자를 포함합니다.
3. 태그는 소문자로 변환됩니다. 따라서 `CamelCase`(단어의 중간에 띄어쓰기나 표기 없이 대문자를 사용하는 것, '낙타대문자'라고도 합니다) 태그는 권장하지 않습니다. 인증(크롤러) 기반 통합은 낙타대문자 태그를 밑줄 표시로 변환합니다. 따라서 `TestTag`는 `test_tag`가 됩니다. **참조**: `host`와 `device` 태그는 이러한 문자 변환 대상이 아닙니다.
4. 태그는 `value` 또는 `<KEY>:<VALUE>` 양식으로 작성할 수 있습니다. 보통 사용하는 태그 키는 `env`, `instance`, `name`입니다. 키는 항상 글로벌 태그 정의의 첫 콜론보다 앞서 표기됩니다. 예를 들면 다음과 같습니다.

    | 태그                | 키           | 값          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

5. 태그는 epoch 타임스탬프, 사용자 ID, 요청 ID 등의 바인딩되지 않은 소스를 기반으로 할 수 없습니다. 이러한 소스를 바탕으로 태그를 지정하면 조직의 [메트릭 수가 무한히 증가][2]하여 빌링 시 문제가 발생합니다.
6. 소문자화 등의 제한은 메트릭 태그에만 적용되며 로그 속성이나 스팬 태그에는 적용되지 않습니다.

## 태그 지정

### 태깅 방법

태그는 다음 방법 중 하나(또는 전체)를 사용하여 지정할 수 있습니다.

| 방법                   | 태그 지정                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [설정 파일][3] | 주요 Agent 또는 통합 설정 파일에서 직접 지정합니다. |
| [UI][4]                  | Datadog 사이트에서 지정합니다.                                             |
| [API][5]                 | Datadog API를 사용할 때 지정합니다.                                        |
| [DogStatsD][6]           | DogStatsD로 메트릭을 제출할 때 지정합니다.                          |

더 자세한 정보는 [태그 할당][7] 가이드를 참조하세요.
#### 통합 서비스 태깅

Datadog에서는 태그를 할당할 때 통합 서비스 태깅을 사용하시길 모범 사례로 권장합니다. 통합 서비스 태깅은 표준 태그 3가지(`env`, `service`, `version`)를 사용하여 Datadog 원격 측정 데이터와 결합합니다. 사용자의 환경에서 통합형 태깅을 설정하는 방법을 자세히 알아보려면 [통합 서비스 태깅][8] 가이드를 참조하세요.

## 사용법

호스트와 [통합][9] 수준에서 [태그를 할당][7]한 후에는 이를 활용하여 메트릭, 트레이스, 로그를 필터링하고 그룹으로 묶을 수 있습니다. 태그는 Datadog 플랫폼의 다음 영역에서 사용됩니다.

| 영역                 | 태그 사용처                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [이벤트][10]         | 이벤트 스트림(Event Stream)을 필터링합니다.                                                                          |
| [대시보드][11]     | 그래프의 메트릭을 필터링하고 그룹으로 묶습니다.                                                               |
| [인프라스트럭처][12] | 호스트 맵, 인프라스트럭처 목록, 실시간 컨테이너, 실시간 프로세스 보기 화면을 필터링하고 그룹으로 묶습니다. |
| [모니터][13]       | 모니터 관리, 모니터 생성, 다운타임 관리를 수행합니다.                                             |
| [메트릭][14]        | 메트릭 익스플로러(Metric Explorer)를 필터링하고 그룹으로 묶습니다.                                                        |
| [통합][15]   | 선택 사항으로 AWS, Google Cloud, Azure용 메트릭을 제한합니다.                                        |
| [APM][16]            | 서비스, 트레이스, 프로필을 필터링하거나 서비스 맵의 다른 영역으로 이동합니다.           |
| [RUM & 세션 리플레이][17] | 이벤트 검색, 분석, 패턴, 리플레이, RUM 익스플로러(RUM Explorer)의 문제를 필터링합니다.        |
| [신서틱(Synthetics)][18]     | 신서틱 테스트나 CI 파이프라인에서 CI 결과 익스플로러(CI Results Explorer)를 사용해 실행된 테스트를 필터링하고 그룹으로 묶습니다.   |
| [노트북][19]      | 그래프의 메트릭을 필터링하고 그룹으로 묶습니다.                                                               |
| [로그][20]           | 로그 검색, 분석, 패턴, 라이브 테일, 파이프라인을 필터링합니다.                                |
| [SLO][21]           | SLO, 그룹화된 메트릭 기반의 SLO, 그룹화된 모니터 기반의 SLO를 검색합니다.                       |
| [개발자][22]     | API를 사용하여 정보를 얻거나 UI의 다양한 영역을 구성합니다.                                 |
| [빌링][23]        | 3개의 태그를 선택하여 Datadog 사용량을 보고합니다. 예를 들면 `env`, `team`, `account_id`를 선택할 수 있습니다. |

더 자세한 정보는 [태그 활용법][1]을 참조하시기 바랍니다.
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/getting_started/tagging/using_tags/
[2]: /kr/metrics/
[3]: /kr/getting_started/tagging/assigning_tags/#configuration-files
[4]: /kr/getting_started/tagging/assigning_tags/#ui
[5]: /kr/getting_started/tagging/assigning_tags/#api
[6]: /kr/getting_started/tagging/assigning_tags/#dogstatsd
[7]: /kr/getting_started/tagging/assigning_tags/
[8]: /kr/getting_started/tagging/unified_service_tagging
[9]: /kr/integrations/
[10]: /kr/getting_started/tagging/using_tags/#events
[11]: /kr/getting_started/tagging/using_tags/#dashboards
[12]: /kr/getting_started/tagging/using_tags/#infrastructure
[13]: /kr/getting_started/tagging/using_tags/#monitors
[14]: /kr/getting_started/tagging/using_tags/#metrics
[15]: /kr/getting_started/tagging/using_tags/#integrations
[16]: /kr/getting_started/tagging/using_tags/#apm
[17]: /kr/getting_started/tagging/using_tags/#rum--session-replay
[18]: /kr/getting_started/tagging/using_tags/#synthtics
[19]: /kr/getting_started/tagging/using_tags/#notebooks
[20]: /kr/getting_started/tagging/using_tags/#logs
[21]: /kr/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /kr/getting_started/tagging/using_tags/#developers
[23]: /kr/account_management/billing/usage_attribution/