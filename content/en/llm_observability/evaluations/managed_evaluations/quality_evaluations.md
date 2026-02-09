---
title: Quality Evaluations
description: Learn how to configure managed evaluations for your LLM applications.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
- link: "https://www.datadoghq.com/blog/llm-observability-hallucination-detection/"
  tag: "Blog"
  text: "Detect hallucinations in your RAG LLM applications with Datadog LLM Observability"
aliases:
    - /llm_observability/evaluations/quality_evaluations
---

Quality evaluations help ensure your LLM-powered applications generate accurate, relevant, and safe responses. Managed evaluations automatically score model outputs on key quality dimensions and attach results to traces, helping you detect issues, monitor trends, and improve response quality over time.

#### Hallucination

This check identifies instances where the LLM makes a claim that disagrees with the provided input context.

{{< img src="llm_observability/evaluations/hallucination_5.png" alt="A Hallucination evaluation detected by an LLM in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition |
|---|---|---|
| Evaluated on Output | Evaluated using LLM | Hallucination flags any output that disagrees with the context provided to the LLM. |

##### Instrumentation
You can use [Prompt Tracking][2] annotations to track your prompts and set them up for hallucination configuration. Annotate your LLM spans with the user query and context so hallucination detection can evaluate model outputs against the retrieved data.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.types import Prompt

# if your llm call is auto-instrumented...
with LLMObs.annotation_context(
        prompt=Prompt(
            id="generate_answer_prompt",
            template="Generate an answer to this question :{user_question}. Only answer based on the information from this article : {article}",
            variables={"user_question": user_question, "article": article},
            rag_query_variables=["user_question"],
            rag_context_variables=["article"]
        ),
        name="generate_answer"
):
    oai_client.chat.completions.create(...) # autoinstrumented llm call

# if your llm call is manually instrumented ...
@llm(name="generate_answer")
def generate_answer():
  ...
  LLMObs.annotate(
            prompt=Prompt(
                id="generate_answer_prompt",
                template="Generate an answer to this question :{user_question}. Only answer based on the information from this article : {article}",
                variables={"user_question": user_question, "article": article},
                rag_query_variables=["user_question"],
                rag_context_variables=["article"]
            ),
  )
{{< /code-block >}}
The `variables` dictionary should contain the key-value pairs your app uses to construct the LLM input prompt (for example, the messages for an OpenAI chat completion request). Use `rag_query_variables` and `rag_context_variables` to specify which variables represent the user query and which represent the retrieval context. A list of variables is allowed to account for cases where multiple variables make up the context (for example, multiple articles retrieved from a knowledge base).

Hallucination detection does not run if either the rag query, the rag context, or the span output is empty.

Prompt Tracking is available on python starting from the 3.15 version, It also requires an ID for the prompt and the template set up to monitor and track your prompt versions.
You can find more examples of prompt tracking and instrumentation in the [SDK documentation][2].

##### Hallucination configuration
<div class="alert alert-info">Hallucination detection is only available for OpenAI.</div>
Hallucination detection makes a distinction between two types of hallucinations, which can be configured when Hallucination is enabled.

| Configuration Option | Description |
|---|---|
| Contradiction | Claims made in the LLM-generated response that go directly against the provided context |
| Unsupported Claim | Claims made in the LLM-generated response that are not grounded in the context |

Contradictions are always detected, while Unsupported Claims can be optionally included. For sensitive use cases, we recommend including Unsupported Claims.


#### Language Mismatch

This check identifies instances where the LLM generates responses in a different language or dialect than the one used by the user, which can lead to confusion or miscommunication. This check ensures that the LLM's responses are clear, relevant, and appropriate for the user's linguistic preferences and needs.

Language mismatch is only supported for natural language prompts. Input and output pairs that mainly consist of structured data such as JSON, code snippets, or special characters are not flagged as a language mismatch.

{{% collapse-content title="Supported languages" level="h5" %}}
Afrikaans, Albanian, Arabic, Armenian, Azerbaijani, Belarusian, Bengali, Norwegian Bokmal, Bosnian, Bulgarian, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Georgian, German, Greek, Gujarati, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Irish, Italian, Japanese, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Mongolian, Norwegian Nynorsk, Persian, Polish, Portuguese, Punjabi, Romanian, Russian, Serbian, Slovak, Slovene, Spanish, Swahili, Swedish, Tamil, Telugu, Thai, Turkish, Ukrainian, Urdu, Vietnamese, Yoruba, Zulu
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/language_mismatch_4.png" alt="A Language Mismatch evaluation detected by an open source model in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition |
|---|---|---|
| Evaluated on Input and Output | Evaluated using Open Source Model | Language Mismatch flags whether each prompt-response pair demonstrates that the LLM application answered the user's question in the same language that the user used.  |

[1]: https://app.datadoghq.com/llm/applications
[2]: /llm_observability/instrumentation/sdk?tab=python#prompt-tracking
