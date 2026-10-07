---
aliases:
- /es/tracing/llm_observability/
description: Descripción general de Agent Observability, una plataforma para hacer
  un seguimiento, solucionar problemas y mejorar aplicaciones de LLM y agentes de
  IA.
further_reading:
- link: https://www.datadoghq.com/pricing/?product=llm-observability#products
  tag: Precios
  text: Precios de Agent Observability
- link: /llm_observability/data_governance/
  tag: Documentación
  text: Aprenda cuánto tiempo Agent Observability conserva sus datos
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: Centro de aprendizaje
  text: Seguimiento de aplicaciones de LLM
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con LLM Observability
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Evalúe, optimice y asegure su pila de IA de Google Cloud con Datadog
- link: https://www.datadoghq.com/blog/offline-llm-evaluations/
  tag: Blog
  text: 'Evaluación offline para agentes de IA: mejores prácticas'
- link: https://www.datadoghq.com/blog/engineering/bits-ai-eval-platform/
  tag: Blog
  text: Cómo construimos una plataforma de evaluación del mundo real para agentes
    SRE autónomos a escala
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-dashboards
  tag: Blog
  text: Construcción de agentes de dashboard confiables con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Impulsar el ROI de la IA: cómo Datadog conecta el costo, el rendimiento y
    la infraestructura para que usted pueda escalar de manera responsable'
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability admite de forma nativa las convenciones semánticas
    de GenAI de OpenTelemetry
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenga visibilidad de los flujos de trabajo de los agentes de Strands con
    Datadog LLM Observability
- link: https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/
  tag: Blog
  text: Haga un seguimiento de sus aplicaciones de Anthropic con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/
  tag: Blog
  text: Mejores prácticas para hacer un seguimiento de los ataques de inyección de
    prompts en LLM para proteger datos confidenciales.
- link: https://www.datadoghq.com/blog/vllm-integration/
  tag: Blog
  text: Optimice el rendimiento de las aplicaciones de LLM con la integración de vLLM
    de Datadog
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimice y solucione problemas de infraestructura de IA con Datadog GPU Monitoring
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: Blog
  text: Haga un seguimiento de los agentes creados en Amazon Bedrock con Datadog LLM
    Observability
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: Blog
  text: Identifique riesgos de seguridad comunes en servidores MCP
- link: https://www.datadoghq.com/blog/detect-abuse-ai-infrastructure/
  tag: Blog
  text: 'Abuso de la infraestructura de IA: cómo las credenciales y los recursos mal
    administrados exponen las aplicaciones de LLM'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: Blog
  text: Cómo redujimos nuestro tiempo de depuración de agentes NLQ de horas a minutos
    con LLM Observability
