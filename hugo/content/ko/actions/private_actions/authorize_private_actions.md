---
description: Datadog이 Execution Policies 및 Connections를 사용하여 프라이빗 액션에 권한을 부여하는 방법을
  알아보세요.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: 설명서
  text: Private Actions 개요
- link: actions/private_actions/enroll_runner/
  tag: 설명서
  text: 등록 및 소유권
- link: actions/private_actions/set_up_agent_based/
  tag: 설명서
  text: 프라이빗 액션 러너 설정하기
- link: actions/private_actions/execution_policies/
  tag: 설명서
  text: Execution Policies
- link: actions/connections/
  tag: 설명서
  text: Connections
title: Private Actions 권한 부여하기
---
## 개요 {#overview}

워크플로와 앱에서 프라이빗 액션을 사용하면 Datadog은 해당 액션이 허용되는지 판단한 다음 **프라이빗 액션 러너**에서 이를 실행합니다. 작업이 러너에게 전송되기 전에 Datadog은 요청하는 사용자에게 해당 러너를 통해 작업을 수행할 권한이 있는지 확인합니다. 허용되지 않는 경우 작업은 러너로 전달되지 않습니다.

이 페이지에서는 해당 권한 부여 여부가 어떻게 결정되는지 설명합니다. 이 페이지에서는 Datadog이 액션을 허용하거나 거부하는 데 사용하는 모델과 각 러너에 적용되는 모델을 다룹니다.

## 권한 부여 모델 확인 {#find-your-authorization-model}

러너는 [**Execution Policies**](#execution-policies) 또는 [**Connections**](#connections) 중 하나의 모델을 통해 권한을 부여받습니다. 사용할 모델은 러너의 소유권에 의해 결정되며, 러너가 등록될 때 한 번 설정됩니다. 하나의 러너는 전체 수명 동안 이 두 모델 중 하나만 사용하며, 동일한 러너에서 두 모델을 함께 사용할 수 없습니다. 소유권은 러너별로 설정되므로, 하나의 Agent 기반 플릿에는 소유자가 없는 러너와 소유자가 있는 러너가 모두 포함될 수 있으며, 각 러너는 해당하는 모델을 통해 권한을 부여받습니다.

- **Datadog Agent의 러너**는 등록 방식에 따라 달라집니다. 소유자가 없는 Agent 러너는 [Execution Policies](#execution-policies)를 사용하고, 소유자가 있는 Agent 러너는 [Connections](#connections)를 사용합니다.
- **독립형 러너**는 항상 소유자가 있으므로 [Connections](#connections)를 사용합니다.

등록할 때 소유권이 설정되는 방식은 [등록 및 소유권][1]을 참조하세요.

## 두 모델 비교 {#compare-the-two-models}

|   | Execution Policies | Connections |
|---|---|---|
| **지원 대상** | Datadog Agent 내 러너만 지원| 독립형 러너 및 Datadog Agent 내 러너 모두 지원|
| **액세스 권한 부여 방식** | Agent 태그는 하나 이상의 러너 세트를 대상으로 하므로, 각 러너의 통합마다 별도의 연결을 생성하는 대신 하나의 정책으로 전체 플릿의 액세스를 관리합니다. | 연결은 자격 증명을 저장하고 이를 하나의 러너와 페어링합니다. |
| **자격 증명** | Execution Policies는 자격 증명을 저장하지 않으며, Agent 태그를 통해 액세스 권한이 부여됩니다. 자격 증명이 필요한 액션(예: HTTP, GitLab, MongoDB)은 지원되지 않습니다. | 연결은 액션을 실행하는 데 사용되는 자격 증명을 포함합니다. |
| **제어** | 세분화된 제어: 특정 액션 또는 액션 집합을 허용하거나 거부하며, Kubernetes 액션의 대상 Kubernetes 네임스페이스와 같은 통합별 범위를 적용할 수도 있습니다. | 러너별 제어: 하나의 연결은 하나의 특정한 러너를 대상으로 합니다. |

## Execution Policies {#execution-policies}

**Execution Policies**는 Datadog Agent 내 러너에 권한을 부여하는 모델입니다. 각 정책은 하나 이상의 러너 집합에 대한 액세스를 한 번에 관리합니다. 각 러너의 통합마다 별도의 연결을 생성하는 대신 **Agent 태그**를 사용하여 대상 Agent를 정의합니다. 그런 다음 허용 또는 거부 규칙을 적용합니다.

Execution Policies는 세분화된 제어 기능도 제공합니다. 정책은 특정 액션 또는 액션 집합을 허용하거나 거부할 수 있습니다. 또한 Kubernetes 액션에 대한 대상 Kubernetes 네임스페이스와 같은 통합별 범위를 적용할 수도 있습니다. 액세스는 저장된 자격 증명이 아닌 Agent 태그를 통해 부여되므로 Execution Policies는 자격 증명을 저장하지 않으며 Datadog Agent의 소유자가 없는 러너에서 사용됩니다.

Execution Policies 및 설정 방법(대상, 규칙, 액세스 제어 및 워크플로에서 Execution Policies 사용)에 대한 자세한 내용은 [Execution Policies][2]를 참조하세요.

## Connections {#connections}

Connections는 독립형 러너와 Datadog Agent 내 러너 모두에서 사용할 수 있으며, 소유자가 있는 러너에서 사용하는 모델입니다.

연결은 다음 두 가지 역할을 합니다.

서비스에서 액션을 실행하는 데 필요한 - **자격 증명을 참조합니다.** 자격 증명 자체(예: API 토큰 또는 사용자 이름과 비밀번호)는 러너 측에 로컬로, 즉 해당 러너의 호스트나 컨테이너에 있는 자격 증명 파일에 저장되며, 연결은 해당 자격 증명을 가리킵니다.
- **해당 자격 증명을 하나의 러너와 연결합니다.** 하나의 연결은 하나의 러너를 대상으로 하므로 자격 증명은 지정한 러너에서만 사용됩니다.

워크플로 또는 앱에서 연결을 사용하려면 해당 연결에 대한 적절한 권한이 필요합니다. 연결에 대한 액세스를 제한하여 필요한 사람만 워크플로 및 앱에서 해당 연결을 사용할 수 있도록 할 수 있습니다.

전체 설정 지침(연결 생성, 편집 및 제한, 연결 식별자 태그, 연결 그룹)은 [Connections][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/private_actions/enroll_runner/
[2]: /ko/actions/private_actions/execution_policies/
[3]: /ko/actions/connections/