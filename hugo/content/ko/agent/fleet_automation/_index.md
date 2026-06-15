---
description: 구성 뷰, 업그레이드, 플레어 수집, API 키 회전 기능으로 Datadog Agent와 OpenTelemetry Collectors를
  중앙에서 원격으로 규모에 맞게 제어할 수 있습니다.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: 블로그
  text: Datadog Fleet Automation을 이용해 중앙에서 인프라와 앱 모니터링 설정 및 스케일링
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: 블로그
  text: Datadog Fleet Automation으로 전체 OpenTelemetry 컬렉터 관리
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: 블로그
  text: DDOT 게이트웨이로 OpenTelemetry 파이프라인 중앙화 및 관리
- link: /remote_configuration
  tag: 설명서
  text: 원격 구성에 관해 더 알아보기
- link: /infrastructure/list/#agent-configuration
  tag: 설명서
  text: Agent 구성 뷰에 관해 더 알아보기
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: 블로그
  text: Fleet Automation으로 Datadog Agent 중앙에서 통제하고 원격 관리하기
title: Fleet Automation
---

## 개요

Datadog Fleet Automation을 사용하면 변화하는 옵저버빌리티 니즈에 따라 규모에 맞게 Datadog Agent와 OpenTelemetry(Otel) Collector를 중앙에서 통제하고 원격으로 관리할 수 있습니다.

{{< img src="/agent/fleet_automation/fleet_automation2.png" alt="The fleet automation page" style="width:100%;" >}}

## 사용 사례

다음 사용 사례를 이용할 때 Datadog Agent 플릿과 OTel Collectors가 최신 강화된 기능을 사용하고 있는지 확인하세요. Fleet Automation을 이용하면 다음과 같은 장점이 있습니다.
- **최신 Agent 및 OTel Collector 구성을 볼 수 있고** 변경 내역도 확인할 수 있어 배포 업데이트를 점검하고 구성 일관성을 지킬 수 있습니다.
- 버전을 확인하고 자동 업데이트를 통해 **Agent 및 OTel Collectors의 플릿이 최신 강화 기능을 사용**하도록 할 수 있습니다.
- **Fleet Automation에서 바로 Datadog Agent를 구성**할 수 있어, 팀이 설정을 중앙화하고 환경을 더욱 빨리 가시화하여 파악할 수 있습니다.
- **Datadog UI에서 원격으로 플레어를 전송**할 수 있어, Agent나 DDOT Collector의 이슈를 디버깅하는 데 걸리는 시간을 줄일 수 있습니다.

## 설정

### 플릿 원격 관리

Fleet Automation를 사용하면 모든 호스트에 설치된 Datadog Agent를 Datadog UI에서 직접 중앙화하여 관리할 수 있습니다. 원격 관리를 통해 각 개별 시스템에 직접 접속할 필요 없이 모든 Agent의 현재 상태를 확인하고, 설정 변경 사항을 적용하며, 버전 업그레이드를 실행할 수 있습니다. 이를 통해 플릿을 안전하고 최신 상태로 유지하며 조직의 표준에 부합하도록 일관되고 제어된 워크플로를 제공합니다.

- **Agent 원격 업그레이드 및 설정**: 설정 및 활성화 단계는 [Agent 원격 관리 활성화][3]를 참고하세요.
- **Agent 및 OTel Collector 구성 뷰**:
  - Agent 및 Datadog 배포판 OTel Collector(DDOT) 설정 뷰는 Agent 버전 7.47.0 이상에서 기본적으로 활성화되어 있습니다. Agent 설정을 수동으로 활성화하려면 [Agent 설정 파일][2]에서 `inventories_configuration_enabled`을 `true`로 설정하세요. 또는 환경 변수 `DD_INVENTORIES_CONFIGURATION_ENABLED`를 사용할 수 있습니다.
  - 업스트림 OTel Collector 구성 보기는 컬렉터 구성 파일에서 [Datadog Extension][8]을 설정하여 활성화할 수 있습니다.
- **Agent 통합 구성 뷰**: Agent 통합 구성은 Agent 버전 7.49 이상에서 기본적으로 활성화되어 있습니다. Agent 통합 구성을 수동으로 활성화하려면 [Agent 구성 파일][2]에서 `inventories_checks_configuration_enabled`를  설정하세요. 또는 환경 변수 `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`를 사용할 수 있습니다.

