---
algolia:
  tags:
  - automation pipelines
  - findings automation
  - findings pipelines
  - finding automation
aliases:
- /ko/security/vulnerability_pipeline
further_reading:
- link: /security/automation_pipelines/modify_severity
  tag: 설명서
  text: 심각도 수정자 규칙
- link: /security/automation_pipelines/mute
  tag: 설명서
  text: 음소거 규칙
- link: /security/automation_pipelines/set_due_date
  tag: 설명서
  text: 기한 규칙 설정
- link: /security/automation_pipelines/security_inbox
  tag: 설명서
  text: Add to Security Inbox 규칙
- link: /security/automation_pipelines/create_ticket
  tag: 설명서
  text: 티켓 생성 규칙
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: 블로그
  text: Datadog IaC Security를 사용하여 클라우드의 구성 오류가 프로덕션 환경에 도달하지 못하도록 방지
title: Findings Automation Pipelines
---
Automation Pipelines를 사용하면 새로 발견된 탐지 결과에 대한 자동화된 규칙을 설정하여 대규모 환경에서 분류 및 수정 작업을 가속화할 수 있습니다.

## 이용 가능 여부 {#availability}

Automation Pipelines는 다음 항목에 사용할 수 있습니다.

- 런타임 코드 취약성
- 정적 코드 취약성
- 라이브러리 취약성
- 시크릿
- 코드형 인프라
- 컨테이너 이미지 취약성
- 호스트 취약성
- 구성 오류
- 공격 경로
- ID 위험
- API Security
- 워크로드 활동

## 작동 방식 {#how-it-works}

Automation Pipelines는 새로운 탐지 결과를 관리하는 방법을 자동화할 수 있는 규칙 기반 시스템을 통해 작동합니다. 작동 방식은 다음과 같습니다.

- **규칙 구성**: 각 규칙은 특정 속성을 기반으로 탐지 결과를 필터링하도록 설계된 여러 기준들로 구성됩니다. 규칙 내에서 이러한 기준들의 조합은 논리적 AND로 작동하지만, 기준에 여러 값이 포함된 경우 해당 값들은 논리적 OR로 작동합니다. 이 구조를 통해 사용자의 요구 사항을 정확하게 타겟팅하는 규칙을 유연하게 생성할 수 있습니다.
- **규칙 일치**: Automation Pipelines는 사용자가 나열한 순서대로 규칙에 대해 탐지 결과를 평가합니다. 각 탐지 결과가 처리될 때, Automation Pipelines는 일치하는 규칙을 찾을 때까지 목록을 순차적으로 확인하며, 일치하는 규칙을 찾으면 긴급하지 않은 문제를 음소거하거나 중요한 위협을 강조 표시하는 등의 지정된 작업이 트리거됩니다. Automation Pipelines 규칙은 새로운 탐지 결과에 즉시 적용됩니다. 기존 탐지 결과의 경우 업데이트에 최대 2시간이 소요될 수 있습니다.

## 사용 사례 {#use-cases}

### 비즈니스 맥락을 반영하도록 탐지 결과 심각도 조정{#adjust-finding-severities-to-reflect-your-business-context}

조직의 위험 프로필에 맞게 탐지 결과의 기본 심각도를 재정의하세요. 이를 통해 다음을 수행할 수 있습니다.

- **저위험 탐지 결과 등급 하향**: 실제 위험이 제한적인 격리된 환경에 대한 탐지 결과의 심각도를 낮춥니다.
- **고가치 타겟 등급 상향**: 개인 식별 정보가 포함된 데이터베이스나 강화된 규정 준수 요구 사항이 있는 서비스와 같은 중요 시스템에 대한 탐지 결과의 심각도를 높입니다.
- **조직의 우선순위에 맞춰 심각도 조정**: 기본 제공되는 점수 산정에만 의존하지 말고 조직의 우선순위를 반영하는 일관된 심각도 표준을 수립합니다.

### 긴급하지 않은 탐지 결과를 음소거하여 중요한 사항에 집중 {#mute-non-urgent-findings-to-focus-on-what-matters}

