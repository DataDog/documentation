---
aliases:
- /es/tracing/llm_observability/
further_reading:
- link: https://www.datadoghq.com/blog/anthropic-integration-datadog-llm-observability/
  tag: Blog
  text: Monitorizar tus aplicaciones de Anthropic con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/monitor-llm-prompt-injection-attacks/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de ataques de inyección de prompt
    en LLM para proteger datos confidenciales
- link: https://www.datadoghq.com/blog/vllm-integration/
  tag: Blog
  text: Optimizar el rendimiento de las aplicaciones de LLM con la integración de
    vLLM de Datadog
title: Observabilidad de LLM
---

## Resumen

Con LLM Observability, puedes monitorizar, solucionar problemas y evaluar tus aplicaciones impulsadas por LLM, como los chatbots. Puedes investigar la causa raíz de los problemas, monitorizar el rendimiento operativo y evaluar la calidad, privacidad y seguridad de tus aplicaciones de LLM. 

Cada solicitud realizada por tu aplicación se representa como una traza (trace) en la [**página de LLM Observability**][1] en Datadog.

{{< img src="llm_observability/traces.png" alt="Una lista de trazas de pares prompt-respuesta en la página de LLM Observability" style="width:100%;" >}}

Un traza puede representar:

- Una inferencia de LLM individual, incluyendo tokens, información de error y latencia.
- Un flujo de trabajo de LLM predeterminado, que es una agrupación de llamadas de LLM y sus operaciones contextuales, como llamadas a herramientas o pasos de preprocesamiento
- Un flujo de trabajo de LLM dinámico ejecutado por un Agent de LLM

Cada traza contiene tramos (spans) que representan cada elección realizada por un Agent o cada paso de un flujo de trabajo dado. Una traza dada también puede incluir entrada y salida, latencia, problemas de privacidad, errores, etc. Para más información, consulta [Términos y conceptos][2].

## Solucionar problemas con el rastreo de extremo a extremo

Visualiza cada paso de las cadenas y llamadas de tu aplicación de LLM para localizar las solicitudes problemáticas e identificar la causa raíz de los errores.

{{< img src="llm_observability/errors.png" alt="Errores que suceden en una traza de la pestaña Errores en el panel lateral de una traza" style="width:100%;" >}}

## Monitorizar métricas operativas y optimización de costes

Monitoriza el coste, la latencia, el rendimiento y las tendencias de uso de todas tus aplicaciones de LLM con [dashboards predefinidos][7].

{{< img src="llm_observability/dashboard_1.png" alt="El dashboard predefinido de Información operativa de LLM Observability en Datadog" style="width:100%;" >}}

## Evaluar la calidad y eficacia de tus aplicaciones de LLM

Identifica los clústeres problemáticas y monitoriza la calidad de las respuestas a lo largo del tiempo con agrupaciones temáticas y checks como sentimiento, falta de respuesta, etc.

{{< img src="llm_observability/cluster_map/box.png" alt="El diseño en casillas muestra clústeres de trazas representadas por círculos de colores e incluye un panel que enumera los clústeres por temas, recuento de trazas y tasas de error." style="width:100%;" >}}

## Salvaguardar los datos confidenciales e identificar a los usuarios malintencionados

Escanea y redacta automáticamente cualquier dato confidencial en tus aplicaciones de IA e identifica inyecciones de prompts, entre otras evaluaciones.

{{< img src="llm_observability/prompt_injection.png" alt="Un ejemplo de intento de inyección de prompt detectado por LLM Observability" style="width:100%;" >}}

## Utilizar integraciones con LLM Observability

El [SDK de LLM Observability para Python][3] se integra con marcos como OpenAI, LangChain, AWS Bedrock y Anthropic. Automáticamente rastrea y anota llamadas a LLM, capturando métricas de latencia, errores y uso de tokens, sin cambios en el código.

<div class="alert alert-info">Datadog ofrece diversas funciones de inteligencia artificial (IA) y Machine Learning (ML). Las integraciones de IA/ML en la página de integraciones y el Marketplace de Datadog son funcionalidades de toda la plataforma de Datadog. Por ejemplo, APM ofrece una integración nativa con OpenAI para la monitorización de tu uso de OpenAI, mientras que la Monitorización de infraestructura ofrece una integración con NVIDIA DCGM Exporter para monitorizar cargas de trabajo de IA de alto consumo de cómputo. Estas integraciones son diferentes de la oferta de LLM Observability.</div>

Para obtener más información, consulta la [documentación de Autoinstrumentación][8].

## ¿Estás listo para comenzar?

Consulta la [Documentación de configuración][5] para obtener instrucciones sobre cómo instrumentar tu aplicación de LLM o sigue la [Guía Rastrear una aplicación de LLM][6] para generar una traza utilizando el [SDK de LLM Observability para Python][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /es/llm_observability/terms
[3]: /es/llm_observability/setup/sdk
[4]: /es/llm_observability/setup/api
[5]: /es/llm_observability/setup
[6]: /es/llm_observability/quickstart
[7]: https://app.datadoghq.com/dash/integration/llm_operational_insights
[8]: /es/llm_observability/setup/auto_instrumentation