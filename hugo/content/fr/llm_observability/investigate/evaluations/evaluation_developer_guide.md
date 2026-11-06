---
aliases:
- /fr/llm_observability/guide/evaluation_developer_guide
- /fr/llm_observability/evaluations/evaluation_developer_guide/
- /fr/llm_observability/configure/evaluations/evaluation_developer_guide/
description: Apprenez à créer des évaluateurs personnalisés à l'aide du SDK Agent
  Observability.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: Documentation
  text: En savoir plus sur la soumission d'évaluations externes
- link: /llm_observability/setup/sdk/python
  tag: Documentation
  text: En savoir plus sur le SDK Agent Observability pour Python
- link: /llm_observability/instrument/api
  tag: Documentation
  text: En savoir plus sur la référence de l'API HTTP
title: Guide du développeur pour l'évaluation
---
## Présentation {#overview}

Ce guide explique comment créer des évaluateurs personnalisés avec le SDK Agent Observability et les utiliser dans LLM Experiments et en production. 

## Concepts clés {#key-concepts}

Une **évaluation** mesure une qualité spécifique de la sortie de votre application LLM, telle que la précision, le ton ou la nocivité. Vous écrivez la logique d'évaluation dans un **évaluateur**, qui reçoit le contexte concernant l'interaction LLM et renvoie un résultat.

### Exécution des évaluateurs dans une expérience {#running-evaluators-in-an-experiment}
Pour tester votre application LLM sur un jeu de données avant le déploiement, exécutez vos évaluateurs dans [LLM Experiments][4]. Dans Experiments, les évaluateurs s'exécutent automatiquement : le SDK appelle votre évaluateur sur chaque enregistrement distinct. Utilisez les évaluateurs via le SDK.

### Exécution des évaluateurs en production {#running-evaluators-in-production}
Pour surveiller la qualité de vos réponses LLM en direct, exécutez les évaluateurs en production. Vous pouvez exécuter les évaluateurs manuellement avec `submit_evaluation()`, ou automatiquement avec [des évaluations personnalisées LLM-as-a-judge][5]. Utilisez les évaluateurs via le SDK, l'API HTTP ou l'interface utilisateur Datadog.

Pour la production, il existe deux approches :
- **Évaluations manuelles** (ce guide) : vous exécutez les évaluateurs dans le code de votre application et soumettez les résultats avec `LLMObs.submit_evaluation()` ou l'API HTTP. Cela vous donne un contrôle total sur la logique et le timing de l'évaluation.
- **Évaluations personnalisées LLM-as-a-judge** : vous configurez les évaluations dans l'interface utilisateur Datadog à l'aide d'invites en langage naturel. Datadog les exécute automatiquement sur les traces de production en temps réel, sans aucune modification de code requise.

Ce guide se concentre sur les évaluations manuelles. Pour les évaluations gérées LLM-as-a-judge, consultez [Custom LLM-as-a-Judge Evaluations][5].

### Composants d'évaluation {#evaluation-components}

Le système d'évaluation comporte quatre composants principaux :

