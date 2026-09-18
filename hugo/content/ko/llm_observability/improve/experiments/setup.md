---
aliases:
- /ko/llm_observability/experiments/setup/
description: Agent Observability 실험을 설정하고 실험을 시작하는 방법입니다.
further_reading:
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: 블로그
  text: Datadog Agent Observability를 사용하여 코딩 에이전트에서 AI 앱을 디버깅하고 평가하기
title: 설정 및 사용
---
이 페이지에서는 Python SDK를 사용하여 Agent Observability 실험을 설정하고 사용하는 방법을 설명합니다.

## Agent Observability 설정 {#set-up-agent-observability}

Agent Observability를 아직 설정하지 않은 경우 다음을 수행합니다.

1. Agent Observability Python SDK 설치:

   ```shell
   pip install ddtrace>=4.3.0
   ```

2. Agent Observability 활성화:

   ```python
   from ddtrace.llmobs import LLMObs

   LLMObs.enable(
       api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
       app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
       site="datadoghq.com",      # defaults to DD_SITE environment variable
       project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
   )
   ```

   <div class="alert alert-warning">다음 두 가지를 모두 제공해야 합니다. <code>api_key</code> 및 <code>app_key</code>.</div>

### APM 트레이스 연계 {#apm-trace-correlation}

실험 스팬을 [APM 트레이스][5]와 연계하려면 Datadog Agent를 통해 Agent Observability를 실행하고 `agentless_enabled`를 `False`(기본값)로 유지하세요. Agent는 트레이스 데이터를 APM으로 전달하며, 이를 통해 실험과 APM 트레이스를 연계할 수 있습니다.

   ```python
   LLMObs.enable(
       api_key="<YOUR_API_KEY>",
       app_key="<YOUR_APP_KEY>",
       site="datadoghq.com",
       agentless_enabled=False,  # default — required for APM Trace correlation
       project_name="<YOUR_PROJECT>",
   )
   ```

Agent 없이 실행하는 경우(예: 노트북 또는 CI 환경) `agentless_enabled=True`를 설정할 수 있지만, Agent 없이 실행한 실험 스팬에 대해서는 해당 APM 스팬이 생성되지 않습니다.

## 프로젝트 생성 {#create-a-project}
_프로젝트_는 LLM 실험의 핵심 구성 단위입니다. 모든 데이터 세트와 실험은 프로젝트에 포함됩니다.
`LLMObs.enable`에 아직 존재하지 않는 프로젝트 이름을 지정하여 Datadog 콘솔, API 또는 SDK에서 수동으로 프로젝트를 생성할 수 있습니다.

```python
LLMObs.enable(
    ...
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```

## 데이터 세트 생성 {#create-a-dataset}

_데이터 세트_는 Agent를 테스트하기 위한 시나리오를 구성하는 _입력_, _예상 출력_ 및 _메타데이터_의 모음입니다. 각 데이터 세트는 _프로젝트_와 연결됩니다.  

- **input**(필수): Agent가 작업에서 액세스할 수 있는 모든 정보를 나타냅니다.
- **expected output**(선택 사항): _정답_이라고도 하며, Agent가 출력해야 하는 이상적인 답변을 나타냅니다. _expected output_을 사용하여 앱의 실제 출력과 평가하려는 중간 결과를 저장할 수 있습니다. 
- **metadata**(선택 사항): 레코드를 분류하고 추가 분석에 사용할 수 있는 유용한 정보가 포함됩니다. 예시: 주제, 태그, 설명, 메모

CSV 파일로 데이터세트를 생성하려면 `LLMObs.create_dataset_from_csv()`를 사용하세요.

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# question,category,answer,difficulty
# What is the capital of Japan?,geography,Tokyo,medium
# What is the capital of Brazil?,geography,Brasília,medium

