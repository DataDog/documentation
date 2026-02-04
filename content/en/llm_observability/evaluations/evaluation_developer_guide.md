---
title: Evaluation Developer Guide
description: Learn how to build custom evaluators using the LLM Observability SDK and API.
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

This guide covers how to evaluate your LLM applications, either within an experiment or by evaluating production spans. It includes:

- The evaluation data model
- Using the SDK to create evaluations
- Using the HTTP API to submit evaluations

## Evaluation data model

### EvaluatorContext

The `EvaluatorContext` is a frozen dataclass that provides all the information needed to run an evaluation.

| Field | Type | Description |
|-------|------|-------------|
| `input_data` | `Any` | The input data to evaluate. |
| `output_data` | `Any` | The output data to evaluate. |
| `expected_output` | `Any` | The expected output. |
| `metadata` | `Dict[str, Any]` | Additional metadata. |
| `span_id` | `str` | The span's unique identifier. |
| `trace_id` | `str` | The trace's unique identifier. |

### SummaryEvaluatorContext

The `SummaryEvaluatorContext` is a frozen dataclass that provides aggregated evaluation results across all dataset records in an experiment.

| Field | Type | Description |
|-------|------|-------------|
| `inputs` | `List[Any]` | List of all input data from the experiment. |
| `outputs` | `List[Any]` | List of all output data from the experiment. |
| `expected_outputs` | `List[Any]` | List of all expected outputs from the experiment. |
| `evaluation_results` | `Dict[str, List[Any]]` | Dictionary mapping evaluator names to their results. |
| `metadata` | `Dict[str, Any]` | Additional metadata associated with the experiment. |

### EvaluatorResult

The `EvaluatorResult` class allows you to return rich evaluation results with additional context.

| Field | Type | Description |
|-------|------|-------------|
| `value` | `Union[str, float, int, bool]` | The evaluation value. Type depends on `metric_type`. |
| `reasoning` | `Optional[str]` | A text explanation of the evaluation result. |
| `assessment` | `Optional[str]` | An assessment of this evaluation. Accepted values are `pass` and `fail`. |
| `metadata` | `Optional[Dict[str, Any]]` | Additional metadata about the evaluation. |
| `tags` | `Optional[Dict[str, str]]` | Tags to apply to the evaluation metric. |

### Metric types

LLM Observability supports three metric types for evaluations:

| Metric type | Value type | Use case |
|-------------|------------|----------|
| `categorical` | `str` | Classifying outputs into categories (for example, "Positive", "Negative", "Neutral") |
| `score` | `float` or `int` | Numeric scores or ratings (for example, 0.0-1.0, 1-10) |
| `boolean` | `bool` | Pass/fail or yes/no evaluations |

## SDK guide

### Class-based evaluators

Class-based evaluators provide a structured way to implement reusable evaluation logic.

#### BaseEvaluator

The `BaseEvaluator` class is the base class to create an evaluator.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, BaseEvaluator, EvaluatorContext, EvaluatorResult

class SemanticSimilarityEvaluator(BaseEvaluator):
    """Evaluates semantic similarity between output and expected output."""

    def __init__(self, threshold: float = 0.8):
        super().__init__(name="semantic_similarity")
        self.threshold = threshold

    def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
        # Custom evaluation logic
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

- Override the `__init__` method to accept custom configuration and call `super().__init__(name="evaluator_name")`
- Implement the `evaluate(context: EvaluatorContext)` method
- Return either a value directly or an `EvaluatorResult` for rich results

#### BaseSummaryEvaluator

The `BaseSummaryEvaluator` class is used to create evaluators that operate on aggregated results from an entire experiment run.

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

- Override the `__init__` method and call `super().__init__(name="evaluator_name")`
- Access aggregated results through `context.evaluation_results`
- Useful for computing statistics like averages, pass rates, or distributions

## Function-based evaluators

Function-based evaluators are lightweight functions for straightforward evaluation logic. They take input, output, and expected output as arguments.

{{< code-block lang="python" >}}
from ddtrace.llmobs import EvaluatorResult

