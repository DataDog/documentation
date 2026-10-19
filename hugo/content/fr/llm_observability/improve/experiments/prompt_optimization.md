---
aliases:
- /fr/llm_observability/experiments/prompt_optimization/
description: Améliorez automatiquement les prompts LLM grâce à un raffinement itératif
  et une évaluation assistée par IA.
further_reading:
- link: /llm_observability/improve/experiments/setup
  tag: Documentation
  text: Configurez et utilisez les expériences Agent Observability
- link: /llm_observability/improve/datasets
  tag: Documentation
  text: Créez et gérez des jeux de données
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: Blog
  text: Créez et surveillez des expérimentations LLM avec Datadog
private: true
title: Optimisation des prompts
---
## Présentation {#overview}

L'optimisation des prompts automatise le processus d'amélioration des prompts LLM grâce à une évaluation systématique et un raffinement assisté par IA. Au lieu de tester et d'ajuster manuellement les prompts, vous pouvez utiliser l'optimisation des prompts pour analyser les données de performance, identifier les modèles d'échec et suggérer des améliorations ciblées.

L'optimisation des prompts exécute votre application LLM sur un jeu de données avec le prompt actuel, mesure les performances à l'aide de vos métriques personnalisées, puis utilise un modèle de raisonnement pour analyser les résultats et générer un prompt amélioré. Ce cycle se répète jusqu'à ce que vos métriques cibles soient atteintes ou que le nombre maximal d'itérations soit atteint.

### Fonctionnalités d'optimisation des prompts {#prompt-optimization-capabilities}
- Amélioration automatisée des prompts grâce à une analyse assistée par IA
- Métriques d'évaluation personnalisables pour des tâches spécifiques au domaine
- Conditions d'arrêt intégrées pour éviter la sur-optimisation
- Exécution d'expérimentations en parallèle pour une itération rapide
- Division du jeu de données en sous-ensembles d'entraînement, de validation et de test pour des estimations de performance impartiales
- Intégration complète avec Agent Observability pour le suivi et le débogage

L'optimisation des prompts prend en charge tout cas d'utilisation où la sortie attendue est connue et où il existe un moyen défini d'évaluer les prédictions du modèle. L'architecture de l'optimisation des prompts prend en charge tout type de sortie, y compris l'extraction de données structurées, la génération de texte libre et les prédictions numériques.

## Prérequis {#prerequisites}

- [`ddtrace`][1] version 4.6.0+
- Agent Observability activé avec Datadog [clés d'API et d'application][2]
- Un [jeu de données][3] avec des exemples représentatifs (recommandé : 50-100 enregistrements)
- Accès à un modèle de raisonnement avancé (o3-mini, Claude 3.5 Sonnet ou similaire)

## Configurer l'optimisation des prompts {#set-up-prompt-optimization}

### 1. Préparez votre jeu de données {#1-prepare-your-dataset}

Créez ou chargez un jeu de données contenant des paires entrée-sortie qui représentent votre tâche :

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    api_key="<YOUR_API_KEY>",
    app_key="<YOUR_APP_KEY>",
    project_name="prompt-optimization-project"
)

# Load existing dataset
dataset = LLMObs.pull_dataset(dataset_name="hallucination-detection")

# Or create a new one
dataset = LLMObs.create_dataset(
    dataset_name="hallucination-detection",
    description="Examples of conversations with hallucinated content",
    records=[
        {
            "input_data": {"conversation": "User: What's the capital of France?\nAI: London"},
            "expected_output": True  # True = hallucination detected
        },
        # Add more records...
    ]
)
```

Pour aider à garantir une optimisation robuste, Datadog recommande d'inclure des exemples diversifiés qui couvrent les cas typiques et les cas limites.

### 2. Définissez votre fonction de tâche {#2-define-your-task-function}

Implémentez la fonction qui représente votre application LLM. Cette fonction reçoit les données d'entrée et la configuration (y compris le prompt en cours d'optimisation) :

```python
from openai import OpenAI
from pydantic import BaseModel

