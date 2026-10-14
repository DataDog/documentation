---
further_reading:
- link: /security/automation_pipelines
  tag: 설명서
  text: 자동화 파이프라인
- link: /security/manual_severity_adjustment/
  tag: 설명서
  text: 심각도 조정
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
title: 심각도 수정자 규칙
---
{{< product-availability >}}

조직의 비즈니스 맥락을 반영하도록 심각도 수정자 규칙을 구성하여 탐지 심각도를 조정하세요. 예를 들어, 노이즈를 줄이기 위해 격리된 환경의 탐지 결과를 다운그레이드하거나, PII(개인 식별 정보)가 포함된 데이터베이스의 탐지 결과를 업그레이드하여 즉각적으로 대응하도록 할 수 있습니다.

## 심각도 수정자 규칙 생성 {#create-a-severity-modifier-rule}

1. Datadog에서 **Security** > **Settings** > [**Findings Automation**][2]로 이동합니다. **Add a New Rule**을 클릭한 다음 **Modify Severity Level**을 선택합니다. Create a New Rule 페이지가 열립니다.
1. **Rule name** 아래에 규칙을 설명하는 이름을 입력합니다(예: \"PII 데이터베이스에 액세스하는 서비스의 심각도 증가\").
1. 다음 필드에 규칙 기준을 추가합니다.
    - **다음 유형 중 하나**: 규칙이 검사해야 하는 탐지 결과의 유형입니다. 사용 가능한 유형은 다음과 같습니다.
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
      - API 보안
      - 워크로드 활동
    - **이 태그 또는 속성 중 하나**: 규칙이 적용되려면 일치해야 하는 리소스 태그 또는 속성입니다.
1. 필요한 경우 **Add Severity**를 클릭하여 심각도 수준별로 탐지 결과를 필터링합니다. 규칙은 사용자 정의 조정이 적용되기 전, 각 탐지의 Datadog 조정 심각도를 기준으로 일치 여부를 확인합니다.
1. 다음과 같이 심각도 수정 작업을 정의합니다.
    - **특정 수준으로 설정**: 일치하는 탐지를 고정된 심각도로 설정합니다. **Info / None**, **Low**, **Medium**, **High**, **Critical** 중에서 선택하세요.
      <div class="alert alert-info"><strong>Info / None</strong>은 일부 탐지 유형에만 유효합니다. <a href="#severity-floors-by-finding-type">탐지 유형별 심각도 하한</a>을 참조하세요.</div>
    - **Shift up or down one level**: Increases or decreases the severity of matching findings by one level. See [Severity floors by finding type](#severity-floors-by-finding-type) for the lowest severity a finding type can shift down to, and [Evaluation order](#evaluation-order) for what happens when a finding is already at that bound.
1. 필요한 경우, 규칙이 적용되는 이유를 설명하는 **설명**을 입력합니다. 이 텍스트는 사용자가 수정된 탐지 결과를 확인할 때 심각도 분석 패널에 나타납니다.
1. **Save**를 클릭합니다. 규칙은 새로운 탐지 결과에 즉시 적용되며 이후 1시간 이내에 기존 탐지 결과를 검사하기 시작합니다.

**참고**: 규칙 쿼리의 `@severity` 또는 `@severity_details.user_adjusted`는 사용할 수 없습니다. 심각도 수정자 규칙은 탐지에 저장된 `@severity` 값이 아니라 Datadog 조정 심각도(`@severity_details.adjusted.value`)를 기준으로 평가됩니다.

## 평가 순서 {#evaluation-order}

심각도 수정자 규칙은 자동화 파이프라인의 첫 번째 단계이며 음소거, 기한, 받은 편지함 및 티켓 생성 규칙보다 먼저 실행됩니다. 심각도 수정자 규칙 내에서 Datadog은 첫 번째 일치 정책을 사용합니다. 탐지 결과를 순서대로 규칙과 대조하여 평가하며, 가장 먼저 일치하는 규칙이 적용됩니다. 해당 탐지 결과에 대해서는 심각도 수정자 규칙이 추가로 평가되지 않습니다.

규칙의 액션을 적용했을 때 탐지 결과의 심각도가 변경되는 경우에만 규칙이 일치하는 것으로 간주됩니다. 액션을 적용해도 심각도가 변경되지 않는 경우(예: 이미 심각도 제한에 도달한 전환 액션이나 탐지 결과의 현재 심각도를 대상으로 하는 설정 액션)에는 규칙이 일치하지 않으며, Datadog은 해당 탐지 결과에 대해 후속 심각도 수정자 규칙을 계속 평가합니다.

심각도 수정자 규칙이 먼저 실행되므로, 음소거 규칙을 포함한 모든 다운스트림 자동화 규칙은 평가 시 수정된 심각도를 확인하게 됩니다.

## 수정된 탐지 결과 식별하기 {#identify-modified-findings}

심각도 수정자 규칙의 영향을 받는 탐지 결과는 탐색기 목록 보기와 탐지 결과의 사이드 패널 헤더에 시각적 표시기가 나타납니다. 표시기 위로 마우스를 가져가면 변경의 이유가 되는 자동화 규칙이 표시됩니다.

{{< img src="security/automation_pipelines/severity_pill_popover.png" alt="수정자 표시기와 함께 심각도 배지가 표시되어 있는 탐지 결과 탐색기 항목. 팝오버는 탐지 결과의 심각도 조정의 이유가 되는 자동화 규칙에 대한 추가 정보를 제공합니다." style="width:65%;" >}}

CVSS 점수가 있는 탐지 결과(컨테이너 이미지 취약성, 호스트 취약성, 라이브러리 취약성 및 런타임 코드 취약성)의 경우, 사이드 패널 심각도 섹션에는 다음을 보여주는 분석 내용도 포함됩니다.
- 수정 전의 원래 심각도 수준, CVSS 점수 및 CVSS 벡터.
- 트리거된 자동화 규칙의 이름과 해당 규칙으로 연결되는 직접 링크.
- 결과 심각도 수준 및 조정된 CVSS 점수.

{{< img src="security/automation_pipelines/severity_breakdown.png" alt="원래 심각도, CVSS 점수 및 CVSS 벡터, 변경을 트리거한 자동화 규칙, 결과 심각도 수준 및 조정된 CVSS 점수와 함께 심각도 분석을 보여주는 탐지 결과 사이드 패널." style="width:100%;" >}}

## 탐지 유형별 심각도 하한 {#severity-floors-by-finding-type}

모든 탐지 유형이 동일한 심각도 척도를 사용하는 것은 아닙니다. 다음 표는 각 탐지 유형에 대해 사용 가능한 가장 낮은 심각도를 보여줍니다.

| 탐지 유형 | 가장 낮은 심각도 |
|---|---|
| API 보안 | Info |
| 공격 경로 | Info |
| ID 위험 | Info |
| 구성 오류 | Info |
| 워크로드 활동 | Info |
| 컨테이너 이미지 취약성 | None |
| 호스트 취약성 | None |
| 라이브러리 취약성 | None |
| 코드형 인프라 | Low |
| 런타임 코드 취약성 | Low |
| 시크릿 | Low |
| 정적 코드 취약성 | Low |

**Info / None**은 **Low**을 최저 심각도로 사용하는 탐지 유형에는 사용할 수 없습니다. 규칙에 이러한 탐지 유형을 포함하고 **Info / None**을 선택하면 유효성 검사 오류가 발생합니다.

## 심각도가 Unknown인 탐지 결과 {#findings-with-unknown-severity}

심각도 수정자 규칙은 심각도가 **Unknown**인 탐지 결과를 다음과 같이 처리합니다.

- **전환 액션**: 규칙이 심각도가 **Unknown**인 탐지 결과와 일치하지 않습니다. 규칙이 일치하지 않으므로 해당 탐지 결과에 대해 후속 심각도 수정자 규칙을 계속 평가할 수 있습니다.
- **설정 액션**: 규칙의 심각도 선택기에 **Unknown** 심각도가 포함된 경우, 규칙이 일치하며 **Unknown**을 지정된 대상 심각도로 변경합니다. 심각도 수정자 규칙을 사용하여 탐지 결과의 심각도를 **Unknown**으로 설정할 수 없습니다.

## 취약성 탐지 결과 및 CVSS 점수 {#vulnerability-findings-and-cvss-scores}

Datadog 조정 CVSS 점수가 있는 취약성 탐지 결과의 경우, 심각도 수정자가 `@severity_details.user_adjusted`에 저장된 조정 점수도 업데이트합니다. 업데이트된 점수는 대상 심각도 CVSS v3 범위의 중간값 정도로 설정됩니다.

| 대상 심각도 | CVSS v3 범위 |
|---|---|
| None | 0.0 |
| Low | 0.1~3.9 |
| Medium | 4.0~6.9 |
| High | 7.0~8.9 |
| Critical | 9.0~10.0 |

원본 CVSS 벡터는 절대 수정되지 않습니다. 조정된 점수와 일치하도록 생성된 신서틱 벡터는 없습니다. 규칙은 탐지 결과의 심각도를 변경할 때만 일치하므로, 점수는 심각도 자체가 변경될 때만 조정됩니다. [평가 순서](#evaluation-order)를 참조하세요.

## 자동 종료 및 통과된 탐지 결과 {#auto-closed-and-passed-findings}

자동 종료로 전환되거나 평가 결과가 **pass**인 결과에 대해서는 심각도 수정자가 삭제되거나 업데이트되지 않습니다. 원래 탐지 결과를 수정한 규칙이 나중에 편집되거나 삭제되더라도 해당 탐지 결과는 종료 시 설정된 심각도를 유지합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=modify_severity