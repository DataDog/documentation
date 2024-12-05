---
title: 서버리스 청구
---

## 사용량 관리

Datadog 사용량 페이지를 통해 계정에서 청구 가능한 서버리스 사용량과 총 서버리스 사용량을 추적할 수 있습니다. 월별 요약과 시간 경과에 따른 사용량을 모두 볼 수 있습니다.

Datadog 서버리스 모니터링은 Datadog 내에서 추적 및 모니터링되는 호출과 활성 Lambda 함수의 조합을 기준으로 요금이 청구됩니다. 요금제에 따른 관련 메트릭은 [Billable 필터][1] 아래 Plan and Usage 페이지의 Serverless 탭에서 확인할 수 있습니다. 요금제 및 사용량에 대한 자세한 내용은 [고객 성공][3] 매니저에게 문의하세요.

Lambda 함수는 [Datadog AWS 통합][10]을 통해 모니터링하거나 [Lambda 확장][11] 및 [포워더][12] 레이어를 사용하여 직접 계측할 수 있습니다.

## 통합

통합을 통해 모니터링되는 기능을 제어하려면 UI 및 API를 통해 [Lambda 통합의][13] 메트릭 수집 제어를 사용할 수 있습니다.

### UI

UI를 사용하여 Datadog이 모니터링하는 AWS Lambda 함수를 제어하려면 [AWS Integration 페이지][5]로 이동하세요. 왼쪽 사이드바에서 관련 AWS 계정을 선택하고 **Metric Collection 탭**으로 이동합니다. **Limit Metric Collection to Specific Resources** 제목까지 아래로 스크롤하고 **Select AWS Service** 드롭다운에서 Lambda를 선택합니다. 그런 다음 오른쪽 필드에 태그를 `key:value` 세트로 추가할 수 있습니다.

이 필드에서 태그를 사용하는 방법에 대한 자세한 내용은 아래의 [tags](#Tags) 섹션을 참조하세요.

### API

API를 사용하여 Datadog이 모니터링하는 AWS Lambda 함수를 제어하려면 [API 태그 필터 설명서][6]를 참조하세요.

### 태그

Datadog은 쉼표로 구분된 `key:value` 형식의 태그 목록을 허용합니다. 이 목록은 연결된 AWS 서비스에서 메트릭을 수집할 때 사용되는 필터를 정의합니다. 이러한 `key:value` 쌍은 태그를 허용하거나 제외할 수 있습니다. 제외를 나타내려면 태그 키 앞에 `!`를 추가하세요. (단일 문자의 경우) `?` 및 (여러 문자의 경우) `*`와 같은 와일드카드도 사용할 수 있습니다.

필터는 허용된 태그가 모두 누락된 리소스, 즉 허용된 태그 목록이 "OR" 문을 구성하는 리소스만 제외합니다.

예: `datadog:monitored,env:production`

이 필터는 `datadog:monitored` 태그 또는 `env:production` 태그가 포함된 EC2 인스턴스만 수집합니다.

목록에 제외 태그를 추가하면 해당 태그가 우선 적용됩니다. 즉, 제외 태그를 추가하면 "AND" 문이 추가됩니다.

예: `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

이 필터는 `datadog:monitored` 또는 `env:production` 태그 또는 `c1.*` 값이 있는 인스턴스 유형 태그를 포함하고 `region:us-east-1` 태그가 아닌 EC2 인스턴스만 수집합니다.

## 계측

Datadog은 [Lambda 확장][14]과 다양한 Lambda 계층을 제공하여 런타임을 기반으로 함수를 추적하고 모니터링합니다. 이러한 라이브러리를 사용하여 계측 및 모니터링되는 활성 기능에는 AWS 통합이 비활성화된 경우를 포함하여 청구 가능한 사용량이 발생합니다.

Datadog은 이러한 라이브러리의 설치 및 설정을 관리하는 여러 도구를 제공합니다. 이는 Datadog의 Lambda 라이브러리 설치 또는 관리를 확장하고 자동화하는 데 사용할 수 있습니다. 자세한 내용은 [AWS Lambda용 서버리스 모니터링 설치][15]를 참조하세요.

## 활성 함수 정의

Datadog은 사용자의 계정에 대해 한 달 동안 시간당 평균 함수의 수를 기준으로 요금을 청구합니다. Datadog은 매 시간마다 한 번 이상 실행되고 Datadog 계정에서 모니터링되는 함수의 수를 기록합니다. 월말에 Datadog은 기록된 함수 수의 시간당 평균을 계산하여 요금을 청구합니다. Pro 및 Enterprise 플랜에는 청구 가능한 함수당 5개의 커스텀 메트릭이 포함되어 있습니다. 단일 청구 가능 함수는 고유한 기능 ARN으로 정의됩니다. Lambda@Edge 함수의 경우 서로 다른 리전에 있는 각 함수는 별도의 청구 가능 함수로 계산됩니다.

서버리스 APM에 대한 청구는 해당 월에 APM 수집 범위에 연결된 AWS Lambda 호출의 합계를 기준으로 합니다. 또한 월말 기준으로 번들 수량을 초과하여 Datadog APM 서비스에 제출된 [인덱싱된 범위][4]의 총 개수에 대해서도 요금이 청구됩니다. 서버리스를 사용하는 경우 청구 가능한 [APM 호스트][4]가 없습니다.

## 트러블슈팅

기술적인 질문이 있는 경우 [Datadog 고객 지원팀][7]에 문의하세요.
청구 또는 요금제 및 사용량에 대한 자세한 내용은 [고객 성공][3] 매니저에게 문의하세요.

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