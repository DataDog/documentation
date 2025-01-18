---
title: RAGAS Integration
kind: documentation
description: "Monitor your RAG applications for hallucinations with LLM Observability's integration with the RAGAS evaluation framework."
aliases:
  - /llm_observability/ragas
further_reading:
  - link: "llm_observability/quickstart"
    tag: "Documentation"
    text: "Trace an LLM Application"
  - link: "llm_observability/submit_evaluations"
    tag: "Documentation" 
    text: "Submit Evaluations"
---

## Overview

Monitor your RAG applications for hallucinations with LLM Observability's integration with the [RAGAS][1] evaluation framework.

## Prerequisites 

1. Your application's LLM calls must be auto-instrumented from our supported integrations (OpenAI, Bedrock, Anthropic, Gemini) or manually instrumented.

    ```python
    from ddtrace.llmobs import LLMObs
    from ddtrace.llmobs.utils import Prompt

    # your llm call is auto-instrumented...
    oai_client.chat.completions.create(...)

    # your llm call is manually instrumented ...
    @llm(model = "llama")
    def generate_answer():
        ...
    ```

2. The ragas python library of version 0.1.x should be installed in your application's environment.

{{< tabs >}}
{{% tab "Installation Command" %}}
```bash
pip install ragas==0.1.21 openai ddtrace==2.17.0
```
{{% /tab %}}
{{< /tabs >}}

The RAGAS integration works by starting a background worker in your application that uses the RAGAS python library to generate evaluations on finished spans.

By default, RAGAS uses OpenAI's GPT-4 model for evaluations, which requires the `OPENAI_API_KEY` to be set. You can also [customize RAGAS](#customizing-ragas) to use a different LLM.

## Evaluation Metrics

### Faithfulness

Faithfulness is a score that evaluates how consistent an LLM's generation is against the provided ground truth context data.

The score is generated through three steps:
1. Creating Statements - asking another LLM to break down the `answer` into individual statements
2. Creating Verdicts - For each statement, determine if it is unfaithful to the `context`
3. Computing Score - divide the number of contradicting statements over the total number of statements

For more information, see the official [RAGAS Faithfulness documentation][2].

### Answer Relevancy

{{< site-region region="preview" >}}
<div class="alert alert-preview">
The Answer Relevancy metric is coming soon.
</div>
{{< /site-region >}}

### Context Precision 

{{< site-region region="preview" >}}
<div class="alert alert-preview">
The Context Precision metric is coming soon. 
</div>
{{< /site-region >}}

## Configuration 

### Instrumenting RAG Contexts

Faithfulness scoring requires LLM spans to be instrumented with the RAG context used in the generation.

RAG context should be logged in an LLM span's prompt variables. A prompt consists of a template, template variables, version, and id.

The RAGAS integration will try to extract context information from the prompt variables attached to a span.

You can specify which variables store ground truth context information for the LLM call using the `context_variable_keys` field of a prompt. If not specified, we'll assume the context information is stored in the `context` variable key.

{{< tabs >}}
{{% tab "Auto-instrumented Example" %}}
```python
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.utils import Prompt

# if your llm call is auto-instrumented...
with LLMOBs.annotation_context(
    prompt=Prompt(
        variables={"context": "rag context here"},
        rag_context_variable_keys = ["context"], # defaults to ['context']
        rag_query_variable_keys = ["question"], # defaults to ['question']
    ),
    name="generate_answer",
):
    oai_client.chat.completions.create(...) # autoinstrumented llm call
```
{{% /tab %}}
{{% tab "Manually Instrumented Example" %}}
```python
# if your llm call is manually instrumented ...
@llm(model = "llama")
def generate_answer():
    ...
    LLMObs.annotate(
        prompt=Prompt(variables={'content': "rag context..."})
    )
```
{{% /tab %}}
{{< /tabs >}}

### Enabling Evaluations

Enable RAGAS evaluations through the `_DD_LLMOBS_EVALUATORS` environment variable:

```bash
_DD_LLMOBS_EVALUATORS=ragas_faithfulness DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=test-rag-app \
DD_API_KEY=<YOUR_DATADOG_API_KEY> \
DD_SITE=datadoghq.com \
DD_LLMOBS_AGENTLESS_ENABLED=1 ddtrace-run python quickstart.py
```

### Sampling

To only enable faithfulness scoring on certain LLM calls, you can set sampling rules via the `_DD_LLMOBS_EVALUATORS_SAMPLING_RULES` environment variable.

Each rule must have a sample rate from 0 to 1. Optionally, you can add:
- `evaluator_label`  
- `span_name`

So the sample rate for evaluation only applies to certain evaluators & span names.

For example, to evaluate the LLM span 'answer_question' for faithfulness 50% of the time, and no other LLM spans:

```bash
export _DD_LLMOBS_EVALUATORS_SAMPLING_RULES='[{"sample_rate": 0.5, "evaluator_label": "ragas_faithfulness", "span_name": "answer_question"}, {"sample_rate": 0}]'
```

## Viewing Results

### Seeing RAGAS Scores in the UI

Faithfulness scores are sent to Datadog as an evaluation metric with label `ragas_faithfulness`.

You can view these scores on the traces page:

1. Switch to all spans view
2. Add `ragas_faithfulness` custom evaluation as a column on the traces table  
3. Filter for LLM spans

### Tracing RAGAS

RAGAS scores are generated using LLM-powered workflows. Datadog automatically traces these operations to generate scores and surfaces them under an ml application named `dd-ragas-{your ml app name}`. Use this ML App to track the operational metrics for running the Datadog-introduced RAGAS evaluations themselves.

## Customizing RAGAS

[Customizations][3] applied to the global ragas faithfulness instance will also be applied to Datadog's RAGAS evaluators:

```python
from langchain_openai import ChatOpenAI
from ragas.metrics import faithfulness
from ragas.llms.base import LangchainLLMWrapper

faithfulness.llm = LangchainLLMWrapper(ChatOpenAI(model="gpt-4"))
faithfulness.statement_prompt.instruction += "\nMake sure text containing code instructions are grouped with contextual information on how to run that code."
```

## Troubleshooting

### Missing Evaluations

Your LLM inference could be missing an evaluation because:

1. The LLM span was not sampled for an evaluation given you have implemented [sampling](#sampling)
2. An error occurred during the RAGAS evaluation. You can navigate to the `dd-ragas-<your-ml-app>` ML Application to inspect error traces

The `LLMObs.flush()` command is also a useful tool to guarantee all traces & evaluations are flushed to Datadog. Keep in mind that this is a blocking function.

[1]: https://github.com/explodinggradients/ragas
[2]: https://docs.ragas.io/en/latest/concepts/metrics/faithfulness.html
[3]: https://docs.ragas.io/en/latest/concepts/metrics/customization.html
