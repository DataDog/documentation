---
description: Fleet Automation을 사용하여 규모에 맞게 Datadog Agent 구성을 롤아웃하고 관리하세요.
further_reading:
- link: /agent/fleet_automation/
  tag: 설명서
  text: Fleet Automation
- link: /api/latest/fleet-automation/
  tag: 설명서
  text: Fleet Automation API
site_support_id: fleet-automation-standard-features
title: Agent 구성
---
[Fleet Automation][3]을 사용하여 규모에 맞게 Datadog Agent 구성을 롤아웃하고 관리하세요. UI에서 가이드가 있는 워크플로를 통해, 또는 사용자 지정 YAML 파일을 사용해 구성 변경 사항을 적용합니다.

## 전제 조건 {#prerequisites}

- 조직에 [Remote Configuration][9]이 활성화되어 있음
- Agent 및 OTel Collector 구성에 적합한 Agent 버전 7.73 이상(통합 및 시크릿을 구성하려면 버전 7.76 이상) Agent를 업그레이드하는 방법은 [Agent 업그레이드][10]를 참조하세요.
- 설치 스크립트 또는 Ansible Datadog Role을 사용하여 설치한 Linux VM, 또는 Windows VM

{{< callout url="https://www.datadoghq.com/product-preview/configure-agent-kubernetes-operator/" header="미리 보기에 참여하세요!" >}}
컨테이너화된 워크로드의 Agent 원격 구성은 미리 보기로 제공되고 있습니다. 이 기능에 관심이 있다면 양식을 작성하여 액세스 권한을 요청하세요.
{{< /callout >}}

{{< callout url="https://www.datadoghq.com/product-preview/modify-tags-fleet-automation/" header="미리 보기에 참여하세요!" >}}
Fleet Automation을 통한 Datadog Agent 태그 관리는 미리 보기로 제공되고 있습니다. 이 기능에 관심이 있다면 양식을 작성하여 액세스 권한을 요청하세요.
{{< /callout >}}

## 여러 Agent 구성 {#configure-multiple-agents}

1. Fleet Automation에서 [구성][1] 탭을 열고 {{< ui >}}Configure Agents{{< /ui >}}를 클릭합니다.
1. 구성의 범위를 대상 Agent로 지정합니다. 호스트 정보 또는 태그를 기준으로 필터링하여 특정 그룹을 대상으로 지정합니다.

   {{< img src="/agent/fleet_automation/fa_scope_config.png" alt="Fleet Automation의 Configure Agents 워크플로에 있는 이 구성 범위 지정 단계입니다. 환경, 운영 체제 및 호스트 이름에 대한 필터, 범위에 포함된 33개의 Agent 목록, 오른쪽의 구성 요약 패널을 표시했습니다." style="width:100%;" >}}

1. 대상 Agent가 실행해야 하는 제품(예: Logs, APM 또는 NDM)을 선택합니다.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration3.png" alt="Fleet Automation의 Configure Agents 워크플로에 있는 구성할 제품 선택 단계입니다. Core Observability 아래에 그룹화된 제품 타일(Infrastructure Monitoring, Log Management, APM)과 Additional Observability 아래에 그룹화된 제품 타일(Live Process Monitoring, Cloud Network Monitoring, Network Device Monitoring)을 표시했습니다." style="width:100%;" >}}

1. 배포 계획을 검토하여 범위가 지정된 Agent 및 배포 설정(예: 롤아웃 동시성)을 확인합니다.
1. {{< ui >}}Deploy Configuration{{< /ui >}}을 클릭하여 배포를 시작하고 [배포 페이지][2]에서 진행 상황을 추적합니다.

## 단일 Agent의 구성 편집 {#edit-the-configuration-of-a-single-agent}

1. [Fleet 보기][3]로 이동합니다. 

1. (선택 사항) 호스트 정보 또는 태그를 기준으로 필터링하여 목록 범위를 좁힙니다.

1. 호스트를 선택하여 사이드 패널을 연 다음 {{< ui >}}Configuration{{< /ui >}} 탭을 클릭합니다. 

