---
aliases:
- /ko/serverless/aws
further_reading:
- link: /serverless/configuration/
  tag: 설명서
  text: 서버리스 모니터링 구성
- link: /integrations/amazon_lambda/
  tag: 설명서
  text: AWS Lambda 통합
- link: /serverless/guide/disable_serverless
  tag: 설명서
  text: Serverless Monitoring 을 비활성화하십시오.
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=aws#lambda
  tag: 설명서
  text: OTLP를 사용하여 AWS Lambda 트레이스를 Datadog으로 전송하십시오.
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: 블로그
  text: 컨테이너 이미지로 배포한 AWS Lambda 함수 모니터링
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: 블로그
  text: 서버리스 로그 수집 및 관리 모범 사례
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: 블로그
  text: 프로덕션이 사전 준비된 AWS 서버리스 애플리케이션 설계
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: 블로그
  text: AWS의 Well-Architected Framework에 맞는 서버리스 애플리케이션 구축 모범 사례
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: 블로그
  text: AWS Lambda 함수의 임시 스토리지 사용량 모니터링
- link: https://www.datadoghq.com/blog/serverless-cold-start-traces/
  tag: 블로그
  text: 콜드 스타트 추적으로 서버리스 함수 성능 이해하기
- link: https://www.datadoghq.com/blog/identifying-deprecated-lambda-functions/
  tag: 블로그
  text: Datadog 을 사용하여 더 이상 사용되지 않는 Lambda 함수를 식별하십시오.
- link: https://www.datadoghq.com/blog/monitoring-lwa-with-datadog/
  tag: 블로그
  text: Lambda Web Adapter 통합을 사용하여 Lambda 호스팅 웹 앱을 모니터링하십시오.
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: 블로그
  text: Datadog으로 AWS Lambda 관리형 인스턴스 모니터링
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: 학습 센터
  text: Datadog으로 AWS Lambda를 Serverless Monitoring에 맞춰 구성
title: AWS Lambda용 서버리스 모니터링
---
AWS Lambda용 Datadog 서버리스 모니터링으로 Lambda 함수를 관찰할 수 있습니다.

시작하려면 [설치 지침][1]에 따라 서버리스 애플리케이션에서 메트릭, 트레이스, 로그를 수집하세요.

## 작동 방식 {#how-it-works}

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda에서 향상된 메트릭 수집" >}}

Datadog 서버리스 모니터링의 경우 런타임 지정 Datadog Lambda 라이브러리와 Datadog Lambda 확장을 함께 사용해 Lambda 함수에서 텔레메트리를 전송합니다.

Datadog Lambda Extension은 Lambda 텔레메트리 API를 사용하여 함수 로그를 수집하므로 CloudWatch가 필요하지 않습니다. 또한 향상된 메트릭을 생성합니다. 이러한 텔레메트리 신호를 Datadog Lambda 라이브러리의 APM 트레이스, 커스텀 스팬 및 커스텀 메트릭과 통합합니다.

## 사용 방법 {#usage}

다음 페이지에서는 AWS Lambda용 서버리스 모니터링을 설치하고 구성하는 방법과 메트릭, 트레이스, 로그를 사용해 가시화하는 방법을 설명합니다.

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>설치</u>: AWS Lambda 용 Serverless Monitoring 을 설치하십시오.{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Lambda 메트릭</u>: 향상된 메트릭에 대해 자세히 알아보고 커스텀 메트릭 제출 방법을 확인하십시오.{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>분산 추적</u>: APM 및 분산 추적을 사용하여 애플리케이션 성능에 대한 컨텍스트가 풍부한 그림을 확인하십시오.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>Log Collection</u>: Read more about log collection, how to filter logs, and how to connect logs and traces.{{< /nextlink >}}
{{< /whatsnext >}}

### Serverless 뷰에서 전체 서버리스 스택을 모니터링하십시오 {#monitor-your-entire-serverless-stack-in-the-serverless-view}

서버리스 보기를 사용하면 AWS 리소스의 고수준 메트릭을 Lambda 함수 메트릭과 연결하고 상관 관계를 수립할 수 있어 문제를 빠르게 파악하고 조사할 수 있습니다.

기본적으로 Serverless 뷰는 서버리스 리소스를 서비스별로 그룹화하여 애플리케이션의 각 부분이 어떻게 수행되고 있는지 시각화하도록 돕습니다. 각 서비스에 대해 해당 서비스에 속한 함수와 이를 호출한 리소스(Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis)를 확인할 수 있습니다.

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### 호출 페이로드를 모니터링하여 AWS Lambda 함수 실패를 더 빠르게 해결하십시오 {#resolve-aws-lambda-function-failures-faster-by-monitoring-invocation-payloads}

Datadog은 모든 함수 호출에 대한 함수 요청 및 응답을 자동으로 수집하여 문제 해결에 도움이 되는 주요 정보를 제공합니다. 예를 들어, Lambda 함수 중 하나에서 오류가 발생했다는 알림을 받으면 관련 요청 페이로드를 분석하여 누락된 매개변수, 잘못 입력된 리소스 주소 또는 오류의 원인이 될 수 있는 기타 잘못된 구성을 확인할 수 있습니다.

실패 요청의 구성 오류를 파악하면 개발 환경에서 문제를 쉽게 재현하고 버그가 수정되었는지 확인하기 위해 테스트를 실행할 수 있습니다.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Lambda 함수 환경 전반의 문제에 대한 알림을 위한 실시간 메트릭 {#real-time-metrics-for-alerting-on-issues-across-your-lambda-function-environment}

Datadog에서 `aws.lambda.enhanced` 접두사로 표시되는 Datadog의 향상된 Lambda 메트릭은 초 단위 세분성으로 거의 실시간으로 제공됩니다. 향상된 Lambda 메트릭을 사용하여 모든 Lambda 함수에 걸친 콜드 스타트, 예상 AWS 비용, 타임아웃, 메모리 부족 오류 및 메모리 사용량에 대한 알림이나 SLO를 설정할 수 있습니다. 이를 통해 서버리스 환경에서 성능 문제가 발생하는 즉시 확인하고 지체 없이 문제를 해결할 수 있습니다.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### 배포 추적을 사용하여 서버리스 구성 변경 사항을 모니터링하십시오 {#monitor-serverless-configuration-changes-with-deployment-tracking}

서버리스 코드, 구성, 배포 변경 사항을 함수의 메트릭, 트레이스, 로그와 쉽게 연결하고 상관 관계를 수립하기 때문에 변경 사항이 애플리케이션의 상태와 성능에 어떤 영향을 미쳤는지 실시간으로 파악할 수 있습니다.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

## 추가 기능 {#additional-capabilities}

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Continuous Profiler</u>: Datadog의 Continuous Profiler를 활성화하여 Lambda 함수에서 병목 현상을 일으키는 정확한 코드 라인을 찾으십시오.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>Secure Functions</u>: App and API Protection (AAP)을 사용하여 함수에 대한 위협을 관리하십시오.{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>Deployment Tracking</u>: 배포를 추적하여 새 코드 버전이나 구성 변경이 언제 회귀를 유발하는지 확인하십시오.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/installation