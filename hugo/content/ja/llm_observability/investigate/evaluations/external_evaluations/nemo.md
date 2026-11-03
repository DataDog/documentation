---
aliases:
- /ja/llm_observability/submit_nemo_evaluations/
- /ja/llm_observability/evaluations/submit_nemo_evaluations/
- /ja/llm_observability/configure/evaluations/external_evaluations/nemo/
description: NVIDIA NeMo Evaluator のモデル評価スコアを Agent Observability に送信し、LLM トレースと並行してベンチマーク結果を監視する方法を学びます。
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: ドキュメント
  text: 評価の送信
title: NeMo 評価
---
## 概要 {#overview}
NVIDIA NeMo Evaluator は、LLM の自動ベンチマークを提供するマイクロサービスです。詳細については、[NVIDIA のドキュメント][3]を参照してください。

Agent Observability を使用して、NVIDIA NeMo Evaluator のモデル評価スコアを監視できます。NeMo 評価スコアは、元の LLM トレースに関連付けられた評価メトリクスとして表示されます。

## セットアップ {#setup}

これらの手順では、[Agent Observability Python SDK][1] を使用します。

Agent Observability を NeMo Evaluator と統合するには、`span_id` および `trace_id` とともに NeMo 評価スコアを送信します。

1. **`LLMObs.export_span()`** からスパン ID とトレース ID を取得します。

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

   上記のコードスニペットにおいて、`span_context` は `span_id` と `trace_id` を含む辞書です。


2. **出力ファイルを準備します**。この例では、出力ファイルの名前は `outputs.json` です。

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

   各 `input` について、`source` メタデータフィールドには、セミコロンで区切られた文字列として以下の値を含める必要があります。
      - `trace_id`: `LLMObs.export_span()` から取得したトレース ID
      - `span_id`: `LLMObs.export_span()` から取得したスパン ID
      - 出力データと NeMo 評価データを結合するための ID。この例では、これは `question_id` と呼ばれます。

3. **スコアファイルを準備します**。NeMo から結果をダウンロードし、JSON ファイル (または、大規模な評価実行の場合は `jsonl`) として保存します。

   この例では、以下のファイルの名前は `scores.jsonl` です。

   ```json
   {"question_id": 1, "model": "meta/llama-3.1-8b-instruct", "judge": ["meta/llama-3.1-8b-instruct", "single-v1"], "user_prompt": "[Instruction]\nPlease act as an impartial judge and evaluate the quality of the response provided by an AI assistant to the user question displayed below. Your evaluation should consider factors such as the helpfulness, relevance, accuracy, depth, creativity, and level of detail of the response. Begin your evaluation by providing a short explanation. Be as objective as possible. After providing your explanation, you must rate the response on a scale of 1 to 10 by strictly following this format: \"[[rating]]\", for example: \"Rating: [[5]]\".\n\n[Question]\nWhat are the ingredients in cake?\n\n[The Start of Assistant's Answer]\nThe ingredients in a basic cake recipe typically include flour, sugar, eggs, butter or oil, leavening agents like baking powder or baking soda, and a liquid such as milk or water. Additional flavorings such as vanilla extract or cocoa powder can also be added for variety.\n[The End of Assistant's Answer]", "judgment": "Rating: [[8]] The answer clearly denotes the ingredients needed to make a cake", "score": 8, "turn": 1, "tstamp": 1740429821.1071315}
   ```


4. **LLM の出力と NeMo の評価結果を結合し、このデータをカスタム評価として Datadog に送信します**。

   この例では、出力ファイル `outputs.json` と NeMo スコアファイル `scores.jsonl` を、`question_id` を結合キーとして結合します。その結果が Datadog に送信されます。

   ```python
   import json

   from ddtrace.llmobs import LLMObs
   LLMObs.enable(
       # Enable the Agent Observability SDK with the same ml_app name as original application
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

### 使用方法 {#usage}
セットアップ手順を完了すると、Datadog の Agent Observability トレースに添付された NeMo Evaluator のモデル評価スコアを表示できます。

{{< img src="llm_observability/nemo-demo-after-eval.png" alt="NeMo 評価結果からカスタム評価が添付された Agent Observability トレース" style="width:100%;" >}}

Agent Observability のダッシュボードおよび Application Overview で、NeMo Evaluator のモデル評価結果の内訳を表示できます。トレース一覧表示で {{< ui >}}Options{{< /ui >}} をクリックし、評価スコアを列として追加します。

{{< img src="llm_observability/nemo-demo-traces-view-eval.png" alt="NeMo 評価結果からカスタム評価が添付された Agent Observability トレース一覧表示" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/setup/sdk/python
[2]: https://docs.nvidia.com/nemo-framework/user-guide/latest/overview.html
[3]: https://docs.nvidia.com/nemo/microservices/latest/evaluator/index.html