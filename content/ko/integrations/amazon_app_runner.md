---
categories:
- aws
- cloud
- 설정 및 배포
- 로그 수집
- 프로비저닝
dependencies: []
description: AWS APP Runner의 핵심 메트릭 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_app_runner/
draft: false
git_integration_title: amazon_app_runner
has_logo: true
integration_id: ''
integration_title: AWS App Runner
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_app_runner
public_title: Datadog-AWS App Runner 통합
short_description: AWS APP Runner 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS App Runner를 사용하면 소스 코드나 컨테이너 이미지에서 AWS로 애플리케이션을 배포할 수 있습니다.

이 통합을 활성화하면 Datadog에서 모든 App Runner 메트릭을 볼 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우, 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 아래에 `AppRunner`가 활성화되어 있는지 확인합니다.
2. [Datadog - AWS App Runner 통합][3]을 설치합니다.

### 로그 수집
AWS App Runner에서 관리하는 애플리케이션과 Datadog을 통합할 때 사용할 수 있는 로그에는 두 가지 종류가 있습니다. 이 로그는 두 가지 로그 그룹으로 분류되어 CloudWatch로 전송됩니다. 첫 번째 그룹은 서비스 로그 그룹으로, 애플리케이션 빌드와 배포 등과 같이 App Runner 서비스의 수명 주기 활동 로그를 모두 캡처합니다. 두 번째 그룹은 애플리케이션 로그 그룹으로, 실행 중인 애플리케이션의 코드의 로그 출력을 포함하고 있습니다.

#### Datadog에 로그 전송

1. 이미 설정하지 않은 경우 [Datadog Forwarder Lambda 함수][4]를 설정하세요.
2. Lambda 함수를 설치한 후에는 AWS 콘솔에서 App Runner 서비스나 애플리케이션 CloudWatch 로그 그룹에 수동으로 트리거를 추가하세요.
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="CloudWatch 로그 그룹" popup="true" style="width:70%;">}}
   해당 CloudWatch Log 그룹을 선택하고 필터 이름을 추가한 후(필터를 비워둬도 됨) 트리거를 추가합니다.
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="CloudWatch 트리거" popup="true" style="width:70%;">}}
3. 로그 그룹을 더 추가하려면 2 단계로 다시 돌아가세요.
4. 완료되면 [Datadog Log 섹션][5]으로 이동해서 로그를 탐색해 보세요.

### 이벤트 수집
AWS App Runner에서는 서비스와 작동 상태 변경 이벤트를 EventBridge로 보냅니다. 이를 Datadog로 전송해 [Event Stream][6]에서 확인할 수 있습니다. 이 이벤트를 Datadog로 보내려면 다음을 따르세요.

1. [Datadog Events용 EventBridge API 대상][7]을 생성합니다.
2. AWS App Runner 이벤트에 적용할 EventBridge 규칙을 생성하세요(EventBridge에서 App Runner 이벤트 처리[8] 참고). 대상으로 API Destination을 선택하세요.
3. 이제 새 상태 변경 이벤트를 Datadog Event Stream에서 볼 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_app_runner" >}}


### 이벤트

AWS App Runner 통합은 EventBridge의 서비스와 작동 상태 변경 이벤트를 지원합니다.

### 서비스 점검

AWS App Runner 통합은 이벤트 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-app-runner
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/event/stream
[7]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-partners.html#eb-api-destination-datadog
[8]: https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ev.html
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_app_runner/amazon_app_runner_metadata.csv
[10]: https://docs.datadoghq.com/ko/help/