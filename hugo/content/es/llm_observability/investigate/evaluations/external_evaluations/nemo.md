---
aliases:
- /es/llm_observability/submit_nemo_evaluations/
- /es/llm_observability/evaluations/submit_nemo_evaluations/
- /es/llm_observability/configure/evaluations/external_evaluations/nemo/
description: Aprenda a enviar las puntuaciones de evaluación de modelos de NVIDIA
  NeMo Evaluator a Agent Observability para hacer un seguimiento de los resultados
  de las pruebas comparativas junto con las trazas de LLM.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: Documentación
  text: Enviar evaluaciones
title: Evaluaciones de NeMo
---
## Descripción general {#overview}
NVIDIA NeMo Evaluator es un microservicio que proporciona pruebas comparativas automatizadas para LLMs. Para obtener más información, consulte la [documentación de NVIDIA][3].

Puede usar Agent Observability para hacer un seguimiento de las puntuaciones de evaluación de modelos de NVIDIA NeMo Evaluator. Las puntuaciones de evaluación de NeMo aparecen como métricas de evaluación vinculadas a la traza de LLM original.

## Configuración {#setup}

Estos pasos utilizan el [SDK de Python de Agent Observability][1].

Para integrar Agent Observability con NeMo Evaluator, envíe sus puntuaciones de evaluación de NeMo junto con `span_id` y `trace_id`.

1. **Obtenga los ID de tramo y de traza de `LLMObs.export_span()`**.

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

   En el fragmento anterior, `span_context` es un diccionario que contiene `span_id` y `trace_id`.


2. **Prepare su archivo de resultados**. En este ejemplo, el archivo de resultados se llama `outputs.json`.

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

   Para cada `input`, el campo de metadatos `source` debe contener los siguientes valores como una cadena separada por punto y coma:
      - `trace_id`: El ID de traza, obtenido de `LLMObs.export_span()`
      - `span_id`: El ID de tramo, obtenido de `LLMObs.export_span()`
      - Un ID para unir los datos de salida con los datos de evaluación de NeMo. En este ejemplo, esto se llama `question_id`.

3. **Prepare su archivo de puntuaciones**. Descargue sus resultados de NeMo y guárdelos como un archivo JSON (o `jsonl`, para ejecuciones de evaluación más grandes).

   En este ejemplo, el siguiente archivo se llama `scores.jsonl`:

   ```json
   {"question_id": 1, "model": "meta/llama-3.1-8b-instruct", "judge": ["meta/llama-3.1-8b-instruct", "single-v1"], "user_prompt": "[Instruction]\nPlease act as an impartial judge and evaluate the quality of the response provided by an AI assistant to the user question displayed below. Your evaluation should consider factors such as the helpfulness, relevance, accuracy, depth, creativity, and level of detail of the response. Begin your evaluation by providing a short explanation. Be as objective as possible. After providing your explanation, you must rate the response on a scale of 1 to 10 by strictly following this format: \"[[rating]]\", for example: \"Rating: [[5]]\".\n\n[Question]\nWhat are the ingredients in cake?\n\n[The Start of Assistant's Answer]\nThe ingredients in a basic cake recipe typically include flour, sugar, eggs, butter or oil, leavening agents like baking powder or baking soda, and a liquid such as milk or water. Additional flavorings such as vanilla extract or cocoa powder can also be added for variety.\n[The End of Assistant's Answer]", "judgment": "Rating: [[8]] The answer clearly denotes the ingredients needed to make a cake", "score": 8, "turn": 1, "tstamp": 1740429821.1071315}
   ```


4. **Combine sus resultados de LLM con sus resultados de evaluación de NeMo y envíe estos datos como evaluaciones personalizadas a Datadog**.

   En este ejemplo, el archivo de resultados `outputs.json` se combina con el archivo de puntuaciones de NeMo `scores.jsonl` utilizando `question_id` como clave de combinación. El resultado se envía entonces a Datadog.

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

### Uso {#usage}
Después de completar los pasos de configuración, puede visualizar las puntuaciones de evaluación de modelos de NeMo Evaluator adjuntas a la traza de Agent Observability en Datadog:

{{< img src="llm_observability/nemo-demo-after-eval.png" alt="Una traza de Agent Observability con una evaluación personalizada adjunta de los resultados de evaluación de NeMo." style="width:100%;" >}}

Puede visualizar un desglose de los resultados de evaluación de modelos de su NeMo Evaluator en el panel de control y en la Descripción general de la aplicación de Agent Observability. En la lista de trazas, haga clic en {{< ui >}}Options{{< /ui >}} para agregar las puntuaciones de evaluación como columna:

{{< img src="llm_observability/nemo-demo-traces-view-eval.png" alt="Una lista de trazas de Agent Observability con una evaluación personalizada adjunta de los resultados de evaluación de NeMo" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/setup/sdk/python
[2]: https://docs.nvidia.com/nemo-framework/user-guide/latest/overview.html
[3]: https://docs.nvidia.com/nemo/microservices/latest/evaluator/index.html