---
aliases:
- /fr/llm_observability/experiments/setup/
description: Comment configurer Agent Observability Experiments et commencer à exécuter
  des expériences.
further_reading:
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: Blog
  text: Déboguez et évaluez votre application d'IA depuis votre agent de codage avec
    Datadog Agent Observability
title: Configuration et Utilisation
---
Cette page décrit comment configurer et utiliser Agent Observability Experiments avec le Python SDK.

## Configurer Agent Observability {#set-up-agent-observability}

Si vous n'avez pas encore configuré Agent Observability :

1. Installer Agent Observability Python SDK:

   ```shell
   pip install ddtrace>=4.3.0
   ```

2. Activer Agent Observability:

   ```python
   from ddtrace.llmobs import LLMObs

   LLMObs.enable(
       api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
       app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
       site="datadoghq.com",      # defaults to DD_SITE environment variable
       project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
   )
   ```

   <div class="alert alert-warning">Vous devez fournir à la fois un <code>api_key</code> et <code>app_key</code>.</div>

### APM Trace correlation {#apm-trace-correlation}

Pour corréler vos Experiment spans avec les [APM Traces][5], exécutez Agent Observability via un Datadog Agent et maintenez `agentless_enabled` réglé sur `False` (la valeur par défaut). L'Agent transfère les données de trace à APM, ce qui permet la corrélation Experiment ↔ APM Trace.

   ```python
   LLMObs.enable(
       api_key="<YOUR_API_KEY>",
       app_key="<YOUR_APP_KEY>",
       site="datadoghq.com",
       agentless_enabled=False,  # default — required for APM Trace correlation
       project_name="<YOUR_PROJECT>",
   )
   ```

Si vous exécutez sans Agent (par exemple, dans un notebook ou un environnement CI), vous pouvez définir `agentless_enabled=True`, mais les spans APM correspondants ne sont pas générés pour les Experiment spans issus d'exécutions sans Agent.

## Créer un projet {#create-a-project}
_Projects_ constituent la couche organisationnelle principale pour LLM Experiments. Tous les jeux de données et toutes les expériences résident dans un projet.
Vous pouvez créer un projet manuellement dans la console Datadog, via l'API ou le SDK en spécifiant un nom de projet qui n'existe pas encore dans `LLMObs.enable`.

```python
LLMObs.enable(
    ...
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```

## Créer un jeu de données{#create-a-dataset}

Un _jeu de données_ est une collection d'_entrées_, de _sorties attendues_ et de _métadonnées_ qui représentent les scénarios sur lesquels vous souhaitez tester votre agent. Chaque jeu de données est associé à un _projet_.  

- **Entrée** (obligatoire) : représente toutes les informations auxquelles l'agent peut accéder dans une tâche.
- **expected output** (facultatif) : également appelée _ground truth_, représente la réponse idéale que l'agent devrait produire. Vous pouvez utiliser _expected output_ pour stocker la sortie réelle de l'application, ainsi que tout résultat intermédiaire que vous souhaitez évaluer. 
- **metadata** (facultatif) : contient toute information utile pour catégoriser l'enregistrement et l'utiliser pour une analyse ultérieure. Par exemple : sujets, balises, descriptions, notes.

Pour créer un jeu de données à partir d'un fichier CSV, utilisez `LLMObs.create_dataset_from_csv()` :

```python
# Create dataset from CSV
dataset = LLMObs.create_dataset_from_csv(
    csv_path="questions.csv",
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",              # Optional: defaults to the project name from LLMObs.enable
    description="Geography quiz dataset",         # Optional: Dataset description
    input_data_columns=["question", "category"],  # Columns to use as input
    expected_output_columns=["answer"],           # Optional: Columns to use as expected output
    metadata_columns=["difficulty"],              # Optional: Additional columns as metadata
    csv_delimiter=","                             # Optional: Defaults to comma
)

# Example "questions.csv":
# question,category,answer,difficulty
# What is the capital of Japan?,geography,Tokyo,medium
# What is the capital of Brazil?,geography,Brasília,medium

```

