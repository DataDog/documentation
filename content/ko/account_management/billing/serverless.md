---
title: 서버리스 빌링
---

## 사용량 관리

Datadog 사용량 페이지에서 계정의 청구 가능 및 총 서버리스 사용량을 추적할 수 있습니다. 월별 요약과 시간별 사용량을 모두 확인할 수 있습니다.

Datadog 서버리스 모니터링은 Datadog 내에서 추적 및 모니터링되는 호출과 활성 람다 함수의 조합을 기준으로 청구됩니다. 요금제에 따른 관련 메트릭은 [청구 가능 필터][1]의 [요금제 및 사용량] 페이지의 서버리스 탭에서 확인할 수 있습니다. 요금제 및 사용량에 대한 자세한 내용은 [고객 성공][3] 관리자에게 문의하세요.

람다 함수는 [Datadog AWS 통합][10]을 통해 모니터링하거나 [람다 확장][11] 및 [포워더(Forwarder)][12] 레이어를 사용하여 직접 계측할 수 있습니다.

## 통합

통합을 통해 모니터링 중인 함수를 제어하려면 [람다 통합][13] 메트릭 수집 제어와 API를 사용하면 됩니다.

### UI

Datadog가 모니터링하는 AWS 람다 함수를 제어하는 UI를 사용하려면, [AWS 통합 페이지][5]로 이동합니다. 왼쪽 사이드바에서 관련 AWS 계정을 선택하고 **메트릭 수집 탭**으로 이동합니다. 아래로 스크롤하여 **특정 리소스로 메트릭 수집 제한** 제목까지 이동한 다음 **AWS 서비스 선택** 드롭다운에서 람다를 선택합니다. 그런 다음 오른쪽 필드에 `key:value` 세트를 태그로 추가할 수 있습니다.

이 필드에서 태그를 사용하는 방법에 대한 자세한 내용은 아래 [태그](#Tags) 섹션을 참조하세요.

### API

API를 사용하여 Datadog가 모니터링하는 AWS 람다 함수를 제어하려면 [API 태그 필터 설명서][6]를 참조하세요.

### 태그

Datadog 쉼표로 구분된 태그 목록을 `key:value` 형식으로 허용합니다. 이 목록은 연결된 AWS 서비스에서 메트릭 을 수집할 때 사용되는 필터를 정의합니다. 이러한 `key:value` 쌍은 태그를 허용하거나 제외할 수 있습니다. 제외를 표시하려면 태그 키 앞에 `!`를 추가합니다. `?`(단일 문자의 경우) 및 `*`(여러 문자의 경우)와 같은 와일드카드도 사용할 수 있습니다.

이 필터는 허용된 리소스(태그)가 모두 누락된 경우, 즉 허용된 태 목록 이 "OR" 문을 형성하는 경우에만 리소스를 제외합니다.

예: `datadog:monitored,env:production`

이 필터는 태그 `datadog:monitored` 또는 태그 `env:production`를 포함하는 EC2 인스턴스만 수집합니다.

목록에 제외 태그를 추가하는 경우, 우선 적용됩니다. 즉, 제외 태그를 추가하면 "AND"문이 추가됩니다.

예: `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

이 필터는 태그를 포함하는 EC2 인스턴스 유형만 수집합니다.
`datadog:monitored` OR `env:production` 태그 OR 인스턴스 유형, 태그 `c1.*` 값 포함 AND NOT `region:us-east-1` 태그

## 계측

Datadog는 런타임에 따라 함수를 추적 및 모니터링하는 [람다 확장][14] 및 여러 개의 다른 람다 레이어를 제공합니다. 이러한 라이브러리로 계측 및 모니터링되는 활성 함수의 경우, AWS 통합이 비활성화된 경에도 청구 가능한 사용량을 발생시킵니다.

Datadog는 이러한 라이브러리의 설치 및 설정을 관리할 수 있는 여러 도구를 제공합니다. Datadog 람다 라이브러리 설치 또는 관리를 자동화하고 확장하는 데 사용할 수 있습니다. 자세한 내용은 [AWS 람다용 서버리스 모니터링 설치][15]를 참조하세요.

## 활성 함수 정의

Datadog은 사용자의 계정에 대해 한 달 동안 시간당 평균 함수의 수를 기준으로 요금을 청구합니다. Datadog은 매 시간마다 한 번 이상 실행되고 Datadog 계정에서 모니터링되는 함수의 수를 기록합니다. 월말에 Datadog은 기록된 함수 수의 시간당 평균을 계산하여 요금을 청구합니다. Pro 및 Enterprise 플랜에는 청구 가능한 함수당 5개의 커스텀 메트릭이 포함되어 있습니다. 단일 청구 가능 함수는 고유한 기능 ARN으로 정의됩니다. Lambda@Edge 함수의 경우 서로 다른 리전에 있는 각 함수는 별도의 청구 가능 함수로 계산됩니다.

빌링에 대한 서버리스 애플리케이션 성능 모니터링(APM)은 해당 월에 애플리케이션 성능 모니터링(APM) 수집된 스팬(span)에 연결된 AWS 람다 호출의 합계를 기준으로 합니다. 또한 월말에 번들 수량을 초과하여 Datadog 애플리케이션 성능 모니터링(APM) 서비스에 제출된 [인덱싱된 스팬(span)][4]의 총 개수에 대한 요금이 청구됩니다. 서버리스 사용 시 청구되는 [애플리케이션 성능 모니터링(APM) 호스트][4]는 없습니다.

## 트러블슈팅

기술적인 질문은 [Datadog 지원팀][7]에 문의하세요.
빌링 또는 요금제 및 사용량에 대한 자세한 내용은 [고객 성공][3] 관리자에게 문의하세요.

[1]: https://app.datadoghq.com/billing/usage?category=serverless&data_source=billable
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /ko/api/latest/aws-integration/#set-an-aws-tag-filter
[7]: /ko/help/
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/metric/explorer?exp_metric=aws.lambda.invocations&exp_group=functionname&exp_agg=sum
[10]: /ko/integrations/amazon_billing/
[11]: /ko/serverless/libraries_integrations/extension/
[12]: /ko/logs/guide/forwarder/
[13]: /ko/integrations/amazon_lambda/
[14]: /ko/serverless/aws_lambda
[15]: /ko/serverless/installation/