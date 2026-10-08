---
further_reading:
- link: /security/ai_guard/
  tag: 설명서
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: 설명서
  text: AI Guard 시작하기
title: AI Guard 설정하기
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

AI Guard를 설정하려면 다음 단계를 따르세요.

## 1. 전제 조건 확인 {#1-check-prerequisites}

AI Guard를 설정하기 전에 필요한 항목이 모두 준비되어 있는지 확인하세요.
- AI Guard가 미리 보기로 제공되는 동안에는 미리 보기에 참여하는 각 조직에 대해 Datadog에서 백엔드 기능 플래그를 활성화해야 합니다. 활성화하려면 하나 이상의 Datadog 조직 이름과 리전을 포함하여 [Datadog 지원팀][1]에 문의하세요.
- 특정 설정 단계에는 특정 Datadog 권한이 필요합니다. 관리자가 필요한 권한이 있는 새 역할을 생성하여 사용자에게 할당해야 할 수도 있습니다.
  | 권한                                    | 유형  | 설명                                                                                                                                                                                                     |
  |-----------------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | **AI Guard Evaluate**(`ai_guard_evaluate`)   | 쓰기 | AI Guard Evaluate API를 호출하고 `ai_guard_evaluate` 범위가 있는 애플리케이션 키를 생성하는 데 필요합니다.                                                                                                 |
  | **AI Guard View**(`ai_guard_view`)           | 읽기  | 신호, 스팬 및 읽기 전용 설정(서비스 차단 정책, 평가 민감도, 도구 정책, 도구 허용 목록)을 포함한 AI Guard UI를 조회하는 데 필요합니다. 또한 오탐을 보고하는 데도 필요합니다. |
  | **AI Guard Write**(`ai_guard_write`)         | 쓰기 | 차단 정책, 민감한 데이터 스캔, 도구 정책, 도구 차단, 도구 허용 목록 및 평가 민감도 임계값을 포함한 AI Guard 구성을 수정하는 데 필요합니다.                           |
  | **User Access Manage**(`user_access_manage`) | 쓰기 | Data Access Control을 사용하여 [AI Guard 스팬에 대한 액세스를 제한하는](#limit-access) 제한된 데이터셋을 생성하는 데 필요합니다.                                                                                         |

### 사용량 제한 {#usage-limits}

AI Guard Evaluator API에는 다음 사용량 제한이 적용됩니다.
- 하루에 평가되는 토큰 10억 개
- IP당 분당 요청 12,000개

이 제한을 초과했거나 곧 초과할 것으로 예상되는 경우 [Datadog 지원팀][1]에 문의하여 가능한 해결책을 논의하세요.

## 2. API 및 애플리케이션 키 생성 {#create-keys}

AI Guard를 사용하려면 Agent 서비스에 API 키와 애플리케이션 키를 각각 하나 이상 설정해야 하며, 일반적으로 환경 변수를 사용합니다. [API 및 애플리케이션 키][2]의 지침에 따라 두 키를 모두 생성하세요.

**애플리케이션 키**에 [범위][3]를 추가할 때 `ai_guard_evaluate` 범위도 추가합니다. 애플리케이션 키를 생성하는 사용자는 [AI Guard Evaluate 권한](#1-check-prerequisites)이 있어야 합니다.

## 3. 애플리케이션 계측 {#instrumentation}

프레임워크와 언어에 따라 계측 방식을 선택하세요.

### SDK {#sdk}

[AI Guard SDK][12]는 AI Guard REST API를 호출하고 Datadog에서 활동을 실시간으로 모니터링할 수 있는 언어별 라이브러리(Python, JavaScript, Java, Ruby)를 제공합니다.

### 자동 통합 {#automatic-integrations}

[자동 통합][10]은 지원되는 프레임워크에 기본 제공 AI Guard 보호 기능을 제공합니다. Datadog SDK로 애플리케이션을 실행하면 코드 변경 없이 AI Guard 평가가 자동으로 수행됩니다.

| 언어 | 지원되는 프레임워크         |
|----------|------------------------------|
| Python   | LangChain, OpenAI, Anthropic |
| Node.js  | AI SDK, OpenAI, Anthropic    |
| Ruby     | RubyLLM                      |

### 수동 통합 {#manual-integrations}

[수동 통합][11]은 지원되는 프레임워크에서 AI Guard 보호 기능을 활성화하려면 추가 구성이 필요합니다.

| 언어   | 지원되는 프레임워크           |
|------------|--------------------------------|
| Python     | Amazon Strands, LiteLLM Proxy  |

### HTTP API {#http-api}

[AI Guard HTTP API][13]를 사용하면 SDK가 지원하지 않는 언어나 환경의 경우 모든 HTTP 클라이언트로 AI Guard JSON:API 엔드포인트를 직접 호출할 수 있습니다.

## 4. 사용자 지정 보존 필터 생성 {#retention-filter}

Datadog에서 AI Guard 평가를 조회하려면 AI Guard에서 생성된 스팬에 대한 사용자 지정 [보존 필터][5]를 생성하세요. 링크된 지침에 따라 다음 설정으로 보존 필터를 생성하세요.
- {{< ui >}}Retention query{{< /ui >}}: `resource_name:ai_guard`
- {{< ui >}}Span rate{{< /ui >}}: 100%
- {{< ui >}}Trace rate{{< /ui >}}: 100%

## 5. AI Guard 정책 구성 {#configure-policies}

AI Guard는 평가가 적용되는 방식, 위협 탐지 민감도, 민감 데이터 스캔 활성화 여부를 제어하는 설정을 제공합니다.

### 서비스 정책 구성 {#service-policies}

{{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6] 페이지에서 AI Guard가 안전하지 않은 콘텐츠를 탐지했을 때 취해야 할 작업을 결정하는 정책을 구성할 수 있습니다. 각 정책에 대해 다음을 결정하세요.
- [{{< ui >}}Enforcement mode{{< /ui >}}](#blocking-policy): 모니터링 전용 또는 안전하지 않은 요청 차단
- [{{< ui >}}Sensitive data scanning{{< /ui >}}](#sensitive-data-scanning): AI Guard가 민감 데이터를 스캔하고 비식별화할지 여부
- [{{< ui >}}Evaluation context{{< /ui >}}](#evaluation-context): 오탐을 줄이기 위해 AI Guard가 평가 중에 사용하는 서비스에 대한 추가 정보

{{< ui >}}Default policy{{< /ui >}} 옆에서 {{< ui >}}Edit{{< /ui >}}을 클릭하여 AI Guard의 기본 동작을 설정하세요. 기본 동작을 재정의하려면 {{< ui >}}Add Service Policy{{< /ui >}}를 클릭하고 재정의를 적용할 서비스와 환경을 선택한 다음 보다 구체적인 정책을 구성하세요.

#### 차단 정책 {#blocking-policy}

기본적으로 AI Guard는 대화를 평가하고 작업(`ALLOW`, `DENY` 또는 `ABORT`)을 반환하지만 요청을 차단하지는 않습니다. `DENY` 및 `ABORT` 작업이 안전하지 않은 상호 작용을 실제로 차단하도록 하려면 서비스의 차단 정책을 구성하세요.

다양한 세분화 수준에서 차단을 구성할 수 있으며 더 구체적인 설정이 우선 적용됩니다.
- **조직 전체**: 모든 서비스 및 환경에 기본 차단 정책을 적용합니다.
- **환경별**: 특정 환경에 대해 조직 기본 정책을 재정의합니다.
- **서비스별**: 특정 서비스에 대해 조직 기본 정책을 재정의합니다.
- **서비스 및 환경별**: 특정 환경의 특정 서비스에 대해 위의 모든 설정을 재정의합니다(예: 스테이징이 아닌 프로덕션에서 차단 활성화).

#### 민감 데이터 스캔 {#sensitive-data-scanning}

AI Guard는 LLM 대화에서 이메일 주소, 전화번호, 주민등록번호와 같은 개인 식별 정보(PII)와 API 키 및 토큰과 같은 시크릿을 탐지할 수 있습니다. 서비스에 대한 정책을 생성하거나 편집할 때 민감 데이터 스캔을 {{< ui >}}Disabled{{< /ui >}}, {{< ui >}}Scanning{{< /ui >}} 또는 {{< ui >}}Scanning and redacting{{< /ui >}}으로 설정할 수 있습니다.

스캔이 활성화되면 AI Guard는 사용자 프롬프트, 어시스턴트 응답, 도구 호출 인수 및 도구 호출 결과를 포함하여 각 평가 호출의 마지막 메시지를 스캔합니다. 발견 결과는 확인할 수 있도록 APM 트레이스에 표시됩니다. {{< ui >}}Scanning and redacting{{< /ui >}}을 사용하면 AI Guard는 규칙이 변경하는 각 민감한 값에 대한 대체 항목도 반환합니다. 비식별화는 수동 SDK 통합에서만 지원됩니다. 이를 구성하고 대체 항목을 적용하는 방법은 [Sensitive Data Redaction][20]을 참조하세요.

기본적으로 AI Guard는 AWS 키 및 Datadog API 키와 같은 표준 시크릿 세트를 스캔합니다. AI Guard에서 사용할 [스캔 규칙][14]을 사용자 지정하려면 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][15]로 이동합니다. 여기에서 개별 규칙을 활성화 또는 비활성화하고 AI Guard 평가에만 적용되는 사용자 지정 규칙으로 스캔 그룹을 만들 수 있습니다.

### 특정 도구 차단 {#block-specific-tools}

특정 서비스 및 환경에 대해 특정 도구에 대한 요청을 차단하도록 AI Guard를 구성할 수 있습니다. 그렇게 하려면 {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Tool Blocklist{{< /ui >}}][8]로 이동하세요. {{< ui >}}Add Tool Blocking Configuration{{< /ui >}}을 클릭하고 서비스, 환경 및 도구를 선택한 다음 AI Guard가 기본 서비스 정책을 따를지 아니면 해당 도구에 대한 모든 요청을 차단할지 선택하세요.

### 평가 민감도 {#evaluation-sensitivity}

AI Guard는 탐지된 각 위협 범주(예: 프롬프트 인젝션 또는 탈옥)에 신뢰도 점수를 할당합니다. {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Evaluation Sensitivity{{< /ui >}}][7]로 이동하여 AI Guard가 위협을 플래그 지정하는 데 필요한 최소 신뢰도 점수를 제어할 수 있습니다.

평가 민감도는 0.0에서 1.0 사이의 값이며 기본값은 0.5입니다.
- **낮은** 값에 따른 민감도 **증가**: AI Guard는 신뢰도가 낮을 때도 위협을 플래그 지정하므로 잠재적 공격이 더 많이 드러나지만 오탐도 증가합니다.
- **높은** 값에 따른 민감도 **감소**: AI Guard는 신뢰도가 높을 때만 위협을 플래그 지정하므로 노이즈는 줄어들지만 일부 공격을 놓칠 수 있습니다.

### 평가 컨텍스트 추가 {#evaluation-context}

서비스에 대한 추가 컨텍스트(예: 서비스의 목적 및 처리하는 데이터 유형)를 AI Guard에 제공할 수 있습니다. AI Guard는 평가 중 이 컨텍스트를 사용하여 정상적인 에이전트 동작과 실제 위협을 더 정확하게 구분함으로써 오탐을 줄입니다.

서비스에 평가 컨텍스트를 추가하려면 {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6]로 이동하세요. 기본 정책 옆의 {{< ui >}}Edit{{< /ui >}}을 클릭하거나 서비스 정책을 추가 또는 편집한 다음 {{< ui >}}Evaluation context{{< /ui >}} 필드에 컨텍스트를 입력하세요(최대 1,000자). 예시는 다음과 같습니다.

```text
This is a fintech app. Requests to query account balances or initiate transfers are expected and authorized.
```

[차단 정책](#blocking-policy)과 마찬가지로 평가 컨텍스트에도 동일한 우선순위가 적용되며 조직 전체, 환경별, 서비스별, 서비스 및 환경별 순으로 더 구체적인 설정이 우선합니다.

[AI Guard Playground][19]를 사용하여 서비스에 적용하기 전에 평가 컨텍스트가 평가 결과에 어떤 영향을 미치는지 테스트하세요. Playground에는 테스트 중인 대화에만 적용되는 자체 {{< ui >}}Evaluation Context{{< /ui >}} 필드가 있으므로 서비스 정책을 변경하지 않고도 실험할 수 있습니다. 기존 페이로드를 Playground로 가져온 다음 평가 컨텍스트를 추가하여 평가 결과가 어떻게 변경되는지 확인하세요.

### 시스템 프롬프트로 컨텍스트 추가 {#system-prompt-context}

AI Guard는 위협을 평가할 때 시스템 프롬프트를 포함한 전체 대화를 평가합니다. 에이전트의 목적, 처리하는 데이터 및 사용 권한이 있는 도구에 대한 컨텍스트를 추가하면 AI Guard가 정상적인 작업과 실제 위협을 구분하는 데 도움이 되어 보안 범위를 줄이지 않고도 오탐을 줄일 수 있습니다.

<div class="alert alert-info">애플리케이션 코드를 수정하지 않고 이러한 컨텍스트를 추가하려면 대신 서비스 설정의 <a href="#evaluation-context">Evaluation context</a> 필드를 사용하세요.</div>

#### 포함할 내용 {#what-to-include}

시스템 프롬프트에 다음을 설명하세요.
- **에이전트 목적**: 에이전트의 역할 및 의도된 적용 범위
- **승인된 데이터**: 에이전트가 읽거나 쓰거나 내보낼 것으로 예상되는 데이터 범주
- **승인된 도구**: 에이전트가 호출할 수 있도록 허용된 도구 및 작업

#### 예시 {#example}

컨텍스트가 부족한 시스템 프롬프트는 정상적인 작업에 대해 오탐이 발생할 가능성이 더 높습니다.

```text
You are a helpful assistant.
```

명시적인 컨텍스트가 포함된 시스템 프롬프트는 AI Guard가 의도를 정확하게 평가하는 데 도움이 됩니다.

```
You are a financial data analyst assistant for internal employees. You are authorized to:
- Query internal financial databases (read-only) using the `sql_query` tool.
- Export query results to CSV or PDF using the `file_export` tool.
- Retrieve and summarize internal financial reports.

Do not access external systems or process requests unrelated to financial reporting.
```

이 컨텍스트를 사용하면 AI Guard는 SQL 쿼리와 파일 내보내기를 예상된 승인 작업으로 처리하며 이를 데이터 유출이나 파괴적 도구 호출로 플래그 지정할 가능성이 낮아집니다.

#### 제한 사항 {#limitations}

시스템 프롬프트를 사용하여 AI Guard의 보안 검사를 재정의하거나 AI Guard에 직접 지시하지 마세요. AI Guard는 시스템 프롬프트를 대화 컨텍스트의 일부로 평가하며, 자체 보안 검사를 비활성화하거나 약화하려는 지시는 무시합니다.

## 6. (필요시) AI Guard 스팬에 대한 액세스 제한 {#limit-access}

특정 사용자에 대한 AI Guard 스팬 액세스를 제한하려면 [Data Access Control][9]을 사용할 수 있습니다. 링크된 지침에 따라 `resource_name:ai_guard` 필터가 적용되고 **APM 데이터**로 범위가 지정된 제한된 데이터셋을 만듭니다. 그런 다음 특정 역할이나 팀에 데이터셋에 대한 액세스 권한을 부여할 수 있습니다.

## APM 트레이싱 비활성화 {#disable-apm-tracing}

AI Guard를 활성화한 상태에서 트레이서의 APM 트레이싱을 비활성화하려면 `DD_APM_TRACING_ENABLED=false`를 설정하세요.

{{< code-block lang="bash" >}}
DD_AI_GUARD_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help
[2]: /ko/account_management/api-app-keys/
[3]: /ko/account_management/api-app-keys/#scopes
[4]: /ko/agent/?tab=Host-based
[5]: /ko/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[6]: https://app.datadoghq.com/security/ai-guard/settings/services
[7]: https://app.datadoghq.com/security/ai-guard/settings/evaluation-sensitivity
[8]: https://app.datadoghq.com/security/ai-guard/settings/tools
[9]: https://app.datadoghq.com/organization-settings/data-access-controls/
[10]: /ko/security/ai_guard/setup/automatic_integrations/
[11]: /ko/security/ai_guard/setup/manual_integrations/
[12]: /ko/security/ai_guard/setup/sdk/
[13]: /ko/security/ai_guard/setup/http_api/
[14]: /ko/security/sensitive_data_scanner/scanning_rules/
[15]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[19]: https://app.datadoghq.com/security/ai-guard/playground
[20]: /ko/security/ai_guard/setup/sensitive_data_redaction/