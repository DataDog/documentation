---
aliases:
- /ko/integrations/awsxray/
app_id: amazon_xray
categories:
- aws
- cloud
- 추적
custom_kind: integration
description: AWS 서비스를 통한 이동 요청 추적
title: AWS X-Ray
---
{{< site-region region="gov" >}}

<div class="alert alert-warning">Datadog AWS Lambda X-Ray 통합은 상업용 AWS 계정만 지원합니다. 상업용 Lambda 계정이 없으신 경우 Datadog AWS Lambda X-Ray 통합은 정부용 Datadog 사이트에서 지원되지 않습니다.</div>

{{< /site-region >}}

## 개요

개발자는 AWS X-Ray를 통해 AWS 제품으로 빌드한 분산형 애플리케이션을 추적할 수 있습니다. 이 통합은 [서버리스](http://app.datadoghq.com/functions) 기능 상세 페이지에 포함된 Lambda 함수 트레이스를 제공합니다. 자세한 정보는 [서버리스 모니터링](https://docs.datadoghq.com/serverless/)을 참조하세요.

## 설정

### 설치

먼저 [AWS 통합을 활성화한 다음](https://docs.datadoghq.com/integrations/amazon_web_services/) 다음 Datadog 통합 역할의 정책 문서에 다음 권한이 존재하는지 확인합니다.

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

`GetTraceSummaries` 권한은 최근 트레이스의 목록을 가져오는 데 사용됩니다. `BatchGetTraces`는 실제로 전체 트레이스 자체를 반환합니다.

그런 다음 Datadog 내에서 [X-Ray 통합을 활성화합니다](https://app.datadoghq.com/integrations/amazon-xray).

[Customer Matser Key(CMK)](https://docs.aws.amazon.com/whitepapers/latest/kms-best-practices/customer-master-keys.html)를 사용하여 트레이스를 암호화하는 경우 리소스가 X-Ray에 사용되는 CMK인 정책에 `kms:Decrypt` 메서드를 추가합니다.

**참고:** AWS X-Ray 통합을 활성화하면 인덱싱되는 스팬(span)의 양이 늘어나 청구 금액에 영향을 줄 수도 있습니다.

### 함수의 AWS X-Ray 활성화

1. [Lambda 함수](https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html) 및 [API 게이트웨이](https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html)를 활성화하는 방법은 AWS의 지침을 따르세요.
1. AWS X-Ray 통합을 최대한 활용하려면 또한, Lambda 함수에 [X-Ray SDK를 설치합니다](https://docs.aws.amazon.com/xray/latest/devguide/xray-instrumenting-your-app.html#xray-instrumenting-xray-sdk).

### Datadog으로 X-Ray 트레이스 보강

Datadog는 Datadog APM 클라이언트가 생성한 스팬과 메타데이터를 통해 X-Ray 트레이스를 보강할 수 있도록 지원합니다. 또한, 동일한 Lambda 호출에 단일 Datadog 트레이스로 관련 트레이스를 [병합](https://docs.datadoghq.com/serverless/distributed_tracing/serverless_trace_merging)할 수 있도록 해줍니다. 

1. Lambda 함수에서 [Datadog 서버리스 모니터링을 설치합니다](https://docs.datadoghq.com/serverless/installation).
1. Lambda 함수에서 환경 변수 `DD_MERGE_XRAY_TRACES`를 `true`로 설정합니다.

**참고**: Datadog를 통해 계측된 Lambda 함수를 사용해서만 X-Ray을 병합할 수 있습니다.

## 수집한 데이터

AWS X-Ray 통합은 AWS에서 트레이스 데이터를 불러오며 어떠한 메트릭 또는 로그도 수집하지 않습니다.