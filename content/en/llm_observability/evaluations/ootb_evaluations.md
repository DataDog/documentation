---
title: Out-of-the-Box Evaluations
description: Learn how to configure out of the box evaluations for your LLM applications.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Out-of-the-Box Evaluations are built-in tools to assess your LLM application on dimensions like Quality, Security, and Safety. By enabling them, you can assess the effectiveness of your application's responses, including detection of negative sentiment, topic relevancy, toxicity, failure to answer and hallucination.

LLM Observability associates evaluations with individual spans so you can view the inputs and outputs that led to a specific evaluation.

LLM Observability out-of-the-box evaluations which leverage LLMs require for you to bring your own key, meaning that you need to connect your LLM provider to Datadog to use them.

## Connect your account

{{< tabs >}}
{{% tab "OpenAI" %}}

<div class="alert alert-info">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an OpenAI account that is subject to a BAA and configured for zero data retention.</div>

Connect your OpenAI account to LLM Observability with your OpenAI API key. LLM Observability uses the `GPT-4o mini` model for Evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
1. Enable **Use this API key to evaluate your LLM applications**.

{{< img src="llm_observability/configuration/openai-tile.png" alt="The OpenAI configuration tile in LLM Observability. Lists instructions for configuring OpenAI and providing your OpenAI API key." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-info">Azure OpenAI is not supported for HIPAA organizations with a Business Associate Agreement (BAA) with Datadog.</div>

Connect your Azure OpenAI account to LLM Observability with your OpenAI API key. We strongly recommend using the **GPT-4o mini** model for Evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Azure OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your Azure OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
   - Provide the Resource Name, Deployment ID, and API version to complete integration.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="The Azure OpenAI configuration tile in LLM Observability. Lists instructions for configuring Azure OpenAI and providing your API Key, Resource Name, Deployment ID, and API Version." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Anthropic" %}}

<div class="alert alert-info">Anthropic is not supported for HIPAA organizations with a Business Associate Agreement (BAA) with Datadog.</div>

Connect your Anthropic account to LLM Observability with your Anthropic API key. LLM Observability uses the `Haiku` model for Evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Anthropic tile.
1. Follow the instructions on the tile.
   - Provide your Anthropic API key. Ensure that this key has **write** permission for **model capabilities**.

{{< img src="llm_observability/configuration/anthropic-tile.png" alt="The Anthropic configuration tile in LLM Observability. Lists instructions for configuring Anthropic and providing your Anthropic API key." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Amazon Bedrock" %}}

<div class="alert alert-info">Bedrock is not supported for HIPAA organizations with a Business Associate Agreement (BAA) with Datadog.</div>

Connect your Amazon Bedrock account to LLM Observability with your AWS Account. LLM Observability uses the `Haiku` model for Evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Amazon Bedrock tile.
1. Follow the instructions on the tile.

{{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="The Amazon Bedrock configuration tile in LLM Observability. Lists instructions for configuring Amazon Bedrock." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{< /tabs >}}
## Select and enable evaluations

1. Navigate to [**LLM Observability > Settings > Evaluations**][2].
1. Click on the evaluation you want to enable.
   - Configure an evaluation for all of your LLM applications by selecting **Configure Evaluation**, or you select the edit icon to configure the evaluation for an individual LLM application.
   - Evaluations can be disabled by selecting the disable icon for an individual LLM application.
1. If you select **Configure Evaluation**, select the LLM application(s) you want to configure your evaluation for.
1. Select **OpenAI**, **Azure OpenAI**, **Anthropic**, or **Amazon Bedrock** as your LLM provider.
1. Select the account you want to run the evaluation on.
1. Choose whether you want the evaluation to run on traces (the root span of each trace) or spans (which include LLM, Workflow, and Agent spans).
   - If you select to run the evaluation on spans, you must select at least one span name to save your configured evaluation.
1. Select the span names you would like your evaluation to run on. (Optional if traces is selected).
1. Optionally, specify the tags you want this evaluation to run on and choose whether to apply the evaluation to spans that match any of the selected tags (Any of), or all of the selected tags (All of).
1. Select what percentage of spans you would like this evaluation to run on by configuring the **sampling percentage**. This number must be greater than 0 and less than or equal to 100. A Sampling Percentage of 100% means that the evaluation runs on all valid spans, whereas a sampling percentage of 50% means that the evaluation runs on 50% of valid spans.
1. (Optional) For Failure to Answer, if OpenAI or Azure OpenAI is selected, configure the evaluation by selecting what types of answers should be considered Failure to Answer. This configuration is detailed in [Failure to Answer Configuration][5].

After you click **Save**, LLM Observability uses the LLM account you connected to power the evaluation you enabled.

For more information about evaluations, see [Terms and Concepts][1].

### Estimated Token Usage

LLM Observability provides metrics to help you monitor and manage the token usage associated with evaluations that power LLM Observability. The following metrics allow you to track the LLM resources consumed to power evaluations:


- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

Each of these metrics has `ml_app`, `model_server`, `model_provider`, `model_name`, and `evaluation_name` tags, allowing you to pinpoint specific applications, models, and evaluations contributing to your usage.

### Quality evaluations

#### Topic Relevancy

This check identifies and flags user inputs that deviate from the configured acceptable input topics. This ensures that interactions stay pertinent to the LLM's designated purpose and scope.
  
| Evaluation Stage | Evaluation Method | Evaluation Definition | 
|---|---|---|
| Evaluated on Input | Evaluated using LLM | Topic relevancy assesses whether each prompt-response pair remains aligned with the intended subject matter of the Large Language Model (LLM) application. For instance, an e-commerce chatbot receiving a question about a pizza recipe would be flagged as irrelevant.  |

You can provide topics for this evaluation.

1. Go to [**LLM Observability > Applications**][4].
1. Select the application you want to add topics for.
1. CLick **Evaluations** on the left side panel.
1. At the right corner of the top panel, select **Configuration**.
1. Click the **Edit Evaluations** icon for Topic Relevancy.
1. Add topics on the config page.

Topics can contain multiple words and should be as specific and descriptive as possible. For example, for an LLM application that was designed for incident management, add "observability", "software engineering", or "incident resolution". If your application handles customer inquiries for an e-commerce store, you can use "Customer questions about purchasing furniture on an e-commerce store".

#### Hallucination

This check identifies instances where the LLM makes a claim that disagrees with the provided input context.

{{< img src="llm_observability/evaluations/hallucination_1.png" alt="A Hallucination evaluation detected by an LLM in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition | 
|---|---|---|
| Evaluated on Output | Evaluated using LLM | Hallucination flags any output that disagrees with the context provided to the LLM. |

##### Instrumentation

In order to take advantage of Hallucination detection, you will need to annotate LLM spans with the user query and context:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.utils import Prompt

# if your llm call is auto-instrumented...
with LLMObs.annotation_context(
        prompt=Prompt(
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
                variables={"user_question": user_question, "article": article},
                rag_query_variables=["user_question"],
                rag_context_variables=["article"]
            ),
  )
{{< /code-block >}}

The variables dictionary should contain the key-value pairs your app uses to construct the LLM input prompt (e. g., the messages for an OpenAI chat completion request). Set `rag_query_variables` and `rag_context_variables` to indicate which variables constitute the query and the context, respectively. A list of variables is allowed to account for cases where multiple variables make up the context (for example, multiple articles retrieved from a knowledge base).

##### Hallucination configuration

Hallucination detection makes a distinction between two types of hallucinations, which can be configured when Hallucination is enabled.

| Configuration Option | Description |
|---|---|
| Contradiction | Claims made in the LLM-generated response that go directly against the provided context |
| Unsupported Claim | Claims made in the LLM-generated response that are not grounded in the context |

Contradictions are always detected, while Unsupported Claims can be optionally included. For sensitive use cases, we recommend including Unsupported Claims.

Hallucination detection is only available for OpenAI.

#### Failure to Answer

This check identifies instances where the LLM fails to deliver an appropriate response, which may occur due to limitations in the LLM's knowledge or understanding, ambiguity in the user query, or the complexity of the topic.

{{< img src="llm_observability/evaluations/failure_to_answer_1.png" alt="A Failure to Answer evaluation detected by an LLM in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition | 
|---|---|---|
| Evaluated on Output | Evaluated using LLM | Failure To Answer flags whether each prompt-response pair demonstrates that the LLM application has provided a relevant and satisfactory answer to the user's question.  |

##### Failure to Answer Configuration
The types of Failure to Answer are defined below and can be configured when the Failure to Answer evaluation is enabled.

| Configuration Option | Description | Example(s) |
|---|---|---|
| Empty Code Response | An empty code object, like an empty list or tuple, signifiying no data or results | (), [], {}, "", '' |
| Empty Response | No meaningful response, returning only whitespace | whitespace |
| No Content Response | An empty output accompanied by a message indicating no content is available | Not found, N/A |
| Redirection Response | Redirects the user to another source or suggests an alternative approach | If you have additional details, I'd be happy to include them|
| Refusal Response | Explicitly declines to provide an answer or to complete the request | Sorry, I can't answer this question |

#### Language Mismatch

This check identifies instances where the LLM generates responses in a different language or dialect than the one used by the user, which can lead to confusion or miscommunication. This check ensures that the LLM's responses are clear, relevant, and appropriate for the user's linguistic preferences and needs.

Language mismatch is only supported for natural language prompts. Input and output pairs mainly consisting of structured data such as JSON, code snippets, or special characters are not flagged as a language mismatch.

{{< img src="llm_observability/evaluations/language_mismatch_1.png" alt="A Language Mismatch evaluation detected by an open source model in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition | 
|---|---|---|
| Evaluated on Input and Output | Evaluated using Open Source Model | Language Mismatch flags whether each prompt-response pair demonstrates that the LLM application answered the user's question in the same language that the user used.  |

#### Sentiment

This check helps understand the overall mood of the conversation, gauge user satisfaction, identify sentiment trends, and interpret emotional responses. This check accurately classifies the sentiment of the text, providing insights to improve user experiences and tailor responses to better meet user needs.

{{< img src="llm_observability/evaluations/sentiment_1.png" alt="A Sentiment evaluation detected by an LLM in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition | 
|---|---|---|
| Evaluated on Input and Output | Evaluated using LLM | Sentiment flags the emotional tone or attitude expressed in the text, categorizing it as positive, negative, or neutral.   |

### Security and Safety evaluations

#### Toxicity

This check evaluates each input prompt from the user and the response from the LLM application for toxic content. This check identifies and flags toxic content to ensure that interactions remain respectful and safe.

{{< img src="llm_observability/evaluations/toxicity_1.png" alt="A Toxicity evaluation detected by an LLM in LLM Observability" style="width:100%;" >}}
  
| Evaluation Stage | Evaluation Method | Evaluation Definition | 
|---|---|---|
| Evaluated on Input and Output | Evaluated using LLM | Toxicity flags any language or behavior that is harmful, offensive, or inappropriate, including but not limited to hate speech, harassment, threats, and other forms of harmful communication. |

#### Prompt Injection

This check identifies attempts by unauthorized or malicious authors to manipulate the LLM's responses or redirect the conversation in ways not intended by the original author. This check maintains the integrity and authenticity of interactions between users and the LLM.

{{< img src="llm_observability/evaluations/prompt_injection_1.png" alt="A Prompt Injection evaluation detected by an LLM in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition | 
|---|---|---|
| Evaluated on Input | Evaluated using LLM | Prompt Injection flags any unauthorized or malicious insertion of prompts or cues into the conversation by an external party or user. |

#### Sensitive Data Scanning

This check ensures that sensitive information is handled appropriately and securely, reducing the risk of data breaches or unauthorized access.

{{< img src="llm_observability/evaluations/sensitive_data_scanning_1.png" alt="A Security and Safety evaluation detected by the Sensitive Data Scanner in LLM Observability" style="width:100%;" >}}
  
| Evaluation Stage | Evaluation Method | Evaluation Definition | 
|---|---|---|
| Evaluated on Input and Output | Sensitive Data Scanner | Powered by the [Sensitive Data Scanner][5], LLM Observability scans, identifies, and redacts sensitive information within every LLM application's prompt-response pairs. This includes personal information, financial data, health records, or any other data that requires protection due to privacy or security concerns. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/terms/
[2]: https://app.datadoghq.com/llm/settings/evaluations
[3]: /llm_observability/terms/#topic-relevancy
[4]: https://app.datadoghq.com/llm/applications
[5]: /llm_observability/terms/#failure-to-answer-configuration
