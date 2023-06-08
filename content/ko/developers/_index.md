---
aliases:
- /ko/developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog
description: 설정과 코드 사례를 포함하는 Datadog 개발용 참조 자료
further_reading:
- link: /api
  tag: Documentation
  text: Datadog API
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: 모범 사례
  text: 우수한 통합 대시보드 생성
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: 블로그
  text: DRUIDS, Datadog를 지원하는 설계 시스템
kind: 설명서
title: 개발자
---

## 개요

개발자 섹션에는 Datadog에서 개발하기 위한 참조 자료가 포함되어 있습니다. 현재는 찾을 수 없는 데이터를 제품에서 보길 원한다면 Datadog에서 개발을 시도해 보고 싶을 수 있습니다. 해당 경우, Datadog는 이미 필요한 기술을 지원할 수 있으니 [자주 요청되는 기술](#commonly-requested-technologies) 표를 참조하여 필요한 제품이나 통합을 확인하세요.

필요한 솔루션이 진정으로 제공되지 않는다면 [Datadog 지원][1]에 문의하여 기능을 요청할 수 있습니다. 또한 이 섹션에 있는 참조 자료를 사용하여 [자체적인 솔루션 생성](#creating-your-own-solution)을 하길 원할 수 있습니다.

### 파트너 및 Datadog 마켓플레이스

또한 파트너가 되어 Datadog에서 프로그램을 빌드하여 Datadog 마켓플레이스 Datadog 커뮤니티 통합에 기여할 수 있습니다. Datadog 파트너가 되는 방법에 대한 자세한 정보는 [파트너 프로그램][2]을 참조하세요.

## 자주 요청되는 기술

Datadog에 없지만 모니터링하려는 데이터가 있는 경우 커스텀 빌드 전 다음 Datadog 제품과 통합을 고려해볼 수 있습니다.

{{< partial name="requests.html" links="요청" >}}

## 자체적인 솔루션 생성

여전히 필요한 데이터 유형이 없나요? 개발자는 Datadog에 지원되지 않는 데이터를 전송할 수 있는 여러 옵션을 보유하고 있습니다.

- [**DogStatsD**][3]는 메트릭 집계 서비스로 커스텀 메트릭, 이벤트 및 서비스 점검을 허용합니다.

- [**커스텀 점검**][4]을 통해 커스텀 애플리케이션이나 시스템에서 메트릭을 수집할 수 있습니다. [커스텀 에이전트 점검][4]은 많은 요구 사항에 적합합니다. 메트릭 처리와 같은 보다 진보된 요구 사항에는 [개방형메트릭][5] 점검 작성을 선택할 수 있습니다.

- 또한 [**통합**][6]을 통해 커스텀 애플리케이션 또는 시스템에서 메트릭, 이벤트 및 서비스 점검을 수집할 수 있습니다. 통합은 다시 사용할 수 있습니다. 통합을 개인적으로 사용할 수도 있지만 다른 개발자가 사용할 수 있도록 Datadog의 [커뮤니티 통합 리포지토리]에 기여할 공개 통합을 작성할 수도 있습니다.


### 커스텀 점검과 통합 비교

커스텀 점검과 통합의 기본적인 차이점은 통합이 Datadog의 에코시스템 일부로 재사용 가능한 구성 요소라는 점입니다. 통합은 일반적으로 개발 시간, 즉 노력이 많이 필요하므로 오픈 소스 프로젝트, 자주 사용된 소프트웨어, 애플리케이션 네트워크 등 가장 일반적인 사용 사례에 가장 적합합니다. 조직이나 팀에서 광범위하게 사용회디 않는 서비스 모니터링 등 보다 고유한 시나리오의 경우 커스텀 점검 작성이 가장 효율적인 옵션이 아닙니다.

하지만 특정 사용 사례가 파이썬(Python) wheel(`.whl`)과 같은 솔루션 게시 및 구축을 필요로 하는 경우 커스텀 점검 대신 통합을 작성할 수 있습니다. 커스텀 점검을 통해 내보낸 메트릭은 구독 플랜을 기준으로 비용과 연계되어 있습니다. 하지만 통합이 Datadog 에코시스템에 허용되면 내보내는 메트릭은 더 이상 커스텀 메트릭으로 간주되지 않으며 커스텀 메트릭 개수로 집계되지 않습니다. 이 작업이 비용에 영향을 미치는 방식에 대한 자세한 정보는 [Datadog 가격 정책][8]을 참조하세요.

**참고**: 비공개 통합에 비해 공개 통합(Datadog 에코시스템의 한 부분, `datadog-agent integration` 명령을 사용해 설치할 수 있으며 Datadog의 [통합-추가][7] 또는 [통합-핵심][9] 리포지토리에 추가될 수 있음)을 작성하는 데 더 많은 노력이 필요할 수 있습니다. 이러한 통합은 모든 `ddev validate` 단계를 통과하고, 사용 가능한 테스트를 포함하고, 코드 검토를 거쳐야 합니다. 코드 작성자인 사용자는 통합의 기본적인 유지관리자로 기능을 보장할 책임이 있습니다.

Datadog에 지원되지 않는 데이터를 전송하는 방법을 결정하려면 기본 고려 사항은 노력(개발 시간) 및 예산(커스텀 메트릭 비용)입니다. Datadog가 지원하지 않는 데이터를 확인하려 하는 경우, 데이터 전송 시작에 어느 방법이 가장 적합한지 결정하는 것으로 시작하세요.

| 유형                | 노력 | 커스텀 메트릭 | 언어 |
|---------------------|--------|----------------|----------|
| DogStatsD           | 최저 | 예            | 모두      |
| 커스텀 점검        | 낮음    | 예            | 파이썬(Python)   |
| 비공개 통합 | 중간 | 예            | 파이썬(Python)   |
| 공개 통합  | 높음   | 아니요             | 파이썬(Python)   |

Datadog 마켓플레이스나 커뮤니티 통합을 위해 개발하는 파트너의 경우 [마켓플레이스][10]와 [통합 빌드][6] 설명서로 바로 이동하세요.

### 커스텀 점검과 서비스 점검 간 차이점은 무엇인가요?

[커스텀 점검][11]은 커스텀 에이전트 점검으로도 알려져 있습니다. 이를 통해 내부 서비스 데이터를 Datadog로 전송할 수 있습니다. [서비스 점검][12]는 보다 단순하며 특정 서비스의 업 또는 다운 상태를 모니터링할 수 있도록 해줍니다. 두 항목 모두 점검이지만 각기 다른 기능을 수행하므로 모니터링 요구 사항에 따라 별도로, 아니면 함께 사용할 수 있습니다. 각각에 대한 자세한 설명은 [커스텀 점검][11] 및 [서비스 점검][12] 설명서 섹션을 참조하세요.

### 일반적인 개발자 리소스

{{< whatsnext desc="Datadog에 자체적인 메트릭 전송:" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: 설정, 데이터그램 형식, 데이터 제출 등 DogStatsD의 개요입니다.{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>커스텀 에이전트 점검</u>: 자체적인 커스텀 점검을 통해 메트릭, 이벤트, 서비스 점검을 보고하는 방법을 알아봅니다.{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>커스텀 개방형메트릭 점검</u>: 전용 커스텀 에이전트 점검을 통해 OpenMetrics를 보고하는 방법을 알아봅니다.{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>통합</u>: 복잡한 작업의 경우 공개 또는 비공개 Datadog 통합을 빌드할 수 있습니다. 공개 통합은 커뮤니티에 공유할 수 있습니다.{{< /nextlink >}}
{{< /whatsnext >}}

### 데이터 유형별 데이터 전송

{{< whatsnext desc="Datadog에 제출할 수 있는 데이터 유형과 제출 방법을 알아보세요." >}}
    {{< nextlink href="/metrics" >}}<u>커스텀 메트릭</u>: Datadog의 커스텀 메트릭을 자세히 살펴보세요. 이 섹션은 메트릭 유형, 의미, 제출 방법, Datadog에서 활용되는 방법을 설명합니다..{{< /nextlink >}}
    {{< nextlink href="service_management/events/guides/" >}}<u>이벤트</u>: 커스템 에이전트 점검, DogStatsD 또는 Datadog API를 통해 Datadog에 이벤트를 제출하는 방법을 살펴봅니다.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>서비스 점검</u>: Explore how to submit the up or down status of a specific service to Datadog에서 특정 서비스의 업 또는 다운 상태를 제출하는 방법을 살펴봅니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 커뮤니티

{{< whatsnext desc="Datadog 개발자 커뮤니티와 협력:" >}}
    {{< nextlink href="/developers/libraries" >}}<u>라이브러리</u>: 광범위한 플랫폼을 위한 Datadog API, DogStatsD 클라이언트, APM & 지속적인 프로파일러 및 외부 지원 커뮤니티 통합의 공식 및 커뮤니티 기반 라이브러리 목록입니다.{{< /nextlink >}}
    {{< nextlink href="/developers/office_hours" >}}<u>커뮤니티 운영시간</u>: 정기 Datadog 운영 시간으로 Datadog 개발에 관해 엔지니어와 직접 채팅할 수 있습니다.{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>가이드</u>: 기술적 상세 정보, 코드 사례 및 참조 설명서에 대한 유용한 글을 제공합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 기타

{{< whatsnext desc="기타 개발자 리소스:" >}}
    {{< nextlink href="/developers/integrations/marketplace_offering" >}}<u>Marketplace</u>: Datadog에 추가 서비스를 빌드하여 고객에게 마케팅하세요.{{< /nextlink >}}
    {{< nextlink href="/developers/amazon_cloudformation" >}}<u>Amazon CloudFormation</u>: 템플릿을 사용하여 즉시 사용자 환경에서 모든 AWS 리소스를 설명, 설정 및 프로지버닝합니다.{{< /nextlink >}}
{{< /whatsnext >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: https://www.datadoghq.com/partner/
[3]: /ko/developers/dogstatsd/
[4]: /ko/developers/custom_checks/write_agent_check/
[5]: /ko/developers/custom_checks/prometheus/
[6]: /ko/developers/integrations/
[7]: https://github.com/DataDog/integrations-extras
[8]: https://www.datadoghq.com/pricing/
[9]: https://github.com/DataDog/integrations-core
[10]: /ko/developers/integrations/marketplace_offering
[11]: /ko/developers/custom_checks/
[12]: /ko/developers/service_checks/