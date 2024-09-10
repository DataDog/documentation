---
aliases:
- /ko/integrations/awslambda/
- /ko/serverless/real-time-enhanced-metrics/
categories:
- aws
- cloud
- log collection
- tracing
dependencies: []
description: 람다 실행 시간, 오류 호출 개수 등을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_lambda/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/
  tag: 블로그
  text: 람다 함수 모니터링 방법
- link: https://www.datadoghq.com/blog/datadog-lambda-layer/
  tag: 블로그
  text: 'Datadog 람다 레이어: 커스텀 서버리스 메트릭 모니터링'
- link: https://www.datadoghq.com/blog/datadog-lambda-extension/
  tag: 블로그
  text: Datadog 람다 확장명 소개
git_integration_title: amazon_lambda
has_logo: true
integration_id: amazon-lambda
integration_title: AWS 람다
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_lambda
public_title: Datadog-AWS 람다 통합
short_description: 람다 실행 시간, 오류 호출 개수 등을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
<div class="alert alert-warning">이 페이지는 Amazon 클라우드와치(CloudWatch)에서 AWS 람다 메트릭 수집을 위한 설명서로 제한됩니다. 실시간으로 람다 함수에서 직접 텔레메트리를 수집하기 위한 <a href="/serverless">Datadog 서버리스 설명서</a>를 참조하세요 .</div>

## 개요

AWS 람다는 이벤트에 대응하기 위한 코드를 실행하고 자동으로 해당 코드에서 필요로 하는 컴퓨팅 리소스를 관리하는 컴퓨팅 서비스입니다.

클라우드와치(CloudWatch) 수집을 시작하려면 이 통합을 활성화하세요. 또한, 이 페이지에서 람다 함수를 위한 커스텀 메트릭, 로깅 및 추적을 설정하는 방법을 설명하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

#### AWS 람다 메트릭

1. [AWS 통합 페이지][2]에서 `Lambda`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.
2. [Datadog IAM 정책][3]에 다음 권한을 추가하여 AWS 람다 메트릭을 수집하세요. 자세한 정보는 AWS 웹사이트에서 [람다 정책][4]을 참조하세요.

    | AWS 권한     | 설명                                  |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*`     | 람다 함수, 메타데이터 및 태그를 목록화합니다.   |
    | `tag:GetResources` | 람다 함수에 적용되는 커스텀 태그를 받습니다. |
    | `cloudtrail:LookupEvents` | CloudTrail 기록을 사용하여 람다 함수에 대한 변경 사항을 탐지합니다. |

3. [Datadog - AWS 람다 함수][5]를 설치합니다.

완료되면 [Datadog 서버리스 보기][6]에서 람다 함수 전체를 봅니다. 이 페이지는 서버리스 애플리케이션이 실행되는 AWS 람다 함수에서 메트릭, 트레이스 및 로그를 수집해 단일 보기로 제공합니다. 이 기능에 대한 상세한 설명서를 [Datadog 서버리스 설명서][7]에서 찾아볼 수 있습니다.

## 수집한 데이터

<div class="alert alert-warning">AWS 람다 확장명을 사용하면 AWS에서 보고하는 <em>기간</em> 메트릭은 람다 함수가 소비하는 <em>post_runtime_extensions_duration</em> <a href="https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/">보고하여 함수 반응을 반환한 뒤 활동을 수행합니다. </a>. 함수의 실제 성능을 모니터링하려면 <em>duration - post_runtime_extensions_duration</em> 또는 <a href="https://docs.datadoghq.com/serverless/enhanced_lambda_metrics/">Datadog 개선 메트릭</a> <em>aws.lambda.enhanced.runtime_duration</em>을 사용하세요.</div>

AWS에서 검색한 각 메트릭에는 AWS 콘솔에 표시하는 동일한 태그가 할당되어 있습니다. 함수 이름, 보안-그룹 등을 포함하나 이에 제한되지 않습니다.

### 메트릭
{{< get-metrics-from-git "amazon_lambda" >}}


### 이벤트

AWS 람다 함수는 [Datadog 서버리스 배포 추적[9]이 활성화된 경우 AWS CloudTrail에서 람다 배포 이벤트를 수집합니다.

### 서비스 검사

AWS 람다 함수에는 서비스 점검이 포함되어 있지 않습니다.

### 실시간으로 향상된 Lambda 메트릭

[서버리스 설명서][10]를 참조하여 자세히 알아보세요.

### 커스텀 메트릭

자세한 정보는 [서버리스 설명서][11]를 참조하세요.

### 로그 수집

자세한 정보는 [서버리스 설명서][12]를 참조하세요.

### 트레이스 수집

자세한 정보는 [서버리스 설명서][13]를 참조하세요.

### Lambda@Edge

Datadog는 람다 메트릭에서 자동으로 `at_edge`, `edge_master_name` 및 `edge_master_arn` 태그를 추가하여 Edge 위치에서 실행될 때 람다 함수 메트릭 및 로그의 집계 상태를 볼 수 있도록 해줍니다.

배포 트레이싱은 Lambda@Edge 함수에 대해 지원되지 _않습니다._

## 즉시 사용 가능한 모니터링

AWS 람다 통합은 즉시 사용 가능한 모니터링 기능을 제공해 성능을 모니터링하고 최적화할 수 있도록 지원합니다.

- AWS 람다 대시보드: 즉시 사용 가능한 [AWS 람다 대시보드][14]를 사용해 람다 함수에 대한 종합적인 개요를 확보합니다.
- 권장 모니터: [권장 AWS 람다 모니터][15]를 활성화해 선제적으로 문제를 탐지하고 적시에 알림을 받습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][16]에 문의해 주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: /ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html
[5]: https://app.datadoghq.com/integrations/amazon-lambda
[6]: https://app.datadoghq.com/functions
[7]: /ko/serverless
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[9]: /ko/serverless/deployment_tracking
[10]: /ko/serverless/enhanced_lambda_metrics/
[11]: /ko/serverless/custom_metrics/#custom-metrics
[12]: /ko/serverless/forwarder/
[13]: /ko/serverless/distributed_tracing/
[14]: https://app.datadoghq.com/screen/integration/98/aws-lambda
[15]: https://app.datadoghq.com/monitors/recommended
[16]: /ko/help/