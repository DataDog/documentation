---
description: Adjunte automáticamente datos de evaluación de feature flags a las trazas
  de APM para que pueda inspeccionar y filtrar trazas por variante de feature flag.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de flags del lado del servidor
- link: /tracing/trace_explorer/
  tag: Documentación
  text: Trace Explorer
title: Configure el enriquecimiento de trazas de APM para Feature Flags
---
## Descripción general {#overview}

El enriquecimiento de trazas de APM adjunta automáticamente datos de evaluación de feature flags a sus trazas de APM. Cuando se evalúa una feature flag durante una solicitud rastreada, el SDK registra qué feature flags se evaluaron y qué variantes se devolvieron. Estos datos se escriben en el tramo raíz y se procesan en el lado del servidor para que usted pueda:

- **Filtrar trazas por variante de feature flag** en [Trace Explorer][1] usando `@feature_flags.<flag_key>:<variant>` facetas.
- **Depurar problemas relacionados con feature flags** al ver qué feature flags estaban activas cuando ocurrió un error.

<div class="alert alert-warning">El enriquecimiento de trazas de APM es experimental y puede cambiar en una versión futura.</div>

El enriquecimiento de trazas de APM está disponible en los siguientes SDKs:

| Lenguaje | Versión mínima |
| -------- | --------------- |
| Go       | 2.8.0           |
| Java     | 1.64.1          |
| Node.js  | 5.105.0         |

## Requisitos previos {#prerequisites}

Antes de configurar el enriquecimiento de trazas de APM, confirme lo siguiente:

- Las feature flags del lado del servidor ya están configuradas y las feature flags se están evaluando en su aplicación.
- [APM tracing][3] está habilitado y las trazas están llegando a Datadog.

## Cómo funciona el enriquecimiento de trazas de APM {#how-apm-trace-enrichment-works}

Cuando el enriquecimiento de trazas de APM está habilitado, el proveedor de OpenFeature de Datadog se conecta al ciclo de vida de evaluación:

1. Cada vez que se evalúa una feature flag, el SDK captura los metadatos de evaluación (ID de serie de la feature flag, clave de segmentación y valor de respaldo predeterminado).
2. Los metadatos se acumulan en el tramo raíz de la traza actual.
3. Cuando el tramo raíz finaliza, el SDK escribe los datos acumulados como etiquetas de tramo compactas (`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`).
4. El backend de Datadog decodifica estas etiquetas y escribe `@feature_flags.<flag_key>` facetas legibles por humanos en el tramo, haciéndolas buscables en Trace Explorer.

Las etiquetas del lado del SDK son solo para transporte y se eliminan en el lado del servidor. Las etiquetas visibles para usted en Trace Explorer son las `@feature_flags.<flag_key>` facetas decodificadas.

## Habilitar el enriquecimiento de trazas de APM {#enable-apm-trace-enrichment}

Establezca la siguiente variable de entorno para habilitar el enriquecimiento de tramos:

