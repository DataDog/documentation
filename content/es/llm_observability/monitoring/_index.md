---
description: Explorar aún más tu aplicación en LLM Observability.
title: Monitorización
---

## Información general

Explora y analiza tus aplicaciones LLM en producción con herramientas para consultar, visualizar, correlacionar e investigar datos en trazas (traces), clústeres y otros recursos.

Monitoriza el rendimiento, corrige los problemas, evalúa la calidad y protege tus sistemas basados en LLM con una visibilidad unificada de trazas, métricas y evaluaciones en línea.

### Monitorización del rendimiento en tiempo real

Monitoriza el estado operativo de tu aplicación LLM con métricas y dashboards integrados:

{{< img src="llm_observability/index/llm_dashboard_light.png" alt="Dashboard de información operativa de LLM Observability, que muestra diversas métricas y visualizaciones. Incluye una sección de información general con el número total de trazas y tramos (spans), índices de acierto y error, etc., y una sección de llamadas LLM con un gráfico circular del uso de modelos, la media de tokens de entrada y salida por llamada, etc." style="width:100%">}}

- **Volumen y latencia de solicitudes**: Realiza un seguimiento de las solicitudes por segundo, los tiempos de respuesta y los cuellos de botella de rendimiento en diferentes modelos, operaciones y endpoints.
- **Seguimiento de errores**: Monitoriza errores HTTP, tiempos de espera del modelo y solicitudes fallidas con el contexto de error detallado.
- **Consumo de tokens**: Realiza un seguimiento de los tokens de solicitudes, los tokens almacenados en caché, los tokens de finalización y el uso total para optimizar los costes.
- **Análisis del uso de modelos**: Monitoriza qué modelos están siendo llamandos, sus frecuencias y sus características de rendimiento.

El [dashboard de información operativa de LLM Observability][6] proporciona vistas consolidadas de métricas a nivel de traza y de tramo, índices de error, desgloses de latencia, tendencias de consumo de tokens y monitores activados.

### Corrección y resolución de problemas de producción

Depura flujos de trabajo LLM complejos con una visibilidad detallada de la ejecución:

{{< img src="llm_observability/index/llm_trace_light.png" alt="Vista detallada de una traza en LLM Observability, que muestra un gráfico de llama que representa visualmente cada llamada a un servicio. 'OpenAI.createResponse' está seleccionado y se muestra una vista detallada del tramo, que incluye los mensajes de entrada y los mensajes de salida." style="width:100%">}}

- **Análisis de trazas de extremo a extremo**: Visualiza los flujos completos de solicitudes, desde la entrada del usuario hasta las llamadas al modelo, las llamadas a las herramientas y la generación de respuestas.
- **Depuración a nivel de tramo**: Examina las operaciones individuales dentro de las cadenas, incluyendo los pasos de preprocesamiento, las llamadas al modelo y la lógica de postprocesamiento.
- **Identificación de las causas de error**: Identifica los puntos de fallo en las cadenas de varios pasos, los flujos de trabajo o las operaciones agénticas con información detallada del contexto y el momento del error.
- **Identificación de los cuellos de botella**: Busca las operaciones lentas y optimízalas en función de los desgloses de latencia de los componentes de flujos de trabajo.

### Evaluaciones de calidad y seguridad

{{< img src="llm_observability/index/llm_example_eval_light.png" alt="Vista detallada de un tramo en la pestaña Evaluations (Evaluaciones) de LLM Observability, que muestra una evaluación de alucinaciones con 'Contradicción confirmada', la salida marcada, la cuota de contexto y una explicación de pr qué se ha marcado." style="width:100%">}}

Asegúrate de que tus agentes o aplicaciones LLM cumplen las normas de calidad con evaluaciones en línea. Para obtener información completa sobre las evaluaciones alojadas y gestionadas en Datadog, la ingesta de evaluaciones personalizadas y las funciones de monitorización de la seguridad, consults la [documentación sobre evaluaciones][5].

### Consultar trazas y tramos de tu aplicación LLM

{{< img src="llm_observability/index/llm_query_example_light.png" alt="Vista LLM Observability > Trazas, donde el usuario ha ingresado la consulta`ml_app:shopist-chat-v2 'purchase' -'discount' @trace.total_tokens:>=20` y se muestran varias trazas." style="width:100%">}}

Aprende a utilizar la interfaz de consulta de LLM Observability de Datadog para buscar, filtrar y analizar las trazas y los tramos generados por tus aplicaciones LLM. La [documentación sobre consultas][1] explica cómo hacerlo:

- Utiliza la barra de búsqueda para filtrar las trazas y los tramos por atributos como modelo, usuario o estado de error.
- Aplica filtros avanzados para centrarte en operaciones o plazos específicos de LLM.
- Visualiza e inspecciona detalles de trazas para solucionar problemas y optimizar tus flujos de trabajo LLM.

Esto te permite identificar rápidamente los problemas, monitorizar el rendimiento y obtener información sobre el comportamiento de tu aplicación LLM en producción.


### Correlacionar APM y LLM Observability

{{< img src="llm_observability/index/llm_apm_example_light.png" alt="Una traza en Datadog APM. La pestaña Overview (Información general) muestra una sección llamada LLM Observability, con un enlace para visualizar el tramo en LLM Observability, así como el texto de entrada y salida." style="width:100%">}}

Para aplicaciones instrumentadas con Datadog APM, puedes [correlacionar APM y LLM Observability][2] a través del SDK. Correlacionar APM con LLM Observability proporciona visibilidad completa de extremo a extremo y análisis exhaustivos, desde problemas de aplicaciones hasta causas raíz específicas de LLM.

### Mapa de clústeres

{{< img src="llm_observability/index/llm_cluster_example.png" alt="Un mapa de clústeres de ejemplo qie muestra más de 1000 entradas de trazas, coloreadas por la métrica 'no hubo respuesta'. En el mapa se ve un estado de punto suspendido, que muestra una clasificación de la traza como 'Opciones económicas', así como texto de entrada y salida y un enlace para ver más detalles." style="width:100%">}}

El [mapa de clústeres][3] proporciona información general de cómo se agrupan y relacionan las solicitudes de tu aplicación LLM. Te ayuda a identificar patrones, grupos de actividad similar y outliers en trazas LLM, lo que facilita la investigación de problemas y optimiza el rendimiento.

### Monitorizar tus sistemas agénticos 

Aprende cómo monitorizar aplicaciones LLM agénticas que utilizan múltiples herramientas o cadenas de razonamiento con [Agent Monitoring][4] de Datadog. Esta característica te ayuda a realizar un seguimiento de las acciones de los agentes, el uso de herramientas y los pasos de razonamiento, proporcionándote una visibilidad de complejos flujos de trabajo LLM y permitiéndote solucionar problemas y optimizar los sistemas agénticos de manera efectiva. Consulta la [documentación de Agent Monitoring][4] para ver más detalles.


[1]: /es/llm_observability/monitoring/querying
[2]: /es/llm_observability/monitoring/llm_observability_and_apm
[3]: /es/llm_observability/monitoring/cluster_map/
[4]: /es/llm_observability/monitoring/agent_monitoring
[5]: /es/llm_observability/evaluations/
[6]: https://app.datadoghq.com/dash/integration/llm_operational_insights?fromUser=false&refresh_mode=sliding&from_ts=1758905575629&to_ts=1758909175629&live=true