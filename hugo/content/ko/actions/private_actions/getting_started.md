---
description: Datadog Operator를 사용하여 Datadog Agent에 Private Action Runner를 배포한 다음,
  Datadog의 기본 Execution Policies를 사용하여 첫 번째 액션을 실행하세요.
further_reading:
- link: actions/private_actions
  tag: 설명서
  text: Private Actions 개요
- link: actions/private_actions/reference
  tag: 설명서
  text: Private Action Runner 참조
title: Private Actions로 시작하기
---
## 개요 {#overview}

이 가이드에 따라 Datadog Operator를 사용하여 Datadog Agent 내부에 Private Action Runner를 배포한 다음, Datadog이 자동으로 승인하는 읽기 전용 액션을 실행하세요.

이 방법은 시작하기 위한 권장 경로입니다. 다음 구성을 사용합니다:

- **독립형 호스트 프로세스가 아닌 Datadog Agent에서 러너를 실행하세요**.
- **Kubernetes에서 Datadog Operator로 설치하세요**.
- **API 키로 등록하여**, 러너가 실행 정책으로 승인되도록 하세요.
- **Datadog이 자동으로 프로비저닝하는 Datadog의 기본 Execution Policies를 사용하여**, 별도의 설정 없이 러너 전반에서 읽기 전용 Kubernetes 및 Remote Action 액션을 승인하세요.

이 가이드를 마치면 등록된 러너와 작동하는 읽기 전용 액션을 갖게 됩니다.

## 전제 조건 {#prerequisites}

