---
title: Setup and Usage
description: How to set up Agent Observability Experiments and start running experiments.
---

This page describes how to set up and use Agent Observability Experiments with the Python or Node.js SDK. For complete runnable Node.js examples, see the [Node.js experiments examples](https://github.com/DataDog/llm-observability/tree/main/experiments/nodejs).

## Set up Agent Observability

If you have not already set up Agent Observability, use one of the following SDKs. Experiments require both a Datadog API key and application key.

1. Install the Agent Observability SDK:

{{< tabs >}}
{{% tab "Python" %}}
```shell
pip install ddtrace>=4.3.0
```
{{% /tab %}}

{{% tab "Node.js" %}}
```shell
npm install dd-trace
```
{{% /tab %}}
{{< /tabs >}}

2. Enable Agent Observability:

{{< tabs >}}
{{% tab "Python" %}}
```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```
{{% /tab %}}

{{% tab "Node.js" %}}
Set `DD_API_KEY` and `DD_APP_KEY` in your environment, then initialize `dd-trace` in your application entrypoint:

```javascript
const tracer = require('dd-trace').init({
  service: '<YOUR_SERVICE>',
  site: 'datadoghq.com',
  llmobs: {
    mlApp: '<YOUR_PROJECT>',
    agentlessEnabled: true,
  },
})

const { experiments } = tracer.llmobs
```

The `mlApp` value identifies the project that contains your datasets and experiments. The `llmobs` options enable Agent Observability in code. If you use command-line setup, also provide the application key because experiments use the Experiments API:

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_APP_KEY=<YOUR_APP_KEY> \
DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_PROJECT> \
NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

For more information, see the [Node.js tracer command-line setup][7].
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">You must supply both an <code>api_key</code> and <code>app_key</code> for Python, or set both <code>DD_API_KEY</code> and <code>DD_APP_KEY</code> for Node.js.</div>

Your Datadog site is {{< region-param key="dd_site" code="true" >}}. If your site differs, replace `datadoghq.com` in the examples with your Datadog site.

### APM Trace correlation

To correlate your Experiment spans with [APM Traces][5], run Agent Observability through a Datadog Agent and keep `agentless_enabled` set to `False` (the default). The Agent forwards trace data to APM, which enables Experiment ↔ APM Trace correlation.

{{< tabs >}}
{{% tab "Python" %}}
```python
LLMObs.enable(
    api_key="<YOUR_API_KEY>",
    app_key="<YOUR_APP_KEY>",
    site="datadoghq.com",
    agentless_enabled=False,  # default — required for APM Trace correlation
    project_name="<YOUR_PROJECT>",
)
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
const tracer = require('dd-trace').init({
  service: '<YOUR_SERVICE>',
  site: 'datadoghq.com',
  llmobs: {
    mlApp: '<YOUR_PROJECT>',
    agentlessEnabled: false, // default — required for APM Trace correlation
  },
})
```
{{% /tab %}}
{{< /tabs >}}

If you are running without an Agent (for example, in a notebook or CI environment), you can set `agentless_enabled=True` or `agentlessEnabled: true`, but corresponding APM spans are not generated for Experiment spans from agentless runs.

## Create a project

_Projects_ are the core organizational layer for LLM Experiments. All datasets and experiments live in a project. You can create a project manually in the Datadog console, API, or SDK by specifying a project name that does not already exist.

{{< tabs >}}
{{% tab "Python" %}}
```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    ...,
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: '<YOUR_PROJECT>',
  },
})
```
{{% /tab %}}
{{< /tabs >}}

For Node.js, the project is created when the experiments client first accesses it. The `mlApp` value is also used as the project name.

## Create a dataset

A _dataset_ is a collection of _inputs_, _expected outputs_, and _metadata_ that represent scenarios you want to test your agent on. Each dataset is associated with a _project_.

- **input** (required): Represents all the information that the agent can access in a task.
- **expected output** (optional): Also called _ground truth_, represents the ideal answer that the agent should output. You can use _expected output_ to store the actual output of the app, as well as any intermediary results you want to assess.
- **metadata** (optional): Contains useful information to categorize the record and use for further analysis. For example: topics, tags, descriptions, and notes.

To create a dataset from a CSV file, use `LLMObs.create_dataset_from_csv()`:

{{< tabs >}}
{{% tab "Python" %}}
```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],             # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],                # Optional: Additional columns as metadata
    csv_delimiter=","                               # Optional: Defaults to comma
)

# Example "questions.csv":
# question,category,answer,difficulty
# What is the capital of Japan?,geography,Tokyo,medium
# What is the capital of Brazil?,geography,Brasília,medium
```
{{% /tab %}}

{{% tab "Node.js" %}}
The Node.js SDK does not include a CSV-specific helper. Parse the CSV with the library of your choice, then pass the records to `createDataset()`:

```javascript
const dataset = experiments.createDataset('capitals-of-the-world', {
  description: 'Geography quiz dataset',
  records: [
    {
      inputData: { question: 'What is the capital of Japan?', category: 'geography' },
      expectedOutput: 'Tokyo',
      metadata: { difficulty: 'medium' },
    },
    {
      inputData: { question: 'What is the capital of Brazil?', category: 'geography' },
      expectedOutput: 'Brasília',
      metadata: { difficulty: 'medium' },
    },
  ],
})

// The dataset is pushed automatically when the experiment runs.
// To push it earlier, use: await dataset.push()
```
{{% /tab %}}
{{< /tabs >}}

See [Datasets][1] for more information about datasets, including how to manually create datasets, retrieve and manage datasets, and how Datadog retains dataset versions.

## Create an experiment

An _experiment_ lets you systematically test your LLM application by running your agent across a set of scenarios from your dataset and measuring performance against the expected outputs using evaluators. You can then compare how different app configurations perform, side by side.

- **task**: Defines the core workflow you want to evaluate. It can range from a single LLM call to a more complex flow involving multiple LLM calls and RAG steps. The task is executed sequentially across all records in the dataset.
- **evaluator**: A function, executed on each record, that measures how well the model or agent performs. Evaluators allow you to compare the output to either the expected output or the original input.
- **summary evaluators**: Optional functions executed against all the data of the experiment (input, output, expected output, and evaluator results). Summary evaluators allow you to compute more advanced metrics like precision, recall, and accuracy across your dataset.

To create an experiment:

### 1. Load a dataset

{{< tabs >}}
{{% tab "Python" %}}
```python
from ddtrace.llmobs import LLMObs
from typing import Dict, Any, Optional, List

dataset = LLMObs.pull_dataset("capitals-of-the-world")
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
const dataset = await experiments.pullDataset('capitals-of-the-world')
```
{{% /tab %}}
{{< /tabs >}}

### 2. Define a task function that processes a single dataset record

{{< tabs >}}
{{% tab "Python" %}}
```python
def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
    question = input_data["question"]
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
async function task (inputData, config, metadata) {
  const question = inputData.question
  // Your LLM or processing logic here
  return question.includes('China') ? 'Beijing' : 'Unknown'
}
```
{{% /tab %}}
{{< /tabs >}}

A task can take any non-null type as `input_data` or `inputData` (string, number, Boolean, object, or array). The output that will be used in evaluators can be any type. This example generates a string, but a dictionary or object can be generated as output to store intermediary information and compare in evaluators.

Optionally, your task function can accept metadata from the dataset record:

{{< tabs >}}
{{% tab "Python" %}}
```python
def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
    difficulty = metadata.get("difficulty", "unknown") if metadata else "unknown"
    question = input_data["question"]
    return "Beijing" if "China" in question else "Unknown"
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
function task (inputData, config, metadata) {
  const difficulty = metadata?.difficulty ?? 'unknown'
  const question = inputData.question
  // Use difficulty in the task when it is part of your evaluation logic.
  return question.includes('China') ? 'Beijing' : 'Unknown'
}
```
{{% /tab %}}
{{< /tabs >}}

You can trace the different parts of your Experiment task (workflow, tool calls, and so on) using the same tracing APIs you use in production. For Python, see the [custom tracing decorators][2]. For Node.js, use the `llmobs.trace()` API. If you use a [supported Python framework][3] or [supported Node.js framework][8] (OpenAI, Amazon Bedrock, and so on), Agent Observability automatically traces and annotates calls to LLM frameworks and libraries, giving you out-of-the-box observability for calls that your LLM application makes.

{{< tabs >}}
{{% tab "Python" %}}
```python
# Example: trace a workflow or tool call with the same decorators used in production.
from ddtrace.llmobs.decorators import workflow

@workflow(name="retrieve_context")
def retrieve_context(question):
    return call_retriever(question)
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
// Example: trace a workflow or tool call with the same LLMObs APIs used in production.
const context = await tracer.llmobs.trace(
  { kind: 'task', name: 'retrieve_context' },
  async () => callRetriever(question),
)
```
{{% /tab %}}
{{< /tabs >}}

#### Using OpenTelemetry spans inside experiments

If your application uses [OpenTelemetry instrumentation][6], you can create OTel spans inside your experiment task. With `DD_TRACE_OTEL_ENABLED=1`, the Datadog tracer acts as the OpenTelemetry TracerProvider, so OTel spans appear as children of the experiment span automatically.

{{< tabs >}}
{{% tab "Python" %}}
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
{{% /tab %}}

{{% tab "Node.js" %}}
Install the OpenTelemetry API if it is not already a dependency:

```shell
npm install @opentelemetry/api
```

```javascript
const { trace } = require('@opentelemetry/api')

const otelTracer = trace.getTracer('my-experiment')

async function task (inputData, config, metadata) {
  const question = inputData.question

  return otelTracer.startActiveSpan('my-llm-call', async (span) => {
    span.setAttribute('gen_ai.operation.name', 'chat')
    span.setAttribute('gen_ai.system', 'openai')
    span.setAttribute('gen_ai.request.model', 'gpt-4o')
    span.setAttribute('gen_ai.usage.input_tokens', 25)
    span.setAttribute('gen_ai.usage.output_tokens', 8)
    span.setAttribute('gen_ai.input.messages', JSON.stringify([
      { role: 'user', parts: [{ type: 'text', content: question }] },
    ]))

    const result = await callMyLlm(question)

    span.setAttribute('gen_ai.output.messages', JSON.stringify([
      { role: 'assistant', parts: [{ type: 'text', content: result }] },
    ]))
    span.end()
    return result
  })
}
```
{{% /tab %}}
{{< /tabs >}}

To enable this, set the `DD_TRACE_OTEL_ENABLED` environment variable:

{{< tabs >}}
{{% tab "Python" %}}
```shell
DD_TRACE_OTEL_ENABLED=1 python my_experiment.py
```
{{% /tab %}}

{{% tab "Node.js" %}}
```shell
DD_TRACE_OTEL_ENABLED=1 node my_experiment.js
```
{{% /tab %}}
{{< /tabs >}}

### 3. Define evaluators

Evaluators measure how well your model or agent performs on each record. You can define evaluators using function-based evaluators. Python also supports reusable class-based evaluators.

For detailed information on building evaluators, including the full data model reference and best practices, see the [Evaluation Developer Guide][4].

Datadog supports the following evaluator return types:

- **Boolean**: returns true or false
- **score**: returns a numeric value (float)
- **categorical**: returns a labeled category (string)
- **json**: returns structured data (dict or object)

{{< tabs >}}
{{% tab "Python" %}}
#### Function-based evaluators

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
from ddtrace.llmobs import EvaluatorResult, MultiEvaluatorResult

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

#### Class-based evaluators

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
{{% /tab %}}

{{% tab "Node.js" %}}
The Node.js SDK supports function evaluators. Return a Boolean, number, string, or JSON-serializable object. Use an object map when you want to assign evaluator names explicitly.

```javascript
function exact_match (inputData, outputData, expectedOutput) {
  return outputData === expectedOutput
}

function overlap (inputData, outputData, expectedOutput) {
  const expected = new Set(String(expectedOutput))
  const output = new Set(String(outputData))
  const intersection = [...output].filter(value => expected.has(value)).length
  const union = new Set([...expected, ...output]).size
  return intersection / union
}

function fake_llm_as_a_judge (inputData, outputData, expectedOutput) {
  // Return a categorical metric. Use a separate evaluator for each metric.
  return 'excellent'
}
```

Class-based evaluators and `MultiEvaluatorResult` are not part of the Node.js experiments API. Define multiple named functions when you need multiple metrics.
{{% /tab %}}
{{< /tabs >}}

### 4. (Optional) Define summary evaluators

Summary evaluators run after all record-level evaluators have finished, and receive the aggregated results to compute dataset-level statistics like averages or pass rates. Like record-level evaluators, you can define summary evaluators as functions or classes.

For the class-based approach using `BaseSummaryEvaluator`, see the [Evaluation Developer Guide][4].

{{< tabs >}}
{{% tab "Python" %}}
#### Function-based summary evaluators

```python
def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
    return evaluators_results["exact_match"].count(True)
```

Summary evaluator functions can take a list of any non-null type as `inputs` (string, number, Boolean, object, or array); `outputs` and `expected_outputs` can be lists of any type. `evaluators_results` is a dictionary of lists of results from evaluators, keyed by the name of the evaluator function.

#### Class-based summary evaluators

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
{{% /tab %}}

{{% tab "Node.js" %}}
Summary evaluators are functions that receive the inputs, outputs, expected outputs, and an object containing the results from each evaluator. The optional fifth argument contains record metadata.

```javascript
function num_exact_matches (inputs, outputs, expectedOutputs, evaluatorResults, metadata) {
  return (evaluatorResults.exact_match || []).filter(Boolean).length
}
```

The Node.js SDK does not use class-based summary evaluators. Define multiple named summary evaluator functions when you need multiple dataset-level metrics.
{{% /tab %}}
{{< /tabs >}}

### 5. Create and run the experiment.

{{< tabs >}}
{{% tab "Python" %}}
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
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
const experiment = experiments.experiment({
  name: 'capital-cities-test',
  task,
  dataset,
  evaluators: {
    exact_match,
    overlap,
    fake_llm_as_a_judge,
  },
  summaryEvaluators: {
    num_exact_matches,
  },
  description: 'Testing capital cities knowledge',
  config: {
    model: 'gpt-4',
    version: '1.0',
  },
})

// Run the experiment. The dataset is pushed automatically if needed.
const results = await experiment.run()

// Process results
for (const row of results.rows) {
  console.log(`Record ${row.index}`)
  console.log(`Input: ${JSON.stringify(row.input)}`)
  console.log(`Output: ${JSON.stringify(row.output)}`)
  console.log(`Score: ${row.evaluations.exact_match}`)
  if (row.isError) {
    console.log(`Error: ${row.errorMessage}`)
  }
}
```
{{% /tab %}}
{{< /tabs >}}

To increase execution speed or limit the data used by the experiment:

{{< tabs >}}
{{% tab "Python" %}}
```python
# Increase execution speed
results = experiment.run(jobs=4)

# Test your pipeline on a subset of the data
results = experiment.run(sample_size=10)

# Stop the experiment if an error occurs
results = experiment.run(raise_errors=True)
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
// The Node.js SDK runs dataset records sequentially.
// Use your task implementation to manage concurrency if needed.
const results = await experiment.run({
  throwOnErrors: true,
})
```
{{% /tab %}}
{{< /tabs >}}

### 6. Review your experiment results in Datadog.

{{< tabs >}}
{{% tab "Python" %}}
```python
print(f"View experiment: {experiment.url}")
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
console.log(`View experiment: ${results.url}`)
// The same URL is available from the experiment after it has run.
console.log(experiment.url())
```
{{% /tab %}}
{{< /tabs >}}

Note: LLM Experiments traces are retained for 90 days.

[1]: /llm_observability/experiments/datasets
[2]: /llm_observability/instrumentation/custom_instrumentation?tab=decorators#trace-an-llm-application
[3]: /llm_observability/instrumentation/auto_instrumentation?tab=python
[4]: /llm_observability/guide/evaluation_developer_guide
[5]: /llm_observability/monitoring/llm_observability_and_apm/
[6]: /llm_observability/instrumentation/otel_instrumentation
[7]: /llm_observability/instrumentation/sdk?tab=nodejs#command-line-setup
[8]: /llm_observability/instrumentation/auto_instrumentation?tab=nodejs