title: Agent Observability
---
{{< learning-center-callout header="Pruebe Getting Started with Agent Observability en el Learning Center" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/llm-obs-getting-started">}}
  Aprenda a hacer un seguimiento del rendimiento, los costos, las trazas, el uso de tokens y los errores de su aplicación de LLM para identificar y resolver problemas.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Con Agent Observability, puede hacer un seguimiento, solucionar problemas y evaluar sus aplicaciones basadas en LLM, como los chatbots. Puede investigar la causa raíz de los problemas, hacer un seguimiento del rendimiento operativo y evaluar la calidad, la privacidad y la seguridad de sus aplicaciones de LLM.

Cada solicitud completada por su aplicación se representa como una traza en la página [**Agent Observability**][1] en Datadog.

{{< img src="llm_observability/traces.png" alt="Una lista de trazas de pares de prompt-respuesta en la página de Agent Observability" style="width:100%;" >}}

Una traza puede representar:

- Una inferencia de LLM individual, incluidos tokens, información de errores y latencia
- Un flujo de trabajo de LLM predeterminado, que es una agrupación de llamadas de LLM y sus operaciones contextuales, como llamadas a herramientas o pasos de preprocesamiento
- Un flujo de trabajo de LLM dinámico ejecutado por un agente de LLM

Cada traza contiene tramos que representan cada elección realizada por un agente o cada paso de un flujo de trabajo determinado. Una traza determinada también puede incluir entradas y salidas, latencia, problemas de privacidad, errores y más. Para obtener más información, consulte [Términos y conceptos][2].

## Solucione problemas con el rastreo de extremo a extremo {#troubleshoot-with-end-to-end-tracing}

Visualice cada paso de las cadenas y llamadas de su aplicación de LLM para localizar solicitudes problemáticas e identificar la causa raíz de los errores.

{{< img src="llm_observability/errors.png" alt="Errores que ocurrieron en una traza en la pestaña Errores en un panel lateral de traza" style="width:100%;" >}}

## Haga un seguimiento de las métricas operativas y optimice los costos {#monitor-operational-metrics-and-optimize-cost}

Haga un seguimiento del costo, la latencia, el rendimiento y las tendencias de uso de todas sus aplicaciones de LLM con [paneles integrados][7].

{{< img src="llm_observability/dashboard_1.png" alt="El panel de Perspectivas Operativas de Agent Observability integrado en Datadog" style="width:100%;" >}}

## Evalúe la calidad y eficacia de sus aplicaciones de LLM {#evaluate-the-quality-and-effectiveness-of-your-llm-applications}

Comprenda lo que los usuarios le piden a su aplicación de LLM, identifique brechas de cobertura y haga un seguimiento de la calidad de las respuestas a lo largo del tiempo con [Patrones][10]: una agrupación jerárquica automatizada de temas de su tráfico de producción.

{{< img src="llm_observability/patterns_topic_details.png" alt="La vista de detalles del tema que muestra un resumen del tema, el recuento total de interacciones y una tabla de interacciones con la etiqueta del tema secundario, el texto de entrada y la marca de tiempo." style="width:100%;" >}}

## Proteja los datos confidenciales e identifique a los usuarios malintencionados {#safeguard-sensitive-data-and-identify-malicious-users}

Escanee y redacte automáticamente cualquier dato confidencial en sus aplicaciones de IA e identifique inyecciones de prompts, entre otras evaluaciones.

{{< img src="llm_observability/prompt_injection.png" alt="Un ejemplo de un intento de inyección de prompt detectado por Agent Observability" style="width:100%;" >}}

## Visualice las anomalías resaltadas como perspectivas {#see-anomalies-highlighted-as-insights}

Agent Observability Insights proporciona una experiencia para hacer un seguimiento que ayuda a los usuarios a identificar anomalías en sus métricas operativas (como la duración y la tasa de error) y en sus [evaluaciones integradas (OOTB)][9].

La detección de valores anómalos se realiza a través de dimensiones clave:
- Nombre del tramo
- Tipo de flujo de trabajo
- [Temas de entrada/salida de patrones][10]

Estos valores anómalos se analizan durante la última semana y se muestran automáticamente en la ventana de tiempo correspondiente seleccionada por el usuario. Esto permite a los equipos detectar de forma proactiva regresiones, desviaciones de rendimiento o comportamientos inesperados en sus aplicaciones de LLM.

{{< img src="llm_observability/Overview_LLMO.png" alt="Un banner de 'Insights' en la parte superior de la página de Agent Observability Monitor. El banner muestra 8 insights y tiene un botón \"View Insights\" que conduce a un panel lateral con más detalles." style="width:100%;" >}}

## Utilice integraciones con Agent Observability {#use-integrations-with-agent-observability}

El [SDK de Agent Observability para Python][3] se integra con marcos de trabajo como OpenAI, LangChain, AWS Bedrock y Anthropic. Rastrea y anota automáticamente las llamadas a LLM, capturando métricas de latencia, errores y uso de tokens, sin cambios en el código.

<div class="alert alert-info">Datadog ofrece una variedad de capacidades de inteligencia artificial (IA) y aprendizaje automático (ML). Las <a href="/integrations/#cat-aiml">Integrations de IA/ML en la página de Integrations y el Datadog Marketplace</a> son funcionalidades de Datadog para toda la plataforma. <br><br> Por ejemplo, APM ofrece una integración nativa con OpenAI para hacer un seguimiento de su uso de OpenAI, mientras que Infrastructure Monitoring ofrece una integración con NVIDIA DCGM Exporter para hacer un seguimiento de cargas de trabajo de IA con uso intensivo de cómputo. Estas integraciones son diferentes de la oferta de Agent Observability.</div>

Para obtener más información, consulte la [documentación de instrumentación automática][8].

## Precios {#pricing}

Agent Observability se mide y factura según la cantidad de tramos de LLM ingeridos. Un tramo de LLM representa una única solicitud a un proveedor de LLM, por lo que un flujo de trabajo de agente puede producir varios tramos de LLM. Para conocer las tarifas, consulte la [página de precios de Agent Observability][11].

## ¿Listo para comenzar? {#ready-to-start}

Consulte la [documentación de configuración][5] para obtener instrucciones sobre cómo instrumentar su aplicación de LLM o siga la [guía para rastrear una aplicación de LLM][6] para generar una traza utilizando el [SDK de Agent Observability para Python][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /es/llm_observability/quickstart/terms
[3]: /es/llm_observability/setup/sdk
[4]: /es/llm_observability/setup/api
[5]: /es/llm_observability/setup
[6]: /es/llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /es/llm_observability/setup/auto_instrumentation
[9]: /es/llm_observability/investigate/evaluations/managed_evaluations
[10]: /es/llm_observability/investigate/patterns
[11]: https://www.datadoghq.com/pricing/?product=llm-observability#products