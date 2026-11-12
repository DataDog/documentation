---
aliases:
- /ko/llm_observability/improve/experiments/prompt_optimization/
- /ko/llm_observability/experiments/prompt_optimization/
description: 반복적인 개선과 AI 기반 평가를 통해 LLM 프롬프트를 자동으로 개선합니다.
further_reading:
- link: /llm_observability/guide/offline_experiments
  tag: 설명서
  text: Agent Observability Offline Experiments 설정 및 사용
- link: /llm_observability/improve/datasets
  tag: 설명서
  text: 데이터세트 생성 및 관리
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: 블로그
  text: Datadog으로 LLM 실험 생성 및 모니터링
private: true
title: 프롬프트 최적화
---
## 개요 {#overview}

프롬프트 최적화는 체계적인 평가와 AI 기반 개선을 통해 LLM 프롬프트를 개선하는 프로세스를 자동화합니다. 프롬프트를 수동으로 테스트하고 조정하는 대신 프롬프트 최적화를 사용하여 성능 데이터를 분석하고 실패 패턴을 식별하며 구체적인 개선 사항을 제안할 수 있습니다.

프롬프트 최적화는 현재 프롬프트를 사용하여 데이터세트에서 LLM 애플리케이션을 실행하고 사용자 지정 메트릭을 사용하여 성능을 측정한 다음, 추론 모델을 사용하여 결과를 분석하고 개선된 프롬프트를 생성합니다. 이 주기는 목표 메트릭이 달성되거나 최대 반복 횟수에 도달할 때까지 반복됩니다.

### 프롬프트 최적화 기능 {#prompt-optimization-capabilities}
- AI 기반 분석을 통한 자동화된 프롬프트 개선
- 도메인별 작업을 위한 사용자 지정 가능한 평가 메트릭
- 과도한 최적화 방지를 위한 기본 제공 중단 조건
- 빠른 반복을 위한 병렬 실험 실행
- 편향되지 않은 성능 추정을 위해 데이터세트를 훈련, 검증 및 테스트 하위 집합으로 분할
- 추적 및 디버깅을 위해 Agent Observability와 완전히 통합

프롬프트 최적화는 예상 출력을 알고 있고 모델의 예측 점수를 매기는 정의된 방법이 있는 모든 사용 사례를 지원합니다. 프롬프트 최적화의 아키텍처는 구조화된 데이터 추출, 자유 형식 텍스트 생성, 수치 예측을 포함한 모든 출력 유형을 지원합니다.

## 전제 조건 {#prerequisites}

- [`ddtrace`][1] 버전 4.6.0 이상
- Datadog [API 및 애플리케이션 키][2]로 활성화된 Agent Observability
- 대표적인 예시가 포함된 [데이터세트][3] (권장: 50~100개 레코드)
- 고급 추론 모델(o3-mini, Claude 3.5 Sonnet 등)에 대한 액세스 권한

## 프롬프트 최적화 설정 {#set-up-prompt-optimization}

### 1. 데이터세트 준비 {#1-prepare-your-dataset}

작업을 나타내는 입력-출력 쌍이 포함된 데이터세트를 생성하거나 로드합니다.

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    api_key="<YOUR_API_KEY>",
    app_key="<YOUR_APP_KEY>",
    project_name="prompt-optimization-project"
)

# Load existing dataset
dataset = LLMObs.pull_dataset(dataset_name="hallucination-detection")

# Or create a new one
dataset = LLMObs.create_dataset(
    dataset_name="hallucination-detection",
    description="Examples of conversations with hallucinated content",
    records=[
        {
            "input_data": {"conversation": "User: What's the capital of France?\nAI: London"},
            "expected_output": True  # True = hallucination detected
        },
        # Add more records...
    ]
)
```

강력한 최적화를 위해 Datadog은 일반적인 케이스와 예외 케이스를 모두 포함하는 다양한 예시를 포함할 것을 권장합니다.

### 2. 작업 함수 정의 {#2-define-your-task-function}

LLM 애플리케이션을 나타내는 함수를 구현합니다. 이 함수는 입력 데이터와 구성(최적화 중인 프롬프트 포함)을 수신합니다.

```python
from openai import OpenAI
from pydantic import BaseModel

