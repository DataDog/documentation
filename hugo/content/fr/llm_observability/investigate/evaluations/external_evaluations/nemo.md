---
aliases:
- /fr/llm_observability/submit_nemo_evaluations/
- /fr/llm_observability/evaluations/submit_nemo_evaluations/
- /fr/llm_observability/configure/evaluations/external_evaluations/nemo/
description: Apprenez à soumettre les scores d'évaluation du modèle de NVIDIA NeMo
  Evaluator à Agent Observability afin de surveiller les résultats de benchmarking
  en parallèle des traces LLM.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: Documentation
  text: Envoyer des évaluations
title: Évaluations NeMo
---
## Présentation {#overview}
NVIDIA NeMo Evaluator est un microservice qui fournit un benchmarking automatisé pour les LLM. Pour plus d'informations, consultez la [documentation de NVIDIA][3].

Vous pouvez utiliser Agent Observability pour surveiller les scores d'évaluation du modèle de NVIDIA NeMo Evaluator. Les scores d'évaluation NeMo apparaissent en tant que métriques d'évaluation liées à la trace LLM d'origine.

## Configuration {#setup}

Ces étapes utilisent le [SDK Python d'Agent Observability][1].

Pour intégrer Agent Observability à NeMo Evaluator, soumettez vos scores d'évaluation NeMo parallèlement à `span_id` et `trace_id`.

1. **Obtenez les ID de span et de trace à partir de `LLMObs.export_span()`**.

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

   Dans l'extrait ci-dessus, `span_context` est un dictionnaire contenant `span_id` et `trace_id`.


2. **Préparez votre fichier de sorties**. Dans cet exemple, le fichier de sorties est nommé `outputs.json`.

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

   Pour chaque `input`, le champ de métadonnées `source` doit contenir les valeurs suivantes sous forme de chaîne séparée par des points-virgules :
      - `trace_id` : L'ID de trace, obtenu à partir de `LLMObs.export_span()`
      - `span_id` : L'ID de span, obtenu à partir de `LLMObs.export_span()`
      - Un ID pour joindre les données de sortie aux données d'évaluation NeMo. Dans cet exemple, ceci est appelé `question_id`.

3. **Préparez votre fichier de scores**. Téléchargez vos résultats depuis NeMo et enregistrez-les sous forme de fichier JSON (ou `jsonl`, pour des exécutions d'évaluation plus importantes).

   Dans cet exemple, le fichier suivant est nommé `scores.jsonl` :

   ```json
   {"question_id": 1, "model": "meta/llama-3.1-8b-instruct", "judge": ["meta/llama-3.1-8b-instruct", "single-v1"], "user_prompt": "[Instruction]\nPlease act as an impartial judge and evaluate the quality of the response provided by an AI assistant to the user question displayed below. Your evaluation should consider factors such as the helpfulness, relevance, accuracy, depth, creativity, and level of detail of the response. Begin your evaluation by providing a short explanation. Be as objective as possible. After providing your explanation, you must rate the response on a scale of 1 to 10 by strictly following this format: \"[[rating]]\", for example: \"Rating: [[5]]\".\n\n[Question]\nWhat are the ingredients in cake?\n\n[The Start of Assistant's Answer]\nThe ingredients in a basic cake recipe typically include flour, sugar, eggs, butter or oil, leavening agents like baking powder or baking soda, and a liquid such as milk or water. Additional flavorings such as vanilla extract or cocoa powder can also be added for variety.\n[The End of Assistant's Answer]", "judgment": "Rating: [[8]] The answer clearly denotes the ingredients needed to make a cake", "score": 8, "turn": 1, "tstamp": 1740429821.1071315}
   ```


4. **Associez vos sorties LLM à vos résultats d'évaluation NeMo et soumettez ces données en tant qu'évaluations personnalisées à Datadog**.

   Dans cet exemple, le fichier de sorties `outputs.json` est associé au fichier de scores NeMo `scores.jsonl` en utilisant `question_id` comme clé de jointure. Le résultat est ensuite soumis à Datadog.

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

### Utilisation {#usage}
Une fois les étapes de configuration terminées, vous pouvez consulter les scores d'évaluation du modèle de NVIDIA NeMo Evaluator joints à la trace Agent Observability dans Datadog :

{{< img src="llm_observability/nemo-demo-after-eval.png" alt="Une trace Agent Observability avec une évaluation personnalisée jointe à partir des résultats d'évaluation NeMo." style="width:100%;" >}}

Vous pouvez consulter une ventilation des résultats d'évaluation du modèle de votre NeMo Evaluator dans le dashboard Agent Observability et dans l'Application Overview. Dans la liste des traces, cliquez sur {{< ui >}}Options{{< /ui >}} pour ajouter les scores d'évaluation en tant que colonne :

{{< img src="llm_observability/nemo-demo-traces-view-eval.png" alt="Une liste de traces Agent Observability avec une évaluation personnalisée jointe à partir des résultats d'évaluation NeMo." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/setup/sdk/python
[2]: https://docs.nvidia.com/nemo-framework/user-guide/latest/overview.html
[3]: https://docs.nvidia.com/nemo/microservices/latest/evaluator/index.html