Consultez [Datasets][1] pour plus d'informations sur les jeux de données, notamment : comment créer manuellement des jeux de données, comment récupérer et gérer des jeux de données, et comment Datadog conserve les versions des jeux de données.

## Créez un Experiment {#create-an-experiment}
Un _Experiment_ vous permet de tester systématiquement votre application LLM en exécutant votre agent sur un ensemble de scénarios issus de votre jeu de données et en mesurant les performances par rapport aux expected outputs. Vous pouvez ensuite comparer les performances de différentes configurations d'application, côte à côte.

- **task** : définit le workflow principal que vous souhaitez évaluer. Il peut s'agir d'un simple appel LLM ou d'un flux plus complexe impliquant plusieurs appels LLM et étapes RAG. La tâche est exécutée séquentiellement sur tous les enregistrements du jeu de données.
- **évaluateur** : une fonction, exécutée sur chaque enregistrement, qui mesure les performances du modèle ou de l'agent. Les évaluateurs vous permettent de comparer la sortie à la sortie attendue ou à l'entrée d'origine.  

- **évaluateurs de résumé** : fonctions facultatives exécutées sur toutes les données de l'Experiment (entrées, sorties, résultats attendus, résultats des évaluations). Les évaluateurs de résumé vous permettent de calculer des métriques plus avancées, comme la précision, le rappel et l’exactitude, sur l'ensemble de votre jeu de données. 


Pour créer un Experiment :


### 1. Charger un jeu de données {#1-load-a-dataset}
   ```python
   from ddtrace.llmobs import LLMObs
   from typing import Dict, Any, Optional, List

   dataset = LLMObs.pull_dataset("capitals-of-the-world")
   ```

