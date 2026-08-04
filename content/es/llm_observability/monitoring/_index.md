---
description: Cómo explorar más de su aplicación en Agent Observability.
further_reading:
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con Agent Observability
title: Monitoreo
---
## Resumen {#overview}

Explore y analice sus aplicaciones LLM en producción con herramientas para consultar, visualizar, correlacionar e investigar datos a través de trazas, clústeres y otros recursos.

Monitoree el rendimiento, depure problemas, evalúe la calidad y asegure sus sistemas basados en LLM con visibilidad unificada a través de trazas, métricas y evaluaciones en línea.

### Monitoreo de rendimiento en tiempo real {#real-time-performance-monitoring}

Monitoree la salud operativa de su aplicación LLM con métricas y paneles integrados:

{{< img src="llm_observability/index/llm_dashboard_light.png" alt="Panel de información operativa de Agent Observability, que muestra varias métricas y visualizaciones. Incluye una sección de Resumen con el número total de trazas y tramos, tasas de éxito y error, etc.; y una sección de Llamadas LLM con un gráfico de anillo del uso del modelo, promedio de tokens de entrada y salida por llamada, etc." style="width:100%">}}

- **Volumen de solicitudes y latencia**: Rastree las solicitudes por segundo, los tiempos de respuesta y los cuellos de botella de rendimiento en diferentes modelos, operaciones y puntos finales.
- **Seguimiento de errores**: Monitoree errores HTTP, tiempos de espera del modelo y solicitudes fallidas con contexto de error detallado.
- **Consumo de tokens**: Rastree tokens de prompt, tokens en caché, tokens de finalización y el uso total para optimizar costos.
- **Análisis de uso del modelo**: Monitoree qué modelos se están llamando, su frecuencia y sus características de rendimiento.

El [panel de información operativa de Agent Observability][6] listo para usar proporciona vistas consolidadas de métricas a nivel de traza y de tramo, tasas de error, desgloses de latencia, tendencias de consumo de tokens y monitores activados.

### Depuración y resolución de problemas en producción {#production-debugging-and-troubleshooting}

Depure flujos de trabajo LLM complejos con visibilidad detallada de la ejecución:

{{< img src="llm_observability/index/llm_trace_light.png" alt="Vista detallada de una traza en Agent Observability, que presenta un gráfico de llama que representa visualmente cada llamada de servicio. 'OpenAI.createResponse' está seleccionado y se muestra una vista detallada del tramo, incluyendo mensajes de entrada y mensajes de salida." style="width:100%">}}

- **Análisis de trazas de extremo a extremo**: Visualice flujos de solicitud completos desde la entrada del usuario hasta las llamadas al modelo, llamadas a herramientas y generación de respuestas.
- **Depuración a nivel de tramo**: Examine operaciones individuales dentro de cadenas, incluyendo pasos de preprocesamiento, llamadas al modelo y lógica de posprocesamiento.
- **Identifique la causa raíz de los errores**: Localice puntos de falla en cadenas de varios pasos, flujos de trabajo u operaciones de agentes con contexto de error detallado e información de tiempo.
- **Identificación de cuellos de botella de rendimiento**: Encuentre operaciones lentas y optimice basándose en desgloses de latencia a través de los componentes del flujo de trabajo.

### Evaluaciones de calidad y seguridad {#quality-and-safety-evaluations}

{{< img src="llm_observability/index/llm_example_eval_light.png" alt="Vista detallada de un tramo en Agent Observability, pestaña Evaluaciones. Muestra una evaluación de alucinación con 'Contradicción confirmada', la salida marcada, la cita de contexto y una explicación de por qué se marcó esto." style="width:100%">}}

Asegúrese de que sus Agents o aplicaciones de LLM cumplan con los estándares de calidad con evaluaciones en línea. Para obtener información completa sobre las evaluaciones alojadas y administradas por Datadog, la ingesta de evaluaciones personalizadas y las capacidades de monitoreo de seguridad, consulte la [documentación de Evaluaciones][5].

### Consulte las trazas y tramos de su aplicación de LLM {#query-your-llm-applications-traces-and-spans}

{{< img src="llm_observability/index/llm_query_example_light.png" alt="Agent Observability > Trazas, donde el usuario ha ingresado la consulta `ml_app:shopist-chat-v2 'purchase' -'discount' @trace.total_tokens:>=20` y se muestran varias trazas." style="width:100%">}}

Aprenda a utilizar la interfaz de consulta de Agent Observability para buscar, filtrar y analizar las trazas y tramos generados por sus aplicaciones de LLM. La [documentación de consultas][1] cubre cómo:

- Utilice la barra de búsqueda para filtrar trazas y tramos por atributos como modelo, usuario o estado de error.
- Aplique filtros avanzados para enfocarse en operaciones o marcos de tiempo específicos de LLM.
- Visualice e inspeccione los detalles de las trazas para solucionar problemas y optimizar sus flujos de trabajo de LLM.

Esto le permite identificar rápidamente problemas, monitorear el rendimiento y obtener información sobre el comportamiento de su aplicación de LLM en producción.


### Correlacionar APM y Agent Observability {#correlate-apm-and-agent-observability}

{{< img src="llm_observability/index/llm_apm_example_light.png" alt="Una traza en Datadog APM. La pestaña Descripción general muestra una sección titulada \"LLM Observability\", con un enlace para ver el tramo en Agent Observability, así como el texto de entrada y salida." style="width:100%">}}

Para aplicaciones instrumentadas con Datadog APM, puede [correlacionar APM y Agent Observability][2] a través del SDK. Correlacionar APM con Agent Observability brinda visibilidad completa de extremo a extremo y un análisis exhaustivo, desde problemas de la aplicación hasta causas raíz específicas de LLM.

### Patrones {#patterns}

{{< img src="llm_observability/Patterns.png" alt="La página de Patrones muestra temas jerárquicos junto con puntuaciones y volúmenes. También son visibles tres KPI, que muestran la cantidad de interacciones agrupadas, la cantidad de temas identificados y la proporción de interacciones agrupadas en porcentaje." style="width:100%">}}

[Patrones][3] agrupa automáticamente el tráfico de producción de su aplicación de LLM en temas jerárquicos, lo que le ayuda a comprender lo que preguntan los usuarios, identificar brechas de cobertura en sus conjuntos de datos de evaluación y diagnosticar modos de falla.

### Monitoree sus Agent systems {#monitor-your-agentic-sytems}

Aprenda a monitorear aplicaciones LLM de Agent, que utilizan múltiples herramientas o cadenas de razonamiento, con el [Agent Monitoring][4] de Datadog. Esta función le ayuda a realizar un seguimiento de las Agent actions, el uso de herramientas y los pasos de razonamiento, proporcionando visibilidad sobre flujos de trabajo complejos de LLM y permitiéndole solucionar problemas y optimizar los Agent systems de manera efectiva. Consulte la [documentación de monitoreo de Agent][4] para obtener más detalles.

### Gestión de prompts {#prompt-management}

[Gestión de prompts][7] proporciona un registro centralizado para los prompts utilizados por sus aplicaciones de LLM. Cree y gestione versiones de prompts en Datadog, a través del SDK de Python o a través de la API, y luego recupérelos en tiempo de ejecución con el SDK. Esto desacopla la iteración de prompts del ciclo de implementación de su aplicación. Consulte la [documentación de gestión de prompts][7] para obtener más detalles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/monitoring/querying
[2]: /es/llm_observability/monitoring/llm_observability_and_apm
[3]: /es/llm_observability/monitoring/patterns/
[4]: /es/llm_observability/monitoring/agent_monitoring
[5]: /es/llm_observability/evaluations/
[6]: https://app.datadoghq.com/dash/integration/llm_operational_insights?fromUser=false&refresh_mode=sliding&from_ts=1758905575629&to_ts=1758909175629&live=true
[7]: /es/llm_observability/monitoring/prompt_management