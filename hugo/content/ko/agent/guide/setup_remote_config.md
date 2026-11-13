---
description: Fleet Automation으로 Remote Configuration을 구성하여 Agent flare, 원격 업그레이드 및
  중앙 집중식 구성 관리를 사용할 수 있습니다.
disable_toc: false
further_reading:
- link: /remote_configuration
  tag: 문서
  text: Remote Configuration에 대해 자세히 알아보기
- link: /agent/fleet_automation
  tag: 문서
  text: Fleet Automation
- link: /infrastructure/list/#agent-configuration
  tag: 문서
  text: Agent 구성 보기에 대해 알아보기
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: 블로그
  text: Fleet Automation을 사용하여 Datadog Agent를 중앙에서 관리하고 원격으로 운영하기
title: Fleet Automation을 위한 Remote Configuration
---
이 페이지에서는 [Fleet Automation][11]에서 {{< tooltip glossary="remote_configuration" case="title" >}} 을 구성하고 사용하는 방법을 설명합니다. 다음 Fleet Automation 기능에는 Remote Configuration이 필요합니다.
| 기능 | 설명 | 최소 Agent 버전 |
|---------|-------------|------------------------|
| **[Agent flares][9]** | Fleet Automation을 사용하여 Datadog 사이트에서 flare 전송 | 7.47+ <br>7.66+ 권장 |
| **[Agent upgrades][10]** | 원격으로 Agent 업그레이드 | Linux: 7.69.0+ <br>Windows: 7.71.1+ |
| **[Agent configuration][13]** | 원격으로 Agent 구성 | 7.73+ |

최신 기능을 사용할 수 있도록 Agent를 정기적으로 업그레이드하는 것이 좋습니다.

## 전제 조건 {#prerequisites}

- 각 Agent가 사용하려는 기능의 최소 버전 및 플랫폼 요구 사항을 충족하는지 확인합니다. [Agent 업그레이드][10] 및 [Agent 구성][13]을 참조하세요.
- 조직에 대해 Remote Configuration을 활성화할 수 있도록 RBAC 권한에 [`org_management`][1]가 포함되어 있는지 확인합니다.
- Remote Configuration 기능을 갖춘 새 API 키를 생성하거나 기존 API 키에 해당 기능을 추가할 수 있도록 RBAC 권한에 [`api_keys_write`][2]가 포함되어 있는지 확인합니다. 해당 권한이 없는 경우 조직의 Datadog Admin에게 문의하여 권한을 업데이트하세요. 이 기능이 포함된 키를 사용하면 Agent가 Remote Configuration을 사용하도록 인증 및 승인할 수 있습니다.

## Remote Configuration 활성화 {#enable-remote-configuration}

대부분의 경우, Remote Configuration은 귀하의 조직에 대해 기본적으로 활성화되어 있습니다. [Remote Configuration][3] 설정 페이지에서 조직에 대해 Remote Configuration이 활성화되어 있는지 확인할 수 있습니다. Remote Configuration을 활성화해야 하는 경우:
1. 조직에 대해 Remote Configuration을 활성화할 수 있도록 RBAC 권한에 [`org_management`][1]가 포함되어 있는지 확인합니다.
1. Organization Settings 페이지에서 [Remote Configuration][3]을 활성화합니다. 이렇게 하면 조직 전반의 Datadog 구성 요소가 Datadog으로부터 구성을 수신할 수 있습니다.

## 원격 Agent 관리 활성화 {#enable-remote-agent-management}

Linux 또는 Windows VM에서 Agent를 원격으로 업그레이드하거나 구성하려면 Remote Configuration을 활성화하고 각 대상 Agent에서 `remote_updates`를 `true`로 설정합니다. Remote Configuration을 사용하면 Agent가 Datadog으로부터 구성을 수신할 수 있습니다. `remote_updates` 설정은 원격 업그레이드 및 Agent 구성 변경을 활성화합니다.

Agent 버전 7.73.0부터 `remote_updates`는 기본적으로 `true`로 설정됩니다. 이전 지원 버전에서는 명시적으로 `true`로 설정하세요.

