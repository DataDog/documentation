---
aliases:
- /ko/service_management/workflows/private_actions/
- /ko/service_management/app_builder/private_actions/
disable_toc: false
further_reading:
- link: service_management/app_builder/connections
  tag: 설명서
  text: App Builder 연결
- link: service_management/workflows/connections
  tag: 설명서
  text: Workflow 연결
- link: actions/private_actions/use_private_actions
  tag: 설명서
  text: 프라이빗 작업 사용
- link: actions/private_actions/private_action_credentials
  tag: 설명서
  text: 프라이빗 작업 크리덴셜 처리
- link: https://www.datadoghq.com/blog/private-actions/
  tag: 블로그
  text: 프라이빗 작업으로 앱과 워크플로에서 Kubernetes 인시던트 빠르게 해결하기
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: 블로그
  text: How we created a single app to automate repetitive tasks with Datadog Workflow
    Automation, Datastore, and App Builder
title: Private Actions 개요
---

프라이빗 작업 기능을 사용하면 Datadog 워크플로 및 앱이 공개 인터넷에 노출되지 않고도 프라이빗 네트워크에 호스팅된 서비스와 상호 작용할 수 있습니다. 프라이빗 작업을 사용하려면 Docker 또는 [Kubernetes][1]를 사용하여 네트워크의 호스트에 프라이빗 작업 러너를 설치하고 러너를 [connection (연결)][2]과 페어링해야 합니다.

<div class="alert alert-warning">To install a private action runner, your organization must have <a href="/remote_configuration">Remote Configuration</a> enabled.</div>

러너를 처음 시작하면 Datadog 서버 인증을 위한 개인 키가 생성됩니다. Datadog은 이 개인 키에 절대 접근할 수 없으며, 오직 사용자만 접근할 수 있습니다. Datadog은 개인 키에서 파생된 공개 키를 사용하여 특정 러너를 인증합니다.

## 모드

프라이빗 작업 러너는 App Builder, Workflow Automation 또는 둘 다와 함께 사용할 수 있습니다.

다음은 프라이빗 작업에 대한 일반적인 개요 다이어그램입니다.

{{< img src="service_management/private_action_runner_-_diagram_general.png" alt="프라이빗 작업이 Datadog 및 사용자 브라우저와 상호 작용하는 방식을 보여주는 개요 다이어그램" style="width:90%;" >}}

### 모드 간 차이점

다음 표는 트리거 메커니즘과 운영 모델을 포함하여 App Builder와 Workflows 모드 간의 몇 가지 차이점을 보여줍니다.

| 구분              | App Builder 모드 | Workflows 모드 |
|--------------------------| -----------------|----------------|
| **트리거<br>메커니즘** | 각 작업은 사용자가 앱과 상호작용하면서 시작됨      | 사람의 직접적인 개입 없이 자동으로 실행 가능    |
| **트리거<br>모델**     | Push 모델 - 작업은 러너의 URL에 직접 접근하여 실행됨 | Pull 모델 - 주기적으로 실행할 작업을 확인함      |
| **데이터<br>처리**     | 비공개 환경에 데이터를 보관하고 Datadog으로 전송하지 않음       | 프라이빗 작업 실행 결과를 Datadog에 보고함 |

이러한 차이로 인해 지연 시간이 달라질 수 있습니다. App Builder 모드의 Push 모델은 더 즉각적인 응답을 제공하는 반면, Workflows 모드의 Pull 모델은 폴링 빈도에 따라 지연이 발생할 수 있습니다.

### App Builder 모드

프라이빗 작업 러너가 App Builder 모드에 있을 때, 프라이빗 서비스를 호출하는 쿼리는 사용자 브라우저에서 프라이빗 작업 러너로 직접 전송되며, 이 러너는 서비스 요청을 프록시합니다. 러너가 App Builder 모드에 있을 때는 어떤 시점에도 Datadog에 데이터가 입력되지 않습니다. 러너는 등록 및 인증 목적으로만 Datadog과 통신합니다.

다음 다이어그램에서 **App Management**는 프라이빗 작업 러너와 관련이 없는 백엔드 App Builder 작업(예: 앱 삭제)을 의미합니다.

{{< img src="service_management/private_action_runner_-_diagram_app_builder.png" alt="인증 등 App Builder 모드에서 프라이빗 작업이 작동하는 방식을 보여주는 개요 다이어그램" style="width:90%;" >}}

#### 인증

안전한 통신을 보장하기 위해 Datadog 프런트엔드는 각 요청과 함께 일회용 범위 토큰을 전송하며, 러너는 프라이빗 키를 사용하여 이 토큰의 유효성을 검사합니다. 이 메커니즘은 데이터가 네트워크 내에 유지되고 Datadog 내부로 유입되지 않도록 보장하는 동시에 프라이빗 작업의 무결성과 보안을 유지합니다.

#### 러너 호스트 이름

App Builder 모드에서는 사용자 브라우저가 프라이빗 작업 러너와 직접 통신합니다. 따라서 러너를 가리키는 사용자 지정 도메인 이름을 지정해야 합니다. 도메인을 설정하려면 `A` 또는 `CNAME` 레코드를 네트워크의 인그레스로 지정하세요. 인그레스는 HTTPS 요청을 종료하고 포트 9016의 러너 컨테이너로 전달할 수 있어야 합니다. 도메인과 인그레스의 공용 인터넷 노출은 필수가 아닙니다. 예를 들어 `A` 또는 `CNAME` 레코드는 회사 VPN을 통해서만 액세스할 수 있는 로드 밸런서를 지정할 수 있습니다.

### Workflow Automation 모드

프라이빗 작업 러너가 Workflows 전용 모드로 실행되는 경우, 초기 등록 외에는 다른 설정을 수행할 필요가 없습니다. 프라이빗 작업 러너는 Datadog 계정에서 작업을 지속적으로 폴링하고, 내부 서비스와 상호 작용하여 작업을 실행하며, 그 결과를 Datadog에 보고합니다.

{{< img src="service_management/private_action_runner_-_diagram_workflow.png" alt="Workflow Automation 모드에서 프라이빗 작업이 작동하는 방식을 보여주는 개요 다이어그램" style="width:90%;" >}}

### 두 모드를 모두 사용

두 모드를 모두 사용하는 옵션을 선택하면 러너는 수신하는 요청 유형에 따라 사용할 모드를 조정합니다. 이를 통해 앱 요청, Workflow Automation 실행, 또는 이 두 가지 모두를 원활하게 처리할 수 있습니다.

## Datadog Metrics로 프라이빗 작업 러너 모니터링

Private Action Runners를 설정하는 동안 옵저버빌리티 지표를 활용하여 러너의 상태 및 프라이빗 작업 사용량을 모니터링할 수 있습니다. 이러한 지표는 Dashboards 및 Monitors와 같은 Datadog 제품에서 사용할 수 있습니다. 빠르게 시작하려면 기본으로 제공되는 [Dashboard][3]를 사용하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[2]: /ko/service_management/workflows/connections/
[3]: https://app.datadoghq.com/dash/integration/private_actions_runner