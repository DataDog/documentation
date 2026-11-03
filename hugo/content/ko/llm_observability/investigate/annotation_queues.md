---
aliases:
- /ko/llm_observability/evaluations/annotation_queues/
description: LLM 트레이스에 대한 체계적인 인간 검토를 활성화하여 실패 모드를 식별하고, 자동화된 평가를 검증하며, 골든 데이터세트를
  구축하세요.
further_reading:
- link: /llm_observability/investigate/evaluations/
  tag: 설명서
  text: 평가 유형에 대해 알아보기
- link: /llm_observability/configure/automation_rules
  tag: 설명서
  text: 자동화 규칙을 사용하여 트레이스를 대기열로 자동 라우팅
- link: /llm_observability/improve/experiments
  tag: 설명서
  text: 실험으로 개선 사항 테스트
- link: https://www.datadoghq.com/blog/automations-annotation-queues
  tag: 블로그
  text: Datadog LLM Observability를 사용하여 트레이스에 주석을 달아 LLM 품질 개선하기
- link: /api/latest/agent-observability/
  tag: API
  text: Agent Observability API 참조
title: 주석 대기열
---
## 개요 {#overview}

주석 대기열은 LLM 트레이스에 대한 인간 검토를 위한 구조화된 워크플로를 제공합니다. 주석 대기열을 사용하여 다음을 수행할 수 있습니다.
- 스팬, 메타데이터, 도구 호출, 입력, 출력 및 평가 결과를 포함한 전체 컨텍스트로 트레이스를 검토합니다.
- 트레이스에 구조화된 레이블 및 자유 형식 관찰을 적용합니다.
- 실패 패턴을 식별하고 분류합니다.
- LLM-as-a-Judge 평가 정확도를 검증합니다.
- 테스트 및 검증을 위해 사람이 검증한 레이블이 포함된 골든 데이터세트를 구축합니다.


## 주석 대기열 생성 {#creating-an-annotation-queue}

### 1단계: 대기열 설정 구성 {#step-1-configure-queue-settings}

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2]로 이동하여 프로젝트를 선택합니다.
2. {{< ui >}}Create Queue{{< /ui >}}를 클릭합니다.
3. {{< ui >}}About{{< /ui >}} 탭에서 다음을 구성합니다.
   - {{< ui >}}Name{{< /ui >}}: 대기열의 목적을 반영하는 설명이 포함된 이름(예: '실패한 평가 검토 - 2026년 1분기')
   - {{< ui >}}Project{{< /ui >}}: 이 대기열이 속한 Agent Observability 프로젝트
   - {{< ui >}}Description{{< /ui >}} (선택 사항): 대기열의 목적과 주석 작성자를 위한 특별 지침 설명

4. 그런 다음 {{< ui >}}Next{{< /ui >}}를 클릭합니다.
5. {{< ui >}}Schema{{< /ui >}} 탭에서 새 대기열의 레이블 스키마를 정의합니다. 미리 보기 창을 사용하여 레이블을 구성할 때 주석 작성자에게 어떻게 표시되는지 확인합니다. 각 레이블은 필수 항목으로 표시할 수 있으며 필요시 다음을 포함할 수 있습니다.
   - {{< ui >}}Assessment criteria{{< /ui >}}: 주석 작성자가 해당 레이블 값에 대해 Pass/Fail을 표시할 수 있도록 허용합니다.
   - {{< ui >}}Reasoning{{< /ui >}}: 주석 작성자가 짧은 설명을 추가할 수 있도록 허용합니다.
6. 대기열 구성을 검토하고 {{< ui >}}Create{{< /ui >}}를 클릭하여 대기열을 생성합니다.

   {{< img src="llm_observability/evaluations/annotation_queues/schema_edit.png" alt="왼쪽에는 레이블 구성이, 오른쪽에는 미리 보기 창이 있는 스키마 탭을 보여주는 대기열 편집 모달입니다. 왼쪽 패널에는 failure_type이라는 범주형 레이블을 구성하기 위한 필드가 표시되며 hallucination, formatting_error, refusal이라는 세 가지 카테고리가 있습니다. 확인란을 사용하여 평가 기준 및 추론 옵션을 활성화할 수 있습니다. 오른쪽 미리 보기 창에는 각 카테고리에 대한 확인란, Pass/Fail 평가 버튼, 추론 텍스트 필드가 포함된 레이블이 주석 작성자에게 어떻게 표시되는지 보여줍니다." style="width:100%;" >}}