class DetectionResult(BaseModel):
    value: bool
    reasoning: str

    @classmethod
    def output_format(cls) -> str:
        """Return JSON schema for output format."""
        return json.dumps(
            {
                "value": "boolean: true or false evaluation result",
                "reasoning": "string: detailed explanation for the evaluation decision"
            },
            indent=3
        )

def detection_task(input_data, config):
    """Execute your LLM application with the current prompt."""
    client = OpenAI()

    prompt = config["prompt"]  # The prompt being optimized
    conversation = input_data["conversation"]

    response = client.chat.completions.parse(
        model=config.get("model_name", "gpt-4o-mini"),
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": f"Conversation:\n{conversation}"}
        ],
        response_format=DetectionResult
    )

    return response.choices[0].message.parsed
```

### 3. 평가자 함수 정의 {#3-define-evaluator-functions}

프롬프트를 최적화하려면 여러 계층의 메트릭 계산이 필요합니다.

- 레코드 수준에서 혼동 행렬 조건(참 양성(TP), 거짓 양성(FP), 참 음성(TN), 거짓 음성(FN))으로 결과에 레이블 지정
- 모든 레코드에 걸쳐 이러한 레이블을 집계하여 중간 메트릭을 계산합니다(예: 총 TP, FP, TN, FN 수를 집계한 다음 정밀도, 재현율, 정확도 계산)
- 집계된 메트릭에서 선택하거나 결합하여 프롬프트를 최적화하려는 최종 점수 계산(예: 정밀도만 반환하거나 정밀도 + 정확도를 결합)
- 프롬프트 최적화 도구에 제공할 오분류 예시에 레이블 지정

다음 예시는 각 단계를 구현하는 방법을 보여줍니다.

- **개별 평가자**는 각 출력을 측정합니다.

   ```python
   def confusion_matrix_evaluator(input_data, output_data, expected_output):
       """Evaluate a single prediction."""
       prediction = output_data.value

       if prediction and expected_output:
           return "true_positive"
       elif prediction and not expected_output:
           return "false_positive"
       elif not prediction and expected_output:
           return "false_negative"
       else:
           return "true_negative"
   ```

- **요약 평가자**는 집계 메트릭을 계산합니다.

   ```python
   def precision_recall_evaluator(inputs, outputs, expected_outputs, evaluations):
       """Calculate precision and recall across all predictions."""
       tp = fp = tn = fn = 0

       for output, expected in zip(outputs, expected_outputs):
           pred = output.value if hasattr(output, 'value') else output
           if pred and expected:
               tp += 1
           elif pred and not expected:
               fp += 1
           elif not pred and expected:
               fn += 1
           else:
               tn += 1

       precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
       recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
       accuracy = (tp + tn) / (tp + tn + fp + fn)

       return {
           "precision": precision,
           "recall": recall,
           "accuracy": accuracy
       }
   ```

- **점수 산정 함수**는 요약 평가자(예: 정밀도) 중 하나가 반환한 값 중 하나 또는 여러 메트릭의 조합을 반환할 수 있습니다.

   ```python
   def compute_score(summary_evaluators):
       """Higher is better. Combine metrics according to business priorities."""
       metrics = summary_evaluators['precision_recall_evaluator']['value']
       # Optimize for precision
       return metrics['precision']
   ```

   또는

   ```python
   def compute_score(summary_evaluators):
       """Computes F1 Score."""
       precision = summary_evaluators['precision_recall_evaluator']['value']['precision']
       recall = summary_evaluators['precision_recall_evaluator']['value']['recall']
       return 2 * (precision * recall) / (precision + recall)
   ```

- **레이블링 함수**는 최적화 도구에 다양한 예시를 보여주기 위해 결과를 분류합니다.

   ```python
   def labelization_function(individual_result):
       """Categorize results into meaningful groups."""
       eval_value = individual_result["evaluations"]["confusion_matrix_evaluator"]["value"]

       if eval_value in ("true_positive", "true_negative"):
           return "CORRECT PREDICTION"
       else:
           return "INCORRECT PREDICTION"
   ```

   레이블링 함수는 최적화에서 중요한 역할을 합니다. 각 고유 레이블의 경우 최적화 도구는 해당 카테고리에서 무작위로 선택된 예시 하나를 받습니다(위 예시에서 레이블은 `CORRECT PREDICTION` 및 `INCORRECT PREDICTION`). 즉, 레이블의 수가 추론 모델에 표시되는 예시의 다양성을 직접적으로 결정합니다.

   **레이블 이름은 추론 모델에 직접 표시되므로 의미 있고 설명적이어야 합니다**. `TYPE_A` 또는 `CAT_3`와 같은 코드보다는 `HIGH CONFIDENCE ERROR` 또는 `EDGE CASE FAILURE`와 같이 명확하고 사람이 읽을 수 있는 레이블을 사용합니다. 최적화 도구가 학습할 핵심 패턴이나 힌트를 나타내도록 레이블을 설계하고, 집중적이고 실행 가능한 피드백을 보장하기 위해 카디널리티를 낮게(10개 미만의 고유 레이블) 유지합니다.

### 4. 최적화 작업 정의 {#4-define-optimization-task}

추론 모델을 호출해 프롬프트 개선을 제안하는 함수를 만듭니다.

```python
from pydantic import BaseModel

