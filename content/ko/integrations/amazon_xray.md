---
aliases:
- /ko/integrations/awsxray/
categories:
- aws
- cloud
- 추적
dependencies: []
description: AWS 서비스를 통한 이동 요청 추적
doc_link: https://docs.datadoghq.com/integrations/amazon_xray/
draft: false
git_integration_title: amazon_xray
has_logo: true
integration_id: ''
integration_title: AWS X-Ray
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: amazon_xray
public_title: Datadog-AWS X-Ray 통합
short_description: AWS 서비스를 통한 이동 요청 추적
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog AWS Lambda X-Ray 통합은 상업용 AWS 계정만 지원합니다. 상업용 Lambda 계정이 없으신 경우 Datadog AWS Lambda X-Ray 통합은 정부용 Datadog 사이트에서 지원되지 않습니다.</div>

{{< /site-region >}}
## 개요

개발자는 AWS X-Ray를 통해 AWS 제품을 사용하여 구축한 배포 애플리케이션을 추적할 수 있습니다. 본 통합 기능은 [서버리스][1] 함수 상세 페이지에서 Lambda 함수용 트레이스를 제공합니다. 자세한 내용을 확인하려면 [서버리스 모니터링][2]을 참조하세요.

## 설정

### 설치

먼저, [AWS 통합][3]을 활성화하고 Datadog 통합 역할 정책 문서에 다음 권한이 있는지 확인합니다.

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

`GetTraceSummaries` 권한은 최근 트레이스의 목록을 가져오는 데 사용됩니다. `BatchGetTraces`는 실제로 전체 트레이스 자체를 반환합니다.

그런 다음 Datadog에서 [X-Ray 통합][4]을 활성화합니다.

[고객 마스터 키(CMK)][5]를 사용하여 트레이스를 암호화하는 경우 리소스가 X-Ray에 사용되는 고객 마스터 키인 정책에 `kms:Decrypt` 메서드를 추가합니다.

**참고:** AWS X-Ray 통합을 활성화하면 인덱싱되는 스팬(span)의 양이 늘어나 청구 금액에 영향을 줄 수도 있습니다.

### 함수의 AWS X-Ray 활성화

1. AWS 지침에 따라 [Lambda 함수][6] 및 [API 게이트웨이][7]에서 X-Ray 추적을 활성화하세요. 
2. AWS X-Ray 통합을 최대한 활용하려면 Lambda 함수에 [X-Ray SDK][8]도 설치하세요.

### Datadog으로 X-Ray 트레이스 보강

Datadog은 스팬(span)과 Datadog 애플리케이션 성능 모니터링(APM) 클라이언트에서 생성된 메타데이터로 X-Ray 트레이스를 보강하고, 동일한 람다 호출용 단일 Datadog 트레이스에 [병합][9]합니다.

1. Lambda 함수에 [Datadog 서버리스 모니터링][10]을 설치합니다.
2. Lambda 함수에서 환경 변수 `DD_MERGE_XRAY_TRACES`를 `true`로 설정합니다.

## 수집한 데이터

AWS X-Ray 통합은 AWS에서 트레이스 데이터를 불러오며 어떠한 메트릭 또는 로그도 수집하지 않습니다.

[1]: http://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/ko/serverless/
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-xray
[5]: https://docs.aws.amazon.com/whitepapers/latest/kms-best-practices/customer-master-keys.html
[6]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[7]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html
[8]: https://docs.aws.amazon.com/xray/latest/devguide/xray-instrumenting-your-app.html#xray-instrumenting-xray-sdk
[9]: https://docs.datadoghq.com/ko/serverless/distributed_tracing/serverless_trace_merging
[10]: https://docs.datadoghq.com/ko/serverless/installation