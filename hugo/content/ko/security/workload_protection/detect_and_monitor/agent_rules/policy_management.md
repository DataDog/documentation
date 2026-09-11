---
aliases:
- /ko/security/workload_protection/workload_security_rules/custom_rules
- /ko/security/threats/workload_security_rules/custom_rules
description: Workload Protection 정책을 생성, 배포하고 인프라에 적용할 범위를 지정하며, 사용자 지정 Agent 규칙을
  작성하세요.
disable_toc: false
title: 정책 관리
---
Agent 규칙은 **정책으로 구성**됩니다. 정책은 함께 배포하고, 특정 인프라(호스트, 클러스터 등)에 **적용 범위를 지정**하는 Agent 규칙 집합입니다.

기본 제공(OOTB) [기본 Agent 규칙][7] 외에도 **사용자 지정 Agent 규칙**을 작성하여 표준 OOTB 규칙만으로는 Datadog에서 표시되지 않는 이벤트를 탐지할 수 있습니다.

## 정책 {#policies}

### 정책 생성 {#create-a-policy}

1. [Policies][3]로 이동합니다.
2. {{< ui >}}New Policy{{< /ui >}}를 클릭합니다. 기존 정책을 열고 {{< ui >}}Actions{{< /ui >}}를 클릭하여 복제할 수도 있습니다.
3. 정책 이름을 입력하고 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
   새 정책이 생성되지만 활성화되거나 배포되지는 않습니다.
