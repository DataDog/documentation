---
title: Ragas Evaluations
aliases:
 - /llm_observability/ragas_evaluations
further_reading:
    - link: '/llm_observability/evaluations/external_evaluations'
      tag: 'Documentation'
      text: 'Submit Evaluations'
---

## Overview

[Ragas][1] is an open source library for evaluating and improving LLM applications. Ragas also provides LLM and non-LLM-based metrics to help assess the performance of your LLM application offline and in production. Datadog's Ragas integration enables you to evaluate your production application with scores for faithfulness, answer relevancy, and context precision. You can use these scores to find traces that have a high likelihood of inaccurate answers and review them to improve your RAG pipeline.

For a simplified setup guide, see [Ragas Quickstart][7].

<div class="alert alert-danger">
Datadog recommends that you use sampling for Ragas evaluations. These LLM-as-a-judge evaluations are powered by your LLM provider's account. Evaluations are automatically traced and sent to Datadog. These traces contain LLM spans, which may affect your LLM Observability billing. See <a href="#sampling">Sampling</a>.
</div>

## Evaluations

### Faithfulness

The _Faithfulness_ score evaluates how consistent an LLM's generation is against the provided ground truth context data.

This score is generated through three steps:
1. **Creating statements**: Asking another LLM to break down an answer into individual statements
2. **Creating verdicts**: For each statement, determining if it is unfaithful to the provided context
3. **Computing a score**: Dividing the number of contradicting statements over the total number of statements