### 2단계: 주석을 달 트레이스 선택 {#step-2-select-traces-for-annotation}

Trace Explorer에서 수동으로 대기열에 트레이스를 추가하거나 자동화 규칙을 사용하여 대기열을 자동으로 채울 수 있습니다.

{{< tabs >}}

{{% tab "Trace Explorer에서 수동으로" %}}
Trace Explorer에서 수동으로 대기열에 트레이스를 추가합니다.
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1]로 이동합니다.
2. 사용 가능한 패싯(평가 결과, 오류 상태, 애플리케이션, 시간 범위)을 사용하여 트레이스를 필터링합니다.
3. 개별 트레이스를 선택하거나 여러 트레이스를 일괄 선택합니다.
4. {{< ui >}}Flag for Annotation{{< /ui >}}을 클릭합니다.
5. {{< ui >}}Create New Queue{{< /ui >}}를 선택하거나 기존 대기열을 선택합니다.

[1]: https://app.datadoghq.com/llm/traces
{{% /tab %}}

{{% tab "자동화 규칙 사용" %}}
트레이스를 수동으로 선택하는 대신 자동화 규칙을 사용하여 필터링 및 샘플링 기준에 따라 트레이스를 주석 대기열로 자동으로 라우팅합니다. 이를 통해 수동 트레이스 선택 없이 지속적이고 자동화된 대기열 채우기가 가능합니다. 지원되는 필터 필드 및 제한을 포함한 전체 기능 참조는 [자동화 규칙][5]을 참조하세요.

<div class="alert alert-info">자동화는 향후에 적용됩니다. 규칙과 일치하는 새 트레이스는 도착하는 대로 대기열로 라우팅됩니다. 필터와 일치하는 기존 트레이스는 소급하여 추가되지 않습니다.</div>

자동화 규칙에 주석 대기열 액션을 추가하려면 다음 단계를 따르세요.
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][1]로 이동합니다.
2. 필터를 적용하여 라우팅할 트레이스(평가 실패, 지연 시간 임계값, 특정 애플리케이션)를 식별합니다. 허용되는 항목은 [Automation Rules > Supported filter fields][6]를 참조하세요.
3. {{< ui >}}Automate Query{{< /ui >}}를 클릭합니다.
4. 샘플링 비율을 구성합니다(주석 대기열의 경우 최대 5%, 예: 일치하는 트레이스의 2%).
5. {{< ui >}}Actions{{< /ui >}} 아래에서 {{< ui >}}Add to Annotation Queue{{< /ui >}}를 선택합니다.
6. 대상 대기열을 선택합니다.
7. 규칙을 저장합니다.

규칙의 필터와 일치하는 트레이스는 도착하는 대로 대기열에 추가됩니다. 주석 대기열은 최대 1,000개의 레코드를 보관하며, 대기열이 해당 제한에 도달하면 자동화가 일시 중지됩니다.

[1]: https://app.datadoghq.com/llm/traces
[5]: /ko/llm_observability/configure/automation_rules/
[6]: /ko/llm_observability/configure/automation_rules/#supported-filter-fields
{{% /tab %}}
{{< /tabs >}}


## 트레이스에 주석 달기 {#annotating-traces}

### 대기열 액세스 {#accessing-your-queues}

