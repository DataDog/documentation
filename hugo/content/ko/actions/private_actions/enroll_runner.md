---
description: 프라이빗 액션 러너가 Datadog에 등록되는 방식, 등록을 통해 러너의 소유권이 설정되는 방식, 그리고 소유권에 따라 러너가
  사용할 권한 부여 모델이 결정되는 방식입니다.
further_reading:
- link: /actions/private_actions/set_up_agent_based
  tag: 설명서
  text: 프라이빗 액션 러너 설정하기
- link: /actions/private_actions/authorize_private_actions
  tag: 설명서
  text: 프라이빗 액션 권한 부여
- link: /actions/private_actions/execution_policies
  tag: 설명서
  text: Execution Policies
title: 등록 및 소유권
---
## 개요 {#overview}

프라이빗 액션 러너가 시작되면 Datadog 조직에 등록됩니다. 러너는 스스로를 등록하고 모든 요청을 인증하는 데 사용하는 ID를 받습니다. 등록은 러너의 **소유권**도 설정하며, 소유권에 따라 러너가 수명 동안 사용하는 권한 부여 모델이 결정됩니다. 러너를 재등록하지 않고는 소유권을 변경할 수 없으므로 배포하기 전에 등록 방법을 신중하게 선택하세요.

등록은 두 가지 형태의 러너 모두에 적용됩니다. 소유자 없는 등록과 그에 따른 Execution Policies 권한 부여는 Datadog Agent의 러너에만 적용됩니다. 독립형 러너는 항상 소유자가 있는 상태입니다.

## 등록 프로세스 {#the-enrollment-process}

1. 자격 증명 세트와 러너를 활성화하는 구성을 사용하여 러너를 시작합니다.
2. 러너가 Datadog에 등록됩니다. 기본적으로(`self_enroll: true`) 러너는 별도의 수동 단계 없이 시작 시 자동으로 등록됩니다.
3. Datadog은 러너에게 고유한 러너 식별자와 키 쌍으로 구성된 ID를 발급합니다: . 러너는 이 ID를 유지하며 이후 재시작 시 재사용합니다.
4. 러너는 자신의 ID를 사용하여 Datadog에 인증하고 수신하는 태스크를 검증합니다.

