---
aliases:
- /ko/llm_observability/submit_nemo_evaluations/
- /ko/llm_observability/evaluations/submit_nemo_evaluations/
- /ko/llm_observability/configure/evaluations/external_evaluations/nemo/
description: NVIDIA NeMo Evaluator 모델 평가 점수를 Agent Observability에 제출하여 LLM 트레이스와 함께
  벤치마킹 결과를 모니터링하는 방법을 알아보세요.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: 설명서
  text: 평가 제출
title: NeMo 평가
---
## 개요 {#overview}
NVIDIA NeMo Evaluator는 LLM에 대한 자동화된 벤치마킹을 제공하는 마이크로서비스입니다. 자세한 내용은 [NVIDIA 설명서][3]를 참조하세요.

Agent Observability를 사용하여 NVIDIA NeMo Evaluator의 모델 평가 점수를 모니터링할 수 있습니다. NeMo 평가 점수는 원래 LLM 트레이스와 연결된 평가 메트릭으로 나타납니다.

## 설정 {#setup}

이 단계에서는 [Agent Observability Python SDK][1]를 사용합니다.

Agent Observability를 NeMo Evaluator와 통합하려면 `span_id` 및 `trace_id`와 함께 NeMo 평가 점수를 제출하세요.

1. **`LLMObs.export_span()`**에서 스팬 및 트레이스 ID를 가져옵니다.

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

   위 코드 조각에서 `span_context`는 `span_id` 및 `trace_id`를 포함하는 사전입니다.


2. **출력 파일을 준비합니다**. 이 예시에서 출력 파일의 이름은 `outputs.json`입니다.

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

   각 `input`에 대해 `source` 메타데이터 필드에는 다음 값이 세미콜론으로 구분된 문자열로 포함되어야 합니다.
      - `trace_id`: `LLMObs.export_span()`에서 가져온 트레이스 ID
      - `span_id`: `LLMObs.export_span()`에서 가져온 스팬 ID
      - 출력 데이터를 NeMo 평가 데이터와 결합하기 위한 ID입니다. 이 예시에서는 이를 `question_id`라고 합니다.

3. **점수 파일을 준비합니다**. NeMo에서 결과를 다운로드하고 JSON 파일(또는 더 큰 평가 실행의 경우 `jsonl`)로 저장합니다.

   이 예시에서 다음 파일의 이름은 `scores.jsonl`입니다.

   ```json
   {"question_id": 1, "model": "meta/llama-3.1-8b-instruct", "judge": ["meta/llama-3.1-8b-instruct", "single-v1"], "user_prompt": "[Instruction]\nPlease act as an impartial judge and evaluate the quality of the response provided by an AI assistant to the user question displayed below. Your evaluation should consider factors such as the helpfulness, relevance, accuracy, depth, creativity, and level of detail of the response. Begin your evaluation by providing a short explanation. Be as objective as possible. After providing your explanation, you must rate the response on a scale of 1 to 10 by strictly following this format: \"[[rating]]\", for example: \"Rating: [[5]]\".\n\n[Question]\nWhat are the ingredients in cake?\n\n[The Start of Assistant's Answer]\nThe ingredients in a basic cake recipe typically include flour, sugar, eggs, butter or oil, leavening agents like baking powder or baking soda, and a liquid such as milk or water. Additional flavorings such as vanilla extract or cocoa powder can also be added for variety.\n[The End of Assistant's Answer]", "judgment": "Rating: [[8]] The answer clearly denotes the ingredients needed to make a cake", "score": 8, "turn": 1, "tstamp": 1740429821.1071315}
   ```


4. **LLM 출력과 NeMo 평가 결과를 결합하고 이 데이터를 사용자 지정 평가로 Datadog에 제출합니다**.

   이 예시에서는 출력 파일 `outputs.json`이 `question_id`를 조인 키로 사용하여 NeMo 점수 파일 `scores.jsonl`과 결합됩니다. 그 결과가 Datadog에 제출됩니다.

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

### 사용량 {#usage}
설정 단계를 완료하면 Datadog의 Agent Observability 트레이스에 첨부된 NeMo Evaluator의 모델 평가 점수를 확인할 수 있습니다.

{{< img src="llm_observability/nemo-demo-after-eval.png" alt="NeMo 평가 결과의 사용자 지정 평가가 첨부된 Agent Observability 트레이스" style="width:100%;" >}}

Agent Observability의 대시보드 및 애플리케이션 개요에서 NeMo Evaluator의 모델 평가 결과 분석을 확인할 수 있습니다. 트레이스 목록에서 {{< ui >}}Options{{< /ui >}}를 클릭하여 평가 점수를 열로 추가하세요.

{{< img src="llm_observability/nemo-demo-traces-view-eval.png" alt="NeMo 평가 결과의 사용자 지정 평가가 첨부된 Agent Observability 트레이스 목록" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/setup/sdk/python
[2]: https://docs.nvidia.com/nemo-framework/user-guide/latest/overview.html
[3]: https://docs.nvidia.com/nemo/microservices/latest/evaluator/index.html