class OptimizationResult(BaseModel):
    prompt: str

def optimization_task(system_prompt, user_prompt, config):
    """Use reasoning model to improve the prompt.

    Returns:
        str: The improved prompt text
    """
    client = OpenAI()

    response = client.chat.completions.parse(
        model="o3-mini",  # Use advanced reasoning model
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        response_format=OptimizationResult
    )

    return response.choices[0].message.parsed.prompt  # Must return string
```

<div class="alert alert-info">최적화 작업은 프롬프트 개선을 위한 지침이 포함된 시스템 프롬프트와 현재 성능 데이터 및 예제가 포함된 사용자 프롬프트를 수신합니다. 프롬프트 최적화는 평가 결과를 기반으로 이러한 프롬프트를 자동으로 구성합니다. 함수는 개선된 프롬프트를 문자열로 반환해야 합니다.</div>

### 5. 최적화 실행 {#5-run-optimization}

최적화를 생성하고 실행합니다.

```python
prompt_optimization = LLMObs._prompt_optimization(
    name="hallucination-detection-optimization",
    dataset=dataset,
    task=detection_task,
    optimization_task=optimization_task,
    evaluators=[confusion_matrix_evaluator],
    summary_evaluators=[precision_recall_evaluator],
    labelization_function=labelization_function,
    compute_score=compute_score,
    config={
        "prompt": "Detect if the AI response contains hallucinated information.",  # Initial prompt (required)
        # Optionals
        "model_name": "gpt-4o-mini",  # Target model - helps optimizer tailor suggestions to model capabilities
        "evaluation_output_format": DetectionResult.output_format(),  # Expected output schema - prompts optimizer to ensure format compliance
        "runs": 1,  # Number of times to evaluate each record - higher values reduce variance in metrics
    },
    max_iterations=10,
    stopping_condition=lambda evals: (
        evals['precision_recall_evaluator']['value']['precision'] >= 0.9 and
        evals['precision_recall_evaluator']['value']['accuracy'] >= 0.8
    )
)

# Execute optimization (parallel execution for faster results)
result = prompt_optimization.run(jobs=20)

# Access results
print(f"Best prompt: {result.best_prompt}")
print(f"Best score: {result.best_score}")
print(f"Achieved in {result.total_iterations} iterations")
print(f"View in Datadog: {result.best_experiment_url}")

# Get score progression
print(result.summary())
```

#### 데이터세트 분할 활성화 {#enable-dataset-splitting}

데이터세트를 훈련, 검증, 테스트 하위 집합으로 분할하여 프롬프트 성능에 대한 편향되지 않은 추정치를 얻습니다. 훈련 예제는 최적화 LLM에 공급되고, 검증 점수는 반복 순위를 매기며, 최상의 프롬프트에 대한 최종 테스트 실험은 편향되지 않은 점수를 제공합니다.

기본 60/20/20 비율에는 `dataset_split=True`를 사용합니다.

```python
prompt_optimization = LLMObs._prompt_optimization(
    name="hallucination-detection-optimization",
    dataset=dataset,
    task=detection_task,
    optimization_task=optimization_task,
    evaluators=[confusion_matrix_evaluator],
    summary_evaluators=[precision_recall_evaluator],
    labelization_function=labelization_function,
    compute_score=compute_score,
    config={
        "prompt": "Detect if the AI response contains hallucinated information.",
    },
    max_iterations=10,
    dataset_split=True,  # Default 60/20/20 split
)

