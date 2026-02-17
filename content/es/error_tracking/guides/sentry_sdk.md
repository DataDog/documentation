---
description: Comienza a utilizar Datadog Error Tracking hoy mismo sin cambiar tu configuración
  actual con el SDK de Sentry.
further_reading:
- link: /error_tracking/manage_data_collection
  tag: Documentación
  text: Gestionar recopilación de datos
title: SDK de Sentry
---
{{< callout url="#" btn_hidden="true" >}}
El uso de Sentry SDK con Error Tracking está en Vista previa.
{{< /callout >}}

<div class="alert alert-danger">
El uso del SDK de Sentry con Error Tracking te ayuda a migrar a Datadog. Sin embargo, para sacar el máximo partido de Error Tracking, se recomienda utilizar los SDK de Datadog. Consulta <a href="/error_tracking/frontend">Seguimiento de errores frontend</a> y <a href="/error_tracking/backend">Seguimiento de errores backend</a>.
</div>

## Información general
Puedes utilizar [SDK de Sentry][1] para enviar tus eventos a Datadog, para que puedas empezar a utilizar Error Tracking en aplicaciones existentes, instrumentadas utilizando SDK de Sentry.

La configuración del SDK de Sentry con Datadog requiere un cambio mínimo de código para apuntar el SDK a un nombre de fuente de datos (DSN) de Datadog.

Los [eventos][6] y los mensajes de eventos que no son de error aparecen en Datadog como logs en el [explorador de logs][12]. No se admiten otros tipos de elementos (trazas (traces), archivos adjuntos, sesiones, etc.).

## SDK compatibles

Se comprobó que los siguientes SDK de Sentry funcionan con Error Tracking:

| Plataforma   | Versión probada                                    |
| ---------- | ------------------------------------------------- |
| JavaScript | `@sentry/node@9.13.0`<br>`@sentry/browser@9.13.0` |
| Python     | `sentry-sdk==2.26.1`                              |
| Java       | `io.sentry:sentry:8.6.0`                          |
| .NET       | `Sentry 5.5.1`                                    |
| Go         | `sentry-go v0.32.0`                               |
| Ruby       | `sentry-Ruby 5.23.0`                              |

## Configuración
### Requisitos previos
Los eventos de los SDK de Sentry se envían a Datadog como logs. Debes tener activado el [Error Tracking para logs][2] para que los errores aparezcan en Error Tracking.

**Nota:** Por defecto, al activar Error Tracking para logs se activa Error Tracking en **todos** tus logs. Puedes utilizar [reglas][9] para configurar Error Tracking para logs de forma que recopile **sólo** errores del SDK de Sentry. Para ello, crea una regla para logs con un contexto `source:sentry-sdk`  y crea una regla de exclusión para todos los demás logs.

{{< img src="error_tracking/sentry-sdk-rules.png" alt="Reglas de Error Tracking que incluyen sólo logs del SDK de Sentry" style="width:70%;" >}}

### Configuración del servicio
Para configurar el SDK de Sentry para enviar eventos a Datadog:
1. Configura un nombre de fuente de datos (DSN) de Datadog. Sigue las [instrucciones en la aplicación][3] para generar tu DSN único.
2. Define una etiqueta (tag) `servicio` en todos los eventos. Esta acción se utiliza para separar errores y se muestra en la interfaz de usuario Datadog:

