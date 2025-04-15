---
further_reading:
- link: /dynamic_instrumentation/enabling/
  tag: 설명서
  text: 동적 계측 설정
- link: /sensitive_data_scanner/
  tag: 설명서
  text: 민감 데이터 스캐너
title: 민감한 데이터 스크러빙 동적 계측
---

## 개요

Datadog 동적 계측은 프로덕션 환경에서 임의의 코드 위치에서 변수 데이터를 캡처하여 애플리케이션의 통합 관측성 및 디버깅 기능을 향상시킵니다. 또한 실시간으로 정규 표현식을 작성 및 평가하고, 그 출력값을 로그 메시지에 통합하거나 스팬(span) 태그로 추가할 수 있습니다.

이 기능은 강력하지만, 의도적이든 그렇지 않든 민감한 데이터가 유출될 가능성도 있습니다. 이 프로덕트의 강력한 데이터 캡처 기능과 더불어 민감한 정보를 보호하기 위한 포괄적인 조치도 제공합니다.

이러한 삭제 메커니즘을 이해하고 적절하게 설정하면 동적 계측 기능을 안심하고 안전하게 사용할 수 있습니다.

## 식별자에 기반한 삭제

### 기본 동작

동적 계측은 민감한 정보로 간주되는 특정 식별자(예: `password` 및 `accessToken`)에 연결된 값을 자동으로 삭제합니다. [삭제된 식별자 전체 목록][1]을 참조하세요.

### 커스텀 식별자 삭제

추가 식별자를 지정하여 삭제를 더 맞춤 설정할 수 있습니다. 애플리케이션의 환경(`datadog-agent`가 아닌)에서 `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` 환경 변수를 쉼표로 구분된 목록 식별자(예: `firstName,lastName,phoneNumber`)로 설정합니다.

식별자가 코드에서 어떻게 사용되었는지(메서드 인수, 로컬 변수, 클래스 속성, 사전 키 등으로써)에 관계없이 삭제가 보편 적용됩니다. 관련 값은 인프라스트럭처에서 삭제되고 Datadog에는 업로드되지 않습니다.

## 특정 클래스 또는 유형에 따라 삭제

특정 클래스는 본질적으로 민감한 정보를 포함할 수 있습니다(예: `UserCredentials` 클래스). 다시 애플리케이션의 환경(`datadog-agent`가 아닌)에서`DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` 환경 변수를 쉼표로 구분된 민감한 유형 목록(예: `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`)으로 설정합니다.

클래스 기반 삭제:

- 목록화된 유형의 변수를 삭제합니다. 해당 콘텐츠는 Datadog에 업로드되지 않습니다.
- 삭제된 클래스의 코드 위치 내에서 프로브가 설정되지 않도록 합니다.

## 민감한 데이터 스캐너를 사용하여 변수값에 기반하여 삭제

[민감한 데이터 스캐너][3]는 특정 정규 표현식을 기반으로 민감한 정보를 식별 및 삭제합니다.

### 초기 설정

[동적 계측 설정][2]에 처음 액세스하면 동적 계측에 대한 민감한 데이터 스캐너 기본 규칙을 옵션으로 설정할 수 있습니다. 여기에는 이메일 주소나 JWT 토큰과 같이 민감한 데이터일 가능성이 있는 일반적인 정규 표현식이 포함됩니다.

### 민감한 데이터 스캐너 사용자 지정

기본 규칙을 비활성화하거나 [민감한 데이터 스캐너][4]를 통해 다른 규칙을 만들 수 있습니다. 동적 계측 에 관한 새로운 민감한 데이터 스캐너 규칙을 생성하려면 `source:dd_debugger`에서 필터링하도록 설정합니다.

**참고**: Datadog의 민감한 데이터 스캐너는 정보가 Datadog에 업로드된 후에 삭제 작업을 수행합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[2]: https://app.datadoghq.com/dynamic-instrumentation/setup
[3]: /ko/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner