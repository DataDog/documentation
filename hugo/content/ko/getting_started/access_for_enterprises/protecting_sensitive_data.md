---
description: Data Access Control을 사용하여 텔레메트리 데이터에 대한 액세스를 제한합니다.
further_reading:
- link: /account_management/rbac/data_access
  tag: 설명서
  text: Data Access Control
- link: /security/sensitive_data_scanner/
  tag: 설명서
  text: Sensitive Data Scanner
- link: /administrators_guide/plan/#resource-tagging
  tag: 설명서
  text: '관리자 가이드: 태그'
- link: /tracing/configure_data_security/
  tag: 설명서
  text: 데이터 보안
title: 민감한 데이터 보호
---
## 개요 {#overview}

[자산 보호][1]에서 대시보드, 모니터링 및 기타 객체를 편집하거나 조회할 수 있는 사용자를 다루는 반면, 이 섹션에서는 *텔레메트리*, 즉 Datadog을 통해 흐르는 기반 데이터를 다룹니다. 모든 조직에 데이터 수준의 액세스 제한이 필요한 것은 아니지만, 민감한 데이터나 규제 대상 데이터를 처리하는 조직에는 [Data Access Control][2]이 필요합니다. Data Access Control을 사용하면 태그 값으로 정의한 행 수준의 데이터 액세스 제한을 생성하고, 해당 데이터가 표시될 수 있는 모든 보기에서 이를 적용할 수 있습니다.

이 섹션에서는 데이터 민감도 패턴을 파악하고 적절한 액세스 제한 방식을 선택하는 방법을 설명합니다.

## 데이터 민감도 패턴 식별 {#identifying-your-data-sensitivity-patterns}

민감한 데이터의 액세스를 제한하는 데는 세 가지 일반적인 패턴이 있습니다. 세 가지 중 하나를 사용하거나 조합하여 사용할 수 있습니다.

### 패턴 1: 데이터 유형 기반 {#pattern-1-based-on-the-type-of-data}

특정 유형의 모든 데이터는 출처와 관계없이 민감합니다.

*예를 들어, Logs 데이터에는 항상 민감한 정보가 포함되므로 권한이 낮은 사용자가 이를 조회할 수 없도록 해야 합니다. 또는 RUM 세션에 최종 사용자의 개인 식별 정보(PII)가 포함될 수 있으므로 계약자의 액세스를 제한해야 합니다.*

**권장 접근 방식:** 관련 읽기 권한이 없는 [사용자 지정 역할][3]을 생성합니다. 타사 계약자 등 해당 유형의 데이터에 액세스해서는 안 되는 사용자에게 이 역할을 할당합니다. 이는 Data Access Control 제한이 아닌 권한 수준 제한입니다.

### 패턴 2: 서비스, 인프라 또는 소유자 기반 {#pattern-2-based-on-the-service-infrastructure-or-owner}

데이터 민감도는 데이터 유형 자체가 아니라 데이터를 생성하는 주체나 대상에 의해 결정됩니다. 일부 서비스 또는 인프라 구성 요소는 특정 팀만 액세스할 수 있도록 제한해야 하는 데이터를 생성합니다.

*예를 들어, 결제 처리 서비스는 Payments 팀과 상급 관리자만 조회할 수 있어야 하는 APM 트레이스, Logs 및 RUM 데이터를 생성합니다. 해당 서비스의 모든 텔레메트리 데이터는 유형과 관계없이 민감합니다.*

**권장 접근 방식:** [Data Access Control][2]을 사용하여 관련 텔레메트리 유형 전반에 걸쳐 태그(예: `service:payment-processor`)를 기준으로 제한된 데이터 세트를 생성합니다. 담당 팀과 기타 권한이 부여된 역할 또는 팀에 액세스 권한을 할당합니다.

### 패턴 3: 서비스 내 보호 대상 데이터 분류 기반 {#pattern-3-based-on-protected-classes-of-data-within-a-service}

동일한 소스와 텔레메트리 유형에서 민감한 데이터와 민감하지 않은 데이터가 혼합되어 있습니다. 이는 데이터 스트림의 일부 레코드만 민감한 정보에 해당하는 규제 산업에서 흔히 발생합니다.

*예를 들어, 의료 기관에서 서비스는 조직 내 누구나 볼 수 있는 일상적인 운영 로그와 제한되어야 하는 HIPAA 보호 데이터를 생성할 수 있습니다. 금융 기관에서는 APM, Logs 및 RUM의 거래 데이터에 대한 액세스를 규정 준수 승인을 받은 사용자로 제한해야 하지만, 동일한 환경의 일반 인프라 데이터는 폭넓게 액세스할 수 있습니다.*

