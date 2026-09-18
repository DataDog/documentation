---
aliases:
- /es/llm_observability/monitoring/
description: Cómo explorar más de su aplicación en Agent Observability.
further_reading:
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con Agent Observability
title: Investigar
---
## Descripción general {#overview}

Explore y analice sus aplicaciones de LLM en producción con herramientas para consultar, visualizar, correlacionar e investigar datos a través de trazas, clústeres y otros recursos.

Monitoree el rendimiento, depure problemas, evalúe la calidad y asegure sus sistemas basados en LLM con visibilidad unificada a través de trazas, métricas y evaluaciones en línea.

### Monitoreo del rendimiento en tiempo real {#real-time-performance-monitoring}

Haga un seguimiento de la salud operativa de su aplicación de LLM con métricas y paneles integrados:

{{< img src="llm_observability/index/llm_dashboard_light.png" alt="Panel de información operativa de Agent Observability, que muestra varias métricas y visualizaciones. Incluye una sección de Descripción general con el número total de trazas y tramos, tasas de éxito y de error, etc.; y una sección de Llamadas de LLM con un gráfico de dona que muestra el uso del modelo, tokens promedio de entrada y salida por llamada, etc." style="width:100%">}}

- **Volumen de solicitudes y latencia**: realice un seguimiento de las solicitudes por segundo, los tiempos de respuesta y los cuellos de botella de rendimiento en diferentes modelos, operaciones y puntos finales.
- **Seguimiento de errores**: haga un seguimiento de los errores HTTP, los tiempos de espera del modelo y las solicitudes fallidas con un contexto de error detallado.
- **Consumo de tokens**: realice un seguimiento de los tokens de prompt, tokens en caché, tokens de finalización y el uso total para optimizar los costos.
- **Análisis de uso de modelos**: haga un seguimiento de qué modelos se están llamando, su frecuencia y sus características de rendimiento.

El [panel de información operativa de Agent Observability][6] listo para usar proporciona vistas consolidadas de métricas a nivel de traza y de tramo, tasas de error, desgloses de latencia, tendencias de consumo de tokens y monitores activados.

### Depuración y resolución de problemas en producción {#production-debugging-and-troubleshooting}

Depure flujos de trabajo complejos de LLM con visibilidad detallada de la ejecución:

{{< img src="llm_observability/index/llm_trace_light.png" alt="Vista detallada de una traza en Agent Observability, que presenta un gráfico de llama que representa visualmente cada llamada de servicio. Se selecciona 'OpenAI.createResponse' y se muestra una vista detallada del tramo, incluidos los mensajes de entrada y los mensajes de salida." style="width:100%">}}

- **Análisis de trazas de extremo a extremo**: visualice flujos de solicitudes completos desde la entrada del usuario hasta las llamadas al modelo, llamadas a herramientas y generación de respuestas.
- **Depuración a nivel de tramo**: examine operaciones individuales dentro de las cadenas, incluidos los pasos de preprocesamiento, las llamadas al modelo y la lógica de posprocesamiento.
- **Identificación de la causa raíz de los errores**: identifique los puntos de falla en cadenas de varios pasos, flujos de trabajo u operaciones agénticas con contexto de error detallado e información de tiempo.
- **Identificación de cuellos de botella en el rendimiento**: encuentre operaciones lentas y optimice según los desgloses de latencia en los componentes del flujo de trabajo.

### Evaluaciones de calidad y seguridad {#quality-and-safety-evaluations}

{{< img src="llm_observability/index/llm_example_eval_light.png" alt="Vista detallada de un tramo en Agent Observability, pestaña Evaluations. Muestra una evaluación de alucinación con 'Contradicción confirmada', la salida marcada, la cita de contexto y una explicación de por qué se marcó." style="width:100%">}}

Asegúrese de que sus agentes o aplicaciones LLM cumplan con los estándares de calidad con evaluaciones en línea. Para obtener información completa sobre las evaluaciones alojadas y gestionadas por Datadog, la ingesta de evaluaciones personalizadas y las capacidades de monitoreo de seguridad, consulte la [documentación de Evaluations][5].

### Consulte las trazas y tramos de su aplicación LLM {#query-your-llm-applications-traces-and-spans}

{{< img src="llm_observability/index/llm_query_example_light.png" alt="Agent Observability > Traces view, donde el usuario ha ingresado la consulta `ml_app:shopist-chat-v2 'purchase' -'discount' @trace.total_tokens:>=20` y se muestran varias trazas." style="width:100%">}}

Aprenda a utilizar la interfaz de consulta de Agent Observability para buscar, filtrar y analizar trazas y tramos generados por sus aplicaciones LLM. La [documentación de Querying][1] cubre cómo:

- Utilice la barra de búsqueda para filtrar trazas y tramos por atributos como modelo, usuario o estado de error.
- Aplique filtros avanzados para centrarse en operaciones o marcos temporales específicos de LLM.
- Visualice e inspeccione los detalles de las trazas para solucionar problemas y optimizar sus flujos de trabajo de LLM.

Esto le permite identificar rápidamente problemas, hacer un seguimiento del rendimiento y obtener información sobre el comportamiento de su aplicación LLM en producción.


### Correlacione APM y Agent Observability {#correlate-apm-and-agent-observability}

{{< img src="llm_observability/index/llm_apm_example_light.png" alt="Una traza en Datadog APM. La pestaña Overview muestra una sección titulada LLM Observability, con un enlace para ver el tramo en Agent Observability, así como el texto de entrada y salida." style="width:100%">}}

Para aplicaciones instrumentadas con Datadog APM, puede [correlacionar APM y Agent Observability][2] a través del SDK. La correlación de APM con Agent Observability proporciona visibilidad completa de extremo a extremo y un análisis exhaustivo, desde problemas de la aplicación hasta causas raíz específicas de LLM.

### Patrones {#patterns}

{{< img src="llm_observability/Patterns.png" alt="La página Patterns muestra temas jerárquicos junto con puntuaciones y volúmenes. También se muestran tres KPI, que indican el número de interacciones agrupadas, el número de temas identificados y la proporción de interacciones agrupadas en porcentaje." style="width:100%">}}

[Patterns][3] agrupa automáticamente el tráfico de producción de su aplicación de LLM en temas jerárquicos, lo que le ayuda a comprender lo que preguntan los usuarios, identificar brechas de cobertura en sus conjuntos de datos de evaluación y diagnosticar modos de falla.

### Haga un seguimiento de sus sistemas agénticos {#monitor-your-agentic-sytems}

Aprenda a hacer un seguimiento de aplicaciones de LLM agénticas, que utilizan múltiples herramientas o cadenas de razonamiento, con [Agent Monitoring][4] de Datadog. Esta función le ayuda a realizar un seguimiento de las acciones de los agentes, el uso de herramientas y los pasos de razonamiento, proporcionando visibilidad sobre flujos de trabajo de LLM complejos y permitiéndole solucionar problemas y optimizar sistemas agénticos de manera efectiva. Consulte la [documentación de Agent Monitoring][4] para obtener más detalles.

### Gestión de prompts {#prompt-management}

[Prompt Management][7] proporciona un registro centralizado para los prompts utilizados por sus aplicaciones de LLM. Cree y versione prompts en Datadog, a través del SDK de Python o a través de la API, y luego recupérelos en tiempo de ejecución con el SDK. Esto desacopla la iteración de prompts del ciclo de implementación de su aplicación. Consulte la [documentación de Prompt Management][7] para obtener más detalles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/investigate/querying
[2]: /es/llm_observability/instrument/agent_observability_and_apm
[3]: /es/llm_observability/investigate/patterns/
[4]: /es/llm_observability/guide/agent_monitoring
[5]: /es/llm_observability/investigate/evaluations/
[6]: https://app.datadoghq.com/dash/integration/llm_operational_insights?fromUser=false&refresh_mode=sliding&from_ts=1758905575629&to_ts=1758909175629&live=true
[7]: /es/llm_observability/configure/prompt_management