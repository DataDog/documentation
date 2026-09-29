---
description: 프라이빗 액션 러너를 사용하여 프라이빗 네트워크에서 사전 정의된 스크립트를 실행하세요. 여기에는 소유자가 없고 실행 정책을
  통해 권한이 부여된 Runner에 필요한 구성도 포함됩니다.
further_reading:
- link: actions/private_actions/set_up_agent_based
  tag: 설명서
  text: Datadog Agent에서 프라이빗 액션 러너 설정하기
- link: actions/private_actions/execution_policies
  tag: 설명서
  text: Execution Policies
- link: actions/private_actions/reference
  tag: 설명서
  text: 참조
title: 프라이빗 액션 러너로 스크립트를 실행하기
---
## 개요 {#overview}

프라이빗 액션 러너는 **사전 정의된 스크립트**를 실행할 수 있습니다. 사전 정의된 스크립트란 구성 파일에 미리 선언한 셸 명령, 명령줄 도구 및 스크립트를 의미합니다. 사전에 정의한 항목만 실행할 수 있으므로 러너는 워크플로 또는 앱에서 임의의 인라인 명령을 실행하지 않습니다.

<div class="alert alert-warning">러너가 실행할 수 있는 명령과 바이너리를 직접 지정하세요. 스크립트 구성에 추가하는 모든 명령, 특히 파라미터를 받는 명령을 검토하고, 러너에는 필요한 권한만 부여하며, 연결을 통해 공유하는 권한도 신중하게 검토하세요. <a href="/actions/connections/#connection-security-considerations">연결 보안 고려 사항</a>을 참조하세요.</div>

## 사용 사례 {#use-cases}

