---
categories:
- cloud
- aws
- 로그 수집
custom_kind: integration
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

### 향상된 메트릭 수집

Datadog은 또한 개별 단계 지속 시간의 평균 또는 p99를 추적하는 데 도움이 되는 Step Functions에 대한 메트릭을 생성할 수 있습니다. [AWS Step Functions에 대한 향상된 메트릭][6]을 수집하려면 Datadog APM을 사용해야 합니다.

### 로그 수집

1. [CloudWatch에 로그를 전송][7]하도록 AWS Step Functions를 구성합니다. **참고**: Datadog의 기본 CloudWatch 로그 그룹 접두사 `/aws/vendedlogs/states`를 사용하여 로그 소스를 식별하고 자동으로 파싱합니다.
2. [Datadog에 로그를 전송합니다][8].

### 트레이스 수집

Step Functions용 ​​Datadog APM 또는 AWS X-Ray를 통해 트레이스 수집을 활성화할 수 있습니다.

#### AWS Step Functions용 ​​Datadog APM을 통해 추적 활성화

<div class="alert alert-warning">
이 기능은 공개 베타 버전입니다.
</div>
AWS Step Functions에 대한 분산 추적을 활성화하려면 [서버리스 문서][9]의 설치 지침을 참조하세요.



#### AWS X-Ray를 통한 추적 활성화


<div class="alert alert-warning">이 옵션은 <a href="https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics">AWS Step Functions에 대한 향상된 메트릭</a>을 수집하지 않습니다. 이러한 메트릭의 경우 <a href="https://docs.datadoghq.com/serverless/step_functions">AWS Step Functions용 Datadog APM</a>을 통해 추적을 활성화해야 합니다.</div>

AWS X-Ray를 통해 AWS Step Functions에서 트레이스를 수집하려면 다음을 수행합니다.

1. [Datadog AWS X-Ray 통합][10]을 활성화합니다.
1. AWS 콘솔에 로그인합니다.
2. **Step Functions**를 찾습니다.
3. Step Functions 중 하나를 선택하고 **Edit**을 클릭합니다.
4. 페이지 하단의 **Tracing** 섹션으로 스크롤하여 **Enable X-Ray tracing** 상자에 체크 표시합니다.
5. 권장 사항: 더 상세한 추적을 위해 함수에서 [AWS X-Ray 추적 라이브러리를 설치하세요][11].

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_step_functions" >}}


### 이벤트

AWS Step Functions 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

AWS Step Functions 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.

[1]: /ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-step-functions
[4]: /ko/tagging/
[5]: /ko/serverless/
[6]: https://docs.datadoghq.com/ko/serverless/step_functions/enhanced-metrics
[7]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[8]: /ko/integrations/amazon_web_services/?tab=roledelegation#log-collection
[9]: https://docs.datadoghq.com/ko/serverless/step_functions
[10]: /ko/tracing/serverless_functions/enable_aws_xray
[11]: /ko/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[13]: /ko/help/