1. {{< ui >}}Edit{{< /ui >}}를 클릭하여 구성을 수정합니다 

1. {{< ui >}}Deploy Changes{{< /ui >}}를 클릭하여 업데이트를 적용합니다

**참고**: 일부 구성 필드(`api_key`, `site`, `notable_events` 등)는 수정할 수 없습니다.

아래 예시에서는 `logs_enabled` 필드가 `false`에서 `true`로 변경되었으며, 이렇게 하면 배포 후 Agent에서 로그 수집이 활성화됩니다.

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Agent 구성 변경 사항을 편집하고 배포합니다." style="width:90%;" >}}

## API를 사용하여 Agent 구성 {#configure-agents-with-the-api}

Fleet Automation은 프로그래밍 방식으로 구성 업데이트를 적용할 수 있는 API를 제공합니다. 필터 쿼리를 사용해 모든 호스트 그룹에 변경 사항을 배포하세요. 전체 구성 파일을 제공할 수도 있고, 대상이 지정된 패치를 제공할 수도 있습니다. 온디맨드 방식으로 구성을 푸시하거나, 기존 자동화 워크플로에 통합하세요. 자세한 정보는 [Fleet Automation API][4]를 참조하세요.

**참고**: API는 모든 Agent 구성 필드를 지원하지는 않습니다. Agent 연결 또는 시크릿(`site`, `api_key` 및 기타 인증 파라미터)과 관련된 설정은 API를 통해 관리할 수 없습니다.

## 구성 우선 순위{#configuration-precedence}

Fleet Automation을 통해 배포된 구성 변경 사항은 대상에 따라 다른 규칙을 따릅니다.

- **Agent 구성(`datadog.yaml`):** Fleet Automation이 병합 패치를 사용해 변경 사항을 적용합니다. 지정된 필드만 업데이트되고, 언급되지 않은 필드는 변함없이 유지됩니다. 필드 수준에서 충돌이 발생하는 경우, Fleet Automation 값이 모든 로컬 값보다 우선입니다.
- **통합 및 사용자 지정 로그 구성:** Fleet Automation이 다음 두 가지 모드를 지원합니다.
    - 새 구성 파일을 배포합니다.
    - 병합 패치를 사용해 특정 필드만 수정하도록 기존 파일을 업데이트합니다. 병합 패치를 사용하지 않고 기존 파일 이름을 대상으로 변경 사항을 배포하면 해당 파일이 완전히 덮어쓰입니다.

  두 상황 모두 소스와 관계없이(Fleet Automation, r구성 관리 도구 또는 직접 호스트 편집) 가장 최근의 변경 사항이 Agent의 활성 구성이 됩니다.

[Fleet Automation Audit Trail][5]을 사용하여 Agent의 최근 구성 변경 사항을 추적하고 해당 변경 사항에 대한 경보를 설정하세요.

## 미러 및 프록시 {#mirrors-and-proxies}

원격 Agent 관리는 프록시 또는 미러링된 리포지토리와 함께 사용할 수 있습니다.

Agent가 프록시를 사용하게 구성하는 방법에 관한 지침은 [Agent 프록시 구성][6]을 참조하세요. 프록시를 구성하고 나서, Agent를 재시작해야 설정이 적용됩니다.

미러링 또는 air-gapped 리포지토리 사용 방법은 다음을 참조하세요.
- [Datadog 이미지를 비공개 컨테이너 레지스트리와 동기화하기][7]
- [인터넷 연결이 제한된 서버에 Agent 설치][8]

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: https://app.datadoghq.com/fleet/deployments
[3]: https://app.datadoghq.com/fleet
[4]: /ko/api/latest/fleet-automation/
[5]: /ko/agent/fleet_automation/fleet_view/#view-agent-audit-trail-events
[6]: /ko/agent/configuration/proxy/
[7]: /ko/containers/guide/sync_container_images/
[8]: /ko/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: /ko/agent/guide/setup_remote_config
[10]: /ko/agent/fleet_automation/upgrade_agents/