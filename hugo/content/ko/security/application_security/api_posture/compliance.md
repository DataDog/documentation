---
description: App and API Protection을 사용하여 업계 표준 규정 준수 프레임워크에 따라 API 보안 태세를 평가하세요.
further_reading:
- link: security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
  tag: 설명서
  text: Cloud Security 규정 준수 프레임워크 및 벤치마크
- link: https://owasp.org/API-Security/editions/2023/en/0x00-header/
  tag: 외부
  text: OWASP API Security Top 10 2023
title: Compliance
---
## 개요 {#overview}

API Posture Compliance를 사용하면 업계 표준 프레임워크에 따라 API 보안 태세를 지속적으로 평가할 수 있습니다. 이는 Datadog의 기본 제공 API 보안 탐지 규칙을 규정 준수 프레임워크 제어에 매핑하고, 서비스 전반에서 어떤 제어 항목이 통과 또는 실패했는지 보여주는 실시간 보안 태세 점수를 제시합니다.

[Cloud Security Compliance][1]는 클라우드 인프라의 구성 오류와 ID 위험을 평가하는 반면, API Posture Compliance는 **API 보안 결과**, 즉 애플리케이션 API에 도달하는 트래픽에서 탐지된 위협 및 취약성에만 중점을 둡니다.

{{< img src="security/application_security/api_posture/aap_compliance_framework_detail.png" alt="OWASP API Security Top 10 프레임워크 세부 정보 페이지에서는 보안 태세 점수, 실패한 결과, 요구 사항별 실패 규칙의 심각도 분석 결과를 제시합니다." style="width:100%;">}}

## 지원되는 프레임워크 {#supported-frameworks}

### OWASP API Security Top 10(2023) {#owasp-api-security-top-10-2023}

OWASP API Security Top 10은 API와 관련하여 가장 중요한 보안 위험을 식별합니다. Datadog은 API 보안 탐지 규칙을 다음 10가지 범주로 매핑합니다.

| 범주 | 이름 | 설명 |
|----------|------|-------------|
| API1:2023 | 취약한 객체 수준 권한 부여 | API가 사용자에게 특정 객체에 대한 액세스 권한이 있는지 확인하지 못하여, 공격자가 다른 사용자의 데이터를 읽거나 조작할 수 있습니다. |
| API2:2023 | 취약한 인증 | 인증 메커니즘의 결함이나 누락으로 인해 공격자가 토큰을 탈취하거나, 사용자를 사칭하거나, 로그인 제어를 완전히 우회할 수 있습니다. |
| API3:2023 | 취약한 객체 속성 수준 권한 부여 | API가 사용자의 읽기/쓰기를 허용해선 안 되는 민감한 객체 속성을 노출하여, 대량 할당 또는 데이터 유출 공격이 발생할 수 있습니다. |
| API4:2023 | 제한 없는 리소스 소비 | API가 요청 크기나 속도에 제한을 두지 않아, 서비스 거부 공격이나 다운스트림 리소스 및 타사 비용의 악용이 발생할 수 있습니다. |
| API5:2023 | 취약한 기능 수준 권한 부여 | 부적절한 액세스 제어로 인해 권한이 없는 사용자가 본인 역할에 할당되지 않은 관리자 또는 권한 있는 API 함수를 호출할 수 있습니다. |
| API6:2023 | 민감한 비즈니스 흐름에 대한 액세스 무제한 | 결제나 로그인과 같이 노출된 비즈니스 흐름은 적절한 속도 제한이나 이상 징후 탐지가 없으면 대규모로 자동화 및 악용될 수 있습니다. |
| API7:2023 | 서버 측 요청 위조 | API가 공격자 제공 URL로 서버 측 HTTP 요청을 전송하면 내부 서비스, 클라우드 메타데이터, 기타 민감한 엔드포인트가 노출될 위험이 있습니다. |
| API8:2023 | 보안 구성 오류 | 안전하지 않은 기본값, 장황한 오류 메시지, 열린 클라우드 스토리지, 보안 강화 조치 누락으로 인해 API가 기회주의적 공격에 노출됩니다. |
| API9:2023 | 부적절한 인벤토리 관리 | 오래되었거나 문서화되지 않았거나 섀도우 API 버전을 관리하지 않고 액세스 가능한 상태로 남아 있어, 현재 적절히 유지 관리되는 범위를 넘어 공격 표면이 확장됩니다. |
| API10:2023 | 안전하지 않은 API 사용 | 적절한 검증 없이 타사 API 응답을 신뢰할 경우 애플리케이션이 인젝션 공격, 예기치 않은 데이터, 다운스트림 손상에 노출됩니다. |

## 작동 방식 {#how-it-works}

- **탐지 규칙**: 각 Datadog API 보안 탐지 규칙에는 해당 규칙이 다루는 OWASP 제어 항목이 태그로 지정됩니다. 규칙이 실행되어 결과를 생성하면, 관련 제어 항목은 대상 서비스에 대해 **실패**로 표시됩니다.
- **보안 태세 점수**: 보안 태세 점수는 완전히 통과한 제어 항목과 하나 이상의 실패 결과가 도출된 제어 항목의 비율을 반영합니다. 이 점수는 [클라우드 보안 태세 점수][3]와 동일한 방법론으로 계산됩니다.
- **규정 준수 프레임워크 페이지**: [규정 준수 프레임워크 페이지][4]에는 API 보안 컨텍스트에 적합한 모든 프레임워크가 명시되어 있습니다. 각 프레임워크별로 제어 수준의 세부 정보를 검토하고, 심각도 기준으로 필터링하고, 결과 측면 패널을 열어 개별 API 보안 이벤트를 조사할 수 있습니다.

## 규정 준수 상태 확인하기 {#view-your-compliance-posture}

[{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Compliance{{< /ui >}}][4]로 이동하여 규정 준수 프레임워크 페이지를 엽니다. 여기서는 다음을 수행할 수 있습니다.
- 프레임워크(예: OWASP API Security Top 10)를 선택하여 제어 항목별 통과/실패 현황을 확인합니다.
- 실패한 제어 항목을 클릭하여 실패 원인으로 작용한 API 보안 결과 목록을 확인합니다.
- 결과 측면 패널을 열어 대상 엔드포인트, 심각도, 권장 해결 단계를 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/
[2]: https://owasp.org/API-Security/editions/2023/en/0x00-header/
[3]: /ko/glossary/#security-posture-score
[4]: https://app.datadoghq.com/security/compliance/home?context=aap