### 2. Définir une fonction de tâche qui traite un seul enregistrement de jeu de données {#2-define-a-task-function-that-processes-a-single-dataset-record}

   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]
       # Your LLM or processing logic here
       return "Beijing" if "China" in question else "Unknown"
   ```
   Une tâche peut prendre n'importe quel type non nul comme `input_data` (chaîne, nombre, booléen, objet, tableau). La sortie qui sera utilisée dans les évaluateurs peut être de n'importe quel type.
   Cet exemple génère une chaîne de caractères, mais un dict peut être généré en sortie pour stocker toute information intermédiaire et effectuer des comparaisons dans les évaluateurs.

   Optionnellement, votre fonction de tâche peut accepter un troisième paramètre `metadata` pour recevoir les métadonnées de l'enregistrement du jeu de données :
   ```python
   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
       difficulty = metadata.get("difficulty", "unknown") if metadata else "unknown"
       question = input_data["question"]
       return "Beijing" if "China" in question else "Unknown"
   ```

   Vous pouvez suivre les différentes parties de votre Experiment task (workflow, tool calls, etc.) en utilisant les [mêmes décorateurs de traçage][2] que ceux utilisés en production.
   Si vous utilisez un [framework pris en charge][3] (OpenAI, Amazon Bedrock, etc.), Agent Observability trace et annote automatiquement les appels aux frameworks et bibliothèques LLM, vous offrant une observabilité prête à l'emploi pour les appels effectués par votre application LLM.

#### Utilisation des OpenTelemetry spans dans les experiments

   Si votre application utilise l'[instrumentation OpenTelemetry][6], vous pouvez créer des OTel spans dans votre Experiment task. Avec `DD_TRACE_OTEL_ENABLED=1`, ddtrace agit comme le OpenTelemetry TracerProvider, de sorte que les OTel spans apparaissent automatiquement comme enfants de l'Experiment span.

   ```python
   import json
   from opentelemetry import trace

   tracer = trace.get_tracer(__name__)

   def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None) -> str:
       question = input_data["question"]

       # OTel gen_ai span — automatically becomes a child of the experiment span
       with tracer.start_as_current_span("my-llm-call") as span:
           span.set_attribute("gen_ai.operation.name", "chat")
           span.set_attribute("gen_ai.system", "openai")
           span.set_attribute("gen_ai.request.model", "gpt-4o")
           span.set_attribute("gen_ai.usage.input_tokens", 25)
           span.set_attribute("gen_ai.usage.output_tokens", 8)
           span.set_attribute(
               "gen_ai.input.messages",
               json.dumps([{"role": "user", "parts": [{"type": "text", "content": question}]}]),
           )

           result = call_my_llm(question)

           span.set_attribute(
               "gen_ai.output.messages",
               json.dumps([{"role": "assistant", "parts": [{"type": "text", "content": result}]}]),
           )

       return result
   ```

   Pour activer cela, définissez la variable d'environnement `DD_TRACE_OTEL_ENABLED` :

   ```shell
   DD_TRACE_OTEL_ENABLED=1 python my_experiment.py
   ```


### 3. Définissez les évaluateurs {#3-define-evaluators}

   Les évaluateurs mesurent les performances de votre modèle ou agent sur chaque enregistrement. Vous pouvez définir des évaluateurs en utilisant deux approches :

   - **Basé sur des fonctions**: Définissez une fonction qui reçoit `input_data`, `output_data` et `expected_output` en tant qu'arguments distincts. Idéal pour des évaluateurs ponctuels avec une logique simple.
   - **Basés sur des classes**: Sous-classer `BaseEvaluator` pour des évaluateurs réutilisables avec une configuration personnalisée. Les Évaluateurs basés sur des classes reçoivent un objet `EvaluatorContext` avec le contexte complet du span.

   Pour des informations détaillées sur la création d'évaluateurs, y compris la référence complète du modèle de données et les meilleures pratiques, consultez le [Evaluation Developer Guide][4].

   Datadog prend en charge les types de retour des évaluateurs suivants :
   - **Boolean**: renvoie true ou false
   - **score** : renvoie une valeur numérique (float)
   - **categorical**: renvoie une catégorie étiquetée (string)
   - **json** : renvoie des données structurées (dict)

   Vous pouvez également renvoyer :
   - Un `EvaluatorResult` pour capturer des données d'évaluation plus riches, telles que `reasoning`, `assessment` (`"pass"` ou `"fail"`), `metadata` et `tags`.
   - A `MultiEvaluatorResult` pour émettre plusieurs métriques nommées à partir d'un seul appel d'évaluateur. Pour plus de détails et d'exemples, consultez le [Evaluation Developer Guide][4].

#### Évaluateurs basés sur des fonctions

   ```python
   def exact_match(input_data: Dict[str, Any], output_data: str, expected_output: str) -> bool:
       return output_data == expected_output

   def overlap(input_data: Dict[str, Any], output_data: str, expected_output: str) -> float:
       expected_output_set = set(expected_output)
       output_set = set(output_data)

       intersection = len(output_set.intersection(expected_output_set))
       union = len(output_set.union(expected_output_set))

       return intersection / union

   def fake_llm_as_a_judge(input_data: Dict[str, Any], output_data: str, expected_output: str) -> EvaluatorResult:
       fake_llm_call = "excellent"
       return EvaluatorResult(
           value=fake_llm_call,
           reasoning="the model explains itself",
           assessment="pass", # or fail
           tags={"task": "judge_llm_call"},
       )

   # Return multiple metrics from one evaluator call
   from ddtrace.llmobs import MultiEvaluatorResult

   def multi_metric_evaluator(input_data, output_data, expected_output):
       correct = output_data == expected_output
       return MultiEvaluatorResult(
           {
               "correct": EvaluatorResult(value=correct, assessment="pass" if correct else "fail"),
               "length": len(str(output_data)),
           }
       )
       # Emitted as: multi_metric_evaluator-correct, multi_metric_evaluator-length
   ```

#### Évaluateurs basés sur des classes

   ```python
   from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, EvaluatorResult

   class SemanticSimilarityEvaluator(BaseEvaluator):
       def __init__(self, threshold: float = 0.8):
           super().__init__(name="semantic_similarity")
           self.threshold = threshold

       def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
           score = compute_similarity(context.output_data, context.expected_output)
           return EvaluatorResult(
               value=score,
               reasoning=f"Similarity score: {score:.2f}",
               assessment="pass" if score >= self.threshold else "fail",
           )
   ```

### 4. (Facultatif) Définissez les évaluateurs de résumé {#4-optional-define-summary-evaluators}

   Les évaluateurs de résumé s'exécutent après que tous les évaluateurs au niveau de l’enregistrement ont terminé, et reçoivent les résultats agrégés pour calculer des statistiques au niveau du jeu de données, telles que des moyennes ou des pass rates. Tout comme les Évaluateurs au niveau de l’enregistrement, vous pouvez définir des évaluateurs de résumé sous forme de fonctions ou de classes.

   Pour l'approche basée sur des classes utilisant `BaseSummaryEvaluator`, consultez le [Evaluation Developer Guide][4].

#### Évaluateurs de résumé basés sur des fonctions

   ```python
    def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
        return evaluators_results["exact_match"].count(True)

   ```

   Les fonctions d'évaluateurs de résumé peuvent accepter une liste de n'importe quel type non nul comme `inputs` (string, number, Boolean, object, array) ; `outputs` et `expected_outputs` peuvent être des listes de n'importe quel type. `evaluators_results` est un dict de listes de résultats provenant des évaluateurs, indexé par le nom de la fonction d'évaluateur. Par exemple, dans l'extrait de code ci-dessus, l'évaluateur de résumé `num_exact_matches` utilise les résultats (une liste de Booleans) de l'évaluateur `exact_match` pour fournir un nombre de correspondances exactes.

#### Évaluateurs de résumé basés sur des classes

   ```python
   from ddtrace.llmobs import BaseSummaryEvaluator, SummaryEvaluatorContext

   class AverageScoreEvaluator(BaseSummaryEvaluator):
       def __init__(self, target_evaluator: str):
           super().__init__(name="average_score")
           self.target_evaluator = target_evaluator

       def evaluate(self, context: SummaryEvaluatorContext):
           scores = context.evaluation_results.get(self.target_evaluator, [])
           if not scores:
               return None
           return sum(scores) / len(scores)
   ```

   Datadog prend en charge les types de retour d'évaluateurs de résumé suivants :
   - **Boolean**: renvoie true ou false
   - **score** : renvoie une valeur numérique (float)
   - **categorical**: renvoie une catégorie étiquetée (string)
   - **json** : renvoie des données structurées (dict)

### 5. Créez et exécutez l'Experiment. {#5-create-and-run-the-experiment}
   ```python
   experiment = LLMObs.experiment(
       name="capital-cities-test",
       task=task,
       dataset=dataset,
       evaluators=[exact_match, overlap, fake_llm_as_a_judge],
       summary_evaluators=[num_exact_matches], # optional
       description="Testing capital cities knowledge",
       config={
           "model_name": "gpt-4",
           "version": "1.0"
       },
   )

   # Run the experiment
   results = experiment.run()  # Run on all dataset records

   # Process results
   for result in results.get("rows", []):
       print(f"Record {result['idx']}")
       print(f"Input: {result['input']}")
       print(f"Output: {result['output']}")
       print(f"Score: {result['evaluations']['evaluator']['value']}")
       if result['error']['message']:
           print(f"Error: {result['error']['message']}")
   ```

   Pour augmenter la vitesse d'exécution de l'Experiment, vous pouvez activer le traitement parallèle :
   ```
   results = experiment.run(jobs=4)
   ```

   Pour tester votre pipeline sur un sous-ensemble des données, utilisez :
   ```
   results = experiment.run(sample_size=10)
   ```

   Pour arrêter l'exécution de l'Experiment si une erreur se produit, utilisez :
   ```
   results = experiment.run(raise_errors=True)
   ```

### 6. Examinez les résultats de votre Experiment dans Datadog. {#6-review-your-experiment-results-in-datadog}
   ```
   print(f"View experiment: {experiment.url}")
   ```

Remarque : les traces de LLM Experiments sont conservées pendant 90 jours.

[1]: /fr/llm_observability/improve/datasets
[2]: /fr/llm_observability/instrument/custom_instrumentation?tab=decorators#trace-an-llm-application
[3]: /fr/llm_observability/instrument/auto_instrumentation?tab=python
[4]: /fr/llm_observability/investigate/evaluations/evaluation_developer_guide
[5]: /fr/llm_observability/instrument/agent_observability_and_apm/
[6]: /fr/llm_observability/instrument/otel_instrumentation

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}