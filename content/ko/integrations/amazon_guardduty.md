---
categories:
- cloud
- aws
- log collection
- security
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_guardduty.md
description: Amazon GuardDuty 로그를 수집합니다.
doc_link: /integrations/amazon_guardduty/
has_logo: true
integration_id: amazon-guardduty
integration_title: Amazon GuardDuty
is_public: true
custom_kind: integration
name: amazon_guardduty
public_title: Datadog-Amazon GuardDuty 통합
short_description: Amazon GuardDuty 로그를 수집합니다.
version: '1.0'
---

## 개요

Datadog는 람다 함수를 통해 Amazon GuardDuty와 통합됩니다. 람다 함수는 GuardDuty 결과를 Datadog의 로그 관리 솔루션으로 전송하는 역할을 합니다.

## 설정

### 로그 수집

#### 로깅 활성화

1. 이미 하지 않은 경우 [Datadog 포워더(Forwarder) 람다 함수][1]를 설정하세요.

2. [Amazon EventBridge][2]에서 새로운 규칙을 생성합니다. 규칙에 이름을 지정하고 **이벤트 패턴으로 규칙 설정**을 설정합니다. **다음**을 클릭합니다.

3. GuardDuty 결과와 일치하도록 이벤트 패턴을 빌드합니다. **이벤트 소스** 섹션에서 `AWS events or EventBridge partner events`를 선택합니다. **이벤트 패턴** 섹션에서 소스에 `AWS services`, 서비스에 `GuardDuty`, 유형에 `GuardDuty Finding`을 지정합니다. **다음**을 클릭합니다.

4. Datadog 포워더(Forwarder) 을 대상으로 선택합니다. 대상 유형으로 `AWS service`, 대상으로 `Lambda function`을 설정하고 드롭다운 `Function` 메뉴에서 Datadog 포워더(Forwarder)를 선택합니다. **다음**을 클릭합니다.

5. 원하는 태그를 설정하고 **규칙 생성**을 클릭합니다.

#### 로그를 Datadog로 전송

1. AWS 콘솔에서 **람다**로 이동합니다.

2. **함수**를 클릭한 다음 Datadog 포워더(Forwarder)를 선택합니다.

3. 함수 개요 섹션에서 **트리거 추가**를 클릭합니다. 드롭다운 메뉴에서 **EventBridge(CloudWatch 이벤트)**를 선택한 다음 [로깅 섹션 활성화](#enable-logging)에서 생성된 규칙을 지정합니다.

4. [Datadog 로그 탐색기][3]에서 새로운 GuardDuty 결과가 있는지 확인하세요.

[1]: /ko/logs/guide/forwarder/
[2]: https://console.aws.amazon.com/events/home
[3]: https://app.datadoghq.com/logs