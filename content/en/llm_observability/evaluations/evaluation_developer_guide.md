---
title: Evaluation Developer Guide
description: Learn how to build custom evaluators using the LLM Observability SDK.
aliases:
    - /llm_observability/evaluations/developer_guide
further_reading:
    - link: '/llm_observability/evaluations/external_evaluations'
      tag: 'Documentation'
      text: 'Learn about submitting external evaluations'
    - link: '/llm_observability/setup/sdk/python'
      tag: 'Documentation'
      text: 'Learn about the LLM Observability SDK for Python'
    - link: '/llm_observability/instrumentation/api'
      tag: 'Documentation'
      text: 'Learn about the HTTP API Reference'
---

## Overview

This guide covers how to build custom evaluators with the LLM Observability SDK and use them in experiments and production. It walks through:

- [Key concepts](#key-concepts): How evaluations work in experiments versus production
- [Building evaluators](#building-evaluators): Class-based and function-based approaches
- [Using evaluators in experiments](#using-evaluators-in-experiments): Running evaluators against a dataset
- [Using evaluators in production](#using-evaluators-in-production): Evaluating live spans
- [Data model reference](#data-model-reference): Detailed field descriptions for all evaluation types

## Key concepts

An **evaluation** measures a specific quality of your LLM application's output, such as accuracy, tone, or harmfulness. You write the evaluation logic inside an **evaluator**, which receives context about the LLM interaction and returns a result.

There are two contexts for running evaluators:

| | Experiments | Production |
|---|---|---|
| **Purpose** | Test your LLM application against a dataset before deploying. | Monitor the quality of live LLM responses. |
| **How evaluators run** | Automatically — the SDK calls your evaluator on each dataset record. | Manually with `submit_evaluation()`, or automatically with [custom LLM-as-a-judge evaluations][4]. |
| **Available through** | SDK | SDK, HTTP API, or Datadog UI |

For production, there are two approaches:
- **Manual evaluations** (this guide): You run evaluators in your application code and submit results with `LLMObs.submit_evaluation()` or the HTTP API. This gives you full control over evaluation logic and timing.
- **[Custom LLM-as-a-judge evaluations][4]**: You configure evaluations in the Datadog UI using natural language prompts. Datadog automatically runs them on production traces in real time, with no code changes required.

This guide focuses on manual evaluations. For managed LLM-as-a-judge evaluations, see [Custom LLM-as-a-Judge Evaluations][4].

[4]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations

### Evaluation components

The evaluation system has four main components:

1. **[EvaluatorContext](#evaluatorcontext)** — The input to an evaluator. Contains the LLM's input, output, expected output, and span identifiers. In experiments, the SDK builds this automatically from each dataset record. In production, you construct it yourself.
2. **[EvaluatorResult](#evaluatorresult)** — The output of an evaluator. Contains a typed value, optional reasoning, a pass/fail assessment, metadata, and tags. You can also return a plain value (`str`, `float`, `int`, `bool`, `dict`) instead.
3. **[Metric type](#metric-types)** — Determines how the evaluation value is interpreted and displayed: `categorical` (string labels), `score` (numeric), `boolean` (pass/fail), or `json` (structured data).
4. **[SummaryEvaluatorContext](#summaryevaluatorcontext)** — Experiments only. After all dataset records are evaluated, summary evaluators receive the aggregated results to compute statistics like averages or pass rates.

The typical flow:

- **Experiments**: Dataset record → `EvaluatorContext` → Evaluator → `EvaluatorResult` → (after all records) `SummaryEvaluatorContext` → Summary evaluator → summary result
- **Production**: Span data → `EvaluatorContext` (built manually) → Evaluator → `EvaluatorResult` → `LLMObs.submit_evaluation()` or HTTP API

## Building evaluators

There are two ways to define an evaluator: class-based and function-based.

| | Class-based | Function-based |
|---|---|---|
| **Best for** | Reusable evaluators with custom configuration or state. | One-off evaluators with straightforward logic. |
| **Receives** | An `EvaluatorContext` object with full span context (input, output, expected output, metadata, span/trace IDs). | `input_data`, `output_data`, and `expected_output` as separate arguments. |
| **Supports summary evaluators** | Yes (`BaseSummaryEvaluator`). | No. |
| **Future capabilities** | Class-based evaluators are the foundation for upcoming features such as defining custom LLM-as-a-judge evaluators from code. | No additional features planned. |

If you are unsure, start with class-based evaluators. They provide the same capabilities as function-based evaluators today and support additional features going forward.

### Class-based evaluators

Class-based evaluators provide a structured way to implement reusable evaluation logic with custom configuration.

#### BaseEvaluator

Subclass `BaseEvaluator` to create an evaluator that runs on a single span or dataset record. Implement the `evaluate` method, which receives an [`EvaluatorContext`](#evaluatorcontext) and returns an [`EvaluatorResult`](#evaluatorresult) (or a plain value).

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, EvaluatorResult

class SemanticSimilarityEvaluator(BaseEvaluator):
    """Evaluates semantic similarity between output and expected output."""

    def __init__(self, threshold: float = 0.8):
        super().__init__(name="semantic_similarity")
        self.threshold = threshold

    def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
        score = compute_similarity(context.output_data, context.expected_output)

        return EvaluatorResult(
            value=score,
            reasoning=f"Similarity score: {score:.2f}",
            assessment="pass" if score >= self.threshold else "fail",
            metadata={"threshold": self.threshold},
            tags={"type": "semantic"}
        )
{{< /code-block >}}

**Key points:**

- Call `super().__init__(name="evaluator_name")` to set the evaluator's label.
- Implement `evaluate(context: EvaluatorContext)` with your evaluation logic.
- Return an `EvaluatorResult` for rich results, or a plain value (`str`, `float`, `int`, `bool`, `dict`).

#### BaseSummaryEvaluator

<div class="alert alert-info">Summary evaluators are only available in experiments.</div>

Subclass `BaseSummaryEvaluator` to create an evaluator that operates on the aggregated results of an entire experiment run. It receives a [`SummaryEvaluatorContext`](#summaryevaluatorcontext) containing all inputs, outputs, and per-evaluator results.

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseSummaryEvaluator, SummaryEvaluatorContext

class AverageScoreEvaluator(BaseSummaryEvaluator):
    """Computes average score across all evaluation results."""

    def __init__(self, target_evaluator: str):
        super().__init__(name="average_score")
        self.target_evaluator = target_evaluator

    def evaluate(self, context: SummaryEvaluatorContext):
        scores = context.evaluation_results.get(self.target_evaluator, [])
        if not scores:
            return None
        return sum(scores) / len(scores)
{{< /code-block >}}

**Key points:**

- Call `super().__init__(name="evaluator_name")` to set the evaluator's label.
- Access per-evaluator results through `context.evaluation_results`, which maps evaluator names to lists of results.

### Built-in evaluators

The SDK provides built-in evaluators for common evaluation patterns. These are class-based evaluators that you can use directly without writing custom logic.

#### StringCheck

Performs string comparison operations between `output_data` and `expected_output`.

| Operation | Description |
|-----------|-------------|
| `eq` | Exact match (default) |
| `ne` | Not equals |
| `contains` | `output_data` contains `expected_output` (case-sensitive) |
| `icontains` | `output_data` contains `expected_output` (case-insensitive) |

{{< code-block lang="python" >}}
from ddtrace.llmobs._evaluators import StringCheck

# Perform an exact match (default)
evaluator = StringCheck(operation="eq", case_sensitive=True)

# Check whether output_data contains expected_output (case-insensitive)
evaluator = StringCheck(operation="icontains", strip_whitespace=True)

# Extract field from dict output before comparison
evaluator = StringCheck(
    operation="eq",
    output_extractor=lambda x: x.get("message", "") if isinstance(x, dict) else str(x),
)
{{< /code-block >}}

#### RegexMatch

Validates output against a regex pattern.

| Match mode | Description |
|------------|-------------|
| `search` | Partial match anywhere in string (default) |
| `match` | Match from start of string |
| `fullmatch` | Match entire string |

{{< code-block lang="python" >}}
from ddtrace.llmobs._evaluators import RegexMatch
import re

# Validate email format
evaluator = RegexMatch(
    pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    match_mode="fullmatch"
)

# Validate output pattern (case-insensitive)
evaluator = RegexMatch(
    pattern=r"success|completed",
    flags=re.IGNORECASE
)
{{< /code-block >}}

#### LengthValidator

Validates output length constraints.

| Count type | Description |
|------------|-------------|
| `characters` | Count characters (default) |
| `words` | Count words |
| `lines` | Count lines |

{{< code-block lang="python" >}}
from ddtrace.llmobs._evaluators import LengthValidator

# Ensure response is 50-200 characters
evaluator = LengthValidator(min_length=50, max_length=200, count_type="characters")

# Validate word count
evaluator = LengthValidator(min_length=10, max_length=100, count_type="words")
{{< /code-block >}}

#### JSONValidator

Validates that output is valid JSON, and optionally checks for required keys.

{{< code-block lang="python" >}}
from ddtrace.llmobs._evaluators import JSONValidator

# Validate JSON syntax
evaluator = JSONValidator()

# Validate that required keys exist
evaluator = JSONValidator(required_keys=["name", "status", "data"])
{{< /code-block >}}

#### SemanticSimilarity

Measures semantic similarity between `output_data` and `expected_output` using embeddings. Returns a similarity score between 0.0 and 1.0.

{{< code-block lang="python" >}}
from ddtrace.llmobs._evaluators import SemanticSimilarity
from openai import OpenAI

client = OpenAI()

def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return response.data[0].embedding

evaluator = SemanticSimilarity(
    embedding_fn=get_embedding,
    threshold=0.8  # Minimum similarity score to pass
)
{{< /code-block >}}

### Function-based evaluators

For straightforward evaluation logic, define a function instead of a class. Function-based evaluators receive the input, output, and expected output directly as arguments.

{{< code-block lang="python" >}}
from ddtrace.llmobs import EvaluatorResult

def exact_match_evaluator(input_data, output_data, expected_output):
    """Checks if output exactly matches expected output."""
    matches = output_data == expected_output
    return EvaluatorResult(
        value=matches,
        reasoning="Exact match" if matches else "Output differs from expected",
        assessment="pass" if matches else "fail",
    )
{{< /code-block >}}

**Function signature:**

{{< code-block lang="python" >}}
def evaluator_function(
    input_data: Any,
    output_data: Any,
    expected_output: Any
) -> Union[JSONType, EvaluatorResult]:
    ...
{{< /code-block >}}

You can return either:
- A plain value (`str`, `float`, `int`, `bool`, `dict`)
- An `EvaluatorResult` for rich results with reasoning and metadata

## Using evaluators in experiments

Pass your evaluators to `LLMObs.experiment()` to run them against every record in a dataset. The SDK automatically builds an `EvaluatorContext` for each record and calls your evaluator. After all records are processed, any summary evaluators run on the aggregated results.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, Dataset, DatasetRecord

# Create dataset
dataset = Dataset(
    name="qa_dataset",
    records=[
        DatasetRecord(
            input_data={"question": "What is 2+2?"},
            expected_output="4"
        ),
        DatasetRecord(
            input_data={"question": "What is the capital of France?"},
            expected_output="Paris"
        ),
    ]
)

# Define task
def qa_task(input_data, config):
    return generate_answer(input_data["question"])

# Create evaluators
semantic_eval = SemanticSimilarityEvaluator(threshold=0.7)
summary_eval = AverageScoreEvaluator("semantic_similarity")

# Run experiment
experiment = LLMObs.experiment(
    name="qa_experiment",
    task=qa_task,
    dataset=dataset,
    evaluators=[semantic_eval, exact_match_evaluator],
    summary_evaluators=[summary_eval]
)

experiment.run()
{{< /code-block >}}

## Using evaluators in production

<div class="alert alert-info">To evaluate production traces without code changes, see <a href="/llm_observability/evaluations/custom_llm_as_a_judge_evaluations">Custom LLM-as-a-Judge Evaluations</a> instead.</div>

To submit evaluations from your application code, construct the `EvaluatorContext` yourself, call the evaluator, and submit the result with `LLMObs.submit_evaluation()`. You can also submit evaluations through the HTTP API.

For the full `submit_evaluation()` arguments and span-joining options, see the [external evaluations documentation][1]. For the HTTP API specification, see the [Evaluations API reference][2].

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, EvaluatorContext
from ddtrace.llmobs.decorators import llm

evaluator = SemanticSimilarityEvaluator(threshold=0.8)

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(input_text):
    completion = ...  # Your LLM application logic

    # Build the evaluation context from the span data
    context = EvaluatorContext(
        input_data=input_text,
        output_data=completion,
        expected_output=None,
    )

    # Run the evaluator
    result = evaluator.evaluate(context)

    # Submit the result to Datadog
    LLMObs.submit_evaluation(
        span=LLMObs.export_span(),
        ml_app="chatbot",
        label=evaluator.name,
        metric_type="score",
        value=result.value,
        assessment=result.assessment,
        reasoning=result.reasoning,
    )

    return completion
{{< /code-block >}}

## Data model reference

### EvaluatorContext

A frozen dataclass containing all the information needed to run an evaluation.

| Field | Type | Description |
|-------|------|-------------|
| `input_data` | `Any` | The input provided to the LLM application (for example, a prompt). |
| `output_data` | `Any` | The actual output from the LLM application. |
| `expected_output` | `Any` | The expected or ideal output the LLM should have produced. |
| `metadata` | `Dict[str, Any]` | Additional metadata. |
| `span_id` | `str` | The span's unique identifier. |
| `trace_id` | `str` | The trace's unique identifier. |

In experiments, the SDK populates this automatically from each dataset record. In production, you construct it yourself from your span data.

### EvaluatorResult

Allows you to return rich evaluation results with additional context. Used in both experiments and production.

| Field | Type | Description |
|-------|------|-------------|
| `value` | `Union[str, float, int, bool, dict]` | The evaluation value. Type depends on `metric_type`. |
| `reasoning` | `Optional[str]` | A text explanation of the evaluation result. |
| `assessment` | `Optional[str]` | An assessment of this evaluation. Accepted values are `pass` and `fail`. |
| `metadata` | `Optional[Dict[str, Any]]` | Additional metadata about the evaluation. |
| `tags` | `Optional[Dict[str, str]]` | Tags to apply to the evaluation metric. |

### SummaryEvaluatorContext

A frozen dataclass providing aggregated evaluation results across all dataset records in an experiment. Only used by summary evaluators.

| Field | Type | Description |
|-------|------|-------------|
| `inputs` | `List[Any]` | List of all input data from the experiment. |
| `outputs` | `List[Any]` | List of all output data from the experiment. |
| `expected_outputs` | `List[Any]` | List of all expected outputs from the experiment. |
| `evaluation_results` | `Dict[str, List[Any]]` | Dictionary mapping evaluator names to their results. |
| `metadata` | `Dict[str, Any]` | Additional metadata associated with the experiment. |

### Metric types

The metric type is set when submitting an evaluation (through `submit_evaluation()` or the HTTP API) and determines how the value is validated and displayed in Datadog.

| Metric type | Value type | Use case |
|-------------|------------|----------|
| `categorical` | `str` | Classifying outputs into categories (for example, "Positive", "Negative", "Neutral") |
| `score` | `float` or `int` | Numeric scores or ratings (for example, 0.0-1.0, 1-10) |
| `boolean` | `bool` | Pass/fail or yes/no evaluations |
| `json` | `dict` | Structured evaluation data (for example, multi-dimensional rubrics or detailed breakdowns) |

## Best practices

### Naming conventions

Evaluation labels must follow these conventions:

- Must start with a letter
- Must only contain ASCII alphanumerics or underscores
- Other characters, including spaces, are converted to underscores
- Unicode is not supported
- Must not exceed 200 characters (fewer than 100 is preferred)
- Must be unique for a given LLM application (`ml_app`) and organization

### Concurrent execution

Set the `jobs` parameter to run tasks and evaluators concurrently on multiple threads, allowing experiments to complete faster when processing multiple dataset records.

**Note**: Asynchronous evaluators are not yet supported for concurrent execution. Only synchronous evaluators benefit from parallel execution.

### OpenTelemetry integration

When submitting evaluations for [OpenTelemetry-instrumented spans][3], include the `source:otel` tag in the evaluation. See the [external evaluations documentation][1] for examples.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/evaluations/external_evaluations
[2]: /llm_observability/instrumentation/api/#evaluations-api
[3]: /llm_observability/instrumentation/otel_instrumentation
