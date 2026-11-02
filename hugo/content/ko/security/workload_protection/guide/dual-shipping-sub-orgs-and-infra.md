---
description: Workload Protection 데이터를 두 개의 Datadog 조직으로 이중 전달하기 위한 요구 사항 및 고려 사항
disable_toc: false
further_reading:
- link: /agent/configuration/dual-shipping/
  tag: 설명서
  text: 이중 전달
- link: /account_management/multi_organization/
  tag: 설명서
  text: 다중 조직 계정 관리
- link: /infrastructure/
  tag: 설명서
  text: Infrastructure Monitoring
title: 여러 조직으로 안전하게 Workload Protection 이중 전달
---
이 가이드는 Workload Protection 데이터를 두 개의 Datadog 조직(예: 플랫폼 팀이 사용하는 기본 조직과 보안 팀만 사용하는 두 번째 조직)으로 이중 전달해야 하는 이유와 방법을 설명합니다.

{{< partial name="security-platform/WP-billing-note.html" >}}

## Workload Protection 데이터를 이중 전달하는 이유는 무엇인가요? {#why-dual-ship-workload-protection-data}

[이중 전달][1]은 단일 Datadog Agent에서 동일한 Workload Protection 런타임 이벤트를 두 개의 조직으로 전송합니다. 이는 서로 다른 팀이 Datadog의 서로 다른 데이터에 액세스해야 할 때 유용합니다. 예를 들어, 보안 팀은 Workload Protection 신호, 발견 결과 및 조사 워크플로가 필요하지만, 기본 조직의 플랫폼 또는 애플리케이션 팀은 보안 데이터에 액세스해서는 안 되는 경우가 있습니다.

각 대상 조직에서 Workload Protection을 활성화하여 Datadog이 수신되는 런타임 이벤트를 분석하고 신호와 발견 결과를 생성할 수 있도록 합니다.

## Infrastructure Monitoring 요구 사항 {#infrastructure-monitoring-requirement}

<div class="alert alert-warning">
Datadog은 Infrastructure Monitoring이 활성화되지 않은 조직이나 하위 조직에서 Workload Protection을 실행하는 것을 권장하지 않습니다.
</div>

Workload Protection의 모든 기능을 활용하려면 [Infrastructure Monitoring][2]이 필요합니다.

- 백엔드 규칙은 **인프라 컨텍스트**(클라우드 공급자, 호스트, Kubernetes 클러스터, 컨테이너 및 이미지)로 Agent 이벤트를 보강하여 탐지, 발견 결과 생성 및 조사 워크플로를 지원합니다.
- **호스트 및 컨테이너 태그**를 사용하여 환경 전반에서 정책 배포 및 규칙 필터의 적용 범위를 지정합니다.
- [Coverage][3] 페이지와 조사 워크플로에서 인프라 화면으로 전환하여 보호되지 않는 호스트를 식별하고 공격 과정을 재구성할 수 있습니다.

Infrastructure Monitoring이 없으면 Workload Protection의 모든 기능을 활용할 수 없습니다.

## 이중 전달 및 하위 조직 {#dual-shipping-and-sub-organizations}

이중 전달을 구성하려면 다음 설명서를 참조하세요.

- [이중 전달][1]: Workload Protection 런타임 이벤트, 인프라 메트릭 및 기타 텔레메트리 유형에 대한 Agent 구성 `runtime_security_config.endpoints` 설정은 [Workload Protection][1] 섹션을 참조하세요.
- [Managing Multiple-Organization Accounts][4]: 조직 간 데이터 격리 및 상위 조직의 사용량 추적을 포함한 하위 조직의 작동 방식

<div class="alert alert-warning">
여러 Datadog 조직으로 데이터를 전송하는 경우 이중 전달이 요금 청구에 영향을 줄 수 있습니다. 자세한 내용은 <a href="/help/">Datadog 지원팀</a>에 문의해 주세요.
</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/dual-shipping/
[2]: /ko/infrastructure/
[3]: /ko/security/workload_protection/inventory/
[4]: /ko/account_management/multi_organization/