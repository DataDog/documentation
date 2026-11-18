---
description: Fleet Automation을 사용하여 Datadog Agent를 원격으로 업그레이드할 수 있습니다.
further_reading:
- link: /agent/fleet_automation/
  tag: 설명서
  text: Fleet Automation
- link: /api/latest/fleet-automation/
  tag: 설명서
  text: Fleet Automation API
title: Agent 업그레이드
---
Fleet Automation을 사용하면 개별 호스트에 직접 액세스하지 않아도 전체 플릿에서 Datadog Agent를 원격으로 업그레이드할 수 있습니다. 업그레이드를 즉시 트리거하거나 유지 관리 기간 중 예약하거나 Terraform 또는 API를 통해 자동화할 수 있습니다.

## 전제 조건 {#prerequisites}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
US1-FED 및 US2-FED에서 원격 업그레이드를 수행하려면 Linux와 Windows 모두에서 Agent 7.85.0 이상이 필요합니다. 이전 버전을 실행 중인 경우 Fleet Automation을 통해 업그레이드하기 전에 <a href="https://app.datadoghq.com/fleet/install-agent/latest?platform=overview">Agent 설치 지침</a>에 따라 업데이트하세요.
</div>
{{< /site-region >}}

- 조직과 Agent의 API 키에 대해 [Remote Configuration][7]이 활성화되어 있음
- 각 대상 VM Agent에 대해 [원격 업데이트][8]가 활성화되어 있음(`remote_updates: true`)
- Windows의 경우 Agent 버전 7.71.1 이상, Linux의 경우 7.69.0 이상
- Linux VM 또는 Windows VM
- 최초로 Agent를 설치하려면 최소 2GB의 디스크 공간이 필요하며 업그레이드하는 경우 2GB가 추가로 필요합니다. (업그레이드하려면 Linux의 경우 `/opt/datadog-packages`에 1.3GB, Windows의 경우 `C:\ProgramData\Datadog\Installer\packages`에 1.3GB가 필요합니다. 추가 공간은 롤백이 필요한 경우를 대비하여 업그레이드 중에 2개의 Agent 설치를 일시적으로 유지합니다.)

<div class="alert alert-info">
컨테이너화된 워크로드에서 Agent 원격 업그레이드는 지원되지 않습니다.
</div>

## Agent 즉시 업그레이드 {#upgrade-agents-immediately}

1. [{{< ui >}}Upgrades{{< /ui >}}][1] 탭에서 {{< ui >}}Upgrade Now{{< /ui >}}를 클릭합니다.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="Upgrade Now 버튼이 있는 Upgrades 탭입니다." style="width:100%;" >}}
1. 업그레이드할 Agent를 선택합니다. 호스트 정보 또는 태그를 기준으로 필터링하여 특정 그룹을 대상으로 지정합니다.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="업그레이드할 Agent 목록의 범위를 좁히기 위한 필터링 옵션이 있는 Agent 선택 화면입니다." style="width:100%;" >}}

1. 배포 계획을 검토하고 {{< ui >}}Upgrade Agents{{< /ui >}}를 클릭하여 업그레이드를 시작합니다.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="업그레이드를 위해 준비된 Agent 목록을 조회할 수 있는 배포 계획 보기입니다." style="width:100%;" >}}

1. [Deployments][2] 대시보드에서 진행 상황을 추적합니다. 배포 테이블에서 Agent를 클릭하여 소요 시간, 진행 상황 및 업그레이드를 시작한 사용자를 조회합니다.
   {{< img src="/agent/fleet_automation/deployments.png" alt="각 Agent의 업그레이드 진행 상황 및 세부 정보를 보여주는 배포 대시보드입니다." style="width:100%;" >}}

## Agent 업그레이드 예약 {#schedule-agent-upgrades}

1. [{{< ui >}}Upgrades{{< /ui >}} 탭][1]에서 {{< ui >}}\+ Create Schedule{{< /ui >}}을 클릭합니다.

1. 업그레이드 일정 페이지에서 {{< ui >}}Schedule name{{< /ui >}}을 추가합니다.

1. Agent 버전을 선택합니다. 최신 버전, 최신 버전보다 한 단계 이전 버전 또는 두 단계 이전 버전으로 업그레이드할 수 있습니다. 

   {{< img src="/agent/fleet_automation/agent_upgrade_select_version1.png" alt="예약된 Agent 업그레이드 목록을 확인합니다." style="width:100%;" >}}

