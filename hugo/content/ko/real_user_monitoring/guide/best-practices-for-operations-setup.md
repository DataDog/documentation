---
description: 여정에 대한 신뢰할 수 있는 가용성 및 지연 시간 메트릭을 생성하도록 RUM 작업을 정의하는 방법을 알아봅니다.
further_reading:
- link: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
  tag: 가이드
  text: RUM 운영을 위한 SLO 생성 모범 사례
- link: /real_user_monitoring/operations_monitoring/?tab=browser
  tag: 설명서
  text: Operations Monitoring에 대해 알아보기
- link: /journey_monitoring/
  tag: 설명서
  text: Journey Monitoring에 대해 알아보기
title: RUM 작업 설정을 위한 모범 사례
---
## 개요 {#overview}

이 가이드는 작업을 정의하는 데 적절한 방법을 선택하고 각 [작업][1]을 정의할 때 모범 사례를 적용할 수 있도록 안내합니다.

잘 정의된 작업은 RUM 애플리케이션의 모든 세션 트래픽을 기반으로 신뢰할 수 있는 [가용성 및 지연 시간 메트릭][2]을 생성합니다. 작업을 여정에 연결하면 이러한 메트릭을 통해 중요한 여정 단계를 평가하고 사용자의 여정 완료를 방해하는 성능 문제를 식별할 수 있습니다.

## 계측 방법 선택 {#choose-an-instrumentation-method}

프런트엔드 코드를 변경할 수 있는지 여부와 작업 수명 주기를 얼마나 세밀하게 제어해야 하는지에 따라 계측 방법을 선택합니다. 다음 두 가지 방법 중 하나로 작업을 정의할 수 있습니다.

1. [RUM SDK API][3]를 사용하여 프런트엔드 애플리케이션 코드에 직접 계측을 추가합니다.
2. Datadog UI 또는 API를 사용하여 기존 RUM 이벤트를 기반으로 작업을 생성합니다.

RUM SDK API를 사용하면 작업을 더 세밀하게 제어할 수 있습니다. Datadog UI 및 API를 사용하면 프런트엔드 코드 변경 사항을 배포하지 않고도 작업을 정의할 수 있습니다.

### RUM SDK API 사용 {#use-rum-sdk-apis}

프런트엔드 코드베이스에 액세스할 수 있고 변경 사항을 배포할 수 있는 경우 RUM SDK API를 사용합니다. 이 방법을 사용하면 작업이 시작되고 끝나는 시점을 정의하고, 작업의 성공 또는 실패 여부를 지정하며, 오류나 이탈로 인한 실패를 식별할 수 있습니다. 각 작업에 대한 컨텍스트를 제공하기 위해 사용자 지정 속성을 추가할 수도 있습니다.

### Datadog UI 또는 API 사용 {#use-the-datadog-ui-or-api}

프런트엔드 코드베이스에 액세스할 수 없거나 프런트엔드 코드를 변경하지 않고 작업 이벤트 및 메트릭을 생성하려는 경우 Datadog UI를 사용합니다. 이 방법을 사용하면 뷰, 리소스, 오류와 같은 RUM 이벤트를 작업의 시작, 성공 및 실패 조건에 매핑하여 작업을 정의합니다. 작업은 RUM에서 이미 수집한 이벤트에 기반하므로 작업의 시작과 종료 시점은 해당 이벤트에 의해 제한됩니다.

어떤 기존 RUM 이벤트가 각 작업을 정의하는지 확인한 후 Datadog API를 사용하여 작업을 일괄 생성합니다.

<div class="alert alert-warning">RUM 애플리케이션은 Datadog UI 또는 API로 생성된 최대 1,000개의 작업을 지원합니다. RUM SDK API는 정의할 수 있는 작업 수에 제한을 두지 않습니다.</div>

## 작업 정의 시 모범 사례 적용 {#apply-best-practices-when-defining-operations}

### 애플리케이션이 제어하는 작업 측정 {#measure-application-controlled-work}

애플리케이션이 수행하고 사용자가 안정적으로 완료되기를 기대하는 기술적 단계를 기준으로 작업을 정의합니다. 예를 들어, 작업은 검색 결과를 로드하거나 양식을 제출하는 데 필요한 시간을 측정할 수 있습니다. 작업이 느리게 실행되거나 실패하면 사용자가 불편을 겪고 여정을 완료하지 못할 수 있습니다.

