---
further_reading:
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
title: 마감일 규칙 설정
---
{{< product-availability >}}

지정된 SLO 시간 프레임 내에 발견 사항이 처리되도록 마감일 규칙을 구성하세요. 이러한 마감일을 설정하면 책임 소재를 자동화하고, 규정 준수 요구 사항을 충족하며, 보안 문제의 신속한 해결 우선순위를 지정하여 잠재적인 악용을 방지할 수 있습니다.

## 마감일 규칙 생성 {#create-a-due-date-rule}

1. Datadog에서 **Security** > **Settings** > [Findings Automation][2]으로 이동합니다. **Add a New Rule**을 클릭한 다음 **Set Due Date**를 선택합니다. Create a New Rule 페이지가 열립니다.
1. **Rule name**에서 규칙을 설명하는 이름을 입력합니다(예: 'Cloud Infrastructure Anomaly Warnings').
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
1. 각 심각도 수준별로 필요한 경우 마감일을 설정합니다.
1. 규칙에 CVE 기반 발견 결과 유형(라이브러리, 컨테이너 이미지 또는 호스트 취약성)이 포함된 경우 **Calculate due dates from** 아래에서 SLA 시계의 기준 날짜를 선택합니다.
   - **First Seen Date**: Datadog이 발견 결과를 처음 감지했을 때부터 SLA 시계를 시작합니다.
   - **Fix-Available Date**: 취약성에 대한 패치가 게시되었을 때 SLA 시계를 시작합니다. 팀이 아직 해결할 수 없는 권고 사항에 대해 SLA를 위반하지 않도록 하려는 경우 유용합니다.

   다른 모든 발견 결과 유형의 경우 항상 First Seen Date가 사용됩니다.
1. **Save**를 클릭합니다. 규칙은 새로운 발견 사항에 즉시 적용되며 이후 한 시간 이내에 기존 발견 사항을 검사하기 시작합니다.

[API][3] 또는 [`datadog_security_findings_due_date_rule`][4] Terraform 리소스를 사용하여 마감일 규칙을 생성할 수도 있습니다.

## 마감일이 표시되는 위치{#where-due-dates-appear}

발견 결과에 마감일이 있는 경우 다음 위치에서 확인할 수 있습니다.

- 탐색기 패싯
- 발견 결과 사이드 패널
- Notifications
- Jira 티켓 설명
- 보고 메트릭('마감일이 지난' 불리언으로)을 사용하여 마감일이 지난 취약성이 가장 많은 팀 또는 리포지토리를 식별합니다.

## 규칙 일치 순서 {#rule-matching-order}

Datadog이 발견 사항을 식별하면 마감일 규칙의 순서에 따라 발견 사항을 평가합니다. 첫 번째 규칙부터 확인하여 일치하는 규칙이 있으면, Datadog은 해당 규칙에 지정된 기간을 기준으로 발견 사항의 마감일을 설정하고 추가 평가를 중단합니다. 일치하는 항목이 없으면 Datadog은 다음 규칙으로 넘어갑니다. 일치하는 항목을 찾거나 모든 규칙이 일치하는 항목 없이 검사될 때까지 이 프로세스가 계속됩니다.

## 마감일 제거 {#removing-due-dates}

발견 결과를 관리할 때 다음과 같은 다양한 조건에서 마감일을 제거할 수 있습니다.

- 발견 결과를 트리거한 탐지 규칙이 성공적으로 통과합니다.
- 발견 결과가 수동으로 또는 음소거 규칙을 통해 자동으로 음소거됩니다.
- 해당 발견 결과와 관련된 마감일 규칙이 비활성화되었거나 삭제되었습니다.
- 관련 마감일 규칙이 수정되어 해당 기준이 더 이상 발견 결과와 일치하지 않게 됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=set_due_date
[3]: /ko/api/latest/security-monitoring/create-a-due-date-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_due_date_rule