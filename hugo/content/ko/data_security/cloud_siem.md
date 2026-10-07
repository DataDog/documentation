---
disable_toc: false
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 제출된 주요 데이터 카테고리 검토
- link: /data_security/pci_compliance/
  tag: 설명서
  text: PCI 준수 Datadog 조직 설정
title: Cloud SIEM 데이터 보안
---
<div class="alert alert-info">이 페이지에서는 Datadog으로 전송되는 데이터의 보안을 다룹니다. 클라우드 및 애플리케이션 보안 제품과 기능을 찾고 있다면 <a href="/security/" target="_blank">보안</a> 섹션을 참조하세요.</div>

## 개요 {#overview}

Datadog은 탐지 규칙에 정의된 케이스 중 하나 이상이 지정된 기간 동안 일치하면 보안 신호를 생성합니다. 탐지 규칙을 사용자 지정하여 신호에 대한 특정 정보(예: 사용자 ID, IP 주소 등)와 신호의 트리거 그룹화 값이 포함된 알림 메시지를 제공할 수 있습니다. 보안 규칙은 웹훅을 사용하여 타사 서비스에 알림을 전송할 수도 있습니다.

Datadog으로 전송되는 데이터에는 민감한 정보가 포함될 수 있으므로 이 문서에서는 해당 알림 기능과 사용자가 이러한 기능을 사용할 수 없도록 하려는 경우 취해야 할 조치에 대해 설명합니다.

## 보안 규칙은 메시지 템플릿 변수를 사용할 수 있음 {#security-rules-can-use-message-template-variables}

탐지 규칙을 생성할 때 [알림 변수][1]를 사용하여 알림 메시지를 사용자 지정할 수 있으며, 이를 통해 신호와 관련된 특정 정보가 추가됩니다. 예를 들어, 다음 JSON 객체가 보안 신호와 연결된 경우

```
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "user": {
    "id": "user@domain.com"
  },
  "used_mfa": "false"
}
```
알림 메시지에 '{{@network.client.ip}}'를 사용하면 신호와 연결된 IP 주소가 표시됩니다.

사용자가 알림 메시지에 템플릿 변수를 추가하지 못하게 하려면 [지원팀][2]에 문의하세요.

## 보안 규칙은 알림 제목에 트리거 그룹화 값을 포함할 수 있음 {#security-rules-can-include-triggering-group-by-values-in-the-notification-title}

[탐지 규칙][3]의 {{< ui >}}Describe your playbook{{< /ui >}} 섹션에서 알림 제목에 그룹화 값을 추가할 수 있습니다. 예를 들어, `service`별로 그룹화하는 경우 서비스 이름이 제목에 표시됩니다. 제목에 그룹화 값이 표시되지 않게 하려면 {{< ui >}}Include triggering group-by values in notification title{{< /ui >}}을 선택 취소하세요.

{{< ui >}}Include triggering group-by values in notification title{{< /ui >}} 옵션을 제거하려면 [지원팀][2]에 문의하세요.

## 보안 규칙은 웹훅을 사용할 수 있음 {#security-rules-can-use-webhooks}

<div class="alert alert-warning">2024년 이전에 조직에서 HIPAA를 활성화한 경우, <a href = "https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 문의하여 보안 규칙에 대한 웹훅을 활성화하세요.</a></div>

보안 알림은 Jira, PagerDuty 및 [웹훅][5]과 같은 [통합][4]으로 전송될 수 있습니다. 사용자가 웹훅을 사용하여 타사 서비스로 알림을 전송하지 못하게 하려면 [지원팀][2]에 문의하세요.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/notifications/variables/?tab=cloudsiem#template-variables
[2]: /ko/help/
[3]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule#describe-your-playbook
[4]: /ko/security/notifications/#integrations
[5]: /ko/integrations/webhooks/