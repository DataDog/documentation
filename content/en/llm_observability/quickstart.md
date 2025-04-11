---
title: Trace An LLM Application
aliases:
    - /tracing/llm_observability/quickstart
further_reading:
    - link: '/llm_observability'
      tag: 'Documentation'
      text: 'Learn about LLM Observability'
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

This guide uses the LLM Observability SDKs for [Python][1] and [Node.js][2]. If your application is written in another language, you can create traces by calling the [API][8] instead.

## Setup

### Jupyter notebooks

To better understand LLM Observability terms and concepts, you can explore the examples in the [LLM Observability Jupyter Notebooks repository][12]. These notebooks provide a hands-on experience, and allow you to apply these concepts in real time.

## Command line

To generate an LLM Observability trace, you can run a Python or Node.js script.

### Prerequisites

- LLM Observability requires a Datadog API key. For more information, see [the instructions for creating an API key][7].
- The following example script uses OpenAI, but you can modify it to use a different provider. To run the script as written, you need:
    - An OpenAI API key stored in your environment as `OPENAI_API_KEY`. To create one, see [Account Setup][4] and [Set up your API key][6] in the official OpenAI documentation.
    - The OpenAI Python library installed. See [Setting up Python][5] in the official OpenAI documentation for instructions.

{{< tabs >}}
{{% tab "Python" %}}

1. Install the SDK and OpenAI packages:

   ```shell
   pip install ddtrace
   pip install openai
   ```

2. Create a script, which makes a single OpenAI call.

   ```python
   import os
   from openai import OpenAI

   oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

   completion = oai_client.chat.completions.create(
       model="gpt-3.5-turbo",
       messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
   )
   ```

3. Run the script with the following shell command. This sends a trace of the OpenAI call to Datadog.

   ```shell
   DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=onboarding-quickstart \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DD_SITE> \
   DD_LLMOBS_AGENTLESS_ENABLED=1 ddtrace-run python quickstart.py
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key, and replace `<YOUR_DD_SITE>` with your [Datadog site][2].

   For more information about required environment variables, see [the SDK documentation][1].

[1]: /llm_observability/setup/sdk/python/#command-line-setup
[2]: /getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. Install the SDK and OpenAI packages:

   ```shell
   npm install dd-trace
   npm install openai
   ```
2. Create a script, which makes a single OpenAI call.

   ```javascript
   const { OpenAI } = require('openai');

   const oaiClient = new OpenAI(process.env.OPENAI_API_KEY);

   function main () {
      const completion = await oaiClient.chat.completions.create({
         model: 'gpt-3.5-turbo',
         messages: [
            { role: 'system', content: 'You are a helpful customer assistant for a furniture store.' },
            { role: 'user', content: 'I\'d like to buy a chair for my living room.' },
         ]
      });
   }

   main();
   ```

3. Run the script with the following shell command. This sends a trace of the OpenAI call to Datadog.
   ```shell
   DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=onboarding-quickstart \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DD_SITE> \
   DD_LLMOBS_AGENTLESS_ENABLED=1 NODE_OPTIONS="--import dd-trace/initialize.mjs" node quickstart.js
   ```

   Replace `<YOUR_DATADOG_API_KEY>` with your Datadog API key, and replace `<YOUR_DD_SITE>` with your [Datadog site][2].

   For more information about required environment variables, see [the SDK documentation][1].

[1]: /llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

   **Note**: `DD_LLMOBS_AGENTLESS_ENABLED` is only required if you do not have the Datadog Agent running. If the Agent is running in your production environment, make sure this environment variable is unset.

4. View the trace of your LLM call on the **Traces** tab [of the **LLM Observability** page][3] in Datadog.

   {{< img src="llm_observability/quickstart_trace_1.png" alt="An LLM Observability trace displaying a single LLM request" style="width:100%;" >}}

The trace you see is composed of a single LLM span. The `ddtrace-run` or `NODE_OPTIONS="--import dd-trace/initialize.mjs"` command automatically traces your LLM calls from [Datadog's list of supported integrations][10].

If your application consists of more elaborate prompting or complex chains or workflows involving LLMs, you can trace it using the [Setup documentation][11] and the [SDK documentation][1].

## Custom Evaluations from NVIDIA NeMo

Evaluations from NVIDIA NeMo can be uploaded to Datadog LLM Observability using the [LLM Observability Python SDK][1].

1. NeMo evaluation data need to have the `span` and `trace` IDs as metadata on the output data for the evaluation service, which can be captured on the `source` field. In addition, there should be an ID for joining the output data from the LLM with the evaluation data rows generated by the NeMo evaluation service. The `span` and `trace` IDs can be obtained from the LLM Observability SDK. Use `LLMObs.export_span()` to export the current span while tracing the workflow that includes the LLM call.

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(ml_app="nemos-demo")

import os
from openai import OpenAI

oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

with LLMObs.workflow(name="handle_user_input"):
  # RAG steps, other input parsing, data validation.
  response = oai_client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": "You are a helpful cooking assistant. Please reject any non-food related questions."},
      {"role": "user", "content": "What are the ingredients in cake?"},
    ],
  )

  span_context = LLMObs.export_span()
```

