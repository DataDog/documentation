---
aliases:
- /ko/tracing/trace_collection/dynamic_instrumentation/sensitive-data-scrubbing/
- /ko/dynamic_instrumentation/sensitive-data-scrubbing/
- /ko/tracing/dynamic_instrumentation/sensitive-data-scrubbing
description: Live Debugger가 캡처한 민감한 애플리케이션 데이터를 보호하세요.
further_reading:
- link: /tracing/live_debugger/#setup
  tag: 문서
  text: Live Debugger 설정
- link: /security/sensitive_data_scanner/
  tag: 문서
  text: Sensitive Data Scanner
title: Live Debugger 민감 데이터 마스킹
---
## 개요 {#overview}

[Live Debugger][5]는 특히 {{< ui >}}Capture Variables{{< /ui >}} 옵션을 사용할 때 민감한 애플리케이션 데이터가 포함될 수 있는 로그와 변수 스냅샷을 캡처합니다.

다음 마스킹 메커니즘은 캡처된 데이터를 보호하는 데 도움이 됩니다.

- **식별자 및 유형 규칙**은 업로드 전에 인프라에서 일치하는 값을 마스킹합니다.
- **Live Debugger 마스킹 모드**는 캡처된 값 중 어떤 것이 표시될지 제어합니다. [모드 기반 마스킹](#mode-based-redaction)을 참조하세요.
- **Sensitive Data Scanner 규칙**은 데이터가 Datadog에 도달한 후 일치하는 데이터를 마스킹합니다. [Sensitive Data Scanner](#redact-based-on-variable-values-with-sensitive-data-scanner)를 참조하세요. 이 규칙들은 민감한 값이 인프라를 벗어나지 않도록 하는 규칙을 대체할 수 없습니다.

## 모드 기반 마스킹 {#mode-based-redaction}

Live Debugger에는 다음 두 가지 마스킹 모드가 있습니다.

- {{< ui >}}Strict Mode{{< /ui >}}: 숫자와 부울을 제외한 모든 값을 마스킹합니다. [Bits Live Debugger][8]는 {{< ui >}}Strict Mode{{< /ui >}}로 설정된 서비스 및 환경 조합에서는 사용할 수 없습니다.
- {{< ui >}}Targeted Mode{{< /ui >}}: 신용카드 번호, API 키, IP 및 기타 PII와 같이 알려진 민감한 패턴을 마스킹합니다. 또한 고엔트로피 시크릿 스캐너를 실행하여 시크릿으로 추정되는 값을 자동으로 마스킹합니다. 이러한 값은 캡처된 데이터에서 `[REDACTED:HIGH_ENTROPY]`로 표시됩니다.

이러한 마스킹 모드는 비활성화할 수 없고 모드 간 전환만 가능합니다. Targeted Mode는 `staging` 또는 `preprod`와 같은 일반적인 프로덕션 이전 환경에 자동으로 적용됩니다. 마스킹 모드를 변경하려면 **Live Debugger Redaction Write** 권한이 필요합니다.

## 식별자 기반 마스킹 {#redact-based-on-identifiers}

### 기본 동작 {#default-behavior}

Live Debugger는 캡처된 데이터가 호스트를 떠나기 전에 `password` 및 `accessToken`과 같은 민감한 식별자에 연결된 값을 자동으로 마스킹합니다. 각 SDK에는 언어별 추가 마스킹 규칙이 기본 제공됩니다. [마스킹된 식별자][1]를 참조하세요.

### 사용자 지정 식별자 마스킹 {#custom-identifier-redaction}

추가 식별자를 지정하여 마스킹을 더욱 세밀하게 조정할 수 있습니다. 애플리케이션 환경(`datadog-agent`이 아님)에서 `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` 환경 변수를 `firstName,lastName,phoneNumber`과 같은 쉼표로 구분된 식별자 목록으로 설정하세요.

기본 마스킹 목록에서 특정 식별자를 제외하려면 `DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS` 환경 변수를 `cookie,sessionid`와 같이 마스킹하지 않을 식별자를 쉼표로 구분한 목록으로 설정하세요.

마스킹은 식별자가 코드에서 어떻게 사용되는지(메서드 인수, 지역 변수, 클래스 속성, 사전 키 등)에 관계없이 일괄적으로 적용됩니다. 관련 값은 사용자의 인프라에서 마스킹되며 Datadog에 업로드되지 않습니다.

## 특정 클래스 또는 유형을 기준으로 마스킹 {#redact-based-on-specific-classes-or-types}

특정 클래스에는 본질적으로 민감한 정보가 포함되어 있을 수 있습니다(예: `UserCredentials` 클래스). 앞서와 마찬가지로 애플리케이션 환경(`datadog-agent`이 아님)에서 `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` 환경 변수를 `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`와 같이 민감한 유형을 쉼표로 구분한 목록으로 설정하세요.

클래스 기반 삭제:

- 목록에 나열된 유형의 변수를 마스킹합니다. 해당 내용은 Datadog에 업로드되지 않습니다.
- 마스킹 대상 클래스 내의 어떤 코드 위치에도 프로브가 설정되지 않도록 합니다.

## Sensitive Data Scanner를 사용하여 변수 값을 기준으로 마스킹 {#redact-based-on-variable-values-with-sensitive-data-scanner}

[Sensitive Data Scanner][3]는 특정 정규 표현식을 기반으로 민감한 정보를 식별 및 삭제합니다.

### Sensitive Data Scanner 규칙 구성 {#configure-sensitive-data-scanner-rules}

[Sensitive Data Scanner 페이지][4]에서 규칙을 생성, 사용자 지정 또는 비활성화하세요. 규칙을 생성할 때 필터를 `source:dd_debugger`로 설정하여 Live Debugger 로그에 적용하세요. 구성 지침은 [Sensitive Data Scanner 문서][3]를 참조하세요.

**참고**: Datadog Sensitive Data Scanner는 정보가 Datadog에 업로드된 _후에_ 마스킹을 수행합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[3]: /ko/security/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[5]: /ko/tracing/live_debugger/
[8]: /ko/tracing/live_debugger/bits-live-debugger/