---
title: NeMo Evaluations
aliases:
 - /llm_observability/submit_nemo_evaluations/
further_reading:
- link: "/llm_observability/evaluations/external_evaluations"
  tag: "Documentation"
  text: "Submit Evaluations"
---

## Overview
NVIDIA NeMo Evaluator is a microservice that provides automated benchmarking for LLMs. For more information, see [NVIDIA's documentation][3].

You can use LLM Observability to monitor NVIDIA NeMo Evaluator's model evaluation scores. NeMo evaluation scores appear as evaluation metrics tied to the original LLM trace.

## Setup

These steps use the [LLM Observability Python SDK][1].

To integrate Datadog's LLM Observability with NeMo Evaluator, submit your NeMo evaluation scores alongside `span_id` and `trace_id`.

1. **Obtain span and trace IDs from `LLMObs.export_span()`**.

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

   In the snippet above, `span_context` is a dictionary containing `span_id` and `trace_id`.


2. **Prepare your outputs file**. In this example, the outputs file is named `outputs.json`.

   {{< highlight json "hl_lines=7">}}
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
   {{< /highlight >}}

   For each `input`, the `source` metadata field should contain the following values as a semicolon-separated string:
      - `trace_id`: The trace ID, obtained from `LLMObs.export_span()`
      - `span_id`: The span ID, obtained from `LLMObs.export_span()`
      - An ID for joining the output data with NeMo evaluation data. In this example, this is called `question_id`.

3. **Prepare your scores file**. Download your results from NeMo and save them as a JSON file (or `jsonl`, for larger evaluation runs).

   In this example, the following file is named `scores.jsonl`:

   ```json
   {"question_id": 1, "model": "meta/llama-3.1-8b-instruct", "judge": ["meta/llama-3.1-8b-instruct", "single-v1"], "user_prompt": "[Instruction]\nPlease act as an impartial judge and evaluate the quality of the response provided by an AI assistant to the user question displayed below. Your evaluation should consider factors such as the helpfulness, relevance, accuracy, depth, creativity, and level of detail of the response. Begin your evaluation by providing a short explanation. Be as objective as possible. After providing your explanation, you must rate the response on a scale of 1 to 10 by strictly following this format: \"[[rating]]\", for example: \"Rating: [[5]]\".\n\n[Question]\nWhat are the ingredients in cake?\n\n[The Start of Assistant's Answer]\nThe ingredients in a basic cake recipe typically include flour, sugar, eggs, butter or oil, leavening agents like baking powder or baking soda, and a liquid such as milk or water. Additional flavorings such as vanilla extract or cocoa powder can also be added for variety.\n[The End of Assistant's Answer]", "judgment": "Rating: [[8]] The answer clearly denotes the ingredients needed to make a cake", "score": 8, "turn": 1, "tstamp": 1740429821.1071315}
   ```


4. **Join your LLM outputs with your NeMo evaluation results, and submit this data as custom evaluations to Datadog**.

   In this example, the outputs file `outputs.json` is joined with the NeMo scores file `scores.jsonl` using `question_id` as a join key. The result is then submitted to Datadog.

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
         span={
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

### Usage
After you complete the setup steps, you can view NeMo Evaluator's model evaluation scores attached to the LLM Observability trace in Datadog:

{{< img src="llm_observability/nemo-demo-after-eval.png" alt="An LLM Observability trace with a custom evaluation attached from the NeMo evaluation results" style="width:100%;" >}}

You can view a breakdown of your NeMo Evaluator's model evaluation results in LLM Observability's dashboard and Application Overview, as well as overlay the evaluation results on topic clusters generated on the [Cluster Map][2]. On the traces list, click on **Options** to add the evaluation scores as a column:

{{< img src="llm_observability/nemo-demo-traces-view-eval.png" alt="An LLM Observability traces list with a custom evaluation attached from the NeMo evaluation results" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/setup/sdk/python
[2]: /llm_observability/cluster_map
[3]: https://docs.nvidia.com/nemo-framework/user-guide/latest/overview.html
