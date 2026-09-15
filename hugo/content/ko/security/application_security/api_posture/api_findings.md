---
description: Triage는 정의, 게이트웨이 및 실시간 트래픽 전반에서 API 위험을 탐지했습니다.
title: API 발견 사항
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

[API Findings][1] 탐색기는 정의, 게이트웨이 및 실시간 트래픽 전반에서 감지된 API 위험에 대한 중앙 집중식 Triage 조회를 제공합니다. 기본 규칙은 일반적인 취약점 및 잘못된 설정을 감지합니다. 특정 사용 사례에 대해 [사용자 지정 규칙][2]을 추가할 수도 있습니다.

**API 발견 사항** 열:

- **심각도:** 각 문제는 위험도에 따라 순위가 매겨집니다.
- **엔드포인트:** 영향을 받는 엔드포인트 수와 해당 서비스를 보여줍니다.
- **상태 및 티켓팅:** `Open` 또는 `In Progress`은 수정 진행 상황 및 워크플로 통합을 추적합니다.

**서비스** 패싯을 사용하여 각 서비스의 엔드포인트를 확인하고 소유권을 식별하며 비즈니스 영향에 따라 우선순위를 지정하세요.

## 일반 작업{#common-operations}

감지 항목을 클릭하여 세부 정보를 조회하고 Validate > Investigate > Fix > Track과 같은 워크플로를 수행하세요.

1. 검증:
   - {{< ui >}}What Happened{{< /ui >}} 및 {{< ui >}}Detected In{{< /ui >}}를 검토하여 감지가 정확한지(서비스, 엔드포인트, 메서드) 확인하세요.
   -  {{< ui >}}Next Steps{{< /ui >}}에서 소유권 및 영향에 따라 {{< ui >}}Mute{{< /ui >}}, {{< ui >}}Create Ticket{{< /ui >}} 또는 {{< ui >}}Run Workflow{{< /ui >}}할지 선택하세요.
2. 조사:
   - {{< ui >}}Context{{< /ui >}} 탭을 사용하여 엔드포인트 스냅샷 및 속성(메서드, 경로, 인증 플래그, 태그)을 검사하세요.
   - {{< ui >}}Detected In{{< /ui >}}은 라우팅 소유권 및 수정에 대한 정보를 제공합니다.
   - {{< ui >}}Detection Rule Query{{< /ui >}}에서 {{< ui >}}See Detection Rule{{< /ui >}}을 클릭하여 API 감지 규칙을 편집할 수 있습니다.
3. 수정: 
   - {{< ui >}}Remediation{{< /ui >}}에 따른 지침을 따르세요.
4. 추적:
   - {{< ui >}}Create Ticket{{< /ui >}}을 사용하여 문제를 추적 시스템에 연결하세요.
   - 개발자 교육 또는 코드 검토를 위해 {{< ui >}}Reference Links{{< /ui >}}를 사용하세요.

## 수정 {#remediation}

Datadog API Posture는 [Bits Code][3]를 사용하여 취약점에 대한 코드 수정을 생성합니다.

1. Datadog에서 [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Findings{{< /ui >}}][1]로 이동합니다.
2. 감지 항목을 선택하여 감지 항목과 영향을 받는 엔드포인트에 대한 세부 정보가 포함된 측면 패널을 엽니다.
3. **다음 단계** > **수정** 섹션에서 **Bits로 수정**을 클릭하세요.

그러면 이 단일 API 감지 항목을 수정하기 위한 Bits Code 세션이 열립니다. 제안된 diff를 검토하고, 후속 질문을 하고, 패치를 편집하고, 풀 리퀘스트를 생성하여 소스 코드 저장소에 수정 사항을 적용할 수 있습니다.
**Bits AI** > **Bits Code** > [**세션**][4]에서 모든 Bits Code 세션을 조회하세요.

### 수정 세션 세부 정보 {#remediation-session-details}

각 Bits Code 세션은 AI가 생성한 수정의 수명 주기를 보여주므로 병합하기 전에 변경 사항을 검토하고 검증할 수 있습니다. 포함 항목:

- 원본 보안 감지 항목 및 제안된 코드 변경 사항
- Bits Code가 수정을 생성한 방법 및 이유에 대한 설명
- 패치가 배포하기에 안전한지 검증하기 위한 CI 결과(활성화된 경우)
- 수정을 개선하거나 **PR 생성**을 통해 소스 코드 저장소에 변경 사항을 적용하는 옵션

수정 세션을 열려면 [**Findings**][1] 페이지에서 API 감지 항목을 선택하여 측면 패널을 열고, **Remediation** 섹션으로 스크롤한 다음 **Expand & Chat**을 선택하세요.

[**세션**][4]에서 모든 수정 세션을 조회할 수도 있습니다.

[1]: https://app.datadoghq.com/security/appsec/inventory/finding
[2]: /ko/security/application_security/policies/custom_rules/
[3]: /ko/bits_ai/bits_code
[4]: https://app.datadoghq.com/code