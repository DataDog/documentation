---
aliases:
- /es/llm_observability/evaluations/deepeval_evaluations/
- /es/llm_observability/configure/evaluations/external_evaluations/deepeval/
description: Utilice las evaluaciones de DeepEval con los experimentos de Agent Observability.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: Documentación
  text: Enviar evaluaciones
- link: https://www.datadoghq.com/blog/using-evaluation-frameworks-with-agent-observability/
  tag: Blog
  text: Uso de marcos de evaluación con Agent Observability
title: Evaluaciones de DeepEval
---
## Descripción general {#overview}

DeepEval es un marco de código abierto que proporciona métricas de LLM listas para usar y permite realizar evaluaciones de LLM personalizables. Para obtener más información, consulte la [documentación de DeepEval][3].

Puede utilizar Agent Observability para ejecutar evaluaciones de DeepEval en [Experimentos][1]. Los resultados de la evaluación de DeepEval aparecen como resultados del evaluador vinculados a cada instancia en un [conjunto de datos de Agent Observability][5].

## Configuración {#setup}

1. Configure un [experimento de Agent Observability][2] y un [conjunto de datos de Agent Observability][4].
2. Proporcione un evaluador de DeepEval al parámetro `evaluators` en un `Experiment` de LLMObs, como se demuestra en el siguiente ejemplo de código. Para ver un ejemplo funcional, consulte la [demostración de DeepEval de Datadog en GitHub][6].

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

### Uso {#usage}
Después de ejecutar un experimento con una evaluación de DeepEval, puede ver los resultados de la evaluación de DeepEval por instancia en la ejecución del experimento correspondiente en Datadog. En el experimento a continuación, se ejecutó un evaluador de DeepEval con el nombre "Correctness":

{{< img src="llm_observability/deepeval-experiment-result.png" alt="Un experimento de Agent Observability con un evaluador de DeepEval." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/improve/experiments
[2]: /es/llm_observability/improve/experiments/setup#create-an-experiment
[3]: https://deepeval.com/docs/metrics-introduction
[4]: /es/llm_observability/improve/experiments/setup#create-a-dataset
[5]: /es/llm_observability/improve/datasets
[6]: https://github.com/DataDog/llm-observability/blob/main/experiments/eval-integrations/1-deepeval-demo.py