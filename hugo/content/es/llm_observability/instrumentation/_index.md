---
further_reading:
- link: /llm_observability/auto_instrumentation
  tag: Instrumentación automática
  text: Empezar rápidamente con la instrumentación automática
title: Instrumentación de LLM Observability
---


Para empezar con Datadog LLM Observability, instrumenta tus aplicaciones o agente(s) LLM eligiendo entre varias estrategias basadas en tu lenguaje de programación y configuración. Datadog proporciona opciones de instrumentación completas diseñadas para capturar trazas (traces), métricas y evaluaciones detalladas de tus aplicaciones y agentes LLM con cambios mínimos en el código.

## Opciones de instrumentación
Puedes instrumentar tu aplicación con los SDK de Python, Node.js o Java, o utilizando la API de LLM Observability.

### Instrumentación basada en SDK (recomendado)
Datadog proporciona SDK nativos que ofrecen las funciones de LLM Observability más completas:
| Lenguaje | SDK disponible | Instrumentación automática | Instrumentación personalizada | .
| -------- | ------------- | -------------------- | ---------------------- |
| Python | Python v3.7 o posterior {{< X >}} | {{< X >}} |
| Node.js | Node.js v16 o posterior {{< X >}} | {{< X >}} |
| Java | Java 8 o posterior {{< X >}} |


Para instrumentar una aplicación LLM con el SDK:
1. Instala el SDK de LLM Observability.
2. Configura el SDK proporcionando [las variables de entorno necesarias][6] en el comando de inicio de tu aplicación o [en el código][7] mediante programación. Asegúrate de haber configurado tu clave de API Datadog, el sitio Datadog y el nombre de la aplicación de machine learning (ML).

#### Instrumentación automática
La instrumentación automática captura llamadas LLM de aplicaciones Python y Node.js sin requerir cambios en el código. Te permite obtener trazas predefinidas y una observabilidad de marcos y proveedores populares. Para obtener más información y una lista completa de marcos y proveedores compatibles, consulta la documentación [Instrumentación automática][1].

La instrumentación automática captura automáticamente:
- Solicitudes de entradas y finalizaciones de salidas
- Uso y costes de los tokens
- Información sobre latencia y errores
- Parámetros del modelo (temperatura, max_tokens, etc.)
- Metadatos específicos del marco

<div class="alert alert-info">Cuando se utilizan marcos compatibles, no es necesario crear manualmente tramos (spans) para las llamadas LLM. El SDK crea automáticamente los tramos adecuados con metadatos enriquecidos.</div>

#### Instrumentación personalizada
Todos los SDK compatibles proporcionan capacidades avanzadas para la instrumentación personalizada de tus aplicaciones LLM, además de la instrumentación automática, incluyendo:
- Creación manual de tramos mediante decoradores de funciones o gestores de contextos
- Rastreo de flujos de trabajo complejos para aplicaciones LLM de varios pasos
- Monitorización de agentes para agentes LLM autónomos
- Evaluaciones personalizadas y mediciones de calidad
- Seguimiento de la sesión para ver interacciones de usuarios

Para obtener más información, consulta la [documentación de referencia del SDK][2].

### Instrumentación de la API HTTP
Si tu lenguaje no es compatible con los SDK o si utilizas integraciones personalizadas, puedes instrumentar tu aplicación utilizando la API HTTP de Datadog.

La API te permite:
- Enviar tramos directamente a través de endpoints HTTP
- Enviar evaluaciones personalizadas asociadas a tramos
- Incluir jerarquías completas de trazas de aplicaciones complejas
- Anotar tramos con entradas, salidas, metadatos y métricas

Endpoints de API:
- [API de tramos][4]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`
- [API de evaluaciones][5]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

Para obtener más información, consulta la [documentación de la API HTTP][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/llm_observability/auto_instrumentation
[2]: /es/llm_observability/instrumentation/sdk
[3]: /es/llm_observability/setup/api
[4]: /es/llm_observability/instrumentation/api/?tab=model#spans-api
[5]: /es/llm_observability/instrumentation/api/?tab=model#evaluations-api
[6]: /es/llm_observability/instrumentation/sdk#command-line-setup
[7]: /es/llm_observability/instrumentation/sdk#in-code-setup