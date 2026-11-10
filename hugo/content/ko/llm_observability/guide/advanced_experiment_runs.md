---
aliases:
- /ko/llm_observability/improve/experiments/advanced_runs/
- /ko/llm_observability/experiments/advanced_runs/
description: 데이터셋의 하위 집합에서 모델 변동성을 고려하기 위해 오프라인 실험을 여러 번 실행하고, CI/CD 파이프라인에서 실험 실행을
  자동화합니다.
title: 고급 실험 실행
---
이 페이지에서는 [여러 차례 실험 실행](#multiple-runs) 및 [CI/CD에서 오프라인 실험 설정](#setting-up-your-experiment-in-cicd)을 포함하여 오프라인 실험 실행과 관련된 고급 주제를 다룹니다.

## 데이터셋의 하위 집합에서 실험 실행 {#run-an-experiment-on-a-subset-of-your-dataset}

먼저 데이터셋 레코드에 태그를 추가합니다. 이러한 태그는 고유 식별자(예: `name:test_use_case_1`)이거나 시나리오의 속성(예: `difficulty:hard`)을 나타낼 수 있습니다.

그런 다음 `LLMObs.pull_dataset()`의 `tags` 인수를 사용하여 데이터셋을 관련 레코드로 필터링하고 실험을 실행합니다.

예시

```
prod_dataset = LLMObs.pull_dataset(dataset_name="my-dataset", tags=["env:prod", "version:1.0"])

experiment = LLMObs.experiment(
    name="example-experiment",
    dataset=prod_dataset,
    task=topic_relevance,
    evaluators=[exact_match, false_confidence]
)
experiment.run()
```

## 다중 실행 {#multiple-runs}

모델의 비결정론을 고려하기 위해 동일한 실험을 여러 번 실행할 수 있습니다. [Agent Observability Python SDK][1] 또는 [Offline Experiments API][2]를 사용하여 실행할 반복 횟수를 지정할 수 있습니다. 이후 각 데이터셋 레코드는 동일한 작업과 평가자를 사용하여 지정된 횟수만큼 실행됩니다.

### Python SDK를 사용한 다중 실행 {#multiple-runs-with-the-python-sdk}
<div class="alert alert-info">Agent Observability Python SDK v4.1 이상이 필요합니다.</div>

다음 예시와 같이 실험 메서드에 선택 사항인 `runs` 파라미터를 정의합니다.

{{< highlight py "hl_lines=7" >}}
experiment = LLMObs.experiment(
    name="example-experiment",
    dataset=dataset,
    task=topic_relevance,
    evaluators=[exact_match, false_confidence],
    config={"model": "gpt-4o-mini", "temperature": 0.3, "personality": "helpful"},
    runs=5
)

{{< /highlight >}}

`runs`를 정의하지 않으면 실험은 기본적으로 1회 반복 실행됩니다.

### Offline Experiments API를 사용한 다중 실행 {#multiple-runs-with-the-offline-experiments-api}

다음 예시와 같이 요청 본문에 `run_count` 필드를 포함합니다.
{{< highlight json "hl_lines=9" >}}
{
  "data": {
    "type": "experiments",
    "attributes": {
        "project_id": "<project_id>",
        "dataset_id": "<dataset_id>",
        "name": "example-experiment",
        "description": "",
        "run_count": 5,
        "metadata": {
            "team": ""
        },
        "config": {"model": "gpt-4o-mini", "temperature": 0.3, "personality": "helpful"}
    }
  }
}

{{< /highlight >}}

`run_count`를 정의하지 않으면 실험은 기본적으로 1회 반복 실행됩니다.

### Datadog에서 다중 실행 실험 결과 분석 {#analyzing-multiple-run-experiment-results-in-datadog}

Datadog에서 [Offline Experiments][3]로 이동하여 여러 번 실행한 실험을 선택합니다.

{{< ui >}}Summary{{< /ui >}} 수준에서 평가 및 메트릭은 다음과 같이 계산됩니다.
- 점수 기반 평가: 레코드별 평균의 평균
- 범주형 평가: 레코드별 최빈값의 최빈값

{{< ui >}}Record{{< /ui >}} 수준에서 평가 및 메트릭은 다음과 같이 계산됩니다.
- 점수 기반 평가: 동일한 입력에 대한 여러 실행의 평균
- 범주형 평가: 동일한 입력에 대한 여러 실행의 최빈값

#### 검색 및 필터링 {#searching-and-filtering}

여러 실행에 대한 평가 또는 메트릭을 기준으로 필터링하려면 점수 기반 평가에는 `@multi_run_avg`를 사용하고, 범주형 평가에는 `@multi_run_mode`를 사용합니다.

예를 들면 다음과 같습니다.

```
@multi_run_avg.@evaluations.custom.random_evaluator:>0.5  @multi_run_mode.@evaluations.custom.sentient_evaluator:positive
```

{{< img src="llm_observability/evaluations/multi-run-query.png" alt="다중 실행 필터를 사용한 검색 쿼리가 표시된 실험 레코드 보기 검색창에는 @multi_run_avg.@evaluations.custom.random_evaluator:>=0.5 @multi_run_mode.@evaluations.custom.sentiment_evaluator:positive 쿼리가 표시됩니다. 왼쪽 사이드바에는 확인란과 범위 슬라이더가 포함된 Duration, Status, Custom Evaluations 필터가 표시됩니다. 메인 표에는 필터링된 127개 레코드 중 8개가 표시되며, 입력 프롬프트, 예상 출력, exact_match, false_confidence, random_evaluator 점수, sentiment_evaluator 값 등의 평가 결과, 소요 시간 및 예상 비용을 나타내는 열이 있습니다." style="width:100%;" >}}

`@multi_run_avg.` 열과 일반 `@trace.` 열을 혼합하는 쿼리는 **지원되지 않습니다**.

예를 들면 다음과 같습니다.
- 지원됨: `@multi_run_avg.@trace.total_tokens:>1000`(평균 토큰 수가 1,000개를 초과하는 모든 레코드)
- 지원됨: `run_iteration:1 @trace.total_tokens:>1000`(첫 번째 실행의 총 토큰 수가 1,000개를 초과하는 경우 해당 실행의 모든 레코드)
- 지원되지 않음: `@multi_run_avg.@trace.total_tokens:>1000 @trace.estimated_total_cost:>0.01`(모든 실행의 평균 토큰 수가 1,000개를 초과하고 첫 번째 실행 비용이 1센트를 초과하는 모든 레코드)

#### 실험 실행 비교 {#comparing-experiment-runs}

단일 실행 오프라인 실험을 비교하는 방법과 유사하게, 특정 실행을 선택하여 다중 실행 오프라인 실험을 비교할 수 있습니다. 예를 들어, Experiment A의 Run 1과 Experiment B의 Run 4를 비교하여 실행 간 변동성을 분석할 수 있습니다.

{{< img src="llm_observability/evaluations/multi-run-compare.png" alt="다중 실행 오프라인 실험 두 개를 비교하는 실험 비교 인터페이스 상단 섹션에는 answer_correctness, random_evaluator, sentiment_evaluator, exact_match, false_confidence 및 duration의 평균을 비롯한 각 실험의 집계 메트릭을 보여주는 비교 표가 표시됩니다. 아래의 상세 비교 화면에는 Run 1부터 Run 7까지의 목록에서 Run 4가 선택된 상태로 펼쳐진 드롭다운 메뉴가 표시되어 각 실험의 특정 실행을 비교할 수 있습니다. 데이터셋 레코드 섹션에는 선택한 실행에 대한 평가 메트릭과 함께 입력, 예상 출력 및 생성된 출력 열이 나란히 표시됩니다." style="width:100%;" >}}

## CI/CD에서 실험 설정 {#setting-up-your-experiment-in-cicd}
실험을 수동으로 실행하거나 CI/CD 파이프라인에서 자동으로 실행되도록 구성할 수 있습니다. 예를 들어, 변경 사항이 있을 때마다 데이터셋에서 실험을 실행하여 결과를 기준선과 비교하고 잠재적인 회귀를 탐지합니다.

### GitHub Actions {#github-actions}
다음 Python 스크립트와 GitHub Actions 워크플로를 템플릿으로 사용하여 리포지토리에 코드가 푸시될 때마다 실험을 자동으로 실행할 수 있습니다.

**참고**: 워크플로 파일은 `.github/workflows` 디렉터리에 위치해야 하며, YAML 구문을 사용하고 `.yml` 확장자를 가져야 합니다.

```python
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import EvaluatorResult
from typing import Dict, Any, Optional, List

LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)


dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",  # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "input_data": {
                "question": "What is the capital of China?"
            },  # required, JSON or string
            "expected_output": "Beijing",  # optional, JSON or string
            "metadata": {"difficulty": "easy"},  # optional, JSON
        },
        {
            "input_data": {
                "question": "Which city serves as the capital of South Africa?"
            },
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"},
        },
    ],
)

def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
    question = input_data["question"]
    difficulty = metadata.get("difficulty", "unknown") if metadata else "unknown"
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"


def exact_match(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> bool:
    return output_data == expected_output


def overlap(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> float:
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


def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
    return evaluators_results["exact_match"].count(True)


experiment = LLMObs.experiment(
    name="capital-cities-test",
    task=task,
    dataset=dataset,
    evaluators=[exact_match, overlap, fake_llm_as_a_judge],
    summary_evaluators=[num_exact_matches],  # optional
    description="Testing capital cities knowledge",
    config={"model_name": "gpt-4", "version": "1.0"},
)

results = experiment.run(jobs=4, raise_errors=True)

print(f"View experiment: {experiment.url}")
```

```yaml
name: Experiment SDK Test

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    environment: protected-main-env # The job uses secrets defined in this environment
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.13.0' # Or your desired Python version
      - name: Install Dependencies
        run: pip install ddtrace>=4.1.0 dotenv
      - name: Run Script
        run: python ./experiment_sdk_demo/main.py
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
```

### API를 통한 CI/CD 실행 쿼리 및 비교 {#querying-and-comparing-cicd-runs-via-the-api}
CI/CD 파이프라인을 위한 오프라인 실험을 생성할 때는 `name` 필드에 공통 논리적 파이프라인 이름과 실행별 접미사(예: `my-pipeline-<run-id>`)를 포함하고, `metadata` 필드에 커밋, 브랜치 또는 기타 파이프라인 컨텍스트(예: `"metadata": {"commit": "abc123", "branch": "feat/foo"}`)를 지정합니다.

API를 통해 실행 결과를 검색하여 비교하려면 다음 필터를 사용하여 `GET /api/v2/llm-obs/v1/experiments`를 호출합니다.
- `filter[experiment]=<pipeline-name>`은 동일한 논리적 파이프라인 이름을 공유하는 모든 실행을 반환합니다.
- `filter[metadata]={"branch":"main"}` 메타데이터에 해당 키-값 쌍이 포함된 실행을 반환합니다.
- 두 필터를 결합하여 비교 범위를 좁힙니다(예: `?filter[experiment]=my-pipeline&filter[metadata]={"commit":"abc123"}`).
- `filter[parent_experiment_id]=<uuid>` 특정 기준 실험에 대해 실행된 모든 오프라인 실험을 반환합니다. 여러 기준 ID에 대해 반복할 수 있습니다.

일치하는 각 실험의 `aggregate_data`에는 사전 계산된 평가 점수 분포, 토큰 비용 및 오류율이 포함되어 있어 개별 스팬을 쿼리하지 않고도 실행을 비교할 수 있습니다.

`filter[experiment]` `experiment` 열에 저장된 공통 논리적 파이프라인 이름과 일치합니다(예: `my-pipeline`). 이는 실행마다 고유한 `name` 필드와는 다릅니다(예: `my-pipeline-<run-id>`).

```http
# Create experiment tagged with pipeline context
POST /api/v2/llm-obs/v1/experiments
{
  "data": {
    "type": "experiments",
    "attributes": {
      "project_id": "<project_id>",
      "dataset_id": "<dataset_id>",
      "name": "my-pipeline-<run-id>",
      "metadata": {"commit": "abc123", "branch": "feat/foo"}
    }
  }
}

# Compare all runs of the same pipeline on main branch
GET /api/v2/llm-obs/v1/experiments?filter[experiment]=my-pipeline&filter[metadata]={"branch":"main"}

# Retrieve a specific commit's run
GET /api/v2/llm-obs/v1/experiments?filter[experiment]=my-pipeline&filter[metadata]={"commit":"abc123"}
```

[1]: /ko/llm_observability/instrument/sdk?tab=python
[2]: /ko/llm_observability/guide/offline_experiments_api
[3]: https://app.datadoghq.com/llm/experiments