[{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2]로 이동하여 사용 가능한 모든 주석 대기열을 확인합니다. 대기열을 클릭하여 트레이스 목록을 확인한 다음 {{< ui >}}Review{{< /ui >}}를 클릭하여 주석 달기를 시작합니다.

**참고**: 주석 작업이 새로 할당되면 Datadog은 대기열 이름, 할당한 사용자, 그리고 할당된 상호 작용을 여는 직접 링크가 포함된 이메일을 보냅니다. 수신을 거부하려면 [개인 설정 이메일 구독][15]에서 Agent Observability 주석 할당 이메일을 비활성화하세요.

검토 모드 표시 항목:
- {{< ui >}}Full trace context{{< /ui >}}(오른쪽 패널):
  - 입력, 출력, 메타데이터가 포함된 전체 스팬 트리
  - 도구 호출 및 중간 추론 단계
  - 트레이스 및 개별 스팬에 대한 평가 결과

- {{< ui >}}Annotation controls{{< /ui >}}(왼쪽 패널):
  - 이 대기열에 대해 구성된 레이블
  - 대기열 내 위치를 보여주는 진행률 표시기
  - 탐색 컨트롤(이전, 다음)
  
   {{< img src="llm_observability/evaluations/annotation_queues/review.png" alt="왼쪽에는 주석 패널이, 오른쪽에는 트레이스 세부 정보가 표시되는 주석 검토 인터페이스입니다. 왼쪽 패널에는 hallucination, formatting_error, refusal에 대한 failure_type 확인란을 포함한 레이블 컨트롤과 Pass/Fail 버튼이 있는 requires_escalation 평가, 하단의 Save 버튼이 표시됩니다. 오른쪽 패널에는 스팬 트리, 평가 결과, 날씨 정보 쿼리에 대한 JSON 형식 데이터를 표시하는 입력 및 출력용 확장 가능한 섹션이 포함된 citizen_agent의 트레이스 세부 정보가 표시됩니다." style="width:100%;" >}}

### 레이블 적용 {#applying-labels}

각 트레이스에 대해 다음을 수행하세요.
1. **전체 트레이스 컨텍스트 검토**: 입력, 출력, 도구 호출 및 평가 결과를 이해하기 위해 필요에 따라 스팬을 확장합니다.
2. **레이블 적용**: 평가를 기반으로 구성된 레이블을 입력합니다.
3. 주석은 자동으로 저장됩니다.
    
### 주석 달기 모범 사례 {#best-practices-for-annotation}

**일관성 유지하기**:
- 시작하기 전에 대기열 설명과 레이블 정의를 검토합니다.
- 여러 주석 작성자가 동일한 대기열에서 작업할 때는 기준에 대한 공통된 이해를 확립합니다.
- 애매한 사례의 경우 메모에 근거를 기록합니다.

**근거 제공하기**:
- 자유 형식 메모를 사용하여 특정 레이블을 적용한 이유를 기록합니다.
- 여러 트레이스에서 관찰되는 패턴을 기록합니다.
- 근거는 평가 기준을 개선하고 실패 모드를 이해하는 데 도움이 됩니다.

## 대기열 관리 {#managing-queues}

### 대기열 진행 상황 추적 {#tracking-queue-progress}

주석 목록 페이지에는 각 대기열에 대한 진행률 표시줄이 표시되며, 전체 상호 작용 대비 검토된 상호 작용의 비율을 보여줍니다. 이를 사용하여 대기열 전반의 주석 완료 상태를 한눈에 모니터링할 수 있습니다.

### 대기열 액세스 관리 {#managing-queue-access}

대기열 소유자는 대기열 세부 정보에서 검토자 목록, 액세스 설정 및 할당을 관리합니다. 대기열 소유자만 검토자 목록, 액세스 설정 또는 할당을 변경할 수 있습니다.

액세스 제한은 독립적으로 적용되므로, 한 가지 제한을 활성화하거나 둘 다 활성화할 수 있습니다.
- 검토자 제한은 할당되지 않은 상호 작용을 지정된 검토자로 제한합니다.
- 담당자 제한은 할당된 상호 작용을 해당 담당자로 제한합니다.
- 두 제한이 모두 활성화되면 검토자는 할당되지 않은 상호 작용에 주석을 달 수 있고, 담당자는 자신에게 할당된 상호 작용에 주석을 달 수 있습니다.

대기열 소유자는 액세스 권한을 유지하며 모든 상호 작용에 주석을 달 수 있습니다.

### 주석 레이블별 트레이스 필터링 {#filtering-traces-by-annotation-labels}

{{< ui >}}Annotation Labels{{< /ui >}} 패싯을 사용하여 주석 대기열에 적용된 레이블별로 트레이스를 필터링합니다. 이를 통해 다음을 수행할 수 있습니다.
- 특정 실패 모드(예: `failure_type: hallucination`)로 태그가 지정된 모든 트레이스를 찾습니다.
- 다운스트림 검토, 데이터세트 생성 또는 데이터 분석을 위한 CSV 내보내기를 위해 타겟 샘플을 생성합니다.
  
### 대기열 스키마 편집 {#editing-queue-schema}

생성 후 대기열의 레이블 스키마를 수정할 수 있습니다.
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2]로 이동합니다.
2. 대기열을 엽니다.
3. 세부 정보 패널이 숨겨져 있으면 {{< ui >}}View Details{{< /ui >}}를 클릭합니다.
4. {{< ui >}}Edit{{< /ui >}}을 클릭합니다.
5. 레이블을 추가, 제거 또는 수정합니다.
6. {{< ui >}}Save Changes{{< /ui >}}를 클릭합니다.

