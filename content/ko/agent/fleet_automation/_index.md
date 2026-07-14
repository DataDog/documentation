---
aliases:
- /ko/agent/fleet_automation/remote_management
description: 구성 보기, 업그레이드, 플레어 수집 및 API 키 교체 기능을 통해 대규모 환경의 Datadog Agent와 OpenTelemetry
  Collector를 중앙에서 관리하고 원격으로 운영할 수 있습니다.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: 블로그
  text: Datadog Fleet Automation으로 인프라 및 애플리케이션 모니터링을 중앙에서 설정하고 확장하기
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: 블로그
  text: Datadog Fleet Automation으로 모든 OpenTelemetry Collector 관리하기
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: 블로그
  text: DDOT 게이트웨이를 통해 OpenTelemetry 파이프라인을 중앙에서 관리 및 제어
- link: /remote_configuration
  tag: 설명서
  text: Remote Configuration에 대해 자세히 알아보기
- link: /infrastructure/list/#agent-configuration
  tag: 설명서
  text: Agent 구성 보기에 대해 알아보기
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: 블로그
  text: Fleet Automation을 사용하여 Datadog Agent를 중앙에서 관리하고 원격으로 운영하기
title: Fleet Automation
---
## 개요 {#overview}

Datadog Fleet Automation을 사용하면 변화하는 관측성 요구를 지원하기 위해 대규모 환경의 Datadog Agent와 OpenTelemetry(OTel) Collector를 중앙에서 관리하고 원격으로 운영할 수 있습니다.

{{< img src="/agent/fleet_automation/fleet-automation-main.png" alt="Agent 목록과 버전, 상태, 활성화된 제품이 표시된 Fleet Automation 페이지." style="width:100%;" >}}

## 주요 기능 {#key-capabilities}

Fleet Automation으로 다음 작업을 수행할 수 있습니다.
과거 변경 이력과 함께 - **[Agent 및 OTel Collector 구성을 조회][3]**하여 배포 업데이트를 확인하고 구성 일관성을 검증할 수 있습니다.
- **[Datadog Agent 구성][4]**을 통해 구성을 중앙에서 관리하고 환경에 대한 가시성을 더 빠르게 확보할 수 있습니다.
- **[플릿 최신 상태로 유지][5]**하여 오래된 Agent 및 OTel Collector 버전을 식별하고 업그레이드할 수 있습니다.
- **[원격으로 지원 플레어를 전송][6]**하여 Agent 또는 DDOT Collector의 문제를 디버깅하는 데 필요한 시간을 줄일 수 있습니다.

## Fleet Automation API {#fleet-automation-api}

Fleet Automation은 Datadog Agent를 대규모로 조회하고 관리할 수 있는 공개 API를 제공합니다. 전체 엔드포인트 세부 정보 및 사용 예시는 [Fleet Automation API 설명서][1]를 참조하세요. 

<div class="alert alert-info">
Fleet Automation API는 Datadog Agent의 모든 구성 기능을 지원하지는 않습니다.
</div>

## Fleet Automation에 대한 액세스 제어 {#control-access-to-fleet-automation}

Fleet Automation은 Datadog 조직의 모든 사용자가 사용할 수 있습니다. 특정 기능에 대한 액세스는 제어할 수 있습니다.

| 권한 | 설명 |
|--------------|---------------|
| `API Keys Read`| 어떤 사용자가 API 키를 기준으로 Agent를 조회하고 검색할 수 있는지 제한합니다. |
| `Agent Flare Collection` | 어떤 사용자가 Fleet Automation에서 원격으로 플레어를 전송할 수 있는지 제한합니다. |
| `Agent Upgrade` | 어떤 사용자가 Fleet Automation에서 Agent 업그레이드를 수행할 수 있는지 제한합니다. |
| `Agent Configuration Management` | 어떤 사용자가 Fleet Automation에서 Agent 구성을 수행할 수 있는지 제한합니다. |

역할 및 권한 설정에 대한 자세한 내용은 [Access Control][2]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/fleet-automation/
[2]: /ko/account_management/rbac/
[3]: /ko/agent/fleet_automation/fleet_view/
[4]: /ko/agent/fleet_automation/configure_agents/
[5]: /ko/agent/fleet_automation/upgrade_agents/
[6]: /ko/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site