콘텐츠를 읽거나 선택할 항목을 결정하는 등 사용자 입력을 기다리는 데 소요되는 시간은 제외합니다. 사용자에게 달린 시간까지 포함하면 애플리케이션이 예상대로 작동할 때도 측정된 지연 시간이 증가하여 애플리케이션 성능 문제를 식별하기 어렵게 됩니다.

### 시간 초과율 1% 이하 유지 {#keep-the-timeout-rate-at-or-below-1}

모든 작업의 시작과 종료 시점을 기록해야 합니다. 종료 시점에는 작업의 성공 또는 실패 여부가 표시됩니다. RUM이 시작 시점은 기록했지만 해당 종료 시점을 기록하지 못하면 [작업 시간이 초과되고][4](**병렬 처리** 아래의 참고 사항 참조), Datadog은 작업의 성공 또는 실패 여부를 확인할 수 없습니다.

시간이 초과된 작업이 많아지면 유의미한 결과 데이터가 있는 작업의 표본 수가 줄어들고 오류나 사용자 이탈이 드러나지 않을 수 있습니다. Datadog이 시작된 작업의 최소 99%를 성공 또는 실패로 분류할 수 있도록 시간 초과율을 1% 이하로 유지합니다. 시간 초과율이 높으면 작업 성능 메트릭의 대표성이 떨어지며 계측이 불완전하다는 신호일 수 있습니다.

### 작업을 여정에 연결 {#link-operations-to-journeys}

작업을 생성할 때 여정에 연결하여 해당 작업의 결과가 여정 상태에 반영되도록 합니다. 작업 생성 시 연결은 필수가 아니며, 나중에 작업을 다른 여정에 추가로 연결하거나 기존 연결을 제거할 수 있습니다.

### 여정을 위한 SLO 생성 {#create-slos-for-your-journey}

자세한 내용은 [RUM 작업을 위한 SLO 생성 모범 사례][7]를 참조하세요.

### 여정의 마지막 작업에 우선순위 부여 {#prioritize-the-final-operation-in-a-journey}

여정의 마지막 단계에 해당하는 작업에 우선순위를 부여합니다. 이 작업의 결과에 따라 사용자의 여정 완료 여부가 결정되는 경우가 많기 때문입니다. 해당 마지막 단계를 기준으로 작업의 시작 시점과 성공 조건을 정의합니다. 예시는 다음과 같습니다.

- **결제 여정**: 사용자가 **Pay now**를 클릭하면 마지막 작업을 시작하고, 결제가 완료되면 성공으로 표시합니다.
- **로그인 여정**: 사용자가 유효한 자격 증명으로 **Sign in**을 클릭하면 마지막 작업을 시작하고, 애플리케이션이 사용자를 인증하면 성공으로 표시합니다.
- **검색 여정**: 사용자가 유효한 검색 쿼리를 제출하면 마지막 작업을 시작하고, 결과 페이지에 일치하는 항목이 표시되면 성공으로 표시합니다.

## 작업 계측 문제 해결 {#troubleshoot-operation-instrumentation}

예상치 못한 작업 결과를 조사하거나 작업이 올바르게 계측되었는지 검증하려면 다음 도구를 사용합니다.

- 작업 세부 정보 페이지의 추천 카드에서 [Bits Investigation][5]을 시작하여 오류, 이탈, 시간 초과, 크래시 및 속도 저하를 분석합니다.
- 작업 세부 정보 페이지에서 조사하려는 결과와 관련된 예시 세션을 검토합니다.
- [RUM 탐색기][6]에서 작업 이벤트를 쿼리하여 해당 속성과 관련 세션 컨텍스트를 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/operations_monitoring/?tab=browser
[2]: /ko/real_user_monitoring/operations_monitoring/?tab=browser#monitor-your-availability-on-datadog
[3]: /ko/real_user_monitoring/operations_monitoring/?tab=browser#start-an-operation
[4]: /ko/real_user_monitoring/operations_monitoring/?tab=browser#parallelization
[5]: /ko/real_user_monitoring/bits_ai/optimize_performance/#operations-monitoring
[6]: /ko/real_user_monitoring/explorer/
[7]: /ko/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/