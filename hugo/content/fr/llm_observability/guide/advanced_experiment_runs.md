---
aliases:
- /fr/llm_observability/improve/experiments/advanced_runs/
- /fr/llm_observability/experiments/advanced_runs/
description: Exécutez des expériences hors ligne plusieurs fois pour tenir compte
  de la variabilité du modèle sur un sous-ensemble de votre jeu de données et automatisez
  l'exécution des expériences dans les pipelines CI/CD.
title: Exécutions d'expériences avancées
---
Cette page traite de sujets avancés concernant l'exécution d'expériences hors ligne, notamment [les exécutions multiples d'une expérience](#multiple-runs) et [la configuration d'expériences hors ligne en CI/CD](#setting-up-your-experiment-in-cicd).

## Exécutez une expérience sur un sous-ensemble de votre jeu de données {#run-an-experiment-on-a-subset-of-your-dataset}

Tout d'abord, ajoutez des tags aux enregistrements de votre jeu de données. Ces tags peuvent être des identifiants uniques (par exemple, `name:test_use_case_1`) ou représenter des propriétés du scénario (par exemple, `difficulty:hard`).

Ensuite, utilisez l'argument `tags` de `LLMObs.pull_dataset()` pour filtrer le jeu de données afin d'obtenir les enregistrements pertinents et exécuter l'expérience.

Exemple

```
prod_dataset = LLMObs.pull_dataset(dataset_name="my-dataset", tags=["env:prod", "version:1.0"])

experiment = LLMObs.experiment(
    name="example-experiment",
    dataset=prod_dataset,
    task=topic_relevance,
    evaluators=[exact_match, false_confidence]
)
experiment.run()
```

## Exécutions multiples {#multiple-runs}

Vous pouvez exécuter la même expérience plusieurs fois pour tenir compte du non-déterminisme du modèle. Vous pouvez utiliser le [Agent Observability Python SDK][1] ou l'[Offline Experiments API][2] pour définir le nombre d'itérations à exécuter ; chaque enregistrement du jeu de données est ensuite traité autant de fois à l'aide des mêmes tâches et évaluateurs.

### Exécutions multiples avec le SDK Python {#multiple-runs-with-the-python-sdk}
<div class="alert alert-info">Nécessite Agent Observability Python SDK v4.1+.</div>

Définissez un paramètre `runs` optionnel dans votre méthode d'expérience, comme illustré dans l'exemple suivant :

{{< highlight py "hl_lines=7" >}}
experiment = LLMObs.experiment(
    name="example-experiment",
    dataset=dataset,
    task=topic_relevance,
    evaluators=[exact_match, false_confidence],
    config={"model": "gpt-4o-mini", "temperature": 0.3, "personality": "helpful"},
    runs=5
)

{{< /highlight >}}

Si vous ne définissez pas `runs`, votre expérience exécute une seule itération par défaut.

### Exécutions multiples avec Offline Experiments API {#multiple-runs-with-the-offline-experiments-api}

Incluez un champ `run_count` dans le corps de votre requête, comme illustré dans l'exemple suivant :
{{< highlight json "hl_lines=9" >}}
{
  "data": {
    "type": "experiments",
    "attributes": {
        "project_id": "<project_id>",
        "dataset_id": "<dataset_id>",
        "name": "example-experiment",
        "description": "",
        "run_count": 5,
        "metadata": {
            "team": ""
        },
        "config": {"model": "gpt-4o-mini", "temperature": 0.3, "personality": "helpful"}
    }
  }
}

{{< /highlight >}}

Si vous ne définissez pas `run_count`, votre expérience exécute une seule itération par défaut.

### Analyse des résultats d'expériences exécutées plusieurs fois dans Datadog {#analyzing-multiple-run-experiment-results-in-datadog}

Accédez à [Offline Experiments][3] dans Datadog et sélectionnez une expérience exécutée plusieurs fois.

Au niveau {{< ui >}}Summary{{< /ui >}}, les évaluations et les métriques sont calculées comme suit :
- Pour les évaluations basées sur des scores, la moyenne des moyennes des enregistrements
- Pour les évaluations catégorielles, le mode des modes des enregistrements

Au niveau {{< ui >}}Record{{< /ui >}}, les évaluations et les métriques sont calculées comme suit :
- Pour les évaluations basées sur des scores, la moyenne des résultats des exécutions pour une même entrée
- Pour les évaluations catégorielles, le mode des résultats des différentes exécutions pour l'entrée

#### Recherche et filtrage {#searching-and-filtering}

Pour filtrer les évaluations ou les métriques de plusieurs exécutions, utilisez `@multi_run_avg` pour les évaluations basées sur des scores ou `@multi_run_mode` pour les évaluations catégorielles.

Par exemple :

```
@multi_run_avg.@evaluations.custom.random_evaluator:>0.5  @multi_run_mode.@evaluations.custom.sentient_evaluator:positive
```

{{< img src="llm_observability/evaluations/multi-run-query.png" alt="La vue des enregistrements d'expérience montrant une requête de recherche utilisant des filtres multi-exécutions. La barre de recherche affiche la requête @multi_run_avg.@evaluations.custom.random_evaluator:>=0.5 @multi_run_mode.@evaluations.custom.sentiment_evaluator:positive. La barre latérale gauche affiche des filtres pour Duration, Status et Custom Evaluations, avec des cases à cocher et des curseurs de sélection d'une plage de valeurs. Le tableau principal affiche 8 des 127 enregistrements filtrés, avec des colonnes pour les prompts d'entrée, la sortie attendue, les résultats d'évaluation, notamment exact_match et false_confidence, les scores de random_evaluator, les valeurs de sentiment_evaluator, la durée et le coût estimé." style="width:100%;" >}}

Les requêtes qui mélangent des colonnes `@multi_run_avg.` et des colonnes ordinaires `@trace.` **ne sont pas prises en charge**.

Par exemple :
- Pris en charge : `@multi_run_avg.@trace.total_tokens:>1000` (Tous les enregistrements pour lesquels le nombre moyen de tokens est supérieur à 1000 tokens)
- Pris en charge : `run_iteration:1 @trace.total_tokens:>1000` (Tous les enregistrements de la première exécution pour lesquels le nombre total de tokens était supérieur à 1000)
- Non pris en charge : `@multi_run_avg.@trace.total_tokens:>1000 @trace.estimated_total_cost:>0.01` (Tous les enregistrements pour lesquels le nombre moyen de tokens sur l'ensemble des exécutions était supérieur à 1000 et le coût de la première exécution était supérieur à 1 cent)

#### Comparaison des exécutions d'expériences {#comparing-experiment-runs}

De la même manière que vous pouvez comparer des expériences hors ligne à exécution unique, vous pouvez comparer des expériences hors ligne à exécutions multiples en sélectionnant des exécutions particulières. Par exemple, vous pouvez comparer Run 1 de Experiment A à Run 4 de Experiment B pour analyser la variabilité entre les exécutions.

{{< img src="llm_observability/evaluations/multi-run-compare.png" alt="L'interface de comparaison d'expériences montrant deux expériences hors ligne à exécutions multiples en cours de comparaison. La section supérieure affiche un tableau de comparaison présentant les métriques agrégées de chaque expérience, notamment les moyennes pour answer_correctness, random_evaluator, sentiment_evaluator, exact_match, false_confidence et duration. En dessous, une vue de comparaison détaillée montre un menu déroulant ouvert où Run 4 est sélectionné dans une liste allant de Run 1 à Run 7, ce qui permet de comparer des exécutions précises de chaque expérience. La section des enregistrements du jeu de données affiche côte à côte les colonnes d'entrée, de sortie attendue et de sortie générée, ainsi que les métriques d'évaluation des exécutions sélectionnées." style="width:100%;" >}}

## Configuration de votre expérience dans un pipeline CI/CD {#setting-up-your-experiment-in-cicd}
Vous pouvez exécuter une expérience manuellement ou la configurer pour qu'elle s'exécute automatiquement dans vos pipelines CI/CD. Par exemple, exécutez-la sur votre jeu de données à chaque modification pour comparer les résultats avec votre référence et détecter les régressions potentielles.

### GitHub Actions {#github-actions}
Vous pouvez utiliser le script Python et le workflow GitHub Actions suivants comme modèles pour exécuter une expérience automatiquement chaque fois que du code est envoyé vers votre dépôt.

**Remarque** : les fichiers de workflow se trouvent dans le répertoire `.github/workflows` et doivent utiliser la syntaxe YAML avec l'extension `.yml`.

```python
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import EvaluatorResult
from typing import Dict, Any, Optional, List

LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)


dataset = LLMObs.create_dataset(
    dataset_name="capitals-of-the-world",
    project_name="capitals-project",  # optional, defaults to project_name used in LLMObs.enable
    description="Questions about world capitals",
    records=[
        {
            "input_data": {
                "question": "What is the capital of China?"
            },  # required, JSON or string
            "expected_output": "Beijing",  # optional, JSON or string
            "metadata": {"difficulty": "easy"},  # optional, JSON
        },
        {
            "input_data": {
                "question": "Which city serves as the capital of South Africa?"
            },
            "expected_output": "Pretoria",
            "metadata": {"difficulty": "medium"},
        },
    ],
)

def task(input_data: Dict[str, Any], config: Optional[Dict[str, Any]] = None, metadata: Optional[Dict[str, Any]] = None) -> str:
    question = input_data["question"]
    difficulty = metadata.get("difficulty", "unknown") if metadata else "unknown"
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"


def exact_match(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> bool:
    return output_data == expected_output


def overlap(
    input_data: Dict[str, Any], output_data: str, expected_output: str
) -> float:
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


def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
    return evaluators_results["exact_match"].count(True)


experiment = LLMObs.experiment(
    name="capital-cities-test",
    task=task,
    dataset=dataset,
    evaluators=[exact_match, overlap, fake_llm_as_a_judge],
    summary_evaluators=[num_exact_matches],  # optional
    description="Testing capital cities knowledge",
    config={"model_name": "gpt-4", "version": "1.0"},
)

results = experiment.run(jobs=4, raise_errors=True)

print(f"View experiment: {experiment.url}")
```

```yaml
name: Experiment SDK Test

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    environment: protected-main-env # The job uses secrets defined in this environment
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.13.0' # Or your desired Python version
      - name: Install Dependencies
        run: pip install ddtrace>=4.1.0 dotenv
      - name: Run Script
        run: python ./experiment_sdk_demo/main.py
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
```

### Interrogation et comparaison des exécutions CI/CD via l'API {#querying-and-comparing-cicd-runs-via-the-api}
Lors de la création d'expériences hors ligne pour un pipeline CI/CD, utilisez le champ `name` pour inclure un nom de pipeline logique partagé et un suffixe par exécution (par exemple, `my-pipeline-<run-id>`), et utilisez le champ `metadata` pour le commit, la branche ou tout autre contexte de pipeline (par exemple, `"metadata": {"commit": "abc123", "branch": "feat/foo"}`).

Pour récupérer et comparer les exécutions via l'API, appelez `GET /api/v2/llm-obs/v1/experiments` avec ces filtres :
- `filter[experiment]=<pipeline-name>` renvoie toutes les exécutions partageant le même nom de pipeline logique.
- `filter[metadata]={"branch":"main"}` renvoie les exécutions dont les métadonnées contiennent ces paires clé-valeur.
- Combinez les deux filtres pour affiner les comparaisons, par exemple : `?filter[experiment]=my-pipeline&filter[metadata]={"commit":"abc123"}`.
- `filter[parent_experiment_id]=<uuid>` renvoie toutes les expériences hors ligne qui ont été exécutées par rapport à une expérience de référence donnée. Peut être répété pour plusieurs ID de référence.

Chaque expérience correspondante inclut `aggregate_data` avec des distributions de scores d'évaluation précalculées, des coûts en tokens et des taux d'erreur, afin que vous puissiez comparer les exécutions sans interroger les spans individuels.

`filter[experiment]` correspond au nom de pipeline logique partagé stocké dans la colonne `experiment` (par exemple, `my-pipeline`). Ceci est distinct du champ `name` unique par exécution (par exemple, `my-pipeline-<run-id>`).

```http
# Create experiment tagged with pipeline context
POST /api/v2/llm-obs/v1/experiments
{
  "data": {
    "type": "experiments",
    "attributes": {
      "project_id": "<project_id>",
      "dataset_id": "<dataset_id>",
      "name": "my-pipeline-<run-id>",
      "metadata": {"commit": "abc123", "branch": "feat/foo"}
    }
  }
}

# Compare all runs of the same pipeline on main branch
GET /api/v2/llm-obs/v1/experiments?filter[experiment]=my-pipeline&filter[metadata]={"branch":"main"}

# Retrieve a specific commit's run
GET /api/v2/llm-obs/v1/experiments?filter[experiment]=my-pipeline&filter[metadata]={"commit":"abc123"}
```

[1]: /fr/llm_observability/instrument/sdk?tab=python
[2]: /fr/llm_observability/guide/offline_experiments_api
[3]: https://app.datadoghq.com/llm/experiments