---
aliases:
- /ko/developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog
cascade:
  algolia:
    rank: 70
description: Datadog에서 통합을 개발하는 방법에 대해 알아봅니다.
further_reading:
- link: /api/latest/
  tag: Documentation
  text: Datadog API에 대해 알아보기
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: 모범 사례
  text: 뛰어난 통합 대시보드 생성
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: 블로그
  text: DRUIDS, Datadog를 지원하는 설계 시스템
- link: https://www.datadoghq.com/blog/introducing-open-source-hub/
  tag: 블로그
  text: Datadog Open Source Hub 소개
kind: 설명서
title: 개발자
---

## 개요

개발자 섹션에는 Datadog에서 개발하기 위한 참조 자료가 포함되어 있습니다. 제품에 표시되지 않는 데이터가 있어 Datadog에서 개발하기 원할 수 있으나 Datadog에서 이미 필요한 기술을 지원하고 있을 수 있습니다. 일반적으로 요청되는 기술](#commonly-requested-technologies) 표를 참조하여 요구 사항을 충족할 수 있는 제품 또는 통합을 찾아보세요.

## 자주 요청되는 기술

Datadog에 없지만 모니터링하려는 데이터가 있는 경우 사용자 정의에 따라 빌드하기 전에 다음 Datadog 제품과 통합을 고려해 보세요.

{{< partial name="requests.html" links="requests" >}}

필요한 솔루션이 제공되지 않는다면 [Datadog 고객지원팀][1]에 문의하여 기능을 요청할 수 있습니다. 또한 이 섹션에 있는 참고 자료를 활용하여 [자체 솔루션 만들기](#creating-your-own-solution)를 진행해 보는 것도 가능합니다.

### 파트너 및 Datadog 마켓플레이스

또한 Datadog을 기반으로 구축하여 [Datadog 마켓플레이스][10] 또는 Datadog 커뮤니티 [통합][6]에 기여하는 파트너가 될 수도 있습니다.

{{< whatsnext desc="오퍼링을 개발하려면 해당 설명서를 참조하세요:" >}}
    {{< nextlink href="/developers/integrations/agent_integration" >}}Agent 기반 통합 생성{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/api_integration" >}}API 통합 생성{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/log_integration" >}}로그 통합 생성{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/marketplace_offering" >}}마켓플레이스 오퍼링 구축{{< /nextlink >}}
{{< /whatsnext >}}

Datadog 파트너가 되기 위한 자세한 정보는 [Datadog 파트너 네트워크][2]를 참조하세요.

## 자체 솔루션 생성

여전히 필요한 데이터 유형이 없나요? 개발자는 지원되지 않는 데이터를 Datadog에 전송할 수 있는 여러 옵션을 보유하고 있습니다.

- [**DogStatsD**][3]는 메트릭 집계 서비스로 커스텀 메트릭, 이벤트 및 서비스 검사를 허용합니다.

- [**커스텀 검사**][4]를 통해 커스텀 애플리케이션이나 시스템에서 메트릭을 수집할 수 있습니다. [커스텀 에이전트 검사][4]는 많은 요구 사항에 적합합니다. 메트릭 처리와 같은 고급 요구 사항에는 [OpenMetrics][5] 검사 작성을 선택할 수 있습니다.

- 또한 [**통합**][6]을 통해 커스텀 애플리케이션 또는 시스템에서 메트릭, 이벤트 및 서비스 검사를 수집할 수 있습니다. 통합은 다시 사용할 수 있습니다. 통합을 비공개로 유지하거나 다른 개발자가 사용할 수 있도록 Datadog의 [커뮤니티 통합 리포지토리][7]에 기여하는 공개 통합을 작성할 수 있습니다.


### 커스텀 검사와 통합 비교

커스텀 검사와 통합의 주요 차이점은 통합이 Datadog 생태계의 일부가 될 수 있는 재사용 가능한 구성 요소라는 것입니다. 일반적으로 더 많은 노력(개발 시간)이 필요하며 애플리케이션 프레임워크, 오픈 소스 프로젝트 또는 일반적으로 사용되는 소프트웨어와 같은 일반적인 사용 사례에 가장 적합합니다. 팀이나 조직 외부에서 널리 사용되지 않는 모니터링 서비스와 같은 특정 시나리오의 경우 커스텀 검사를 작성하는 것이 가장 효율적인 옵션일 수 있습니다.

그러나 특정 사용 사례에서 솔루션을 Python 휠(`.whl`)로 게시 및 배포해야 하는 경우 커스텀 검사 대신 통합을 작성하도록 선택할 수 있습니다. 커스텀 검사를 통해 방출되는 메트릭은 커스텀 메트릭으로 간주되며, 구독 플랜에 따라 비용이 발생합니다. 그러나 통합이 Datadog 에코시스템에 승인되면, 통합이 내보내는 메트릭은 더 이상 커스텀 메트릭으로 간주되지 않으며 커스텀 메트릭 수에 포함되지 않습니다. 이것이 비용에 어떤 영향을 미칠 수 있는지에 대한 자세한 내용은 [Datadog 가격][8]을 참조하세요.

### 통합을 어떻게 생성하나요?

공개 통합(즉, Datadog 에코시스템의 일부이고, `datadog-agent integration` 명령으로 설치할 수 있으며, Datadog의 [통합-엑스트라][7] 또는 [통합-코어][9] 리포지토리에 허용되는 통합)을 작성하려면 비공개 통합보다 더 많은 작업이 필요합니다. 이러한 통합은 모든 `ddev validate` 단계를 통과해야 하고, 사용 가능한 테스트가 있어야 하며, 코드 검토를 받아야 합니다. 코드 작성자는 통합에 대한 전담 관리자로서 통합의 기능을 보장할 책임이 있습니다.

초기 목표는 신뢰할 수 있는 방법으로 원하는 메트릭을 수집하는 일부 코드를 생성하고 일반 통합 프레임워크가 제대로 작동하는지 확인하는 것입니다. 먼저 커스텀 검사로 기본 기능을 작성하여 [Agent 통합 생성][13]에서 프레임워크 세부 정보를 입력합니다.

다음으로 [`integrations-extras` 리포지토리][7]에 대한 풀 리퀘스트를 열어 코드를 같이 검토할 준비가 되었음을 Datadog에 알립니다. 테스트, Datadog 내부 자료 또는 기타 주제에 대해 궁금한 점이 있으시다면—Datadog 에코시스템 팀이 도와드리겠습니다. 해당 풀 리퀘스트를 통해 궁금하신 점을 해결하세요.

기능, 프레임워크 규정 준수 및 일반 코드 품질에 대한 검증이 완료되면 이 통합은 Datadog 에코시스템의 일부인 `integrations-extras`로 통합됩니다.

Datadog에 지원되지 않는 데이터를 전송하는 방법을 결정하려면 기본 고려 사항은 노력(개발 시간) 및 예산(커스텀 메트릭 비용)입니다. Datadog이 지원하지 않는 데이터를 확인하려 하는 경우, 데이터 전송 시 어느 방법이 가장 적합한지 결정하는 것부터 시작하세요.

| 유형                | 작업 강도 | 커스텀 메트릭 | 언어 |
|---------------------|--------|----------------|----------|
| DogStatsD           | 최저 | 네            | 모두      |
| 커스텀 검사        | 낮음    | 네            | Python   |
| 비공개 통합 | 중간 | 네            | Python   |
| 공개 통합  | 높음   | 아니요             | Python   |

### 통합을 만드는 이유는 무엇인가요?

[커스텀 검사][1]는 수시로 보고하거나 데이터 소스가 고유하거나 매우 제한적인 경우에 적합합니다. 애플리케이션 프레임워크, 오픈 소스 프로젝트 또는 일반적으로 사용되는 소프트웨어와 같은 일반적인 사용 사례에는 통합을 작성하는 것이 좋습니다.

승인된 통합에서 보고된 메트릭은 커스텀 메트릭으로 계산되지 않으므로 커스텀 메트릭 할당에 영향을 미치지 않습니다. (잠재적으로 무제한의 메트릭을 생성하는 통합은 여전히 커스텀 메트릭으로 간주될 수 있습니다.) Datadog에 대한 기본 지원을 보장하면 채택에 대한 마찰이 줄어들고, 사람들이 귀하의 제품, 서비스 또는 프로젝트를 사용하도록 유도할 수 있으며, Datadog 에코시스템 내에 포함되는 것은 가시성을 높일 수 있는 좋은 방법입니다.

### 커스텀 검사와 서비스 검사의 차이점은 무엇인가요?

[커스텀 검사][11]는 커스텀 에이전트 검사로도 알려져 있습니다. 이를 통해 내부 서비스 데이터를 Datadog으로 전송할 수 있습니다. [서비스 검사][12]는 훨씬 더 간단하며 특정 서비스의 업/다운 상태를 모니터링할 수 있습니다. 두 검사는 각기 다른 기능을 수행하므로 모니터링 필요에 따라 개별적으로 또는 함께 사용할 수 있습니다. 각각에 대한 자세한 설명은 [커스텀 검사][11] 및 [서비스 검사][12] 설명서 섹션을 참조하세요.

### 통합 유형별 메트릭 전송

{{< whatsnext desc="자체 메트릭을 Datadog으로 전송하는 방법에 대해 알아봅니다:" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: 설정, 데이터그램 형식, 데이터 제출 등 DogStatsD의 기능에 대한 개요입니다.{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>커스텀 에이전트 검사</u>: 자체 커스텀 검사를 통해 메트릭, 이벤트 및 서비스 검사를 보고하는 방법에 대해 알아봅니다.{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>커스텀 개방형 메트릭 검사</u>: 전용 커스텀 에이전트 검사로 개방형 메트릭 검사를 보고하는 방법에 대해 알아봅니다.{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>통합</u>: 좀 더 복잡한 작업을 위해 공개 또는 비공개 Datadog 통합을 구축합니다. 공개 통합은 커뮤니티와 공유할 수 있습니다.{{< /nextlink >}}
{{< /whatsnext >}}

### 데이터 유형별 데이터 전송

{{< whatsnext desc="Datadog에 제출할 수 있는 데이터 유형과 제출 방법을 알아보세요." >}}
    {{< nextlink href="/metrics" >}}<u>커스텀 메트릭</u>: Datadog의 커스텀 메트릭을 자세히 살펴보세요. 이 섹션은 메트릭 유형, 의미, 제출 방법, Datadog에서 활용되는 방법을 설명합니다.{{< /nextlink >}}
    {{< nextlink href="service_management/events/guides/" >}}<u>이벤트</u>: 커스템 에이전트 검사, DogStatsD 또는 Datadog API를 통해 Datadog에 이벤트를 제출하는 방법을 살펴봅니다.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>서비스 검사</u> : 특정 서비스의 업/다운 상태를 Datadog에 제출하는 방법을 살펴봅니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 개발자 커뮤니티 참여

{{< whatsnext desc="Datadog 개발자 커뮤니티에 참여하는 방법을 알아보세요:" >}}
    {{< nextlink href="/developers/libraries" >}}<u>라이브러리</u>: Datadog API, DogStatsD 클라이언트, APM 및 Continuous Profiler, 다양한 플랫폼에 대한 외부 지원 커뮤니티 통합을 위한 공식 및 커뮤니티 기여 라이브러리 목록입니다.{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>가이드</u>: 기술 세부 정보, 코드 예제 및 참고 자료가 포함된 유용한 문서를 읽어보세요.{{< /nextlink >}}
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
[13]: /ko/developers/integrations/agent_integration