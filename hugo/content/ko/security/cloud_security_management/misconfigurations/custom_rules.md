---
aliases:
- /ko/security/cspm/custom_rules
- /ko/security/misconfigurations/custom_rules
cascade:
  algolia:
    rank: 30
    subcategory: Cloud Security Posture Management
further_reading:
- link: security/cloud_security_management/guide/writing_rego_rules
  tag: 가이드
  text: 나만의 Rego 규칙 작성하기
- link: security/default_rules
  tag: 설명서
  text: CSM 설정 오류의 클라우드 설정 준수 규정 기본값 살펴보기
- link: security/misconfigurations/frameworks_and_benchmarks
  tag: 설명서
  text: 프레임워크와 업계 벤치마크 알아보기
is_beta: true
title: 커스텀 규칙 생성
---

## 개요

보안 상태를 평가하기 위해 환경에 적용되는 규칙을 확장하려면 컴플라이언스 규칙을 복제하고 복사본을 편집하고 처음부터 자신만의 규칙을 생성할 수 있습니다.
커스텀 규칙에 사용 가능한 리소스 유형 목록을 보려면 [Cloud Resources Schema][8]를 참조하세요.

## 규칙 복제하기

규칙을 복제하려면:

1. 다음 중 하나를 수행하여 복제할 규칙을 찾습니다.
   - [**Misconfigurations Rules**][1] 페이지로 이동합니다. 복제하려는 규칙을 선택하여 세부정보 페이지를 엽니다.
   - [**Misconfigurations Explorer**][2]로 이동합니다. 잘못된 구성을 선택하여 세부정보를 연 다음 **Edit Rule**을 선택합니다.
2. 새 규칙에 대해 원하는 대로 변경합니다.
3. 세부정보 페이지 하단으로 스크롤하여 **Clone Rule**을 클릭합니다.

## 규칙 만들기

규칙을 처음부터 만드려면:

1. [**Misconfigurations Rules**][1] 페이지로 이동합니다.
2. 오른쪽 상단의 **New Rule**을 클릭합니다.
3. **Cloud Configuration**를 규칙 유형으로 선택합니다.
4. 규칙을 작성 중인 클라우드 리소스 유형을 지정합니다.
5. 코드형 정책 언어인 [Rego][3]를 사용하여 처음부터 또는 Datadog 템플릿을 사용하여 규칙 논리를 작성합니다. 자세한 내용은 [Writing Custom Rules with Rego][4]를 참조하세요. 리소스를  "pass", "fail", 또는 "skip"으로 표시할 수 있습니다. 리소스를 표시하지 않으면 "skip"으로 해석됩니다.

   {{< img src="security/cspm/custom_rules/custom_rules_first_half.png" alt="커스텀 규칙 단계" width="100%">}}

6. 잘못된 구성에서 특정 리소스를 포함하거나 제거하는 쿼리를 지정하여 양호한 활동을 제외합니다.
7. 리소스를 선택하고 **Test Rule**을 클릭하여 규칙의 논리를 검증합니다. 해당 리소스 태그와 함께 통과한 리소스와 실패한 리소스를 확인하세요.
8. 규칙에 대한 심각도(`Critical`, `High`, `Medium`, `Low`, `Info`)를 지정합니다.
9. 패싯(예: 리소스 유형별 또는 계정 ID별)을 선택하고 [알림 대상을 지정][5]하여 신호를 보냅니다.
10. **Say what's happening**에서 알림 옵션을 사용하여 알림에 대한 설명을 작성합니다. 자세한 내용은 [Notifications][6]에서 확인하세요.
11. 잘못된 구성 결과에 적용할 태그를 지정합니다. 자세한 내용은 [잘못된 구성 태그 지정](#tagged-misconfigurations)을 참조하세요.
12. **Save Rule**을 클릭합니다.

    {{< img src="security/cspm/custom_rules/custom_rules_second_half.png" alt="커스텀 규칙 단계" width="100%">}}

## 잘못된 구성 태그 지정

CSM Misconfigurations 컴플라이언스 규칙을 생성, 복제 또는 수정할 때 잘못된 구성에 적용할 태그를 지정하면 해당 태그를 기준으로 그룹화, 필터링, 검색이 가능합니다. 규칙을 복제하면 일부 태그는 새 규칙으로 전달되고 다른 태그는 전달되지 않습니다(아래 표 참조).

거의 모든 키-값을 태그로 할당할 수 있습니다. 다음 표에는 일반적인 보안 시나리오에 유용한 태그가 나와 있습니다.

| 키              | 유효한 규칙                                                                                                             | 설명                                                                                                                                          |
|------------------|--------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scored`         | `true`, `false`                                                                                                          | 조직의 전체 상태 점수를 계산할 때 규칙을 포함할지 여부를 나타냅니다. 복제된 규칙에 자동으로 추가됩니다.                    |
| `security`       | `compliance`                                                                                                             | [Security Signals 페이지][7]에서 잘못된 구성을 분류합니다. 제거할 수 없습니다.                                                                   |
| `requirement`    | 문자열                                                                                                                   | 커스텀 규칙에는 허용되지 않습니다. 컴플라이언스 프레임워크와 관련된 요구 사항을 나타냅니다. 컴플라이언스 프레임워크의 일부가 아닌 규칙에는 이를 추가하지 마세요. |
| `cloud_provider` | `aws`, `gcp`, `azure`                                                                                                    | 제거할 수 없습니다. 리소스 유형에 따라 자동으로 설정됩니다.                                                                                      |
| `control`        | 문자열                                                                                                                   | 커스텀 규칙에는 허용되지 않습니다. 컴플라이언스 프레임워크와 관련된 제어를 나타냅니다. 컴플라이언스 프레임워크의 일부가 아닌 규칙에는 이를 추가하지 마세요.     |
| `source`         | [Source facet in the Misconfigurations Explorer][2]에 나열된 대로 클라우드 공급자가 제공한 정의된 세트의 문자열입니다. | 제거할 수 없습니다. 복제된 규칙에 자동으로 추가됩니다. 클라우드 공급자별 그룹화 규칙을 촉진합니다.                                                |
| `framework`      | 문자열                                                                                                                   | 커스텀 규칙에는 허용되지 않습니다. 규칙이 속한 컴플라이언스 프레임워크를 나타냅니다. 복제된 규칙에 자동으로 추가되지 않습니다.                       |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/compliance/rules
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /ko/security/cloud_security_management/guide/writing_rego_rules/
[5]: /ko/security/cloud_security_management/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[6]: /ko/security/notifications/
[7]: https://app.datadoghq.com/security/
[8]: /ko/infrastructure/resource_catalog/schema/