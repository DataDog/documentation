---
aliases:
- /ko/integrations/awsapigateway/
categories:
- cloud
- aws
- log collection
dependencies: []
description: 게이트웨이 오류, 캐시 적중 및 누락, 요청 대기 시간을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_api_gateway/
draft: false
git_integration_title: amazon_api_gateway
has_logo: true
integration_id: amazon-api-gateway
integration_title: Amazon API Gateway
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_api_gateway
public_title: Datadog-Amazon API Gateway 통합
short_description: Amazon API Gateway 오류를 추적하세요.
version: '1.0'
---

## 개요

Amazon API Gateway는 개발자가 규모에 관계없이 API를 쉽게 생성, 게시, 유지 관리, 모니터링 및 보호할 수 있는 완전 관리형 서비스입니다.

이 통합을 활성화하면 Datadog에서 모든 API Gateway 메트릭을 확인할 수 있습니다.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `API Gateway`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.

2. API Gateway Stages에 적용되는 커스텀 태그를 확보하려면 [Datadog IAM 정책][3]에 다음 권한을 추가하세요.

    - `apigateway:GET`
    - `tag:GetResources`

3. [Datadog - AWS API Gateway 통합][4]을 설치하세요.

**참고**: 상세 CloudWatch 메트릭을 활성화한 경우, 스테이지 내의 모든 리소스 또는 경로에 대해 해당 메트릭을 활성화해야 합니다. 그렇지 않으면 Datadog의 집계 값이 올바르지 않습니다.

### 로그 수집

API Gateway 로깅 활성화:

1. AWS 콘솔에서 API Gateway로 이동하세요.
2. 원하는 API를 선택하고 Stages 섹션으로 이동하세요. 
3. **Logs** 탭에서 **Enable CloudWatch Logs**와 **Enable Access Logging**을 활성화하세요.
4. `INFO` 레벨을 선택하여 모든 요청이 있는지 확인하세요.
5. **CloudWatch Group** 이름이 `api-gateway`로 시작하는지 확인하세요.
6. JSON 형식(CLF 및 CSV도 지원됨)을 선택하고 다음을 **로그 형식** 상자에 추가하세요.

    ```text
    {
        "requestId":"$context.requestId",
        "ip":"$context.identity.sourceIp",
        "caller":"$context.identity.caller",
        "user":"$context.identity.user",
        "requestTime":$context.requestTimeEpoch,
        "httpMethod":"$context.httpMethod",
        "resourcePath":"$context.resourcePath",
        "status":$context.status,
        "protocol":"$context.protocol",
        "responseLength":$context.responseLength
    }
    ```

#### Datadog에 로그 전송

1. 아직 설정하지 않았다면,  [Datadog 로그 수집 AWS Lambda 함수][5]를 설정하세요.
2. Lambda 함수가 설치되면 AWS 콘솔에서 API Gateway 로그가 포함된 CloudWatch Log 그룹에 트리거를 수동으로 추가합니다.
   해당 CloudWatch Log 그룹을 선택하고 필터 이름을 추가한 다음(필터는 비워두어도 됨) 트리거를 추가합니다.

완료되면 [Datadog Log 섹션][6]으로 이동해서 로그를 탐색해 보세요!

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_api_gateway" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

AWS API Gateway 통합에는 어떠한 이벤트도 포함되지 않습니다.

### 서비스 검사

AWS API Gateway 통합에는 어떠한 서비스 검사도 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요. 

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-api-gateway
[5]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_api_gateway/amazon_api_gateway_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/