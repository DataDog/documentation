---
algolia:
  tags:
  - remote config
  - remote configuration
aliases:
- /ko/agent/guide/how_rc_works
- /ko/agent/guide/how_remote_config_works
- /ko/agent/remote_config
description: 인프라스트럭처에 배포된 Agent, SDK, Observability Pipelines Worker와 같은 Datadog 구성
  요소를 원격으로 구성하고 동작을 변경하세요.
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: 설명서
  text: 애플리케이션 보안 모니터링의 작동 방식
- link: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
  tag: 설명서
  text: Dynamic Instrumentation
- link: /security/workload_protection/
  tag: 설명서
  text: Workload Protection 설정
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: 블로그
  text: Datadog Audit Trail 사용
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: 블로그
  text: Remote Configuration을 통해 Datadog 구성 요소에 실시간 업데이트를 적용합니다.
title: Remote Configuration
---
## 개요 {#overview}

Remote Configuration은 Datadog의 기능으로, 인프라에 배포된 Agent, SDK, Observability Pipelines Worker와 같은 Datadog 구성 요소의 선택된 제품 기능을 원격으로 구성하고 동작을 변경할 수 있습니다. Remote Configuration을 사용하여 환경 내 Datadog 구성 요소에 대한 구성을 필요에 따라 적용하여 관리 비용을 줄이고 팀 간의 마찰을 줄이며 문제 해결 시간을 단축합니다.

Datadog 보안 제품인 App and API Protection 및 Workload Protection을 위해 Remote Configuration이 활성화된 Agent와 호환되는 SDK는 실시간 보안 업데이트 및 응답을 제공하여 애플리케이션 및 클라우드 인프라의 보안 태세를 강화합니다.

## 작동 방식 {#how-it-works}

Remote Configuration이 활성화되면 Datadog 구성 요소(예: Datadog Agent)는 구성 변경 사항을 적용할 준비가 된 [Datadog site][1]를 안전하게 폴링합니다. 대기 중인 변경 사항은 Datadog 구성 요소에 자동으로 적용됩니다. 예를 들어, Remote Configuration이 활성화된 제품 기능에 대한 구성 변경 사항을 Datadog UI에서 제출한 후, 변경 사항은 Datadog에 저장됩니다.

다음 다이어그램은 Remote Configuration 작동 방식을 설명합니다.

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="사용자는 UI에서 기능을 구성하고, 구성은 Datadog에 저장되며, Agent는 구성 업데이트를 요청합니다." width="90%" style="center">}}

1. Datadog UI에서 선택한 제품 기능을 구성합니다.
2. 제품 기능 구성은 Datadog 내에 안전하게 저장됩니다.
3. Remote Configuration이 활성화된 Datadog 구성 요소는 환경 내에서 안전하게 폴링하고, 구성 업데이트를 수신하며, Datadog에서 자동으로 적용합니다. 환경에 배포된 트레이스 라이브러리는 Datadog을 직접 폴링하는 대신 Agent와 통신하여 Datadog에서 구성 업데이트를 요청하고 수신합니다.

## 지원되는 환경 {#supported-environments}

Remote Configuration은 지원되는 Datadog 구성 요소가 배포된 환경에서 작동합니다. 지원되는 Datadog 구성 요소는 다음과 같습니다.
- Agent
- 트레이스(간접)
- Observability Pipelines Worker
- 프라이빗 액션 러너 및 AWS Fargate와 같은 서버리스 컨테이너 클라우드 서비스.

Remote Configuration은 AWS App Runner, Azure Container Apps, Google Cloud Run과 같은 서버리스 컨테이너 관리 앱이나 AWS Lambda, Azure Functions, Google Cloud Functions와 같은 컨테이너 패키징으로 배포된 함수는 지원하지 않습니다.

## 지원되는 제품 및 기능 {#supported-products-and-features}

다음 제품 및 기능은 Remote Configuration과 함께 지원됩니다.

Fleet Automation
: - [플레어 전송][27]을 Datadog 사이트에서 직접 수행합니다. 호스트에 직접 접근하지 않고 Datadog Agent를 원활하게 문제 해결합니다.
: - [Agent를 업그레이드][29]하세요.

App and API Protection(AAP)
: - [원클릭 AAP 활성화][33]: Datadog UI에서 원클릭으로 AAP를 활성화합니다.
: - [앱 내 공격 패턴 업데이트][34]: Datadog에서 새로운 취약점이나 공격 벡터가 공개될 때마다 최신 웹 애플리케이션 방화벽(WAF) 공격 패턴을 자동으로 수신합니다.
: - [보호][34]: Datadog UI를 통해 AAP Security Signals 및 트레이스에서 플래그된 공격자의 IP, 인증된 사용자 및 의심스러운 요청을 일시적 또는 영구적으로 차단합니다.