**권장 접근 방식:** Data Access Control을 사용하여 영향을 받는 텔레메트리 유형 전반에 걸쳐 분류 태그(예: `data_sensitivity:hipaa` 또는 `data_classification:trading`)를 기준으로 제한된 데이터 세트를 생성합니다. 해당 데이터 분류를 조회할 권한이 있는 역할이나 팀에 액세스 권한을 할당합니다.

## Sensitive Data Scanner {#sensitive-data-scanner}

[Sensitive Data Scanner][4]는 민감한 데이터가 예기치 않게 나타나는 상황에 대비한 자동화된 안전망을 제공합니다. 예를 들어, 개발자가 실수로 신용카드 번호, 이메일 주소 또는 주민등록번호를 로그에 기록할 수 있습니다.

Sensitive Data Scanner는 특히 데이터 수집 시 민감한 데이터에 태그가 일관되게 지정된다고 보장할 수 없는 경우, Data Access Control과 함께 심층 방어 조치로 활용할 수 있습니다.

## Restricted Datasets에 포함되지 않은 데이터의 액세스 설정 선택 {#choosing-the-access-setting-for-data-outside-restricted-datasets}

기본 **Unrestricted** 설정을 사용하여 제한을 점진적으로 적용합니다. 기본적으로 모든 데이터가 표시되며, 제한된 데이터 세트를 생성하여 특정 데이터에 대한 액세스를 제한합니다. 이 모델은 민감한 데이터가 일반적이지 않고 예외적인 경우에 적합합니다.

엄격한 규제 요건(예: 국방)이 있는 조직이나 동일한 Datadog 테넌트에서 여러 외부 비즈니스 파트너와 협업하는 조직을 위해, Datadog은 Restricted Datasets에 포함되지 않은 데이터에 적용할 수 있는 [**Restricted** 설정][6]을 제공합니다. 이 설정을 사용하면 데이터가 기본적으로 숨겨지며 사용자는 명시적으로 액세스 권한을 부여받은 데이터만 볼 수 있습니다. 민감한 데이터의 일부만 제한하는 대신 모든 데이터에 대한 액세스를 명시적으로 허용해야 합니다.

**Restricted** 설정은 일반적인 설정이 아니라 예외적으로 사용됩니다. 관련 규제 또는 법적 체계에서 텔레메트리 액세스에 기본 거부 모델을 요구하는 경우에만 사용합니다.

## Recommendations {#recommendations}

- **조직에 적용되는 패턴을 파악합니다**. 이 작업은 데이터 세트를 생성하기 전에 수행되어야 합니다. 많은 조직에서 패턴 2(서비스 기반 제한)를 기본 모델로 사용하고 패턴 1(역할을 통한 유형 기반 제한)을 보조 모델로 사용합니다.
- **태그를 일관되게 사용합니다.** Data Access Control을 통한 액세스 제한의 효과는 태그 지정의 정확성에 달려 있습니다. 수집 시 서비스, 인프라 및 데이터 분류에 태그가 일관되게 지정되는지 확인합니다. 적절한 태그가 지정되도록 태그 지정 전략을 활용합니다([관리자 가이드][5] 참조).
- **가장 민감한 데이터부터 시작합니다.** 모든 것에 대한 데이터 세트를 한꺼번에 생성하려고 하지 마세요. 가장 민감한 서비스 또는 데이터 분류 3~5개를 파악하고 해당 항목부터 액세스를 제한합니다.
- **데이터 세트에 포함되지 않은 데이터에 대한 액세스를 제한해야 하는 규제상의 이유가 없다면 기본 Unrestricted 설정을 유지합니다.** 기본 거부 방식은 상당한 운영 오버헤드를 발생시키므로 규제 환경에서 요구하는 경우에만 사용해야 합니다.
특히 Logs에 대한 심층 방어 조치로 - **Data Access Control과 Sensitive Data Scanner를 함께 사용합니다**.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/access_for_enterprises/protecting_assets/
[2]: /ko/account_management/rbac/data_access
[3]: /ko/getting_started/access_for_enterprises/permissions/#custom-roles
[4]: /ko/sensitive_data_scanner/
[5]: /ko/administrators_guide/plan/#resource-tagging
[6]: /ko/account_management/rbac/data_access/#strict-mode