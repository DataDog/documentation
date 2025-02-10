---
title: Ragas Evaluations
description: Monitor your RAG applications for hallucinations with LLM Observability's integration with the RAGAS evaluation framework.
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

<!-- <div class="alert alert-warning">
The RAGAS integration is only tested for ragas==0.1.*
</div> -->

<div class="alert alert-warning">
Datadog recommends that you use sampling for Ragas evaluations.These LLM-as-a-judge evaluations are powered by your LLM provider's account. Evaluations are automatically traced and sent to Datadog. These traces contain LLM spans, which may affect your LLM Observability billing.
</div>

Monitor the performance of your retrieval augmented generation (RAG) applications in production with LLM Observability's integration with the [Ragas][1] evaluation framework.

[Ragas][1] is an evaluation framework for retrieval augmented generation (RAG) applications. Datadog's Ragas integration enables you to evaluate your production application with faithfulness, answer relevancy, and context precision scores. You can use these scores to find traces that have high likelihood of inaccurate answers and review them to improve your RAG pipeline.


## Quickstart

1. Install required dependencies:
    ```bash
    pip install ragas==0.1.21 openai ddtrace>=3.0.0
    ```

2. Create a file named `quickstart.py` with the following code:
    ```python
    import os
    from ddtrace.llmobs import LLMObs
    from ddtrace.llmobs.utils import Prompt
    from openai import OpenAI

    LLMObs.enable(
        ml_app="test-rag-app",
        agentless_enabled=True,
    )

    oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    rag_context = "The First AFL–NFL World Championship Game was an American football game played on January 15, 1967, at the Los Angeles Memorial Coliseum in Los Angeles"

    with LLMObs.annotation_context(
        prompt=Prompt(variables={"context": rag_context}),
    ):
        completion = oai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Answer the user's question given the following context information {}".format(rag_context)},
                {"role": "user", "content": "When was the first superbowl?"},
            ],
        )
    ```

3. Run the script with Ragas faithfulness evaluation enabled:
    ```bash
    DD_LLMOBS_EVALUATORS=ragas_faithfulness DD_ENV=dev DD_API_KEY=<YOUR-DD-API-KEY> DD_SITE=datadoghq.com python quickstart.py
    ```

4. View your results in the Datadog UI by navigating to your test-rag-app ML application. You should see your traced LLM calls with faithfulness scoring at:
    ```
    https://<YOUR-DATADOG-SITE-URL>/llm/traces?query=%40ml_app%3Atest-rag-app
    ```

## Evaluations

### Faithfulness

The _Faithfulness_ score evaluates how consistent an LLM's generation is against the provided ground truth context data.

This score is generated through three steps:
1. **Creating statements**: Asking another LLM to break down an answer into individual statements
2. **Creating verdicts**: For each statement, determining if it is unfaithful to the provided context
3. **Computing a score**: Dividing the number of contradicting statements over the total number of statements