```

데이터 세트를 수동으로 생성하는 방법, 데이터 세트를 검색 및 관리하는 방법, Datadog이 데이터 세트 버전을 유지하는 방법 등 데이터 세트에 대한 자세한 내용은 [데이터 세트][1]을 참조하세요.

## 실험 생성 {#create-an-experiment}
_실험_을 사용하면 데이터 세트의 시나리오를 대상으로 Agent를 실행하고 평가자를 사용하여 예상 출력 대비 성능을 측정함으로써 LLM 애플리케이션을 체계적으로 테스트할 수 있습니다. 그런 다음 서로 다른 앱 구성의 성능을 나란히 비교할 수 있습니다.

- **task**: 평가하려는 핵심 워크플로를 정의합니다. 단일 LLM 호출부터 여러 LLM 호출 및 RAG 단계를 포함하는 보다 복잡한 흐름까지 다양할 수 있습니다. 작업은 데이터 세트의 모든 레코드에 대해 순차적으로 실행됩니다.
- **evaluator**: 각 레코드에서 실행되어 모델 또는 Agent의 성능을 측정하는 함수입니다. 평가자를 사용하면 출력을 예상 출력 또는 원래 입력과 비교할 수 있습니다.  

- **summary evaluators**: 실험의 모든 데이터(입력, 출력, 예상 출력, 평가자 결과)에 대해 실행되는 선택적 함수입니다. 요약 평가자를 사용하면 데이터 세트 전반에서 정밀도, 재현율 및 정확도와 같은 고급 메트릭을 계산할 수 있습니다. 


실험을 생성하려면 다음 단계를 따르세요.


### 1. 데이터 세트를 로드합니다. {#1-load-a-dataset}
   ```python
   from ddtrace.llmobs import LLMObs
   from typing import Dict, Any, Optional, List

   dataset = LLMObs.pull_dataset("capitals-of-the-world")
   ```

### 2. 단일 데이터 세트 레코드를 처리하는 작업 함수를 정의합니다. {#2-define-a-task-function-that-processes-a-single-dataset-record}

   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]
       # Your LLM or processing logic here
       return "Beijing" if "China" in question else "Unknown"
   ```
   작업은 `input_data`로 null이 아닌 모든 데이터 유형(문자열, 숫자, 부울, 객체, 배열)을 사용할 수 있습니다. 평가자에서 사용하는 출력은 데이터 유형에 제한이 없습니다.
   이 예시에서는 문자열을 생성하지만, 중간 처리 정보를 저장하고 평가자에서 비교할 수 있도록 출력으로 dict을 생성할 수도 있습니다.

   선택적으로 작업 함수에 데이터 세트 레코드의 메타데이터를 수신하기 위한 세 번째 `metadata` 매개변수를 추가할 수 있습니다.
   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
       difficulty = metadata.get("difficulty", "unknown") if metadata else "unknown"
       question = input_data["question"]
       return "Beijing" if "China" in question else "Unknown"
   ```

   프로덕션에서 사용하는 [동일한 트레이싱 데코레이터][2]를 사용하여 실험 작업의 다양한 부분(워크플로, 도구 호출 등)을 추적할 수 있습니다.
   [지원되는 프레임워크][3](OpenAI, Amazon Bedrock 등)를 사용하는 경우, Agent Observability가 LLM 프레임워크 및 라이브러리에 대한 호출을 자동으로 추적하고 관련 정보를 추가하여 LLM 애플리케이션에서 발생하는 호출을 기본적으로 관찰할 수 있습니다.

#### 실험에서 OpenTelemetry 스팬 사용

   애플리케이션에서 [OpenTelemetry 계측][6]을 사용하는 경우, 실험 작업 내에서 OTel 스팬을 생성할 수 있습니다. `DD_TRACE_OTEL_ENABLED=1`를 사용하면 ddtrace가 OpenTelemetry TracerProvider로 작동하므로, OTel 스팬이 자동으로 실험 스팬의 하위 스팬으로 표시됩니다.

   ```python
   import json
   from opentelemetry import trace

   tracer = trace.get_tracer(__name__)

   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]

       # OTel gen_ai span — automatically becomes a child of the experiment span
       with tracer.start_as_current_span("my-llm-call") as span:
           span.set_attribute("gen_ai.operation.name", "chat")
           span.set_attribute("gen_ai.system", "openai")
           span.set_attribute("gen_ai.request.model", "gpt-4o")
           span.set_attribute("gen_ai.usage.input_tokens", 25)
           span.set_attribute("gen_ai.usage.output_tokens", 8)
           span.set_attribute(
               "gen_ai.input.messages",
               json.dumps([{"role": "user", "parts": [{"type": "text", "content": question}]}]),
           )

           result = call_my_llm(question)

           span.set_attribute(
               "gen_ai.output.messages",
               json.dumps([{"role": "assistant", "parts": [{"type": "text", "content": result}]}]),
           )

       return result
   ```

   이를 활성화하려면 `DD_TRACE_OTEL_ENABLED` 환경 변수를 설정하세요.

   ```shell
   DD_TRACE_OTEL_ENABLED=1 python my_experiment.py
   ```


### 3. 평가자를 정의합니다. {#3-define-evaluators}

   평가자는 모델이나 Agent가 각 레코드에서 얼마나 잘 수행되는지 측정합니다. 두 가지 방법으로 평가자를 정의할 수 있습니다.

   - **함수 기반**: `input_data`, `output_data` 및 `expected_output`을 별도의 인수로 받는 함수를 정의합니다. 간단한 로직을 사용하는 일회성 평가자에 가장 적합합니다.
   - **클래스 기반**: `BaseEvaluator`를 상속하여 사용자 지정 구성이 가능한 재사용 가능한 평가자로 사용합니다. 클래스 기반 평가자는 전체 스팬 컨텍스트가 포함된 `EvaluatorContext` 객체를 받습니다.

   전체 데이터 모델 참조 및 모범 사례를 포함하여 평가자 구축에 대한 자세한 내용은 [평가 개발자 가이드][4]를 참조하세요.

   Datadog은 다음과 같은 평가자 반환 유형을 지원합니다.
   - **부울**: true 또는 false를 반환합니다.
   - **점수**: 숫자 값(float)을 반환합니다.
   - **범주형**: 레이블이 지정된 범주(string)를 반환합니다.
   - **json**: 구조화된 데이터(dict)를 반환합니다.

   다음과 같이 반환할 수도 있습니다.
   - `EvaluatorResult`를 사용하여 `reasoning`, `assessment`(`"pass"` 또는 `"fail"`), `metadata` 및 `tags`와 같은 더 풍부한 평가 데이터를 수집합니다.
   - `MultiEvaluatorResult`를 사용하여 하나의 평가자 호출에서 이름이 지정된 여러 메트릭을 반환합니다. 자세한 내용과 예시는 [평가 개발자 가이드][4]를 참조하세요.

#### 함수 기반 평가자

   ```python
   def exact_match(input_data: Dict[str, Any], output_data: str, expected_output: str) -> bool:
       return output_data == expected_output

   def overlap(input_data: Dict[str, Any], output_data: str, expected_output: str) -> float:
       expected_output_set = set(expected_output)
       output_set = set(output_data)

       intersection = len(output_set.intersection(expected_output_set))
       union = len(output_set.union(expected_output_set))

       return intersection / union

   def fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> EvaluatorResult:
       fake_llm_call = "excellent"
       return EvaluatorResult(
           value=fake_llm_call,
           reasoning="the model explains itself",
           assessment="pass", # or fail
           tags={"task": "judge_llm_call"},
       )

   # Return multiple metrics from one evaluator call
   from ddtrace.llmobs import MultiEvaluatorResult

   def multi_metric_evaluator(input_data, output_data, expected_output):
       correct = output_data == expected_output
       return MultiEvaluatorResult(
           {
               "correct": EvaluatorResult(value=correct, assessment="pass" if correct else "fail"),
               "length": len(str(output_data)),
           }
       )
       # Emitted as: multi_metric_evaluator-correct, multi_metric_evaluator-length
   ```

#### 클래스 기반 평가자

   ```python
   from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, EvaluatorResult

   class SemanticSimilarityEvaluator(BaseEvaluator):
       def __init__(self, threshold: float = 0.8):
           super().__init__(name="semantic_similarity")
           self.threshold = threshold

       def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
           score = compute_similarity(context.output_data, context.expected_output)
           return EvaluatorResult(
               value=score,
               reasoning=f"Similarity score: {score:.2f}",
               assessment="pass" if score >= self.threshold else "fail",
           )
   ```

### 4. (선택 사항) 요약 평가자를 정의합니다. {#4-optional-define-summary-evaluators}

   요약 평가자는 모든 레코드 수준 평가자가 완료된 후 실행되며, 집계된 결과를 받아 평균 또는 통과율과 같은 데이터 세트 수준의 통계를 계산합니다. 레코드 수준 평가자와 마찬가지로 요약 평가자는 함수 또는 클래스로 정의할 수 있습니다.

   `BaseSummaryEvaluator`를 사용하는 클래스 기반 접근 방식에 대한 자세한 내용은 [평가 개발자 가이드][4]를 참조하세요.

#### 함수 기반 요약 평가자

   ```python
    def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
        return evaluators_results["exact_match"].count(True)

   ```

   요약 평가자 함수는 `inputs`로 null이 아닌 모든 데이터 유형(문자열, 숫자, 부울, 객체, 배열)의 목록을 받을 수 있으며, `outputs`와 `expected_outputs`는 모든 유형을 포함하는 목록일 수 있습니다. `evaluators_results`는 평가자 함수의 이름을 키로 하는 평가자 결과 목록을 담은 사전입니다. 예를 들어, 위 코드 조각에서 요약 평가자 `num_exact_matches`는 `exact_match` 평가자의 결과(부울 목록)를 사용하여 정확히 일치하는 항목의 개수를 제공합니다.

#### 클래스 기반 요약 평가자

   ```python
   from ddtrace.llmobs import BaseSummaryEvaluator, SummaryEvaluatorContext

   class AverageScoreEvaluator(BaseSummaryEvaluator):
       def __init__(self, target_evaluator: str):
           super().__init__(name="average_score")
           self.target_evaluator = target_evaluator

       def evaluate(self, context: SummaryEvaluatorContext):
           scores = context.evaluation_results.get(self.target_evaluator, [])
           if not scores:
               return None
           return sum(scores) / len(scores)
   ```

   Datadog은 다음과 같은 요약 평가자 반환 유형을 지원합니다.
   - **부울**: true 또는 false를 반환합니다.
   - **점수**: 숫자 값(float)을 반환합니다.
   - **범주형**: 레이블이 지정된 범주(string)를 반환합니다.
   - **json**: 구조화된 데이터(dict)를 반환합니다.

### 5. 실험을 생성 및 실행합니다. {#5-create-and-run-the-experiment}
   ```python
   experiment = LLMObs.experiment(
       name="capital-cities-test",
       task=task,
       dataset=dataset,
       evaluators=[exact_match, overlap, fake_llm_as_a_judge],
       summary_evaluators=[num_exact_matches], # optional
       description="Testing capital cities knowledge",
       config={
           "model_name": "gpt-4",
           "version": "1.0"
       },
   )

   # Run the experiment
   results = experiment.run()  # Run on all dataset records

   # Process results
   for result in results.get("rows", []):
       print(f"Record {result['idx']}")
       print(f"Input: {result['input']}")
       print(f"Output: {result['output']}")
       print(f"Score: {result['evaluations']['evaluator']['value']}")
       if result['error']['message']:
           print(f"Error: {result['error']['message']}")
   ```

   실험의 실행 속도를 높이려면 병렬 처리를 활성화할 수 있습니다.
   ```
   results = experiment.run(jobs=4)
   ```

   데이터의 특정 부분에서 파이프라인을 테스트하려면 다음을 사용하세요.
   ```
   results = experiment.run(sample_size=10)
   ```

   오류 발생 시 실험 실행을 중지하려면 다음을 사용하세요.
   ```
   results = experiment.run(raise_errors=True)
   ```

### 6. Datadog에서 실험 결과를 검토합니다. {#6-review-your-experiment-results-in-datadog}
   ```
   print(f"View experiment: {experiment.url}")
   ```

참고: LLM 실험 트레이스는 90일 동안 보관됩니다.

[1]: /ko/llm_observability/improve/datasets
[2]: /ko/llm_observability/instrument/custom_instrumentation?tab=decorators#trace-an-llm-application
[3]: /ko/llm_observability/instrument/auto_instrumentation?tab=python
[4]: /ko/llm_observability/investigate/evaluations/evaluation_developer_guide
[5]: /ko/llm_observability/instrument/agent_observability_and_apm/
[6]: /ko/llm_observability/instrument/otel_instrumentation

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}