---
further_reading:
- link: /opentelemetry/compatibility/
  tag: Documentación
  text: Compatibilidad entre Datadog y OpenTelemetry
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Utilice componentes personalizados de OpenTelemetry
- link: /opentelemetry/instrument/
  tag: Documentación
  text: Instrumente su aplicación con OpenTelemetry
title: Instrumente entornos de ejecución no compatibles con OpenTelemetry
---
## Descripción general {#overview}

Si el entorno de ejecución de su aplicación no es compatible de forma nativa con un [SDK de Datadog][1], puede utilizar el SDK de OpenTelemetry para enviar telemetría a Datadog. Este enfoque le proporciona trazas y métricas sin esperar a que exista compatibilidad nativa con el entorno de ejecución.

Esta guía explica cómo instrumentar una aplicación de [Bun][2] como ejemplo. Bun es compatible con la mayoría de las API de Node.js, por lo que puede utilizar el [SDK de Node.js de OpenTelemetry][3] para instrumentar aplicaciones de Bun. Puede aplicar el mismo patrón a otros entornos de ejecución no soportados que sean compatibles con el SDK de OpenTelemetry

## Nivel de soporte {#support-level}

<div class="alert alert-info">
Esta guía se encuentra bajo el <strong>nivel de soporte</strong> de <a href="/opentelemetry/compatibility/#support-levels">Componentes personalizados</a>. Datadog proporciona esta documentación como punto de partida, pero no ofrece soporte directo para la funcionalidad del entorno de ejecución ni para el comportamiento del SDK de OpenTelemetry dentro de este. Para problemas específicos del entorno de ejecución, comuníquese con la <a href="https://opentelemetry.io/community/">comunidad de OpenTelemetry</a> o con los mantenedores del entorno de ejecución.
</div>

## Requisitos previos {#prerequisites}

- Un backend compatible con OpenTelemetry configurado para enviar datos a Datadog. Consulte [Enviar datos de OpenTelemetry a Datadog][4] para conocer las opciones de configuración, incluyendo el colector DDOT, el colector OTel con el exportador de Datadog o la ingesta directa de OTLP.
- [Bun][2] instalado (v1.0 o posterior).
- Una aplicación de Bun que desea instrumentar.

## Instrumentar una aplicación de Bun {#instrument-a-bun-application}

### Instalar paquetes de OpenTelemetry {#install-opentelemetry-packages}

Desde el directorio raíz de su proyecto, instale los paquetes de OpenTelemetry requeridos:

```shell
bun add @opentelemetry/api \
  @opentelemetry/sdk-node \
  @opentelemetry/sdk-metrics \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/exporter-metrics-otlp-http \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
```

### Cree un módulo de inicialización de telemetría {#create-a-telemetry-initialization-module}

En Node.js, OpenTelemetry normalmente se carga a través del indicador `--require`, que precarga la instrumentación antes de que se ejecute el código de su aplicación. El sistema de resolución de módulos de Bun funciona de manera diferente, por lo que debe inicializar OpenTelemetry mediante programación.

Cree un archivo `tracing.ts` que configure el SDK de OpenTelemetry para Node.js:

{{< code-block lang="typescript" filename="tracing.ts" >}}
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || '<YOUR_SERVICE_NAME>',
  [ATTR_SERVICE_VERSION]: process.env.OTEL_SERVICE_VERSION || '1.0.0',
  'telemetry.sdk.runtime': 'bun',
});

const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter(),
  metricReaders: [new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  })],
  instrumentations: [getNodeAutoInstrumentations({
    // Disable fs instrumentation to avoid compatibility issues with Bun
    '@opentelemetry/instrumentation-fs': { enabled: false },
  })],
});

sdk.start();

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down'))
    .catch((err) => console.error('Error shutting down OpenTelemetry SDK', err))
    .finally(() => process.exit(0));
});
{{< /code-block >}}

Reemplace `<YOUR_SERVICE_NAME>` con el nombre del servicio de su aplicación.

### Inicialice la telemetría en el punto de entrada de su aplicación {#initialize-telemetry-at-your-application-entry-point}