For more information, see [Ragas' Faithfulness documentation][2].

### Answer Relevancy

The _Answer Relevancy_ (or _Response Relevancy_) score assesses how pertinent the generated answer is to the given prompt. A lower score is assigned to answers that are incomplete or contain redundant information, and higher scores indicate better relevancy. This metric is computed using the question, the retrieved contexts, and the answer.

The Answer Relevancy score is defined as the mean cosine similarity of the original question to a number of artificial questions, which were generated (reverse engineered) based on the response.

For more information, see [Ragas' Answer Relevancy documentation][3].

### Context Precision 

The _Context Precision_ score assesses if the context was useful in arriving at the given answer. This is computed by dividing the number of relevant contexts by the total number of contexts.

This score is modified from Ragas' original Context Precision metric, which computes the mean of the precision@k for each chunk in the context, where presicion@k is the ratio of the number of relevant chunks at rank _k_ to the total number of chunks at rank _k_.

For more information, see [Ragas' Context Precision documentation][4].


## Setup 

Datadog's Ragas evaluations require `ragas` v0.1+.

1. **Install dependencies**. Run the following command:

   {{< code-block lang="bash" >}}
   pip install ragas==0.1.21 openai ddtrace==2.17.0
   {{< /code-block >}}

   The Ragas integration automatically runs evaluations in the background of your application. By default, Ragas uses OpenAI's GPT-4 model for evaluations, which requires the `OPENAI_API_KEY` to be set. You can also [customize RAGAS](#customizing-ragas) to use a different LLM.

2. **Instrument RAG contexts**. 

<!-- ### Prerequisites
- Your application's LLM calls are instrumented.
  
   For example:

    ```python
    from ddtrace.llmobs import LLMObs
    from ddtrace.llmobs.utils import Prompt

    # if your llm call is auto-instrumented:
    oai_client.chat.completions.create(...)

    # if your llm call is manually instrumented:
    @llm(model = "llama")
    def generate_answer():
        ...
    ```

- `ragas` v0.1+

{{< tabs >}}
{{% tab "Installation Command" %}}
```bash
pip install ragas==0.1.21 openai ddtrace==2.17.0
```
{{% /tab %}}
{{< /tabs >}} -->



### Instrumenting RAG Contexts

RAGAS scoring requires LLM spans to be instrumented with the RAG context used in the generation.

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


### Configuration 

#### Enabling Evaluations

Enable RAGAS evaluations through the `DD_LLMOBS_EVALUATORS` environment variable.

This environment variable should be set to a valid comma-separated list of evaluator labels.

| Variable | Description | Default | Valid Evaluator Labels |
|----------|-------------|---------|--------------|
| `DD_LLMOBS_EVALUATORS` | Comma-separated list of enabled RAGAS evaluators | `""` | - `ragas_faithfulness`<br>- `ragas_context_precision`<br>- `ragas_answer_relevancy` |

Example of enabling all RAGAS evaluators:
```bash
DD_LLMOBS_EVALUATORS="ragas_faithfulness,ragas_context_precision,ragas_answer_relevancy"
DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=test-rag-app \
DD_API_KEY=<YOUR_DATADOG_API_KEY> \
DD_SITE=datadoghq.com \
DD_LLMOBS_AGENTLESS_ENABLED=1 ddtrace-run python quickstart.py
```

#### Sampling Configuration

To only enable RAGAS scoring on certain LLM calls, you can set sampling rules via the `DD_LLMOBS_EVALUATORS_SAMPLING_RULES` environment variable.

The `DD_LLMOBS_EVALUATORS_SAMPLING_RULES` variable controls evaluation sampling using a JSON array of rules. Each rule requires:

| Field | Description | Required | Type |
|-------|-------------|----------|------|
| `sample_rate` | Sampling rate from 0 to 1 | Yes | Float |
| `evaluator_label` | RAGAS evaluator to apply rule to | No | String |
| `span_name` | Name of spans to apply rule to | No | String |

Example of sampling configuration:
```bash
# Sample faithfulness evaluations at 50% for 'answer_question' spans only
export DD_LLMOBS_EVALUATORS_SAMPLING_RULES='[
  {
    "sample_rate": 0.5,
    "evaluator_label": "ragas_faithfulness",
    "span_name": "answer_question"
  },
  {
    "sample_rate": 0
  }
]'
```


## Customizing RAGAS

[Customizations][5] applied to the global ragas instance will also be applied to Datadog's RAGAS evaluators:

```python
from langchain_openai import ChatOpenAI
from ragas.metrics import faithfulness
from ragas.llms.base import LangchainLLMWrapper

faithfulness.llm = LangchainLLMWrapper(ChatOpenAI(model="gpt-4"))
faithfulness.statement_prompt.instruction += "\nMake sure text containing code instructions are grouped with contextual information on how to run that code."
```

## Viewing Results

### Seeing RAGAS Scores in the UI

RAGAS scores are sent to Datadog as an evaluation metric.

You can view these scores on the traces page:

1. Switch to all spans view
2. Filter for LLM spans 
3. Add your desire ragas metric as a column to the traces table 

### RAGAS Traces

RAGAS scores are generated using LLM-powered workflows. Datadog automatically traces these operations to generate scores and surfaces them under same ML Application name. To filter these traces out, exclude spans tagged with 
`runner.integration:ragas`.

## Troubleshooting

### Missing Evaluations

Your LLM inference could be missing an evaluation because:

1. The LLM span was not sampled for an evaluation given you have implemented [sampling](#sampling)
2. An error occurred during the RAGAS evaluation. You can search for traces of 
the ragas evaluation via the `runner.integration:ragas` tag.

The `LLMObs.flush()` command is also a useful tool to guarantee all traces & evaluations are flushed to Datadog. Keep in mind that this is a blocking function.

[1]: https://github.com/explodinggradients/ragas
[2]: https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/faithfulness/
[3]: https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/answer_relevance/
[4]: https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/context_precision/
[5]: https://docs.ragas.io/en/stable/howtos/customizations/