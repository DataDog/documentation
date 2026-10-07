---
aliases:
- /fr/llm_observability/evaluations/deepeval_evaluations/
- /fr/llm_observability/configure/evaluations/external_evaluations/deepeval/
description: Utilisez les évaluations DeepEval avec Agent Observability Experiments.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: Documentation
  text: Envoyer des évaluations
- link: https://www.datadoghq.com/blog/using-evaluation-frameworks-with-agent-observability/
  tag: Blog
  text: Utilisation des Evaluation Frameworks avec Agent Observability.
title: Évaluations DeepEval
---
## Présentation {#overview}

DeepEval est un framework open source qui fournit des métriques LLM prêtes à l'emploi et permet des évaluations LLM personnalisables. Pour plus d'informations, consultez la [documentation de DeepEval][3].

Vous pouvez utiliser Agent Observability pour exécuter des évaluations DeepEval dans [Experiments][1]. Les résultats de l'évaluation DeepEval apparaissent en tant que résultats d'évaluateur liés à chaque instance dans un [jeu de données Agent Observability][5].

## Configuration {#setup}

1. Configurez une [expérience Agent Observability][2] et un [jeu de données Agent Observability][4].
2. Fournissez un évaluateur DeepEval au paramètre `evaluators` dans un `Experiment` LLMObs comme illustré dans l'exemple de code suivant. Pour un exemple fonctionnel, consultez la [démo DeepEval de Datadog sur GitHub][6].

```python 

from deepeval.metrics import GEval
from deepeval.test_case import LLMTestCaseParams

from ddtrace.llmobs import LLMObs


LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)


# this can be any DeepEval evaluator
deepeval_evaluator = GEval(
    name="<EVAL_NAME>",
    criteria="<CRITERIA>",
    evaluation_steps=[
        "<EVALUATION STEP 1",
        "...",
        "<EVALUATION STEP2>"
    ],
    evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT, LLMTestCaseParams.EXPECTED_OUTPUT],
    async_mode=True,
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
    question = input_data['question']
    # Your LLM or processing logic here
    return "Beijing" if "China" in question else "Unknown"

def num_exact_matches(inputs, outputs, expected_outputs, evaluators_results):
    return evaluators_results["<EVAL_NAME>"].count(True)

experiment = LLMObs.experiment(
    name="<EXPERIMENT_NAME>",
    task=my_task, 
    dataset=dataset,
    evaluators=[deepeval_evaluator],
    summary_evaluators=[num_exact_matches], # optional
    description="<EXPERIMENT_DESCRIPTION>",
)



results = experiment.run(jobs=4, raise_errors=True)

print(f"View experiment: {experiment.url}")
```

### Utilisation {#usage}
Après avoir exécuté une expérience avec une évaluation DeepEval, vous pouvez consulter les résultats de l'évaluation DeepEval par instance dans l'exécution de l'expérience correspondante dans Datadog. Dans l'expérience ci-dessous, un évaluateur DeepEval nommé « Correctness » a été exécuté :

{{< img src="llm_observability/deepeval-experiment-result.png" alt="Une expérience Agent Observability avec un évaluateur DeepEval." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/improve/experiments
[2]: /fr/llm_observability/improve/experiments/setup#create-an-experiment
[3]: https://deepeval.com/docs/metrics-introduction
[4]: /fr/llm_observability/improve/experiments/setup#create-a-dataset
[5]: /fr/llm_observability/improve/datasets
[6]: https://github.com/DataDog/llm-observability/blob/main/experiments/eval-integrations/1-deepeval-demo.py