<div class="alert alert-info">스키마를 변경해도 이미 적용된 레이블에는 영향을 주지 않지만, 주석 작성자는 이후부터 업데이트된 스키마를 보게 됩니다.</div>

### 주석이 달린 데이터 내보내기 {#exporting-annotated-data}

분석 또는 다른 워크플로에서 사용하기 위해 주석이 달린 트레이스를 내보냅니다.

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2]로 이동합니다.
2. 대기열을 엽니다.
3. 트레이스를 선택(또는 모두 선택)합니다.
4. {{< ui >}}Export{{< /ui >}}를 클릭합니다.

파일은 `annotations_<queue-id>.csv`로 다운로드됩니다. [내보내기 API][5]를 사용하여 프로그래밍 방식으로 스팬 데이터를 검색할 수도 있습니다.

{{% collapse-content title="CSV 형식" level="h4" expanded=false id="csv-format" %}}

각 행은 하나의 주석이 달린 상호 작용을 나타냅니다. 파일은 다음 고정 열로 시작합니다.

| 열 | 설명 |
|--------|-------------|
| `Content ID` | 주석이 달린 콘텐츠의 ID(예: 트레이스 ID 또는 세션 ID) |
| `Type` | 상호 작용 유형: `trace`, `experiment_trace` 또는 `session` |
| `Input` | 입력 요약(세션 상호 작용의 경우 비어 있음) |
| `Output` | 출력 요약(세션 상호 작용의 경우 비어 있음) |
| `Expected Output` | 이 활성화된 경우에만 {{< ui >}}Include Expected Output{{< /ui >}}표시되며, 실험 트레이스에 대해서만 채워집니다. |

고정 열 뒤에는 검토자별 및 레이블별로 한 세트의 열이 있습니다. 검토자는 표시 이름(공백은 밑줄로 대체됨)을 기준으로 알파벳순으로 정렬됩니다. 레이블은 대기열 스키마에 정의된 순서를 따릅니다.

| 열 | 설명 |
|--------|-------------|
| `{reviewer}_{label}` | 레이블 값(문자열, 숫자, 불리언 또는 JSON 배열) |
| `{reviewer}_{label}_assessment` | `pass` 또는 `fail`(해당 레이블에 평가 기준이 활성화된 경우) |
| `{reviewer}_{label}_reasoning` | 자유 텍스트 추론(해당 레이블에 추론이 활성화된 경우) |

검토자가 특정 행에 주석을 달지 않은 경우 해당 셀은 비어 있습니다.

**예**: 검토자 Alice Johnson 및 Bob Smith와 레이블 `quality`(점수) 및 `failure_type`(범주형)가 있는 대기열은 다음과 같은 열 헤더를 생성합니다.

```
Content ID,Type,Input,Output,Alice_Johnson_quality,Alice_Johnson_quality_assessment,Alice_Johnson_quality_reasoning,Alice_Johnson_failure_type,Alice_Johnson_failure_type_assessment,Alice_Johnson_failure_type_reasoning,Bob_Smith_quality,...
```

{{% /collapse-content %}}

#### 트레이스 ID 또는 세션 ID로 스팬 검색 {#retrieve-spans-by-trace-id-or-session-id}

주석이 달린 데이터를 내보낸 후, [내보내기 API][5]를 사용하여 CSV에 있는 트레이스 또는 세션의 전체 스팬 데이터를 검색하고 이를 주석 레이블과 결합합니다.

