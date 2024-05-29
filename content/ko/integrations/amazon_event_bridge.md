---
categories:
- aws
- 클라우드
- 알림
dependencies: []
description: 핵심 Amazon EventBridge 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_event_bridge/
draft: false
git_integration_title: amazon_event_bridge
has_logo: true
integration_id: ''
integration_title: Amazon EventBridge
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: amazon_event_bridge
public_title: Datadog-Amazon EventBridge 통합
short_description: 핵심 Amazon EventBridge 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">정부 사이트용 Datadog는 Amazon EventBridge를 지원하지 않습니다.</div>
{{< /site-region >}}

## 개요

Datadog와 Amazon EventBridge 통합은 다음 기능을 제공합니다.

- 통합 AWS 계정 전반에서 커스텀 이벤트 버스를 생성합니다.
- Datadog 알림 이벤트를 원하는 이벤트 버스로 전송합니다.
- AWS 내에서 이벤트 버스에 트리거를 설정하여 Kinesis, 람다 등과 같은 서비스로 트리거를 설정하세요.
- 알림 이벤트 내의 정보를 사용하여 자동 수정 파이프라인 및 런북을 실행하고, 분석 쿼리 등을 실행합니다.
- 본 통합은 GovCloud에서 지원되지 않습니다.

{{< img src="integrations/amazon_event_bridge/eventbridge_monitor_notification.png" alt="EventBridge로 전송되는 모니터링 알림" >}}

## 설정

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 설치

1. 알림을 수신하는 각 AWS 계정에 대해 기본 [AWS 통합][1]이 설치되어 있는지 확인합니다.
2. Datadog AWS 역할에 대한 정책 권한에 다음이 있는지 확인합니다.
   `events:CreateEventBus`
3. Amazon EventBridge 통합은 자동으로 기본 AWS 통합을 사용해 설치됩니다.

### 구성

`events:CreateEventBus` 및 `events:PutPartnerEvents` 권한이 있어야 이벤트 버스에 알림을 보낼 수 있습니다. 이 권한이 설정되어 있지 않은 경우 [Datadog IAM 권한 설명서][2]를 참조하여 설정 전에 권한을 활성화하세요.

1. [Datadog - Amazon EventBridge 통합][3] 타일 로 이동하여 Event Bridges를 생성할 수 있는 Datadog에 통합된 AWS 계정 목록을 확인합니다.
2. 선택한 AWS 계정 내에서 버스 이름을 제공하고 버스가 존재하길 원하는 지역을 선택하여 새로운 이벤트 버스를 생성합니다.
3. Datadog 알림 내에서 `@awseventbridge-<MY_EVENT_BUS>` 구문을 사용하여 알림을 이벤트 버스에 전송합니다.
4. AWS 내에서 이벤트 버스를 람다, Kinesis, [기타 다양한 서비스][4] 등의 대상에 연결하여 이벤트 기반 워크플로를 생성합니다.
   **참고**: Datadog 사용 사례 예시는 [AWS 콘솔][5]의 Datadog 파트너 페이지에서 찾아볼 수 있습니다.
5. Datadog에서 이벤트 버스를 설정한 후 [Amazon EventBridge 콘솔][6]로 이동해 탐색 창에서 `Rules`를 선택합니다.
6. `Create Rule`를 선택한 다음 규칙에 대한 이름과 설명을 추가합니다.
7. **패턴 정의**에서 `Event Pattern`를 선택합니다. `Predefined by service`을 "이벤트 일치 패턴**으로 선택합니다. **서비스 공급자**의 경우 `Service partners`를 선택합니다. **서비스 이름**의 경우 `Datadog`를 선택합니다. 그러면 Datadog에 있는 이벤트 버스가 채워집니다. 규칙에 대한 정보를 추가하려면 해당 규칙을 **저장**합니다.
8. Datadog에서 이벤트 버스를 연결 해제하려면 원하는 이벤트 버스 위를 마우스로 가리킨 다음 휴지통 아이콘을 누릅니다.
   **참고** 이 작업은 AWS에서 이벤트 버스를 연결 해제하지만 AWS 내에서 이벤트 버스를 삭제하지는 않습니다.

**참고**: EventBridge 규칙은 규칙이 활성 상태이고 트리거되지 않은 이상 Datadog에 가져오기되지 않습니다.

### 자동화된 작업

Amazon EventBridge 통합을 포함해 Datadog에서 모니터와 스냅샷에 대한 새로운 아웃바운드 알림 채널을 설정합니다. 자동화된 작업을 사용해 AWS 리소스도 설정할 수 있습니다.

* 프로세스가 [라이브 프로세스 모니터링][7]을 위해 종료되는 경우 프로세스를 다시 시작합니다.
* 즉시 EC2 재부팅
* 즉시 ECS 작업(한 작업 종료 시 다른 작업 시작)
* Ansible Playbook 적용(호스트에서 변경)
* 원격 패치 실행
* 원격 SSH 스크립트 실행
* Windows 업데이트 실행 또는 애플리케이션 설치

대상화할 수 있는 전체 리소스 목록은 [AWS 웹사이트][8]에서 사용할 수 있습니다.

아래 예에서 이 프로세스를 트리거하기 위해 스냅샷을 전송하는 방법을 알아보세요. 트리거되면 AWS 수신되는 작업을 지정할 수 있습니다.

{{< wistia uezo3fh61j >}}

## 수집한 데이터

### 메트릭

Amazon EventBridge 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Amazon EventBridge 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon EventBridge 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy
[3]: https://app.datadoghq.com/integrations/amazon-event-bridge
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[5]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[6]: https://console.aws.amazon.com/events/
[7]: https://docs.datadoghq.com/ko/monitors/monitor_types/process/
[8]: https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html
[9]: https://docs.datadoghq.com/ko/help/