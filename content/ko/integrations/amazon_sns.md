---
aliases:
- /ko/integrations/awssns/
categories:
- cloud
- notifications
- aws
- log collection
dependencies: []
description: Amazon SNS 메시지를 Datadog에 전송하거나 Datadog 알림을 SNS에 전송하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_sns/
draft: false
git_integration_title: amazon_sns
has_logo: true
integration_id: ''
integration_title: Amazon SNS(Simple Notification Service)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_sns
public_title: Datadog-Amazon SNS(Simple Notification Service) 통합
short_description: Amazon SNS 메시지를 Datadog에 전송하거나 Datadog 알림을 SNS에 전송하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_sns/snsdashboard.png" alt="SNS 대시보드" popup="true">}}

## 개요

다음을 수행하려면 Amazon SNS(Simple Notification Service)를 Datadog에 연결하세요.

- 스트림에 이벤트로 SNS 메시지 확인
- SNS에 알림 및 이벤트 알림 전송

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]의 `Metric Collection` 탭 아래 `SNS`가 활성화되어 있는지 확인하세요. 

2. Amazon SNS 메트릭을 수집하려면 다음 권한을 [Datadog IAM 정책][3]에 추가합니다. 자세한 정보는 AWS 웹사이트에서 [SNS 정책][4]을 참조하세요.

    | AWS 권한   | 설명                                             |
    | ---------------- | ------------------------------------------------------- |
    | `sns:ListTopics` | 사용 가능한 주제를 목록화하는 데 사용됩니다.                          |
    | `sns:Publish`    | 알림(모니터 또는 이벤트 피드)을 게시하는 데 사용됩니다. |

3. [Datadog - Amazon SNS 통합][5]을 설치합니다.

### 이벤트 수집

#### SNS 메시지 수신

`HTTPS` 및 `Email` 프로토콜 모두를 통해 Datadog 이벤트 스트림에서 SNS 메시지를 수신할 수 있습니다. `HTTPS` 프로토콜을 사용하면 자동으로 웹후크 URL을 사용해 구독을 확정할 수 있습니다.

`Email` 프로토콜을 사용하면 Datadog가 이러한 목적으로 자동으로 생성한 이메일 주소에 대한 수동 확인 단계가 필요합니다. 자세한 정보는 [Amazon SNS 이메일에서 Datadog 이벤트 생성] 가이드를 읽으세요.

`HTTPS`를 통해 Datadog 이벤트 탐색기에서 SNS를 수신하는 방법:

1. SNS 관리 콘솔의 **주제** 섹션에서 원하는 주제를 선택하고 **구독 생성**을 클릭합니다.
2. `HTTPS`을 프로토콜로 선택한 뒤 다음 웹후크 URL을 입력합니다. 그러면 `<API_KEY>`가 유효한 Datadog API 키 값으로 대체됩니다.

    ```text
    ## Datadog US site
    https://app.datadoghq.com/intake/webhook/sns?api_key=<API_KEY>

    ## Datadog EU site
    https://app.datadoghq.eu/intake/webhook/sns?api_key=<API_KEY>
    ```

3. **원시 메시지 전송 활성화**를 확인 표시 해제한 채로 내버려 둡니다.
4. **구독 생성**을 클릭합니다.

#### SNS 알림 전송

Datadog에서 SNS 알림을 전송하는 방법:

1. AWS 통합 페이지에서 SNS 서비스와 연결된 AWS계정을 설정하세요.
2. [SNS 통합][5]을 설치하세요.
3. 그러면 Datadog는 설정된 SNS 주제를 감지하고 예를 들어 `@sns-topic-name`와 같은 @알림을 활성화합니다.

### 로그 수집

SNS는 로그를 제공하지 않습니다. SNS를 통해 프로세스 로그와 이벤트가 이동됩니다.

#### Datadog에 로그 보내기

1. 새로운 SNS 구독을 설정하세요.
2. 메시지의 주제를 선택합니다.
3. 프로토콜의 경우 **AWS 람다**를 선택합니다.
4. 엔드포인트의 경우 Datadog 포워더(Forwarder) 람다 함수의 ARN을 입력합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_sns" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 제한되지 않습니다.

### 이벤트

Amazon SNS 통합은 주제 구독에 대한 이벤트를 포함합니다. 아래에서 예시 이벤트를 참조하세요.

{{< img src="integrations/amazon_sns/aws_sns_event.png" alt="Amazon SNS 이벤트" >}}

### 서비스 점검

Amazon SNS 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

Datadog는 Datadog에서 GovCloud 또는 중국의 주제에 이르는 SNS 알림을 지원하지 않습니다.

도움이 필요하신가요? [Datadog 지원센터][8]로 연락하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html
[5]: https://app.datadoghq.com/integrations/amazon-sns
[6]: https://docs.datadoghq.com/ko/integrations/guide/events-from-sns-emails/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sns/amazon_sns_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/