셀프 등록을 사용하는 대신 러너의 ID를 직접 사전 프로비저닝하려면 [구성 옵션](#configuration-options)을 참조하세요.

## 등록 유형 및 소유권 {#enrollment-types-and-ownership}

두 가지 방법 중 하나로 러너를 등록할 수 있습니다. 등록에 사용하는 자격 증명이 러너의 소유권을 설정하며, 소유권에 따라 권한 부여 모델이 결정됩니다. 단일 러너에는 두 모델 중 하나의 권한 부여 모델만 적용됩니다. 소유권은 등록 시 한 번 설정되며 러너의 수명 동안 변경되지 않습니다. 이를 변경하려면 다른 자격 증명 유형으로 러너를 다시 등록하세요. 배포하기 전에 원하는 모델을 결정한 다음 일치하는 자격 증명으로 등록하세요. 두 모델을 자세히 비교하려면 [프라이빗 액션 권한 부여][5]를 참조하세요.

| 등록 방법 | 러너 소유권 | 권한 부여 모델 |
|---|---|---|
| Private Action Runner 기능이 있는 **API 키** | 소유자가 없는 | [Execution Policies][1] |
| **API 키** 및 **애플리케이션 키** | 소유자 있음 | [Connections][2] |

### 소유자가 없는 러너 {#ownerless-runners}

**Private Action Runner 기능이 있는 API 키**로 등록된 러너는 **소유자가 없으며**: 개별 사용자에게 소유되지 않습니다. 소유자가 없는 러너에는 [Execution Policies][1]를 통해 권한이 부여되며, 이는 전체 플릿의 Agent 태그를 통한 액세스를 제어합니다. 소유자가 없는 등록은 Datadog Agent의 러너에 적용됩니다.

**Private Action Runner** 기능은 Remote Configuration과 유사하게 배지로 표시됩니다. 이를 관리하려면 **API Keys Read**(`api_keys_read`) 및 **API Keys Write**(`api_keys_write`) API 키 권한이 필요합니다. 자세한 내용은 [API 및 애플리케이션 키 권한][9]을 참조하세요.

소유자가 없는 러너를 등록하려면 다음 단계를 따르세요.

1. Datadog에서 [**Organization Settings > API Keys**][3]로 이동합니다.
2. API 키를 생성하거나 선택하고 **Private Action Runner** 기능을 활성화합니다.
3. 해당 API 키로 러너를 구성하고 API 키 전용 등록을 활성화합니다. 배포 단계 및 필요한 Agent 버전에 대한 자세한 내용은 [Datadog Agent에서 프라이빗 액션 러너 설정][4]을 참조하세요.

Kubernetes에서 러너가 읽는 시크릿에 API 키를 저장하세요.

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

### 소유자가 있는 러너 {#owned-runners}

애플리케이션 키로 등록된 러너는 **소유**되며, 등록한 사용자가 러너의 소유자가 됩니다. 소유자가 있는 러너에는 [Connections][2]를 통해 권한이 부여됩니다. 등록 중에 Datadog은 러너의 허용 목록에 있는 통합을 위한 연결을 생성하므로, 러너는 해당 통합과 함께 사용할 수 있는 상태가 됩니다.

소유자가 있는 등록 방식은 정식 출시된 방식이며, 독립형 러너와 Datadog Agent의 러너 모두에서 작동합니다.

Kubernetes에서 러너가 읽는 시크릿에 API 키와 애플리케이션 키를 저장하세요.

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY> \
  --from-literal app-key=<DD_APP_KEY>
```

## 소유자가 있는 러너의 액세스 관리 {#manage-access-to-owned-runners}

이 섹션은 **소유자가 있는** 러너에만 적용됩니다. 소유자가 없는 러너에는 개별 소유자가 없으며, 누가 해당 러너에서 액션을 실행할 수 있는지는 [Execution Policies][1]에서 제어됩니다.

[역할 기반 액세스 제어(RBAC)][6]를 사용하여 소유자가 있는 러너의 액세스를 제어합니다. 러너에 권한을 설정하여 수정을 제한하거나 새 연결이 추가되지 않도록 할 수 있습니다. 기본적으로 러너의 생성자만 Editor 액세스 권한을 가지며, 생성자는 추가 사용자, 서비스 계정, 역할 또는 팀에 액세스 권한을 부여할 수 있습니다. 프라이빗 액션 러너에 적용되는 권한 목록을 보려면 [Datadog 역할 권한][7]을 참조하세요.

### 권한 수준{#permission-levels}

**Viewer**
: 러너와 해당 러너에 연결된 연결을 조회할 수 있습니다.

**Contributor**
: 러너를 조회하고 새 연결을 추가하여 러너에 기여할 수 있습니다.

**Editor**
: 러너를 조회하고, 새 연결을 추가하여 기여하고, 러너를 편집할 수 있습니다.

### 러너 권한 설정 {#set-permissions-on-a-runner}

1. 러너의 Edit 페이지로 이동합니다.
2. **Who Has Access?** 섹션에서 **Edit access**를 클릭합니다.
3. 드롭다운 메뉴에서 사용자, 서비스 계정, 역할 또는 팀을 선택한 다음 **Add**를 클릭합니다. 선택한 주체가 대화 상자 하단에 나타납니다.
4. 주체 이름 옆의 드롭다운 메뉴에서 원하는 권한을 선택합니다.
5. 주체에 대한 액세스 권한을 제거하려면 권한 드롭다운 메뉴에서 **Remove access**를 선택합니다.
6. **Done**을 클릭하여 권한 설정을 완료합니다.
7. **Save**를 클릭하여 러너에 새 권한을 적용합니다.

## 구성 옵션 {#configuration-options}

아래 설정은 등록을 제어합니다. 러너 설정 및 기본값의 전체 목록은 [프라이빗 액션 러너 참조][8]를 참조하세요.

| 설정 | 목적 |
|---|---|
| `self_enroll` | 시작 시 자동으로 등록합니다. 기본적으로 활성화되어 있습니다. |
| `api_key_only_enrollment` | Private Action Runner 기능이 있는 API 키를 사용하여 소유자 없는 러너로 등록합니다. |
| `actions_allowlist` | 러너가 실행할 수 있는 작업입니다. 소유자가 있는 러너의 경우, Datadog은 등록 중에 이러한 통합을 위한 연결을 생성합니다. |

### Kubernetes의 ID 스토리지 {#identity-storage-on-kubernetes}

Datadog Agent의 러너는 재시작 후에도 ID가 유지되도록 이를 저장합니다. ID가 저장되는 위치는 러너에 따라 다릅니다.

- **Cluster Agent 러너:** ID를 Kubernetes 시크릿에 저장하므로 Cluster Agent 복제본 간에 ID가 공유됩니다. Helm 또는 Datadog Operator로 설치할 때 기본 시크릿 이름은 `datadog-private-action-runner-identity`입니다.
- **Node Agent 러너:** ID를 파일에 저장합니다. Kubernetes에서는 포드 재시작 후에도 ID가 유지되도록 해당 경로에 영구 볼륨을 연결하세요.

## 러너 ID 및 태스크 인증{#runner-identity-and-task-authentication}

등록을 통해 각 러너는 Datadog이 액세스할 수 없는 프라이빗 키를 받습니다. Datadog은 해당 공개 키를 사용하여 러너를 인증하므로, 조직의 태스크는 해당 조직의 러너만 가져올 수 있습니다.

Datadog은 발송하는 모든 태스크에 서명하며, 러너는 태스크를 실행하기 전에 서명을 검증합니다.

## 프라이빗 러너 자격 증명 교체{#rotating-private-runner-credentials}

재배포 없이 프라이빗 러너의 자격 증명을 교체하려면 호스트 또는 노드 Agent에서 `/opt/datadog-agent/embedded/bin/privateactionrunner rotate-identity`를 실행하거나 Cluster Agent에서 `/opt/datadog-agent/bin/datadog-cluster-agent rotate-par-identity`를 실행하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/private_actions/execution_policies/
[2]: /ko/actions/connections/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/actions/private_actions/set_up_agent_based/
[5]: /ko/actions/private_actions/authorize_private_actions/
[6]: /ko/account_management/rbac/
[7]: /ko/account_management/rbac/permissions/#app-builder--workflow-automation
[8]: /ko/actions/private_actions/reference/
[9]: /ko/account_management/rbac/permissions/#api-and-application-keys