Application Performance Monitoring(APM)
: - 런타임에서의 구성: 서비스의 트레이스 샘플링 비율, 로그 주입 활성화 및 HTTP 헤더 태그를 카탈로그 UI 내에서 변경하여 서비스를 재시작할 필요 없이 조정할 수 있습니다. 자세한 내용은 [런타임에 구성][22]을 참조하세요.
: - [원격으로 Agent 샘플링 비율 설정][35]: Datadog Agent를 원격으로 구성하여 트레이스 샘플링 비율을 변경하고 조직의 트레이스 수집을 필요에 따라 조정하는 규칙을 설정합니다. Datadog Agent를 재시작할 필요가 없습니다.

[Dynamic Instrumentation][36]
: - 코드 변경 없이 라이브 애플리케이션에서 중요한 메트릭, Traces 및 로그를 전송합니다.

Workload Protection
: - 자동 기본 Agent 규칙 업데이트: 새로운 Agent 탐지 및 개선 사항이 출시될 때 자동으로 Datadog이 유지 관리하는 기본 Agent 규칙을 수신하고 업데이트합니다. 자세한 내용은 [Workload Protection 설정][3]을 참조하세요.
: - 사용자 정의 Agent 규칙의 자동 배포: 사용자 정의 Agent 규칙을 지정된 호스트(모든 호스트 또는 정의된 하위 집합의 호스트)에 자동으로 배포합니다.

Observability Pipelines
: - [Observability Pipelines Workers][4](OPW)를 원격으로 배포 및 업데이트: Datadog UI에서 파이프라인을 구축하고 편집하며, 환경에서 실행 중인 OPW 인스턴스에 구성 변경 사항을 롤아웃합니다.

[Autoscaling][47]
: - 컨테이너화된 환경에 대한 자동 확장 클러스터 및 작업 부하 확장 구성을 원격으로 관리합니다. 자세한 내용은 [Autoscaling][47]을 참조하세요.

Private Action 러너
: - 공용 인터넷에 서비스를 노출하지 않고 개인 네트워크에 호스팅된 서비스와 상호 작용하는 Datadog workflows 및 앱을 실행합니다. 자세한 내용은 [Private Actions][30]을 참조하세요.

Feature Flag
: - 평가 컨텍스트에 따라 동기식 변형 할당을 위한 서버 측 SDK에 플래그 구성(대상 및 할당 규칙)을 전달합니다. 자세한 내용은 [Feature Flag][48]를 참조하세요.

## 보안 고려 사항 {#security-considerations}

Datadog은 Datadog 구성 요소에서 수신하고 적용한 구성의 기밀성, 무결성 및 가용성을 보호하기 위해 다음과 같은 안전 기기를 구현합니다.

- 원격 구성 기능이 활성화된 Datadog 구성 요소가 귀하의 인프라에서 Datadog에 구성 요청을 합니다.
  <div class="alert alert-info">Private Action 러너와 같은 일부 구성 요소는 항상 Remote Configuration 기능이 활성화되어 있습니다. Agent와 같은 다른 구성 요소는 디스크 내 구성 옵션을 사용하여 활성화하거나 비활성화할 수 있습니다.</div>
- Datadog은 Datadog 구성 요소에서 요청하지 않는 한 구성 변경 사항을 전송하지 않습니다. 구성 변경 사항을 전송하는 경우, Datadog은 요청하는 구성 요소와 관련된 변경 사항만 전송합니다.
- 구성 요청은 귀하의 인프라에서 Datadog으로 HTTPS(포트 443)를 통해 시작됩니다. 이는 Agent가 기본적으로 관측 가능성 데이터를 전송하는 데 사용하는 동일한 포트입니다.
- 귀하의 Datadog 구성 요소와 Datadog 간의 통신은 HTTPS를 사용하여 암호화되며, Private Action 러너의 경우 JWT 토큰이 대신 사용되는 것을 제외하고는 귀하의 Datadog API 키를 사용하여 인증 및 권한 부여됩니다.
- API 키에 대해 Remote Configuration 기능을 활성화 또는 비활성화하고 지원되는 제품 기능을 사용하려면 [`api_keys_write`][5] 권한이 있는 사용자여야 합니다.
- Datadog UI를 통해 제출된 구성 변경 사항은 요청하는 Datadog 구성 요소에 의해 서명되고 검증되어 구성의 무결성을 확인합니다.

### 역할 기반 액세스 {#role-based-access}

