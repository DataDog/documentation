---
aliases:
- /ko/service_management/workflows/private_actions/
- /ko/service_management/app_builder/private_actions/
description: Datadog 제품에서 프라이빗 작업 러너를 온프레미스 작업의 실행 및 권한 부여 계층으로 사용해 프라이빗 네트워크의 서비스에
  대한 작업을 실행하세요.
disable_toc: false
further_reading:
- link: actions/private_actions/set_up_agent_based
  tag: 설명서
  text: 프라이빗 액션 러너 설정하기
- link: actions/private_actions/enroll_runner
  tag: 설명서
  text: 등록 및 소유권
- link: /actions/private_actions/authorize_private_actions/
  tag: 설명서
  text: Private Actions 권한 부여
title: Private Actions
---
## 개요 {#overview}

Private Actions를 사용하면 Kubernetes 클러스터, 내부 호스트, 데이터베이스, 내부 API 등 프라이빗 네트워크 내 서비스를 공용 인터넷에 노출하지 않고도 해당 서비스에 대한 작업을 실행할 수 있습니다. 이 작업은 환경에 배포한 프라이빗 작업 러너를 통해 실행하며, 러너는 Datadog Agent 내부에 배포하거나(권장) 독립형 러너로 배포할 수 있습니다. Private Actions를 사용하는 Datadog 제품에는 Workflow Automation, App Builder, Datadog MCP, Bits AI 조사가 포함됩니다.

Private Actions는 다음 두 계층에 의존합니다.

- [**프라이빗 작업 러너**](#private-action-runner)가 작업을 실행합니다. 이 러너는 네트워크에서 실행되며, Datadog으로부터 작업 태스크를 수신하고, 각 태스크를 대상 서비스에서 실행한 후 결과를 Datadog으로 반환합니다.
- [**권한 부여 계층**](#authorization-models)은 Datadog에서 관리됩니다. 이 계층은 어떤 사용자 및 제품이 어떤 러너에서 어떤 작업을 실행할 수 있는지 정의하며, 작업이 러너에 도달하기 전에 각 작업을 허용하거나 거부합니다. 러너가 실행할 수 있는 작업은 Datadog Agent 구성(`datadog.yaml`)의 작업 허용 목록을 통해 Datadog Agent 측에서도 제한됩니다.

## 프라이빗 작업 러너 {#private-action-runner}

프라이빗 액션 러너는 Private Actions를 실행하기 위해 환경에 배포하는 구성 요소입니다. 이 러너는 Datadog에 대한 아웃바운드 연결을 열고, 작업 태스크를 폴링하며, 각 태스크를 대상 서비스에서 실행하고 결과를 반환합니다.

프라이빗 작업 러너는 두 가지 형태로 제공됩니다. 직접 배포하고 관리하는 독립형 러너 또는 Datadog Agent에 내장된 러너입니다.

| | Datadog Agent 내 러너 | 독립형 러너 |
|---|---|---|
| **정의** | 단일 구성 플래그로 활성화되는 Datadog Agent의 구성 요소입니다. | Datadog Agent와 독립적으로 설치 및 관리할 수 있는 전용 컨테이너입니다. |
| **적합한 경우** | 이미 Datadog Agent를 실행 중이며 Datadog Agent 수명 주기를 통해 러너를 관리하려는 경우입니다. | 아직 Datadog Agent에서 사용할 수 없는 통합이 필요합니다. |
| **상태** | 새 배포에 권장됩니다. | 지원됨(유지 관리 모드). |

<div class="alert alert-tip">Datadog은 Datadog Agent에서 프라이빗 작업 러너를 실행할 것을 권장합니다</div>

설치 단계는 [Datadog Agent에서 프라이빗 액션 러너 설정하기][1] 또는 [독립형 러너 설정하기][2]를 참조하세요.

## 권한 부여 모델 {#authorization-models}

Datadog은 두 가지 권한 부여 모델을 제공합니다. 러너가 사용하는 모델은 러너가 등록될 때 설정되며, 러너의 소유권에 따라 결정됩니다. 자세한 내용은 [등록 및 소유권][3]을 참조하세요.

- **실행 정책**은 Datadog Agent의 러너에 적용되며 대규모 환경에서 액세스를 관리하도록 설계되었습니다. 각 러너의 각 통합에 대해 별도의 연결을 만드는 대신, Agent 태그를 사용하여 하나 이상의 러너 세트를 대상으로 지정합니다. 실행 정책을 사용하면 세부적으로 제어할 수도 있습니다. 특정 작업 또는 작업 세트를 허용하거나 거부할 수 있으며, Kubernetes 작업의 대상 Kubernetes 네임스페이스와 같이 통합별 범위를 적용할 수 있습니다.
- **연결**은 Datadog Agent 내 러너와 독립형 러너 모두에서 사용할 수 있습니다. 연결은 최대 하나의 러너에만 연결할 수 있습니다. 연결은 서비스에 대한 자격 증명을 저장할 수 있습니다.

두 모델을 비교하고 러너에 적용할 모델을 결정하려면 [Private Actions 권한 부여][4]를 참조하세요.

## 다음 단계 {#next-steps}

- **Private Actions를 처음 사용하는 경우**: [Private Actions 시작하기][7]에 따라 러너를 배포하고 첫 번째 작업을 실행하세요.
- **Datadog Agent에 러너가 있고 전체 러너에 대한 액세스 제어가 필요한 경우**: [실행 정책][5]을 사용하여 권한을 부여하세요.
- **Agent 내 러너 또는 독립형 러너가 있고 단일 러너에 권한을 부여하려는 경우**: [연결][6]을 사용하여 권한을 부여하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/private_actions/set_up_agent_based/
[2]: /ko/actions/private_actions/set_up_standalone/
[3]: /ko/actions/private_actions/enroll_runner/
[4]: /ko/actions/private_actions/authorize_private_actions/
[5]: /ko/actions/private_actions/execution_policies/
[6]: /ko/actions/connections/
[7]: /ko/actions/private_actions/getting_started/