{{< code-block lang="bash" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true
{{< /code-block >}}

La variable de entorno de enriquecimiento es compatible con todos los SDK del lado del servidor admitidos. No se requieren cambios en el código. Habilitar la variable activa el gancho de enriquecimiento automáticamente cuando se inicializa el proveedor de OpenFeature de Datadog. Node.js también admite la configuración a nivel de código como se muestra en las pestañas de lenguaje a continuación.

### Configuración específica del lenguaje {#language-specific-configuration}

{{< tabs >}}
{{% tab "Go" %}}

No se necesita configuración de código adicional. La variable de entorno `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` habilita el enriquecimiento de tramos cuando se inicializa `DatadogProvider`.

{{< code-block lang="go" filename="main.go" >}}
package main

import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    provider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := provider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(provider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")
    // Flag evaluations now enrich APM spans automatically
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

No se necesita configuración de código adicional. La variable de entorno `DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED` habilita el enriquecimiento de tramos. Java también admite la propiedad del sistema `-Ddd.experimental.flagging.provider.span.enrichment.enabled=true` como alternativa.

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
// Flag evaluations now enrich APM spans automatically
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

También puede habilitar el enriquecimiento de tramos en el código:

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
      spanEnrichment: {
        enabled: true,
      },
    },
  },
});
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Verificar el enriquecimiento de trazas de APM {#verify-apm-trace-enrichment}

Después de implementar con el enriquecimiento de tramos habilitado:

1. Genere solicitudes en su aplicación que evalúen las feature flags.
2. Vaya a [Trace Explorer][1] y busque una traza reciente de su servicio.
3. Abra una traza y busque los atributos `@feature_flags.<flag_key>` en el tramo raíz.

El SDK escribe etiquetas codificadas compactas (`ffe_flags_enc`, `ffe_subjects_enc`, `ffe_runtime_defaults`) en el tramo raíz. El backend de Datadog decodifica estos y produce facetas `@feature_flags.<flag_key>` legibles por humanos. Este procesamiento toma unos segundos después de que se ingiere el tramo.

Después del procesamiento del backend, el tramo raíz contiene atributos como los siguientes ejemplos:

| Atributo de ejemplo | Valor de ejemplo |
| --------- | ------------- |
| `@feature_flags.checkout-flow` | `treatment` |
| `@feature_flags.dark-mode` | `control` |

Cada clave de atributo es `@feature_flags.<flag_key>` y el valor es la variante devuelta por la evaluación.

### Solución de problemas {#troubleshooting}

Si los atributos `@feature_flags.<flag_key>` no aparecen en sus trazas:

- Confirme que el enriquecimiento de tramo esté habilitado (`DD_EXPERIMENTAL_FLAGGING_PROVIDER_SPAN_ENRICHMENT_ENABLED=true`).
- Verifique que su aplicación esté evaluando feature flags durante las solicitudes rastreadas. El enriquecimiento solo ocurre cuando se evalúa una feature flag mientras una traza está activa.
- Espere unos segundos después de que se ingiera el tramo. Las facetas `@feature_flags.<flag_key>` se derivan del procesamiento del backend y no aparecen en los metadatos sin procesar del tramo.
- Para depurar, inspeccione los metadatos sin procesar del tramo para buscar la etiqueta `ffe_flags_enc`. Si esta etiqueta está presente, el SDK está emitiendo datos de enriquecimiento. O el backend aún no lo ha procesado, o la feature flag gate no está habilitada para su organización.
- Si las feature flags no se están evaluando en absoluto, consulte [Server-Side Feature Flags][2] para obtener información sobre la configuración y la solución de problemas específica del lenguaje.

## Buscar y filtrar por variante de Feature Flag {#search-and-filter-by-flag-variant}

Estos ejemplos utilizan las facetas `@feature_flags.<flag_key>` para filtrar trazas en Trace Explorer:

| Incidencia | Ejemplo de consulta |
| -------- | ------------- |
| Trazas para una variante específica de Feature Flag | `@feature_flags.checkout-flow:treatment` |
| Errores bajo una variante de Feature Flag | `@feature_flags.checkout-flow:treatment status:error` |
| Cualquier traza donde se evaluó una Feature Flag | `@feature_flags.checkout-flow:*` |
| Múltiples Feature Flags en la misma solicitud | `@feature_flags.checkout-flow:treatment @feature_flags.new-search:enabled` |
| Con alcance a servicio y entorno | `env:production service:api-gateway @feature_flags.rate-limit-v2:enabled` |

## Utilice trazas enriquecidas en todo Datadog {#use-enriched-traces-across-datadog}

Los atributos de las Feature Flags en las trazas están disponibles en todo Datadog:

- **Monitores**: Alertar cuando el recuento de errores para una variante específica supere un umbral para detectar regresiones específicas de la variante.
- **Dashboards**: Agregue un widget de series temporales que compare la latencia p99 entre variantes utilizando `@feature_flags.<flag_key>` como dimensión de agrupación.
- **Notebooks**: Cree un notebook de investigación que compare el rendimiento entre variantes de Feature Flag.
- **Visualizaciones**: Utilice la Top List view en Trace Explorer para verificar que la distribución del tráfico de despliegue coincida con sus reglas de segmentación.

## Límites {#limits}

El SDK aplica los siguientes límites por tramo para restringir el tamaño de la carga útil:

| Límite | Valor |
| ----- | ----- |
| IDs de serie de Feature Flag por tramo | 128 a 200 (varía según el SDK) |
| Asuntos por tramo | 10 a 25 (varía según el SDK) |
| Claves predeterminadas de tiempo de ejecución por tramo | 5 |
| Longitud predeterminada del valor de tiempo de ejecución | 64 caracteres (truncado) |

Las evaluaciones que excedan estos límites se descartarán para ese tramo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_explorer/
[2]: /es/feature_flags/server/
[3]: /es/tracing/