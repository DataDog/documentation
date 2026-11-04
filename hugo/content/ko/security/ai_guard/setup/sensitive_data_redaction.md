---
further_reading:
- link: /security/ai_guard/setup/
  tag: 설명서
  text: AI Guard 설정하기
- link: /security/ai_guard/setup/sdk/
  tag: 설명서
  text: AI Guard SDK
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: 설명서
  text: 민감한 데이터 스캔 규칙
title: 민감한 데이터 비식별화
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

AI Guard는 Sensitive Data Scanner를 사용하여 AI Guard가 평가하는 메시지에서 개인 식별 정보(PII), 자격 증명, 시크릿과 같은 민감한 데이터를 식별합니다. 일치하는 데이터는 모델로 전송되기 전에 해시 처리되거나, 사용자 지정 텍스트로 대체되거나, 부분적으로 비식별화될 수 있습니다. 각 일치 항목을 레이블 또는 `****`로 대체하려면 **Redact** 작업을 사용하고 해당 값을 대체 텍스트로 입력하세요.

<div class="alert alert-warning">민감한 데이터 비식별화는 수동 SDK 통합에서만 지원됩니다. OpenAI 또는 Anthropic과 같은 자동 계측은 아직 지원되지 않습니다. 이러한 계측은 Sensitive Data Scanner 발견 결과를 보고하지만 애플리케이션이 모델로 보내는 메시지를 비식별화하지는 않습니다. 민감한 데이터를 비식별화하려면 SDK를 직접 호출하고 평가 결과로 반환된 비식별화된 대화를 전달하세요. <a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a>를 참조하세요.</div>

## 지원되는 SDK 버전 {#supported-sdk-versions}

| 언어   | 최소 버전     |
|------------|---------------------|
| Python     | dd-trace-py 4.14.0  |
| JavaScript | dd-trace-js 6.13.0  |
| Java       | 출시 예정         |
| Ruby       | 출시 예정         |

## 설정 {#setup}

민감한 데이터 비식별화를 활성화하려면 AI Guard에 대한 비식별화 규칙을 구성하고 서비스에서 민감한 데이터 스캔을 활성화한 다음 AI Guard가 반환한 대체 항목을 적용하세요.

### 1. 비식별화 규칙 구성 {#1-configure-redaction-rules}

AI Guard용 Sensitive Data Scanner 규칙은 조직 수준에서 구성됩니다. AI Guard에서 비식별화할 데이터와 대체 방법을 선택하려면 다음 단계를 따르세요.

1. {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][1]로 이동합니다.
1. AI Guard 스캔 그룹을 생성하거나 편집하고 탐지하려는 민감한 데이터에 대한 규칙을 활성화합니다.

{{< img src="security/ai_guard/ai_guard_sds_configuration.png" alt="Sensitive Data Scanner 구성 페이지의 AI Guard 탭" style="width:100%;" >}}

{{< ui >}}Action on Match{{< /ui >}}에서 규칙이 민감한 데이터와 일치할 때 수행할 작업을 선택합니다.

{{< img src="security/ai_guard/ai_guard_action_on_match_options.png" alt="Sensitive Data Scanner의 Action on Match 옵션: Hash, Redact, Partially Redact, Mask, No Action" style="width:100%;" >}}

- **Hash**: 일치하는 전체 값을 해시된 토큰으로 영구적으로 대체합니다.
- **Redact**: 일치하는 전체 값을 사용자가 지정한 대체 텍스트로 영구적으로 대체합니다.
- **Partially Redact**: 일치하는 값의 일부만 영구적으로 가립니다.
- **Mask**: Datadog에서 일치하는 값을 숨기지만, 권한이 있는 사용자는 원래 값을 볼 수 있습니다.
- **No Action**: 일치하는 값을 변경하지 않습니다.

모델로 전송되기 전에 민감한 데이터를 특정 값으로 대체하려면 **Redact**를 선택하고 `[sensitive_data]` 또는 `****`와 같은 대체 텍스트를 입력하세요.

{{< img src="security/ai_guard/ai_guard_redact_replacement_text.png" alt="사용자 지정 대체 텍스트 필드와 함께 선택된 Redact 작업" style="width:100%;" >}}

태그는 발견 결과를 분류하지만 일치하는 콘텐츠는 변경하지 않습니다.

<div class="alert alert-info">이 구성은 조직 전체에 적용됩니다. 규칙은 민감한 데이터 스캔이 활성화된 서비스에만 적용됩니다.</div>

### 2. 서비스에서 민감한 데이터 스캔 활성화 {#2-enable-sensitive-data-scanning-for-a-service}

AI Guard에 대한 Sensitive Data Scanner 규칙을 활성화하는 것만으로는 충분하지 않습니다. 규칙을 활성화한 후에는 보호하려는 AI Guard 서비스에서도 민감한 데이터 스캔을 활성화해야 합니다.

1. {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][2]로 이동합니다.
1. 기본 정책 또는 보호하려는 서비스와 환경의 정책을 편집합니다.
1. {{< ui >}}Sensitive data scanning{{< /ui >}}에서 다음 옵션 중 하나를 선택한 다음 정책을 저장합니다.
   - {{< ui >}}Disabled{{< /ui >}}: AI Guard는 요청에서 민감한 데이터를 검색하지 않습니다.
   - {{< ui >}}Scanning{{< /ui >}}: AI Guard는 요청에서 민감한 데이터를 검색하고 AI Guard 스팬에 발견 결과를 보고하지만 메시지는 변경하지 않고 반환합니다.
   - {{< ui >}}Scanning and redacting{{< /ui >}}: AI Guard는 요청에서 민감한 데이터를 검색하고 각 규칙에 대해 구성된 작업에 따라 일치하는 항목을 비식별화합니다.

{{< img src="security/ai_guard/ai_guard_sensitive_data_scanning.png" alt="민감한 데이터 스캔을 위한 Disabled, Scanning, Scanning and redacting 옵션이 포함된 AI Guard 서비스 정책" style="width:100%;" >}}

서비스 정책은 해당 서비스에 대한 전체 Sensitive Data Scanner 구성을 활성화하거나 비활성화합니다. [Sensitive Data Scanner의 AI Guard 구성 페이지][1]에서 탐지하고 비식별화할 데이터를 구성하세요.

{{< ui >}}Scanning and redacting{{< /ui >}}이 활성화되면 AI Guard는 평가된 대화의 마지막 메시지를 비식별화합니다.

<div class="alert alert-info">대화 컨텍스트는 점진적으로 구축되므로 AI Guard는 대화 기록을 다시 스캔하지 않습니다. 애플리케이션의 메시지를 비식별화된 버전으로 대체하는 작업은 SDK 구현에서 처리해야 합니다. <a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a>를 참조하세요.</div>

### 3. SDK를 사용하여 비식별화 대체 항목 적용 {#3-apply-redaction-replacements-with-the-sdk}

SDK가 메시지를 평가할 때 평가 응답에는 구성된 규칙에 의해 변경된 각 값에 대한 완전히 비식별화된 대체 항목과 해당 경로가 포함됩니다. SDK는 이러한 대체 항목을 평가된 대화의 복사본에 적용하고 평가 결과와 함께 반환합니다. 해당 대화를 모델로 전달하고 애플리케이션 상태에 유지하여 민감한 데이터가 애플리케이션 외부로 유출되거나 다음 턴에서 다시 포함되지 않도록 합니다.

AI Guard는 각 평가 호출에서 마지막 메시지만 스캔하며, 이전 메시지는 컨텍스트로 사용합니다. 평가되는 마지막 메시지가 사용자 프롬프트, 어시스턴트 응답, 도구 호출 인수 또는 도구 호출 결과인 경우에도 이에 포함됩니다. 대화의 이전 메시지는 다시 스캔되지 않으므로 결과에는 마지막 메시지만 비식별화된 상태로 전달한 전체 대화가 포함됩니다. 대체 항목을 적용해도 애플리케이션이 소유한 메시지 객체는 수정되지 않습니다.

비식별화된 대화를 가져오는 방법은 SDK 언어에 따라 다릅니다.

- [Python][3]
- [JavaScript][4]
- [Java][5]

탐지 및 보고 기능은 유지하면서 트레이서의 비식별화 기능을 끄려면 애플리케이션 환경에 `DD_AI_GUARD_REDACTION_ENABLED=false`를 설정하세요. 평가는 계속 실행되고 발견 결과도 계속 보고되지만 SDK는 메시지를 변경하지 않고 반환합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[2]: https://app.datadoghq.com/security/ai-guard/settings/services
[3]: /ko/security/ai_guard/setup/sdk/?prog_lang=python#example-apply-sensitive-data-redaction-python
[4]: /ko/security/ai_guard/setup/sdk/?prog_lang=node_js#example-apply-sensitive-data-redaction-node-js
[5]: /ko/security/ai_guard/setup/sdk/?prog_lang=java#example-apply-sensitive-data-redaction-java