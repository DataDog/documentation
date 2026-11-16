---
description: Fleet Automation을 사용하면 대규모 사용자 지정 로그 수집을 원격으로 구성할 수 있습니다.
further_reading:
- link: /agent/fleet_automation/
  tag: 문서
  text: Fleet Automation
- link: /agent/fleet_automation/configure_integrations/
  tag: 문서
  text: Agent Integrations 구성
- link: /agent/fleet_automation/configure_agents/
  tag: 문서
  text: Agent 구성
- link: /api/latest/fleet-automation/
  tag: 문서
  text: Fleet Automation API
- link: /agent/logs/
  tag: 문서
  text: 호스트 Agent 로그 수집
- link: /logs/guide/log-collection-troubleshooting-guide/
  tag: 문서
  text: 로그 수집 문제 해결 가이드
site_support_id: fleet-automation-standard-features
title: 사용자 지정 로그 설정
---
[Fleet Automation][2]을 사용하여 Agent의 [사용자 지정 로그 수집][4] 설정을 대규모로 원격 관리할 수 있습니다. `conf.d` 구성 파일을 호스트별로 편집하는 대신, 호스트 정보나 태그별로 변경 범위를 지정하고 일치하는 모든 Agent에 한 번에 배포할 수 있습니다. 배포하기 전에 범위 내 각 Agent의 구성 차이점을 검토하세요.

## 전제 조건 {#prerequisites}

- 조직과 Agent의 API 키에 대해 [Remote Configuration][1]이 활성화되어 있음
- 각 대상 VM Agent에 대해 [Remote updates][10]가 활성화되어 있음(`remote_updates: true`)
- Agent 버전 7.76 이상. Agent를 업그레이드하는 방법은 [Agent 업그레이드][5]를 참조하세요.
- Linux VM(설치 스크립트 또는 Ansible Datadog Role을 사용하여 설치됨) 또는 Windows VM
- 대상 Agent에 대해 로그 수집이 활성화됨(`datadog.yaml`에서 `logs_enabled: true`). Fleet Automation은 어떤 방식으로든 구성 파일을 배포하지만, 로그 수집이 활성화될 때까지 Agent는 로그 수집을 시작하지 않습니다. [호스트 Agent 로그 수집][8]을 참조하세요.

<div class="alert alert-info">
컨테이너화된 워크로드의 Agent에서 사용자 지정 로그를 구성하는 방식은 지원되지 않습니다. 컨테이너화된 환경의 경우 <a href="/containers/kubernetes/log/">Kubernetes 로그 수집</a>을 참조하세요.
</div>

## 여러 Agent 간에 사용자 지정 로그 구성 {#configure-custom-logs-across-multiple-agents}

<div class="alert alert-tip">구성 마법사를 진행하면 <strong>Configuration Summary</strong> 패널에 현재 선택된 Agent 범위가 표시됩니다. 이 패널을 사용하여 범위 내 특정 Agent의 구성 차이점을 미리 보고 변경 사항이 Agent에 미치는 영향을 확인할 수 있습니다.</div>

1. Fleet Automation에서 [{{< ui >}}Configuration{{< /ui >}}][2] 탭을 열고 {{< ui >}}Configure Agents{{< /ui >}}를 클릭합니다.
1. 구성의 범위를 대상 Agent로 지정합니다. 호스트 정보 또는 태그를 기준으로 필터링하여 특정 그룹을 대상으로 지정합니다.
1. {{< ui >}}Custom Logs{{< /ui >}}를 선택합니다.
1. 작업을 선택합니다(자세한 내용은 [구성 변경 사항이 적용되는 방식](#how-configuration-changes-are-applied) 참조).

    - {{< ui >}}Add New{{< /ui >}}. 새 구성 파일의 파일 이름을 지정하고 메시지에 따라 구성을 입력합니다. 로그 수집 필드에 대한 설명은 [사용자 지정 로그 수집][4]을 참조하세요. {{< ui >}}Tags{{< /ui >}} 필드를 사용하여 수집된 로그에 [태그][6]를 첨부합니다. {{< ui >}}\+ Add Log Collection{{< /ui >}}을 클릭하여 로그 수집 설정을 더 추가합니다.
    - {{< ui >}}Edit & Replace{{< /ui >}}. {{< ui >}}Select a File{{< /ui >}}을 클릭하고 교체할 구성 파일을 선택한 다음 로그 수집 설정을 업데이트합니다.
    - {{< ui >}}Delete{{< /ui >}}. {{< ui >}}Select a File to Delete{{< /ui >}}를 클릭합니다.

    <div class="alert alert-tip">로그 수집 구성을 작성할 때 <strong>Visual</strong> 모드와 <strong>YAML</strong> 모드 간에 전환합니다. YAML에 직접 붙여 넣으려면 <strong>YAML</strong> 모드를 사용하세요.</div>

1. 배포 계획을 검토합니다. Fleet Automation은 영향을 받는 각 Agent에 대한 구성 차이를 생성하므로 정확한 변경 사항을 확인할 수 있습니다.
1. {{< ui >}}Deploy Configuration{{< /ui >}}을 클릭하여 배포를 시작합니다. [Deployments 페이지][3]에서 진행 상황을 추적합니다.

## 구성 변경 사항이 적용되는 방식 {#how-configuration-changes-are-applied}

각 작업은 Agent의 사용자 지정 로그 수집에 변경 사항을 다르게 적용합니다.

- {{< ui >}}Add New{{< /ui >}}: 새 구성 파일을 배포합니다.

- {{< ui >}}Edit & Replace{{< /ui >}}: 전체 구성 파일을 교체합니다. 업데이트에 원하는 모든 값을 포함합니다. 생략한 값은 모두 제거됩니다.

- {{< ui >}}Delete{{< /ui >}}: 대상 Agent에서 구성 파일을 제거합니다.

## 로그 수집 확인 {#verify-log-collection}

구성을 배포한 후 다음 단계를 따르세요.

1. [Fleet Automation][9]에서 대상 Agent 중 하나의 세부 정보 페이지를 엽니다.
1. {{< ui >}}Configuration{{< /ui >}} 탭에서 새로 추가되거나 업데이트된 사용자 지정 로그 구성 파일이 오류 상태 없이 나열되어 있는지 확인합니다. 이는 구성이 성공적으로 푸시되어 적용되었음을 의미합니다.

배포는 성공했지만 로그가 도착하지 않으면 [로그 수집 문제 해결 가이드][7]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/guide/setup_remote_config
[2]: https://app.datadoghq.com/fleet/agent-management
[3]: https://app.datadoghq.com/fleet/deployments
[4]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /ko/agent/fleet_automation/upgrade_agents/
[6]: /ko/getting_started/tagging/assigning_tags/
[7]: /ko/logs/guide/log-collection-troubleshooting-guide/
[8]: /ko/agent/logs/
[9]: https://app.datadoghq.com/fleet
[10]: /ko/agent/guide/setup_remote_config/#enable-remote-agent-management