**트레이스 ID 기준**:

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[trace_id]=<TRACE_ID>"
{{< /code-block >}}

**세션 ID 기준**:

{{< code-block lang="bash" >}}
curl -G "https://api.datadoghq.com/api/v2/llm-obs/v1/spans/events" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
  --data-urlencode "filter[query]=@session_id:<SESSION_ID>"
{{< /code-block >}}

### 데이터세트에 추가 {#adding-to-datasets}

실험 평가를 위해 주석이 달린 트레이스를 데이터세트로 전송합니다.

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2]로 이동합니다.
2. 대기열을 엽니다.
3. 전송할 트레이스를 선택합니다.
4. {{< ui >}}Add to Dataset{{< /ui >}}를 클릭합니다.
5. 데이터세트의 {{< ui >}}expected output{{< /ui >}}을 설정합니다.
   - {{< ui >}}From interaction{{< /ui >}}: 각 트레이스의 실제 출력을 사용합니다. 실험 트레이스의 경우, {{< ui >}}Expected output{{< /ui >}}을 선택하여 실험 소스 데이터세트의 원래 예상 출력을 사용할 수도 있습니다.
   - {{< ui >}}From annotation label{{< /ui >}}: 주석 작성자가 적용한 값을 사용합니다. 하나 이상의 레이블을 선택합니다. 레코드의 `expected_output`은 선택한 레이블을 기반으로 생성됩니다.
6. 기존 데이터세트를 선택하거나 데이터세트를 생성합니다.

**예상 출력** 주석 레이블을 기반으로 생성될 때, 내보낸 값은 레이블 이름을 키로 하는 JSON 객체입니다(예: `{ "is_harmful": false, "tone": ["neutral"], "topics": ["safety", "policy"] }`). 하나의 레이블을 선택하든 여러 레이블을 선택하든 동일한 형태가 적용됩니다. 범주형 레이블은 단일 선택이든 다중 선택이든 관계없이 항상 선택된 옵션의 배열로 내보내집니다.

{{% collapse-content title="주석 작성자 간 주석 태그 값이 집계되는 방식" level="h4" expanded=false id="annotation-aggregation" %}}

여러 주석 작성자가 동일한 트레이스에 주석을 단 경우, 각 레이블의 값은 합의를 통해 집계됩니다.

| 레이블 유형   | 집계                                                                |
| ------------ | -------------------------------------------------------------------------- |
| 불리언      | 다수결(동점 시 `true`에 유리하게 결정)                              |
| 범주형  | 교집합: 모든 주석 작성자가 선택한 옵션의 정렬된 집합      |
| 점수        | 평균                                                                    |
| 텍스트         | 응답 목록                                                          |

범주형 레이블(단일 선택 또는 다중 선택)의 경우, 집계된 값은 *모든* 주석 작성자가 선택한 옵션의 정렬된 배열입니다. 주석 작성자의 선택이 하나라도 다르면 값은 빈 배열입니다. 한 명의 주석 작성자만 트레이스에 주석을 단 경우에도 결과는 항상 배열입니다.

**예시: 범주형(합의).** 세 명의 주석 작성자가 `tone`을 평가하고 모두 동의합니다.

- 주석 작성자 A: `polite`
- 주석 작성자 B: `polite`
- 주석 작성자 C: `polite`

집계 결과: `["polite"]`.

**예시: 범주형(불일치).** 세 명의 주석 작성자가 `tone`을 평가했는데 한 명의 의견이 다릅니다.

- 주석 작성자 A: `polite`
- 주석 작성자 B: `rude`
- 주석 작성자 C: `polite`

집계 결과: `[]`. `rude`가 모든 주석 작성자의 집합에 포함되지 않으므로 교집합은 비어 있습니다.

**예시: 범주형(다중 선택).** 세 명의 주석 작성자가 `topics`에 태그를 지정합니다(각자 여러 옵션을 선택할 수 있음).

- 주석 작성자 A: `["safety", "policy"]`
- 주석 작성자 B: `["safety", "billing"]`
- 주석 작성자 C: `["safety", "policy"]`