{{< tabs >}}

  {{% tab "JavaScript" %}}
  {{< code-block lang="javascript" >}}
  Sentry.init({
      dsn: 'https://<TOKEN>@sentry-intake.<DD_SITE>/1',
      initialScope: {
          tags: {
              service: 'my-app'
          }
      }
  });
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "Python" %}}
  {{< code-block lang="python" >}}
  sentry_sdk.init(
      dsn="https://<TOKEN>@sentry-intake.<DD_SITE>/1",
  )
  sentry_sdk.set_tag("service", "my-app")
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "Java" %}}
  {{< code-block lang="java" >}}
  Sentry.init(options -> {
      options.setDsn("https://<TOKEN>@sentry-intake.<DD_SITE>/1");
  });
  Sentry.configureScope(scope -> {
      scope.setTag("service", "my-app");
  });
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "C#" %}}
  {{< code-block lang="csharp">}}
  SentrySdk.Init(options =>
  {
      options.Dsn = "https://<TOKEN>@sentry-intake.<DD_SITE>/1";
      options.SetBeforeSend((sentryEvent, hint) => {
          sentryEvent.SetTag("service", "my-app");
          return sentryEvent;
      });
  });
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "Go" %}}
  {{< code-block lang="go">}}
  sentry.Init(sentry.ClientOptions{
      Dsn: "https://<TOKEN>@sentry-intake.<DD_SITE>/1",
  })
  sentry.ConfigureScope(func(scope *sentry.Scope) {
      scope.SetTag("service", "my-app");
  })
  {{< /code-block >}}
  {{% /tab %}}

  {{% tab "Ruby" %}}
  {{< code-block lang="ruby">}}
  Sentry.init do |config|
      config.dsn = https://<TOKEN>@sentry-intake.<DD_SITE>/1'
  end
  Sentry.set_tags('service': 'my-app')
  {{< /code-block >}}
  {{% /tab %}}

{{< /tabs >}}

### Cargar mapas fuente de JavaScript

Si tu código fuente de JavaScript del frontend está minimizado, puedes cargar mapas de código fuente en Datadog para desofuscar trazas de stack tecnológico en Error Tracking. Consulta [Cargar mapas fuente de JavaScript][4].

La `version` en los mapas fuente coincide con la `release` [configurada][11] en el SDK de Sentry.

### Integración del código fuente

La [integración del código fuente de Datadog][5] te permite conectar tu telemetría con tus repositorios Git. Funciona con los SDK de Sentry configurando etiquetas de telemetría:

{{< tabs >}}

{{% tab "JavaScript" %}}
{{< code-block lang="javascript" >}}
Sentry.setTag("git.commit.sha", "<commitSha>");
Sentry.setTag("git.repository_url", "<git-provider.example/me/my-repo>");
{{< /code-block >}}
{{% /tab %}}

{{% tab "Python" %}}
{{< code-block lang="python" >}}
sentry_sdk.set_tag("git.commit.sha", "<commitSha>")
sentry_sdk.set_tag("git.repository_url", "<git-provider.example/me/my-repo>")
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java" >}}
Sentry.configureScope(scope -> {
    scope.setTag("git.commit.sha", "<commitSha>");
    scope.setTag("git.repository_url", "<git-provider.example/me/my-repo>");
});
{{< /code-block >}}
{{% /tab %}}

{{% tab "C#" %}}
{{< code-block lang="csharp" >}}
SentrySdk.ConfigureScope(scope =>
{
    scope.SetTag("git.commit.sha", "<commitSha>");
    scope.SetTag("git.repository_url", "<git-provider.example/me/my-repo>");
});
{{< /code-block >}}
{{% /tab %}}

{{% tab "Go" %}}
{{< code-block lang="go" >}}
sentry.ConfigureScope(func(scope *sentry.Scope) {
    scope.SetTag("git.commit.sha", "<commitSha>");
    scope.SetTag("git.repository_url", "<git-provider.example/me/my-repo>");
})
{{< /code-block >}}
{{% /tab %}}

{{% tab "Ruby" %}}
{{< code-block lang="ruby" >}}
Sentry.set_tags('git.commit.sha', '<commitSha>')
Sentry.set_tags('git.repository_url', '<git-provider.example/me/my-repo>')
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

## Migrar a la configuración recomendada 

Para sacar el máximo partido de Error Tracking, Datadog recomienda migrar al SDK de Datadog o a configuraciones basadas en el Agent. Para obtener más información, consulta [Seguimiento de errores backend][7] y [Seguimiento de errores frontend][8].

La configuración del SDK de Sentry puede utilizarse simultáneamente con la configuración recomendada. Es posible que se notifiquen errores dos veces.

## Enviar eventos tanto a Sentry como a Datadog
Los eventos pueden enviarse tanto a Sentry (o a cualquier otro backend compatible con Sentry) como a Datadog. Esto te permite empezar a utilizar Datadog conservando tu solución actual. Existen un par de formas de conseguirlo:
- [Uso del SDK de Sentry](#using-the-sentry-sdk)
- [Uso del espejo de Sentry](#using-sentry-mirror)

### Uso del SDK de Sentry
Puedes configurar los SDK de Sentry para enviar eventos a varios DSN a la vez. En la mayoría de los SDK de Sentry, puedes anular el transporte predeterminado para lograr esto.

{{< tabs >}}

{{% tab "JavaScript" %}}
{{< code-block lang="javascript" >}}
// Change to import from "@sentry/react", "@sentry/nextjs", etc. as needed
import * as Sentry from "@sentry/browser";
import { makeFetchTransport } from "@sentry/browser"; // import { makeNodeTransport } from "@sentry/node" for Node.js
import { makeMultiplexedTransport } from "@sentry/core";

const sentryDsn = '<SENTRY_DSN>';
const datadogDsn = '<DATADOG_DSN>';

Sentry.init({
  dsn: sentryDsn,
  transport: makeMultiplexedTransport(makeFetchTransport, () => [sentryDsn, datadogDsn]),
  // ...
});
Sentry.setTag('service', 'my-app');
{{< /code-block >}}
{{% /tab %}}

{{% tab "Python" %}}
1. Copia la siguiente función en tu código:
{{< code-block lang="python" >}}
from sentry_sdk.transport import Transport, make_transport
def make_multi_transport(dsns):
    class MultiTransport(Transport):
        def __init__(self, options):
            super().__init__(options)
            self.transports = [
                make_transport({**options, "dsn": dsn, "transport": None}) for dsn in dsns
            ]
        def capture_envelope(self, *args, **kwargs):
            for transport in self.transports:
                transport.capture_envelope(*args, **kwargs)
        def flush(self, *args, **kwargs):
            for transport in self.transports:
                transport.flush(*args, **kwargs)
        def kill(self):
            for transport in self.transports:
                transport.kill()
        def record_lost_event(self, *args, **kwargs):
            for transport in self.transports:
                transport.record_lost_event(*args, **kwargs)
    return MultiTransport
{{< /code-block >}}

2. Utilízalo del siguiente modo:
{{< code-block lang="python" >}}
_SENTRY_DSN = "<SENTRY_DSN>"
_DATADOG_DSN = "<DATADOG_DSN>"
sentry_sdk.init(
    dsn=_SENTRY_DSN,
    transport=make_multi_transport([_SENTRY_DSN, _DATADOG_DSN]),
    # ...
)
sentry_sdk.set_tag("service", "my-app")
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
1. Copia la siguiente clase en tu código. Asegúrate de definirla en el paquete **io.sentry**.
{{< code-block lang="java" >}}
package io.sentry;

public record MultiTransportFactory(List<String> dsns) implements ITransportFactory {
  @Override
  public ITransport create(final SentryOptions options, final RequestDetails requestDetails) {
    final var transports = dsns.stream()
        .map(dsn -> {
          var requestOptions = new SentryOptions();
          requestOptions.setDsn(dsn);
          requestOptions.setSentryClientName(options.getSentryClientName());
          return new AsyncHttpTransportFactory().
              create(options, new RequestDetailsResolver(requestOptions).resolve());
        })
        .toList();
    return new ITransport() {
      @Override
      public void send(SentryEnvelope envelope, Hint hint) throws IOException {
        for (ITransport transport : transports) {
          transport.send(envelope, hint);
        }
      }

      @Override
      public boolean isHealthy() {
        return transports.stream().allMatch(ITransport::isHealthy);
      }

      @Override
      public void flush(long timeoutMillis) {
        transports.forEach(transport -> transport.flush(timeoutMillis));
      }

      @Override
      public RateLimiter getRateLimiter() {
        return null;
      }

      @Override
      public void close(boolean isRestarting) throws IOException {
        for (ITransport transport : transports) {
          transport.close(isRestarting);
        }
      }

      @Override
      public void close() throws IOException {
        for (ITransport transport : transports) {
          transport.close();
        }
      }
    };
  }
}
{{< /code-block >}}

2. Utilízalo del siguiente modo:
{{< code-block lang="java" >}}
final var sentryDsn = "<SENTRY_DSN>"
final var datadogDsn = "<DATADOG_DSN>"

Sentry.init(options -> {
  options.setDsn(sentryDsn);
  options.setTransportFactory(new MultiTransportFactory(List.of(sentryDsn, datadogDsn)));
});
Sentry.setTag("service", "my-app");
{{< /code-block >}}
{{% /tab %}}

{{% tab "Go" %}}
1. Copia el siguiente fragmento en tu código:
{{< code-block lang="go" >}}
type MultiTransport struct {
    dsns       []string
    transports []*sentry.HTTPTransport
}

func NewMultiTransport(dsns []string) *MultiTransport {
    transports := make([]*sentry.HTTPTransport, len(dsns))
    for i := range dsns {
        transports[i] = sentry.NewHTTPTransport()
    }
    return &MultiTransport{
        dsns:       dsns,
        transports: transports,
    }
}

func (mt *MultiTransport) Configure(options sentry.ClientOptions) {
    for i := range mt.dsns {
        options.Dsn = mt.dsns[i]
        if options.EnableTracing {
            // Replicating the default behavior:
            // https://github.com/getsentry/sentry-go/blob/v0.32.0/client.go#L358
            mt.transports[i].BufferSize = 1000
        }
        mt.transports[i].Configure(options)
    }
}

func (mt *MultiTransport) Flush(timeout time.Duration) bool {
    allDone := true
    for _, t := range mt.transports {
        if ok := t.Flush(timeout); !ok {
            allDone = false
        }
    }
    return allDone
}

func (mt *MultiTransport) SendEvent(event *sentry.Event) {
    for _, t := range mt.transports {
        t.SendEvent(event)
    }
}

func (mt *MultiTransport) Close() {
    for _, t := range mt.transports {
        t.Close()
    }
}
{{< /code-block >}}

2. Utilízalo del siguiente modo:
{{< code-block lang="go" >}}
sentryDSN := "<SENTRY_DSN>"
datadogDSN := "<DATADOG_DSN>"

err := sentry.Init(sentry.ClientOptions{
    Dsn: sentryDSN,
    Transport: NewMultiTransport([]string{sentryDSN, datadogDSN}),
})
// ...
sentry.ConfigureScope(func(scope *sentry.Scope) {
    scope.SetTag("service", "my-app")
})
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}

### Uso del espejo de Sentry
El [espejo de Sentry][10] es un proxy que replica el tráfico a varios DSN. Lo ejecutas en tu propio entorno y apuntas tus aplicaciones al DSN de entrada del espejo de Sentry.

El espejo de Sentry se configura mediante un archivo YAML:
{{< code-block lang="yaml" >}}
ip: 0.0.0.0
port: 3000
keys:
  - de entrada: http://1234567890abcdef1234567890abcdef@my-domain.example/123
    de salida:
      - <SENTRY_DSN>
      - <DATADOG_DSN>
{{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.sentry.io/
[2]: https://app.datadoghq.com/error-tracking/settings
[3]: https://app.datadoghq.com/error-tracking/settings/setup/sentry
[4]: /es/real_user_monitoring/guide/upload-javascript-source-maps
[5]: /es/integrations/guide/source-code-integration/
[6]: https://develop.sentry.dev/sdk/data-model/envelope-items/#event
[7]: /es/error_tracking/backend
[8]: /es/error_tracking/frontend
[9]: /es/error_tracking/manage_data_collection#rules
[10]: https://github.com/getsentry/sentry-mirror
[11]: https://docs.sentry.io/product/releases/setup/
[12]: https://app.datadoghq.com/logs