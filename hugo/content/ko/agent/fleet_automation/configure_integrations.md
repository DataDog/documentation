---
description: Fleet Automation을 사용하여 대규모 Datadog Agent 통합을 원격으로 구성할 수 있습니다.
further_reading:
- link: /agent/fleet_automation/
  tag: 문서
  text: Fleet Automation
- link: /agent/fleet_automation/configure_agents/
  tag: 문서
  text: Agent 구성
- link: /api/latest/fleet-automation/
  tag: 문서
  text: Fleet Automation API
site_support_id: fleet-automation-standard-features
title: Agent Integrations 구성
---
Fleet Automation은 Agent의 [통합][1] 구성 파일(`conf.d`)을 원격으로 배포, 업데이트 및 제거할 수 있습니다. 호스트 또는 태그별로 대상 Agent를 선택하고 통합을 선택하면 Fleet Automation이 플릿 전체에 구성 변경 사항을 푸시합니다.

## 전제 조건 {#prerequisites}

- 조직과 Agent의 API 키에 대해 활성화된 [원격 구성][2]
- 각 대상 VM Agent에서 [원격 업데이트][7]가 활성화됨(`remote_updates: true`)
- Agent 버전 7.76 이상. Agent를 업그레이드하려면 [Agent 업그레이드][6]를 참조하세요.
- Linux VM(설치 스크립트 또는 Ansible Datadog Role을 사용하여 설치됨) 또는 Windows VM

<div class="alert alert-info">
컨테이너화된 워크로드의 Agent에서 통합을 구성하는 방식은 지원되지 않습니다.
</div>

## 호환성 {#compatibility}

Fleet Automation은 Redis, MySQL, Windows Certificate Store와 같이 `conf.d` 구성 파일이 있는 기본 제공 통합을 구성하는 방식을 지원합니다.

사용자 지정 검사는 **지원되지 않습니다**.

## 여러 Agent 간에 통합 구성 {#configure-integrations-across-multiple-agents}

<div class="alert alert-tip">구성 마법사를 진행하면 <strong>Configuration Summary</strong> 패널에 현재 선택된 Agent 범위가 표시됩니다. 이 패널을 사용하여 범위 내 특정 Agent의 구성 차이점을 미리 보고 변경 사항이 Agent에 미치는 영향을 확인할 수 있습니다.</div>

1. Fleet Automation에서 [{{< ui >}}Configuration{{< /ui >}}][3] 탭을 열고 {{< ui >}}Configure Agents{{< /ui >}}를 클릭합니다.
1. 구성의 범위를 대상 Agent로 지정합니다. 호스트 정보 또는 태그를 기준으로 필터링하여 특정 그룹을 대상으로 지정합니다.
1. {{< ui >}}Agent integrations{{< /ui >}}를 선택합니다.
1. 구성할 통합을 선택합니다.

    <div class="alert alert-info">Fleet Automation은 호스트에서 구성되지 않은 통합을 탐지할 수 있습니다. 사용 가능한 Datadog 통합이 있지만 활성 구성이 없는 프로세스가 호스트에서 실행 중인 경우 해당 프로세스는 <strong>Unconfigured integrations detected on your hosts</strong> 목록에 나타납니다. 이 목록을 사용하여 플릿 전체에서 모니터링 격차를 파악할 수 있습니다.</div>

1. 작업을 선택합니다(각 작업에 대한 자세한 내용은 [구성 변경 사항이 적용되는 방식](#how-configuration-changes-are-applied) 참조).

    - {{< ui >}}Add New{{< /ui >}}. 새 구성 파일의 파일 이름을 지정하고 메시지에 따라 구성을 입력합니다.
    - {{< ui >}}Edit & Replace{{< /ui >}}. {{< ui >}}Select a file{{< /ui >}}을 클릭하고 교체할 구성 파일을 선택한 다음, 메시지에 따라 새 구성을 입력합니다.
    - {{< ui >}}Delete{{< /ui >}}. {{< ui >}}Select a File to Delete{{< /ui >}}를 클릭합니다.

    <div class="alert alert-tip">통합 구성을 작성할 때 <strong>Visual</strong> 모드와 <strong>YAML</strong> 모드 간에 전환하세요. YAML에 직접 붙여 넣으려면 <strong>YAML</strong> 모드를 사용하세요.</div>

1. 배포 계획을 검토합니다. Fleet Automation은 영향을 받는 각 Agent에 대한 구성 차이를 생성하므로 정확한 변경 사항을 확인할 수 있습니다.
1. {{< ui >}}Deploy Configuration{{< /ui >}}을 클릭하여 배포를 시작합니다. [Deployments 페이지][4]에서 진행 상황을 추적합니다.

## 구성 변경 사항이 적용되는 방식 {#how-configuration-changes-are-applied}

각 작업은 통합의 `conf.d` 구성 파일에 변경 사항을 다르게 적용합니다.

- {{< ui >}}Add New{{< /ui >}}: 새 통합 구성 파일을 배포합니다. 구성 파일이 이미 존재하는 경우 완전히 교체되며 제공한 YAML이 대상 Agent의 해당 통합에 대한 전체 새 구성이 됩니다.

- {{< ui >}}Edit & Replace{{< /ui >}}: 지정한 필드만 수정되며, 지정하지 않은 필드는 변경되지 않습니다.

  <div class="alert alert-warning">
  배열 필드(예: <code>tags</code>)는 병합되지 않고 편집 및 교체 작업 중에 완전히 교체됩니다. 업데이트에 원하는 모든 값을 포함합니다. 생략한 값은 모두 제거됩니다.
  </div>

- {{< ui >}}Delete{{< /ui >}}: 대상 Agent에서 통합 구성 파일을 제거합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/
[2]: /ko/agent/guide/setup_remote_config
[3]: https://app.datadoghq.com/fleet/agent-management
[4]: https://app.datadoghq.com/fleet/deployments
[5]: https://www.rfc-editor.org/rfc/rfc7386
[6]: /ko/agent/fleet_automation/upgrade_agents/
[7]: /ko/agent/guide/setup_remote_config/#enable-remote-agent-management