result = prompt_optimization.run(jobs=20)

# Access validation and test results
print(f"Best validation score: {result.best_score}")
print(f"Test score: {result.test_score}")
print(f"Test experiment: {result.test_experiment_url}")
```

3-튜플로 사용자 지정 비율을 지정합니다.

```python
prompt_optimization = LLMObs._prompt_optimization(
    # ... same parameters as above ...
    dataset_split=(0.7, 0.15, 0.15),  # 70% train, 15% valid, 15% test
)
```

별도의 테스트 데이터세트를 사용합니다.

```python
prompt_optimization = LLMObs._prompt_optimization(
    # ... same parameters as above ...
    dataset_split=True,  # Splits main dataset 80/20 into train/valid
    test_dataset="my-curated-test-set",  # Separate dataset for unbiased testing
)
```

#### 구성 옵션 {#configuration-options}

`config`
: 작업 함수에 전달되는 구성 사전입니다. 다음 키와 작업 함수에 필요한 모든 사용자 지정 파라미터가 포함되어 있습니다.

  `"prompt"`
  : **필수**<br/>
  초기 프롬프트

  `"model_name"`
  : _optional_<br/>
  작업에 대한 타겟 모델을 지정합니다. 제공되는 경우, 최적화 도구는 제안에 모델별 지침을 포함하여 해당 모델의 기능과 제한 사항에 맞게 개선 사항을 조정합니다(예: GPT-4, Claude, Llama 비교).

  `evaluation_output_format`
  : _선택 사항_<br/>
  예상 출력 구조에 대한 JSON 스키마를 제공합니다. 최적화 도구는 이를 사용하여 개선된 프롬프트가 모델에 올바르게 형식이 지정된 출력을 생성하도록 명시적으로 지시하는지 확인합니다. 이는 형식 준수가 중요한 구조화된 출력에 특히 유용합니다.

  `runs`
  : _선택 사항_<br/>
  각 데이터세트 레코드가 평가되는 횟수를 제어합니다. `runs` > 1로 설정하면 비결정적 출력이 있는 작업의 메트릭 분산을 줄이는 데 도움이 되며, 실행 시간은 길어지지만 더 안정적인 최적화 신호를 제공합니다.

`max_iterations`
: 최적화 주기의 최대 횟수를 제어합니다. 각 반복은 전체 데이터세트에서 새로운 프롬프트를 테스트합니다.<br/>
  **기본값**: 5<br/>
  **권장값**: 초기 탐색 시 10~20, 프로덕션 시 5~10

`stopping_condition`
: 최적화를 조기에 종료할 시점을 결정하는 선택적 함수입니다. 요약 평가를 수신하고 중지하려면 `True`를 반환합니다.

  ```python
  stopping_condition=lambda evals: (
      evals['my_evaluator']['value']['metric'] >= 0.95
  )
  ```

  `AND` 조건을 사용하여 중지하기 전에 여러 메트릭이 목표를 충족하는지 확인합니다.

`dataset_split`
: 편향되지 않은 평가를 위한 데이터세트 분할을 제어합니다. 다음 값을 허용합니다.<br/>
  - `False`(기본값): 분할 없음. 최적화 및 점수 산정에는 전체 데이터세트가 사용됩니다.<br/>
  - `True`: 기본 비율로 분할합니다. `test_dataset` 없이 60/20/20(훈련/검증/테스트)을 사용하거나 `test_dataset`와 함께 80/20(훈련/검증)을 사용합니다.<br/>
  - `(train, valid, test)` 튜플: 사용자 지정 3방향 분할 비율. 합계가 1.0이어야 합니다. `test_dataset`와 결합할 수 없습니다.<br/>
  - `(train, valid)` 튜플: 사용자 지정 2방향 분할 비율. 합계가 1.0이어야 합니다. 테스트 세트에는 `test_dataset`가 필요합니다.

`test_dataset`
: 최종 테스트 실험에 사용할 별도 데이터세트의 이름입니다. 제공되는 경우 프롬프트 최적화는 이 데이터세트를 자동으로 가져와 메인 데이터세트를 훈련/검증(기본값 80/20)으로 분할하고, 이 데이터세트를 사용하여 최상의 프롬프트에 대한 최종 테스트 실험을 실행합니다. `test_dataset`를 제공하면 데이터세트 분할이 암시적으로 활성화됩니다.

#### 병렬 Worker 구성 {#configure-parallel-workers}

최적화를 실행할 때 `run()` 함수에 `jobs` 파라미터를 전달하여 병렬 Worker 수를 구성할 수 있습니다.

```python
result = prompt_optimization.run(jobs=20)
```

값이 높을수록 전체 실행 시간이 단축되지만 API 요청 한도에 도달할 수 있습니다.

`jobs`
: **기본값**: 1</br>
**권장값**: 대부분의 사용 사례에서 10~20

레코드 100개와 반복 10회가 있는 데이터세트의 **예시**:
- `jobs=1`(직렬): 약 50분(호출당 5초 가정)
- `jobs=20`(병렬): 약 5분

## 데이터세트 분할 {#dataset-splitting}

프롬프트를 최적화할 때 동일한 데이터세트가 개선을 유도하고 결과를 평가하는 데 모두 사용됩니다. 이는 과적합으로 이어질 수 있으며, 이 경우 프롬프트가 최적화 데이터에서는 잘 작동하지만 새로운 입력에서는 제대로 작동하지 않을 수 있습니다. 데이터세트 분할은 데이터를 별도의 역할을 가진 하위 집합으로 나누어 이 문제를 해결합니다.

| 하위 집합 | 역할 | 설명 |
|--------|------|-------------|
| **훈련** | 최적화 | 추론 모델이 실패를 분석하고 개선 사항을 제안하기 위해 보여주는 예시입니다. |
| **검증** | 점수 산정 | 각 반복에 대한 점수를 산정하고 최상의 프롬프트를 선택하는 데 사용됩니다. 최적화 도구는 볼 수 없습니다. |
| **테스트** | 최종 평가 | 최적화 후 최상의 프롬프트에서 한 번 실행하여 편향되지 않은 성능 추정치를 제공합니다. |

### 기본 비율 {#default-ratios}

분할 비율은 `dataset_split` 및 `test_dataset`를 구성하는 방법에 따라 다릅니다.

| 구성 | 훈련 | 검증 | 테스트 |
|---------------|-------|------------|------|
| `dataset_split=True` | 60% | 20% | 20% |
| `dataset_split=True` + `test_dataset` | 80% | 20% | 별도 데이터세트 |
| `(0.7, 0.15, 0.15)` | 70% | 15% | 15% |
| `(0.8, 0.2)` + `test_dataset` | 80% | 20% | 별도 데이터세트 |

레코드는 실행 간 재현성을 위해 고정된 시드로 셔플됩니다.

<div class="alert alert-info">설정 <code>dataset_split=False</code> (기본값)은 전체 데이터세트가 최적화의 모든 단계에 사용되는 이전 동작을 유지합니다.</div>

## 결과 이해 {#understanding-results}

`OptimizationResult` 객체는 최적화 결과에 대한 포괄적인 액세스를 제공합니다.

### 속성 {#properties}

- `best_prompt`: 발견된 가장 점수가 높은 프롬프트
- `best_score`: 최적 반복의 점수
- `best_experiment_url`: 상세 분석을 위한 Datadog 실험 링크
- `total_iterations`: 완료된 반복 횟수
- `best_iteration`: 가장 높은 점수를 얻은 반복
- `test_score`: 최종 테스트 실험의 점수. 데이터세트 분할이 비활성화되면 `None`을 반환합니다.
- `test_experiment_url`: Datadog의 테스트 실험 링크. 데이터세트 분할이 비활성화되면 `None`을 반환합니다.
- `test_results`: 테스트 실험의 전체 결과. 데이터세트 분할이 비활성화되면 `None`을 반환합니다.

### 메서드 {#methods}

- `get_history()`: 모든 반복에 대한 전체 데이터(프롬프트, 점수, 결과, URL)
- `get_score_history()`: 진행 상황을 보여주는 점수 목록
- `get_prompt_history()`: 변화 과정을 보여주는 프롬프트 목록
- `summary()`: 점수 변화표가 포함된 사람이 읽을 수 있는 개요. 데이터세트 분할이 활성화되면 요약에 테스트 점수와 테스트 세트 평가가 포함됩니다.

결과 분석 예시:

```python
# View complete history
for iteration_data in result.get_history():
    print(f"Iteration {iteration_data['iteration']}")
    print(f"  Score: {iteration_data['score']}")
    print(f"  Metrics: {iteration_data['summary_evaluations']}")
    print(f"  URL: {iteration_data['experiment_url']}")

