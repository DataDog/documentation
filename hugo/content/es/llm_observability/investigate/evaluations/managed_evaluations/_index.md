---
aliases:
- /es/llm_observability/evaluations/ootb_evaluations
- /es/llm_observability/configure/evaluations/ootb_evaluations
- /es/llm_observability/evaluations/managed_evaluations/
- /es/llm_observability/configure/evaluations/managed_evaluations/
description: Aprenda a configurar evaluaciones administradas para sus aplicaciones
  de LLM.
further_reading:
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenga visibilidad de los flujos de trabajo de los agentes de Strands con
    Datadog LLM Observability
- link: /llm_observability/quickstart/terms/
  tag: Documentación
  text: Conozca los términos y conceptos de Agent Observability
- link: /llm_observability/setup
  tag: Documentación
  text: Aprenda a configurar Agent Observability
title: Evaluaciones administradas
---
## Descripción general {#overview}

Las evaluaciones administradas son herramientas integradas para evaluar su aplicación de LLM. Agent Observability asocia las evaluaciones con cada uno de los spans.
spans para que pueda visualizar las entradas y salidas que llevaron a una evaluación específica.

Obtenga más información sobre los [requisitos de compatibilidad][2].

## Crear nuevas evaluaciones {#create-new-evaluations}

1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][1].
1. Haga clic en el botón {{< ui >}}Create Evaluation{{< /ui >}} en la esquina superior derecha.
1. Seleccione una evaluación administrada específica. Esto abrirá la ventana del editor de evaluaciones.

Después de hacer clic en {{< ui >}}Save and Publish{{< /ui >}}, la evaluación se activa. Alternativamente, puede {{< ui >}}Save as Draft{{< /ui >}} y editarlas o habilitarlas más tarde.

## Editar evaluaciones existentes {#edit-existing-evaluations}

1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][1].
1. Pase el cursor sobre la evaluación que desea editar y haga clic en el botón {{< ui >}}Edit{{< /ui >}}.

### Evaluaciones administradas compatibles {#supported-managed-evaluations}

- [Desajuste de idioma][3] - Marca las respuestas que están escritas en un idioma diferente al de la entrada del usuario
- [Escaneo de datos confidenciales][4] - Marca la presencia de información confidencial o regulada en las entradas o salidas del modelo


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /es/llm_observability/investigate/evaluations/compatibility
[3]: /es/llm_observability/investigate/evaluations/language_mismatch
[4]: /es/llm_observability/investigate/evaluations/managed_evaluations/security_and_safety_evaluations