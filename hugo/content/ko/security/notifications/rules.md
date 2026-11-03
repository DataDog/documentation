---
aliases:
- /ko/security_platform/notification_profiles/
- /ko/security_platform/notification_rules/
- /ko/security_platform/notifications/rules/
- /ko/security/notification_profiles/
- /ko/security/notification_rules/
- /ko/security/upcoming_changes_notification_rules/
description: 보안 탐지 규칙이 트리거될 때 팀 및 통합에 자동으로 알림이 전송되도록 알림 규칙을 생성하세요.
further_reading:
- link: /security/detection_rules/
  tag: 문서
  text: 보안 탐지 규칙 살펴보기
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: 알림 규칙
---
{{< product-availability >}}

## 개요 {#overview}

알림 규칙은 보안 문제에 대해 팀에 알리는 프로세스를 자동화하는 사전 정의된 조건 집합입니다. 알림 규칙을 사용하면 각 탐지 규칙에 대해 수동으로 알림을 설정할 필요가 없습니다. 알림 규칙은 중증도, 규칙 유형, 규칙 태그, 신호 속성 및 신호 태그와 같은 파라미터를 지정하여 광범위한 시나리오를 다루도록 구성할 수 있습니다.

{{< img src="security/notification-rules-overview-1.png" alt="알림 규칙 개요 페이지" style="width:100%;" >}}

## 알림 규칙 생성 {#create-notification-rules}

알림 규칙을 생성하려면 규칙이 트리거되어야 하는 조건을 지정합니다. 이러한 조건에는 중증도, 탐지 규칙 유형, 태그 및 속성과 같은 기준이 포함될 수 있습니다. 문제가 정의된 기준과 일치하면 규칙이 지정된 수신자에게 자동으로 알림을 보냅니다.

<div class="alert alert-info">규칙을 구성하면 알림 규칙 조건과 일치하는 문제의 미리 보기가 <strong>Preview of Matching Results</strong> 패널에 나타납니다. 이 미리 보기는 알림 규칙이 너무 구체적인지 또는 너무 광범위한지 판단하는 데 도움이 되며, 이에 따라 최적의 범위를 위해 기준을 조정할 수 있습니다.</div>

1. [**Notification Rules**][1] 페이지에서 {{< ui >}}New Notification Rule{{< /ui >}}을 클릭합니다.
1. 알림 규칙의 **Name**을 입력합니다.
1. 알림 규칙의 소스 유형을 선택합니다.
    - **발견 사항**: 인프라의 잠재적인 보안 결함입니다.
    - **신호**: 인프라에 대해 적극적인 위협을 가하는 의심스러운 활동입니다.
1. 하나 이상의 중증도 수준을 선택합니다.
1. 알림 규칙을 트리거하기 위해 있어야 하는 태그와 속성을 지정합니다.
   <div class="alert alert-tip">3단계에서 <strong>신호</strong>를 선택한 경우, 다음 태그를 추가하여 완료된 <a href="/bits_ai/bits_security_analyst">Bits Security Analyst</a> 조사에 대한 알림을 받을 수 있습니다. <code>@workflow.bits_investigator.state:*</code></div>
1. 3단계에서 **발견 사항**을 선택한 경우 알림 주기를 선택합니다.
   - **Aggregate results over**: 이 옵션을 선택한 후 목록에서 기간을 선택하면 해당 기간 동안 발생한 탐지에 대해 알림을 하나만 받을 수 있습니다.
   - **Trigger immediately for each individual issue meeting the criteria**: 이 옵션을 선택하면 각 탐지에 대해 알림을 하나씩 받을 수 있습니다. <br />**참고**: 이 옵션을 선택하면 많은 수의 알림이 전송될 수 있습니다.