Remote Configuration을 활성화하면 다음 제품에 영향을 미칩니다. 각 제품은 사용자에게 부여해야 하는 역할 기반 액세스 제어 집합을 정의합니다. 액세스 관리에 대한 일반 정보는 [Access Control][37]을 참조하세요.

 | Remote Configuration이 활성화된 제품   | Role-Based Access Controls                                                                                                                                                                                                                                                                     |
 |----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Fleet Automation                       | `FLEET_POLICIES_WRITE`<br>`AGENT_UPGRADE_WRITE`<br>`FLEET_FLARE`<br><br>자세한 내용은 [Fleet Automation][38]을 참조하세요.                                                                                                                                                                      |
 | 앱 및 API 보호                 | `APPSEC_ACTIVATION_READ`<br>`APPSEC_ACTIVATION_WRITE`<br>`APPSEC_PROTECT_READ`<br>`APPSEC_PROTECT_WRITE`<br><br>자세한 내용은 [Access Control][39]을 참조하세요.                                                                                                                                |
 | APM | `APM_SERVICE_INGEST_READ`<br>`APM_SERVICE_INGEST_WRITE`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>자세한 내용은 [Adaptive Sampling][40]을 참조하세요.                                                                                                       |
 | Dynamic Instrumentation                | `DEBUGGER_READ`<br>`DEBUGGER_WRITE`<br>`DEBUGGER_WRITE_PRE_PROD`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>자세한 내용은 [APM][41]을 참조하세요.                                                                                                            |
 | Workload Protection | `SECURITY_MONITORING_CWS_AGENT_RULES_WRITE`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_READ`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_ACTIONS`<br><br>자세한 내용은 [보안][42]을 참조하세요.                                                                                                    |
 | CSM 사이트 스캐닝                      | `ORG_MANAGEMENT`<br>`MANAGE_INTEGRATIONS`<br><br>자세한 내용은 [에이전트 없는 스캐닝 활성화][43]를 참조하세요.                                                                                                                                                                                   |
 | Observability Pipelines                | `OBSERVABILITY_PIPELINES_READ`<br>`OBSERVABILITY_PIPELINES_WRITE`<br>`OBSERVABILITY_PIPELINES_DELETE`<br>`OBSERVABILITY_PIPELINES_DEPLOY`<br>`OBSERVABILITY_PIPELINES_CAPTURE_WRITE`<br>`OBSERVABILITY_PIPELINES_CAPTURE_READ`<br><br>자세한 내용은 [Observability Pipelines][44]을 참조하세요. |
 | Private Action Runner | `ON_PREM_RUNNER_WRITE`<br>`ON_PREM_RUNNER_READ`<br>`ON_PREM_RUNNER_USE`<br><br>자세한 내용은 [App Builder & Workflow Automation][45]을 참조하세요.                                                                                                                                              |
 | Network Device Monitoring(NDM)        | `NDM_DEVICE_PROFILES_VIEW`<br>`NDM_DEVICE_PROFILES_EDIT`                                                                                                                                                                                                                                       |
 | Container Autoscaling | `ORCHESTRATION_AUTOSCALING_MANAGE`<br>`ORCHESTRATION_WORKLOAD_SCALING_WRITE`<br>`ORCHESTRATION_WORKLOAD_SCALING_READ`                                                                                                                                                                          |
 | Serverless Lambda 자동 계측 | `SERVERLESS_AWS_INSTRUMENTATION_READ`<br>`SERVERLESS_AWS_INSTRUMENTATION_WRITE`<br><br>자세한 내용은 [Serverless][46]를 참조하세요.                                                                                                                                                             |
 | Feature Flags                          | `FEATURE_FLAG_CONFIG_READ`<br>`FEATURE_FLAG_CONFIG_WRITE`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_READ`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_WRITE`<br><br>자세한 내용은 [Feature Flags][48]를 참조하세요.                                                                                           |

## Remote Configuration 활성화 {#enable-remote-configuration}

