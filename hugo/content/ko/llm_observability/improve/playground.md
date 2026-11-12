---
aliases:
- /ko/llm_observability/playground/
description: Agent Observability Playground를 사용하여 연결된 모든 모델 공급자를 대상으로 프롬프트를 대화형으로
  테스트하고 브라우저 기반 인터페이스에서 평가자를 활용해 실험을 실행합니다.
further_reading:
- link: /llm_observability/improve/experiments
  tag: 설명서
  text: Agent Observability 실험
- link: /llm_observability/improve/datasets
  tag: 설명서
  text: 데이터 세트
- link: /llm_observability/improve/experiments/analyzing_results
  tag: 설명서
  text: 실험 결과 분석
title: 플레이그라운드
---
[Playground][1]는 LLM 프롬프트를 테스트하고 평가하기 위한 브라우저 기반 인터페이스입니다. 코드 작성 없이 원하는 입력값으로 연결된 모든 모델 공급자를 대상으로 프롬프트를 테스트하거나, 데이터 세트를 로드하고 평가자를 연결하여 결과를 미리 본 후 구성을 재현 가능한 실험으로 저장할 수 있습니다.

Playground는 다음 두 가지 흐름을 지원합니다.
- **[임의의 입력으로 프롬프트 테스트](#test-a-prompt-with-arbitrary-input)**: 사용자 지정 입력값으로 프롬프트 하나를 전송하고 모델 응답을 확인합니다.
- **[Playground에서 실험 실행](#run-an-experiment-from-the-playground)**: 데이터 세트 전체에서 프롬프트를 실행하고 평가자를 사용하여 각 행의 점수를 산정한 다음 결과를 [실험][2]으로 저장합니다.

## 전제 조건 {#prerequisites}

Playground를 사용하기 전에 [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][3]에서 하나 이상의 모델 공급자 통합을 연결합니다.

지원되는 공급자:
- OpenAI
- Anthropic
- Azure OpenAI
- Amazon Bedrock
- Vertex AI
- Custom Provider

## 임의의 입력으로 프롬프트 테스트 {#test-a-prompt-with-arbitrary-input}

{{< img src="llm_observability/playground/playground-arbitrary-input.png" alt="{{category}} 및 {{approach}} 변수 자리표시자가 포함된 사용자 메시지와 출력 패널의 모델 응답이 표시된 Agent Observability Playground" style="width:100%;" >}}

Prompts 모드를 사용하여 고정된 입력값 집합으로 프롬프트를 반복합니다.

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Playground{{< /ui >}}][1]로 이동합니다.
1. 메시지 편집기에 시스템 및 사용자 프롬프트를 작성합니다. 입력을 파라미터화하려면 메시지에 `{{variable_name}}`을 사용합니다.
1. 상단 표시줄을 사용하여 {{< ui >}}Model configuration{{< /ui >}} 패널을 엽니다.
1. 구성 패널에서 {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Account{{< /ui >}} 및 {{< ui >}}Model{{< /ui >}}을 선택합니다.
1. (필요시) {{< ui >}}Edit Response Structure{{< /ui >}}를 클릭하여 모델에 구조화된 출력을 요청합니다.
1. (필요시) {{< ui >}}Model Parameters{{< /ui >}}를 클릭하여 모델의 파라미터를 지정합니다.
1. (필요시) {{< ui >}}Tools{{< /ui >}} 옆의 {{< ui >}}Add New{{< /ui >}}를 클릭하여 JSON 함수 스키마 형식의 도구 정의를 추가합니다. 제공된 예시(날씨, 웹 검색, 이메일, 주가)를 출발점으로 활용합니다.
1. {{< ui >}}Variables{{< /ui >}} 섹션에서 각 변수의 값을 입력하여 사용자 및 시스템 프롬프트에 정의한 파라미터를 대체할 수 있습니다.
1. {{< ui >}}Done{{< /ui >}}을 클릭하여 구성을 저장하고 모달을 닫습니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭하여 프롬프트를 전송하고 모델 응답을 확인합니다.

메시지, 변수 값 또는 모델 설정을 수정한 다음 {{< ui >}}Run{{< /ui >}}을 다시 클릭하여 반복합니다.

## Playground에서 실험 실행 {#run-an-experiment-from-the-playground}

{{< img src="llm_observability/playground/playground-experiment-preview.png" alt="모든 단계가 완료되고 Save and Run as experiment가 활성화된 실험 모드의 Agent Observability Playground Experiment Preview 표에 OUTPUT, EVAL_EXPECTED_OUTPUT, INPUT, EXPECTEDOUTPUT 열과 각 행의 PASS 및 FAIL 배지, '20개 레코드 중 6개 통과'라는 요약 배너가 표시됩니다." style="width:100%;" >}}

Experiments 모드를 사용하여 데이터 세트 전체에서 프롬프트를 테스트하고 평가자를 사용하여 결과에 점수를 매긴 다음 구성을 재현 가능한 실험으로 저장합니다.

### 프롬프트 구성 {#configure-your-prompt}

프롬프트를 작성할 때 데이터 세트 값이 대체될 '{{variable_name}}' 자리 표시자를 사용하세요. 점 표기법을 사용하여 중첩된 데이터 세트 필드를 참조하면 됩니다. 예를 들어, '{{input.question}}'을 사용하여 레코드의 입력 섹션에 있는 'question'이라는 필드를 참조할 수 있습니다.

### 1. 데이터 세트 추가 {#1-add-a-dataset}

프로젝트에서 데이터 세트를 선택합니다. 데이터 세트는 Playground에서 프롬프트를 실행할 대상 레코드를 제공합니다.

데이터 세트를 생성하려면 [데이터 세트][4]를 참조하세요.

### 2. 변수 추가 {#2-add-variables}

데이터 세트 열을 프롬프트에서 사용할 수 있는 다음 섹션에 매핑합니다.

| 섹션 | 설명 |
|---------|-------------|
| {{< ui >}}Input{{< /ui >}} | 각 레코드의 입력 섹션에 있는 열로, '{{input.*}}' 변수를 채우는 데 사용됩니다. 입력 값이 JSON 객체인 경우 최상위 키가 개별 변수로 노출됩니다(예: '{{input.question}}' 및 '{{input.category}}`). 입력 값이 일반 문자열 또는 숫자인 경우 전체 필드를 '{{input}}'으로 사용할 수 있습니다. |
| {{< ui >}}Expected Output{{< /ui >}} | 평가자가 모델 출력에 점수를 매기는 데 사용되는 정답 값입니다. 값이 JSON 객체인 경우 최상위 키가 개별적으로 노출됩니다(예: '{{expected_output.answer}}'). 일반 값의 경우 '{{expected_output}}'으로 사용할 수 있습니다. |
| {{< ui >}}Metadata{{< /ui >}} | 추가적인 컨텍스트 열입니다. JSON 객체의 최상위 키는 '{{metadata.*}}' 변수로 사용할 수 있습니다. |

{{< ui >}}Use this dataset{{< /ui >}}를 클릭하여 미리 보기 단계로 진행합니다.

<div class="alert alert-warning">변수가 데이터 세트에 존재하지 않는 경로를 참조하는 경우(예: <code>{{question}}</code> , <code>{{input.question}}</code>아님) 모델은 템플릿 문자열을 그대로 받습니다. 프롬프트로 돌아가 위 표에 표시된 열과 일치하도록 변수 경로를 수정합니다.</div>

### 3. 평가자 추가 {#3-add-evaluators}

평가자는 미리 보기 실행 후 각 행을 평가합니다. 도구 모음에서 {{< ui >}}Add Evaluators{{< /ui >}}를 클릭하여 평가자 구성 모달을 엽니다.

Playground는 {{< ui >}}String Check{{< /ui >}} 평가자를 지원합니다. 한 번의 실행으로 출력의 여러 측면을 평가하려면 평가자를 여러 개 추가합니다.

{{% collapse-content title="문자열 검사 평가자 옵션" level="h4" expanded=false %}}

| 필드 | 설명 |
|-------|-------------|
| {{< ui >}}Operator{{< /ui >}} | 적용할 비교 방식: `equals`, `not equals` 또는 `contains` |
| {{< ui >}}Case sensitive{{< /ui >}} | 활성화하면 비교 시 대소문자를 구분합니다. |
| {{< ui >}}Strip whitespace{{< /ui >}} | 활성화하면 비교하기 전에 앞뒤 공백이 제거됩니다. |
| {{< ui >}}Left operand{{< /ui >}} | 평가 대상 값으로, 기본값은 모델 출력(`output`)입니다. |
| {{< ui >}}Right operand{{< /ui >}} | 비교 기준 값으로, 기본값은 예상 출력입니다. 중첩 필드에 대한 점 표기법을 지원합니다. |
| {{< ui >}}Name{{< /ui >}} | 결과 표의 열 제목으로 표시되는 별칭입니다. |

{{% /collapse-content %}}

### 4. 미리 보기 실행 {#4-run-a-preview}

{{< ui >}}Run Preview{{< /ui >}}를 클릭하여 데이터 세트의 레코드 최대 20개에 대해 프롬프트를 실행합니다.

미리 보기가 완료되면 다음을 확인합니다.
- 각 행에는 각 평가자에 대한 {{< ui >}}PASS{{< /ui >}} 또는 {{< ui >}}FAIL{{< /ui >}} 배지가 표시됩니다.
- 열 머리글에는 통과 및 실패 건수의 합계가 표시됩니다.
- 요약 배너에 전체 결과가 표시됩니다.

{{< ui >}}FAIL{{< /ui >}} 배지를 클릭하면 실제 출력, 연산자, 예상 값 및 컨텍스트 힌트가 표시되는 팝오버가 열립니다. 예를 들어, 출력에 예상 값이 부분 문자열로 포함되어 있어 `equals` 검사가 실패한 경우 팝오버에서 `contains`로 전환하도록 제안합니다.

### 프롬프트 및 평가자 구성 반복 {#iterate-on-prompt-and-evaluator-configuration}

{{< img src="llm_observability/playground/playground-stale-preview.png" alt="프롬프트 수정 후 미리 보기 결과가 최신 상태가 아닌 것으로 표시된 Agent Observability Playground입니다. 'Prompt or settings changed since the last preview. Run the preview again before running the full dataset.'라는 경고 배너와 함께 'Re-run Preview' 버튼이 표시되었습니다. 결과 표에는 이전 실행의 PASS 및 FAIL 배지가 표시됩니다." style="width:100%;" >}}

결과를 검토한 후 점수를 개선할 수 있도록 프롬프트나 평가자 구성을 수정합니다. 수정 사항이 발생하면 미리 보기 결과가 최신 상태가 아닌 것으로 표시됩니다. 업데이트된 구성으로 다시 실행하려면 {{< ui >}}Re-run Preview{{< /ui >}}를 클릭합니다.

일반적인 반복 패턴:
- 대부분의 행이 `equals`에서 실패하는 경우, `contains` 또는 대소문자를 구분하지 않는 비교 방식이 작업에 더 적합한지 확인합니다.
- 변수 값이 출력에 문자열 그대로 표시되는 경우(예: `{{input.question}}`), 프롬프트에서 변수 경로를 수정합니다.
- 프롬프트 문구를 조정하고 다시 실행하여 통과율에 미치는 영향을 확인합니다.

### 5. 실험 저장 {#5-save-the-experiment}

미리 보기 결과가 기대에 부합하면 상단 도구 모음에서 {{< ui >}}Save & Run as experiment{{< /ui >}}를 클릭하여 전체 데이터 세트에 대해 실행합니다.

대화 상자에서 다음 단계를 따르세요.

1. {{< ui >}}Experiment name{{< /ui >}}을 입력합니다.
1. {{< ui >}}Project{{< /ui >}}를 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

실험은 미리 보기 샘플의 레코드 20개뿐만 아니라 데이터 세트의 모든 레코드에 대해 실행됩니다. 완료되면 [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}}][2]에서 결과를 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/playground
[2]: https://app.datadoghq.com/llm/testing/experiments
[3]: https://app.datadoghq.com/llm/settings/integrations
[4]: /ko/llm_observability/improve/datasets