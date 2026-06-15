---
aliases:
- /es/tracing/llm_observability/
further_reading:
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-dashboards
  tag: Blog
  text: Construyendo agentes de tableros confiables con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Impulsando el ROI de IA: Cómo Datadog conecta costo, rendimiento e infraestructura
    para que puedas escalar de manera responsable'
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability soporta nativamente las Convenciones Semánticas
    de OpenTelemetry GenAI
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtén visibilidad en los flujos de trabajo de los agentes de Strands con Datadog
    LLM Observability
- link: https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/
  tag: Blog
  text: Monitorea tus aplicaciones de Anthropic con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/
  tag: Blog
  text: Mejores prácticas para monitorear ataques de inyección de prompts de LLM para
    proteger datos sensibles
- link: https://www.datadoghq.com/blog/vllm-integration/
  tag: Blog
  text: Optimiza el rendimiento de la aplicación LLM con la integración vLLM de Datadog
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimiza y soluciona problemas de infraestructura de IA con Datadog GPU Monitoring
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: Blog
  text: Monitorea agentes construidos sobre Amazon Bedrock con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: Blog
  text: Identifica riesgos de seguridad comunes en servidores MCP
- link: https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/
  tag: Blog
  text: 'Uso indebido de la infraestructura de IA: Cómo las credenciales y los recursos
    mal gestionados exponen las aplicaciones LLM'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: Blog
  text: Cómo redujimos nuestro tiempo de depuración del agente NLQ de horas a minutos
    con LLM Observability
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: Centro de Aprendizaje
  text: Rastreo de aplicaciones LLM
title: LLM Observability
---
{{< learning-center-callout header="Intenta comenzar con LLM Observability en el Centro de Aprendizaje" btn_title="Inscríbete Ahora" btn_url="https://learn.datadoghq.com/courses/llm-obs-getting-started">}}
  Aprende a monitorear el rendimiento, costos, trazas, uso de tokens y errores de tu aplicación LLM para identificar y resolver problemas.
{{< /learning-center-callout >}}

## Resumen {#overview}

Con LLM Observability, puedes monitorear, solucionar problemas y evaluar tus aplicaciones impulsadas por LLM, como chatbots. Puedes investigar la causa raíz de los problemas, monitorear el rendimiento operativo y evaluar la calidad, privacidad y seguridad de tus aplicaciones LLM.

Cada solicitud cumplida por tu aplicación se representa como una traza en la página de [**LLM Observability**][1] en Datadog.

{{< img src="llm_observability/traces.png" alt="Una lista de trazas de pares de solicitud-respuesta en la página de LLM Observability." style="width:100%;" >}}

Una traza puede representar:

- Una inferencia individual de LLM, incluyendo tokens, información de errores y latencia.
- Un flujo de trabajo de LLM predeterminado, que es un agrupamiento de llamadas de LLM y sus operaciones contextuales, como llamadas a herramientas o pasos de preprocesamiento.
- Un flujo de trabajo dinámico de LLM ejecutado por un agente de LLM.

Cada traza contiene tramos que representan cada elección hecha por un agente o cada paso de un flujo de trabajo dado. Una traza dada también puede incluir entrada y salida, latencia, problemas de privacidad, errores y más. Para más información, consulta [Términos y Conceptos][2].

## Soluciona problemas con trazado de extremo a extremo {#troubleshoot-with-end-to-end-tracing}

Visualiza cada paso de las cadenas y llamadas de tu aplicación LLM para detectar solicitudes problemáticas y encontrar la causa raíz de los errores.

{{< img src="llm_observability/errors.png" alt="Errores que se producen en una traza, visibles en la pestaña de Errores del panel lateral." style="width:100%;" >}}

## Monitorea métricas operativas y optimiza costos {#monitor-operational-metrics-and-optimize-cost}

Monitorea el costo, la latencia, el rendimiento y las tendencias de uso de todas tus aplicaciones LLM con [tableros listos para usar][7].