4. 정책을 클릭하여 엽니다.
5. {{< ui >}}New Rule{{< /ui >}}에서 정책에 사용자 지정 Agent 규칙을 추가합니다. Agent 규칙을 생성하려면 [사용자 지정 Agent 규칙 생성][14]을 참조하세요.
6. {{< ui >}}Deployed on 0 agents{{< /ui >}} 옆의 {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
7. 정책에 [태그][17]를 추가하여 특정 인프라를 대상으로 지정합니다.
8. 정책을 배포하려면 {{< ui >}}Policy is disabled{{< /ui >}} 옆의 스위치를 켜고 확인합니다. 이는 아래 페이지에 자세히 설명된 [Remote Configuration](#remote-configuration)을 사용합니다.

### Datadog 관리형 정책을 현재 버전으로 고정 {#pin-a-datadog-managed-policy-to-its-current-version}

<div class="alert alert-info">정책 고정은 Agent 버전 7.71.0 이상에서 지원됩니다. 이전 Agent는 최신 정책 업데이트를 자동으로 계속 수신합니다.</div>

Datadog에서 관리하는 정책이 Datadog에 의해 업데이트되면 인프라에 자동으로 배포됩니다.

새 정책 버전이 인프라에 배포되는 시점을 제어하려면 정책을 현재 버전으로 고정할 수 있습니다. 정책 버전을 고정하면 Datadog에서 새 정책 버전을 릴리스할 때 정책 업데이트가 자동으로 롤아웃되지 않습니다.

정책을 고정하려면 다음 단계를 따르세요.

1. [Policies][3]로 이동합니다.
2. Datadog 관리형 정책을 클릭합니다.
3. {{< ui >}}Version{{< /ui >}}에서 고정 옵션을 클릭합니다.
   인프라에서 7.71.0 미만 버전의 Agent를 실행 중인 경우, 오래된 Agent 경고가 표시됩니다. [Fleet Automation][18]에서 Agent 버전을 조회하고 업그레이드하세요.
4. {{< ui >}}Pin{{< /ui >}}을 클릭합니다. 정책 버전 고정을 해제하려면 고정 옵션을 다시 클릭하세요.

### 충돌하는 규칙 {#conflicting-rules}

동일한 호스트에 배포된 두 정책에 상태가 서로 다른 동일한 규칙(활성 및 비활성)이 포함된 경우, 해당 규칙은 활성 상태로 간주됩니다.

### 태그 적용 {#apply-tags}

태그는 환경, 클러스터 또는 호스트와 같이 정책이 적용되는 위치를 정의합니다. 정책에 태그를 추가하여 규칙 적용 범위를 인프라의 일부로 제한하세요.

1. [Agent Configuration][6]으로 이동합니다.
2. 정책을 열고 {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
3. 태그를 입력하고 {{< ui >}}Apply{{< /ui >}}를 클릭합니다. 정책이 활성화되면 태그가 지정한 대상에 정책이 적용됩니다.

태그를 추가하면 Datadog에서 해당 태그가 지정된 Agent 수와 각 Agent를 실행하는 인프라를 표시합니다. 예: `Tags match 144 agents`.

## 사용자 지정 Agent 규칙 생성 {#create-a-custom-agent-rule}

사용자 지정 Agent 규칙을 생성하여 사용자 지정 정책의 일부로 배포할 수 있습니다. 이후 사용자 지정 [탐지 규칙][19]을 정의할 때 사용자 지정 Agent 규칙을 참조하고 표현식 파라미터를 추가합니다.
사용자 지정 Agent 규칙은 기본 정책과 별도의 사용자 지정 정책을 통해 Agent에 배포됩니다. 사용자 지정 정책에는 사용자 지정 Agent 규칙만 포함됩니다.

1. [Agent Configuration][6]으로 이동합니다.
2. 정책을 생성하거나 기존 정책을 엽니다.
3. 정책을 연 상태에서 {{< ui >}}Actions{{< /ui >}}에서 {{< ui >}}Manual rule creator{{< /ui >}}를 선택하여 Agent 규칙 편집기를 엽니다. 동일한 편집기를 Datadog의 [Agent rules][21] 페이지에서도 사용할 수 있습니다. 대신 {{< ui >}}Assisted rule creator{{< /ui >}} 마법사를 사용하여 Agent 규칙과 위협 탐지 규칙을 함께 설정하려면 [사용자 지정 Agent 및 탐지 규칙 함께 생성][20]을 참조하세요.
4. 규칙의 {{< ui >}}Name{{< /ui >}} 및 {{< ui >}}Description{{< /ui >}}을 입력합니다.
5. {{< ui >}}Expression{{< /ui >}}에서 [Datadog Security Language(SECL)][15]를 사용하여 일치 항목을 정의합니다.
6. (필요시) 규칙이 이벤트와 일치할 때 실행되는 변수 또는 작업을 추가합니다. [변수 및 액션][22]을 참조하세요.
7. {{< ui >}}Create Agent Rule{{< /ui >}}을 클릭합니다. 정책으로 돌아갑니다.

사용자 지정 Agent 규칙을 생성하면 변경 사항이 다른 보류 중인 규칙 업데이트와 함께 저장됩니다. 변경 사항을 환경에 적용하려면 업데이트된 사용자 지정 정책을 Agent에 배포하세요.

## 정책 활성화 및 배포 {#enable-and-deploy-policies}

활성화된 정책은 해당 태그로 식별된 인프라 대상에 규칙을 적용합니다. 정책을 활성화하는 것은 정책을 배포하는 것과 같습니다.

Datadog UI에서 **Remote Configuration**을 사용하여 정책 태그(모든 호스트 또는 정의된 호스트 하위 집합)로 지정된 호스트에 사용자 지정 정책을 자동으로 배포하거나, 각 호스트의 Agent에 정책을 **수동으로 배포**할 수 있습니다.

### Remote Configuration {#remote-configuration}

**Remote Configuration**은 Datadog이 Agent에 정책을 자동으로 전달하는 방식입니다. 이 방식은 서명되고 인증된 정책만 Agent로 푸시하는 보안 메커니즘을 사용합니다. Remote Configuration을 사용하여 정책을 배포하려면 위의 정책 생성 절차를 따르세요.

#### 배포 전략 {#deployment-strategies}

Remote Configuration을 사용하여 Agent 규칙이나 정책의 변경 사항을 롤아웃할 때 두 가지 전략 중 하나를 선택할 수 있습니다. 모든 호스트에 즉시 변경 사항을 배포하거나, 관리형 배포를 사용하여 단계별로 배포할 수 있습니다. [Deployments 페이지][23]에서 배포를 모니터링하세요.

##### 즉시 배포 {#deploy-instantly}

즉시 배포를 사용하면 업데이트된 정책이 스테이지별 검증 없이 범위 내의 모든 호스트에 동시에 전송됩니다. 일반적으로 몇 분 정도 소요되며, 변경 사항을 모든 곳에 즉시 적용해야 할 때 적합합니다.

{{< ui >}}Deploy instantly{{< /ui >}}를 선택한 후 {{< ui >}}Update Policy{{< /ui >}}를 클릭하세요. [Deployments 페이지][23]에서 진행 상황을 추적하세요.

##### 관리형 배포 {#managed-deployment}

관리형 배포는 변경 사항을 스테이지별로 롤아웃하므로 전체 인프라에 적용하기 전에 일부 호스트에서 변경 사항을 검증할 수 있습니다.

1. 정책이나 규칙을 편집할 때 {{< ui >}}Start a managed deployment{{< /ui >}}를 선택하세요. 정책이나 규칙이 관리형 배포로 이미 롤아웃된 경우, {{< ui >}}Start from your last deployment{{< /ui >}}를 선택하여 마지막 배포의 파라미터를 재사용하세요. 규칙 변경의 경우, 재사용되는 파라미터는 해당 규칙을 포함하는 정책의 마지막 배포 파라미터입니다.
2. {{< ui >}}Customize deployment roll-out plan{{< /ui >}}에서 배포 범위를 설정한 후 최대 10개의 스테이지를 구성하여 변경 사항을 점진적으로 롤아웃합니다. 각 스테이지는 {{< ui >}}By percentage of hosts in scope{{< /ui >}} 또는 {{< ui >}}By host tags{{< /ui >}}를 기준으로 정의됩니다.
3. {{< ui >}}Set up monitoring and delay time{{< /ui >}}에서 배포 중에 검사할 모니터를 하나 이상 선택합니다. 배포가 진행되는 동안 모니터가 경보를 보내면 롤아웃이 일시 중지됩니다. 그 이후 다음 스테이지로 넘어가기 전에 대기할 지연 시간을 설정하세요.
4. {{< ui >}}Set deployment window{{< /ui >}}에서 배포가 실행될 수 있는 요일, 시간 및 시간대를 설정합니다. 배포가 지정된 시간대를 벗어나면 일시 중지되었다가 다음 실행 시간대에 다시 시작됩니다.
5. (필요시) {{< ui >}}Add a description{{< /ui >}}에서 배포에 관한 설명을 추가합니다.
6. {{< ui >}}Update Policy{{< /ui >}}를 클릭하여 롤아웃을 시작합니다. [Deployments 페이지][23]에서 진행 상황을 추적하세요.

### 수동 배포{#manual-deployment}

**수동 배포**의 경우, 각 Agent에 정책 파일을 직접 설치합니다. Datadog UI에서 정책과 해당 규칙을 빌드하고 생성된 파일을 **다운로드**할 수 있습니다. 정책 구문을 이미 알고 있다면 `.policy` 파일을 직접 작성하세요. 그런 다음 아래 설명에 따라 정책이 실행되어야 하는 모든 Agent에 해당 파일을 업로드하거나 동기화하세요.

1. {{< ui >}}Agent Configuration{{< /ui >}} 페이지에서 정책을 엽니다.
2. Actions에서 {{< ui >}}Download Policy{{< /ui >}}를 선택합니다.

다음으로, 아래 지침에 따라 각 호스트에 정책 파일을 업로드하세요.

{{< tabs >}}
{{% tab "호스트" %}}

`default.policy` 파일을 대상 호스트의 `/etc/datadog-agent/runtime-security.d` 폴더(모든 `.policy` 파일이 저장될 폴더)로 복사하세요. 호스트의 `root` 사용자가 해당 파일에 대한 `read` 및 `write` 권한이 있어야 합니다.

변경 사항을 적용하려면 다음 중 **하나**를 수행하세요.

-   런타임 정책을 다시 로드하세요(Agent 전체 재시작 불필요).

    ```bash
    sudo /opt/datadog-agent/embedded/bin/system-probe runtime policy reload
    ```

-   [Datadog Agent][27]를 재시작하세요.

[27]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. `default.policy`를 포함하는 ConfigMap을 생성합니다(예: `kubectl create configmap jdefaultpol --from-file=default.policy`).
2. `values.yaml`의 `datadog.securityAgent.runtime.policies.configMap` 항목에 ConfigMap(`jdefaultpol`)을 지정합니다.

    ```yaml
    securityAgent:
        # [...]
        runtime:
            # datadog.securityAgent.runtime.enabled
            # Set to true to enable Security Runtime Module
            enabled: true
            policies:
                # datadog.securityAgent.runtime.policies.configMap
                # Place custom policies here
                configMap: jdefaultpol
        # [...]
    ```

3. `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog`을 사용하여 Helm 차트를 업그레이드합니다.

    **참고:** `default.policy`를 추가로 변경해야 하는 경우 `kubectl edit cm jdefaultpol`을 사용하거나 `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -`를 사용하여 ConfigMap을 바꿀 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

## 기본 Agent 규칙 비활성화 {#disable-default-agent-rules}

1. Agent 규칙을 비활성화하려면 [{{< ui >}}Agent Configuration{{< /ui >}}][6] 페이지로 이동하여 해당 규칙을 사용하는 정책을 선택합니다.
2. 정책에서 규칙을 엽니다.
3. 상태를 {{< ui >}}Inactive{{< /ui >}}로 설정합니다.
4. {{< ui >}}Save Changes{{< /ui >}}를 클릭합니다.

[Rules Configuration][21]에서 규칙을 삭제하면 해당 규칙이 포함된 **모든 정책**에서 규칙이 제거됩니다.

## 사용자 지정 규칙 관리를 위한 RBAC {#rbac-for-custom-rule-management}

사용자 지정 규칙 RBAC에 사용할 몇 가지 중요한 [역할 및 권한][11]은 다음과 같습니다.

-   `security_monitoring_cws_agent_rules_actions` 권한을 사용하여 규칙에서 차단 모드를 활성화하는 [Automated response][12] 기능을 켜고 구성할 수 있습니다.
    -   `security_monitoring_cws_agent_rules_actions` 권한을 사용하려면 Datadog Admin 역할을 맡은 사용자가 `security_monitoring_cws_agent_rules_actions` 권한이 포함된 역할을 생성한 후 Automated response를 관리하는 사용자만 해당 역할에 추가해야 합니다.
-   {{< ui >}}Datadog Standard{{< /ui >}} 역할은 작업으로 인해 규칙의 **보호** 설정이 변경되지 않는 한 기본적으로 사용자가 사용자 지정 규칙을 생성/업데이트할 수 있도록 허용합니다.

[3]: https://app.datadoghq.com/security/workload-protection/policies
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /ko/security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /ko/security/workload_protection/detect_and_monitor/agent_rules/#ootb-rules
[8]: /ko/security/workload_protection/
[9]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
[11]: /ko/account_management/rbac/permissions/
[12]: /ko/security/workload_protection/respond_and_report/#automated-response
[13]: #disable-default-agent-rules
[14]: #create-a-custom-agent-rule
[15]: /ko/security/workload_protection/detect_and_monitor/agent_rules/secl_guide/
[16]: #prioritize-policies
[17]: #apply-tags
[18]: https://app.datadoghq.com/fleet
[19]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[20]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[21]: https://app.datadoghq.com/security/workload-protection/agent-rules
[22]: /ko/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[23]: https://app.datadoghq.com/security/workload-protection/deployments