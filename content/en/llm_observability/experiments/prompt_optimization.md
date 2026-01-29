---
title: Prompt Optimization
description: Automatically improve LLM prompts through iterative refinement and AI-powered evaluation.
private: true
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

Prompt Optimization automates the process of improving LLM prompts through systematic evaluation and AI-powered refinement. Instead of manually testing and tweaking prompts, you can use Prompt Optimization to analyze performance data, identify failure patterns, and suggest targeted improvements.

Prompt Optimization runs your LLM application on a dataset with the current prompt, measures performance using your custom metrics, and then uses a reasoning model to analyze the results and generate an improved prompt. This cycle repeats until your target metrics are achieved or the maximum number of iterations is reached.

### Prompt Optimization capabilities
- Automated prompt improvement through AI-powered analysis
- Customizable evaluation metrics for domain-specific tasks
- Built-in stopping conditions to prevent over-optimization
- Parallel experiment execution for rapid iteration
- Full integration with LLM Observability for tracking and debugging

Prompt Optimization supports any use case where the expected output is known and there is a defined way to score the model's predictions. Prompt Optimization's architecture supports any output type, including structured data extraction, free-form text generation, and numerical predictions.

## Prerequisites

- [`ddtrace`][1] version 4.3.0+
- LLM Observability enabled with Datadog [API and application keys][2]
- A [dataset][3] with representative examples (recommended: 50-100 records)
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

To help ensure robust optimization, Datadog recommends that you include diverse examples that cover typical cases and edge cases.

### 2. Define your task function

Implement the function that represents your LLM application. This function receives input data and the configuration (including the prompt being optimized):

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

### 3. Define evaluation functions

To optimize your prompt, you need multiple layers of metric computation:

- At the record level, label the results with confusion matrix conditions: true positive (TP), false positive (FP), true negative (TN), false negative (FN)
- Aggregate these labels across all records to compute intermediate metrics (for example, count the total TPs, FPs, TNs, and FNs, then calculate precision, recall, and accuracy)
- Compute the final score you want to optimize the prompt for by combining or selecting from the aggregated metrics (for example, return precision alone, or combine precision + accuracy)
- Label the misclassification examples to provide to the prompt optimizer

The following examples illustrate how to implement each steps.

- **Individual evaluators** measure each output:

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

- **Summary evaluators** compute aggregate metrics:

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

- **Scoring function** can return one of the values returned by one of the summary evaluators (for example, precision) or a combination of multiple metrics:

   ```python
   def compute_score(summary_evaluators):
       """Higher is better. Combine metrics according to business priorities."""
       metrics = summary_evaluators['precision_recall_evaluator']['value']
       # Optimize for precision
       return metrics['precision']
   ```

   or

   ```python
   def compute_score(summary_evaluators):
       """Computes F1 Score."""
       precision = summary_evaluators['precision_recall_evaluator']['value']['precision']
       recall = summary_evaluators['precision_recall_evaluator']['value']['recall']
       return 2 * (precision * recall) / (precision + recall)
   ```

- **Labelization functions** categorize results for showing diverse examples to the optimizer:

   ```python
   def labelization_function(individual_result):
       """Categorize results into meaningful groups."""
       eval_value = individual_result["evaluations"]["confusion_matrix_evaluator"]["value"]

       if eval_value in ("true_positive", "true_negative"):
           return "CORRECT PREDICTION"
       else:
           return "INCORRECT PREDICTION"
   ```

   The labelization function plays an important role in optimization: for each unique label, the optimizer receives one randomly selected example from that category (in the example above, the labels are `CORRECT PREDICTION` and `INCORRECT PREDICTION`). This means the number of labels directly determines the diversity of examples shown to the reasoning model.

   **Label names should be meaningful and descriptive**, as they are shown directly to the reasoning model. Use clear, human-readable labels like `HIGH CONFIDENCE ERROR` or `EDGE CASE FAILURE` rather than codes like `TYPE_A` or `CAT_3`. Design your labels to represent the key patterns or hints you want the optimizer to learn from, and keep the cardinality low (fewer than 10 distinct labels) to help ensure focused, actionable feedback.

### 4. Define optimization task

Create a function that calls a reasoning model to suggest prompt improvements:

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

<div class="alert alert-info">The optimization task receives a system prompt with instructions for improving prompts and a user prompt with current performance data and examples. Prompt Optimization automatically constructs these prompts based on your evaluation results. The function must return the improved prompt as a string.</div>

### 5. Run optimization

Create and run the optimization:

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

#### Configuration options

`config`
: A configuration dictionary passed to your task function. Contains the following keys, as well as any custom parameters your task function needs:

  `"prompt"`
  : **required**<br/>
  The initial prompt

  `"model_name"`
  : _optional_<br/>
  Specifies the target model for your task. When provided, the optimizer includes model-specific guidance in its suggestions, tailoring improvements to that model's capabilities and limitations (for example, GPT-4 versus Claude versus Llama).

  `evaluation_output_format`
  : _optional_<br/>
  Provides the JSON schema for your expected output structure. The optimizer uses this to ensure the improved prompt explicitly instructs the model to produce correctly formatted output. This is particularly valuable for structured outputs, where format compliance is critical.

  `runs`
  : _optional_<br/>
  Controls how many times each dataset record is evaluated. Setting `runs` > 1 helps reduce variance in metrics for tasks with non-deterministic outputs, providing more stable optimization signals at the cost of longer execution time.

`max_iterations`
: Controls the maximum number of optimization cycles. Each iteration tests a new prompt on the full dataset.<br/>
  **Default**: 5<br/>
  **Recommended**: 10-20 for initial exploration, 5-10 for production

`stopping_condition`
: Optional function that determines when to terminate optimization early. Receives summary evaluations and returns `True` to stop.

  ```python
  stopping_condition=lambda evals: (
      evals['my_evaluator']['value']['metric'] >= 0.95
  )
  ```

  Use `AND` conditions to help ensure multiple metrics meet targets before stopping.

#### Configure parallel workers

When you execute optimization, you can configure your number of parallel workers by passing the `jobs` parameter to the `run()` function:

```python
result = prompt_optimization.run(jobs=20)
```

Higher values reduce total runtime, but may hit API rate limits.

`jobs`
: **Default**: 1</br>
**Recommended**: 10-20, for most use cases

**Example** for a dataset of 100 records with 10 iterations:
- `jobs=1` (serial): ~50 minutes (assuming 5s per call)
- `jobs=20` (parallel): ~5 minutes

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

- Create 2-5 distinct, descriptive labels (for example: `CORRECT HIGH CONFIDENCE`, `INCORRECT EDGE CASE`)
- Ensure balanced label distribution (for example, avoid 95% in one category)
- Use labels to help the optimizer understand different types of successes and failures

### Optimization model selection

Use advanced reasoning models for the `optimization_task`:
- **Recommended:** OpenAI o3-mini, o1-preview, or Claude 3.5 Sonnet
- Use structured outputs (Pydantic models) for reliable parsing

Avoid using cheaper models (GPT-3.5-turbo, Claude Haiku) as they lack the reasoning depth needed for effective optimization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /llm_observability/experiments/datasets?tab=csv