The following span from asking this chat bot `What are the ingredients in cake?` can be viewed in the LLM Observability traces view:

{{< img src="llm_observability/nemo-demo-before-eval.png" alt="An LLM Observability trace" style="width:100%;" >}}

2. The data saved from the `LLMObs.export_span()` calls should be saved and joined with the input and output data for the NeMo evaluation service. Format the data in the `source` metadata field as a string with each entry separated by a semicolon, and the key-value pairs separated by an equals sign:

```json
[
  {
    "input": {
      "prompt": "What are the ingredients in cake?",
      "ideal_response": "Cake is made of flour, sugar, eggs, and milk",
      "category": "food",
      "source": "trace_id=0;span_id=1;question_id=1"
    },
    "response": "The ingredients in a basic cake recipe typically include flour, sugar, eggs, butter or oil, leavening agents like baking powder or baking soda, and a liquid such as milk or water. Additional flavorings such as vanilla extract or cocoa powder can also be added for variety.",
    "llm_name": "gpt-3.5-turbo",
  }
]
```

3. Download the results from the NeMo evaluation service, and save it as a JSON (or `jsonl` for larger evaluations runs):

```json
{"question_id": 1, "model": "meta/llama-3.1-8b-instruct", "judge": ["meta/llama-3.1-8b-instruct", "single-v1"], "user_prompt": "[Instruction]\nPlease act as an impartial judge and evaluate the quality of the response provided by an AI assistant to the user question displayed below. Your evaluation should consider factors such as the helpfulness, relevance, accuracy, depth, creativity, and level of detail of the response. Begin your evaluation by providing a short explanation. Be as objective as possible. After providing your explanation, you must rate the response on a scale of 1 to 10 by strictly following this format: \"[[rating]]\", for example: \"Rating: [[5]]\".\n\n[Question]\nWhat are the ingredients in cake?\n\n[The Start of Assistant's Answer]\nThe ingredients in a basic cake recipe typically include flour, sugar, eggs, butter or oil, leavening agents like baking powder or baking soda, and a liquid such as milk or water. Additional flavorings such as vanilla extract or cocoa powder can also be added for variety.\n[The End of Assistant's Answer]", "judgment": "Rating: [[8]] The answer clearly denotes the ingredients needed to make a cake", "score": 8, "turn": 1, "tstamp": 1740429821.1071315}
```

4. Submit custom evaluations by joining the NeMo evaluations results with the LLM Observability trace data from the output of the LLM call(s).

```python
import json

from ddtrace.llmobs import LLMObs
LLMObs.enable(
    # Enable the LLM Observability SDK with the same ml_app name as original application
    ml_app="nemos-demo",
)

# modify the following paths to the actual files as needed
OUTPUTS_FILE = 'outputs.json'
SCORES_FILE = 'scores.jsonl'

JOIN_KEY = 'question_id'

def parse_json(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data

def parse_jsonl(file_path):
    with open(file_path, 'r') as f:
        data = [json.loads(line) for line in f]
    return data

outputs = parse_json(OUTPUTS_FILE)
scores = parse_jsonl(SCORES_FILE)

def parse_source_into_dict(source: str) -> dict:
    meta_dict = {}
    for meta in source.split(';'):
        key, value = meta.split('=')
        meta_dict[key] = value
    return meta_dict

def find_score(join_key_value: str) -> dict:
    for score in scores:
        if str(score[JOIN_KEY]) == join_key_value:
            return score
    return None


for output in outputs:
    source = output['input']['source']
    meta = parse_source_into_dict(source)

    join_key_value = meta[JOIN_KEY]
    score_row = find_score(join_key_value)
    if score_row is None:
        print(f"ID {join_key_value} not found in scores")
        continue

    LLMObs.submit_evaluation(
      span_context={
        "trace_id": meta['trace_id'],
        "span_id": meta['span_id']
      },
      metric_type="score", # Custom evaluation metric type - change as needed, either "score" or "categorical"
      label="quality_assessment", # Custom evaluation label - change as needed
      value=score_row['score'],
      metadata={
        # add additional metadata as needed
        "model": score_row['model'],
        "judgement": score_row['judgment']
      }
    )
```

The evaluation can now be viewed attached to the LLM Observability trace in Datadog:

{{< img src="llm_observability/nemo-demo-after-eval.png" alt="An LLM Observability trace with a custom evaluation attached from the NeMo evaluation results" style="width:100%;" >}}

By enabling the custom evaluation in the traces view, it can be viewed at a glance from the traces list:

{{< img src="llm_observability/nemo-demo-traces-view-eval.png" alt="An LLM Observability traces list with a custom evaluation attached from the NeMo evaluation results" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/setup/sdk/python
[2]: /llm_observability/setup/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: https://platform.openai.com/docs/quickstart/account-setup
[5]: https://platform.openai.com/docs/quickstart/step-1-setting-up-python
[6]: https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key
[7]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /llm_observability/setup/api
[10]: /llm_observability/setup/auto_instrumentation/
[11]: /llm_observability/setup/
[12]: https://github.com/DataDog/llm-observability