Importe el módulo `tracing.ts` **antes** de cualquier otra importación de la aplicación. El SDK de OpenTelemetry debe inicializarse primero para aplicar parches a las bibliotecas para la instrumentación automática.

{{< code-block lang="typescript" filename="index.ts" >}}
import './tracing';

// Import your application code after tracing is initialized
import { startApp } from './app';

startApp();
{{< /code-block >}}

### Configure las variables de entorno {#configure-environment-variables}

Establezca las siguientes variables de entorno para configurar el punto de conexión del exportador OTLP y la identidad de su servicio:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
```

El valor `OTEL_EXPORTER_OTLP_ENDPOINT` depende de su configuración:
- **Colector local** (DDOT u OTel Collector): `http://localhost:4318` (HTTP predeterminado) o `http://localhost:4317` (gRPC)
- **Colector remoto**: Utilice la dirección y el puerto del colector

Para opciones de configuración adicionales, consulte la [especificación de variables de entorno de OpenTelemetry][5].

### Ejecute su aplicación {#run-your-application}

Inicie su aplicación Bun:

```shell
bun run index.ts
```

### Agregue instrumentación manual para las API nativas de Bun {#add-manual-instrumentation-for-bun-native-apis}

Las API integradas de Bun, como `Bun.serve()`, `bun:sqlite` y las API nativas de E/S de archivos, no se instrumentan automáticamente. Para capturar telemetría de estas API, cree tramos manualmente con el paquete `@opentelemetry/api`.

El siguiente ejemplo envuelve un controlador de rutas `Bun.serve()` con un tramo personalizado:

{{< code-block lang="typescript" filename="server.ts" >}}
import { trace, SpanKind } from '@opentelemetry/api';

const tracer = trace.getTracer('bun-app');

export function startServer() {
  Bun.serve({
    port: 3000,
    fetch(req) {
      return tracer.startActiveSpan('handleRequest', { kind: SpanKind.SERVER }, (span) => {
        try {
          span.setAttribute('http.method', req.method);
          span.setAttribute('http.url', req.url);
          return new Response('Hello from Bun!');
        } finally {
          span.end();
        }
      });
    },
  });
}
{{< /code-block >}}

Para más patrones de instrumentación manual, consulte la [documentación de instrumentación de OpenTelemetry JS][7].

### Verifique las trazas en Datadog {#verify-traces-in-datadog}

Después de que su aplicación maneje algunas solicitudes:

1. Vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][6] en Datadog.
2. Busque el nombre de su servicio.
3. Confirme que las trazas aparezcan con los tramos y metadatos esperados.

## Limitaciones {#limitations}

- **Cobertura de instrumentación automática**: Las bibliotecas de instrumentación automática de OpenTelemetry para Node.js dependen de la capa de compatibilidad con Node.js de Bun. La mayoría de las bibliotecas comunes (clientes HTTP, Express, controladores de bases de datos) funcionan, pero algunos paquetes de instrumentación podrían no funcionar como se espera.
- **APIs nativas de Bun**: Las APIs integradas de Bun como `Bun.serve()`, `bun:sqlite` y las APIs nativas de E/S de archivos no se instrumentan automáticamente. Consulte [Agregar instrumentación manual para APIs nativas de Bun](#add-manual-instrumentation-for-bun-native-apis) para ver un ejemplo.
- **Compatibilidad de bibliotecas**: No se garantiza que todas las bibliotecas de instrumentación de Node.js funcionen con Bun. Pruebe sus dependencias específicas y deshabilite cualquier instrumentación que cause errores pasando opciones de configuración a `getNodeAutoInstrumentations()`. El paquete `@opentelemetry/instrumentation-fs` es una fuente común de problemas y está deshabilitado en la configuración de ejemplo anterior.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: https://bun.com/docs/installation
[3]: https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
[4]: /es/opentelemetry/setup/
[5]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/
[6]: https://app.datadoghq.com/apm/traces
[7]: https://opentelemetry.io/docs/languages/js/instrumentation/