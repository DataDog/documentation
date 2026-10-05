---
aliases:
- /es/llm_observability/evaluations/pydantic_evaluations/
- /es/llm_observability/configure/evaluations/external_evaluations/pydantic/
description: Utilice evaluaciones de Pydantic con experimentos de Agent Observability.
further_reading:
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: Documentación
  text: Enviar evaluaciones
title: Evaluaciones de Pydantic
---
## Descripción general {#overview}

Pydantic es un marco de código abierto que proporciona evaluaciones listas para usar y permite evaluaciones de LLM personalizables. Para obtener más información, consulte la [documentación de Pydantic][3].

Puede utilizar Agent Observability para ejecutar evaluaciones de Pydantic y evaluaciones de informes escalares de Pydantic en [Experimentos][1]. Los resultados de la evaluación de Pydantic aparecen como resultados del evaluador vinculados a cada instancia en un [conjunto de datos de Agent Observability][5]. Las evaluaciones de informes de Pydantic se ejecutan en todo un conjunto de datos de Agent Observability e informan un resultado escalar para el conjunto de datos.

## Configuración {#setup}

1. Configure un [experimento de Agent Observability][2] y un [conjunto de datos de Agent Observability][4].
2. Proporcione un evaluador de Pydantic al parámetro `evaluators` en un `Experiment` de LLMObs como se demuestra en el siguiente ejemplo de código. (Opcional) Proporcione un evaluador de informes de Pydantic al parámetro `summary_evaluators` en un `Experiment` de LLMObs. **Nota**: Solo se admiten evaluadores de informes de Pydantic que devuelvan un `ScalarResult`.

```python 

from pydantic_evals.evaluators import (
    EqualsExpected,
    EvaluationReason,
    Evaluator,
    EvaluatorContext,
    EvaluatorOutput,
    LLMJudge,
    ReportEvaluator,
    ReportEvaluatorContext,
)
from pydantic_evals.reporting.analyses import ScalarResult

from ddtrace.llmobs import LLMObs


LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)


# this can be any Pydantic evaluator
@dataclass
class ComprehensiveCheck(Evaluator): 
    def evaluate(self, ctx: EvaluatorContext) -> EvaluatorOutput:
        format_valid = self._check_format(ctx.output)

        to_return = {
            'valid_format': EvaluationReason(
                value=format_valid,
                reason='Valid JSON format' if format_valid else 'Invalid JSON format',
            ),
            'quality_score': self._score_quality(ctx.output),  
            'category': self._classify(ctx.output),  
        }
        return to_return

    def _check_format(self, output: str) -> bool:
        return output.startswith('{') and output.endswith('}')

    def _score_quality(self, output: str) -> float:
        return len(output) / 100.0

    def _classify(self, output: str) -> str:
        return 'short' if len(output) < 50 else 'long'

# This can be any Pydantic ReportEvaluator that returns ScalarResult
class TotalCasesEvaluator(ReportEvaluator):
    def evaluate(self, ctx: ReportEvaluatorContext) -> ScalarResult:
        return ScalarResult(
            title='Total',
            value=len(ctx.report.cases),
            unit='cases',
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


llm_judge = LLMJudge(
    rubric='Response provides the same answer as expected, possibly with explanation',
    include_input=True,
    include_expected_output=True,
)

experiment = LLMObs.experiment(
    name="<EXPERIMENT_NAME>",
    task=my_task, 
    dataset=dataset,
    evaluators=[EqualsExpected(), ComprehensiveCheck(), llm_judge],
    summary_evaluators=[TotalCasesEvaluator()],
    description="<EXPERIMENT_DESCRIPTION>",
)


results = experiment.run(jobs=4, raise_errors=True)

print(f"View experiment: {experiment.url}")
```

Para ver un ejemplo funcional, consulte la [demostración de Pydantic de Datadog en GitHub][6].

### Uso {#usage}
Después de ejecutar un experimento con una evaluación de Pydantic, puede visualizar los resultados de la evaluación de Pydantic por instancia en la ejecución del experimento correspondiente en Datadog. En el siguiente experimento, se ejecutaron dos evaluaciones de Pydantic (un evaluador de Pydantic personalizado con el nombre "ComprehensiveCheck" y un evaluador integrado con el nombre "EqualsExpected") y un evaluador de informes de Pydantic (un evaluador de informes de Pydantic personalizado con el nombre "TotalCasesEvaluator"):

{{< img src="llm_observability/pydantic-experiment-result.png" alt="Un experimento de Agent Observability con un evaluador de Pydantic." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/improve/experiments
[2]: /es/llm_observability/improve/experiments/setup#create-an-experiment
[3]: https://ai.pydantic.dev/evals/
[4]: /es/llm_observability/improve/experiments/setup#create-a-dataset
[5]: /es/llm_observability/improve/datasets
[6]: https://github.com/DataDog/llm-observability/blob/main/experiments/eval-integrations/2-pydantic-demo.py