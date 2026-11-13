---
aliases:
- /ko/service_management/workflows/private_actions/use_private_actions
- /ko/service_management/app_builder/private_actions/use_private_actions
- /ko/actions/private_actions/use_private_actions/
- /ko/actions/private_actions/update_private_action_runner/
description: Datadog Agent 내부에서 실행되는 프라이빗 액션 러너를 설치, 등록, 관리 및 업데이트하세요.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: 설명서
  text: Private Actions
- link: actions/private_actions/enroll_runner
  tag: 설명서
  text: 등록 및 소유권
- link: actions/private_actions/execution_policies
  tag: 설명서
  text: Execution Policies
- link: actions/private_actions/set_up_standalone
  tag: 설명서
  text: 독립형 프라이빗 액션 러너 설정하기
title: Datadog Agent에서 프라이빗 액션 러너 설정하기
---
## 개요 {#overview}

새로 배포하는 경우 Datadog Agent에서 프라이빗 액션 러너를 실행하는 것을 권장합니다. 이미 Datadog Agent를 실행 중인 경우, 하나의 구성 플래그로 러너를 활성화하고 Agent 수명 주기 전반에 걸쳐 관리할 수 있습니다.

러너 설정은 다음 세 단계로 진행됩니다.

1. [**설치**](#install-the-runner): 환경에 맞는 배포 옵션을 사용하여 러너를 설치합니다.
1. [**등록**](#enroll-the-runner): 러너의 소유권과 사용하는 권한 부여 모델을 설정합니다.
1. [**업데이트**](#update-the-runner): Agent를 업그레이드할 때 러너를 함께 업데이트합니다.

러너를 별도의 바이너리로 배포하려면 [독립형 프라이빗 액션 러너 설정하기][1]를 참조하세요.

## 전제 조건 {#prerequisites}

- **Datadog Agent 7.81.0 이상**이 설치된 Linux 또는 Windows 호스트, 또는 **Datadog Operator v1.28.0 이상**이나 **Datadog Helm chart 3.231.6 이상**이 설치된 Kubernetes 클러스터
- 조직에서 [Remote Configuration][2] 활성화
- `https://{{< region-param key=dd_site >}}`의 Datadog에 대한 네트워크 액세스

## 러너 설치 {#install-the-runner}

Datadog Agent의 러너에는 작업을 수행해야 하는 위치에 따라 세 가지 배포 옵션이 있습니다.

| 배포 옵션 | 실행 방식 | 배포 도구 | 권장 용도 |
|---|---|---|---|
| **호스트** | Linux 또는 Windows 호스트에서 Datadog Agent와 함께 별도의 프로세스로 실행됩니다. | 호스트 설치 | 특정 호스트를 대상으로 하는 액션 |
| **Kubernetes 노드 Agent** | 호스트 프로세스와 동일한 러너 바이너리를 사용하는 노드 Agent 내의 컨테이너로 실행됩니다. | Helm, Operator | Kubernetes 클러스터의 노드 로컬 액션 |
| **Kubernetes Cluster Agent** | 별도의 바이너리 없이 Cluster Agent 프로세스 내에서 실행됩니다. 하나의 러너가 전체 클러스터를 관리합니다. | Helm, Operator | 클러스터 전체에 적용되는 Kubernetes 액션 |

**Fleet Automation**을 사용해서 설치할 수도 있습니다. Fleet Automation은 UI 기반 설치 절차를 통해 러너를 소유자가 있는 상태로 등록합니다. 또는 **수동 설치**를 사용하여 직접 등록 유형을 선택할 수 있습니다.

### Fleet Automation 사용(권장) {#using-fleet-automation-recommended}

Fleet Automation 설치 절차는 모든 플랫폼에서 동일합니다.

1. [Fleet Automation 설치 페이지][3]로 이동하여 플랫폼을 선택합니다. Kubernetes의 경우, 설치 방법으로 **Helm Chart** 또는 **Datadog Operator**를 선택하여 이후 진행할 [수동 설치](#manual-installation) 탭과 일치시킵니다.
1. **Customize your Agent coverage**에서 **Optimization & Remediation** 섹션으로 이동하고 **Enable Agent to take action**을 활성화합니다. 이렇게 하면 `on_prem_runner_write` 범위가 포함된 애플리케이션 키가 생성되고 러너가 **소유자가 있는 상태**로 등록되며 [Connections][4]를 통해 권한이 부여됩니다. 대신 소유자가 없는 러너를 등록하고 [Execution Policies][5]를 통해 권한을 부여하려면 [수동 설치](#manual-installation)를 사용하세요.
1. 설치 패널의 나머지 지침에 따라 API 키를 추가하고 설치를 완료합니다.
1. 설치 후 [Private Action Runners][6]로 이동하여 러너가 목록에 나타나는지 확인합니다.

### 수동 설치 {#manual-installation}

{{< tabs >}}
{{% tab "Linux" %}}
Agent를 설치하거나 실행할 때 다음 환경 변수를 설정하세요. 호스트에서 프라이빗 액션 러너 설정은 `DD_PRIVATE_ACTION_RUNNER_*` 접두사를 사용합니다.

```bash
DD_API_KEY=<API_KEY> \
DD_APP_KEY=<APP_KEY> \
DD_SITE="{{< region-param key=dd_site >}}" \
DD_PRIVATE_ACTION_RUNNER_ENABLED=true \
DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST=com.datadoghq.kubernetes.*,com.datadoghq.remoteaction.* \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

`DD_APP_KEY`는 Fleet Automation과 동일하게 러너를 소유자가 있는 상태로 등록합니다. 애플리케이션 키에는 `on_prem_runner_write` 범위가 필요합니다. `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST`는 쉼표로 구분된 목록을 사용합니다. Datadog Agent의 러너가 실행할 수 있는 액션을 허용하려면 번들 와일드카드 `com.datadoghq.kubernetes.*` 및 `com.datadoghq.remoteaction.*`를 사용하세요. 대신 러너에서 기본 제공되는 액션(읽기 전용 Remote Action 액션 및 Cluster Agent의 일부 읽기 전용 Kubernetes 액션)을 사용하려면 허용 목록을 설정하지 마세요.

설치 후 [Private Action Runners][1]로 이동하여 러너가 목록에 나타나는지 확인하세요.

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Windows" %}}

Datadog Agent 7.81.0 이상으로 설치 또는 업그레이드한 다음 `C:\ProgramData\Datadog\datadog.yaml`을 편집하세요.

```yaml
app_key: <YOUR_APP_KEY>

private_action_runner:
  enabled: true
  self_enroll: true
  actions_allowlist:
    - "com.datadoghq.kubernetes.*"
    - "com.datadoghq.remoteaction.*"
```

`app_key`는 위의 Fleet Automation과 동일하게 러너를 소유자가 있는 상태로 등록하며, 애플리케이션 키에는 `on_prem_runner_write` 범위가 필요합니다.

구성을 적용하려면 Agent를 재시작하세요.

```powershell
Restart-Service -Force datadogagent
```

Agent를 재시작한 후 [Private Action Runners][1]로 이동하여 러너가 목록에 나타나는지 확인하세요.

호스트 프로세스는 **노드 Agent** 러너를 실행합니다. Cluster Agent에서 러너를 실행하려면 Kubernetes(Helm) 또는 Kubernetes(Operator) 탭을 사용하세요.

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes(Helm)" %}}

Datadog Helm 차트는 다음 두 위치에서 러너를 활성화할 수 있습니다.

- **노드 Agent** 러너는 사이드카 컨테이너로 실행됩니다. 노드 Agent 러너는 **Linux 전용**입니다.
- **Cluster Agent** 러너는 프로세스 내에서 실행됩니다. Cluster Agent 러너는 Helm 또는 Operator를 통해서만 사용할 수 있으며(독립형 바이너리는 제공되지 않음), Cluster Agent 복제본 간에 ID가 조정되도록 리더를 선출해야 합니다.

[Organization Settings][1]에서 Private Action Runner 기능이 있는 API 키를 생성한 후 차트가 `apiKeyExistingSecret`을 통해 읽을 수 있도록 Kubernetes 시크릿에 저장하세요.

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

이 예시에서는 API 키만 사용하는 `apiKeyOnlyEnrollment: true`를 설정하여 러너를 **소유자가 없는 상태**로 등록하며, Execution Policies를 통해 권한을 부여합니다. 기타 등록 옵션 및 소유권 작동 방식은 [등록 및 소유권][2]을 참조하세요.

Helm 설정에서는 camelCase 형식의 `privateActionRunner.*` 키를 사용합니다. `values.yaml`을 생성하세요.

```yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  site: {{< region-param key=dd_site >}}
  clusterName: <YOUR_CLUSTER_NAME>
  remoteConfiguration:
    enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.remoteaction.*"
      - "com.datadoghq.script.*"
clusterAgent:
  enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.kubernetes.*"
      - "com.datadoghq.script.*"
```

사용 가능한 모든 러너 구성 옵션은 Helm 차트의 [`datadog.privateActionRunner`][3] 및 [`clusterAgent.privateActionRunner`][4]를 참조하세요. 차트를 설치하세요.

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-agent datadog/datadog -f values.yaml
```

설치 후 [Private Action Runners][5]로 이동하여 러너가 목록에 나타나는지 확인하세요.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/actions/private_actions/enroll_runner/
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L523
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1842
[5]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes(Operator)" %}}

Datadog Operator에서는 `DatadogAgent` 리소스의 주석을 통해 러너를 활성화합니다. `-configdata` 주석의 러너 구성은 snake_case 형식의 `private_action_runner.*` 키를 사용합니다. Operator에서는 노드 Agent 러너와 프로세스 내 Cluster Agent 러너를 모두 활성화할 수 있습니다.

[Organization Settings][1]에서 Private Action Runner 기능이 있는 API 키를 생성한 후 `DatadogAgent` 리소스가 `credentials`를 통해 읽을 수 있도록 Kubernetes 시크릿에 저장하세요.

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

이 예시에서는 API 키만 사용하는 `api_key_only_enrollment: true`를 설정하여 러너를 **소유자가 없는 상태**로 등록하며, Execution Policies를 통해 권한을 부여합니다. 기타 등록 옵션 및 소유권 작동 방식은 [등록 및 소유권][2]을 참조하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.remoteaction.*"
          - "com.datadoghq.script.*"
    cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
    cluster-agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.script.*"
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    site: {{< region-param key=dd_site >}}
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
```

매니페스트를 적용하세요.

```bash
kubectl apply -f datadog-agent.yaml
```

Helm과 마찬가지로 Cluster Agent 러너는 리더를 선출해야 하며, 노드 Agent 러너는 Linux 전용입니다. 매니페스트를 적용한 후 [Private Action Runners][3]로 이동하여 러너가 목록에 나타나는지 확인하세요.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/actions/private_actions/enroll_runner/
[3]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{< /tabs >}}

### 구성 필드 이름 {#configuration-field-names}

러너 설정은 각 설치 방법에 대한 표준 Datadog Agent 구성 규칙을 따릅니다.
- 호스트에서는 환경 변수를 사용합니다.
- Helm에서는 `privateActionRunner` 아래의 camelCase 키를 사용합니다.
- Operator에서는 `private_action_runner` 아래에 있는 snake_case 키를 사용합니다.

세 가지 설치 방법 간의 필드 이름 대조표와 전체 구성 키 및 기본값의 목록은 [프라이빗 액션 러너 참조][7]를 참조하세요.

## 러너 등록 {#enroll-the-runner}

러너를 Datadog 조직에 등록하면 **소유권**이 설정되며, 이 소유권에 따라 권한 부여 모델이 결정됩니다. Private Action Runner 기능이 있는 API 키로 등록된 소유자가 없는 러너는 [Execution Policies][5]를 사용합니다. 애플리케이션 키로 등록된 소유자가 있는 러너는 [Connections][4]를 사용합니다. 권한 부여 모델은 등록 시점에 고정되므로 배포하기 전에 어떤 모델을 사용할지 결정하세요.

프로세스에 대한 자세한 내용은 [등록 및 소유권][8]을 참조하세요.

## 러너 관리 {#manage-the-runner}

### 허용 목록 변경 {#change-the-allowlist}

Datadog Agent에서 러너의 허용 목록을 편집하려면 다음 단계를 따르세요.

{{< tabs >}}
{{% tab "Linux" %}}
1. `/etc/datadog-agent/datadog.yaml`에서 `private_action_runner.actions_allowlist` 섹션을 편집합니다.
1. `sudo systemctl restart datadog-agent`를 실행하여 Agent를 재시작합니다.
{{% /tab %}}
{{% tab "Windows" %}}
1. `C:\ProgramData\Datadog\datadog.yaml`에서 `private_action_runner.actions_allowlist` 섹션을 편집합니다.
1. `Restart-Service -Force datadogagent`를 실행하여 Agent를 재시작합니다.
{{% /tab %}}
{{% tab "Kubernetes(Operator)" %}}
1. 두 `DatadogAgent` 매니페스트 주석 `agent.datadoghq.com/private-action-runner-configdata` 및 `cluster-agent.datadoghq.com/private-action-runner-configdata`에서 `actions_allowlist`를 업데이트합니다.
1. `kubectl apply -f datadog-agent.yaml`을 실행하여 업데이트된 매니페스트를 적용합니다.
{{% /tab %}}
{{% tab "Kubernetes(Helm)" %}}
1. `values.yaml`에서 `privateActionRunner.actionsAllowlist`(노드 Agent) 또는 `clusterAgent.privateActionRunner.actionsAllowlist`(Cluster Agent)를 업데이트합니다.
1. `helm upgrade datadog-agent datadog/datadog -f values.yaml`을 실행하여 업데이트된 차트를 적용합니다.
{{% /tab %}}
{{< /tabs >}}

### 비활성 러너 자동 삭제 {#automatic-deletion-of-inactive-runners}

사용하지 않는 리소스를 확보하기 위해 Datadog은 35일 동안 활동이 없는 API 키만 사용하는(소유자가 없는) 구성의 노드 Agent 기반 프라이빗 액션 러너를 자동으로 삭제합니다. 이 자동 정리 기능은 소유자가 있는 러너나 Cluster Agent 러너에는 적용되지 않습니다.

비활성 상태로 인해 러너가 삭제된 경우, 다시 시작하면 오류가 발생합니다. 설치 단계를 통해 러너를 다시 등록해야 합니다.

## 로그를 사용한 디버깅 {#debugging-with-logs}

{{< tabs >}}
{{% tab "Linux" %}}

```bash
cat /var/log/datadog/private-action-runner.log
```

{{% /tab %}}
{{% tab "Windows" %}}

```powershell
Get-Content C:\ProgramData\Datadog\logs\private-action-runner.log
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

{{% /tab %}}
{{< /tabs >}}

## 러너 업데이트 {#update-the-runner}

Agent 업그레이드에 맞춰 Runner를 최신 상태로 유지하려면 Datadog Agent의 Runner를 업데이트하세요.

{{< tabs >}}
{{% tab "Linux" %}}

Datadog Agent를 최신 버전으로 업그레이드하세요. 러너는 Agent와 함께 번들로 제공됩니다.

```bash
sudo apt-get update && sudo apt-get install datadog-agent
```

RHEL/CentOS의 경우

```bash
sudo yum update datadog-agent
```

업그레이드 후 Agent를 다시 시작합니다.

```bash
sudo systemctl restart datadog-agent
```

자세한 업그레이드 지침은 [Agent v7로 업그레이드][1]를 참조하세요.

[1]: /ko/agent/versions/upgrade_to_agent_v7/

{{% /tab %}}
{{% tab "Windows" %}}

[Datadog Agent 다운로드 페이지][1]에서 최신 Agent MSI 설치 프로그램을 다운로드하여 실행하거나 PowerShell을 사용하세요.

```powershell
# Download the latest installer
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi" -OutFile ddagent-cli-latest.msi

# Run the installer
Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i ddagent-cli-latest.msi'
```

업그레이드 후 Agent를 다시 시작합니다.

```powershell
Restart-Service -Force datadogagent
```

[1]: https://app.datadoghq.com/account/settings#agent/windows

{{% /tab %}}
{{% tab "Kubernetes(Operator)" %}}

`DatadogAgent` 매니페스트에서 Datadog Operator 및 Agent 이미지 버전을 업데이트하세요.

1. Datadog Operator를 업데이트합니다.

   ```bash
   helm repo update
   helm upgrade datadog-operator datadog/datadog-operator \
       --set image.repository=registry.datadoghq.com/operator \
       --set image.tag=latest
   ```

   특정 버전을 고정할 수 있습니다. 사용 가능한 태그를 찾아보려면 [Docker Hub][1]을 사용하세요.

1. `datadog-agent.yaml` 매니페스트에서 Agent 이미지 버전을 업데이트합니다.

   ```yaml
   override:
     nodeAgent:
       image:
         name: registry.datadoghq.com/agent:<NEW_AGENT_VERSION>
     clusterAgent:
       image:
         name: registry.datadoghq.com/cluster-agent:<NEW_AGENT_VERSION>
   ```

1. `kubectl apply -f datadog-agent.yaml`을 실행하여 업데이트된 매니페스트를 적용합니다.
1. 업데이트를 확인합니다.

   ```bash
   kubectl get pods
   kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=100 | grep private
   ```

Cluster Agent 러너는 ID를 공유 Kubernetes 시크릿에 저장하므로 업데이트 후에도 동일한 ID가 유지됩니다. 노드 Agent 러너는 ID를 파일에 저장합니다. 해당 경로가 영구 볼륨으로 지원되지 않는 경우, 업데이트 시 ID가 삭제되어 러너를 다시 등록해야 할 수 있습니다. [Kubernetes의 ID 스토리지][2]를 참조하세요.

[1]: https://hub.docker.com/r/datadog/operator/tags
[2]: /ko/actions/private_actions/enroll_runner/#identity-storage-on-kubernetes

{{% /tab %}}
{{% tab "Kubernetes(Helm)" %}}

러너 업데이트는 표준 Datadog Agent Helm 차트 업그레이드 프로세스의 일부입니다.

```bash
helm repo update
helm upgrade datadog-agent datadog/datadog -f values.yaml
```

자세한 업그레이드 지침은 [Datadog Helm 업그레이드][1]를 참조하세요.

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading

{{% /tab %}}
{{% tab "Terraform(Operator)" %}}

Terraform 구성에서 버전 변수를 업데이트하세요.

```hcl
locals {
  helm_operator_version = "<NEW_OPERATOR_VERSION>"
  agent_version         = "<NEW_AGENT_VERSION>"
  # ...
}
```

변경 사항을 적용하세요.

```bash
terraform plan
terraform apply -var="datadog_api_key=<YOUR_API_KEY>" -var="datadog_app_key=<YOUR_APP_KEY>"
```

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/private_actions/set_up_standalone/
[2]: /ko/remote_configuration
[3]: https://app.datadoghq.com/fleet/install-agent/latest
[4]: /ko/actions/connections/
[5]: /ko/actions/private_actions/execution_policies/
[6]: https://app.datadoghq.com/actions/action-catalog
[7]: /ko/actions/private_actions/reference/
[8]: /ko/actions/private_actions/enroll_runner/