class DetectionResult(BaseModel):
    value: bool
    reasoning: str

    @classmethod
    def output_format(cls) -> str:
        """Return JSON schema for output format."""
        return json.dumps(
            {
                "value": "boolean: true or false evaluation result",
                "reasoning": "string: detailed explanation for the evaluation decision"
            },
            indent=3
        )

def detection_task(input_data, config):
    """Execute your LLM application with the current prompt."""
    client = OpenAI()

    prompt = config["prompt"]  # The prompt being optimized
    conversation = input_data["conversation"]

    response = client.chat.completions.parse(
        model=config.get("model_name", "gpt-4o-mini"),
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": f"Conversation:\n{conversation}"}
        ],
        response_format=DetectionResult
    )

    return response.choices[0].message.parsed
```

### 3. Définissez les fonctions d'évaluation {#3-define-evaluator-functions}

Pour optimiser votre prompt, vous avez besoin de plusieurs niveaux de calcul de métriques :

- Au niveau de l'enregistrement, étiquetez les résultats avec les conditions de la matrice de confusion : true positive (TP), false positive (FP), true negative (TN), false negative (FN)
- Agrégez ces étiquettes sur tous les enregistrements pour calculer des métriques intermédiaires (par exemple, comptez le total des TP, FP, TN et FN, puis calculez la précision, le rappel et l'exactitude)
- Calculez le score final pour lequel vous souhaitez optimiser le prompt en combinant ou en sélectionnant parmi les métriques agrégées (par exemple, renvoyez la précision seule, ou combinez précision + exactitude)
- Étiquetez les exemples de mauvaise classification à fournir à l'optimiseur de prompt

Les exemples suivants illustrent comment mettre en œuvre chaque étape.

- **Les évaluateurs individuels** mesurent chaque sortie :

   ```python
   def confusion_matrix_evaluator(input_data, output_data, expected_output):
       """Evaluate a single prediction."""
       prediction = output_data.value

       if prediction and expected_output:
           return "true_positive"
       elif prediction and not expected_output:
           return "false_positive"
       elif not prediction and expected_output:
           return "false_negative"
       else:
           return "true_negative"
   ```

- **Les évaluateurs de synthèse** calculent des métriques agrégées :

   ```python
   def precision_recall_evaluator(inputs, outputs, expected_outputs, evaluations):
       """Calculate precision and recall across all predictions."""
       tp = fp = tn = fn = 0

       for output, expected in zip(outputs, expected_outputs):
           pred = output.value if hasattr(output, 'value') else output
           if pred and expected:
               tp += 1
           elif pred and not expected:
               fp += 1
           elif not pred and expected:
               fn += 1
           else:
               tn += 1

       precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
       recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
       accuracy = (tp + tn) / (tp + tn + fp + fn)

       return {
           "precision": precision,
           "recall": recall,
           "accuracy": accuracy
       }
   ```

- **La fonction de score** peut renvoyer l'une des valeurs renvoyées par l'un des évaluateurs de synthèse (par exemple, la précision) ou une combinaison de plusieurs métriques :

   ```python
   def compute_score(summary_evaluators):
       """Higher is better. Combine metrics according to business priorities."""
       metrics = summary_evaluators['precision_recall_evaluator']['value']
       # Optimize for precision
       return metrics['precision']
   ```

   ou

   ```python
   def compute_score(summary_evaluators):
       """Computes F1 Score."""
       precision = summary_evaluators['precision_recall_evaluator']['value']['precision']
       recall = summary_evaluators['precision_recall_evaluator']['value']['recall']
       return 2 * (precision * recall) / (precision + recall)
   ```

- **Les fonctions de labellisation** catégorisent les résultats pour montrer des exemples divers à l'optimiseur :

   ```python
   def labelization_function(individual_result):
       """Categorize results into meaningful groups."""
       eval_value = individual_result["evaluations"]["confusion_matrix_evaluator"]["value"]

       if eval_value in ("true_positive", "true_negative"):
           return "CORRECT PREDICTION"
       else:
           return "INCORRECT PREDICTION"
   ```

   La fonction de labellisation joue un rôle important dans l'optimisation : pour chaque étiquette unique, l'optimiseur reçoit un exemple sélectionné au hasard dans cette catégorie (dans l'exemple ci-dessus, les étiquettes sont `CORRECT PREDICTION` et `INCORRECT PREDICTION`). Cela signifie que le nombre d'étiquettes détermine directement la diversité des exemples présentés au modèle de raisonnement.

   **Les noms des étiquettes doivent être significatifs et descriptifs**, car ils sont présentés directement au modèle de raisonnement. Utilisez des étiquettes claires et lisibles par l'humain comme `HIGH CONFIDENCE ERROR` ou `EDGE CASE FAILURE` plutôt que des codes comme `TYPE_A` ou `CAT_3`. Concevez vos étiquettes pour représenter les modèles ou indices clés dont vous souhaitez que l'optimiseur s'inspire, et maintenez une faible cardinalité (moins de 10 étiquettes distinctes) pour aider à garantir un retour d'information ciblé et exploitable.

### 4. Définir la tâche d'optimisation {#4-define-optimization-task}

Créez une fonction qui appelle un modèle de raisonnement pour suggérer des améliorations de prompt :

```python
from pydantic import BaseModel