1. 조직 및 [Agent의 API 키](#enable-remote-configuration-on-the-api-key)에 대해 Remote Configuration을 활성화합니다.
1. Agent의 [구성 파일][16]에서 다음 설정을 활성화합니다. `remote_updates`는 최상위 설정입니다.

   ```yaml
   remote_configuration:
     enabled: true

   remote_updates: true
   ```

   또는 Agent 서비스에서 사용하는 환경에서 `DD_REMOTE_CONFIGURATION_ENABLED=true` 및 `DD_REMOTE_UPDATES=true`를 설정합니다.
1. [Agent를 재시작][14]하여 변경 사항을 적용합니다.
1. Fleet Automation에서 Agent의 측면 패널을 열고 **Remote Agent Management** 상태를 확인합니다. 원격 관리를 계속 사용할 수 없는 경우, [원격 Agent 관리 문제 해결](#troubleshoot-remote-agent-management)을 참조하세요.

## Agent Remote Configuration 상태 {#agent-remote-configuration-status}

[Remote Configuration UI][3]를 사용하여 Agent의 Remote Configuration 상태를 파악할 수 있습니다.

다음 표에서는 Remote Configuration 연결 상태를 설명합니다. Fleet Automation은 별도의 **Remote Agent Management** 상태도 표시합니다. 원격 관리가 **NOT ENABLED** 상태여도 Agent는 Remote Configuration에 **CONNECTED** 상태일 수 있습니다. VM에서 업그레이드 및 구성 변경을 활성화하려면 [원격 Agent 관리 활성화 ](#enable-remote-agent-management)를 참조하세요.

  | Agent 상태     | 설명                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | 환경에 배포된 Agent가 Datadog에 연결되어 성공적으로 인증 후 권한을 부여 받을 수 있습니다. 이는 Remote Configuration에 대해 Agent에 기대하는 최적의 상태입니다.                                               |
  | UNAUTHORIZED          | 환경에 배포된 Agent가 Datadog에 연결할 수는 있지만, Remote Configuration 작업을 위해 Datadog에서 인증 후 권한을 부여 받을 수는 없습니다. 가장 가능성이 높은 원인은 Agent가 사용하는 API 키에 대해 Remote Configuration이 활성화되어 있지 않기 때문입니다. 이 문제를 해결하려면 Agent가 사용하는 API 키에 대해 Remote Configuration 기능을 활성화합니다.                                                 |
  | CONNECTION ERROR        |   환경에 배포된 Agent의 `datadog.yaml` 구성 파일에서 `remote_configuration.enabled`가 true로 설정되어 있으나, Remote Configuration 서비스에서 해당 Agent를 찾을 수 없습니다. 가장 가능성이 높은 원인은 Agent가 Remote Configuration [엔드포인트][4]에 도달하지 못하는 것입니다. 이 문제를 해결하려면 환경에서 Remote Configuration 엔드포인트로의 아웃바운드 HTTPS 액세스를 허용하세요. 이 상태는 Agent 버전이 `7.45.0` 이상일 때 표시됩니다.
  | DISABLED       |   환경에 배포된 Agent의 `datadog.yaml` 구성 파일에서 `remote_configuration.enabled`가 false로 설정되어 있습니다. Agent에서 Remote Configuration을 활성화하려면 `remote_configuration.enabled`를 true로 설정하세요. 이 상태는 Agent 버전이 `7.45.0` 이상일 때 표시됩니다. |
  | NOT CONNECTED       | Agent를 Remote Configuration 서비스에서 찾을 수 없으며, Agent의 `datadog.yaml` 구성 파일에서 `remote_configuration.enabled`가 true 또는 false로 설정되어 있을 수 있습니다. 로컬 Agent 구성 또는 프록시 설정을 검사합니다. 이 상태는 Agent 버전이 `7.41.1`보다 높지만 `7.45.0`보다 낮을 때 표시됩니다.            |
  | UNSUPPORTED AGENT   | Agent 버전이 Remote Configuration을 지원하지 않습니다. 이 문제를 해결하려면 Agent를 사용 가능한 최신 버전으로 업데이트하세요. |

## Fleet Automation용 Remote Configuration 선택 해제 {#opting-out-of-remote-configuration-for-fleet-automation}

다음 수준에서 Remote Configuration 기능을 비활성화할 수 있습니다.
- API 키 수준
- Agent 수준
- 조직 수준(**권장되지 않음**)

### API 키 수준 {#at-the-api-key-level}

[API Keys][5] 페이지에서 원하는 API 키를 비활성화하세요. API 키에 대해 Remote Configuration을 비활성화하려면 [`api_keys_write`][2] 권한이 필요합니다.

### Agent 수준 {#at-the-agent-level}

Agent 버전 7.47.0부터는 `remote_configuration.enabled`가 Agent에서 기본적으로 `true`로 설정됩니다. 이 설정으로 인해 Agent가 Datadog 사이트에 구성 업데이트를 요청하게 됩니다.

Agent가 Datadog에 구성 요청을 보내지 않도록 하려면 Agent에서 `remote_configuration.enabled`를 `false`로 설정할 수 있습니다.

{{< tabs >}}
{{% tab "구성 YAML 파일" %}}
[구성 YAML 파일][101]에서 `remote_configuration.enabled`를 `true`에서 `false`로 변경하세요.

```yaml
remote_configuration:
  enabled: false
```

[101]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#main-configuration-file
{{% /tab %}}
{{% tab "환경 변수" %}}
Datadog Agent 매니페스트에 다음을 추가하세요.

```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
Helm 차트에 다음을 추가하세요.

```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}

### 조직 수준 {#at-the-organization-level}

<div class="alert alert-warning"><strong>Datadog은 조직 수준에서 Remote Configuration을 비활성화하는 것을 권장하지 않습니다. 조직 수준에서 Remote Configuration을 비활성화하면 조직 전체의 여러 제품에 있는 Datadog 구성 요소가 Datadog으로부터 구성을 수신할 수 없게 됩니다.</strong></div>

조직 수준에서 Remote Configuration을 비활성화하려면 다음 단계를 따르세요.
1. 필요한 `org_management` 권한이 있는지 확인합니다.
1. [Remote Configuration][3] 설정 페이지로 이동합니다. 
1. {{< ui >}}Disable{{< /ui >}}을 클릭합니다. 
1. 경고 메시지가 나타나면 {{< ui >}}Disable{{< /ui >}}을 다시 클릭합니다.

## 문제 해결 {#troubleshooting}

Agent와 함께 Remote Configuration을 사용하는 데 문제가 발생하면 다음 문제 해결 지침을 따르세요. 추가 도움이 필요하면 [Datadog 지원팀][6]에 문의하세요.

### 원격 Agent 관리 문제 해결 {#troubleshoot-remote-agent-management}

Agent의 측면 패널에 **Remote Agent Management: NOT ENABLED**가 표시되면 현재 적용된 구성에서 `remote_updates` 설정이 활성화되어 있는지 확인하세요.

원격 관리를 계속 사용할 수 없는 경우 다음 항목을 확인하세요.

- [Agent 업그레이드][10] 또는 [Agent 구성][13]에 대한 버전 및 플랫폼 요구 사항
- Agent의 [Remote Configuration 연결 상태](#agent-remote-configuration-status)
- Datadog Installer가 실행 중인지 여부

### Agent 재시작 {#restart-the-agent}

[`datadog.yaml`][16] 파일에서 Agent 구성이 업데이트된 후 Agent를 다시 시작하여 변경 사항이 적용되도록 하세요.

### 환경에서 Datadog Remote Configuration 엔드포인트에 연결할 수 있는지 확인{#ensure-datadog-remote-configuration-endpoints-are-reachable-from-your-environment}

Remote Configuration을 사용하려면 환경에 배포된 Agent가 Datadog Remote Configuration [엔드포인트][4]에 액세스할 수 있어야 합니다. 환경과 Datadog 간의 프라이빗 네트워크 연결을 위해 Remote Configuration Virtual Private Cloud [엔드포인트][7]에 연결할 수도 있습니다. 아웃바운드 HTTPS에 환경에서 Remote Configuration 엔드포인트로 액세스 권한이 있는지 확인하세요. Datadog과 환경 사이에 프록시가 있으면 Remote Configuration 엔드포인트를 통합하도록 [프록시 설정][8]을 업데이트합니다.

### API 키에 대해 Remote Configuration 활성화 {#enable-remote-configuration-on-the-api-key}

구성을 수신할 수 있도록 Agent를 인증하고 권한을 부여하려면 관련 API 키에 대해 Remote Configuration을 활성화하세요. [`api_keys_write`][2] RBAC 권한이 있는 사용자만 API 키에 대해 Remote Configuration을 활성화할 수 있습니다.

**참고:** [`api_keys_write`][2] RBAC 권한은 있지만 Remote Configuration [조직][3] 수준 권한이 없는 경우, 새 API 키 또는 기존 API 키에 대해 Remote Configuration을 활성화할 수 없습니다. 기존 API 키에 대해 Remote Configuration을 비활성화할 권한만 있습니다.

[1]: /ko/account_management/rbac/permissions#access-management
[2]: /ko/account_management/rbac/permissions#api-and-application-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /ko/agent/configuration/network
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ko/help/
[7]: /ko/agent/guide#cloud-infrastructure-guides
[8]: /ko/agent/configuration/proxy/
[9]: /ko/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[10]: /ko/agent/fleet_automation/upgrade_agents/
[11]: /ko/agent/fleet_automation/
[13]: /ko/agent/fleet_automation/configure_agents/
[14]: /ko/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[16]: /ko/agent/configuration/agent-configuration-files/#main-configuration-file

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}