For more information, see [Ragas's Faithfulness documentation][2].

### Answer Relevancy

The _Answer Relevancy_ (or _Response Relevancy_) score assesses how pertinent the generated answer is to the given prompt. A lower score is assigned to answers that are incomplete or contain redundant information, and higher scores indicate better relevancy. This metric is computed using the question, the retrieved contexts, and the answer.

The Answer Relevancy score is defined as the mean cosine similarity of the original question to a number of artificial questions, which are generated (reverse engineered) based on the response.

For more information, see [Ragas's Answer Relevancy documentation][3].

### Context Precision 

The _Context Precision_ score assesses if the context was useful in arriving at the given answer. 

This score is modified from Ragas's original Context Precision metric, which computes the mean of the Precision@k for each chunk in the context. Precision@k is the ratio of the number of relevant chunks at rank _k_ to the total number of chunks at rank _k_.

Datadog's Context Precision score is computed by dividing the number of relevant contexts by the total number of contexts.

For more information, see [Ragas's Context Precision documentation][4].

## Setup 

Datadog's Ragas evaluations require `ragas` v0.1+ and `ddtrace` v3.0.0+.

1. **Install dependencies**. Run the following command:

   {{< code-block lang="bash" >}}
   pip install ragas==0.1.21 openai ddtrace>=3.0.0
   {{< /code-block >}}

   The Ragas integration automatically runs evaluations in the background of your application. By default, Ragas uses OpenAI's GPT-4 model for evaluations, which requires you to set an `OPENAI_API_KEY` in your environment. You can also [customize Ragas](#customization) to use a different LLM.

2. **Instrument your LLM calls with RAG context information**. Datadog's Ragas integration attempts to extract context information from the prompt variables attached to a span.  

   **Examples**:
   {{< tabs >}}
   {{% tab "Auto-instrumentation" %}}
   ```python
   from ddtrace.llmobs import LLMObs
   from ddtrace.llmobs.utils import Prompt

   with LLMOBs.annotation_context(
       prompt=Prompt(
           variables={"context": "rag context here"},
           rag_context_variable_keys = ["context"], # defaults to ['context']
           rag_query_variable_keys = ["question"], # defaults to ['question']
       ),
       name="generate_answer",
   ):
       oai_client.chat.completions.create(...) 
   ```
   {{% /tab %}}
   {{% tab "Manual instrumentation" %}}
   ```python
   from ddtrace.llmobs import LLMObs
   from ddtrace.llmobs.utils import Prompt

   @llm(model = "llama")
   def generate_answer():
       ...
       LLMObs.annotate(
           prompt=Prompt(variables={'context': "rag context..."})
       )
   ```
   {{% /tab %}}
   {{< /tabs >}}

3. (Optional, but recommended) **Enable sampling**. Datadog traces Ragas score generation. These traces contain LLM spans, which may affect your LLM Observability billing. See [Sampling](#sampling).

4. **Run your script and specify enabled Ragas evaluators**. Use the environment variable `DD_LLMOBS_EVALUATORS` to provide a comma-separated list of Ragas evaluators you wish to enable. These evaluators are `ragas_faithfulness`, `ragas_context_precision`, and `ragas_answer_relevancy`.
   
   For example, to run your script with all Ragas evaluators enabled:
   ```bash
   DD_LLMOBS_EVALUATORS="ragas_faithfulness,ragas_context_precision,ragas_answer_relevancy" \
   DD_ENV=dev \
   DD_API_KEY=<YOUR-DATADOG-API-KEY> \
   DD_SITE={{< region-param key=dd_site code="true" >}} \
   python driver.py
   ```

### Configuration 

#### Sampling

To enable Ragas scoring for a sampled subset of LLM calls, use the `DD_LLMOBS_EVALUATOR_SAMPLING_RULES` environment variable. Pass in a list of objects, each containing the following fields:

| Field | Description | Required | Type |
|-------|-------------|----------|------|
| `sample_rate` | Sampling rate from 0 to 1 | Yes | Float |
| `evaluator_label` | RAGAS evaluator to apply rule to | No | String |
| `span_name` | Name of spans to apply rule to | No | String |

In the following example, Ragas Faithfulness scoring is enabled for 50% of all `answer_question` spans. Ragas evaluations are disabled for all other spans (`"sample_rate": 0`).

```bash
export DD_LLMOBS_EVALUATOR_SAMPLING_RULES='[
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

#### Customization

Ragas supports [customizations][5]. For example, the following snippet configures the Faithfulness evaluator to use `gpt-4` and adds custom instructions for the prompt to the evaluating LLM:

```python
from langchain_openai import ChatOpenAI
from ragas.metrics import faithfulness
from ragas.llms.base import LangchainLLMWrapper

faithfulness.llm = LangchainLLMWrapper(ChatOpenAI(model="gpt-4"))
faithfulness.statement_prompt.instruction += "\nMake sure text containing code instructions are grouped with contextual information on how to run that code."
```

Any customizations you make to the global Ragas instance are automatically applied to Datadog's Ragas evaluators. No action is required.

## View Ragas evaluations in Datadog

Ragas scores are sent to Datadog as evaluation metrics. When you view a scored trace in LLM Observability, Ragas scores appear under **Custom Evaluations**.

{{< img src="llm_observability/ragas/trace-ragas-view.png" alt="A detailed trace view in LLM Observability. Under the Trace tab, a table titled Custom Evaluations. The table contains an evaluation named ragas_answer_relevancy with a score of 0.966." style="width:100%;" >}}

You can also configure your LLM Traces page to display Ragas scores.

1. Go to the [LLM Observability Traces][6] page in Datadog.
1. Search for `@meta.span.kind:llm` in **All Spans** to view only LLM spans.
1. Add `-runner.integration:ragas` to the search field. Datadog automatically traces the generation of Ragas scores. Use this exclusion term to filter out these traces.
1. Select **Custom Evaluations** and enable your desired Ragas evaluations. These scores are then displayed in additional columns on the LLM Observability Traces page.

{{< img src="llm_observability/ragas/traces-ragas-columns.png" alt="The Traces view in LLM Observability. The search bar contains '@meta.span.kind:llm -runner.integration:ragas' and the In field is set to All Spans. The Custom Evaluations button is selected, and a modal titled Custom Evaluation Columns is open. In this modal, three list items are toggled on: ragas_faithfulness, ragas_answer_relevancy, ragas_context_precision." style="width:100%;" >}}


## Troubleshooting

### Missing evaluations

Your LLM inference could be missing an evaluation for the following reasons:

- The LLM span was not sampled for an evaluation because you have implemented [sampling](#sampling).
- An error occurred during the Ragas evaluation. Search for `runner.integration:ragas` to see traces for the Ragas evaluation itself.

### Flushing

Use the `LLMObs.flush()` command to guarantee all traces and evaluations are flushed to Datadog. 
**Note**: This is a blocking function.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.ragas.io/en/stable/
[2]: https://docs.ragas.io/en/v0.1.21/concepts/metrics/faithfulness.html
[3]: https://docs.ragas.io/en/v0.1.21/concepts/metrics/answer_relevance.html
[4]: https://docs.ragas.io/en/v0.1.21/concepts/metrics/context_precision.html
[5]: https://docs.ragas.io/en/v0.1.21/howtos/customisations/
[6]: https://app.datadoghq.com/llm/traces
[7]: /llm_observability/guide/ragas_quickstart