대부분의 경우, Remote Configuration은 귀하의 조직에 대해 기본적으로 활성화되어 있습니다. 조직에서 Remote Configuration이 활성화되어 있는지 확인하려면 [Remote Configuration][8] 설정 페이지를 확인하세요. Remote Configuration을 활성화해야 하는 경우:
1. 귀하의 RBAC 권한에 [`org_management`][7]이 포함되어 있는지 확인하여 귀하의 조직에 대해 Remote Configuration을 활성화할 수 있습니다.
1. 조직 설정 페이지에서 [Remote Configuration][8]을 활성화하세요. 이렇게 하면 귀하의 조직 내 Datadog 구성 요소가 Datadog으로부터 구성을 받을 수 있습니다.
1. 아래의 [제품별 구성](#product-specific-configuration) 지침을 따라 Remote Configuration을 설정하세요.

### 제품별 구성 {#product-specific-configuration}

구성 중인 제품에 대한 특정 지침은 아래 문서를 참조하세요.

| 제품                 | 설정 지침                                                                                             |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| Fleet Automation | [Setup Fleet Automation][31] |
| APM | [런타임 구성](/tracing/guide/remote_config/)                                                      |
| Dynamic Instrumentation | [Dynamic Instrumentation 시작](/dynamic_instrumentation/#getting-started)                      |
| Workload Protection | [Workload Protection][3] |
| Observability Pipelines | Observability Pipelines에 사용하는 [API 키에서 Remote Configuration이 활성화되어][32] 있는지 확인하세요. |
| Sensitive Data Scanner  | [클라우드 스토리지](/security/sensitive_data_scanner/setup/cloud_storage/?tab=newawsaccount)                       |
| Private Action Runner | [Private Actions 개요](/actions/private_actions/)                                                          |
| Feature Flags | [Server-Side Feature Flags](/feature_flags/server/)                                                            |

## 모범 사례 {#best-practices}

### Datadog Audit Trail {#datadog-audit-trail}

[Datadog Audit Trail][13]을 사용하여 조직 액세스 및 Remote Configuration 활성화 이벤트를 모니터링하세요. Audit Trail을 통해 관리자는 Datadog API 및 애플리케이션 키의 생성, 삭제 및 수정을 추적할 수 있습니다. Audit Trail이 구성된 후에는 Remote Configuration 기능과 관련된 이벤트 및 이러한 변경을 요청한 사람을 볼 수 있습니다. Audit Trail을 통해 이벤트의 순서를 재구성하고 Remote Configuration에 대한 강력한 Datadog monitoring을 설정할 수 있습니다.

### Monitors {#monitors}

관심 있는 이벤트가 발생할 때 알림을 받을 수 있도록 [모니터링][14]을 구성하세요.

## Remote Configuration 선택 해제 {#opting-out-of-remote-configuration}

Remote Configuration을 전역적으로 비활성화하는 대신, Datadog은 특정 Datadog 제품에 대해 선택 해제를 권장합니다. 자세한 내용은 [해당 제품에 대한 문서](#product-specific-configuration)를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/site/
[3]: /ko/security/workload_protection/
[4]: /ko/observability_pipelines/#observability-pipelines-worker
[5]: /ko/account_management/rbac/permissions#api-and-application-keys
[6]: /ko/security/application_security/threats/setup/compatibility/
[7]: /ko/account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /ko/security/default_rules/#cat-workload-security
[10]: /ko/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /ko/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /ko/security/application_security/how-appsec-works/#built-in-protection
[13]: /ko/account_management/audit_trail
[14]: /ko/monitors/
[15]: /ko/help/
[16]: /ko/remote_configuration
[17]: /ko/agent/configuration/network
[18]: /ko/agent/configuration/proxy/
[19]: /ko/internal_developer_portal/catalog/
[20]: /ko/dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /ko/tracing/trace_collection/runtime_config/
[23]: /ko/remote_configuration#opting-out-of-remote-configuration
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /ko/agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /ko/agent/fleet_automation/fleet_view/#send-a-remote-flare
[28]: /ko/security/sensitive_data_scanner/?tab=usingtheagent
[29]: /ko/agent/fleet_automation/upgrade_agents/
[30]: /ko/actions/private_actions/use_private_actions/
[31]: /ko/agent/guide/setup_remote_config
[32]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=api-key-enablement-step&standalone=1
[33]: /ko/security/application_security/setup/
[34]: /ko/security/application_security/
[35]: /ko/tracing/trace_pipeline/adaptive_sampling/
[36]: /ko/tracing/dynamic_instrumentation/#explore-dynamic-instrumentation
[37]: /ko/account_management/rbac
[38]: /ko/agent/fleet_automation/#control-access-to-fleet-automation
[39]: /ko/security/access_control/#permissions
[40]: /ko/tracing/trace_pipeline/adaptive_sampling/#permissions
[41]: /ko/account_management/rbac/permissions/#apm
[42]: /ko/account_management/rbac/permissions/#cloud-security-platform
[43]: /ko/security/cloud_security_management/setup/#enable-agentless-scanning
[44]: /ko/account_management/rbac/permissions/#observability-pipelines
[45]: /ko/account_management/rbac/permissions/#app-builder--workflow-automation
[46]: /ko/account_management/rbac/permissions/#serverless
[47]: /ko/containers/autoscaling
[48]: /ko/feature_flags/