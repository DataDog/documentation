---
aliases:
- /es/dynamic_instrumentation/enabling/go
code_lang: go
code_lang_weight: 50
description: Configura Dynamic Instrumentation para que las aplicaciones de Go añadan
  sondas y capturen datos sin cambios en el código.
further_reading:
- link: agente
  tag: Documentación
  text: Empezando con el Datadog Agent
private: false
title: Habilita Dynamic Instrumentation para Go
type: multi-code-lang
---

{{< partial name="dynamic_instrumentation/beta-callout.html" language="Go" limitations_anchor="unsupported-features" >}}

Dynamic Instrumentation es una función de las bibliotecas de rastreo de Datadog que te permite capturar el estado de la aplicación en tiempo de ejecución sin modificar ni desplegar nuevamente el código. En esta page (página) se describe cómo habilitar Dynamic Instrumentation para aplicaciones de Go.

## Instalación

Para utilizar Dynamic Instrumentation, debes activarlo tanto en el Datadog Agent como en tu aplicación.

### Datadog Agent

1. Instala o actualiza tu Agent a la versión [v7.73.0][6] o posterior.
2. Habilita Dynamic Instrumentation en la configuración del Agent utilizando uno de los siguientes métodos, según cómo despliegues el Agent:

{{< tabs >}}
{{% tab "Archivo de configuración de YAML" %}}
Actualiza `system-probe.yaml` (situado junto a `datadog.yaml`) con lo siguiente. Para obtener más información, consulta [Archivos de configuración del Agent][101].
```yaml
dynamic_instrumentation:
  enabled: true
```
[101]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file

{{% /tab %}}
{{% tab "Variable de entorno" %}}
Añade lo siguiente a tu manifiesto del Datadog Agent:
```
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

{{% /tab %}}
{{% tab "Helm" %}}
Añade lo siguiente a tu gráfico Helm:
```yaml
datadog:
  dynamicInstrumentationGo:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

### Aplicación (biblioteca de rastreo)

1. Sigue las [Instrucciones de instalación de la biblioteca de rastreo de Go][2] para instalar o actualizar la biblioteca de rastreo de Go a una de las siguientes versiones compatibles:
   - v1.74.6 o posterior (versión principal 1)
   - v2.2.3 o posterior (versión principal 2)
2. Ejecuta tu servicio con Dynamic Instrumentation activado configurando la siguiente variable de entorno:

   ```
   DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
   ```

3. Configura [Tags (etiquetas) de servicios unificados][201] para poder filtrar y agrupar tus instrumentaciones y clientes activos objetivo a través de estas dimensiones:
   - `DD_SERVICE`
   - `DD_ENV`
   - `DD_VERSION`
4. Reinicia tu servicio.
5. Una vez iniciado el servicio, puedes añadir y gestionar instrumentaciones desde la page (página) [**APM** > **Live Debugger**][3].

[201]: https://docs.datadoghq.com/es/getting_started/tagging/unified_service_tagging/?tab=kubernetes

## ¿Qué hacer a continuación?

ConsultA la [Documentación de Live Debugger][4] para obtener información sobre cómo añadir instrumentaciones, capturar el estado de la aplicación y explorar e indexar los datos recopilados.

## Funciones compatibles

- Añadir sondas para llamadas a métodos, retornos y líneas de código específicas
- Búsqueda de símbolos para la selección de la ubicación de la sonda
- Captura de variables y valores de retorno disponibles en la ubicación de la sonda seleccionada
- [Redacción de datos confidenciales][7]
- [Integración de códigos source (fuente)][8]

## Funciones no compatibles

- Dynamic Instrumentation para logs, métricas, spans (tramos) y sondas de spans (tramos) de tags (etiquetas)
- Plantillas de logs y expresiones de condición
- Redacción de PII basada en clases o tipos específicos
- Propagación de un conjunto adicional de `DD_TAGS` en el servicio para sondear las tags (etiquetas) de resultados

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/tracing/trace_collection/dd_libraries/go/
[3]: https://app.datadoghq.com/debugging
[4]: /es/tracing/live_debugger/
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[7]: /es/dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-variable-values-with-sensitive-data-scanner
[8]: /es/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts