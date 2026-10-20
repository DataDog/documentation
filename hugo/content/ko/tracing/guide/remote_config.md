---
description: 애플리케이션을 재시작하지 않고도 SDK 설정을 동적으로 관리할 수 있도록 Remote Configuration을 설정하고 사용하는
  방법을 알아봅니다.
further_reading:
- link: remote_configuration
  tag: 설명서
  text: Remote Configuration
site_support_id: tracing_remote_configuration
title: 트레이싱을 위한 Remote Configuration 설정
---
이 가이드는 SDK에서 Remote Configuration을 설정하고 사용하는 방법을 다룹니다. Remote Configuration 작동 방식에 대한 자세한 내용은 [Remote Configuration][1]을 참조하세요.

## 전제 조건 {#prerequisites}

- 호스트 또는 컨테이너에 [Datadog Agent][2] 버전 7.47.0 이상이 설치되어 있어야 합니다.
- SDK를 Remote Configuration 호환 버전으로 업그레이드합니다. 자세한 내용은 [지원되는 구성 옵션][7] 섹션을 참조하세요.
- 조직에서 Remote Configuration을 활성화할 수 있도록, 귀하의 RBAC 권한에 [`org_management`][3]가 포함되어 있는지 확인합니다.
- Remote Configuration 기능을 갖춘 새 API 키를 생성하거나 기존 API 키에 해당 기능을 추가할 수 있도록, 귀하의 RBAC 권한에 [`api_keys_write`][4]가 포함되어 있는지 확인합니다. 해당 권한이 없는 경우 조직의 Datadog Admin에게 문의하여 권한을 업데이트하세요. 이 기능이 포함된 키를 사용하면 Agent가 Remote Configuration을 사용하도록 인증 및 승인할 수 있습니다.
- `APM Remote Configuration Read` 및 `APM Remote Configuration Write` [권한][3]이 있는지 확인합니다.
  **참고**: 해당 권한이 없는 경우 Datadog Admin에게 Organization Settings에서 권한을 업데이트해 줄 것을 요청하세요.

## Remote Configuration 설정 {#set-up-remote-configuration}

1. [조직에 Remote Configuration이 활성화되어 있는지][5] 확인하세요. 이렇게 하면 귀하의 조직 내 Datadog 구성 요소가 Datadog으로부터 구성을 받을 수 있습니다.
1. 기존 API 키를 선택하거나 새 API 키를 생성하고, 아직 활성화되지 않은 경우 해당 키에 Remote Configuration 기능을 활성화하세요.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="Remote Configuration 기능의 Enable 버튼이 있는 API 키 속성" width="90%" style="center">}}
1. Agent를 재시작합니다.

## SDK의 Remote Configuration 상태 검토 {#review-remote-configuration-status-of-sdks}

[Remote Configuration UI][5]를 통해 SDK의 Remote Configuration 상태를 파악할 수 있습니다.

다음 표는 각 SDK 상태의 의미를 설명합니다.

  | SDK 상태| 설명                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | SDK가 연결된 Agent를 통해 Remote Configuration 서비스에 성공적으로 연결되었습니다. 이는 Remote Configuration을 위해 SDK가 유지해야 하는 최적의 상태입니다.                                               |
  | UNAUTHORIZED          | SDK가 API 키에 대한 `APM Remote Configuration Read` 권한이 없는 Agent와 연결되어 있습니다. 이 문제를 해결하려면 SDK와 연결된 Agent가 사용하는 API 키에서 Remote Configuration 기능을 활성화해야 합니다.|
  | CONNECTION ERROR        |   환경에 배포된 SDK는 `remote_config.enabled`가 `datadog.yaml` 구성 파일에서 true로 설정된 Agent와 연결되어 있으나, Remote Configuration 서비스에서 해당 Agent를 찾을 수 없습니다. 가장 가능성이 높은 원인은 연결된 Agent가 Remote Configuration [엔드포인트][6]에 도달할 수 없기 때문일 수 있습니다. 이 문제를 해결하려면 환경에서 Remote Configuration 엔드포인트로의 아웃바운드 HTTPS 액세스를 허용해야 합니다.
  | DISABLED       |   환경에 배포된 SDK는 `remote_config.enabled`가`datadog.yaml` 구성 파일에서 false로 설정된 Agent와 연결되어 있습니다. 이는 의도적으로 설정되었거나 실수로 설정되었을 수 있습니다. 연결된 Agent에서 Remote Configuration을 활성화하려면 `remote_config.enabled`를 true로 설정하세요.  |
  | NOT CONNECTED       | SDK를 Remote Configuration 서비스에서 찾을 수 없으며, 해당 SDK는 `remote_config.enabled`가 `datadog.yaml` 구성 파일에서 true 또는 false로 설정되었을 수 있는 Agent와 연결되어 있습니다. 로컬 Agent 구성 또는 프록시 설정을 확인하세요.|
  | UNSUPPORTED AGENT   | SDK가 Remote Configuration을 지원하지 않는 Agent와 연결되어 있습니다. 이 문제를 해결하려면 연결된 Agent 소프트웨어를 사용 가능한 최신 버전으로 업데이트하세요. |
  | NOT DETECTED   | SDK가 Remote Configuration을 지원하지 않습니다. 이 문제를 해결하려면 SDK 소프트웨어를 사용 가능한 최신 버전으로 업데이트하세요. |
  | UNKNOWN   | SDK 상태를 알 수 없으며, SDK에 Agent가 연결되어 있는지 확인할 수 없습니다. 예를 들어, 이는 Agent가 AWS Fargate와 같은 완전 관리형 서버리스 컨테이너 서비스에 배포되었기 때문일 수 있습니다. |

## Fleet Automation용 Remote Configuration 선택 해제 {#opting-out-of-remote-configuration-for-fleet-automation}

다음 수준에서 Remote Configuration 기능을 비활성화할 수 있습니다.
- API 키 수준
- Agent 수준
- 조직 수준(**권장되지 않음**)

### API 키 수준 {#at-the-api-key-level}

[API 키][8] 페이지에서 원하는 API 키를 비활성화하세요. API 키에서 Remote Configuration을 비활성화하려면 [`api_keys_write`][4] 권한이 필요합니다.

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

[101]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
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
1. [Remote Configuration][5] 설정 페이지로 이동합니다.
1. {{< ui >}}Disable{{< /ui >}}을 클릭합니다.
1. 경고 메시지가 나타나면 {{< ui >}}Disable{{< /ui >}}을 다시 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/remote_configuration
[2]: /ko/agent/
[3]: /ko/account_management/rbac/permissions/
[4]: /ko/account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /ko/agent/configuration/network
[7]: /ko/tracing/trace_collection/runtime_config/#supported-configuration-options
[8]: https://app.datadoghq.com/organization-settings/api-keys