def exact_match_evaluator(input_data, output_data, expected_output):
    """Checks if output exactly matches expected output."""
    matches = output_data == expected_output
    return EvaluatorResult(
        value=matches,
        reasoning="Exact match" if matches else "Output differs from expected",
        assessment="pass" if matches else "fail",
        metadata={"comparison_type": "exact"},
        tags={"evaluator": "exact_match"}
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
- A value (`str`, `float`, `int`, `bool`)
- An `EvaluatorResult` for rich results with reasoning and metadata

## Using evaluators with experiments

Use evaluators with experiments to systematically evaluate your LLM application.

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
    # Your LLM application logic
    return generate_answer(input_data["question"])

# Create evaluators
semantic_eval = SemanticSimilarityEvaluator(threshold=0.7)
summary_eval = AverageScoreEvaluator("semantic_similarity")

# Run experiment with mixed evaluators
experiment = LLMObs.experiment(
    name="qa_experiment",
    task=qa_task,
    dataset=dataset,
    evaluators=[semantic_eval, exact_match_evaluator],
    summary_evaluators=[summary_eval]
)

experiment.run()
{{< /code-block >}}

## Submitting evaluations

Use `LLMObs.submit_evaluation()` to submit custom evaluations associated with a span.

### Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `str` | Yes | The name of the evaluation. |
| `metric_type` | `str` | Yes | The type of evaluation: `categorical`, `score`, or `boolean`. |
| `value` | `str`, `int`, `float`, `bool` | Yes | The evaluation value. Type must match `metric_type`. |
| `span` | `dict` | No* | Dictionary with `span_id` and `trace_id`. Use `LLMObs.export_span()` to generate. |
| `span_with_tag_value` | `dict` | No* | Dictionary with `tag_key` and `tag_value` to identify the span. |
| `ml_app` | `str` | Yes | The name of the ML application. |
| `timestamp_ms` | `int` | No | Unix timestamp in milliseconds. Defaults to current time. |
| `tags` | `dict` | No | Dictionary of string key-value pairs as tags. |
| `assessment` | `str` | No | Assessment of evaluation. Accepted values: `pass`, `fail`. |
| `reasoning` | `str` | No | Text explanation of the evaluation result. |
| `metadata` | `dict` | No | Additional metadata about the evaluation. |

**Note**: Exactly one of `span` or `span_with_tag_value` is required.

### Example: Using an evaluator to evaluate a span

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, EvaluatorContext
from ddtrace.llmobs.decorators import llm

# Create an evaluator instance
evaluator = MyCustomEvaluator()

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(input_text):
    completion = ...  # Your LLM application logic

    # Create the evaluation context
    context = EvaluatorContext(
        input_data=input_text,
        output_data=completion,
        expected_output=None,
    )

    # Run the evaluator
    result = evaluator.evaluate(context)

    # Submit the evaluation result
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

### Example: Joining by span context

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ...  # Your LLM application logic

    # Export span context for evaluation
    span_context = LLMObs.export_span(span=None)

    LLMObs.submit_evaluation(
        span=span_context,
        ml_app="chatbot",
        label="quality",
        metric_type="score",
        value=0.95,
        tags={"evaluator": "custom"},
        assessment="pass",
        reasoning="High quality response with accurate information"
    )

    return completion
{{< /code-block >}}

### Example: Joining by tag

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ...  # Your LLM application logic

    # Add a unique tag to the span
    msg_id = get_msg_id()
    LLMObs.annotate(tags={"msg_id": msg_id})

    # Submit evaluation using tag-based joining
    LLMObs.submit_evaluation(
        span_with_tag_value={
            "tag_key": "msg_id",
            "tag_value": msg_id
        },
        ml_app="chatbot",
        label="harmfulness",
        metric_type="score",
        value=0,
        assessment="pass",
        reasoning="No harmful content detected"
    )

    return completion
{{< /code-block >}}

## HTTP API reference

You can also submit evaluations using the HTTP API.

<div class="alert alert-info">To submit evaluations for <a href="/llm_observability/instrumentation/otel_instrumentation">OpenTelemetry spans</a> directly to the Evaluations API, you must include the <code>source:otel</code> tag in the evaluation.</div>

Endpoint
: `POST https://api.datadoghq.com/api/intake/llm-obs/v2/eval-metric`

For the full API specification including request/response models, see the [Evaluations API reference][1].

### API example

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "join_on": {
            "span": {
              "span_id": "20245611112024561111",
              "trace_id": "13932955089405749200"
            }
          },
          "ml_app": "weather-bot",
          "timestamp_ms": 1609459200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 0.95,
          "assessment": "pass",
          "reasoning": "The response accurately answered the question."
        }
      ]
    }
  }
}
{{< /code-block >}}

[1]: /llm_observability/instrumentation/api/#evaluations-api

## Best practices

### Concurrent execution

Set the `jobs` parameter to run tasks and evaluators concurrently on multiple threads, allowing experiments to complete faster when processing multiple dataset records.

**Note**: Asynchronous evaluators are not yet supported for concurrent execution. Only synchronous evaluators benefit from parallel execution.

### Naming conventions

Evaluation labels must follow these conventions:

- Must start with a letter
- Must only contain ASCII alphanumerics or underscores
- Other characters, including spaces, are converted to underscores
- Unicode is not supported
- Must not exceed 200 characters (fewer than 100 is preferred)
- Must be unique for a given LLM application (`ml_app`) and organization

### OpenTelemetry integration

When submitting evaluations for OpenTelemetry-instrumented spans, include the `source:otel` tag:

{{< code-block lang="python" >}}
LLMObs.submit_evaluation(
    span=span_context,
    ml_app="my_app",
    label="quality",
    metric_type="score",
    value=0.9,
    tags={"source": "otel"}
)
{{< /code-block >}}

Or in API requests:

{{< code-block lang="json" >}}
{
  "tags": ["source:otel"]
}
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