- Datadog Agent 7.81.0 이상을 실행 중인 [Datadog Operator][1] v1.28.0 이상에서 관리되는 Kubernetes 클러스터.
- 조직에 [Remote Configuration][2]이 활성화됨.
- [Organization Settings][3]에서 API 키를 생성할 수 있는 권한.
- `https://`에서 Datadog에 대한 네트워크 액세스.{{< region-param key=dd_site >}}`.

## 1단계: Private Action Runner 기능이 있는 API 키 생성 {#step-1-create-an-api-key-with-the-private-action-runner-capability}

소유자가 없는 러너는 Private Action Runner 기능이 있는 API 키로 등록됩니다. 애플리케이션 키는 필요하지 않습니다.

1. Datadog에서 **[Organization Settings > API 키][3]**로 이동하여 API 키를 생성하거나 선택하세요.
1. 키에서 **PAR**(Private Action Runner 기능) 옆의 **Enable**을 클릭하세요.
   {{< img src="actions/private_actions/getting_started/api_key_par_capability.png" alt="Remote Configuration 설정 옆에 PAR 기능이 활성화된 API 키 세부 정보 패널" style="width:60%;" >}}
1. Agent가 읽는 Kubernetes 시크릿에 키 값을 저장하세요:
   ```bash
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```

## 2단계: Datadog Operator를 사용하여 러너 배포{#step-2-deploy-the-runner-with-the-datadog-operator}

Operator 주석을 통해 `DatadogAgent` 리소스에서 러너를 활성화하세요. 다음 예제는 노드 Agent와 클러스터 Agent 모두에서 러너를 활성화하고, API 키로 소유자 없이 등록하며, 소규모 읽기 전용 작업 세트를 허용합니다.

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

매니페스트를 적용하세요:

```bash
kubectl apply -f datadog-agent.yaml
```

`api_key_only_enrollment`가 설정되어 있고 API 키만 제공하면 각 러너는 시작 시 **소유자 없이** 자동으로 등록되며, 이는 실행 정책으로 승인됨을 의미합니다. 이 매니페스트는 이 가이드를 위한 최소한의 Operator 설정입니다. 전체 러너 구성, 기타 설치 방법(호스트, Windows, Helm) 및 전체 필드 참조는 [Datadog Agent에서 프라이빗 액션 러너 설정하기][4]를 참조하세요. 등록에 대해 자세히 알아보려면 [등록 및 소유권][5]을 참조하세요.

예제의 `actions_allowlist` 항목은 이 가이드에서 사용하는 작업을 허용하기 위해 번들 와일드카드를 사용합니다. 러너의 내장 읽기 전용 작업을 대신 사용하려면 `actions_allowlist`를 비워 두세요. 그러면 러너가 기본 작업 세트를 활성화하며, 여기에는 읽기 전용 원격 작업 네트워크 및 셸 작업과 클러스터 Agent의 읽기 전용 Kubernetes 작업 세트가 포함됩니다.

## 3단계: 러너가 등록되었는지 확인하세요{#step-3-confirm-the-runner-is-enrolled}

Datadog에서 [Private Action 러너][6]로 이동하세요. 새 러너가 목록에 나타나는지 확인하세요.

클러스터 Agent 로그를 확인하여 러너가 시작되었는지 검사할 수도 있습니다.

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

노드 Agent 로그 및 기타 플랫폼에 대해서는 [로그로 디버깅][12]을 참조하세요.

Datadog은 조직에 **기본 실행 정책**을 프로비저닝합니다. 이 정책은 `*`의 대상 선택기를 사용하므로, 배포한 Agent를 포함하여 Private Action 러너를 실행하는 모든 Agent에 대해 자동으로 적용됩니다. 이것이 별도의 실행 정책 설정 없이 읽기 전용 작업을 승인하는 방식입니다. [Datadog 디폴트 실행 규칙][7]을 참조하세요.

## 4단계: 첫 번째 작업 실행 {#step-4-run-your-first-action}

Action Catalog에서 새 러너에 대해 읽기 전용 Kubernetes 작업을 실행하세요. Action Catalog는 워크플로 단계와 동일한 방식으로 작업을 실행합니다. 즉, 대상 Agent를 선택하고 입력을 제공한 다음 작업을 실행합니다.

1. Datadog Action Catalog에서 [Pods 나열][8](`com.datadoghq.kubernetes.core.listPod`)을 엽니다.
1. **Configure connection** 아래에서 **Target** 탭(**Connection** 대신)을 선택합니다.
1. **Orch 클러스터 ID**를 러너가 실행 중인 클러스터의 오케스트레이션 클러스터 ID로 설정하세요. [Fleet Automation의 Fleet 조회][11]에서 클러스터의 태그 중 Orchestration 클러스터 ID를 찾을 수 있습니다.
1. **입력 구성** 아래에서 포드를 나열할 **네임스페이스**를 입력합니다. **Field selector**, **Label selector**, **Limit**을 설정할 수도 있습니다.
1. **Run**을 클릭하세요. 결과가 패널에 나타납니다.
  {{< img src="actions/private_actions/getting_started/run_action_action_catalog.png" alt="연결이 Target으로 설정되고 Orch 클러스터 ID가 입력된 Action Catalog의 List Pods 액션" style="width:80%;" >}}

작업이 러너에서 실행되고 결과를 반환합니다. 워크플로에서 동일한 작업을 실행하려면 Workflow Automation에 비공개 작업 단계를 추가하고 연결 선택기에서 **Target**을 선택하세요. [워크플로에서 Execution Policy 사용][9]을 참조하세요.

## 다음 단계 {#next-steps}

이 가이드는 읽기 전용 작업만 승인하는 Datadog의 기본 실행 정책을 사용합니다. 쓰기 가능한 작업을 실행하거나 특정 팀 또는 환경으로 액세스 범위를 지정하려면 고유한 실행 정책을 생성하세요. [실행 정책][10]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/containers/datadog_operator/
[2]: /ko/remote_configuration
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/actions/private_actions/set_up_agent_based/
[5]: /ko/actions/private_actions/enroll_runner/
[6]: https://app.datadoghq.com/actions/private-action-runners
[7]: /ko/actions/private_actions/execution_policies/#default-execution-policies
[8]: https://app.datadoghq.com/actions/action-catalog#com.datadoghq.kubernetes/com.datadoghq.kubernetes.core/com.datadoghq.kubernetes.core.listPod
[9]: /ko/actions/private_actions/execution_policies/#use-an-execution-policy-in-a-workflow
[10]: /ko/actions/private_actions/execution_policies/
[11]: https://app.datadoghq.com/fleet?view_by=clusters
[12]: /ko/actions/private_actions/set_up_agent_based/#debugging-with-logs