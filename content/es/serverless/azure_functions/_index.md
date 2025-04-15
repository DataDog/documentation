---
title: Instala la monitorización serverless para Azure Functions
---

## Información general
En esta página se explica cómo recopilar trazas (traces), rastrear métricas, métricas de tiempo de ejecución y métricas personalizadas de Azure Functions. Para recopilar métricas adicionales, instala la [integración de Datadog Azure][6].

## Configuración

{{< programming-lang-wrapper langs="nodejs,python" >}}
{{< programming-lang lang="nodejs" >}}
1. **Instala dependencias**. Ejecuta los siguientes comandos:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Para usar la [instrumentación automática][1], utiliza `dd-trace` v5.25+.

   Datadog recomienda anclar las versiones de paquete y actualizar periódicamente a las últimas versiones de `@datadog/serverless-compat` y de `dd-trace` para asegurarte de tener acceso a las mejoras y correcciones de errores.

2. **Inicia la capa de compatibilidad serverless de Datadog e inicializa el rastreador de Node.js**. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal (por ejemplo, `app.js`):

   ```js
   require('@datadog/serverless-compat').start();

   // This line must come before importing any instrumented module. 
   const tracer = require('dd-trace').init()
   ```

3. (Opcional) **Habilita las métricas del tiempo de ejecución**. Consulta [Métricas del tiempo de ejecución de Node.js][2].

4. (Opcional) **Habilita métricas personalizadas**. Consulta [Presentación de métricas: DogStatsD][3].

[1]: /es/tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentation
[2]: /es/tracing/metrics/runtime_metrics/nodejs/?tab=environmentvariables
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Instala dependencias**. Ejecuta los siguientes comandos:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Para usar la [instrumentación automática][1], utiliza `dd-trace` v2.19+.

   Datadog recomienda utilizar las últimas versiones de `datadog-serverless-compat` y de `ddtrace` para asegurarte de tener acceso a las mejoras y correcciones de errores.

2. **Inicializa el rastreador de Datadog Python y la capa de compatibilidad serverless**. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal:

   ```python
   from datadog_serverless_compat import start
   from ddtrace import tracer, patch_all

   start()
   patch_all()
   ```

3. (Opcional) **Habilita las métricas del tiempo de ejecución**. Consulta [Métricas del tiempo de ejecución de Python][2].

4. (Opcional) **Habilita métricas personalizadas**. Consulta [Presentación de métricas: DogStatsD][3].

[1]: /es/tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentation
[2]: /es/tracing/metrics/runtime_metrics/python/
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Despliega tu función**.

6. **Configura Datadog Intake**. Añade las siguientes variables de entorno a la configuración de la aplicación de tus funciones:

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_API_KEY` | Tu [Clave de la API de Datadog][1]. |
   | `DD_SITE` | Tu [sitio Datadog][2]. Por ejemplo, {{< region-param key=dd_site code="true" >}}. |

7. **Configura el etiquetado de servicios unificado**. Puedes recopilar métricas desde tu Azure Functions mediante la instalación de la [integración de Datadog Azure][6]. Para correlacionar estas métricas con tu trazas (traces), primero configura las etiquetas (tags) `env`, `service` y `version` en tu recurso en Azure . A continuación, configura las siguientes variables de entorno. Puedes añadir etiquetas (tags) personalizados como `DD_TAGS`.

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_ENV` | Cómo deseas etiquetar tu variable de entorno para el [etiquetado de servicios unificado][9]. Por ejemplo, `prod`. |
   | `DD_SERVICE` | Cómo deseas etiquetar tu servicio para el [etiquetado de servicios unificado][9].  |
   | `DD_VERSION` | Cómo deseas etiquetar tu versión para el [etiquetado de servicios unificado][9]. |
   | `DD_TAGS` | Tus etiquetas (tags) personalizadas separadas por comas. Por ejemplo, `key1:value1,key2:value2`.  |

## ¿Qué toca hacer ahora?

- Puedes ver tus trazas (traces) de Azure Functions en [Trace Explorer][4]. Busca por el nombre del servicio que configuraste en la variable de entorno `DD_SERVICE` para ver tus trazas (traces).
- Puedes utilizar la página [Serverless > Azure Funcitons][5] para ver tus trazas (traces) enriquecidas con la telemetría recopilada por la [integración de Datadog Azure][6].

### Activa/desactiva métricas de trazas (traces)

Las [métricas de trazas (traces)][3] están activados en forma predeterminada. Para configurar métricas de trazas, utiliza la siguiente variable de entorno:

`DD_TRACE_STATS_COMPUTATION_ENABLED`
: Activa (`true`) o desactiva (`false`) métricas de trazas. El valor predeterminado es `true`.

  **Valores**: `true`, `false`

## Solucionar problemas

### Activa logs de depuración

Puedes recopilar [logs de depuración][7] para solucionar problemas. Para configurar logs de depuración, utiliza las siguientes variables de entorno:

`DD_TRACE_DEBUG`
: Activa (`true`) o desactiva (`false`) el registro de depuración para la biblioteca de Datadog Tracing. El valor predeterminado es `false`.

  **Valores**: `true`, `false` 

`DD_LOG_LEVEL`
: Configura el nivel de registro para la capa de compatibilidad serverless de Datadog. El valor predeterminado es `info`.

  **Valores**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`

### Planes de Linux Consumption y acciones de GitHub

Para utilizar una acción de GitHub para desplegar en una función de Linux Consumption, configura tu flujo de trabajo para utilizar un Azure Service Principal para RBAC. Consulta [Utilizar Azure Service Principal para RBAC como credencial de despliegue][8].


[1]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /es/getting_started/site
[3]: /es/tracing/metrics/metrics_namespace/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[6]: /es/integrations/azure/
[7]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[8]: https://github.com/Azure/functions-action?tab=readme-ov-file#using-azure-service-principal-for-rbac-as-deployment-credential
[9]: /es/getting_started/tagging/unified_service_tagging/