class OptimizationResult(BaseModel):
    prompt: str

def optimization_task(system_prompt, user_prompt, config):
    """Use reasoning model to improve the prompt.

    Returns:
        str: The improved prompt text
    """
    client = OpenAI()

    response = client.chat.completions.parse(
        model="o3-mini",  # Use advanced reasoning model
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        response_format=OptimizationResult
    )

    return response.choices[0].message.parsed.prompt  # Must return string
```

<div class="alert alert-info">La tâche d'optimisation reçoit un prompt système avec des instructions pour améliorer les prompts et un prompt utilisateur avec des données de performance actuelles et des exemples. L'optimisation des prompts construit automatiquement ces prompts en fonction de vos résultats d'évaluation. La fonction doit renvoyer le prompt amélioré sous forme de chaîne de caractères.</div>

### 5. Exécutez l'optimisation {#5-run-optimization}

Créez et exécutez l'optimisation :

```python
prompt_optimization = LLMObs._prompt_optimization(
    name="hallucination-detection-optimization",
    dataset=dataset,
    task=detection_task,
    optimization_task=optimization_task,
    evaluators=[confusion_matrix_evaluator],
    summary_evaluators=[precision_recall_evaluator],
    labelization_function=labelization_function,
    compute_score=compute_score,
    config={
        "prompt": "Detect if the AI response contains hallucinated information.",  # Initial prompt (required)
        # Optionals
        "model_name": "gpt-4o-mini",  # Target model - helps optimizer tailor suggestions to model capabilities
        "evaluation_output_format": DetectionResult.output_format(),  # Expected output schema - prompts optimizer to ensure format compliance
        "runs": 1,  # Number of times to evaluate each record - higher values reduce variance in metrics
    },
    max_iterations=10,
    stopping_condition=lambda evals: (
        evals['precision_recall_evaluator']['value']['precision'] >= 0.9 and
        evals['precision_recall_evaluator']['value']['accuracy'] >= 0.8
    )
)

# Execute optimization (parallel execution for faster results)
result = prompt_optimization.run(jobs=20)

# Access results
print(f"Best prompt: {result.best_prompt}")
print(f"Best score: {result.best_score}")
print(f"Achieved in {result.total_iterations} iterations")
print(f"View in Datadog: {result.best_experiment_url}")

# Get score progression
print(result.summary())
```

#### Activer le fractionnement du jeu de données {#enable-dataset-splitting}

Fractionnez votre jeu de données en sous-ensembles d'entraînement, de validation et de test pour obtenir une estimation impartiale des performances du prompt. Les exemples d'entraînement alimentent le LLM d'optimisation, les scores de validation classent les itérations, et une expérience de test finale sur le meilleur prompt fournit un score impartial.

Utilisez `dataset_split=True` pour les ratios par défaut 60/20/20 :

```python
prompt_optimization = LLMObs._prompt_optimization(
    name="hallucination-detection-optimization",
    dataset=dataset,
    task=detection_task,
    optimization_task=optimization_task,
    evaluators=[confusion_matrix_evaluator],
    summary_evaluators=[precision_recall_evaluator],
    labelization_function=labelization_function,
    compute_score=compute_score,
    config={
        "prompt": "Detect if the AI response contains hallucinated information.",
    },
    max_iterations=10,
    dataset_split=True,  # Default 60/20/20 split
)

