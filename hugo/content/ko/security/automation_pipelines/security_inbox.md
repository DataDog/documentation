---
aliases:
- /ko/security/vulnerability_pipeline/security_inbox
further_reading:
- link: /security/security_inbox
  tag: 설명서
  text: Security Inbox
- link: /security/automation_pipelines
  tag: 설명서
  text: 자동화 파이프라인
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Add to Security Inbox 규칙
---
{{< product-availability >}}

Security Inbox를 효과적으로 관리할 수 있도록 받은 편지함 규칙을 구성해 가장 관련성 높은 보안 문제만 강조 표시되도록 합니다. 조건을 사용자 지정함으로써 중대한 우려 사항에 집중하고, 주요 위험을 우선시하고, 규정 준수를 지원할 수 있으며 자칫 간과될 수 있는 문제에 주의를 기울일 수도 있습니다.

## 기본 받은 편지함 규칙 {#default-inbox-rules}

Datadog은 Datadog Security Research 팀에서 작성한 기본 받은 편지함 규칙 세트를 제공하며, 이 규칙은 [Security Inbox][3]를 자동으로 채웁니다. 이러한 규칙은 일반적인 환경에서 실제 위험을 나타낼 가능성이 가장 높은 발견 사항을 다룹니다.

기본 규칙은 [Findings Automation][2] 페이지에 사용자의 자체 규칙과 함께 표시됩니다. 기본 규칙이 조직의 분류 방식과 일치하지 않으면 기본 규칙을 비활성화할 수 있고, 기본 규칙에서 놓친 사례를 다루기 위해 자체 규칙을 추가할 수도 있습니다.

## 받은 편지함 규칙 생성 {#create-an-inbox-rule}

1. Datadog에서 **Security** > **Settings** > [발견 사항 자동화][2]로 이동합니다. **Add a New Rule**을 클릭한 다음 **Add to Security Inbox**를 선택합니다. Create a New Rule 페이지가 열립니다.
1. **Rule name**에서 규칙을 설명하는 이름을 입력합니다(예: "Cloud Infrastructure Anomaly Warnings").
1. 다음 필드에 규칙 기준을 추가합니다.
    - **다음 유형 중 하나**: 규칙이 검사해야 하는 발견 사항의 유형입니다. 사용 가능한 유형은 다음과 같습니다.
      - 런타임 코드 취약성
      - 정적 코드 취약성
      - 라이브러리 취약성
      - 시크릿(코드)
      - 코드형 인프라
      - 컨테이너 이미지 취약성
      - 호스트 취약성
      - 구성 오류
      - 공격 경로
      - ID 위험
      - API Security
      - 워크로드 활동
    - **다음 태그 또는 속성 중 하나**: 규칙이 적용되려면 일치해야 하는 리소스 태그 또는 속성입니다.
1. 규칙에 심각도 기준을 추가하려면 **Add Severity**를 클릭합니다.
1. **Save**를 클릭합니다. 규칙은 새로운 발견 사항에 즉시 적용되며 이후 한 시간 이내에 기존 발견 사항을 검사하기 시작합니다.

## 규칙 일치 순서 {#rule-matching-order}

Datadog이 발견 사항을 식별하면 받은 편지함 규칙의 순서에 따라 발견 사항을 평가합니다. Datadog은 첫 번째 규칙부터 시작해 일치하는 항목이 있으면 해당 발견 사항을 Security Inbox에 추가하고, 더 이상 평가를 멈춥니다. 일치하는 항목이 없으면 Datadog은 다음 규칙으로 넘어갑니다. 일치하는 항목을 찾거나 모든 규칙이 일치하는 항목 없이 검사될 때까지 이 프로세스가 계속됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox
[3]: /ko/security/security_inbox/