---
aliases:
- /es/tracing/llm_observability/evaluations/
- /es/llm_observability/configuration/
- /es/llm_observability/evaluations/
- /es/llm_observability/configure/evaluations/
description: Aprenda a configurar evaluaciones para su aplicación de LLM.
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Realice un seguimiento, compare y optimice sus prompts de LLM con Datadog
    LLM Observability
title: Evaluaciones
---
## Descripción general {#overview}

Agent Observability ofrece varias formas de admitir evaluaciones. Se pueden configurar navegando a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][8].

### Evaluaciones personalizadas de LLM-as-a-judge {#custom-llm-as-a-judge-evaluations}

Las [evaluaciones personalizadas de LLM-as-a-judge][1] le permiten definir su propia lógica de evaluación utilizando prompts en lenguaje natural. Puede crear evaluaciones personalizadas para evaluar criterios subjetivos u objetivos (como el tono, la utilidad o la veracidad) y ejecutarlas a escala en sus traces y spans.

### Evaluaciones gestionadas {#managed-evaluations}

Datadog crea y admite [evaluaciones gestionadas][2] para dar soporte a casos de uso comunes. Puede habilitarlas y configurarlas dentro de la aplicación Agent Observability.

### Enviar comentarios de usuarios finales {#submit-end-user-feedback}

Los [comentarios de usuarios finales][13] le permiten enviar calificaciones de pulgar hacia arriba o hacia abajo, cambios aceptados, comentarios de texto libre y otros comentarios de usuarios o agentes a Datadog. Los comentarios pueden conectarse a spans, traces, sesiones o entidades definidas por el cliente con una clave de unión de comentarios.

### Enviar evaluaciones externas {#submit-external-evaluations}

También puede enviar [evaluaciones externas][3] utilizando la API de Datadog. Utilice este enfoque cuando tenga su propio sistema de evaluación pero desee centralizar los resultados de la evaluación dentro de Datadog.

### Creación de evaluadores personalizados {#building-custom-evaluators}

Para los desarrolladores que crean evaluadores personalizados, consulte la [Guía para desarrolladores de evaluaciones][10].

### Integraciones de evaluación {#evaluation-integrations}

Datadog también admite integraciones con algunos marcos de evaluación de terceros, como [NeMo][5].

### Colas de anotación {#annotation-queues}

[Annotation Queues][11] proporcionan un flujo de trabajo estructurado para la revisión humana sistemática de los traces de LLM.

### Integración de Sensitive Data Scanner {#sensitive-data-scanner-integration}

Además de evaluar la entrada y salida de las solicitudes de LLM, los agentes, los flujos de trabajo o la aplicación, Agent Observability se integra con [Sensitive Data Scanner][6], que ayuda a prevenir la fuga de datos al identificar y redactar cualquier información confidencial. Para obtener una lista de las reglas preconfiguradas incluidas con Sensitive Data Scanner, consulte [Reglas de la biblioteca][12].

### Security {#security}

{{< learning-center-callout header="Obtenga barreras de seguridad en tiempo real para sus aplicaciones y agentes de IA" btn_title="Únase a la vista previa" hide_image="true" btn_url="https://www.datadoghq.com/product-preview/ai-security/">}}
  AI Guard ayuda a proteger sus AI apps y agentes en tiempo real contra prompt injection, jailbreaking, tool misuse y sensitive data exfiltration attacks. ¡Pruébelo hoy mismo!
{{< /learning-center-callout >}}

### Permisos {#permissions}

Se requieren [`Agent Observability Write` permisos][7] para configurar las evaluaciones.

### Recuperando spans {#retrieving-spans}

Agent Observability ofrece una [Export API][9] que puede utilizar para recuperar spans para ejecutar evaluaciones externas. Esto ayuda a evitar la necesidad de realizar un seguimiento de los datos relevantes para la evaluación en el momento de la ejecución.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[2]: /es/llm_observability/investigate/evaluations/managed_evaluations
[3]: /es/llm_observability/investigate/evaluations/external_evaluations
[5]: /es/llm_observability/investigate/evaluations/external_evaluations/nemo
[6]: /es/security/sensitive_data_scanner/
[7]: /es/account_management/rbac/permissions/#llm-observability
[8]: https://app.datadoghq.com/llm/evaluations
[9]: /es/llm_observability/investigate/export_api
[10]: /es/llm_observability/investigate/evaluations/evaluation_developer_guide
[11]: /es/llm_observability/investigate/annotation_queues
[12]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /es/llm_observability/investigate/evaluations/end_user_feedback