result = prompt_optimization.run(jobs=20)

# Access validation and test results
print(f"Best validation score: {result.best_score}")
print(f"Test score: {result.test_score}")
print(f"Test experiment: {result.test_experiment_url}")
```

Spécifiez des ratios personnalisés avec un tuple de 3 éléments :

```python
prompt_optimization = LLMObs._prompt_optimization(
    # ... same parameters as above ...
    dataset_split=(0.7, 0.15, 0.15),  # 70% train, 15% valid, 15% test
)
```

Utilisez un jeu de données de test distinct :

```python
prompt_optimization = LLMObs._prompt_optimization(
    # ... same parameters as above ...
    dataset_split=True,  # Splits main dataset 80/20 into train/valid
    test_dataset="my-curated-test-set",  # Separate dataset for unbiased testing
)
```

#### Options de configuration {#configuration-options}

`config`
: Un dictionnaire de configuration transmis à votre fonction de tâche. Contient les clés suivantes, ainsi que tous les paramètres personnalisés dont votre fonction de tâche a besoin :

  `"prompt"`
  : **requis**<br/>
  L'invite initiale

  `"model_name"`
  : _facultatif_<br/>
  Spécifie le modèle cible pour votre tâche. Lorsqu'il est fourni, l'optimiseur inclut des conseils spécifiques au modèle dans ses suggestions, adaptant les améliorations aux capacités et aux limites de ce modèle (par exemple, GPT-4 contre Claude contre Llama).

  `evaluation_output_format`
  : _facultatif_<br/>
  Fournit le schéma JSON pour la structure de sortie attendue. L'optimiseur l'utilise pour s'assurer que l'invite améliorée demande explicitement au modèle de produire une sortie correctement formatée. Ceci est particulièrement précieux pour les sorties structurées, où la conformité au format est critique.

  `runs`
  : _facultatif_<br/>
  Contrôle le nombre de fois où chaque enregistrement de jeu de données est évalué. Définir `runs` > 1 aide à réduire la variance des métriques pour les tâches avec des sorties non déterministes, fournissant des signaux d'optimisation plus stables au prix d'un temps d'exécution plus long.

`max_iterations`
: Contrôle le nombre maximal de cycles d'optimisation. Chaque itération teste une nouvelle invite sur le jeu de données complet.<br/>
  **Par défaut** : 5<br/>
  **Recommandé** : 10-20 pour l'exploration initiale, 5-10 pour la production

`stopping_condition`
: Fonction optionnelle qui détermine quand terminer l'optimisation prématurément. Reçoit des évaluations sommaires et renvoie `True` pour arrêter.

  ```python
  stopping_condition=lambda evals: (
      evals['my_evaluator']['value']['metric'] >= 0.95
  )
  ```

  Utilisez les conditions `AND` pour aider à garantir que plusieurs métriques atteignent les objectifs avant l'arrêt.

`dataset_split`
: Contrôle le fractionnement de l'ensemble de données pour une évaluation impartiale. Accepte les valeurs suivantes :<br/>
  - `False` (par défaut): Aucun fractionnement. L'ensemble de données complet est utilisé pour l'optimisation et la notation.<br/>
  - `True`: Fractionnement avec les ratios par défaut. Utilise 60/20/20 (entraînement/validation/test) sans `test_dataset`, ou 80/20 (entraînement/validation) avec `test_dataset`.<br/>
  - `(train, valid, test)` tuple : Ratios de fractionnement en 3 parties personnalisés. Doit totaliser 1,0. Ne peut pas être combiné avec `test_dataset`.<br/>
  - `(train, valid)` tuple : Ratios de fractionnement en 2 parties personnalisés. Doit totaliser 1,0. Nécessite `test_dataset` pour l'ensemble de test.

`test_dataset`
: Nom d'un ensemble de données distinct à utiliser pour l'expérience de test finale. Lorsqu'il est fourni, l'optimisation de prompt extrait automatiquement cet ensemble de données, divise l'ensemble de données principal en entraînement/validation (80/20 par défaut) et exécute une expérience de test finale sur le meilleur prompt en utilisant cet ensemble de données. Fournir `test_dataset` active implicitement le fractionnement du jeu de données.

#### Configurez les travailleurs parallèles {#configure-parallel-workers}

Lorsque vous exécutez l'optimisation, vous pouvez configurer votre nombre de travailleurs parallèles en passant le paramètre `jobs` à la fonction `run()` :

```python
result = prompt_optimization.run(jobs=20)
```

Des valeurs plus élevées réduisent le temps d'exécution total, mais peuvent atteindre les limites de débit de l'API.

`jobs`
: **Par défaut** : 1</br>
**Recommandé** : 10-20, pour la plupart des cas d'utilisation

**Exemple** pour un jeu de données de 100 enregistrements avec 10 itérations :
- `jobs=1` (série) : ~50 minutes (en supposant 5s par appel)
- `jobs=20` (parallèle) : ~5 minutes

## Fractionnement du jeu de données {#dataset-splitting}

Lors de l'optimisation d'un prompt, le même jeu de données est utilisé à la fois pour guider les améliorations et pour évaluer le résultat. Cela peut entraîner un surapprentissage, où le prompt fonctionne bien sur les données d'optimisation mais mal sur de nouvelles entrées. Le fractionnement du jeu de données résout ce problème en divisant vos données en sous-ensembles distincts ayant des rôles différents :

| Sous-ensemble | Rôle | Description |
|--------|------|-------------|
| **Entraînement** | Optimisation | Exemples montrés au modèle de raisonnement pour analyser les échecs et suggérer des améliorations. |
| **Validation** | Notation | Utilisé pour noter chaque itération et sélectionner le meilleur prompt. Non vu par l'optimiseur. |
| **Test** | Évaluation finale | Exécuté une fois sur le meilleur prompt après l'optimisation pour fournir une estimation de performance impartiale. |

### Ratios par défaut {#default-ratios}

Les ratios de répartition dépendent de la façon dont vous configurez `dataset_split` et `test_dataset` :

| Configuration | Entraînement | Validation | Test |
|---------------|-------|------------|------|
| `dataset_split=True` | 60 % | 20 % | 20 % |
| `dataset_split=True` + `test_dataset` | 80 % | 20 % | Jeu de données séparé |
| `(0.7, 0.15, 0.15)` | 70 % | 15 % | 15 % |
| `(0.8, 0.2)` + `test_dataset` | 80 % | 20 % | Jeu de données séparé |

Les enregistrements sont mélangés avec une graine fixe pour la reproductibilité entre les exécutions.

<div class="alert alert-info">Paramètre <code>dataset_split=False</code> (par défaut) préserve le comportement précédent où l'ensemble de données complet est utilisé pour toutes les phases d'optimisation.</div>

## Comprendre les résultats {#understanding-results}

L'objet `OptimizationResult` fournit un accès complet aux résultats de l'optimisation :

### Propriétés {#properties}

- `best_prompt` : Le prompt ayant obtenu le meilleur score découvert
- `best_score` : Score de la meilleure itération
- `best_experiment_url` : Lien vers l'expérience Datadog pour une analyse détaillée
- `total_iterations` : Nombre d'itérations terminées
- `best_iteration` : Quelle itération a obtenu le meilleur score
- `test_score` : Score de l'expérience de test finale. Renvoie `None` lorsque le fractionnement du jeu de données est désactivé.
- `test_experiment_url` : Lien vers l'expérience de test dans Datadog. Renvoie `None` lorsque le fractionnement du jeu de données est désactivé.
- `test_results`: Résultats complets de l'expérience de test. Renvoie `None` lorsque le fractionnement du jeu de données est désactivé.

### Méthodes {#methods}

- `get_history()`: Données complètes pour toutes les itérations (prompts, scores, résultats, URL)
- `get_score_history()`: Liste des scores montrant la progression
- `get_prompt_history()`: Liste des prompts montrant l'évolution
- `summary()`: Aperçu lisible par l'humain avec tableau de progression des scores. Lorsque le fractionnement du jeu de données est activé, le résumé inclut le score de test et les évaluations du jeu de test.

Exemple d'analyse des résultats :

```python
# View complete history
for iteration_data in result.get_history():
    print(f"Iteration {iteration_data['iteration']}")
    print(f"  Score: {iteration_data['score']}")
    print(f"  Metrics: {iteration_data['summary_evaluations']}")
    print(f"  URL: {iteration_data['experiment_url']}")