{{< img src="llm_observability/dashboard_1.png" alt="El tablero de Insights Operacionales de LLM Observability listo para usar en Datadog." style="width:100%;" >}}

## Evalúa la calidad y efectividad de tus aplicaciones LLM {#evaluate-the-quality-and-effectiveness-of-your-llm-applications}

Entiende lo que los usuarios están preguntando a tu aplicación LLM, identifica brechas de cobertura y monitorea la calidad de las respuestas a lo largo del tiempo con [Patrones][10] — agrupamiento jerárquico automatizado de temas de tu tráfico de producción.

{{< img src="llm_observability/topic-detail.png" alt="Visualización de detalle del tema que muestra un gráfico de dispersión de incrustaciones de interacción junto a una tabla de interacciones con etiquetas de tema y puntaje de confianza." style="width:100%;" >}}

## Protege los datos sensibles e identifica a los usuarios maliciosos {#safeguard-sensitive-data-and-identify-malicious-users}

Escanea y redacta automáticamente cualquier dato sensible en tus aplicaciones de IA e identifica inyecciones de prompts, entre otras evaluaciones.

{{< img src="llm_observability/prompt_injection.png" alt="Un ejemplo de un intento de inyección de prompts detectado por LLM Observability" style="width:100%;" >}}

## Ve las anomalías resaltadas como Insights {#see-anomalies-highlighted-as-insights}

LLM Observability Insights proporciona una experiencia de monitoreo que ayuda a los usuarios a identificar anomalías en sus métricas operativas, como la duración y la tasa de errores, y sus [evaluaciones listas para usar (OOTB)][9].

La detección de valores anómalos se realiza en dimensiones clave:
- Nombre del tramo
- Tipo de flujo de trabajo
- [Temas de entrada/salida de patrones][10]

Estos valores anómalos se analizan durante la semana pasada y se muestran automáticamente en la ventana de tiempo correspondiente seleccionada por el usuario. Esto permite a los equipos detectar proactivamente regresiones, desviaciones de rendimiento o comportamientos inesperados en sus aplicaciones LLM.

{{< img src="llm_observability/Overview_LLMO.png" alt="Un banner de 'Insights' en la parte superior de la página de LLM Observability Monitor. El banner muestra 8 Insights y tiene un botón de Ver Insights que conduce a un panel lateral con más detalles." style="width:100%;" >}}

## Utiliza integraciones con LLM Observability {#use-integrations-with-llm-observability}

El [SDK de LLM Observability para Python][3] se integra con marcos como OpenAI, LangChain, AWS Bedrock y Anthropic. Rastrea y anota automáticamente las llamadas a LLM, capturando latencia, errores y métricas de uso de tokens, sin cambios en el código.

<div class="alert alert-info">Datadog ofrece una variedad de capacidades de inteligencia artificial (IA) y aprendizaje automático (ML). Las <a href="/integrations/#cat-aiml">integraciones de IA/ML en la página de Integraciones y el Datadog Marketplace</a> son funcionalidades de Datadog a nivel de plataforma. <br><br> Por ejemplo, APM ofrece una integración nativa con OpenAI para monitorear tu uso de OpenAI, mientras que Infrastructure Monitoring ofrece una integración con NVIDIA DCGM Exporter para monitorear cargas de trabajo de IA intensivas en computación. Estas integraciones son diferentes de la oferta de LLM Observability.</div>

Para más información, consulte la [documentación de auto instrumentación][8].

## ¿Listo para comenzar? {#ready-to-start}

Consulta la [documentación de configuración][5] para obtener instrucciones sobre cómo instrumentar tu aplicación LLM o sigue la [guía para trazar una aplicación LLM][6] para generar una traza utilizando el [SDK de Observabilidad LLM para Python][3].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /es/llm_observability/terms
[3]: /es/llm_observability/setup/sdk
[4]: /es/llm_observability/setup/api
[5]: /es/llm_observability/setup
[6]: /es/llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /es/llm_observability/setup/auto_instrumentation
[9]: /es/llm_observability/evaluations/managed_evaluations
[10]: /es/llm_observability/monitoring/patterns