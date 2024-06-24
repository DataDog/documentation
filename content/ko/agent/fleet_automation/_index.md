---
disable_toc: false
further_reading:
- link: /agent/remote_config
  tag: 설명서
  text: 원격 설정에 대해 자세히 알아보기
- link: /infrastructure/list/#agent-configuration
  tag: 설명서
  text: Agent 설정 보기에 대해 알아보기
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: 블로그
  text: 플릿 자동화를 통해 대규모로 Datadog Agents를 중앙에서 원격으로 관리합니다.
title: 플릿 자동화
---

{{< callout btn_hidden="true">}}플릿 자동화는 베타 버전입니다. Datadog <a href="https://app.datadoghq.com/fleet">플릿 자동화</a> 페이지에서 이용할 수 있습니다.{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서는 플릿 자동화가 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

Datadog Fleet Automation을 사용하면 다양한 가시적 요구 사항을 지원하기 위해 대규모의 Datadog Agents를 중앙에서 원격으로 관리할 수 있습니다.

{{< img src="agent/fleet_automation/fleet-automation.png" alt="플릿 자동화 페이지" style="width:100%;" >}}

플릿 자동화 플랫폼을 통해 다음을 수행할 수 있습니다.
- Agent 및 Agent 통합 설정을 확인하여 배포 변경 사항을 확인하고 설정에 대한 일관성을 보장할 수 있습니다.
- 조직 내에서 플레어를 전송하여 Agent의 문제를 디버깅하는 데 걸리는 시간을 단축하세요.
- 오래된 Agent 버전을 식별하여 모든 Agents가 최신 기능 개선 사항을 사용하고 있는지 확인하세요.
- 특정 키를 사용하는 Agents와 Agents의 수를 식별하여 API 키를 교체하고 영향 없이 이전 키를 비활성화할 수 있도록 지원합니다.

플릿 자동화에 액세스하려면 **Integrations** > [**Fleet Automation**][1]을 클릭합니다.

플릿 자동화 페이지를 통해 모니터링되지 않는 호스트, 업데이트해야 하는 Agents 또는 통합 문제가 있는 Agents에 대한 인사이트를 얻을 수 있습니다. 각 Agent에 대해 다음을 확인해 보세요.
- Agent 버전
-  Agent에 미설정되었거나 잘못 설정된 통합이 있는지 여부
- Agent가 모니터링하는 서비스
- Agent의 원격 설정 상태
- Agent에서 사용 가능한 제품

Agent를 선택하면 설정, 연결된 통합, 원격 플레어 전송에 사용할 수 있는 지원 탭 등 Agent에 대한 자세한 정보를 확인할 수 있습니다.

{{< img src="agent/fleet_automation/fleet-automation-agent.png" alt="Agent 통합 정보" style="width:100%;" >}}

## 플릿 자동화 설정

플릿 자동화에는 Agent 버전 7.49/6.49 이상에서 자동으로 실행되는 여러 Datadog 기능이 포함되어 있습니다. 모든 기능에 액세스하려면 Agent를 버전 7.49/6.49 이상으로 업그레이드하세요.

이전 Agent를 사용하는 경우에도 다음 Datadog 기능을 개별적으로 실행할 수 있습니다:
- **원격 설정**: 지원되는 Agent 버전 및 설정 단계에 대한 자세한 내용은 [원격 설정 사용][3]을 참조하세요.
- **Agent 설정**: Agent 설정 탭을 활성화하려면 Agent 버전 7.39/6.39 이상이 필요합니다. Agent 버전 7.47.0/6.47.0 이상에서는 기본적으로 활성화되어 있습니다. 수동으로 Agent 설정을 활성화하려면 [Agent 설정 파일] [2]에서 `inventories_configuration_enabled`를 `true`로 설정하세요. 또는 `DD_INVENTORIES_CONFIGURATION_ENABLED` 환경 변수를 사용하세요.
- **Agent 통합 설정**: Agent 7.49/6.49 이상 버전에서는 기본적으로 Agent 통합 설정이 활성화되어 있습니다. 수동으로 Agent 통합 설정을 활성화하려면 [Agent 설정 파일][2]에서 `inventories_checks_configuration_enabled`를 `true`로 설정하세요. 또는 `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED` 환경변수를 사용하세요.

Datadog은 최신 기능에 액세스할 수 있도록 정기적으로 Agents를 업그레이드할 것을 권장합니다.

## 원격 플레어 전송

플레어를 보내기 전에 선택한 Agent에서 원격 설정이 [활성화](#configuring-fleet-automation)되어 있는지 확인합니다.

원격 플레어를 보내려면:
1. [Fleet Automation][1] 페이지에서 지원이 필요한 Agent를 선택합니다.
1. **Support**를 클릭합니다.
1. **Send Support Ticket**을 클릭합니다.
1. 기존 Zendesk 지원 티켓 번호를 입력하세요. 티켓 번호를 입력하지 않으면 새로운 티켓 번호가 생성됩니다.
1. **Debug mode**를 활성화하면 Datadog 지원 담당자가 문제를 더 빨리 해결할 수 있습니다. 플레어를 보낸 후 로그 레벨이 이전 설정으로 재설정됩니다.
1. **Send Ticket*을 클릭합니다.

{{< img src="agent/fleet_automation/fleet-automation-flares.png" alt="Send Ticket 버튼은 기존 또는 새 지원 티켓에 대한 플레어를 보내는 양식을 실행합니다" style="width:100%;" >}}

## 플릿 자동화에 대한 액세스 제어

플릿 자동화는 Datadog 조직의 모든 사용자가 사용할 수 있습니다. 또한, 특정 기능에 대한 액세스를 제어할 수 있습니다:

| 권한 | 설명 |
|--------------|---------------|
| `API keys read`| API 키를 통해 Agents를 보고 검색할 수 있는 사용자를 제한합니다. |
| `Agent flare collection` | 원격으로 플레어를 보낼 수 있는 사용자를 제한합니다. |

역할 및 권한 설정에 대한 자세한 내용은 [액세스 제어][5]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /ko/agent/configuration/agent-configuration-files/
[3]: /ko/agent/remote_config#enabling-remote-configuration
[4]: /ko/infrastructure/list/#agent-configuration
[5]: https://docs.datadoghq.com/ko/account_management/rbac/