1. **Destination**에서 라우팅 모드를 선택합니다.
    - **Manual routing**: {{< ui >}}Add Recipient{{< /ui >}}를 클릭하고 알림을 보낼 수신자를 지정합니다. 개인이나 팀에게 알림을 보내거나, Jira 이슈를 생성하는 등의 작업을 수행할 수 있습니다. 자세한 내용은 [알림 채널][2]을 참조하세요.
    - **Dynamic routing**(미리 보기): 발견 사항의 `team` 태그를 기반으로 담당 팀에 알림을 자동으로 라우팅합니다. 동적으로 라우팅할 수 없는 발견 사항에 대해 **Fallback Channel**을 지정합니다. 요구 사항은 [Dynamic routing](#dynamic-routing)을 참조하세요. <br />**참고**: 동적 라우팅은 6단계에서 **Trigger immediately for each individual issue meeting the criteria**가 선택된 경우에만 사용할 수 있습니다.
1. 이 규칙에 대한 테스트 알림을 보내려면 {{< ui >}}Test Notifications{{< /ui >}}를 클릭합니다.
  1. 모달에서 테스트하려는 보안 제품을 선택합니다.
  1. {{< ui >}}Run Test{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 알림 규칙 관리 {#manage-notification-rules}

### 알림 규칙 활성화 또는 비활성화 {#enable-or-disable-a-notification-rule}

알림 규칙을 활성화하거나 비활성화하려면 알림 규칙 카드의 스위치를 전환하세요.

### 알림 규칙 편집 {#edit-a-notification-rule}

알림 규칙을 편집하려면 알림 규칙 카드를 클릭하세요. 변경을 완료한 후 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 알림 규칙 복제 {#clone-a-notification-rule}

알림 규칙을 복제하려면 알림 규칙 카드의 세로 점 3개 메뉴를 클릭하고 {{< ui >}}Clone{{< /ui >}}을 선택하세요.

### 알림 규칙 삭제 {#delete-a-notification-rule}

알림 규칙을 삭제하려면 알림 규칙 카드에서 세로 점 3개 메뉴를 클릭하고 {{< ui >}}Delete{{< /ui >}}를 선택하세요.

## 동적 라우팅 {#dynamic-routing}

{{< callout url="https://www.datadoghq.com/product-preview/dynamic-routing-for-security-notifications/" >}}
알림 규칙에 대한 동적 라우팅은 미리 보기로 제공되고 있으며 집계되지 않은 발견 사항 알림에만 사용할 수 있습니다.
{{< /callout >}}

동적 라우팅은 발견 사항에 첨부된 `team` 태그를 기반으로 수정 작업 담당 팀에 발견 사항 알림을 자동으로 전달합니다. 이렇게 하면 각 규칙에 대해 수신자를 수동으로 구성할 필요가 없으며 모든 알림을 포괄하는 채널을 사용하지 않아도 됩니다.

동적 라우팅은 알림 주기로 **Trigger immediately for each individual issue meeting the criteria**가 선택된 경우에만 사용할 수 있으며, 신호 알림에는 사용할 수 없습니다.

### 라우팅 작동 방식 {#how-routing-works}

발견 사항이 알림을 트리거하면 시스템은 다음 모든 조건을 확인하세요. 모든 조건이 충족되면 알림이 팀의 Slack 또는 Microsoft Teams 채널로 전달됩니다. 조건이 하나라도 충족되지 않으면 알림은 구성한 폴백 채널로 전송됩니다.

| 조건                                         | 설명                                                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **팀 구성됨**                               | 발견 사항의 `team` 태그가 참조하는 팀이 [Datadog Teams][3]에 존재해야 합니다.                                        |
| **팀 Slack 또는 Microsoft Teams 채널 정의됨** | 해당 팀에 대해 Datadog Teams에서 Slack 또는 Microsoft Teams [알림 채널][4]이 구성되어 있어야 합니다. 다른 알림 대상은 동적 라우팅에 사용되지 않습니다. |
| **발견 사항의 팀 태그**                           | 보안 발견 사항에는 정확히 하나의 `team` 태그가 첨부되어 있어야 합니다.                                                          |

팀에 Slack 또는 Microsoft Teams 채널과 다른 알림 대상이 모두 구성되어 있는 경우, 알림은 Slack 또는 Microsoft Teams 채널로만 전달됩니다.

### 폴백 채널 {#fallback-channel}

동적 라우팅을 활성화할 때는 폴백 채널을 지정해야 합니다. 폴백 채널은 다음 중 하나라도 해당하는 경우 알림을 수신합니다.

- 발견 사항에 `team` 태그가 없거나 `team` 태그가 두 개 이상인 경우
- Datadog Teams에 해당 팀이 존재하지 않는 경우
- 해당 팀에 Slack 또는 Microsoft Teams 알림 채널이 구성되어 있지 않은 경우

폴백 채널은 테스트 알림에도 사용됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-rules
[2]: /ko/security/notifications/#notification-channels
[3]: /ko/account_management/teams/
[4]: /ko/account_management/teams/#send-notifications-to-a-specific-communication-channel