# Visualize improvement
import matplotlib.pyplot as plt
plt.plot(result.get_score_history())
plt.xlabel('Iteration')
plt.ylabel('Score')
plt.title('Prompt Optimization Progress')
plt.show()
```

데이터세트 분할이 활성화되면 테스트 결과에 액세스합니다.

```python
# Check for overfitting by comparing validation and test scores
print(f"Best validation score: {result.best_score}")
print(f"Test score: {result.test_score}")
print(f"Test experiment: {result.test_experiment_url}")

# A large gap between best_score and test_score may indicate overfitting
```

실험 페이지의 구성 탭에서 각 반복에 사용된 프롬프트를 볼 수도 있습니다.

## 모범 사례 {#best-practices}

[실험 쿡북 리포지토리][4]에서 예제 스크립트 모음을 찾을 수 있습니다.

### 데이터세트 설계 {#dataset-design}

- 일반적인 사례와 예외적인 사례를 포함하는 50~100개의 다양한 예시 포함
- 분류 작업의 경우 클래스 간의 균형 잡힌 표현 보장
- 실제 레이블이 정확하고 일관된지 검증
- 재현성을 위해 데이터세트 버전 관리

### 평가 메트릭 {#evaluation-metrics}

- 비즈니스 목표에 부합하는 메트릭 선택(정밀도와 재현율 간의 상충 관계)
- 단일 집계 점수보다는 상호 보완적인 여러 메트릭 사용
- `compute_score` 함수에서 비즈니스 영향에 따라 메트릭에 가중치 부여
- 최적화를 실행하기 전에 평가자를 독립적으로 테스트

### 레이블링 {#labelization}

- 2~5개의 명확하고 설명적인 레이블(예: `CORRECT HIGH CONFIDENCE`, `INCORRECT EDGE CASE`) 생성
- 균형 잡힌 레이블 분포 보장(예: 카테고리 하나에 95%가 집중되는 상황 방지)
- 레이블을 사용하여 최적화 도구가 다양한 유형의 성공과 실패를 파악하도록 지원

### 데이터세트 분할 {#dataset-splitting-1}

- 각 하위 집합에 충분한 예시가 포함되도록 분할을 활성화하기 전에 데이터세트에 최소 50개의 레코드 사용
- 분할을 사용자 지정하기 전에 기본 비율(`dataset_split=True`)로 시작
- 프로덕션 트래픽을 나타내는 엄선된 홀드아웃 세트가 있는 경우 `test_dataset` 사용
- 과적합을 탐지하기 위해 `test_score`와 `best_score`(검증) 비교: 격차가 크면 프롬프트가 검증 데이터에 지나치게 특화되었음을 시사함

### 최적화 모델 선택 {#optimization-model-selection}

`optimization_task`에 고급 추론 모델 사용:
- **권장 모델:** OpenAI o3-mini, o1-preview 또는 Claude 3.5 Sonnet
- 신뢰할 수 있는 구문 분석을 위해 구조화된 출력(Pydantic 모델) 사용

효과적인 최적화에 필요한 추론 깊이가 부족하므로 저렴한 모델(GPT-3.5-turbo, Claude Haiku)은 사용하지 마세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ko/llm_observability/improve/datasets?tab=csv
[4]: https://github.com/DataDog/llm-observability/tree/main/experiments/scripts