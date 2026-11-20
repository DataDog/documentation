---
aliases:
- /ko/serverless/aws
further_reading:
- link: /serverless/configuration/
  tag: 설명서
  text: Serverless Monitoring 구성
- link: /integrations/amazon-lambda/
  tag: 설명서
  text: AWS Lambda 통합
- link: /serverless/guide/disable_serverless
  tag: 설명서
  text: Serverless Monitoring 비활성화
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=aws#lambda
  tag: 설명서
  text: OTLP를 사용하여 AWS Lambda 트레이스를 Datadog으로 전송
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: 블로그
  text: 컨테이너 이미지를 사용하여 배포된 AWS Lambda 함수 모니터링하기
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: 블로그
  text: Serverless 로그 수집 및 관리를 위한 모범 사례
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: 블로그
  text: 프로덕션 준비가 완료된 AWS Serverless 애플리케이션 설계하기
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: 블로그
  text: AWS Well-Architected Framework를 따르는 Serverless 애플리케이션 구축을 위한 모범 사례
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: 블로그
  text: AWS Lambda 함수의 임시 스토리지 사용량 모니터링하기
- link: https://www.datadoghq.com/blog/serverless-cold-start-traces/
  tag: 블로그
  text: Cold Start Tracing으로 Serverless 함수 성능 이해하기
- link: https://www.datadoghq.com/blog/identifying-deprecated-lambda-functions/
  tag: 블로그
  text: Datadog으로 지원이 중단된 Lambda 함수 식별하기
- link: https://www.datadoghq.com/blog/monitoring-lwa-with-datadog/
  tag: 블로그
  text: Lambda Web Adapter 통합을 사용하여 Lambda 호스팅 웹 앱 모니터링하기
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: 블로그
  text: Datadog으로 AWS Lambda 관리형 인스턴스 모니터링하기
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: 학습 센터
  text: Datadog으로 Serverless Monitoring용 AWS Lambda 구성
title: AWS Lambda용 Serverless Monitoring
---
AWS Lambda용 Datadog Serverless Monitoring은 Lambda 함수에 대한 가시성을 제공합니다.

시작하려면 [설치 지침][1]에 따라 Serverless 애플리케이션에서 메트릭, 트레이스 및 로그를 수집하세요.

## Lambda 컴퓨팅 유형 {#lambda-compute-types}

Datadog 지원은 다음의 AWS Lambda 컴퓨팅 유형에 따라 다릅니다.

| Lambda 유형 | 실행 내용 | Datadog 지원 |
|---|---|---|
| Lambda Event Functions | 이벤트 또는 API 호출에 응답하여 실행되는 코드입니다. 이것은 원래의 Lambda 함수 유형입니다. | Serverless Monitoring: 메트릭, 트레이스, 로그 및 이 페이지의 기능. 지원되는 런타임은 각 기능 페이지에서 확인하세요. |
| Lambda Web Functions | HTTP 요청을 직접 처리하는 웹 애플리케이션 및 API 백엔드. | [AWS Lambda 통합][2]을 통한 CloudWatch 메트릭, 기본 제공 대시보드 및 권장 모니터. |
| Lambda MicroVM | 각 사용자 또는 작업에 대한 격리된 컴퓨팅 환경으로, 최대 8시간 동안 지속됩니다. | 자동 로그 구독을 포함하여 [Datadog Forwarder][3]를 통한 CloudWatch 로그. |

[Lambda 관리형 인스턴스][4]와 [Lambda Durable Functions][5]는 Lambda Event Functions를 실행하는 방법이며, Datadog은 두 가지 모두를 지원합니다. 지원되는 런타임은 각 페이지에서 확인하세요.

Serverless Monitoring 문서에서 'Lambda 함수'는 별도의 언급이 없는 한 Lambda Event Function을 의미합니다. AWS API, SDK, AWS CLI, `AWS::Lambda::Function` 리소스 유형 및 ARN은 Lambda Event Functions에 대해 'function'을 사용합니다. 기존 계측 및 인프라 코드는 변경 없이 계속 작동합니다. 자세한 내용은 AWS 설명서의 [AWS Lambda란 무엇인가요?][6]를 참조하세요.

## 작동 방식 {#how-it-works}

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda에서 향상된 메트릭 수집" >}}

Datadog Serverless Monitoring은 런타임별 Datadog Lambda Library를 Datadog Lambda Extension과 함께 사용하여 Lambda 함수에서 텔레메트리를 전송합니다.

