---
further_reading:
- link: /serverless/configuration/
  tag: 설명서
  text: 서버리스 모니터링 구성
- link: /integrations/amazon_lambda/
  tag: 설명서
  text: AWS Lambda 통합
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
kind: 설명서
title: AWS Lambda용 서버리스 모니터링
---

AWS Lambda용 Datadog 서버리스 모니터링으로 Lambda 함수를 관찰할 수 있습니다.

시작하려면 [설치 지침][1]에 따라 서버리스 애플리케이션에서 메트릭, 트레이스, 로그를 수집하세요.

## 작동 방식

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Enhanced Metrics from AWS Lambda" >}}

Datadog 서버리스 모니터링의 경우 런타임 지정 Datadog Lambda 라이브러리와 Datadog Lambda 확장을 함께 사용해 Lambda 함수에서 텔레메트리를 전송합니다.

Datadog Lambda 확장을 사용하면 CloudWatch를 통해 Datadog Lambda 라이브러리로부터 로그, 트레이스, 향상된 메트릭, 커스텀 메트릭을 수집할 수 있습니다.

## 사용량

다음 페이지에서는 AWS Lambda용 서버리스 모니터링을 설치하고 구성하는 방법과 메트릭, 트레이스, 로그를 사용해 가시화하는 방법을 설명합니다.

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>설치</u>: AWS Lambda용 서버리스 모니터링 설치{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Lambda 메트릭</u>: 향상된 메트릭과 커스텀 메트릭을 전송하는 방법에 대해 더 알아보기{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>분산 추적</u>: APM과 분산 추적을 사용하여 풍부한 컨텍스트를 바탕으로 애플리케이션의 성능 추적{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>로그 수집</u>: 로그 수집 방법, 로그 필터링 방법, 로그 및 트레이스를 연결하는 방법에 대해 더 알아보기{{< /nextlink >}}
{{< /whatsnext >}}

### 서버리스 뷰에서 전체 서버리스 스택 모니터링

서버리스 보기를 사용하면 AWS 리소스의 고수준 메트릭을 Lambda 함수 메트릭과 연결하고 상관 관계를 수립할 수 있어 문제를 빠르게 파악하고 조사할 수 있습니다.

기본적으로 서버리스 보기는 서버리스 리소스를 서비스별로 그룹화하기 때문에 애플리케이션 각 부분의 성능을 가시화할 수 있습니다. 각 서비스에서 서비스에 속한 함수는 물론, 함수를 호출하는 리소스(Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis)를 볼 수 있습니다.

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog 서버리스 모니터링" style="width:100%;" >}}

### 호출 페이로드를 모니터링하여 AWS Lambda 함수 실패를 빠르게 해결하기

Datadog에서는 자동으로 모든 함수 호출에서 함수 요청과 응답을 수집하여 문제를 트러블슈팅할 때 필요한 핵심 정보를 제공합니다. 예를 들어 Lambda 함수 중 하나가 실패했을 경우, 관련 호출 페이로드를 분석해 파라미터 누락, 리소스 주소 오타, 또는 실패 원인이 되는 기타 구성 오류가 있는지 확인할 수 있습니다.

실패 요청의 구성 오류를 파악하면 개발 환경에서 문제를 쉽게 재현하고 버그가 수정되었는지 확인하기 위해 테스트를 실행할 수 있습니다.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog 서버리스 모니터링" style="width:100%;" >}}

### Lambda 함수 환경 전체에 문제 알림을 보낼 수 있는 실시간 메트릭

Datadog에서 접두사 `aws.lambda.enhanced`로 표시되는 Datadog의 향상된 Lambda 메트릭의 경우 초 단위의 세부성과 실시간에 가까운 정보를 제공합니다. 이 같이 향상된 Lambda 메트릭의 경우 Lambda 함수 전체에서 콜드 스타트 알림이나 SLO용으로 사용하거나 AWS 비용, 시간 제한,  메모리 오류, 메모리 사용량을 예측하는 데 사용할 수 있습니다. 이에 따라 서버리스 환경에서 성능 문제가 발생하는 경우 지연 시간이 없이 바로 확인하고 트러블슈팅할 수 있습니다.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog 서버리스 모니터링" style="width:100%;" >}}

### 배포 추적으로 서버리스 구성 변경 사항 모니터링

서버리스 코드, 구성, 배포 변경 사항을 함수의 메트릭, 트레이스, 로그와 쉽게 연결하고 상관 관계를 수립하기 때문에 변경 사항이 애플리케이션의 상태와 성능에 어떤 영향을 미쳤는지 실시간으로 파악할 수 있습니다.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog 서버리스 모니터링" style="width:100%;" >}}

## 추가 기능

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>지속적 프로파일러</u>: Datadog의 지속적 프로파일러를 사용해 병목 현상을 일으키는 Lambda 함수 코드 줄을 정확하게 찾아냅니다.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>함수 안정성</u>: ASM(Application Security Management)을 사용해 함수에 대한 위협을 관리합니다.{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>배포 추적</u>: 새 코드 버전이나 구성이 언제 회귀 문제를 일으켰는지 확인할 수 있도록 배포를 추적합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/installation