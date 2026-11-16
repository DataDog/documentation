---
aliases:
- /ko/security/vulnerability_pipeline/mute
further_reading:
- link: /security/automation_pipelines
  tag: 설명서
  text: 자동화 파이프라인
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: 블로그
  text: Datadog IaC Security를 사용하여 클라우드의 구성 오류가 프로덕션 환경에 도달하지 못하도록 방지하기
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
title: 음소거 규칙
---
{{< product-availability >}}

긴급하지 않은 발견 사항을 자동으로 필터링하여 보안 경고를 효율적으로 관리할 수 있도록 음소거 규칙을 구성하세요. 이 접근 방식은 알려진 오탐 및 수용된 위험으로 인한 노이즈를 줄여 가장 중요한 위협을 해결하는 데 집중할 수 있도록 합니다.

## 음소거 규칙 생성 {#create-a-mute-rule}

1. Datadog에서 **Security** > **Settings** > [Findings Automation][2]으로 이동합니다. **Add a New Rule**을 클릭한 다음 **Mute**를 선택합니다. Create a New Rule 페이지가 열립니다.
1. **Rule name**에서 규칙을 설명하는 이름을 입력합니다(예: "Compensating control in place for account payment-prod").
1. 다음 필드에 규칙 기준을 추가합니다.
    - **다음 유형 중 하나**: 규칙이 검사해야 하는 발견 사항의 유형입니다. 사용 가능한 유형은 다음과 같습니다.
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
    - **다음 태그 또는 속성 중 하나**: 규칙이 적용되려면 일치해야 하는 리소스 태그 또는 속성입니다.
1. 규칙에 심각도 기준을 추가하려면 **Add Severity**를 클릭합니다.
1. 음소거 사유 및 기간을 지정합니다.
    - **음소거 사유**: 발견 사항을 음소거하는 이유입니다. 사용 가능한 사유는 다음과 같습니다.
      - 오탐
      - 수용된 위험
      - 수정 대기 중
      - 수정 사항 없음
      - 중복
      - 기타
    - **규칙 만료**: 규칙이 만료되는 날짜입니다.
    - **음소거 사유에 대한 추가 설명**: 추가 세부 정보를 위한 선택적인 상자입니다.
1. **Save**를 클릭합니다. 규칙은 새로운 발견 사항에 즉시 적용되며 이후 한 시간 이내에 기존 발견 사항을 검사하기 시작합니다.

[API][3] 또는 [`datadog_security_findings_mute_rule`][4] Terraform 리소스를 사용하여 음소거 규칙을 생성할 수도 있습니다.

## 규칙 일치 순서 {#rule-matching-order}

Datadog이 발견 사항을 식별하면 음소거 규칙의 순서에 따라 발견 사항을 평가합니다. 첫 번째 규칙부터 시작하여 일치하는 항목이 있으면 Datadog은 지정된 기간 동안 발견 사항을 음소거하고 추가 평가를 중단합니다. 일치하는 항목이 없으면 Datadog은 다음 규칙으로 넘어갑니다. 일치하는 항목을 찾거나 모든 규칙이 일치하는 항목 없이 검사될 때까지 이 프로세스가 계속됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=mute
[3]: /ko/api/latest/security-monitoring/create-a-mute-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_mute_rule