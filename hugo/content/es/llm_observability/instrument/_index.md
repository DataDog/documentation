---
aliases:
- /es/llm_observability/instrumentation/
description: Descripción general de las opciones de instrumentación para Agent Observability,
  incluidos los enfoques basados en SDK y API para Python, Node.js y Java.
further_reading:
- link: /llm_observability/auto_instrumentation
  tag: Instrumentación automática
  text: Comience rápidamente con la instrumentación automática
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability admite de forma nativa las convenciones semánticas
    de GenAI de OpenTelemetry
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: Centro de aprendizaje
  text: Introducción a Agent Observability
title: Instrumentación de Agent Observability
---
Para comenzar con Agent Observability, instrumente su aplicación o agente(s) de LLM eligiendo entre varios enfoques según su lenguaje de programación y configuración. Datadog ofrece opciones de instrumentación integrales diseñadas para capturar trazas, métricas y evaluaciones detalladas de sus aplicaciones LLM y agentes con cambios mínimos en el código.

## Opciones de instrumentación {#instrumentation-options}
Puede instrumentar su aplicación con los SDK de Python, Node.js o Java, o mediante el uso de la API de Agent Observability.

### Instrumentación basada en SDK (recomendado) {#sdk-based-instrumentation-recommended}
Datadog proporciona SDK nativos que ofrecen las funciones de Agent Observability más completas:
| Lenguaje | SDK disponible | Instrumentación automática | Instrumentación personalizada |
| -------- | ------------- | -------------------- | ---------------------- |
| Python | Python 3.7+ | {{< X >}} | {{< X >}} |
| Node.js | Node.js 16+ | {{< X >}} | {{< X >}} |
| Java | Java 8+ | {{< X >}} | {{< X >}} |


Para instrumentar una aplicación de LLM con el SDK:
1. Instale el SDK de Agent Observability
2. Configure el SDK proporcionando [las variables de entorno requeridas][6] en el comando de inicio de su aplicación, o mediante programación [en el código][7]. Asegúrese de haber configurado su clave de Datadog API, su sitio de Datadog y el nombre de la aplicación de aprendizaje automático (ML).

#### Auto-instrumentación {#auto-instrumentation}
La auto-instrumentación captura las llamadas a LLM para aplicaciones de Python, Node.js y Java sin requerir cambios en el código. Le permite obtener trazas y observabilidad listas para usar en frameworks y proveedores populares. Para obtener detalles adicionales y una lista completa de los frameworks y proveedores compatibles, consulte la [Documentación de auto-instrumentación][1].

La auto-instrumentación captura automáticamente:
- Prompts de entrada y completaciones de salida
- Uso de tokens y costos
- Latencia e información de errores
- Parámetros del modelo (temperatura, max_tokens, etc.)
- Metadatos específicos del framework

<div class="alert alert-info">Al utilizar frameworks compatibles, no se requiere la creación manual de tramos para las llamadas a LLM. El SDK crea automáticamente los tramos adecuados con metadatos enriquecidos.</div>

#### Instrumentación personalizada {#custom-instrumentation}
Todos los SDK compatibles ofrecen capacidades avanzadas para la instrumentación personalizada de sus aplicaciones LLM además de la auto-instrumentación, incluyendo:
- Creación manual de tramos mediante decoradores de funciones o administradores de contexto
- Rastreo de flujos de trabajo complejos para aplicaciones LLM de varios pasos
- Monitoreo de Agent para LLM Agents autónomos
- Evaluaciones personalizadas y mediciones de calidad
- Seguimiento de sesiones para interacciones de usuario

Para obtener más información, consulte la [Documentación de referencia del SDK][2].

### Instrumentación de la API HTTP {#http-api-instrumentation}
Si su lenguaje no es compatible con los SDK o está utilizando integraciones personalizadas, puede instrumentar su aplicación utilizando la API HTTP de Datadog.

La API le permite:
- Enviar tramos directamente a través de endpoints HTTP
- Enviar evaluaciones personalizadas asociadas con tramos
- Incluir jerarquías de trazas completas para aplicaciones complejas
- Anotar tramos con entradas, salidas, metadatos y métricas

Endpoints de la API:
- [API de tramos][4]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`
- [API de evaluaciones][5]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

Para obtener más información, consulte la [Documentación de la API HTTP][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/llm_observability/auto_instrumentation
[2]: /es/llm_observability/instrument/sdk
[3]: /es/llm_observability/setup/api
[4]: /es/llm_observability/instrument/api/?tab=model#spans-api
[5]: /es/llm_observability/instrument/api/?tab=model#evaluations-api
[6]: /es/llm_observability/instrument/sdk#command-line-setup
[7]: /es/llm_observability/instrument/sdk#in-code-setup