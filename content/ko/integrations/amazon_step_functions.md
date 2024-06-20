---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: AWS 스텝 함수의 핵심 메트릭을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_step_functions/
draft: false
git_integration_title: amazon_step_functions
has_logo: true
integration_id: ''
integration_title: AWS Step Functions
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_step_functions
public_title: Datadog-AWS 스텝 함수 통합
short_description: AWS 스텝 함수의 핵심 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS 스텝 함수로 시각적 워크플로우를 사용하여 분산 애플리케이션 및 마이크로서비스의 구성 요소를 조정할 수 있습니다.

이 통합을 활성화하면 Datadog에서 모든 스텝 함수 메트릭을 볼 수 있습니다.

<div class="alert alert-warning">Datadog의 기본 AWS 스텝 함수 모니터링 기능은 공개 베타 버전으로 제공됩니다. 스텝 함수를 보강 메트릭 및 트레이스로 계측하려면 <a href="https://docs.datadoghq.com/서버리스/step_functions">서버리스 문서<a>를 참조하세요.</div>

## 설정

### 설치

아직 설정하지 않았다면 먼저 [Amazon Web Services 통합][1]을 설정합니다. 그 다음 아래의 권한을 AWS/Datadog 역할에 맞는 정책 문서에 추가합니다.

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 하단에 `States`이 활성화되어 있는지 확인합니다. 상태 시스템이 AWS Lambda를 사용하는 경우 `Lambda`도 체크되어 있는지 확인합니다.
2. [Datadog - AWS 스텝 함수 통합][3]을 설치합니다.

#### AWS 람다 메트릭 보강

스텝 함수 상태가 Lambda 함수라면 본 통합 설치 시 Lambda 메트릭에 추가 `statemachinename`, `statemachinearn`, `stepname`  [태그][4]가 추가됩니다. Lambda 함수가 어떤 상태 시스템에 속하는지 확인할 수 있으며 [서버리스 페이지][5]에서 시각화할 수도 있습니다.

### 로그 수집

1. AWS 스텝 함수를 설정하여 [클라우드와치(CloudWatch)로 로그를 전송][6]합니다. **참고**: Datadog용 기본 클라우드와치(CloudWatch) 로그 그룹 접두사인 `/aws/vendedlogs/states`를 사용하면 로그의 소스를 식별하고 자동으로 파싱합니다.
2. [Datadog에 로그를 전송]합니다[7].

### 트레이스 수집

#### AWS X-Ray 추적 활성화

AWS 스텝 함수용 분산 추적을 사용하려면:

1. [Datadog AWS X-Ray 통합][8]을 활성화합니다.
1. AWS 콘솔에 로그인합니다.
2. **스텝 함수**를 찾습니다.
3. 스텝 함수 중 하나를 선택하고 **편집**을 클릭합니다.
4. 페이지 하단의 **추적** 섹션으로 스크롤하여 **X-Ray 추적 사용**란을 체크합니다.
5. 권장: 트레이스를 더 자세히 확인하려면 함수에 [AWS X-Ray 추적 라이브러리를 설치][9]합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_step_functions" >}}


### 이벤트

AWS 스텝 함수 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

AWS 스텝 함수 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

[1]: /ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-step-functions
[4]: /ko/tagging/
[5]: /ko/serverless/
[6]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[7]: /ko/integrations/amazon_web_services/?tab=roledelegation#log-collection
[8]: /ko/tracing/serverless_functions/enable_aws_xray
[9]: /ko/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[11]: /ko/help/