- **[EvaluatorContext](#evaluatorcontext)** : L'entrée d'un évaluateur. Contient l'entrée du LLM, la sortie, la sortie attendue et les identifiants de span. Dans Experiments, le SDK construit cela automatiquement à partir de chaque enregistrement de jeu de données. En production, vous construisez vous-même le EvaluatorContext.
- **[EvaluatorResult](#evaluatorresult)** : Le résultat d'un évaluateur. Contient une valeur typée, un raisonnement optionnel, une évaluation réussite/échec, des métadonnées et des tags. Vous pouvez également renvoyer une valeur simple (`str`, `float`, `int`, `bool`, `dict`) à la place.
- **[MultiEvaluatorResult](#multievaluatorresult)** : Un conteneur optionnel pour renvoyer plusieurs métriques nommées à partir d'un seul évaluateur. Chaque sous-valeur peut être une valeur simple ou son propre `EvaluatorResult`. Utile lorsqu'un passage d'évaluateur produit plusieurs métriques associées (par exemple, précision, rappel et F1).
- **[Type de métrique](#metric-types)** : Détermine comment la valeur d'évaluation est interprétée et affichée : `categorical` (libellés de chaîne), `score` (numérique), `boolean` (réussite/échec) ou `json` (données structurées).
- **[SummaryEvaluatorContext](#summaryevaluatorcontext)** — Experiments uniquement. Une fois tous les enregistrements de jeu de données évalués, les évaluateurs de résumé reçoivent les résultats agrégés pour calculer des statistiques telles que des moyennes ou des taux de réussite.

Le flux typique :

- **Experiments** : Enregistrement de jeu de données → `EvaluatorContext` → Évaluateur → `EvaluatorResult` (ou `MultiEvaluatorResult`) → (après tous les enregistrements) `SummaryEvaluatorContext` → Évaluateur de résumé → résultat de résumé
- **Production** : Données de span → `EvaluatorContext` (créées manuellement) → Évaluateur → `EvaluatorResult` → `LLMObs.submit_evaluation()` ou API HTTP

## Construction d'évaluateurs {#building-evaluators}

Il existe deux manières de définir un évaluateur en utilisant Agent Observability : basé sur des classes et basé sur des fonctions. En plus de ces évaluateurs, Agent Observability propose des intégrations avec des frameworks d'évaluation open source, tels que [DeepEval][6] et [Pydantic][], qui peuvent être utilisés dans les expériences Agent Observability.

| | Basé sur des classes | Basé sur des fonctions |
|---|---|---|
| **Idéal pour** | Les évaluateurs réutilisables avec une configuration ou un état personnalisé. | Les évaluateurs ponctuels avec une logique simple. |
| **Reçoit** | Un objet `EvaluatorContext` avec le contexte complet du span (entrée, sortie, sortie attendue, métadonnées, IDs de span/trace). | `input_data`, `output_data` et `expected_output` en tant qu'arguments séparés. |
| **Prend en charge les évaluateurs de résumé** | Oui (`BaseSummaryEvaluator`). | Non. |

En cas de doute, commencez par des évaluateurs basés sur des classes. Ils offrent les mêmes capacités que les évaluateurs basés sur des fonctions.

### Évaluateurs basés sur des classes {#class-based-evaluators}

Les évaluateurs basés sur des classes offrent une méthode structurée pour implémenter une logique d'évaluation réutilisable avec une configuration personnalisée.

#### BaseEvaluator {#baseevaluator}

Sous-classez `BaseEvaluator` pour créer un évaluateur qui s'exécute sur un seul span ou enregistrement de jeu de données. Implémentez la méthode `evaluate`, qui reçoit un [`EvaluatorContext`](#evaluatorcontext) et renvoie un [`EvaluatorResult`](#evaluatorresult) (ou une valeur simple).

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, EvaluatorResult

class SemanticSimilarityEvaluator(BaseEvaluator):
    """Evaluates semantic similarity between output and expected output."""

    def __init__(self, threshold: float = 0.8):
        super().__init__(name="semantic_similarity")
        self.threshold = threshold

    def evaluate(self, context: EvaluatorContext) -> EvaluatorResult:
        score = compute_similarity(context.output_data, context.expected_output)

        return EvaluatorResult(
            value=score,
            reasoning=f"Similarity score: {score:.2f}",
            assessment="pass" if score >= self.threshold else "fail",
            metadata={"threshold": self.threshold},
            tags={"type": "semantic"}
        )
{{< /code-block >}}

- Appelez `super().__init__(name="evaluator_name")` pour définir l'étiquette de l'évaluateur.
- Implémentez `evaluate(context: EvaluatorContext)` avec votre logique d'évaluation.
- Renvoyez un `EvaluatorResult` pour des résultats enrichis, ou une valeur simple (`str`, `float`, `int`, `bool`, `dict`).

#### BaseSummaryEvaluator {#basesummaryevaluator}

<div class="alert alert-info">Les évaluateurs de résumé ne sont disponibles que dans les expériences.</div>

Sous-classez `BaseSummaryEvaluator` pour créer un évaluateur qui fonctionne sur les résultats agrégés d'une exécution d'expérience entière. Il reçoit un [`SummaryEvaluatorContext`](#summaryevaluatorcontext) contenant toutes les entrées, sorties et résultats par évaluateur.

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseSummaryEvaluator, SummaryEvaluatorContext

class AverageScoreEvaluator(BaseSummaryEvaluator):
    """Computes average score across all evaluation results."""

    def __init__(self, target_evaluator: str):
        super().__init__(name="average_score")
        self.target_evaluator = target_evaluator

    def evaluate(self, context: SummaryEvaluatorContext):
        scores = context.evaluation_results.get(self.target_evaluator, [])
        if not scores:
            return None
        return sum(scores) / len(scores)
{{< /code-block >}}

- Appelez `super().__init__(name="evaluator_name")` pour définir l'étiquette de l'évaluateur.
- Accédez aux résultats par évaluateur via `context.evaluation_results`, qui mappe les noms des évaluateurs aux listes de résultats.

### LLMJudge {#llmjudge}

La classe `LLMJudge` permet l'évaluation automatisée des sorties LLM en utilisant un autre LLM comme juge. Il prend en charge OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock et les clients LLM personnalisés avec des formats de sortie structurés.

#### Paramètres {#parameters}

| Paramètre | Type | Requis | Description |
|-----------|------|----------|-------------|
| `user_prompt` | `str` | Oui | Modèle de prompt avec `{{field.path}}` syntax for span context injection. |
| `system_prompt` | `str` | No | System prompt to set the judge's behavior or persona. |
| `structured_output` | `StructuredOutput` | No | Output format specification. See [structured output types](#structured-output-types). |
| `provider` | `str` | Conditional | LLM provider: `\"openai\"`, `\"azure_openai\"`, `\"anthropic\"`, or `\"bedrock\"`. Required if `client` is not provided. |
| `model` | `str` | No | Model identifier (for example, `\"gpt-4o\"`, `\"claude-sonnet-4-20250514\"`). |
| `model_params` | `dict` | No | Additional parameters passed to the LLM API (for example, `temperature`). |
| `client` | callable | Conditional | Custom LLM client function. Required if `provider` is not provided. |
| `name` | `str` | No | Evaluator name for identification in results. |
| `client_options` | `dict` | Non | Configuration spécifique au fournisseur (par exemple, clés d'API). |

#### Variables de modèle {#template-variables}

Le `user_prompt` prend en charge `la syntaxe {{field.path}}` pour injecter le contexte à partir du span évalué. Les chemins imbriqués sont pris en charge.

- `{{input_data}}` — Les données d'entrée du span.
- `{{output_data}}` — Les données de sortie du span.
- `{{expected_output}}` — Sortie attendue pour comparaison (si disponible).
- `{{metadata.key}}` — Nested metadata fields (for example, `{{metadata.topic}}`).

#### Types de sortie structurée {#structured-output-types}

| Type de sortie | Description |
|-------------|-------------|
| `BooleanStructuredOutput` | Renvoie `True`/`False` avec une évaluation réussite/échec facultative. |
| `ScoreStructuredOutput` | Renvoie un score numérique dans une plage définie, avec des seuils facultatifs. |
| `CategoricalStructuredOutput` | Renvoie l'une des catégories d'un ensemble prédéfini, avec des valeurs de réussite facultatives. |
| `Dict[str, JSONType]` | Schéma JSON personnalisé pour une sortie structurée arbitraire. |

Tous les types de sortie structurée acceptent `reasoning=True` pour inclure une explication dans les résultats, et `reasoning_description` pour personnaliser la description du champ de raisonnement.

#### Exemple : Évaluation booléenne {#example-boolean-evaluation}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    user_prompt="Is this response factually accurate? Response: {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Whether the response is factually accurate",
        reasoning=True,
        pass_when=True,
    ),
)
{{< /code-block >}}

#### Exemple : évaluation basée sur le score avec des seuils {#example-score-based-evaluation-with-thresholds}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, ScoreStructuredOutput

judge = LLMJudge(
    provider="anthropic",
    model="claude-sonnet-4-20250514",
    user_prompt="Rate the helpfulness of this response (1-10): {{output_data}}",
    structured_output=ScoreStructuredOutput(
        description="Helpfulness score",
        min_score=1,
        max_score=10,
        reasoning=True,
        min_threshold=7,  # Scores >= 7 pass
    ),
)
{{< /code-block >}}

#### Exemple : évaluation catégorielle {#example-categorical-evaluation}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, CategoricalStructuredOutput

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    user_prompt="Classify the sentiment: {{output_data}}",
    structured_output=CategoricalStructuredOutput(
        categories={
            "positive": "The response has a positive sentiment.",
            "neutral": "The response has a neutral sentiment.",
            "negative": "The response has a negative sentiment.",
        },
        reasoning=True,
        pass_values=["positive", "neutral"],
    ),
)
{{< /code-block >}}

#### Exemple : Azure OpenAI {#example-azure-openai}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

judge = LLMJudge(
    provider="azure_openai",
    model="gpt-4o",
    user_prompt="Is this response factually accurate? Response: {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Whether the response is factually accurate",
        reasoning=True,
        pass_when=True,
    ),
    client_options={
        "azure_endpoint": "https://your-resource.openai.azure.com",
        "api_version": "2024-10-21",
        "azure_deployment": "gpt-4o",
    },
)
{{< /code-block >}}

Le fournisseur `azure_openai` accepte les éléments suivants `client_options` :

| Option | Variable d'environnement | Description |
|--------|---------------------|-------------|
| `api_key` | `AZURE_OPENAI_API_KEY` | Clé d'API Azure OpenAI. |
| `azure_endpoint` | `AZURE_OPENAI_ENDPOINT` | URL de l'endpoint Azure OpenAI. |
| `api_version` | `AZURE_OPENAI_API_VERSION` | Version de l'API. Par défaut : `"2024-10-21"`. |
| `azure_deployment` | `AZURE_OPENAI_DEPLOYMENT` | Nom du déploiement. Utilise le paramètre `model` par défaut. |

#### Exemple : client LLM personnalisé {#example-custom-llm-client}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMJudge, BooleanStructuredOutput

def my_llm_client(provider, messages, json_schema, model, model_params):
    response = call_my_llm(messages, model)
    return response

judge = LLMJudge(
    client=my_llm_client,
    model="my-custom-model",
    user_prompt="Is this response accurate? {{output_data}}",
    structured_output=BooleanStructuredOutput(
        description="Accuracy check",
        reasoning=True,
        pass_when=True,
    ),
)
{{< /code-block >}}

#### Points clés {#key-points}

- Nécessite soit un `provider` (`"openai"`, `"azure_openai"`, `"anthropic"` ou `"bedrock"`), soit un `client` personnalisé.
- Définissez les clés d'API à l'aide de `client_options={"api_key": "..."}` ou de variables d'environnement (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`). Pour Azure OpenAI, définissez `AZURE_OPENAI_API_KEY` et `AZURE_OPENAI_ENDPOINT`. Pour Bedrock, configurez les identifiants AWS via des variables d'environnement ou `client_options`.
- Utilisez `reasoning=True` dans les sorties structurées pour inclure une explication dans les résultats.
- Définissez les critères de réussite/échec avec `pass_when` (booléen), `pass_values` (catégoriel) ou `min_threshold`/`max_threshold` (score).

#### Publier un LLMJudge en tant qu'évaluation gérée par Datadog {#publishing-an-llmjudge-as-a-datadog-managed-evaluation}

Utilisez `LLMObs.publish_evaluator()` pour envoyer une configuration `LLMJudge` définie localement à Datadog en tant que brouillon LLM-as-a-judge personnalisé. Cela vous permet de définir et de valider un évaluateur dans des expériences, puis de le promouvoir en production sans recréer manuellement la configuration dans l'interface utilisateur.

| Paramètre | Type | Requis | Description |
|-----------|------|----------|-------------|
| `evaluator` | `LLMJudge` | Oui | L'instance `LLMJudge` à publier. |
| `ml_app` | `str` | Oui | Le nom de l'application LLM. |
| `eval_name` | `str` | Non | Le nom à utiliser pour l'évaluateur dans Datadog. S'il est omis, la valeur par défaut est celle définie sur `name` l'instance `LLMJudge`. |
| `variable_mapping` | `dict[str, str]` | Non | Remappe les noms de variables dans `user_prompt` vers les chemins de champs de span Datadog dans l'évaluateur publié. |

{{< code-block lang="python" >}}
from ddtrace.llmobs import BooleanStructuredOutput, LLMJudge, LLMObs

LLMObs.enable(
    ml_app="my-ml-app",
    api_key="<DD_API_KEY>",
    app_key="<DD_APP_KEY>",
)

judge = LLMJudge(
    provider="openai",
    model="gpt-4o",
    system_prompt="You are a helpful evaluator.",
    user_prompt=(
        "Does the output correctly answer the question?\n"
        "Input: {{input_data}}\n"
        "Output: {{output_data}}"
    ),
    structured_output=BooleanStructuredOutput("correctness", pass_when=True),
    name="my-correctness-judge",
)

result = LLMObs.publish_evaluator(
    judge,
    ml_app="my-ml-app",
    variable_mapping={"input_data": "span_input", "output_data": "span_output"},
)
print(result["ui_url"])
{{< /code-block >}}

`LLMObs.publish_evaluator()` renvoie `{"ui_url": "..."}`, qui lie à l'évaluateur dans Datadog.

<div class="alert alert-info">Chaque appel à <code>LLMObs.publish_evaluator()</code> crée ou met à jour le brouillon de l'évaluateur. Activez-le depuis l'interface utilisateur de Datadog pour l'exécuter en production.</div>

### Évaluateurs intégrés {#built-in-evaluators}

Le SDK fournit des évaluateurs intégrés pour les modèles d'évaluation courants. Il s'agit d'évaluateurs basés sur des classes que vous pouvez utiliser directement sans écrire de logique personnalisée.

#### StringCheckEvaluator {#stringcheckevaluator}

Effectue des opérations de comparaison de chaînes entre `output_data` et `expected_output`.

| Opération | Description |
|-----------|-------------|
| `eq` | Correspondance exacte (par défaut) |
| `ne` | Différent de |
| `contains` | `output_data` contient `expected_output` (sensible à la casse) |
| `icontains` | `output_data` contient `expected_output` (insensible à la casse) |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import StringCheckEvaluator

# Perform an exact match (default)
evaluator = StringCheckEvaluator(operation="eq", case_sensitive=True)

# Check whether output_data contains expected_output (case-insensitive)
evaluator = StringCheckEvaluator(operation="icontains", strip_whitespace=True)

# Extract field from dict output before comparison
evaluator = StringCheckEvaluator(
    operation="eq",
    output_extractor=lambda x: x.get("message", "") if isinstance(x, dict) else str(x),
)
{{< /code-block >}}

#### RegexMatchEvaluator {#regexmatchevaluator}

Valide la sortie par rapport à un motif regex.

| Mode de correspondance | Description |
|------------|-------------|
| `search` | Correspondance partielle n'importe où dans la chaîne (par défaut) |
| `match` | Correspondance à partir du début de la chaîne |
| `fullmatch` | Correspond à la chaîne entière |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import RegexMatchEvaluator
import re

# Validate email format
evaluator = RegexMatchEvaluator(
    pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    match_mode="fullmatch"
)

# Validate output pattern (case-insensitive)
evaluator = RegexMatchEvaluator(
    pattern=r"success|completed",
    flags=re.IGNORECASE
)
{{< /code-block >}}

#### LengthEvaluator {#lengthevaluator}

Valide les contraintes de longueur de la sortie.

| Type de comptage | Description |
|------------|-------------|
| `characters` | Compter les caractères (par défaut) |
| `words` | Compter les mots |
| `lines` | Compter les lignes |

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import LengthEvaluator

# Ensure response is 50-200 characters
evaluator = LengthEvaluator(min_length=50, max_length=200, count_type="characters")

# Validate word count
evaluator = LengthEvaluator(min_length=10, max_length=100, count_type="words")
{{< /code-block >}}

#### JSONEvaluator {#jsonevaluator}

Valide que la sortie est un JSON valide et vérifie éventuellement la présence des clés requises.

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import JSONEvaluator

# Validate JSON syntax
evaluator = JSONEvaluator()

# Validate that required keys exist
evaluator = JSONEvaluator(required_keys=["name", "status", "data"])
{{< /code-block >}}

#### SemanticSimilarityEvaluator {#semanticsimilarityevaluator}

Mesure la similarité sémantique entre `output_data` et `expected_output` en utilisant des plongements. Renvoie un score de similarité compris entre 0.0 et 1.0.

{{< code-block lang="python" >}}
from ddtrace.llmobs.evaluators import SemanticSimilarityEvaluator
from openai import OpenAI

client = OpenAI()

def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return response.data[0].embedding

evaluator = SemanticSimilarityEvaluator(
    embedding_fn=get_embedding,
    threshold=0.8  # Minimum similarity score to pass
)
{{< /code-block >}}

### Évaluateurs basés sur des fonctions {#function-based-evaluators}

Pour une logique d'évaluation simple, définissez une fonction plutôt qu'une classe. Les évaluateurs basés sur des fonctions reçoivent directement l'entrée, la sortie et la sortie attendue en tant qu'arguments.

{{< code-block lang="python" >}}
from ddtrace.llmobs import EvaluatorResult

def exact_match_evaluator(input_data, output_data, expected_output):
    """Checks if output exactly matches expected output."""
    matches = output_data == expected_output
    return EvaluatorResult(
        value=matches,
        reasoning="Exact match" if matches else "Output differs from expected",
        assessment="pass" if matches else "fail",
    )
{{< /code-block >}}

**Signature de fonction** :

{{< code-block lang="python" >}}
def evaluator_function(
    input_data: Any,
    output_data: Any,
    expected_output: Any
) -> Union[JSONType, EvaluatorResult, MultiEvaluatorResult]:
    ...
{{< /code-block >}}

Vous pouvez renvoyer :
- Une valeur simple (`str`, `float`, `int`, `bool`, `dict`), ou
- Un `EvaluatorResult` pour des résultats enrichis avec raisonnement et métadonnées, ou
- Un `MultiEvaluatorResult` pour émettre plusieurs métriques nommées à partir d'un seul appel d'évaluateur

### Renvoi de plusieurs valeurs avec MultiEvaluatorResult {#returning-multiple-values-with-multievaluatorresult}

Lorsqu'un évaluateur unique produit plusieurs métriques associées — par exemple, la précision, le rappel et une catégorie de matrice de confusion à partir d'un seul appel de juge LLM — renvoyez un `MultiEvaluatorResult` au lieu d'une valeur unique. Chaque entrée est émise en tant que métrique propre dans Datadog.

{{< code-block lang="python" >}}
from ddtrace.llmobs import EvaluatorResult, MultiEvaluatorResult

def confusion_matrix_evaluator(input_data, output_data, expected_output):
    predicted = bool(output_data)
    expected = bool(expected_output)
    correct = predicted == expected

    if predicted and expected:
        category = "true_positive"
    elif predicted and not expected:
        category = "false_positive"
    elif not predicted and expected:
        category = "false_negative"
    else:
        category = "true_negative"

    return MultiEvaluatorResult(
        {
            "correct": EvaluatorResult(
                value=correct,
                assessment="pass" if correct else "fail",
                reasoning=f"predicted={predicted}, expected={expected}",
            ),
            "category": category,
            "false_positive": category == "false_positive",
        }
    )
{{< /code-block >}}

Par défaut, les étiquettes des sous-métriques sont préfixées par le nom de l'évaluateur : `confusion_matrix_evaluator-correct`, `confusion_matrix_evaluator-category`, et ainsi de suite. Pour émettre des clés brutes sans préfixe, passez `prefix=False` :

{{< code-block lang="python" >}}
return MultiEvaluatorResult({"precision": 0.9, "recall": 0.8}, prefix=False)
{{< /code-block >}}

<div class="alert alert-warning">Si deux évaluateurs émettent la même étiquette de métrique pour le même enregistrement de jeu de données (par exemple, les deux utilisent <code>prefix=False</code> avec la même clé), la seconde valeur écrase la première et un avertissement est consigné.</div>

`MultiEvaluatorResult` est également pris en charge dans les évaluateurs basés sur des classes et les évaluateurs de résumé :

{{< code-block lang="python" >}}
from ddtrace.llmobs import BaseEvaluator, EvaluatorContext, MultiEvaluatorResult

class ConfusionMatrixEvaluator(BaseEvaluator):
    def __init__(self):
        super().__init__(name="confusion_matrix")

    def evaluate(self, context: EvaluatorContext) -> MultiEvaluatorResult:
        predicted = bool(context.output_data)
        expected = bool(context.expected_output)
        correct = predicted == expected
        # Emitted labels: correct, false_positive, false_negative (prefix=False)
        return MultiEvaluatorResult(
            {
                "correct": correct,
                "false_positive": predicted and not expected,
                "false_negative": not predicted and expected,
            },
            prefix=False
        )
{{< /code-block >}}

## Utilisation des évaluateurs dans les expériences {#using-evaluators-in-experiments}

Passez vos évaluateurs à `LLMObs.experiment()` pour les exécuter sur chaque enregistrement d'un jeu de données. Le SDK construit automatiquement un `EvaluatorContext` pour chaque enregistrement et appelle votre évaluateur. Une fois tous les enregistrements traités, tous les évaluateurs de synthèse s'exécutent sur les résultats agrégés.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, Dataset, DatasetRecord

# Create dataset
dataset = Dataset(
    name="qa_dataset",
    records=[
        DatasetRecord(
            input_data={"question": "What is 2+2?"},
            expected_output="4"
        ),
        DatasetRecord(
            input_data={"question": "What is the capital of France?"},
            expected_output="Paris"
        ),
    ]
)

# Define task
def qa_task(input_data, config):
    return generate_answer(input_data["question"])

# Create evaluators
semantic_eval = SemanticSimilarityEvaluator(threshold=0.7)
summary_eval = AverageScoreEvaluator("semantic_similarity")

# Run experiment
experiment = LLMObs.experiment(
    name="qa_experiment",
    task=qa_task,
    dataset=dataset,
    evaluators=[semantic_eval, exact_match_evaluator],
    summary_evaluators=[summary_eval]
)

experiment.run()
{{< /code-block >}}

### Utilisation des évaluateurs gérés {#using-managed-evaluators}

`RemoteEvaluator` vous permet de référencer par son nom une [évaluation LLM-as-a-judge personnalisée][5] configurée dans l'interface utilisateur Datadog, et de l'exécuter dans le cadre d'une expérience locale. Cela vous permet de réutiliser vos évaluateurs de production dans des expériences hors ligne sans avoir à réimplémenter la logique d'évaluation en Python.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `eval_name` | `str` | Le nom de l'évaluateur LLM-as-a-judge tel que configuré dans Datadog. |
| `transform_fn` | `Optional[Callable]` | Une fonction qui mappe un `EvaluatorContext` vers un dictionnaire de valeurs de variables de modèle. |

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, RemoteEvaluator

evaluator = RemoteEvaluator(eval_name="quality-assessment")

experiment = LLMObs.experiment(
    name="my-experiment",
    task=my_task,
    dataset=dataset,
    evaluators=[evaluator],
)
experiment.run()
{{< /code-block >}}

#### Mappage des données du jeu de données vers les variables de prompt avec `transform_fn` {#mapping-dataset-data-to-prompt-variables-with-transform-fn}

Lorsque vous configurez un LLM-as-a-judge dans l'interface utilisateur Datadog, le [modèle de prompt utilise des variables][7] telles que `{{span_input}}` and `{{span_output}}`. By default, `RemoteEvaluator` mappe les éléments suivants :
- `input_data` → `span_input`
- `output_data` → `span_output`
- `expected_output` → `meta.expected_output`

Si vos enregistrements de jeu de données ont une structure différente — par exemple, `input_data` est un dictionnaire avec plusieurs clés — fournissez un `transform_fn` pour contrôler exactement quelles valeurs sont envoyées pour chaque variable de modèle :

{{< code-block lang="python" >}}
from ddtrace.llmobs import RemoteEvaluator, EvaluatorContext

def my_transform(context: EvaluatorContext) -> dict:
    # input_data is a dict: {"user_query": str, "retrieved_docs": list[str]}
    return {
        "span_input": context.input_data.get("user_query"),   # → {{span_input}} in the prompt
        "span_output": context.output_data,                   # → {{span_output}} in the prompt
        "meta": {
            "retrieved_docs": context.input_data.get("retrieved_docs"),  # → {{meta.retrieved_docs}}
        },
    }

evaluator = RemoteEvaluator(
    eval_name="quality-assessment",
    transform_fn=my_transform,
)
{{< /code-block >}}

Si l'évaluateur backend rencontre une erreur, une `RemoteEvaluatorError` est levée. Inspectez `backend_error` pour plus de détails :

{{< code-block lang="python" >}}
from ddtrace.llmobs import RemoteEvaluator, RemoteEvaluatorError, EvaluatorContext

evaluator = RemoteEvaluator(eval_name="quality-assessment")
context = EvaluatorContext(input_data={"query": "What is the capital of France?"}, output_data="Paris")

try:
    result = evaluator.evaluate(context)
except RemoteEvaluatorError as e:
    print(e.backend_error)
    # {"type": "...", "message": "...", "recommended_resolution": "..."}
{{< /code-block >}}

## Utilisation des évaluateurs en production {#using-evaluators-in-production}

<div class="alert alert-info">Cette section couvre les évaluations que vous exécutez et soumettez manuellement depuis votre code d'application. Pour que Datadog exécute automatiquement des évaluations sur les traces de production, consultez plutôt <a href="/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations">Évaluations personnalisées LLM-as-a-Judge</a>.</div>

Pour soumettre des évaluations depuis votre code d'application, construisez vous-même le `EvaluatorContext`, appelez l'évaluateur et soumettez le résultat avec `LLMObs.submit_evaluation()`. Vous pouvez également soumettre des évaluations via l'API HTTP.

Pour les arguments `submit_evaluation()` complets et les options de jointure de span, consultez la [documentation sur les évaluations externes][1]. Pour la spécification de l'API HTTP, consultez la [référence de l'API Evaluations][2].

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, EvaluatorContext
from ddtrace.llmobs.decorators import llm

evaluator = SemanticSimilarityEvaluator(threshold=0.8)

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(input_text):
    completion = ...  # Your LLM application logic

    # Build the evaluation context from the span data
    context = EvaluatorContext(
        input_data=input_text,
        output_data=completion,
        expected_output=None,
    )

    # Run the evaluator
    result = evaluator.evaluate(context)

    # Submit the result to Datadog
    LLMObs.submit_evaluation(
        span=LLMObs.export_span(),
        ml_app="chatbot",
        label=evaluator.name,
        metric_type="score",
        value=result.value,
        assessment=result.assessment,
        reasoning=result.reasoning,
    )

    return completion
{{< /code-block >}}

## Référence du modèle de données {#data-model-reference}

### EvaluatorContext {#evaluatorcontext}

Une dataclass figée contenant toutes les informations nécessaires pour exécuter une évaluation.

| Champ | Type | Description |
|-------|------|-------------|
| `input_data` | `Any` | L'entrée fournie à l'application LLM (par exemple, une invite). |
| `output_data` | `Any` | La sortie réelle de l'application LLM. |
| `expected_output` | `Any` | La sortie attendue ou idéale que le LLM aurait dû produire. |
| `metadata` | `Dict[str, Any]` | Métadonnées supplémentaires. |
| `span_id` | `str` | L'identifiant unique du span (span). |
| `trace_id` | `str` | L'identifiant unique de la trace. |

Dans les expériences, le SDK remplit cela automatiquement à partir de chaque enregistrement de jeu de données. En production, vous le construisez vous-même à partir de vos données de span.

### EvaluatorResult {#evaluatorresult}

Permet de renvoyer des résultats d'évaluation enrichis avec un contexte supplémentaire. Utilisé à la fois dans les expériences et en production.

| Champ | Type | Description |
|-------|------|-------------|
| `value` | `Union[str, float, int, bool, dict]` | La valeur d'évaluation. Le type dépend de `metric_type`. |
| `reasoning` | `Optional[str]` | Une explication textuelle du résultat de l'évaluation. |
| `assessment` | `Optional[str]` | Une évaluation de cette évaluation. Les valeurs acceptées sont `pass` et `fail`. |
| `metadata` | `Optional[Dict[str, Any]]` | Métadonnées supplémentaires concernant l'évaluation. |
| `tags` | `Optional[Dict[str, str]]` | Tags à appliquer à la métrique d'évaluation. |

### MultiEvaluatorResult {#multievaluatorresult}

Un conteneur pour émettre plusieurs métriques d'évaluation nommées à partir d'un seul évaluateur. Importer depuis `ddtrace.llmobs`.

| Paramètre | Type | Par défaut | Description |
|-----------|------|---------|-------------|
| `values` | `Dict[str, Union[str, float, int, bool, dict, EvaluatorResult]]` | — | Mappage du nom de la sous-métrique vers une valeur simple ou un `EvaluatorResult`. Doit être non vide ; les clés doivent respecter [les conventions de nommage des étiquettes d'évaluation](#naming-conventions). |
| `prefix` | `bool` | `True` | Contrôle la génération d'étiquettes. `True` → `"<evaluator_name>-<key>"`. `False` → clé brute. |

Pris en charge dans les évaluateurs basés sur des fonctions, les évaluateurs basés sur des classes (`BaseEvaluator`) et les évaluateurs de résumé (`BaseSummaryEvaluator`).

### SummaryEvaluatorContext {#summaryevaluatorcontext}

Une dataclass figée fournissant des résultats d'évaluation agrégés sur tous les enregistrements de jeu de données dans une expérience. Utilisé uniquement par les évaluateurs de résumé.

| Champ | Type | Description |
|-------|------|-------------|
| `inputs` | `List[Any]` | Liste de toutes les données d'entrée de l'expérience. |
| `outputs` | `List[Any]` | Liste de toutes les données de sortie de l'expérience. |
| `expected_outputs` | `List[Any]` | Liste de toutes les sorties attendues de l'expérience. |
| `evaluation_results` | `Dict[str, List[Any]]` | Dictionnaire associant les noms des évaluateurs à leurs résultats. |
| `metadata` | `Dict[str, Any]` | Métadonnées supplémentaires associées à l'expérience. |

### Types de métriques {#metric-types}

Le type de métrique est défini lors de la soumission d'une évaluation (via `submit_evaluation()` ou l'API HTTP) et détermine la manière dont la valeur est validée et affichée dans Datadog.

| Type de métrique | Type de valeur | Cas d'utilisation |
|-------------|------------|----------|
| `categorical` | `str` | Classification des sorties en catégories (par exemple, « Positif », « Négatif », « Neutre ») |
| `score` | `float` ou `int` | Scores ou évaluations numériques (par exemple, 0,0-1,0, 1-10) |
| `boolean` | `bool` | Évaluations réussite/échec ou oui/non |
| `json` | `dict` | Données d'évaluation structurées (par exemple, rubriques multidimensionnelles ou ventilations détaillées) |

## Bonnes pratiques {#best-practices}

### Conventions de nommage {#naming-conventions}

Les étiquettes d'évaluation doivent respecter ces conventions :

- Doit commencer par une lettre
- Doit contenir uniquement des caractères alphanumériques ASCII, des traits de soulignement ou des traits d'union
- Les espaces et autres caractères non pris en charge sont convertis en traits de soulignement
- Unicode n'est pas pris en charge
- Ne doit pas dépasser 200 caractères (moins de 100 est préférable)
- Doit être unique pour une application LLM donnée (`ml_app`) et une organisation

### Exécution simultanée {#concurrent-execution}

Définissez le paramètre `jobs` pour exécuter les tâches et les évaluateurs simultanément sur plusieurs threads, ce qui permet aux expériences de se terminer plus rapidement lors du traitement de plusieurs enregistrements de jeu de données.

<div class="alert alert-info">Les évaluateurs asynchrones ne sont pas encore pris en charge pour l'exécution simultanée. Seuls les évaluateurs synchrones bénéficient de l'exécution parallèle.</div>

### Intégration OpenTelemetry {#opentelemetry-integration}

Lors de la soumission d'évaluations pour des [spans instrumentés par OpenTelemetry][3], incluez le tag `source:otel` dans l'évaluation. Consultez la [documentation sur les évaluations externes][1] pour voir des exemples.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/investigate/evaluations/external_evaluations
[2]: /fr/llm_observability/instrument/api/#evaluations-api
[3]: /fr/llm_observability/instrument/otel_instrumentation
[4]: /fr/llm_observability/improve/experiments
[5]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[6]: /fr/llm_observability/investigate/evaluations/external_evaluations/deepeval/
[7]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations#configure-the-prompt
[8]: /fr/llm_observability/investigate/evaluations/external_evaluations/pydantic