집계 결과: `["safety"]`. `safety`만 모든 주석 작성자의 집합에 나타납니다. `policy`는 B의 선택에서 누락되었고, `billing`은 A와 C의 선택에서 누락되었습니다.

**예시: 텍스트.** 두 명의 주석 작성자가 메모를 남깁니다.

- 주석 작성자 A: `"Confusing phrasing"`
- 주석 작성자 B: `"Tone too casual"`

집계 결과: `["Confusing phrasing", "Tone too casual"]`. 모든 주석 작성자의 값이 보존됩니다.

주석 작성자별 원시 값은 주석 작성자 ID와 함께 각 레코드의 메타데이터에 보존됩니다. 기본 합의 방식이 워크플로에 맞지 않는 경우, 다른 전략(예: 중앙값, 가중 투표, 검토자 선택)을 사용하여 다시 계산할 수 있습니다.

{{% /collapse-content %}}

예상 출력으로 선택되지 않은 레이블도 각 트레이스에 메타데이터로 포함됩니다.

실험에서 데이터 세트를 사용하는 방법에 대한 자세한 내용은 [데이터세트][3]를 참조하세요.

### 대기열 삭제 {#deleting-queues}

대기열을 삭제하려면 다음 단계를 따르세요.
1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiment{{< /ui >}} > {{< ui >}}Annotations{{< /ui >}}][2]로 이동합니다.
2. 대기열을 엽니다.
3. 세부 정보 패널에서 {{< ui >}}Delete{{< /ui >}}를 클릭합니다.

<div class="alert alert-info">대기열을 삭제하면 대기열과 레이블 연결은 제거되지만, Agent Observability의 기본 트레이스는 삭제되지 않습니다. 트레이스는 Trace Explorer에서 계속 액세스할 수 있습니다.</div>

## API 사용 {#using-the-api}

프로그래밍 방식으로 주석 대기열을 관리할 수 있습니다. [Agent Observability API 참조][4]에서 다음 엔드포인트를 사용할 수 있습니다.

| 엔드포인트 | 설명 |
|----------|-------------|
| [주석 대기열 목록][6] | 조직의 모든 주석 대기열을 나열합니다. |
| [주석 대기열 생성][7] | 주석 대기열을 생성합니다. `name` 및 `project_id`는 필수 항목입니다. 생성 시 레이블을 정의하려면 선택 사항인 `annotation_schema`를 포함하세요. |
| [주석 대기열 업데이트][8] | 대기열의 `name`, `description` 또는 `annotation_schema`를 부분적으로 업데이트합니다. |
| [주석 대기열 삭제][9] | ID별로 주석 대기열을 삭제합니다. |
| [대기열에 상호 작용 추가][10] | 검토를 위해 하나 이상의 트레이스를 주석 대기열에 추가합니다. |
| [대기열에서 상호 작용 삭제][11] | 상호 작용 ID별로 대기열에서 특정 상호 작용을 제거합니다. |
| [주석이 달린 상호 작용 가져오기][12] | 대기열에 대한 모든 상호 작용과 적용된 주석 레이블을 검색합니다. |
| [레이블 스키마 가져오기][13] | 대기열에 대해 구성된 레이블 스키마를 검색합니다. |
| [레이블 스키마 업데이트][14] | 대기열에 대한 레이블 스키마를 생성하거나 교체합니다. |

## 데이터 보존 {#data-retention}


| 데이터              | 보존 기간                                    |
| ----------------- | ----------------------------------------------------|
| 대기열 내 트레이스  | 조직의 트레이스 보존 기간에 따라 제한됨|
| 주석 레이블 | 무기한                                          |


## 예시 워크플로 {#example-workflows}

{{% collapse-content title="오류 분석 및 실패 모드 발견" level="h3" expanded=true id="example-error-analysis-and-failure-mode-discovery" %}}
실패한 트레이스를 검토하여 반복되는 패턴을 식별하고 프로덕션 환경에서 애플리케이션이 실패하는 방식을 분류합니다.