1. 업그레이드할 Agent를 지정합니다. 호스트 정보 또는 태그를 기준으로 필터링하여 특정 그룹을 대상으로 지정합니다.
   
   {{< img src="/agent/fleet_automation/agent_upgrade_select_agents.png" alt="업그레이드할 Agent 목록을 확인합니다." style="width:100%;" >}}

1. 이러한 업그레이드의 배포 기간을 설정합니다. 업그레이드할 요일, 시간 프레임, 표준 시간대를 선택할 수 있습니다.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_window.png" alt="Agent 업그레이드의 시간 프레임을 선택합니다." style="width:100%;" >}}

1. 배포 상태 업데이트에 대한 알림을 설정합니다. Slack, Teams, PagerDuty와 같이 Datadog에 연결된 서비스를 통해 팀에 알립니다.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_notification.png" alt="업그레이드 진행 상황에 대해 알림을 받을 사람이나 채널을 선택합니다." style="width:100%;" >}}

1. {{< ui >}}Create Schedule{{< /ui >}}을 클릭하여 일정을 저장합니다. 

1. [{{< ui >}}Upgrades{{< /ui >}} 탭][1]의 {{< ui >}}Upgrade Schedules{{< /ui >}} 섹션에서 예약된 업그레이드 목록을 확인합니다. 

   {{< img src="/agent/fleet_automation/agent_upgrade_schedule_list3.png" alt="Agent에 대해 예약된 업그레이드 목록을 확인합니다." style="width:100%;" >}}

## API를 사용하여 Agent 업그레이드 {#upgrade-agents-with-the-api}

Fleet Automation은 프로그래밍 방식이나 반복 일정에 따라 Agent 업그레이드를 트리거할 수 있는 API를 제공합니다. 필터 쿼리를 사용하여 원하는 호스트 집합의 업그레이드를 시작하거나 지정된 Agent 버전으로 정해진 유지 관리 기간에 실행되는 일정을 생성합니다. 자세한 정보는 [Fleet Automation API][3]를 참조하세요.

## Terraform으로 Agent 업그레이드 예약 {#schedule-agent-upgrades-with-terraform}

Datadog Terraform 공급자를 사용하여 Agent 업그레이드 일정을 코드로 생성하고 관리하세요. `datadog_fleet_schedule` 리소스는 대상 호스트, Agent 버전 및 반복 유지 관리 기간을 정의합니다. Fleet Automation은 일정에 따라 업그레이드를 수행합니다.

시작에 앞서 다음 작업을 수행합니다.