| 사용 사례 | Agent 기반 | 독립형 | 참고 |
|---|:---:|:---:|---|
| Linux 바이너리 실행(`ls`, `rm`, `find`, `curl`) | {{< X >}} | {{< X >}} | 독립형 러너의 경우 관련 파일을 컨테이너에서 액세스할 수 있어야 합니다. |
| CLI 실행(`aws`, `terraform`, `kubectl`) | {{< X >}} | {{< X >}} | 독립형 러너의 경우 이미지 내에 CLI와 자격 증명이 있어야 합니다. Agent 기반 러너의 경우 도구가 호스트에 설치되어 있어야 합니다. |
| bash 스크립트 실행 | {{< X >}} | {{< X >}} | 독립형 러너의 경우 스크립트를 컨테이너 내부에 마운트할 수 있습니다. Python 인터프리터에는 [대형 이미지](#large-image)를 사용하세요. |
| PowerShell 스크립트 실행 | {{< X >}} | | Agent 기반 Windows 러너에서만 지원됩니다. |
| 권한이 필요한 명령 실행(`systemctl restart`) | {{< X >}} | | Agent 기반 러너의 경우, 러너 사용자에게 권한을 부여하세요. 컨테이너 샌드박싱으로 인해 독립형 러너는 호스트에 높은 권한으로 액세스할 수 없습니다. |

## 전제 조건 {#prerequisites}

**Agent 기반 러너:**
- Datadog Agent 7.81.0 이상. [Datadog Agent에서 프라이빗 액션 러너 설정하기][1]를 참조하세요.
- `com.datadoghq.script.runPredefinedScript`(Linux) 또는 `com.datadoghq.script.runPredefinedPowershellScript`(Windows)를 러너의 액션 허용 목록에 추가하세요.

**독립형 러너:**
- 독립형 러너. [독립형 프라이빗 액션 러너 설정하기][2]를 참조하세요.
- 기본 이미지 또는 [대형 이미지](#large-image)에 포함되지 않은 CLI 도구의 경우, 사용자 지정 Docker 이미지가 필요합니다. [사용자 지정 이미지](#custom-images)를 참조하세요.

## Agent 기반 {#agent-based}

### 스크립트 구성 {#configure-scripts}

{{< tabs >}}
{{% tab "Linux" %}}

`/etc/datadog-agent/private-action-runner/script-config.yaml` 파일을 편집하세요.

```yaml
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world!"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
  restart-service:
    command: ["sudo", "systemctl", "restart", "{{ parameters.service }}"]
```

{{% /tab %}}
{{% tab "Windows" %}}

`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` 파일을 편집하세요.

```yaml
schemaId: script-credentials-v1
runPredefinedPowershellScript:
  helloWorld:
    script: |
      Write-Output "Hello world!"
  greet:
    script: |
      Write-Output "Run script from workflow called {{ parameters.name }} !"
    parameterSchema:
      properties:
        name:
          type: string
      required:
        - name
  restartService:
    script: |
      Restart-Service -Name {{ parameters.serviceName }} -Force
    parameterSchema:
      properties:
        serviceName:
          type: string
      required:
        - serviceName
```

{{% /tab %}}
{{< /tabs >}}

워크플로 또는 앱에서 정의한 이름(예: `echo`)으로 스크립트를 참조하세요. Linux 러너에서는 `runPredefinedScript`를 사용하고 Windows 러너에서는 `runPredefinedPowershellScript`를 사용하세요.

### 권한 부여 {#grant-permissions}

{{< tabs >}}
{{% tab "Linux" %}}

러너는 `dd-agent` 사용자로 스크립트를 실행합니다. 스크립트에 높은 권한이 필요한 경우, `dd-agent` 사용자에게 해당 권한을 부여하세요.

```bash
echo "dd-agent ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" > /etc/sudoers.d/dd-agent
chmod 440 /etc/sudoers.d/dd-agent
```

{{% /tab %}}
{{% tab "Windows" %}}

러너는 `ddagentuser`로 스크립트를 실행합니다. 스크립트에 특정 리소스에 대한 액세스 권한이 필요한 경우, `ddagentuser`에게 해당 리소스에 대한 높은 권한을 부여하세요.

```powershell
icacls "C:\<your-file-path>" /grant "ddagentuser:(OI)(CI)RX" /T

# Verify permissions
icacls "C:\<your-file-path>"
```

{{% /tab %}}
{{< /tabs >}}

### 소유자가 없는 러너(Execution Policy를 통해 권한 부여) {#ownerless-runner-execution-policy-authorized}

러너가 소유자가 없는 상태로 등록되고 [Execution Policies][3]에 의해 권한이 부여되면, 위의 단계 외에 다음 두 가지가 필요합니다.

- 사전 정의된 스크립트 액션이 러너의 액션 허용 목록에 포함되어 있어야 할 뿐만 아니라, Execution Policy를 통해 러너의 **Script** 통합에도 권한이 부여되어 있어야 합니다.
- 러너는 위 [스크립트 구성](#configure-scripts)에서 사용된 것과 동일한 **고정 경로**에서 사전 정의된 스크립트를 읽습니다.

{{< tabs >}}
{{% tab "Linux" %}}

`/etc/datadog-agent/private-action-runner/script-config.yaml`

{{% /tab %}}
{{% tab "Windows" %}}

`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`

{{% /tab %}}
{{< /tabs >}}

#### Kubernetes에서 구성 전달 {#delivering-the-config-on-kubernetes}

Kubernetes에서는 스크립트 구성 파일을 ConfigMap으로 Datadog Agent의 러너에게 제공합니다. 이 ConfigMap을 러너 컨테이너 내부의 고정 경로에 마운트합니다. Cluster Agent 러너는 위의 Linux 경로를 사용합니다.

먼저 스크립트 구성을 포함하는 ConfigMap을 생성합니다.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: par-script-config
  namespace: datadog
data:
  script-config.yaml: |
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world!"]
```

그런 다음 `DatadogAgent` 리소스에서 사전 정의된 스크립트 액션을 허용하고 ConfigMap을 러너 컨테이너 내부의 고정 경로에 마운트합니다.

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
          - "com.datadoghq.script.runPredefinedScript"
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.remoteaction.*"
spec:
  override:
    nodeAgent:
      volumes:
        - name: par-script-config
          configMap:
            name: par-script-config
      containers:
        private-action-runner:
          volumeMounts:
            - name: par-script-config
              mountPath: /etc/datadog-agent/private-action-runner/script-config.yaml
              subPath: script-config.yaml
              readOnly: true
```

마지막으로 매니페스트를 적용합니다.

```bash
kubectl apply -f datadog-agent.yaml
```

### 소유자가 있는 러너(연결 기반) {#owned-runner-connection-based}

{{< tabs >}}
{{% tab "Linux" %}}

#### 연결 구성 {#configure-the-connection}

러너의 액션 허용 목록에서 `com.datadoghq.script.runPredefinedScript`를 선택했다면, **Script** 연결이 이미 러너와 연결되어 있어야 합니다. 그렇지 않은 경우 연결을 생성하고 **파일 경로**로 `/etc/datadog-agent/private-action-runner/script-config.yaml`을 지정합니다. 자세한 내용은 [프라이빗 액션 자격 증명 처리하기][4]를 참조하세요.

{{% /tab %}}
{{% tab "Windows" %}}

#### 연결 구성 {#configure-the-connection-1}

러너의 액션 허용 목록에서 `com.datadoghq.script.runPredefinedPowershellScript`를 선택했다면, **Script** 연결이 이미 러너와 연결되어 있어야 합니다. 그렇지 않은 경우 연결을 생성하고 **파일 경로**로 `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`을 지정합니다. 자세한 내용은 [프라이빗 액션 자격 증명 처리하기][4]를 참조하세요.

{{% /tab %}}
{{< /tabs >}}

## 독립형 러너{#standalone}

독립형 러너에는 항상 소유자가 있으며 [Connections][5]를 통해 권한이 부여됩니다.

{{< tabs >}}
{{% tab "Docker" %}}

1. [러너 설정][2]을 완료한 후, **Connections**로 이동합니다.
1. **New Connection**을 클릭하고 **Script**를 선택합니다.
1. 연결 이름을 입력하고, **Private Action Runner** 드롭다운에서 러너를 선택합니다.
1. 실행하려는 명령과 함께 자격 증명 파일 템플릿을 러너의 구성 디렉터리에 복사합니다.
1. **Path to file**에서 파일 경로가 러너의 파일 시스템 경로와 일치하는지 확인합니다(대부분의 경우 기본값으로 충분합니다).
1. **Next, Confirm Access**를 클릭하고 권한을 구성한 후 **Create**를 클릭합니다.
1. 워크플로 또는 앱에서 스크립트 액션을 사용할 때 이 연결을 선택합니다.

러너의 `config.yaml` 파일과 스크립트 연결을 통해 스크립트 액션을 구성하세요.
기본값은 `credentials/script.yaml`입니다.

```yaml
# Add the script action to the allowlist (config.yaml)
actionsAllowlist:
  - com.datadoghq.script.runPredefinedScript
```

```yaml
# Configure your script connection (credentials/script.yaml)
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
    parameterSchema:
      properties:
        echoValue:
          type: string
      required:
        - echoValue
```

{{% /tab %}}
{{% tab "Kubernetes(Helm)" %}}

Helm으로 러너를 배포할 경우, `values.yaml` 파일을 통해 스크립트를 구성하세요.

```yaml
common:
  actionsAllowlist:
    - com.datadoghq.script.runPredefinedScript

credentials:
  script:
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world"]
      echo-parametrized:
        command: ["echo", "{{ parameters.echoValue }}"]
        parameterSchema:
          properties:
            echoValue:
              type: string
          required:
            - echoValue
```

러너를 배포 또는 업그레이드하세요.

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### 러너 이미지 옵션 {#runner-image-options}

다음 옵션은 독립형 러너에서만 사용할 수 있습니다.

#### 대형 이미지 {#large-image}

Python, SSH, AWS CLI, Terraform 또는 gcloud CLI와 같은 도구를 사용하려면 기본 이미지 대신 `gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}-large` 이미지를 사용하세요.

#### 사용자 지정 이미지 {#custom-images}

Datadog에서 제공하는 이미지에 사용할 수 없는 바이너리의 경우, 사용자 지정 이미지를 생성하세요.

```dockerfile
FROM gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
USER root
# Change the line below to install the tool of your choice
RUN apt update && apt install -y python3
USER dog
```

복잡한 스크립트를 러너 내부에 마운트할 수 있습니다.

```yaml
# docker-compose example
services:
  runner:
    build: . # if you are using a local Dockerfile
    volumes:
      - "./config:/etc/dd-action-runner/config" # contains credentials for actions
      - "./scripts:/etc/dd-action-runner-script/scripts" # contains dependencies for script actions
```

```yaml
# credentials/script.yaml
schemaId: script-credentials-v1
runPredefinedScript:
  python:
    command: ["python3", "/etc/dd-action-runner-script/scripts/script.py"]
  shell:
    command: ["bash", "/etc/dd-action-runner-script/scripts/script.sh"]
```

## 구성된 스크립트 사용 {#using-the-configured-scripts}

워크플로 또는 앱에서 정의한 스크립트 이름(예: `echo` 또는 `echo-parametrized`)을 사용하도록 액션을 구성하세요. Linux 러너의 경우 `runPredefinedScript`를 사용하세요. Windows 러너의 경우 `runPredefinedPowershellScript`를 사용하세요.

변수 해결은 두 단계로 이루어집니다. 하나는 워크플로 수준이고,
다른 하나는 러너 내부의 액션 수준입니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/private_actions/set_up_agent_based/
[2]: /ko/actions/private_actions/set_up_standalone/
[3]: /ko/actions/private_actions/execution_policies/
[4]: /ko/actions/connections/private_action_credentials/
[5]: /ko/actions/connections/