### Fleet Automation API
Fleet Automation는 대규모로 Datadog Agent를 프로그래밍 방식으로 조회하고 관리할 수 있는 공개 API를 제공합니다. 전체 엔드포인트 세부 정보 및 사용 예시는 [Fleet Automation API 설명서][9]를 참고하세요.

**참고**: Fleet Automation API는 Datadog Agent의 모든 설정 기능을 지원하지는 않습니다.

<div class="alert alert-info">
컨테이너화된 워크로드에는 Agent 원격 관리가 지원되지 않습니다.
</div>


## 플릿 모니터링

[**Fleet Automation**][1] 페이지에서 호스트의 옵저버빌리티 공백, 오래된 버전의 Agent 나 OTel Collector, 통합 이슈가 있는 Agent에 관한 인사이트를 확보할 수 있습니다.

각 Datadog Agent에서 다음 항목을 확인할 수 있습니다.
- Agent 버전
- 구성되지 않았거나 잘못 구성된 통합 유무
- Agent가 모니터링 중인 서비스
- Agent 원격 구성 상태
- Agent에서 활성화된 제품군
- 구성 변경, 업그레이드 및 플레어를 포함한 Agent Audit Trail 이벤트

각 OTel Collector에서 다음 항목을 확인할 수 있습니다.
- Collector 버전
- Collector 배포판
- Collector의 구성 YAML 파일

### Datadog Agent 또는 OpenTelemetry Collector 검사

Datadog Agent 또는 OTel Collector를 선택하면 구성, 연결된 통합, 감사 이벤트, 원격 플레어를 보내는 데 사용할 수 있는 지원 탭을 포함한 상세 정보를 확인할 수 있습니다.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="An Agent's integration information" style="width:100%;" >}}

### Agent Audit Trail 이벤트 뷰

Audit Events 탭에는 선택한 Agent와 관련된 Audit Trail 이벤트가 표시됩니다. 이 탭을 사용하여 다음을 할 수 있습니다.
- 구성 변경, API 키 업데이트, 설치, 업그레이드 및 지원 플레어 확인
- 변경된 시간 및 위치 확인

Audit Trail 이벤트의 가시성은 사용 중인 플랜에 따라 다릅니다. 조직에서 Audit Trail 기능이 활성화된 경우, 보관 설정에 따라 최대 90일 동안의 Agent 이벤트를 볼 수 있습니다. Audit Trail이 활성화되지 않은 경우에는 최근 24시간 동안의 이벤트만 확인할 수 있습니다.

### 원격 플레어 전송

Agent에서 원격 구성을 활성화한 후 Datadog Agent 또는 DDOT Collector에서 플레어를 보낼 수 있습니다. 플레어 전송에 관한 지침은 [Datadog 사이트에서 플레어 전송][7]을 참고하세요.

Agent에 원격 구성이 활성화된 상태로 Datadog 지원팀에 문의할 경우, 문제를 신속하게 해결하기 위해 지원팀이 사용자 환경에서 직접 플레어를 실행할 수 있습니다. 플레어는 문제 해결에 필요한 트러블슈팅 정보를 Datadog 지원팀에 제공합니다.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="원격 플레어 전송" style="width:100%;" >}}

## Fleet Automation 액세스 제어

Fleet Automation은 Datadog 조직의 모든 사용자가 사용할 수 있습니다. 다음과 같은 특정 기능의 액세스를 제어할 수 있습니다.

| 권한 | 설명 |
|--------------|---------------|
| `API Keys Read`| API 키를 기준으로 Agent를 조회하고 검색할 수 있는 사용자를 제한합니다. |
| `Agent Flare Collection` | Fleet Automation에서 원격으로 플레어를 보낼 수 있는 사용자를 제한합니다. |
| `Agent Upgrade` | Fleet Automation에서 Agent를 업그레이드할 수 있는 사용자를 제한합니다. |
| `Agent Configuration Management` | Fleet Automation에서 Agent를 구성할 수 있는 사용자를 제한합니다. |

역할 및 권한 설정에 관한 자세한 정보는 [액세스 컨트롤][5]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /ko/agent/configuration/agent-configuration-files/
[3]: /ko/agent/fleet_automation/remote_management/#setup
[4]: /ko/infrastructure/list/#agent-configuration
[5]: /ko/account_management/rbac/
[6]: /ko/agent/fleet_automation/remote_management/
[7]: /ko/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[8]: https://docs.datadoghq.com/ko/opentelemetry/integrations/datadog_extension/#setup
[9]: https://docs.datadoghq.com/ko/api/latest/fleet-automation/