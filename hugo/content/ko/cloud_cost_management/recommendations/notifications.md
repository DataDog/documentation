---
description: 사용자가 정의한 범위와 일치하는 Cloud Cost 권장 사항에 대한 정기적인 Slack 요약을 전송하는 알림 규칙을 설정합니다.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: 설명서
  text: Cloud Cost Recommendation
- link: /cloud_cost_management/recommendations/cost_optimization_automation/
  tag: 설명서
  text: 비용 최적화 자동화
title: Notifications
---
## 개요 {#overview}

알림 규칙은 리소스에 대해 어떠한 작업도 수행하지 않고, 사용자가 정의한 범위와 일치하는 [Cloud Cost 권장 사항][1]에 대한 정기적인 Slack 요약을 전송합니다. Datadog이 자동으로 변경 사항을 적용하도록 구성하지 않고 새로운 비용 절감 기회에 대한 가시성을 확보하려는 경우 알림 규칙을 사용하세요.

알림 규칙은 정기적인 일정에 따라 권장 사항에 직접 작업을 수행하는 [비용 최적화 자동화][2]와는 다릅니다.

## 전제 조건 {#prerequisites}

- Slack 연결. [Slack 통합][3]을 참조하세요.
- 알림 규칙을 생성하거나 편집하는 데 필요한 **Cloud Cost Management - Cloud Cost Management 쓰기** 권한.

## 알림 규칙 설정 {#set-up-a-notification-rule}

알림 규칙을 설정하려면 다음 단계를 따르세요.

1. [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4]로 이동합니다.
1. {{< ui >}}Notification{{< /ui >}} 탭을 선택합니다.
1. {{< ui >}}Define scope{{< /ui >}} 섹션에서 {{< ui >}}Team{{< /ui >}}, {{< ui >}}Recommendation Type{{< /ui >}}, {{< ui >}}Env{{< /ui >}} 필터를 사용하여 일치하는 리소스로 알림을 제한합니다. {{< ui >}}+ Filter{{< /ui >}}를 클릭하여 필터를 더 추가합니다. 모든 리소스를 포함하려면 필터를 비워 둡니다.
1. {{< ui >}}Set schedule{{< /ui >}} 섹션에서 알림 빈도, 실행 요일, 실행 시간 및 시간대를 선택합니다.
1. {{< ui >}}Destination{{< /ui >}} 섹션에서 Slack 작업 공간 연결 및 채널을 선택합니다.
1. 알림 규칙의 이름을 입력합니다.
1. (선택 사항) 알림 메시지에 특정 Slack 사용자를 언급합니다.
1. (선택 사항) {{< ui >}}Notification enabled{{< /ui >}} 토글을 꺼서 규칙을 활성화하지 않고 생성합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 알림 규칙 관리 {#manage-notification-rules}

{{< ui >}}Notification{{< /ui >}} 탭에는 조직의 모든 알림 규칙이 나열됩니다. 이 페이지에서 다음을 수행할 수 있습니다.

- 규칙을 삭제하지 않고 켜기 또는 끄기
- 규칙의 범위, 일정, 대상 또는 이름 편집
- 규칙 삭제

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/recommendations/
[2]: /ko/cloud_cost_management/recommendations/cost_optimization_automation/
[3]: /ko/integrations/slack/
[4]: https://app.datadoghq.com/cost/optimize/automations