Datadog Lambda Extension은 Lambda Telemetry API를 사용하여 함수 로그를 수집하므로 CloudWatch가 필요하지 않습니다. 또한 향상된 메트릭을 생성합니다. 이 텔레메트리 신호를 Datadog Lambda Library의 APM 트레이스, 사용자 지정 스팬 및 Custom Metrics와 통합합니다.

## 사용량 {#usage}

다음 페이지에서는 메트릭, 트레이스, 로그를 사용하여 전체 가시성을 확보하는 방법을 포함하여 AWS Lambda용 Serverless Monitoring을 설치하고 구성하는 방법을 설명합니다.

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>설치</u>: AWS Lambda용 Serverless Monitoring을 설치합니다.{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Lambda 메트릭</u>: 향상된 메트릭에 대해 자세히 알아보고 Custom Metrics를 제출하는 방법을 확인하세요.{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>분산 트레이싱</u>: APM 및 분산 트레이싱을 사용하여 애플리케이션 성능을 컨텍스트와 함께 자세히 확인하세요.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>Log Collection</u>: Read more about log collection, how to filter logs, and how to connect logs and traces.{{< /nextlink >}}
{{< /whatsnext >}}

### Serverless 뷰에서 전체 Serverless 스택 모니터링 {#monitor-your-entire-serverless-stack-in-the-serverless-view}

Serverless 뷰를 사용하면 AWS 리소스의 상위 수준 메트릭을 Lambda 함수의 메트릭과 연결할 수 있어 문제를 빠르게 발견하고 조사를 시작할 수 있습니다.

기본적으로 Serverless 뷰는 Serverless 리소스를 서비스별로 그룹화하여 애플리케이션의 각 부분이 어떻게 작동하는지 시각화할 수 있도록 돕습니다. 각 서비스에 대해 해당 서비스에 속한 함수와 이를 호출한 리소스(Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis)를 확인할 수 있습니다.

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### 호출 페이로드를 모니터링하여 AWS Lambda 함수 오류를 더 빠르게 해결 {#resolve-aws-lambda-function-failures-faster-by-monitoring-invocation-payloads}

Datadog은 모든 함수 호출에 대한 함수 요청 및 응답을 자동으로 수집하여 문제 해결에 도움이 되는 주요 정보를 제공합니다. 예를 들어, Lambda 함수 중 하나에서 오류가 발생했다는 알림을 받으면 관련 요청 페이로드를 분석하여 누락된 파라미터, 잘못 입력된 리소스 주소 또는 오류의 원인이 될 수 있는 기타 잘못된 구성을 확인할 수 있습니다.

실패한 요청에서 잘못된 구성을 식별하면 개발 환경에서 문제를 더 쉽게 재현할 수 있으며, 이후 테스트를 실행하여 버그 수정을 검증할 수 있습니다.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Lambda 함수 환경 전반의 문제에 대해 경고를 보내는 실시간 메트릭 {#real-time-metrics-for-alerting-on-issues-across-your-lambda-function-environment}

Datadog에 접두사(`aws.lambda.enhanced`)가 붙은 Datadog의 향상된 Lambda 메트릭은 초 단위로 세분화되어 거의 실시간으로 제공됩니다. 향상된 Lambda 메트릭을 사용하여 모든 Lambda 함수에 걸쳐 콜드 스타트, 예상 AWS 비용, 시간 초과, 메모리 부족 오류 및 메모리 사용량에 대한 경보나 SLO를 설정할 수 있습니다. 이를 통해 Serverless 환경에서 성능 문제가 발생하는 즉시 확인하고 지체 없이 문제를 해결할 수 있습니다.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### 배포 추적을 사용하여 Serverless 구성 변경 사항 모니터링 {#monitor-serverless-configuration-changes-with-deployment-tracking}

Serverless 코드, 구성, 배포 변경 사항을 함수의 메트릭, 트레이스, 로그와 쉽게 연결하여 이러한 변경 사항이 애플리케이션의 상태와 성능에 어떤 영향을 미칠 수 있는지 실시간으로 파악할 수 있습니다.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

## 추가 기능 {#additional-capabilities}

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Continuous Profiler</u>: Datadog의 Continuous Profiler를 활성화하여 Lambda 함수에서 병목 현상을 일으키는 정확한 코드 라인을 찾으세요.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>함수 보호</u>: App and API Protection (AAP)을 사용하여 함수에 대한 위협을 관리하세요.{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>배포 추적</u>: 배포를 추적하여 새 코드 버전이나 구성 변경으로 인해 회귀가 발생하는 시점을 확인하세요.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/installation
[2]: /ko/integrations/amazon-lambda/
[3]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[4]: /ko/serverless/aws_lambda/managed_instances/
[5]: /ko/serverless/aws_lambda/durable_functions/
[6]: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html