1. Trace Explorer에서 실패한 평가 또는 특정 오류 패턴에 해당하는 트레이스를 필터링합니다.
2. 트레이스를 수동으로 선택하고 주석 대기열에 추가합니다.
3. 주석 작성자가 트레이스를 검토하고 자유 형식 메모로 실패 유형을 문서화합니다.
4. 일반적인 패턴이 나타납니다. 특정 컨텍스트에서 환각이 발생하고, 형식 문제 및 부적절한 거부가 관찰됩니다.
5. 식별된 실패 모드에 대한 범주형 레이블을 생성하고 트레이스를 재코딩합니다.
6. 실패 모드 분포를 사용하여 수정의 우선순위를 지정합니다.

#### 대기열 구성 {#queue-configuration}

- **레이블**: 자유 형식 메모, 범주형 `failure_type` 레이블, Pass/Fail 평가
- **주석 작성자**: 제품 관리자, 엔지니어, 도메인 전문가

{{% /collapse-content %}}

{{% collapse-content title="LLM-as-a-Judge 평가 검증" level="h3" expanded=true id="example-validating-llm-as-a-judge-evaluations" %}}

자동 평가자가 불확실하거나 부정확할 수 있는 트레이스를 찾아, 사람이 정답(ground truth)을 제공하도록 합니다.

1. 평가 결과를 샘플링합니다(모든 결과 또는 특정 점수/임계값).
2. 선택한 트레이스를 주석 대기열에 추가합니다.
3. 주석 작성자가 트레이스를 검토하고 동일한 기준에 대해 사람이 매긴 점수를 제공합니다.
4. 사람이 매긴 레이블과 자동 평가 점수를 비교합니다.
5. 체계적인 불일치를 식별합니다(평가자가 너무 엄격하거나, 너무 관대하거나, 기준을 오해하는 경우).
6. 불일치 사항을 바탕으로 평가 프롬프트를 개선합니다.

#### 대기열 구성 {#queue-configuration-1}

- **레이블**: 평가 기준에 부합하는 숫자 점수(0-10), 범주형 `judge_accuracy` 레이블, 추론 메모
- **주석 작성자**: 평가 기준을 이해하는 주제 전문가

{{% /collapse-content %}}

{{% collapse-content title="골든 데이터세트 생성" level="h3" expanded=true id="example-golden-dataset-creation" %}}

회귀 테스트 및 지속적인 검증을 위해 사람이 검증한 레이블이 포함된 벤치마크 데이터세트를 구축합니다.

1. Trace Explorer에서 다양한 프로덕션 트레이스를 샘플링합니다(좋은 예와 나쁜 예 모두).
2. 주석 대기열에 트레이스를 추가합니다.
3. 주석 작성자가 여러 품질 차원에 걸쳐 트레이스를 검토하고 레이블을 지정합니다.
4. 신뢰도가 높고 레이블이 잘 지정된 예시를 골든 데이터세트에 추가합니다.
5. 프롬프트 변경 사항의 CI/CD 회귀 테스트에 데이터세트를 사용합니다.
6. 새로운 예외 사례로 데이터세트를 지속적으로 확장합니다.

#### 대기열 구성 {#queue-configuration-2}

- **레이블**: 품질 차원, 숫자 점수, Pass/Fail 평가, 메모를 포함하는 다중 범주형 레이블
- **주석 작성자**: 일관성을 위한 도메인 전문가 팀
{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: https://app.datadoghq.com/llm/annotations/queues
[3]: /ko/llm_observability/improve/datasets
[4]: /ko/api/latest/agent-observability/
[5]: /ko/llm_observability/investigate/export_api/?tab=model#api-standards
[6]: /ko/api/latest/agent-observability/#list-agent-observability-annotation-queues
[7]: /ko/api/latest/agent-observability/#create-an-agent-observability-annotation-queue
[8]: /ko/api/latest/agent-observability/#update-an-agent-observability-annotation-queue
[9]: /ko/api/latest/agent-observability/#delete-an-agent-observability-annotation-queue
[10]: /ko/api/latest/agent-observability/#add-annotation-queue-interactions
[11]: /ko/api/latest/agent-observability/#delete-annotation-queue-interactions
[12]: /ko/api/latest/agent-observability/#get-annotated-queue-interactions
[13]: /ko/api/latest/agent-observability/#get-annotation-queue-label-schema
[14]: /ko/api/latest/agent-observability/#update-annotation-queue-label-schema
[15]: /ko/account_management/#email-subscriptions