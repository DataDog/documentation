---
title: Prompt Optimization
description: Automatically improve LLM prompts through iterative refinement and AI-powered evaluation.
further_reading:
  - link: /llm_observability/experiments/setup
    tag: "Documentation"
    text: Set up and use LLM Observability Experiments
  - link: /llm_observability/experiments/datasets
    tag: "Documentation"
    text: Create and manage datasets
  - link: "https://www.datadoghq.com/blog/llm-experiments/"
    tag: "Blog"
    text: "Create and monitor LLM experiments with Datadog"
---

## Overview

Prompt Optimization automates the process of improving LLM prompts through systematic evaluation and AI-powered refinement. Instead of manually testing and tweaking prompts, the Prompt Optimizer uses advanced reasoning models to analyze performance data, identify failure patterns, and suggest targeted improvements.

The system runs your LLM application on a dataset with the current prompt, measures performance using your custom metrics, and then uses a reasoning model (such as OpenAI's o3-mini or Claude 3.5 Sonnet) to analyze the results and generate an improved prompt. This cycle repeats until your target metrics are achieved or the maximum number of iterations is reached.

**Key capabilities:**
- Automated prompt improvement through AI-powered analysis
- Customizable evaluation metrics for domain-specific tasks
- Built-in stopping conditions to prevent over-optimization
- Parallel experiment execution for rapid iteration
- Full integration with LLM Observability for tracking and debugging

**Current support:** Prompt Optimization has been validated on boolean detection tasks and classification use cases, though the architecture supports any output type including structured data extraction, free-form text generation, and numerical predictions.

## How it works

The Prompt Optimizer automates the iterative refinement process through three core components:

1. **Evaluation System**: Runs your LLM application on a dataset and measures performance using custom metrics you define
2. **Analysis Engine**: Categorizes results into meaningful groups, presents performance data and examples to an AI reasoning model
3. **Improvement Loop**: AI generates an improved prompt, the system tests it on the full dataset, compares performance, and repeats

Each optimization iteration:
1. Tests the current prompt on your entire dataset
2. Analyzes which examples succeed and fail
3. Shows diverse labeled examples (good/bad/edge cases) to the reasoning model
4. Generates an improved prompt based on the analysis
5. Tests the new prompt and compares performance
6. Keeps the best prompt and continues or stops based on your conditions

The system always optimizes from the current best prompt, ensuring that temporary setbacks don't derail progress.

## Prerequisites

- Python SDK version `>=4.3.0`
- LLM Observability enabled with API and App keys
- A dataset with representative examples (recommended: 50-100 records)
- Access to an advanced reasoning model (o3-mini, Claude 3.5 Sonnet, or similar)

## Set up prompt optimization

### 1. Prepare your dataset

Create or load a dataset containing input-output pairs that represent your task:

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

**Best practice:** Include diverse examples covering typical cases and edge cases to ensure robust optimization.

### 2. Define your task function

Implement the function that represents your LLM application. This function receives input data and configuration (including the prompt being optimized):

```python
from openai import OpenAI
from pydantic import BaseModel

class DetectionResult(BaseModel):
    value: bool
    reasoning: str

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

### 3. Define evaluation functions

Create functions that measure how well your task performs. You need four types of functions:

**Individual evaluators** measure each output:

```python
def accuracy_evaluator(input_data, output_data, expected_output):
    """Evaluate a single prediction."""
    prediction = output_data.value if hasattr(output_data, 'value') else output_data

    if prediction and expected_output:
        return "true_positive"
    elif prediction and not expected_output:
        return "false_positive"
    elif not prediction and expected_output:
        return "false_negative"
    else:
        return "true_negative"
```

**Summary evaluators** compute aggregate metrics:

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

**Scoring function** combines metrics into a single optimization target:

```python
def compute_score(summary_evaluators):
    """Higher is better. Combine metrics according to business priorities."""
    metrics = summary_evaluators['precision_recall_evaluator']['value']
    # Optimize for both precision and accuracy
    return metrics['precision'] + metrics['accuracy']
```

**Labelization function** categorizes results for showing diverse examples to the optimizer:

```python
def labelization_function(individual_result):
    """Categorize results into meaningful groups."""
    eval_value = individual_result["evaluations"]["accuracy_evaluator"]["value"]

    if eval_value in ("true_positive", "true_negative"):
        return "CORRECT PREDICTION"
    else:
        return "INCORRECT PREDICTION"
```

### 4. Define optimization task

Create a function that calls a reasoning model to suggest prompt improvements:

```python
from pydantic import BaseModel

class OptimizationResult(BaseModel):
    prompt: str

def optimization_task(system_prompt, user_prompt, config):
    """Use reasoning model to improve the prompt."""
    client = OpenAI()

    response = client.chat.completions.parse(
        model="o3-mini",  # Use advanced reasoning model
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        response_format=OptimizationResult
    )

    return response.choices[0].message.parsed.prompt
```

<div class="alert alert-info">The optimization task receives a system prompt with instructions for improving prompts and a user prompt with current performance data and examples. The system automatically constructs these prompts based on your evaluation results.</div>

### 5. Run optimization

Create and run the optimization:

```python
prompt_optimization = LLMObs._prompt_optimization(
    name="hallucination-detection-optimization",
    dataset=dataset,
    task=detection_task,
    optimization_task=optimization_task,
    evaluators=[accuracy_evaluator],
    summary_evaluators=[precision_recall_evaluator],
    labelization_function=labelization_function,
    compute_score=compute_score,
    config={
        "prompt": "Detect if the AI response contains hallucinated information.",  # Initial prompt
        "model_name": "gpt-4o-mini"
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
print("Score history:", result.get_score_history())
# Example output: [1.04, 0.48, 1.70, 1.77]
```

To increase execution speed, adjust the `jobs` parameter to process multiple dataset records in parallel.

## Configuration options

### max_iterations

Controls the maximum number of optimization cycles. Each iteration tests a new prompt on the full dataset.

- **Default:** 5
- **Recommended:** 10-20 for initial exploration, 5-10 for production

### stopping_condition

Optional function that determines when to terminate optimization early. Receives summary evaluations and returns `True` to stop.

```python
stopping_condition=lambda evals: (
    evals['my_evaluator']['value']['metric'] >= 0.95
)
```

Use `AND` conditions to ensure multiple metrics meet targets before stopping.

### jobs

Number of parallel workers for experiment execution. Higher values reduce total runtime but may hit API rate limits.

- **Default:** 1
- **Recommended:** 10-20 for most use cases

**Runtime example:** For a dataset of 100 records with 10 iterations:
- Serial (`jobs=1`): ~50 minutes (assuming 5s per call)
- Parallel (`jobs=20`): ~5 minutes

### config

Configuration dictionary passed to your task function. Must contain a `"prompt"` key with the initial prompt.

Optional fields include:
- `model_name`: Target model for the task
- `evaluation_output_format`: JSON schema for structured outputs
- `runs`: Number of times to run the task per dataset record
- Any custom parameters your task function needs

## Understanding results

The `OptimizationResult` object provides comprehensive access to optimization outcomes:

### Properties

- `best_prompt`: The highest-scoring prompt discovered
- `best_score`: Score of the best iteration
- `best_experiment_url`: Link to the Datadog experiment for detailed analysis
- `total_iterations`: Number of iterations completed
- `best_iteration`: Which iteration achieved the best score

### Methods

- `get_history()`: Complete data for all iterations (prompts, scores, results, URLs)
- `get_score_history()`: List of scores showing progression
- `get_prompt_history()`: List of prompts showing evolution
- `summary()`: Human-readable overview with score progression table

Example analyzing results:

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

## Best practices

### Dataset design

- Include 50-100 diverse examples covering typical and edge cases
- For classification tasks, ensure balanced representation across classes
- Validate that ground truth labels are correct and consistent
- Version datasets for reproducibility

### Evaluation metrics

- Choose metrics aligned with business objectives (precision vs. recall trade-offs)
- Use multiple complementary metrics rather than a single aggregate score
- Weight metrics by business impact in your `compute_score` function
- Test evaluators independently before running optimization

### Labelization

- Create 2-5 distinct, descriptive labels (e.g., "CORRECT HIGH CONFIDENCE", "INCORRECT EDGE CASE")
- Ensure balanced label distribution (avoid 95% in one category)
- Labels help the optimizer understand different types of successes and failures

### Optimization model selection

Use advanced reasoning models for the `optimization_task`:
- **Recommended:** OpenAI o3-mini, o1-preview, or Claude 3.5 Sonnet
- Set `temperature=0` for deterministic behavior
- Use structured outputs (Pydantic models) for reliable parsing

Avoid using cheaper models (GPT-3.5-turbo, Claude Haiku) as they lack the reasoning depth needed for effective optimization.

### Production deployment

Before deploying an optimized prompt:
1. Human review the prompt for quality and appropriateness
2. A/B test on a small percentage of production traffic
3. Monitor both automated metrics and user feedback
4. Establish rollback procedures
5. Version control prompts alongside code
6. Re-optimize periodically as data distributions shift

## Troubleshooting

### Optimization doesn't improve performance

- **Check baseline score**: Is the initial prompt already near-optimal?
- **Review labelization**: Are categories meaningful and balanced?
- **Inspect suggestions**: Review prompts in iteration history to verify they're reasonable
- **Validate scoring**: Manually verify `compute_score` returns expected values
- **Check data quality**: Ensure correct labels and well-formed inputs

### Optimization crashes or produces errors

- Test all functions independently with sample data
- Verify function signatures match requirements
- Check API rate limits and error logs in Datadog
- Reduce `jobs` parameter if encountering rate limits
- Ensure evaluators handle edge cases (missing data, malformed output)

### Scores are unstable or chaotic

- Verify scoring function is monotonic (improving metrics increases score)
- Check that evaluators return consistent results for the same inputs
- Ensure sufficient dataset size (small datasets can cause instability)
- Try a different optimization model

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/testing/experiments