긴급하지 않은 탐지 결과를 자동으로 음소거하여 경보 피로를 줄이고 중요한 위협의 우선순위를 지정하세요. 이를 통해 다음을 수행할 수 있습니다.

- **우선순위가 낮은 문제를 자동으로 무시**: 알려진 오탐, 수용된 위험 및 즉각적인 조치가 필요하지 않은 기타 탐지 결과를 억제합니다. 수동 검토는 필요하지 않습니다.
- **실제 위협 우선순위 지정**: 조사 및 수정이 필요한 영향력이 큰 경보에 집중합니다.
- **경보 스트림 정리**: 오탐, 중요하지 않은 리소스, 테스트 또는 스테이징 환경, 경보를 트리거하지만 장기적인 위험을 초래하지 않는 단기 리소스에서 발생하는 노이즈를 제거합니다.

### 보안 SLA에 맞춰 탐지 결과에 대한 마감 기한 설정 {#set-due-dates-for-findings-to-align-with-your-security-slas}

책임성을 높이고 보안 정책을 준수하기 위해 탐지 결과에 수정 마감 기한을 할당하세요. 이를 통해 다음을 수행할 수 있습니다.

- **설계에 따른 규정 준수 유지**: FedRAMP, PCI 등과 같은 업계 표준에 부합하는 마감 기한을 자동으로 적용합니다.
- **팀 전반의 책임성 강화**: SLA를 사용하여 지속적인 후속 조치 없이 적시에 수정이 이루어지도록 보장하고 보안 및 엔지니어링 팀에 명확한 기대치를 제공합니다.
- **사전 예방적 위험 관리 촉진**: SLA를 사용하여 수정 작업을 우선순위로 지정하고 추적함으로써 더 빠른 대응 시간을 장려하고 노출을 줄입니다.

### 조직에 중요한 내용을 강조하도록 Security Inbox 사용자 지정{#customize-the-security-inbox-to-highlight-whats-important-to-your-organization}

Datadog은 Security Inbox를 채우는 기본 받은 편지함 규칙 세트를 제공합니다. 해당 규칙을 검토하고 조직에 맞지 않는 규칙을 비활성화하며, 강조할 탐지 결과를 정의하는 고유한 규칙을 추가할 수 있습니다. 이를 통해 다음을 수행할 수 있습니다.

- **기본적으로 캡처되지 않은 탐지 결과 다시 표시**: 사용자 지정 규칙을 사용하여 기본 규칙과 일치하지 않는 탐지 결과를 강조 표시함으로써 중요한 결과를 놓치지 않도록 합니다.
- **규정 준수 강화 및 주요 시스템 문제 해결**: 심각도와 관계없이 규정 준수나 중요한 비즈니스 시스템에 영향을 미치는 문제를 해결합니다.
- **현재 위험 우선순위 지정**: 인시던트 후의 ID 위험이나 업계 전반의 탐지 결과와 같은 즉각적인 위협에 집중합니다.

### 티켓을 자동으로 생성하여 탐지 결과를 엔지니어링 워크플로로 라우팅{#automatically-create-tickets-to-route-findings-into-engineering-workflows}

보안 탐지 결과가 발견되는 즉시 Jira 또는 Case Management로 직접 라우팅하세요. 이를 통해 다음을 수행할 수 있습니다.

- **수동 분류 제거**: 기준에 맞는 탐지 결과에 대해 티켓을 자동으로 생성하여 보안 팀이 수동으로 티켓을 생성할 필요를 없앱니다.
- **기존 엔지니어링 워크플로와 통합**: 보안 작업을 엔지니어링 팀이 다른 작업에 사용하는 동일한 도구로 라우팅하여 그들이 이미 작업 중인 환경에서 대응할 수 있도록 합니다.
- **수정까지 걸리는 시간 단축**: 탐지 결과가 감지되자마자 엔지니어링 대기열로 즉시 전달되어, 발견과 할당 사이의 지연이 없어집니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}