- Agent가 [업그레이드 전제 조건](#prerequisites)을 충족하는지 확인하세요.
- [Datadog Terraform 공급자를 설정하세요][9](버전 4.22.0 이상).
- `agent_upgrade_write` 및 `hosts_read` 권한이 있는 애플리케이션 키를 사용하세요.

다음 예제는 `env:staging service:example`과 일치하는 호스트에 대한 비활성 일정을 정의합니다. 이 일정은 최신 Agent 버전(`version_to_latest = 0`)을 대상으로 합니다. 이 일정은 `America/New_York` 시간대의 화요일 및 목요일 03:00에 시작하는 2시간 유지 관리 기간(`maintenance_window_duration = 120`, 분 단위)을 지정합니다.

```hcl
resource "datadog_fleet_schedule" "staging" {
  name              = "Staging Agent upgrades"
  query             = "env:staging service:example"
  status            = "inactive"
  version_to_latest = 0

  rule = {
    days_of_week                = ["Tue", "Thu"]
    maintenance_window_duration = 120
    start_maintenance_window    = "03:00"
    timezone                    = "America/New_York"
  }
}
```

호스트 쿼리 및 유지 관리 기간을 사용자 환경의 값으로 바꾸세요. `terraform plan` 명령을 실행하여 변경 사항을 검토한 다음 `terraform apply` 명령을 실행하여 일정을 생성하세요. 예약된 업그레이드를 활성화할 준비가 되면 `status` 값을 `active`로 설정하고 변경 사항을 적용하세요.

지원되는 모든 옵션 및 기존 일정 가져오기에 대한 지침은 [`datadog_fleet_schedule` 리소스 설명서][10]를 참조하세요.

## 업그레이드 프로세스 {#upgrade-process}

수동 업그레이드와 마찬가지로, Agent가 다시 시작되는 동안 5~30초간 가동 중지가 발생할 수 있습니다. 전체 업그레이드 프로세스는 약 5분 정도 소요됩니다. 업그레이드 자체에 약 2분이 소요되며 나머지 시간은 안정성을 모니터링하는 데 사용됩니다. 업그레이드에 실패하면 Agent가 자동으로 이전 버전으로 되돌아갑니다.

업그레이드 프로세스는 주로 다음 디렉터리에 파일을 추가합니다.

Linux:
- `/opt/datadog-packages`
- `/etc/datadog-agent`
- `/etc/systemd/system`

Windows:
- `C:\ProgramData\Datadog\Installer\packages`
- `C:\Program Files\Datadog\Datadog Agent`

Agent는 이러한 파일에 대해 적절한 권한을 설정합니다. 업그레이드 중에 구성 파일은 변경되지 않습니다.

## 업그레이드 우선순위 {#upgrade-precedence}

하나의 소스에서 한 번에 업그레이드를 관리하는 것이 좋습니다. Fleet Automation 또는 구성 관리 도구 중 하나만 사용하고 둘 다 사용하지 마세요. Fleet Automation을 통해 업그레이드된 Agent에서 구성 관리 도구를 실행하면, 해당 도구는 구성에서 Agent를 [`DD_AGENT_MINOR_VERSION`][4](으)로 되돌립니다. `DD_AGENT_MINOR_VERSION`이 설정되지 않은 경우 Agent는 사용 가능한 최신 버전으로 업그레이드됩니다.

## 문제 해결 {#troubleshooting}

### 원격 Agent 관리가 활성화되지 않음 {#remote-agent-management-is-not-enabled}

Agent의 측면 패널에 **Remote Agent Management: NOT ENABLED**가 표시되면 [원격 Agent 관리 활성화][8]에 따라 호스트에서 `remote_updates`를 활성화하고 Agent를 다시 시작합니다. 원격 업데이트가 비활성화된 상태에서도 Remote Configuration을 연결할 수 있습니다.

Agent를 여전히 업그레이드할 수 없는 경우에는 [전제 조건](#prerequisites), Remote Configuration 연결 상태, Datadog Installer 실행 여부를 확인하세요.

### 새로 릴리스된 Agent 버전으로 아직 업그레이드할 수 없음 {#newly-released-agent-version-is-not-yet-available-for-upgrade}

새 Agent 버전이 릴리스되면 Fleet Automation에 업그레이드 대상으로 표시되기까지 최대 24시간이 걸릴 수 있습니다. 최근 출시된 버전이 업그레이드 선택기에 표시되지 않으면 최대 24시간까지 기다린 후 다시 시도해 보세요.

### Datadog 설치 프로그램이 Agent(7.66 이전 버전)와 호환되지 않음 {#datadog-installer-incompatible-with-agent-pre-766}

Preview 고객이었고 Agent 버전 7.66 이전에 원격 Agent 관리 활성화를 설정했다면 Datadog 설치 프로그램이 Agent와 호환되지 않을 수 있습니다.

버전 7.66부터는 설치 프로그램 구성 요소가 Agent와 함께 번들로 제공됩니다. 이렇게 하면 두 구성 요소가 동기화된 상태로 유지되어 원격 관리를 차단할 수 있는 버전 불일치를 방지합니다. 이전 Agent 버전에서는 설치 프로그램이 번들로 포함되지 않아 호환성 문제가 발생할 수 있습니다.

문제를 진단하고 해결하려면 다음 단계를 따르세요.

1. 영향을 받는 호스트를 식별하려면 다음 [Fleet Automation의 쿼리][5]를 사용합니다.
   ```txt
   support_remote_upgrade:datadog-installer
   ```
1. 사용 중인 환경이 영향을 받는 경우 각 Agent에서 [설치 스크립트를 다시 실행][6]하여 [전제 조건](#prerequisites)을 충족하는 Agent 버전으로 업그레이드합니다.

업데이트 후 향후 업그레이드에 Fleet Automation을 사용할 수 있도록 [원격 Agent 관리 활성화][8]를 수행하세요. 업그레이드하지 않아도 기존 Agent는 계속 작동하지만 원격 업그레이드는 사용할 수 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-upgrades
[2]: https://app.datadoghq.com/fleet/deployments
[3]: /ko/api/latest/fleet-automation/
[4]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[5]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[7]: /ko/agent/guide/setup_remote_config
[8]: /ko/agent/guide/setup_remote_config/#enable-remote-agent-management
[9]: /ko/getting_started/integrations/terraform/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/fleet_schedule