# Visualize improvement
import matplotlib.pyplot as plt
plt.plot(result.get_score_history())
plt.xlabel('Iteration')
plt.ylabel('Score')
plt.title('Prompt Optimization Progress')
plt.show()
```

Lorsque le fractionnement du jeu de données est activé, accédez aux résultats de test :

```python
# Check for overfitting by comparing validation and test scores
print(f"Best validation score: {result.best_score}")
print(f"Test score: {result.test_score}")
print(f"Test experiment: {result.test_experiment_url}")

# A large gap between best_score and test_score may indicate overfitting
```

Vous pouvez également consulter le prompt utilisé pour chaque itération dans l'onglet Config de la page Expérience.

## Bonnes pratiques {#best-practices}

Vous trouverez une collection de scripts d'exemple dans le [dépôt de recettes d'expérimentation][4].

### Conception du jeu de données {#dataset-design}

- Incluez 50 à 100 exemples divers couvrant les cas typiques et limites
- Pour les tâches de classification, assurez une représentation équilibrée entre les classes
- Validez que les étiquettes de vérité terrain sont correctes et cohérentes
- Versionnez les jeux de données pour la reproductibilité

### Métriques d'évaluation {#evaluation-metrics}

- Choisissez des métriques alignées sur les objectifs commerciaux (compromis précision/rappel)
- Utilisez plusieurs métriques complémentaires plutôt qu'un score global unique
- Pondérez les métriques par l'impact commercial dans votre fonction `compute_score`
- Testez les évaluateurs indépendamment avant de lancer l'optimisation

### Labellisation {#labelization}

- Créez 2 à 5 étiquettes distinctes et descriptives (par exemple : `CORRECT HIGH CONFIDENCE`, `INCORRECT EDGE CASE`)
- Assurez une distribution équilibrée des étiquettes (par exemple, évitez 95 % dans une seule catégorie)
- Utilisez des étiquettes pour aider l'optimiseur à comprendre les différents types de succès et d'échecs

### Fractionnement du jeu de données {#dataset-splitting-1}

- Utilisez au moins 50 enregistrements dans votre jeu de données avant d'activer le fractionnement pour garantir que chaque sous-ensemble dispose d'un nombre suffisant d'exemples.
- Commencez avec les ratios par défaut (`dataset_split=True`) avant de personnaliser le fractionnement
- Utilisez `test_dataset` lorsque vous disposez d'un ensemble de test conservé qui représente le trafic de production
- Comparez `best_score` (validation) avec `test_score` pour détecter le surapprentissage : un écart important suggère que le prompt est trop spécialisé pour les données de validation

### Sélection du modèle d'optimisation {#optimization-model-selection}

Utilisez des modèles de raisonnement avancés pour le `optimization_task` :
- **Recommandé :** OpenAI o3-mini, o1-preview ou Claude 3.5 Sonnet
- Utilisez des sorties structurées (modèles Pydantic) pour un parsing fiable

Évitez d'utiliser des modèles moins coûteux (GPT-3.5-turbo, Claude Haiku) car ils manquent de la profondeur de raisonnement nécessaire à une optimisation efficace.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /fr/llm_observability/improve/datasets?tab=csv
[4]: https://github.com/DataDog/llm-observability/tree/main/experiments/scripts